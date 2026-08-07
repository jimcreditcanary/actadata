/**
 * Case studies live here as data. Drop a new object in `caseStudies` and it
 * appears automatically in three places: the /case-studies index, its own page
 * at /case-studies/[slug], and as a proof card on the sector page whose slug
 * matches `sector`.
 *
 * Deliberately empty for now — nothing renders a placeholder, so an unpublished
 * case study cannot make the site look unfinished. Everything that keys off this
 * array degrades to nothing when it is empty, including the nav link.
 *
 * TEMPLATE — copy this, fill it in, delete the comment:
 *
 *   {
 *     slug: "consumer-duty-in-three-months",
 *     sector: "consumer-credit",              // must match a sector slug
 *     client: "Confidential lender",          // or the real name once cleared
 *     headline: "Consumer Duty reporting, live in three months",
 *     summary: "One paragraph a prospect can read in ten seconds.",
 *     published: "2026-08",                   // YYYY-MM, drives ordering
 *     stats: [
 *       { figure: "3 months", label: "From nothing to live reporting" },
 *       { figure: "4 yrs", label: "Of history rebuilt where none existed" },
 *     ],
 *     situation: ["Bullet per problem they arrived with."],
 *     work: ["Bullet per thing we actually built."],
 *     outcome: ["Bullet per result, ideally with a number."],
 *     quote: { text: "Optional client quote.", name: "", role: "" },
 *   }
 */
export type CaseStudyStat = { figure: string; label: string };

export type CaseStudy = {
  slug: string;
  /** Sector slug, so the study surfaces on the matching sector page. */
  sector: string;
  client: string;
  headline: string;
  summary: string;
  /** YYYY-MM. */
  published: string;
  stats: CaseStudyStat[];
  situation: string[];
  work: string[];
  outcome: string[];
  quote?: { text: string; name?: string; role?: string };
};

export const caseStudies: CaseStudy[] = [];

export const hasCaseStudies = () => caseStudies.length > 0;

export const getCaseStudy = (slug: string) => caseStudies.find(c => c.slug === slug);

export const caseStudiesForSector = (sectorSlug: string) =>
  caseStudies.filter(c => c.sector === sectorSlug);

/** Newest first. */
export const sortedCaseStudies = () =>
  [...caseStudies].sort((a, b) => b.published.localeCompare(a.published));
