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

export function Nav() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // reveal once the user has scrolled ~70% of one viewport (i.e. past the hero)
      setShow(window.scrollY > window.innerHeight * 0.7);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed top-0 inset-x-0 z-40 border-b border-white/[0.06]",
        "bg-navy/70 backdrop-blur supports-[backdrop-filter]:bg-navy/60",
        "transition-all duration-300 ease-out",
        show
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-4 pointer-events-none",
      ].join(" ")}
      aria-hidden={!show}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="#top" aria-label="Acta Data home"><Logo /></Link>
        <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
          {links.map(l => (
            <a key={l.href} href={l.href} className="hover:text-foreground transition-colors">{l.label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
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
