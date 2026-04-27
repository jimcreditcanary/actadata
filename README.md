# Acta Data

Marketing site for **Acta Data Ltd** — a data and AI consultancy that builds the
entire data function for consumer businesses.

- **Live:** auto-deployed by Vercel on push to `main`
- **Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui, Recharts, Geist
- **Theme:** dark-mode default — deep navy + electric blue

## Local dev

```bash
npm install
npm run dev
```

## Project layout

```
app/                 — App Router (layout, globals, root page)
components/
  ui/                — shadcn primitives (button, card, badge, tabs, table)
  sections/          — one component per landing-page section
  nav.tsx, logo.tsx  — chrome
lib/utils.ts         — cn() helper
tailwind.config.ts   — design tokens (navy, electric)
legacy/              — earlier static-HTML version, kept for reference
```

## Standing rules

See `SKILL.md` in this repo (or `~/.claude/skills/acta-data-website/SKILL.md`)
for the design system, voice rules, and handoff log.
