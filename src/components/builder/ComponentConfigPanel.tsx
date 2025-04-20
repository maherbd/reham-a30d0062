
import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ColorPicker } from './ColorPicker';
import { 
  Settings, 
  Layers, 
  Type, 
  Image, 
  Link,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline
} from 'lucide-react';

interface ComponentConfigPanelProps {
  selectedComponent: any | null;
  onUpdateComponent: (id: string, updates: any) => void;
}

export function ComponentConfigPanel({ selectedComponent, onUpdateComponent }: ComponentConfigPanelProps) {
  if (!selectedComponent) {
    return (
      <Card className="p-6 text-center h-full flex flex-col justify-center items-center text-muted-foreground">
        <Layers className="h-10 w-10 mb-4 opacity-40" />
        <p>Select a component to configure it</p>
      </Card>
    );
  }

  const handleChange = (field: string, value: any) => {
    onUpdateComponent(selectedComponent.id, { [field]: value });
  };

  return (
    <Card className="h-full overflow-hidden flex flex-col">
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          <h3 className="font-medium">Component Settings</h3>
        </div>
        <div className="text-xs text-muted-foreground rounded-md bg-muted px-2 py-1">
          {selectedComponent.type || 'Component'}
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          <Tabs defaultValue="content" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="content" className="flex-1">Content</TabsTrigger>
              <TabsTrigger value="style" className="flex-1">Style</TabsTrigger>
              <TabsTrigger value="advanced" className="flex-1">Advanced</TabsTrigger>
            </TabsList>
            
            <TabsContent value="content" className="pt-4 space-y-4">
              {/* Common fields */}
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={selectedComponent.title || ''}
                  onChange={(e) => handleChange('title', e.target.value)}
                />
              </div>
              
              {selectedComponent.type === 'text' && (
                <div className="space-y-2">
                  <Label htmlFor="text">Text Content</Label>
                  <Textarea
                    id="text"
                    value={selectedComponent.content || ''}
                    onChange={(e) => handleChange('content', e.target.value)}
                    rows={4}
                  />
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Button size="sm" variant="outline" onClick={() => {}}>
                      <Bold className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => {}}>
                      <Italic className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => {}}>
                      <Underline className="h-4 w-4" />
                    </Button>
                    <Separator orientation="vertical" className="mx-1" />
                    <Button size="sm" variant="outline" onClick={() => {}}>
                      <AlignLeft className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => {}}>
                      <AlignCenter className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => {}}>
                      <AlignRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
              
              {selectedComponent.type === 'image' && (
                <div className="space-y-2">
                  <Label htmlFor="imageUrl">Image URL</Label>
                  <Input
                    id="imageUrl"
                    value={selectedComponent.src || ''}
                    onChange={(e) => handleChange('src', e.target.value)}
                  />
                  <Label htmlFor="imageAlt">Alt Text</Label>
                  <Input
                    id="imageAlt"
                    value={selectedComponent.alt || ''}
                    onChange={(e) => handleChange('alt', e.target.value)}
                  />
                </div>
              )}
              
              {selectedComponent.type === 'button' && (
                <div className="space-y-2">
                  <Label htmlFor="buttonText">Button Text</Label>
                  <Input
                    id="buttonText"
                    value={selectedComponent.label || ''}
                    onChange={(e) => handleChange('label', e.target.value)}
                  />
                  <Label htmlFor="buttonUrl">URL</Label>
                  <Input
                    id="buttonUrl"
                    value={selectedComponent.url || ''}
                    onChange={(e) => handleChange('url', e.target.value)}
                  />
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="style" className="pt-4 space-y-4">
              <div className="space-y-2">
                <Label>Background Color</Label>
                <ColorPicker 
                  color={selectedComponent.backgroundColor || '#ffffff'} 
                  onChange={(color) => handleChange('backgroundColor', color)} 
                />
              </div>
              
              <div className="space-y-2">
                <Label>Text Color</Label>
                <ColorPicker 
                  color={selectedComponent.color || '#000000'} 
                  onChange={(color) => handleChange('color', color)} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="padding">Padding</Label>
                <div className="grid grid-cols-4 gap-2">
                  <Input
                    id="paddingTop"
                    placeholder="Top"
                    value={selectedComponent.paddingTop || ''}
                    onChange={(e) => handleChange('paddingTop', e.target.value)}
                  />
                  <Input
                    id="paddingRight"
                    placeholder="Right"
                    value={selectedComponent.paddingRight || ''}
                    onChange={(e) => handleChange('paddingRight', e.target.value)}
                  />
                  <Input
                    id="paddingBottom"
                    placeholder="Bottom"
                    value={selectedComponent.paddingBottom || ''}
                    onChange={(e) => handleChange('paddingBottom', e.target.value)}
                  />
                  <Input
                    id="paddingLeft"
                    placeholder="Left"
                    value={selectedComponent.paddingLeft || ''}
                    onChange={(e) => handleChange('paddingLeft', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="border">Border</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    id="borderWidth"
                    placeholder="Width"
                    value={selectedComponent.borderWidth || ''}
                    onChange={(e) => handleChange('borderWidth', e.target.value)}
                  />
                  <div>
                    <ColorPicker 
                      color={selectedComponent.borderColor || '#000000'} 
                      onChange={(color) => handleChange('borderColor', color)} 
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="advanced" className="pt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="id">Component ID</Label>
                <Input
                  id="id"
                  value={selectedComponent.id || ''}
                  readOnly
                  disabled
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="customClasses">Custom Classes</Label>
                <Input
                  id="customClasses"
                  value={selectedComponent.customClasses || ''}
                  onChange={(e) => handleChange('customClasses', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="customAttributes">Custom Attributes (JSON)</Label>
                <Textarea
                  id="customAttributes"
                  value={selectedComponent.customAttributes || ''}
                  onChange={(e) => handleChange('customAttributes', e.target.value)}
                  rows={4}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>
    </Card>
  );
}
