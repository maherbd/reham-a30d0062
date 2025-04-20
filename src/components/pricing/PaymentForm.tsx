
import React, { useState } from 'react';
import { PricingPlan, Transaction } from '@/types/template';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { createTransaction } from '@/services/pricingService';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { initiatePayment } from '@/services/solanaPaymentService';
import { CircleDollarSign, CreditCard, Wallet, Loader2 } from 'lucide-react';

interface PaymentFormProps {
  plan: PricingPlan;
  billingPeriod: 'monthly' | 'yearly';
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (transaction: Transaction) => void;
}

export function PaymentForm({ plan, billingPeriod, isOpen, onClose, onSuccess }: PaymentFormProps) {
  const [paymentMethod, setPaymentMethod] = useState<string>('solana');
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useAuth();
  
  const price = billingPeriod === 'monthly' ? plan.price_monthly : plan.price_yearly;
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('You must be logged in to complete this purchase');
      return;
    }
    
    try {
      setIsProcessing(true);
      
      // Create transaction record
      const transaction = await createTransaction(
        user.id,
        plan.id,
        price,
        'USDC',
        paymentMethod
      );
      
      if (!transaction) {
        throw new Error('Failed to create transaction');
      }
      
      // Initiate payment process
      const paymentId = await initiatePayment(transaction);
      
      if (!paymentId) {
        throw new Error('Failed to initiate payment');
      }
      
      toast.success('Transaction initiated. Please complete payment in your wallet.');
      onSuccess(transaction);
      
    } catch (error) {
      console.error('Error processing payment:', error);
      toast.error('Failed to process payment. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label className="text-base">Payment method</Label>
        <RadioGroup
          value={paymentMethod}
          onValueChange={setPaymentMethod}
          className="mt-2 space-y-2"
        >
          <div className="flex items-center space-x-2 rounded-md border p-3">
            <RadioGroupItem value="solana" id="solana" />
            <Label htmlFor="solana" className="flex items-center gap-2 cursor-pointer">
              <Wallet className="h-4 w-4" />
              <span>Solana Wallet (USDC)</span>
            </Label>
          </div>
          <div className="flex items-center space-x-2 rounded-md border p-3 opacity-60">
            <RadioGroupItem value="credit-card" id="credit-card" disabled />
            <Label htmlFor="credit-card" className="flex items-center gap-2 cursor-not-allowed">
              <CreditCard className="h-4 w-4" />
              <span>Credit Card (Coming Soon)</span>
            </Label>
          </div>
        </RadioGroup>
      </div>
      
      <div className="pt-2 border-t">
        <div className="flex justify-between items-center mb-1">
          <span className="text-muted-foreground">{plan.name} ({billingPeriod})</span>
          <span>${price}</span>
        </div>
        <div className="flex justify-between items-center text-base font-medium">
          <span>Total</span>
          <span className="flex items-center gap-1">
            <CircleDollarSign className="h-4 w-4 text-green-500" />
            ${price} USDC
          </span>
        </div>
      </div>
      
      <div className="flex justify-end gap-2 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          disabled={isProcessing}
        >
          Cancel
        </Button>
        <Button 
          type="submit"
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            'Pay Now'
          )}
        </Button>
      </div>
    </form>
  );
}
