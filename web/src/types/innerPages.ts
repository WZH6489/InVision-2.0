export type InnerProseItem = { h: string; p: string };

export type InnerStepItem = { num: string; h: string; p: string };

export type InnerSpecArticle = { h: string; p: string };

export type InnerSpecBlock = {
  kicker: string;
  title: string;
  lead: string;
  articles: InnerSpecArticle[];
};

export type InnerFaqItem = { q: string; a: string };

export type InnerQuote = { quote: string; cite: string };

export type InnerCaseItem = {
  h: string;
  p: string;
  /** Restores static SVG / bar viz from testimonials.html */
  diagram?: "paths" | "bars";
  metrics?: { before: string; after: string };
};

export type InnerTimeline = {
  kicker: string;
  title: string;
  lead: string;
  labelNow: string;
  labelFuture: string;
  hintNow: string;
  blurbs: string[];
};

export type InnerCompareTable = {
  headers: [string, string, string, string];
  rows: [string, string, string, string][];
};

export type InnerPricingTier = {
  title: string;
  desc: string;
  amount: string;
  amountSmall?: string;
  bullets: string[];
  cta: "book" | "contact";
  bookLabel?: string;
  contactCta?: string;
  featured?: boolean;
};

export type InnerPricingTiersSection = {
  title: string;
  tiers: InnerPricingTier[];
};

export type InnerPricingArtifact = {
  kicker: string;
  title: string;
  lead: string;
  columnTitle: string;
  bold1: string;
  part1: string;
  bold2: string;
  part2: string;
  mockHeader: string;
  mockSeal: string;
  mockPanelTitle: string;
};

export type InnerBillingFaq = {
  kicker: string;
  title: string;
  items: InnerFaqItem[];
};

export type InnerTeamMember = {
  initial: string;
  name: string;
  role: string;
  bio: string;
};

/** Body below page hero for InnerShell routes; all fields optional per page. */
export type InnerPagePayload = {
  prose?: InnerProseItem[];
  /** h2 + p pairs inside `.prose` (terms, privacy). */
  legalProse?: InnerProseItem[];
  stepsIntro?: { kicker: string; title: string; lead: string };
  steps?: InnerStepItem[];
  spec?: InnerSpecBlock;
  faqItems?: InnerFaqItem[];
  trustLogos?: string[];
  quotes?: InnerQuote[];
  cases?: InnerCaseItem[];
  /** Process page: five node labels for the flow SVG (locale-specific). */
  flowLabels?: [string, string, string, string, string];
  /** Process page: narrative slider (static process.html). */
  timeline?: InnerTimeline;
  /** Pricing page: comparison table. */
  compareTable?: InnerCompareTable;
  pricingTiersSection?: InnerPricingTiersSection;
  pricingArtifact?: InnerPricingArtifact;
  billingFaq?: InnerBillingFaq;
  teamMission?: string;
  teamTagline?: string;
  teamMembers?: InnerTeamMember[];
  footnote?: string;
};

export type InnerPagesMessages = Record<string, InnerPagePayload>;

export function getInnerPagePayload(
  innerPages: unknown,
  page: string,
): InnerPagePayload | null {
  if (!innerPages || typeof innerPages !== "object") return null;
  const raw = (innerPages as Record<string, unknown>)[page];
  if (!raw || typeof raw !== "object") return null;
  return raw as InnerPagePayload;
}
