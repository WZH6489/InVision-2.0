import type { AppLocale } from "@/i18n/routing";

export function localeToHtmlLang(locale: AppLocale): string {
  switch (locale) {
    case "zh-hant":
      return "zh-Hant";
    case "en":
      return "en";
    default:
      return "zh-Hans";
  }
}
