
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Template } from '@/types/template';

export async function fetchTemplates(): Promise<Template[]> {
  try {
    const { data, error } = await supabase
      .from('templates')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching templates:', error);
    toast.error('Failed to load templates');
    return [];
  }
}

export async function fetchTemplateById(id: string): Promise<Template | null> {
  try {
    const { data, error } = await supabase
      .from('templates')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error(`Error fetching template with ID ${id}:`, error);
    toast.error('Failed to load template details');
    return null;
  }
}

export async function useTemplate(templateId: string, userId: string): Promise<boolean> {
  try {
    // Create a website instance based on the template
    const { data: websiteData, error: websiteError } = await supabase
      .from('websites')
      .insert({
        user_id: userId,
        template_id: templateId,
        name: 'New Website',
        published: false
      })
      .select()
      .single();

    if (websiteError) {
      throw websiteError;
    }

    toast.success('Template added to your dashboard');
    return true;
  } catch (error) {
    console.error('Error using template:', error);
    toast.error('Failed to use template');
    return false;
  }
}
