
import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useQuery } from '@tanstack/react-query';
import { fetchTemplates } from '@/services/templateService';
import { useAuth } from '@/hooks/useAuth';
import { Loader2, Search, Settings, RefreshCw, Download, CalendarCheck, ShieldCheck } from 'lucide-react';

export function AdminPanel() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Fetch templates
  const { data: templates, isLoading: isLoadingTemplates } = useQuery({
    queryKey: ['admin-templates'],
    queryFn: fetchTemplates,
  });
  
  // Mock data for users
  const mockUsers = [
    { id: '1', email: 'user1@example.com', name: 'User One', plan: 'Professional', status: 'active', websites: 3, created: '2025-03-01' },
    { id: '2', email: 'user2@example.com', name: 'User Two', plan: 'Basic', status: 'active', websites: 1, created: '2025-03-05' },
    { id: '3', email: 'user3@example.com', name: 'User Three', plan: 'Free', status: 'inactive', websites: 1, created: '2025-03-10' },
    { id: '4', email: 'user4@example.com', name: 'User Four', plan: 'Enterprise', status: 'active', websites: 8, created: '2025-03-15' },
    { id: '5', email: 'user5@example.com', name: 'User Five', plan: 'Professional', status: 'active', websites: 2, created: '2025-03-20' },
  ];
  
  // Mock data for transactions
  const mockTransactions = [
    { id: 't1', userId: '1', amount: 49.99, status: 'completed', date: '2025-04-01', plan: 'Professional', method: 'Credit Card' },
    { id: 't2', userId: '4', amount: 199.99, status: 'completed', date: '2025-04-02', plan: 'Enterprise', method: 'PayPal' },
    { id: 't3', userId: '2', amount: 19.99, status: 'completed', date: '2025-04-05', plan: 'Basic', method: 'Solana' },
    { id: 't4', userId: '5', amount: 49.99, status: 'pending', date: '2025-04-10', plan: 'Professional', method: 'Solana' },
    { id: 't5', userId: '3', amount: 19.99, status: 'failed', date: '2025-04-12', plan: 'Basic', method: 'Credit Card' },
  ];
  
  // Filter users based on search query
  const filteredUsers = mockUsers.filter(user => 
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow mt-16 py-12 flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-center">Access Denied</CardTitle>
              <CardDescription className="text-center">
                You need to be logged in as an administrator to view this page.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Button onClick={() => window.location.href = '/login'}>
                Log In
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow mt-16 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold">Admin Panel</h1>
                <p className="mt-1 text-muted-foreground">
                  Manage users, templates, and platform settings
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    type="text"
                    placeholder="Search users..."
                    className="pl-10 w-64"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <Button variant="outline">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard 
                title="Total Users" 
                value="1,245" 
                change={+8}
                label="Last 30 days"
              />
              <StatCard 
                title="Active Websites" 
                value="3,621" 
                change={+12}
                label="Published sites"
              />
              <StatCard 
                title="Monthly Revenue" 
                value="$12,840" 
                change={+23}
                label="This month"
              />
            </div>
            
            <Tabs defaultValue="users" className="w-full">
              <TabsList>
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="templates">Templates</TabsTrigger>
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
                <TabsTrigger value="settings">Platform Settings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="users" className="mt-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>User Management</CardTitle>
                      <CardDescription>View and manage user accounts</CardDescription>
                    </div>
                    <Button>
                      <Download className="mr-2 h-4 w-4" />
                      Export Users
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Plan</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Websites</TableHead>
                          <TableHead>Created</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredUsers.map(user => (
                          <TableRow key={user.id}>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.plan}</TableCell>
                            <TableCell>
                              <Badge 
                                variant={user.status === 'active' ? 'default' : 'secondary'}
                                className={user.status === 'active' ? 'bg-green-600' : ''}
                              >
                                {user.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{user.websites}</TableCell>
                            <TableCell>{user.created}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm">
                                  View
                                </Button>
                                <Button variant="ghost" size="sm">
                                  Edit
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="templates" className="mt-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Template Management</CardTitle>
                      <CardDescription>Manage website templates</CardDescription>
                    </div>
                    <Button>Add New Template</Button>
                  </CardHeader>
                  <CardContent>
                    {isLoadingTemplates ? (
                      <div className="flex justify-center py-8">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                      </div>
                    ) : (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Premium</TableHead>
                            <TableHead>Uses</TableHead>
                            <TableHead>Created</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {templates?.map(template => (
                            <TableRow key={template.id}>
                              <TableCell>{template.name}</TableCell>
                              <TableCell>{template.category}</TableCell>
                              <TableCell>
                                {template.is_premium ? (
                                  <Badge className="bg-blue-600">Premium</Badge>
                                ) : (
                                  <Badge variant="outline">Free</Badge>
                                )}
                              </TableCell>
                              <TableCell>{template.popularity || 0}</TableCell>
                              <TableCell>
                                {template.created_at && new Date(template.created_at).toLocaleDateString()}
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Button variant="ghost" size="sm">
                                    Edit
                                  </Button>
                                  <Button variant="ghost" size="sm" className="text-red-600">
                                    Delete
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="transactions" className="mt-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Transaction History</CardTitle>
                      <CardDescription>View all payment transactions</CardDescription>
                    </div>
                    <Button>
                      <Download className="mr-2 h-4 w-4" />
                      Export CSV
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>User</TableHead>
                          <TableHead>Plan</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Method</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockTransactions.map(tx => {
                          const user = mockUsers.find(u => u.id === tx.userId);
                          return (
                            <TableRow key={tx.id}>
                              <TableCell>{tx.date}</TableCell>
                              <TableCell>{user?.email || tx.userId}</TableCell>
                              <TableCell>{tx.plan}</TableCell>
                              <TableCell>${tx.amount}</TableCell>
                              <TableCell>{tx.method}</TableCell>
                              <TableCell>
                                <Badge 
                                  variant={
                                    tx.status === 'completed' ? 'default' : 
                                    tx.status === 'pending' ? 'outline' : 'destructive'
                                  }
                                  className={tx.status === 'completed' ? 'bg-green-600' : ''}
                                >
                                  {tx.status}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Button variant="ghost" size="sm">
                                  Details
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="settings" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Platform Settings</CardTitle>
                    <CardDescription>Configure global platform settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium flex items-center gap-2">
                        <Settings className="h-5 w-5" />
                        General Settings
                      </h3>
                      <Separator />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="platform-name">Platform Name</Label>
                          <Input id="platform-name" defaultValue="Lovable" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="support-email">Support Email</Label>
                          <Input id="support-email" defaultValue="support@lovable.app" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="max-free-websites">Max Free Websites</Label>
                          <Input id="max-free-websites" type="number" defaultValue="1" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="max-file-size">Max Upload Size (MB)</Label>
                          <Input id="max-file-size" type="number" defaultValue="10" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium flex items-center gap-2">
                        <CalendarCheck className="h-5 w-5" />
                        Maintenance
                      </h3>
                      <Separator />
                      
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Maintenance Mode</p>
                            <p className="text-sm text-muted-foreground">
                              Enable maintenance mode to temporarily disable access to the platform.
                            </p>
                          </div>
                          <Button variant="destructive">Enable Maintenance Mode</Button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Clear Cache</p>
                            <p className="text-sm text-muted-foreground">
                              Clear the platform cache to refresh data.
                            </p>
                          </div>
                          <Button variant="outline">Clear Cache</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium flex items-center gap-2">
                        <ShieldCheck className="h-5 w-5" />
                        Security
                      </h3>
                      <Separator />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                          <Input id="session-timeout" type="number" defaultValue="60" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="max-login-attempts">Max Login Attempts</Label>
                          <Input id="max-login-attempts" type="number" defaultValue="5" />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Force Password Reset</p>
                          <p className="text-sm text-muted-foreground">
                            Force all users to reset their passwords on next login.
                          </p>
                        </div>
                        <Button variant="outline" className="text-red-600">Force Reset</Button>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <Button>Save Settings</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  change?: number;
  label: string;
}

function StatCard({ title, value, change, label }: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-2">
          <p className="text-muted-foreground">{title}</p>
          <div className="flex items-baseline justify-between">
            <p className="text-3xl font-bold">{value}</p>
            {change !== undefined && (
              <div className={`text-sm ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {change >= 0 ? `+${change}%` : `${change}%`}
              </div>
            )}
          </div>
          <p className="text-xs text-muted-foreground">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default AdminPanel;
