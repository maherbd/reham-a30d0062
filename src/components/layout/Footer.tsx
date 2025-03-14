import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/transitions/FadeIn';
import { 
  Twitter, 
  Github, 
  MessageSquare, 
  Send
} from 'lucide-react';

export function Footer() {
  const footerNavigation = {
    product: [
      { name: 'Features', href: '/#features' },
      { name: 'Templates', href: '/templates' },
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'Tokenomics', href: '/tokenomics' },
    ],
    resources: [
      { name: 'Documentation', href: '/resources' },
      { name: 'Tutorials', href: '/resources?tab=tutorials' },
      { name: 'Blog', href: '/resources' },
      { name: 'Support', href: '/contact' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
    ],
    legal: [
      { name: 'Privacy', href: '#' },
      { name: 'Terms', href: '#' },
      { name: 'Cookie Policy', href: '#' },
      { name: 'Licenses', href: '#' },
    ],
    social: [
      {
        name: 'Twitter',
        href: '#',
        icon: Twitter,
      },
      {
        name: 'GitHub',
        href: '#',
        icon: Github,
      },
      {
        name: 'Discord',
        href: '#',
        icon: MessageSquare,
      },
      {
        name: 'Telegram',
        href: '#',
        icon: Send,
      },
    ],
  };

  const currentYear = new Date().getFullYear();

  return (
    <FadeIn>
      <footer className="bg-card" aria-labelledby="footer-heading">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="space-y-8 xl:col-span-1">
              <Link to="/" className="flex items-center">
                <img
                  src="/lovable-uploads/4f187b63-43be-493c-97cc-07718df52717.png"
                  alt="Reham.org Logo"
                  className="h-10 w-auto mr-2"
                />
                <span className="font-display text-2xl font-bold tracking-tight">
                  Reham
                </span>
              </Link>
              <p className="text-base text-muted-foreground">
                Building the future of Web3 with AI-powered tools and premium templates.
              </p>
              <div className="flex space-x-5">
                {footerNavigation.social.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <span className="sr-only">{item.name}</span>
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
            <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold leading-6">Product</h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {footerNavigation.product.map((item) => (
                      <li key={item.name}>
                        <Link to={item.href} className="text-sm leading-6 text-muted-foreground hover:text-foreground">
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-10 md:mt-0">
                  <h3 className="text-sm font-semibold leading-6">Resources</h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {footerNavigation.resources.map((item) => (
                      <li key={item.name}>
                        <Link to={item.href} className="text-sm leading-6 text-muted-foreground hover:text-foreground">
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold leading-6">Company</h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {footerNavigation.company.map((item) => (
                      <li key={item.name}>
                        <a href={item.href} className="text-sm leading-6 text-muted-foreground hover:text-foreground">
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-10 md:mt-0">
                  <h3 className="text-sm font-semibold leading-6">Legal</h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {footerNavigation.legal.map((item) => (
                      <li key={item.name}>
                        <a href={item.href} className="text-sm leading-6 text-muted-foreground hover:text-foreground">
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-muted-foreground">
              &copy; {currentYear} Reham, Inc. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex items-center space-x-4">
              <Button variant="link" className="text-xs text-muted-foreground p-0 h-auto">
                Privacy Policy
              </Button>
              <span className="text-muted-foreground">•</span>
              <Button variant="link" className="text-xs text-muted-foreground p-0 h-auto">
                Terms of Service
              </Button>
              <span className="text-muted-foreground">•</span>
              <Button variant="link" className="text-xs text-muted-foreground p-0 h-auto">
                Cookie Policy
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </FadeIn>
  );
}
