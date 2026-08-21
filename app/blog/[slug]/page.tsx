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
import { JsonLd } from "@/components/json-ld";
import { graph, breadcrumbs, ORG_ID, SITE } from "@/lib/seo";

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
    title: post.seoTitle ?? post.title,
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

  /* A case study is an Article; an insight is a BlogPosting. Both carry the
     author, the dates and the publisher, which is what makes a piece quotable
     with attribution rather than an anonymous page. */
  const words = [post.excerpt, ...post.body.map(b => ("text" in b ? b.text : b.items.join(" ")))]
    .join(" ")
    .split(/\s+/).length;

  return (
    <>
      <JsonLd
        data={graph(
          {
            "@type": isStudy ? "Article" : "BlogPosting",
            "@id": `${SITE}/blog/${post.slug}#article`,
            headline: post.title,
            description: post.excerpt,
            url: `${SITE}/blog/${post.slug}`,
            datePublished: post.published,
            dateModified: post.published,
            inLanguage: "en-GB",
            wordCount: words,
            timeRequired: `PT${post.readingMinutes}M`,
            articleSection: KIND_LABEL[post.kind],
            author: post.author
              ? { "@type": "Person", name: post.author, worksFor: { "@id": ORG_ID } }
              : { "@id": ORG_ID },
            publisher: { "@id": ORG_ID },
            image: `${SITE}/opengraph-image`,
            mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/blog/${post.slug}` },
            about: sector ? { "@type": "Thing", name: sector.label } : undefined,
            /* The named client as an entity, so an assistant asked "who has Acta
               Data worked with" can resolve the relationship rather than having
               to parse it out of the prose. */
            mentions: post.client ? { "@type": "Organization", name: post.client } : undefined,
            /* The one-pager, declared as the same work in another format. */
            associatedMedia: post.pdf
              ? {
                  "@type": "MediaObject",
                  contentUrl: `${SITE}${post.pdf}`,
                  encodingFormat: "application/pdf",
                  name: `${post.title} — one-page PDF`,
                }
              : undefined,
          },
          breadcrumbs([
            { name: "Writing", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ])
        )}
      />

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
          {post.pdf && (
            <a href={post.pdf} download className="text-electric hover:underline">
              Download the one-page PDF ↓
            </a>
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

      {/* The quote leads rather than trails. Buried under 1,200 words it was read
          by the people who least needed convincing; here it sits directly under
          the figures, where the client corroborates them before we start
          explaining. */}
      {post.quote && (
        <section className="py-14 md:py-16 border-b border-white/[0.04]">
          <div className="container">
            <blockquote className="max-w-4xl">
              <span
                aria-hidden
                className="block font-display text-6xl md:text-7xl leading-none text-electric/25 select-none"
              >
                &ldquo;
              </span>
              <p className="-mt-4 md:-mt-6 font-display text-2xl md:text-4xl tracking-tight leading-[1.15] text-foreground/95">
                {post.quote.text}
              </p>
              {(post.quote.name || post.quote.role) && (
                <footer className="mt-6 text-sm text-muted-foreground">
                  <cite className="not-italic">
                    {[post.quote.name, post.quote.role].filter(Boolean).join(" · ")}
                  </cite>
                </footer>
              )}
            </blockquote>
          </div>
        </section>
      )}

      <article className="py-14 md:py-16">
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

          {/* The quote now sits above the article, so what belongs at the end is
              the thing a convinced reader wants next: the page on paper. */}
          {post.pdf && (
            <a
              href={post.pdf}
              download
              className="group mt-14 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-electric/25 bg-electric/[0.05] p-7 md:p-8"
            >
              <div>
                <div className="font-display text-xl tracking-tight">
                  This case study on one page
                </div>
                <div className="mt-1.5 text-sm text-muted-foreground">
                  A single-sheet PDF, for forwarding to whoever else needs to see it.
                </div>
              </div>
              <span className="text-sm text-electric group-hover:underline">Download ↓</span>
            </a>
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
        <section className="py-14 md:py-16 border-t border-white/[0.04]">
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
