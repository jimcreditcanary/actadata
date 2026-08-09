import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { ContactFooter } from "@/components/sections/contact-footer";
import { JsonLd } from "@/components/json-ld";
import { graph, breadcrumbs, faqs, SITE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "FAQ: cost, timelines, ownership and your data",
  description:
    "What a data layer costs, how long until you see something, who owns it, and what happens to personal data. Answered in full, no call required.",
  alternates: { canonical: "/faq" },
};

/**
 * The answers live in lib/seo.ts because the FAQPage schema and the visible page
 * must be the same text — Google penalises schema that does not appear on the
 * page, and an assistant quoting one while the page says another is worse.
 *
 * This page exists mainly to be retrieved. Buyers ask these ten questions on
 * every first call; answering them in plain HTML makes the site the source when
 * somebody asks an AI assistant instead of us.
 */
export default function FaqPage() {
  return (
    <>
      <JsonLd
        data={graph(
          {
            "@type": "FAQPage",
            "@id": `${SITE}/faq#faq`,
            mainEntity: faqs.map(f => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          },
          {
            /* Gives a voice assistant an explicit passage to read aloud — the
               questions and their answers — rather than guessing at the page. */
            "@type": "WebPage",
            "@id": `${SITE}/faq#webpage`,
            url: `${SITE}/faq`,
            name: "Acta Data — FAQ",
            speakable: {
              "@type": "SpeakableSpecification",
              cssSelector: [".faq-question", ".faq-answer"],
            },
          },
          breadcrumbs([{ name: "Questions", path: "/faq" }])
        )}
      />

      <PageHeader
        eyebrow="Questions"
        title="What people ask us"
        accent="before the first call."
        lede="Cost, timelines, ownership, personal data, and what happens to your team. All answered here rather than held back for a conversation."
      />

      <section className="py-14 md:py-16">
        <div className="container">
          <div className="max-w-3xl divide-y divide-white/[0.06]">
            {faqs.map(f => (
              <div key={f.q} className="py-7 first:pt-0">
                <h2 className="faq-question text-xl md:text-2xl font-semibold tracking-tight leading-snug">
                  {f.q}
                </h2>
                <p className="faq-answer mt-3 text-muted-foreground leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <Link href="/contact" className="text-electric hover:underline">
              Ask us something else →
            </Link>
            <Link href="/pricing" className="text-electric hover:underline">
              Full pricing →
            </Link>
            <Link href="/how-it-works" className="text-electric hover:underline">
              How it works →
            </Link>
          </div>
        </div>
      </section>

      <ContactFooter />
    </>
  );
}
