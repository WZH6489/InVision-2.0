"use client";

import { useTranslations } from "next-intl";
import { useId, useState } from "react";

export function TimelineSlider() {
  const t = useTranslations("Home");
  const id = useId();
  const [v, setV] = useState(0);
  const year = Math.round((v / 100) * 10);

  return (
    <div className="timeline-slider">
      <div className="timeline-slider__head">
        <h3 className="timeline-slider__title">{t("timelineTitle")}</h3>
        <p className="timeline-slider__hint">{t("timelineHint")}</p>
      </div>
      <div
        className="timeline-slider__track-wrap"
        style={
          {
            "--timeline-p": `${v}%`,
          } as React.CSSProperties
        }
      >
        <div className="timeline-slider__glow" aria-hidden />
        <label htmlFor={id} className="sr-only">
          {t("timelineTitle")}
        </label>
        <input
          id={id}
          type="range"
          min={0}
          max={100}
          value={v}
          onChange={(e) => setV(Number(e.target.value))}
          className="timeline-slider__input"
        />
        <div className="timeline-slider__labels">
          <span>{t("timelinePresent")}</span>
          <span className="timeline-slider__year" aria-live="polite">
            +{year} {t("timelineYearsUnit")}
          </span>
          <span>{t("timelineY10")}</span>
        </div>
      </div>
    </div>
  );
}
