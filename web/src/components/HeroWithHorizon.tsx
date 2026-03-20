"use client";

import { BookButton } from "@/components/BookButton";
import { HeroGridOverlay } from "@/components/hero/HeroGridOverlay";
import { HeroFluid } from "@/components/hero/HeroFluid";
import { Link } from "@/i18n/navigation";
import { animate, useMotionValue, useMotionValueEvent, useSpring } from "framer-motion";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import type { CSSProperties } from "react";
import { useCallback, useEffect, useId, useRef, useState } from "react";

const HorizonDivergenceCanvas = dynamic(
  () => import("./horizon/HorizonDivergenceCanvas").then((m) => m.HorizonDivergenceCanvas),
  { ssr: false },
);

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

function clarityPercent(t: number) {
  if (t <= 0.5) return 99.9 + (64.2 - 99.9) * (t / 0.5);
  return 64.2 + (12.8 - 64.2) * ((t - 0.5) / 0.5);
}

function variablesKey(t: number): "locked" | "expanding" | "maximum" {
  if (t < 0.42) return "locked";
  if (t < 0.78) return "expanding";
  return "maximum";
}

function stateKey(t: number): "present" | "near" | "ethical" {
  if (t < 0.42) return "present";
  if (t < 0.78) return "near";
  return "ethical";
}

export function HeroWithHorizon() {
  const t = useTranslations("Home");
  const id = useId();
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const target = useMotionValue(0);
  const smooth = useSpring(target, { stiffness: 210, damping: 36, mass: 1.15 });
  const progressRef = useRef(0);
  const lastVibrateYear = useRef(-1);

  const [pn, setPn] = useState(0);
  const year = Math.round(pn * 10);

  useMotionValueEvent(smooth, "change", (v) => {
    const n = clamp01(v);
    progressRef.current = n;
    setPn(n);
  });

  const setFromClientX = useCallback(
    (clientX: number) => {
      const el = trackRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = clamp01((clientX - r.left) / r.width);
      target.set(x);
    },
    [target],
  );

  const snapNearestYear = useCallback(() => {
    const y = Math.round(target.get() * 10) / 10;
    animate(target, y, { type: "spring", stiffness: 260, damping: 30, mass: 1.02 });
  }, [target]);

  const skipHaptic = useRef(true);
  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (!coarse || typeof navigator === "undefined" || !navigator.vibrate) return;
    if (skipHaptic.current) {
      skipHaptic.current = false;
      lastVibrateYear.current = year;
      return;
    }
    if (lastVibrateYear.current !== year) {
      lastVibrateYear.current = year;
      navigator.vibrate(5);
    }
  }, [year]);

  useEffect(() => {
    const end = () => {
      if (!dragging.current) return;
      dragging.current = false;
      snapNearestYear();
    };
    const move = (e: PointerEvent) => {
      if (!dragging.current) return;
      setFromClientX(e.clientX);
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerup", end);
    window.addEventListener("pointercancel", end);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", end);
      window.removeEventListener("pointercancel", end);
    };
  }, [setFromClientX, snapNearestYear]);

  const onPointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    dragging.current = true;
    setFromClientX(e.clientX);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = 0.1;
    let v = target.get();
    if (e.key === "ArrowRight" || e.key === "ArrowUp") v = clamp01(v + step);
    else if (e.key === "ArrowLeft" || e.key === "ArrowDown") v = clamp01(v - step);
    else if (e.key === "Home") v = 0;
    else if (e.key === "End") v = 1;
    else return;
    e.preventDefault();
    animate(target, v, { type: "spring", stiffness: 260, damping: 30 });
  };

  const vk = variablesKey(pn);
  const sk = stateKey(pn);
  const clarityStr = clarityPercent(pn).toFixed(1);

  const gridIntensity = 0.28 + pn * 0.62;
  const depthOpacity = 0.06 + pn * 0.38;

  return (
    <section
      className="hero hero--premium hero--atmospheric hero--horizon"
      style={
        {
          position: "relative",
          "--horizon-p": String(pn),
          "--timeline-p": `${pn * 100}%`,
        } as CSSProperties
      }
    >
      <div className="hero-horizon__depth" aria-hidden style={{ opacity: depthOpacity }} />

      <div className="hero-horizon__divergence hero-horizon__divergence--webgl" aria-hidden>
        <HorizonDivergenceCanvas progressRef={progressRef} />
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

      <div className="hero-horizon-interface">
        <div className="hero-horizon-telemetry" aria-live="polite">
          <div className="hero-horizon-telemetry__row">
            <span className="hero-horizon-telemetry__label">{t("telemetryClarity")}</span>
            <span className="hero-horizon-telemetry__value tabular-nums">{clarityStr}%</span>
          </div>
          <div className="hero-horizon-telemetry__row">
            <span className="hero-horizon-telemetry__label">{t("telemetryVariables")}</span>
            <span className="hero-horizon-telemetry__value">{t(`telemetryVar_${vk}`)}</span>
          </div>
          <div className="hero-horizon-telemetry__row">
            <span className="hero-horizon-telemetry__label">{t("telemetryState")}</span>
            <span className="hero-horizon-telemetry__value">{t(`telemetryState_${sk}`)}</span>
          </div>
        </div>

        <div className="timeline-slider timeline-slider--hero">
          <div className="timeline-slider__head">
            <h3 className="timeline-slider__title">{t("timelineTitle")}</h3>
            <p className="timeline-slider__hint">{t("timelineHint")}</p>
          </div>
          <div
            className="timeline-slider__track-wrap"
            style={{ "--timeline-p": `${pn * 100}%` } as CSSProperties}
            data-cursor-glass
          >
            <div className="timeline-slider__glow" aria-hidden />
            <div
              ref={trackRef}
              className="horizon-drag-track"
              role="slider"
              tabIndex={0}
              aria-valuemin={0}
              aria-valuemax={10}
              aria-valuenow={year}
              aria-valuetext={`+${year} ${t("timelineYearsUnit")}`}
              aria-labelledby={id}
              onPointerDown={onPointerDown}
              onKeyDown={onKeyDown}
            >
              <div className="horizon-drag-track__rail" />
              <div
                className="horizon-drag-track__thumb"
                style={{ left: `${pn * 100}%`, transform: "translate(-50%, -50%)" }}
              />
            </div>
            <p id={id} className="sr-only">
              {t("timelineTitle")}
            </p>
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
