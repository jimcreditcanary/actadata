/**
 * Single source of truth for every cost figure quoted on the site.
 *
 * The in-house comparison and the closing anchor used to hard-code different
 * numbers (~£540k vs £350k+), which a CFO reading top-to-bottom would spot.
 * Both sections now derive from here — change a salary and every figure moves.
 */

export const inHouseTeam = [
  { role: "Data Lead", salaryK: 110, rampMonths: "3–4 mo" },
  { role: "Data Engineer", salaryK: 90, rampMonths: "3 mo" },
  { role: "Analytics Engineer", salaryK: 80, rampMonths: "3 mo" },
  { role: "Commercial Analyst", salaryK: 65, rampMonths: "2 mo" },
  { role: "BI Developer", salaryK: 70, rampMonths: "2 mo" },
] as const;

/** Employer NI, pension, tooling, recruitment fees, desk. */
export const loadingMultiplier = 1.3;

export const baseSalaryK = inHouseTeam.reduce((sum, r) => sum + r.salaryK, 0);
export const inHouseYearOneK = Math.round(baseSalaryK * loadingMultiplier);

/**
 * Four tiers, priced by SCOPE rather than by product name.
 *
 * Naming them after what you got ("BI Only", "BI + Claude") made the ladder read
 * as a feature list, and left nothing for a buyer who is not ready to commit to a
 * year. Naming them after how much of the business is in scope answers the
 * question they are actually asking:
 *   1. Discovery       — one-off. The map, the readiness review, the plan. Yours
 *                        to act on with or without us.
 *   2. One area        — a single problem solved end to end, e.g. operations
 *   3. Whole business  — every value stream mapped, plus self-service analytics
 *   4. Enterprise      — autonomous agents, priced against the outcome
 *
 * Tiers 2 and 3 are billed monthly; the annual figure is the headline because
 * that is the number a board approves. Both are derived, never typed twice.
 */
export const tiers = {
  /** No twelve-month commitment. A deliverable, not a retainer. */
  discovery: { oneOffK: 15 },
  oneArea: { monthlyK: 5 },
  wholeBusiness: { monthlyK: 10 },
  /** No list price: scoped and priced against the outcome it delivers. */
  enterprise: { price: "Let's talk", note: "Outcome-driven pricing" },
} as const;

export const discoveryOneOffK = tiers.discovery.oneOffK;

/**
 * Discovery is a down payment, not a fee: if the client goes on to a build, the
 * whole £15k comes off it. That turns the decision from "is this worth £15k" into
 * "do we want the map first" — and it only works as a commitment if it is stated
 * identically everywhere, hence the constant. NOTE: no expiry is offered. If one
 * is ever wanted, it goes here and every mention moves with it.
 */
export const discoveryCreditNote = "Credited in full against the build";
export const entryMonthlyK = tiers.oneArea.monthlyK;
export const entryYearK = entryMonthlyK * 12;
export const wholeBusinessMonthlyK = tiers.wholeBusiness.monthlyK;
export const wholeBusinessYearK = wholeBusinessMonthlyK * 12;

/**
 * After the 12-month build: walk away, or keep us on for support. A rolling
 * monthly contract, not a tie-in. £1k did not cover a real support commitment
 * and priced the whole relationship down with it.
 */
export const maintenanceMonthlyK = 2;

/**
 * The senior data hire Foundations is measured against — the Data Lead line
 * above, fully loaded. Used for the "less than half a senior hire" claim, so
 * that claim can never drift from the salary table.
 */
export const seniorHireLoadedK = Math.round(inHouseTeam[0].salaryK * loadingMultiplier);

export const headcount = inHouseTeam.length;
/** Spelled out for prose; numerals only in tables and stat tiles. */
export const headcountWord = ["zero", "one", "two", "three", "four", "five", "six"][headcount] ?? String(headcount);
export const inHouseTimeToFirstOutput = "3–6 months";
export const actaTimeToFirstOutput = "Within a week";
/** Numeral for stat tiles, which read better without the preposition. */
export const actaFirstOutputWeeks = "1";
