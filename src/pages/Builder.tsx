
import React, { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Card, CardContent } from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useQuery } from '@tanstack/react-query';
import { fetchWebsiteById } from '@/services/websiteService';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { WebsiteSettings } from '@/types/website';
import { DesignCanvas } from '@/components/builder/DesignCanvas';
import { BuilderSidebar } from '@/components/builder/BuilderSidebar';
import { useHistory } from '@/hooks/useHistory';

export function Builder() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [websiteName, setWebsiteName] = useState('');

  const { data: website, isLoading } = useQuery({
    queryKey: ['website', id],
    queryFn: () => fetchWebsiteById(id as string),
    enabled: !!id,
  });

  const initialSettings: WebsiteSettings = {
    content: [
      {
        id: 'hero',
        type: 'HeroSection',
        content: {
          title: 'Your Awesome Headline',
          subtitle: 'Describe your product or service in a concise way.',
          image: 'https://via.placeholder.com/800x400',
          buttonText: 'Learn More',
          buttonLink: '/about',
        },
        settings: {
          backgroundColor: '#f0f0f0',
          textColor: '#333',
        },
      },
    ],
  };

  const { 
    state: historyState, 
    canUndo, 
    canRedo, 
    undo, 
    redo, 
    set: setHistoryState
  } = useHistory<WebsiteSettings>(initialSettings);

  useEffect(() => {
    if (website) {
      setWebsiteName(website.name);
      if (website.settings && website.settings.websiteSettings) {
        const websiteSettings = website.settings.websiteSettings as WebsiteSettings;
        setHistoryState(websiteSettings);
      }
    }
  }, [website, setHistoryState]);

  const onPublish = async () => {
    if (!website) return;

    try {
      const { error } = await supabase
        .from('websites')
        .update({ published: true })
        .eq('id', website.id);

      if (error) throw error;
      toast.success('Website published successfully!');
    } catch (error) {
      console.error('Error publishing website:', error);
      toast.error('Failed to publish website');
    }
  };

  const saveWebsiteSettings = async () => {
    try {
      if (!website) return;
      
      const { error } = await supabase
        .from('websites')
        .update({
          name: website.name,
          settings: {
            websiteSettings: historyState.present
          },
          updated_at: new Date().toISOString()
        })
        .eq('id', website.id);

      if (error) throw error;
      toast.success('Settings saved successfully');
    } catch (error) {
      console.error('Error saving website settings:', error);
      toast.error('Failed to save settings');
    }
  };

  const handleWebsiteNameChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setWebsiteName(newName);

    if (website) {
      try {
        const { error } = await supabase
          .from('websites')
          .update({ name: newName })
          .eq('id', website.id);

        if (error) {
          console.error('Error updating website name:', error);
          toast.error('Failed to update website name');
        } else {
          toast.success('Website name updated successfully!');
        }
      } catch (error) {
        console.error('Error updating website name:', error);
        toast.error('Failed to update website name');
      }
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow mt-16 py-12 flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardContent className="flex flex-col items-center justify-center">
              <h2 className="text-2xl font-bold mb-4">Unauthorized</h2>
              <p className="text-muted-foreground mb-6">
                You must be logged in to access the website builder.
              </p>
              <Button onClick={() => navigate('/login')}>Go to Login</Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow mt-16 py-12 flex items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!website) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow mt-16 py-12 flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardContent className="flex flex-col items-center justify-center">
              <h2 className="text-2xl font-bold mb-4">Website Not Found</h2>
              <p className="text-muted-foreground mb-6">
                The website you are trying to edit does not exist.
              </p>
              <Button onClick={() => navigate('/dashboard')}>Go to Dashboard</Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow mt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="mb-6 flex justify-between items-center">
              <div>
                <Input
                  type="text"
                  placeholder="Website Name"
                  value={websiteName}
                  onChange={handleWebsiteNameChange}
                  className="text-2xl font-bold bg-transparent border-none focus-visible:ring-0 focus-visible:ring-transparent"
                />
              </div>
              <div className="space-x-2">
                <Button onClick={undo} disabled={!canUndo}>
                  Undo
                </Button>
                <Button onClick={redo} disabled={!canRedo}>
                  Redo
                </Button>
                <Button onClick={saveWebsiteSettings}>Save</Button>
                <Button variant="default" onClick={onPublish}>
                  Publish
                </Button>
              </div>
            </div>

            <div className="flex h-full">
              <BuilderSidebar setHistoryState={setHistoryState} onSave={saveWebsiteSettings} />
              <DesignCanvas historyState={historyState} setHistoryState={setHistoryState} />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </DndProvider>
  );
}

export default Builder;
