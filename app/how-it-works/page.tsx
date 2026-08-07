import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { FlowDiagram } from "@/components/flow-diagram";
import { SummaryPageDemo } from "@/components/sections/summary-page-demo";
import { Stack } from "@/components/sections/stack";
import { ContactFooter } from "@/components/sections/contact-footer";

export const metadata: Metadata = {
  title: "How it works — Acta Data",
  description:
    "Clean, model, alert, act. How we take every system you own into one place, then put reporting, exceptions and agents on top of it.",
  alternates: { canonical: "/how-it-works" },
};

export default function HowItWorksPage() {
  return (
    <>
      <PageHeader
        eyebrow="How it works"
        title="Clean. Model. Alert."
        accent="Act."
        lede="Most businesses have the data and none of the leverage — a dozen systems, none of them agreeing. We record it once, in one place, in a way nothing can quietly rewrite. Everything after that gets cheap."
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

      <section className="py-20 md:py-24">
        <div className="container">
          <FlowDiagram />
        </div>
      </section>

      <Stack />
      <SummaryPageDemo />
      <ContactFooter />
    </>
  );
}
