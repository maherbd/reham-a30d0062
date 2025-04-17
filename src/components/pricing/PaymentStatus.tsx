
import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Transaction } from '@/types/template';
import { updateTransactionStatus } from '@/services/pricingService';
import { verifyPayment } from '@/services/solanaPaymentService';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';

interface PaymentStatusProps {
  transaction: Transaction;
  onComplete: () => void;
  onBack: () => void;
}

export function PaymentStatus({ transaction, onComplete, onBack }: PaymentStatusProps) {
  const [status, setStatus] = useState<'pending' | 'completed' | 'failed'>(transaction.status);
  const [isVerifying, setIsVerifying] = useState(false);
  
  const checkPaymentStatus = async () => {
    if (status !== 'pending') return;
    
    try {
      setIsVerifying(true);
      
      // In a real implementation, we would check the status on the blockchain
      const result = await verifyPayment(
        transaction.id, 
        Number(transaction.amount),
        transaction.currency
      );
      
      if (result.success) {
        // Update transaction status in the database
        await updateTransactionStatus(
          transaction.id, 
          'completed', 
          result.transactionId
        );
        
        setStatus('completed');
        onComplete();
      } else {
        setStatus('failed');
      }
    } catch (error) {
      console.error('Error checking payment status:', error);
      setStatus('failed');
    } finally {
      setIsVerifying(false);
    }
  };
  
  useEffect(() => {
    // Auto-check payment status every 5 seconds if pending
    if (status === 'pending') {
      const interval = setInterval(checkPaymentStatus, 5000);
      return () => clearInterval(interval);
    }
  }, [status]);
  
  return (
    <Card className="p-6 max-w-md mx-auto">
      <div className="text-center space-y-4">
        {status === 'pending' && (
          <>
            <div className="flex justify-center">
              <Loader2 className="h-16 w-16 text-primary animate-spin" />
            </div>
            <h3 className="text-xl font-semibold">Payment Pending</h3>
            <p className="text-muted-foreground">
              Waiting for your payment to be confirmed on the blockchain.
              This usually takes a few seconds to a minute.
            </p>
          </>
        )}
        
        {status === 'completed' && (
          <>
            <div className="flex justify-center">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <h3 className="text-xl font-semibold">Payment Successful</h3>
            <p className="text-muted-foreground">
              Your payment has been confirmed. Thank you for subscribing!
            </p>
          </>
        )}
        
        {status === 'failed' && (
          <>
            <div className="flex justify-center">
              <XCircle className="h-16 w-16 text-destructive" />
            </div>
            <h3 className="text-xl font-semibold">Payment Failed</h3>
            <p className="text-muted-foreground">
              We couldn't confirm your payment. Please try again or contact support.
            </p>
          </>
        )}
        
        <div className="flex flex-col gap-3 mt-6">
          {status === 'pending' && (
            <Button 
              onClick={checkPaymentStatus} 
              disabled={isVerifying}
              className="w-full"
            >
              {isVerifying ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Checking...
                </>
              ) : (
                'Check Payment Status'
              )}
            </Button>
          )}
          
          {status === 'completed' && (
            <Button 
              onClick={onComplete}
              className="w-full"
            >
              Continue
            </Button>
          )}
          
          {status === 'failed' && (
            <Button 
              onClick={onBack}
              className="w-full"
            >
              Try Again
            </Button>
          )}
          
          {status === 'pending' && (
            <Button 
              variant="outline"
              onClick={onBack}
              className="w-full"
            >
              Cancel
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
