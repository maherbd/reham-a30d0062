
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { FadeIn } from '@/components/transitions/FadeIn';
import { Button } from '@/components/ui/button';
import { Sidebar } from '@/components/ui/sidebar';
import { supabase } from '@/integrations/supabase/client';
import { WebsiteData } from '@/types/template';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { Save, Play, Undo, Redo, Eye, Settings, Code, Layout, Image, Type } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ComponentLibrary } from '@/components/builder/ComponentLibrary';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { publishWebsite, unpublishWebsite } from '@/services/websiteService';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const Builder = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [website, setWebsite] = useState<WebsiteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [activeView, setActiveView] = useState<'edit' | 'preview'>('edit');
  const [publishDialogOpen, setPublishDialogOpen] = useState(false);
  const [subdomain, setSubdomain] = useState('');
  
  // Fetch website data
  useEffect(() => {
    if (!user) {
      toast.error('You need to be logged in');
      navigate('/login');
      return;
    }
    
    const fetchWebsite = async () => {
      try {
        const { data, error } = await supabase
          .from('websites')
          .select('*')
          .eq('id', id)
          .eq('user_id', user.id)
          .single();
          
        if (error) {
          throw error;
        }
        
        setWebsite(data);
        setSubdomain(data.subdomain || '');
      } catch (error) {
        console.error('Error fetching website:', error);
        toast.error('Could not load website');
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };
    
    fetchWebsite();
  }, [id, user, navigate]);
  
  const saveWebsite = async () => {
    if (!website) return;
    
    setSaving(true);
    try {
      const { error } = await supabase
        .from('websites')
        .update({
          name: website.name,
          settings: website.settings,
          updated_at: new Date().toISOString()
        })
        .eq('id', website.id);
        
      if (error) throw error;
      
      toast.success('Website saved successfully');
    } catch (error) {
      console.error('Error saving website:', error);
      toast.error('Failed to save website');
    } finally {
      setSaving(false);
    }
  };
  
  const handleOpenPublishDialog = () => {
    setPublishDialogOpen(true);
  };
  
  const handlePublishWebsite = async () => {
    if (!website) return;
    setPublishing(true);
    
    try {
      // Update subdomain if provided
      if (subdomain && subdomain !== website.subdomain) {
        const { error: subdomainError } = await supabase
          .from('websites')
          .update({ subdomain })
          .eq('id', website.id);
          
        if (subdomainError) throw subdomainError;
      }
      
      // Publish the website
      const success = await publishWebsite(website.id);
      
      if (success) {
        setWebsite({
          ...website,
          published: true,
          subdomain: subdomain || website.subdomain
        });
        setPublishDialogOpen(false);
        toast.success('Website published successfully');
      } else {
        throw new Error('Failed to publish website');
      }
    } catch (error) {
      console.error('Error publishing website:', error);
      toast.error('Failed to publish website');
    } finally {
      setPublishing(false);
    }
  };
  
  const handleUnpublishWebsite = async () => {
    if (!website) return;
    
    try {
      const success = await unpublishWebsite(website.id);
      
      if (success) {
        setWebsite({
          ...website,
          published: false
        });
      } else {
        throw new Error('Failed to unpublish website');
      }
    } catch (error) {
      console.error('Error unpublishing website:', error);
      toast.error('Failed to unpublish website');
    }
  };
  
  const handleNameChange = (newName: string) => {
    if (website) {
      setWebsite({
        ...website,
        name: newName
      });
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-t-2 border-primary rounded-full mx-auto mb-4"></div>
          <p className="text-lg">Loading builder...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center px-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
            <img src="/favicon.ico" alt="Logo" className="h-6 w-6" />
          </Button>
          <input
            type="text"
            value={website?.name || ''}
            onChange={(e) => handleNameChange(e.target.value)}
            className="ml-2 bg-transparent border-none text-lg font-medium focus:outline-none focus:ring-0"
          />
          <div className="ml-auto flex items-center gap-2">
            <div className="hidden md:flex mr-4">
              <TabsList>
                <TabsTrigger 
                  value="edit" 
                  onClick={() => setActiveView('edit')}
                  className={activeView === 'edit' ? "bg-primary text-primary-foreground" : ""}
                >
                  <Code className="h-4 w-4 mr-2" />
                  Edit
                </TabsTrigger>
                <TabsTrigger 
                  value="preview" 
                  onClick={() => setActiveView('preview')}
                  className={activeView === 'preview' ? "bg-primary text-primary-foreground" : ""}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </TabsTrigger>
              </TabsList>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={saveWebsite}
              disabled={saving}
            >
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            {website?.published ? (
              <Button 
                variant="outline"
                size="sm"
                onClick={handleUnpublishWebsite}
              >
                Unpublish
              </Button>
            ) : (
              <Button 
                onClick={handleOpenPublishDialog}
                size="sm"
              >
                <Play className="h-4 w-4 mr-2" />
                Publish
              </Button>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar className="w-[240px] border-r">
          {activeView === 'edit' ? (
            <ComponentLibrary />
          ) : (
            <div className="flex flex-col h-full">
              <div className="px-3 py-2">
                <h2 className="text-lg font-semibold mb-2">Elements</h2>
                <div className="space-y-1">
                  <Button variant="ghost" className="w-full justify-start">
                    <Layout className="h-4 w-4 mr-2" />
                    Section
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Type className="h-4 w-4 mr-2" />
                    Text
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Image className="h-4 w-4 mr-2" />
                    Image
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Settings className="h-4 w-4 mr-2" />
                    Button
                  </Button>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="px-3 py-2">
                <h2 className="text-lg font-semibold mb-2">Settings</h2>
                <div className="space-y-1">
                  <Button variant="ghost" className="w-full justify-start">
                    <Settings className="h-4 w-4 mr-2" />
                    Page Settings
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Image className="h-4 w-4 mr-2" />
                    Assets
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Code className="h-4 w-4 mr-2" />
                    Custom Code
                  </Button>
                </div>
              </div>
              
              <div className="mt-auto px-3 py-4">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="w-1/2">
                    <Undo className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="w-1/2">
                    <Redo className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Sidebar>
        
        <main className="flex-1 overflow-auto bg-secondary/20">
          {activeView === 'edit' ? (
            <div className="h-full flex items-center justify-center">
              <FadeIn>
                <div className="text-center max-w-md p-6">
                  <h2 className="text-2xl font-bold mb-4">Website Builder</h2>
                  <p className="text-muted-foreground mb-6">
                    Drag and drop elements from the sidebar to build your website.
                  </p>
                  <div className="border-2 border-dashed border-border rounded-lg p-8">
                    <p className="text-muted-foreground">Drag elements here to start building</p>
                  </div>
                </div>
              </FadeIn>
            </div>
          ) : (
            <div className="h-full">
              <iframe
                src={`https://kkenlcfjposyiccejqkm.supabase.co/storage/v1/object/public/templates/${website?.template_id}/preview.html`}
                className="w-full h-full border-0"
                title="Website Preview"
              />
            </div>
          )}
        </main>
      </div>
      
      {/* Publish Dialog */}
      <Dialog open={publishDialogOpen} onOpenChange={setPublishDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Publish Website</DialogTitle>
            <DialogDescription>
              Your website will be publicly available once published.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subdomain">Subdomain</Label>
              <div className="flex items-center">
                <Input 
                  id="subdomain"
                  value={subdomain}
                  onChange={(e) => setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                  placeholder="your-site"
                  className="rounded-r-none"
                />
                <div className="bg-muted px-3 py-2 border border-l-0 border-input rounded-r-md text-sm text-muted-foreground">
                  .reham.app
                </div>
              </div>
            </div>
            
            <div className="bg-muted/50 p-3 rounded-md">
              <h4 className="font-medium mb-1">Publishing includes:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  <span>Public URL for your site</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  <span>Instant updates when you make changes</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  <span>SSL certificate and secure hosting</span>
                </li>
              </ul>
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setPublishDialogOpen(false)}
              disabled={publishing}
            >
              Cancel
            </Button>
            <Button
              onClick={handlePublishWebsite}
              disabled={publishing || !subdomain}
            >
              {publishing ? 'Publishing...' : 'Publish Website'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Builder;
