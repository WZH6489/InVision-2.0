/** Minimal inline SVGs to break up long text blocks on the homepage. */

export function ProblemPainArt() {
  return (
    <div className="home-art home-art--pain" aria-hidden>
      <svg viewBox="0 0 120 120" fill="none" className="home-art__svg">
        <defs>
          <linearGradient id="hp-g" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(110,231,255,0.35)" />
            <stop offset="100%" stopColor="rgba(167,139,250,0.15)" />
          </linearGradient>
        </defs>
        <circle cx="60" cy="60" r="52" stroke="url(#hp-g)" strokeWidth="0.75" opacity="0.5" />
        <path
          d="M30 72 Q60 38 90 72"
          stroke="var(--signal)"
          strokeWidth="1.25"
          strokeLinecap="round"
          opacity="0.55"
        />
        <path
          d="M38 88 L52 62 L68 78 L82 48"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="52" cy="62" r="3" fill="var(--signal)" opacity="0.4" />
        <circle cx="68" cy="78" r="3" fill="var(--signal)" opacity="0.25" />
      </svg>
    </div>
  );
}

export function SolutionPanelArt() {
  return (
    <div className="home-art home-art--panel" aria-hidden>
      <div className="home-mock-ui">
        <div className="home-mock-ui__bar" />
        <div className="home-mock-ui__row">
          <span className="home-mock-ui__dot" />
          <span className="home-mock-ui__line" />
        </div>
        <div className="home-mock-ui__row">
          <span className="home-mock-ui__dot home-mock-ui__dot--on" />
          <span className="home-mock-ui__line home-mock-ui__line--short" />
        </div>
        <div className="home-mock-ui__chart">
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}

export function ValueArt({ variant }: { variant: "clarity" | "boundary" | "deliver" }) {
  if (variant === "clarity") {
    return (
      <div className="home-art home-art--value" aria-hidden>
        <svg viewBox="0 0 56 56" fill="none" className="home-art__svg home-art__svg--sm">
          <circle cx="28" cy="28" r="20" stroke="var(--signal)" strokeWidth="1.2" opacity="0.35" />
          <circle cx="28" cy="28" r="8" stroke="var(--signal)" strokeWidth="1.2" opacity="0.7" />
          <circle cx="28" cy="28" r="2.5" fill="var(--signal)" opacity="0.9" />
        </svg>
      </div>
    );
  }
  if (variant === "boundary") {
    return (
      <div className="home-art home-art--value" aria-hidden>
        <svg viewBox="0 0 56 56" fill="none" className="home-art__svg home-art__svg--sm">
          <rect
            x="12"
            y="12"
            width="32"
            height="32"
            rx="4"
            stroke="var(--signal)"
            strokeWidth="1.2"
            opacity="0.45"
          />
          <path d="M18 28 H38" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" strokeDasharray="3 3" />
        </svg>
      </div>
    );
  }
  return (
    <div className="home-art home-art--value" aria-hidden>
      <svg viewBox="0 0 56 56" fill="none" className="home-art__svg home-art__svg--sm">
        <path
          d="M14 40 L22 24 L30 32 L42 16"
          stroke="var(--signal)"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.65"
        />
        <rect x="12" y="42" width="32" height="4" rx="1" fill="rgba(110,231,255,0.15)" />
      </svg>
    </div>
  );
}
