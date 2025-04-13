
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { PricingPlan, Transaction } from '@/types/template';

export async function fetchPricingPlans(): Promise<PricingPlan[]> {
  try {
    const { data, error } = await supabase
      .from('pricing_plans')
      .select('*')
      .eq('is_active', true)
      .order('price_monthly', { ascending: true });

    if (error) {
      throw error;
    }

    // Parse features from JSON to array
    return data?.map(plan => ({
      ...plan,
      features: Array.isArray(plan.features) ? plan.features : JSON.parse(plan.features as unknown as string)
    })) || [];
  } catch (error) {
    console.error('Error fetching pricing plans:', error);
    toast.error('Failed to load pricing plans');
    return [];
  }
}

export async function fetchPricingPlanById(planId: string): Promise<PricingPlan | null> {
  try {
    const { data, error } = await supabase
      .from('pricing_plans')
      .select('*')
      .eq('id', planId)
      .maybeSingle();

    if (error) {
      throw error;
    }

    if (!data) return null;

    // Parse features from JSON to array
    return {
      ...data,
      features: Array.isArray(data.features) ? data.features : JSON.parse(data.features as unknown as string)
    };
  } catch (error) {
    console.error(`Error fetching pricing plan with ID ${planId}:`, error);
    toast.error('Failed to load pricing plan details');
    return null;
  }
}

export async function createTransaction(
  userId: string,
  planId: string,
  amount: number,
  currency: string = 'USDC',
  paymentMethod: string = 'solana'
): Promise<Transaction | null> {
  try {
    const { data, error } = await supabase
      .from('transactions')
      .insert({
        user_id: userId,
        plan_id: planId,
        amount,
        currency,
        payment_method: paymentMethod,
        status: 'pending'
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error creating transaction:', error);
    toast.error('Failed to create transaction');
    return null;
  }
}

export async function updateTransactionStatus(
  transactionId: string,
  status: 'pending' | 'completed' | 'failed',
  transactionHash?: string
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('transactions')
      .update({
        status,
        transaction_hash: transactionHash,
        updated_at: new Date().toISOString()
      })
      .eq('id', transactionId);

    if (error) {
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Error updating transaction status:', error);
    toast.error('Failed to update transaction status');
    return false;
  }
}

export async function fetchUserTransactions(userId: string): Promise<Transaction[]> {
  try {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching user transactions:', error);
    toast.error('Failed to load transactions');
    return [];
  }
}
