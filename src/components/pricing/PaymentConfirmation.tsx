
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Transaction } from '@/types/template';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, Loader } from 'lucide-react';

interface PaymentConfirmationProps {
  transaction: Transaction;
  isOpen: boolean;
  onClose: () => void;
}

export function PaymentConfirmation({ transaction, isOpen, onClose }: PaymentConfirmationProps) {
  const navigate = useNavigate();
  
  const renderStatus = () => {
    switch (transaction.status) {
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
    if (transaction.status === 'completed') {
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
            {transaction.status === 'completed' ? 'Go to Dashboard' : 'Close'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
