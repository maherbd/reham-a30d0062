
import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Search, Book, HelpCircle, ShieldCheck } from 'lucide-react';

export function Help() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter documentation topics based on search query
  const filteredTopics = (topics: Array<{id: string; title: string; content: React.ReactNode}>) => {
    if (!searchQuery) return topics;
    
    return topics.filter(topic => 
      topic.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow mt-16 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold">Help & Documentation</h1>
              <p className="mt-3 text-muted-foreground max-w-3xl mx-auto">
                Find answers, tutorials, and guides to help you build and manage your website.
              </p>
              
              <div className="mt-6 max-w-md mx-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    type="text"
                    placeholder="Search documentation..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <Card className="md:col-span-1 h-fit">
                <CardHeader className="pb-3">
                  <CardTitle>Documentation</CardTitle>
                  <CardDescription>Browse by category</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <nav className="flex flex-col">
                    <a href="#getting-started" className="px-4 py-2 hover:bg-accent">Getting Started</a>
                    <a href="#templates" className="px-4 py-2 hover:bg-accent">Templates</a>
                    <a href="#website-builder" className="px-4 py-2 hover:bg-accent">Website Builder</a>
                    <a href="#domains" className="px-4 py-2 hover:bg-accent">Domains & Publishing</a>
                    <a href="#analytics" className="px-4 py-2 hover:bg-accent">Analytics</a>
                    <a href="#account" className="px-4 py-2 hover:bg-accent">Account & Billing</a>
                    <a href="#api" className="px-4 py-2 hover:bg-accent">API Documentation</a>
                  </nav>
                </CardContent>
              </Card>
              
              <div className="md:col-span-3">
                <Tabs defaultValue="docs">
                  <TabsList className="mb-6">
                    <TabsTrigger value="docs" className="flex items-center gap-2">
                      <Book className="h-4 w-4" />
                      Documentation
                    </TabsTrigger>
                    <TabsTrigger value="faq" className="flex items-center gap-2">
                      <HelpCircle className="h-4 w-4" />
                      FAQ
                    </TabsTrigger>
                    <TabsTrigger value="security" className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4" />
                      Security
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="docs" className="space-y-8">
                    <Card>
                      <CardHeader>
                        <CardTitle id="getting-started">Getting Started</CardTitle>
                        <CardDescription>Everything you need to know to get up and running</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Accordion type="single" collapsible className="w-full">
                          {filteredTopics(gettingStartedTopics).map((topic) => (
                            <AccordionItem key={topic.id} value={topic.id}>
                              <AccordionTrigger>{topic.title}</AccordionTrigger>
                              <AccordionContent>{topic.content}</AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle id="templates">Templates</CardTitle>
                        <CardDescription>Learn about our templates and how to use them</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Accordion type="single" collapsible className="w-full">
                          {filteredTopics(templateTopics).map((topic) => (
                            <AccordionItem key={topic.id} value={topic.id}>
                              <AccordionTrigger>{topic.title}</AccordionTrigger>
                              <AccordionContent>{topic.content}</AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle id="website-builder">Website Builder</CardTitle>
                        <CardDescription>Everything about building and customizing your website</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Accordion type="single" collapsible className="w-full">
                          {filteredTopics(builderTopics).map((topic) => (
                            <AccordionItem key={topic.id} value={topic.id}>
                              <AccordionTrigger>{topic.title}</AccordionTrigger>
                              <AccordionContent>{topic.content}</AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle id="domains">Domains & Publishing</CardTitle>
                        <CardDescription>Learn how to publish your site and connect domains</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Accordion type="single" collapsible className="w-full">
                          {filteredTopics(domainTopics).map((topic) => (
                            <AccordionItem key={topic.id} value={topic.id}>
                              <AccordionTrigger>{topic.title}</AccordionTrigger>
                              <AccordionContent>{topic.content}</AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle id="analytics">Analytics</CardTitle>
                        <CardDescription>Understanding your website's performance</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Accordion type="single" collapsible className="w-full">
                          {filteredTopics(analyticsTopics).map((topic) => (
                            <AccordionItem key={topic.id} value={topic.id}>
                              <AccordionTrigger>{topic.title}</AccordionTrigger>
                              <AccordionContent>{topic.content}</AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle id="account">Account & Billing</CardTitle>
                        <CardDescription>Managing your account and subscription</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Accordion type="single" collapsible className="w-full">
                          {filteredTopics(accountTopics).map((topic) => (
                            <AccordionItem key={topic.id} value={topic.id}>
                              <AccordionTrigger>{topic.title}</AccordionTrigger>
                              <AccordionContent>{topic.content}</AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="faq">
                    <Card>
                      <CardHeader>
                        <CardTitle>Frequently Asked Questions</CardTitle>
                        <CardDescription>Quick answers to common questions</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Accordion type="single" collapsible className="w-full">
                          {filteredTopics(faqTopics).map((topic) => (
                            <AccordionItem key={topic.id} value={topic.id}>
                              <AccordionTrigger>{topic.title}</AccordionTrigger>
                              <AccordionContent>{topic.content}</AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="security">
                    <Card>
                      <CardHeader>
                        <CardTitle>Security Information</CardTitle>
                        <CardDescription>How we keep your data and websites secure</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Accordion type="single" collapsible className="w-full">
                          {filteredTopics(securityTopics).map((topic) => (
                            <AccordionItem key={topic.id} value={topic.id}>
                              <AccordionTrigger>{topic.title}</AccordionTrigger>
                              <AccordionContent>{topic.content}</AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <div className="text-center">
              <h2 className="text-xl font-semibold">Need more help?</h2>
              <p className="mt-2 text-muted-foreground">
                Can't find what you're looking for? Contact our support team.
              </p>
              <div className="mt-4 flex justify-center gap-4">
                <a href="/contact" className="text-primary hover:underline">
                  Contact Support
                </a>
                <span className="text-muted-foreground">•</span>
                <a href="https://discord.gg/example" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Join our Discord
                </a>
                <span className="text-muted-foreground">•</span>
                <a href="https://twitter.com/example" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Twitter
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

// Documentation content
const gettingStartedTopics = [
  {
    id: 'gs-1',
    title: 'Creating your first website',
    content: (
      <div className="space-y-4">
        <p>To create your first website, follow these steps:</p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Sign up for an account if you haven't already</li>
          <li>Navigate to the Dashboard and click "New Website"</li>
          <li>Choose a template that matches your needs</li>
          <li>Customize your website using our drag-and-drop builder</li>
          <li>Publish your site when you're ready</li>
        </ol>
        <p>You can always make changes to your site after publishing.</p>
      </div>
    )
  },
  {
    id: 'gs-2',
    title: 'Account setup',
    content: (
      <div className="space-y-4">
        <p>Setting up your account is simple:</p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Complete your profile information</li>
          <li>Verify your email address</li>
          <li>Set up your billing information (for premium features)</li>
          <li>Configure your notification preferences</li>
        </ol>
      </div>
    )
  },
  {
    id: 'gs-3',
    title: 'Dashboard overview',
    content: (
      <div className="space-y-4">
        <p>The dashboard is your command center for managing all aspects of your websites:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Websites list:</strong> View and manage all your websites</li>
          <li><strong>Templates:</strong> Browse and select templates for new websites</li>
          <li><strong>Analytics:</strong> Track visitor statistics for your sites</li>
          <li><strong>Account:</strong> Manage your account settings and subscription</li>
        </ul>
      </div>
    )
  },
];

const templateTopics = [
  {
    id: 'temp-1',
    title: 'Choosing the right template',
    content: (
      <div className="space-y-4">
        <p>When selecting a template, consider the following:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>The purpose of your website (e.g., portfolio, business, blog)</li>
          <li>Your brand style and color scheme</li>
          <li>Required features (e.g., contact forms, image galleries)</li>
          <li>Mobile responsiveness needs</li>
        </ul>
        <p>All our templates are fully customizable, so you can always make changes to match your exact requirements.</p>
      </div>
    )
  },
  {
    id: 'temp-2',
    title: 'Template categories',
    content: (
      <div className="space-y-4">
        <p>Our templates are organized into the following categories:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Meme:</strong> Fun, viral-optimized sites for meme coins and projects</li>
          <li><strong>NFT:</strong> Showcase your digital collectibles and NFT projects</li>
          <li><strong>DAO:</strong> Governance and community platforms for DAOs</li>
          <li><strong>DeFi:</strong> Financial applications and platforms</li>
          <li><strong>GameFi:</strong> Gaming and play-to-earn platforms</li>
          <li><strong>Social:</strong> Community and social networking sites</li>
        </ul>
      </div>
    )
  },
  {
    id: 'temp-3',
    title: 'Premium vs. free templates',
    content: (
      <div className="space-y-4">
        <p>We offer both free and premium templates:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Free templates:</strong> Basic designs with essential features, available to all users</li>
          <li><strong>Premium templates:</strong> Advanced designs with premium features, available to subscribers</li>
        </ul>
        <p>Premium templates include additional benefits such as:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Advanced customization options</li>
          <li>Animation and interactive elements</li>
          <li>Priority support</li>
          <li>No platform branding</li>
        </ul>
      </div>
    )
  },
];

const builderTopics = [
  {
    id: 'build-1',
    title: 'Using the drag-and-drop builder',
    content: (
      <div className="space-y-4">
        <p>Our intuitive builder lets you customize every aspect of your website:</p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Select any element by clicking on it in the preview</li>
          <li>Drag elements to reposition them on the page</li>
          <li>Use the component library to add new elements</li>
          <li>Configure element properties in the settings panel</li>
          <li>Save your changes regularly using the Save button</li>
        </ol>
      </div>
    )
  },
  {
    id: 'build-2',
    title: 'Component configuration',
    content: (
      <div className="space-y-4">
        <p>Each component can be customized through the configuration panel:</p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Select a component to edit its properties</li>
          <li>Use the Content tab to modify text, images, and links</li>
          <li>Use the Style tab to change colors, sizes, and spacing</li>
          <li>Use the Advanced tab for custom CSS and special settings</li>
        </ol>
      </div>
    )
  },
  {
    id: 'build-3',
    title: 'Responsive design',
    content: (
      <div className="space-y-4">
        <p>All websites built with our platform are automatically responsive, but you can fine-tune how they appear on different devices:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Use the device preview buttons to see how your site looks on desktop, tablet, and mobile</li>
          <li>Make device-specific adjustments to layout and styling</li>
          <li>Hide certain elements on specific device types if needed</li>
        </ul>
        <p>Always test your site on multiple devices before publishing to ensure a good experience for all visitors.</p>
      </div>
    )
  },
  {
    id: 'build-4',
    title: 'Undo/redo functionality',
    content: (
      <div className="space-y-4">
        <p>Never worry about making mistakes while editing your website:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Use the Undo button (or Ctrl+Z) to reverse your last action</li>
          <li>Use the Redo button (or Ctrl+Y) to restore an undone action</li>
          <li>The editor maintains a history of your recent changes</li>
        </ul>
        <p>The system automatically saves your progress periodically, but it's always a good practice to manually save important changes.</p>
      </div>
    )
  },
];

const domainTopics = [
  {
    id: 'dom-1',
    title: 'Publishing your website',
    content: (
      <div className="space-y-4">
        <p>When you're ready to make your website live:</p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Click the "Publish" button in the builder</li>
          <li>Review your site and confirm you want to publish</li>
          <li>Your site will be available at your subdomain or custom domain</li>
        </ol>
        <p>You can unpublish your site at any time if you need to make major changes.</p>
      </div>
    )
  },
  {
    id: 'dom-2',
    title: 'Setting up a custom domain',
    content: (
      <div className="space-y-4">
        <p>To use your own domain name with your website:</p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Purchase a domain from a domain registrar (like Namecheap, GoDaddy, etc.)</li>
          <li>Go to your website settings and enter your domain name</li>
          <li>Add the required DNS records to your domain's DNS settings:
            <ul className="list-disc pl-5 mt-2">
              <li>Type: CNAME</li>
              <li>Name: www (or @)</li>
              <li>Value: proxy.lovable.app</li>
              <li>TTL: Automatic</li>
            </ul>
          </li>
          <li>Verify your domain in the platform</li>
          <li>Once verification is complete, your site will be accessible via your domain</li>
        </ol>
        <p>DNS changes can take up to 48 hours to propagate, but typically happen within a few hours.</p>
      </div>
    )
  },
  {
    id: 'dom-3',
    title: 'Using a free subdomain',
    content: (
      <div className="space-y-4">
        <p>All websites get a free subdomain on our platform:</p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Go to your website settings</li>
          <li>Enter your desired subdomain name</li>
          <li>If available, it will be assigned to your site</li>
          <li>Your site will be accessible at yourdomain.lovable.app</li>
        </ol>
        <p>You can change your subdomain later, but the old one won't redirect automatically.</p>
      </div>
    )
  },
];

const analyticsTopics = [
  {
    id: 'ana-1',
    title: 'Built-in analytics',
    content: (
      <div className="space-y-4">
        <p>Our platform includes built-in analytics that track:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Page views</li>
          <li>Unique visitors</li>
          <li>Visitor location data</li>
          <li>Device types</li>
          <li>Referral sources</li>
          <li>Time spent on site</li>
          <li>Bounce rate</li>
        </ul>
        <p>These analytics are available in your website dashboard and don't require any additional setup.</p>
      </div>
    )
  },
  {
    id: 'ana-2',
    title: 'Integrating Google Analytics',
    content: (
      <div className="space-y-4">
        <p>To integrate Google Analytics with your website:</p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Create a Google Analytics account if you don't have one</li>
          <li>Set up a new property and get your Measurement ID (starts with G-)</li>
          <li>Go to your website settings and find the Analytics section</li>
          <li>Enter your Google Analytics ID</li>
          <li>Save your changes</li>
        </ol>
        <p>After integration, data will start appearing in your Google Analytics dashboard within 24 hours.</p>
      </div>
    )
  },
  {
    id: 'ana-3',
    title: 'Understanding analytics data',
    content: (
      <div className="space-y-4">
        <p>Key metrics to focus on include:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Page views:</strong> Total number of pages viewed</li>
          <li><strong>Unique visitors:</strong> Number of individual visitors to your site</li>
          <li><strong>Bounce rate:</strong> Percentage of visitors who leave after viewing only one page</li>
          <li><strong>Average session duration:</strong> How long visitors typically stay on your site</li>
          <li><strong>Top pages:</strong> Your most popular content</li>
          <li><strong>Traffic sources:</strong> Where your visitors are coming from</li>
        </ul>
        <p>Regularly reviewing these metrics can help you optimize your site for better engagement.</p>
      </div>
    )
  },
];

const accountTopics = [
  {
    id: 'acc-1',
    title: 'Managing your subscription',
    content: (
      <div className="space-y-4">
        <p>To manage your subscription:</p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Go to Account {'>'} Subscription Management</li>
          <li>View your current plan and renewal date</li>
          <li>Upgrade or downgrade your plan as needed</li>
          <li>Update your payment information</li>
          <li>View your payment history and download invoices</li>
        </ol>
        <p>Changes to your subscription take effect immediately for upgrades and at the end of your billing period for downgrades.</p>
      </div>
    )
  },
  {
    id: 'acc-2',
    title: 'Billing and payments',
    content: (
      <div className="space-y-4">
        <p>Our platform accepts various payment methods:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Credit/debit cards</li>
          <li>PayPal</li>
          <li>Cryptocurrency (Solana, USDC)</li>
        </ul>
        <p>Payments are processed securely, and you'll receive an email receipt for each transaction. You can access all invoices from your account dashboard.</p>
      </div>
    )
  },
  {
    id: 'acc-3',
    title: 'Account security',
    content: (
      <div className="space-y-4">
        <p>To keep your account secure:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Use a strong, unique password</li>
          <li>Enable two-factor authentication (2FA)</li>
          <li>Never share your account credentials</li>
          <li>Log out when using shared computers</li>
          <li>Regularly check your account activity</li>
        </ul>
        <p>If you notice any suspicious activity, immediately change your password and contact our support team.</p>
      </div>
    )
  },
];

const faqTopics = [
  {
    id: 'faq-1',
    title: 'Can I transfer my existing website to your platform?',
    content: (
      <div>
        <p>While we don't offer a direct import tool for external websites, you can recreate your site using our templates and builder. If you have a large or complex website, contact our support team for assistance with migration options.</p>
      </div>
    )
  },
  {
    id: 'faq-2',
    title: 'How many websites can I create?',
    content: (
      <div className="space-y-4">
        <p>The number of websites you can create depends on your subscription plan:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Free plan:</strong> 1 website</li>
          <li><strong>Basic plan:</strong> 3 websites</li>
          <li><strong>Professional plan:</strong> 10 websites</li>
          <li><strong>Enterprise plan:</strong> Unlimited websites</li>
        </ul>
      </div>
    )
  },
  {
    id: 'faq-3',
    title: 'Can I cancel my subscription at any time?',
    content: (
      <div>
        <p>Yes, you can cancel your subscription at any time from your account settings. When you cancel, you'll retain access to your current features until the end of your billing period. After that, your account will revert to the free plan or become inactive depending on your settings.</p>
      </div>
    )
  },
  {
    id: 'faq-4',
    title: 'Do you offer refunds?',
    content: (
      <div>
        <p>We offer a 14-day money-back guarantee for new subscriptions. If you're not satisfied with our service within the first 14 days, contact our support team for a full refund. After this period, we do not offer prorated refunds for partial months.</p>
      </div>
    )
  },
  {
    id: 'faq-5',
    title: 'How do I contact support?',
    content: (
      <div className="space-y-4">
        <p>You can reach our support team through multiple channels:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Email: support@lovable.app</li>
          <li>Live chat: Available on our website during business hours</li>
          <li>Contact form: On our Contact page</li>
          <li>Discord community: For peer support and quick questions</li>
        </ul>
        <p>Our support hours are Monday-Friday, 9am-5pm EST.</p>
      </div>
    )
  },
];

const securityTopics = [
  {
    id: 'sec-1',
    title: 'Data protection',
    content: (
      <div className="space-y-4">
        <p>We take data protection seriously and implement multiple measures to secure your information:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>All data is encrypted at rest and in transit</li>
          <li>Regular security audits and penetration testing</li>
          <li>Compliance with GDPR and other privacy regulations</li>
          <li>Strict access controls for our team members</li>
          <li>Regular backups to prevent data loss</li>
        </ul>
      </div>
    )
  },
  {
    id: 'sec-2',
    title: 'SSL certificates',
    content: (
      <div>
        <p>All websites created on our platform are automatically secured with SSL certificates, ensuring encrypted connections for your visitors. This provides protection for any data transmitted between your website and its users, displays the padlock icon in browsers, and may improve your search engine rankings.</p>
      </div>
    )
  },
  {
    id: 'sec-3',
    title: 'Account security features',
    content: (
      <div className="space-y-4">
        <p>We offer several security features to protect your account:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Two-factor authentication (2FA)</li>
          <li>Login notifications</li>
          <li>Session management</li>
          <li>Password strength requirements</li>
          <li>API access controls</li>
        </ul>
        <p>We recommend enabling 2FA for maximum security.</p>
      </div>
    )
  },
];

export default Help;
