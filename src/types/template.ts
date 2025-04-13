
export interface Template {
  id: string;
  name: string;
  description: string;
  category: 'meme' | 'nft' | 'dao' | 'defi' | 'gamefi' | 'social' | string;
  thumbnail_url: string;
  tags: string[];
  is_premium: boolean;
  content: any;
  popularity?: number;
  created_at?: string;
  updated_at?: string;
}

export interface WebsiteData {
  id: string;
  name: string;
  user_id: string;
  template_id: string;
  settings?: any;
  published: boolean;
  custom_domain?: string;
  subdomain?: string;
  created_at?: string;
  updated_at?: string;
}

export interface TemplatePreviewProps {
  template: Template;
  onClose: () => void;
  onUse: () => void;
}

export interface TemplateMetrics {
  id: string;
  template_id: string;
  views: number;
  uses: number;
  last_viewed_at?: string;
  trending_score?: number;
  created_at?: string;
  updated_at?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price_monthly: number;
  price_yearly: number;
  currency: string;
  features: string[];
  is_popular: boolean;
  max_websites: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Transaction {
  id: string;
  user_id: string;
  plan_id?: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  payment_method: string;
  transaction_hash?: string;
  created_at?: string;
  updated_at?: string;
}
