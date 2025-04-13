
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { FadeIn } from '@/components/transitions/FadeIn';
import { connectWallet } from '@/utils/Web3Utils';

const formSchema = z.object({
  email: z.string().email().optional(),
  currentPassword: z.string().min(1, 'Current password is required').optional(),
  newPassword: z.string().min(6, 'Password must be at least 6 characters').optional(),
  confirmPassword: z.string().optional(),
}).refine((data) => !data.newPassword || data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingWallet, setLoadingWallet] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });
  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!values.currentPassword || !values.newPassword) {
      toast.error('Please provide both current and new password');
      return;
    }
    
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: values.newPassword
      });
      
      if (error) throw error;
      
      toast.success('Password updated successfully');
      form.reset();
    } catch (error: any) {
      console.error('Error updating password:', error);
      toast.error(error.message || 'Error updating password');
    } finally {
      setLoading(false);
    }
  };
  
  const handleConnectWallet = async () => {
    setLoadingWallet(true);
    try {
      const walletData = await connectWallet();
      if (walletData) {
        toast.success('Wallet connected successfully');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      toast.error('Failed to connect wallet');
    } finally {
      setLoadingWallet(false);
    }
  };
  
  const handleLogout = async () => {
    await logout();
    navigate('/');
  };
  
  if (!user) {
    navigate('/login');
    return null;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow mt-16">
        <section className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <FadeIn>
              <div className="mb-8">
                <h1 className="text-3xl font-bold">Profile Settings</h1>
                <p className="text-muted-foreground mt-2">Manage your account settings and preferences</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="md:col-span-2 border-border/40">
                  <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                    <CardDescription>Update your account settings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Your email address"
                                  disabled
                                  value={user.email || 'No email provided'}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Separator className="my-6" />
                        
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">Change Password</h3>
                          
                          <FormField
                            control={form.control}
                            name="currentPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Current Password</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter current password"
                                    type="password"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="newPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>New Password</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter new password"
                                    type="password"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Confirm New Password</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Confirm new password"
                                    type="password"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <Button
                          type="submit"
                          disabled={loading}
                        >
                          {loading ? 'Updating...' : 'Update Password'}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
                
                <div className="space-y-6">
                  <Card className="border-border/40">
                    <CardHeader>
                      <CardTitle>Wallet</CardTitle>
                      <CardDescription>Connect your Web3 wallet</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {user.wallet_address ? (
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Connected Wallet:</p>
                          <p className="text-sm text-muted-foreground break-all bg-secondary/50 p-2 rounded-md">
                            {user.wallet_address}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {user.blockchain} • {user.wallet_type}
                          </p>
                        </div>
                      ) : (
                        <Button
                          className="w-full"
                          onClick={handleConnectWallet}
                          disabled={loadingWallet}
                        >
                          {loadingWallet ? 'Connecting...' : 'Connect Wallet'}
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                  
                  <Card className="border-border/40">
                    <CardHeader>
                      <CardTitle>Danger Zone</CardTitle>
                      <CardDescription>Critical account actions</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button
                        variant="destructive"
                        className="w-full"
                        onClick={handleLogout}
                      >
                        Log Out
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full text-destructive border-destructive hover:bg-destructive/10"
                      >
                        Delete Account
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
