
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { ImageUpload } from '@/components/builder/ImageUpload';
import { WebsiteSettings } from '@/types/website';

interface SEOSettingsProps {
  settings: WebsiteSettings;
  onUpdate: (settings: WebsiteSettings) => void;
  onSave: () => void;
}

export function SEOSettings({ settings, onUpdate, onSave }: SEOSettingsProps) {
  const [saving, setSaving] = useState(false);
  
  const seo = settings.seo || {
    title: '',
    description: '',
    keywords: '',
    ogImage: '',
    canonicalUrl: '',
    noIndex: false
  };
  
  const updateSEO = (key: string, value: any) => {
    const updatedSettings = {
      ...settings,
      seo: {
        ...seo,
        [key]: value
      }
    };
    onUpdate(updatedSettings);
  };
  
  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave();
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>SEO Settings</CardTitle>
        <CardDescription>Optimize your website for search engines</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="seo-title">Page Title</Label>
          <Input
            id="seo-title"
            value={seo.title}
            onChange={(e) => updateSEO('title', e.target.value)}
            placeholder="Enter page title"
          />
          <p className="text-xs text-muted-foreground">
            Recommended: 50-60 characters
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="seo-description">Meta Description</Label>
          <Textarea
            id="seo-description"
            value={seo.description}
            onChange={(e) => updateSEO('description', e.target.value)}
            placeholder="Enter meta description"
            rows={3}
          />
          <p className="text-xs text-muted-foreground">
            Recommended: 150-160 characters
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="seo-keywords">Keywords</Label>
          <Input
            id="seo-keywords"
            value={seo.keywords}
            onChange={(e) => updateSEO('keywords', e.target.value)}
            placeholder="keyword1, keyword2, keyword3"
          />
          <p className="text-xs text-muted-foreground">
            Separate keywords with commas
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="seo-canonical">Canonical URL</Label>
          <Input
            id="seo-canonical"
            value={seo.canonicalUrl}
            onChange={(e) => updateSEO('canonicalUrl', e.target.value)}
            placeholder="https://example.com/page"
          />
          <p className="text-xs text-muted-foreground">
            Use this to prevent duplicate content issues
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="seo-og-image">Social Media Image</Label>
          <Input
            id="seo-og-image"
            value={seo.ogImage}
            onChange={(e) => updateSEO('ogImage', e.target.value)}
            placeholder="https://example.com/image.jpg"
          />
          <p className="text-xs text-muted-foreground">
            Recommended size: 1200 x 630 pixels
          </p>
        </div>
        
        <div className="flex items-center space-x-2 pt-4">
          <Switch
            id="seo-noindex"
            checked={seo.noIndex}
            onCheckedChange={(checked) => updateSEO('noIndex', checked)}
          />
          <Label htmlFor="seo-noindex">Hide from search engines</Label>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? 'Saving...' : 'Save SEO Settings'}
        </Button>
      </CardFooter>
    </Card>
  );
}
