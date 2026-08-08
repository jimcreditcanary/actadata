import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContactFooter } from "@/components/sections/contact-footer";

export const metadata: Metadata = {
  title: "Talk to us",
  description:
    "Bring one decision your data should be helping you make. 30 minutes, no deck. We'll tell you what we'd ship in the first 30 days.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs trail={[{name: "Contact",path: "/contact"}]} />
      <PageHeader
        eyebrow="Talk to us"
        title="Bring one decision"
        accent="your data should be helping you make."
        lede="30 minutes, no deck. We'll tell you on the call whether we're the right partner, and exactly what we'd ship in the first 30 days. All we need to start is read access with personal data excluded."
      />
      <ContactFooter />
    </>
  );
}
