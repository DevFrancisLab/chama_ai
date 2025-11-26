import { 
  LayoutDashboard, 
  Users, 
  Wallet, 
  TrendingUp, 
  Bell, 
  FileText,
  DollarSign,
  Sparkles,
  LogOut
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";

const menuItems = [
  // Overview should point to the dashboard route so the sidebar's active
  // state matches the main Dashboard content.
  { title: "Overview", url: "/dashboard", icon: LayoutDashboard },
  { title: "Contributions", url: "/contributions", icon: Wallet },
  { title: "Loans", url: "/loans", icon: DollarSign },
  { title: "Members", url: "/members", icon: Users },
  { title: "AI Insights", url: "/insights", icon: Sparkles },
  { title: "Profit Sharing", url: "/profit-sharing", icon: TrendingUp },
  { title: "Reports", url: "/reports", icon: FileText },
  { title: "Notifications", url: "/notifications", icon: Bell },
];

export function DashboardSidebar() {
  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarHeader className="p-6 border-b border-sidebar-border bg-gradient-to-b from-card to-card/50">
        <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <img
            src="/chama_ai_logo.png"
            alt="Chama AI logo"
            className="w-10 h-10 rounded-lg object-contain"
          />
          <div>
            <h2 className="text-lg font-bold text-sidebar-foreground">Chama AI</h2>
            <p className="text-xs text-sidebar-foreground/60">Group Banking</p>
          </div>
        </a>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/60 px-3">
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end
                      className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sidebar-foreground hover:bg-sidebar-accent"
                      activeClassName="bg-sidebar-primary text-sidebar-primary-foreground font-medium"
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4 border-t border-sidebar-border bg-gradient-to-t from-card to-card/50">
        <a href="/">
          <Button 
            variant="outline" 
            className="w-full flex items-center gap-2 border-destructive/30 text-destructive hover:bg-destructive/10 hover:border-destructive/50"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </Button>
        </a>
      </SidebarFooter>
    </Sidebar>
  );
}
