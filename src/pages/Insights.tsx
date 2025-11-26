import React, { useState } from "react";
import { KPICard } from "@/components/Dashboard/KPICard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AIInsights as AIInsightsCard } from "@/components/Dashboard/AIInsights";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from "recharts";
import { toast } from "@/hooks/use-toast";
import { MessageCircle, AlertTriangle, Activity } from "lucide-react";

const projectedActual = [
  { month: "Jun", actual: 25000, projected: 24000 },
  { month: "Jul", actual: 28000, projected: 27000 },
  { month: "Aug", actual: 32000, projected: 31000 },
  { month: "Sep", actual: 36000, projected: 35000 },
  { month: "Oct", actual: 42000, projected: 40000 },
  { month: "Nov", actual: 50000, projected: 48000 },
];

const predictedContributions = [
  { month: "Dec", value: 52000 },
  { month: "Jan", value: 54000 },
  { month: "Feb", value: 56000 },
  { month: "Mar", value: 58000 },
];

export default function Insights() {
  const [openChat, setOpenChat] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="p-6 md:p-8 space-y-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold">AI Insights</h1>
            <p className="text-sm text-muted-foreground">Smart, actionable predictions for your chama</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" onClick={() => toast({ title: "Export", description: "Exporting AI report..." })}>Download Report</Button>
            <Button onClick={() => setOpenChat((s) => !s)}><MessageCircle className="w-4 h-4" /> AI Chat</Button>
          </div>
        </div>

        {/* Overview cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">Risk Level (This Month)</h3>
                  <div className="text-2xl font-bold text-destructive">High</div>
                </div>
                <div className="text-right">
                  <Badge>Confidence 78%</Badge>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Based on loan repayments and contribution delays</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">Projected Balance (30d)</h3>
                  <div className="text-2xl font-bold text-primary">KES 420,000</div>
                </div>
                <div className="text-right">
                  <Badge>Confidence 92%</Badge>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Estimate uses contribution patterns and scheduled loans</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">Member Stability Score</h3>
                  <div className="text-2xl font-bold text-success">78</div>
                </div>
                <div className="text-right">
                  <Badge>Confidence 85%</Badge>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Aggregate health score of member participation</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">AI Warnings</h3>
                  <div className="text-2xl font-bold text-warning">3 Likely Late</div>
                </div>
                <div className="text-right">
                  <Badge variant="destructive">Action Recommended</Badge>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Members likely to miss payments this week</p>
            </CardContent>
          </Card>
        </div>

        {/* Predictions & forecasts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Projected vs Actual Balance</CardTitle>
              </CardHeader>
              <CardContent style={{ height: 280 }}>
                <ResponsiveContainer width="100%" height={260}>
                  <LineChart data={projectedActual}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="actual" stroke="hsl(var(--primary))" />
                    <Line type="monotone" dataKey="projected" stroke="hsl(var(--secondary))" strokeDasharray="4 4" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Predicted Monthly Contributions</CardTitle>
              </CardHeader>
              <CardContent style={{ height: 200 }}>
                <ResponsiveContainer width="100%" height={160}>
                  <BarChart data={predictedContributions}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <AIInsightsCard />
          </div>
        </div>

        {/* Behavioral insights & anomaly detection */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Behavioral Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="p-3 rounded border border-border/30">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold">John has paid late 3 times</h4>
                        <p className="text-sm text-muted-foreground">Recommend sending early reminders to John for the next cycle.</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button size="sm" variant="outline" onClick={() => toast({ title: "Reminder queued", description: "Reminder will be sent to John." })}>Send Reminder</Button>
                      </div>
                    </div>
                  </li>

                  <li className="p-3 rounded border border-border/30">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold">Mary consistently contributes early</h4>
                        <p className="text-sm text-muted-foreground">Consider recognizing Mary in the next meeting to encourage others.</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button size="sm" onClick={() => toast({ title: "Kudos sent", description: "Recognition note prepared." })}>Send Kudos</Button>
                      </div>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Anomaly Detection</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 border border-border/30 rounded">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-warning" />
                      <div>
                        <div className="font-medium">Sudden decrease in contributions</div>
                        <div className="text-xs text-muted-foreground">Observed a 20% drop vs last month</div>
                      </div>
                    </div>
                    <Badge variant="destructive">Critical</Badge>
                  </div>

                  <div className="flex items-center justify-between p-2 border border-border/30 rounded">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-primary" />
                      <div>
                        <div className="font-medium">Member inactivity detected</div>
                        <div className="text-xs text-muted-foreground">2 members stopped contributing</div>
                      </div>
                    </div>
                    <Badge>Info</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Recommended Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Send loan reminders</div>
                      <div className="text-xs text-muted-foreground">3 members likely to default</div>
                    </div>
                    <Button onClick={() => toast({ title: "Reminders scheduled", description: "Reminders will be sent." })}>Send</Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Approve Mary for loan</div>
                      <div className="text-xs text-muted-foreground">High repayment score (95%)</div>
                    </div>
                    <Button variant="secondary" onClick={() => toast({ title: "Approved", description: "Mary's loan approved (demo)." })}>Approve</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* AI Chat assistant */}
        {openChat && (
          <div className="fixed bottom-6 right-6 w-96 z-50">
            <Card>
              <CardHeader className="flex items-center justify-between">
                <CardTitle>AI Chat</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setOpenChat(false)}>Close</Button>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Ask the AI anything about your chama's finances (demo).</p>
                <div className="mt-3 flex gap-2">
                  <Button size="sm" onClick={() => toast({ title: "Answer", description: "Top contributors: Mary, John" })}>Who owes the most?</Button>
                  <Button size="sm" onClick={() => toast({ title: "Answer", description: "Predicted balance: KES 42,000" })}>Predicted balance next week</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
