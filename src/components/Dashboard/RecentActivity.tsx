import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, XCircle } from "lucide-react";

const activities = [
  {
    id: 1,
    member: "John Kamau",
    action: "Contribution",
    amount: "KES 5,000",
    status: "completed",
    time: "2 hours ago",
  },
  {
    id: 2,
    member: "Mary Wanjiku",
    action: "Loan Request",
    amount: "KES 50,000",
    status: "pending",
    time: "5 hours ago",
  },
  {
    id: 3,
    member: "Peter Omondi",
    action: "Loan Repayment",
    amount: "KES 10,000",
    status: "completed",
    time: "1 day ago",
  },
  {
    id: 4,
    member: "Grace Achieng",
    action: "Contribution",
    amount: "KES 3,000",
    status: "pending",
    time: "1 day ago",
  },
];

export function RecentActivity() {
  // Map status -> icon shape (completed/pending/failed) and
  // map action -> color palette that matches the GrowthChart lines.
  const statusClasses: Record<string, { iconOnly?: boolean }> = {
    completed: { iconOnly: true },
    pending: { iconOnly: true },
    failed: { iconOnly: true },
  };

  const actionColor: Record<string, { bg: string; icon: string }> = {
    // GrowthChart uses: balance (primary), contributions (secondary), loans (accent)
    contribution: { bg: "bg-secondary/15", icon: "text-secondary" },
    loan: { bg: "bg-accent/15", icon: "text-accent" },
    default: { bg: "bg-primary/15", icon: "text-primary" },
  };

  return (
    <Card className="border-border/50 shadow-soft h-full">
      <CardHeader className="bg-gradient-to-r from-card to-card/50 border-b border-border/30">
        <CardTitle className="text-lg font-bold">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-3">
          {activities.map((activity) => (
            <div 
              key={activity.id}
              className="flex items-center justify-between p-3 rounded-lg border border-border/30 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                {
                  // choose color based on action (contribution/loan/etc.) so
                  // icons match the GrowthChart line colors. Keep the icon
                  // shape based on status.
                }
                {(() => {
                  const actionKey = activity.action.toLowerCase().includes("loan")
                    ? "loan"
                    : activity.action.toLowerCase().includes("contribution")
                    ? "contribution"
                    : "default";
                  const color = actionColor[actionKey] ?? actionColor.default;

                  return (
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${color.bg}`}>
                      {activity.status === "completed" && (
                        <CheckCircle className={`w-5 h-5 ${color.icon}`} aria-hidden />
                      )}
                      {activity.status === "pending" && (
                        <Clock className={`w-5 h-5 ${color.icon}`} aria-hidden />
                      )}
                      {activity.status === "failed" && (
                        <XCircle className={`w-5 h-5 ${color.icon}`} aria-hidden />
                      )}
                    </div>
                  );
                })()}
                <div>
                  <p className="font-medium text-sm text-foreground">{activity.member}</p>
                  <p className="text-xs text-muted-foreground">{activity.action}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-sm text-foreground">{activity.amount}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
