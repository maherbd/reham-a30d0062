
import React, { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WebsitesList } from '@/components/dashboard/WebsitesList';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/transitions/FadeIn';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { WebsiteData } from '@/types/template';
import { fetchUserWebsites, deleteWebsite } from '@/services/websiteService';
import { useAuth } from '@/hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { PlusCircle, Grid, ListFilter } from 'lucide-react';
import { toast } from 'sonner';
import { ConnectWallet } from '@/components/ui/ConnectWallet';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [websites, setWebsites] = useState<WebsiteData[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Redirect to login if user is not logged in
    if (!user) {
      toast.error("Please log in to access your dashboard");
      navigate('/login');
      return;
    }

    const loadWebsites = async () => {
      setIsLoading(true);
      if (user) {
        const userWebsites = await fetchUserWebsites(user.id);
        setWebsites(userWebsites);
      }
      setIsLoading(false);
    };

    loadWebsites();
  }, [user, navigate]);

  const handleDeleteWebsite = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this website?')) {
      const success = await deleteWebsite(id);
      if (success) {
        setWebsites(websites.filter(website => website.id !== id));
      }
    }
  };

  const filteredWebsites = activeTab === 'all' 
    ? websites 
    : activeTab === 'published' 
      ? websites.filter(website => website.published) 
      : websites.filter(website => !website.published);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow mt-16">
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-bold">Dashboard</h1>
                  <p className="text-muted-foreground mt-1">
                    Manage your web3 websites and templates
                  </p>
                </div>
                
                <div className="flex items-center gap-4">
                  <ConnectWallet />
                  
                  <Button asChild>
                    <Link to="/templates" className="flex items-center">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      New Website
                    </Link>
                  </Button>
                </div>
              </div>
              
              <Tabs defaultValue="all" className="space-y-6" onValueChange={setActiveTab}>
                <div className="flex items-center justify-between">
                  <TabsList>
                    <TabsTrigger value="all">All Sites</TabsTrigger>
                    <TabsTrigger value="published">Published</TabsTrigger>
                    <TabsTrigger value="draft">Drafts</TabsTrigger>
                  </TabsList>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Grid className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <ListFilter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </div>
                
                <TabsContent value="all" className="space-y-6">
                  {isLoading ? (
                    <div className="text-center py-20">
                      <p className="text-lg text-muted-foreground">Loading...</p>
                    </div>
                  ) : (
                    <WebsitesList 
                      websites={filteredWebsites} 
                      onDelete={handleDeleteWebsite} 
                    />
                  )}
                </TabsContent>
                
                <TabsContent value="published" className="space-y-6">
                  {isLoading ? (
                    <div className="text-center py-20">
                      <p className="text-lg text-muted-foreground">Loading...</p>
                    </div>
                  ) : (
                    <WebsitesList 
                      websites={filteredWebsites} 
                      onDelete={handleDeleteWebsite} 
                    />
                  )}
                </TabsContent>
                
                <TabsContent value="draft" className="space-y-6">
                  {isLoading ? (
                    <div className="text-center py-20">
                      <p className="text-lg text-muted-foreground">Loading...</p>
                    </div>
                  ) : (
                    <WebsitesList 
                      websites={filteredWebsites} 
                      onDelete={handleDeleteWebsite} 
                    />
                  )}
                </TabsContent>
              </Tabs>
            </FadeIn>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
