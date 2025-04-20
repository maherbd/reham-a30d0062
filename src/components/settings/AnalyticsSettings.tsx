
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { 
  Alert,
  AlertDescription,
} from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { ChartBar } from 'lucide-react';
import { toast } from 'sonner';

interface AnalyticsSettings {
  googleAnalyticsId: string;
  enableBuiltInAnalytics: boolean;
  facebookPixelId: string;
  hotjarId: string;
  customHeadCode: string;
}

interface AnalyticsSettingsProps {
  websiteId: string;
  settings: AnalyticsSettings;
  onSave: (settings: AnalyticsSettings) => Promise<boolean>;
}

export function AnalyticsSettings({ 
  websiteId, 
  settings: initialSettings,
  onSave
}: AnalyticsSettingsProps) {
  const [settings, setSettings] = useState<AnalyticsSettings>(initialSettings);
  const [loading, setLoading] = useState(false);

  const handleChange = (field: keyof AnalyticsSettings, value: any) => {
    setSettings({ ...settings, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const success = await onSave(settings);
      if (success) {
        toast.success('Analytics settings saved successfully');
      } else {
        toast.error('Failed to save analytics settings');
      }
    } catch (error) {
      console.error('Error saving analytics settings:', error);
      toast.error('An error occurred while saving settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <ChartBar className="h-5 w-5" /> 
          Analytics Settings
        </CardTitle>
        <CardDescription>
          Configure analytics tools to track visitor behavior on your site.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="basic">Basic</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
              <TabsTrigger value="custom">Custom Code</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic" className="pt-4 space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label htmlFor="built-in-analytics">Built-in Analytics</Label>
                  <p className="text-sm text-muted-foreground">
                    Track page views, visitors, and more with our built-in analytics.
                  </p>
                </div>
                <Switch
                  id="built-in-analytics"
                  checked={settings.enableBuiltInAnalytics}
                  onCheckedChange={(checked) => handleChange('enableBuiltInAnalytics', checked)}
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="google-analytics-id">Google Analytics ID</Label>
                <Input
                  id="google-analytics-id"
                  value={settings.googleAnalyticsId}
                  onChange={(e) => handleChange('googleAnalyticsId', e.target.value)}
                  placeholder="G-XXXXXXXXXX"
                />
                <p className="text-xs text-muted-foreground">
                  Enter your Google Analytics 4 measurement ID
                </p>
              </div>

              {settings.enableBuiltInAnalytics && settings.googleAnalyticsId && (
                <Alert>
                  <AlertDescription>
                    You've enabled both built-in analytics and Google Analytics. 
                    They'll work together to provide comprehensive tracking.
                  </AlertDescription>
                </Alert>
              )}
            </TabsContent>
            
            <TabsContent value="advanced" className="pt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="facebook-pixel-id">Facebook Pixel ID</Label>
                <Input
                  id="facebook-pixel-id"
                  value={settings.facebookPixelId}
                  onChange={(e) => handleChange('facebookPixelId', e.target.value)}
                  placeholder="XXXXXXXXXXXX"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="hotjar-id">Hotjar Site ID</Label>
                <Input
                  id="hotjar-id"
                  value={settings.hotjarId}
                  onChange={(e) => handleChange('hotjarId', e.target.value)}
                  placeholder="XXXXXXX"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="custom" className="pt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="custom-head-code">Custom Head Code</Label>
                <Textarea
                  id="custom-head-code"
                  value={settings.customHeadCode}
                  onChange={(e) => handleChange('customHeadCode', e.target.value)}
                  placeholder="<!-- Add your custom scripts, meta tags, or other HTML -->"
                  className="font-mono text-sm"
                  rows={8}
                />
                <p className="text-xs text-muted-foreground">
                  This code will be inserted in the <code>&lt;head&gt;</code> section of your website.
                </p>
              </div>
              
              <Alert>
                <AlertDescription>
                  Be careful when adding custom code. Invalid code may cause your site to malfunction.
                </AlertDescription>
              </Alert>
            </TabsContent>
          </Tabs>
          
          <Button type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save Analytics Settings'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
