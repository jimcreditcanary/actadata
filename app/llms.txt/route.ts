import { sectors } from "@/lib/sectors";
import { allPosts, KIND_LABEL } from "@/lib/posts";
import { faqs, SITE } from "@/lib/seo";
import {
  tiers,
  discoveryOneOffK,
  entryMonthlyK,
  entryYearK,
  wholeBusinessMonthlyK,
  wholeBusinessYearK,
  maintenanceMonthlyK,
} from "@/lib/economics";

/**
 * /llms.txt — the emerging convention for telling an AI assistant what a site is
 * and where the substance lives, in markdown, without it having to parse a
 * marketing page to find out.
 *
 * Generated from the same data as the site, so it cannot go stale: add a sector
 * or publish a post and it appears here on the next build. Kept factual and
 * unadorned on purpose — this file is read by machines, and adjectives are
 * exactly the part they discard.
 */
export const dynamic = "force-static";

export function GET() {
  const body = `# Acta Data

> Acta Data Ltd builds the operational data layer that AI needs, then the AI on top of it. Every system a business owns is landed in its own Google BigQuery environment as immutable events, with modelled metrics, board and regulatory reporting, a real-time balanced-scorecard Summary Page, safe PII-restricted self-service analytics through Claude, and AI agents on the repetitive operational work. Live in weeks, handed over Terraformed inside twelve months.

Acta Data Ltd is registered in England & Wales, company number 14182372, ICO registration ZB502441. Registered office: Chester House, Lloyd Drive, Cheshire Oaks Business Park, Ellesmere Port, Cheshire CH65 9HQ. Contact: info@actadata.co.uk. Serves the United Kingdom.

## What it is

- **The stack, in plain terms**: Google BigQuery is where the data lives, shadcn is what you look at, Claude is who you ask. All Google underneath, inside the client's own secure VPC.
- **The model**: every activity is recorded once and never rewritten, carrying four atomic units — cost, revenue, conversion and time — plus its business context. That is what makes value-stream leaks visible and what makes the data usable by AI.
- **Who it is for**: mid-market and SME operators with enough operational complexity to need a data function and not enough scale to justify five hires for one.
- **The team**: data and AI people who have held C-suite positions across marketing, operations, technology and product.

## Pricing

Priced by how much of the business is in scope, not by feature tier.

- **Discovery — £${discoveryOneOffK}k one-off.** Value stream mapping and an AI readiness review. Deliverables: the map, the value leaks quantified, what the data can and cannot support today, the watch-outs before pointing AI at it, and a prioritised build plan and strategy the client owns outright. Explicitly a do-it-yourself option — it is written to be executed by the client's own team or another supplier, with no obligation to continue.
- **One area — £${entryYearK}k per year (£${entryMonthlyK}k per month).** A single problem solved end to end, usually operations: sources connected, full event history in BigQuery, metric tree and a live Summary Page for that area.
- **Whole business — £${wholeBusinessYearK}k per year (£${wholeBusinessMonthlyK}k per month).** Every value stream on one layer with one set of definitions, the full reporting suite including regulated reporting, plus safe PII-restricted self-service analytics through Claude.
- **Enterprise — priced against the outcome delivered.** Adds autonomous agents running operational workflows.
- **After the twelve-month build:** walk away, or optional maintenance at £${maintenanceMonthlyK}k per month. Additional datasets and training packages are agreed per project.

## Pages

- [How it works](${SITE}/how-it-works): clean, model, alert, act — and what happens in week one, month one, months two to three, four to twelve, and after twelve months.
- [What we build](${SITE}/what-we-build): the six capabilities that make up a working data function, and the engagement models.
- [Sectors](${SITE}/sectors): the value streams we already know.
- [Pricing](${SITE}/pricing): the four tiers, and the DIY Discovery option, against the cost of hiring a team.
- [Questions](${SITE}/faq): cost, timelines, ownership, personal data, and whether this replaces a data team.
- [About](${SITE}/about): the crew, where they have worked, and how we work.
- [Writing](${SITE}/blog): case studies and thought leadership.
- [Contact](${SITE}/contact): info@actadata.co.uk.
- [Privacy notice](${SITE}/privacy).

## Sectors

${sectors.map(s => `- [${s.label}](${SITE}/sectors/${s.slug}): ${s.tagline}`).join("\n")}

## Writing

${
  allPosts().length
    ? allPosts()
        .map(
          p =>
            `- [${p.title}](${SITE}/blog/${p.slug}) — ${KIND_LABEL[p.kind]}, ${p.published}. ${p.excerpt}`
        )
        .join("\n")
    : "- Nothing published yet."
}

## Questions and answers

${faqs.map(f => `### ${f.q}\n\n${f.a}`).join("\n\n")}
`;

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=0, must-revalidate",
    },
  });
}
