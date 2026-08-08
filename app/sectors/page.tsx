import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Eyebrow } from "@/components/eyebrow";
import { ContactFooter } from "@/components/sections/contact-footer";
import { sectorGroups, sectorsByGroup } from "@/lib/sectors";

export const metadata: Metadata = {
  title: "Sectors — Acta Data",
  description:
    "Data and AI delivery across consumer credit, debt management, credit unions, B2B services, wholesale, manufacturing, retail, legal, customer service, recruitment and SaaS.",
  alternates: { canonical: "/sectors" },
};

export default function SectorsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Sectors"
        title="We already know your value streams."
        accent="Find where yours leaks."
        lede="Every sector argues about different numbers. We have built the layer underneath those arguments before, which is why we can start with your metrics rather than a discovery phase."
      />

      <section className="py-20 md:py-24">
        <div className="container space-y-16">
          {sectorGroups.map(group => (
            <div key={group}>
              <Eyebrow className="mb-6">{group}</Eyebrow>
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {sectorsByGroup(group).map(s => (
                  <Link
                    key={s.slug}
                    href={`/sectors/${s.slug}`}
                    className="group flex flex-col rounded-2xl border border-white/[0.08] bg-card/50 p-6 transition-colors hover:border-electric/30"
                  >
                    <h2 className="text-lg font-semibold tracking-tight group-hover:text-electric transition-colors">
                      {s.label}
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {s.tagline}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {s.metrics.slice(0, 3).map(m => (
                        <span
                          key={m}
                          className="rounded-md border border-white/[0.07] bg-navy-100/50 px-2 py-1 text-[11px] text-muted-foreground"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                    <div className="mt-auto pt-6 text-sm text-foreground/80 group-hover:text-electric transition-colors">
                      What we build →
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <p className="text-sm text-muted-foreground">
            Not listed? The sector changes; the value streams rhyme. We have also delivered in
            financial services consultancy, consumer-facing AI and public sector —{" "}
            <Link href="/contact" className="text-electric hover:underline">
              tell us what you measure
            </Link>
            .
          </p>
        </div>
      </section>

      <ContactFooter />
    </>
  );
}
