
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { fetchTemplateById } from '@/services/templateService';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/transitions/FadeIn';
import { ArrowLeft, Check, Wallet, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { ConnectWallet } from '@/components/ui/ConnectWallet';
import { Card, CardContent } from '@/components/ui/card';
import { useTemplateActions } from '@/hooks/useTemplateActions';
import { Template } from '@/types/template';
import { Skeleton } from '@/components/ui/skeleton';

const TemplateDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [template, setTemplate] = useState<Template | null>(null);
  const [loading, setLoading] = useState(true);
  const [walletConnected, setWalletConnected] = useState(false);
  const { useTemplate, isLoading } = useTemplateActions();
  
  // Load template data
  useEffect(() => {
    const loadTemplate = async () => {
      setLoading(true);
      if (id) {
        const templateData = await fetchTemplateById(id);
        if (templateData) {
          setTemplate(templateData);
        } else {
          navigate('/templates');
        }
      }
      setLoading(false);
    };

    loadTemplate();
  }, [id, navigate]);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleUseTemplate = async () => {
    if (id) {
      await useTemplate(id);
    }
  };

  const handleConnectWallet = () => {
    // This would connect to a Web3 wallet in a real implementation
    setWalletConnected(true);
    toast.success("Wallet connected successfully!");
  };

  const features = [
    "Responsive design for all devices",
    "Web3 wallet integration",
    "Dark & light mode support",
    "SEO optimized",
    "Fast performance",
    "Customizable components",
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow mt-16">
          <section className="py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn>
                <Button 
                  variant="ghost" 
                  className="mb-8 -ml-4 text-muted-foreground hover:text-foreground"
                  onClick={() => navigate('/templates')}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to templates
                </Button>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div className="order-2 lg:order-1 space-y-4">
                    <Skeleton className="h-10 w-3/4" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-3/4" />
                  </div>
                  <div className="order-1 lg:order-2">
                    <Skeleton className="w-full h-[300px]" />
                  </div>
                </div>
              </FadeIn>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  if (!template) {
    return null; // This will be handled by the navigate in useEffect
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow mt-16">
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <Button 
                variant="ghost" 
                className="mb-8 -ml-4 text-muted-foreground hover:text-foreground"
                onClick={() => navigate('/templates')}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to templates
              </Button>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="order-2 lg:order-1">
                  <h1 className="text-3xl md:text-4xl font-bold">{template.name}</h1>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    {template.tags && template.tags.map((tag) => (
                      <span key={tag} className="inline-flex items-center rounded-full bg-secondary px-2.5 py-1 text-sm font-medium text-secondary-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <p className="mt-6 text-lg text-muted-foreground">
                    {template.description}
                  </p>
                  
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4">Features</h3>
                    <ul className="space-y-3">
                      {features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <div className="mr-3 mt-1">
                            <Check className="h-5 w-5 text-primary" />
                          </div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-8">
                    <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold mb-4">Web3 Integration</h3>
                        <p className="text-muted-foreground mb-4">
                          This template includes built-in integration with popular Web3 wallets, allowing users to connect and interact with blockchain applications.
                        </p>
                        <div className="flex flex-wrap gap-3">
                          <ConnectWallet />
                          {!walletConnected && (
                            <Button 
                              variant="outline"
                              className="rounded-full flex items-center gap-2"
                              onClick={handleConnectWallet}
                            >
                              <Wallet className="h-4 w-4" />
                              Connect Custom Wallet
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="mt-10 space-y-4">
                    <Button 
                      onClick={handleUseTemplate} 
                      className="w-full sm:w-auto primary-button"
                      disabled={isLoading}
                    >
                      {isLoading ? "Setting up..." : "Use this template"}
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full sm:w-auto sm:ml-3 glass-button"
                      asChild
                    >
                      <Link to={`/templates`}>Explore other templates</Link>
                    </Button>
                  </div>
                </div>
                
                <div className="order-1 lg:order-2">
                  <div className="overflow-hidden rounded-xl border border-border/50 shadow-lg">
                    <img
                      src={template.thumbnail_url || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop'}
                      alt={template.name}
                      className="w-full h-auto"
                    />
                  </div>
                  
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <Button 
                      variant="outline" 
                      className="w-full justify-between glass-button"
                      asChild
                    >
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        <span>Live Preview</span>
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-between glass-button"
                      asChild
                    >
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        <span>Documentation</span>
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
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

export default TemplateDetail;
