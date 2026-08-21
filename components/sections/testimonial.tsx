import Link from "next/link";
import { Eyebrow } from "@/components/eyebrow";
import { featuredQuote } from "@/lib/posts";

/**
 * The client quote, as a section. It reads from `featuredQuote()` rather than
 * holding its own copy, so the words on the home page and the words in the case
 * study are the same string or there is no section at all.
 *
 * Renders nothing when nothing is published, which is what lets every page drop
 * it in unconditionally instead of guarding at seven call sites.
 *
 * Two sizes:
 *   default — a full section, for pages where the quote is a beat of its own.
 *   compact — no eyebrow, tighter padding, for pages that already have a lot of
 *             vertical furniture (the home page, which is measured in screens of
 *             thumb on a phone, and the case-studies index).
 *
 * The mark is a real <blockquote> with a <cite> inside its <footer>: this is the
 * one piece of copy on the site written by somebody other than us, and the
 * markup should say so to a crawler as clearly as the styling says it to a
 * reader.
 */
export function Testimonial({
  compact = false,
  eyebrow = "What clients say",
}: {
  compact?: boolean;
  eyebrow?: string;
}) {
  const quote = featuredQuote();
  if (!quote) return null;

  const attribution = [quote.name, quote.role].filter(Boolean).join(" · ");

  return (
    <section
      className={`relative border-t border-white/[0.04] ${
        compact ? "py-14 md:py-16" : "py-16 md:py-24"
      }`}
    >
      <div className="container">
        {!compact && <Eyebrow className="mb-8">{eyebrow}</Eyebrow>}

        <blockquote className="max-w-4xl">
          {/* The opening mark is decorative — the quotation marks around the text
              already do the semantic job, and a screen reader announcing a
              free-floating quote glyph adds nothing. */}
          <span
            aria-hidden
            className="block font-display text-6xl md:text-7xl leading-none text-electric/25 select-none"
          >
            &ldquo;
          </span>

          <p
            className={`-mt-4 md:-mt-6 font-display tracking-tight leading-[1.15] text-foreground/95 ${
              compact ? "text-2xl md:text-4xl" : "text-3xl md:text-5xl"
            }`}
          >
            {quote.text}
          </p>

          <footer className="mt-7 flex flex-wrap items-baseline gap-x-5 gap-y-2 text-sm">
            <cite className="not-italic text-foreground/90">{attribution}</cite>
            <Link href={quote.href} className="text-electric hover:underline">
              Read the case study →
            </Link>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}

/**
 * The same quote at card scale, for slotting beside other content rather than
 * running full-bleed across a page. Used on the pricing page, where a testimonial
 * doing a full section's worth of shouting would sit oddly next to the numbers.
 */
export function TestimonialCard({ className = "" }: { className?: string }) {
  const quote = featuredQuote();
  if (!quote) return null;

  const attribution = [quote.name, quote.role].filter(Boolean).join(" · ");

  return (
    <blockquote
      className={`rounded-2xl border border-electric/25 bg-electric/[0.05] p-7 md:p-9 ${className}`}
    >
      <p className="text-lg md:text-xl leading-relaxed tracking-tight text-foreground/95">
        &ldquo;{quote.text}&rdquo;
      </p>
      <footer className="mt-5 flex flex-wrap items-baseline gap-x-4 gap-y-1.5 text-sm text-muted-foreground">
        <cite className="not-italic">{attribution}</cite>
        <Link href={quote.href} className="text-electric hover:underline">
          Read the case study →
        </Link>
      </footer>
    </blockquote>
  );
}
