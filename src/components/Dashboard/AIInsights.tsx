import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, TrendingUp, AlertCircle, Lightbulb } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const insights = [
  {
    type: "trend",
    title: "Contribution Growth",
    description: "Your group's contributions increased by 23% this month. Great momentum!",
    icon: TrendingUp,
    variant: "success" as const,
  },
  {
    type: "prediction",
    title: "Loan Eligibility",
    description: "3 members are now eligible for larger loans based on their contribution history.",
    icon: Sparkles,
    variant: "default" as const,
  },
  {
    type: "alert",
    title: "Payment Reminder",
    description: "5 members have pending contributions due this week.",
    icon: AlertCircle,
    variant: "warning" as const,
  },
  {
    type: "suggestion",
    title: "Fund Optimization",
    description: "Consider allocating 30% of idle funds to generate additional group income.",
    icon: Lightbulb,
    variant: "default" as const,
  },
];

export function AIInsights() {
  return (
    <Card className="border-border/50 shadow-soft overflow-hidden bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 hover:shadow-card transition-all duration-300">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-border/30">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <CardTitle className="text-lg font-bold">AI Insights</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {insights.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <div 
                key={index} 
                className="p-4 rounded-lg border border-border/30 hover:border-primary/50 hover:bg-card/50 transition-all duration-200 backdrop-blur-sm"
              >
                <div className="flex gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform hover:scale-110 ${
                    insight.variant === "success" ? "bg-success/20 text-success" :
                    insight.variant === "warning" ? "bg-warning/20 text-warning" :
                    "bg-primary/20 text-primary"
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="font-semibold text-sm text-foreground">{insight.title}</h4>
                      <Badge variant={insight.variant === "warning" ? "outline" : "secondary"} className="text-xs">
                        {insight.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{insight.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
