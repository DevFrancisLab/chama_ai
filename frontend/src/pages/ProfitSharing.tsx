import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { toast } from "@/hooks/use-toast";

interface MemberProfit {
  id: number;
  name: string;
  contribution: number;
  profitPct: number;
  earned: number;
  status: "Paid" | "Pending";
}

const totalProfit = 1254000; // sample

const distribution = {
  members: 820000,
  investors: 350000,
  platform: 84000,
};

const timeline = [
  { cycle: "Jan–Mar 2025", distributed: 800000, date: "2025-04-10" },
  { cycle: "Apr–Jun 2025", distributed: 920000, date: "2025-07-12" },
  { cycle: "Jul–Sep 2025", distributed: 1100000, date: "2025-10-08" },
];

const members: MemberProfit[] = [
  { id: 1, name: "Faith K.", contribution: 25000, profitPct: 4.2, earned: 6200, status: "Paid" },
  { id: 2, name: "John Kamau", contribution: 50000, profitPct: 8.4, earned: 12600, status: "Pending" },
  { id: 3, name: "Mary W.", contribution: 75000, profitPct: 12.6, earned: 18900, status: "Paid" },
  { id: 4, name: "Peter O.", contribution: 15000, profitPct: 2.5, earned: 3750, status: "Pending" },
];

const shareData = [
  { name: "Members", value: distribution.members },
  { name: "Investors", value: distribution.investors },
  { name: "Platform", value: distribution.platform },
];

const profitGrowth = [
  { period: "Q1 2024", value: 600000 },
  { period: "Q2 2024", value: 700000 },
  { period: "Q3 2024", value: 820000 },
  { period: "Q4 2024", value: 900000 },
  { period: "Q1 2025", value: 1050000 },
  { period: "Q2 2025", value: 1254000 },
];

export default function ProfitSharing() {
  const [showModal, setShowModal] = useState(false);

  const sharePct = useMemo(() => {
    const total = distribution.members + distribution.investors + distribution.platform;
    return shareData.map((s) => ({ ...s, pct: Math.round((s.value / total) * 10000) / 100 }));
  }, []);

  function onDistribute() {
    setShowModal(true);
  }

  function confirmDistribute() {
    setShowModal(false);
    toast({ title: "Distribution started", description: "Profit distribution initiated (demo)." });
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="p-6 md:p-8 space-y-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold">Profit Sharing</h1>
            <p className="text-sm text-muted-foreground">Overview of profit pool and distribution</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" onClick={() => toast({ title: "Export", description: "Preparing profit report..." })}>Download Report</Button>
            <Button onClick={onDistribute} className="bg-success text-white">Distribute Profit</Button>
          </div>
        </div>

        {/* Total Profit Pool */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Profit Pool</p>
                  <div className="text-4xl font-bold">KSh {totalProfit.toLocaleString()}</div>
                </div>
                <div className="text-right">
                  <p className="text-sm">Distribution cycle</p>
                  <p className="font-medium">Jul–Sep 2025</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Distribution Summary cards */}
          <Card>
            <CardHeader>
              <CardTitle>Distribution Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Members Share</div>
                    <div className="text-sm text-muted-foreground">KSh {distribution.members.toLocaleString()} (65%)</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Investors Share</div>
                    <div className="text-sm text-muted-foreground">KSh {distribution.investors.toLocaleString()} (28%)</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Platform/Admin</div>
                    <div className="text-sm text-muted-foreground">KSh {distribution.platform.toLocaleString()} (7%)</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Share Allocation Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Share Allocation</CardTitle>
            </CardHeader>
            <CardContent style={{ height: 220 }}>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={shareData} dataKey="value" nameKey="name" outerRadius={70} innerRadius={36}>
                    {shareData.map((entry, index) => (
                      <Cell key={index} fill={["#82ca9d", "#8884d8", "#ffc658"][index % 3]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Timeline + growth chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Profit Growth</CardTitle>
              </CardHeader>
              <CardContent style={{ height: 300 }}>
                <ResponsiveContainer width="100%" height={260}>
                  <LineChart data={profitGrowth}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Distribution Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {timeline.map((t, i) => (
                    <li key={i} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{t.cycle}</div>
                        <div className="text-xs text-muted-foreground">Distributed: KSh {t.distributed.toLocaleString()}</div>
                      </div>
                      <div className="text-sm text-muted-foreground">{t.date}</div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Calculation Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">AI suggests holding 10% for emergency reserve before distribution. (Demo suggestion)</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Individual member breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Member Profit Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member</TableHead>
                  <TableHead>Contribution</TableHead>
                  <TableHead>Profit %</TableHead>
                  <TableHead>Earned</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.map((m) => (
                  <TableRow key={m.id}>
                    <TableCell>{m.name}</TableCell>
                    <TableCell>KSh {m.contribution.toLocaleString()}</TableCell>
                    <TableCell>{m.profitPct}%</TableCell>
                    <TableCell>KSh {m.earned.toLocaleString()}</TableCell>
                    <TableCell>{m.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Distribute modal (simple) */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black/40" onClick={() => setShowModal(false)} />
            <div className="relative w-full max-w-md p-6">
              <Card>
                <CardHeader>
                  <CardTitle>Confirm Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">This will initiate profit distribution to members, investors and platform as shown. Confirm to proceed.</p>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
                    <Button onClick={confirmDistribute} className="bg-success text-white">Confirm & Distribute</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
