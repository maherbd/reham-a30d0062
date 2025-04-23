
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

// Get environment variables
const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const webhookSecret = Deno.env.get("PAYMENT_WEBHOOK_SECRET") || "";

// Initialize Supabase client with service role key
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
  },
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate the webhook signature if needed
    const signature = req.headers.get("x-webhook-signature") || "";
    if (!validateSignature(signature, webhookSecret)) {
      return new Response(
        JSON.stringify({ error: "Invalid signature" }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Parse the request body
    const payload = await req.json();
    console.log("Received webhook payload:", payload);

    // Process based on event type
    switch (payload.event) {
      case "payment.succeeded":
        await handlePaymentSucceeded(payload);
        break;
      case "subscription.renewed":
        await handleSubscriptionRenewed(payload);
        break;
      case "subscription.canceled":
        await handleSubscriptionCancelled(payload);
        break;
      default:
        console.log(`Unhandled event type: ${payload.event}`);
    }

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error processing webhook:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

// Validate webhook signature
function validateSignature(signature: string, secret: string): boolean {
  // In a real implementation, you'd validate the signature here
  // This is a placeholder implementation
  return true; // For demo purposes
}

// Handle payment succeeded event
async function handlePaymentSucceeded(payload: any) {
  const { transaction_id, user_id, amount, currency } = payload.data;
  
  // Update transaction status in database
  const { error } = await supabase
    .from('transactions')
    .update({
      status: 'completed',
      updated_at: new Date().toISOString()
    })
    .eq('id', transaction_id);

  if (error) {
    console.error("Error updating transaction:", error);
    throw error;
  }

  console.log(`Payment succeeded for transaction ${transaction_id}`);
}

// Handle subscription renewed event
async function handleSubscriptionRenewed(payload: any) {
  const { subscription_id, user_id, plan_id, renewed_until } = payload.data;
  
  // Update subscription in database
  const { error } = await supabase
    .from('user_subscriptions')
    .update({
      end_date: renewed_until,
      status: 'active',
      updated_at: new Date().toISOString()
    })
    .eq('id', subscription_id);

  if (error) {
    console.error("Error updating subscription:", error);
    throw error;
  }

  console.log(`Subscription ${subscription_id} renewed until ${renewed_until}`);
}

// Handle subscription cancelled event
async function handleSubscriptionCancelled(payload: any) {
  const { subscription_id } = payload.data;
  
  // Update subscription status in database
  const { error } = await supabase
    .from('user_subscriptions')
    .update({
      status: 'cancelled',
      updated_at: new Date().toISOString()
    })
    .eq('id', subscription_id);

  if (error) {
    console.error("Error cancelling subscription:", error);
    throw error;
  }

  console.log(`Subscription ${subscription_id} cancelled`);
}
