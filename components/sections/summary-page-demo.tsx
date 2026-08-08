"use client";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Eyebrow } from "@/components/eyebrow";
import { PipelineGrid } from "@/components/pipeline-grid";
import { SummaryScorecard } from "@/components/summary-scorecard";
import { SummaryOkrs } from "@/components/summary-okrs";
import { SummaryAlerts } from "@/components/summary-alerts";
import { summaryExamples, type SummaryExample } from "@/lib/summary-examples";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";

/**
 * The Summary Page mock. Content lives in lib/summary-examples.ts so this file
 * stays layout, and every example carries the same four blocks in the same order:
 * scorecard (whole business), objectives (against pace), alerts (what needs you),
 * then the trend and the pipeline health behind it all.
 *
 * Per-metric sparklines are hand-rolled SVG in SummaryScorecard rather than
 * recharts — eight charts per tab would have been a lot of JS for a 60px line.
 */
function MainChart({ data, label }: { data: SummaryExample["trend"]; label: string }) {
  return (
    <Card className="p-5 flex-1 flex flex-col">
      <CardContent className="p-0 flex flex-1 flex-col">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              {label}
            </div>
            <div className="text-sm text-foreground mt-0.5">12-week trailing window</div>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-3 rounded bg-electric" /> Current
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-3 rounded bg-white/30" /> Prior 12 weeks
            </span>
          </div>
        </div>
        <div className="h-56 flex-1 min-h-[14rem]">
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
            A balanced scorecard across finance, customer, operations and people — every
            measure against target, with RAG status derived from the metric tree rather than
            typed in by hand. Underneath it, objectives tracked against pace, and the three
            things that actually need you today. Clear one and the next moves up.
          </p>
        </div>

        <div className="mt-10">
          <Tabs defaultValue={summaryExamples[0].id} className="w-full">
            <TabsList className="flex-wrap h-auto">
              {summaryExamples.map(v => (
                <TabsTrigger key={v.id} value={v.id} className="px-4">{v.label}</TabsTrigger>
              ))}
            </TabsList>

            {summaryExamples.map(v => (
              <TabsContent key={v.id} value={v.id}>
                <div className="rounded-2xl border border-white/[0.06] bg-card/40 backdrop-blur p-5 md:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-white/[0.06]">
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="text-sm text-foreground/90 font-medium">
                        {v.label} · Summary Page
                      </div>
                      <div className="text-xs text-muted-foreground hidden sm:block">
                        {v.caption}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="text-[11px] uppercase tracking-[0.16em]">Illustrative</span>
                      <span>Live · updated continuously</span>
                    </div>
                  </div>

                  {/* Whole-business coverage before anything else */}
                  <div className="mt-5">
                    <SummaryScorecard metrics={v.scorecard} />
                  </div>

                  {/* The OKR card is naturally about half the height of the alert
                      queue, which left 322px of dead space beside it. Stacking the
                      trend under the objectives fills the left column so both
                      sides land within a few pixels of each other. */}
                  <div className="mt-3 grid gap-3 lg:grid-cols-3 items-stretch">
                    <div className="lg:col-span-2 flex flex-col gap-3">
                      <SummaryOkrs okrs={v.okrs} />
                      <MainChart data={v.trend} label={v.trendLabel} />
                    </div>
                    <SummaryAlerts alerts={v.alerts} queued={v.queued} persona={v.persona} />
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
              Also built for credit unions, B2B services, wholesale, customer service and
              recruitment —{" "}
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
