
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { useTemplate as useTemplateSvc } from '@/services/templateService';

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
      
      // Use template service to create website based on the template
      const result = await useTemplateSvc(templateId, user.id);
      
      if (result) {
        navigate('/dashboard');
        return true;
      } else {
        throw new Error('Failed to create website');
      }
      
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
