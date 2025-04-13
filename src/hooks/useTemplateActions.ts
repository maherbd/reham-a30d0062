
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { createWebsite } from '@/services/websiteService';

export function useTemplateActions() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

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
      const website = await createWebsite(user.id, templateId, 'My New Website');
      
      if (!website) {
        throw new Error('Failed to create website');
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
