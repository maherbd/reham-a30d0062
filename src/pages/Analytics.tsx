
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { fetchWebsiteById } from '@/services/websiteService';
import { fetchWebsiteAnalytics, getAnalyticsSummary, timeframes, getUserWebsitesAnalytics, WebsiteAnalytics } from '@/services/analyticsService';
import { useAuth } from '@/hooks/useAuth';
import { WebsiteAnalyticsTable } from '@/components/analytics/WebsiteAnalyticsTable';
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";
import { Loader2, Calendar } from 'lucide-react';

const AnalyticsDashboard = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [timeframe, setTimeframe] = useState<keyof typeof timeframes>('30d');

  // Fetch website data if we have an ID
  const { data: website, isLoading: isLoadingWebsite } = useQuery({
    queryKey: ['website', id],
    queryFn: () => fetchWebsiteById(id as string),
    enabled: !!id && !!user,
  });

  // Fetch analytics data for the specific website
  const { data: analyticsData, isLoading: isLoadingAnalytics } = useQuery({
    queryKey: ['website-analytics', id, timeframe],
    queryFn: () => fetchWebsiteAnalytics(id as string, timeframe),
    enabled: !!id && !!user,
  });

  // Fetch analytics summary
  const { data: analyticsSummary, isLoading: isLoadingSummary } = useQuery({
    queryKey: ['analytics-summary', id, timeframe],
    queryFn: () => getAnalyticsSummary(id as string, timeframe),
    enabled: !!id && !!user,
  });

  // Fetch analytics for all user websites if no specific ID
  const { data: userWebsitesAnalytics, isLoading: isLoadingUserAnalytics } = useQuery({
    queryKey: ['user-websites-analytics', user?.id, timeframe],
    queryFn: () => getUserWebsitesAnalytics(user?.id as string, timeframe),
    enabled: !id && !!user,
  });

  const isLoading = isLoadingWebsite || isLoadingAnalytics || isLoadingSummary || isLoadingUserAnalytics;

  // Format data for charts
  const formatChartData = (data: WebsiteAnalytics[] = []) => {
    return data.map(item => ({
      date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      views: item.views,
      visitors: item.unique_visitors,
      bounceRate: item.bounce_rate || 0,
      avgDuration: item.avg_session_duration || 0,
    }));
  };

  const chartData = formatChartData(analyticsData);

  // Custom tooltip formatter
  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded-md shadow-sm p-3">
          <p className="font-medium">{label}</p>
          {payload.map((entry, index) => (
            <p key={`item-${index}`} style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow mt-16 py-12">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
                <div>
                  <h1 className="text-3xl font-bold">
                    {id && website ? `${website.name} Analytics` : 'Website Analytics'}
                  </h1>
                  <p className="text-muted-foreground mt-1">
                    Insights and performance metrics for your website
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <Select 
                    value={timeframe} 
                    onValueChange={(value) => setTimeframe(value as keyof typeof timeframes)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <Calendar className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Select timeframe" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(timeframes).map(([key, { label }]) => (
                        <SelectItem key={key} value={key}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Button variant="outline">Export Data</Button>
                </div>
              </div>

              {id ? (
                // Single website analytics view
                <>
                  {/* Overview Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">
                          Total Page Views
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {analyticsSummary?.totalViews.toLocaleString() || 0}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          For {timeframes[timeframe].label.toLowerCase()}
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">
                          Unique Visitors
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {analyticsSummary?.totalVisitors.toLocaleString() || 0}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          For {timeframes[timeframe].label.toLowerCase()}
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">
                          Avg. Bounce Rate
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {`${(analyticsSummary?.avgBounceRate || 0).toFixed(1)}%`}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          For {timeframes[timeframe].label.toLowerCase()}
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">
                          Avg. Session Duration
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {`${(analyticsSummary?.avgSessionDuration || 0).toFixed(1)}s`}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          For {timeframes[timeframe].label.toLowerCase()}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Tabs for different chart views */}
                  <Tabs defaultValue="overview" className="space-y-6">
                    <TabsList className="grid grid-cols-3 max-w-md">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="visitors">Visitors</TabsTrigger>
                      <TabsTrigger value="engagement">Engagement</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="overview">
                      <Card>
                        <CardHeader>
                          <CardTitle>Website Traffic</CardTitle>
                          <CardDescription>
                            Page views and unique visitors over time
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                          <div className="h-[350px] w-full px-4 pb-6">
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart data={chartData}>
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip content={<CustomTooltip />} />
                                <Line 
                                  type="monotone" 
                                  dataKey="views" 
                                  stroke="#0284c7" 
                                  strokeWidth={2} 
                                  name="Page Views"
                                />
                                <Line 
                                  type="monotone" 
                                  dataKey="visitors" 
                                  stroke="#06b6d4" 
                                  strokeWidth={2} 
                                  name="Visitors"
                                />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    
                    <TabsContent value="visitors">
                      <Card>
                        <CardHeader>
                          <CardTitle>Visitor Metrics</CardTitle>
                          <CardDescription>
                            Daily unique visitor data
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                          <div className="h-[350px] w-full px-4 pb-6">
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart data={chartData}>
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip content={<CustomTooltip />} />
                                <Bar 
                                  dataKey="visitors" 
                                  fill="#06b6d4" 
                                  name="Unique Visitors"
                                  radius={[4, 4, 0, 0]}
                                />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    
                    <TabsContent value="engagement">
                      <Card>
                        <CardHeader>
                          <CardTitle>User Engagement</CardTitle>
                          <CardDescription>
                            Bounce rate and session duration
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                          <div className="h-[350px] w-full px-4 pb-6">
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart data={chartData}>
                                <XAxis dataKey="date" />
                                <YAxis yAxisId="left" />
                                <YAxis yAxisId="right" orientation="right" />
                                <Tooltip content={<CustomTooltip />} />
                                <Line 
                                  yAxisId="left"
                                  type="monotone" 
                                  dataKey="bounceRate" 
                                  stroke="#f97316" 
                                  strokeWidth={2} 
                                  name="Bounce Rate (%)"
                                />
                                <Line 
                                  yAxisId="right"
                                  type="monotone" 
                                  dataKey="avgDuration" 
                                  stroke="#8b5cf6" 
                                  strokeWidth={2} 
                                  name="Avg Duration (s)"
                                />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                  
                  {/* Analytics Table */}
                  <div className="mt-8">
                    <Card>
                      <CardHeader>
                        <CardTitle>Detailed Analytics</CardTitle>
                        <CardDescription>
                          Day-by-day breakdown of website performance
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <WebsiteAnalyticsTable data={analyticsData || []} />
                      </CardContent>
                    </Card>
                  </div>
                </>
              ) : (
                // Overview of all websites
                <>
                  <Card className="mb-8">
                    <CardHeader>
                      <CardTitle>Website Performance Summary</CardTitle>
                      <CardDescription>
                        Overview of performance across all your websites
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left font-medium p-4 pl-0">Website</th>
                              <th className="text-left font-medium p-4">Views</th>
                              <th className="text-left font-medium p-4">Visitors</th>
                              <th className="text-right font-medium p-4 pr-0">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {userWebsitesAnalytics?.map((site) => (
                              <tr key={site.websiteId} className="border-b">
                                <td className="p-4 pl-0">{site.websiteName}</td>
                                <td className="p-4">{site.views.toLocaleString()}</td>
                                <td className="p-4">{site.visitors.toLocaleString()}</td>
                                <td className="p-4 pr-0 text-right">
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    asChild
                                  >
                                    <a href={`/analytics/${site.websiteId}`}>View Details</a>
                                  </Button>
                                </td>
                              </tr>
                            ))}
                            {(userWebsitesAnalytics?.length === 0) && (
                              <tr>
                                <td colSpan={4} className="p-4 text-center">
                                  No analytics data available
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                
                  {/* Performance summary chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Total Traffic by Website</CardTitle>
                      <CardDescription>
                        Comparison of traffic across your websites
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="h-[350px] w-full px-4 pb-6">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart 
                            data={userWebsitesAnalytics?.map(site => ({
                              name: site.websiteName,
                              views: site.views,
                              visitors: site.visitors
                            }))}
                          >
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar 
                              dataKey="views" 
                              fill="#0284c7" 
                              name="Views"
                              radius={[4, 4, 0, 0]}
                            />
                            <Bar 
                              dataKey="visitors" 
                              fill="#06b6d4" 
                              name="Visitors"
                              radius={[4, 4, 0, 0]}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AnalyticsDashboard;
