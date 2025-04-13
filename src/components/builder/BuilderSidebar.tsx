
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Layers, Type, Image, Box, Grid, Layout, Palette, Save, Eye, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BuilderSidebarProps {
  onSave: () => void;
  onPreview: () => void;
}

export function BuilderSidebar({ onSave, onPreview }: BuilderSidebarProps) {
  return (
    <div className="w-64 bg-background border-r border-border flex flex-col h-full">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/dashboard">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Link>
        </Button>
        <div className="flex gap-1">
          <Button size="icon" variant="ghost" onClick={onPreview}>
            <Eye className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="default" onClick={onSave}>
            <Save className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="elements" className="flex-1 overflow-hidden flex flex-col">
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="elements">
            <Box className="h-4 w-4" />
          </TabsTrigger>
          <TabsTrigger value="layout">
            <Layout className="h-4 w-4" />
          </TabsTrigger>
          <TabsTrigger value="layers">
            <Layers className="h-4 w-4" />
          </TabsTrigger>
          <TabsTrigger value="styles">
            <Palette className="h-4 w-4" />
          </TabsTrigger>
        </TabsList>
        
        <div className="flex-1 overflow-y-auto">
          <TabsContent value="elements" className="p-0 h-full">
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-2">
                {['Heading', 'Text', 'Button', 'Image', 'Video', 'Form', 'Icon', 'Divider'].map((item) => (
                  <Card key={item} className="p-2 cursor-pointer hover:bg-accent/50 transition-colors">
                    <CardContent className="p-0 flex flex-col items-center justify-center">
                      {item === 'Heading' && <Type className="h-4 w-4 mb-1" />}
                      {item === 'Text' && <Type className="h-4 w-4 mb-1" />}
                      {item === 'Button' && <Box className="h-4 w-4 mb-1" />}
                      {item === 'Image' && <Image className="h-4 w-4 mb-1" />}
                      {item === 'Video' && <Box className="h-4 w-4 mb-1" />}
                      {item === 'Form' && <Box className="h-4 w-4 mb-1" />}
                      {item === 'Icon' && <Box className="h-4 w-4 mb-1" />}
                      {item === 'Divider' && <Box className="h-4 w-4 mb-1" />}
                      <span className="text-xs">{item}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="sections">
                  <AccordionTrigger>
                    <div className="flex items-center">
                      <Grid className="h-4 w-4 mr-2" />
                      Sections
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 gap-2">
                      {['Hero', 'Features', 'Gallery', 'Pricing', 'Team', 'Contact', 'FAQ'].map((section) => (
                        <Button key={section} variant="outline" className="justify-start" size="sm">
                          {section}
                        </Button>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="blocks">
                  <AccordionTrigger>
                    <div className="flex items-center">
                      <Box className="h-4 w-4 mr-2" />
                      Blocks
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 gap-2">
                      {['Testimonial', 'Call to Action', 'Newsletter', 'Stats', 'Timeline'].map((block) => (
                        <Button key={block} variant="outline" className="justify-start" size="sm">
                          {block}
                        </Button>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </TabsContent>
          
          <TabsContent value="layers" className="p-4 h-full overflow-y-auto space-y-4">
            <div className="border rounded-md p-2 space-y-1">
              {['Header', 'Hero Section', 'Feature Section', 'Footer'].map((layer, index) => (
                <div 
                  key={layer} 
                  className="flex items-center justify-between p-2 text-sm hover:bg-accent/50 rounded cursor-pointer"
                >
                  <span>{layer}</span>
                  <span className="text-muted-foreground">{index + 1}</span>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="styles" className="p-4 h-full overflow-y-auto space-y-6">
            <div className="space-y-4">
              <h3 className="font-medium">Typography</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Font Family</Label>
                  <Input placeholder="Inter" />
                </div>
                <div className="space-y-2">
                  <Label>Font Size</Label>
                  <Slider defaultValue={[16]} max={72} step={1} />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium">Colors</h3>
              <div className="grid grid-cols-4 gap-2">
                {['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#FF33F3', '#33FFF3', '#1A1A1A', '#FFFFFF'].map((color) => (
                  <div 
                    key={color} 
                    className="w-full aspect-square rounded cursor-pointer hover:ring-2 ring-primary transition-all"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium">Spacing</h3>
              <div className="space-y-2">
                <Label>Padding</Label>
                <Slider defaultValue={[16]} max={100} step={1} />
              </div>
              <div className="space-y-2">
                <Label>Margin</Label>
                <Slider defaultValue={[16]} max={100} step={1} />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="layout" className="p-4 h-full overflow-y-auto space-y-4">
            <div className="grid grid-cols-2 gap-2">
              {[1, 2, 3, 4, 6, 12].map((cols) => (
                <Card 
                  key={cols} 
                  className="p-2 cursor-pointer hover:bg-accent/50 transition-colors"
                >
                  <CardContent className="p-0 h-12 flex items-center justify-center">
                    <div className="grid w-full h-6" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
                      {Array(cols).fill(0).map((_, i) => (
                        <div key={i} className="bg-muted-foreground/30 mx-0.5"></div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
