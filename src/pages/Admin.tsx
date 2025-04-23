
import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FadeIn } from '@/components/transitions/FadeIn';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  LayoutDashboard,
  Users,
  FileText,
  Tag,
  SearchIcon,
  ListFilter,
  Check,
  X,
  PlusCircle,
  Package,
  CreditCard,
  BarChart3,
  Settings,
  ChevronDown
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface TemplateCategoryForm {
  name: string;
  description: string;
  icon?: string;
}

const AdminPanel = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<any[]>([]);
  const [newCategory, setNewCategory] = useState<TemplateCategoryForm>({
    name: '',
    description: '',
  });
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  // Auth check
  const { isLoading: isCheckingAdmin } = useQuery({
    queryKey: ['admin-check', user?.id],
    queryFn: async () => {
      if (!user) throw new Error("Not authenticated");
      
      // In a real implementation, you'd check if the user has admin rights
      // For now, we'll simulate this
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { isAdmin: true };
    },
    onError: () => {
      navigate('/login');
    }
  });

  // Fetch templates
  const { data: templates, isLoading: isLoadingTemplates } = useQuery({
    queryKey: ['admin-templates'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    enabled: !isCheckingAdmin,
  });

  // Fetch users
  const { data: users, isLoading: isLoadingUsers } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('auth.users')
        .select('*')
        .order('created_at', { ascending: false });
      
      // In a real implementation, this would be an admin-only endpoint
      // For demo purposes, we'll return mock data
      return [
        { id: '1', email: 'user1@example.com', created_at: new Date().toISOString() },
        { id: '2', email: 'user2@example.com', created_at: new Date().toISOString() },
        { id: '3', email: 'user3@example.com', created_at: new Date().toISOString() },
      ];
    },
    enabled: !isCheckingAdmin,
  });

  // Fetch transactions
  const { data: transactions, isLoading: isLoadingTransactions } = useQuery({
    queryKey: ['admin-transactions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    enabled: !isCheckingAdmin,
  });

  const handleAddCategory = () => {
    if (!newCategory.name) return;
    
    // In a real implementation, you'd save to the database
    setCategories([...categories, { ...newCategory, id: Date.now().toString() }]);
    setNewCategory({ name: '', description: '' });
  };

  const handleAddTag = () => {
    if (!newTag || tags.includes(newTag)) return;
    setTags([...tags, newTag]);
    setNewTag('');
  };

  if (isCheckingAdmin) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-col md:flex-row flex-1">
        {/* Sidebar */}
        <div className="bg-muted w-full md:w-64 p-4 space-y-4 border-r">
          <h2 className="font-bold text-xl mb-6">Admin Panel</h2>
          <nav className="space-y-2">
            <Button variant="ghost" className="w-full justify-start" asChild>
              <a href="#dashboard">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </a>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <a href="#users">
                <Users className="mr-2 h-4 w-4" />
                Users
              </a>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <a href="#templates">
                <FileText className="mr-2 h-4 w-4" />
                Templates
              </a>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <a href="#categories">
                <Package className="mr-2 h-4 w-4" />
                Categories
              </a>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <a href="#tags">
                <Tag className="mr-2 h-4 w-4" />
                Tags
              </a>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <a href="#payments">
                <CreditCard className="mr-2 h-4 w-4" />
                Payments
              </a>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <a href="#analytics">
                <BarChart3 className="mr-2 h-4 w-4" />
                Analytics
              </a>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <a href="#settings">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </a>
            </Button>
          </nav>
        </div>

        {/* Main content */}
        <main className="flex-grow p-6 overflow-auto">
          <FadeIn>
            <section id="dashboard" className="mb-10">
              <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
              
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Total Users
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {isLoadingUsers ? <Loader2 className="h-6 w-6 animate-spin" /> : users?.length || 0}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Total Templates
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {isLoadingTemplates ? <Loader2 className="h-6 w-6 animate-spin" /> : templates?.length || 0}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Revenue (Monthly)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$12,456</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Active Subscriptions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">843</div>
                  </CardContent>
                </Card>
              </div>
            </section>
            
            <section id="users" className="mb-10">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Users</h2>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search users..."
                      className="pl-8 w-[250px]"
                    />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <ListFilter className="mr-2 h-4 w-4" />
                        Filter
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>All Users</DropdownMenuItem>
                      <DropdownMenuItem>Premium Users</DropdownMenuItem>
                      <DropdownMenuItem>Free Tier</DropdownMenuItem>
                      <DropdownMenuItem>Recently Joined</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {isLoadingUsers ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-8">
                            <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                          </TableCell>
                        </TableRow>
                      ) : users?.map((user: any) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-mono text-xs">{user.id.slice(0, 8)}...</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              Active
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm" className="mr-2">View</Button>
                            <Button variant="outline" size="sm">Edit</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </section>
            
            <section id="categories" className="mb-10">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Template Categories</h2>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Category
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Add New Category</CardTitle>
                    <CardDescription>Create a new template category</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="category-name" className="text-sm font-medium">Name</label>
                      <Input
                        id="category-name"
                        value={newCategory.name}
                        onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                        placeholder="E.g., eCommerce, Portfolio"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="category-description" className="text-sm font-medium">Description</label>
                      <Input
                        id="category-description"
                        value={newCategory.description}
                        onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                        placeholder="Category description"
                      />
                    </div>
                    <Button onClick={handleAddCategory} className="w-full">
                      Add Category
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Existing Categories</CardTitle>
                    <CardDescription>Manage template categories</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex justify-between items-center p-2 border rounded">
                        <div>
                          <p className="font-medium">eCommerce</p>
                          <p className="text-sm text-muted-foreground">Templates for online stores</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm" className="text-destructive">Delete</Button>
                        </div>
                      </li>
                      <li className="flex justify-between items-center p-2 border rounded">
                        <div>
                          <p className="font-medium">Portfolio</p>
                          <p className="text-sm text-muted-foreground">Showcase your work</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm" className="text-destructive">Delete</Button>
                        </div>
                      </li>
                      {categories.map((category) => (
                        <li key={category.id} className="flex justify-between items-center p-2 border rounded">
                          <div>
                            <p className="font-medium">{category.name}</p>
                            <p className="text-sm text-muted-foreground">{category.description}</p>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">Edit</Button>
                            <Button variant="outline" size="sm" className="text-destructive">Delete</Button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>
            
            <section id="tags" className="mb-10">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Template Tags</h2>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Tag
                </Button>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Manage Tags</CardTitle>
                  <CardDescription>Add or remove tags for templates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-2 mb-4">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="New tag name"
                      className="max-w-xs"
                    />
                    <Button onClick={handleAddTag}>Add</Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Badge className="px-3 py-1">
                      Modern
                      <Button variant="ghost" size="sm" className="ml-1 h-4 w-4 p-0">
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                    <Badge className="px-3 py-1">
                      Crypto
                      <Button variant="ghost" size="sm" className="ml-1 h-4 w-4 p-0">
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                    <Badge className="px-3 py-1">
                      NFT
                      <Button variant="ghost" size="sm" className="ml-1 h-4 w-4 p-0">
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                    <Badge className="px-3 py-1">
                      Business
                      <Button variant="ghost" size="sm" className="ml-1 h-4 w-4 p-0">
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                    <Badge className="px-3 py-1">
                      Personal
                      <Button variant="ghost" size="sm" className="ml-1 h-4 w-4 p-0">
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                    {tags.map((tag) => (
                      <Badge key={tag} className="px-3 py-1">
                        {tag}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-1 h-4 w-4 p-0"
                          onClick={() => setTags(tags.filter(t => t !== tag))}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>
            
            <section id="payments" className="mb-10">
              <h2 className="text-2xl font-bold mb-6">Payment Transactions</h2>
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {isLoadingTransactions ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8">
                            <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                          </TableCell>
                        </TableRow>
                      ) : transactions?.slice(0, 5).map((tx: any) => (
                        <TableRow key={tx.id}>
                          <TableCell className="font-mono text-xs">
                            {typeof tx.id === 'string' ? tx.id.slice(0, 8) + '...' : tx.id}
                          </TableCell>
                          <TableCell>
                            {typeof tx.user_id === 'string' ? tx.user_id.slice(0, 8) + '...' : tx.user_id}
                          </TableCell>
                          <TableCell>
                            ${tx.amount} {tx.currency}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={tx.status === 'completed' ? 'default' : 'outline'}
                              className={
                                tx.status === 'completed'
                                  ? 'bg-green-600 hover:bg-green-600'
                                  : tx.status === 'failed'
                                  ? 'bg-red-100 text-red-800 border-red-200'
                                  : 'bg-yellow-100 text-yellow-800 border-yellow-200'
                              }
                            >
                              {tx.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {new Date(tx.created_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm">View</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </section>
          </FadeIn>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AdminPanel;
