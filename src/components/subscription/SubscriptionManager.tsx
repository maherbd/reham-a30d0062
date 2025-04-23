
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Transaction, PricingPlan } from '@/types/template';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Calendar, CreditCard, Settings, Clock, ArrowUpRight, Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { fetchUserTransactions } from '@/services/pricingService';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { PaymentForm } from '@/components/pricing/PaymentForm';

interface SubscriptionManagerProps {
  currentPlan?: PricingPlan | null;
  subscriptionEnd?: string | null;
  plans: PricingPlan[];
}

export function SubscriptionManager({ currentPlan, subscriptionEnd, plans }: SubscriptionManagerProps) {
  const { user } = useAuth();
  const [isUpgradeDialogOpen, setIsUpgradeDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
  
  // Fetch user's transactions
  const { data: transactions, isLoading: isLoadingTransactions } = useQuery({
    queryKey: ['transactions', user?.id],
    queryFn: () => user ? fetchUserTransactions(user.id) : Promise.resolve([]),
    enabled: !!user,
  });
  
  // Get the last transaction
  const lastTransaction = transactions && transactions.length > 0 
    ? transactions[0] 
    : null;
    
  // Format the subscription end date if available
  const formattedEndDate = subscriptionEnd 
    ? format(new Date(subscriptionEnd), 'PPP') 
    : 'N/A';
    
  // Handle plan change/upgrade
  const handlePlanChange = (plan: PricingPlan) => {
    setSelectedPlan(plan);
    setIsUpgradeDialogOpen(true);
  };
  
  // Handle successful payment
  const handlePaymentSuccess = (transaction: Transaction) => {
    setIsUpgradeDialogOpen(false);
    // In a real app, you'd refresh the subscription status here
    window.location.reload();
  };
  
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Your Subscription</CardTitle>
          <CardDescription>Manage your subscription plan and billing.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground">Current Plan</p>
                <p className="text-lg font-medium">{currentPlan?.name || 'Free Plan'}</p>
              </div>
              {currentPlan && (
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary">
                  Active
                </Badge>
              )}
            </div>
            
            {subscriptionEnd && (
              <div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Renews on {formattedEndDate}</span>
                </div>
              </div>
            )}
            
            <Separator />
            
            <div>
              <h4 className="font-medium mb-2">Plan Features</h4>
              <ul className="space-y-1">
                {currentPlan?.features.map((feature, index) => (
                  <li key={index} className="flex gap-2 items-start">
                    <span className="text-primary mt-0.5">✓</span>
                    <span>{feature}</span>
                  </li>
                )) || (
                  <li className="text-muted-foreground">No active subscription</li>
                )}
              </ul>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col items-stretch gap-2">
          <Button onClick={() => {}}>
            <Settings className="h-4 w-4 mr-2" />
            Manage Billing
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Available Plans</CardTitle>
          <CardDescription>Upgrade or change your subscription plan.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {plans.map(plan => (
              <div key={plan.id} className="flex items-start justify-between border rounded-lg p-4">
                <div>
                  <h4 className="font-medium">{plan.name}</h4>
                  <p className="text-muted-foreground text-sm">{plan.description}</p>
                  <div className="mt-1">
                    <span className="font-medium">${plan.price_monthly}</span>
                    <span className="text-muted-foreground text-sm">/month</span>
                  </div>
                </div>
                <Button 
                  variant={currentPlan?.id === plan.id ? "outline" : "default"}
                  disabled={currentPlan?.id === plan.id}
                  onClick={() => handlePlanChange(plan)}
                >
                  {currentPlan?.id === plan.id ? 'Current Plan' : 'Select'}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Payment History</CardTitle>
          <CardDescription>View your recent transactions.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoadingTransactions ? (
            <div className="flex justify-center py-4">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : transactions && transactions.length > 0 ? (
            <div className="space-y-4">
              {transactions.slice(0, 5).map(transaction => (
                <div key={transaction.id} className="flex justify-between items-center border-b pb-2 last:border-0">
                  <div>
                    <p className="font-medium">${transaction.amount} {transaction.currency}</p>
                    <p className="text-sm text-muted-foreground">
                      {transaction.created_at 
                        ? format(new Date(transaction.created_at), 'MMM d, yyyy') 
                        : 'N/A'
                      }
                    </p>
                  </div>
                  <Badge 
                    variant={transaction.status === 'completed' ? 'default' : 'outline'}
                    className={transaction.status === 'completed' 
                      ? 'bg-green-600 hover:bg-green-600' 
                      : ''
                    }
                  >
                    {transaction.status}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center py-4 text-muted-foreground">No transaction history found.</p>
          )}
        </CardContent>
      </Card>
      
      <Dialog open={isUpgradeDialogOpen} onOpenChange={setIsUpgradeDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upgrade to {selectedPlan?.name}</DialogTitle>
          </DialogHeader>
          {selectedPlan && (
            <PaymentForm 
              plan={selectedPlan} 
              billingPeriod="monthly"
              isOpen={isUpgradeDialogOpen}
              onClose={() => setIsUpgradeDialogOpen(false)}
              onSuccess={handlePaymentSuccess}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
