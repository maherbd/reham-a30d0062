
import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger 
} from '@/components/ui/accordion';
import { FadeIn, FadeInStagger } from '@/components/transitions/FadeIn';
import { Search, FileText, HelpCircle, BookOpen, Zap, Code, Users, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Help = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter help articles based on search query
  const filterArticles = (articles: HelpArticle[]) => {
    if (!searchQuery) return articles;
    
    return articles.filter(article => 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow mt-16 py-12">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">How can we help you?</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Find answers to common questions or browse our documentation
              </p>
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search help articles..."
                  className="pl-10 h-12"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </FadeIn>

          <Tabs defaultValue="getting-started" className="max-w-4xl mx-auto">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="builder">Website Builder</TabsTrigger>
              <TabsTrigger value="faq">FAQs</TabsTrigger>
            </TabsList>
            
            <TabsContent value="getting-started">
              <FadeInStagger className="grid gap-6" staggerDelay={100}>
                {filterArticles(gettingStartedArticles).map((article, index) => (
                  <HelpArticleCard key={index} article={article} />
                ))}
              </FadeInStagger>
            </TabsContent>
            
            <TabsContent value="templates">
              <FadeInStagger className="grid gap-6" staggerDelay={100}>
                {filterArticles(templateArticles).map((article, index) => (
                  <HelpArticleCard key={index} article={article} />
                ))}
              </FadeInStagger>
            </TabsContent>
            
            <TabsContent value="builder">
              <FadeInStagger className="grid gap-6" staggerDelay={100}>
                {filterArticles(builderArticles).map((article, index) => (
                  <HelpArticleCard key={index} article={article} />
                ))}
              </FadeInStagger>
            </TabsContent>
            
            <TabsContent value="faq">
              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                  <CardDescription>
                    Quick answers to common questions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {filterArticles(faqArticles).map((faq, index) => (
                      <AccordionItem key={index} value={`faq-${index}`}>
                        <AccordionTrigger>{faq.title}</AccordionTrigger>
                        <AccordionContent>
                          <div dangerouslySetInnerHTML={{ __html: faq.content }} />
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <FadeIn delay={300}>
            <div className="max-w-4xl mx-auto mt-16 bg-secondary/30 rounded-lg p-8 flex flex-col sm:flex-row items-center justify-between">
              <div className="mb-6 sm:mb-0 sm:mr-6">
                <h2 className="text-2xl font-semibold mb-2">Still need help?</h2>
                <p className="text-muted-foreground">
                  Reach out to our support team and we'll get back to you as soon as possible.
                </p>
              </div>
              <Button asChild>
                <Link to="/contact">Contact Support</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </main>
      <Footer />
    </div>
  );
};

interface HelpArticle {
  title: string;
  excerpt: string;
  content: string;
  icon: React.ReactNode;
}

const HelpArticleCard = ({ article }: { article: HelpArticle }) => (
  <FadeIn>
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-start space-x-4">
        <div className="bg-primary/10 p-2 rounded-lg">
          {article.icon}
        </div>
        <div>
          <CardTitle>{article.title}</CardTitle>
          <CardDescription className="mt-2">{article.excerpt}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: article.content }} />
        <Button variant="link" className="p-0 mt-2 h-auto flex items-center">
          <span>Read more</span>
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </CardContent>
    </Card>
  </FadeIn>
);

const gettingStartedArticles: HelpArticle[] = [
  {
    title: "Creating your first website",
    excerpt: "A step-by-step guide to creating your first Web3 website",
    content: "Learn how to create your first website using our platform. This guide walks you through selecting a template, customizing it, and publishing your site online. Perfect for beginners who are just getting started with Web3 websites.",
    icon: <FileText className="h-6 w-6 text-primary" />
  },
  {
    title: "Understanding Web3 Integration",
    excerpt: "Learn about connecting wallets and blockchain functionality",
    content: "This guide explains how our platform integrates with Web3 technologies like wallet connections, smart contracts, and blockchain data. Understanding these concepts will help you make the most of your Web3 website.",
    icon: <Zap className="h-6 w-6 text-primary" />
  },
  {
    title: "Account Setup",
    excerpt: "How to set up and manage your account",
    content: "Learn how to create an account, set up your profile, and manage your account settings. This guide covers everything from registration to security settings and notification preferences.",
    icon: <Users className="h-6 w-6 text-primary" />
  }
];

const templateArticles: HelpArticle[] = [
  {
    title: "Choosing the Right Template",
    excerpt: "Tips for selecting the perfect template for your needs",
    content: "Not all templates are created equal. This guide helps you understand the different template categories, features, and use cases so you can choose the template that best fits your project needs.",
    icon: <BookOpen className="h-6 w-6 text-primary" />
  },
  {
    title: "Customizing Templates",
    excerpt: "How to personalize your template without coding",
    content: "Our templates are fully customizable without requiring coding knowledge. Learn how to change colors, fonts, layouts, and content to create a unique website that matches your brand identity.",
    icon: <Code className="h-6 w-6 text-primary" />
  },
  {
    title: "Template Categories Explained",
    excerpt: "Understanding different template categories and their purposes",
    content: "We offer templates for various Web3 use cases including meme coins, NFTs, DAOs, DeFi, GameFi, and social platforms. This guide explains the features specific to each category and how to make the most of them.",
    icon: <HelpCircle className="h-6 w-6 text-primary" />
  }
];

const builderArticles: HelpArticle[] = [
  {
    title: "Website Builder Basics",
    excerpt: "Learn about the core features of our website builder",
    content: "Our drag-and-drop website builder makes it easy to create and customize your Web3 website. This guide covers the basic functionality including the component library, layout tools, and preview options.",
    icon: <Code className="h-6 w-6 text-primary" />
  },
  {
    title: "Adding and Configuring Components",
    excerpt: "How to add and customize components on your website",
    content: "Components are the building blocks of your website. This guide shows you how to add components from the library, arrange them on your pages, and configure their properties to achieve the exact look and functionality you want.",
    icon: <Zap className="h-6 w-6 text-primary" />
  },
  {
    title: "Publishing Your Website",
    excerpt: "Steps to publish your website and make it live",
    content: "When your website is ready to go live, follow this guide to publish it. Learn about our publishing process, domain options, and how to update your site after it's been published.",
    icon: <FileText className="h-6 w-6 text-primary" />
  }
];

const faqArticles: HelpArticle[] = [
  {
    title: "What is a custom domain and how do I set it up?",
    excerpt: "",
    content: "A custom domain allows you to use your own domain name (like <strong>yourbrand.com</strong>) for your website instead of our default subdomain. To set up a custom domain, go to your website settings, click on 'Domain Settings', and follow the instructions to connect your domain. You'll need to update your DNS records with your domain registrar.",
    icon: <HelpCircle className="h-6 w-6 text-primary" />
  },
  {
    title: "How do I connect a Web3 wallet to my website?",
    excerpt: "",
    content: "Our platform includes built-in components for connecting popular Web3 wallets like MetaMask, Phantom, and WalletConnect. Simply add a 'Connect Wallet' component to your website from the component library, and configure it according to the blockchains you want to support.",
    icon: <HelpCircle className="h-6 w-6 text-primary" />
  },
  {
    title: "Can I transfer my website to another platform?",
    excerpt: "",
    content: "Yes, you can export your website's code and assets at any time by going to Settings > Export. This will provide you with a zip file containing your website's HTML, CSS, JavaScript, and other assets that you can deploy to any hosting provider.",
    icon: <HelpCircle className="h-6 w-6 text-primary" />
  },
  {
    title: "How do I track visitor analytics for my website?",
    excerpt: "",
    content: "Our platform includes built-in analytics that track key metrics like page views, unique visitors, and engagement. To access your analytics, go to your dashboard and click on the 'Analytics' tab for the website you want to monitor. You can also integrate with third-party analytics services like Google Analytics.",
    icon: <HelpCircle className="h-6 w-6 text-primary" />
  },
  {
    title: "What payment methods do you accept?",
    excerpt: "",
    content: "We accept payments through various cryptocurrency wallets supporting Solana (SOL) and USDC. You can pay using connected wallets like Phantom or Solflare. We also support traditional payment methods through partners on our premium plans.",
    icon: <HelpCircle className="h-6 w-6 text-primary" />
  }
];

export default Help;
