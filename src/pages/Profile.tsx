
import React, { useEffect, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FadeIn } from '@/components/transitions/FadeIn';
import { ConnectWallet } from '@/components/ui/ConnectWallet';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, WalletX, CreditCard, Shield, Bell } from 'lucide-react';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [walletType, setWalletType] = useState('');
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Get user email from auth
    const getUserEmail = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user?.email) {
        setEmail(data.user.email);
      }
    };

    // Get wallet info from custom table
    const getWalletInfo = async () => {
      if (user.id) {
        const { data, error } = await supabase
          .from('users')
          .select('wallet_address, wallet_type')
          .eq('id', user.id)
          .maybeSingle();
        
        if (!error && data) {
          setWalletAddress(data.wallet_address || '');
          setWalletType(data.wallet_type || '');
        }
      }
    };

    getUserEmail();
    getWalletInfo();
  }, [user, navigate]);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    setIsUpdatingPassword(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      
      if (error) throw error;
      
      toast.success('Password updated successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update password');
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    await logout();
    navigate('/');
    setIsLoading(false);
  };

  const shortenAddress = (address: string) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow mt-16">
        <section className="py-10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="mb-8">
                <h1 className="text-3xl font-bold">Profile Settings</h1>
                <p className="text-muted-foreground mt-1">
                  Manage your account preferences and wallet connections
                </p>
              </div>
              
              <div className="grid gap-8">
                <Tabs defaultValue="account" className="space-y-6">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="account" className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>Account</span>
                    </TabsTrigger>
                    <TabsTrigger value="wallet" className="flex items-center gap-1">
                      <WalletX className="h-4 w-4" />
                      <span>Wallet</span>
                    </TabsTrigger>
                    <TabsTrigger value="billing" className="flex items-center gap-1">
                      <CreditCard className="h-4 w-4" />
                      <span>Billing</span>
                    </TabsTrigger>
                    <TabsTrigger value="notifications" className="flex items-center gap-1">
                      <Bell className="h-4 w-4" />
                      <span>Notifications</span>
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="account">
                    <Card>
                      <CardHeader>
                        <CardTitle>Account Information</CardTitle>
                        <CardDescription>
                          Update your basic account information
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              readOnly
                              value={email}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="mt-6">
                      <CardHeader>
                        <CardTitle>Change Password</CardTitle>
                        <CardDescription>
                          Update your account password
                        </CardDescription>
                      </CardHeader>
                      <form onSubmit={handleUpdatePassword}>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-1 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="current-password">Current Password</Label>
                              <Input
                                id="current-password"
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="new-password">New Password</Label>
                              <Input
                                id="new-password"
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="confirm-password">Confirm New Password</Label>
                              <Input
                                id="confirm-password"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                              />
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Button variant="destructive" type="button" onClick={handleLogout} disabled={isLoading}>
                            {isLoading ? 'Logging out...' : 'Log Out'}
                          </Button>
                          <Button type="submit" disabled={isUpdatingPassword}>
                            {isUpdatingPassword ? 'Updating...' : 'Update Password'}
                          </Button>
                        </CardFooter>
                      </form>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="wallet">
                    <Card>
                      <CardHeader>
                        <CardTitle>Connected Wallet</CardTitle>
                        <CardDescription>
                          Manage your Web3 wallet connections
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="space-y-1">
                            {walletAddress ? (
                              <>
                                <div className="flex items-center gap-2">
                                  <p className="font-medium">
                                    {shortenAddress(walletAddress)}
                                  </p>
                                  <Badge className="bg-green-500/20 text-green-500">Connected</Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {walletType || 'Unknown wallet'}
                                </p>
                              </>
                            ) : (
                              <p className="text-muted-foreground">No wallet connected</p>
                            )}
                          </div>
                          <ConnectWallet />
                        </div>
                        
                        <div className="rounded-md bg-yellow-50 dark:bg-yellow-900/20 p-4">
                          <div className="flex items-start">
                            <Shield className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                            <div className="ml-3">
                              <h3 className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
                                Security Note
                              </h3>
                              <div className="mt-2 text-sm text-yellow-600 dark:text-yellow-400">
                                <p>
                                  Your wallet is used to sign transactions on the blockchain. We never store your private keys.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="billing">
                    <Card>
                      <CardHeader>
                        <CardTitle>Subscription Plan</CardTitle>
                        <CardDescription>
                          Manage your subscription and billing information
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center py-10">
                          <p className="text-muted-foreground">
                            You don't have any active subscriptions.
                          </p>
                          <Button className="mt-4">
                            Upgrade to Pro
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="notifications">
                    <Card>
                      <CardHeader>
                        <CardTitle>Notification Settings</CardTitle>
                        <CardDescription>
                          Manage how you receive notifications
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center py-10">
                          <p className="text-muted-foreground">
                            Notification settings coming soon.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
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
