import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { PostCards } from "@/components/post-cards";
import { ContactFooter } from "@/components/sections/contact-footer";
import { caseStudies, insights } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Case studies — Acta Data",
  description:
    "Delivered work written up properly — the situation, what we built, and the numbers afterwards. Consumer credit, debt management, credit unions, B2B and more.",
  alternates: { canonical: "/case-studies" },
};

/**
 * A filtered view of the blog, not a second content store — case studies are
 * posts, and the detail pages live at /blog/[slug]. This route exists because
 * "case studies" is what a buyer looks for and what a sales email links to.
 */
export default function CaseStudiesPage() {
  const studies = caseStudies();
  const pieces = insights();

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
            <PostCards posts={studies} columns={studies.length >= 3 ? 3 : 2} headingLevel={2} />
          ) : (
            /* No placeholder cards — an empty list says so plainly and points at
               the writing and the sector pages, which are full of substance. */
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
                {pieces.length > 0 && (
                  <Link href="/blog" className="text-electric hover:underline">
                    Read how we build →
                  </Link>
                )}
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
