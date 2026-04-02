import { Fragment } from "react";
import { getTranslations } from "next-intl/server";

/** Wrap segments in **double asterisks** as <strong> for scannable bullets. */
function PlainBullet({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        const m = /^\*\*([^*]+)\*\*$/.exec(part);
        if (m) {
          return (
            <strong key={i} className="home-plain-summary__strong">
              {m[1]}
            </strong>
          );
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}

export async function HomePlainSummary() {
  const t = await getTranslations("Home");
  const whatRaw = t.raw("plainWhatPoints");
  const whoRaw = t.raw("plainWhoPoints");
  const whatPoints = Array.isArray(whatRaw) ? (whatRaw as string[]) : [];
  const whoPoints = Array.isArray(whoRaw) ? (whoRaw as string[]) : [];

  return (
    <section className="home-plain-summary hub-section" aria-labelledby="plain-summary-h">
      <h2 id="plain-summary-h" className="home-plain-summary__title">
        {t("plainSummaryTitle")}
      </h2>
      <p className="home-plain-summary__lead">{t("plainSummaryLead")}</p>
      <div className="home-plain-summary__grid">
        <div className="home-plain-summary__card">
          <p className="home-plain-summary__label">{t("plainWhatLabel")}</p>
          <h3 className="home-plain-summary__card-title">{t("plainWhatHeading")}</h3>
          <ul className="home-plain-summary__list">
            {whatPoints.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
        <div className="home-plain-summary__card">
          <p className="home-plain-summary__label">{t("plainWhoLabel")}</p>
          <h3 className="home-plain-summary__card-title">{t("plainWhoHeading")}</h3>
          <ul className="home-plain-summary__list">
            {whoPoints.map((line, i) => (
              <li key={i}>
                <PlainBullet text={line} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
