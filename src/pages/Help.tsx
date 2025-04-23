
import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FadeIn } from '@/components/transitions/FadeIn';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  Search, 
  HelpCircle, 
  Book, 
  FileText, 
  Video, 
  MessageCircle, 
  ExternalLink
} from 'lucide-react';
import { Input } from '@/components/ui/input';

const Help = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Help Center</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Find answers to frequently asked questions and learn how to make the most of our platform.
              </p>
              
              <div className="relative max-w-lg mx-auto mt-8">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search documentation..."
                  className="pl-10"
                />
              </div>
            </div>
            
            <Tabs defaultValue="guides" className="space-y-8">
              <TabsList className="w-full flex justify-center border-b bg-transparent h-auto p-0">
                <div className="flex flex-wrap justify-center">
                  <TabsTrigger 
                    value="guides"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none border-b-2 border-transparent px-6 py-3 bg-transparent"
                  >
                    Getting Started
                  </TabsTrigger>
                  <TabsTrigger 
                    value="faqs"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none border-b-2 border-transparent px-6 py-3 bg-transparent"
                  >
                    FAQs
                  </TabsTrigger>
                  <TabsTrigger 
                    value="videos"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none border-b-2 border-transparent px-6 py-3 bg-transparent"
                  >
                    Video Tutorials
                  </TabsTrigger>
                  <TabsTrigger 
                    value="support"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none border-b-2 border-transparent px-6 py-3 bg-transparent"
                  >
                    Contact Support
                  </TabsTrigger>
                </div>
              </TabsList>
              
              <TabsContent value="guides" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Book className="h-5 w-5 text-primary" />
                        Creating Your First Website
                      </CardTitle>
                      <CardDescription>
                        Learn how to create and customize your first website using our platform.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <a href="#" className="text-primary hover:underline">Choosing a Template</a>
                        </li>
                        <li className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <a href="#" className="text-primary hover:underline">Adding Custom Sections</a>
                        </li>
                        <li className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <a href="#" className="text-primary hover:underline">Publishing Your Website</a>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Book className="h-5 w-5 text-primary" />
                        Domain Setup
                      </CardTitle>
                      <CardDescription>
                        Configure custom domains and create professional web addresses.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <a href="#" className="text-primary hover:underline">Using a Free Subdomain</a>
                        </li>
                        <li className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <a href="#" className="text-primary hover:underline">Connecting a Custom Domain</a>
                        </li>
                        <li className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <a href="#" className="text-primary hover:underline">DNS Configuration</a>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Book className="h-5 w-5 text-primary" />
                        Analytics & SEO
                      </CardTitle>
                      <CardDescription>
                        Optimize your website and track visitor engagement.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <a href="#" className="text-primary hover:underline">Setting Up Google Analytics</a>
                        </li>
                        <li className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <a href="#" className="text-primary hover:underline">SEO Best Practices</a>
                        </li>
                        <li className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <a href="#" className="text-primary hover:underline">Understanding Traffic Reports</a>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="faqs" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Frequently Asked Questions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="font-medium flex items-center gap-2">
                        <HelpCircle className="h-4 w-4 text-primary" />
                        How do I update my subscription plan?
                      </h3>
                      <p className="text-muted-foreground pl-6">
                        You can update your subscription plan by visiting the Subscription Management page from your Dashboard.
                        Select the plan you want to upgrade or downgrade to and follow the checkout process.
                      </p>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <h3 className="font-medium flex items-center gap-2">
                        <HelpCircle className="h-4 w-4 text-primary" />
                        Can I transfer my website to another account?
                      </h3>
                      <p className="text-muted-foreground pl-6">
                        Currently, websites cannot be transferred between accounts. We recommend exporting your content
                        and recreating the website on the destination account if needed.
                      </p>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <h3 className="font-medium flex items-center gap-2">
                        <HelpCircle className="h-4 w-4 text-primary" />
                        How do I add Google Analytics to my website?
                      </h3>
                      <p className="text-muted-foreground pl-6">
                        You can add your Google Analytics tracking ID in the Website Settings under the Analytics tab.
                        Simply paste your Google Analytics tracking ID (starts with G-) and save your changes.
                      </p>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <h3 className="font-medium flex items-center gap-2">
                        <HelpCircle className="h-4 w-4 text-primary" />
                        What payment methods do you accept?
                      </h3>
                      <p className="text-muted-foreground pl-6">
                        We accept credit/debit cards, PayPal, and several cryptocurrencies including USDC, SOL, and ETH.
                        All payments are processed securely through our payment processors.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="videos" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="overflow-hidden">
                    <div className="aspect-video bg-muted flex items-center justify-center">
                      <Video className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-base">Getting Started Tutorial</CardTitle>
                      <CardDescription>Learn the basics in under 10 minutes</CardDescription>
                    </CardHeader>
                  </Card>
                  
                  <Card className="overflow-hidden">
                    <div className="aspect-video bg-muted flex items-center justify-center">
                      <Video className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-base">Custom Domain Setup</CardTitle>
                      <CardDescription>Connect your domain step-by-step</CardDescription>
                    </CardHeader>
                  </Card>
                  
                  <Card className="overflow-hidden">
                    <div className="aspect-video bg-muted flex items-center justify-center">
                      <Video className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-base">Advanced Template Customization</CardTitle>
                      <CardDescription>Make your website unique</CardDescription>
                    </CardHeader>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="support" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Our Support Team</CardTitle>
                    <CardDescription>
                      We're here to help! Choose the best way to reach us.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-6">
                    <div className="grid gap-4">
                      <div className="flex items-start gap-4 rounded-lg border p-4">
                        <MessageCircle className="h-6 w-6 text-primary" />
                        <div className="space-y-2">
                          <h3 className="font-medium">Live Chat Support</h3>
                          <p className="text-sm text-muted-foreground">
                            Chat with our support team in real-time during business hours.
                          </p>
                          <button className="text-primary font-medium text-sm flex items-center gap-1">
                            Start Chat <ExternalLink className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4 rounded-lg border p-4">
                        <FileText className="h-6 w-6 text-primary" />
                        <div className="space-y-2">
                          <h3 className="font-medium">Submit a Support Ticket</h3>
                          <p className="text-sm text-muted-foreground">
                            Create a support ticket for complex issues that require investigation.
                          </p>
                          <button className="text-primary font-medium text-sm flex items-center gap-1">
                            Create Ticket <ExternalLink className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4 rounded-lg border p-4">
                        <Video className="h-6 w-6 text-primary" />
                        <div className="space-y-2">
                          <h3 className="font-medium">Schedule a Demo</h3>
                          <p className="text-sm text-muted-foreground">
                            Book a 30-minute call with our team to walk through advanced features.
                          </p>
                          <button className="text-primary font-medium text-sm flex items-center gap-1">
                            Book Demo <ExternalLink className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </FadeIn>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Help;
