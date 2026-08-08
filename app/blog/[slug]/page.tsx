import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { Eyebrow } from "@/components/eyebrow";
import { Card, CardContent } from "@/components/ui/card";
import { PostCards } from "@/components/post-cards";
import { ContactFooter } from "@/components/sections/contact-footer";
import { allPosts, getPost, posts, formatDate, KIND_LABEL, type PostBlock } from "@/lib/posts";
import { getSector } from "@/lib/sectors";

export function generateStaticParams() {
  return posts.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Acta Data`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.published,
    },
  };
}

/** Prose blocks. Kept small on purpose — four types cover everything we write. */
function Block({ block }: { block: PostBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="font-display text-2xl md:text-3xl tracking-tight leading-tight pt-4">
          {block.text}
        </h2>
      );
    case "ul":
      return (
        <ul className="space-y-3">
          {block.items.map(item => (
            <li key={item} className="flex gap-3 text-foreground/90 leading-relaxed">
              <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-electric" />
              {item}
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote className="border-l-2 border-electric/50 pl-5 md:pl-6 my-2">
          <p className="font-display text-xl md:text-2xl leading-snug tracking-tight text-foreground/95">
            {block.text}
          </p>
          {block.attribution && (
            <footer className="mt-3 text-sm text-muted-foreground">{block.attribution}</footer>
          )}
        </blockquote>
      );
    default:
      return <p className="text-lg text-foreground/85 leading-relaxed">{block.text}</p>;
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const sector = post.sector ? getSector(post.sector) : undefined;
  const isStudy = post.kind === "case-study";

  /* The three case-study blocks only render when they carry something, so a
     half-written study degrades to a normal article rather than to empty
     headings. */
  const studyBlocks: [string, string[]][] = [
    ["The situation", post.situation ?? []],
    ["What we built", post.work ?? []],
    ["What changed", post.outcome ?? []],
  ];

  const more = allPosts()
    .filter(p => p.slug !== post.slug)
    .slice(0, 3);

  return (
    <>
      <PageHeader
        eyebrow={isStudy && post.client ? post.client : KIND_LABEL[post.kind]}
        title={post.title}
        lede={post.excerpt}
      >
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
          <span>{formatDate(post.published)}</span>
          <span>{post.readingMinutes} min read</span>
          {post.author && <span>{post.author}</span>}
          {sector && (
            <Link href={`/sectors/${sector.slug}`} className="text-electric hover:underline">
              {sector.label} →
            </Link>
          )}
        </div>
      </PageHeader>

      {isStudy && post.stats && post.stats.length > 0 && (
        <section className="py-14 border-b border-white/[0.04]">
          <div className="container grid grid-cols-2 lg:grid-cols-4 gap-5">
            {post.stats.map(s => (
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

      <article className="py-20 md:py-24">
        {/* Left-aligned to the same axis as the PageHeader above. A centred
            measure column here put the first paragraph 250px right of the H1. */}
        <div className="container">
          <div className="max-w-3xl">
          {isStudy && (
            <div className="space-y-14 mb-14">
              {studyBlocks.map(([heading, items]) =>
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
            </div>
          )}

          {post.body.length > 0 && (
            <div className="space-y-6">
              {post.body.map((b, i) => (
                <Block key={i} block={b} />
              ))}
            </div>
          )}

          {post.quote && (
            <blockquote className="mt-14 rounded-2xl border border-electric/25 bg-electric/[0.05] p-7 md:p-9">
              <p className="text-xl md:text-2xl leading-relaxed tracking-tight text-foreground/95">
                &ldquo;{post.quote.text}&rdquo;
              </p>
              {(post.quote.name || post.quote.role) && (
                <footer className="mt-5 text-sm text-muted-foreground">
                  {[post.quote.name, post.quote.role].filter(Boolean).join(" · ")}
                </footer>
              )}
            </blockquote>
          )}

          <div className="mt-14 pt-8 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-4 text-sm">
            <Link href="/blog" className="text-electric hover:underline">
              ← All writing
            </Link>
            <Link href="/contact" className="text-electric hover:underline">
              Talk to us about your data layer →
            </Link>
            </div>
          </div>
        </div>
      </article>

      {more.length > 0 && (
        <section className="py-20 md:py-24 border-t border-white/[0.04]">
          <div className="container">
            <Eyebrow className="mb-8">Keep reading</Eyebrow>
            <PostCards posts={more} columns={more.length >= 3 ? 3 : 2} />
          </div>
        </section>
      )}

      <ContactFooter />
    </>
  );
}
