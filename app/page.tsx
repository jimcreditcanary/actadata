import { Hero } from "@/components/sections/hero";
import { LogoStrip } from "@/components/sections/logo-strip";
import { Problem } from "@/components/sections/problem";
import { WhatWeBuild } from "@/components/sections/what-we-build";
import { SummaryPageDemo } from "@/components/sections/summary-page-demo";
import { Quote } from "@/components/sections/quote";
import { EngagementModels } from "@/components/sections/engagement-models";
import { Verticals } from "@/components/sections/verticals";
import { WhyActa } from "@/components/sections/why-acta";
import { PricingAnchor } from "@/components/sections/pricing-anchor";
import { ContactFooter } from "@/components/sections/contact-footer";

export default function Page() {
  return (
    <>
      <Hero />
      <LogoStrip />
      <Problem />
      <WhatWeBuild />
      <SummaryPageDemo />
      <Quote />
      <EngagementModels />
      <Verticals />
      <WhyActa />
      <PricingAnchor />
      <ContactFooter />
    </>
  );
}
