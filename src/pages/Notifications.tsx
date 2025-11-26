import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Bell, CreditCard, AlertTriangle, UserPlus, Zap } from "lucide-react";

type NotificationKind = "Payment" | "Loan" | "Member" | "System" | "AI";

type NotificationStatus = "New" | "Read" | "High";

interface NotificationItem {
  id: string;
  kind: NotificationKind;
  title: string;
  message: string;
  timestamp: string; // ISO or human-friendly
  status: NotificationStatus;
  actions?: Array<{ label: string; actionId: string }>; // actions like approve, remind
}

const sampleNotifications: NotificationItem[] = [
  { id: "n1", kind: "Payment", title: "Payment Received", message: "John contributed KSh 5,000.", timestamp: "2 hours ago", status: "New", actions: [{ label: "View", actionId: "view" }] },
  { id: "n2", kind: "Loan", title: "Loan Request", message: "Mary requested a loan of KSh 20,000.", timestamp: "10 minutes ago", status: "New", actions: [{ label: "Approve", actionId: "approve" }, { label: "Reject", actionId: "reject" }] },
  { id: "n3", kind: "Loan", title: "Overdue Loan", message: "David’s loan is overdue by 3 days.", timestamp: "1 day ago", status: "High", actions: [{ label: "View Loan", actionId: "view_loan" }] },
  { id: "n4", kind: "Member", title: "New Join Request", message: "3 people want to join your chama.", timestamp: "3 days ago", status: "New", actions: [{ label: "Review", actionId: "review" }] },
  { id: "n5", kind: "AI", title: "AI Insight", message: "Your chama is trending 15% above average contribution this month.", timestamp: "4 hours ago", status: "New" },
  { id: "n6", kind: "System", title: "Export Complete", message: "Loan Summary — Feb 2025 exported by Admin.", timestamp: "6 days ago", status: "Read" },
];

export default function Notifications() {
  const [filter, setFilter] = useState<string>("All");
  const [query, setQuery] = useState("");
  const [notifications, setNotifications] = useState<NotificationItem[]>(sampleNotifications);
  const [showSystem, setShowSystem] = useState(false);
  const [showDetails, setShowDetails] = useState<NotificationItem | null>(null);
  const [infiniteIndex, setInfiniteIndex] = useState(1);

  const priorityCounts = useMemo(() => {
    const pendingContrib = notifications.filter((n) => n.kind === "Payment" && n.status !== "Read").length;
    const overdue = notifications.filter((n) => n.kind === "Loan" && n.status === "High").length;
    const joinRequests = notifications.filter((n) => n.kind === "Member" && n.status !== "Read").length;
    const aiAlerts = notifications.filter((n) => n.kind === "AI" && n.status !== "Read").length;
    return { pendingContrib, overdue, joinRequests, aiAlerts };
  }, [notifications]);

  const filtered = useMemo(() => {
    return notifications.filter((n) => {
      if (showSystem && n.kind !== "System") return false;
      if (!showSystem && filter !== "All" && filter !== n.kind) return false;
      if (query && !`${n.title} ${n.message}`.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    }).slice(0, infiniteIndex * 10);
  }, [notifications, filter, query, showSystem, infiniteIndex]);

  function markAllRead() {
    setNotifications((prev) => prev.map((p) => ({ ...p, status: p.status === "Read" ? "Read" : "Read" })));
    toast({ title: "Marked all as read" });
  }

  function clearAll() {
    setNotifications([]);
    toast({ title: "Cleared notifications" });
  }

  function handleAction(n: NotificationItem, actionId: string) {
    if (actionId === "approve") {
      toast({ title: "Approved", description: `${n.title} approved (demo)` });
    } else if (actionId === "reject") {
      toast({ title: "Rejected", description: `${n.title} rejected (demo)` });
    } else if (actionId === "view") {
      setShowDetails(n);
    } else {
      toast({ title: "Action", description: `Triggered ${actionId} (demo)` });
    }
    // mark item as read
    setNotifications((prev) => prev.map((p) => (p.id === n.id ? { ...p, status: "Read" } : p)));
  }

  function loadMore() {
    // simulate loading more
    setInfiniteIndex((i) => i + 1);
  }

  return (
    <div className="min-h-screen p-6 md:p-8">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-sm text-muted-foreground">Filter and manage platform notifications.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={() => { markAllRead(); }}>Mark all as read</Button>
          <Button variant="destructive" onClick={() => { clearAll(); }}>Clear</Button>
        </div>
      </div>

      {/* Filters + search */}
      <Card className="mb-6">
        <CardContent>
          <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <Select onValueChange={(v) => setFilter(v)} value={filter}>
                <SelectTrigger className="w-44">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="Payment">Payments</SelectItem>
                  <SelectItem value="Loan">Loans</SelectItem>
                  <SelectItem value="Member">Members</SelectItem>
                  <SelectItem value="System">System</SelectItem>
                  <SelectItem value="AI">AI Alerts</SelectItem>
                </SelectContent>
              </Select>

              <Input placeholder="Search notifications..." value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Switch checked={showSystem} onCheckedChange={() => setShowSystem((s) => !s)} />
                <span className="text-sm">Show system notifications only</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Priority highlight cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-muted"><CreditCard className="w-5 h-5" /></div>
              <div>
                <div className="text-sm text-muted-foreground">Pending Contributions</div>
                <div className="text-xl font-bold">{priorityCounts.pendingContrib} members</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-red-100"><AlertTriangle className="w-5 h-5 text-red-600" /></div>
              <div>
                <div className="text-sm text-muted-foreground">Loan Overdue Alerts</div>
                <div className="text-xl font-bold">{priorityCounts.overdue} overdue</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-green-100"><UserPlus className="w-5 h-5 text-green-600" /></div>
              <div>
                <div className="text-sm text-muted-foreground">New Join Requests</div>
                <div className="text-xl font-bold">{priorityCounts.joinRequests}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-yellow-100"><Zap className="w-5 h-5 text-yellow-600" /></div>
              <div>
                <div className="text-sm text-muted-foreground">AI Risk Alerts</div>
                <div className="text-xl font-bold">{priorityCounts.aiAlerts}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-3">
          {filtered.map((n) => (
            <Card key={n.id} className={`${n.status === "High" ? "border-2 border-red-300" : ""}`}>
              <CardContent>
                <div className="flex items-start justify-between">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 p-2 rounded bg-slate-100">
                      {n.kind === "Payment" && <CreditCard className="w-5 h-5" />}
                      {n.kind === "Loan" && <AlertTriangle className="w-5 h-5" />}
                      {n.kind === "Member" && <UserPlus className="w-5 h-5" />}
                      {n.kind === "AI" && <Zap className="w-5 h-5" />}
                      {n.kind === "System" && <Bell className="w-5 h-5" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{n.title}</h3>
                        <span className="text-xs px-2 py-0.5 rounded bg-muted/50">{n.status}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{n.message}</p>
                      <div className="text-xs text-muted-foreground mt-2">{n.timestamp}</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex flex-col gap-2">
                      {n.actions?.map((a) => (
                        <Button key={a.actionId} size="sm" variant={a.actionId === "approve" ? "secondary" : "ghost"} onClick={() => handleAction(n, a.actionId)}>{a.label}</Button>
                      ))}
                    </div>
                    <Button size="sm" variant="link" onClick={() => { setShowDetails(n); setNotifications((prev) => prev.map((p) => p.id === n.id ? { ...p, status: "Read" } : p)); }}>Details</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {infiniteIndex * 10 < notifications.length && (
            <div className="flex justify-center mt-4">
              <Button onClick={loadMore}>Load more</Button>
            </div>
          )}
        </div>

        {/* System notifications / settings */}
        <div className="space-y-3">
          <Card>
            <CardHeader>
              <CardTitle>System Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">Password changes, approvals, exports and system events will appear here.</div>
              <div className="mt-3">
                <Button variant="outline" size="sm" onClick={() => toast({ title: "View system", description: "Showing system notifications (demo)" })}>View all</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Push Notifications</div>
                    <div className="text-xs text-muted-foreground">Enable browser push notifications</div>
                  </div>
                  <Switch checked={true} onCheckedChange={() => toast({ title: "Toggled push (demo)" })} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">WhatsApp / SMS</div>
                    <div className="text-xs text-muted-foreground">Reminders via WhatsApp or SMS</div>
                  </div>
                  <Switch checked={false} onCheckedChange={() => toast({ title: "Toggled whatsapp (demo)" })} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Email Notifications</div>
                    <div className="text-xs text-muted-foreground">Daily summary emails</div>
                  </div>
                  <Switch checked={true} onCheckedChange={() => toast({ title: "Toggled email (demo)" })} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Details modal */}
      {showDetails && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowDetails(null)} />
          <div className="relative w-full max-w-2xl p-6">
            <Card>
              <CardHeader>
                <CardTitle>{showDetails.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{showDetails.message}</p>
                <div className="text-xs text-muted-foreground mb-4">{showDetails.timestamp}</div>
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={() => setShowDetails(null)}>Close</Button>
                  <Button onClick={() => { toast({ title: "Export", description: "Export detail as PDF (demo)" }); }}>Export</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
