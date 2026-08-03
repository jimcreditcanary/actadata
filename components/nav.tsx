"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

const links = [
  { href: "#problem", label: "The problem" },
  { href: "#what-we-build", label: "What we build" },
  { href: "#summary", label: "The Summary Page" },
  { href: "#engagements", label: "Engagements" },
  { href: "#verticals", label: "Verticals" },
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

        {/* Centered nav links — hidden on load, revealed after the hero */}
        <nav
          className={[
            "hidden md:flex items-center gap-7 text-sm text-muted-foreground",
            "transition-all duration-300 ease-out",
            scrolled
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-1 pointer-events-none",
          ].join(" ")}
          aria-hidden={!scrolled}
        >
          {links.map(l => (
            <a key={l.href} href={l.href} className="hover:text-foreground transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA buttons — always visible */}
        <div className="flex items-center gap-2 shrink-0">
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
