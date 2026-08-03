"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, ArrowUp } from "lucide-react";
import {
  ResponsiveContainer, LineChart, Line, AreaChart, Area,
  XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";

type KPI = {
  label: string;
  value: string;
  delta: number;       // % change vs prior period
  spark: number[];
};

type VerticalConfig = {
  id: string;
  label: string;
  caption: string;
  kpis: KPI[];
  trendLabel: string;
  trend: { week: string; current: number; prior: number }[];
};

function spark(seed: number, n = 14) {
  let v = 50 + (seed % 30);
  const out: number[] = [];
  for (let i = 0; i < n; i++) {
    v += Math.sin(seed + i * 0.7) * 6 + (i / n) * 4;
    out.push(Math.round(Math.max(20, v)));
  }
  return out;
}

function trend(seed: number) {
  return Array.from({ length: 12 }).map((_, i) => {
    const base = 60 + Math.sin(seed + i / 1.4) * 10 + i * 2.4;
    return {
      week: `W${i + 1}`,
      current: Math.round(base + Math.sin(seed * 1.3 + i) * 3),
      prior:   Math.round(base * 0.86 + Math.cos(seed + i) * 3),
    };
  });
}

const verticals: VerticalConfig[] = [
  {
    id: "retail",
    label: "Retail",
    caption: "DTC + wholesale apparel · last 7 days",
    trendLabel: "Net revenue (£k) — current vs prior 12 weeks",
    trend: trend(2),
    kpis: [
      { label: "Net revenue",        value: "£1.84m", delta:  6.4, spark: spark(11) },
      { label: "Orders",             value: "24,310", delta:  3.1, spark: spark(7)  },
      { label: "AOV",                value: "£75.74", delta:  3.2, spark: spark(13) },
      { label: "Gross margin",       value: "53.1%",  delta: -0.8, spark: spark(4)  },
      { label: "Return rate",        value: "8.4%",   delta: -1.1, spark: spark(9)  },
      { label: "New customer share", value: "31.2%",  delta:  4.7, spark: spark(2)  },
    ],
  },
  {
    id: "credit",
    label: "Consumer Credit",
    caption: "Unsecured lender · last 7 days",
    trendLabel: "Approved volume (£m) — current vs prior 12 weeks",
    trend: trend(5),
    kpis: [
      { label: "Apps received",  value: "11,402", delta:  8.9, spark: spark(3)  },
      { label: "Approval rate",  value: "42.6%",  delta:  1.3, spark: spark(8)  },
      { label: "Avg APR",        value: "29.4%",  delta: -0.4, spark: spark(14) },
      { label: "Funded volume",  value: "£8.9m",  delta:  6.2, spark: spark(6)  },
      { label: "30+ DPD",        value: "2.1%",   delta: -0.3, spark: spark(1)  },
      { label: "CAC payback",    value: "5.4 mo", delta: -8.0, spark: spark(10) },
    ],
  },
  {
    id: "legal",
    label: "Legal",
    caption: "Consumer claims firm · last 7 days",
    trendLabel: "Cases opened — current vs prior 12 weeks",
    trend: trend(8),
    kpis: [
      { label: "Cases opened",      value: "612",    delta:  4.0, spark: spark(15) },
      { label: "Conversion (call→sign)", value: "37.2%", delta:  2.6, spark: spark(12) },
      { label: "Avg case value",    value: "£1,940", delta:  1.4, spark: spark(5)  },
      { label: "WIP value",         value: "£14.2m", delta:  9.1, spark: spark(0)  },
      { label: "Cost per acquired case", value: "£212", delta: -6.3, spark: spark(17) },
      { label: "Time to first hearing",  value: "94 d", delta: -3.2, spark: spark(19) },
    ],
  },
  {
    id: "services",
    label: "Consumer Services",
    caption: "Subscription home services · last 7 days",
    trendLabel: "Active subscriptions (k) — current vs prior 12 weeks",
    trend: trend(11),
    kpis: [
      { label: "Active subs",      value: "84.6k", delta:  2.4, spark: spark(20) },
      { label: "MRR",              value: "£1.21m", delta:  3.6, spark: spark(22) },
      { label: "Churn (monthly)",  value: "3.8%",   delta: -0.4, spark: spark(24) },
      { label: "ARPU",             value: "£14.30", delta:  1.1, spark: spark(26) },
      { label: "NPS",              value: "+42",    delta:  3.0, spark: spark(28) },
      { label: "First-call resolution", value: "78%", delta:  1.9, spark: spark(30) },
    ],
  },
];

function Sparkline({ data }: { data: number[] }) {
  const series = data.map((v, i) => ({ i, v }));
  return (
    <div className="h-10 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={series} margin={{ top: 4, right: 0, bottom: 0, left: 0 }}>
          <Line
            type="monotone"
            dataKey="v"
            stroke="#A855F7"
            strokeWidth={1.8}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function KpiTile({ k }: { k: KPI }) {
  const positive = k.delta >= 0;
  // For metrics where lower is better, flag in colour separately if needed.
  const goodWhenDown = ["Return rate", "30+ DPD", "Cost per acquired case", "Time to first hearing", "Churn (monthly)", "CAC payback"];
  const isGood = goodWhenDown.includes(k.label) ? !positive : positive;
  return (
    <Card className="p-5">
      <CardContent className="p-0">
        <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{k.label}</div>
        <div className="mt-1 flex items-baseline justify-between gap-2">
          <div className="text-2xl font-semibold tabular-nums tracking-tight">{k.value}</div>
          <div className={`flex items-center gap-0.5 text-xs font-medium ${isGood ? "text-electric" : "text-amber-300"}`}>
            {positive ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
            {Math.abs(k.delta).toFixed(1)}%
          </div>
        </div>
        <div className="mt-3"><Sparkline data={k.spark} /></div>
        <div className="mt-1 text-[11px] text-muted-foreground">vs prior 7 days</div>
      </CardContent>
    </Card>
  );
}

function MainChart({ data, label }: { data: VerticalConfig["trend"]; label: string }) {
  return (
    <Card className="p-5">
      <CardContent className="p-0">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{label}</div>
            <div className="text-sm text-foreground mt-0.5">12-week trailing window</div>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><span className="h-1.5 w-3 rounded bg-electric" /> Current</span>
            <span className="flex items-center gap-1.5"><span className="h-1.5 w-3 rounded bg-white/30" /> Prior 12 weeks</span>
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 8, left: -16, bottom: 0 }}>
              <defs>
                <linearGradient id="curr" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#A855F7" stopOpacity={0.45} />
                  <stop offset="100%" stopColor="#A855F7" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis dataKey="week" stroke="rgba(255,255,255,0.45)" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="rgba(255,255,255,0.45)" fontSize={11} tickLine={false} axisLine={false} width={36} />
              <Tooltip
                contentStyle={{
                  background: "#0A1828",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 8,
                  fontSize: 12,
                }}
                labelStyle={{ color: "rgba(255,255,255,0.7)" }}
              />
              <Area type="monotone" dataKey="prior" stroke="rgba(255,255,255,0.35)" strokeDasharray="4 4" fill="transparent" strokeWidth={1.5} />
              <Area type="monotone" dataKey="current" stroke="#A855F7" fill="url(#curr)" strokeWidth={2.2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export function SummaryPageDemo() {
  return (
    <section id="summary" className="relative py-24 md:py-32 border-t border-white/[0.04]">
      <div className="container">
        <div className="max-w-3xl">
          <Badge variant="electric" className="mb-5">The Summary Page · Hero output</Badge>
          <h2 className="font-display text-4xl md:text-5xl tracking-tight leading-[1.05]">
            One page. The whole business. <span className="text-electric">Refreshed daily.</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            One trading-pack-grade view of how the business actually moved this week —
            built for your vertical, tied to the metric tree, ready for the boardroom.
            It answers the question your C-suite was going to ask before they ask it.
          </p>
        </div>

        <div className="mt-10">
          <Tabs defaultValue="retail" className="w-full">
            <TabsList className="flex-wrap h-auto">
              {verticals.map(v => (
                <TabsTrigger key={v.id} value={v.id} className="px-4">{v.label}</TabsTrigger>
              ))}
            </TabsList>

            {verticals.map(v => (
              <TabsContent key={v.id} value={v.id}>
                <div className="rounded-2xl border border-white/[0.06] bg-card/40 backdrop-blur p-5 md:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-white/[0.06]">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-electric animate-pulse" />
                      <div className="text-sm text-foreground/90 font-medium">{v.label} · Trading Pack</div>
                      <div className="text-xs text-muted-foreground hidden sm:block">{v.caption}</div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Badge variant="muted">Illustrative</Badge>
                      <span>Refreshed 06:00 daily</span>
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-2 md:grid-cols-3 gap-3">
                    {v.kpis.map(k => <KpiTile key={k.label} k={k} />)}
                  </div>

                  <div className="mt-4">
                    <MainChart data={v.trend} label={v.trendLabel} />
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
          <div className="mt-4 text-xs text-muted-foreground">
            Demo data shown. Live versions are wired straight to your warehouse.
          </div>
        </div>
      </div>
    </section>
  );
}
