// Pricing model, in one place: workspace plans + builder-set employee prices + work credits.
// Every page that talks about price or billing reads from here.
//
// TODO(owner): plan prices and regional price lists are launch proposals from the
// re-architecture plan; confirm them with pilot businesses before general availability.

export type CurrencyCode = "USD" | "GBP" | "EUR" | "NGN" | "GHS" | "KES" | "ZAR"

export interface Currency {
  code: CurrencyCode
  label: string
  /** Region whose local price list this currency carries, if any. */
  region?: string
  locale: string
}

export const CURRENCIES: Currency[] = [
  { code: "USD", label: "US dollar", locale: "en-US" },
  { code: "GBP", label: "British pound", locale: "en-GB" },
  { code: "EUR", label: "Euro", locale: "en-IE" },
  { code: "NGN", label: "Nigerian naira", region: "Nigeria", locale: "en-NG" },
  { code: "GHS", label: "Ghanaian cedi", region: "Ghana", locale: "en-GH" },
  { code: "KES", label: "Kenyan shilling", region: "Kenya", locale: "en-KE" },
  { code: "ZAR", label: "South African rand", region: "South Africa", locale: "en-ZA" },
]

export const LOCAL_PRICE_CURRENCIES: CurrencyCode[] = ["NGN", "GHS", "KES", "ZAR"]

/** The one billing statement used everywhere on the site. */
export const BILLING_STATEMENT =
  "Pay in USD, GBP or EUR anywhere. In Nigeria, Ghana, Kenya and South Africa you get local prices and pay in NGN, GHS, KES or ZAR. Cards and invoices worldwide through Stripe; local cards, bank transfer and mobile money in Africa through Paystack."

/** Short form for tight spaces (hero facts, footer). */
export const BILLING_SHORT = "Pay in USD, GBP, EUR, or local prices in NGN, GHS, KES and ZAR"

export const ANNUAL_NOTE = "Pay yearly and get 2 months free."
export const BUILDER_SHARE = 70
export const FLESS_SHARE = 100 - BUILDER_SHARE
export const TRIAL_DAYS = 7

export type PlanId = "free" | "starter" | "growth" | "business" | "enterprise"

export interface Plan {
  id: PlanId
  name: string
  /** Monthly price per currency (whole units). null = custom. */
  monthly: Record<CurrencyCode, number> | null
  /** Work credits included each month, in US dollars of usage. */
  includedCreditsUsd: number | null
  /** Plan copy (who it is for, limits, features) lives in messages/<locale>.json under pricing.plans. */
  ctaHref: string
  highlight?: boolean
}

export const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    monthly: { USD: 0, GBP: 0, EUR: 0, NGN: 0, GHS: 0, KES: 0, ZAR: 0 },
    includedCreditsUsd: 5,
    ctaHref: "/start?plan=free",
  },
  {
    id: "starter",
    name: "Starter",
    monthly: { USD: 39, GBP: 32, EUR: 36, NGN: 29000, GHS: 235, KES: 2500, ZAR: 420 },
    includedCreditsUsd: 20,
    ctaHref: "/start?plan=starter",
  },
  {
    id: "growth",
    name: "Growth",
    monthly: { USD: 149, GBP: 119, EUR: 139, NGN: 115000, GHS: 895, KES: 9600, ZAR: 1600 },
    includedCreditsUsd: 100,
    ctaHref: "/start?plan=growth",
    highlight: true,
  },
  {
    id: "business",
    name: "Business",
    monthly: { USD: 499, GBP: 399, EUR: 459, NGN: 385000, GHS: 2995, KES: 32000, ZAR: 5400 },
    includedCreditsUsd: 400,
    ctaHref: "/start?plan=business",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    monthly: null,
    includedCreditsUsd: null,
    ctaHref: "/contact?plan=enterprise",
  },
]

export function formatMoney(amount: number, currency: CurrencyCode): string {
  const c = CURRENCIES.find((x) => x.code === currency) ?? CURRENCIES[0]
  return new Intl.NumberFormat(c.locale, {
    style: "currency",
    currency,
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount)
}

export function annualPrice(monthly: number): number {
  return monthly * 10
}
