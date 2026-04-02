import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { StaggerRevealHeading } from "@/components/StaggerRevealHeading";

export async function HomeEditorialIllustrations() {
  const t = await getTranslations("Home");

  return (
    <section className="home-editorial-art hub-section" aria-labelledby="editorial-h">
      <p className="section-kicker">{t("editorialKicker")}</p>
      <StaggerRevealHeading id="editorial-h" className="section-title section-title--hub">
        {t("editorialTitle")}
      </StaggerRevealHeading>
      <p className="section-lead home-editorial-art__lead">{t("editorialLead")}</p>

      <div className="home-editorial-art__grid">
        <figure className="home-editorial-art__figure">
          <div className="home-editorial-art__frame">
            <Image
              src="/illustrations/future-self-message.png"
              alt={t("editorialAltMessage")}
              width={800}
              height={800}
              sizes="(max-width: 899px) 100vw, 42vw"
              className="home-editorial-art__img"
              priority={false}
            />
          </div>
          <figcaption className="home-editorial-art__cap">{t("editorialCapMessage")}</figcaption>
        </figure>
        <figure className="home-editorial-art__figure">
          <div className="home-editorial-art__frame">
            <Image
              src="/illustrations/future-self-care.png"
              alt={t("editorialAltCare")}
              width={800}
              height={800}
              sizes="(max-width: 899px) 100vw, 42vw"
              className="home-editorial-art__img"
              priority={false}
            />
          </div>
          <figcaption className="home-editorial-art__cap">{t("editorialCapCare")}</figcaption>
        </figure>
      </div>
    </section>
  );
}
