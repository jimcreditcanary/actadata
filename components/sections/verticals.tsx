"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Eyebrow } from "@/components/eyebrow";

/**
 * Six sectors we can speak to from delivery rather than from a capability deck.
 * The wider list sits in a line underneath instead of becoming more tabs —
 * seven-plus tabs stops being a choice and starts being a menu.
 */
const verticals = [
  {
    id: "retail",
    label: "Omni-channel Retail",
    pains: [
      "Channel data scattered across the webstore, marketplaces, retailer EDI and ad platforms",
      "Margin truth buried under returns, promotions and shipping costs",
      "Buying meetings run on stale exports",
    ],
    builds: [
      "Unified order-line history with cleaned promo, returns and COGS attribution",
      "True margin metric tree by SKU, channel and customer segment",
      "Live Summary Page tuned for the trading meeting",
    ],
    output: "A live trading pack the buying team trusts more than the spreadsheet.",
  },
  {
    id: "credit",
    label: "Consumer Credit",
    pains: [
      "Risk, finance and marketing each have their own version of the truth",
      "Decisioning data locked inside bureau exports",
      "No clean signal for collections strategy or vintage analysis",
    ],
    builds: [
      "Application-to-funded-to-collections single timeline per customer",
      "Vintage cohorts, roll-rate matrices, CAC payback by channel",
      "Regulator-grade reporting harness with the lineage to back it",
    ],
    output: "One number for net new contribution — agreed by risk, finance and growth.",
  },
  {
    id: "legal",
    label: "Legal Services",
    pains: [
      "Case management, marketing and finance systems don't talk",
      "Cost per acquired case is a guess",
      "WIP value drifts between fee-earner views and finance views",
    ],
    builds: [
      "Case lifecycle history from first touch to settlement",
      "Funnel and LTV by panel, source and claim type",
      "Shared WIP and pipeline view for partners and finance",
    ],
    output:
      "A partner pack that is current every time they open it, ending the 'whose number is right?' debate.",
  },
  {
    id: "agency",
    label: "Marketing Agencies",
    pains: [
      "Client reporting rebuilt by hand every month, per client, per platform",
      "Retainer profitability unknown until someone totals the timesheets",
      "Media margin and pass-through costs blurred together",
    ],
    builds: [
      "One reporting spine across every client and every ad platform",
      "Retainer P&L per account, delivery hours against fee",
      "Client-ready views that refresh themselves, in your brand",
    ],
    output:
      "The reporting week disappears, and you finally know which accounts actually make money.",
  },
  {
    id: "recruitment",
    label: "Recruitment & Training",
    pains: [
      "Placement, pipeline and margin data spread across ATS, CRM and payroll",
      "Consultant productivity argued from memory",
      "Course completion and outcome data disconnected from revenue",
    ],
    builds: [
      "Candidate and placement timeline from first contact to invoice",
      "Desk-level margin, time-to-fill and fall-through rates",
      "Cohort completion and outcome tracking wired to billing",
    ],
    output: "Every desk and every cohort measured the same way, without a spreadsheet.",
  },
  {
    id: "saas",
    label: "SaaS & Startups",
    pains: [
      "Product events, billing and CRM tell three different growth stories",
      "Board metrics rebuilt by hand the week before each meeting",
      "No activation or retention signal early enough to act on",
    ],
    builds: [
      "Immutable product event history joined to billing and CRM",
      "Activation, expansion, churn and CAC payback from one definition",
      "An investor-ready pack that regenerates itself",
    ],
    output: "The board pack builds itself, and the growth numbers survive diligence.",
  },
];

export function Verticals() {
  return (
    <section id="verticals" className="relative py-24 md:py-32 border-t border-white/[0.04]">
      <div className="container">
        <div className="max-w-3xl">
          <Eyebrow className="mb-5">Verticals</Eyebrow>
          <h2 className="font-display text-4xl md:text-5xl tracking-tight leading-[1.05]">
            We already know your value streams.
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            We work where the data is messy, the operating cadence is weekly, and the margin
            lives in the details. Pick a sector for what we ship.
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

        <p className="mt-8 text-sm text-muted-foreground">
          Also delivered in wholesale, financial services consultancy and consumer-facing AI.
          The sector changes; the value streams rhyme.
        </p>
      </div>
    </section>
  );
}
