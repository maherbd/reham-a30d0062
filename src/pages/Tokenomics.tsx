
import React, { useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FadeIn, FadeInStagger } from '@/components/transitions/FadeIn';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { ArrowRight, Download, Copy } from 'lucide-react';
import { toast } from 'sonner';

// Sample tokenomics data
const tokenDistribution = [
  { name: 'Public Sale', value: 35, color: '#3b82f6' },
  { name: 'Team', value: 15, color: '#10b981' },
  { name: 'Marketing', value: 10, color: '#6366f1' },
  { name: 'Treasury', value: 20, color: '#f59e0b' },
  { name: 'Ecosystem', value: 15, color: '#ec4899' },
  { name: 'Advisors', value: 5, color: '#8b5cf6' },
];

const vestingSchedule = [
  { month: 'Jan', Team: 5, Advisors: 10, Marketing: 20 },
  { month: 'Feb', Team: 5, Advisors: 10, Marketing: 15 },
  { month: 'Mar', Team: 5, Advisors: 10, Marketing: 15 },
  { month: 'Apr', Team: 10, Advisors: 10, Marketing: 10 },
  { month: 'May', Team: 10, Advisors: 10, Marketing: 10 },
  { month: 'Jun', Team: 10, Advisors: 10, Marketing: 10 },
  { month: 'Jul', Team: 15, Advisors: 15, Marketing: 5 },
  { month: 'Aug', Team: 15, Advisors: 15, Marketing: 5 },
  { month: 'Sep', Team: 15, Advisors: 10, Marketing: 5 },
  { month: 'Oct', Team: 10, Advisors: 0, Marketing: 5 },
];

const COLORS = ['#3b82f6', '#10b981', '#6366f1', '#f59e0b', '#ec4899', '#8b5cf6'];

const Tokenomics = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCopyContract = () => {
    navigator.clipboard.writeText('0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t');
    toast.success('Contract address copied to clipboard!');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow mt-16">
        <section className="pt-20 pb-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Tokenomics</h1>
                <p className="mt-4 text-lg text-muted-foreground">
                  Complete token economics and distribution details for the Reham Token (RHM)
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass-panel p-6 sm:p-10 rounded-2xl mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <FadeIn>
                    <h2 className="text-2xl font-bold mb-4">Token Overview</h2>
                    <p className="text-muted-foreground mb-6">
                      The Reham Token (RHM) is the native utility token that powers the entire Reham ecosystem.
                      It enables governance, staking rewards, and premium template access.
                    </p>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm text-muted-foreground">Token Name</h4>
                          <p className="font-medium">Reham Token</p>
                        </div>
                        <div>
                          <h4 className="text-sm text-muted-foreground">Symbol</h4>
                          <p className="font-medium">RHM</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm text-muted-foreground">Total Supply</h4>
                          <p className="font-medium">1,000,000,000 RHM</p>
                        </div>
                        <div>
                          <h4 className="text-sm text-muted-foreground">Initial Circulating Supply</h4>
                          <p className="font-medium">350,000,000 RHM</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm text-muted-foreground">Contract Address (Ethereum)</h4>
                        <div className="flex items-center mt-1">
                          <code className="bg-secondary p-2 rounded text-xs w-full overflow-hidden text-ellipsis">
                            0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t
                          </code>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="ml-2" 
                            onClick={handleCopyContract}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-4">
                      <Button className="primary-button">
                        View on Etherscan
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                      <Button variant="outline" className="glass-button">
                        <Download className="mr-2 h-4 w-4" />
                        Download Whitepaper
                      </Button>
                    </div>
                  </FadeIn>
                </div>

                <div className="h-80">
                  <FadeIn>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={tokenDistribution}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={120}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {tokenDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </FadeIn>
                </div>
              </div>
            </div>

            <FadeIn>
              <Tabs defaultValue="allocation" className="mb-12">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="allocation">Token Allocation</TabsTrigger>
                  <TabsTrigger value="vesting">Vesting Schedule</TabsTrigger>
                  <TabsTrigger value="utility">Token Utility</TabsTrigger>
                </TabsList>
                <TabsContent value="allocation" className="p-6 bg-card rounded-b-xl border border-border/50">
                  <h3 className="text-xl font-semibold mb-4">Token Allocation Breakdown</h3>
                  <p className="text-muted-foreground mb-6">
                    The total supply of 1 billion RHM tokens is allocated across various segments to ensure long-term sustainability.
                  </p>
                  
                  <div className="space-y-6">
                    {tokenDistribution.map((item, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-16 text-right mr-4">
                          <span className="font-semibold">{item.value}%</span>
                        </div>
                        <div className="relative w-full h-6 bg-secondary rounded-full overflow-hidden">
                          <div 
                            className="absolute top-0 left-0 h-full rounded-full" 
                            style={{ width: `${item.value}%`, backgroundColor: item.color }}
                          ></div>
                        </div>
                        <div className="w-24 ml-4">
                          <span className="text-sm">{item.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="vesting" className="p-6 bg-card rounded-b-xl border border-border/50">
                  <h3 className="text-xl font-semibold mb-4">Vesting Schedule</h3>
                  <p className="text-muted-foreground mb-6">
                    Token release schedule ensures long-term alignment of incentives for all stakeholders.
                  </p>
                  
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={vestingSchedule}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Team" fill="#10b981" />
                        <Bar dataKey="Advisors" fill="#8b5cf6" />
                        <Bar dataKey="Marketing" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="mt-6">
                    <p className="text-sm text-muted-foreground">
                      * Chart shows token release as a percentage of total allocation per month
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="utility" className="p-6 bg-card rounded-b-xl border border-border/50">
                  <h3 className="text-xl font-semibold mb-4">Token Utility</h3>
                  <p className="text-muted-foreground mb-6">
                    The RHM token serves multiple purposes within the Reham ecosystem.
                  </p>
                  
                  <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 gap-6" staggerDelay={100}>
                    <div className="glass-panel p-5 rounded-xl">
                      <h4 className="text-lg font-medium mb-2">Governance</h4>
                      <p className="text-sm text-muted-foreground">
                        Token holders can vote on platform upgrades, feature prioritization, and treasury allocation.
                      </p>
                    </div>
                    
                    <div className="glass-panel p-5 rounded-xl">
                      <h4 className="text-lg font-medium mb-2">Platform Access</h4>
                      <p className="text-sm text-muted-foreground">
                        Premium templates and features require RHM tokens for access, with tiered benefits.
                      </p>
                    </div>
                    
                    <div className="glass-panel p-5 rounded-xl">
                      <h4 className="text-lg font-medium mb-2">Staking Rewards</h4>
                      <p className="text-sm text-muted-foreground">
                        Stake RHM to earn passive rewards and unlock additional platform benefits.
                      </p>
                    </div>
                    
                    <div className="glass-panel p-5 rounded-xl">
                      <h4 className="text-lg font-medium mb-2">Fee Discounts</h4>
                      <p className="text-sm text-muted-foreground">
                        Holding RHM provides discounts on platform fees including custom domain registration.
                      </p>
                    </div>
                  </FadeInStagger>
                </TabsContent>
              </Tabs>
            </FadeIn>

            <FadeIn>
              <div className="glass-panel p-6 sm:p-10 rounded-2xl text-center">
                <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                  Explore our templates and start building your Web3 project with Reham today.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button className="primary-button">
                    Launch App
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="glass-button">
                    Learn More
                  </Button>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Tokenomics;
