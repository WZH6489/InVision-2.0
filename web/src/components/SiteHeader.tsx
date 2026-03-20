"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { MagneticButton } from "@/components/MagneticButton";
import { useBooking } from "./BookingProvider";
import { LangGlobeMenu } from "./LangGlobeMenu";

const NAV = [
  { href: "/process", key: "process" as const },
  { href: "/simulation", key: "simulation" as const },
  { href: "/rules", key: "rules" as const },
  { href: "/testimonials", key: "testimonials" as const },
  { href: "/pricing", key: "pricing" as const },
  { href: "/team", key: "team" as const },
  { href: "/faq", key: "faq" as const },
];

export function SiteHeader() {
  const t = useTranslations("Nav");
  const tMeta = useTranslations("Metadata");
  const loc = useLocale();
  const pathname = usePathname();
  const { openBooking } = useBooking();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const active = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href + "/"));

  return (
    <>
      <header className="site-header">
        <div className="site-header__inner">
          <Link href="/" className="site-header__mark">
            <Image
              src="/brand/shiwei-mark.png"
              alt={tMeta("siteName")}
              width={48}
              height={48}
              className="site-header__logo"
              priority
              sizes="48px"
            />
            <p className="mark mark--logo-lockup">
              <span className="sub">{t("brandTagline")}</span>
            </p>
          </Link>

          <nav
            className="site-nav"
            aria-label={
              loc === "en" ? "Primary navigation" : loc === "zh-hant" ? "主要導覽" : "主导航"
            }
          >
            {NAV.map(({ href, key }) => (
              <Link
                key={href}
                href={href}
                className={active(href) ? "is-active" : undefined}
                aria-current={active(href) ? "page" : undefined}
              >
                {t(key)}
              </Link>
            ))}
          </nav>

          <div className="site-header__cta">
            <LangGlobeMenu />

            <Link href="/portal" className="btn btn-ghost btn--sm">
              {t("portal")}
            </Link>

            <MagneticButton className="btn btn--sm" onClick={openBooking}>
              {t("book")}
              <span className="btn__arrow" aria-hidden>
                →
              </span>
            </MagneticButton>

            <button
              type="button"
              className="header-burger"
              aria-expanded={menuOpen}
              aria-controls="mobile-drawer"
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span className="sr-only">{menuOpen ? t("menuClose") : t("menuOpen")}</span>
              <svg width="18" height="14" viewBox="0 0 18 14" aria-hidden>
                <path
                  fill="currentColor"
                  d="M0 1h18v2H0V1zm0 5h18v2H0V6zm0 5h18v2H0v-2z"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div
        className={`mobile-menu__backdrop${menuOpen ? " is-open" : ""}`}
        aria-hidden
        onClick={() => setMenuOpen(false)}
      />
      <nav
        id="mobile-drawer"
        className={`mobile-menu${menuOpen ? " is-open" : ""}`}
        aria-label={
          loc === "en" ? "Primary navigation" : loc === "zh-hant" ? "主要導覽" : "主导航"
        }
      >
        {NAV.map(({ href, key }) => (
          <Link
            key={href}
            href={href}
            className={active(href) ? "is-active" : undefined}
            onClick={() => setMenuOpen(false)}
          >
            {t(key)}
          </Link>
        ))}
        <Link href="/portal" onClick={() => setMenuOpen(false)}>
          {t("portal")}
        </Link>
        <button type="button" className="tier-btn" style={{ marginTop: "0.5rem" }} onClick={() => { setMenuOpen(false); openBooking(); }}>
          {t("book")}
        </button>
        <p className="mobile-menu__lang-label">{t("langMenuTitle")}</p>
        <Link href={pathname} locale="zh" className={loc === "zh" ? "is-active" : ""} onClick={() => setMenuOpen(false)}>
          {t("langZh")}
        </Link>
        <Link href={pathname} locale="zh-hant" className={loc === "zh-hant" ? "is-active" : ""} onClick={() => setMenuOpen(false)}>
          {t("langZhHant")}
        </Link>
        <Link href={pathname} locale="en" className={loc === "en" ? "is-active" : ""} onClick={() => setMenuOpen(false)}>
          {t("langEn")}
        </Link>
      </nav>
    </>
  );
}
