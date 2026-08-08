/**
 * Sector content, kept as data so a new sector is an entry here rather than a
 * new page. Each one gets its own route at /sectors/[slug], which is what makes
 * focused landing pages possible — send a consumer-credit prospect to the
 * consumer-credit page, not to a general homepage with a tab they have to find.
 *
 * `group` drives how they cluster on the index. `metrics` are the numbers that
 * sector argues about internally — naming them is most of the credibility.
 */
export type Sector = {
  slug: string;
  label: string;
  group: "Financial services" | "Commerce & supply" | "Professional services" | "Technology";
  /** One line, used on cards and as the page's sub-headline. */
  tagline: string;
  /** Two or three sentences for the top of the sector page. */
  intro: string;
  pains: string[];
  builds: string[];
  outputs: string;
  /** The metrics this sector lives or dies by. */
  metrics: string[];
  /**
   * Show the "you do not need to be a tech company" section on this sector page.
   * These are the audiences most likely to assume data and AI is for somebody
   * else — merchants, distributors, family manufacturers.
   */
  smeObjection?: boolean;
};

export const sectors: Sector[] = [
  {
    slug: "consumer-credit",
    label: "Consumer Credit",
    group: "Financial services",
    tagline: "Consumer Duty evidence, vintage performance and one agreed contribution number.",
    intro:
      "Lending businesses usually have the data and no way to stand behind it. Risk, finance and marketing each hold a version of the truth, the bureau data sits in exports, and Consumer Duty evidence gets assembled by hand as the deadline approaches. We give you one timeline per customer and the history to trend it.",
    pains: [
      "Risk, finance and marketing each have their own version of the truth",
      "Consumer Duty evidence assembled by hand, close to the deadline",
      "Systems hold today's position and no history, so there is no trend to report",
      "Decisioning data locked inside bureau exports",
    ],
    builds: [
      "Application-to-funded-to-collections single timeline per customer",
      "Consumer Duty outcome reporting, with a full audit trail behind every number",
      "History rebuilt so vintage cohorts and roll rates exist at all",
      "Affordability and arrears views the credit committee can act on",
    ],
    outputs: "One number for net new contribution — agreed by risk, finance and growth.",
    metrics: ["Approval rate", "Funded volume", "30+ DPD", "Roll rates", "CAC payback", "Vintage loss"],
  },
  {
    slug: "debt-management",
    label: "Debt Management",
    group: "Financial services",
    tagline: "Collections performance, treatment outcomes and fair-value evidence in one place.",
    intro:
      "Collections runs on operational data that rarely reaches the board intact. Contact outcomes live in the dialler, arrangements in the servicing system, and customer outcomes nowhere in particular. We join them so treatment effectiveness and customer harm are both measurable.",
    pains: [
      "Contact, arrangement and payment data spread across three systems",
      "Treatment effectiveness argued from agent anecdote",
      "No evidence trail for fair value or vulnerable-customer outcomes",
      "Cure and breakage rates recalculated by hand every month",
    ],
    builds: [
      "One customer timeline across contact, arrangement, payment and outcome",
      "Treatment pathway performance, cure and breakage by cohort",
      "Vulnerability and forbearance flags carried through to reporting",
      "Regulatory outcome reporting with the working shown",
    ],
    outputs: "Evidence that a treatment strategy works, and where it quietly does not.",
    metrics: ["Cure rate", "Breakage", "Contact-to-arrangement", "Cost to collect", "Promise kept %"],
  },
  {
    slug: "credit-unions",
    label: "Credit Unions",
    group: "Financial services",
    tagline: "Member value, loan book health and social impact you can actually show.",
    intro:
      "Credit unions carry the reporting burden of a bank on a fraction of the resource. The ledger holds the truth but not the history, member value is asserted rather than measured, and the board pack is somebody's weekend. We make the book and the membership legible without adding headcount.",
    pains: [
      "Core banking system holds balances, not the history behind them",
      "Board pack assembled manually from several exports",
      "Member value and social impact claimed but not evidenced",
      "Arrears trend impossible to see because only today's position is stored",
    ],
    builds: [
      "Loan-book position rebuilt over time, so arrears and provisioning trend properly",
      "Member lifecycle view: joining, saving, borrowing, staying",
      "Social impact reporting built from the ledger rather than estimated",
      "A board pack that regenerates itself every month",
    ],
    outputs: "A board pack that stands up to a regulator and a member AGM alike.",
    metrics: ["Loan book value", "Arrears 30+", "Member growth", "Savings per member", "Cost-income ratio"],
  },
  {
    slug: "b2b-services",
    label: "B2B Services",
    group: "Technology",
    tagline: "Pipeline, delivery margin and account health from one definition.",
    intro:
      "In B2B the deal and the delivery are measured by different teams, in different systems, on different definitions. Sales forecasts optimistically, delivery reports late, and nobody can say which accounts actually make money. We join the commercial and delivery sides so the answer is one number.",
    pains: [
      "CRM pipeline and delivered revenue never reconcile",
      "Delivery margin per account unknown until the quarter closes",
      "Renewal risk spotted after the renewal conversation, not before",
      "Every board meeting starts with rebuilding the same numbers",
    ],
    builds: [
      "Opportunity-to-cash timeline joining CRM, delivery and finance",
      "Account-level margin including delivery cost and time",
      "Leading indicators for renewal and expansion risk",
      "A commercial pack the sales and delivery leads both sign off",
    ],
    outputs: "One view of which accounts are worth more effort, and which are quietly costing you.",
    metrics: ["Pipeline coverage", "Win rate", "Delivery margin", "Net revenue retention", "Utilisation"],
  },
  {
    slug: "wholesale",
    smeObjection: true,
    label: "Wholesale & Distribution",
    group: "Commerce & supply",
    tagline: "Customer profitability, stock turn and true landed margin.",
    intro:
      "Wholesale margin hides in the detail — rebates, drop sizes, carriage, returns and payment terms all move it, and none of them sit in the same report. We rebuild margin at the line level so pricing and range decisions stop being guesses.",
    pains: [
      "True margin per customer buried under rebates, carriage and terms",
      "Stock turn and dead stock reported too late to act",
      "Trade pricing decisions made without knowing the current margin",
      "Rep performance measured on revenue, not contribution",
    ],
    builds: [
      "Line-level margin with rebates, carriage and returns attributed properly",
      "Customer and product contribution ranking that updates itself",
      "Stock turn, ageing and availability in one operational view",
      "Rep and depot performance on contribution rather than revenue",
    ],
    outputs: "Pricing and range decisions made on real margin, the same week.",
    metrics: ["Gross margin", "Contribution per customer", "Stock turn", "Dead stock", "Fill rate"],
  },
  {
    slug: "manufacturing",
    smeObjection: true,
    label: "Manufacturing",
    group: "Commerce & supply",
    tagline: "Cost to make, yield and OEE joined to what you actually sold.",
    intro:
      "Production data and commercial data rarely meet, so nobody can say which lines make money. Shop-floor systems know output, finance knows revenue, and the cost of a unit is an estimate everybody privately doubts. We connect them.",
    pains: [
      "Standard costs stale, so product profitability is a guess",
      "Yield and scrap reported weekly, decided daily",
      "Downtime causes recorded but never analysed",
      "Production and sales data never reconciled",
    ],
    builds: [
      "Actual cost to make per unit, updated as inputs move",
      "Yield, scrap and downtime joined to shift, line and product",
      "Order-to-despatch timeline across production and commercial",
      "Product-level profitability the commercial team trusts",
    ],
    outputs: "A clear answer on which products and lines are worth running.",
    metrics: ["OEE", "Yield", "Scrap rate", "Cost per unit", "On-time in full"],
  },
  {
    slug: "omni-channel-retail",
    label: "Omni-channel Retail",
    group: "Commerce & supply",
    tagline: "True margin by SKU, channel and customer, without the spreadsheet.",
    intro:
      "Retail data is scattered by design — webstore, marketplaces, retailer EDI, ad platforms — and margin truth is buried under returns, promotions and shipping. We land it all and rebuild margin so the trading meeting runs on numbers rather than exports.",
    pains: [
      "Channel data scattered across webstore, marketplaces, retailer EDI and ad platforms",
      "Margin truth buried under returns, promotions and shipping costs",
      "Buying meetings run on stale exports",
      "Customer value measured per channel, never end to end",
    ],
    builds: [
      "Unified order-line history with cleaned promo, returns and COGS attribution",
      "True margin metric tree by SKU, channel and customer segment",
      "Live Summary Page tuned for the trading meeting",
      "Cohort and repeat-purchase view across every channel",
    ],
    outputs: "A live trading pack the buying team trusts more than the spreadsheet.",
    metrics: ["Net revenue", "Gross margin", "Return rate", "AOV", "Repeat rate", "Contribution per SKU"],
  },
  {
    slug: "legal-services",
    label: "Legal Services",
    group: "Professional services",
    tagline: "Case economics, WIP and cost per acquired case, settled.",
    intro:
      "Case management, marketing and finance systems do not talk, so cost per acquired case is a guess and WIP value drifts between fee-earner and finance views. We build one case lifecycle from first touch to settlement.",
    pains: [
      "Case management, marketing and finance systems don't talk",
      "Cost per acquired case is a guess",
      "WIP value drifts between fee-earner views and finance views",
      "Panel and source performance unknown until a case closes",
    ],
    builds: [
      "Case lifecycle history from first touch to settlement",
      "Funnel and lifetime value by panel, source and claim type",
      "Shared WIP and pipeline view for partners and finance",
      "Settlement and duration benchmarks by case type",
    ],
    outputs:
      "A partner pack that is current every time they open it, ending the 'whose number is right?' debate.",
    metrics: ["Cases opened", "Cost per acquired case", "WIP value", "Settlement value", "Time to settle"],
  },
  {
    slug: "customer-service",
    label: "Customer Service",
    group: "Professional services",
    tagline: "Cost to serve, repeat contacts and the root causes behind both.",
    intro:
      "Service operations generate enormous amounts of data and almost no insight. Contacts sit in the telephony platform, cases in the CRM, and the reason people got in touch nowhere at all. We join the contact to the customer and the order behind it, so cost to serve and repeat contact become measurable — and fixable.",
    pains: [
      "Contact data split across phone, email, chat and social, with no single view",
      "Cost to serve unknown, so nobody can price or staff it properly",
      "Repeat contacts counted as new ones, hiding the real failure demand",
      "Agent performance argued from call listening rather than outcomes",
    ],
    builds: [
      "One contact timeline per customer across every channel, joined to the order or account",
      "Cost to serve per contact, per customer and per product",
      "Repeat-contact and root-cause analysis, so failure demand is visible",
      "Deflection and self-serve impact measured against real volume",
    ],
    outputs: "The reasons people contact you, ranked by what fixing them is worth.",
    metrics: [
      "Cost per contact",
      "First-contact resolution",
      "Repeat contact rate",
      "Average handling time",
      "CSAT",
      "Failure demand",
    ],
  },
  {
    slug: "recruitment-training",
    label: "Recruitment & Training",
    group: "Professional services",
    tagline: "Desk margin, time-to-fill and cohort outcomes on one definition.",
    intro:
      "Placement, pipeline and margin data sit across ATS, CRM and payroll, so consultant productivity gets argued from memory. We join them, then wire course and cohort outcomes back to revenue.",
    pains: [
      "Placement, pipeline and margin data spread across ATS, CRM and payroll",
      "Consultant productivity argued from memory",
      "Course completion and outcome data disconnected from revenue",
      "Fall-through absorbed quietly rather than measured",
    ],
    builds: [
      "Candidate and placement timeline from first contact to invoice",
      "Desk-level margin, time-to-fill and fall-through rates",
      "Cohort completion and outcome tracking wired to billing",
      "Consultant performance on contribution, not activity",
    ],
    outputs: "Every desk and every cohort measured the same way, without a spreadsheet.",
    metrics: ["Time to fill", "Desk margin", "Fall-through", "Placements per consultant", "Cohort completion"],
  },
  {
    slug: "saas-startups",
    label: "SaaS & Startups",
    group: "Technology",
    tagline: "Activation, retention and CAC payback that survive diligence.",
    intro:
      "Product events, billing and CRM tell three different growth stories, and the board pack gets rebuilt by hand the week before each meeting. We give you one event history and one definition of every growth metric.",
    pains: [
      "Product events, billing and CRM tell three different growth stories",
      "Board metrics rebuilt by hand the week before each meeting",
      "No activation or retention signal early enough to act on",
      "Diligence questions that take a week to answer",
    ],
    builds: [
      "Every product event recorded once, joined to billing and CRM",
      "Activation, expansion, churn and CAC payback from one definition",
      "An investor-ready pack that regenerates itself",
      "Cohort retention curves from the first cohort onwards",
    ],
    outputs: "The board pack builds itself, and the growth numbers survive diligence.",
    metrics: ["MRR", "Net revenue retention", "Activation rate", "CAC payback", "Logo churn"],
  },
];

export const sectorGroups = [
  "Financial services",
  "Commerce & supply",
  "Professional services",
  "Technology",
] as const;

export const getSector = (slug: string) => sectors.find(s => s.slug === slug);
export const sectorsByGroup = (group: string) => sectors.filter(s => s.group === group);
