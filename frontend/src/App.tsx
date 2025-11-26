import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Contributions from "./pages/Contributions";
import Loans from "./pages/Loans";
import Members from "./pages/Members";
import Insights from "./pages/Insights";
import ProfitSharing from "./pages/ProfitSharing";
import Reports from "./pages/Reports";
import Notifications from "./pages/Notifications";
import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/contributions" element={<DashboardLayout><Contributions /></DashboardLayout>} />
          <Route path="/loans" element={<DashboardLayout><Loans /></DashboardLayout>} />
          <Route path="/members" element={<DashboardLayout><Members /></DashboardLayout>} />
          <Route path="/insights" element={<DashboardLayout><Insights /></DashboardLayout>} />
          <Route path="/reports" element={<DashboardLayout><Reports /></DashboardLayout>} />
          <Route path="/notifications" element={<DashboardLayout><Notifications /></DashboardLayout>} />
          <Route path="/profit-sharing" element={<DashboardLayout><ProfitSharing /></DashboardLayout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
