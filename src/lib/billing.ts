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

// ---------------------------------------------------------------------------
// Workforce estimator (owner's department/tenure calculator on /pricing).
// TODO(owner): the reference rate ranges, tenure discounts and indicative
// exchange rates below came from the owner's calculator on main; confirm them
// against the backend pricing calculator before launch.
// ---------------------------------------------------------------------------

export type TenureUnit = "hour" | "day" | "week" | "month" | "year"

export const TENURE_UNITS: TenureUnit[] = ["hour", "day", "week", "month", "year"]

/** Tenure discount tiers, same as the backend's calculateDurationDiscount. */
export const TENURE_DISCOUNT_TIERS: { unit: TenureUnit; minQty: number; discount: number; term: string }[] = [
  { unit: "day", minQty: 5, discount: 5, term: "5+ days" },
  { unit: "day", minQty: 10, discount: 8, term: "10+ days" },
  { unit: "week", minQty: 2, discount: 10, term: "2+ weeks" },
  { unit: "week", minQty: 4, discount: 12, term: "4+ weeks" },
  { unit: "month", minQty: 3, discount: 15, term: "3+ months" },
  { unit: "month", minQty: 6, discount: 20, term: "6+ months" },
  { unit: "month", minQty: 12, discount: 25, term: "12+ months or 1+ year" },
  { unit: "year", minQty: 1, discount: 25, term: "12+ months or 1+ year" },
  { unit: "year", minQty: 5, discount: 30, term: "5+ years" },
  { unit: "year", minQty: 10, discount: 35, term: "10+ years" },
]

/** Unique term → discount rows for display. */
export const TENURE_DISCOUNTS: { term: string; discount: number }[] = TENURE_DISCOUNT_TIERS.filter(
  (t, i, all) => all.findIndex((x) => x.term === t.term) === i,
).map(({ term, discount }) => ({ term, discount }))

export function tenureDiscount(qty: number, unit: TenureUnit): number {
  return TENURE_DISCOUNT_TIERS.filter((t) => t.unit === unit && qty >= t.minQty).reduce(
    (best, t) => Math.max(best, t.discount),
    0,
  )
}

type RateRange = { min: number; max: number }

export interface DepartmentRate {
  /** Reference rate range per tenure unit, in US cents. Builders set the exact listing price. */
  baseRateCents: Record<TenureUnit, RateRange>
  usage?: { name: string; unitCents: number; defaultQty: number }
}

export const DEPARTMENT_RATES: Record<string, DepartmentRate> = {
  marketing: {
    baseRateCents: {
      hour: { min: 3500, max: 5500 },
      day: { min: 14000, max: 22000 },
      week: { min: 55000, max: 88000 },
      month: { min: 160000, max: 250000 },
      year: { min: 1600000, max: 2500000 },
    },
    usage: { name: "Content Packs", unitCents: 10, defaultQty: 500 },
  },
  voice: {
    baseRateCents: {
      hour: { min: 2500, max: 4500 },
      day: { min: 10000, max: 18000 },
      week: { min: 40000, max: 70000 },
      month: { min: 120000, max: 200000 },
      year: { min: 1200000, max: 2000000 },
    },
    usage: { name: "Telephony Minutes", unitCents: 5, defaultQty: 1000 },
  },
  sales: {
    baseRateCents: {
      hour: { min: 4000, max: 6500 },
      day: { min: 16000, max: 26000 },
      week: { min: 64000, max: 100000 },
      month: { min: 180000, max: 300000 },
      year: { min: 1800000, max: 3000000 },
    },
  },
  support: {
    baseRateCents: {
      hour: { min: 2000, max: 3500 },
      day: { min: 8000, max: 14000 },
      week: { min: 32000, max: 56000 },
      month: { min: 100000, max: 160000 },
      year: { min: 1000000, max: 1600000 },
    },
    usage: { name: "Resolved Tickets", unitCents: 8, defaultQty: 800 },
  },
  recruitment: {
    baseRateCents: {
      hour: { min: 3500, max: 5500 },
      day: { min: 14000, max: 22000 },
      week: { min: 56000, max: 88000 },
      month: { min: 160000, max: 240000 },
      year: { min: 1600000, max: 2400000 },
    },
  },
  operations: {
    baseRateCents: {
      hour: { min: 3000, max: 5000 },
      day: { min: 12000, max: 20000 },
      week: { min: 48000, max: 80000 },
      month: { min: 140000, max: 220000 },
      year: { min: 1400000, max: 2200000 },
    },
  },
  finance: {
    baseRateCents: {
      hour: { min: 4500, max: 7500 },
      day: { min: 18000, max: 30000 },
      week: { min: 72000, max: 120000 },
      month: { min: 200000, max: 350000 },
      year: { min: 2000000, max: 3500000 },
    },
  },
  hr: {
    baseRateCents: {
      hour: { min: 2500, max: 4500 },
      day: { min: 10000, max: 18000 },
      week: { min: 40000, max: 72000 },
      month: { min: 120000, max: 200000 },
      year: { min: 1200000, max: 2000000 },
    },
  },
  legal: {
    baseRateCents: {
      hour: { min: 4500, max: 8000 },
      day: { min: 18000, max: 32000 },
      week: { min: 72000, max: 128000 },
      month: { min: 220000, max: 380000 },
      year: { min: 2200000, max: 3800000 },
    },
  },
}

/** Indicative exchange rates from USD, for estimates only. Checkout uses the plan price lists above. */
export const INDICATIVE_FX_FROM_USD: Record<CurrencyCode, number> = {
  USD: 1,
  GBP: 0.79,
  EUR: 0.92,
  NGN: 1500,
  GHS: 15.4,
  KES: 129,
  ZAR: 18.1,
}

/** Formats a USD-cents amount in another currency at the indicative rate. */
export function formatEstimate(centsUSD: number, currency: CurrencyCode): string {
  return formatMoney(Math.round((centsUSD / 100) * INDICATIVE_FX_FROM_USD[currency]), currency)
}
