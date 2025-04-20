
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FadeIn } from '@/components/transitions/FadeIn';
import { SubscriptionManager } from '@/components/subscription/SubscriptionManager';
import { PricingPlan } from '@/types/template';
import { fetchPricingPlans } from '@/services/pricingService';
import { useAuth } from '@/hooks/useAuth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Receipt } from '@/components/pricing/Receipt';
import { Loader2 } from 'lucide-react';

const SubscriptionManagement = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [currentPlan, setCurrentPlan] = useState<PricingPlan | null>(null);
  const [subscriptionEnd, setSubscriptionEnd] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is logged in
    if (!user) {
      navigate('/login');
      return;
    }
    
    window.scrollTo(0, 0);
    
    // Load pricing plans
    const loadData = async () => {
      setLoading(true);
      try {
        const pricingPlans = await fetchPricingPlans();
        setPlans(pricingPlans);
        
        // In a real app, you'd fetch the user's current subscription from your backend
        // For this demo, we'll simulate this with a timeout
        setTimeout(() => {
          // Simulate having the Premium plan
          const premiumPlan = pricingPlans.find(p => p.name === 'Premium');
          if (premiumPlan) {
            setCurrentPlan(premiumPlan);
            
            // Set subscription end to 30 days from now
            const endDate = new Date();
            endDate.setDate(endDate.getDate() + 30);
            setSubscriptionEnd(endDate.toISOString());
          }
          
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error loading subscription data:', error);
        setLoading(false);
      }
    };
    
    loadData();
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow mt-16">
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <h1 className="text-3xl md:text-4xl font-bold">Subscription Management</h1>
              <p className="mt-2 text-lg text-muted-foreground">
                Manage your subscription, billing information, and payment history.
              </p>
            </FadeIn>
            
            <div className="mt-12">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                  <p className="text-muted-foreground">Loading subscription information...</p>
                </div>
              ) : (
                <Tabs defaultValue="subscription">
                  <TabsList className="mb-8">
                    <TabsTrigger value="subscription">Subscription</TabsTrigger>
                    <TabsTrigger value="receipts">Receipts</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="subscription">
                    <SubscriptionManager 
                      currentPlan={currentPlan}
                      subscriptionEnd={subscriptionEnd}
                      plans={plans}
                    />
                  </TabsContent>
                  
                  <TabsContent value="receipts">
                    {/* This would normally show a list of receipts */}
                    {/* For demo purposes, we'll just show a simulated receipt */}
                    <Receipt 
                      transaction={{
                        id: '123e4567-e89b-12d3-a456-426614174000',
                        user_id: user?.id || '',
                        plan_id: currentPlan?.id || '',
                        amount: currentPlan?.price_monthly || 0,
                        currency: 'USDC',
                        status: 'completed',
                        payment_method: 'solana',
                        created_at: new Date().toISOString(),
                        updated_at: new Date().toISOString()
                      }}
                    />
                  </TabsContent>
                </Tabs>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SubscriptionManagement;
