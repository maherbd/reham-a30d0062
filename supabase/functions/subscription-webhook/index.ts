
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

// Get environment variables
const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const webhookSecret = Deno.env.get("SUBSCRIPTION_WEBHOOK_SECRET") || "";

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
    console.log("Received subscription webhook payload:", payload);

    // Process based on event type
    switch (payload.event) {
      case "subscription.created":
        await handleSubscriptionCreated(payload);
        break;
      case "subscription.renewed":
        await handleSubscriptionRenewed(payload);
        break;
      case "subscription.expiring":
        await handleSubscriptionExpiring(payload);
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

// Handle subscription created event
async function handleSubscriptionCreated(payload: any) {
  const { subscription_id, user_id, plan_id, end_date, transaction_hash } = payload.data;
  
  // Create subscription record
  const { error } = await supabase
    .from('user_subscriptions')
    .insert({
      id: subscription_id,
      user_id,
      plan_id,
      start_date: new Date().toISOString(),
      end_date,
      transaction_hash,
      status: 'active'
    });

  if (error) {
    console.error("Error creating subscription:", error);
    throw error;
  }

  // Send welcome email or notification
  await sendSubscriptionNotification(user_id, "welcome");

  console.log(`New subscription ${subscription_id} created for user ${user_id}`);
}

// Handle subscription renewed event
async function handleSubscriptionRenewed(payload: any) {
  const { subscription_id, user_id, plan_id, renewed_until, transaction_hash } = payload.data;
  
  // Update subscription in database
  const { error } = await supabase
    .from('user_subscriptions')
    .update({
      end_date: renewed_until,
      status: 'active',
      transaction_hash,
      updated_at: new Date().toISOString()
    })
    .eq('id', subscription_id);

  if (error) {
    console.error("Error renewing subscription:", error);
    throw error;
  }

  // Send renewal confirmation email/notification
  await sendSubscriptionNotification(user_id, "renewal");

  console.log(`Subscription ${subscription_id} renewed until ${renewed_until}`);
}

// Handle subscription expiring event (sent a few days before expiration)
async function handleSubscriptionExpiring(payload: any) {
  const { subscription_id, user_id, expiry_date } = payload.data;
  
  // Update subscription status to "expiring"
  const { error } = await supabase
    .from('user_subscriptions')
    .update({
      status: 'expiring',
      updated_at: new Date().toISOString()
    })
    .eq('id', subscription_id);

  if (error) {
    console.error("Error updating expiring subscription:", error);
    throw error;
  }

  // Send expiration reminder email/notification
  await sendSubscriptionNotification(user_id, "expiring", expiry_date);

  console.log(`Subscription ${subscription_id} expiring on ${expiry_date}`);
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

  // Get user_id for notification
  const { data: subscription } = await supabase
    .from('user_subscriptions')
    .select('user_id')
    .eq('id', subscription_id)
    .single();

  if (subscription) {
    // Send cancellation confirmation email/notification
    await sendSubscriptionNotification(subscription.user_id, "cancelled");
  }

  console.log(`Subscription ${subscription_id} cancelled`);
}

// Helper function to send notifications to users
async function sendSubscriptionNotification(user_id: string, type: "welcome" | "renewal" | "expiring" | "cancelled", date?: string) {
  // In a real implementation, this would send emails or push notifications
  // For demo purposes, we'll just log the notification
  console.log(`Sending ${type} notification to user ${user_id}${date ? ` for date ${date}` : ''}`);
  
  // Could integrate with a notification service here
  // Example: await sendEmail(user_id, type, { date });
  
  return true;
}
