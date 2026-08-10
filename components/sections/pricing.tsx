import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/eyebrow";
import { Check } from "lucide-react";
import {
  inHouseYearOneK,
  inHouseTimeToFirstOutput,
  tiers,
  discoveryOneOffK,
  discoveryCreditNote,
  entryYearK,
  entryMonthlyK,
  wholeBusinessYearK,
  wholeBusinessMonthlyK,
  maintenanceMonthlyK,
  seniorHireLoadedK,
  headcount,
} from "@/lib/economics";

/**
 * Priced by scope, and the annual figure is the headline — £60k and £120k are the
 * numbers a board signs off, where "£5k a month" reads as a subscription nobody
 * has to think about.
 *
 * The Discovery tier is styled differently on purpose. It is the only one that
 * does not ask for a year, and its whole pitch is that you can take the output
 * and do it yourself — so it gets a dashed frame that reads as detachable rather
 * than as the cheap seat in a subscription ladder.
 */
const plans = [
  {
    name: "Discovery",
    audience: "Value stream map + AI readiness",
    priceK: discoveryOneOffK,
    priceNote: `One-off. ${discoveryCreditNote}.`,
    fit: tiers.discovery.fit,
    bound: tiers.discovery.bound,
    diy: true,
    summary: "The map, the plan and the watch-outs. Then do it yourself, or don't.",
    features: [
      "Your value streams mapped end to end — where cost, revenue, conversion and time actually go",
      "Where the value leaks, quantified, and what fixing each one is worth",
      "AI readiness: what your data can support today, and what it cannot",
      "The watch-outs — where AI will embarrass you if you point it at this as-is",
      "A build plan and strategy you own outright, whoever you hand it to",
      "No obligation to continue — take the plan and run it yourself",
    ],
    cta: "Start with the map",
  },
  {
    name: "One area",
    audience: "A single problem, solved",
    priceK: entryYearK,
    monthlyK: entryMonthlyK,
    fit: tiers.oneArea.fit,
    bound: tiers.oneArea.bound,
    summary: "Pick the area that hurts — usually operations — and we finish it.",
    features: [
      "One value stream, built end to end rather than half-covered everywhere",
      "Every source it touches connected, however it exposes itself",
      "BigQuery and Cloud Run in your own secure, scalable Google environment",
      "Full event history, business mapping and the metric tree for that area",
      "The Summary Page, live, for the part of the business you chose",
    ],
    cta: "Solve one area",
  },
  {
    name: "Whole business",
    audience: "Every value stream, plus self-service",
    priceK: wholeBusinessYearK,
    monthlyK: wholeBusinessMonthlyK,
    fit: tiers.wholeBusiness.fit,
    bound: tiers.wholeBusiness.bound,
    summary: "The whole company mapped, and your exec team answering their own questions.",
    features: [
      "Every value stream in the business, on one layer with one set of definitions",
      "Reporting suite for finance, marketing, ops and risk — regulated reporting included",
      "Claude self-service analytics in your own enterprise account",
      "Personal data stays out — the model never sees what it shouldn't",
      "Answers drawn from the metric tree, with limits your risk team can sign off",
    ],
    cta: "Map the business",
    featured: true,
  },
  {
    name: "Enterprise",
    audience: "Autonomous agents",
    price: tiers.enterprise.price,
    priceNote: tiers.enterprise.note,
    fit: tiers.enterprise.fit,
    bound: tiers.enterprise.bound,
    summary: "Everything above, plus agents that do the work.",
    features: [
      "Everything in Whole business",
      "Autonomous agents running real operational workflows",
      "Exceptions routed and escalated without a human chasing them",
      "Organisational optimisation, by operators who do it for a living",
      "Priced against the outcome — we share the upside we create",
    ],
    cta: "Talk about outcomes",
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative py-16 md:py-20 border-t border-white/[0.04]">
      <div className="container">
        <div className="max-w-3xl">
          <Eyebrow className="mb-5">Pricing</Eyebrow>
          <h2 className="font-display text-4xl md:text-5xl tracking-tight leading-[1.05]">
            Four ways in.{" "}
            <span className="text-electric">All of them cheaper than hiring.</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Priced by how much of the business is in scope, not by which features you unlock.
            Start with the map if you want to think about it first, solve one area if something
            specific is hurting, or map the whole company. You own everything we build as we
            build it.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 xl:grid-cols-4 gap-5 items-stretch">
          {plans.map(p => (
            <div key={p.name} className="relative">
              {p.featured && (
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-electric/40 to-transparent opacity-60 blur-xl pointer-events-none" />
              )}
              <div
                className={`relative h-full rounded-2xl p-7 flex flex-col backdrop-blur ${
                  p.featured
                    ? "border border-electric/30 bg-gradient-to-b from-electric/[0.07] to-transparent glow-ring"
                    : p.diy
                      ? "border border-dashed border-white/[0.18] bg-navy-100/30"
                      : "border border-white/[0.08] bg-card/50"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <Eyebrow accent={p.featured}>{p.name}</Eyebrow>
                  {p.diy && (
                    <span className="shrink-0 rounded border border-white/[0.18] px-1.5 py-0.5 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                      DIY
                    </span>
                  )}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">{p.audience}</div>

                <div className="mt-5 flex items-baseline gap-1.5">
                  {p.priceK ? (
                    <>
                      <span className="font-display text-4xl tracking-tight tabular-nums">
                        £{p.priceK}k
                      </span>
                      {p.monthlyK && <span className="text-sm text-muted-foreground">a year</span>}
                    </>
                  ) : (
                    <span className="font-display text-4xl tracking-tight">{p.price}</span>
                  )}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {p.monthlyK ? `Billed monthly at £${p.monthlyK}k` : p.priceNote}
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

                {/* mt-auto pins this and the CTA to the bottom, so the fit and
                    boundary line up across cards whatever the feature list does. */}
                <dl className="mt-auto pt-7 space-y-2 text-xs border-t border-white/[0.06]">
                  <div className="flex gap-2.5">
                    <dt className="w-[52px] shrink-0 uppercase tracking-[0.14em] text-muted-foreground/70">
                      Fits
                    </dt>
                    <dd className="text-foreground/80">{p.fit}</dd>
                  </div>
                  <div className="flex gap-2.5">
                    <dt className="w-[52px] shrink-0 uppercase tracking-[0.14em] text-muted-foreground/70">
                      Covers
                    </dt>
                    <dd className="text-muted-foreground leading-relaxed">{p.bound}</dd>
                  </div>
                </dl>

                <div className="pt-6">
                  <Button asChild variant={p.featured ? "electric" : "outline"} className="w-full">
                    <a href="#contact">{p.cta} →</a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* The DIY promise, said out loud. A discovery engagement that quietly
            assumes you will buy the build is a sales tactic; this one does not. */}
        <div className="mt-5 rounded-2xl border border-dashed border-white/[0.18] bg-navy-100/30 p-7 md:p-9">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-start">
            <div>
              <Eyebrow className="mb-4">Do it yourself</Eyebrow>
              <h3 className="text-2xl md:text-3xl font-semibold tracking-tight leading-tight">
                £{discoveryOneOffK}k, and you never have to speak to us again.
              </h3>
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                The Discovery report is written to be acted on by somebody else. It names the
                value leaks, what each one is worth, the order to fix them in, and where your
                data is not yet good enough to put AI anywhere near it. No dependency, no
                proprietary format, nothing held back for the follow-on sale.
              </p>
              <p>
                Take it to your own team, take it to another supplier, or sit on it for a year.
                If you do come back, you already know exactly what you are buying — and so do
                we, which is why the build starts in week one rather than in discovery.
              </p>
              <p className="text-foreground/90">
                And it is a down payment rather than a sunk cost: go ahead with a build and the
                whole £{discoveryOneOffK}k comes off it. So the only thing you are really
                deciding is whether you want the map first.
              </p>
            </div>
          </div>
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
                d: "A rolling monthly contract: monitoring, fixes and upgrades so nothing falls over. Cancel whenever — no notice period, no exit fee.",
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
          For context: solving one area is £{entryYearK}k a year — less than half of one
          fully-loaded senior data hire (~£{seniorHireLoadedK}k), and mapping the whole business
          at £{wholeBusinessYearK}k is around a quarter of the {headcount}-person team you&apos;d
          otherwise build, which still takes {inHouseTimeToFirstOutput} to produce anything
          useful (~£{inHouseYearOneK}k a year).
        </p>
      </div>
    </section>
  );
}
