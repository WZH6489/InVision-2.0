"use client";

import type { ReactNode } from "react";
import { useCallback, useRef } from "react";

const PULL_PX = 20;
const STRENGTH = 0.22;

type Props = {
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  "aria-label"?: string;
};

export function MagneticButton({
  className = "",
  children,
  onClick,
  type = "button",
  disabled,
  "aria-label": ariaLabel,
}: Props) {
  const ref = useRef<HTMLButtonElement>(null);

  const move = useCallback((e: React.MouseEvent | MouseEvent) => {
    const el = ref.current;
    if (!el || disabled) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    if (dist > PULL_PX + r.width / 2) {
      el.style.transform = "translate(0px, 0px)";
      return;
    }
    const pull = Math.max(0, 1 - dist / (PULL_PX + r.width * 0.35));
    el.style.transform = `translate(${dx * STRENGTH * pull}px, ${dy * STRENGTH * pull}px)`;
  }, [disabled]);

  const leave = useCallback(() => {
    const el = ref.current;
    if (el) el.style.transform = "translate(0px, 0px)";
  }, []);

  return (
    <button
      ref={ref}
      type={type}
      className={`magnetic-btn ${className}`.trim()}
      disabled={disabled}
      aria-label={ariaLabel}
      onClick={onClick}
      onMouseMove={move}
      onMouseLeave={leave}
      style={{ transition: "transform 0.2s cubic-bezier(0.22, 1, 0.36, 1)" }}
    >
      {children}
    </button>
  );
}
