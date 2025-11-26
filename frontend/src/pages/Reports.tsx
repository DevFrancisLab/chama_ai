import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { toast } from "@/hooks/use-toast";

type DateRange = "today" | "this_month" | "custom";
type Category = "Contributions" | "Loans" | "Members" | "Profit Sharing" | "Expenses";

const sampleKPIs = {
  contributions: 312000,
  payouts: 155000,
  outstandingLoans: 72000,
  profit: 48500,
  newMembers: 24,
};

interface ReportTile {
  id: string;
  title: string;
  desc: string;
  category: string;
}

const reportTiles: ReportTile[] = [
  { id: "contrib", title: "Contributions report", desc: "Overview of member contributions", category: "Financial Reports" },
  { id: "withdrawals", title: "Withdrawals report", desc: "Withdrawals & payouts", category: "Financial Reports" },
  { id: "cashflow", title: "Cash flow report", desc: "Inflow and outflow over time", category: "Financial Reports" },
  { id: "members_list", title: "Member list report", desc: "All member profiles & stats", category: "Member Reports" },
  { id: "active_loans", title: "Active loans", desc: "Currently active loans", category: "Loans Reports" },
  { id: "cycles", title: "Cycle distribution summary", desc: "Profit sharing cycles", category: "Profit Sharing Reports" },
  { id: "audit_logs", title: "System logs", desc: "Compliance and audit trails", category: "Compliance / Audit Reports" },
];

const recentReports = [
  { id: 1, name: "Loan Summary — Feb 2025", date: "2025-02-18", format: "PDF", by: "Admin", url: "#" },
  { id: 2, name: "Top Contributors — Jun 2025", date: "2025-06-03", format: "CSV", by: "Finance", url: "#" },
  { id: 3, name: "Profit Distribution — Q2 2025", date: "2025-07-12", format: "PDF", by: "Admin", url: "#" },
];

const contributionsOverTime = [
  { period: "Jan", value: 50000 },
  { period: "Feb", value: 62000 },
  { period: "Mar", value: 72000 },
  { period: "Apr", value: 81000 },
  { period: "May", value: 90000 },
  { period: "Jun", value: 110000 },
];

const loansIssuedRepaid = [
  { period: "Jan", issued: 30000, repaid: 20000 },
  { period: "Feb", issued: 45000, repaid: 25000 },
  { period: "Mar", issued: 38000, repaid: 30000 },
  { period: "Apr", issued: 52000, repaid: 40000 },
  { period: "May", issued: 61000, repaid: 45000 },
  { period: "Jun", issued: 72000, repaid: 60000 },
];

const profitDist = [
  { name: "Members", value: 65 },
  { name: "Investors", value: 28 },
  { name: "Platform", value: 7 },
];

export default function Reports() {
  const [dateRange, setDateRange] = useState<DateRange>("this_month");
  const [category, setCategory] = useState<Category | "All">("Contributions");
  const [format, setFormat] = useState<string>("PDF");
  const [roleFilterAdminOnly, setRoleFilterAdminOnly] = useState(false);
  const [query, setQuery] = useState("");
  const [previewReport, setPreviewReport] = useState<ReportTile | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const isAdmin = true; // demo; replace with auth check

  const filteredTiles = useMemo(() => {
    return reportTiles.filter((t) => (category === "All" ? true : t.category.includes(category as string)) && t.title.toLowerCase().includes(query.toLowerCase()));
  }, [category, query]);

  function generateReport(tileId: string) {
    toast({ title: "Report generation", description: `Generating ${tileId}... (demo)` });
  }

  function openPreview(tile: ReportTile) {
    setPreviewReport(tile);
    setShowPreview(true);
  }

  function scheduleReport() {
    toast({ title: "Schedule", description: "Report scheduled (demo)" });
  }

  return (
    <div className="min-h-screen p-6 md:p-8">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Reports</h1>
          <p className="text-sm text-muted-foreground">Generate, preview and schedule reports across the platform.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => toast({ title: "Export", description: "Preparing bulk export..." })}>Export all</Button>
          <Button onClick={() => toast({ title: "Print", description: "Invoking print..." })}>Print</Button>
        </div>
      </div>

      {/* Filters top bar */}
      <Card className="mb-6">
        <CardContent>
          <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <Select onValueChange={(v) => setDateRange(v as DateRange)} value={dateRange}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="this_month">This Month</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>

              <Select onValueChange={(v) => setCategory(v as Category | "All")} value={category as string}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="Contributions">Contributions</SelectItem>
                  <SelectItem value="Loans">Loans</SelectItem>
                  <SelectItem value="Members">Members</SelectItem>
                  <SelectItem value="Profit Sharing">Profit Sharing</SelectItem>
                  <SelectItem value="Expenses">Expenses</SelectItem>
                </SelectContent>
              </Select>

              <Select onValueChange={(v) => setFormat(v)} value={format}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PDF">PDF</SelectItem>
                  <SelectItem value="CSV">CSV</SelectItem>
                  <SelectItem value="Excel">Excel</SelectItem>
                </SelectContent>
              </Select>

              {isAdmin && (
                <div className="flex items-center gap-2 ml-3">
                  <Switch checked={roleFilterAdminOnly} onCheckedChange={() => setRoleFilterAdminOnly((s) => !s)} />
                  <span className="text-sm">Admin-only filters</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Input placeholder="Search reports or titles..." value={query} onChange={(e) => setQuery(e.target.value)} />
              <Button onClick={() => toast({ title: "Apply", description: "Filters applied (demo)" })}>Apply</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardContent>
            <div className="text-sm text-muted-foreground">Total Contributions</div>
            <div className="text-2xl font-bold">KSh {sampleKPIs.contributions.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="text-sm text-muted-foreground">Total Payouts</div>
            <div className="text-2xl font-bold">KSh {sampleKPIs.payouts.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="text-sm text-muted-foreground">Outstanding Loans</div>
            <div className="text-2xl font-bold">KSh {sampleKPIs.outstandingLoans.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="text-sm text-muted-foreground">Profit Earned</div>
            <div className="text-2xl font-bold">KSh {sampleKPIs.profit.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="text-sm text-muted-foreground">New Members</div>
            <div className="text-2xl font-bold">{sampleKPIs.newMembers}</div>
          </CardContent>
        </Card>
      </div>

      {/* Reports library grid */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Reports Library</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTiles.map((tile) => (
              <div key={tile.id} className="p-4 border rounded-md">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium">{tile.title}</div>
                    <div className="text-sm text-muted-foreground">{tile.desc}</div>
                    <div className="text-xs text-muted-foreground mt-2">Category: {tile.category}</div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button size="sm" onClick={() => generateReport(tile.id)}>Generate</Button>
                    <Button variant="ghost" size="sm" onClick={() => openPreview(tile)}>Preview</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Dynamic charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Contributions Over Time</CardTitle>
          </CardHeader>
          <CardContent style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={contributionsOverTime}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#4f46e5" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Loans Issued vs Repaid</CardTitle>
          </CardHeader>
          <CardContent style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={loansIssuedRepaid}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="issued" fill="#06b6d4" />
                <Bar dataKey="repaid" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Profit Distribution</CardTitle>
          </CardHeader>
          <CardContent style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={profitDist} dataKey="value" nameKey="name" outerRadius={70} innerRadius={36}>
                  {profitDist.map((entry, i) => (
                    <Cell key={i} fill={["#82ca9d", "#8884d8", "#ffc658"][i % 3]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent reports table + export controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Format</TableHead>
                  <TableHead>Generated by</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentReports.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell>{r.name}</TableCell>
                    <TableCell>{r.date}</TableCell>
                    <TableCell>{r.format}</TableCell>
                    <TableCell>{r.by}</TableCell>
                    <TableCell>
                      <div className="flex gap-2 justify-end">
                        <Button variant="ghost" size="sm" onClick={() => toast({ title: "Download", description: `${r.name} download (demo)` })}>Download</Button>
                        <Button variant="outline" size="sm" onClick={() => toast({ title: "Share", description: "Sharing report (demo)" })}>Share</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Scheduled reports */}
        <Card>
          <CardHeader>
            <CardTitle>Scheduled Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Monthly Top Contributors</div>
                  <div className="text-xs text-muted-foreground">Every 1st of month • PDF • sent to finance@org</div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={true} onCheckedChange={() => toast({ title: "Toggle", description: "Toggled schedule (demo)" })} />
                  <Button variant="ghost" size="sm" onClick={() => toast({ title: "Edit", description: "Edit schedule (demo)" })}>Edit</Button>
                </div>
              </div>
              {isAdmin && (
                <div>
                  <Button onClick={scheduleReport}>Create new schedule</Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI-Assisted Report Generator */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>AI-Assisted Report Generator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <textarea className="col-span-2 p-2 border rounded" rows={4} placeholder='Type: "Generate a report of contributions by top members for the last 6 months"' />
            <div className="flex flex-col gap-2">
              <Button onClick={() => toast({ title: "AI", description: "Generating preview... (demo)" })}>Generate Preview</Button>
              <Button variant="outline" onClick={() => toast({ title: "AI", description: "Open chat (demo)" })}>Open Chat</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report preview modal (simple) */}
      {showPreview && previewReport && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowPreview(false)} />
          <div className="relative w-full max-w-4xl p-6">
            <Card>
              <CardHeader>
                <CardTitle>Preview — {previewReport.title || previewReport.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground">This is a preview of the report. Use filters on the left to refine and click export to download as PDF/CSV.</p>
                </div>
                <div style={{ height: 260 }} className="mb-4">
                  <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={contributionsOverTime}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="period" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="#4f46e5" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowPreview(false)}>Close</Button>
                  <Button onClick={() => toast({ title: "Export", description: "Exporting preview as PDF (demo)" })}>Generate PDF</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
