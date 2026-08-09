import { sectors } from "@/lib/sectors";
import { allPosts, KIND_LABEL, type PostBlock } from "@/lib/posts";
import { faqs, howItWorks, SITE } from "@/lib/seo";
import {
  discoveryOneOffK,
  entryMonthlyK,
  entryYearK,
  wholeBusinessMonthlyK,
  wholeBusinessYearK,
  maintenanceMonthlyK,
  seniorHireLoadedK,
} from "@/lib/economics";

/**
 * /llms-full.txt — the expanded companion to /llms.txt. Where llms.txt is the
 * concise index, this carries the full substance in one file: every sector's
 * detail and Q&A, the four-stage method, the whole FAQ, and the complete text
 * of every article. An assistant can ingest the site from this alone.
 *
 * Generated from the same data as the pages, so it cannot drift.
 */
export const dynamic = "force-static";

/** Renders a post's structured body to plain markdown. */
function blockToText(b: PostBlock): string {
  switch (b.type) {
    case "h2":
      return `#### ${b.text}`;
    case "ul":
      return b.items.map(i => `- ${i}`).join("\n");
    case "quote":
      return `> ${b.text}${b.attribution ? ` — ${b.attribution}` : ""}`;
    default:
      return b.text;
  }
}

export function GET() {
  const body = `# Acta Data — full reference

> Acta Data Ltd builds the operational data layer that AI needs, then the AI on top of it. Every system a business owns is landed in its own Google BigQuery environment as immutable events, with modelled metrics, board and regulatory reporting, a real-time balanced-scorecard Summary Page, safe PII-restricted self-service analytics through Claude, and AI agents on the repetitive operational work. Live in weeks, handed over Terraformed inside twelve months.

Acta Data Ltd is registered in England & Wales, company number 14182372, ICO registration ZB502441. Registered office: Chester House, Lloyd Drive, Cheshire Oaks Business Park, Ellesmere Port, Cheshire CH65 9HQ. Contact: info@actadata.co.uk, +44 7749 407562. LinkedIn: https://www.linkedin.com/company/acta-data/. Serves the United Kingdom.

This is the full-text reference. The shorter index is at ${SITE}/llms.txt.

## The model

- **The stack, in plain terms**: Google BigQuery is where the data lives, shadcn is what you look at, Claude is who you ask. All Google underneath, inside the client's own secure VPC.
- **Recorded once**: every activity is recorded once and never rewritten, carrying four atomic units — cost, revenue, conversion and time — plus its business context. That is what makes value-stream leaks visible and what makes the data usable by AI.
- **Who it is for**: mid-market and SME operators with enough operational complexity to need a data function and not enough scale to justify five hires for one.
- **The second brain**: the layer keeps every activity, every decision and what happened next, so it can be asked in real time. Recommendations are generated inside the client's own encoded policy, the decisioning priors are learned from decisions that business has actually made, and each recommendation is scored against the outcome so the next is better.
- **The team**: data and AI people who have held C-suite positions across marketing, operations, technology and product.

## How it works — ${howItWorks.name}

${howItWorks.description}

${(howItWorks.step as { name: string; text: string }[])
  .map((s, i) => `${i + 1}. **${s.name}.** ${s.text}`)
  .join("\n")}

Delivery runs over roughly twelve months: a real number in week one, the layer taking shape in the first month, the Summary Page and reporting in months two and three, self-service and then agents from months four to twelve, and a structured Terraformed handover after twelve months. Optional maintenance follows at £${maintenanceMonthlyK}k per month on a rolling contract.

## Pricing

Priced by how much of the business is in scope, not by feature tier. For scale, one area a year is less than half a fully-loaded senior data hire at around £${seniorHireLoadedK}k.

- **Discovery — £${discoveryOneOffK}k one-off.** Value stream mapping and an AI readiness review, delivered as a prioritised build plan the client owns outright and can execute themselves or hand to another supplier. Credited in full against a subsequent build.
- **One area — £${entryYearK}k per year (£${entryMonthlyK}k per month).** A single problem solved end to end, usually operations.
- **Whole business — £${wholeBusinessYearK}k per year (£${wholeBusinessMonthlyK}k per month).** Every value stream on one layer with one set of definitions, the full reporting suite including regulated reporting, plus safe PII-restricted self-service analytics through Claude.
- **Enterprise — priced against the outcome delivered.** Adds autonomous agents running operational workflows.
- **Maintenance — £${maintenanceMonthlyK}k per month**, optional, rolling, no notice period.

## Sectors — full detail

${sectors
  .map(
    s => `### ${s.label} — ${SITE}/sectors/${s.slug}

${s.tagline}

${s.intro}

Metrics that matter here: ${s.metrics.join(", ")}.

Where it hurts:
${s.pains.map(p => `- ${p}`).join("\n")}

What Acta builds:
${s.builds.map(b => `- ${b}`).join("\n")}

What you get: ${s.outputs}

Common questions:
${s.faqs.map(f => `- **${f.q}** ${f.a}`).join("\n")}`
  )
  .join("\n\n")}

## Questions and answers

${faqs.map(f => `### ${f.q}\n\n${f.a}`).join("\n\n")}

## Writing — full text

${
  allPosts().length
    ? allPosts()
        .map(
          p =>
            `### ${p.title}

${KIND_LABEL[p.kind]}, published ${p.published}${p.author ? `, by ${p.author}` : ""}. ${SITE}/blog/${p.slug}

${p.excerpt}

${p.body.map(blockToText).join("\n\n")}`
        )
        .join("\n\n---\n\n")
    : "Nothing published yet."
}
`;

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=0, must-revalidate",
    },
  });
}
