import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/ui/button";
import { FlowDiagram } from "@/components/flow-diagram";
import { Stack } from "@/components/sections/stack";
import { PipelineGrid } from "@/components/pipeline-grid";
import { SpreadsheetTrap } from "@/components/sections/spreadsheet-trap";
import { ValueStream } from "@/components/sections/value-stream";
import { EngagementTimeline } from "@/components/sections/engagement-timeline";
import { Testimonial } from "@/components/sections/testimonial";
import { ContactFooter } from "@/components/sections/contact-footer";
import { JsonLd } from "@/components/json-ld";
import { graph, howItWorks } from "@/lib/seo";

export const metadata: Metadata = {
  title: "How it works: a BigQuery data layer, live in weeks",
  description:
    "Clean, model, alert, act. How we take every system you own into one place, then put reporting, exceptions and agents on top of it.",
  alternates: { canonical: "/how-it-works" },
};

export default function HowItWorksPage() {
  return (
    <>
      <Breadcrumbs trail={[{name: "How it works",path: "/how-it-works"}]} />
      <JsonLd data={graph(howItWorks)} />
      <PageHeader
        eyebrow="How it works"
        title="Clean. Model. Alert."
        accent="Act."
        lede="We are an operations business, not a dashboard business. We map how value moves through your company end to end, record the cost, revenue, conversion and time of every activity along it, and then show you where effort returns most."
      >
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="electric" size="lg">
            <Link href="/contact">Start the conversation →</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/what-we-build">What we build</Link>
          </Button>
        </div>
      </PageHeader>

      <SpreadsheetTrap />

      <section className="py-14 md:py-16">
        <div className="container">
          <FlowDiagram />
        </div>
      </section>

      <ValueStream />
      <Stack />
      {/* Sequence last: by this point the reader knows what we build, and the
          only open question is when they get it. */}
      {/* The only block on the site that evidences the real-time claim rather
          than asserting it: one cell per source per day. It came off the Summary
          demo when that moved to home only, and it belongs here anyway — this is
          the page where the plumbing is the subject. */}
      <section className="py-14 md:py-16 border-t border-white/[0.04]">
        <div className="container">
          <PipelineGrid />
        </div>
      </section>

      <EngagementTimeline />
      {/* The timeline above claims a few months. This is the client saying it
          took three — which is the only kind of evidence that claim can have. */}
      <Testimonial eyebrow="Three months, in practice" />
      <ContactFooter />
    </>
  );
}
