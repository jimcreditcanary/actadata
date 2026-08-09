import Link from "next/link";
import { Eyebrow } from "@/components/eyebrow";
import { getSector } from "@/lib/sectors";
import { KIND_LABEL, formatDate, type Post } from "@/lib/posts";

/**
 * One card for both kinds of post. A case study shows its client and headline
 * figures; an insight shows the date and reading time. Everything else — the
 * frame, the hover, the link target — is identical, because they are the same
 * kind of object as far as a reader is concerned.
 *
 * Renders nothing when the list is empty, so callers can drop it in
 * unconditionally rather than guarding at every call site.
 */
export function PostCards({
  posts,
  columns = 2,
  /** 2 on an index page where the cards are the page content, 3 inside a
      section that already has its own h2 above them. */
  headingLevel = 3,
}: {
  posts: Post[];
  columns?: 2 | 3;
  headingLevel?: 2 | 3;
}) {
  if (posts.length === 0) return null;
  const Heading = headingLevel === 2 ? "h2" : "h3";

  return (
    <div className={`grid gap-5 ${columns === 3 ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2"}`}>
      {posts.map(p => {
        const sector = p.sector ? getSector(p.sector) : undefined;
        const isStudy = p.kind === "case-study";
        return (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="group flex flex-col rounded-2xl border border-white/[0.08] bg-card/50 p-6 md:p-7 transition-colors hover:border-electric/30"
          >
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              <span className="text-electric">{KIND_LABEL[p.kind]}</span>
              {sector && <span>{sector.label}</span>}
              {isStudy && p.client && <span>{p.client}</span>}
            </div>

            <Heading className="mt-4 text-xl font-semibold tracking-tight leading-snug group-hover:text-electric transition-colors">
              {p.title}
            </Heading>
            <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed">{p.excerpt}</p>

            {isStudy && p.stats && p.stats.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
                {p.stats.slice(0, 3).map(s => (
                  <div key={s.label}>
                    <div className="font-display text-2xl tracking-tight text-electric">
                      {s.figure}
                    </div>
                    <div className="mt-0.5 text-xs text-muted-foreground">{s.label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* mt-auto keeps this footer on the bottom edge so cards of different
                copy lengths still line up along the row. */}
            <div className="mt-auto pt-6 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <span className="text-sm text-foreground/80 group-hover:text-electric transition-colors">
                {isStudy ? "Read the detail →" : "Read →"}
              </span>
              <span>
                {formatDate(p.published)} · {p.readingMinutes} min read
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

/** Section wrapper for use on the home and sector pages. */
export function PostSection({
  posts,
  heading = "Writing",
  title = "How we think about this.",
  cta,
}: {
  posts: Post[];
  heading?: string;
  title?: string;
  cta?: { href: string; label: string };
}) {
  if (posts.length === 0) return null;

  return (
    <section className="relative py-16 md:py-20 border-t border-white/[0.04]">
      <div className="container">
        <div className="max-w-3xl">
          <Eyebrow className="mb-5">{heading}</Eyebrow>
          <h2 className="font-display text-4xl md:text-5xl tracking-tight leading-[1.05]">
            {title}
          </h2>
        </div>
        <div className="mt-10">
          <PostCards posts={posts} columns={posts.length >= 3 ? 3 : 2} />
        </div>
        {cta && (
          <div className="mt-8">
            <Link href={cta.href} className="text-sm text-electric hover:underline">
              {cta.label}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
