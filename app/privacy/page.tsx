import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Privacy notice — Acta Data",
  description:
    "How Acta Data Ltd handles personal data: what this website collects, what happens when you email us, and your rights.",
  alternates: { canonical: "/privacy" },
};

/**
 * Facts stated here are verified against the site as built:
 *   - no analytics, tag manager or tracking scripts in the source
 *   - no Set-Cookie headers in production responses
 *   - no third-party hosts requested by the page (fonts are self-hosted)
 * If any of that changes, this notice must change with it.
 */
const LAST_UPDATED = "3 August 2026";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold tracking-tight text-foreground">{title}</h2>
      <div className="mt-3 space-y-3 text-muted-foreground leading-relaxed">{children}</div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <div className="relative">
      <div className="container pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="mx-auto max-w-3xl">
          <Badge variant="muted" className="mb-5">Legal</Badge>
          <h1 className="font-display text-4xl md:text-5xl tracking-tight leading-[1.05]">
            Privacy notice
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            This notice explains what happens to personal data when you visit this website
            or get in touch with us. It is deliberately short, because we collect very
            little.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">Last updated {LAST_UPDATED}</p>

          <Section title="Who we are">
            <p>
              Acta Data Ltd is a private limited company registered in England &amp; Wales,
              company number 14182372, with its registered office at Chester House, Lloyd
              Drive, Cheshire Oaks Business Park, Ellesmere Port, Cheshire CH65 9HQ.
            </p>
            <p>
              We are the data controller for the personal data described here, and we are
              registered with the Information Commissioner&apos;s Office under reference{" "}
              <a
                href="https://ico.org.uk/ESDWebPages/Entry/ZB502441"
                className="text-electric hover:underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                ZB502441
              </a>
              . You can reach us at{" "}
              <a href="mailto:hello@actadata.co.uk" className="text-electric hover:underline">
                hello@actadata.co.uk
              </a>
              .
            </p>
          </Section>

          <Section title="What this website collects">
            <p>
              Nothing. This site sets no cookies, runs no analytics, and loads no
              third-party scripts, fonts or trackers. There are no forms — the only way to
              contact us from here is the email link, which opens your own email client.
            </p>
            <p>
              There is no cookie banner because there is nothing to consent to. If we ever
              add analytics, we will update this notice and ask you first where the law
              requires it.
            </p>
          </Section>

          <Section title="Server logs">
            <p>
              The site is hosted by Vercel Inc., which processes standard server logs on our
              behalf — including your IP address, the pages requested, and your browser
              user-agent. These are used only to deliver the site and to protect it from
              abuse, and we do not combine them with anything else or use them to build a
              profile of you.
            </p>
            <p>
              Our lawful basis is legitimate interests (keeping the site available and
              secure). Vercel acts as our processor under a data-processing agreement.
            </p>
          </Section>

          <Section title="When you email us">
            <p>
              If you email us we will hold your name, email address and whatever you send,
              so that we can reply and take the conversation forward. Our lawful basis is
              legitimate interests — responding to someone who has asked to speak to us —
              and, once we are working together, performance of a contract.
            </p>
            <p>
              We keep enquiry correspondence for up to 24 months from our last exchange,
              then delete it. If an enquiry becomes a client engagement, we keep records for
              as long as we need them for that engagement and for six years afterwards to
              meet our legal and accounting obligations.
            </p>
            <p>
              We do not sell your data, and we do not add you to a marketing list on the
              strength of an enquiry.
            </p>
          </Section>

          <Section title="Client data we handle during engagements">
            <p>
              When we build data platforms for clients, that work is governed by the
              contract and data-processing terms agreed with that client, not by this
              notice. In those engagements we act as a processor on the client&apos;s
              instructions, and our default is to work with non-identifying data wherever the
              task allows it.
            </p>
          </Section>

          <Section title="Your rights">
            <p>
              You have the right to ask for a copy of the personal data we hold about you, to
              have it corrected or deleted, to object to or restrict how we use it, and to
              ask us to transfer it elsewhere. Email us and we will respond within one month.
            </p>
            <p>
              If you are unhappy with how we have handled your data you can complain to the
              Information Commissioner&apos;s Office at{" "}
              <a
                href="https://ico.org.uk"
                className="text-electric hover:underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                ico.org.uk
              </a>
              , or by calling 0303 123 1113. We would rather you came to us first so we can
              put it right.
            </p>
          </Section>

          <Section title="Changes to this notice">
            <p>
              If we change how we handle personal data we will update this page and change
              the date at the top.
            </p>
          </Section>

          <div className="mt-14 pt-8 border-t border-white/[0.06]">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              ← Back to actadata.co.uk
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
