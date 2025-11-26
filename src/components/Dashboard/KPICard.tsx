import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  variant?: "default" | "success" | "warning";
}

export function KPICard({ title, value, icon: Icon, trend, variant = "default" }: KPICardProps) {
  const variantStyles = {
    default: "bg-primary/10 text-primary",
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
  };

  return (
    <Card className="border-border/50 shadow-soft hover:shadow-card transition-all duration-300 overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center transition-transform hover:scale-110", variantStyles[variant])}>
            <Icon className="w-6 h-6" />
          </div>
          {trend && (
            <div className={cn(
              "px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1",
              trend.isPositive ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"
            )}>
              <span>{trend.isPositive ? "↑" : "↓"}</span>
              {trend.value}
            </div>
          )}
        </div>
        <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">{title}</p>
        <p className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">{value}</p>
      </CardContent>
    </Card>
  );
}
