import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

/** `localeDetection: false` keeps default locale 简体中文 unless path explicitly uses `/en` or `/zh-hant`. */
export default createMiddleware({
  ...routing,
  localeDetection: false,
});

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
