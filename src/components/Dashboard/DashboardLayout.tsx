import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "./DashboardSidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-subtle">
        <DashboardSidebar />
        <main className="flex-1 overflow-auto">
          {/* Mobile header with sidebar trigger (visible only on small screens) */}
          <div className="md:hidden p-3 border-b border-border bg-background/50">
            <div className="flex items-center">
              <SidebarTrigger />
              <div className="ml-3 text-lg font-semibold">Dashboard</div>
            </div>
          </div>
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
