"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

const links = [
  { href: "#stack", label: "The stack" },
  { href: "#crew", label: "The crew" },
  { href: "#what-we-build", label: "What we build" },
  { href: "#engagements", label: "Engagements" },
  { href: "#verticals", label: "Verticals" },
  { href: "#pricing", label: "Pricing" },
];

/**
 * Nav behaviour:
 *   - Header BAR (backdrop, border) and the LOGO + CTA buttons are ALWAYS
 *     visible from page load.
 *   - Centered nav LINKS are hidden on load and only fade in once the user
 *     scrolls past the hero (~70% of viewport height).
 *   - Do not hide the logo or the CTAs on scroll.
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
    <header className="fixed top-0 inset-x-0 z-40 border-b border-white/[0.06] bg-navy/70 supports-[backdrop-filter]:bg-navy/60 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-4">
        {/* Logo — always visible */}
        <Link href="#top" aria-label="Acta Data home" className="flex items-center shrink-0">
          <Logo />
        </Link>

        {/* Centered nav links — hidden on load, revealed after the hero.
            Each link carries its own transition with a staggered delay, so they
            cascade in left-to-right and retreat right-to-left rather than
            crossfading as one flat block. The stagger is the movement; there is
            no decorative element behind it. */}
        <nav
          className={[
            "hidden md:flex items-center gap-7 text-sm text-muted-foreground",
            "nav-stagger",
            scrolled ? "pointer-events-auto" : "pointer-events-none",
          ].join(" ")}
          aria-hidden={!scrolled}
        >
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              className={[
                "transition-[opacity,transform,filter] ease-out",
                "hover:text-foreground",
                scrolled
                  ? "opacity-100 translate-y-0 blur-0"
                  : "opacity-0 -translate-y-1.5 blur-[2px]",
              ].join(" ")}
              style={{
                // Duration set inline, not via duration-[420ms]: the arbitrary
                // Tailwind class was silently not generated, leaving the 150ms
                // default and killing the cascade.
                transitionDuration: "420ms",
                // Reveal left-to-right; on the way out, reverse it so the last
                // link leaves first and the eye follows the same direction back.
                transitionDelay: `${(scrolled ? i : links.length - 1 - i) * 55}ms`,
              }}
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Single CTA — always visible */}
        <div className="shrink-0">
          <Button asChild variant="electric" size="sm">
            <a href="#contact">Talk to us</a>
          </Button>
        </div>
      </div>
    </header>
  );
}
