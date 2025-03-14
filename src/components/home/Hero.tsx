
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/transitions/FadeIn';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative isolate overflow-hidden pt-14">
      {/* Gradient background */}
      <div 
        className="absolute inset-0 -z-10 transform-gpu overflow-hidden opacity-30 blur-3xl" 
        aria-hidden="true"
      >
        <div 
          className="relative aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-purple-400 opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:py-40 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn delay={200}>
            <span className="inline-flex items-center rounded-full px-4 py-1 text-sm font-medium bg-primary/10 text-primary ring-1 ring-inset ring-primary/30 mb-6">
              Powered by AI and Web3
            </span>
          </FadeIn>
          
          <FadeIn delay={400}>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Build your Web3 vision 
              <span className="block">in minutes, not months</span>
            </h1>
          </FadeIn>
          
          <FadeIn delay={600}>
            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
              Reham.org combines AI-powered tools with premium Web3 templates to help you launch your blockchain project faster than ever before.
            </p>
          </FadeIn>
          
          <FadeIn delay={800}>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button asChild size="lg" className="primary-button">
                <Link to="/dashboard">
                  Start Building
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="glass-button">
                <Link to="/templates">
                  Browse Templates
                </Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
