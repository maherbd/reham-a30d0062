import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ConnectWallet } from '@/components/ui/ConnectWallet';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger,
  SheetClose
} from '@/components/ui/sheet';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navigation = [
  { name: "Home", href: "/" },
  { name: "Templates", href: "/templates" },
  { name: "Dashboard", href: "/dashboard" },
  { name: "Analytics", href: "/analytics" },
  { name: "Pricing", href: "/pricing" },
  { name: "Help", href: "/help" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const NavItems = () => (
    <>
      {navigation.map((item) => (
        <Link
          key={item.name}
          to={item.href}
          className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors duration-200"
        >
          {item.name}
        </Link>
      ))}
    </>
  );

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4',
        scrolled 
          ? 'bg-background/80 backdrop-blur-xl border-b border-border/40 py-3'
          : 'bg-transparent'
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/4f187b63-43be-493c-97cc-07718df52717.png" 
                alt="Reham.org Logo" 
                className="h-10 w-auto mr-2" 
              />
              <span className="font-display text-2xl font-bold tracking-tight md:hidden">
                Reham
              </span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavItems />
          </nav>

          {/* Actions (desktop) */}
          <div className="hidden md:flex items-center gap-4">
            <ConnectWallet />
          </div>

          {/* Mobile menu */}
          <div className="flex md:hidden items-center">
            <Sheet>
              <SheetTrigger asChild>
                <button
                  className="p-2 rounded-full text-foreground hover:bg-secondary transition-colors duration-200"
                  aria-label="Toggle menu"
                >
                  <Menu size={20} />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="flex flex-col">
                <div className="flex items-center justify-between mb-8">
                  <Link to="/" className="flex items-center">
                    <img 
                      src="/lovable-uploads/4f187b63-43be-493c-97cc-07718df52717.png" 
                      alt="Reham.org Logo" 
                      className="h-8 w-auto mr-2" 
                    />
                    <span className="font-display text-xl font-bold tracking-tight">
                      Reham
                    </span>
                  </Link>
                  <SheetClose className="rounded-full p-1.5 hover:bg-muted">
                    <X size={18} />
                  </SheetClose>
                </div>
                <nav className="flex flex-col space-y-6 mb-auto">
                  {navigation.map((item) => (
                    <SheetClose asChild key={item.name}>
                      <Link
                        to={item.href}
                        className="text-base font-medium text-foreground hover:text-primary transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
                <div className="mt-6 pt-6 border-t border-border">
                  <ConnectWallet />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

export function HeaderWithPricing() {
  return (
    <header className="fixed w-full top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-bold text-xl">Web3Builder</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link to="/templates" className="text-muted-foreground hover:text-foreground transition-colors">
              Templates
            </Link>
            <Link to="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </Link>
            <Link to="/resources" className="text-muted-foreground hover:text-foreground transition-colors">
              Resources
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
          </Link>
          <Link to="/register">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
