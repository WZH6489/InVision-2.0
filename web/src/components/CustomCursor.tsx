"use client";

import { useEffect, useState } from "react";

export function CustomCursor() {
  const [on, setOn] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [magnetic, setMagnetic] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduce || coarse) return;

    setOn(true);
    document.body.classList.add("has-custom-cursor");

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const over = (e: MouseEvent) => {
      const t = e.target;
      if (!(t instanceof Element)) return;
      setMagnetic(!!t.closest("a, button, [role='button'], input, textarea, select, .cursor-magnetic"));
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  if (!on) return null;

  return (
    <div
      className={`custom-cursor${magnetic ? " custom-cursor--mag" : ""}`}
      style={{ left: pos.x, top: pos.y }}
      aria-hidden
    >
      <span className="custom-cursor__dot" />
      <span className="custom-cursor__ring" />
    </div>
  );
}
