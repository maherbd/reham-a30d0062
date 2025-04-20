
import React from 'react';
import { 
  Layout, 
  Type, 
  Image, 
  Columns, 
  Layers, 
  CreditCard, 
  Share2, 
  Contact, 
  FileText 
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ComponentCategoryProps {
  title: string;
  icon: React.ReactNode;
  components: { name: string; icon?: React.ReactNode; }[];
  onSelectComponent: (name: string) => void;
}

export function ComponentLibrary() {
  // This component displays a library of components that can be added to the website
  const handleComponentSelect = (component: string) => {
    console.log('Selected component:', component);
    // In a real implementation, this would add the component to the website
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Component Library</h2>
        
        <Accordion type="single" collapsible className="w-full">
          <ComponentCategory
            title="Layout"
            icon={<Layout className="h-4 w-4" />}
            components={[
              { name: 'Container', icon: <Layers className="h-4 w-4" /> },
              { name: 'Grid', icon: <Columns className="h-4 w-4" /> },
              { name: 'Flex' },
              { name: 'Divider' },
            ]}
            onSelectComponent={handleComponentSelect}
          />
          
          <ComponentCategory
            title="Content"
            icon={<Type className="h-4 w-4" />}
            components={[
              { name: 'Heading' },
              { name: 'Text' },
              { name: 'List' },
              { name: 'Quote' },
            ]}
            onSelectComponent={handleComponentSelect}
          />
          
          <ComponentCategory
            title="Media"
            icon={<Image className="h-4 w-4" />}
            components={[
              { name: 'Image' },
              { name: 'Gallery' },
              { name: 'Video' },
              { name: 'Icon' },
            ]}
            onSelectComponent={handleComponentSelect}
          />
          
          <ComponentCategory
            title="Forms"
            icon={<FileText className="h-4 w-4" />}
            components={[
              { name: 'Input' },
              { name: 'Textarea' },
              { name: 'Checkbox' },
              { name: 'Select' },
              { name: 'Button' },
            ]}
            onSelectComponent={handleComponentSelect}
          />
          
          <ComponentCategory
            title="Commerce"
            icon={<CreditCard className="h-4 w-4" />}
            components={[
              { name: 'Product Card' },
              { name: 'Price' },
              { name: 'Add to Cart' },
              { name: 'Payment Form' },
            ]}
            onSelectComponent={handleComponentSelect}
          />
          
          <ComponentCategory
            title="Social"
            icon={<Share2 className="h-4 w-4" />}
            components={[
              { name: 'Social Links' },
              { name: 'Share Button' },
              { name: 'Comments' },
              { name: 'Community' },
            ]}
            onSelectComponent={handleComponentSelect}
          />
          
          <ComponentCategory
            title="Contact"
            icon={<Contact className="h-4 w-4" />}
            components={[
              { name: 'Contact Form' },
              { name: 'Map' },
              { name: 'Address' },
              { name: 'Subscribe' },
            ]}
            onSelectComponent={handleComponentSelect}
          />
        </Accordion>
      </div>
    </ScrollArea>
  );
}

function ComponentCategory({ title, icon, components, onSelectComponent }: ComponentCategoryProps) {
  return (
    <AccordionItem value={title}>
      <AccordionTrigger className="hover:no-underline">
        <div className="flex items-center gap-2">
          {icon}
          <span>{title}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="grid grid-cols-1 gap-2 pt-2">
          {components.map((component) => (
            <Card key={component.name} className="p-1">
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 px-2"
                onClick={() => onSelectComponent(component.name)}
              >
                {component.icon}
                <span className="text-sm">{component.name}</span>
              </Button>
            </Card>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
