"use client";

import { useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { SimulationAmbientSound } from "./SimulationAmbientSound";

const STEPS = 3;

/** Scroll-scrubbed SVG divergence + glass readout; sticky left column at 10vh. */
export function SimulationWalkthrough() {
  const t = useTranslations("Simulation");
  const containerRef = useRef<HTMLDivElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [varCount, setVarCount] = useState(0);
  const [clarityPct, setClarityPct] = useState(99.9);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const on = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const p1 = useTransform(scrollYProgress, [0.02, 0.32], [0, 1]);
  const p2 = useTransform(scrollYProgress, [0.2, 0.48], [0, 1]);
  const p3 = useTransform(scrollYProgress, [0.38, 0.68], [0, 1]);
  const p4 = useTransform(scrollYProgress, [0.55, 0.88], [0, 1]);
  const p5 = useTransform(scrollYProgress, [0.72, 0.98], [0, 1]);

  const varsMotion = useTransform(scrollYProgress, [0, 1], [0, 14029]);
  const clarityMotion = useTransform(scrollYProgress, [0, 1], [99.9, 12.4]);

  useMotionValueEvent(varsMotion, "change", (v) => setVarCount(Math.round(v)));
  useMotionValueEvent(clarityMotion, "change", (v) => setClarityPct(Math.round(v * 10) / 10));

  return (
    <div ref={containerRef} className="sim-scroll-scope">
      <SimulationAmbientSound />
      <div className="sim-walk sim-walk--scroll-svg">
        <div className="sim-walk__sticky">
          <div className="sim-svg-panel" data-cursor-glass>
            <svg
              className="sim-svg-panel__svg"
              viewBox="0 0 220 240"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <defs>
                <filter id="sim-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="1.2" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <motion.path
                d="M 110 228 L 110 140"
                stroke="#D5C098"
                strokeWidth="2.2"
                strokeLinecap="round"
                filter="url(#sim-glow)"
                style={{ pathLength: reduceMotion ? 1 : p1 }}
              />
              <motion.path
                d="M 110 140 Q 110 118 78 96"
                stroke="rgba(213,192,152,0.55)"
                strokeWidth="1.4"
                strokeLinecap="round"
                filter="url(#sim-glow)"
                style={{ pathLength: reduceMotion ? 1 : p2 }}
              />
              <motion.path
                d="M 110 140 Q 112 115 142 92"
                stroke="rgba(213,192,152,0.5)"
                strokeWidth="1.35"
                strokeLinecap="round"
                filter="url(#sim-glow)"
                style={{ pathLength: reduceMotion ? 1 : p3 }}
              />
              <motion.path
                d="M 110 132 Q 88 100 52 72 Q 38 58 44 38"
                stroke="rgba(213,192,152,0.38)"
                strokeWidth="1.15"
                strokeLinecap="round"
                filter="url(#sim-glow)"
                style={{ pathLength: reduceMotion ? 1 : p4 }}
              />
              <motion.path
                d="M 110 128 Q 132 96 176 68 Q 198 52 188 28"
                stroke="rgba(213,192,152,0.35)"
                strokeWidth="1.1"
                strokeLinecap="round"
                filter="url(#sim-glow)"
                style={{ pathLength: reduceMotion ? 1 : p5 }}
              />
            </svg>

            <div className="sim-readout-glass" aria-live="polite">
              <p className="sim-readout-glass__label">{t("readoutVariables")}</p>
              <p className="sim-readout-glass__value tabular-nums">
                {varCount.toLocaleString()}
              </p>
              <p className="sim-readout-glass__label sim-readout-glass__label--second">
                {t("readoutClarity")}
              </p>
              <p className="sim-readout-glass__value sim-readout-glass__value--small tabular-nums">
                {clarityPct.toFixed(1)}%
              </p>
            </div>
          </div>
          <p className="sim-walk__viz-label sim-walk__viz-label--under">{t("vizScrollHint")}</p>
        </div>

        <div className="sim-walk__steps">
          {Array.from({ length: STEPS }, (_, i) => (
            <div key={i} className="sim-walk__step sim-walk__step--tall">
              <p className="section-kicker">{t("stepKicker", { n: i + 1 })}</p>
              <h2 className="section-title">{t(`step${i}Title`)}</h2>
              <p className="section-lead" style={{ marginBottom: 0 }}>
                {t(`step${i}Body`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
