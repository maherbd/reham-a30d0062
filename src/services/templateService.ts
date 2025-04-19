
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Template, TemplateMetrics } from '@/types/template';

export async function fetchTemplates(): Promise<Template[]> {
  try {
    const { data, error } = await supabase
      .from('templates')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    // Transform data to match Template interface
    return data?.map(template => ({
      ...template,
      tags: [], // Initialize with empty array since it doesn't exist in the database
      category: template.category || 'meme' // Default to a valid category if undefined
    })) || [];
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

    // Record a view of this template
    await recordTemplateView(id);

    // Transform to match Template interface
    return data ? {
      ...data,
      tags: [], // Initialize with empty array since it doesn't exist in the database
      category: data.category || 'meme' // Default to a valid category if undefined
    } : null;
  } catch (error) {
    console.error(`Error fetching template with ID ${id}:`, error);
    toast.error('Failed to load template details');
    return null;
  }
}

export async function fetchTrendingTemplates(limit: number = 6): Promise<Template[]> {
  try {
    const { data, error } = await supabase
      .from('templates')
      .select('*')
      .order('popularity', { ascending: false })
      .limit(limit);

    if (error) {
      throw error;
    }

    // Transform data to match Template interface
    return data?.map(template => ({
      ...template,
      tags: [], // Initialize with empty array since it doesn't exist in the database
      category: template.category || 'meme' // Default to a valid category if undefined
    })) || [];
  } catch (error) {
    console.error('Error fetching trending templates:', error);
    toast.error('Failed to load trending templates');
    return [];
  }
}

export async function fetchPremiumTemplates(limit: number = 6): Promise<Template[]> {
  try {
    const { data, error } = await supabase
      .from('templates')
      .select('*')
      .eq('is_premium', true)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      throw error;
    }

    // Transform data to match Template interface
    return data?.map(template => ({
      ...template,
      tags: [], // Initialize with empty array since it doesn't exist in the database
      category: template.category || 'meme' // Default to a valid category if undefined
    })) || [];
  } catch (error) {
    console.error('Error fetching premium templates:', error);
    toast.error('Failed to load premium templates');
    return [];
  }
}

export async function recordTemplateView(templateId: string): Promise<void> {
  try {
    // Check if there's already a metrics record for this template
    const { data, error: fetchError } = await supabase
      .from('template_metrics')
      .select('*')
      .eq('template_id', templateId)
      .maybeSingle();

    if (fetchError && fetchError.code !== 'PGRST116') {
      throw fetchError;
    }

    const timestamp = new Date().toISOString();

    if (data) {
      // Update existing metrics record
      const { error: updateError } = await supabase
        .from('template_metrics')
        .update({
          views: data.views + 1,
          last_viewed_at: timestamp,
          updated_at: timestamp
        })
        .eq('id', data.id);

      if (updateError) throw updateError;
    } else {
      // Create new metrics record
      const { error: insertError } = await supabase
        .from('template_metrics')
        .insert({
          template_id: templateId,
          views: 1,
          uses: 0,
          last_viewed_at: timestamp
        });

      if (insertError) throw insertError;
    }

    // Update template popularity score - fixed approach to properly call RPC function
    await supabase.rpc('increment_column', {
      table_name: 'templates',
      column_name: 'popularity',
      record_id_column: 'id',
      record_id: templateId,
      amount: 1
    });

  } catch (error) {
    console.error('Error recording template view:', error);
    // Don't show toast to users for analytics errors
  }
}

export async function recordTemplateUse(templateId: string): Promise<void> {
  try {
    // Check if there's already a metrics record for this template
    const { data, error: fetchError } = await supabase
      .from('template_metrics')
      .select('*')
      .eq('template_id', templateId)
      .maybeSingle();

    if (fetchError && fetchError.code !== 'PGRST116') {
      throw fetchError;
    }

    const timestamp = new Date().toISOString();

    if (data) {
      // Update existing metrics record
      const { error: updateError } = await supabase
        .from('template_metrics')
        .update({
          uses: data.uses + 1,
          updated_at: timestamp
        })
        .eq('id', data.id);

      if (updateError) throw updateError;
    } else {
      // Create new metrics record
      const { error: insertError } = await supabase
        .from('template_metrics')
        .insert({
          template_id: templateId,
          views: 0,
          uses: 1,
        });

      if (insertError) throw insertError;
    }

    // Update template popularity score - fixed approach to properly call RPC function
    await supabase.rpc('increment_column', {
      table_name: 'templates',
      column_name: 'popularity',
      record_id_column: 'id',
      record_id: templateId,
      amount: 5
    });

  } catch (error) {
    console.error('Error recording template use:', error);
    // Don't show toast to users for analytics errors
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

    // Record template usage for analytics
    await recordTemplateUse(templateId);

    toast.success('Template added to your dashboard');
    return true;
  } catch (error) {
    console.error('Error using template:', error);
    toast.error('Failed to use template');
    return false;
  }
}
