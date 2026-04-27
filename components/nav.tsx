"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

const links = [
  { href: "#problem", label: "Why now" },
  { href: "#what-we-build", label: "What we build" },
  { href: "#summary", label: "The Summary Page" },
  { href: "#engagements", label: "Engagements" },
  { href: "#verticals", label: "Verticals" },
];

/**
 * Nav behaviour:
 *   - The header bar and the Acta Data logo are ALWAYS visible at the top.
 *   - The bar is transparent over the hero, then picks up a navy/70 +
 *     backdrop-blur background once the user scrolls past the hero
 *     (~70% of viewport height).
 *   - Links and CTA buttons stay hidden until that same scroll threshold,
 *     then fade + slide in. This keeps the hero clean while the brand is
 *     never absent from the viewport.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.7);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed top-0 inset-x-0 z-40",
        "transition-[background-color,border-color,backdrop-filter] duration-300 ease-out",
        scrolled
          ? "border-b border-white/[0.06] bg-navy/70 supports-[backdrop-filter]:bg-navy/60 backdrop-blur"
          : "border-b border-transparent bg-transparent",
      ].join(" ")}
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Logo — ALWAYS visible at the top, regardless of scroll position */}
        <Link href="#top" aria-label="Acta Data home" className="flex items-center">
          <Logo />
        </Link>

        {/* Links — revealed only after the hero */}
        <nav
          className={[
            "hidden md:flex items-center gap-7 text-sm text-muted-foreground",
            "transition-all duration-300 ease-out",
            scrolled
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-2 pointer-events-none",
          ].join(" ")}
          aria-hidden={!scrolled}
        >
          {links.map(l => (
            <a key={l.href} href={l.href} className="hover:text-foreground transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA buttons — revealed with the links */}
        <div
          className={[
            "flex items-center gap-2",
            "transition-all duration-300 ease-out",
            scrolled
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-2 pointer-events-none",
          ].join(" ")}
          aria-hidden={!scrolled}
        >
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <a href="#contact">Talk to us</a>
          </Button>
          <Button asChild variant="electric" size="sm">
            <a href="#contact">Book a call →</a>
          </Button>
        </div>
      </div>
    </header>
  );
}
