
export interface Template {
  id: string;
  title: string;
  description: string;
  category: 'meme' | 'nft' | 'dao' | 'defi' | 'all';
  image: string;
  tags: string[];
  featured?: boolean;
}

export const templates: Template[] = [
  {
    id: 'meme-coin-standard',
    title: 'Meme Coin Standard',
    description: 'Classic meme coin website with token stats and community features.',
    category: 'meme',
    image: 'https://images.unsplash.com/photo-1621501103258-3e135c8c1fda?q=80&w=800&auto=format&fit=crop',
    tags: ['Meme', 'Token', 'Community'],
    featured: true,
  },
  {
    id: 'nft-gallery',
    title: 'NFT Gallery',
    description: 'Showcase your NFT collection with this elegant gallery template.',
    category: 'nft',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    tags: ['NFT', 'Gallery', 'Art'],
    featured: true,
  },
  {
    id: 'dao-governance',
    title: 'DAO Governance',
    description: 'Complete DAO platform with voting, proposals, and treasury management.',
    category: 'dao',
    image: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=800&auto=format&fit=crop',
    tags: ['DAO', 'Governance', 'Voting'],
    featured: true,
  },
  {
    id: 'defi-dashboard',
    title: 'DeFi Dashboard',
    description: 'Track your DeFi investments with this comprehensive dashboard.',
    category: 'defi',
    image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=800&auto=format&fit=crop',
    tags: ['DeFi', 'Dashboard', 'Analytics'],
    featured: false,
  },
  {
    id: 'meme-coin-premium',
    title: 'Meme Coin Premium',
    description: 'Advanced meme coin website with animations and interactive elements.',
    category: 'meme',
    image: 'https://images.unsplash.com/photo-1621501103258-3e135c8c1fda?q=80&w=800&auto=format&fit=crop',
    tags: ['Meme', 'Token', 'Premium'],
    featured: false,
  },
  {
    id: 'nft-marketplace',
    title: 'NFT Marketplace',
    description: 'Full-featured NFT marketplace with auction and bidding functionality.',
    category: 'nft',
    image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=800&auto=format&fit=crop',
    tags: ['NFT', 'Marketplace', 'Auction'],
    featured: false,
  },
];

export const featuredTemplates = templates.filter(template => template.featured);
export const memeTemplates = templates.filter(template => template.category === 'meme');
export const nftTemplates = templates.filter(template => template.category === 'nft');
export const daoTemplates = templates.filter(template => template.category === 'dao');
export const defiTemplates = templates.filter(template => template.category === 'defi');
