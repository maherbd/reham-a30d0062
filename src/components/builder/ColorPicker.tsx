
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

export function ColorPicker({ color, onChange }: ColorPickerProps) {
  const [inputValue, setInputValue] = useState(color);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleBlur = () => {
    // Validate if it's a proper hex color format
    if (/^#([0-9A-F]{3}){1,2}$/i.test(inputValue)) {
      onChange(inputValue);
    } else {
      setInputValue(color); // Reset to the valid color
    }
  };

  const presetColors = [
    '#000000', '#ffffff', '#f44336', '#e91e63', 
    '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', 
    '#03a9f4', '#00bcd4', '#009688', '#4caf50', 
    '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', 
    '#ff9800', '#ff5722', '#795548', '#9e9e9e'
  ];

  return (
    <div className="flex items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            className="w-10 h-10 p-0 border-2" 
            style={{ backgroundColor: color }}
          />
        </PopoverTrigger>
        <PopoverContent className="w-64">
          <div className="grid grid-cols-5 gap-2">
            {presetColors.map((presetColor) => (
              <Button
                key={presetColor}
                variant="outline"
                className="w-8 h-8 p-0 rounded-sm"
                style={{ backgroundColor: presetColor }}
                onClick={() => {
                  onChange(presetColor);
                  setInputValue(presetColor);
                }}
              />
            ))}
          </div>
          <div className="flex mt-4">
            <Input
              type="color"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                onChange(e.target.value);
              }}
              className="w-10 h-10 p-0 mr-2"
            />
            <Input
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className="flex-1"
              placeholder="#000000"
            />
          </div>
        </PopoverContent>
      </Popover>
      <Input
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleBlur}
        className="flex-1"
        placeholder="#000000"
      />
    </div>
  );
}
