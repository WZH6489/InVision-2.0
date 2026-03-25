import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function HomeDemoShowcase() {
  const t = await getTranslations("Home");

  return (
    <section className="home-demo-showcase hub-section" aria-labelledby="demo-showcase-h">
      <p className="section-kicker">{t("demoSectionKicker")}</p>
      <h2 id="demo-showcase-h" className="section-title section-title--hub">
        {t("demoSectionTitle")}
      </h2>
      <p className="section-lead home-demo-showcase__lead">{t("demoSectionLead")}</p>

      <div className="home-demo-showcase__grid">
        <article className="home-demo-showcase__card home-demo-showcase__card--terminal">
          <p className="home-demo-showcase__card-kicker">{t("demoCard1Kicker")}</p>
          <h3 className="home-demo-showcase__card-title">{t("demoCard1Title")}</h3>
          <pre className="home-demo-showcase__pre" aria-label={t("demoCard1Title")}>
            {t("demoCard1Sample")}
          </pre>
        </article>

        <article className="home-demo-showcase__card home-demo-showcase__card--telemetry">
          <p className="home-demo-showcase__card-kicker">{t("demoCard2Kicker")}</p>
          <h3 className="home-demo-showcase__card-title">{t("demoCard2Title")}</h3>
          <div className="home-demo-showcase__telemetry" aria-hidden>
            <div className="home-demo-showcase__telemetry-row">
              <span>{t("demoTelemetryLabelA")}</span>
              <span className="tabular-nums home-demo-showcase__telemetry-val">72.4%</span>
            </div>
            <div className="home-demo-showcase__telemetry-row">
              <span>{t("demoTelemetryLabelB")}</span>
              <span className="home-demo-showcase__telemetry-val">{t("demoTelemetryState")}</span>
            </div>
            <div className="home-demo-showcase__meter" />
            <p className="home-demo-showcase__meter-cap">{t("demoCard2Caption")}</p>
          </div>
        </article>

        <article className="home-demo-showcase__card home-demo-showcase__card--cta">
          <p className="home-demo-showcase__card-kicker">{t("demoCard3Kicker")}</p>
          <h3 className="home-demo-showcase__card-title">{t("demoCard3Title")}</h3>
          <p className="home-demo-showcase__card-body">{t("demoCard3Body")}</p>
          <Link className="btn btn-ghost home-demo-showcase__sim-link" href="/simulation">
            {t("demoCard3Cta")}
            <span className="btn__arrow" aria-hidden>
              →
            </span>
          </Link>
        </article>
      </div>

      <p className="home-demo-showcase__disclaimer">{t("demoDisclaimer")}</p>
    </section>
  );
}
