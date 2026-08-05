import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/eyebrow";
import { Check } from "lucide-react";
import {
  inHouseYearOneK,
  inHouseTimeToFirstOutput,
  tiers,
  entryYearK,
  maintenanceMonthlyK,
  seniorHireLoadedK,
  headcount,
} from "@/lib/economics";

const plans = [
  {
    name: "BI Only",
    audience: "For SMEs",
    monthlyK: tiers.biOnly.monthlyK,
    summary: "The whole BI function, live and yours.",
    features: [
      "Every source that matters, connected however it exposes itself",
      "BigQuery back end and Cloud Run services in your own secure, scalable environment",
      "Immutable event history, business mapping and your metric tree",
      "Reporting suite for finance, marketing, ops and risk",
      "The Summary Page, live",
    ],
    cta: "Start here",
  },
  {
    name: "BI + Claude",
    audience: "Safe self-service",
    monthlyK: tiers.biClaude.monthlyK,
    summary: "Everything above, plus your team asking their own questions.",
    features: [
      "Everything in BI Only",
      "Claude self-service analytics in your own enterprise account",
      "PII-restricted by design — the model never sees what it shouldn't",
      "Answers drawn from the metric tree, not guessed",
      "Guardrails and evals your risk team can sign off",
    ],
    cta: "Add Claude",
    featured: true,
  },
  {
    name: "Enterprise",
    audience: "Autonomous agents",
    price: tiers.enterprise.price,
    priceNote: tiers.enterprise.note,
    summary: "Everything above, plus agents that do the work.",
    features: [
      "Everything in BI + Claude",
      "Autonomous agents running operational workflows",
      "Organisational optimisation, by operators who do it for a living",
      "Exceptions routed and escalated without a human chasing them",
      "Priced against the outcome — we share the upside we create",
    ],
    cta: "Talk about outcomes",
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative py-24 md:py-32 border-t border-white/[0.04]">
      <div className="container">
        <div className="max-w-3xl">
          <Eyebrow className="mb-5">Pricing</Eyebrow>
          <h2 className="font-display text-4xl md:text-5xl tracking-tight leading-[1.05]">
            Three tiers.{" "}
            <span className="text-electric">All of them cheaper than hiring.</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Monthly, no lock-in, and you own everything we build as we build it. Start where
            you are and move up when the business is ready — not when a contract says so.
          </p>
        </div>

        <div className="mt-12 grid lg:grid-cols-3 gap-5 items-stretch">
          {plans.map(p => (
            <div key={p.name} className="relative">
              {p.featured && (
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-electric/40 to-transparent opacity-60 blur-xl pointer-events-none" />
              )}
              <div
                className={`relative h-full rounded-2xl p-7 md:p-8 flex flex-col backdrop-blur ${
                  p.featured
                    ? "border border-electric/30 bg-gradient-to-b from-electric/[0.07] to-transparent glow-ring"
                    : "border border-white/[0.08] bg-card/50"
                }`}
              >
                <Eyebrow accent={p.featured}>{p.name}</Eyebrow>
                <div className="mt-1 text-xs text-muted-foreground">{p.audience}</div>

                <div className="mt-5 flex items-baseline gap-1.5">
                  {p.monthlyK ? (
                    <>
                      <span className="font-display text-4xl tracking-tight tabular-nums">
                        £{p.monthlyK}k
                      </span>
                      <span className="text-sm text-muted-foreground">/ month</span>
                    </>
                  ) : (
                    <span className="font-display text-4xl tracking-tight">{p.price}</span>
                  )}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {p.monthlyK ? `£${p.monthlyK * 12}k a year` : p.priceNote}
                </div>

                <p className="mt-5 text-sm text-foreground/90 leading-relaxed">{p.summary}</p>

                <ul className="mt-6 space-y-2.5">
                  {p.features.map(f => (
                    <li key={f} className="flex gap-2.5 text-sm text-muted-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-electric" aria-hidden />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-8">
                  <Button asChild variant={p.featured ? "electric" : "outline"} className="w-full">
                    <a href="#contact">{p.cta} →</a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* After the build — deliberately open. Nobody signs a 12-month build
            without knowing what month 13 looks like. */}
        <div className="mt-5 rounded-2xl border border-white/[0.06] bg-card/40 backdrop-blur p-7 md:p-9">
          <div className="max-w-3xl">
            <Eyebrow className="mb-4">After 12 months</Eyebrow>
            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight leading-tight">
              It&apos;s yours. What happens next is up to you.
            </h3>
            <p className="mt-4 text-muted-foreground">
              A structured handover either way: everything is Terraformed and
              version-controlled, so what you inherit is infrastructure as code — not a
              machine only we know how to restart. Then pick as much or as little ongoing
              help as you want.
            </p>
          </div>

          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                t: "Structured handover",
                price: "Included",
                d: "Terraformed infrastructure, all code, documentation and walkthroughs. You could rebuild it from scratch without us.",
              },
              {
                t: "Keep it running",
                price: `£${maintenanceMonthlyK}k / month`,
                d: "Monitoring, fixes and upgrades so nothing falls over. Cancel whenever — there is no exit fee.",
                featured: true,
              },
              {
                t: "New datasets & builds",
                price: "Per project",
                d: "New sources, new models, new reporting. Scoped and quoted when you want them, not bundled in up front.",
              },
              {
                t: "Training",
                price: "On request",
                d: "Packages for analysts and operators, so your team runs it confidently rather than depending on us.",
              },
            ].map(o => (
              <div
                key={o.t}
                className={`rounded-xl p-5 ${
                  o.featured
                    ? "border border-electric/30 bg-electric/[0.06]"
                    : "border border-white/[0.06] bg-navy-100/50"
                }`}
              >
                <div
                  className={`text-[11px] uppercase tracking-[0.18em] ${
                    o.featured ? "text-electric" : "text-muted-foreground"
                  }`}
                >
                  {o.t}
                </div>
                <div className="mt-2 text-lg font-semibold tracking-tight">{o.price}</div>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{o.d}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          For context: the entry tier is £{entryYearK}k a year — less than half of one
          fully-loaded senior data hire (~£{seniorHireLoadedK}k), and around a ninth of the{" "}
          {headcount}-person team you&apos;d otherwise build, which still takes{" "}
          {inHouseTimeToFirstOutput} to produce anything useful (~£{inHouseYearOneK}k a year).
        </p>
      </div>
    </section>
  );
}
