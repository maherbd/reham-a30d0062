
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { WebsiteSettings } from '@/types/website';
import { ViewportSize, PreviewControls } from '@/components/builder/PreviewControls';
import { Pencil, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  const [viewportSize, setViewportSize] = useState<ViewportSize>('desktop');
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);

  const getViewportWidth = (): string => {
    switch (viewportSize) {
      case 'mobile': return 'w-[375px]';
      case 'tablet': return 'w-[768px]';
      case 'desktop': return 'w-full';
      default: return 'w-full';
    }
  };

  const handleSectionClick = (id: string) => {
    setSelectedSectionId(id === selectedSectionId ? null : id);
  };

  const handleDeleteSection = (id: string) => {
    const newContent = historyState.present.content.filter(section => section.id !== id);
    const newPresent = { ...historyState.present, content: newContent };
    setHistoryState({ present: newPresent });
  };

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
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Preview</h2>
          <PreviewControls 
            viewportSize={viewportSize} 
            onViewportChange={setViewportSize} 
          />
        </div>
        
        <div className={`mx-auto bg-background border rounded-md shadow transition-all ${getViewportWidth()}`}>
          <div className="relative">
            {historyState.present.content.map((section: any) => (
              <div 
                key={section.id} 
                className={`relative border-2 m-2 rounded-md transition-colors ${
                  selectedSectionId === section.id ? 'border-primary' : 'border-transparent hover:border-primary/50'
                }`}
                onClick={() => handleSectionClick(section.id)}
              >
                {renderContent(section)}
                
                <div className={`absolute top-2 right-2 flex space-x-1 ${
                  selectedSectionId === section.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                }`}>
                  <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="h-8 w-8 p-0 hover:bg-destructive hover:text-destructive-foreground" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteSection(section.id);
                    }}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
