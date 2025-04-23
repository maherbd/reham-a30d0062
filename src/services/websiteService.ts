
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

export async function fetchWebsiteById(id: string): Promise<WebsiteData | null> {
  try {
    const { data, error } = await supabase
      .from('websites')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error fetching website by ID:', error);
    toast.error('Failed to load website');
    return null;
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

export async function updateSubdomain(websiteId: string, subdomain: string): Promise<boolean> {
  try {
    // Check if subdomain is available
    const { data: existingData, error: checkError } = await supabase
      .from('websites')
      .select('id')
      .eq('subdomain', subdomain)
      .neq('id', websiteId)
      .maybeSingle();
    
    if (checkError) throw checkError;
    
    if (existingData) {
      toast.error('This subdomain is already taken');
      return false;
    }
    
    // Update the website with the new subdomain
    const { error } = await supabase
      .from('websites')
      .update({ 
        subdomain,
        updated_at: new Date().toISOString()
      })
      .eq('id', websiteId);
    
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error('Error updating subdomain:', error);
    toast.error('Failed to update subdomain');
    return false;
  }
}

export async function verifyCustomDomain(domain: string): Promise<{ verified: boolean; errors?: string[] }> {
  try {
    // In a real implementation, this would check DNS records
    // For demo purposes, we'll simulate a verification process
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock verification logic (always succeeds for demo)
    const isValid = /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i.test(domain);
    
    if (!isValid) {
      return {
        verified: false,
        errors: ['Invalid domain format']
      };
    }
    
    return { verified: true };
  } catch (error) {
    console.error('Error verifying domain:', error);
    return {
      verified: false,
      errors: ['Verification service unavailable']
    };
  }
}

export async function updateCustomDomain(websiteId: string, domain: string): Promise<boolean> {
  try {
    // First verify the domain
    const verificationResult = await verifyCustomDomain(domain);
    
    if (!verificationResult.verified) {
      toast.error('Domain verification failed');
      return false;
    }
    
    // Update the website with the new domain
    const { error } = await supabase
      .from('websites')
      .update({ 
        custom_domain: domain,
        updated_at: new Date().toISOString()
      })
      .eq('id', websiteId);
    
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error('Error updating custom domain:', error);
    toast.error('Failed to update custom domain');
    return false;
  }
}
