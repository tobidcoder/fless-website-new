import { cookies, headers } from "next/headers"
import { getRequestConfig } from "next-intl/server"
import en from "../../messages/en.json"
import { DEFAULT_LOCALE, LOCALE_COOKIE, isLocale, negotiateLocale, type Locale } from "./config"

type Messages = Record<string, unknown>

/** Missing keys fall back to English. */
function withFallback(base: Messages, override: Messages): Messages {
  const out: Messages = { ...base }
  for (const [key, value] of Object.entries(override)) {
    const b = base[key]
    out[key] =
      value && typeof value === "object" && !Array.isArray(value) && b && typeof b === "object" && !Array.isArray(b)
        ? withFallback(b as Messages, value as Messages)
        : value
  }
  return out
}

async function load(locale: Locale): Promise<Messages> {
  if (locale === "fr") return withFallback(en, (await import("../../messages/fr.json")).default)
  if (locale === "pt") return withFallback(en, (await import("../../messages/pt.json")).default)
  return en
}

export default getRequestConfig(async () => {
  const cookieLocale = (await cookies()).get(LOCALE_COOKIE)?.value
  const locale: Locale = isLocale(cookieLocale)
    ? cookieLocale
    : negotiateLocale((await headers()).get("accept-language")) ?? DEFAULT_LOCALE
  return { locale, messages: await load(locale) }
})
