/**
 * One content model for the blog: case studies and thought-leadership pieces
 * live in the same array, separated by `kind`.
 *
 * Two systems would drift — a case study written as a "post" and another written
 * as a "case study" would eventually disagree about what a case study is. So a
 * case study is just a post that also carries stats/situation/work/outcome, and
 * the post page renders those extra blocks when they exist.
 *
 * The case-study slots are deliberately empty — client evidence is Shaun's to
 * supply, and an invented one would be worse than none. Everything keyed off an
 * empty list degrades to nothing: /case-studies explains itself instead of
 * showing placeholder cards, its nav link does not appear, and the sitemap omits
 * the detail pages.
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
};

/**
 * Thought-leadership pieces. Each one argues a position Acta Data already takes
 * publicly elsewhere on the site, at length — the spreadsheet trap, data before
 * agents, and the four atomic units. No client facts and no figures appear in
 * any of them, deliberately: everything here is argument, so nothing needs a
 * source we cannot show.
 */
const insightPosts: Post[] = [
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

/** Case studies go here. Empty until there is real client evidence to publish. */
const caseStudyPosts: Post[] = [];

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

/** en-GB, spelled out — "8 August 2026". */
export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
