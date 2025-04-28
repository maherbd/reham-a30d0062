
import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { CheckCircle, AlertCircle, Copy, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { WebsiteData } from '@/types/template';

interface DomainSettingsProps {
  website: WebsiteData;
  onUpdate: () => void;
}

export function DomainSettings({ website, onUpdate }: DomainSettingsProps) {
  const [subdomain, setSubdomain] = useState(website.subdomain || '');
  const [customDomain, setCustomDomain] = useState(website.custom_domain || '');
  const [isVerified, setIsVerified] = useState(
    website.settings?.domainVerified || false
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const baseSubdomain = 'lovable.app';
  
  useEffect(() => {
    setSubdomain(website.subdomain || '');
    setCustomDomain(website.custom_domain || '');
    setIsVerified(website.settings?.domainVerified || false);
  }, [website]);

  const updateSubdomain = async () => {
    if (!subdomain.trim()) {
      toast.error('Subdomain cannot be empty');
      return;
    }
    
    // Simple validation for subdomain format
    const subdomainRegex = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/;
    if (!subdomainRegex.test(subdomain)) {
      toast.error('Invalid subdomain format');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Check if subdomain is already in use
      const { data, error: checkError } = await supabase
        .from('websites')
        .select('id')
        .eq('subdomain', subdomain)
        .neq('id', website.id);
      
      if (checkError) {
        throw checkError;
      }
      
      if (data && data.length > 0) {
        toast.error('This subdomain is already in use');
        setIsLoading(false);
        return;
      }
      
      // Update the subdomain
      const { error: updateError } = await supabase
        .from('websites')
        .update({ subdomain })
        .eq('id', website.id);
      
      if (updateError) {
        throw updateError;
      }
      
      toast.success('Subdomain updated successfully');
      onUpdate();
      
    } catch (error) {
      console.error('Error updating subdomain:', error);
      toast.error('Failed to update subdomain');
    } finally {
      setIsLoading(false);
    }
  };

  const updateCustomDomain = async () => {
    if (!customDomain.trim()) {
      toast.error('Domain cannot be empty');
      return;
    }
    
    // Simple validation for domain format
    const domainRegex = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/;
    if (!domainRegex.test(customDomain)) {
      toast.error('Invalid domain format');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Check if domain is already in use
      const { data, error: checkError } = await supabase
        .from('websites')
        .select('id')
        .eq('custom_domain', customDomain)
        .neq('id', website.id);
      
      if (checkError) {
        throw checkError;
      }
      
      if (data && data.length > 0) {
        toast.error('This domain is already in use');
        setIsLoading(false);
        return;
      }
      
      // Update the domain and reset verification status
      const { error: updateError } = await supabase
        .from('websites')
        .update({ 
          custom_domain: customDomain,
          settings: {
            ...website.settings,
            domainVerified: false
          }
        })
        .eq('id', website.id);
      
      if (updateError) {
        throw updateError;
      }
      
      setIsVerified(false);
      toast.success('Custom domain updated successfully');
      toast('Domain verification required', {
        description: 'Please verify your domain by adding the required DNS records',
      });
      onUpdate();
      
    } catch (error) {
      console.error('Error updating custom domain:', error);
      toast.error('Failed to update custom domain');
    } finally {
      setIsLoading(false);
    }
  };

  const verifyDomain = async () => {
    setIsVerifying(true);
    
    try {
      // This would typically involve checking DNS records to verify ownership
      // For demo purposes, we'll simulate a verification process
      
      // Simulate verification check
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update verification status
      const { error } = await supabase
        .from('websites')
        .update({ 
          settings: {
            ...website.settings,
            domainVerified: true
          }
        })
        .eq('id', website.id);
      
      if (error) {
        throw error;
      }
      
      setIsVerified(true);
      toast.success('Domain verified successfully');
      onUpdate();
      
    } catch (error) {
      console.error('Error verifying domain:', error);
      toast.error('Failed to verify domain');
    } finally {
      setIsVerifying(false);
    }
  };

  const copyDnsRecords = () => {
    navigator.clipboard.writeText(`
Type: CNAME
Name: @
Value: custom.lovable.app
TTL: Automatic
    `);
    toast.success('DNS records copied to clipboard');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Subdomain Settings</CardTitle>
          <CardDescription>
            Set a custom subdomain for your website on our platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="subdomain">Subdomain</Label>
              <div className="flex items-center">
                <Input
                  id="subdomain"
                  placeholder="yoursite"
                  value={subdomain}
                  onChange={(e) => setSubdomain(e.target.value)}
                  className="rounded-r-none"
                />
                <div className="bg-muted flex items-center px-3 h-10 rounded-r-md border border-l-0">
                  .{baseSubdomain}
                </div>
              </div>
            </div>
            {subdomain && (
              <p className="text-sm text-muted-foreground">
                Your site will be available at:{' '}
                <a 
                  href={`https://${subdomain}.${baseSubdomain}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-medium text-blue-600 hover:underline"
                >
                  {subdomain}.{baseSubdomain}
                </a>
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={updateSubdomain} 
            disabled={isLoading || !subdomain}
          >
            Update Subdomain
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Custom Domain Settings</CardTitle>
          <CardDescription>
            Connect your own domain to your website
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="domain">Custom Domain</Label>
              <div className="flex items-center">
                <Input
                  id="domain"
                  placeholder="yourdomain.com"
                  value={customDomain}
                  onChange={(e) => setCustomDomain(e.target.value)}
                />
              </div>
            </div>
            
            {customDomain && (
              <div className="flex items-center space-x-2">
                <span className="text-sm">Status:</span>
                {isVerified ? (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    <CheckCircle className="h-3.5 w-3.5 mr-1" />
                    Verified
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                    <AlertCircle className="h-3.5 w-3.5 mr-1" />
                    Not Verified
                  </Badge>
                )}
              </div>
            )}
          </div>
          
          {customDomain && !isVerified && (
            <Alert variant="warning">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Domain Verification Required</AlertTitle>
              <AlertDescription>
                <p className="mb-4">
                  Please add the following DNS records to your domain provider to verify ownership:
                </p>
                <div className="bg-muted rounded p-3 font-mono text-sm mb-4">
                  <p>Type: CNAME</p>
                  <p>Name: @</p>
                  <p>Value: custom.lovable.app</p>
                  <p>TTL: Automatic</p>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" onClick={copyDnsRecords}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Records
                  </Button>
                  <Button size="sm" variant="outline" asChild>
                    <a 
                      href="https://docs.lovable.dev/advanced/custom-domains" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Guide
                    </a>
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            onClick={updateCustomDomain}
            disabled={isLoading || !customDomain}
          >
            Update Domain
          </Button>
          {customDomain && !isVerified && (
            <Button
              variant="outline"
              onClick={verifyDomain}
              disabled={isVerifying || !customDomain}
            >
              {isVerifying ? 'Verifying...' : 'Verify Domain'}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
