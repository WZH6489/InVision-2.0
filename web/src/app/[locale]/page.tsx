import { BookButton } from "@/components/BookButton";
import { HeroGridOverlay } from "@/components/hero/HeroGridOverlay";
import { HeroFluid } from "@/components/hero/HeroFluid";
import {
  ProblemPainArt,
  SolutionPanelArt,
  ValueArt,
} from "@/components/home/HomeSectionArt";
import { RevealSection } from "@/components/RevealSection";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyBookBar } from "@/components/StickyBookBar";
import { TeaserGlyph } from "@/components/TeaserGlyph";
import { TimelineSlider } from "@/components/TimelineSlider";
import { Link } from "@/i18n/navigation";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Home");

  const teasers = [
    { id: "process" as const, href: "/process", h: "teaserProcessH", p: "teaserProcessP", c: "teaserProcessCta" },
    { id: "rules" as const, href: "/rules", h: "teaserRulesH", p: "teaserRulesP", c: "teaserRulesCta" },
    {
      id: "testimonials" as const,
      href: "/testimonials",
      h: "teaserTestimonialsH",
      p: "teaserTestimonialsP",
      c: "teaserTestimonialsCta",
    },
    { id: "pricing" as const, href: "/pricing", h: "teaserPricingH", p: "teaserPricingP", c: "teaserPricingCta" },
    { id: "team" as const, href: "/team", h: "teaserTeamH", p: "teaserTeamP", c: "teaserTeamCta" },
    { id: "faq" as const, href: "/faq", h: "teaserFaqH", p: "teaserFaqP", c: "teaserFaqCta" },
  ];

  return (
    <div className="wrap wrap--wide wrap--sticky-safe page-next-home">
      <main>
        <section className="hero hero--premium hero--atmospheric" style={{ position: "relative" }}>
          <div className="hero-light-leak" aria-hidden />
          <div
            id="hero-sentinel"
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: 1,
              pointerEvents: "none",
            }}
            aria-hidden
          />
          <div className="hero-copy">
            <h1>{t("heroTitle")}</h1>
            <p className="lede">
              {t.rich("heroLead", {
                strong: (chunks) => <strong>{chunks}</strong>,
              })}
            </p>
            <div className="cta-row">
              <BookButton />
              <Link className="btn btn-ghost" href="/process">
                {t("ctaProcess")}
                <span className="btn__arrow" aria-hidden>
                  →
                </span>
              </Link>
            </div>
            <p className="price-tag">
              {t.rich("priceTag", {
                strong: (chunks) => <strong>{chunks}</strong>,
                pricing: (chunks) => (
                  <Link href="/pricing" style={{ color: "var(--signal)" }}>
                    {chunks}
                  </Link>
                ),
              })}
            </p>
          </div>
          <div className="hero-visual">
            <div className="hero-visual__frame hero-visual__frame--rich">
              <div className="visual" style={{ position: "relative", overflow: "hidden", borderRadius: "50%" }}>
                <HeroGridOverlay />
                <HeroFluid />
                <div className="glow" style={{ zIndex: 2, mixBlendMode: "screen", opacity: 0.4 }} />
                <div className="portal-ring" style={{ zIndex: 3 }} />
                <div className="portal" style={{ zIndex: 2, opacity: 0.78 }} />
              </div>
            </div>
            <p className="visual-caption">{t("caption")}</p>
          </div>
        </section>

        <RevealSection>
          <div className="value-ribbon hub-section" role="presentation">
            <span>{t("ribbon1")}</span>
            <span className="value-ribbon__sep">|</span>
            <span>{t("ribbon2")}</span>
            <span className="value-ribbon__sep">|</span>
            <span>{t("ribbon3")}</span>
          </div>
        </RevealSection>

        <RevealSection>
          <TimelineSlider />
        </RevealSection>

        <RevealSection>
          <section className="problem-split hub-section" aria-labelledby="problem-h">
            <div className="problem-split__col problem-split__col--art">
              <ProblemPainArt />
              <div>
                <p className="section-kicker">{t("problemKicker")}</p>
                <h2 id="problem-h" className="section-title">
                  {t("problemTitle")}
                </h2>
                <p className="section-lead problem-split__prose">
                  {t.rich("problemBody", {
                    strong: (chunks) => <strong>{chunks}</strong>,
                  })}
                </p>
              </div>
            </div>
            <div className="problem-split__solution problem-split__solution--rich">
              <SolutionPanelArt />
              <h3 className="section-title" style={{ fontSize: "1.125rem", marginTop: 0 }}>
                {t("solutionTitle")}
              </h3>
              <p className="problem-split__prose" style={{ margin: 0, fontSize: "0.9375rem", color: "var(--mist)" }}>
                {t.rich("solutionBody", {
                  strong: (chunks) => <strong>{chunks}</strong>,
                })}
              </p>
            </div>
          </section>
        </RevealSection>

        <RevealSection>
          <section className="hub-values hub-section" aria-labelledby="hv-title">
            <h2 id="hv-title" className="section-title section-title--hub">
              {t("valuesTitle")}
            </h2>
            <div className="hub-values hub-values--icons">
              <div className="hub-value">
                <ValueArt variant="clarity" />
                <h3>{t("v1h")}</h3>
                <p>{t("v1p")}</p>
              </div>
              <div className="hub-value">
                <ValueArt variant="boundary" />
                <h3>{t("v2h")}</h3>
                <p>{t("v2p")}</p>
              </div>
              <div className="hub-value">
                <ValueArt variant="deliver" />
                <h3>{t("v3h")}</h3>
                <p>{t("v3p")}</p>
              </div>
            </div>
          </section>
        </RevealSection>

        <RevealSection>
          <section className="hub-section explore-section" aria-labelledby="teasers-title">
            <p className="section-kicker">{t("exploreKicker")}</p>
            <h2 id="teasers-title" className="section-title section-title--hub">
              {t("exploreTitle")}
            </h2>
            <p className="section-lead section-lead--explore">{t("exploreLead")}</p>

            <div className="hub-teasers">
              {teasers.map((item) => (
                <article key={item.id} className="teaser-card teaser-card-interactive explore-card explore-card--glass">
                  <div className="teaser-card__hover">
                    <TeaserGlyph id={item.id} />
                  </div>
                  <h2>{t(item.h)}</h2>
                  <p>{t(item.p)}</p>
                  <Link className="btn btn-ghost explore-card__cta" href={item.href}>
                    {t(item.c)} <span className="btn__arrow">→</span>
                  </Link>
                </article>
              ))}
            </div>
          </section>
        </RevealSection>

        <RevealSection>
          <p className="footnote" style={{ border: "none", paddingTop: 0 }}>
            {t.rich("footnote", {
              services: (chunks) => (
                <Link href="/services" style={{ color: "var(--signal)" }}>
                  {chunks}
                </Link>
              ),
              contact: (chunks) => (
                <Link href="/contact" style={{ color: "var(--signal)" }}>
                  {chunks}
                </Link>
              ),
            })}
          </p>
        </RevealSection>
      </main>

      <SiteFooter />

      <StickyBookBar ctaLabel={t("stickyCta")} hint={t("stickyHint")} />
    </div>
  );
}
