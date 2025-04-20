
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Smartphone, Tablet, Globe } from 'lucide-react';

type DeviceType = 'desktop' | 'tablet' | 'mobile';

interface PreviewControlsProps {
  currentDevice: DeviceType;
  onDeviceChange: (device: DeviceType) => void;
}

export function PreviewControls({ currentDevice, onDeviceChange }: PreviewControlsProps) {
  return (
    <div className="flex items-center space-x-2 bg-background rounded-md border p-1">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="sm"
              variant={currentDevice === 'mobile' ? 'default' : 'ghost'}
              onClick={() => onDeviceChange('mobile')}
              className="px-2"
              aria-label="Mobile preview"
            >
              <Smartphone className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Mobile preview (320px)</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="sm"
              variant={currentDevice === 'tablet' ? 'default' : 'ghost'}
              onClick={() => onDeviceChange('tablet')}
              className="px-2"
              aria-label="Tablet preview"
            >
              <Tablet className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Tablet preview (768px)</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="sm"
              variant={currentDevice === 'desktop' ? 'default' : 'ghost'}
              onClick={() => onDeviceChange('desktop')}
              className="px-2"
              aria-label="Desktop preview"
            >
              <Globe className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Desktop preview (full width)</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
