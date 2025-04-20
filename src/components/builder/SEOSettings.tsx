
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Link } from 'lucide-react';

interface SEOData {
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
  canonicalUrl: string;
  noIndex: boolean;
}

interface SEOSettingsProps {
  websiteId: string;
  seoData: SEOData;
  onSave: (data: SEOData) => void;
}

export function SEOSettings({ websiteId, seoData, onSave }: SEOSettingsProps) {
  const [formData, setFormData] = React.useState<SEOData>(seoData);

  const handleChange = (field: keyof SEOData, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Link className="h-5 w-5" /> 
          SEO Settings
        </CardTitle>
        <CardDescription>
          Optimize your website for search engines and social media sharing.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="seo-title">Page Title</Label>
            <Input 
              id="seo-title" 
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Enter page title"
            />
            <p className="text-xs text-muted-foreground">
              Recommended length: 50-60 characters
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="seo-description">Meta Description</Label>
            <Textarea 
              id="seo-description" 
              rows={3}
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Enter meta description"
            />
            <p className="text-xs text-muted-foreground">
              Recommended length: 150-160 characters
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="seo-keywords">Keywords</Label>
            <Input 
              id="seo-keywords" 
              value={formData.keywords}
              onChange={(e) => handleChange('keywords', e.target.value)}
              placeholder="keyword1, keyword2, keyword3"
            />
            <p className="text-xs text-muted-foreground">
              Separate keywords with commas
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="seo-ogimage">Social Media Image</Label>
            <Input 
              id="seo-ogimage" 
              value={formData.ogImage}
              onChange={(e) => handleChange('ogImage', e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
            <p className="text-xs text-muted-foreground">
              Recommended size: 1200x630 pixels
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="seo-canonicalUrl">Canonical URL</Label>
            <Input 
              id="seo-canonicalUrl" 
              value={formData.canonicalUrl}
              onChange={(e) => handleChange('canonicalUrl', e.target.value)}
              placeholder="https://example.com/page"
            />
          </div>

          <div className="flex items-center space-x-2 py-2">
            <Switch 
              id="seo-noindex"
              checked={formData.noIndex}
              onCheckedChange={(checked) => handleChange('noIndex', checked)}
            />
            <Label htmlFor="seo-noindex">Hide from search engines</Label>
          </div>

          <Button type="submit" className="w-full">
            Save SEO Settings
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
