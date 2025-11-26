import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import { KPICard } from "@/components/Dashboard/KPICard";
import { QuickActions } from "@/components/Dashboard/QuickActions";
import { AIInsights } from "@/components/Dashboard/AIInsights";
import { RecentActivity } from "@/components/Dashboard/RecentActivity";
import { GrowthChart } from "@/components/Dashboard/GrowthChart";
import { Wallet, TrendingUp, DollarSign, Users } from "lucide-react";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-subtle">
        <div className="p-6 md:p-8 space-y-8">
          {/* Header */}
          <div className="pt-4">
            <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">Welcome back, Sarah! 👋</h1>
            <p className="text-lg text-muted-foreground">Here's what's happening with your chama today.</p>
          </div>

        {/* Quick Actions */}
        <QuickActions />

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard
            title="Total Balance"
            value="KES 110,000"
            icon={Wallet}
            trend={{ value: "12.5%", isPositive: true }}
            variant="default"
          />
          <KPICard
            title="Total Contributions"
            value="KES 75,000"
            icon={TrendingUp}
            trend={{ value: "8.2%", isPositive: true }}
            variant="success"
          />
          <KPICard
            title="Active Loans"
            value="KES 30,000"
            icon={DollarSign}
            trend={{ value: "3.1%", isPositive: false }}
            variant="warning"
          />
          <KPICard
            title="Active Members"
            value="24"
            icon={Users}
            trend={{ value: "2 new", isPositive: true }}
            variant="default"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <GrowthChart />
          </div>
          <div>
            <RecentActivity />
          </div>
        </div>

          {/* AI Insights */}
          <AIInsights />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
