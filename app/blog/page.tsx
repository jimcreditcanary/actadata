import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PostCards } from "@/components/post-cards";
import { ContactFooter } from "@/components/sections/contact-footer";
import { allPosts, caseStudies, insights } from "@/lib/posts";
import { JsonLd } from "@/components/json-ld";
import { graph, ORG_ID, SITE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Writing: case studies and data & AI insight",
  description:
    "Case studies and thought leadership on operational data, event tracking and putting AI agents into a live business.",
  alternates: { canonical: "/blog" },
};

/**
 * The blog index. Newest first, both kinds mixed, because a reader arriving
 * cold wants the most recent thing we said rather than a taxonomy. The two
 * grouped views underneath exist for the people who came for one or the other —
 * and each only appears when it has something in it.
 */
export default function BlogPage() {
  const all = allPosts();
  const studies = caseStudies();
  const pieces = insights();

  return (
    <>
      <Breadcrumbs trail={[{name: "Writing",path: "/blog"}]} />
      {/* Blog node describing the index and its posts, so the writing surfaces
          as a collection an engine can enumerate rather than three loose URLs. */}
      {all.length > 0 && (
        <JsonLd
          data={graph({
            "@type": "Blog",
            "@id": `${SITE}/blog#blog`,
            name: "Acta Data — Writing",
            description:
              "Case studies and thought leadership on operational data, event tracking and putting AI agents into a live business.",
            url: `${SITE}/blog`,
            publisher: { "@id": ORG_ID },
            blogPost: all.map(p => ({
              "@type": "BlogPosting",
              "@id": `${SITE}/blog/${p.slug}#post`,
              headline: p.title,
              description: p.excerpt,
              url: `${SITE}/blog/${p.slug}`,
              datePublished: p.published,
              author: { "@type": "Person", name: p.author ?? "Acta Data" },
            })),
          })}
        />
      )}
      <PageHeader
        eyebrow="Writing"
        title="What we've built,"
        accent="and what we think."
        lede="Case studies with the numbers in them, and the arguments behind how we build. No gated PDFs."
      />

      <section className="py-14 md:py-16">
        <div className="container">
          {all.length === 0 ? (
            <div className="max-w-2xl">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Nothing published yet. If you want the thinking before the writing catches up,
                ask on a call — we will talk you through the approach and the closest piece of
                work we are able to discuss.
              </p>
              <div className="mt-7 flex flex-wrap gap-4 text-sm">
                <Link href="/contact" className="text-electric hover:underline">
                  Talk to us →
                </Link>
                <Link href="/how-it-works" className="text-electric hover:underline">
                  How it works →
                </Link>
              </div>
            </div>
          ) : (
            <>
              <PostCards posts={all} columns={all.length >= 3 ? 3 : 2} headingLevel={2} />

              {studies.length > 0 && pieces.length > 0 && (
                <p className="mt-10 text-sm text-muted-foreground">
                  Looking for delivered work specifically?{" "}
                  <Link href="/case-studies" className="text-electric hover:underline">
                    Case studies only
                  </Link>
                  .
                </p>
              )}

              {studies.length === 0 && (
                /* Honest about the gap rather than silent about it — and it puts
                   the reference request in front of someone already reading. */
                <div className="mt-14 rounded-2xl border border-white/[0.08] bg-card/40 p-7 md:p-8 max-w-3xl">
                  <h2 className="text-lg font-semibold tracking-tight">
                    Case studies are written up on request
                  </h2>
                  <p className="mt-2.5 text-muted-foreground leading-relaxed">
                    Most of our work sits under NDA, so the written-up versions go out matched to
                    your sector rather than published here. Ask on the call and we will send the
                    closest one we can talk about, with the numbers in it.
                  </p>
                  <Link
                    href="/contact"
                    className="mt-5 inline-block text-sm text-electric hover:underline"
                  >
                    Ask for a reference →
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <ContactFooter />
    </>
  );
}
