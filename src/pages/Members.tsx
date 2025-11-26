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
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { toast } from "@/hooks/use-toast";
import { Users, CheckCircle, Mail } from "lucide-react";

interface Member {
  id: number;
  name: string;
  phone: string;
  role: "Member" | "Treasurer" | "Chairperson" | "Secretary" | string;
  contributionsTotal: number;
  loansTotal: number;
  status: "active" | "inactive" | "invited" | string;
  joinDate: string;
  cycle: string;
}

const sampleMembers: Member[] = [
  { id: 1, name: "John Kamau", phone: "+254700111000", role: "Member", contributionsTotal: 75000, loansTotal: 30000, status: "active", joinDate: "2022-03-01", cycle: "Monthly" },
  { id: 2, name: "Mary Wanjiku", phone: "+254700222000", role: "Treasurer", contributionsTotal: 120000, loansTotal: 0, status: "active", joinDate: "2021-07-12", cycle: "Monthly" },
  { id: 3, name: "Peter Omondi", phone: "+254700333000", role: "Member", contributionsTotal: 30000, loansTotal: 10000, status: "inactive", joinDate: "2023-01-10", cycle: "Weekly" },
  { id: 4, name: "Grace Achieng", phone: "+254700444000", role: "Member", contributionsTotal: 15000, loansTotal: 0, status: "invited", joinDate: "2025-11-01", cycle: "Monthly" },
];

export default function Members() {
  const [rows, setRows] = useState<Member[]>(sampleMembers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string | "all">("all");
  const [statusFilter, setStatusFilter] = useState<string | "all">("all");
  const [sortKey, setSortKey] = useState<keyof Member | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [activeMember, setActiveMember] = useState<Member | null>(null);

  const totals = useMemo(() => {
    const total = rows.length;
    const active = rows.filter((r) => r.status === "active").length;
    const invited = rows.filter((r) => r.status === "invited").length;
    const inLoanCycle = rows.filter((r) => r.loansTotal > 0).length;
    return { total, active, invited, inLoanCycle };
  }, [rows]);

  const filtered = useMemo(() => {
    let out = rows.filter((r) => r.name.toLowerCase().includes(search.toLowerCase()) || r.phone.includes(search));
    if (roleFilter !== "all") out = out.filter((r) => r.role === roleFilter);
    if (statusFilter !== "all") out = out.filter((r) => r.status === statusFilter);
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
  }, [rows, search, roleFilter, statusFilter, sortKey, sortDir]);

  function toggleSort(key: keyof Member) {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  function removeMember(id: number) {
    setRows((prev) => prev.filter((r) => r.id !== id));
    toast({ title: "Member removed", description: "Member was removed from the group." });
  }

  function sendReminder(name: string) {
    toast({ title: "Reminder sent", description: `Reminder sent to ${name}` });
  }

  const pieData = rows.map((r) => ({ name: r.name, value: r.contributionsTotal }));

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="p-6 md:p-8 space-y-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold">Members</h1>
            <p className="text-sm text-muted-foreground">Manage your chama members</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" onClick={() => toast({ title: "Download", description: "Preparing members report..." })}>
              <DownloadIcon />
              Download Report
            </Button>
            <Button onClick={() => toast({ title: "Invite", description: "Invite member link copied" })}>
              <Mail className="w-4 h-4" />
              Invite Member
            </Button>
            <Button onClick={() => toast({ title: "Add", description: "Open add member modal (not implemented)" })}>
              <Users className="w-4 h-4" />
              Add Member
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard title="Total Members" value={`${totals.total}`} icon={Users} trend={{ value: "+2%", isPositive: true }} />
          <KPICard title="Active Members" value={`${totals.active}`} icon={CheckCircle} trend={{ value: "+1%", isPositive: true }} variant="success" />
          <KPICard title="Pending Invites" value={`${totals.invited}`} icon={Mail} trend={{ value: "0", isPositive: true }} />
          <KPICard title="Members in Loan Cycle" value={`${totals.inLoanCycle}`} icon={Users} trend={{ value: "+5%", isPositive: true }} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex items-center justify-between p-4">
                <CardTitle>Members</CardTitle>
                <div className="flex items-center gap-2">
                  <Input placeholder="Search member..." value={search} onChange={(e) => setSearch(e.target.value)} />
                  <select className="input h-10" value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
                    <option value="all">All roles</option>
                    <option>Member</option>
                    <option>Treasurer</option>
                    <option>Chairperson</option>
                    <option>Secretary</option>
                  </select>
                  <select className="input h-10" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                    <option value="all">All status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="invited">Invited</option>
                  </select>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead onClick={() => toggleSort("name")} className="cursor-pointer">Member Name</TableHead>
                      <TableHead>Phone Number</TableHead>
                      <TableHead onClick={() => toggleSort("role")} className="cursor-pointer">Role</TableHead>
                      <TableHead onClick={() => toggleSort("contributionsTotal")} className="cursor-pointer">Total Contributions</TableHead>
                      <TableHead onClick={() => toggleSort("loansTotal")} className="cursor-pointer">Total Loans</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map((m) => (
                      <TableRow key={m.id}>
                        <TableCell>{m.name}</TableCell>
                        <TableCell>{m.phone}</TableCell>
                        <TableCell>{m.role}</TableCell>
                        <TableCell>KES {m.contributionsTotal.toLocaleString()}</TableCell>
                        <TableCell>KES {m.loansTotal.toLocaleString()}</TableCell>
                        <TableCell>
                          {m.status === "active" && <span className="text-success">Active</span>}
                          {m.status === "inactive" && <span className="text-muted-foreground">Inactive</span>}
                          {m.status === "invited" && <span className="text-warning">Invited</span>}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="ghost" onClick={() => setActiveMember(m)}>View Profile</Button>
                            <Button size="sm" variant="link" onClick={() => toast({ title: "Edit", description: "Open edit member modal (not implemented)" })}>Edit</Button>
                            <Button size="sm" variant="outline" onClick={() => removeMember(m.id)}>Remove</Button>
                            <Button size="sm" variant="ghost" onClick={() => sendReminder(m.name)}>Send Reminder</Button>
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
                <CardTitle>Contributions Share</CardTitle>
              </CardHeader>
              <CardContent style={{ height: 220 }}>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={60} innerRadius={30}>
                      {pieData.map((_, i) => (
                        <Cell key={i} fill={["#8884d8", "#82ca9d", "#ffc658", "#ff7f7f"][i % 4]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Top Contributors</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {rows.slice().sort((a,b)=>b.contributionsTotal-a.contributionsTotal).slice(0,4).map(m=> (
                    <li key={m.id} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{m.name}</div>
                        <div className="text-xs text-muted-foreground">KES {m.contributionsTotal.toLocaleString()}</div>
                      </div>
                      <div className="text-sm text-primary">{m.role}</div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Member Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Most active this month</p>
                <ul className="mt-2 space-y-2">
                  {rows.slice(0,3).map(m=> (
                    <li key={m.id} className="flex items-center justify-between">
                      <div className="font-medium">{m.name}</div>
                      <div className="text-xs text-muted-foreground">{m.cycle}</div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {activeMember && (
          <div className="fixed right-6 top-16 w-96 z-50">
            <Card>
              <CardHeader className="flex items-center justify-between">
                <CardTitle>Member Profile</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setActiveMember(null)}>Close</Button>
              </CardHeader>
              <CardContent>
                <p className="font-medium">{activeMember.name}</p>
                <p className="text-sm">Phone: {activeMember.phone}</p>
                <p className="text-sm">Role: {activeMember.role}</p>
                <p className="text-sm">Join date: {activeMember.joinDate}</p>
                <p className="text-sm">Cycle: {activeMember.cycle}</p>
                <hr className="my-3" />
                <p className="text-sm">Total contributed: KES {activeMember.contributionsTotal.toLocaleString()}</p>
                <p className="text-sm">Total loans: KES {activeMember.loansTotal.toLocaleString()}</p>
                <div className="mt-4 flex gap-2">
                  <Button onClick={() => toast({ title: "Edit role", description: "Edit role not implemented" })}>Edit role</Button>
                  <Button variant="outline" onClick={() => removeMember(activeMember.id)}>Remove</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

// small inline DownloadIcon to avoid adding another import
function DownloadIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}
