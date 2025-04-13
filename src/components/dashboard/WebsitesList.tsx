
import React from 'react';
import { WebsiteData } from '@/types/template';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Edit, Globe, Settings, Trash2 } from 'lucide-react';
import { FadeInStagger } from '@/components/transitions/FadeIn';

interface WebsitesListProps {
  websites: WebsiteData[];
  onDelete?: (id: string) => void;
}

export function WebsitesList({ websites, onDelete }: WebsitesListProps) {
  if (websites.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-muted-foreground">You haven't created any websites yet.</p>
        <Button asChild className="mt-4">
          <Link to="/templates">Browse Templates</Link>
        </Button>
      </div>
    );
  }

  return (
    <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={100}>
      {websites.map((website) => (
        <Card key={website.id} className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{website.name}</CardTitle>
              {website.published ? (
                <Badge variant="outline" className="bg-green-500/20 text-green-500">
                  Published
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-yellow-500/20 text-yellow-500">
                  Draft
                </Badge>
              )}
            </div>
            <CardDescription className="truncate">
              {website.subdomain ? `${website.subdomain}.yourdomain.com` : 'No subdomain set'}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="h-40 bg-muted rounded-md flex items-center justify-center">
              <p className="text-muted-foreground">Website Preview</p>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between">
            <div className="flex gap-2">
              <Button size="sm" variant="outline" asChild>
                <Link to={`/builder/${website.id}`}>
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Link>
              </Button>
              <Button size="sm" variant="outline">
                <Settings className="h-4 w-4 mr-1" />
                Settings
              </Button>
            </div>
            <div className="flex gap-2">
              {website.published && (
                <Button size="sm" variant="outline" asChild>
                  <a href={`https://${website.subdomain || website.custom_domain || 'preview'}.yourdomain.com`} 
                     target="_blank" 
                     rel="noopener noreferrer">
                    <Globe className="h-4 w-4 mr-1" />
                    View
                  </a>
                </Button>
              )}
              {onDelete && (
                <Button 
                  size="sm" 
                  variant="destructive" 
                  onClick={() => onDelete(website.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
      ))}
    </FadeInStagger>
  );
}
