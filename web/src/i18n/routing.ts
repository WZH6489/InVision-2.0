import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["zh", "en", "zh-hant"],
  defaultLocale: "zh",
  localePrefix: "as-needed",
});

export type AppLocale = (typeof routing.locales)[number];
