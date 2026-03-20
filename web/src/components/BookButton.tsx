"use client";

import type { ReactNode } from "react";
import { useBooking } from "@/components/BookingProvider";
import { useTranslations } from "next-intl";

type Props = {
  className?: string;
  variant?: "primary" | "ghost";
  /** Override label (e.g. tier-specific pricing CTAs). Default: Home.ctaBook + arrow. */
  children?: ReactNode;
};

export function BookButton({ className = "btn", variant = "primary", children }: Props) {
  const { openBooking } = useBooking();
  const t = useTranslations("Home");
  const cls =
    variant === "ghost" ? `${className} btn-ghost`.trim() : className;

  return (
    <button type="button" className={cls} onClick={openBooking}>
      {children ?? (
        <>
          {t("ctaBook")}
          <span className="btn__arrow" aria-hidden>
            →
          </span>
        </>
      )}
    </button>
  );
}
