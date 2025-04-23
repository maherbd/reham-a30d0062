
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ColorPicker } from '@/components/builder/ColorPicker';
import { WebsiteContent } from '@/types/website';

interface ComponentConfigPanelProps {
  component: WebsiteContent;
  onUpdate: (updatedComponent: WebsiteContent) => void;
  onClose: () => void;
}

export function ComponentConfigPanel({ component, onUpdate, onClose }: ComponentConfigPanelProps) {
  const updateContent = (key: string, value: any) => {
    const updatedComponent = {
      ...component,
      content: {
        ...component.content,
        [key]: value
      }
    };
    onUpdate(updatedComponent);
  };

  const updateSettings = (key: string, value: any) => {
    const updatedComponent = {
      ...component,
      settings: {
        ...component.settings,
        [key]: value
      }
    };
    onUpdate(updatedComponent);
  };

  const renderHeroConfig = () => (
    <>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input 
            id="title" 
            value={component.content.title || ''} 
            onChange={(e) => updateContent('title', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="subtitle">Subtitle</Label>
          <Textarea 
            id="subtitle" 
            value={component.content.subtitle || ''} 
            onChange={(e) => updateContent('subtitle', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="buttonText">Button Text</Label>
          <Input 
            id="buttonText" 
            value={component.content.buttonText || ''} 
            onChange={(e) => updateContent('buttonText', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="buttonLink">Button Link</Label>
          <Input 
            id="buttonLink" 
            value={component.content.buttonLink || ''} 
            onChange={(e) => updateContent('buttonLink', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="image">Image URL</Label>
          <Input 
            id="image" 
            value={component.content.image || ''} 
            onChange={(e) => updateContent('image', e.target.value)}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Background Color</Label>
            <ColorPicker
              color={component.settings?.backgroundColor || '#f0f0f0'}
              onChange={(color) => updateSettings('backgroundColor', color)}
            />
          </div>
          <div className="space-y-2">
            <Label>Text Color</Label>
            <ColorPicker
              color={component.settings?.textColor || '#333333'}
              onChange={(color) => updateSettings('textColor', color)}
            />
          </div>
        </div>
      </div>
    </>
  );

  const renderConfig = () => {
    switch (component.type) {
      case 'HeroSection':
        return renderHeroConfig();
      default:
        return <p>No configuration options available for this component type.</p>;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Configure {component.type}</CardTitle>
        <CardDescription>Customize the appearance and content of this component</CardDescription>
      </CardHeader>
      <CardContent>
        {renderConfig()}
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button>Apply Changes</Button>
      </CardFooter>
    </Card>
  );
}
