import { Hero } from "@/components/sections/hero";
import { ExperienceStrip } from "@/components/sections/experience-strip";
import { SpreadsheetTrap } from "@/components/sections/spreadsheet-trap";
import { NotATechCompany } from "@/components/sections/not-a-tech-company";
import { HowItWorks } from "@/components/sections/how-it-works";
import { SummaryPageDemo } from "@/components/sections/summary-page-demo";
import { SecondBrain } from "@/components/sections/second-brain";
import { SectorTeaser } from "@/components/sections/sector-teaser";
import { HowWeWork } from "@/components/sections/how-we-work";
import { PricingTeaser } from "@/components/sections/pricing-teaser";
import { ContactFooter } from "@/components/sections/contact-footer";
import { PostSection } from "@/components/post-cards";
import { allPosts, caseStudies } from "@/lib/posts";

/**
 * Home is a hub, and on a phone it has to be quick: who we've worked with, what
 * is wrong, how we fix it, what you end up looking at, who it is for, how we
 * work, what we think, what it costs, talk to us.
 *
 * It was 21,288px tall on a 390px screen, which is around 25 screens of thumb
 * before the price. Three sections came off it, each of which still exists in
 * full one click away:
 *   - Stack        -> /how-it-works (it was 2,804px here)
 *   - ValueStream  -> /how-it-works (2,073px; the diagram caption on this page
 *                    still names cost, revenue, conversion and time)
 *   - Crew         -> /about (2,457px; the brand marquee survives as
 *                    <ExperienceStrip />, which is the evidence without the essay)
 * and HowWeWork renders in `compact` form here, titles only.
 *
 * If you add a section to this page, take the mobile height measurement first.
 * The reason interior routes exist is so this one does not have to hold
 * everything.
 *
 * The Summary Page mock stays despite being the tallest block left. It is the
 * most persuasive thing we have — it shows the product rather than describing
 * it — and it no longer carries a charting library.
 */
export default function Page() {
  /* Case studies lead when they exist, because delivered work outsells opinion.
     Until then the insight pieces carry the section. */
  const studies = caseStudies();
  const featured =
    studies.length > 0
      ? [...studies, ...allPosts().filter(p => p.kind === "insight")].slice(0, 3)
      : allPosts().slice(0, 3);

  return (
    <>
      <Hero />
      <ExperienceStrip />
      <SpreadsheetTrap />
      <HowItWorks />
      <SummaryPageDemo />
      <SecondBrain compact />
      <NotATechCompany compact />
      <SectorTeaser />
      <HowWeWork compact />
      {/* Renders nothing if there is nothing published. */}
      <PostSection
        posts={featured}
        heading={studies.length > 0 ? "Proof and thinking" : "Thinking"}
        title={
          studies.length > 0 ? "What this looks like when it's done." : "How we think about this."
        }
        cta={{ href: "/blog", label: "All writing →" }}
      />
      <PricingTeaser />
      <ContactFooter />
    </>
  );
}
