
import React from 'react';
import { PricingPlan } from '@/types/template';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface PricingCardProps {
  plan: PricingPlan;
  billingPeriod: 'monthly' | 'yearly';
  onSelectPlan: (plan: PricingPlan) => void;
}

export function PricingCard({ plan, billingPeriod, onSelectPlan }: PricingCardProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const price = billingPeriod === 'monthly' ? plan.price_monthly : plan.price_yearly;

  const handleSelectPlan = () => {
    if (!user) {
      navigate('/login?redirect=/pricing');
      return;
    }
    
    onSelectPlan(plan);
  };

  return (
    <Card className={cn(
      "flex flex-col",
      plan.is_popular && "border-primary shadow-lg"
    )}>
      {plan.is_popular && (
        <div className="bg-primary text-primary-foreground py-1 px-4 text-xs font-medium text-center">
          MOST POPULAR
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-xl">{plan.name}</CardTitle>
        <CardDescription>{plan.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="mb-4">
          <span className="text-3xl font-bold">${price}</span>
          <span className="text-muted-foreground">/{billingPeriod === 'monthly' ? 'month' : 'year'}</span>
        </div>
        <ul className="space-y-2">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSelectPlan}
          className="w-full" 
          variant={plan.is_popular ? "default" : "outline"}
        >
          Get Started
        </Button>
      </CardFooter>
    </Card>
  );
}
