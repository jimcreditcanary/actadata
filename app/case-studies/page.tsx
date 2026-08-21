import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PostCards } from "@/components/post-cards";
import { Testimonial } from "@/components/sections/testimonial";
import { ContactFooter } from "@/components/sections/contact-footer";
import { caseStudies, insights } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Case studies",
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
  /* One-page PDFs of the studies that have one, for the buyer who wants
     something to forward rather than a link to send. */
  const downloads = studies.filter(s => s.pdf);

  return (
    <>
      <Breadcrumbs trail={[{name: "Case studies",path: "/case-studies"}]} />
      <PageHeader
        eyebrow="Case studies"
        title="What we built,"
        accent="and what changed."
        lede="Written up properly: the situation, the work, and the numbers afterwards."
      />

      <section className="py-14 md:py-16">
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

      {downloads.length > 0 && (
        <section className="pb-14 md:pb-16">
          <div className="container">
            <div className="max-w-3xl rounded-2xl border border-white/[0.08] bg-card/50 p-7 md:p-8">
              <h2 className="font-display text-2xl tracking-tight">Take one with you</h2>
              <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed">
                Each study is also a single page you can forward to whoever else needs to see it.
              </p>
              <ul className="mt-6 space-y-3">
                {downloads.map(s => (
                  <li key={s.slug}>
                    <a
                      href={s.pdf}
                      /* Not target=_blank: a PDF link that hijacks the tab is a
                         small rudeness, and the browser decides whether to open
                         it inline or save it. `download` only hints the filename. */
                      download
                      className="group flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm"
                    >
                      <span className="text-electric group-hover:underline">
                        {s.client ?? s.title} — one-page PDF ↓
                      </span>
                      <span className="text-xs text-muted-foreground">{s.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      <Testimonial compact eyebrow="In their words" />

      <ContactFooter />
    </>
  );
}
