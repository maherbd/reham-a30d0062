
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  Layout, Type, Image, FileVideo, Form, MousePointer, 
  ListChecks, Table, BarChart, ShoppingCart, MapPin, Share,
  MessageSquare, Menu, Blocks, Component
} from 'lucide-react';

interface ComponentCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  components: ComponentItem[];
}

interface ComponentItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  isPremium: boolean;
}

export function ComponentLibrary() {
  return (
    <Card className="h-full border-0 rounded-none">
      <Tabs defaultValue="layout" className="h-full flex flex-col">
        <div className="px-4 pt-4">
          <TabsList className="w-full justify-start mb-2 overflow-auto">
            {componentCategories.map(category => (
              <TabsTrigger key={category.id} value={category.id} className="flex gap-2">
                {category.icon}
                <span className="hidden lg:inline">{category.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        
        {componentCategories.map(category => (
          <TabsContent 
            key={category.id} 
            value={category.id} 
            className="flex-grow mt-0 overflow-hidden"
          >
            <ScrollArea className="h-full">
              <div className="p-4 space-y-4">
                <div className="flex items-center gap-2">
                  {category.icon}
                  <h3 className="text-lg font-medium">{category.name} Components</h3>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-1 gap-3">
                  {category.components.map(component => (
                    <ComponentCard key={component.id} component={component} />
                  ))}
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
        ))}
      </Tabs>
    </Card>
  );
}

function ComponentCard({ component }: { component: ComponentItem }) {
  return (
    <div 
      className="border rounded-md p-3 cursor-move hover:border-primary/50 hover:bg-accent/50 transition-colors"
      draggable
    >
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-md bg-primary/10">
          {component.icon}
        </div>
        <div className="flex-grow">
          <div className="flex items-center gap-2">
            <h4 className="font-medium">{component.name}</h4>
            {component.isPremium && (
              <span className="text-xs bg-amber-600/20 text-amber-600 px-1.5 py-0.5 rounded font-medium">
                Premium
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{component.description}</p>
        </div>
      </div>
    </div>
  );
}

const componentCategories: ComponentCategory[] = [
  {
    id: 'layout',
    name: 'Layout',
    icon: <Layout className="h-4 w-4" />,
    components: [
      {
        id: 'section',
        name: 'Section',
        icon: <Blocks className="h-4 w-4" />,
        description: 'A full-width container for grouping content',
        isPremium: false
      },
      {
        id: 'container',
        name: 'Container',
        icon: <Component className="h-4 w-4" />,
        description: 'A centered, width-constrained wrapper',
        isPremium: false
      },
      {
        id: 'grid',
        name: 'Grid',
        icon: <Layout className="h-4 w-4" />,
        description: 'Multi-column responsive layout',
        isPremium: false
      },
      {
        id: 'responsive-columns',
        name: 'Responsive Columns',
        icon: <Blocks className="h-4 w-4" />,
        description: 'Columns that stack on mobile devices',
        isPremium: false
      }
    ]
  },
  {
    id: 'text',
    name: 'Text',
    icon: <Type className="h-4 w-4" />,
    components: [
      {
        id: 'heading',
        name: 'Heading',
        icon: <Type className="h-4 w-4" />,
        description: 'Large text for sections and titles',
        isPremium: false
      },
      {
        id: 'paragraph',
        name: 'Paragraph',
        icon: <Type className="h-4 w-4" />,
        description: 'Standard text block',
        isPremium: false
      },
      {
        id: 'list',
        name: 'List',
        icon: <ListChecks className="h-4 w-4" />,
        description: 'Ordered or unordered list of items',
        isPremium: false
      },
      {
        id: 'blockquote',
        name: 'Blockquote',
        icon: <Type className="h-4 w-4" />,
        description: 'Highlighted quote or excerpt',
        isPremium: false
      }
    ]
  },
  {
    id: 'media',
    name: 'Media',
    icon: <Image className="h-4 w-4" />,
    components: [
      {
        id: 'image',
        name: 'Image',
        icon: <Image className="h-4 w-4" />,
        description: 'Display a single image with optional caption',
        isPremium: false
      },
      {
        id: 'gallery',
        name: 'Image Gallery',
        icon: <Image className="h-4 w-4" />,
        description: 'Collection of images in a grid layout',
        isPremium: true
      },
      {
        id: 'video',
        name: 'Video Player',
        icon: <FileVideo className="h-4 w-4" />,
        description: 'Embed YouTube, Vimeo or custom video',
        isPremium: true
      },
      {
        id: 'carousel',
        name: 'Carousel',
        icon: <Image className="h-4 w-4" />,
        description: 'Rotating slideshow of images or content',
        isPremium: true
      }
    ]
  },
  {
    id: 'input',
    name: 'Input',
    icon: <Form className="h-4 w-4" />,
    components: [
      {
        id: 'button',
        name: 'Button',
        icon: <MousePointer className="h-4 w-4" />,
        description: 'Clickable button with customizable style',
        isPremium: false
      },
      {
        id: 'form',
        name: 'Contact Form',
        icon: <Form className="h-4 w-4" />,
        description: 'Email contact form with validation',
        isPremium: true
      },
      {
        id: 'newsletter',
        name: 'Newsletter Signup',
        icon: <Form className="h-4 w-4" />,
        description: 'Email collection form with integrations',
        isPremium: true
      }
    ]
  },
  {
    id: 'data',
    name: 'Data',
    icon: <Table className="h-4 w-4" />,
    components: [
      {
        id: 'table',
        name: 'Table',
        icon: <Table className="h-4 w-4" />,
        description: 'Structured data in rows and columns',
        isPremium: false
      },
      {
        id: 'pricing-table',
        name: 'Pricing Table',
        icon: <Table className="h-4 w-4" />,
        description: 'Compare features across pricing tiers',
        isPremium: true
      },
      {
        id: 'chart',
        name: 'Chart',
        icon: <BarChart className="h-4 w-4" />,
        description: 'Visual data representation',
        isPremium: true
      }
    ]
  },
  {
    id: 'commerce',
    name: 'Commerce',
    icon: <ShoppingCart className="h-4 w-4" />,
    components: [
      {
        id: 'product-card',
        name: 'Product Card',
        icon: <ShoppingCart className="h-4 w-4" />,
        description: 'Display product with image, price and CTA',
        isPremium: true
      },
      {
        id: 'product-grid',
        name: 'Product Grid',
        icon: <ShoppingCart className="h-4 w-4" />,
        description: 'Collection of products in a grid layout',
        isPremium: true
      }
    ]
  },
  {
    id: 'social',
    name: 'Social',
    icon: <Share className="h-4 w-4" />,
    components: [
      {
        id: 'social-links',
        name: 'Social Links',
        icon: <Share className="h-4 w-4" />,
        description: 'Icons linking to social media profiles',
        isPremium: false
      },
      {
        id: 'social-feed',
        name: 'Social Feed',
        icon: <Share className="h-4 w-4" />,
        description: 'Display posts from a social media account',
        isPremium: true
      },
      {
        id: 'comments',
        name: 'Comments Section',
        icon: <MessageSquare className="h-4 w-4" />,
        description: 'User comments and discussions',
        isPremium: true
      }
    ]
  },
  {
    id: 'navigation',
    name: 'Navigation',
    icon: <Menu className="h-4 w-4" />,
    components: [
      {
        id: 'navbar',
        name: 'Navigation Bar',
        icon: <Menu className="h-4 w-4" />,
        description: 'Header navigation with links',
        isPremium: false
      },
      {
        id: 'footer',
        name: 'Footer',
        icon: <Menu className="h-4 w-4" />,
        description: 'Site footer with links and info',
        isPremium: false
      }
    ]
  }
];
