
export interface WebsiteSettings {
  content: WebsiteContent[];
  seo?: {
    title: string;
    description: string;
    keywords: string;
    ogImage: string;
    canonicalUrl: string;
    noIndex: boolean;
  };
  analytics?: {
    googleAnalyticsId?: string;
    enableBuiltInAnalytics?: boolean;
    facebookPixelId?: string;
    hotjarId?: string;
    customHeadCode?: string;
  };
  domains?: {
    subdomain?: string;
    customDomain?: string;
    domainVerified?: boolean;
  };
  [key: string]: any; // Add index signature to allow for JSON serialization
}

export interface WebsiteContent {
  id: string;
  type: string;
  content: any;
  settings?: Record<string, any>;
}

export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];
