import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Pricing } from "@/components/sections/pricing";
import { Problem } from "@/components/sections/problem";
import { TestimonialCard } from "@/components/sections/testimonial";
import { ContactFooter } from "@/components/sections/contact-footer";
import { discoveryOneOffK, entryYearK, wholeBusinessYearK } from "@/lib/economics";

export const metadata: Metadata = {
  title: "Pricing: £15k for the map, £60k to solve an area",
  description:
    `Four tiers priced by scope: £${discoveryOneOffK}k for a Discovery map you own and can build from, £${entryYearK}k to solve one area, £${wholeBusinessYearK}k for the whole business. No lock-in.`,
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <>
      <Breadcrumbs trail={[{name: "Pricing",path: "/pricing"}]} />
      <PageHeader
        eyebrow="Pricing"
        title={`£${discoveryOneOffK}k for the map. £${entryYearK}k to solve an area.`}
        /* Was "All of it cheaper than hiring", which the section headline 500px below
           now says better. This sets that argument up rather than repeating it. */
        accent="Neither is a discount."
        lede="Priced by how much of the business is in scope, not by which features you unlock. No lock-in, and you own everything we build as we build it — including the Discovery report, which you are free to take elsewhere, and which is credited in full if you go ahead with a build."
      />
      <Pricing />
      {/* Directly under the tiers, because the objection a price list creates is
          "and does it actually arrive?" — answered here by somebody who paid. */}
      <section className="pb-4">
        <div className="container">
          <TestimonialCard className="max-w-3xl" />
        </div>
      </section>
      <Problem />
      <ContactFooter />
    </>
  );
}
