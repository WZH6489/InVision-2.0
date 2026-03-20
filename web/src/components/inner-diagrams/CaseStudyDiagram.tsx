"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

type Props = {
  variant: "paths" | "bars";
  pathsAriaLabel?: string;
};

export function CaseStudyDiagram({ variant, pathsAriaLabel }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const barsRef = useRef<HTMLDivElement>(null);
  const [barsDrawn, setBarsDrawn] = useState(false);

  useLayoutEffect(() => {
    if (variant !== "paths" || !svgRef.current) return;
    const root = svgRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    root.querySelectorAll("path").forEach((path) => {
      try {
        const L = path.getTotalLength();
        path.style.strokeDasharray = String(L);
        path.style.strokeDashoffset = reduceMotion ? "0" : String(L);
      } catch {
        /* ignore */
      }
    });
    if (reduceMotion) {
      root.classList.add("is-drawn");
      return;
    }
    requestAnimationFrame(() => {
      root.classList.add("is-drawn");
    });
  }, [variant]);

  useEffect(() => {
    if (variant !== "bars" || !barsRef.current) return;
    const el = barsRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setBarsDrawn(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setBarsDrawn(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.25 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [variant]);

  if (variant === "paths") {
    return (
      <svg
        ref={svgRef}
        className="case-viz case-viz-paths"
        viewBox="0 0 320 140"
        role="img"
        aria-label={pathsAriaLabel ?? "Path comparison chart"}
      >
        <text className="axis-label" x="8" y="14">
          累积行动指数
        </text>
        <text className="axis-label" x="8" y="130">
          时间 →
        </text>
        <line x1="40" y1="20" x2="40" y2="115" stroke="rgba(255,255,255,0.08)" />
        <line x1="40" y1="115" x2="300" y2="115" stroke="rgba(255,255,255,0.08)" />
        <path className="curve-base" d="M 48 108 C 90 104, 130 100, 160 92 S 230 78, 298 68" />
        <path className="curve-opt" d="M 48 108 C 95 106, 125 88, 155 72 S 210 38, 298 28" />
      </svg>
    );
  }

  return (
    <div
      ref={barsRef}
      className={`case-viz-bars${barsDrawn ? " is-drawn" : ""}`}
      aria-label="Anxiety scale comparison"
    >
      <div className="case-bars">
        <div className="case-bar-row case-bar-row--a">
          <span>前测</span>
          <div className="bar-track">
            <div className="bar-fill" />
          </div>
          <span>7.8</span>
        </div>
        <div className="case-bar-row case-bar-row--b">
          <span>6 周后</span>
          <div className="bar-track">
            <div className="bar-fill" />
          </div>
          <span>4.2</span>
        </div>
      </div>
    </div>
  );
}
