import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";
import {
  defaultLocale,
  locales,
  LOCALE_COOKIE_NAME,
  type Locale,
} from "./config";

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get(LOCALE_COOKIE_NAME)?.value;

  // Validate and use locale from cookie, or fall back to default
  const locale: Locale = locales.includes(localeCookie as Locale)
    ? (localeCookie as Locale)
    : defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
