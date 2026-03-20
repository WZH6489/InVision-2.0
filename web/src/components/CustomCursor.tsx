"use client";

import { useEffect, useState } from "react";

export function CustomCursor() {
  const [on, setOn] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [magnetic, setMagnetic] = useState(false);
  const [glass, setGlass] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduce || coarse) return;

    setOn(true);
    document.body.classList.add("has-custom-cursor");

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (!el || !(el instanceof Element)) {
        setMagnetic(false);
        setGlass(false);
        return;
      }
      setMagnetic(
        !!el.closest("a, button, [role='button'], input, textarea, select, .cursor-magnetic"),
      );
      setGlass(
        !!el.closest("[data-cursor-glass], img, picture, .deliverable-mock, .horizon-webgl"),
      );
    };

    window.addEventListener("mousemove", move, { passive: true });

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", move);
    };
  }, []);

  if (!on) return null;

  const ringClass =
    glass || magnetic ? ` custom-cursor--mag${glass ? " custom-cursor--glass" : ""}` : "";

  return (
    <div
      className={`custom-cursor${ringClass}`}
      style={{ left: pos.x, top: pos.y }}
      aria-hidden
    >
      <span className="custom-cursor__dot" />
      <span className="custom-cursor__ring" />
    </div>
  );
}
