"use client";

import { useId } from "react";

type Props = {
  /** Five node labels: intent → … → debrief */
  labels: [string, string, string, string, string];
};

/** Horizontal flow from static `process.html`; champagne accent. */
export function ProcessFlowDiagram({ labels }: Props) {
  const gid = useId().replace(/:/g, "");
  const gradId = `pf-grad-${gid}`;
  const [l0, l1, l2, l3, l4] = labels;

  const strokeLine = "rgba(200, 185, 155, 0.55)";
  const fillBox = "rgba(255,255,255,0.04)";
  const strokeBox = "rgba(200, 185, 155, 0.35)";

  return (
    <div className="flow-diagram reveal is-visible" aria-hidden="true">
      <svg viewBox="0 0 640 120" role="img" aria-label="Process flow diagram">
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: "rgba(200, 185, 155, 0.12)" }} />
            <stop offset="100%" style={{ stopColor: "rgba(200, 185, 155, 0.4)" }} />
          </linearGradient>
        </defs>
        <rect x="8" y="38" width="112" height="44" rx="6" fill={fillBox} stroke={strokeBox} />
        <text x="64" y="66" textAnchor="middle" fill="#e8ecf4" fontSize="11" fontFamily="system-ui,sans-serif">
          {l0}
        </text>
        <path d="M 120 60 L 140 60" stroke={strokeLine} strokeWidth="2" />
        <rect x="140" y="38" width="112" height="44" rx="6" fill={fillBox} stroke={strokeBox} />
        <text x="196" y="66" textAnchor="middle" fill="#e8ecf4" fontSize="11" fontFamily="system-ui,sans-serif">
          {l1}
        </text>
        <path d="M 252 60 L 272 60" stroke={strokeLine} strokeWidth="2" />
        <rect x="272" y="38" width="112" height="44" rx="6" fill={fillBox} stroke={strokeBox} />
        <text x="328" y="66" textAnchor="middle" fill="#e8ecf4" fontSize="11" fontFamily="system-ui,sans-serif">
          {l2}
        </text>
        <path d="M 384 60 L 404 60" stroke={strokeLine} strokeWidth="2" />
        <rect
          x="404"
          y="38"
          width="112"
          height="44"
          rx="6"
          fill={`url(#${gradId})`}
          stroke="var(--signal)"
          strokeWidth="1.5"
        />
        <text x="460" y="66" textAnchor="middle" fill="#050508" fontSize="11" fontWeight="600" fontFamily="system-ui,sans-serif">
          {l3}
        </text>
        <path d="M 516 60 L 536 60" stroke={strokeLine} strokeWidth="2" />
        <rect x="536" y="38" width="96" height="44" rx="6" fill={fillBox} stroke={strokeBox} />
        <text x="584" y="66" textAnchor="middle" fill="#e8ecf4" fontSize="11" fontFamily="system-ui,sans-serif">
          {l4}
        </text>
      </svg>
    </div>
  );
}
