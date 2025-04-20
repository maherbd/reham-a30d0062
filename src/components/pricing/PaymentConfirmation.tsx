
import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Transaction } from '@/types/template';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, Loader } from 'lucide-react';
import { verifyPayment, completePayment } from '@/services/solanaPaymentService';

interface PaymentConfirmationProps {
  transaction: Transaction;
  isOpen: boolean;
  onClose: () => void;
}

export function PaymentConfirmation({ transaction, isOpen, onClose }: PaymentConfirmationProps) {
  const navigate = useNavigate();
  const [status, setStatus] = useState<'pending' | 'processing' | 'completed' | 'failed'>(
    transaction.status as 'pending' | 'processing' | 'completed' | 'failed'
  );
  const [isVerifying, setIsVerifying] = useState(false);
  
  useEffect(() => {
    // Check payment status on mount and when transaction changes
    if (transaction.status === 'pending' || transaction.status === 'processing') {
      checkPaymentStatus();
      
      // Set up interval to check payment status
      const interval = setInterval(checkPaymentStatus, 5000);
      return () => clearInterval(interval);
    }
  }, [transaction]);
  
  const checkPaymentStatus = async () => {
    if (status === 'completed' || status === 'failed' || isVerifying) return;
    
    try {
      setIsVerifying(true);
      
      const result = await verifyPayment(
        transaction.id,
        Number(transaction.amount),
        transaction.currency
      );
      
      if (result.success) {
        // Use a simulated transaction hash for demo purposes
        // In a real implementation, this would be the actual transaction hash from the blockchain
        const txHash = `${Date.now().toString(16)}_${Math.random().toString(36).substring(2, 8)}`;
        
        // Complete the payment with the transaction hash
        const completed = await completePayment(transaction.id, txHash);
        
        if (completed) {
          setStatus('completed');
        }
      }
    } catch (error) {
      console.error('Error checking payment status:', error);
    } finally {
      setIsVerifying(false);
    }
  };
  
  const renderStatus = () => {
    switch (status) {
      case 'completed':
        return (
          <div className="flex flex-col items-center py-6">
            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Payment Successful!</h3>
            <p className="text-center text-muted-foreground">
              Thank you for your purchase. Your account has been upgraded.
            </p>
          </div>
        );
      case 'failed':
        return (
          <div className="flex flex-col items-center py-6">
            <XCircle className="h-16 w-16 text-red-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Payment Failed</h3>
            <p className="text-center text-muted-foreground">
              There was an issue processing your payment. Please try again.
            </p>
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center py-6">
            <Loader className="h-16 w-16 text-blue-500 mb-4 animate-spin" />
            <h3 className="text-xl font-semibold mb-2">Processing Payment...</h3>
            <p className="text-center text-muted-foreground">
              Please complete the payment in your wallet. This window will update when the transaction is complete.
            </p>
          </div>
        );
    }
  };
  
  const handleClose = () => {
    if (status === 'completed') {
      navigate('/dashboard');
    } else {
      onClose();
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Payment Status</DialogTitle>
          <DialogDescription>
            Transaction ID: {transaction.id.slice(0, 8)}...
          </DialogDescription>
        </DialogHeader>
        
        {renderStatus()}
        
        <DialogFooter>
          <Button onClick={handleClose}>
            {status === 'completed' ? 'Go to Dashboard' : 'Close'}
          </Button>
          
          {(status === 'pending' || status === 'processing') && (
            <Button 
              variant="outline" 
              onClick={checkPaymentStatus} 
              disabled={isVerifying}
            >
              {isVerifying ? 'Checking...' : 'Check Status'}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
