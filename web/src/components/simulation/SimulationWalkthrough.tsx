"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

const STEPS = 3;

export function SimulationWalkthrough() {
  const t = useTranslations("Simulation");
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const els = refs.current.filter(Boolean) as HTMLDivElement[];
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const idx = els.indexOf(e.target as HTMLDivElement);
          if (idx >= 0) setActive(idx);
        });
      },
      { root: null, rootMargin: "-42% 0px -42% 0px", threshold: 0 },
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="sim-walk">
      <div className="sim-walk__sticky">
        <div className={`sim-walk__viz sim-walk__viz--phase-${active}`} aria-hidden>
          <div className="sim-walk__orb" />
          <div className="sim-walk__ring" />
          <div className="sim-walk__scan" />
          <p className="sim-walk__viz-label">{t(`vizPhase${active}`)}</p>
        </div>
      </div>

      <div className="sim-walk__steps">
        {Array.from({ length: STEPS }, (_, i) => (
          <div
            key={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            className={`sim-walk__step${active === i ? " is-active" : ""}`}
          >
            <p className="section-kicker">{t("stepKicker", { n: i + 1 })}</p>
            <h2 className="section-title">{t(`step${i}Title`)}</h2>
            <p className="section-lead" style={{ marginBottom: 0 }}>
              {t(`step${i}Body`)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
