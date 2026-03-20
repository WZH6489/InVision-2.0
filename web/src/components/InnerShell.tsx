import { SiteFooter } from "@/components/SiteFooter";
import { Link } from "@/i18n/navigation";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";

const PAGES = {
  process: { title: "processTitle" as const, lead: "processLead" as const },
  rules: { title: "rulesTitle" as const, lead: "rulesLead" as const },
  testimonials: { title: "testimonialsTitle" as const, lead: "testimonialsLead" as const },
  pricing: { title: "pricingTitle" as const, lead: "pricingLead" as const },
  team: { title: "teamTitle" as const, lead: "teamLead" as const },
  faq: { title: "faqTitle" as const, lead: "faqLead" as const },
  terms: { title: "termsTitle" as const, lead: "termsLead" as const },
  privacy: { title: "privacyTitle" as const, lead: "privacyLead" as const },
} as const;

export type InnerPageId = keyof typeof PAGES;

type Props = {
  params: Promise<{ locale: string }>;
  page: InnerPageId;
};

export async function InnerShell({ params, page }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Inner");
  const { title, lead } = PAGES[page];

  return (
    <div className="wrap wrap--wide page-inner">
      <main>
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">{t("breadcrumbHome")}</Link>
          <span className="breadcrumbs__sep">/</span>
          <span aria-current="page">{t(title)}</span>
        </nav>
        <header className="page-hero reveal is-visible">
          <h1>{t(title)}</h1>
          <p>{t(lead)}</p>
        </header>
      </main>
      <SiteFooter />
    </div>
  );
}
