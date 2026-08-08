import type { ScoreMetric } from "@/components/summary-scorecard";
import type { Okr } from "@/components/summary-okrs";
import type { Alert } from "@/components/summary-alerts";

/**
 * Summary Page examples, one per sector, kept out of the component so the mock
 * is data rather than markup.
 *
 * Every example carries a full balanced scorecard — two measures against target
 * in each of the four perspectives — because a scorecard that only covers
 * finance is the thing we are arguing against. Tab ids match the sector slugs,
 * so a visitor coming from /sectors/debt-management sees the same words here.
 *
 * All figures are illustrative.
 */
export type SummaryExample = {
  id: string;
  label: string;
  caption: string;
  persona: string;
  scorecard: ScoreMetric[];
  okrs: Okr[];
  alerts: Alert[];
  queued: string[];
  trendLabel: string;
  trend: { week: string; current: number; prior: number }[];
};

/** Deterministic sparkline shapes — no Math.random, so SSR and client agree. */
function spark(seed: number, n = 12) {
  let v = 50 + (seed % 25);
  const out: number[] = [];
  for (let i = 0; i < n; i++) {
    v += Math.sin(seed + i * 0.8) * 6 + (i / n) * 3;
    out.push(Math.round(Math.max(15, v)));
  }
  return out;
}

function trend(seed: number) {
  return Array.from({ length: 12 }).map((_, i) => {
    const base = 60 + Math.sin(seed + i / 1.4) * 10 + i * 2.4;
    return {
      week: `W${i + 1}`,
      current: Math.round(base + Math.sin(seed * 1.3 + i) * 3),
      prior: Math.round(base * 0.86 + Math.cos(seed + i) * 3),
    };
  });
}

export const summaryExamples: SummaryExample[] = [
  {
    id: "omni-channel-retail",
    label: "Omni-channel Retail",
    caption: "DTC + wholesale apparel · last 7 days",
    persona: "COO",
    trendLabel: "Net revenue (£k) — current vs prior 12 weeks",
    trend: trend(2),
    scorecard: [
      { perspective: "Financial", label: "Net revenue", value: "£1.84m", target: "£2.00m", delta: 6.4, rag: "amber", spark: spark(3) },
      { perspective: "Financial", label: "Gross margin", value: "53.1%", target: "56.0%", delta: -0.8, rag: "red", spark: spark(5) },
      { perspective: "Customer", label: "Repeat rate", value: "31.2%", target: "30.0%", delta: 4.7, rag: "green", spark: spark(7) },
      { perspective: "Customer", label: "NPS", value: "+38", target: "+35", delta: 3, rag: "green", spark: spark(9) },
      { perspective: "Operations", label: "On-time despatch", value: "96.4%", target: "98.0%", delta: -1.2, rag: "amber", spark: spark(11) },
      { perspective: "Operations", label: "Return rate", value: "8.4%", target: "6.5%", delta: 1.1, goodWhenDown: true, rag: "red", spark: spark(13) },
      { perspective: "People & growth", label: "Revenue per head", value: "£182k", target: "£175k", delta: 2.6, rag: "green", spark: spark(15) },
      { perspective: "People & growth", label: "Training completion", value: "78%", target: "90%", delta: 5, rag: "amber", spark: spark(17) },
    ],
    okrs: [
      { objective: "Grow contribution, not just revenue", result: "Contribution margin", current: "53.1%", target: "56.0%", progress: 68, pace: 74 },
      { objective: "Cut returns on apparel", result: "Returns as % of orders", current: "8.4%", target: "6.5%", progress: 44, pace: 62 },
      { objective: "Win back lapsed customers", result: "Reactivated customers", current: "4,120", target: "6,000", progress: 69, pace: 66 },
    ],
    alerts: [
      { title: "Margin slipping on the hero SKU", detail: "Gross margin down 3.1pts over two weeks, driven by promo depth on one line.", metric: "GM 48.2% vs 51.3%", action: "Review promo", urgent: true },
      { title: "Returns spiking in one size", detail: "Size 12 returns at 19% against an 8% baseline. Likely a spec change.", metric: "19% vs 8%", action: "Investigate" },
      { title: "Marketplace stock about to run dry", detail: "Two bestsellers below three days of cover at the current run rate.", metric: "2.7 days cover", action: "Reorder" },
    ],
    queued: ["Carriage cost per order drifting up", "New customer share below plan in the South", "Supplier lead times slipping on two lines"],
  },
  {
    id: "consumer-credit",
    label: "Consumer Credit",
    caption: "Unsecured lender · last 7 days",
    persona: "COO",
    trendLabel: "Approved volume (£m) — current vs prior 12 weeks",
    trend: trend(5),
    scorecard: [
      { perspective: "Financial", label: "Funded volume", value: "£8.9m", target: "£8.5m", delta: 6.2, rag: "green", spark: spark(4) },
      { perspective: "Financial", label: "Net contribution", value: "£1.4m", target: "£1.7m", delta: 2.1, rag: "amber", spark: spark(6) },
      { perspective: "Customer", label: "Consumer Duty measures evidenced", value: "7 of 9", target: "9 of 9", delta: 1, rag: "amber", spark: spark(8) },
      { perspective: "Customer", label: "Complaints per 1,000", value: "4.2", target: "5.0", delta: -0.4, goodWhenDown: true, rag: "green", spark: spark(10) },
      { perspective: "Operations", label: "30+ DPD", value: "2.1%", target: "2.5%", delta: -0.3, goodWhenDown: true, rag: "green", spark: spark(12) },
      { perspective: "Operations", label: "Decision to funded", value: "3.1 days", target: "2.0 days", delta: 0.4, goodWhenDown: true, rag: "red", spark: spark(14) },
      { perspective: "People & growth", label: "Cases per underwriter", value: "41", target: "48", delta: -2, rag: "amber", spark: spark(16) },
      { perspective: "People & growth", label: "QA pass rate", value: "94%", target: "92%", delta: 1.5, rag: "green", spark: spark(18) },
    ],
    okrs: [
      { objective: "Lend more without loosening risk", result: "Funded volume", current: "£8.9m", target: "£11.0m", progress: 81, pace: 78 },
      { objective: "Hold arrears through growth", result: "30+ DPD", current: "2.1%", target: "under 2.5%", progress: 84, pace: 80 },
      { objective: "Evidence good customer outcomes", result: "Consumer Duty measures", current: "7", target: "9", progress: 78, pace: 83 },
    ],
    alerts: [
      { title: "Affordability declines up in one channel", detail: "Broker declines up 6pts week on week, concentrated in a single introducer.", metric: "Decline 38% vs 32%", action: "Review introducer", urgent: true },
      { title: "Early arrears building in a cohort", detail: "The March cohort is 0.4pts worse at month three than the February cohort.", metric: "1.9% vs 1.5%", action: "Check cohort" },
      { title: "Two Consumer Duty measures without evidence", detail: "Fair value and understanding have no current-month data feeding them.", metric: "2 of 9 gaps", action: "Close the gap" },
    ],
    queued: ["CAC payback lengthening on paid search", "Roll rate 1→2 up slightly", "Manual underwriting overrides above trend"],
  },
  {
    id: "debt-management",
    label: "Debt Management",
    caption: "Third-party collections · last 7 days",
    persona: "COO",
    trendLabel: "Cash collected (£k) — current vs prior 12 weeks",
    trend: trend(3),
    scorecard: [
      { perspective: "Financial", label: "Cash collected", value: "£4.2m", target: "£4.0m", delta: 3.8, rag: "green", spark: spark(2) },
      { perspective: "Financial", label: "Cost to collect", value: "11.4%", target: "10.0%", delta: 0.6, goodWhenDown: true, rag: "amber", spark: spark(5) },
      { perspective: "Customer", label: "Complaints upheld", value: "12%", target: "8%", delta: 2, goodWhenDown: true, rag: "red", spark: spark(8) },
      { perspective: "Customer", label: "Fair-value evidence", value: "6 of 8", target: "8 of 8", delta: 1, rag: "amber", spark: spark(11) },
      { perspective: "Operations", label: "Cure rate", value: "62%", target: "58%", delta: 2.4, rag: "green", spark: spark(14) },
      { perspective: "Operations", label: "Promise kept", value: "74%", target: "80%", delta: -1.6, rag: "amber", spark: spark(17) },
      { perspective: "People & growth", label: "Agent QA score", value: "91%", target: "90%", delta: 1.1, rag: "green", spark: spark(20) },
      { perspective: "People & growth", label: "Agent attrition", value: "24%", target: "15%", delta: 3, goodWhenDown: true, rag: "red", spark: spark(23) },
    ],
    okrs: [
      { objective: "Collect more at lower cost", result: "Cost to collect", current: "11.4%", target: "10.0%", progress: 58, pace: 70 },
      { objective: "Prove treatment pathways work", result: "Cure rate", current: "62%", target: "68%", progress: 76, pace: 72 },
      { objective: "Reduce upheld complaints", result: "Complaints upheld", current: "12%", target: "8%", progress: 41, pace: 65 },
    ],
    alerts: [
      { title: "Upheld complaints concentrated in one team", detail: "Team 4 accounts for 46% of upheld complaints on 18% of contacts.", metric: "46% of upholds", action: "Review team", urgent: true },
      { title: "Arrangements breaking earlier", detail: "Breakage inside 60 days up 5pts on the cohort before the script change.", metric: "27% vs 22%", action: "Check script" },
      { title: "Vulnerability flags not carrying through", detail: "One in nine flagged accounts is missing the flag downstream in reporting.", metric: "11% dropped", action: "Fix mapping" },
    ],
    queued: ["Contact-to-arrangement dipping on mobile", "Right-party contact rate down midweek", "Attrition driving QA variance"],
  },
  {
    id: "legal-services",
    label: "Legal Services",
    caption: "Consumer claims firm · last 7 days",
    persona: "Managing Partner",
    trendLabel: "Cases opened — current vs prior 12 weeks",
    trend: trend(8),
    scorecard: [
      { perspective: "Financial", label: "WIP value", value: "£14.2m", target: "£12.0m", delta: 9.1, goodWhenDown: true, rag: "amber", spark: spark(3) },
      { perspective: "Financial", label: "Average settlement", value: "£1,940", target: "£2,250", delta: 1.4, rag: "amber", spark: spark(6) },
      { perspective: "Customer", label: "Client satisfaction", value: "4.4 / 5", target: "4.5 / 5", delta: 0.1, rag: "amber", spark: spark(9) },
      { perspective: "Customer", label: "Cases won", value: "82%", target: "80%", delta: 1.2, rag: "green", spark: spark(12) },
      { perspective: "Operations", label: "Time to settle", value: "94 days", target: "80 days", delta: -3.2, goodWhenDown: true, rag: "amber", spark: spark(15) },
      { perspective: "Operations", label: "Cost per acquired case", value: "£212", target: "£180", delta: -6.3, goodWhenDown: true, rag: "red", spark: spark(18) },
      { perspective: "People & growth", label: "Fee earner utilisation", value: "71%", target: "80%", delta: -1.4, rag: "red", spark: spark(21) },
      { perspective: "People & growth", label: "Fee earner retention", value: "88%", target: "85%", delta: 2, rag: "green", spark: spark(24) },
    ],
    okrs: [
      { objective: "Grow settled case value", result: "Average settlement", current: "£1,940", target: "£2,250", progress: 72, pace: 70 },
      { objective: "Bring acquisition cost down", result: "Cost per acquired case", current: "£212", target: "£180", progress: 52, pace: 72 },
      { objective: "Shorten time to settle", result: "Median days", current: "94", target: "80", progress: 61, pace: 66 },
    ],
    alerts: [
      { title: "One panel acquiring at twice target cost", detail: "Panel C at £430 per acquired case against a £180 target, and volume is rising.", metric: "£430 vs £180", action: "Pause panel", urgent: true },
      { title: "WIP ageing past 120 days", detail: "£1.4m of WIP is now older than 120 days, up from £0.9m last month.", metric: "£1.4m over 120d", action: "Review WIP" },
      { title: "Conversion dropping at sign stage", detail: "Call-to-sign down 4.1pts since the script change went live.", metric: "33.1% vs 37.2%", action: "Check script" },
    ],
    queued: ["Utilisation below plan in two teams", "Two claim types settling below reserve", "Marketing spend up with flat enquiries"],
  },
  {
    id: "manufacturing",
    label: "Manufacturing",
    caption: "Two-site food manufacturer · last 7 days",
    persona: "Operations Director",
    trendLabel: "Units produced (k) — current vs prior 12 weeks",
    trend: trend(6),
    scorecard: [
      { perspective: "Financial", label: "Contribution per unit", value: "£4.12", target: "£4.60", delta: -1.8, rag: "amber", spark: spark(4) },
      { perspective: "Financial", label: "Cost per unit", value: "£18.40", target: "£17.20", delta: 1.4, goodWhenDown: true, rag: "amber", spark: spark(7) },
      { perspective: "Customer", label: "On-time in full", value: "92.1%", target: "97.0%", delta: -1.9, rag: "red", spark: spark(10) },
      { perspective: "Customer", label: "Complaint rate", value: "0.8%", target: "1.0%", delta: -0.2, goodWhenDown: true, rag: "green", spark: spark(13) },
      { perspective: "Operations", label: "OEE", value: "71.4%", target: "82.0%", delta: -2.6, rag: "red", spark: spark(16) },
      { perspective: "Operations", label: "Scrap rate", value: "3.9%", target: "2.5%", delta: 0.5, goodWhenDown: true, rag: "amber", spark: spark(19) },
      { perspective: "People & growth", label: "Skills coverage", value: "84%", target: "80%", delta: 3, rag: "green", spark: spark(22) },
      { perspective: "People & growth", label: "Safety incidents", value: "2", target: "0", delta: 1, goodWhenDown: true, rag: "amber", spark: spark(25) },
    ],
    okrs: [
      { objective: "Lift line availability", result: "OEE", current: "71.4%", target: "82.0%", progress: 46, pace: 68 },
      { objective: "Cut scrap on the new line", result: "Scrap rate", current: "3.9%", target: "2.5%", progress: 54, pace: 60 },
      { objective: "Hit service levels for the top ten accounts", result: "On-time in full", current: "92.1%", target: "97.0%", progress: 62, pace: 71 },
    ],
    alerts: [
      { title: "Line 3 downtime running at three times plan", detail: "Changeover time on line 3 is 47 minutes against a 15 minute standard.", metric: "47 min vs 15", action: "Escalate", urgent: true },
      { title: "Scrap climbing on one recipe", detail: "Recipe 42 scrapping at 7.8%, more than double the site average.", metric: "7.8% vs 3.9%", action: "Investigate" },
      { title: "Two accounts below service level", detail: "On-time in full for the top ten is 92.1%, dragged down by two customers.", metric: "92.1% vs 97%", action: "Review schedule" },
    ],
    queued: ["Input cost variance on packaging", "Overtime hours above plan on nights", "Yield drifting on the older line"],
  },
  {
    id: "saas-startups",
    label: "SaaS & Startups",
    caption: "B2B SaaS · last 7 days",
    persona: "CEO",
    trendLabel: "Net new MRR (£k) — current vs prior 12 weeks",
    trend: trend(11),
    scorecard: [
      { perspective: "Financial", label: "MRR", value: "£1.21m", target: "£1.30m", delta: 3.6, rag: "amber", spark: spark(2) },
      { perspective: "Financial", label: "CAC payback", value: "14 mo", target: "12 mo", delta: 0.8, goodWhenDown: true, rag: "amber", spark: spark(6) },
      { perspective: "Customer", label: "Net revenue retention", value: "104%", target: "110%", delta: -1.2, rag: "amber", spark: spark(9) },
      { perspective: "Customer", label: "Logo churn", value: "3.8%", target: "2.5%", delta: 0.4, goodWhenDown: true, rag: "red", spark: spark(12) },
      { perspective: "Operations", label: "Activation rate", value: "46%", target: "60%", delta: 2.1, rag: "red", spark: spark(15) },
      { perspective: "Operations", label: "Uptime", value: "99.95%", target: "99.90%", delta: 0.02, rag: "green", spark: spark(18) },
      { perspective: "People & growth", label: "Revenue per head", value: "£142k", target: "£135k", delta: 4.1, rag: "green", spark: spark(21) },
      { perspective: "People & growth", label: "Time to first value", value: "9 days", target: "5 days", delta: -1, goodWhenDown: true, rag: "amber", spark: spark(24) },
    ],
    okrs: [
      { objective: "Grow recurring revenue", result: "MRR", current: "£1.21m", target: "£1.40m", progress: 76, pace: 72 },
      { objective: "Fix first-90-day churn", result: "Logo churn", current: "3.8%", target: "2.5%", progress: 43, pace: 68 },
      { objective: "Get users to value faster", result: "Activation rate", current: "46%", target: "60%", progress: 58, pace: 64 },
    ],
    alerts: [
      { title: "Churn concentrated in one plan", detail: "The mid tier churns at 6.1% against 3.8% overall, all inside 90 days of joining.", metric: "6.1% vs 3.8%", action: "Review onboarding", urgent: true },
      { title: "Activation stalling at one step", detail: "Two thirds of new accounts never complete the data connection step.", metric: "34% complete", action: "Fix step" },
      { title: "Expansion pipeline thinning", detail: "Accounts with an expansion trigger down a third on last quarter.", metric: "-33% QoQ", action: "Brief CS" },
    ],
    queued: ["Support backlog growing on the mid tier", "Trial-to-paid down on paid search", "Two enterprise renewals inside 60 days"],
  },
];
