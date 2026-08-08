import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Pricing } from "@/components/sections/pricing";
import { Problem } from "@/components/sections/problem";
import { ContactFooter } from "@/components/sections/contact-footer";
import { discoveryOneOffK, entryYearK } from "@/lib/economics";

export const metadata: Metadata = {
  title: "Pricing: £15k for the map, £60k to solve an area",
  description:
    "Four tiers priced by scope: a £15k Discovery map you can take away and build yourself, credited in full if you go ahead; £60k a year to solve one area; £120k to map the whole business with Claude self-service; and Enterprise agents priced against outcomes.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <>
      <Breadcrumbs trail={[{name: "Pricing",path: "/pricing"}]} />
      <PageHeader
        eyebrow="Pricing"
        title={`£${discoveryOneOffK}k for the map. £${entryYearK}k to solve an area.`}
        accent="All of it cheaper than hiring."
        lede="Priced by how much of the business is in scope, not by which features you unlock. No lock-in, and you own everything we build as we build it — including the Discovery report, which you are free to take elsewhere, and which is credited in full if you go ahead with a build."
      />
      <Pricing />
      <Problem />
      <ContactFooter />
    </>
  );
}
