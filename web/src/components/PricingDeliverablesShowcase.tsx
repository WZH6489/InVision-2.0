"use client";

import { useTranslations } from "next-intl";

export function PricingDeliverablesShowcase() {
  const t = useTranslations("Deliverables");

  return (
    <section className="deliverables-showcase reveal is-visible" aria-labelledby="deliverables-title">
      <p className="section-kicker">{t("kicker")}</p>
      <h2 id="deliverables-title" className="section-title">
        {t("title")}
      </h2>
      <p className="section-lead">{t("lead")}</p>

      <div className="deliverables-grid">
        <article className="deliverable-mock deliverable-mock--dossier cursor-magnetic" data-cursor-glass>
          <div className="deliverable-mock__device">
            <div className="deliverable-mock__screen">
              <div className="deliverable-mock__chart deliverable-mock__chart--1" />
              <div className="deliverable-mock__chart deliverable-mock__chart--2" />
              <div className="deliverable-mock__chart deliverable-mock__chart--3" />
              <span className="deliverable-mock__watermark">{t("watermark")}</span>
            </div>
          </div>
          <h3>{t("dossierH")}</h3>
          <p>{t("dossierP")}</p>
        </article>

        <article className="deliverable-mock deliverable-mock--portfolio cursor-magnetic" data-cursor-glass>
          <div className="deliverable-mock__marble">
            <div className="deliverable-mock__folder">
              <div className="deliverable-mock__clasp" />
              <div className="deliverable-mock__seal" aria-hidden />
            </div>
          </div>
          <h3>{t("portfolioH")}</h3>
          <p>{t("portfolioP")}</p>
        </article>

        <article className="deliverable-mock deliverable-mock--dashboard cursor-magnetic" data-cursor-glass>
          <div className="deliverable-mock__dash">
            <header className="deliverable-mock__dash-head">
              <span className="deliverable-mock__pill" />
              <span className="deliverable-mock__pill deliverable-mock__pill--blur" />
            </header>
            <div className="deliverable-mock__dash-rows">
              <div className="deliverable-mock__row" />
              <div className="deliverable-mock__row deliverable-mock__row--blur" />
              <div className="deliverable-mock__row" />
            </div>
            <p className="deliverable-mock__dash-title">{t("dashReportTitle")}</p>
          </div>
          <h3>{t("dashboardH")}</h3>
          <p>{t("dashboardP")}</p>
        </article>
      </div>
    </section>
  );
}
