---
name: acta-data-website
description: |
  Use this skill for ANY work on the Acta Data marketing website — building new pages, fixing existing pages, tweaking layout/design, updating copy, or deploying changes. Trigger whenever the user mentions "Acta Data", "actadata", "the Acta site", "the data consultancy site", or any page/component name that's part of this site (page.tsx, hero, summary page demo, etc.). Also trigger when the user pastes a Vercel preview URL for the actadata project, references the GitHub repo jimcreditcanary/actadata, or mentions "Acta Data Ltd" or the trading-pack/Summary Page concept. This skill contains the repo details, design system, standing rules, and a handoff log so Claude can pick up exactly where the last session left off.
---

# Acta Data Website

You're working on the Acta Data Ltd marketing website — a consultancy proposition site aimed at C-suite buyers (CEO / COO / CFO / CDO) at consumer businesses. Acta builds the entire data function: integrations, cloud warehouse, ETL, metric trees, board-grade reporting, and LLM readiness.

**Brand position:** confident challenger, anti-bloated-internal-team, immediate start, high-potency outputs. Premium but direct — Bloomberg terminal meets boutique strategy firm.

This skill contains everything you need to clone, edit, build, and deploy without the user having to re-explain context each time.

## First Steps — Every Session

1. **Read the handoff log** at the bottom of this file. It tells you what was last worked on, what's done, and what's outstanding.
2. **Clone the repo** (see connection details below).
3. **`npm install`** then make changes.
4. **`npm run build`** locally to catch TS/import errors before pushing.
5. **Commit and push** when the work is done.
6. **Update the handoff log** at the bottom of this file before finishing.

## Connection Details

- **Live site:** Vercel auto-deploys on push to `main`. Ask Jim for the current preview URL if needed.
- **GitHub:** https://github.com/jimcreditcanary/actadata
- **Clone with auth:**
  ```
  git clone https://jimcreditcanary:<GH_TOKEN>@github.com/jimcreditcanary/actadata.git
  ```
- **Push with auth:**
  ```
  git push https://jimcreditcanary:<GH_TOKEN>@github.com/jimcreditcanary/actadata.git main
  ```
- **Auth token:** the real PAT is not committed (GitHub secret scanning blocks it). It's stored in the user's `acta-data-website-SKILL.md` on `~/Desktop/acta/` and in the installed skill at `~/.claude/skills/acta-data-website/SKILL.md`. Replace `<GH_TOKEN>` in commands above with that value.
- **Legal entity:** the registered company is **Braemar Brook & New Limited**, trading as **ActaData**. Footer copyright must read `© YYYY Braemar Brook & New Limited T/A ActaData. All rights reserved.` Brand-facing copy elsewhere uses "Acta Data" / "Acta".
- **Git config:** `user.email "jim@creditcanary.co.uk"` / `user.name "Jim"`
- **Source brand assets** (legacy logos, founder photos) live in `~/Desktop/acta` and in the repo's `legacy/` folder.

## Tech Stack

- **Framework:** Next.js 14 (App Router) with TypeScript
- **UI:** shadcn/ui primitives (inlined under `components/ui/`)
- **Styling:** Tailwind CSS with custom navy + electric-blue palette (`tailwind.config.ts`)
- **Charts:** Recharts (used in the Summary Page demo)
- **Fonts:** Geist Sans + Geist Mono via `geist` package
- **Icons:** lucide-react
- **Build/deploy:** Vercel auto-detects Next.js. No special config needed.

## Project Layout

```
app/
  layout.tsx        — root layout, fonts, nav
  page.tsx          — composes all sections in order
  globals.css       — Tailwind base + design tokens
components/
  ui/               — shadcn primitives (button, card, badge, tabs, table)
  sections/         — one file per landing-page section
  nav.tsx, logo.tsx — chrome
lib/utils.ts        — cn() helper
tailwind.config.ts  — design tokens (navy, electric)
legacy/             — old static-HTML version, kept for reference
```

## Page Section Order (always)

1.  `Hero`              — headline + CTA + trust strip
2.  `LogoStrip`         — auto-marquee of past-client logos (placeholders until real SVGs land)
3.  `Problem`           — internal team cost vs Acta
4.  `WhatWeBuild`       — six capability tiles
5.  `SummaryPageDemo`   — **the centrepiece** — tabbed dashboard mock
6.  `Quote`             — single big pullout testimonial (one only — never more than one)
7.  `EngagementModels`  — six engagement cards
8.  `Verticals`         — Retail / Credit / Legal / Services tabs
9.  `WhyActa`           — four reasons
10. `PricingAnchor`     — £120k vs £350k+
11. `ContactFooter`     — CTA + footer

## Standing Design Rules

These apply to **every section** added. Don't deviate without explicit instruction.

### Colour palette

Defined in `tailwind.config.ts` and `app/globals.css`. Use these — no new accents.

```
navy DEFAULT   #070A1A   — page background (slight purple-warm shift, scytale-flavoured)
navy 50        #0C1428   — card surface
navy 100       #121C36   — elevated surface
navy 200/300/400        — borders, hover states
electric DEFAULT #3DDBFF — primary brand accent (electric blue)
electric dim   #1FB8DF
electric glow  #7CE7FF   — hover
sky DEFAULT    #7AA8FF   — secondary accent (sky blue), pairs with electric for gradients
sky soft       #A9C4FF
```

White is `text-foreground` (`#E6EEF8` via HSL). Muted text is `text-muted-foreground`.

### Typography

- Geist Sans for everything except numerics (which can use `tabular-nums`).
- Section H2: `text-3xl md:text-5xl font-semibold tracking-tight leading-tight`.
- H3: `text-lg font-semibold tracking-tight`.
- Eyebrow pattern: `Badge` (`muted` or `electric` variant) above each H2.
- Body: `text-muted-foreground` for paragraphs, `text-foreground` for emphasis.
- Tracking is tight: `tracking-tight` on display, `-0.03em` for the hero H1.

### Layout

- All sections use `<section className="container py-24 md:py-32 ...">`.
- Section dividers: `border-t border-white/[0.04]` between sections.
- Cards: use `Card` from `components/ui/card.tsx`. Padding `p-5` or `p-6`.
- Featured card pattern: `border-electric/30 bg-gradient-to-b from-electric/[0.06] to-transparent` and apply `glow-ring` utility.
- Buttons: prefer `variant="electric"` for primary CTAs, `variant="outline"` for secondary.
- Always render a `Badge` eyebrow above section H2s.
- Background atmospherics — use sparingly: `bg-terminal-grid`, `bg-grid-fade`, `bg-scan` are defined as utilities for that "trading terminal" feel.

### Navigation

`components/nav.tsx` is a **client component**. The nav is fixed to top but starts hidden (`opacity-0 -translate-y-4 pointer-events-none`) and reveals once `window.scrollY > window.innerHeight * 0.7` — i.e. after the user has scrolled past the hero. This keeps the hero clean and the nav out of the way until it earns its place. Do not change this default reveal behaviour without a reason — Jim asked for it explicitly.

### Logo

The `Logo` component (`components/logo.tsx`) renders the official ACTA/DATA wordmark as **inlined SVG** — path data byte-identical to the uploaded `actalogo.svg` (also stored at `/public/logo.svg` for OG cards / external use). Eight letterform paths, white at `fillOpacity="0.5"`. **Never edit the path "d" strings or fill values** — Jim cares about pixel fidelity here. **Never re-introduce magenta** — that brand was retired. The favicon (`/public/favicon.ico` + `favicon.svg`) is built from the same `A` letterform path, electric-blue on a navy rounded square.

### Voice and copy rules

- Audience: **C-suite at consumer businesses** (CEO / COO / CFO / CDO). Lead with commercial outcomes, decisions, ROI — not engineering specs.
- Tone: punchy, confident, commercial. Management consultancy meets modern SaaS. No jargon.
- Headline pattern Jim likes: "Your entire data function. Built, handed over, done." / "Stop hiring. Start knowing."
- The four engagement-model labels are fixed: **Build & Hand Over**, **Build & Manage**, **Build & Embed**, **Fractional Data Team**, **Audit & Rescue**, **AI Readiness Sprint**. Build & Hand Over is featured.
- Six capabilities are fixed and in order: Integrations & Data Sources → Cloud Warehouse & ETL → Business Mapping & Metric Trees → Core Reporting Suite → **The Summary Page (hero output)** → LLM Readiness.
- Verticals are fixed and in order: Retail → Consumer Credit → Legal → Consumer Services.
- The flagship pricing is **12 months × £10k = £120k**, contrasted against ~£350k+ for an internal team.
- Logo strip: only past-client logos (or anonymised stand-ins) sit there. Never invented brand names. Strip is auto-marquee with a soft mask on each edge. Copy must read "Senior team experience across…" until ActaData itself has shipped engagements.
- Quote section: at most ONE quote on the homepage. Use real attribution (name, title, company). If no real quote yet, the section ships with placeholder copy clearly labelled in code as `Placeholder` — never publish placeholder copy as real attribution.
- Avoid: "synergy", "leverage", "unlock", "transformation journey", "data-driven" (overused).

### The Summary Page demo

This is the single most important visual on the site. Standing rules:

- Lives in `components/sections/summary-page-demo.tsx` and is a **client component** (Recharts needs the DOM).
- Tabs follow the verticals order: Retail / Consumer Credit / Legal / Consumer Services.
- Each tab shows: a header strip ("Trading Pack vN, last refresh"), 6 KPI tiles (each with label, big number, period delta, sparkline), then one main `AreaChart` with current vs prior series.
- Number formatting uses `tabular-nums`.
- Mock data is generated inline with deterministic seed functions — keep it deterministic so the page is SSR-safe.
- Demo data caveat sits below the dashboard: "Demo data shown. Live versions are wired straight to your warehouse."
- For metrics where lower-is-better (return rate, churn, CAC payback, etc.), invert the colour signal — list those metric names in `goodWhenDown` inside the file.

### Footer

Single thin row: `Logo` left, copyright + positioning line right. Border-top.

## Updating the Handoff Log

At the end of every session, **append** a new entry below. Format:

```
### YYYY-MM-DD — [what was worked on]
**Done:** [bullet list of completed items]
**Outstanding:** [bullet list of what's left / next steps]
```

---

## Handoff Log

### 2026-04-26 — Initial vanilla-HTML site
**Done:**
- Single-file `index.html` / `actadata-proposition.html` landing page in magenta brand.
- Repo + Vercel project initialised. Skill written.

**Outstanding (now mostly superseded by the Next.js rebuild below):**
- Vercel preview URL not yet captured here.

### 2026-04-27 — Full Next.js + shadcn rebuild (brand pivot to navy/electric)
**Done:**
- **Brand fully pivoted** from magenta "Data made human" to deep navy + electric blue, dark-mode default. Magenta retired.
- **Repo restructured** as a Next.js 14 App Router project with TypeScript, Tailwind, shadcn primitives (Button, Card, Badge, Tabs, Table), Recharts, Geist font.
- Old static HTML moved to `legacy/` (kept for reference).
- All nine sections built per the brief: `Hero`, `Problem`, `WhatWeBuild`, `SummaryPageDemo`, `EngagementModels`, `Verticals`, `WhyActa`, `PricingAnchor`, `ContactFooter`.
- **Summary Page demo** (`summary-page-demo.tsx`) — tabbed by vertical, 6 KPI tiles per tab with sparklines, Recharts area-chart bottom, deterministic mock data.
- `npm run build` passes cleanly (verified before push). Vercel will redeploy on push to `main`.
- This skill rewritten for the new stack. Magenta-era rules deleted.

**Outstanding:**
- Confirm Vercel preview URL with Jim and add to "Connection Details".
- Wire `mailto:hello@actadata.io` to the actual contact inbox once confirmed.
- "Schedule via calendar" CTA still points to `#` — needs real Cal.com/Calendly link.
- No favicon yet (`app/icon.tsx` or `public/favicon.ico` not added).
- No analytics — decide between Vercel Web Analytics (one-line drop-in) or Plausible.
- No `/insights` or `/case-studies` routes yet — single-page site for now.
- The Activity Schema concept is mentioned (Why Acta + What We Build); a deeper page on it might be worth building once Jim has the explainer copy.
- KPI mock data is plausible but generic — could be tuned per real client conversation.

### 2026-04-27 — Patch: Next.js bump, real logo, favicon, legal entity wired in
**Done:**
- Bumped Next.js `14.2.15 → 14.2.35` to clear the security advisory in the Vercel deploy log.
- Replaced the placeholder logo with the uploaded `actalogo.svg`. After a render bug on Vercel where `<img src="/logo.svg">` rendered as alt text, switched to **inlined SVG** in `components/logo.tsx` — paths byte-identical to the source, `fillOpacity="0.5"` preserved.
- Built `/favicon.ico` (multi-res 16/32/48) + `/favicon.svg` from the `A` path of the uploaded logo, electric-blue on navy. Wired into `app/layout.tsx` via `metadata.icons`.
- Updated legal entity references: footer copyright now reads "© YYYY Braemar Brook & New Limited T/A ActaData. All rights reserved." Removed legal entity from the hero badge (now just "Data & AI consultancy").
- Build verified clean before each push.

**Outstanding:**
- Vercel preview URL still not captured here.
- Calendar CTA still `#`.
- No analytics yet.

### 2026-04-27 — Scytale-flavoured polish: nav-after-hero, logo strip, pullout quote, palette tweak
**Done:**
- Reviewed scytale.ai's site (Montserrat type, indigo/sky-blue accents, deep purple-tinted dark surface) and lifted three things that fit ActaData's brief without diluting brand: secondary `sky` accent (`#7AA8FF`), slight purple-warmth on the navy surface, and the auto-marquee logo strip pattern.
- Added `components/sections/logo-strip.tsx` — full-bleed auto-scrolling marquee, edge mask, pause-on-hover, 8 placeholder client tiles. Sits directly under the hero. Visibly placeholder until real client SVGs are dropped in.
- Added `components/sections/quote.tsx` — single big pullout quote with oversized opening mark, dual-glow background, placeholder attribution. Sits between `SummaryPageDemo` and `EngagementModels` so it lands right after the wow moment.
- `components/nav.tsx` is now a **client component** that reveals only after `window.scrollY > 0.7 * viewportHeight` — past the hero. Smooth opacity + translate transition.
- Tailwind palette updated: `navy.DEFAULT` warmed slightly toward purple (`#070A1A`), new `sky` accent added. `globals.css` background gradients now use both electric and sky tones.
- Section order updated to 11 sections (LogoStrip + Quote inserted). Skill rules updated for nav behaviour, palette, logo strip, and quote.
- Build verified clean.

**Outstanding:**
- **Real client logos** — drop SVGs into `public/clients/` and replace `clients[]` array in `logo-strip.tsx`. Eight ideal, six minimum.
- **Real quote** — text + name + title + company in `quote.tsx`. One quote only.
- Vercel preview URL still not captured here.
- Calendar CTA still `#`.
- No analytics yet.
