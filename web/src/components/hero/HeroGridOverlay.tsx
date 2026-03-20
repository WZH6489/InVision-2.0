/** Perspective grid + glow behind the 3D hero; pure markup, motion in CSS. */
export function HeroGridOverlay({ intensity = 0.55 }: { intensity?: number }) {
  return (
    <div className="hero-grid-overlay" aria-hidden>
      <div className="hero-grid-overlay__grid" style={{ opacity: intensity }} />
      <div className="hero-grid-overlay__vignette" />
    </div>
  );
}
