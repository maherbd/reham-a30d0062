
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface WebsiteAnalytics {
  id: string;
  website_id: string;
  date: string;
  views: number;
  unique_visitors: number;
  bounce_rate: number;
  avg_session_duration: number;
}

export interface AnalyticsQuery {
  start_date?: string;
  end_date?: string;
  metrics?: string[];
  dimensions?: string[];
}

export async function fetchWebsiteAnalytics(websiteId: string, dateRange: string = '14d'): Promise<WebsiteAnalytics[]> {
  try {
    const days = parseInt(dateRange.replace('d', ''));
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    const { data, error } = await supabase
      .from('website_analytics')
      .select('*')
      .eq('website_id', websiteId)
      .gte('date', startDate.toISOString().split('T')[0])
      .order('date', { ascending: true });
    
    if (error) throw error;
    
    return data as WebsiteAnalytics[] || [];
  } catch (error) {
    console.error('Error fetching website analytics:', error);
    toast.error('Failed to load analytics data');
    return [];
  }
}

export async function recordPageView(websiteId: string, page: string, referrer?: string): Promise<boolean> {
  try {
    // This would be implemented to track a page view in a real application
    // For now we'll just return true to simulate success
    console.log('Recording page view:', { websiteId, page, referrer });
    return true;
  } catch (error) {
    console.error('Error recording page view:', error);
    return false;
  }
}

export async function fetchAnalyticsSummary(websiteId: string): Promise<{
  total_views: number;
  unique_visitors: number;
  avg_session_duration: number;
  bounce_rate: number;
}> {
  try {
    // This would be implemented to fetch a summary of analytics in a real application
    // For now we'll return mock data
    return {
      total_views: 2890,
      unique_visitors: 1456,
      avg_session_duration: 154, // in seconds
      bounce_rate: 32.5, // percentage
    };
  } catch (error) {
    console.error('Error fetching analytics summary:', error);
    toast.error('Failed to load analytics summary');
    return {
      total_views: 0,
      unique_visitors: 0,
      avg_session_duration: 0,
      bounce_rate: 0,
    };
  }
}

export async function exportAnalyticsData(websiteId: string, format: 'csv' | 'json' = 'csv'): Promise<string | null> {
  try {
    // This would be implemented to export data in a real application
    // For now we'll just log the request and return a mock URL
    console.log('Exporting analytics data:', { websiteId, format });
    
    return format === 'csv' 
      ? 'https://example.com/exports/analytics-export-12345.csv'
      : 'https://example.com/exports/analytics-export-12345.json';
  } catch (error) {
    console.error('Error exporting analytics data:', error);
    toast.error('Failed to export analytics data');
    return null;
  }
}

export async function updateAnalyticsSettings(
  websiteId: string, 
  settings: {
    googleAnalyticsId?: string;
    enableBuiltInAnalytics?: boolean;
    facebookPixelId?: string;
    hotjarId?: string;
    customHeadCode?: string;
  }
): Promise<boolean> {
  try {
    // Update the website settings in the database
    const { error } = await supabase
      .from('websites')
      .update({
        settings: {
          analytics: settings
        }
      })
      .eq('id', websiteId);
    
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error('Error updating analytics settings:', error);
    toast.error('Failed to update analytics settings');
    return false;
  }
}
