
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { WebsiteData } from '@/types/template';

export async function fetchUserWebsites(userId: string): Promise<WebsiteData[]> {
  try {
    const { data, error } = await supabase
      .from('websites')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false });

    if (error) {
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching user websites:', error);
    toast.error('Failed to load websites');
    return [];
  }
}

export async function createWebsite(userId: string, templateId: string, name: string): Promise<WebsiteData | null> {
  try {
    const { data, error } = await supabase
      .from('websites')
      .insert({
        user_id: userId,
        template_id: templateId,
        name,
        published: false
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    toast.success('Website created successfully');
    return data;
  } catch (error) {
    console.error('Error creating website:', error);
    toast.error('Failed to create website');
    return null;
  }
}

export async function updateWebsite(websiteId: string, updates: Partial<WebsiteData>): Promise<WebsiteData | null> {
  try {
    const { data, error } = await supabase
      .from('websites')
      .update(updates)
      .eq('id', websiteId)
      .select()
      .single();

    if (error) {
      throw error;
    }

    toast.success('Website updated successfully');
    return data;
  } catch (error) {
    console.error('Error updating website:', error);
    toast.error('Failed to update website');
    return null;
  }
}

export async function deleteWebsite(websiteId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('websites')
      .delete()
      .eq('id', websiteId);

    if (error) {
      throw error;
    }

    toast.success('Website deleted successfully');
    return true;
  } catch (error) {
    console.error('Error deleting website:', error);
    toast.error('Failed to delete website');
    return false;
  }
}

export async function publishWebsite(websiteId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('websites')
      .update({ published: true })
      .eq('id', websiteId);

    if (error) {
      throw error;
    }

    toast.success('Website published successfully');
    return true;
  } catch (error) {
    console.error('Error publishing website:', error);
    toast.error('Failed to publish website');
    return false;
  }
}

export async function unpublishWebsite(websiteId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('websites')
      .update({ published: false })
      .eq('id', websiteId);

    if (error) {
      throw error;
    }

    toast.success('Website unpublished');
    return true;
  } catch (error) {
    console.error('Error unpublishing website:', error);
    toast.error('Failed to unpublish website');
    return false;
  }
}
