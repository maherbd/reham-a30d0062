
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface WebsiteAnalytics {
  id?: string;
  website_id: string;
  date: string;
  views: number;
  unique_visitors: number;
  bounce_rate?: number;
  avg_session_duration?: number;
  created_at?: string;
  updated_at?: string;
}

export interface AnalyticsTimeframe {
  start: string;
  end: string;
  label: string;
}

export const timeframes: Record<string, AnalyticsTimeframe> = {
  '7d': {
    start: getDateString(7),
    end: getDateString(0),
    label: 'Last 7 Days'
  },
  '30d': {
    start: getDateString(30),
    end: getDateString(0),
    label: 'Last 30 Days'
  },
  '90d': {
    start: getDateString(90),
    end: getDateString(0),
    label: 'Last 90 Days'
  },
  'ytd': {
    start: `${new Date().getFullYear()}-01-01`,
    end: getDateString(0),
    label: 'Year to Date'
  },
  'all': {
    start: '2020-01-01', // A past date that will include all data
    end: getDateString(0),
    label: 'All Time'
  }
};

function getDateString(daysAgo: number): string {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split('T')[0];
}

export async function fetchWebsiteAnalytics(websiteId: string, timeframe: keyof typeof timeframes = '30d'): Promise<WebsiteAnalytics[]> {
  try {
    const { start, end } = timeframes[timeframe];
    
    const { data, error } = await supabase
      .from('website_analytics')
      .select('*')
      .eq('website_id', websiteId)
      .gte('date', start)
      .lte('date', end)
      .order('date', { ascending: true });
    
    if (error) throw error;
    
    return data || [];
  } catch (error) {
    console.error('Error fetching website analytics:', error);
    toast.error('Failed to load analytics data');
    return [];
  }
}

// Record a page view for the specified website
export async function recordPageView(websiteId: string, userId?: string): Promise<void> {
  try {
    const today = new Date().toISOString().split('T')[0];
    
    // Get the current analytics record for today if it exists
    const { data: existingRecord, error: fetchError } = await supabase
      .from('website_analytics')
      .select('*')
      .eq('website_id', websiteId)
      .eq('date', today)
      .single();
    
    if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 is "not found", which is okay
      throw fetchError;
    }
    
    if (existingRecord) {
      // Update the existing record
      const { error: updateError } = await supabase
        .from('website_analytics')
        .update({
          views: existingRecord.views + 1,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingRecord.id);
      
      if (updateError) throw updateError;
    } else {
      // Create a new record for today
      const { error: insertError } = await supabase
        .from('website_analytics')
        .insert({
          website_id: websiteId,
          date: today,
          views: 1,
          unique_visitors: 1, // We're simplifying here; in a real app, track unique visitors more accurately
          bounce_rate: 0,
          avg_session_duration: 0
        });
      
      if (insertError) throw insertError;
    }
  } catch (error) {
    console.error('Error recording page view:', error);
    // Don't show toast here since this is a background operation and shouldn't interrupt the user
  }
}

// Get analytics summary - totals and averages
export async function getAnalyticsSummary(websiteId: string, timeframe: keyof typeof timeframes = '30d'): Promise<{
  totalViews: number;
  totalVisitors: number;
  avgBounceRate: number;
  avgSessionDuration: number;
}> {
  try {
    const analytics = await fetchWebsiteAnalytics(websiteId, timeframe);
    
    if (!analytics.length) {
      return {
        totalViews: 0,
        totalVisitors: 0,
        avgBounceRate: 0,
        avgSessionDuration: 0
      };
    }
    
    const totalViews = analytics.reduce((sum, day) => sum + day.views, 0);
    const totalVisitors = analytics.reduce((sum, day) => sum + day.unique_visitors, 0);
    
    // Calculate averages only from days with data
    const daysWithBounceRate = analytics.filter(day => day.bounce_rate !== null && day.bounce_rate !== undefined);
    const avgBounceRate = daysWithBounceRate.length
      ? daysWithBounceRate.reduce((sum, day) => sum + (day.bounce_rate || 0), 0) / daysWithBounceRate.length
      : 0;
    
    const daysWithSessionDuration = analytics.filter(day => day.avg_session_duration !== null && day.avg_session_duration !== undefined);
    const avgSessionDuration = daysWithSessionDuration.length
      ? daysWithSessionDuration.reduce((sum, day) => sum + (day.avg_session_duration || 0), 0) / daysWithSessionDuration.length
      : 0;
    
    return {
      totalViews,
      totalVisitors,
      avgBounceRate,
      avgSessionDuration
    };
  } catch (error) {
    console.error('Error getting analytics summary:', error);
    toast.error('Failed to load analytics summary');
    return {
      totalViews: 0,
      totalVisitors: 0,
      avgBounceRate: 0,
      avgSessionDuration: 0
    };
  }
}

// Get analytics for all websites of a user
export async function getUserWebsitesAnalytics(userId: string, timeframe: keyof typeof timeframes = '30d'): Promise<{
  websiteId: string;
  websiteName: string;
  views: number;
  visitors: number;
}[]> {
  try {
    const { start, end } = timeframes[timeframe];
    
    // First, get all websites owned by the user
    const { data: websites, error: websitesError } = await supabase
      .from('websites')
      .select('id, name')
      .eq('user_id', userId);
    
    if (websitesError) throw websitesError;
    if (!websites || websites.length === 0) return [];
    
    // Then, get analytics for each website
    const websiteIds = websites.map(site => site.id);
    
    const { data: analytics, error: analyticsError } = await supabase
      .from('website_analytics')
      .select('website_id, views, unique_visitors')
      .in('website_id', websiteIds)
      .gte('date', start)
      .lte('date', end);
    
    if (analyticsError) throw analyticsError;
    
    // Aggregate analytics by website
    return websites.map(website => {
      const websiteAnalytics = analytics?.filter(a => a.website_id === website.id) || [];
      const views = websiteAnalytics.reduce((sum, day) => sum + (day.views || 0), 0);
      const visitors = websiteAnalytics.reduce((sum, day) => sum + (day.unique_visitors || 0), 0);
      
      return {
        websiteId: website.id,
        websiteName: website.name,
        views,
        visitors
      };
    });
  } catch (error) {
    console.error('Error getting user websites analytics:', error);
    toast.error('Failed to load websites analytics');
    return [];
  }
}
