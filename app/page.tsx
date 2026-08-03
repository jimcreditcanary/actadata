import { Hero } from "@/components/sections/hero";
import { Stack } from "@/components/sections/stack";
import { Crew } from "@/components/sections/crew";
import { Problem } from "@/components/sections/problem";
import { WhatWeBuild } from "@/components/sections/what-we-build";
import { SummaryPageDemo } from "@/components/sections/summary-page-demo";
import { EngagementModels } from "@/components/sections/engagement-models";
import { Verticals } from "@/components/sections/verticals";
import { PricingAnchor } from "@/components/sections/pricing-anchor";
import { ContactFooter } from "@/components/sections/contact-footer";

export default function Page() {
  return (
    <>
      <Hero />
      <Stack />
      <Crew />
      <Problem />
      <WhatWeBuild />
      <SummaryPageDemo />
      <EngagementModels />
      <Verticals />
      <PricingAnchor />
      <ContactFooter />
    </>
  );
}
