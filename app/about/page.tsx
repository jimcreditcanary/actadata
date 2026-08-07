import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Crew } from "@/components/sections/crew";
import { ContactFooter } from "@/components/sections/contact-footer";

export const metadata: Metadata = {
  title: "About — Acta Data",
  description:
    "Data and AI people who have held C-suite positions across marketing, operations, technology and product — in blue-chip brands and founder-led SMEs.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Operators first."
        accent="Data people second."
        lede="We have run these businesses, not just advised them. That is what lets us find the handful of numbers that move your outcome instead of instrumenting everything and hoping."
      />
      <Crew />
      <ContactFooter />
    </>
  );
}
