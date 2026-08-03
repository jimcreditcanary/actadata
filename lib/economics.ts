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
 * Three tiers, priced monthly. Annual figures are derived, never typed twice.
 *   1. BI Only        — SME, the whole BI kit live
 *   2. BI + Claude    — adds safe, PII-restricted self-service analytics
 *   3. Enterprise     — adds autonomous agents, plus an outcome bonus
 */
export const tiers = {
  biOnly: { monthlyK: 5 },
  biClaude: { monthlyK: 10 },
  enterprise: { monthlyK: 10, bonus: "+ outcome bonus" },
} as const;

export const entryMonthlyK = tiers.biOnly.monthlyK;
export const entryYearK = entryMonthlyK * 12;

/** After the 12-month build: walk away, or keep us on for support. */
export const maintenanceMonthlyK = 1;

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
