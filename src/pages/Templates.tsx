
import React, { useEffect, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Template } from '@/types/template';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FadeIn, FadeInStagger } from '@/components/transitions/FadeIn';
import { Search, Filter, Clock, BarChart } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TemplateList } from '@/components/templates/TemplateList';
import { fetchTemplates } from '@/services/templateService';
import { Skeleton } from '@/components/ui/skeleton';

const Templates = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [templates, setTemplates] = useState<Template[]>([]);
  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>([]);
  const [complexityFilter, setComplexityFilter] = useState<string>('all');
  const [sortOption, setSortOption] = useState<string>('featured');
  const [isLoading, setIsLoading] = useState(true);

  // Load templates from Supabase
  useEffect(() => {
    const loadTemplates = async () => {
      setIsLoading(true);
      const data = await fetchTemplates();
      setTemplates(data);
      setFilteredTemplates(data);
      setIsLoading(false);
    };
    
    loadTemplates();
  }, []);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter templates based on category, complexity, and search query
  useEffect(() => {
    if (!templates.length) return;
    
    let result = templates;
    
    // Apply category filter
    if (activeFilter !== 'all') {
      result = result.filter(template => template.category === activeFilter);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(template => 
        template.name.toLowerCase().includes(query) || 
        template.description?.toLowerCase().includes(query) ||
        template.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Apply sorting
    switch (sortOption) {
      case 'newest':
        result = [...result].sort((a, b) => {
          if (!a.created_at || !b.created_at) return 0;
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        });
        break;
      case 'alphabetical':
        result = [...result].sort((a, b) => 
          a.name.localeCompare(b.name)
        );
        break;
      case 'featured':
      default:
        // For now, we'll just use the default order from the database
        break;
    }
    
    setFilteredTemplates(result);
  }, [activeFilter, searchQuery, complexityFilter, sortOption, templates]);

  const categories = [
    { id: 'all', label: 'All Templates' },
    { id: 'meme', label: 'Meme Coins' },
    { id: 'nft', label: 'NFT Projects' },
    { id: 'dao', label: 'DAO & Governance' },
    { id: 'defi', label: 'DeFi' },
    { id: 'gamefi', label: 'GameFi' },
    { id: 'social', label: 'Social DApps' },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow mt-16">
          <section className="py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn>
                <div className="text-center mb-12">
                  <h1 className="text-3xl md:text-5xl font-bold">Browse Templates</h1>
                  <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                    Choose from our professionally designed templates to kickstart your Web3 project
                  </p>
                </div>
              </FadeIn>

              <div className="mb-10">
                <div className="flex flex-col gap-4 mb-8">
                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <Skeleton className="h-10 w-full sm:max-w-md" />
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-10 w-[180px]" />
                      <Skeleton className="h-10 w-[180px]" />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 overflow-x-auto pb-2">
                    {categories.map(category => (
                      <Skeleton key={category.id} className="h-8 w-24" />
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <Skeleton key={item} className="h-[400px] w-full rounded-xl" />
                ))}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow mt-16">
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="text-center mb-12">
                <h1 className="text-3xl md:text-5xl font-bold">Browse Templates</h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                  Choose from our professionally designed templates to kickstart your Web3 project
                </p>
              </div>
            </FadeIn>

            <div className="mb-10">
              <div className="flex flex-col gap-4 mb-8">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div className="relative w-full sm:max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input 
                      type="text" 
                      placeholder="Search templates..." 
                      className="pl-10" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <BarChart className="h-4 w-4 text-muted-foreground" />
                      <Select
                        value={sortOption}
                        onValueChange={setSortOption}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="featured">Featured</SelectItem>
                          <SelectItem value="newest">Newest</SelectItem>
                          <SelectItem value="alphabetical">A-Z</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                  <Filter className="h-4 w-4 text-muted-foreground mr-1" />
                  {categories.map(category => (
                    <Button
                      key={category.id}
                      variant={activeFilter === category.id ? "default" : "outline"}
                      size="sm"
                      className="rounded-full whitespace-nowrap"
                      onClick={() => setActiveFilter(category.id)}
                    >
                      {category.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <TemplateList 
              templates={filteredTemplates} 
              emptyMessage="No templates found. Try adjusting your search."
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Templates;
