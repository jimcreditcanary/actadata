import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/ui/button";
import { WhatWeBuild } from "@/components/sections/what-we-build";
import { EngagementModels } from "@/components/sections/engagement-models";
import { ContactFooter } from "@/components/sections/contact-footer";

export const metadata: Metadata = {
  title: "What we build: a working data function, no hires",
  description:
    "Integrations, a BigQuery back end, metric trees, operational and risk reporting, the Summary Page, and self-service analytics with Claude.",
  alternates: { canonical: "/what-we-build" },
};

export default function WhatWeBuildPage() {
  return (
    <>
      <Breadcrumbs trail={[{name: "What we build",path: "/what-we-build"}]} />
      <PageHeader
        eyebrow="What we build"
        title="A working data function."
        accent="Without building one."
        lede="Not a tool you have to staff. A working data function — the connections, the history, the metric tree, the reporting people actually open, and the AI layer on top."
      >
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="electric" size="lg">
            <Link href="/contact">Talk to us →</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/pricing">See pricing</Link>
          </Button>
        </div>
      </PageHeader>

      <WhatWeBuild />
      <EngagementModels />
      <ContactFooter />
    </>
  );
}
