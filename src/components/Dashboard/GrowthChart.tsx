import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import React from "react";
import { useSidebar } from "@/components/ui/sidebar";

const data = [
  { month: "Jan", balance: 45000, contributions: 35000, loans: 10000 },
  { month: "Feb", balance: 52000, contributions: 42000, loans: 15000 },
  { month: "Mar", balance: 68000, contributions: 48000, loans: 20000 },
  { month: "Apr", balance: 75000, contributions: 55000, loans: 18000 },
  { month: "May", balance: 92000, contributions: 65000, loans: 25000 },
  { month: "Jun", balance: 110000, contributions: 75000, loans: 30000 },
];

export function GrowthChart() {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [readyKey, setReadyKey] = React.useState(0);
  const { state } = useSidebar();

  // Recharts sometimes fails to measure correctly when the container size
  // changes (for example when the sidebar collapses). Use a ResizeObserver
  // to detect size changes and remount the ResponsiveContainer by bumping
  // a key. Also re-run when the sidebar state changes.
  React.useEffect(() => {
    setReadyKey((k) => k + 1);
  }, [state]);

  React.useEffect(() => {
    if (!containerRef.current) return;
    let raf = 0;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const cr = entry.contentRect;
        // Only remount when we have a meaningful width/height.
        if (cr.width > 0 && cr.height > 0) {
          // Debounce remount slightly to avoid thrash during transitions.
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(() => setReadyKey((k) => k + 1));
        }
      }
    });

    ro.observe(containerRef.current);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <Card className="border-border/50 shadow-soft overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardTitle className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Financial Growth</CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={containerRef} className="w-full">
          <ResponsiveContainer key={readyKey} width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="month" className="text-xs" stroke="hsl(var(--muted-foreground))" />
              <YAxis className="text-xs" stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Line type="monotone" dataKey="balance" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: "hsl(var(--primary))" }} />
              <Line type="monotone" dataKey="contributions" stroke="hsl(var(--secondary))" strokeWidth={2} dot={{ fill: "hsl(var(--secondary))" }} />
              <Line type="monotone" dataKey="loans" stroke="hsl(var(--accent))" strokeWidth={2} dot={{ fill: "hsl(var(--accent))" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-xs text-muted-foreground">Balance</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-secondary" />
            <span className="text-xs text-muted-foreground">Contributions</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-accent" />
            <span className="text-xs text-muted-foreground">Loans</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
