"use client";

import { useEffect, useRef, useState } from "react";
import { useBooking } from "./BookingProvider";

type Props = {
  ctaLabel: string;
  hint: string;
};

export function StickyBookBar({ ctaLabel, hint }: Props) {
  const { openBooking } = useBooking();
  const [visible, setVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const el = document.getElementById("hero-sentinel");
    if (!el) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { root: null, rootMargin: "0px", threshold: 0.05 },
    );
    observerRef.current.observe(el);
    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className={`sticky-book${visible ? " is-visible" : ""}`} role="region" aria-label={ctaLabel}>
      <p className="sticky-book__hint">{hint}</p>
      <button type="button" className="btn btn--sm" onClick={openBooking}>
        {ctaLabel}
        <span className="btn__arrow" aria-hidden>
          →
        </span>
      </button>
    </div>
  );
}
