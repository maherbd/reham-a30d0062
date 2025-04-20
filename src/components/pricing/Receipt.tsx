
import React from 'react';
import { Transaction, PricingPlan } from '@/types/template';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { Download, ArrowRight, Check } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { fetchPricingPlanById } from '@/services/pricingService';
import { useQuery } from '@tanstack/react-query';

interface ReceiptProps {
  transaction: Transaction;
}

export function Receipt({ transaction }: ReceiptProps) {
  const navigate = useNavigate();
  
  // Fetch plan details
  const { data: plan, isLoading } = useQuery<PricingPlan | null>({
    queryKey: ['plan', transaction.plan_id],
    queryFn: () => fetchPricingPlanById(transaction.plan_id || ''),
    enabled: !!transaction.plan_id,
  });
  
  const transactionDate = transaction.created_at 
    ? format(new Date(transaction.created_at), 'PPP')
    : 'N/A';
  
  const transactionTime = transaction.created_at
    ? format(new Date(transaction.created_at), 'p')
    : 'N/A';
  
  const handleDownload = () => {
    // Generate receipt PDF (in a real app, you'd generate a PDF)
    // For this example, we'll just show a toast
    alert('Receipt download functionality would be implemented here');
  };
  
  return (
    <Card className="max-w-md mx-auto">
      <CardContent className="pt-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">Payment Receipt</h2>
          <p className="text-muted-foreground">
            Transaction #{transaction.id.slice(0, 8)}
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Status</span>
            <span className="flex items-center font-medium text-green-600">
              <Check className="h-4 w-4 mr-1" />
              Complete
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Date</span>
            <span>{transactionDate}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Time</span>
            <span>{transactionTime}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Payment Method</span>
            <span className="capitalize">{transaction.payment_method}</span>
          </div>
          
          {transaction.transaction_hash && (
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Transaction Hash</span>
              <span className="font-mono text-sm">
                {transaction.transaction_hash.slice(0, 10)}...
              </span>
            </div>
          )}
          
          <Separator />
          
          {isLoading ? (
            <div className="h-12 animate-pulse bg-muted rounded"></div>
          ) : plan ? (
            <div className="flex justify-between items-center">
              <span>{plan.name} Plan</span>
              <span>${transaction.amount} {transaction.currency}</span>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <span>Subscription</span>
              <span>${transaction.amount} {transaction.currency}</span>
            </div>
          )}
          
          <Separator />
          
          <div className="flex justify-between items-center font-medium">
            <span>Total</span>
            <span>${transaction.amount} {transaction.currency}</span>
          </div>
        </div>
        
        <div className="mt-8 flex flex-col gap-3">
          <Button onClick={handleDownload} variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Download Receipt
          </Button>
          <Button onClick={() => navigate('/dashboard')} className="gap-2">
            Go to Dashboard
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
