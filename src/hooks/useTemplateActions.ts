
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';

export function useTemplateActions() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user, login } = useAuth();

  const useTemplate = async (templateId: string) => {
    try {
      setIsLoading(true);
      
      // Check if user is logged in
      if (!user) {
        toast.error('Please log in to use this template');
        // Store the template ID to use after login
        localStorage.setItem('pendingTemplateId', templateId);
        navigate('/login');
        return false;
      }
      
      // Create a new website based on the template
      const { data, error } = await supabase
        .from('websites')
        .insert({
          user_id: user.id,
          template_id: templateId,
          name: 'My New Website',
          published: false
        })
        .select()
        .single();
        
      if (error) {
        throw error;
      }
      
      toast.success('Template added to your dashboard');
      navigate('/dashboard');
      return true;
      
    } catch (error) {
      console.error('Error using template:', error);
      toast.error('Failed to use template');
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  return { useTemplate, isLoading };
}
