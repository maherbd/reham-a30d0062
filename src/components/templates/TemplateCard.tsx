
import React, { useState } from 'react';
import { Template } from '@/types/template';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, ArrowRight, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TemplatePreview } from './TemplatePreview';
import { useTemplateActions } from '@/hooks/useTemplateActions';

interface TemplateCardProps {
  template: Template;
  showPreview?: boolean;
}

export function TemplateCard({ template, showPreview = true }: TemplateCardProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const { useTemplate, isLoading } = useTemplateActions();

  // Extract tags from the template or use an empty array
  const tags = template.tags || [];

  const handlePreview = (e: React.MouseEvent) => {
    e.preventDefault();
    if (showPreview) {
      setIsPreviewOpen(true);
    }
  };

  const handleUseTemplate = async () => {
    await useTemplate(template.id);
    setIsPreviewOpen(false);
  };

  return (
    <>
      <div className="template-card group relative overflow-hidden rounded-xl shadow-card bg-card">
        <div className="aspect-[16/9] overflow-hidden">
          <img
            src={template.thumbnail_url || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop'}
            alt={template.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
          {showPreview && (
            <Button 
              asChild 
              variant="secondary" 
              size="sm" 
              className="rounded-full bg-white/90 backdrop-blur-sm hover:bg-white"
              onClick={handlePreview}
            >
              <div className="flex items-center gap-1.5">
                <Eye className="h-3.5 w-3.5" />
                <span>Preview</span>
              </div>
            </Button>
          )}
        </div>
        <div className="p-6">
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag) => (
              <span key={tag} className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                {tag}
              </span>
            ))}
            {template.is_premium && (
              <Badge variant="outline" className="ml-auto bg-amber-500/20 text-amber-500">
                <Lock className="mr-1 h-3 w-3" />
                Premium
              </Badge>
            )}
          </div>
          <h3 className="text-lg font-semibold leading-8 tracking-tight">
            {template.name}
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
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-full"
              onClick={() => useTemplate(template.id)}
              disabled={isLoading}
            >
              Use template
            </Button>
          </div>
        </div>
      </div>

      {isPreviewOpen && (
        <TemplatePreview
          template={template}
          onClose={() => setIsPreviewOpen(false)}
          onUse={handleUseTemplate}
        />
      )}
    </>
  );
}
