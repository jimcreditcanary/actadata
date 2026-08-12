import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { DataProtection } from "@/components/sections/data-protection";
import { ContactFooter } from "@/components/sections/contact-footer";
import { JsonLd } from "@/components/json-ld";
import { graph, dataProtectionFaqs, ORG_ID, SITE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "GDPR data retention, destruction and marketing consent",
  description:
    "Retention rules as code, an audit trail proving what was deleted, marketing contacts traced to the consent that created them, and no personal data in the analytical layer at all.",
  alternates: { canonical: "/data-protection" },
};

/**
 * The depth page for data protection.
 *
 * It exists as its own route rather than a section because the searches here are
 * high-intent and specific — "prove data retention policy", "GDPR data destruction
 * process", "is our marketing list compliant" — and each deserves a page that
 * answers it rather than a paragraph inside a page about something else.
 *
 * The FAQ answers live in lib/seo.ts alongside the site-wide ones so the FAQPage
 * schema and the visible text are the same strings, and so they also flow into
 * /llms.txt without a second copy.
 */
export default function DataProtectionPage() {
  return (
    <>
      <JsonLd
        data={graph(
          {
            "@type": "Service",
            "@id": `${SITE}/data-protection#service`,
            name: "Data protection engineering — retention, destruction and consent evidence",
            serviceType: "Data governance and compliance engineering",
            provider: { "@id": ORG_ID },
            areaServed: { "@type": "Country", name: "United Kingdom" },
            description:
              "Personal data obscured at ingest so the analytical layer holds none. Retention rules expressed as code against a map of where personal data actually lives, run on a schedule, with an audit trail of what was deleted, when and under which rule. Marketing contacts traced back to the consent event that created them so unevidenced contacts can be suppressed. The mechanics and the evidence — not legal advice.",
          },
          {
            "@type": "FAQPage",
            "@id": `${SITE}/data-protection#faq`,
            mainEntity: dataProtectionFaqs.map(f => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          },
          {
            "@type": "WebPage",
            "@id": `${SITE}/data-protection#webpage`,
            url: `${SITE}/data-protection`,
            name: "Acta Data — data protection",
            speakable: {
              "@type": "SpeakableSpecification",
              cssSelector: [".faq-question", ".faq-answer"],
            },
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE },
              {
                "@type": "ListItem",
                position: 2,
                name: "Data protection",
                item: `${SITE}/data-protection`,
              },
            ],
          }
        )}
      />
      <Breadcrumbs trail={[{ name: "Data protection", path: "/data-protection" }]} />

      <PageHeader
        eyebrow="Data protection"
        title="Your retention policy exists."
        accent="Can you prove it runs?"
        lede="Personal data kept out of the analytical layer entirely, retention and destruction that actually happens with an audit trail behind it, and marketing lists traced back to the consent that created them."
      />

      <DataProtection />

      <section className="py-14 md:py-16 border-t border-white/[0.04]">
        <div className="container">
          <h2 className="font-display text-3xl md:text-4xl tracking-tight leading-tight max-w-3xl">
            Common questions
          </h2>
          <div className="mt-8 max-w-3xl divide-y divide-white/[0.06]">
            {dataProtectionFaqs.map(f => (
              <div key={f.q} className="py-6 first:pt-0">
                <h3 className="faq-question text-lg font-semibold tracking-tight leading-snug">
                  {f.q}
                </h3>
                <p className="faq-answer mt-2.5 text-muted-foreground leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <Link href="/how-it-works" className="text-electric hover:underline">
              How the layer works &rarr;
            </Link>
            <Link href="/privacy" className="text-electric hover:underline">
              Our own privacy notice &rarr;
            </Link>
            <Link href="/contact" className="text-electric hover:underline">
              Talk to us &rarr;
            </Link>
          </div>
        </div>
      </section>

      <ContactFooter />
    </>
  );
}
