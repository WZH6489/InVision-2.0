"use client";

import { BookButton } from "@/components/BookButton";
import { HeroGridOverlay } from "@/components/hero/HeroGridOverlay";
import { HeroFluid } from "@/components/hero/HeroFluid";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import type { CSSProperties } from "react";
import { useId, useMemo, useState } from "react";

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

type Branch = { d: string; side: number };

const BRANCHES: Branch[] = [
  { d: "M 50 58 Q 50 42 22 18", side: -1 },
  { d: "M 50 58 Q 48 38 36 14", side: -1 },
  { d: "M 50 58 L 50 16", side: 0 },
  { d: "M 50 58 Q 52 38 64 14", side: 1 },
  { d: "M 50 58 Q 50 42 78 18", side: 1 },
];

export function HeroWithHorizon() {
  const t = useTranslations("Home");
  const id = useId();
  const [p, setP] = useState(0);
  const pn = p / 100;
  const year = Math.round(pn * 10);

  const metrics = useMemo(() => {
    const variables = Math.round(1840 + pn * 4120);
    const divergence = (pn * 7.82).toFixed(2);
    const clarity = Math.round(58 + pn * 38);
    return { variables, divergence, clarity };
  }, [pn]);

  const stemOpacity = 1 - clamp01(pn * 1.15) * 0.72;
  const gridIntensity = 0.28 + pn * 0.62;
  const depthOpacity = 0.06 + pn * 0.38;

  return (
    <section
      className="hero hero--premium hero--atmospheric hero--horizon"
      style={
        {
          position: "relative",
          "--horizon-p": String(pn),
          "--timeline-p": `${p}%`,
        } as React.CSSProperties
      }
    >
      <div className="hero-horizon__depth" aria-hidden style={{ opacity: depthOpacity }} />
      <div className="hero-horizon__divergence" aria-hidden>
        <svg
          className="hero-horizon__svg"
          viewBox="0 0 100 62"
          preserveAspectRatio="xMidYMax meet"
        >
          <defs>
            <filter id={`${id}-glow`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="0.35" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path
            d="M 50 62 L 50 20"
            className="hero-horizon__stem"
            fill="none"
            stroke="rgba(212, 196, 168, 0.95)"
            strokeWidth="0.22"
            strokeLinecap="round"
            filter={`url(#${id}-glow)`}
            style={{ opacity: stemOpacity }}
          />
          {BRANCHES.map((b, i) => {
            const stagger = i * 0.07;
            const branchOn = clamp01((pn - 0.08 - stagger) / 0.55);
            return (
              <path
                key={b.d}
                d={b.d}
                fill="none"
                stroke="rgba(196, 181, 154, 0.55)"
                strokeWidth="0.14"
                strokeLinecap="round"
                filter={`url(#${id}-glow)`}
                style={{ opacity: branchOn * (0.35 + pn * 0.5) }}
              />
            );
          })}
        </svg>
      </div>

      <div className="hero-light-leak" aria-hidden />
      <div
        id="hero-sentinel"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: 1,
          pointerEvents: "none",
        }}
        aria-hidden
      />

      <div className="hero-copy">
        <h1>{t("heroTitle")}</h1>
        <p className="lede">
          {t.rich("heroLead", {
            strong: (chunks) => <strong>{chunks}</strong>,
          })}
        </p>
        <div className="cta-row">
          <BookButton className="btn cursor-magnetic" />
          <Link className="btn btn-ghost cursor-magnetic" href="/process">
            {t("ctaProcess")}
            <span className="btn__arrow" aria-hidden>
              →
            </span>
          </Link>
        </div>
        <p className="price-tag">
          {t.rich("priceTag", {
            strong: (chunks) => <strong>{chunks}</strong>,
            pricing: (chunks) => (
              <Link href="/pricing" className="cursor-magnetic" style={{ color: "var(--signal)" }}>
                {chunks}
              </Link>
            ),
          })}
        </p>
      </div>

      <div className="hero-visual">
        <div className="hero-visual__frame hero-visual__frame--rich">
          <div
            className="visual"
            style={{ position: "relative", overflow: "hidden", borderRadius: "50%" }}
          >
            <HeroGridOverlay intensity={gridIntensity} />
            <HeroFluid />
            <div className="glow" style={{ zIndex: 2, mixBlendMode: "screen", opacity: 0.35 + pn * 0.2 }} />
            <div className="portal-ring" style={{ zIndex: 3 }} />
            <div className="portal" style={{ zIndex: 2, opacity: 0.72 + pn * 0.18 }} />
          </div>
        </div>
        <p className="visual-caption">{t("caption")}</p>
      </div>

      <div className="hero-horizon-interface cursor-magnetic">
        <div className="hero-horizon-metrics" aria-live="polite">
          <div className="hero-horizon-metric">
            <span className="hero-horizon-metric__label">{t("horizonMetricVariables")}</span>
            <span className="hero-horizon-metric__value tabular-nums">{metrics.variables}</span>
          </div>
          <div className="hero-horizon-metric">
            <span className="hero-horizon-metric__label">{t("horizonMetricDivergence")}</span>
            <span className="hero-horizon-metric__value tabular-nums">{metrics.divergence}%</span>
          </div>
          <div className="hero-horizon-metric">
            <span className="hero-horizon-metric__label">{t("horizonMetricClarity")}</span>
            <span className="hero-horizon-metric__value tabular-nums">{metrics.clarity}</span>
          </div>
        </div>

        <div className="timeline-slider timeline-slider--hero">
          <div className="timeline-slider__head">
            <h3 className="timeline-slider__title">{t("timelineTitle")}</h3>
            <p className="timeline-slider__hint">{t("timelineHint")}</p>
          </div>
          <div
            className="timeline-slider__track-wrap"
            style={{ "--timeline-p": `${p}%` } as CSSProperties}
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
              value={p}
              onChange={(e) => setP(Number(e.target.value))}
              className="timeline-slider__input"
            />
            <div className="timeline-slider__labels">
              <span>{t("timelinePresent")}</span>
              <span className="timeline-slider__year">
                +{year} {t("timelineYearsUnit")}
              </span>
              <span>{t("timelineY10")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
