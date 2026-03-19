/** Perspective grid + glow behind the 3D hero; pure markup, motion in CSS. */
export function HeroGridOverlay() {
  return (
    <div className="hero-grid-overlay" aria-hidden>
      <div className="hero-grid-overlay__grid" />
      <div className="hero-grid-overlay__vignette" />
    </div>
  );
}
