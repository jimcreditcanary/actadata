import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Pricing } from "@/components/sections/pricing";
import { Problem } from "@/components/sections/problem";
import { ContactFooter } from "@/components/sections/contact-footer";
import { entryMonthlyK } from "@/lib/economics";

export const metadata: Metadata = {
  title: "Pricing — Acta Data",
  description:
    "Three tiers from £5k a month: BI Only, BI + Claude self-service, and Enterprise agents priced against outcomes. Monthly, no lock-in, everything yours.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title={`From £${entryMonthlyK}k a month.`}
        accent="Cheaper than the team you'd hire."
        lede="Monthly, no lock-in, and you own everything we build as we build it. Start where you are and move up as the appetite grows."
      />
      <Pricing />
      <Problem />
      <ContactFooter />
    </>
  );
}
