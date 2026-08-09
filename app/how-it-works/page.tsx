import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/ui/button";
import { FlowDiagram } from "@/components/flow-diagram";
import { SummaryPageDemo } from "@/components/sections/summary-page-demo";
import { Stack } from "@/components/sections/stack";
import { ValueStream } from "@/components/sections/value-stream";
import { EngagementTimeline } from "@/components/sections/engagement-timeline";
import { ContactFooter } from "@/components/sections/contact-footer";

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

      <section className="py-14 md:py-16">
        <div className="container">
          <FlowDiagram />
        </div>
      </section>

      <ValueStream />
      <Stack />
      <SummaryPageDemo showPipelineHealth />
      {/* Sequence last: by this point the reader knows what we build, and the
          only open question is when they get it. */}
      <EngagementTimeline />
      <ContactFooter />
    </>
  );
}
