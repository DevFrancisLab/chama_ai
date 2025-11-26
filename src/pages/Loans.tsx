import React, { useMemo, useState } from "react";
import { KPICard } from "@/components/Dashboard/KPICard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { toast } from "@/hooks/use-toast";
import { Plus, Download, DollarSign, Bell } from "lucide-react";

interface Loan {
  id: number;
  borrower: string;
  amount: number;
  issued: string; // ISO date
  due: string; // ISO date
  balance: number;
  progress: number; // 0-100
  status: "active" | "completed" | "overdue" | string;
}

const sampleLoans: Loan[] = [
  { id: 1, borrower: "John Kamau", amount: 50000, issued: "2025-06-01", due: "2026-06-01", balance: 20000, progress: 60, status: "active" },
  { id: 2, borrower: "Mary Wanjiku", amount: 30000, issued: "2025-01-15", due: "2025-12-15", balance: 0, progress: 100, status: "completed" },
  { id: 3, borrower: "Peter Omondi", amount: 20000, issued: "2025-08-01", due: "2025-11-15", balance: 15000, progress: 25, status: "overdue" },
  { id: 4, borrower: "Grace Achieng", amount: 40000, issued: "2025-09-01", due: "2026-03-01", balance: 32000, progress: 20, status: "active" },
];

const monthlyRepayments = [
  { month: "Jun", value: 10000 },
  { month: "Jul", value: 12000 },
  { month: "Aug", value: 15000 },
  { month: "Sep", value: 18000 },
  { month: "Oct", value: 20000 },
  { month: "Nov", value: 22000 },
];

export default function Loans() {
  const [rows, setRows] = useState<Loan[]>(sampleLoans);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string | "all">("all");
  const [sortKey, setSortKey] = useState<keyof Loan | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [activeLoan, setActiveLoan] = useState<Loan | null>(null);

  const totals = useMemo(() => {
    const totalIssued = rows.reduce((s, r) => s + r.amount, 0);
    const activeAmount = rows.filter((r) => r.status === "active").reduce((s, r) => s + r.balance, 0);
    const repaid = rows.filter((r) => r.status === "completed").reduce((s, r) => s + r.amount, 0);
    const overdue = rows.filter((r) => r.status === "overdue").reduce((s, r) => s + r.balance, 0);
    return { totalIssued, activeAmount, repaid, overdue };
  }, [rows]);

  const filtered = useMemo(() => {
    let out = rows.filter((r) => r.borrower.toLowerCase().includes(search.toLowerCase()));
    if (filter !== "all") out = out.filter((r) => r.status === filter);
    if (sortKey) {
      out = out.slice().sort((a, b) => {
        const av = a[sortKey];
        const bv = b[sortKey];
        const aVal = typeof av === "string" ? av.toLowerCase() : typeof av === "number" ? av : String(av).toLowerCase();
        const bVal = typeof bv === "string" ? bv.toLowerCase() : typeof bv === "number" ? bv : String(bv).toLowerCase();
        if (aVal === bVal) return 0;
        if (sortDir === "asc") return aVal > bVal ? 1 : -1;
        return aVal > bVal ? -1 : 1;
      });
    }
    return out;
  }, [rows, search, filter, sortKey, sortDir]);

  function toggleSort(key: keyof Loan) {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  function recordPayment(id: number) {
    // sample behavior: reduce balance by fixed amount for demo
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, balance: Math.max(0, r.balance - Math.round(r.amount * 0.1)), progress: Math.min(100, r.progress + 10), status: r.balance - Math.round(r.amount * 0.1) <= 0 ? "completed" : r.status } : r)));
    toast({ title: "Payment recorded", description: "Recorded a sample repayment." });
  }

  function sendReminder(borrower: string) {
    toast({ title: "Reminder sent", description: `Reminder sent to ${borrower}` });
  }

  const pieData = rows.map((r) => ({ name: r.borrower, value: r.amount }));

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="p-6 md:p-8 space-y-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold">Loans</h1>
            <p className="text-sm text-muted-foreground">Manage and review loan portfolio</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" onClick={() => toast({ title: "Download", description: "Preparing loan report..." })}>
              <Download className="w-4 h-4" />
              Download Report
            </Button>
            <Button variant="ghost" size="sm" onClick={() => toast({ title: "Reminders", description: "Bulk reminders queued" })}>
              <Bell className="w-4 h-4" />
              Send Bulk Reminders
            </Button>
            <Button onClick={() => toast({ title: "Issue Loan", description: "Open issue loan modal (not implemented)" })}>
              <Plus className="w-4 h-4" />
              Issue New Loan
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard title="Total Loans Issued (All Time)" value={`KES ${totals.totalIssued.toLocaleString()}`} icon={DollarSign} trend={{ value: "+12%", isPositive: true }} />
          <KPICard title="Active Loans (Outstanding)" value={`KES ${totals.activeAmount.toLocaleString()}`} icon={DollarSign} trend={{ value: "-3%", isPositive: false }} variant="warning" />
          <KPICard title="Repaid Loans (All Time)" value={`KES ${totals.repaid.toLocaleString()}`} icon={DollarSign} trend={{ value: "+6%", isPositive: true }} variant="success" />
          <KPICard title="Overdue Loans" value={`KES ${totals.overdue.toLocaleString()}`} icon={DollarSign} trend={{ value: "-8%", isPositive: false }} variant="warning" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex items-center justify-between p-4">
                <CardTitle>Active Loans</CardTitle>
                <div className="flex items-center gap-2">
                  <Input placeholder="Search borrower..." value={search} onChange={(e) => setSearch(e.target.value)} />
                  <select className="input h-10" value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="all">All</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="overdue">Overdue</option>
                  </select>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead onClick={() => toggleSort("borrower")} className="cursor-pointer">Borrower</TableHead>
                      <TableHead onClick={() => toggleSort("amount")} className="cursor-pointer">Loan Amount</TableHead>
                      <TableHead onClick={() => toggleSort("issued")} className="cursor-pointer">Issued Date</TableHead>
                      <TableHead onClick={() => toggleSort("due")} className="cursor-pointer">Due Date</TableHead>
                      <TableHead>Remaining Balance</TableHead>
                      <TableHead>Repayment Progress</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map((r) => (
                      <TableRow key={r.id}>
                        <TableCell>{r.borrower}</TableCell>
                        <TableCell>KES {r.amount.toLocaleString()}</TableCell>
                        <TableCell>{r.issued}</TableCell>
                        <TableCell>{r.due}</TableCell>
                        <TableCell>{r.balance ? `KES ${r.balance.toLocaleString()}` : "—"}</TableCell>
                        <TableCell>
                          <div className="w-40 bg-muted/30 rounded-full overflow-hidden h-2">
                            <div style={{ width: `${r.progress}%` }} className={`h-2 ${r.status === "overdue" ? "bg-destructive" : r.progress >= 60 ? "bg-success" : "bg-warning"}`} />
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">{r.progress}%</div>
                        </TableCell>
                        <TableCell>
                          {r.status === "active" && <span className="text-primary">Active</span>}
                          {r.status === "completed" && <span className="text-success">Completed</span>}
                          {r.status === "overdue" && <span className="text-destructive">Overdue</span>}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline" onClick={() => { recordPayment(r.id); }}>Record Payment</Button>
                            <Button size="sm" variant="ghost" onClick={() => sendReminder(r.borrower)}>Send Reminder</Button>
                            <Button size="sm" variant="link" onClick={() => setActiveLoan(r)}>View Details</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Monthly Repayments</CardTitle>
              </CardHeader>
              <CardContent style={{ height: 200 }}>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={monthlyRepayments}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Interest vs Principal</CardTitle>
              </CardHeader>
              <CardContent style={{ height: 200 }}>
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart>
                    <Pie data={[{ name: "Principal", value: 70 }, { name: "Interest", value: 30 }]} dataKey="value" nameKey="name" outerRadius={60} innerRadius={30}>
                      <Cell fill="#82ca9d" />
                      <Cell fill="#8884d8" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {rows.filter((r) => r.status === "active" || r.status === "overdue").slice(0, 4).map((r) => (
                    <li key={r.id} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{r.borrower}</div>
                        <div className="text-xs text-muted-foreground">Due: {r.due}</div>
                      </div>
                      <div className={`text-sm ${r.status === "overdue" ? "text-destructive" : "text-warning"}`}>KES {r.balance.toLocaleString()}</div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Loan details drawer / modal (simple right-side panel for demo) */}
        {activeLoan && (
          <div className="fixed right-6 top-16 w-96 z-50">
            <Card>
              <CardHeader className="flex items-center justify-between">
                <CardTitle>Loan Details</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setActiveLoan(null)}>Close</Button>
              </CardHeader>
              <CardContent>
                <p className="font-medium">Borrower: {activeLoan.borrower}</p>
                <p className="text-sm">Amount: KES {activeLoan.amount.toLocaleString()}</p>
                <p className="text-sm">Issued: {activeLoan.issued}</p>
                <p className="text-sm">Due: {activeLoan.due}</p>
                <p className="text-sm">Balance: KES {activeLoan.balance.toLocaleString()}</p>
                <p className="text-sm">Progress: {activeLoan.progress}%</p>
                <div className="mt-4">
                  <Button onClick={() => toast({ title: "View history", description: "Open repayment history (not implemented)" })}>View Repayment History</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
