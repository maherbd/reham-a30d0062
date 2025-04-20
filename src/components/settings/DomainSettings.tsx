
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { 
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Link, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface DomainSettingsProps {
  websiteId: string;
  currentSubdomain?: string | null;
  currentCustomDomain?: string | null;
  onUpdateSubdomain: (subdomain: string) => Promise<boolean>;
  onUpdateCustomDomain: (domain: string) => Promise<boolean>;
  onVerifyDomain: (domain: string) => Promise<{verified: boolean; errors?: string[]}>;
}

export function DomainSettings({ 
  websiteId, 
  currentSubdomain, 
  currentCustomDomain,
  onUpdateSubdomain,
  onUpdateCustomDomain,
  onVerifyDomain
}: DomainSettingsProps) {
  const [subdomain, setSubdomain] = useState(currentSubdomain || '');
  const [customDomain, setCustomDomain] = useState(currentCustomDomain || '');
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [domainStatus, setDomainStatus] = useState<{verified: boolean; errors?: string[]}>(); 

  const handleUpdateSubdomain = async () => {
    if (!subdomain) {
      toast.error('Please enter a subdomain');
      return;
    }

    setLoading(true);
    try {
      const success = await onUpdateSubdomain(subdomain);
      if (success) {
        toast.success('Subdomain updated successfully');
      }
    } catch (error) {
      console.error('Error updating subdomain:', error);
      toast.error('Failed to update subdomain');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyDomain = async () => {
    if (!customDomain) {
      toast.error('Please enter a custom domain');
      return;
    }

    setVerifying(true);
    try {
      const result = await onVerifyDomain(customDomain);
      setDomainStatus(result);
      
      if (result.verified) {
        toast.success('Domain verified successfully');
      } else {
        toast.error('Domain verification failed');
      }
    } catch (error) {
      console.error('Error verifying domain:', error);
      toast.error('Failed to verify domain');
    } finally {
      setVerifying(false);
    }
  };

  const handleUpdateCustomDomain = async () => {
    if (!customDomain) {
      toast.error('Please enter a custom domain');
      return;
    }

    setLoading(true);
    try {
      const success = await onUpdateCustomDomain(customDomain);
      if (success) {
        toast.success('Custom domain updated successfully');
      }
    } catch (error) {
      console.error('Error updating custom domain:', error);
      toast.error('Failed to update custom domain');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Link className="h-5 w-5" /> 
          Domain Settings
        </CardTitle>
        <CardDescription>
          Configure how users access your website.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Free Subdomain</h3>
            {currentSubdomain && (
              <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                Active
              </Badge>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <Input
              value={subdomain}
              onChange={(e) => setSubdomain(e.target.value)}
              placeholder="your-site"
              className="flex-grow"
            />
            <span className="text-muted-foreground whitespace-nowrap">.lovable.app</span>
          </div>
          
          <Button 
            onClick={handleUpdateSubdomain}
            disabled={loading || !subdomain}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              'Update Subdomain'
            )}
          </Button>
          
          {currentSubdomain && (
            <div className="mt-2 flex items-center justify-between p-2 bg-muted rounded-md">
              <span className="text-sm">Current URL:</span>
              <a
                href={`https://${currentSubdomain}.lovable.app`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline flex items-center"
              >
                {`${currentSubdomain}.lovable.app`}
                <Link className="h-3 w-3 ml-1" />
              </a>
            </div>
          )}
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Custom Domain</h3>
            {currentCustomDomain && (
              <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                Connected
              </Badge>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="custom-domain">Domain Name</Label>
            <Input
              id="custom-domain"
              value={customDomain}
              onChange={(e) => setCustomDomain(e.target.value)}
              placeholder="www.yourdomain.com"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant="outline"
              onClick={handleVerifyDomain}
              disabled={verifying || !customDomain}
            >
              {verifying ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                'Verify Domain'
              )}
            </Button>
            
            <Button 
              onClick={handleUpdateCustomDomain}
              disabled={loading || !customDomain || (domainStatus && !domainStatus.verified)}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                'Connect Domain'
              )}
            </Button>
          </div>
          
          {domainStatus && (
            <Alert variant={domainStatus.verified ? "default" : "destructive"}>
              {domainStatus.verified ? (
                <>
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>Domain Verified</AlertTitle>
                  <AlertDescription>
                    Your domain has been verified successfully.
                  </AlertDescription>
                </>
              ) : (
                <>
                  <XCircle className="h-4 w-4" />
                  <AlertTitle>Verification Failed</AlertTitle>
                  <AlertDescription>
                    <p>Please check the following:</p>
                    <ul className="list-disc pl-4 mt-2">
                      {domainStatus.errors?.map((error, i) => (
                        <li key={i}>{error}</li>
                      )) || (
                        <li>There was a problem verifying your domain. Please check your DNS settings.</li>
                      )}
                    </ul>
                  </AlertDescription>
                </>
              )}
            </Alert>
          )}
          
          {currentCustomDomain && (
            <div className="mt-2 flex items-center justify-between p-2 bg-muted rounded-md">
              <span className="text-sm">Connected domain:</span>
              <a
                href={`https://${currentCustomDomain}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline flex items-center"
              >
                {currentCustomDomain}
                <Link className="h-3 w-3 ml-1" />
              </a>
            </div>
          )}
          
          <Alert>
            <AlertTitle>DNS Configuration</AlertTitle>
            <AlertDescription>
              <p className="mb-2">To connect your custom domain, add these DNS records:</p>
              <code className="block p-2 bg-muted rounded">
                Type: CNAME<br />
                Name: www (or @)<br />
                Value: proxy.lovable.app<br />
                TTL: Automatic
              </code>
            </AlertDescription>
          </Alert>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start">
        <p className="text-sm text-muted-foreground">
          Need help setting up your domain? Check our <a href="/help/domains" className="text-primary hover:underline">domain configuration guide</a>.
        </p>
      </CardFooter>
    </Card>
  );
}
