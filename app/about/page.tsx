import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Crew } from "@/components/sections/crew";
import { HowWeWork } from "@/components/sections/how-we-work";
import { ContactFooter } from "@/components/sections/contact-footer";

export const metadata: Metadata = {
  title: "About: operators first, data people second",
  description:
    "Data and AI people who have held C-suite positions across marketing, operations, technology and product — in blue-chip brands and founder-led SMEs.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs trail={[{name: "About",path: "/about"}]} />
      <PageHeader
        eyebrow="About"
        title="Operators first."
        accent="Data people second."
        lede="We have run these businesses, not just advised them. Open about what we find, at the front edge of what AI can actually do, and working towards the point where you no longer need us."
      />
      <Crew />
      <HowWeWork />
      <ContactFooter />
    </>
  );
}
