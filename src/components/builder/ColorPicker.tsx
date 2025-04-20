
import React from 'react';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

export function ColorPicker({ color, onChange }: ColorPickerProps) {
  return (
    <div className="flex items-center space-x-2">
      <Popover>
        <PopoverTrigger asChild>
          <button
            className="h-8 w-8 rounded border border-input"
            style={{ backgroundColor: color }}
            aria-label="Select a color"
          />
        </PopoverTrigger>
        <PopoverContent className="w-64">
          <div className="grid gap-2">
            <div className="grid grid-cols-6 gap-2">
              {['#000000', '#ffffff', '#FF0000', '#00FF00', '#0000FF', 
                '#FFFF00', '#00FFFF', '#FF00FF', '#C0C0C0', '#808080', 
                '#800000', '#808000', '#008000', '#800080', '#008080', '#000080']
                .map((presetColor) => (
                  <button
                    key={presetColor}
                    className="h-6 w-6 rounded-md border border-muted"
                    style={{ backgroundColor: presetColor }}
                    onClick={() => onChange(presetColor)}
                    aria-label={`Select color ${presetColor}`}
                  />
                ))}
            </div>
            
            <Input
              type="color"
              value={color}
              onChange={(e) => onChange(e.target.value)}
              className="w-full h-8"
            />
            
            <Input
              type="text"
              value={color}
              onChange={(e) => onChange(e.target.value)}
              placeholder="#RRGGBB"
              className="w-full h-8"
            />
          </div>
        </PopoverContent>
      </Popover>
      <Input
        type="text"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        className="h-8 w-24"
      />
    </div>
  );
}
