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
  cases?: InnerProseItem[];
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
