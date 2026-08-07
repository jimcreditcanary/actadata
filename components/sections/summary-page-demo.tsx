"use client";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Eyebrow } from "@/components/eyebrow";
import { PipelineGrid } from "@/components/pipeline-grid";
import { SummaryOkrs, type Okr } from "@/components/summary-okrs";
import { SummaryAlerts, type Alert } from "@/components/summary-alerts";
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
  /** Who this page is built for — drives the alert list. */
  persona: string;
  okrs: Okr[];
  alerts: Alert[];
  queued: string[];
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
    id: "omni-channel-retail",
    label: "Omni-channel Retail",
    caption: "DTC + wholesale apparel · last 7 days",
    trendLabel: "Net revenue (£k) — current vs prior 12 weeks",
    trend: trend(2),
    persona: "COO",
    okrs: [
      { objective: "Grow contribution, not just revenue", result: "Contribution margin", current: "53.1%", target: "56.0%", progress: 68, pace: 74 },
      { objective: "Cut return rate on apparel", result: "Returns as % of orders", current: "8.4%", target: "6.5%", progress: 58, pace: 55 },
      { objective: "Win back lapsed customers", result: "Reactivated customers", current: "4,120", target: "6,000", progress: 69, pace: 66 },
    ],
    alerts: [
      { title: "Margin slipping on the hero SKU", detail: "Gross margin down 3.1pts over two weeks, driven by promo depth on one line.", metric: "GM 48.2% vs 51.3%", action: "Review promo", urgent: true },
      { title: "Returns spiking in one size", detail: "Size 12 returns at 19% against a 8% baseline. Likely a spec change.", metric: "19% vs 8%", action: "Investigate" },
      { title: "Marketplace stock about to run dry", detail: "Two bestsellers below three days of cover at current run rate.", metric: "2.7 days cover", action: "Reorder" },
    ],
    queued: ["Carriage cost per order drifting up", "New customer share below plan in the South", "Supplier lead times slipping on two lines"],
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
    id: "consumer-credit",
    label: "Consumer Credit",
    caption: "Unsecured lender · last 7 days",
    trendLabel: "Approved volume (£m) — current vs prior 12 weeks",
    trend: trend(5),
    persona: "COO",
    okrs: [
      { objective: "Lend more without loosening risk", result: "Funded volume", current: "£8.9m", target: "£11.0m", progress: 81, pace: 78 },
      { objective: "Hold arrears through growth", result: "30+ DPD", current: "2.1%", target: "under 2.5%", progress: 84, pace: 80 },
      { objective: "Prove good customer outcomes", result: "Consumer Duty measures evidenced", current: "7", target: "9", progress: 78, pace: 83 },
    ],
    alerts: [
      { title: "Affordability declines up in one channel", detail: "Broker channel declines up 6pts week on week, concentrated in one introducer.", metric: "Decline 38% vs 32%", action: "Review introducer", urgent: true },
      { title: "Early arrears building in a cohort", detail: "The March cohort is 0.4pts worse at month 3 than the February cohort.", metric: "1.9% vs 1.5%", action: "Check cohort" },
      { title: "Two Consumer Duty measures without evidence", detail: "Fair value and understanding have no current month data feeding them.", metric: "2 of 9 gaps", action: "Close the gap" },
    ],
    queued: ["CAC payback lengthening on paid search", "Roll rate 1→2 up slightly", "Manual underwriting overrides above trend"],
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
    id: "legal-services",
    label: "Legal Services",
    caption: "Consumer claims firm · last 7 days",
    trendLabel: "Cases opened — current vs prior 12 weeks",
    trend: trend(8),
    persona: "Managing Partner",
    okrs: [
      { objective: "Grow settled case value", result: "Average settlement", current: "£1,940", target: "£2,250", progress: 72, pace: 70 },
      { objective: "Bring cost per case down", result: "Cost per acquired case", current: "£212", target: "£180", progress: 64, pace: 72 },
      { objective: "Shorten time to settle", result: "Median days to settle", current: "94", target: "80", progress: 61, pace: 66 },
    ],
    alerts: [
      { title: "One panel is acquiring at twice the target cost", detail: "Panel C at £430 per acquired case against a £180 target, and volume is rising.", metric: "£430 vs £180", action: "Pause panel", urgent: true },
      { title: "WIP ageing past 120 days", detail: "£1.4m of WIP is now older than 120 days, up from £0.9m.", metric: "£1.4m over 120d", action: "Review WIP" },
      { title: "Conversion dropping at sign stage", detail: "Call-to-sign down 4.1pts since the script change.", metric: "33.1% vs 37.2%", action: "Check script" },
    ],
    queued: ["Fee earner utilisation below plan", "Two claim types settling below reserve", "Marketing spend up with flat enquiries"],
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
    id: "saas-startups",
    label: "SaaS & Startups",
    caption: "B2B SaaS · last 7 days",
    trendLabel: "Active subscriptions (k) — current vs prior 12 weeks",
    trend: trend(11),
    persona: "COO",
    okrs: [
      { objective: "Grow recurring revenue", result: "MRR", current: "£1.21m", target: "£1.40m", progress: 76, pace: 72 },
      { objective: "Cut monthly churn", result: "Churn", current: "3.8%", target: "3.0%", progress: 63, pace: 70 },
      { objective: "Raise first-call resolution", result: "FCR", current: "78%", target: "85%", progress: 74, pace: 76 },
    ],
    alerts: [
      { title: "Churn concentrated in one plan", detail: "The mid tier is churning at 6.1% against 3.8% overall, all within 90 days of joining.", metric: "6.1% vs 3.8%", action: "Review onboarding", urgent: true },
      { title: "Engineer no-shows driving cancellations", detail: "Missed appointments up 40% in one region this month.", metric: "+40% region 3", action: "Escalate" },
      { title: "Contact centre wait times climbing", detail: "Average wait 4m12s against a 2m target, worst on Mondays.", metric: "4m12s vs 2m", action: "Rebalance rota" },
    ],
    queued: ["ARPU flat despite the price change", "NPS dipping in one region", "Field first-time-fix below target"],
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
          <Eyebrow accent className="mb-5">The Summary Page</Eyebrow>
          <h2 className="font-display text-4xl md:text-5xl tracking-tight leading-[1.05]">
            One page. The whole business. <span className="text-electric">In real time.</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Objectives tracked against target, and beside them the three things that
            actually need you today — personalised to whoever is looking. Clear one and the
            next moves up. It answers the question your C-suite was going to ask before
            they ask it.
          </p>
        </div>

        <div className="mt-10">
          <Tabs defaultValue="omni-channel-retail" className="w-full">
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
                      
                      <div className="text-sm text-foreground/90 font-medium">{v.label} · Trading Pack</div>
                      <div className="text-xs text-muted-foreground hidden sm:block">{v.caption}</div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="text-[11px] uppercase tracking-[0.16em]">Illustrative</span>
                      <span>Live · updated continuously</span>
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-2 md:grid-cols-3 gap-3">
                    {v.kpis.map(k => <KpiTile key={k.label} k={k} />)}
                  </div>

                  <div className="mt-4 grid gap-3 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                      <SummaryOkrs okrs={v.okrs} />
                    </div>
                    <SummaryAlerts alerts={v.alerts} queued={v.queued} persona={v.persona} />
                  </div>

                  <div className="mt-3">
                    <MainChart data={v.trend} label={v.trendLabel} />
                  </div>

                  <div className="mt-3">
                    <PipelineGrid />
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
          <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <span>Demo data shown. Live versions are wired straight to your warehouse.</span>
            <span>
              Also built for debt management, credit unions, B2B services, wholesale,
              manufacturing, customer service and recruitment —{" "}
              <Link href="/sectors" className="text-electric hover:underline">
                every sector
              </Link>
              .
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
