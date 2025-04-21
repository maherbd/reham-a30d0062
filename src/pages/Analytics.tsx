import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useQuery } from '@tanstack/react-query';
import { fetchWebsiteAnalytics } from '@/services/analyticsService';
import { Button } from '@/components/ui/button';
import { Loader2, Download, Calendar, ChartBar, Activity } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { fetchUserWebsites } from '@/services/websiteService';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { WebsiteAnalyticsTable } from '@/components/analytics/WebsiteAnalyticsTable';

const MOCK_DATA = {
  pageViews: [
    { date: '2025-04-01', views: 145 },
    { date: '2025-04-02', views: 167 },
    { date: '2025-04-03', views: 180 },
    { date: '2025-04-04', views: 156 },
    { date: '2025-04-05', views: 123 },
    { date: '2025-04-06', views: 145 },
    { date: '2025-04-07', views: 190 },
    { date: '2025-04-08', views: 210 },
    { date: '2025-04-09', views: 201 },
    { date: '2025-04-10', views: 220 },
    { date: '2025-04-11', views: 240 },
    { date: '2025-04-12', views: 236 },
    { date: '2025-04-13', views: 210 },
    { date: '2025-04-14', views: 256 },
  ],
  visitors: [
    { date: '2025-04-01', visitors: 89 },
    { date: '2025-04-02', visitors: 112 },
    { date: '2025-04-03', visitors: 134 },
    { date: '2025-04-04', visitors: 98 },
    { date: '2025-04-05', visitors: 87 },
    { date: '2025-04-06', visitors: 102 },
    { date: '2025-04-07', visitors: 145 },
    { date: '2025-04-08', visitors: 167 },
    { date: '2025-04-09', visitors: 156 },
    { date: '2025-04-10', visitors: 178 },
    { date: '2025-04-11', visitors: 189 },
    { date: '2025-04-12', visitors: 179 },
    { date: '2025-04-13', visitors: 145 },
    { date: '2025-04-14', visitors: 201 },
  ],
};

export function AnalyticsDashboard() {
  const { user } = useAuth();
  const [selectedWebsiteId, setSelectedWebsiteId] = useState<string>("");
  const [dateRange, setDateRange] = useState<string>("14d");
  
  const { data: websites, isLoading: isLoadingWebsites } = useQuery({
    queryKey: ['websites', user?.id],
    queryFn: () => user ? fetchUserWebsites(user.id) : Promise.resolve([]),
    enabled: !!user,
  });
  
  const { data: analytics, isLoading: isLoadingAnalytics } = useQuery({
    queryKey: ['website-analytics', selectedWebsiteId, dateRange],
    queryFn: () => fetchWebsiteAnalytics(selectedWebsiteId, dateRange),
    enabled: !!selectedWebsiteId,
  });
  
  const handleWebsiteChange = (websiteId: string) => {
    setSelectedWebsiteId(websiteId);
  };
  
  const getTotalPageViews = () => {
    return MOCK_DATA.pageViews.reduce((sum, item) => sum + item.views, 0);
  };
  
  const getTotalVisitors = () => {
    return MOCK_DATA.visitors.reduce((sum, item) => sum + item.visitors, 0);
  };
  
  const getAverageSessionDuration = () => {
    return "2m 34s";
  };
  
  const getBounceRate = () => {
    return "32%";
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow mt-16 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
                <p className="mt-1 text-muted-foreground">
                  Track your website performance and visitor behavior
                </p>
              </div>
              
              <div className="flex gap-4">
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger className="w-[160px]">
                    <Calendar className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7d">Last 7 days</SelectItem>
                    <SelectItem value="14d">Last 14 days</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                    <SelectItem value="90d">Last 90 days</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button variant="outline" disabled={!selectedWebsiteId}>
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Website</CardTitle>
                <CardDescription>Select a website to view analytics</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingWebsites ? (
                  <div className="flex justify-center py-4">
                    <Loader2 className="h-6 w-6 animate-spin" />
                  </div>
                ) : (
                  <Select value={selectedWebsiteId} onValueChange={handleWebsiteChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a website" />
                    </SelectTrigger>
                    <SelectContent>
                      {websites && websites.map((website) => (
                        <SelectItem key={website.id} value={website.id}>
                          {website.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </CardContent>
            </Card>
            
            {selectedWebsiteId && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatCard 
                    title="Total Page Views" 
                    value={getTotalPageViews().toLocaleString()} 
                    change={+12}
                    icon={<ChartBar className="h-5 w-5" />} 
                  />
                  <StatCard 
                    title="Unique Visitors" 
                    value={getTotalVisitors().toLocaleString()} 
                    change={+8}
                    icon={<Activity className="h-5 w-5" />} 
                  />
                  <StatCard 
                    title="Avg. Session Duration" 
                    value={getAverageSessionDuration()} 
                    change={-3}
                    icon={<Calendar className="h-5 w-5" />} 
                  />
                  <StatCard 
                    title="Bounce Rate" 
                    value={getBounceRate()} 
                    change={+2}
                    icon={<ChartBar className="h-5 w-5" />} 
                  />
                </div>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Traffic Analytics</CardTitle>
                    <CardDescription>Detailed website traffic statistics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <WebsiteAnalyticsTable 
                      data={analytics || []} 
                      isLoading={isLoadingAnalytics} 
                    />
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Page Views</CardTitle>
                      <CardDescription>Daily page views over time</CardDescription>
                    </CardHeader>
                    <CardContent className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={MOCK_DATA.pageViews}
                          margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="views" stroke="#8884d8" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Unique Visitors</CardTitle>
                      <CardDescription>Daily unique visitors over time</CardDescription>
                    </CardHeader>
                    <CardContent className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={MOCK_DATA.visitors}
                          margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="visitors" fill="#82ca9d" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>

                <Tabs defaultValue="pages" className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="pages">Top Pages</TabsTrigger>
                    <TabsTrigger value="referrers">Top Referrers</TabsTrigger>
                    <TabsTrigger value="devices">Devices</TabsTrigger>
                    <TabsTrigger value="countries">Countries</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="pages">
                    <Card>
                      <CardContent className="pt-6">
                        <table className="w-full">
                          <thead>
                            <tr className="text-left border-b">
                              <th className="pb-4">Page</th>
                              <th className="pb-4 text-right">Views</th>
                              <th className="pb-4 text-right">Unique Visitors</th>
                              <th className="pb-4 text-right">Avg. Time</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b">
                              <td className="py-4">/</td>
                              <td className="py-4 text-right">1,245</td>
                              <td className="py-4 text-right">856</td>
                              <td className="py-4 text-right">1m 23s</td>
                            </tr>
                            <tr className="border-b">
                              <td className="py-4">/about</td>
                              <td className="py-4 text-right">643</td>
                              <td className="py-4 text-right">512</td>
                              <td className="py-4 text-right">0m 48s</td>
                            </tr>
                            <tr className="border-b">
                              <td className="py-4">/products</td>
                              <td className="py-4 text-right">578</td>
                              <td className="py-4 text-right">423</td>
                              <td className="py-4 text-right">2m 15s</td>
                            </tr>
                            <tr className="border-b">
                              <td className="py-4">/contact</td>
                              <td className="py-4 text-right">321</td>
                              <td className="py-4 text-right">289</td>
                              <td className="py-4 text-right">1m 05s</td>
                            </tr>
                          </tbody>
                        </table>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="referrers">
                    <Card>
                      <CardContent className="pt-6">
                        <table className="w-full">
                          <thead>
                            <tr className="text-left border-b">
                              <th className="pb-4">Source</th>
                              <th className="pb-4 text-right">Sessions</th>
                              <th className="pb-4 text-right">Bounce Rate</th>
                              <th className="pb-4 text-right">Avg. Session</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b">
                              <td className="py-4">Google</td>
                              <td className="py-4 text-right">856</td>
                              <td className="py-4 text-right">32%</td>
                              <td className="py-4 text-right">2m 14s</td>
                            </tr>
                            <tr className="border-b">
                              <td className="py-4">Direct</td>
                              <td className="py-4 text-right">743</td>
                              <td className="py-4 text-right">28%</td>
                              <td className="py-4 text-right">3m 12s</td>
                            </tr>
                            <tr className="border-b">
                              <td className="py-4">Twitter</td>
                              <td className="py-4 text-right">456</td>
                              <td className="py-4 text-right">41%</td>
                              <td className="py-4 text-right">1m 03s</td>
                            </tr>
                            <tr className="border-b">
                              <td className="py-4">Facebook</td>
                              <td className="py-4 text-right">312</td>
                              <td className="py-4 text-right">35%</td>
                              <td className="py-4 text-right">1m 45s</td>
                            </tr>
                          </tbody>
                        </table>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="devices">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex justify-center">
                          <div className="w-full max-w-md h-80">
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart
                                data={[
                                  { name: 'Mobile', value: 45 },
                                  { name: 'Desktop', value: 40 },
                                  { name: 'Tablet', value: 15 }
                                ]}
                                layout="vertical"
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                              >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" />
                                <YAxis dataKey="name" type="category" />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="value" fill="#8884d8" name="Percentage" />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="countries">
                    <Card>
                      <CardContent className="pt-6">
                        <table className="w-full">
                          <thead>
                            <tr className="text-left border-b">
                              <th className="pb-4">Country</th>
                              <th className="pb-4 text-right">Visitors</th>
                              <th className="pb-4 text-right">Percentage</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b">
                              <td className="py-4">United States</td>
                              <td className="py-4 text-right">1,245</td>
                              <td className="py-4 text-right">42%</td>
                            </tr>
                            <tr className="border-b">
                              <td className="py-4">United Kingdom</td>
                              <td className="py-4 text-right">486</td>
                              <td className="py-4 text-right">16%</td>
                            </tr>
                            <tr className="border-b">
                              <td className="py-4">Canada</td>
                              <td className="py-4 text-right">324</td>
                              <td className="py-4 text-right">11%</td>
                            </tr>
                            <tr className="border-b">
                              <td className="py-4">Australia</td>
                              <td className="py-4 text-right">256</td>
                              <td className="py-4 text-right">9%</td>
                            </tr>
                            <tr className="border-b">
                              <td className="py-4">Germany</td>
                              <td className="py-4 text-right">198</td>
                              <td className="py-4 text-right">7%</td>
                            </tr>
                            <tr className="border-b">
                              <td className="py-4">Others</td>
                              <td className="py-4 text-right">423</td>
                              <td className="py-4 text-right">15%</td>
                            </tr>
                          </tbody>
                        </table>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  change?: number;
  icon?: React.ReactNode;
}

function StatCard({ title, value, change, icon }: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
            {change !== undefined && (
              <div className={`flex items-center mt-1 text-sm ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                <span>{change >= 0 ? '+' : ''}{change}%</span>
                <span className="ml-1 text-xs text-muted-foreground">vs. previous period</span>
              </div>
            )}
          </div>
          {icon && (
            <div className="p-2 bg-primary/10 text-primary rounded-md">
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default AnalyticsDashboard;
