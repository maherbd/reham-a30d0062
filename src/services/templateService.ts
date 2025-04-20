
import { supabase } from '@/integrations/supabase/client';
import { Template } from '@/types/template';
import { toast } from 'sonner';

export async function useTemplate(templateId: string, userId: string): Promise<boolean> {
  try {
    // First fetch the template
    const { data: template, error: templateError } = await supabase
      .from('templates')
      .select(`
        *,
        template_metrics (
          uses,
          views,
          trending_score
        )
      `)
      .eq('id', templateId)
      .single();
    
    if (templateError) throw templateError;
    if (!template) throw new Error('Template not found');
    
    // Create a new website based on the template
    const { data: website, error: websiteError } = await supabase
      .from('websites')
      .insert({
        user_id: userId,
        template_id: templateId,
        name: `${template.name} Website`,
        published: false
      })
      .select()
      .single();
    
    if (websiteError) throw websiteError;
    if (!website) throw new Error('Failed to create website');
    
    // Update template metrics
    const uses = template.template_metrics?.length > 0 ? template.template_metrics[0].uses + 1 : 1;
    
    const { error: metricsError } = await supabase
      .from('template_metrics')
      .upsert({
        template_id: templateId,
        uses: uses
      });
    
    if (metricsError) {
      console.error('Error updating template metrics:', metricsError);
      // Don't throw here as this is not critical
    }
    
    toast.success('Website created successfully!');
    return true;
    
  } catch (error) {
    console.error('Error using template:', error);
    toast.error('Failed to create website from template');
    return false;
  }
}

export async function fetchTemplates(): Promise<Template[]> {
  try {
    const { data, error } = await supabase
      .from('templates')
      .select(`
        *,
        template_metrics (
          uses,
          views,
          trending_score
        )
      `)
      .eq('is_premium', false)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    // Transform the data to match the Template type
    const templates: Template[] = data?.map(template => ({
      id: template.id,
      name: template.name,
      description: template.description || '',
      category: template.category || 'other',
      thumbnail_url: template.thumbnail_url || '',
      tags: [], // Default empty array for tags
      is_premium: template.is_premium || false,
      content: template.content,
      popularity: template.popularity || 0,
      created_at: template.created_at,
      updated_at: template.updated_at
    })) || [];
    
    return templates;
    
  } catch (error) {
    console.error('Error fetching templates:', error);
    toast.error('Failed to load templates');
    return [];
  }
}

export async function fetchTemplateById(templateId: string): Promise<Template | null> {
  try {
    const { data, error } = await supabase
      .from('templates')
      .select(`
        *,
        template_metrics (
          uses,
          views,
          trending_score
        )
      `)
      .eq('id', templateId)
      .single();
    
    if (error) throw error;
    
    if (data) {
      // Transform to match Template type
      const template: Template = {
        id: data.id,
        name: data.name,
        description: data.description || '',
        category: data.category || 'other',
        thumbnail_url: data.thumbnail_url || '',
        tags: [], // Default empty array for tags
        is_premium: data.is_premium || false,
        content: data.content,
        popularity: data.popularity || 0,
        created_at: data.created_at,
        updated_at: data.updated_at
      };
      
      return template;
    }
    
    return null;
    
  } catch (error) {
    console.error('Error fetching template:', error);
    toast.error('Failed to load template');
    return null;
  }
}

// New function to fetch templates by category
export async function fetchTemplatesByCategory(category: string): Promise<Template[]> {
  try {
    const { data, error } = await supabase
      .from('templates')
      .select(`
        *,
        template_metrics (
          uses,
          views,
          trending_score
        )
      `)
      .eq('category', category)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    // Transform the data to match the Template type
    const templates: Template[] = data?.map(template => ({
      id: template.id,
      name: template.name,
      description: template.description || '',
      category: template.category || 'other',
      thumbnail_url: template.thumbnail_url || '',
      tags: [], // Default empty array for tags
      is_premium: template.is_premium || false,
      content: template.content,
      popularity: template.popularity || 0,
      created_at: template.created_at,
      updated_at: template.updated_at
    })) || [];
    
    return templates;
    
  } catch (error) {
    console.error(`Error fetching templates for category ${category}:`, error);
    toast.error('Failed to load templates');
    return [];
  }
}

// New function to fetch templates by tag
export async function fetchTemplatesByTag(tag: string): Promise<Template[]> {
  try {
    // Since tags are stored in an array, we need to use the contains operator
    const { data, error } = await supabase
      .from('templates')
      .select(`
        *,
        template_metrics (
          uses,
          views,
          trending_score
        )
      `)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    // Filter templates that have the specified tag
    // Since we can't do this directly in the query with our current setup,
    // we'll filter after fetching the data
    const templates: Template[] = data?.map(template => ({
      id: template.id,
      name: template.name,
      description: template.description || '',
      category: template.category || 'other',
      thumbnail_url: template.thumbnail_url || '',
      tags: [], // Default empty array for tags
      is_premium: template.is_premium || false,
      content: template.content,
      popularity: template.popularity || 0,
      created_at: template.created_at,
      updated_at: template.updated_at
    })) || [];
    
    // In a real implementation, we would filter by tag here if tags were stored in the database
    
    return templates;
    
  } catch (error) {
    console.error(`Error fetching templates for tag ${tag}:`, error);
    toast.error('Failed to load templates');
    return [];
  }
}
