
export interface Template {
  id: string;
  title: string;
  description: string;
  category: 'meme' | 'nft' | 'dao' | 'defi' | 'gamefi' | 'social';
  image: string;
  tags: string[];
  featured?: boolean;
  techStack?: string[];
  complexity?: 'beginner' | 'intermediate' | 'advanced';
  estimatedSetupTime?: string;
  lastUpdated?: string;
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
    techStack: ['React', 'Tailwind CSS', 'Ethers.js', 'Web3React'],
    complexity: 'beginner',
    estimatedSetupTime: '15 minutes',
    lastUpdated: '2 weeks ago'
  },
  {
    id: 'nft-gallery',
    title: 'NFT Gallery',
    description: 'Showcase your NFT collection with this elegant gallery template.',
    category: 'nft',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    tags: ['NFT', 'Gallery', 'Art'],
    featured: true,
    techStack: ['React', 'Tailwind CSS', 'IPFS', 'NFTPort API'],
    complexity: 'intermediate',
    estimatedSetupTime: '30 minutes',
    lastUpdated: '1 month ago'
  },
  {
    id: 'dao-governance',
    title: 'DAO Governance',
    description: 'Complete DAO platform with voting, proposals, and treasury management.',
    category: 'dao',
    image: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=800&auto=format&fit=crop',
    tags: ['DAO', 'Governance', 'Voting'],
    featured: true,
    techStack: ['React', 'Tailwind CSS', 'Snapshot.js', 'The Graph'],
    complexity: 'advanced',
    estimatedSetupTime: '45 minutes',
    lastUpdated: '3 weeks ago'
  },
  {
    id: 'defi-dashboard',
    title: 'DeFi Dashboard',
    description: 'Track your DeFi investments with this comprehensive dashboard.',
    category: 'defi',
    image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=800&auto=format&fit=crop',
    tags: ['DeFi', 'Dashboard', 'Analytics'],
    featured: false,
    techStack: ['React', 'Tailwind CSS', 'Web3.js', 'DeFi SDK'],
    complexity: 'intermediate',
    estimatedSetupTime: '30 minutes',
    lastUpdated: '2 months ago'
  },
  {
    id: 'meme-coin-premium',
    title: 'Meme Coin Premium',
    description: 'Advanced meme coin website with animations and interactive elements.',
    category: 'meme',
    image: 'https://images.unsplash.com/photo-1621501103258-3e135c8c1fda?q=80&w=800&auto=format&fit=crop',
    tags: ['Meme', 'Token', 'Premium'],
    featured: false,
    techStack: ['React', 'Tailwind CSS', 'Web3Modal', 'Framer Motion'],
    complexity: 'intermediate',
    estimatedSetupTime: '25 minutes',
    lastUpdated: '1 week ago'
  },
  {
    id: 'nft-marketplace',
    title: 'NFT Marketplace',
    description: 'Full-featured NFT marketplace with auction and bidding functionality.',
    category: 'nft',
    image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=800&auto=format&fit=crop',
    tags: ['NFT', 'Marketplace', 'Auction'],
    featured: false,
    techStack: ['React', 'Tailwind CSS', 'Opensea SDK', 'Alchemy API'],
    complexity: 'advanced',
    estimatedSetupTime: '50 minutes',
    lastUpdated: '3 weeks ago'
  },
  {
    id: 'gamefi-starter',
    title: 'GameFi Starter',
    description: 'Launch your blockchain gaming project with this comprehensive template.',
    category: 'gamefi',
    image: 'https://images.unsplash.com/photo-1640272365950-b7a33bd1f883?q=80&w=800&auto=format&fit=crop',
    tags: ['GameFi', 'Play-to-Earn', 'NFT'],
    featured: false,
    techStack: ['React', 'Tailwind CSS', 'Unity WebGL', 'Moralis'],
    complexity: 'advanced',
    estimatedSetupTime: '60 minutes',
    lastUpdated: '2 weeks ago'
  },
  {
    id: 'social-dapp',
    title: 'Social DApp',
    description: 'Decentralized social media platform with content monetization.',
    category: 'social',
    image: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?q=80&w=800&auto=format&fit=crop',
    tags: ['Social', 'DApp', 'Content'],
    featured: false,
    techStack: ['React', 'Tailwind CSS', 'Ceramic Network', 'IDX'],
    complexity: 'intermediate',
    estimatedSetupTime: '40 minutes',
    lastUpdated: '1 month ago'
  },
];

export const featuredTemplates = templates.filter(template => template.featured);
export const memeTemplates = templates.filter(template => template.category === 'meme');
export const nftTemplates = templates.filter(template => template.category === 'nft');
export const daoTemplates = templates.filter(template => template.category === 'dao');
export const defiTemplates = templates.filter(template => template.category === 'defi');
export const gamefiTemplates = templates.filter(template => template.category === 'gamefi');
export const socialTemplates = templates.filter(template => template.category === 'social');
