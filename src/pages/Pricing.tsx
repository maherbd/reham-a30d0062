
import React, { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PricingCard } from '@/components/pricing/PricingCard';
import { PaymentForm } from '@/components/pricing/PaymentForm';
import { PaymentConfirmation } from '@/components/pricing/PaymentConfirmation';
import { fetchPricingPlans } from '@/services/pricingService';
import { PricingPlan, Transaction } from '@/types/template';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { FadeIn } from '@/components/transitions/FadeIn';
import { Skeleton } from '@/components/ui/skeleton';
import { Check, X } from 'lucide-react';

const Pricing = () => {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState<Transaction | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  useEffect(() => {
    const loadPlans = async () => {
      setIsLoading(true);
      const pricingPlans = await fetchPricingPlans();
      setPlans(pricingPlans);
      setIsLoading(false);
    };
    
    loadPlans();
  }, []);
  
  const handleSelectPlan = (plan: PricingPlan) => {
    setSelectedPlan(plan);
    setShowPaymentForm(true);
  };
  
  const handlePaymentSuccess = (transaction: Transaction) => {
    setCurrentTransaction(transaction);
    setShowPaymentForm(false);
    setShowConfirmation(true);
  };
  
  const handleClosePaymentForm = () => {
    setShowPaymentForm(false);
    setSelectedPlan(null);
  };
  
  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    setCurrentTransaction(null);
    setSelectedPlan(null);
  };
  
  // Calculate yearly savings
  const calculateSavings = (plan: PricingPlan) => {
    const monthlyCost = plan.price_monthly * 12;
    const yearlyCost = plan.price_yearly;
    const savings = monthlyCost - yearlyCost;
    const savingsPercent = Math.round((savings / monthlyCost) * 100);
    return { savings, savingsPercent };
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow mt-16">
        <section className="py-16 md:py-24 bg-gradient-to-b from-white to-blue-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="text-center mb-12">
                <h1 className="text-3xl md:text-5xl font-bold">Simple, Transparent Pricing</h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                  Choose the perfect plan for your Web3 project needs
                </p>
              </div>
            </FadeIn>

            <div className="flex justify-center mb-8">
              <div className="flex items-center space-x-2 bg-secondary/50 p-1 rounded-lg">
                <Button 
                  variant={billingPeriod === 'monthly' ? 'default' : 'ghost'} 
                  size="sm"
                  onClick={() => setBillingPeriod('monthly')}
                >
                  Monthly
                </Button>
                <Button 
                  variant={billingPeriod === 'yearly' ? 'default' : 'ghost'} 
                  size="sm"
                  onClick={() => setBillingPeriod('yearly')}
                >
                  Yearly
                </Button>
              </div>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-[400px] w-full rounded-xl" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {plans.map((plan) => (
                  <PricingCard
                    key={plan.id}
                    plan={plan}
                    billingPeriod={billingPeriod}
                    onSelectPlan={handleSelectPlan}
                  />
                ))}
              </div>
            )}

            {/* Feature comparison */}
            <div className="mt-20">
              <h2 className="text-2xl font-bold text-center mb-8">Compare Plans</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-4 px-4">Feature</th>
                      <th className="text-center py-4 px-4">Starter</th>
                      <th className="text-center py-4 px-4">Pro</th>
                      <th className="text-center py-4 px-4">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-4">Number of websites</td>
                      <td className="text-center py-3 px-4">1</td>
                      <td className="text-center py-3 px-4">5</td>
                      <td className="text-center py-3 px-4">Unlimited</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">Custom domains</td>
                      <td className="text-center py-3 px-4"><X className="inline h-5 w-5 text-red-500" /></td>
                      <td className="text-center py-3 px-4"><Check className="inline h-5 w-5 text-green-500" /></td>
                      <td className="text-center py-3 px-4"><Check className="inline h-5 w-5 text-green-500" /></td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">Premium templates</td>
                      <td className="text-center py-3 px-4"><X className="inline h-5 w-5 text-red-500" /></td>
                      <td className="text-center py-3 px-4"><Check className="inline h-5 w-5 text-green-500" /></td>
                      <td className="text-center py-3 px-4"><Check className="inline h-5 w-5 text-green-500" /></td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">Remove branding</td>
                      <td className="text-center py-3 px-4"><X className="inline h-5 w-5 text-red-500" /></td>
                      <td className="text-center py-3 px-4"><Check className="inline h-5 w-5 text-green-500" /></td>
                      <td className="text-center py-3 px-4"><Check className="inline h-5 w-5 text-green-500" /></td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">Analytics</td>
                      <td className="text-center py-3 px-4">Basic</td>
                      <td className="text-center py-3 px-4">Advanced</td>
                      <td className="text-center py-3 px-4">Advanced</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">Support</td>
                      <td className="text-center py-3 px-4">Community</td>
                      <td className="text-center py-3 px-4">Priority</td>
                      <td className="text-center py-3 px-4">Dedicated</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">Team members</td>
                      <td className="text-center py-3 px-4">1</td>
                      <td className="text-center py-3 px-4">3</td>
                      <td className="text-center py-3 px-4">Unlimited</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mt-20">
              <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-lg font-medium mb-2">Can I upgrade my plan later?</h3>
                  <p className="text-muted-foreground">Yes, you can upgrade your plan at any time. Your new features will be available immediately, and we'll prorate your billing.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-lg font-medium mb-2">What payment methods do you accept?</h3>
                  <p className="text-muted-foreground">We accept USDC payments via Solana blockchain. Credit card payments are coming soon.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-lg font-medium mb-2">Can I get a refund?</h3>
                  <p className="text-muted-foreground">We offer a 7-day money-back guarantee. If you're not satisfied, contact our support team within 7 days of purchase.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-lg font-medium mb-2">Are there any transaction fees?</h3>
                  <p className="text-muted-foreground">We don't charge any additional transaction fees beyond the standard network fees for blockchain transactions.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      
      {/* Payment Form Dialog */}
      {selectedPlan && showPaymentForm && (
        <PaymentForm
          plan={selectedPlan}
          billingPeriod={billingPeriod}
          isOpen={showPaymentForm}
          onClose={handleClosePaymentForm}
          onSuccess={handlePaymentSuccess}
        />
      )}
      
      {/* Payment Confirmation Dialog */}
      {currentTransaction && showConfirmation && (
        <PaymentConfirmation
          transaction={currentTransaction}
          isOpen={showConfirmation}
          onClose={handleCloseConfirmation}
        />
      )}
    </div>
  );
};

export default Pricing;
