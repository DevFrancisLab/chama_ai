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
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from "recharts";
import { toast } from "@/hooks/use-toast";
import { Wallet, Download, Bell, Plus } from "lucide-react";

interface Contribution {
  id: number;
  member: string;
  amount: number;
  cycle: string;
  status: "paid" | "pending" | "overdue" | string;
  datePaid: string | null;
  balance: number;
}

const sampleContributions: Contribution[] = [
  { id: 1, member: "John Kamau", amount: 5000, cycle: "Monthly", status: "paid", datePaid: "2025-11-01", balance: 0 },
  { id: 2, member: "Mary Wanjiku", amount: 50000, cycle: "Monthly", status: "pending", datePaid: null, balance: 50000 },
  { id: 3, member: "Peter Omondi", amount: 10000, cycle: "Weekly", status: "paid", datePaid: "2025-10-30", balance: 0 },
  { id: 4, member: "Grace Achieng", amount: 3000, cycle: "Monthly", status: "overdue", datePaid: null, balance: 3000 },
];

const contributionsOverTime = [
  { month: "Jun", value: 25000 },
  { month: "Jul", value: 28000 },
  { month: "Aug", value: 32000 },
  { month: "Sep", value: 36000 },
  { month: "Oct", value: 42000 },
  { month: "Nov", value: 50000 },
];

export default function Contributions() {
  const [rows, setRows] = useState<Contribution[]>(sampleContributions);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | "all">("all");
  const [sortKey, setSortKey] = useState<keyof Contribution | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const totals = useMemo(() => {
    const thisMonth = rows.filter((r) => r.datePaid && r.datePaid.startsWith("2025-11")).reduce((s, r) => s + r.amount, 0);
    const allTime = rows.reduce((s, r) => s + r.amount, 0);
    const pending = rows.filter((r) => r.status === "pending").length;
    const overdue = rows.filter((r) => r.status === "overdue").length;
    return { thisMonth, allTime, pending, overdue };
  }, [rows]);

  const filtered = useMemo(() => {
    let out = rows.filter((r) => r.member.toLowerCase().includes(search.toLowerCase()));
    if (statusFilter !== "all") out = out.filter((r) => r.status === statusFilter);
    if (sortKey) {
      out = out.slice().sort((a, b) => {
        const av = a[sortKey];
        const bv = b[sortKey];
        // normalize for comparison
  const aVal = typeof av === "string" ? av.toLowerCase() : typeof av === "number" ? av : av ? String(av).toLowerCase() : "";
  const bVal = typeof bv === "string" ? bv.toLowerCase() : typeof bv === "number" ? bv : bv ? String(bv).toLowerCase() : "";
        if (aVal === bVal) return 0;
        if (sortDir === "asc") return aVal > bVal ? 1 : -1;
        return aVal > bVal ? -1 : 1;
      });
    }
    return out;
  }, [rows, search, statusFilter, sortKey, sortDir]);

  function toggleSort(key: string) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  function markPaid(id: number) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status: "paid", datePaid: new Date().toISOString().slice(0, 10), balance: 0 } : r)));
    toast({ title: "Marked as paid", description: "Contribution marked as paid." });
  }

  function sendReminder(member: string) {
    toast({ title: `Reminder sent`, description: `Reminder sent to ${member}` });
  }

  const pieData = rows.reduce<Record<string, number>>((acc, r) => {
    acc[r.member] = (acc[r.member] || 0) + r.amount;
    return acc;
  }, {});

  const pieArray = Object.entries(pieData).map(([name, value]) => ({ name, value }));

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="p-6 md:p-8 space-y-8">
        <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Contributions</h1>
          <p className="text-sm text-muted-foreground">Overview and management of member contributions</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={() => toast({ title: "Download", description: "Preparing report..." })}>
            <Download className="w-4 h-4" />
            Download Report
          </Button>
          <Button variant="ghost" size="sm" onClick={() => toast({ title: "Reminders", description: "Reminders queued" })}>
            <Bell className="w-4 h-4" />
            Send Reminders
          </Button>
          <Button onClick={() => toast({ title: "Add", description: "Open add contribution modal (not implemented)" })}>
            <Plus className="w-4 h-4" />
            Add Contribution
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard title="Total Contributions (This Month)" value={`KES ${totals.thisMonth.toLocaleString()}`} icon={Wallet} trend={{ value: "+8%", isPositive: true }} />
        <KPICard title="Total Collected (All Time)" value={`KES ${totals.allTime.toLocaleString()}`} icon={Wallet} trend={{ value: "+18%", isPositive: true }} variant="success" />
        <KPICard title="Pending Contributions" value={`${totals.pending}`} icon={Wallet} trend={{ value: "-2%", isPositive: false }} variant="warning" />
        <KPICard title="Missed / Overdue" value={`${totals.overdue}`} icon={Wallet} trend={{ value: "-5%", isPositive: false }} variant="warning" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex items-center justify-between p-4">
              <CardTitle>Contributions</CardTitle>
              <div className="flex items-center gap-2">
                <Input placeholder="Search member..." value={search} onChange={(e) => setSearch(e.target.value)} />
                <select className="input h-10" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                  <option value="all">All</option>
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead onClick={() => toggleSort("member")} className="cursor-pointer">Member Name</TableHead>
                    <TableHead onClick={() => toggleSort("amount")} className="cursor-pointer">Amount</TableHead>
                    <TableHead>Cycle</TableHead>
                    <TableHead onClick={() => toggleSort("status")} className="cursor-pointer">Status</TableHead>
                    <TableHead onClick={() => toggleSort("datePaid")} className="cursor-pointer">Date Paid</TableHead>
                    <TableHead>Balance</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell>{r.member}</TableCell>
                      <TableCell>KES {r.amount.toLocaleString()}</TableCell>
                      <TableCell>{r.cycle}</TableCell>
                      <TableCell>
                        {r.status === "paid" && <span className="text-success">Paid</span>}
                        {r.status === "pending" && <span className="text-warning">Pending</span>}
                        {r.status === "overdue" && <span className="text-destructive">Overdue</span>}
                      </TableCell>
                      <TableCell>{r.datePaid ?? "—"}</TableCell>
                      <TableCell>{r.balance ? `KES ${r.balance.toLocaleString()}` : "—"}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {r.status !== "paid" && (
                            <Button size="sm" variant="outline" onClick={() => markPaid(r.id)}>Mark as Paid</Button>
                          )}
                          <Button size="sm" variant="ghost" onClick={() => sendReminder(r.member)}>Send Reminder</Button>
                          <Button size="sm" variant="link" onClick={() => toast({ title: "Edit", description: "Open edit modal (not implemented)" })}>Edit</Button>
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
              <CardTitle>Contributions Over Time</CardTitle>
            </CardHeader>
            <CardContent style={{ height: 200 }}>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={contributionsOverTime}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Contribution Share</CardTitle>
            </CardHeader>
            <CardContent style={{ height: 200 }}>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={pieArray} dataKey="value" nameKey="name" outerRadius={60} innerRadius={30}>
                    {pieArray.map((_, i) => (
                      <Cell key={i} fill={["#8884d8", "#82ca9d", "#ffc658", "#ff7f7f"][i % 4]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Contribution</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Next date: <strong>2025-12-01</strong></p>
              <p className="text-sm">Amount expected: <strong>KES 75,000</strong></p>
              <p className="text-sm">Members not paid: <strong>Mary Wanjiku, Grace Achieng</strong></p>
            </CardContent>
          </Card>
        </div>
        </div>


      </div>
    </div>
  );
}
