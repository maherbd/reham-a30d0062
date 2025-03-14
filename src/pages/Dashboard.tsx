
import React, { useEffect, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FadeIn } from '@/components/transitions/FadeIn';
import { 
  Settings, 
  Home, 
  Layers, 
  FileCode, 
  Rocket, 
  Globe, 
  Bell, 
  CreditCard, 
  PlusCircle,
  Loader2
} from 'lucide-react';
import { toast } from 'sonner';

// Dashboard sidebar navigation
const navigation = [
  { name: 'Overview', href: '#overview', icon: Home, current: true },
  { name: 'Projects', href: '#projects', icon: Layers, current: false },
  { name: 'Templates', href: '/templates', icon: FileCode, current: false },
  { name: 'Deployments', href: '#deployments', icon: Rocket, current: false },
  { name: 'Domains', href: '#domains', icon: Globe, current: false },
  { name: 'Notifications', href: '#notifications', icon: Bell, current: false },
  { name: 'Billing', href: '#billing', icon: CreditCard, current: false },
  { name: 'Settings', href: '#settings', icon: Settings, current: false },
];

// Sample project data
const projects = [
  { 
    id: 'proj-1', 
    name: 'MoonCoin Landing Page', 
    status: 'live', 
    url: 'mooncoin.reham.org', 
    type: 'Meme Coin',
    lastUpdated: '2 days ago',
    visitors: 1243
  },
  { 
    id: 'proj-2', 
    name: 'NFT Showcase', 
    status: 'development', 
    url: 'nft-showcase.reham.org', 
    type: 'NFT',
    lastUpdated: '5 hours ago',
    visitors: 89
  },
  { 
    id: 'proj-3', 
    name: 'DAO Governance', 
    status: 'draft', 
    url: '', 
    type: 'DAO',
    lastUpdated: '1 week ago',
    visitors: 0
  },
];

const Dashboard = () => {
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [userProjects, setUserProjects] = useState(projects);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newProjectName.trim()) {
      toast.error("Please enter a project name");
      return;
    }

    setIsCreatingProject(true);
    
    // Simulate API call
    setTimeout(() => {
      const newProject = {
        id: `proj-${Date.now()}`,
        name: newProjectName,
        status: 'draft',
        url: '',
        type: 'Custom',
        lastUpdated: 'Just now',
        visitors: 0
      };
      
      setUserProjects([newProject, ...userProjects]);
      setNewProjectName('');
      setIsCreatingProject(false);
      toast.success("New project created successfully!");
    }, 1000);
  };

  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    let bgColor = '';
    let textColor = '';
    
    switch (status) {
      case 'live':
        bgColor = 'bg-green-500/20';
        textColor = 'text-green-500';
        break;
      case 'development':
        bgColor = 'bg-amber-500/20';
        textColor = 'text-amber-500';
        break;
      default:
        bgColor = 'bg-muted';
        textColor = 'text-muted-foreground';
    }
    
    return (
      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 mt-16">
        {/* Sidebar */}
        <div className="hidden lg:flex w-64 flex-col fixed inset-y-0 pt-16">
          <div className="flex-1 flex flex-col min-h-0 border-r border-border bg-card">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <nav className="mt-5 flex-1 px-2 space-y-1">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      item.current
                        ? 'bg-secondary text-foreground'
                        : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                    }`}
                  >
                    <item.icon
                      className={`mr-3 flex-shrink-0 h-5 w-5 ${
                        item.current ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                      }`}
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>
            <div className="p-4">
              <Button 
                variant="outline" 
                className="w-full glass-button flex items-center justify-center"
              >
                <Settings className="h-4 w-4 mr-2" />
                Account Settings
              </Button>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <main className="flex-1 lg:pl-64 pt-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="sm:flex sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-2xl font-bold">Dashboard</h1>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Manage your Web3 projects and deployments
                  </p>
                </div>
                <div className="mt-4 sm:mt-0">
                  <Button className="primary-button">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    New Project
                  </Button>
                </div>
              </div>
              
              {/* Stats */}
              <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <div className="glass-panel rounded-xl overflow-hidden shadow-md p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 rounded-md bg-primary/10 p-3">
                      <Layers className="h-6 w-6 text-primary" aria-hidden="true" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-muted-foreground truncate">Total Projects</dt>
                        <dd>
                          <div className="text-lg font-medium">{userProjects.length}</div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="glass-panel rounded-xl overflow-hidden shadow-md p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 rounded-md bg-primary/10 p-3">
                      <Rocket className="h-6 w-6 text-primary" aria-hidden="true" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-muted-foreground truncate">Active Deployments</dt>
                        <dd>
                          <div className="text-lg font-medium">
                            {userProjects.filter(p => p.status === 'live').length}
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="glass-panel rounded-xl overflow-hidden shadow-md p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 rounded-md bg-primary/10 p-3">
                      <Globe className="h-6 w-6 text-primary" aria-hidden="true" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-muted-foreground truncate">Total Visitors</dt>
                        <dd>
                          <div className="text-lg font-medium">
                            {userProjects.reduce((acc, p) => acc + p.visitors, 0).toLocaleString()}
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* New Project Form */}
              <div className="mt-8">
                <div className="glass-panel rounded-xl shadow-md p-6">
                  <h2 className="text-lg font-medium mb-4">Create New Project</h2>
                  <form onSubmit={handleCreateProject} className="space-y-4">
                    <div>
                      <Input 
                        type="text" 
                        placeholder="Project name" 
                        value={newProjectName}
                        onChange={(e) => setNewProjectName(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <Button 
                        type="submit" 
                        className="primary-button"
                        disabled={isCreatingProject}
                      >
                        {isCreatingProject ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creating...
                          </>
                        ) : (
                          <>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Create Project
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
              
              {/* Projects List */}
              <div className="mt-8">
                <h2 className="text-lg font-medium mb-4">Your Projects</h2>
                <div className="overflow-hidden shadow rounded-xl border border-border/50">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-border">
                      <thead className="bg-card">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Project
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Status
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Type
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Last Updated
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Visitors
                          </th>
                          <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Edit</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-card divide-y divide-border">
                        {userProjects.map((project) => (
                          <tr key={project.id} className="hover:bg-secondary/50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium">{project.name}</div>
                              {project.url && (
                                <div className="text-xs text-muted-foreground">{project.url}</div>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <StatusBadge status={project.status} />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {project.type}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                              {project.lastUpdated}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {project.visitors.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <Button variant="ghost" size="sm">
                                Edit
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
