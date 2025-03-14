
import React, { useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FadeIn, FadeInStagger } from '@/components/transitions/FadeIn';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  FileText, 
  Video, 
  BookOpen, 
  MessageSquare, 
  Download,
  ExternalLink
} from 'lucide-react';

// Sample resources data
const resources = {
  documentation: [
    {
      title: "Getting Started Guide",
      description: "Learn the basics of creating your first Web3 project with Reham",
      icon: FileText,
      link: "#",
      featured: true
    },
    {
      title: "Smart Contract Integration",
      description: "Connect your dApp to various blockchain networks",
      icon: FileText,
      link: "#",
      featured: false
    },
    {
      title: "Wallet Connection Guide",
      description: "Integrate Web3 wallets into your application",
      icon: FileText,
      link: "#",
      featured: false
    },
    {
      title: "Custom Domain Setup",
      description: "Configure your own domain for your Reham project",
      icon: FileText,
      link: "#",
      featured: true
    },
    {
      title: "Tokenomics Dashboard Setup",
      description: "Display token metrics and distribution charts",
      icon: FileText,
      link: "#",
      featured: false
    },
    {
      title: "Template Customization",
      description: "Adapt our templates to match your brand and requirements",
      icon: FileText,
      link: "#",
      featured: false
    }
  ],
  tutorials: [
    {
      title: "Build a Meme Coin Website",
      description: "Step-by-step guide to creating a meme coin website",
      duration: "25 min",
      thumbnail: "https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=400&auto=format&fit=crop",
      link: "#"
    },
    {
      title: "NFT Gallery Tutorial",
      description: "How to showcase your NFT collection",
      duration: "18 min",
      thumbnail: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=400&auto=format&fit=crop",
      link: "#"
    },
    {
      title: "Setting Up DAO Governance",
      description: "Create a governance system for your DAO",
      duration: "32 min",
      thumbnail: "https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=400&auto=format&fit=crop",
      link: "#"
    },
    {
      title: "DeFi Dashboard Tutorial",
      description: "Build a comprehensive DeFi analytics dashboard",
      duration: "28 min",
      thumbnail: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=400&auto=format&fit=crop",
      link: "#"
    }
  ],
  community: [
    {
      title: "Discord Community",
      description: "Join our Discord to connect with other builders",
      icon: MessageSquare,
      link: "#",
      members: "2.5k+"
    },
    {
      title: "Developer Forum",
      description: "Discuss technical topics and get help",
      icon: MessageSquare,
      link: "#",
      members: "1.3k+"
    },
    {
      title: "GitHub Repository",
      description: "Contribute to our open-source components",
      icon: ExternalLink,
      link: "#",
      members: "580+"
    }
  ]
};

const Resources = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow mt-16">
        <section className="pt-20 pb-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Resources</h1>
                <p className="mt-4 text-lg text-muted-foreground">
                  Everything you need to get started and make the most of your Web3 projects
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <Tabs defaultValue="docs" className="mb-12">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="docs">Documentation</TabsTrigger>
                  <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
                  <TabsTrigger value="community">Community</TabsTrigger>
                </TabsList>
                
                {/* Documentation Tab */}
                <TabsContent value="docs" className="p-6 bg-card rounded-b-xl border border-border/50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {resources.documentation.map((item, index) => (
                      <a 
                        key={index}
                        href={item.link}
                        className={`glass-panel p-5 rounded-xl flex gap-4 hover:bg-secondary/70 transition-all ${
                          item.featured ? 'border-primary/30 dark-glow' : ''
                        }`}
                      >
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <item.icon className="h-5 w-5 text-primary" />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium">{item.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                          {item.featured && (
                            <span className="inline-flex items-center mt-2 text-xs font-medium text-primary">
                              Featured resource
                            </span>
                          )}
                        </div>
                      </a>
                    ))}
                  </div>
                  
                  <div className="mt-8 text-center">
                    <Button variant="outline" className="glass-button">
                      <FileText className="mr-2 h-4 w-4" />
                      Browse All Documentation
                    </Button>
                  </div>
                </TabsContent>
                
                {/* Tutorials Tab */}
                <TabsContent value="tutorials" className="p-6 bg-card rounded-b-xl border border-border/50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {resources.tutorials.map((tutorial, index) => (
                      <a 
                        key={index}
                        href={tutorial.link}
                        className="glass-panel rounded-xl overflow-hidden hover:bg-secondary/70 transition-all"
                      >
                        <div className="aspect-video relative">
                          <img 
                            src={tutorial.thumbnail} 
                            alt={tutorial.title} 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                            <Video className="h-12 w-12 text-white" />
                          </div>
                          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                            {tutorial.duration}
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="text-lg font-medium">{tutorial.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{tutorial.description}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                  
                  <div className="mt-8 text-center">
                    <Button variant="outline" className="glass-button">
                      <Video className="mr-2 h-4 w-4" />
                      View All Tutorials
                    </Button>
                  </div>
                </TabsContent>
                
                {/* Community Tab */}
                <TabsContent value="community" className="p-6 bg-card rounded-b-xl border border-border/50">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold">Join Our Community</h2>
                    <p className="text-muted-foreground mt-2">
                      Connect with other Web3 builders and get help from our community
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {resources.community.map((item, index) => (
                      <a 
                        key={index}
                        href={item.link}
                        className="glass-panel p-6 rounded-xl text-center hover:bg-secondary/70 transition-all"
                      >
                        <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                          <item.icon className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-lg font-medium">{item.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                        <div className="mt-4 text-sm font-medium">{item.members} members</div>
                      </a>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </FadeIn>

            {/* Additional Resources */}
            <FadeIn>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="glass-panel p-6 rounded-xl">
                  <BookOpen className="h-8 w-8 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Whitepaper</h3>
                  <p className="text-muted-foreground">
                    Download our comprehensive whitepaper explaining the vision, technology, and tokenomics of Reham.
                  </p>
                  <Button className="mt-4" variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                </div>
                
                <div className="glass-panel p-6 rounded-xl">
                  <Video className="h-8 w-8 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Product Demo</h3>
                  <p className="text-muted-foreground">
                    Watch a comprehensive demo of the Reham platform and see how to create your first Web3 project.
                  </p>
                  <Button className="mt-4" variant="outline">
                    <Video className="mr-2 h-4 w-4" />
                    Watch Demo
                  </Button>
                </div>
              </div>
            </FadeIn>

            {/* FAQ Section */}
            <FadeIn>
              <div className="glass-panel p-6 sm:p-10 rounded-2xl mb-12">
                <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">What is Reham?</h3>
                    <p className="text-muted-foreground">
                      Reham is a platform that combines AI-powered tools with premium Web3 templates to help you launch your blockchain project quickly and efficiently.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Do I need coding experience?</h3>
                    <p className="text-muted-foreground">
                      No, our platform is designed to be accessible to everyone, regardless of technical expertise. Our AI tools and no-code editor make it easy to build without writing a single line of code.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Which blockchains do you support?</h3>
                    <p className="text-muted-foreground">
                      We support multiple blockchains including Ethereum, Binance Smart Chain, Polygon, Solana, and more. Our templates are designed to work with various Web3 standards.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Can I use my own domain?</h3>
                    <p className="text-muted-foreground">
                      Yes, you can connect your own domain name to your Reham project. We provide simple DNS configuration instructions to make this process easy.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">How much does it cost?</h3>
                    <p className="text-muted-foreground">
                      We offer various pricing tiers to suit different needs. Visit our pricing page to learn more about our plans and features.
                    </p>
                  </div>
                </div>
                
                <div className="mt-8 text-center">
                  <Button asChild className="primary-button">
                    <Link to="/contact">
                      Still have questions?
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </FadeIn>

            {/* CTA Section */}
            <FadeIn>
              <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl p-8 sm:p-12 text-center">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Start Building?</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                  Join thousands of creators who are building the future of Web3 with Reham.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button asChild className="primary-button">
                    <Link to="/dashboard">
                      Start Building
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="glass-button">
                    <Link to="/templates">
                      Browse Templates
                    </Link>
                  </Button>
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

export default Resources;
