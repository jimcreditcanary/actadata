import { Card, CardContent } from "@/components/ui/card";
import { Database, Cloud, GitBranch, LineChart, LayoutDashboard, Sparkles } from "lucide-react";
import { Eyebrow } from "@/components/eyebrow";

const tiles = [
  {
    icon: Database,
    title: "Integrations & Data Sources",
    blurb: "Every system that matters, landed in one place. How we connect is source-dependent — API, export, replica or event stream, whatever yours exposes.",
  },
  {
    icon: Cloud,
    title: "BigQuery Warehouse & Pipelines",
    blurb: "BigQuery as the back end and services on Cloud Run, inside your own secure, scalable environment. Idempotent pipelines, deployed by CI/CD — not hand-built in a console.",
  },
  {
    icon: GitBranch,
    title: "Business Mapping & Metric Trees",
    blurb: "We map how revenue actually moves through your business, then build the metric tree your operators can argue with — and settle arguments from.",
  },
  {
    icon: LineChart,
    title: "Operational & Risk Intelligence",
    blurb: "Dashboards your team actually opens — finance, marketing, ops, risk — wired to the metric tree, with thresholds that raise the work rather than just colouring a cell red.",
  },
  {
    icon: LayoutDashboard,
    title: "The Summary Page",
    badge: "Hero output",
    blurb: "One trading-pack-grade page that answers the C-suite question before it gets asked. Built for boardrooms, updated in real time.",
    featured: true,
  },
  {
    icon: Sparkles,
    title: "Self-Service Analytics with Claude",
    blurb: "Claude wired into your warehouse in your own enterprise account. Your operators ask in plain English; the answer comes from the metric tree, not a guess.",
  },
];

export function WhatWeBuild() {
  return (
    <section id="what-we-build" className="relative py-24 md:py-32 border-t border-white/[0.04]">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <Eyebrow className="mb-5">What we build</Eyebrow>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight leading-[1.05]">
              Six capabilities. One coherent data function.
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              Built on immutable event history in BigQuery — every event landed once
              and never overwritten, which makes every later question (analytics, AI,
              attribution) cheaper to answer.
            </p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {tiles.map(({ icon: Icon, title, blurb, badge, featured }) => (
            <Card
              key={title}
              className={`p-6 transition-colors hover:border-electric/30 ${featured ? "border-electric/30 bg-gradient-to-b from-electric/[0.06] to-transparent" : ""}`}
            >
              <CardContent className="p-0">
                <div className="flex items-center justify-between">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${featured ? "bg-electric/15 text-electric" : "bg-white/5 text-foreground/80"}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  {badge && <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-electric">{badge}</span>}
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{blurb}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
