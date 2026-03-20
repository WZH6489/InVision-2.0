import { RevealSection } from "@/components/RevealSection";
import { SimulationWalkthrough } from "@/components/simulation/SimulationWalkthrough";
import { SiteFooter } from "@/components/SiteFooter";
import { Link } from "@/i18n/navigation";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Simulation" });
  return { title: t("title") };
}

export default async function SimulationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Simulation");
  const tInner = await getTranslations("Inner");

  return (
    <div className="wrap wrap--wide page-inner">
      <main>
        <RevealSection>
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">{tInner("breadcrumbHome")}</Link>
            <span className="breadcrumbs__sep">/</span>
            <span aria-current="page">{t("title")}</span>
          </nav>
        </RevealSection>

        <RevealSection>
          <header className="hub-section">
            <p className="section-kicker">{t("kicker")}</p>
            <h1 className="section-title section-title--hub">{t("title")}</h1>
            <p className="section-lead">{t("lead")}</p>
          </header>
        </RevealSection>

        <RevealSection>
          <SimulationWalkthrough />
        </RevealSection>
      </main>
      <SiteFooter />
    </div>
  );
}
