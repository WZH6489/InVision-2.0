"use client";

import type { ReactNode } from "react";
import { MagneticButton } from "@/components/MagneticButton";
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

  if (variant === "ghost") {
    return (
      <button type="button" className={`${className} btn-ghost`.trim()} onClick={openBooking}>
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

  return (
    <MagneticButton className={className} onClick={openBooking}>
      {children ?? (
        <>
          {t("ctaBook")}
          <span className="btn__arrow" aria-hidden>
            →
          </span>
        </>
      )}
    </MagneticButton>
  );
}
