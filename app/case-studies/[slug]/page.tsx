import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { Eyebrow } from "@/components/eyebrow";
import { Card, CardContent } from "@/components/ui/card";
import { ContactFooter } from "@/components/sections/contact-footer";
import { caseStudies, getCaseStudy } from "@/lib/case-studies";
import { getSector } from "@/lib/sectors";

export function generateStaticParams() {
  return caseStudies.map(c => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  return {
    title: `${cs.headline} — Acta Data`,
    description: cs.summary,
    alternates: { canonical: `/case-studies/${cs.slug}` },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  const sector = getSector(cs.sector);
  const blocks: [string, string[]][] = [
    ["The situation", cs.situation],
    ["What we built", cs.work],
    ["What changed", cs.outcome],
  ];

  return (
    <>
      <PageHeader eyebrow={cs.client} title={cs.headline} lede={cs.summary}>
        {sector && (
          <Link href={`/sectors/${sector.slug}`} className="text-sm text-electric hover:underline">
            {sector.label} →
          </Link>
        )}
      </PageHeader>

      {cs.stats.length > 0 && (
        <section className="py-14 border-b border-white/[0.04]">
          <div className="container grid grid-cols-2 lg:grid-cols-4 gap-5">
            {cs.stats.map(s => (
              <Card key={s.label} className="p-6">
                <CardContent className="p-0">
                  <div className="font-display text-3xl md:text-4xl tracking-tight text-electric">
                    {s.figure}
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground leading-snug">{s.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      <section className="py-20 md:py-24">
        <div className="container max-w-3xl space-y-14">
          {blocks.map(([heading, items]) =>
            items.length === 0 ? null : (
              <div key={heading}>
                <Eyebrow className="mb-5">{heading}</Eyebrow>
                <ul className="space-y-3.5">
                  {items.map(item => (
                    <li key={item} className="flex gap-3 text-foreground/90 leading-relaxed">
                      <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-electric" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}

          {cs.quote && (
            <blockquote className="rounded-2xl border border-electric/25 bg-electric/[0.05] p-7 md:p-9">
              <p className="text-xl md:text-2xl leading-relaxed tracking-tight text-foreground/95">
                “{cs.quote.text}”
              </p>
              {(cs.quote.name || cs.quote.role) && (
                <footer className="mt-5 text-sm text-muted-foreground">
                  {[cs.quote.name, cs.quote.role].filter(Boolean).join(" · ")}
                </footer>
              )}
            </blockquote>
          )}

          <div className="pt-2">
            <Link href="/case-studies" className="text-sm text-electric hover:underline">
              ← All case studies
            </Link>
          </div>
        </div>
      </section>

      <ContactFooter />
    </>
  );
}
