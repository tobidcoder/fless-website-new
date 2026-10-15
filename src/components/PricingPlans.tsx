"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Check } from "lucide-react"
import { useTranslations } from "next-intl"
import { CURRENCIES, PLANS, annualPrice, formatMoney, type CurrencyCode } from "@/lib/billing"
import { cn } from "@/lib/utils"

const CURRENCY_KEY = "fless-currency"

function useCurrency(): [CurrencyCode, (c: CurrencyCode) => void] {
  const [currency, setCurrency] = useState<CurrencyCode>("USD")
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CURRENCY_KEY)
      if (saved && CURRENCIES.some((c) => c.code === saved)) setCurrency(saved as CurrencyCode)
    } catch {
      /* storage unavailable */
    }
  }, [])
  const set = (c: CurrencyCode) => {
    setCurrency(c)
    try {
      localStorage.setItem(CURRENCY_KEY, c)
    } catch {
      /* storage unavailable */
    }
  }
  return [currency, set]
}

/** Plan cards with a currency switcher (regional price lists) and monthly/annual toggle. */
export function PricingPlans() {
  const t = useTranslations("pricing")
  const [currency, setCurrency] = useCurrency()
  const [annual, setAnnual] = useState(false)
  const region = CURRENCIES.find((c) => c.code === currency)?.region

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div role="radiogroup" aria-label={t("monthly") + " / " + t("annual")} className="inline-flex rounded-full border border-border p-1 self-start">
          {[false, true].map((a) => (
            <button
              key={String(a)}
              type="button"
              role="radio"
              aria-checked={annual === a}
              onClick={() => setAnnual(a)}
              className={cn(
                "h-9 rounded-full px-4 text-[13px] font-medium transition-colors",
                annual === a ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {a ? (
                <>
                  {t("annual")} <span className={annual ? "opacity-80" : "text-primary"}>· {t("annualSave")}</span>
                </>
              ) : (
                t("monthly")
              )}
            </button>
          ))}
        </div>
        <label className="inline-flex items-center gap-2 text-[13px] text-muted-foreground">
          {t("currency")}
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
            className="h-9 rounded-full border border-border bg-background px-3 text-[13px] text-foreground outline-none focus:ring-2 focus:ring-primary/25"
          >
            {CURRENCIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.code} · {c.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {region && <p className="mb-6 text-[13px] text-muted-foreground">{t("localNote", { region })}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {PLANS.map((p) => {
          const monthly = p.monthly?.[currency]
          const features = t.raw(`plans.${p.id}.features`) as string[]
          return (
            <div
              key={p.id}
              className={cn(
                "rounded-2xl border p-5 flex flex-col",
                p.highlight ? "border-primary shadow-sm shadow-primary/10" : "border-border/80",
              )}
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <h3 className="text-[17px] font-semibold tracking-tight">{p.name}</h3>
                {p.highlight && (
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">{t("popular")}</span>
                )}
              </div>
              <p className="text-[13px] text-muted-foreground mb-4 min-h-[2.5em]">{t(`plans.${p.id}.for`)}</p>
              <div className="mb-1 min-h-[2.5rem] flex items-baseline gap-1 flex-wrap">
                {monthly == null ? (
                  <span className="text-[28px] font-display font-semibold tracking-tight">{t("custom")}</span>
                ) : monthly === 0 ? (
                  <span className="text-[28px] font-display font-semibold tracking-tight">{t("free")}</span>
                ) : (
                  <>
                    <span className="text-[28px] font-display font-semibold tracking-tight tabular-nums">
                      {formatMoney(annual ? annualPrice(monthly) : monthly, currency)}
                    </span>
                    <span className="text-[13px] text-muted-foreground">{annual ? t("perYear") : t("perMonth")}</span>
                  </>
                )}
              </div>
              <p className="text-[13px] text-foreground/80 mb-4">
                {p.includedCreditsUsd != null
                  ? t("creditsIncluded", { amount: formatMoney(p.includedCreditsUsd, "USD") })
                  : t("creditsCustom")}
              </p>
              <ul className="space-y-2 text-[13px] text-muted-foreground mb-6 flex-1">
                {[t(`plans.${p.id}.employees`), t(`plans.${p.id}.seats`), ...features].map((f) => (
                  <li key={f} className="flex gap-2">
                    <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={p.ctaHref}
                className={cn(
                  "inline-flex h-10 items-center justify-center rounded-full px-4 text-[13px] font-medium transition-colors",
                  p.highlight
                    ? "bg-primary text-primary-foreground hover:bg-primary-hover"
                    : "border border-border hover:border-primary/40",
                )}
              >
                {t(`plans.${p.id}.cta`)}
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}
