import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function SiteFooter() {
  const t = await getTranslations("Footer");
  const tn = await getTranslations("Nav");
  const tm = await getTranslations("Metadata");
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__grid">
        <div className="site-footer__brand">
          <p className="mark" style={{ margin: 0 }}>
            视<span>未</span>
          </p>
          <p>{t("tagline")}</p>
        </div>
        <div className="site-footer__col">
          <h4>{t("services")}</h4>
          <ul>
            <li>
              <Link href="/services">{t("servicesDetail")}</Link>
            </li>
            <li>
              <Link href="/pricing">{t("pricing")}</Link>
            </li>
            <li>
              <Link href="/contact">{t("contact")}</Link>
            </li>
          </ul>
        </div>
        <div className="site-footer__col">
          <h4>{t("browse")}</h4>
          <ul>
            <li>
              <Link href="/process">{tn("process")}</Link>
            </li>
            <li>
              <Link href="/rules">{tn("rules")}</Link>
            </li>
            <li>
              <Link href="/testimonials">{tn("testimonials")}</Link>
            </li>
            <li>
              <Link href="/team">{tn("team")}</Link>
            </li>
            <li>
              <Link href="/faq">{tn("faq")}</Link>
            </li>
            <li>
              <Link href="/about">{t("about")}</Link>
            </li>
          </ul>
        </div>
        <div className="site-footer__col">
          <h4>{t("legal")}</h4>
          <ul>
            <li>
              <Link href="/terms">{t("terms")}</Link>
            </li>
            <li>
              <Link href="/privacy">{t("privacy")}</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="site-footer__meta">
        <span>
          © {year} {tm("siteName")}
        </span>
        <span>{t("meta")}</span>
      </div>
    </footer>
  );
}
