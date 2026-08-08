import { ImageResponse } from "next/og";
import { OgCard, OG_SIZE, ogFonts, splitHeadline } from "@/components/og-card";
import { posts, getPost, KIND_LABEL, formatDate } from "@/lib/posts";

/**
 * Per-post share cards. A link to an article that shares as the generic company
 * card tells nobody what they are about to read, and social click-through is most
 * of what a piece of writing gets.
 *
 * Built at build time from the same post data as the page, so publishing a post
 * produces its card with it — there is no image to remember to make.
 */
export const size = OG_SIZE;
export const contentType = "image/png";

export const alt = "Acta Data — writing on operational data, reporting and AI agents";

export function generateStaticParams() {
  return posts.map(p => ({ slug: p.slug }));
}

export default async function PostOgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    return new ImageResponse(
      (
        <OgCard
          lines={["The data layer", "AI needs."]}
          sub="Timely data, one source, agents that act — all on Google."
        />
      ),
      { ...size, fonts: ogFonts() }
    );
  }

  const lines = splitHeadline(post.title);
  /* Three lines of a long title at 82px would run off the card, so the type
     steps down as the headline grows. */
  const titleSize = post.title.length > 46 ? 58 : post.title.length > 30 ? 68 : 82;

  return new ImageResponse(
    (
      <OgCard
        kicker={KIND_LABEL[post.kind]}
        lines={lines}
        titleSize={titleSize}
        sub={post.excerpt}
        chips={[
          formatDate(post.published),
          `${post.readingMinutes} min read`,
          ...(post.author ? [post.author] : []),
        ]}
        accentLastChip={false}
      />
    ),
    { ...size, fonts: ogFonts() }
  );
}
