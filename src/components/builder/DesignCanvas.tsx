
import React from 'react';
import { Card } from '@/components/ui/card';
import { WebsiteSettings } from '@/types/website';

interface DesignCanvasProps {
  historyState: {
    present: WebsiteSettings;
    past: WebsiteSettings[];
    future: WebsiteSettings[];
    canUndo: boolean;
    canRedo: boolean;
    undo: () => void;
    redo: () => void;
  };
  setHistoryState: any;
}

export function DesignCanvas({ historyState, setHistoryState }: DesignCanvasProps) {
  const renderContent = (section: any) => {
    switch(section.type) {
      case 'HeroSection':
        return (
          <div className="p-8 relative" style={{ backgroundColor: section.settings?.backgroundColor || '#f0f0f0' }}>
            <div className="max-w-5xl mx-auto">
              <h1 className="text-4xl font-bold mb-4" style={{ color: section.settings?.textColor || '#333' }}>
                {section.content.title}
              </h1>
              <p className="text-xl mb-6" style={{ color: section.settings?.textColor || '#333' }}>
                {section.content.subtitle}
              </p>
              <button 
                className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
              >
                {section.content.buttonText}
              </button>
              {section.content.image && (
                <div className="mt-8">
                  <img 
                    src={section.content.image} 
                    alt="Hero" 
                    className="rounded-md max-w-full" 
                  />
                </div>
              )}
            </div>
          </div>
        );
      default:
        return (
          <div className="p-8 bg-muted flex items-center justify-center">
            <p className="text-muted-foreground">Unknown section type: {section.type}</p>
          </div>
        );
    }
  };

  return (
    <div className="flex-1 overflow-y-auto border-l border-border">
      <div className="p-4">
        <div className="w-full bg-background border rounded-md shadow">
          <div className="relative">
            {historyState.present.content.map((section: any) => (
              <div 
                key={section.id} 
                className="relative border-2 border-transparent hover:border-primary focus:border-primary m-2 rounded-md"
              >
                {renderContent(section)}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 flex space-x-1">
                  <button className="p-1 bg-background border rounded-md text-xs">
                    Edit
                  </button>
                  <button className="p-1 bg-background border rounded-md text-xs">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
