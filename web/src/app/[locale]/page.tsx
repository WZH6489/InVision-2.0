import { BookButton } from "@/components/BookButton";
import { HeroFluid } from "@/components/hero/HeroFluid";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyBookBar } from "@/components/StickyBookBar";
import { TeaserGlyph } from "@/components/TeaserGlyph";
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
    <div className="wrap wrap--wide">
      <main>
        <section className="hero" style={{ position: "relative" }}>
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
            <div className="hero-visual__frame">
              <div className="visual" style={{ position: "relative", overflow: "hidden", borderRadius: "50%" }}>
                <HeroFluid />
                <div className="glow" style={{ zIndex: 1, mixBlendMode: "screen", opacity: 0.5 }} />
                <div className="portal-ring" style={{ zIndex: 2 }} />
                <div className="portal" style={{ zIndex: 1, opacity: 0.85 }} />
              </div>
            </div>
            <p className="visual-caption">{t("caption")}</p>
          </div>
        </section>

        <div className="value-ribbon reveal is-visible" role="presentation">
          <span>{t("ribbon1")}</span>
          <span className="value-ribbon__sep">|</span>
          <span>{t("ribbon2")}</span>
          <span className="value-ribbon__sep">|</span>
          <span>{t("ribbon3")}</span>
        </div>

        <section className="problem-split reveal is-visible" aria-labelledby="problem-h">
          <div>
            <p className="section-kicker">{t("problemKicker")}</p>
            <h2 id="problem-h" className="section-title">
              {t("problemTitle")}
            </h2>
            <p className="section-lead">
              {t.rich("problemBody", {
                strong: (chunks) => <strong>{chunks}</strong>,
              })}
            </p>
          </div>
          <div className="problem-split__solution">
            <h3 className="section-title" style={{ fontSize: "1.125rem", marginTop: 0 }}>
              {t("solutionTitle")}
            </h3>
            <p style={{ margin: 0, fontSize: "0.9375rem", color: "var(--mist)" }}>
              {t.rich("solutionBody", {
                strong: (chunks) => <strong>{chunks}</strong>,
              })}
            </p>
          </div>
        </section>

        <section className="hub-values reveal is-visible" aria-labelledby="hv-title">
          <h2 id="hv-title" className="section-title" style={{ marginBottom: "1.25rem" }}>
            {t("valuesTitle")}
          </h2>
          <div className="hub-values">
            <div className="hub-value">
              <h3>{t("v1h")}</h3>
              <p>{t("v1p")}</p>
            </div>
            <div className="hub-value">
              <h3>{t("v2h")}</h3>
              <p>{t("v2p")}</p>
            </div>
            <div className="hub-value">
              <h3>{t("v3h")}</h3>
              <p>{t("v3p")}</p>
            </div>
          </div>
        </section>

        <section className="reveal is-visible" aria-labelledby="teasers-title">
          <p className="section-kicker">{t("exploreKicker")}</p>
          <h2 id="teasers-title" className="section-title">
            {t("exploreTitle")}
          </h2>
          <p className="section-lead">{t("exploreLead")}</p>

          <div className="hub-teasers">
            {teasers.map((item) => (
              <article key={item.id} className="teaser-card teaser-card-interactive">
                <div className="teaser-card__hover">
                  <TeaserGlyph id={item.id} />
                </div>
                <h2>{t(item.h)}</h2>
                <p>{t(item.p)}</p>
                <Link className="btn btn-ghost" href={item.href}>
                  {t(item.c)} <span className="btn__arrow">→</span>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <p className="footnote reveal is-visible" style={{ border: "none", paddingTop: 0 }}>
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
      </main>

      <SiteFooter />

      <StickyBookBar ctaLabel={t("stickyCta")} hint={t("stickyHint")} />
    </div>
  );
}
