import {
  tiers,
  discoveryOneOffK,
  discoveryCreditNote,
  entryYearK,
  entryMonthlyK,
  wholeBusinessYearK,
  wholeBusinessMonthlyK,
  maintenanceMonthlyK,
  seniorHireLoadedK,
} from "@/lib/economics";
import { sectors } from "@/lib/sectors";

/**
 * Structured data, in one place.
 *
 * Two audiences read this and neither of them reads the CSS: Google's rich-result
 * parsers, and the retrieval layer behind AI assistants. Both reward pages that
 * state plainly what the company is, what it sells, what it costs and who it is
 * for — as data rather than as prose. Every value here is drawn from the same
 * constants the visible copy uses, so schema and page can never disagree.
 */
export const SITE = "https://www.actadata.co.uk";

export const ORG_ID = `${SITE}/#organisation`;
export const SITE_ID = `${SITE}/#website`;
export const SERVICE_ID = `${SITE}/#service`;

const EMAIL = "info@actadata.co.uk";

export const organisation = {
  "@type": ["Organization", "ProfessionalService"],
  "@id": ORG_ID,
  name: "Acta Data",
  legalName: "Acta Data Ltd",
  url: SITE,
  email: EMAIL,
  logo: { "@type": "ImageObject", url: `${SITE}/opengraph-image`, width: 1200, height: 630 },
  image: `${SITE}/opengraph-image`,
  description:
    "Acta Data builds the operational data layer that AI needs — event history in Google BigQuery, reporting people actually open, and Claude wired in for safe self-service analytics. Live in weeks, handed over inside a year.",
  slogan: "The data layer AI needs.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Chester House, Lloyd Drive, Cheshire Oaks Business Park",
    addressLocality: "Ellesmere Port",
    addressRegion: "Cheshire",
    postalCode: "CH65 9HQ",
    addressCountry: "GB",
  },
  areaServed: { "@type": "Country", name: "United Kingdom" },
  /* Company and ICO registrations, so an assistant asked "is Acta Data a real
     registered company" has the answer in machine-readable form. */
  identifier: [
    { "@type": "PropertyValue", name: "Companies House company number", value: "14182372" },
    { "@type": "PropertyValue", name: "ICO registration", value: "ZB502441" },
  ],
  knowsAbout: [
    "Google BigQuery",
    "Google Cloud Platform",
    "Data warehousing",
    "Event-sourced data modelling",
    "Activity schema",
    "Balanced scorecard reporting",
    "Management information",
    "Consumer Duty reporting",
    "IFRS 9 and credit risk reporting",
    "AI agents in operations",
    "Institutional memory and knowledge retention",
    "Policy-aligned recommendation engines",
    "Next best action",
    "Claude for self-service analytics",
    "Value stream mapping",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: EMAIL,
    areaServed: "GB",
    availableLanguage: "English",
  },
};

export const website = {
  "@type": "WebSite",
  "@id": SITE_ID,
  url: SITE,
  name: "Acta Data",
  inLanguage: "en-GB",
  publisher: { "@id": ORG_ID },
};

/** The offer itself, priced, so "what does it cost" is answerable without a call. */
export const service = {
  "@type": "Service",
  "@id": SERVICE_ID,
  name: "Operational data layer and AI enablement",
  serviceType: "Data and AI consultancy",
  provider: { "@id": ORG_ID },
  areaServed: { "@type": "Country", name: "United Kingdom" },
  audience: {
    "@type": "BusinessAudience",
    name: "Mid-market and SME operators",
    audienceType: sectors.map(s => s.label).join(", "),
  },
  description:
    "A working data function without hiring one: every source landed in your own Google BigQuery environment as immutable events, a modelled metric layer, board and regulatory reporting, a Summary Page balanced scorecard, safe self-service analytics through Claude, and AI agents on the repetitive operational work. Handed over Terraformed inside twelve months.",
  offers: {
    "@type": "OfferCatalog",
    name: "Tiers, priced by scope",
    itemListElement: [
      {
        "@type": "Offer",
        name: "Discovery — value stream map and AI readiness review",
        description:
          `One-off engagement, no commitment. Your value streams mapped end to end, the value leaks quantified, an assessment of what your data can support today, the watch-outs before you point AI at it, and a build plan and strategy you own outright and can hand to anyone. ${discoveryCreditNote} if you go on to build with us, so it acts as a down payment rather than a fee.`,
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: discoveryOneOffK * 1000,
          priceCurrency: "GBP",
          unitText: "one-off",
        },
      },
      {
        "@type": "Offer",
        name: "One area — a single problem solved end to end",
        description:
          "One value stream, usually operations, built end to end in your own Google environment: sources connected, full event history, metric tree and the Summary Page live for that area.",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: entryMonthlyK * 1000,
          priceCurrency: "GBP",
          billingDuration: "P1M",
          unitText: "per month, " + entryYearK + "k per year",
        },
      },
      {
        "@type": "Offer",
        name: "Whole business — every value stream, plus self-service analytics",
        description:
          "Every value stream in the business on one layer with one set of definitions, the full reporting suite including regulated reporting, and safe PII-restricted self-service analytics through Claude in your own enterprise account.",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: wholeBusinessMonthlyK * 1000,
          priceCurrency: "GBP",
          billingDuration: "P1M",
          unitText: "per month, " + wholeBusinessYearK + "k per year",
        },
      },
      {
        "@type": "Offer",
        name: "Enterprise — autonomous agents",
        description:
          "Adds AI agents working the exceptions inside your operation. Scoped and priced against the outcome it delivers.",
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "GBP",
          description: tiers.enterprise.note,
        },
      },
      {
        "@type": "Offer",
        name: "Post-handover maintenance",
        description:
          "Optional after the twelve-month build, on a rolling monthly contract with no notice period: monitoring, fixes and upgrades so nothing falls over. Additional datasets and training packages are agreed as projects.",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: maintenanceMonthlyK * 1000,
          priceCurrency: "GBP",
          billingDuration: "P1M",
          unitText: "per month",
        },
      },
    ],
  },
};

/**
 * Questions real buyers ask on the first call, answered in full.
 *
 * This is the single highest-value block on the site for AI discovery: an
 * assistant asked "how much does a data layer cost" or "can I keep my data in my
 * own cloud" retrieves answers, not marketing. Every answer here must stay true
 * to the rest of the site — they are the same commitments, written plainly.
 */
export const faqs: { q: string; a: string }[] = [
  {
    q: "What does Acta Data actually do?",
    a: `We build the data layer a business needs to run on, and then the AI on top of it. Every system you own gets connected and landed in your own Google BigQuery environment as events that are recorded once and never rewritten. On top of that we build the modelled metrics, the board and regulatory reporting, and a Summary Page that shows the whole business against target. Then we wire in Claude so your team can ask their own questions, and put agents onto the repetitive operational work.`,
  },
  {
    q: "How much does it cost?",
    a: `Four options, priced by how much of the business is in scope. Discovery is a £${discoveryOneOffK}k one-off: the value stream map, the AI readiness review, the watch-outs and a build plan you own and can hand to anyone — there is no obligation to use us afterwards — and if you do go ahead with a build, the whole £${discoveryOneOffK}k is credited against it. Solving one area, usually operations, is £${entryYearK}k a year, billed monthly at £${entryMonthlyK}k. Mapping the whole business, with safe PII-restricted self-service analytics through Claude, is £${wholeBusinessYearK}k a year at £${wholeBusinessMonthlyK}k a month. Enterprise adds autonomous agents and is priced against the outcome it delivers rather than from a list. After the twelve-month build you can walk away, or keep us on for £${maintenanceMonthlyK}k a month on a rolling monthly contract so nothing falls over. For scale, one area a year is less than half a fully-loaded senior data hire at around £${seniorHireLoadedK}k.`,
  },
  {
    q: "Can we just buy the strategy and build it ourselves?",
    a: `Yes, and the Discovery tier exists for exactly that. For £${discoveryOneOffK}k you get your value streams mapped, the leaks quantified, an honest read on whether your data can support AI yet, the watch-outs, and a prioritised build plan. It is written to be acted on by somebody else — your own team, or another supplier. No proprietary format, no dependency, and nothing held back to protect a follow-on sale. And it is a down payment rather than a sunk cost: if you do come back for the build, the whole £${discoveryOneOffK}k comes off it.`,
  },
  {
    q: "How long before we see something?",
    a: "Within a week. We connect the first source, land the events and put a real number in front of you — not a plan for a number. The layer takes shape over the first month, and the Summary Page and reporting behind it go live in months two and three. There is no six-week discovery phase that produces a document.",
  },
  {
    q: "Do we own the environment and the data?",
    a: "Yes. Everything is built in your own Google Cloud project, inside your own secure VPC. You own the environment, the data and the models throughout — we are working in your account, not hosting you in ours. At the end there is a structured handover with everything Terraformed and documented, so you can run it without us.",
  },
  {
    q: "What happens to personal data?",
    a: "Personal data is obscured at ingest, so it does not travel into the modelling layer or into any AI prompt. Self-service analytics through Claude is PII-restricted by design. We only ever need read access, with personal data excluded.",
  },
  {
    q: "Does this replace our data team?",
    a: "No — it means you do not have to build one before you get value. We work alongside whoever you already have, and the point of the engagement is that your team is self-sufficient well before twelve months. Then we get out of the way and you use us where it actually matters.",
  },
  {
    q: "What technology do you use, and why that stack?",
    a: "Google BigQuery for where the data lives, shadcn for what you look at, and Claude for who you ask. It is all Google underneath, in your own secure environment, because that stack scales, integrates with everything and lets us start immediately rather than spending a quarter on procurement and platform choices.",
  },
  {
    q: "Which sectors do you work in?",
    a: `We work where operations are complex enough to need a real data function: ${sectors
      .map(s => s.label)
      .join(", ")}. The team has held C-suite positions across marketing, operations, technology and product, so the value streams in those sectors are familiar rather than newly researched.`,
  },
  {
    q: "Can you take over an existing BI or reporting setup?",
    a: "Yes. Taking over reporting somebody else built is one of the most common ways engagements start — usually when the manual reconciliation behind it has become the bottleneck, or when the person who understood the workbooks has left.",
  },
  {
    q: "What do you mean by a second brain?",
    a: "A layer that remembers everything the business has done — every activity, every decision, and what happened next — and can be asked about it in real time. For an individual it answers what they would otherwise have to ask the colleague who has been there fifteen years. For the business it means that judgement stops living in a handful of heads: when somebody resigns the reasoning stays behind, and when somebody joins they start with the whole history. Recommendations are generated inside your own policy rather than filtered afterwards, the priors come from decisions your business has actually made rather than from industry averages, and every recommendation is scored against what happened next so the following one is better.",
  },
  {
    q: "What is the Summary Page?",
    a: "One page showing the whole business in real time: a balanced scorecard across finance, customer, operations and people with every measure against target and RAG derived from the metric tree rather than typed in, the quarter's objectives tracked against pace, and the three things that most need attention today. Clear one and the next moves up.",
  },
];

/** Wraps a node set as a JSON-LD @graph, which is the form crawlers prefer. */
export const graph = (...nodes: object[]) => ({
  "@context": "https://schema.org",
  "@graph": nodes,
});

export const breadcrumbs = (trail: { name: string; path: string }[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: [{ name: "Home", path: "/" }, ...trail].map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.name,
    item: `${SITE}${c.path}`,
  })),
});
