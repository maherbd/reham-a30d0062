
export interface Template {
  id: string;
  name: string;
  description: string;
  category: 'meme' | 'nft' | 'dao' | 'defi' | 'gamefi' | 'social';
  thumbnail_url: string;
  tags?: string[];
  is_premium: boolean;
  content: any;
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
