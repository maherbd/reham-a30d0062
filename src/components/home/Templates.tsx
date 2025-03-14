
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FadeIn, FadeInStagger } from '@/components/transitions/FadeIn';
import { featuredTemplates } from '@/assets/templates';
import { ArrowRight, Eye } from 'lucide-react';

export function Templates() {
  return (
    <div className="bg-gradient-to-b from-white to-secondary/20 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn>
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Recent Launches</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Start with a premium template
            </p>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Choose from our collection of professionally designed Web3 templates. Customize them to match your brand and launch in minutes.
            </p>
          </div>
        </FadeIn>

        <FadeInStagger className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:mt-20 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3" staggerDelay={150}>
          {featuredTemplates.map((template) => (
            <div key={template.id} className="template-card group relative overflow-hidden rounded-xl shadow-card bg-white">
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={template.image}
                  alt={template.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <Button asChild variant="secondary" size="sm" className="rounded-full bg-white/90 backdrop-blur-sm hover:bg-white">
                  <Link to={`/templates/${template.id}`} className="flex items-center gap-1.5">
                    <Eye className="h-3.5 w-3.5" />
                    <span>Preview</span>
                  </Link>
                </Button>
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {template.tags.map((tag) => (
                    <span key={tag} className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-lg font-semibold leading-8 tracking-tight">
                  {template.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {template.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <Link
                    to={`/templates/${template.id}`}
                    className="text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-200 flex items-center"
                  >
                    Learn more
                    <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </Link>
                  <Button asChild variant="outline" size="sm" className="rounded-full">
                    <Link to="/dashboard">Use template</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </FadeInStagger>

        <FadeIn delay={300}>
          <div className="mt-16 flex justify-center">
            <Button asChild variant="outline" size="lg" className="glass-button">
              <Link to="/templates" className="flex items-center gap-2">
                View all templates
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
