import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { Eyebrow } from "@/components/eyebrow";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ContactFooter } from "@/components/sections/contact-footer";
import { PostSection } from "@/components/post-cards";
import { sectors, getSector } from "@/lib/sectors";
import { postsForSector } from "@/lib/posts";
import { entryMonthlyK } from "@/lib/economics";

/** One static page per sector, so each can be landed on and advertised directly. */
export function generateStaticParams() {
  return sectors.map(s => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const sector = getSector(slug);
  if (!sector) return {};
  /* The tagline alone ran 56–81 characters, so search results showed a
     half-empty snippet. Padding it with the opening of the intro takes every
     sector page into the range Google will actually render. */
  const description = `${sector.tagline} ${sector.intro}`.slice(0, 158).trim();
  return {
    title: `${sector.label} data & AI — Acta Data`,
    description,
    alternates: { canonical: `/sectors/${sector.slug}` },
  };
}

export default async function SectorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const sector = getSector(slug);
  if (!sector) notFound();

  const related = postsForSector(sector.slug);
  const others = sectors.filter(s => s.slug !== sector.slug).slice(0, 4);

  return (
    <>
      {/* Label is the H1; the tagline is the lede. Running them together made a
          four-line purple headline nobody would read. */}
      <PageHeader eyebrow={sector.group} title={sector.label} lede={sector.tagline}>
        <p className="max-w-2xl text-muted-foreground leading-relaxed">{sector.intro}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild variant="electric" size="lg">
            <Link href="/contact">Talk about your numbers →</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/how-it-works">See how it works</Link>
          </Button>
        </div>
      </PageHeader>

      {/* The metrics this sector argues about */}
      <section className="py-16 md:py-20 border-b border-white/[0.04]">
        <div className="container">
          <Eyebrow as="h2" className="mb-5">The numbers that matter here</Eyebrow>
          <div className="flex flex-wrap gap-2.5">
            {sector.metrics.map(m => (
              <span
                key={m}
                className="rounded-lg border border-electric/25 bg-electric/[0.06] px-3.5 py-2 text-sm text-foreground/90"
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Pains / builds / outcome */}
      <section className="py-20 md:py-24">
        <div className="container">
          <Eyebrow as="h2" className="mb-8">What we do about it</Eyebrow>
          <div className="grid gap-5 lg:grid-cols-3">
          <Card className="p-7">
            <CardContent className="p-0">
              <Eyebrow as="h3" className="mb-4">Where it hurts</Eyebrow>
              <ul className="space-y-3 text-sm text-foreground/90">
                {sector.pains.map(p => (
                  <li key={p} className="flex gap-2.5">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-amber-300/70" />
                    {p}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="p-7 border-electric/30 bg-gradient-to-b from-electric/[0.05] to-transparent">
            <CardContent className="p-0">
              <Eyebrow as="h3" accent className="mb-4">What Acta builds</Eyebrow>
              <ul className="space-y-3 text-sm text-foreground/90">
                {sector.builds.map(b => (
                  <li key={b} className="flex gap-2.5">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-electric" />
                    {b}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="p-7">
            <CardContent className="p-0">
              <Eyebrow as="h3" className="mb-4">What you get</Eyebrow>
              <p className="text-lg text-foreground/90 leading-relaxed">{sector.outputs}</p>
              <p className="mt-5 text-sm text-muted-foreground leading-relaxed">
                Live in months rather than years, from £{entryMonthlyK}k a month, on your own
                Google environment — handed over to you, or run by us.
              </p>
            </CardContent>
          </Card>
          </div>
        </div>
      </section>

      {/* Renders only when something has been written about this sector. */}
      <PostSection
        posts={related}
        heading="Proof and thinking"
        title={`What this looks like in ${sector.label.toLowerCase()}.`}
        cta={{ href: "/blog", label: "All writing →" }}
      />

      {/* Cross-links, so a landing page is a route into the site rather than a dead end */}
      <section className="py-20 md:py-24 border-t border-white/[0.04]">
        <div className="container">
          <Eyebrow as="h2" className="mb-6">Other sectors</Eyebrow>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {others.map(s => (
              <Link
                key={s.slug}
                href={`/sectors/${s.slug}`}
                className="group rounded-xl border border-white/[0.07] bg-navy-100/40 p-5 transition-colors hover:border-electric/30"
              >
                <div className="text-sm font-semibold tracking-tight group-hover:text-electric transition-colors">
                  {s.label}
                </div>
                <div className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                  {s.tagline}
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/sectors" className="text-sm text-electric hover:underline">
              All sectors →
            </Link>
          </div>
        </div>
      </section>

      <ContactFooter />
    </>
  );
}
