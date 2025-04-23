
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  Smartphone, 
  Tablet, 
  Monitor, 
  ExternalLink 
} from 'lucide-react';

export type ViewportSize = 'desktop' | 'tablet' | 'mobile';

interface PreviewControlsProps {
  viewportSize: ViewportSize;
  onViewportChange: (size: ViewportSize) => void;
  websiteId?: string;
  previewUrl?: string;
}

export function PreviewControls({ 
  viewportSize, 
  onViewportChange,
  websiteId,
  previewUrl
}: PreviewControlsProps) {
  return (
    <div className="flex items-center space-x-2">
      <TooltipProvider>
        <div className="bg-muted rounded-md p-1 flex space-x-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant={viewportSize === 'desktop' ? "default" : "ghost"}
                onClick={() => onViewportChange('desktop')}
                className="h-8 w-8 p-0"
                aria-label="Desktop preview"
              >
                <Monitor className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Desktop preview</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant={viewportSize === 'tablet' ? "default" : "ghost"}
                onClick={() => onViewportChange('tablet')}
                className="h-8 w-8 p-0"
                aria-label="Tablet preview"
              >
                <Tablet className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Tablet preview</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant={viewportSize === 'mobile' ? "default" : "ghost"}
                onClick={() => onViewportChange('mobile')}
                className="h-8 w-8 p-0"
                aria-label="Mobile preview"
              >
                <Smartphone className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Mobile preview</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
      
      {previewUrl && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant="outline"
                onClick={() => window.open(previewUrl, '_blank')}
                className="h-8"
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                <span>Open preview</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Open preview in new tab</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
}
