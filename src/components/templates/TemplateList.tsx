
import React from 'react';
import { Template } from '@/types/template';
import { TemplateCard } from './TemplateCard';
import { FadeInStagger } from '@/components/transitions/FadeIn';

interface TemplateListProps {
  templates: Template[];
  emptyMessage?: string;
  showPreviews?: boolean;
}

export function TemplateList({ templates, emptyMessage = "No templates found", showPreviews = true }: TemplateListProps) {
  if (templates.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <FadeInStagger
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      staggerDelay={100}
    >
      {templates.map((template) => (
        <TemplateCard 
          key={template.id} 
          template={template} 
          showPreview={showPreviews} 
        />
      ))}
    </FadeInStagger>
  );
}
