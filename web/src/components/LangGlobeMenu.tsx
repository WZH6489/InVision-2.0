"use client";

import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";

export function LangGlobeMenu() {
  const t = useTranslations("Nav");
  const loc = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, [open]);

  const items = [
    { locale: "zh" as const, label: t("langZh"), hrefLang: "zh-Hans" },
    { locale: "zh-hant" as const, label: t("langZhHant"), hrefLang: "zh-Hant" },
    { locale: "en" as const, label: t("langEn"), hrefLang: "en" },
  ];

  return (
    <div className="lang-globe" ref={wrapRef}>
      <button
        type="button"
        className="lang-globe__btn"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={t("langGlobeAria")}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((o) => !o);
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      </button>
      {open ? (
        <div className="lang-globe__dropdown" role="listbox" aria-label={t("langMenuTitle")}>
          {items.map(({ locale, label, hrefLang }) => (
            <Link
              key={locale}
              href={pathname}
              locale={locale}
              hrefLang={hrefLang}
              className={`lang-globe__opt${loc === locale ? " is-active" : ""}`}
              role="option"
              aria-selected={loc === locale}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
