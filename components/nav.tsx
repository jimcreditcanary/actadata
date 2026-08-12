"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { hasCaseStudies, hasPosts } from "@/lib/posts";

/**
 * Real routes now, not anchors — the site is sectioned so each area can be
 * landed on directly and linked to from campaigns.
 *
 * The case-studies and writing links only exist when there is something to read,
 * so an empty section can never be discovered.
 *
 * NAV WIDTH: eight links fit one row down to 1024px with 75px of clearance to the
 * CTA — measured, not guessed. Seven render today because "Case studies" is gated
 * off until one is published; that publication takes it to eight, which still fits.
 * A ninth will not. Add one and something has to come out.
 *
 * Links no longer hide until scroll: on a multi-page site the nav is how you get
 * around, and hiding it on every page load was costing navigation to save the
 * hero some room.
 */
const links: { href: string; label: string; needsCaseStudies?: boolean; needsPosts?: boolean }[] = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/what-we-build", label: "What we build" },
  { href: "/sectors", label: "Sectors" },
  { href: "/case-studies", label: "Case studies", needsCaseStudies: true },
  { href: "/blog", label: "Writing", needsPosts: true },
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu on navigation, or it stays open over the new page.
  useEffect(() => setOpen(false), [pathname]);

  const visible = links.filter(
    l => (!l.needsCaseStudies || hasCaseStudies()) && (!l.needsPosts || hasPosts())
  );

  return (
    <header className="fixed top-0 inset-x-0 z-40 border-b border-white/[0.06] bg-navy/70 supports-[backdrop-filter]:bg-navy/60 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link href="/" aria-label="Acta Data home" className="flex items-center shrink-0">
          <Logo />
        </Link>

        <nav className="hidden lg:flex items-center gap-7 text-sm">
          {visible.map(l => {
            const active = pathname === l.href || pathname.startsWith(`${l.href}/`);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground transition-colors"
                }
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <Button asChild variant="electric" size="sm">
            <Link href="/contact">Talk to us</Link>
          </Button>
          <button
            type="button"
            onClick={() => setOpen(o => !o)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="lg:hidden rounded-lg border border-white/[0.08] px-3 py-1.5 text-sm text-muted-foreground"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {open && (
        <nav className="lg:hidden border-t border-white/[0.06] bg-navy/95 backdrop-blur">
          <div className="container py-3 flex flex-col">
            {visible.map(l => (
              <Link
                key={l.href}
                href={l.href}
                className="py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
