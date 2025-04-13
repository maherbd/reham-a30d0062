
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface User {
  id: string;
  wallet_address?: string;
  wallet_type?: string;
  blockchain?: string;
  email?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  connectWallet: (wallet_address: string, wallet_type: string, blockchain: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active session
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          const { data: userData, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single();
            
          if (!error && userData) {
            setUser({
              id: session.user.id,
              ...userData
            });
          }
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkSession();
    
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session && event === 'SIGNED_IN') {
          const { data: userData, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single();
            
          if (!error && userData) {
            setUser({
              id: session.user.id,
              ...userData
            });
          } else {
            setUser({
              id: session.user.id
            });
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
      }
    );
    
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      toast.success('Logged in successfully');
      return true;
    } catch (error: any) {
      toast.error(error.message || 'Error logging in');
      return false;
    }
  };
  
  const signup = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) throw error;
      toast.success('Signed up successfully! Check your email to confirm your account.');
      return true;
    } catch (error: any) {
      toast.error(error.message || 'Error signing up');
      return false;
    }
  };
  
  const logout = async () => {
    try {
      await supabase.auth.signOut();
      toast.info('Logged out');
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Error logging out');
    }
  };
  
  const connectWallet = async (wallet_address: string, wallet_type: string, blockchain: string) => {
    try {
      if (user) {
        // Update existing user with wallet info
        const { error } = await supabase
          .from('users')
          .update({
            wallet_address,
            wallet_type,
            blockchain
          })
          .eq('id', user.id);
          
        if (error) throw error;
        
        setUser(prev => prev ? {
          ...prev,
          wallet_address,
          wallet_type,
          blockchain
        } : null);
        
        toast.success('Wallet connected successfully');
        return true;
      } else {
        // Create new user with wallet info
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: `${wallet_address.substring(0, 8)}@wallet.user`,
          password: `${wallet_address}${Date.now()}`
        });
        
        if (authError) throw authError;
        
        if (authData.user) {
          const { error: userError } = await supabase
            .from('users')
            .insert({
              id: authData.user.id,
              wallet_address,
              wallet_type,
              blockchain
            });
            
          if (userError) throw userError;
          
          setUser({
            id: authData.user.id,
            wallet_address,
            wallet_type,
            blockchain
          });
          
          toast.success('Wallet connected and account created');
          return true;
        }
      }
      return false;
    } catch (error: any) {
      console.error('Error connecting wallet:', error);
      toast.error(error.message || 'Error connecting wallet');
      return false;
    }
  };
  
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        connectWallet
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
