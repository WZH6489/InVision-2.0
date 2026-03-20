"use client";

import { Canvas } from "@react-three/fiber";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { ObservationRoomScene } from "./ObservationRoomScene";
import { SimulationAmbientSound } from "./SimulationAmbientSound";

const STEPS = 3;

export function SimulationWalkthrough() {
  const t = useTranslations("Simulation");
  const [active, setActive] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const on = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

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
      { root: null, rootMargin: "-38% 0px -38% 0px", threshold: 0 },
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const phase = active as 0 | 1 | 2;

  return (
    <div className="sim-walk sim-walk--immersive">
      <SimulationAmbientSound />
      <div className="sim-walk__sticky">
        <div className="sim-walk__canvas-wrap" data-cursor-glass aria-hidden>
          {reduceMotion ? (
            <div className="sim-walk__fallback sim-walk__fallback--phase-0">
              <div className={`sim-walk__fallback-inner sim-walk__fallback--p${phase}`} />
              <p className="sim-walk__viz-label">{t(`vizPhase${active}`)}</p>
            </div>
          ) : (
            <>
              <Canvas
                camera={{ position: [0, 0.35, 2.35], fov: 42 }}
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 2]}
                onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
              >
                <ObservationRoomScene phase={phase} />
              </Canvas>
              <p className="sim-walk__viz-label">{t(`vizPhase${active}`)}</p>
            </>
          )}
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
