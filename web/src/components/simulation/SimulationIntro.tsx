"use client";

import { FadeUpHeading } from "@/components/FadeUpHeading";
import { useTranslations } from "next-intl";

export function SimulationIntro() {
  const t = useTranslations("Simulation");

  return (
    <header className="hub-section lux-section-pad">
      <p className="section-kicker">{t("kicker")}</p>
      <FadeUpHeading as="h1" className="section-title section-title--hub">
        {t("title")}
      </FadeUpHeading>
      <p className="section-lead">{t("lead")}</p>
    </header>
  );
}
