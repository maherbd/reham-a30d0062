
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, X } from 'lucide-react';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  className?: string;
}

export function ImageUpload({ value, onChange, className = '' }: ImageUploadProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file.');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be less than 5MB.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // For now, we're just creating a local URL
      // In a real implementation, you would upload to a server or storage service
      const localUrl = URL.createObjectURL(file);
      onChange(localUrl);
    } catch (err) {
      setError('Failed to upload image.');
      console.error('Image upload error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = () => {
    onChange('');
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {value ? (
        <div className="relative">
          <img
            src={value}
            alt="Uploaded"
            className="max-h-40 rounded-md object-contain"
          />
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-1 right-1 h-6 w-6"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-md p-6">
          <div className="text-center">
            <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
            <p className="mt-2 text-sm text-muted-foreground">
              Drag & drop or click to upload
            </p>
          </div>
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={isLoading}
          />
        </div>
      )}
      
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
}
