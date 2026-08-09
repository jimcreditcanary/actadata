import Link from "next/link";
import { Eyebrow } from "@/components/eyebrow";
import { Button } from "@/components/ui/button";
import {
  tiers,
  discoveryOneOffK,
  discoveryCreditNote,
  entryYearK,
  wholeBusinessYearK,
  seniorHireLoadedK,
} from "@/lib/economics";

/**
 * Compact pricing on the home page — the numbers are the hook, the detail lives
 * on /pricing. Three real prices sit here so nobody has to call to self-qualify,
 * and the £15k map is first because it is the easiest yes on the page.
 */
const rows = [
  { name: "Discovery", who: `${discoveryCreditNote} if you go ahead`, price: `£${discoveryOneOffK}k one-off` },
  { name: "One area", who: "A single problem, solved", price: `£${entryYearK}k a year` },
  { name: "Whole business", who: "Every value stream + self-service", price: `£${wholeBusinessYearK}k a year`, featured: true },
  { name: "Enterprise", who: "Autonomous agents", price: tiers.enterprise.price },
];

export function PricingTeaser() {
  return (
    <section className="relative py-16 md:py-20 border-t border-white/[0.04]">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <Eyebrow className="mb-5">Pricing</Eyebrow>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight leading-[1.05]">
              Four ways in.{" "}
              <span className="text-electric">All cheaper than hiring.</span>
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              Start with a £{discoveryOneOffK}k map you can take away and build yourself —
              credited in full if you go ahead — or solve one area for £{entryYearK}k a year — less than half of one fully-loaded
              senior data hire (~£{seniorHireLoadedK}k). No lock-in, and you own everything we
              build as we build it.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="electric" size="lg">
                <Link href="/pricing">See what&apos;s included →</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">Talk to us</Link>
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            {rows.map(r => (
              <div
                key={r.name}
                className={`flex items-center justify-between gap-4 rounded-xl p-5 ${
                  r.featured
                    ? "border border-electric/30 bg-electric/[0.06]"
                    : "border border-white/[0.07] bg-navy-100/40"
                }`}
              >
                <div>
                  <div className="font-semibold tracking-tight">{r.name}</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">{r.who}</div>
                </div>
                <div className={`shrink-0 font-medium ${r.featured ? "text-electric" : "text-foreground/80"}`}>
                  {r.price}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
