
import React, { useEffect, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { FadeIn, FadeInStagger } from '@/components/transitions/FadeIn';
import { Check } from 'lucide-react';
import { PricingPlan, Transaction } from '@/types/template';
import { fetchPricingPlans } from '@/services/pricingService';
import { PricingCard } from '@/components/pricing/PricingCard';
import { Skeleton } from '@/components/ui/skeleton';
import { PaymentForm } from '@/components/pricing/PaymentForm';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { PaymentConfirmation } from '@/components/pricing/PaymentConfirmation';

const Pricing = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const loadPlans = async () => {
      setLoading(true);
      const pricingPlans = await fetchPricingPlans();
      setPlans(pricingPlans);
      setLoading(false);
    };

    loadPlans();
  }, []);

  const toggleBillingPeriod = () => {
    setBillingPeriod(prev => prev === 'monthly' ? 'yearly' : 'monthly');
  };

  const handleSelectPlan = (plan: PricingPlan) => {
    setSelectedPlan(plan);
    setPaymentDialogOpen(true);
  };
  
  const handlePaymentSuccess = (transaction: Transaction) => {
    setTransaction(transaction);
    setPaymentDialogOpen(false);
    setShowConfirmation(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow mt-16">
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="text-center">
                <h1 className="text-3xl md:text-5xl font-bold">Simple, transparent pricing</h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                  Choose the perfect plan for your Web3 project and start building today.
                </p>

                <div className="mt-10 flex items-center justify-center gap-2">
                  <Label htmlFor="billing-toggle" className={billingPeriod === 'monthly' ? 'font-medium' : ''}>
                    Monthly
                  </Label>
                  <Switch
                    id="billing-toggle"
                    checked={billingPeriod === 'yearly'}
                    onCheckedChange={toggleBillingPeriod}
                  />
                  <Label htmlFor="billing-toggle" className={billingPeriod === 'yearly' ? 'font-medium' : ''}>
                    Yearly <span className="text-xs text-green-500 font-normal">(20% off)</span>
                  </Label>
                </div>
              </div>
            </FadeIn>

            <div className="mt-16">
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-[500px] rounded-xl" />
                  ))}
                </div>
              ) : (
                <FadeInStagger className="grid grid-cols-1 md:grid-cols-3 gap-8" staggerDelay={100}>
                  {plans.map((plan) => (
                    <PricingCard
                      key={plan.id}
                      plan={plan}
                      billingPeriod={billingPeriod}
                      onSelectPlan={handleSelectPlan}
                    />
                  ))}
                </FadeInStagger>
              )}
            </div>

            <FadeIn delay={300}>
              <div className="mt-24 bg-muted/50 rounded-lg p-8 border border-border">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="flex-grow">
                    <h2 className="text-xl font-semibold">Need a custom plan?</h2>
                    <p className="mt-1 text-muted-foreground">
                      Contact our team for custom pricing and enterprise solutions.
                    </p>
                  </div>
                  <Button asChild size="lg">
                    <a href="mailto:contact@reham.org">Contact Us</a>
                  </Button>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={400}>
              <div className="mt-24">
                <h2 className="text-2xl font-bold text-center">Frequently Asked Questions</h2>
                <div className="mt-12 grid gap-8 md:grid-cols-2">
                  {faqs.map((faq, index) => (
                    <div key={index} className="space-y-2">
                      <h3 className="text-lg font-medium">{faq.question}</h3>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />

      <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
        <DialogContent className="sm:max-w-md">
          {selectedPlan && (
            <PaymentForm 
              plan={selectedPlan} 
              billingPeriod={billingPeriod}
              isOpen={paymentDialogOpen}
              onClose={() => setPaymentDialogOpen(false)}
              onSuccess={handlePaymentSuccess}
            />
          )}
        </DialogContent>
      </Dialog>
      
      {transaction && (
        <PaymentConfirmation 
          transaction={transaction}
          isOpen={showConfirmation}
          onClose={() => setShowConfirmation(false)}
        />
      )}
    </div>
  );
};

const faqs = [
  {
    question: 'How does billing work?',
    answer: 'We accept USDC payments via Solana blockchain. You can pay monthly or save 20% with annual billing.'
  },
  {
    question: 'Can I change my plan later?',
    answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be prorated.'
  },
  {
    question: 'Is there a free trial?',
    answer: 'We offer a 14-day free trial on all plans. No credit card required.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'Currently, we accept USDC payments via Solana blockchain. More payment options coming soon.'
  },
  {
    question: 'Can I cancel my subscription?',
    answer: 'Yes, you can cancel your subscription at any time. No refunds for partial billing periods.'
  },
  {
    question: 'How do I get support?',
    answer: 'All plans include access to our community support. Premium plans include priority support via email and chat.'
  }
];

export default Pricing;
