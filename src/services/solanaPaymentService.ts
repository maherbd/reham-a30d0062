
import { toast } from 'sonner';
import { Transaction } from '@/types/template';
import { supabase } from '@/integrations/supabase/client';

interface PaymentVerificationResult {
  success: boolean;
  transactionId?: string;
  error?: string;
}

// Helius API endpoint for Solana blockchain interactions
const HELIUS_RPC_URL = "https://mainnet.helius-rpc.com/?api-key=897ffb78-8536-4874-a955-8a884ec9f5ed";

// Function to check if Phantom wallet is installed
export function isPhantomInstalled(): boolean {
  return window.solana && window.solana.isPhantom ? true : false;
}

// Function to connect to Phantom wallet
export async function connectPhantomWallet(): Promise<string | null> {
  try {
    if (!isPhantomInstalled()) {
      toast.error('Phantom wallet is not installed. Please install it from phantom.app');
      window.open('https://phantom.app/', '_blank');
      return null;
    }
    
    // Connect to wallet and get public key
    const resp = await window.solana.connect();
    const publicKey = resp.publicKey.toString();
    
    toast.success('Connected to Phantom wallet');
    return publicKey;
  } catch (error) {
    console.error('Error connecting to Phantom wallet:', error);
    toast.error('Failed to connect to Phantom wallet');
    return null;
  }
}

// Function to get SOL balance of a wallet
export async function getSOLBalance(publicKey: string): Promise<number> {
  try {
    const body = {
      "jsonrpc": "2.0",
      "id": 1,
      "method": "getBalance",
      "params": [publicKey]
    };

    const res = await fetch(HELIUS_RPC_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    const data = await res.json();
    const lamports = data.result?.value || 0;
    const sol = lamports / 1e9;
    return parseFloat(sol.toFixed(4));
  } catch (error) {
    console.error('Error fetching SOL balance:', error);
    return 0;
  }
}

export async function initiatePayment(transaction: Transaction): Promise<string | null> {
  try {
    // Check if Phantom wallet is installed
    if (!isPhantomInstalled()) {
      toast.error('Phantom wallet is not installed. Please install it from phantom.app');
      window.open('https://phantom.app/', '_blank');
      return null;
    }
    
    // Connect to wallet
    const walletAddress = await connectPhantomWallet();
    if (!walletAddress) {
      return null;
    }
    
    // In a real implementation, we would:
    // 1. Create a Solana transaction
    // 2. Request approval from the wallet
    // 3. Send the transaction to the blockchain
    
    // For demo purposes, we'll simulate a transaction ID
    // In a real implementation, this would be the actual transaction ID from the blockchain
    const paymentId = `sol_${Date.now()}_${Math.floor(Math.random() * 1000000)}`;
    
    // Update the transaction in the database with the payment ID
    await supabase
      .from('transactions')
      .update({
        payment_method: 'solana',
        status: 'processing',
        updated_at: new Date().toISOString()
      })
      .eq('id', transaction.id);
    
    return paymentId;
  } catch (error) {
    console.error('Error initiating payment:', error);
    toast.error('Failed to initiate payment process');
    return null;
  }
}

export async function verifyPayment(
  transactionId: string,
  expectedAmount: number,
  currency: string = 'USDC'
): Promise<PaymentVerificationResult> {
  try {
    // In a real implementation, we would:
    // 1. Query the Solana blockchain for the transaction
    // 2. Verify the transaction details (amount, recipient, etc.)
    
    // For demo purposes, we'll simulate a verification process
    if (transactionId.startsWith('sol_')) {
      // Simulate successful verification
      return {
        success: true,
        transactionId
      };
    }
    
    return {
      success: false,
      error: 'Invalid transaction ID'
    };
  } catch (error) {
    console.error('Error verifying payment:', error);
    return {
      success: false,
      error: 'Payment verification failed'
    };
  }
}

export async function completePayment(
  transactionId: string,
  transactionHash: string
): Promise<boolean> {
  try {
    // Update transaction status in the database
    const { error } = await supabase
      .from('transactions')
      .update({
        status: 'completed',
        transaction_hash: transactionHash,
        updated_at: new Date().toISOString()
      })
      .eq('id', transactionId);
      
    if (error) throw error;
    
    toast.success('Payment completed successfully!');
    return true;
  } catch (error) {
    console.error('Error completing payment:', error);
    toast.error('Failed to complete payment process');
    return false;
  }
}

// Global declaration for TypeScript
declare global {
  interface Window {
    solana: any;
  }
}
