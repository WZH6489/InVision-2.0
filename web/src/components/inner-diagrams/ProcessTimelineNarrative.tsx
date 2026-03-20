"use client";

import { useMemo, useState, type CSSProperties } from "react";
import type { InnerTimeline } from "@/types/innerPages";

type Props = {
  timeline: InnerTimeline;
};

export function ProcessTimelineNarrative({ timeline }: Props) {
  const [value, setValue] = useState(0);
  const { blurbs, hintNow, labelNow, labelFuture, kicker, title, lead } = timeline;

  const idx = useMemo(() => {
    if (blurbs.length <= 1) return 0;
    return Math.min(blurbs.length - 1, Math.round((value / 100) * (blurbs.length - 1)));
  }, [blurbs.length, value]);

  const mainText = blurbs[idx] ?? "";
  const hint = value < 12 ? hintNow : value > 88 ? labelFuture : `${labelNow} → ${labelFuture}`;

  return (
    <section id="timeline" className="timeline-narrative reveal is-visible" aria-labelledby="timeline-title">
      <p className="section-kicker">{kicker}</p>
      <h2 id="timeline-title" className="section-title">
        {title}
      </h2>
      <p className="section-lead">{lead}</p>
      <div
        className="timeline-stage"
        style={{ "--timeline-t": `${value / 100}` } as CSSProperties}
      >
        <div className="timeline-stage__inner">
          <p className="timeline-future-text">{mainText}</p>
          <p className="timeline-hint">{hint}</p>
        </div>
      </div>
      <label className="timeline-control" htmlFor="inner-timeline-range">
        <span>{labelNow}</span>
        <input
          id="inner-timeline-range"
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          aria-valuetext={`${value}%`}
        />
        <span>{labelFuture}</span>
      </label>
    </section>
  );
}
