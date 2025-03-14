
import React from 'react';
import { Link } from 'react-router-dom';
import { FadeIn } from '@/components/transitions/FadeIn';
import { 
  GithubIcon, 
  TwitterIcon, 
  LinkedinIcon, 
  TelegramIcon 
} from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  const footerSections = [
    {
      title: 'Product',
      links: [
        { name: 'Templates', href: '/templates' },
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'AI Builder', href: '/ai-builder' },
        { name: 'Token Creator', href: '/token-creator' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Documentation', href: '/docs' },
        { name: 'Guides', href: '/guides' },
        { name: 'API Reference', href: '/api' },
        { name: 'Community', href: '/community' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
        { name: 'Tokenomics', href: '/tokenomics' },
        { name: 'Referral Program', href: '/referral' },
      ],
    },
  ];

  const socialLinks = [
    { 
      name: 'Twitter', 
      href: 'https://twitter.com', 
      icon: <TwitterIcon size={18} /> 
    },
    { 
      name: 'GitHub', 
      href: 'https://github.com', 
      icon: <GithubIcon size={18} /> 
    },
    { 
      name: 'LinkedIn', 
      href: 'https://linkedin.com', 
      icon: <LinkedinIcon size={18} /> 
    },
    { 
      name: 'Telegram', 
      href: 'https://t.me', 
      icon: <TelegramIcon size={18} /> 
    },
  ];

  return (
    <footer className="border-t border-border/40 bg-gradient-to-b from-transparent to-secondary/20">
      <FadeIn>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
            {/* Brand section */}
            <div className="col-span-1 lg:col-span-2">
              <Link to="/" className="font-display text-2xl font-bold tracking-tight">
                Reham.org
              </Link>
              <p className="mt-4 text-sm text-muted-foreground max-w-xs">
                Building the future of Web3 with AI-powered tools and templates for everyone.
              </p>
              
              <div className="mt-6 flex items-center space-x-4">
                {socialLinks.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full p-1.5 text-foreground/70 hover:text-foreground hover:bg-secondary transition-colors duration-200"
                    aria-label={item.name}
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Links sections */}
            {footerSections.map((section) => (
              <div key={section.title} className="col-span-1">
                <h3 className="text-sm font-semibold text-foreground">{section.title}</h3>
                <ul className="mt-4 space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <p className="text-sm text-muted-foreground">
                &copy; {currentYear} Reham.org. All rights reserved.
              </p>
              <div className="mt-4 sm:mt-0 flex space-x-6">
                <Link to="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </footer>
  );
}
