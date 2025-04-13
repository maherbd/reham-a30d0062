
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { TemplatePreviewProps } from '@/types/template';
import { Badge } from '@/components/ui/badge';
import { Check, X, Laptop, Smartphone, Tablet } from 'lucide-react';
import { cn } from '@/lib/utils';

export function TemplatePreview({ template, onClose, onUse }: TemplatePreviewProps) {
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [loading, setLoading] = useState(false);

  const handleUseTemplate = async () => {
    setLoading(true);
    await onUse();
    setLoading(false);
  };

  return (
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[90vw] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center justify-between">
            <span>{template.name}</span>
            <div className="flex items-center gap-2">
              {template.is_premium && (
                <Badge className="bg-amber-500/20 text-amber-500">Premium</Badge>
              )}
              <Button size="icon" variant="ghost" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex justify-center gap-2 mb-4">
          <Button 
            variant={viewMode === 'desktop' ? 'default' : 'outline'} 
            size="sm" 
            onClick={() => setViewMode('desktop')}
            className="rounded-md"
          >
            <Laptop className="h-4 w-4 mr-2" />
            Desktop
          </Button>
          <Button 
            variant={viewMode === 'tablet' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setViewMode('tablet')}
            className="rounded-md"
          >
            <Tablet className="h-4 w-4 mr-2" />
            Tablet
          </Button>
          <Button 
            variant={viewMode === 'mobile' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setViewMode('mobile')}
            className="rounded-md"
          >
            <Smartphone className="h-4 w-4 mr-2" />
            Mobile
          </Button>
        </div>
        
        <div className="flex-1 overflow-hidden border border-border rounded-md">
          <div className={cn(
            "w-full h-full transition-all duration-300 transform bg-white",
            viewMode === 'desktop' ? 'scale-100' : '',
            viewMode === 'tablet' ? 'max-w-[768px] mx-auto' : '',
            viewMode === 'mobile' ? 'max-w-[375px] mx-auto' : '',
          )}>
            <iframe 
              src={`https://kkenlcfjposyiccejqkm.supabase.co/storage/v1/object/public/templates/${template.id}/preview.html`}
              className="w-full h-full border-0"
              title={`${template.name} preview`}
            />
          </div>
        </div>
        
        <DialogFooter className="sm:justify-between flex-wrap gap-2">
          <div>
            <p className="text-sm text-muted-foreground">
              {template.description}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleUseTemplate} disabled={loading} className="primary-button">
              {loading ? 'Processing...' : 'Use Template'} 
              {!loading && <Check className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
