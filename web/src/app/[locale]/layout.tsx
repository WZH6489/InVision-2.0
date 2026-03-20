import { BookingProvider } from "@/components/BookingProvider";
import { CustomCursor } from "@/components/CustomCursor";
import { FilmNoise } from "@/components/FilmNoise";
import { SiteHeader } from "@/components/SiteHeader";
import { localeToHtmlLang } from "@/lib/htmlLang";
import type { AppLocale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import {
  Inter,
  Noto_Sans_SC,
  Noto_Sans_TC,
  Noto_Serif_SC,
  Noto_Serif_TC,
  Playfair_Display,
} from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import "../../../../css/site.css";
import "../globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const notoSerifSC = Noto_Serif_SC({
  // Google Fonts supports chinese-simplified; next/font generated types omit CJK subsets.
  // @ts-expect-error CJK subset not in generated union
  subsets: ["latin", "chinese-simplified"],
  weight: ["400", "600", "700"],
  variable: "--font-noto-serif-sc",
  display: "swap",
});

const notoSerifTC = Noto_Serif_TC({
  // @ts-expect-error CJK subset not in generated union
  subsets: ["latin", "chinese-traditional"],
  weight: ["400", "600", "700"],
  variable: "--font-noto-serif-tc",
  display: "swap",
});

const notoSC = Noto_Sans_SC({
  // @ts-expect-error CJK subset not in generated union
  subsets: ["latin", "chinese-simplified"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-noto-sc",
  display: "swap",
});

const notoTC = Noto_Sans_TC({
  // @ts-expect-error CJK subset not in generated union
  subsets: ["latin", "chinese-traditional"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-noto-tc",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: {
      default: t("homeTitle"),
      template: `%s · ${t("siteName")}`,
    },
    description: t("homeDescription"),
  };
}

function typographyAttr(locale: string): "en" | "zh-hant" | "zh" {
  if (locale === "en") return "en";
  if (locale === "zh-hant") return "zh-hant";
  return "zh";
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const htmlLang = localeToHtmlLang(locale as AppLocale);
  const fontVars = [
    playfair.variable,
    inter.variable,
    notoSerifSC.variable,
    notoSerifTC.variable,
    notoSC.variable,
    notoTC.variable,
  ].join(" ");

  return (
    <html lang={htmlLang} suppressHydrationWarning>
      <body
        className={`page-next ${fontVars}`}
        data-app="next"
        data-lang={htmlLang}
        data-locale={locale}
        data-typography={typographyAttr(locale)}
      >
        <NextIntlClientProvider messages={messages}>
          <BookingProvider locale={locale}>
            <FilmNoise />
            <CustomCursor />
            <div className="stars" aria-hidden />
            <SiteHeader />
            {children}
          </BookingProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
