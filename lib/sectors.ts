/**
 * Sector content, kept as data so a new sector is an entry here rather than a
 * new page. Each one gets its own route at /sectors/[slug], which is what makes
 * focused landing pages possible — send a consumer-credit prospect to the
 * consumer-credit page, not to a general homepage with a tab they have to find.
 *
 * `group` drives how they cluster on the index. `metrics` are the numbers that
 * sector argues about internally — naming them is most of the credibility.
 */
import { entryMonthlyK, entryYearK } from "@/lib/economics";
export type Sector = {
  slug: string;
  label: string;
  group: "Financial services" | "Commerce & supply" | "Professional services" | "Technology";
  /** One line, used on cards and as the page's sub-headline. */
  tagline: string;
  /**
   * A complete, self-contained meta description under ~155 characters. Written
   * out rather than generated, because slicing tagline+intro to a fixed length
   * cut every sector page off mid-sentence in the SERP.
   */
  metaDescription: string;
  /** Two or three sentences for the top of the sector page. */
  intro: string;
  pains: string[];
  builds: string[];
  outputs: string;
  /** The metrics this sector lives or dies by. */
  metrics: string[];
  /**
   * Three to five sector-specific questions, rendered on the page and marked up
   * as FAQPage schema. Answers lead with a direct sentence so they are snippet-
   * and voice-extractable, and every commitment matches the rest of the site.
   */
  faqs: { q: string; a: string }[];
  /**
   * A longer, sector-specific narrative — what an engagement in this sector
   * actually looks like. Written per sector rather than templated, so it adds
   * unique depth and breaks the wrapper duplication the thin pages shared. Each
   * paragraph is illustrative of a typical engagement, not a named client.
   */
  deepDive: { heading: string; paragraphs: string[] };
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
    metaDescription:
      "One customer timeline from application to collections, Consumer Duty evidence with a full audit trail, and one contribution number everyone agrees on.",
    deepDive: {
      heading: "Inside a consumer credit engagement",
      paragraphs: [
        "A lender usually arrives with the data spread across an origination platform, a decisioning engine fed by bureau data, a servicing system and a collections dialler, with marketing spend sitting in a fourth place again. Each team trusts its own extract, so the approval rate risk quotes, the funded volume finance books and the acquisition cost growth defends never quite reconcile — and the monthly contribution number is rebuilt by hand every board cycle from whichever version won the argument that month.",
        "We land the events behind all of it — application, decision, funding, payment, contact, arrears status — in your own BigQuery, recorded once with the time each happened, and rebuild the loan-book position back as far as the data allows. That history is usually the unlock: vintage cohorts and roll rates that never existed become reportable, and the leaks show themselves. A typical one is a channel with a healthy approval rate and quietly worse vintage loss than the book average, which no departmental report was ever built to catch because origination and collections are measured by different people.",
        "Once it is live the credit committee works from cohorts that are current rather than a month old, Consumer Duty outcome reporting regenerates itself with a full audit trail behind every figure, and risk, finance and growth argue about what to do rather than about whose number is right. The affordability and arrears views update on the same definitions the board pack uses, so the decision and the evidence for it come from one place.",
      ],
    },
    faqs: [
      {
        q: "How do you produce Consumer Duty evidence from our data?",
        a: `We land every event — application, decision, funding, contact, payment — in your own BigQuery as an immutable history, then build outcome reporting on top with a full audit trail behind each number. The evidence regenerates itself rather than being assembled by hand as the deadline approaches.`,
      },
      {
        q: "Can you rebuild vintage cohorts and roll rates if our system only holds today's position?",
        a: `Yes. Most lending systems store the current balance and no history, so cohorts and roll rates do not exist to report. We reconstruct the position over time from the events, so vintage loss, roll rates and arrears trends become reportable — usually further back than you expect.`,
      },
      {
        q: "How much does it cost for a consumer credit lender, and how fast?",
        a: `Solving one area — usually risk or collections reporting — is £${entryYearK}k a year, billed at £${entryMonthlyK}k a month, in your own Google environment. You see a real number within the first week, and the reporting behind it lands over the following two to three months.`,
      },
    ],
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
    metaDescription:
      "Collections performance, treatment outcomes and fair-value evidence joined in one place — cure, breakage and cost to collect on a single definition.",
    deepDive: {
      heading: "Inside a debt management engagement",
      paragraphs: [
        "Collections runs on more operational data than almost any other function and turns almost none of it into evidence. Contact outcomes sit in the dialler, arrangements in the servicing system, payments with the provider, and complaints and vulnerability notes somewhere else again. So treatment effectiveness gets argued from agent anecdote, and cure and breakage are recalculated by hand each month from exports that never quite line up.",
        "We join those systems into one timeline per customer — every contact, arrangement, payment and outcome in order — in your own BigQuery, and carry the vulnerability and forbearance flags through with it rather than dropping them at the reporting boundary. The pattern that usually surfaces first is a treatment pathway that looks strong on cure but quietly high on breakage a few months out, which a point-in-time cure number was never going to show. Measuring by cohort and pathway makes the difference between a strategy that works and one that only appears to.",
        "The output is fair-value and vulnerable-customer evidence with the working shown, and treatment performance you can actually act on: which pathways to expand, which to retire, and where a cohort is being harmed rather than helped. Cost to collect, contact-to-arrangement and promise-kept rates all read from the same events, so an operational decision and its regulatory evidence are the same number rather than two reconciliations.",
      ],
    },
    faqs: [
      {
        q: "Can you measure whether a treatment strategy actually works?",
        a: `Yes — that is usually the first thing we build. We join contact outcomes from the dialler, arrangements from the servicing system and payments into one customer timeline, then measure cure and breakage by cohort and pathway. You see which treatments work and where one quietly does not.`,
      },
      {
        q: "How do you evidence fair value and vulnerable-customer outcomes?",
        a: `We carry vulnerability and forbearance flags through from the operational systems into the reporting layer, so outcome reporting shows the working rather than a headline number. Every figure has an auditable trail back to the events behind it, which is what a fair-value review needs.`,
      },
      {
        q: "Our contact, arrangement and payment data live in three systems — is that a problem?",
        a: `No, that is the normal starting point. We connect each system and land its events in your own BigQuery, then join them into one timeline per customer. Nothing has to be migrated or replaced — we work in your environment and read from the systems you already run.`,
      },
    ],
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
    metaDescription:
      "Loan-book health, member value and social impact you can actually show — a board pack that regenerates itself, without adding headcount.",
    deepDive: {
      heading: "Inside a credit union engagement",
      paragraphs: [
        "A credit union carries the reporting expectations of a bank on a fraction of the resource. The core banking system holds today's balances but not the history behind them, the board pack is assembled by hand from several exports as somebody's weekend, and member value and social impact are asserted in the annual report rather than measured. Arrears look like a single current figure because only the current position is stored, so the trend that would let you act early simply is not there.",
        "We take the ledger events into your own BigQuery and rebuild the loan-book position over time, so arrears and provisioning trend properly and a developing problem is visible while it is still small. Alongside that we build a member lifecycle view — joining, saving, borrowing, staying — and social impact reporting drawn from the ledger itself rather than estimated. None of it needs a new hire or a platform migration; we work in your own environment and read from the systems you already run.",
        "What the board gets is a pack that regenerates itself every month and stands up to a regulator and a member AGM alike, because every number traces back to the underlying data. Loan-book value, arrears, member growth, savings per member and the cost-income ratio all come from one definition, so the conversation moves from assembling the numbers to deciding what to do about them.",
      ],
    },
    faqs: [
      {
        q: "Can a credit union afford this without adding headcount?",
        a: `Yes — the point is to get bank-grade reporting without bank-grade resource. Solving one area is £${entryYearK}k a year at £${entryMonthlyK}k a month, in your own Google environment, with no new hire to make or manage. The board pack that used to be someone's weekend regenerates itself.`,
      },
      {
        q: "Our core banking system holds balances but not history — can you still trend arrears?",
        a: `Yes. We rebuild the loan-book position over time from the ledger events, so arrears and provisioning trend properly instead of showing only today's figure. That history is what lets you see a problem developing rather than reporting it after it has arrived.`,
      },
      {
        q: "Can you evidence member value and social impact for the AGM?",
        a: `We build social impact and member-value reporting from the ledger itself rather than from estimates, alongside a member lifecycle view of joining, saving, borrowing and staying. It stands up to a regulator and to a member AGM alike because every number traces back to the data.`,
      },
    ],
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
    metaDescription:
      "Pipeline, delivery margin and account health from one definition — see which accounts actually make money before the quarter closes.",
    deepDive: {
      heading: "Inside a B2B services engagement",
      paragraphs: [
        "In a services business the deal and the delivery are owned by different people, measured in different systems, on different definitions. Sales forecasts from the CRM, delivery reports from a PSA or a stack of timesheets, and finance books the revenue somewhere the other two never see. So pipeline and delivered revenue never reconcile, and account-level margin — the number that actually tells you which clients are worth keeping — is unknown until the quarter closes, if it is knowable at all.",
        "We build one opportunity-to-cash timeline that joins CRM, delivery and finance in your own BigQuery, with delivery cost and time attributed to the account that consumed them. The account that most often surprises people is the marquee logo that looks excellent on revenue and turns out thin or negative on margin once the servicing effort behind it is counted. The same history exposes leading indicators for renewal and expansion risk, so a churn conversation happens before the renewal date rather than at it.",
        "Once it is live the commercial and delivery leads sign off one set of numbers, and the board meeting stops opening with a rebuild of the same figures. Win rate, delivery margin, net revenue retention and utilisation all read from one definition, so effort goes to the accounts worth more of it and away from the ones quietly costing you.",
      ],
    },
    faqs: [
      {
        q: "Why do our CRM pipeline and delivered revenue never reconcile?",
        a: `Because sales and delivery measure different things, in different systems, on different definitions. We build one opportunity-to-cash timeline joining CRM, delivery and finance, so pipeline, delivered revenue and margin all resolve from the same events instead of three teams' spreadsheets.`,
      },
      {
        q: "Can you show delivery margin per account before the quarter closes?",
        a: `Yes. We build account-level margin that includes delivery cost and time, updated as the work happens rather than reconciled at quarter-end. You can see which accounts are worth more effort and which are quietly costing you, in time to do something about it.`,
      },
      {
        q: "How much does it cost and how quickly do we see something?",
        a: `Solving one area — usually the commercial-plus-delivery view — is £${entryYearK}k a year at £${entryMonthlyK}k a month, built in your own Google environment. A real number is in front of you within a week, with the full commercial pack live over the following months.`,
      },
    ],
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
    metaDescription:
      "True landed margin by customer and product, stock turn and dead stock in one view — so pricing and range decisions run on real margin, the same week.",
    deepDive: {
      heading: "Inside a wholesale and distribution engagement",
      paragraphs: [
        "Wholesale margin hides in the detail. Rebates, drop sizes, carriage, returns and payment terms all move it, and none of them sit in the same report, so the headline gross margin on the sales report and the real contribution a customer leaves behind can be a long way apart. Reps are measured on revenue because that is the number that is easy to pull, stock turn and dead stock are reported too late to act on, and trade pricing decisions get made without anyone knowing the current margin they are pricing against.",
        "We rebuild margin at the line level in your own BigQuery, with rebates, carriage and returns attributed to the order and customer that caused them, and join it to stock so ageing and availability sit in the same view. The customer that most often turns out to be a problem is a high-revenue account whose rebate structure and carriage cost quietly make it one of the least profitable you serve — invisible on revenue, obvious on contribution. Dead stock becomes visible while there is still a decision to make on it rather than after.",
        "The result is that pricing and range decisions run on real margin the same week, rep and depot performance is measured on contribution rather than revenue, and a customer or product ranking that updates itself replaces the quarterly spreadsheet. You do not need a data team or a platform project for it — the work happens in your environment, on the systems you already run.",
      ],
    },
    faqs: [
      {
        q: "Our true margin is buried under rebates, carriage and terms — can you untangle it?",
        a: `Yes. We rebuild margin at the line level with rebates, carriage, returns and payment terms all attributed properly, so margin per customer and per product stops being a guess. Pricing and range decisions then run on real contribution rather than headline revenue.`,
      },
      {
        q: "Can you show stock turn and dead stock early enough to act?",
        a: `Yes — stock turn, ageing and availability land in one operational view that updates itself, rather than a report that arrives too late to do anything about. Dead stock becomes visible while there is still a decision to make on it.`,
      },
      {
        q: "We're a distributor, not a tech company — is this really for us?",
        a: `It is built for exactly this. You do not need a data team or a platform project: we work in your own Google environment, read from the systems you already run, and put real margin in front of you within a week. Solving one area is £${entryYearK}k a year at £${entryMonthlyK}k a month.`,
      },
    ],
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
    metaDescription:
      "Actual cost to make, yield and OEE joined to what you actually sold — a clear answer on which products and lines are worth running.",
    deepDive: {
      heading: "Inside a manufacturing engagement",
      paragraphs: [
        "Production data and commercial data rarely meet. The shop-floor systems know output, yield and downtime, the ERP carries a standard cost that went stale months ago, and finance knows revenue — so the actual cost to make a unit is an estimate everybody privately doubts, and nobody can say with confidence which lines make money. Yield and scrap are reported weekly but decided daily, and downtime causes are recorded and then never analysed.",
        "We land the shop-floor and commercial events together in your own BigQuery and build an order-to-despatch timeline across both, with an actual cost to make per unit that updates as inputs move rather than once a year. The line that usually surprises people is one with strong OEE and disappointing margin, because the scrap rate and input cost eating it were never joined to the product it affected. Yield, scrap and downtime tied to shift, line and product turn a weekly report into something you can act on the same day.",
        "Once it is live the commercial team has product-level profitability it actually trusts, and the answer to which products and lines are worth running stops being a matter of opinion. OEE, yield, scrap rate, cost per unit and on-time-in-full all read from the same events, so an operational fix on the floor and its effect on margin are visible in one place.",
      ],
    },
    faqs: [
      {
        q: "Can you tell us the real cost to make a unit?",
        a: `Yes. We build actual cost to make per unit, updated as inputs move, rather than the stale standard cost most product profitability rests on. Joined to what you sold, it gives the commercial team a product-level profitability number they can actually trust.`,
      },
      {
        q: "Our shop-floor and finance systems don't talk — can you connect them?",
        a: `That join is the core of the work. Shop-floor systems know output, finance knows revenue, and the two rarely meet. We land both in your own BigQuery and build an order-to-despatch timeline across production and commercial, so which lines make money stops being an argument.`,
      },
      {
        q: "How do you handle yield, scrap and downtime?",
        a: `We join yield, scrap and downtime to shift, line and product, so causes recorded but never analysed finally get analysed. Reported weekly but decided daily becomes a live operational view, which is where OEE improvement actually comes from.`,
      },
    ],
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
    metaDescription:
      "True margin by SKU, channel and customer without the spreadsheet — a live trading pack the buying team trusts more than exports.",
    deepDive: {
      heading: "Inside an omni-channel retail engagement",
      paragraphs: [
        "Retail data is scattered by design. The webstore, the marketplaces, retailer EDI, the 3PL and the ad platforms each hold a piece, and margin truth is buried under returns, promotions and shipping that land in different places at different times. So the buying meeting runs on stale exports, a SKU's gross margin looks nothing like its real contribution once returns and ad spend are counted, and customer value is measured per channel and never end to end.",
        "We land every channel into one unified order-line history in your own BigQuery, with promotions, returns and cost of goods attributed cleanly, and build a true-margin metric tree by SKU, channel and customer segment on top of it. The SKU that most often needs a second look is a bestseller on gross margin that a high return rate and its acquisition cost quietly turn into a marginal one. A cohort and repeat-purchase view that spans every channel replaces the per-channel snapshots, so a customer acquired on a marketplace and retained on the webstore is finally counted as one.",
        "What the trading meeting gets is a live Summary Page tuned for exactly that conversation, current every time it is opened — which is why the buying team ends up trusting it more than the spreadsheet. Net revenue, gross margin, return rate, AOV, repeat rate and contribution per SKU all read from one definition, so the range and pricing calls are made on real margin rather than on last week's export.",
      ],
    },
    faqs: [
      {
        q: "Can you unify webstore, marketplaces, retailer EDI and ad platforms?",
        a: `Yes. We land every channel — webstore, marketplaces, retailer EDI and ad platforms — into one unified order-line history in your own BigQuery, with promotions, returns and COGS attributed cleanly. Margin truth stops being buried under the things that distort it.`,
      },
      {
        q: "Will the trading meeting finally run on live numbers instead of exports?",
        a: `That is the point of it. We build a live Summary Page tuned for the trading meeting, plus a true-margin metric tree by SKU, channel and customer segment. The buying team ends up trusting it more than the spreadsheet, because it is current every time they open it.`,
      },
      {
        q: "Can you measure customer value across every channel, not per channel?",
        a: `Yes. We build a cohort and repeat-purchase view that spans every channel end to end, rather than measuring a customer separately in each one. That is what makes AOV, repeat rate and contribution per SKU comparable across the whole business.`,
      },
    ],
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
    metaDescription:
      "Case economics from first touch to settlement — cost per acquired case, WIP value and a partner pack that is current every time they open it.",
    deepDive: {
      heading: "Inside a legal services engagement",
      paragraphs: [
        "In a law firm the case management system, the marketing stack and the finance or practice-management system do not talk, so the economics of a case are guessed rather than known. Cost per acquired case is a back-of-envelope number, WIP value drifts between what the fee-earners think it is and what finance will recognise, and panel or marketing-source performance is invisible until a case closes months or years later.",
        "We build one case lifecycle in your own BigQuery, from first marketing touch through to settlement, and join the spend, the WIP and the outcome to it. The source that usually gets reconsidered is one delivering cheap leads that convert into low-settlement, long-duration cases — attractive on cost per lead, poor on what actually matters. A shared WIP and pipeline view that partners and finance both read from the same definition ends the recurring argument about whose number is right.",
        "The partner pack is then current every time it is opened rather than rebuilt for each meeting, and funnel and lifetime value by panel, source and claim type make marketing spend a decision rather than a hope. Cost per acquired case, WIP value, settlement value and time to settle all come from one place, with settlement and duration benchmarks by case type behind them.",
      ],
    },
    faqs: [
      {
        q: "Can you tell us our true cost per acquired case?",
        a: `Yes. We join marketing, case management and finance into one case lifecycle from first touch to settlement, so cost per acquired case stops being a guess. You can then see funnel and lifetime value by panel, source and claim type, and put spend where it actually pays.`,
      },
      {
        q: "WIP value differs between fee-earners and finance — can you reconcile it?",
        a: `Yes. We build a shared WIP and pipeline view that partners and finance read from the same definition, so the "whose number is right?" debate ends. The partner pack is current every time it is opened rather than rebuilt for each meeting.`,
      },
      {
        q: "How much does it cost for a law firm and how quickly does it land?",
        a: `Solving one area is £${entryYearK}k a year at £${entryMonthlyK}k a month, in your own Google environment. You get a real number within the first week, with settlement and duration benchmarks by case type building out over the following months.`,
      },
    ],
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
    metaDescription:
      "Cost to serve, repeat contacts and the root causes behind both — the reasons people contact you, ranked by what fixing them is worth.",
    deepDive: {
      heading: "Inside a customer service engagement",
      paragraphs: [
        "Service operations generate an enormous amount of data and almost no insight. Contacts sit in the telephony platform, cases in the CRM, chat and social in their own tools, and the actual reason a customer got in touch is captured nowhere consistent. So cost to serve is unknown, which means nobody can price or staff it properly, and repeat contacts get counted as fresh ones, hiding the failure demand underneath the volume.",
        "We join every contact into one timeline per customer across phone, email, chat and social, tied back to the order or account behind it, in your own BigQuery. That is what makes cost to serve measurable per contact, per customer and per product, and it turns repeat-contact and root-cause analysis into something concrete: the product fault or broken journey generating a disproportionate share of your contacts stops being a hunch and becomes a ranked list. Deflection and self-serve impact get measured against real volume rather than against a vendor's claim.",
        "The output is the reasons people contact you, ranked by what fixing each one is worth — so the roadmap argument is settled with a number. Cost per contact, first-contact resolution, repeat contact rate, average handling time and failure demand all read from one definition, and agent performance moves onto outcomes rather than call-listening.",
      ],
    },
    faqs: [
      {
        q: "Can you tell us our real cost to serve?",
        a: `Yes. We build cost to serve per contact, per customer and per product by joining the contact to the customer and the order behind it. Once it is measurable you can price and staff service properly instead of guessing at it.`,
      },
      {
        q: "How do you separate repeat contacts from genuinely new ones?",
        a: `We join every contact into one timeline per customer across phone, email, chat and social, so a repeat contact is recognised as one rather than counted as new. That reveals the failure demand hiding in your volume — and its root causes, ranked by what fixing them is worth.`,
      },
      {
        q: "Can you measure whether self-serve and deflection actually work?",
        a: `Yes. We measure deflection and self-serve impact against real volume rather than against a vendor's claim, so you can see what genuinely reduces contacts. Agent performance moves onto outcomes instead of call-listening anecdote at the same time.`,
      },
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
    metaDescription:
      "Desk margin, time-to-fill, fall-through and cohort outcomes on one definition — every desk measured the same way, without a spreadsheet.",
    deepDive: {
      heading: "Inside a recruitment and training engagement",
      paragraphs: [
        "Placement, pipeline and margin data sit across the ATS, the CRM and payroll, and training outcomes sit in an LMS disconnected from all of it. So consultant productivity gets argued from memory, fall-through is absorbed quietly rather than measured, and the course completion data that should prove value to a client never gets joined back to the revenue it drove.",
        "We build a candidate and placement timeline from first contact to invoice in your own BigQuery, and wire cohort completion and outcome tracking to billing alongside it. The desk that usually looks different under this lens is the one that appears productive on raw placements but poor on margin once fall-through and time-to-fill are counted properly. Fall-through in particular stops being a cost the business absorbs silently and becomes a number, which is often the fastest margin improvement available once it is finally visible.",
        "Every desk and every cohort then gets measured the same way, without a spreadsheet — consultant performance on contribution rather than activity, and training outcomes against the revenue they actually produced. Time to fill, desk margin, fall-through, placements per consultant and cohort completion all read from one definition.",
      ],
    },
    faqs: [
      {
        q: "Can you measure consultant and desk productivity properly?",
        a: `Yes. We build a candidate and placement timeline from first contact to invoice across ATS, CRM and payroll, then measure desk margin, time-to-fill and placements per consultant on one definition. Productivity stops being argued from memory and gets measured on contribution.`,
      },
      {
        q: "Is fall-through actually measured, or just absorbed?",
        a: `Most agencies absorb it quietly — we make it a number. Fall-through is tracked by desk and cohort so its real cost is visible, which is usually the fastest margin improvement available once you can finally see it.`,
      },
      {
        q: "Can you connect training course outcomes to revenue?",
        a: `Yes. We wire cohort completion and outcome tracking back to billing, so course and cohort performance is measured against revenue rather than sitting disconnected from it. Every desk and every cohort ends up measured the same way, without a spreadsheet.`,
      },
    ],
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
    metaDescription:
      "Activation, retention and CAC payback from one event history — an investor-ready board pack that regenerates itself and survives diligence.",
    deepDive: {
      heading: "Inside a SaaS and startups engagement",
      paragraphs: [
        "Product events, billing and CRM tell three different growth stories, and reconciling them is a job nobody has time for, so the board pack gets rebuilt by hand the week before each meeting. Activation and retention signals arrive too late to act on, and the diligence questions an investor asks — cohort retention from the first cohort, true CAC payback, net revenue retention on a defined basis — take a week to answer because the underlying numbers have never been agreed.",
        "We record every product event once in your own BigQuery and join it to billing and CRM, so activation, expansion, churn and CAC payback all come from one definition rather than three conflicting ones. The pattern that early-stage teams most often need to see is an activation rate that looks healthy while the earliest cohorts are quietly decaying on retention — invisible until the events are joined and the cohorts are cut properly. Because the history is immutable, doing this early matters: the event trail you capture now is what later cohort analysis depends on and cannot be recovered retrospectively.",
        "The board pack then regenerates itself, the growth numbers survive diligence because every one traces to an event rather than a spreadsheet, and a diligence question that used to take a week becomes a query. MRR, net revenue retention, activation rate, CAC payback and logo churn all read from one definition, with cohort retention curves running from your first cohort onward.",
      ],
    },
    faqs: [
      {
        q: "Our product events, billing and CRM tell three different growth stories — can you fix that?",
        a: `Yes. We record every product event once and join it to billing and CRM in your own BigQuery, so activation, expansion, churn and CAC payback all come from one definition. The three conflicting stories collapse into one set of numbers everyone works from.`,
      },
      {
        q: "Will the metrics survive investor diligence?",
        a: `That is the bar we build to. Because every metric derives from an immutable event history rather than a hand-built spreadsheet, the numbers are consistent and auditable, and diligence questions that used to take a week become a query. Cohort retention runs from your first cohort onwards.`,
      },
      {
        q: "We're early — is it worth doing this now?",
        a: `Doing it early is the advantage: the event history you capture now is what later cohort and retention analysis depends on, and it cannot be recovered retrospectively. Solving one area is £${entryYearK}k a year at £${entryMonthlyK}k a month, in your own Google environment, and the board pack then builds itself.`,
      },
    ],
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
