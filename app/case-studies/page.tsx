import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { CaseStudyCards } from "@/components/case-study-cards";
import { ContactFooter } from "@/components/sections/contact-footer";
import { sortedCaseStudies } from "@/lib/case-studies";

export const metadata: Metadata = {
  title: "Case studies — Acta Data",
  description: "What we built, for whom, and what changed as a result.",
  alternates: { canonical: "/case-studies" },
};

export default function CaseStudiesPage() {
  const studies = sortedCaseStudies();

  return (
    <>
      <PageHeader
        eyebrow="Case studies"
        title="What we built,"
        accent="and what changed."
        lede="Written up properly: the situation, the work, and the numbers afterwards."
      />

      <section className="py-20 md:py-24">
        <div className="container">
          {studies.length > 0 ? (
            <CaseStudyCards studies={studies} />
          ) : (
            /* No placeholder cards — an empty list says so plainly and points at
               the sector pages instead, which are full of substance. */
            <div className="max-w-2xl">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Most of our work is under NDA. We share written case studies and references on
                request, matched to your sector — ask on the call and we will send the closest
                one we can talk about.
              </p>
              <div className="mt-7 flex flex-wrap gap-4 text-sm">
                <Link href="/contact" className="text-electric hover:underline">
                  Ask for a reference →
                </Link>
                <Link href="/sectors" className="text-electric hover:underline">
                  See sector detail →
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <ContactFooter />
    </>
  );
}
