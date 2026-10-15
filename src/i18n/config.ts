// Website languages. English is the default and the fallback for any missing text.
// Translated today: header, footer, home hero and pricing (messages/<locale>.json).
export const LOCALES = ["en", "fr", "pt"] as const
export type Locale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Locale = "en"
/** Same cookie name next-intl uses, so the switcher and server agree. */
export const LOCALE_COOKIE = "NEXT_LOCALE"

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value)
}

/** Picks the best supported locale from an Accept-Language header. */
export function negotiateLocale(acceptLanguage: string | null | undefined): Locale {
  if (!acceptLanguage) return DEFAULT_LOCALE
  const ranked = acceptLanguage
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";")
      const q = params.find((p) => p.trim().startsWith("q="))
      return { lang: tag.trim().toLowerCase().split("-")[0], q: q ? Number(q.trim().slice(2)) || 0 : 1 }
    })
    .sort((a, b) => b.q - a.q)
  for (const { lang } of ranked) if (isLocale(lang)) return lang
  return DEFAULT_LOCALE
}
