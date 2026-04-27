import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database, Cloud, GitBranch, LineChart, LayoutDashboard, Sparkles } from "lucide-react";

const tiles = [
  {
    icon: Database,
    title: "Integrations & Data Sources",
    blurb: "Every system that matters — Shopify, Stripe, ad platforms, CRMs, ops tooling — pulled into one place, reliably.",
  },
  {
    icon: Cloud,
    title: "Cloud Warehouse & ETL",
    blurb: "A modern, low-maintenance warehouse with idempotent pipelines. Snowflake or BigQuery, dbt under the hood.",
  },
  {
    icon: GitBranch,
    title: "Business Mapping & Metric Trees",
    blurb: "We map how revenue actually moves through your business, then build the metric tree your operators can argue with.",
  },
  {
    icon: LineChart,
    title: "Core Reporting Suite",
    blurb: "Dashboards your team will actually open — finance, marketing, ops, product — wired straight to the metric tree.",
  },
  {
    icon: LayoutDashboard,
    title: "The Summary Page",
    badge: "Hero output",
    blurb: "One trading-pack-grade page that answers the C-suite question before it gets asked. Built for boardrooms, refreshed daily.",
    featured: true,
  },
  {
    icon: Sparkles,
    title: "LLM Readiness",
    blurb: "Clean schemas, vector layers, evals, guardrails. Your data, prompt-ready — without the hallucination roulette.",
  },
];

export function WhatWeBuild() {
  return (
    <section id="what-we-build" className="relative py-24 md:py-32 border-t border-white/[0.04]">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <Badge variant="muted" className="mb-5">What we build</Badge>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight">
              Six capabilities. One coherent data function.
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              Built on the Activity Schema — a foundation that makes every later
              question (analytics, AI, attribution) cheaper to answer.
            </p>
          </div>
          <Badge variant="electric" className="self-start md:self-end gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-electric" /> Activity Schema, day one
          </Badge>
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
                  {badge && <Badge variant="electric">{badge}</Badge>}
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
