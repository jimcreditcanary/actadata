import { Hero } from "@/components/sections/hero";
import { SpreadsheetTrap } from "@/components/sections/spreadsheet-trap";
import { HowItWorks } from "@/components/sections/how-it-works";
import { ValueStream } from "@/components/sections/value-stream";
import { Stack } from "@/components/sections/stack";
import { SummaryPageDemo } from "@/components/sections/summary-page-demo";
import { SectorTeaser } from "@/components/sections/sector-teaser";
import { Crew } from "@/components/sections/crew";
import { PricingTeaser } from "@/components/sections/pricing-teaser";
import { ContactFooter } from "@/components/sections/contact-footer";
import { CaseStudySection } from "@/components/case-study-cards";
import { sortedCaseStudies } from "@/lib/case-studies";

/**
 * Home is a hub now, not the whole site. Each block ends in a route:
 * the trap -> how it works -> the stack -> sectors -> who we are -> pricing.
 *
 * Depth moved to its own pages so campaigns can land on them directly:
 * /how-it-works, /what-we-build, /sectors/[slug], /pricing, /about, /case-studies.
 *
 * The Summary Page mock stays on home despite the restructure. It is the most
 * persuasive thing we have — it shows the product rather than describing it — and
 * burying it on an interior page cost more than the page weight it adds.
 */
export default function Page() {
  return (
    <>
      <Hero />
      <SpreadsheetTrap />
      <HowItWorks />
      <ValueStream />
      <Stack />
      <SummaryPageDemo />
      <SectorTeaser />
      <Crew />
      {/* Renders nothing until a case study exists. */}
      <CaseStudySection studies={sortedCaseStudies().slice(0, 2)} />
      <PricingTeaser />
      <ContactFooter />
    </>
  );
}
