
import React, { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const AdminPanel = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Check if user is admin
  const checkAdmin = async () => {
    try {
      // In a real app, this would check against an admin role in the database
      // For demo purposes, we'll just check for a specific email domain
      if (!user || !user.email) {
        return { isAdmin: false };
      }
      // For demonstration purposes only - in a real app, use proper role-based authorization
      const isAdmin = user.email.endsWith('@admin.com') || user.email === 'admin@example.com';
      return { isAdmin };
    } catch (error) {
      console.error('Error checking admin status:', error);
      return { isAdmin: false };
    }
  };

  // Use React Query to check admin status
  const { data: adminStatus, isLoading: checkingAdmin } = useQuery({
    queryKey: ['adminCheck', user?.id],
    queryFn: checkAdmin,
    enabled: !!user,
    meta: {
      onError: (error: any) => {
        toast.error('Failed to check admin status');
        console.error(error);
      }
    }
  });

  // Redirect non-admin users to the dashboard
  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (!checkingAdmin && adminStatus && !adminStatus.isAdmin) {
      toast.error('You do not have admin privileges.');
      navigate('/dashboard');
    }
  }, [user, adminStatus, checkingAdmin, navigate]);

  // Fetch users for the User Management tab
  const fetchUsers = async () => {
    try {
      // For demo purposes, we'll use the public.users table instead of auth.users
      // In a real app with proper permissions, you could access auth.users
      const { data, error } = await supabase
        .from('users')
        .select('*');
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load users');
      return [];
    }
  };

  // Template management
  const [templates, setTemplates] = useState([]);
  const [templateModalOpen, setTemplateModalOpen] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState(null);

  // Category and tag management
  const [categories, setCategories] = useState([
    'meme', 'nft', 'dao', 'defi', 'gamefi', 'social'
  ]);
  const [newCategory, setNewCategory] = useState('');
  const [tags, setTags] = useState([
    'Trending', 'New', 'Popular', 'Featured', 'Community', 'Premium'
  ]);
  const [newTag, setNewTag] = useState('');

  const addCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory('');
      toast.success('Category added successfully');
    } else if (categories.includes(newCategory)) {
      toast.error('Category already exists');
    }
  };

  const removeCategory = (category) => {
    setCategories(categories.filter(c => c !== category));
    toast.success('Category removed successfully');
  };

  const addTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag('');
      toast.success('Tag added successfully');
    } else if (tags.includes(newTag)) {
      toast.error('Tag already exists');
    }
  };

  const removeTag = (tag) => {
    setTags(tags.filter(t => t !== tag));
    toast.success('Tag removed successfully');
  };

  // Fetch templates
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const { data, error } = await supabase
          .from('templates')
          .select('*');
        
        if (error) throw error;
        setTemplates(data || []);
      } catch (error) {
        console.error('Error fetching templates:', error);
        toast.error('Failed to load templates');
      }
    };

    fetchTemplates();
  }, []);

  const handleEditTemplate = (template) => {
    setCurrentTemplate(template);
    setTemplateModalOpen(true);
  };

  const handleUpdateTemplate = async () => {
    if (!currentTemplate) return;
    
    try {
      const { error } = await supabase
        .from('templates')
        .update({
          name: currentTemplate.name,
          description: currentTemplate.description,
          category: currentTemplate.category,
          is_premium: currentTemplate.is_premium
        })
        .eq('id', currentTemplate.id);
      
      if (error) throw error;
      
      setTemplates(templates.map(t => 
        t.id === currentTemplate.id ? currentTemplate : t
      ));
      
      setTemplateModalOpen(false);
      toast.success('Template updated successfully');
    } catch (error) {
      console.error('Error updating template:', error);
      toast.error('Failed to update template');
    }
  };

  if (!user || checkingAdmin) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow mt-16 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
            <p>Loading...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!adminStatus?.isAdmin) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow mt-16 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
          
          <Tabs defaultValue="templates" className="space-y-6">
            <TabsList className="grid grid-cols-4 sm:grid-cols-5 gap-2">
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="categories">Categories & Tags</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="templates" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Template Management</CardTitle>
                  <CardDescription>
                    Manage website templates available to users
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-end mb-4">
                    <Button variant="default">
                      Add New Template
                    </Button>
                  </div>
                  <Table>
                    <TableCaption>List of available templates</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Premium</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {templates.map((template) => (
                        <TableRow key={template.id}>
                          <TableCell>{template.name}</TableCell>
                          <TableCell>{template.category}</TableCell>
                          <TableCell>
                            {template.is_premium ? (
                              <Badge variant="secondary">Premium</Badge>
                            ) : (
                              <Badge variant="outline">Free</Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleEditTemplate(template)}
                            >
                              Edit
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              
              {/* Template Edit Dialog */}
              <Dialog open={templateModalOpen} onOpenChange={setTemplateModalOpen}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Template</DialogTitle>
                    <DialogDescription>
                      Make changes to the template details below.
                    </DialogDescription>
                  </DialogHeader>
                  
                  {currentTemplate && (
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Template Name</Label>
                        <Input 
                          id="name" 
                          value={currentTemplate.name || ''} 
                          onChange={(e) => setCurrentTemplate({
                            ...currentTemplate, 
                            name: e.target.value
                          })} 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea 
                          id="description" 
                          value={currentTemplate.description || ''} 
                          onChange={(e) => setCurrentTemplate({
                            ...currentTemplate, 
                            description: e.target.value
                          })} 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select 
                          value={currentTemplate.category || ''} 
                          onValueChange={(value) => setCurrentTemplate({
                            ...currentTemplate, 
                            category: value
                          })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch 
                          id="premium" 
                          checked={currentTemplate.is_premium || false}
                          onCheckedChange={(checked) => setCurrentTemplate({
                            ...currentTemplate, 
                            is_premium: checked
                          })} 
                        />
                        <Label htmlFor="premium">Premium Template</Label>
                      </div>
                    </div>
                  )}
                  
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setTemplateModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleUpdateTemplate}>
                      Save Changes
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </TabsContent>
            
            <TabsContent value="categories" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Categories & Tags</CardTitle>
                  <CardDescription>
                    Manage template categories and tags
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Categories Management */}
                    <div>
                      <h3 className="text-lg font-medium mb-4">Categories</h3>
                      <div className="space-y-4">
                        <div className="flex space-x-2">
                          <Input 
                            placeholder="New category" 
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                          />
                          <Button onClick={addCategory}>Add</Button>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {categories.map((category) => (
                            <Badge 
                              key={category} 
                              variant="outline"
                              className="text-sm flex items-center space-x-1 py-1.5"
                            >
                              <span>{category}</span>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-4 w-4 p-0 hover:bg-transparent">
                                    <span className="sr-only">Remove</span>
                                    <span className="text-muted-foreground">×</span>
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This will remove the category "{category}" from the system.
                                      Templates using this category will need to be reassigned.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => removeCategory(category)}>
                                      Remove
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Tags Management */}
                    <div>
                      <h3 className="text-lg font-medium mb-4">Tags</h3>
                      <div className="space-y-4">
                        <div className="flex space-x-2">
                          <Input 
                            placeholder="New tag" 
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                          />
                          <Button onClick={addTag}>Add</Button>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {tags.map((tag) => (
                            <Badge 
                              key={tag} 
                              className="text-sm flex items-center space-x-1 py-1.5"
                            >
                              <span>{tag}</span>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-4 w-4 p-0 hover:bg-transparent">
                                    <span className="sr-only">Remove</span>
                                    <span className="text-white">×</span>
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This will remove the tag "{tag}" from the system.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => removeTag(tag)}>
                                      Remove
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="users" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>
                    View and manage user accounts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableCaption>List of registered users</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Wallet Address</TableHead>
                        <TableHead>Wallet Type</TableHead>
                        <TableHead>Blockchain</TableHead>
                        <TableHead>Created</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {/* User data would be populated here from the useQuery hook */}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="analytics" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Analytics Overview</CardTitle>
                  <CardDescription>
                    Platform usage and performance metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">
                          Total Users
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">253</div>
                        <p className="text-xs text-muted-foreground">
                          +12% from last month
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">
                          Active Websites
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">432</div>
                        <p className="text-xs text-muted-foreground">
                          +18% from last month
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">
                          Premium Subscriptions
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">86</div>
                        <p className="text-xs text-muted-foreground">
                          +5% from last month
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Settings</CardTitle>
                  <CardDescription>
                    Manage global platform settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">General Settings</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                        <Switch id="maintenance-mode" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Enable maintenance mode to temporarily disable access to the platform.
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Email Notifications</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="admin-emails">Admin Notifications</Label>
                        <Switch id="admin-emails" defaultChecked />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Receive email notifications for important platform events.
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Payment Webhooks</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="webhooks-active">Payment Webhook Status</Label>
                        <Badge variant="outline" className="text-green-500 bg-green-50">Active</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        The payment webhook is configured and receiving events.
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="ml-auto">Save Settings</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminPanel;
