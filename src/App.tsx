import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Templates from "./pages/Templates";
import TemplateDetail from "./pages/TemplateDetail";
import Dashboard from "./pages/Dashboard";
import Tokenomics from "./pages/Tokenomics";
import Resources from "./pages/Resources";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Builder from "./pages/Builder";
import Pricing from "./pages/Pricing";
import SubscriptionManagement from "./pages/SubscriptionManagement";
import AnalyticsDashboard from './pages/Analytics';
import Help from './pages/Help';
import AdminPanel from './pages/Admin';

const queryClient = new QueryClient();

const routes = [
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/templates",
    element: <Templates />,
  },
  {
    path: "/templates/:id",
    element: <TemplateDetail />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/builder/:id",
    element: <Builder />,
  },
  {
    path: "/tokenomics",
    element: <Tokenomics />,
  },
  {
    path: "/resources",
    element: <Resources />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/pricing",
    element: <Pricing />,
  },
  {
    path: "/subscription",
    element: <SubscriptionManagement />,
  },
  {
    path: "/analytics",
    element: <AnalyticsDashboard />,
  },
  {
    path: "/help",
    element: <Help />,
  },
  {
    path: "/admin",
    element: <AdminPanel />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <div className="dark">
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {routes.map((route) => (
                <Route key={route.path} path={route.path} element={route.element} />
              ))}
            </Routes>
          </BrowserRouter>
        </div>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
