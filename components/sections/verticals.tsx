"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Eyebrow } from "@/components/eyebrow";

const verticals = [
  {
    id: "retail",
    label: "Retail",
    pains: [
      "Channel data scattered across Shopify, Amazon, retailer EDI, ad platforms",
      "Margin truth is buried under returns, promotions and shipping costs",
      "Buying meetings run on stale exports",
    ],
    builds: [
      "Unified order-line warehouse with cleaned promo, returns and COGS attribution",
      "True margin metric tree by SKU, channel, customer segment",
      "Daily Summary Page tuned for the trading meeting",
    ],
    output: "A daily trading pack the buying team trusts more than the spreadsheet.",
  },
  {
    id: "credit",
    label: "Consumer Credit",
    pains: [
      "Risk, finance and marketing each have their own version of the truth",
      "Decisioning data is locked inside credit-bureau exports",
      "No clean signal for collections strategy or vintage analysis",
    ],
    builds: [
      "Application-to-funded-to-collections single timeline per customer",
      "Vintage cohorts, roll-rate matrices, marketing CAC payback by channel",
      "Regulator-grade reporting harness",
    ],
    output: "One number for net new contribution — agreed by risk, finance and growth.",
  },
  {
    id: "legal",
    label: "Legal",
    pains: [
      "Case management, marketing and finance systems don't talk",
      "Cost-per-acquired-case is a guess",
      "WIP value drifts between fee-earner views and finance views",
    ],
    builds: [
      "Case lifecycle warehouse from first touch to settlement",
      "Funnel and LTV by panel, source, claim type",
      "Shared WIP and pipeline view for partners and finance",
    ],
    output: "A weekly partner pack that ends the 'whose number is right?' debate.",
  },
  {
    id: "services",
    label: "Consumer Services",
    pains: [
      "Subscription data sits in billing, churn signals sit in CS, neither talk",
      "Field ops & contact-centre KPIs are disconnected from revenue",
      "Pricing and packaging changes ship without a feedback loop",
    ],
    builds: [
      "Subscriber state machine with billing, ops and contact events stitched together",
      "Cohort-led churn and LTV models by plan and acquisition channel",
      "Live experiment readout for pricing and packaging changes",
    ],
    output: "A subscriber Summary Page the CEO opens before the all-hands.",
  },
];

export function Verticals() {
  return (
    <section id="verticals" className="relative py-24 md:py-32 border-t border-white/[0.04]">
      <div className="container">
        <div className="max-w-3xl">
          <Eyebrow className="mb-5">Verticals</Eyebrow>
          <h2 className="font-display text-4xl md:text-5xl tracking-tight leading-[1.05]">
            Built for consumer businesses.
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            We work where the data is messy, the operating cadence is weekly, and
            the margin lives in the details. Pick a vertical for what we ship.
          </p>
        </div>

        <Tabs defaultValue="retail" className="mt-10">
          <TabsList className="flex-wrap h-auto">
            {verticals.map(v => (
              <TabsTrigger key={v.id} value={v.id} className="px-4">{v.label}</TabsTrigger>
            ))}
          </TabsList>
          {verticals.map(v => (
            <TabsContent key={v.id} value={v.id}>
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="p-6">
                  <CardContent className="p-0">
                    <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-3">Where it hurts</div>
                    <ul className="space-y-2.5 text-sm text-foreground/90">
                      {v.pains.map(p => (
                        <li key={p} className="flex gap-2.5"><span className="mt-2 h-1 w-1 rounded-full bg-amber-300/70 shrink-0" />{p}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                <Card className="p-6 border-electric/30 bg-gradient-to-b from-electric/[0.05] to-transparent">
                  <CardContent className="p-0">
                    <div className="text-[11px] uppercase tracking-[0.18em] text-electric mb-3">What Acta builds</div>
                    <ul className="space-y-2.5 text-sm text-foreground/90">
                      {v.builds.map(b => (
                        <li key={b} className="flex gap-2.5"><span className="mt-2 h-1 w-1 rounded-full bg-electric shrink-0" />{b}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                <Card className="p-6">
                  <CardContent className="p-0">
                    <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-3">What you get</div>
                    <p className="text-sm text-foreground/90 leading-relaxed">{v.output}</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
