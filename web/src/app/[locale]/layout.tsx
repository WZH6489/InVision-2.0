import { BookingProvider } from "@/components/BookingProvider";
import { SiteHeader } from "@/components/SiteHeader";
import { localeToHtmlLang } from "@/lib/htmlLang";
import type { AppLocale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { DM_Sans, Noto_Sans_SC, Noto_Sans_TC, Syne } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import "../../../../css/site.css";
import "../globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm",
  display: "swap",
});

const notoSC = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-noto-sc",
  display: "swap",
});

const notoTC = Noto_Sans_TC({
  subsets: ["latin"],
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
  const fontVars = [syne.variable, dmSans.variable, notoSC.variable, notoTC.variable].join(" ");

  return (
    <html lang={htmlLang} suppressHydrationWarning>
      <body
        className={`page-next ${fontVars}`}
        data-app="next"
        data-lang={htmlLang}
        data-locale={locale}
      >
        <NextIntlClientProvider messages={messages}>
          <BookingProvider locale={locale}>
            <div className="stars" aria-hidden />
            <SiteHeader />
            {children}
          </BookingProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
