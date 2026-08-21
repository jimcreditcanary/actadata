/**
 * One content model for the blog: case studies and thought-leadership pieces
 * live in the same array, separated by `kind`.
 *
 * Two systems would drift — a case study written as a "post" and another written
 * as a "case study" would eventually disagree about what a case study is. So a
 * case study is just a post that also carries stats/situation/work/outcome, and
 * the post page renders those extra blocks when they exist.
 *
 * Everything keyed off the case-study list degrades to nothing when it is empty:
 * /case-studies explains itself instead of showing placeholder cards, its nav
 * link does not appear, the home page falls back to the insight pieces, the
 * site-wide testimonial disappears, and the sitemap omits the detail pages. That
 * still holds — it is how the site behaved before the first study was published,
 * and how it would behave again if one were withdrawn.
 *
 * TEMPLATE — copy one, fill it in, delete the comment. `slug` is the URL.
 *
 * A THOUGHT-LEADERSHIP PIECE:
 *   {
 *     slug: "why-your-dashboards-are-not-the-problem",
 *     kind: "insight",
 *     title: "Your dashboards are not the problem",
 *     excerpt: "One sentence that makes someone want to read it.",
 *     published: "2026-08-12",            // YYYY-MM-DD, drives ordering
 *     readingMinutes: 4,
 *     author: "Shaun Adams",
 *     sector: "consumer-credit",          // optional, must match a sector slug
 *     body: [
 *       { type: "p", text: "Opening paragraph." },
 *       { type: "h2", text: "A section heading" },
 *       { type: "p", text: "More prose." },
 *       { type: "ul", items: ["A point", "Another point"] },
 *       { type: "quote", text: "A pulled-out line.", attribution: "Optional" },
 *     ],
 *   }
 *
 * A CASE STUDY — same shape, plus the four case-study fields:
 *   {
 *     slug: "consumer-duty-reporting-in-three-months",
 *     kind: "case-study",
 *     title: "Consumer Duty reporting, live in three months",
 *     excerpt: "One paragraph a prospect reads in ten seconds.",
 *     published: "2026-08-08",
 *     readingMinutes: 5,
 *     client: "Confidential lender",      // or the real name once cleared
 *     sector: "consumer-credit",
 *     stats: [
 *       { figure: "3 months", label: "From nothing to live reporting" },
 *       { figure: "4 yrs", label: "Of history rebuilt where none existed" },
 *     ],
 *     situation: ["Bullet per problem they arrived with."],
 *     work: ["Bullet per thing we actually built."],
 *     outcome: ["Bullet per result, ideally with a number."],
 *     quote: { text: "Optional client quote.", name: "", role: "" },
 *     body: [],                            // optional extra prose after the above
 *   }
 */
export type PostBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string; attribution?: string };

export type PostStat = { figure: string; label: string };

export type Post = {
  slug: string;
  kind: "case-study" | "insight";
  title: string;
  /**
   * Optional shorter title for the <title> tag only, when the on-page headline
   * runs past the ~60-char SERP display limit once " | Acta Data" is appended.
   * The visible H1 still uses `title`.
   */
  seoTitle?: string;
  excerpt: string;
  /** YYYY-MM-DD. */
  published: string;
  readingMinutes: number;
  author?: string;
  /** Sector slug, so the piece can surface on that sector page. */
  sector?: string;
  body: PostBlock[];

  /** Case-study only. */
  client?: string;
  stats?: PostStat[];
  situation?: string[];
  work?: string[];
  outcome?: string[];
  quote?: { text: string; name?: string; role?: string };
  /**
   * Optional path under /public to a one-page PDF of the study. When present the
   * post page offers it as a download and the schema advertises it as
   * associatedMedia, so the leave-behind a salesperson emails and the page a
   * prospect lands on are the same document.
   */
  pdf?: string;
};

/**
 * Thought-leadership pieces. Each one argues a position Acta Data already takes
 * publicly elsewhere on the site, at length — the shared-drive folder, the
 * spreadsheet trap, data before agents, and the four atomic units. No client
 * facts and no figures appear in any of them, deliberately: everything here is
 * argument, so nothing needs a source we cannot show.
 *
 * The folder piece is the only one carrying a `sector`, which puts it on
 * /sectors/wholesale — that page's writing section renders nothing without it.
 * Add a sector only where a piece genuinely belongs to one; a general argument
 * tagged to a sector just makes the sector page look thinner than it is.
 */
const insightPosts: Post[] = [
  {
    slug: "your-data-team-is-a-folder",
    kind: "insight",
    title: "Your data team is a folder on a shared drive",
    excerpt:
      "It is called Reports, it has 240 files in it, and every one of them is a question the business asks every week. That folder is not a failure — it is a specification.",
    published: "2026-08-10",
    readingMinutes: 4,
    author: "Shaun Adams",
    sector: "wholesale",
    body: [
      {
        type: "p",
        text: "Your data team is a folder on a shared drive. It is called Reports, it has about 240 files in it, and it is the reason the business works.",
      },
      {
        type: "p",
        text: "I have been in enough builders merchants, wholesalers and family manufacturers to know that folder by heart. Change the company and the file names barely change:",
      },
      {
        type: "ul",
        items: [
          "Stock take March FINAL v4.xlsx",
          "Debtors chase list (Dave's copy).xlsx",
          "Margin by branch — DO NOT EDIT.xlsx",
          "Quotes outstanding wk32.xlsx",
          "Price list 2026 (new) (2).xlsx",
          "Van costs Sheet1.xlsx",
          "Credit limits master.xlsx",
          "Supplier rebates Q3.xlsx",
        ],
      },
      {
        type: "p",
        text: "Every one of those is a question the business asks every single week. None of them talk to each other. None of them have any history. All of them depend on somebody remembering to update them.",
      },
      { type: "h2", text: "Nobody says the next part out loud" },
      {
        type: "p",
        text: "Those spreadsheets are not a failure. Somebody built each one because the system would not answer the question, and the business has run on them ever since. That person — usually one person — is doing a data engineer's job by hand, on a Sunday, and has been for years.",
      },
      {
        type: "p",
        text: "The risk is not that the workbooks are wrong. Mostly they are right, because whoever maintains them knows exactly where the edges are. The risk is that all of that knowledge is undocumented, unversioned and resident in one head, and the day it walks out of the door the business loses the ability to answer its own questions.",
      },
      { type: "h2", text: "What each of those files is actually costing" },
      {
        type: "p",
        text: "Taken one at a time, the same findings come up in merchant after merchant:",
      },
      {
        type: "ul",
        items: [
          "The stock take tells you what was on the shelf in March. It does not tell you which lines have not moved since, or what that cash would be worth doing something else.",
          "The debtors list is somebody's personal copy, so the chase happens when they remember rather than when an account crosses a limit.",
          "Margin by branch is gross margin, so the branch that absorbs the deliveries and the returns still looks like the good one.",
          "Quotes outstanding has no win rate in it, and no record of which quotes went cold or why.",
          "Two price lists are in circulation and the trade counter has the older one.",
          "Van costs sit in their own file, so cost to serve per drop — where the margin actually goes — is never in the same place as the margin.",
          "Credit limits were set once, years ago, on customers who have since doubled or halved.",
          "Rebate thresholds get hit or missed without anyone noticing until the quarter closes.",
        ],
      },
      {
        type: "p",
        text: "Not one of those needs AI to fix. They need the eight files to be one thing.",
      },
      { type: "h2", text: "Why it has become urgent rather than annoying" },
      {
        type: "p",
        text: "Manual reconciliation was survivable while a report was the endpoint. It stops being survivable the moment you want software to act on the numbers.",
      },
      {
        type: "p",
        text: "An agent has no way of knowing that the third tab is the one to believe. It cannot see that Dave excludes inter-branch transfers, that the March file was never finished, or that the margin column carries a manual adjustment somebody typed in during a stocktake two years ago. Point a model at that folder and it will answer confidently and wrongly, at speed, to more people than the workbook ever reached.",
      },
      {
        type: "quote",
        text: "You cannot put AI on top of a process that gets settled by human judgement in a workbook every month.",
      },
      { type: "h2", text: "What replaces it" },
      {
        type: "p",
        text: "Not a dashboard. The eight questions in that folder become one layer: every source connected, every activity recorded once with the time it happened, and the definitions written down as code rather than remembered. After that the questions are queries against one thing, instead of eight files that have to be reconciled before anyone can answer anything.",
      },
      {
        type: "p",
        text: "The person who currently maintains the folder does not lose their job. They stop being the pipeline and start being the person who says what to do about what the numbers show — which is what you hired them for in the first place.",
      },
      { type: "h2", text: "And you are not too small" },
      {
        type: "p",
        text: "If you are a merchant or a distributor reading this and thinking data and AI is not for you, it is more for you than it is for the tech companies. You are the one still doing it by hand.",
      },
      {
        type: "p",
        text: "You are also the size where it pays back fastest. A large corporate needs a multi-year programme and a steering committee, because it has forty systems and nine countries to reconcile first. A hundred-person merchant needs a few months, because the whole operation genuinely fits in one layer — one stock system, one finance system, one CRM if you are lucky, and the folder in between.",
      },
      {
        type: "p",
        text: "And the payback is not a nicer report. It is one dead product line cleared, one bad account repriced, one rebate threshold hit that you would otherwise have missed.",
      },
      {
        type: "quote",
        text: "That folder is not evidence of a problem. It is a specification.",
      },
      {
        type: "p",
        text: "Every file in it is a question the business already decided was worth answering every week, and somebody has already done the hard thinking about what matters — they just had to do it in Excel. Build the layer that answers those eight questions properly and you have not started a data project. You have finished one that has been running by hand for years.",
      },
    ],
  },
  {
    slug: "drowning-in-reconciliation",
    kind: "insight",
    title: "Nobody is drowning in data. They're drowning in reconciliation.",
    seoTitle: "Drowning in reconciliation, not in data",
    excerpt:
      "Month-end isn't slow because the numbers are hard. It's slow because five people are proving to each other that their versions agree.",
    published: "2026-08-08",
    readingMinutes: 4,
    author: "Shaun Adams",
    body: [
      {
        type: "p",
        text: "Every operations team we walk into has the same Monday. Someone exports a file. Someone else exports a different file. A third person joins them in a spreadsheet, notices the totals are out by a few hundred, and spends the morning working out which one to trust. By Wednesday there is a number everyone accepts. By Thursday it is out of date.",
      },
      {
        type: "p",
        text: "The instinct is to call this a data problem. It usually isn't. The data exists — it is in the loan book, the CRM, the payment provider, the call system. The problem is that nobody has agreed, once, in one place, what a customer is, what a sale is, or which timestamp counts. So every report re-litigates it from scratch, by hand, in a workbook one person really understands.",
      },
      { type: "h2", text: "What that actually costs" },
      {
        type: "ul",
        items: [
          "The obvious cost: senior people spending days a month producing numbers instead of acting on them.",
          "The cost nobody books: decisions made on the newest figure someone happens to trust, rather than the right one.",
          "The cost that compounds: when the analyst who owns the workbook leaves, the reporting leaves with them.",
          "The cost that stops you dead later: you cannot put an AI agent on top of a process that gets settled by human judgement in a spreadsheet every month.",
        ],
      },
      {
        type: "p",
        text: "That last one is why this has moved from annoying to urgent. Manual reconciliation was survivable when a report was the endpoint. It is not survivable when you want software to act on the numbers, because an agent has no way of knowing that the third tab is the one to believe.",
      },
      { type: "h2", text: "The fix is boring" },
      {
        type: "p",
        text: "You define the events once — a customer was created, an application was submitted, a payment was taken, a call was answered — and you store them immutably, with the time they happened. Then every report, every dashboard and every agent reads the same events.",
      },
      {
        type: "quote",
        text: "Two people can still disagree about what to do. They can no longer disagree about what happened.",
      },
      {
        type: "p",
        text: "That is not a clever piece of engineering. It is a decision about where the truth lives, taken once and then enforced. What follows is well-trodden: BigQuery to hold it, a modelled layer on top so the definitions are written down as code rather than remembered, and one page that shows the business.",
      },
      { type: "h2", text: "How you know you are in the trap" },
      {
        type: "ul",
        items: [
          "The month-end number changes depending on who produces it.",
          "Someone maintains a workbook whose logic is not written down anywhere.",
          "You have been asked for last year's figures and had to rebuild them.",
          "Board packs are assembled by hand, not generated.",
          "Your best analyst's week is full of extracting rather than thinking.",
        ],
      },
      {
        type: "p",
        text: "If three of those are true, the reporting is not your bottleneck — the absence of an agreed layer underneath it is. Remove the manual reporting entirely and the analyst you already employ becomes the person telling you what to do about the numbers.",
      },
    ],
  },
  {
    slug: "quality-data-before-agents",
    kind: "insight",
    title: "Quality data first. Then the agents.",
    excerpt:
      "An AI output is only ever as good as what sits underneath it. Most failed AI projects are data projects that got skipped.",
    published: "2026-08-08",
    readingMinutes: 3,
    author: "Shaun Adams",
    body: [
      {
        type: "p",
        text: "There is a version of AI adoption that goes: buy the licences, connect the tools, tell everyone to use it, wait for the productivity. It generates a lot of activity and very little operational change, and the reason is almost never the model.",
      },
      {
        type: "p",
        text: "A language model is very good at reasoning over what you give it, and completely indifferent to whether that thing is right. Point it at a warehouse where “active customer” means four different things and it will answer confidently, four different ways, and none of the answers will arrive flagged as suspect. You have not bought intelligence. You have bought a confident guessing machine — and one your team will believe for a while.",
      },
      { type: "h2", text: "What an agent actually needs" },
      {
        type: "p",
        text: "When we put an agent into an operation, it needs three things that have nothing to do with AI:",
      },
      {
        type: "ul",
        items: [
          "Definitions written down as code rather than held in someone's head, so the same question always resolves the same way.",
          "Events with reliable timestamps, so “what changed this week” is a query and not an argument.",
          "A boundary around what it can see, so personal data does not end up in a prompt because nobody thought about it.",
        ],
      },
      {
        type: "p",
        text: "With those, an agent is reasoning over facts and becomes genuinely useful. Without them, every output needs a human to check it — which is exactly the cost you were trying to remove.",
      },
      { type: "h2", text: "The order matters more than the ambition" },
      {
        type: "p",
        text: "We build the data layer first, every time, including when the client came to us for the AI. That is sequence, not caution. The layer is what makes the agents trustworthy, and it is also the part that keeps paying off when you change your mind about which model or which vendor to use.",
      },
      {
        type: "quote",
        text: "Models will keep changing. A clean, well-defined event history will not.",
      },
      { type: "h2", text: "Then put your people where it counts" },
      {
        type: "p",
        text: "The point of the agents is not headcount. It is that repetitive work stops consuming people who are good at judgement. Someone spending their week pulling reports, chasing exceptions and re-keying between systems is someone not spending it on a customer who needs a decision made properly.",
      },
      {
        type: "p",
        text: "So the sequence is: quality data first, then agents on top of it, then your people deployed where a human genuinely does it better. That last part is not the consolation prize. It is the whole return — nobody ever won a customer because their reporting reconciled.",
      },
    ],
  },
  {
    slug: "cost-revenue-conversion-time",
    kind: "insight",
    title: "Cost, revenue, conversion, time",
    excerpt:
      "Four atomic units are enough to describe almost any operation — and to show you where the value is leaking out of it.",
    published: "2026-08-08",
    readingMinutes: 3,
    author: "Shaun Adams",
    body: [
      {
        type: "p",
        text: "Most reporting is organised by department, because that is how the org chart is organised. Marketing has its numbers, operations has its numbers, finance has the ones that count. Each set is internally consistent, none of them join up, and so nobody can answer the question that actually matters: where is effort going in and value not coming out?",
      },
      {
        type: "p",
        text: "We model operations differently. Every activity in a business, whatever the sector, moves at least one of four things:",
      },
      {
        type: "ul",
        items: [
          "Cost — what this step consumes.",
          "Revenue — what it brings in.",
          "Conversion — whether the thing progressed, and to what.",
          "Time — how long it took, and how long it sat waiting.",
        ],
      },
      {
        type: "p",
        text: "Those are the atomic units. Everything else — channel, product, region, underwriter, adviser, tier, cohort — is context layered on top. It sounds like a simplification and it is the opposite: once every activity carries those four measures plus its context, you can cut the entire business the same way and the totals still agree.",
      },
      { type: "h2", text: "Why this finds the leaks" },
      {
        type: "p",
        text: "Value streams leak in the places no departmental report looks, because the leak happens between two departments. A quote that converts brilliantly and then takes nine days to fund. A channel with excellent conversion and a cost per completed case that makes it the worst one you run. A step nobody owns, where a fifth of cases wait a week for a document.",
      },
      {
        type: "p",
        text: "You can only see those when cost, revenue, conversion and time are measured on the same activities, in the same units, against the same definition of what progressed. That is what the layer is for.",
      },
      { type: "h2", text: "What you do with it" },
      {
        type: "p",
        text: "The output is not a bigger dashboard. It is a shortlist. When the whole stream is visible in one place, the argument stops being whose number is right and becomes which of these three things we fix this quarter — and you can put a value on each one before committing anybody to it.",
      },
      { type: "quote", text: "The output is not a bigger dashboard. It is a shortlist." },
      {
        type: "p",
        text: "It also gives you somewhere sensible to point the agents. Something chasing the documents that hold up a fifth of your cases is worth more than a chatbot on the front page — and you only know that is the bottleneck because you took time as seriously as you took revenue.",
      },
    ],
  },
];

/**
 * Case studies — delivered work, published with the client's permission.
 *
 * Every figure here comes from the signed case-study document. Two things are
 * deliberately absent: the size of DRA's book, which is their number to disclose
 * rather than ours, and any claim we cannot point at a source for.
 */
const caseStudyPosts: Post[] = [
  {
    slug: "point-in-time-reporting-in-three-months",
    kind: "case-study",
    title: "From SQL Server and spreadsheets to a live data platform",
    seoTitle: "Consumer Duty reporting, live in three months",
    excerpt:
      "A digital-first debt resolution agency with no way to see its book as it stood last month. Three months later: a nightly feed into BigQuery, 30+ governed definitions, point-in-time history, and seven live reporting products the team run themselves.",
    published: "2026-08-21",
    readingMinutes: 5,
    author: "Shaun Adams",
    client: "The Digital DRA",
    sector: "debt-management",
    pdf: "/acta-data-the-digital-dra-case-study.pdf",
    stats: [
      { figure: "3 months", label: "From manual Excel packs to a live platform" },
      { figure: "30+", label: "Governed views, one set of definitions" },
      { figure: "~60", label: "Consumer Duty metrics, measured monthly" },
      { figure: "7", label: "Reporting products live, board to ops" },
    ],
    situation: [
      "All operational data sat in SQL Server; every report was pulled into Excel and assembled by hand, every month.",
      "Every figure was “as of now” — no way to see the book as it stood at a past date, so nothing could be tracked month on month.",
      "Definitions varied between spreadsheets, so every new question from the board, a client or the FCA meant starting again.",
    ],
    work: [
      "A nightly automated feed into Google BigQuery, in their own cloud environment.",
      "30+ governed views encoding the business's definitions once — revenue, collections, contact, service, Consumer Duty.",
      "Point-in-time history across the whole book: any figure, reconstructed at any month-end.",
      "A reporting suite on top: an FCA Consumer Duty board report, a monthly client pack with a full audit trail, an operations pack that generates its own board PDF, and per-client reports — all in DRA's own brand.",
      "Claude wired into the governed layer, with personal data kept out of it, so the reporting suite is prompt-driven and the team change their own reports.",
    ],
    outcome: [
      "Monthly packs that took days to assemble are produced in minutes, and every figure traces to a governed definition.",
      "Consumer Duty MI went from a once-a-year exercise to standing monthly measurement across roughly 60 metrics per client.",
      "New questions are answered from the platform in hours — including ones the old reporting could not see at all.",
      "Claude is now used across the organisation rather than in development alone, because it finally has governed data and business context to reason over.",
    ],
    quote: {
      text: "The transparency and the speed the Acta Data team work at is refreshing. Being able to query our own data and build our own reports is the biggest step forward we've had in five years — and it has only been three months.",
      name: "Tom Hill",
      role: "Chief Operating Officer, The Digital DRA",
    },
    body: [
      { type: "h2", text: "“As of now” is not a reporting position" },
      {
        type: "p",
        text: "The Digital DRA manages customer accounts at scale for energy, telecoms and consumer-finance clients. All of the operational data sat in SQL Server, and every report came out of it into Excel, by hand, every month.",
      },
      {
        type: "p",
        text: "The bigger problem was not the assembly work. It was that every figure was as of now. There was no way to see the book as it stood at a past month-end — so nothing could be tracked month on month. Not arrears movement, not collections performance, not whether a treatment was working.",
      },
      {
        type: "p",
        text: "That is a reporting gap that quietly becomes a regulatory one. Consumer Duty asks you to demonstrate outcomes over time. If your systems only hold today, you cannot show a trend, because the trend was never stored.",
      },
      {
        type: "quote",
        text: "A system that holds today's position holds no history. There is nothing to trend, because nothing was kept.",
      },
      { type: "h2", text: "The definitions were the real work" },
      {
        type: "p",
        text: "Definitions varied between spreadsheets. So every new question — from the board, a client, or the FCA — started from scratch, and the answer depended on which workbook you asked.",
      },
      {
        type: "p",
        text: "This is where reporting projects actually fail, and it is not a tooling problem. We encoded the definitions once, as 30+ governed views: revenue, collections, contact, service, Consumer Duty. One place where “an account in arrears” means one thing.",
      },
      {
        type: "p",
        text: "Then the part that made it trustworthy on day one: every figure was validated against the client's existing board numbers before go-live. Not reconciled afterwards — matched first, so nobody had to take the new platform on faith.",
      },
      { type: "h2", text: "Point-in-time history for the whole book" },
      {
        type: "p",
        text: "A nightly feed lands the data in their own BigQuery environment, with snapshot history behind it, so any figure can be reconstructed at any month-end.",
      },
      {
        type: "p",
        text: "That single capability is what turned a monthly assembly job into a platform. Once the past is stored properly, “how did this look in March” stops being an archaeology project.",
      },
      {
        type: "p",
        text: "Seven reporting products now run on top of it: an FCA Consumer Duty board report, a monthly client pack with a full audit trail, an operations pack that generates its own board PDF, and per-client reports — all in DRA's own brand.",
      },
      { type: "h2", text: "It was built with their team, not around them" },
      {
        type: "p",
        text: "DRA's team built the nightly feed and supplied the operational knowledge. We designed the data model, encoded and reconciled the definitions, and shipped the reporting suite iteratively.",
      },
      {
        type: "p",
        text: "That split matters. The operational knowledge — why a number moves, which exception matters, what a client needs to see — was already in the building. It usually is. What was missing was somewhere to put it.",
      },
      { type: "h2", text: "Then we gave it to Claude" },
      {
        type: "p",
        text: "A governed layer with the definitions written down and personal data stripped out is exactly what an AI assistant needs and almost never gets. Point a model at a folder of spreadsheets and it answers confidently from whichever one it was handed. Point it at a layer where “an account in arrears” has one meaning, and it reasons over the business.",
      },
      {
        type: "p",
        text: "So the reporting suite became prompt-driven. Tom Hill, their COO, changes his own reports — no ticket, no developer, no waiting for us. Claude is now used across the organisation rather than in one corner of it.",
      },
      {
        type: "p",
        text: "The technology was available to them before we arrived. What was missing was the layer underneath it.",
      },
      { type: "h2", text: "What we handed over" },
      {
        type: "p",
        text: "We showed our work throughout, validated every number against what they already trusted, and handed over a platform they own outright in their own cloud environment.",
      },
      {
        type: "p",
        text: "That is the model. We set it up properly, and you take it as far as you want — with us, or on your own. The measure of the engagement is not how long we stay.",
      },
      {
        type: "p",
        text: "If your regulatory reporting is assembled by hand every month, and your systems only hold today's position, the problem is not the spreadsheet. It is that nothing underneath it was ever built. Three months is a realistic timeline for fixing that.",
      },
    ],
  },
];

export const posts: Post[] = [...caseStudyPosts, ...insightPosts];

export const KIND_LABEL: Record<Post["kind"], string> = {
  "case-study": "Case study",
  insight: "Insight",
};

const byNewest = (a: Post, b: Post) => b.published.localeCompare(a.published);

export const allPosts = () => [...posts].sort(byNewest);
export const caseStudies = () => allPosts().filter(p => p.kind === "case-study");
export const insights = () => allPosts().filter(p => p.kind === "insight");
export const getPost = (slug: string) => posts.find(p => p.slug === slug);
export const postsForSector = (sectorSlug: string) =>
  allPosts().filter(p => p.sector === sectorSlug);

export const hasPosts = () => posts.length > 0;
export const hasCaseStudies = () => caseStudies().length > 0;

/**
 * The quote the site leads with, derived from the newest case study that carries
 * one rather than typed out again in a constants file.
 *
 * That derivation is the point: this line now appears on the home page, four
 * interior pages and the study itself, and a testimonial that says something
 * slightly different in one of those places is worse than no testimonial at all.
 * Change the client's words in one place — the case study — or nowhere.
 *
 * Returns undefined when no published study carries a quote, and every caller
 * renders nothing in that case, so removing the study cleanly removes the quote
 * from the whole site.
 */
export type FeaturedQuote = {
  text: string;
  name?: string;
  role?: string;
  client?: string;
  href: string;
};

export const featuredQuote = (): FeaturedQuote | undefined => {
  const study = caseStudies().find(p => p.quote?.text);
  if (!study?.quote) return undefined;
  return { ...study.quote, client: study.client, href: `/blog/${study.slug}` };
};

/** en-GB, spelled out — "8 August 2026". */
export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
