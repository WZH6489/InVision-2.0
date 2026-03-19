"use client";

import { useBooking } from "@/components/BookingProvider";
import { useTranslations } from "next-intl";

type Props = {
  className?: string;
  variant?: "primary" | "ghost";
};

export function BookButton({ className = "btn", variant = "primary" }: Props) {
  const { openBooking } = useBooking();
  const t = useTranslations("Home");
  const cls =
    variant === "ghost" ? `${className} btn-ghost`.trim() : className;

  return (
    <button type="button" className={cls} onClick={openBooking}>
      {t("ctaBook")}
      <span className="btn__arrow" aria-hidden>
        →
      </span>
    </button>
  );
}
