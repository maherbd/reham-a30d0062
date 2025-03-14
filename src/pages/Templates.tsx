
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { templates, Template } from '@/assets/templates';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { FadeIn, FadeInStagger } from '@/components/transitions/FadeIn';
import { Eye, Search, ArrowRight, Filter } from 'lucide-react';

const Templates = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'meme' | 'nft' | 'dao' | 'defi'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>(templates);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter templates based on category and search query
  useEffect(() => {
    let result = templates;
    
    // Apply category filter
    if (activeFilter !== 'all') {
      result = result.filter(template => template.category === activeFilter);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(template => 
        template.title.toLowerCase().includes(query) || 
        template.description.toLowerCase().includes(query) ||
        template.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    setFilteredTemplates(result);
  }, [activeFilter, searchQuery]);

  const categories = [
    { id: 'all', label: 'All Templates' },
    { id: 'meme', label: 'Meme Coins' },
    { id: 'nft', label: 'NFT Projects' },
    { id: 'dao', label: 'DAO & Governance' },
    { id: 'defi', label: 'DeFi' },
  ];

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
              <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
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
                <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
                  <Filter className="h-4 w-4 text-muted-foreground mr-1" />
                  {categories.map(category => (
                    <Button
                      key={category.id}
                      variant={activeFilter === category.id ? "default" : "outline"}
                      size="sm"
                      className="rounded-full whitespace-nowrap"
                      onClick={() => setActiveFilter(category.id as any)}
                    >
                      {category.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {filteredTemplates.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl text-muted-foreground">No templates found. Try adjusting your search.</p>
              </div>
            ) : (
              <FadeInStagger
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                staggerDelay={100}
              >
                {filteredTemplates.map((template) => (
                  <div key={template.id} className="template-card group relative overflow-hidden rounded-xl shadow-md bg-card">
                    <div className="aspect-[16/9] overflow-hidden">
                      <img
                        src={template.image}
                        alt={template.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <Button asChild variant="secondary" size="sm" className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40">
                        <Link to={`/templates/${template.id}`} className="flex items-center gap-1.5">
                          <Eye className="h-3.5 w-3.5" />
                          <span>Preview</span>
                        </Link>
                      </Button>
                    </div>
                    <div className="p-6">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {template.tags.map((tag) => (
                          <span key={tag} className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-lg font-semibold leading-8 tracking-tight">
                        {template.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {template.description}
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <Link
                          to={`/templates/${template.id}`}
                          className="text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-200 flex items-center"
                        >
                          Learn more
                          <ArrowRight className="ml-1 h-3.5 w-3.5" />
                        </Link>
                        <Button asChild variant="outline" size="sm" className="rounded-full">
                          <Link to="/dashboard">Use template</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </FadeInStagger>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Templates;
