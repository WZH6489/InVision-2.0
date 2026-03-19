import { SiteFooter } from "@/components/SiteFooter";
import { Link } from "@/i18n/navigation";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";

export default async function PortalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Portal");
  const tb = await getTranslations("Inner");

  return (
    <div className="wrap wrap--wide page-inner">
      <main>
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">{tb("breadcrumbHome")}</Link>
          <span className="breadcrumbs__sep">/</span>
          <span aria-current="page">{t("title")}</span>
        </nav>
        <header className="page-hero reveal is-visible">
          <h1>{t("title")}</h1>
          <p>{t("lead")}</p>
          <p style={{ marginTop: "1.5rem" }}>
            <Link className="btn btn-ghost" href="/">
              {t("backHome")}
              <span className="btn__arrow" aria-hidden>
                →
              </span>
            </Link>
          </p>
        </header>
      </main>
      <SiteFooter />
    </div>
  );
}
