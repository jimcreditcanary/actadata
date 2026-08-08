import { Hero } from "@/components/sections/hero";
import { SpreadsheetTrap } from "@/components/sections/spreadsheet-trap";
import { HowItWorks } from "@/components/sections/how-it-works";
import { ValueStream } from "@/components/sections/value-stream";
import { SummaryPageDemo } from "@/components/sections/summary-page-demo";
import { SectorTeaser } from "@/components/sections/sector-teaser";
import { Crew } from "@/components/sections/crew";
import { HowWeWork } from "@/components/sections/how-we-work";
import { PricingTeaser } from "@/components/sections/pricing-teaser";
import { ContactFooter } from "@/components/sections/contact-footer";
import { PostSection } from "@/components/post-cards";
import { allPosts, caseStudies } from "@/lib/posts";

/**
 * Home is a hub, not the whole site, and it runs the argument once in order:
 * the problem -> how we fix it -> how we measure -> what you end up looking at ->
 * who it is for -> who we are -> how we work -> what we think -> what it costs ->
 * talk to us.
 *
 * The Stack section is deliberately NOT here. It was 2,804px of the home page on
 * a phone — the single largest block after the Summary mock — and it is repeated
 * in full on /how-it-works, which the diagram section links to. Home was 21,288px
 * tall on a 390px screen with it; cutting it is the cheapest 13% of that back.
 *
 * Depth lives on its own routes so campaigns can land on them directly:
 * /how-it-works, /what-we-build, /sectors/[slug], /pricing, /about, /blog.
 *
 * The Summary Page mock stays on home despite the restructure. It is the most
 * persuasive thing we have — it shows the product rather than describing it — and
 * burying it on an interior page cost more than the page weight it adds.
 */
export default function Page() {
  /* Case studies lead when they exist, because delivered work outsells opinion.
     Until then the three insight pieces carry the section. */
  const studies = caseStudies();
  const featured = studies.length > 0 ? [...studies, ...allPosts().filter(p => p.kind === "insight")].slice(0, 3) : allPosts().slice(0, 3);

  return (
    <>
      <Hero />
      <SpreadsheetTrap />
      <HowItWorks />
      <ValueStream />
      <SummaryPageDemo />
      <SectorTeaser />
      <Crew />
      <HowWeWork />
      {/* Renders nothing if there is nothing published. */}
      <PostSection
        posts={featured}
        heading={studies.length > 0 ? "Proof and thinking" : "Thinking"}
        title={
          studies.length > 0
            ? "What this looks like when it's done."
            : "How we think about this."
        }
        cta={{ href: "/blog", label: "All writing →" }}
      />
      <PricingTeaser />
      <ContactFooter />
    </>
  );
}
