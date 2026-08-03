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

/** Build & Hand Over: 12 months at the entry monthly rate. */
export const actaMonthlyK = 10;
export const actaYearOneK = actaMonthlyK * 12;

export const headcount = inHouseTeam.length;
export const inHouseTimeToFirstOutput = "3–6 months";
export const actaTimeToFirstOutput = "Weeks 2–4";
