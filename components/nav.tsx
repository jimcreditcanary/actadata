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
  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-navy/70 backdrop-blur supports-[backdrop-filter]:bg-navy/60">
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
