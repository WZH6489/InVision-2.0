"use client";

/** Subtle film grain over the viewport; low opacity + mix-blend for depth. */
export function FilmNoise() {
  return (
    <div className="film-noise" aria-hidden>
      <svg className="film-noise__svg" xmlns="http://www.w3.org/2000/svg">
        <filter id="film-noise-filter" x="0" y="0">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="4"
            stitchTiles="stitch"
            result="noise"
          />
          <feColorMatrix type="saturate" values="0" in="noise" result="gray" />
        </filter>
        <rect width="100%" height="100%" filter="url(#film-noise-filter)" />
      </svg>
    </div>
  );
}
