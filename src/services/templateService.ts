import { supabase } from '@/integrations/supabase/client';
import { Template } from '@/types/template';
import { toast } from 'sonner';

export async function useTemplate(templateId: string, userId: string): Promise<boolean> {
  try {
    // First fetch the template
    const { data: template, error: templateError } = await supabase
      .from('templates')
      .select('*')
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
    const { error: metricsError } = await supabase
      .from('template_metrics')
      .upsert({
        template_id: templateId,
        uses: template.uses + 1
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
    return data || [];
    
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
    return data || null;
    
  } catch (error) {
    console.error('Error fetching template:', error);
    toast.error('Failed to load template');
    return null;
  }
}
