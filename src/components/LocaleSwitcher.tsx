"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { useLocale, useTranslations } from "next-intl"
import { Globe } from "lucide-react"
import { LOCALES, LOCALE_COOKIE, type Locale } from "@/i18n/config"
import { cn } from "@/lib/utils"

/** Saves the choice in a first-party preference cookie and re-renders the page. */
export function LocaleSwitcher({ className, variant = "light" }: { className?: string; variant?: "light" | "dark" }) {
  const t = useTranslations("locale")
  const locale = useLocale()
  const router = useRouter()
  const [pending, start] = useTransition()

  const change = (next: Locale) => {
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`
    start(() => router.refresh())
  }

  return (
    <label
      className={cn(
        "inline-flex items-center gap-1.5 text-[13px]",
        variant === "dark" ? "text-white/60" : "text-muted-foreground",
        pending && "opacity-60",
        className,
      )}
    >
      <Globe className="w-3.5 h-3.5 shrink-0" aria-hidden />
      <span className="sr-only">{t("label")}</span>
      <select
        value={locale}
        onChange={(e) => change(e.target.value as Locale)}
        className={cn(
          "bg-transparent outline-none cursor-pointer rounded-md py-1 pr-1 focus-visible:ring-2 focus-visible:ring-primary/40",
          variant === "dark" ? "text-white/80 [&>option]:text-foreground" : "text-foreground",
        )}
      >
        {LOCALES.map((l) => (
          <option key={l} value={l}>
            {t(l)}
          </option>
        ))}
      </select>
    </label>
  )
}
