import Link from "next/link"
import {
  ArrowRight,
  Calculator,
  Clock,
  ShieldCheck,
  BarChart2,
  Phone,
  DollarSign,
  Headphones,
  UserCheck,
  Settings,
  CreditCard,
  Briefcase,
  Zap,
  Scale,
} from "lucide-react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { PricingCalculator } from "@/components/PricingCalculator"
import { getPublishedEmployees, type PublicEmployee } from "@/lib/marketplace"
import { departments } from "@/lib/departments"

export type CurrencyCode = "USD" | "NGN" | "GBP" | "EUR" | "KES" | "GHS" | "ZAR" | "AED"

interface CurrencyConfig {
  code: CurrencyCode
  symbol: string
  name: string
  rate: number
  flag: string
}

const activeCurrency: CurrencyConfig = {
  code: "USD",
  symbol: "$",
  name: "United States (USD)",
  rate: 1.0,
  flag: "🇺🇸",
}

const TENURE_DISCOUNTS = [
  { term: "2+ weeks", discount: "10%" },
  { term: "4+ weeks", discount: "12%" },
  { term: "3+ months", discount: "15%" },
  { term: "6+ months", discount: "20%" },
  { term: "12+ months or 1+ year", discount: "25%" },
  { term: "5+ years", discount: "30%" },
  { term: "10+ years", discount: "35%" },
]

// Prices come from the live marketplace and refresh hourly.
export const revalidate = 3600

const DEPARTMENT_ORDER = ["MARKETING", "VOICE", "SALES", "SUPPORT", "RECRUITMENT", "OPERATIONS", "FINANCE", "HR"]
const DEPARTMENT_NAMES: Record<string, string> = {
  MARKETING: "Marketing",
  VOICE: "Voice",
  SALES: "Sales",
  SUPPORT: "Support",
  RECRUITMENT: "Recruitment",
  OPERATIONS: "Operations",
  FINANCE: "Finance",
  HR: "HR",
}


interface DepartmentPricingSpec {
  slug: string
  name: string
  icon: React.ComponentType<{ className?: string }>
  humanBenchmarkMonthlyUSD: number
  capacityOutput: string
  baseRateCents: {
    hour: { min: number; max: number }
    day: { min: number; max: number }
    week: { min: number; max: number }
    month: { min: number; max: number }
    year: { min: number; max: number }
  }
  hasUsageAddon?: boolean
  usageName?: string
  usageUnitCents?: number
  defaultUsageQty?: number
}

const departmentSpecs: Record<string, DepartmentPricingSpec> = {
  marketing: {
    slug: "marketing",
    name: "Marketing",
    icon: BarChart2,
    humanBenchmarkMonthlyUSD: 5200,
    capacityOutput: "~140 SEO articles, 450 social posts & daily Meta ad audits",
    baseRateCents: {
      hour: { min: 3500, max: 5500 },
      day: { min: 14000, max: 22000 },
      week: { min: 55000, max: 88000 },
      month: { min: 160000, max: 250000 },
      year: { min: 1600000, max: 2500000 },
    },
    hasUsageAddon: true,
    usageName: "Content Packs",
    usageUnitCents: 10,
    defaultUsageQty: 500,
  },
  voice: {
    slug: "voice",
    name: "Voice",
    icon: Phone,
    humanBenchmarkMonthlyUSD: 4100,
    capacityOutput: "~1,200 inbound calls handled, low-latency streaming audio, zero hold times",
    baseRateCents: {
      hour: { min: 2500, max: 4500 },
      day: { min: 10000, max: 18000 },
      week: { min: 40000, max: 70000 },
      month: { min: 120000, max: 200000 },
      year: { min: 1200000, max: 2000000 },
    },
    hasUsageAddon: true,
    usageName: "Telephony Minutes",
    usageUnitCents: 5,
    defaultUsageQty: 1000,
  },
  sales: {
    slug: "sales",
    name: "Sales",
    icon: DollarSign,
    humanBenchmarkMonthlyUSD: 5800,
    capacityOutput: "~850 inbound leads enriched, 100% CRM sync, 160 bookings",
    baseRateCents: {
      hour: { min: 4000, max: 6500 },
      day: { min: 16000, max: 26000 },
      week: { min: 64000, max: 100000 },
      month: { min: 180000, max: 300000 },
      year: { min: 1800000, max: 3000000 },
    },
  },
  support: {
    slug: "support",
    name: "Support",
    icon: Headphones,
    humanBenchmarkMonthlyUSD: 3800,
    capacityOutput: "~3,200 tickets resolved across WhatsApp & web, 99.4% CSAT",
    baseRateCents: {
      hour: { min: 2000, max: 3500 },
      day: { min: 8000, max: 14000 },
      week: { min: 32000, max: 56000 },
      month: { min: 100000, max: 160000 },
      year: { min: 1000000, max: 1600000 },
    },
    hasUsageAddon: true,
    usageName: "Resolved Tickets",
    usageUnitCents: 8,
    defaultUsageQty: 800,
  },
  recruitment: {
    slug: "recruitment",
    name: "Recruitment",
    icon: UserCheck,
    humanBenchmarkMonthlyUSD: 4900,
    capacityOutput: "~450 candidate profiles scored, 60 screening calls locked",
    baseRateCents: {
      hour: { min: 3500, max: 5500 },
      day: { min: 14000, max: 22000 },
      week: { min: 56000, max: 88000 },
      month: { min: 160000, max: 240000 },
      year: { min: 1600000, max: 2400000 },
    },
  },
  operations: {
    slug: "operations",
    name: "Operations",
    icon: Settings,
    humanBenchmarkMonthlyUSD: 4600,
    capacityOutput: "~500 team dispatches, internal Slack escalation, project logs",
    baseRateCents: {
      hour: { min: 3000, max: 5000 },
      day: { min: 12000, max: 20000 },
      week: { min: 48000, max: 80000 },
      month: { min: 140000, max: 220000 },
      year: { min: 1400000, max: 2200000 },
    },
  },
  finance: {
    slug: "finance",
    name: "Finance",
    icon: CreditCard,
    humanBenchmarkMonthlyUSD: 6200,
    capacityOutput: "~700 PDF invoices scanned, zero OCR errors, automated GL sync",
    baseRateCents: {
      hour: { min: 4500, max: 7500 },
      day: { min: 18000, max: 30000 },
      week: { min: 72000, max: 120000 },
      month: { min: 200000, max: 350000 },
      year: { min: 2000000, max: 3500000 },
    },
  },
  hr: {
    slug: "hr",
    name: "HR",
    icon: Briefcase,
    humanBenchmarkMonthlyUSD: 4200,
    capacityOutput: "~90 employee onboarding workflows, instant handbook answers",
    baseRateCents: {
      hour: { min: 2500, max: 4500 },
      day: { min: 10000, max: 18000 },
      week: { min: 40000, max: 72000 },
      month: { min: 120000, max: 200000 },
      year: { min: 1200000, max: 2000000 },
    },
  },
  legal: {
    slug: "legal",
    name: "Legal",
    icon: Scale,
    humanBenchmarkMonthlyUSD: 7500,
    capacityOutput: "~120 contracts triaged and tracked, renewals flagged weeks ahead",
    baseRateCents: {
      hour: { min: 4500, max: 8000 },
      day: { min: 18000, max: 32000 },
      week: { min: 72000, max: 128000 },
      month: { min: 220000, max: 380000 },
      year: { min: 2200000, max: 3800000 },
    },
  },
}


function formatLocalizedPrice(centsUSD: number, currency: CurrencyConfig): string {
  const converted = (centsUSD / 100) * currency.rate
  if (currency.code === "NGN" || currency.code === "KES") {
    return `${currency.symbol}${Math.round(converted).toLocaleString()}`
  }
  return `${currency.symbol}${Math.round(converted).toLocaleString()}`
}

const faqs = [
  {
    q: "How is this different from paying for software seats?",
    a: "You don't pay per user. You hire an AI employee for as long as you need it, from a few hours to several years, and pay its listed rate.",
  },
  {
    q: "Are these prices final?",
    a: "Yes. Each employee shows its listing price before you hire it. Longer hires get the tenure discounts above.",
  },
  {
    q: "Are there hidden model or GPU charges?",
    a: "No. Model use, computing and storage are included in the listed rate. Employees with metered usage, such as call minutes, show those rates on their profile.",
  },
  {
    q: "Which currencies can I pay in?",
    a: "Prices are listed in US dollars. You can be billed in USD, NGN, GBP, EUR, KES, GHS, ZAR or AED, converted at the rate on your invoice date.",
  },
  {
    q: "How does the 70/30 revenue split work for Builders?",
    a: "When a business hires a builder-authored AI employee, the settled customer payment is split with 70% paid directly to the Builder every month and 30% retained by Fless (covering GPU compute, inference clustering, and gateway security).",
  },
  {
    q: "Are there hidden LLM token or GPU infrastructure surcharges?",
    a: "No. Businesses never see raw token meters, GPU cloud bills, or technical infrastructure jargon. All model execution, low-latency streaming audio, and storage costs are included in the transparent workforce price.",
  },
  {
    q: "Do enterprise contracts offer custom SLAs?",
    a: "Yes. Enterprise order forms include guaranteed response times, 99.9% uptime service credits, dedicated private regions or VPC deployment, and a named customer success manager.",
  },
]

function groupByDepartment(employees: PublicEmployee[]) {
  const groups = new Map<string, PublicEmployee[]>()
  for (const e of employees) {
    const key = e.department?.toUpperCase() || "OTHER"
    groups.set(key, [...(groups.get(key) ?? []), e])
  }
  return Array.from(groups.entries()).sort(
    ([a], [b]) => (DEPARTMENT_ORDER.indexOf(a) + 1 || 99) - (DEPARTMENT_ORDER.indexOf(b) + 1 || 99)
  )
}

export default async function PricingPage() {
  const employees = await getPublishedEmployees()
  const groups = groupByDepartment(employees)

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Header activePage="pricing" />

      <main className="flex-1 pt-24 md:pt-28 pb-20">
        {/* HERO SECTION */}
        <section className="max-w-[1240px] mx-auto px-6 pb-12 md:pb-16 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-medium tracking-wider uppercase mb-2">
            <Calculator className="w-3.5 h-3.5" />
            <span>Workforce Pricing & Capacity Engine</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[60px] font-display font-semibold tracking-tight leading-[1.05] text-foreground max-w-4xl mx-auto uppercase">
            Hire AI employees for the work <br />
            <span className="text-primary">your business needs.</span>
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Predictable, transparent workforce rates across 9 business departments. No seat licensing, no server fees, and full multi-currency global support.
          </p>
        </section>

        {/* INTERACTIVE WORKFORCE CAPACITY & COST CALCULATOR */}
        <PricingCalculator />

        {/* LIVE MARKETPLACE EMPLOYEES (WHEN AVAILABLE) */}
        {groups.length > 0 && (
          <section className="pb-20 md:pb-28">
            <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
              <div className="space-y-16">
                {groups.map(([dept, list]) => (
                  <div key={dept}>
                    <div className="flex items-baseline justify-between gap-4 mb-5">
                      <h2 className="text-2xl font-display font-semibold tracking-tight">{DEPARTMENT_NAMES[dept] ?? dept}</h2>
                      <span className="text-[13px] text-muted-foreground tabular-nums">
                        {list.length} {list.length === 1 ? "employee" : "employees"}
                      </span>
                    </div>
                    <ul className="border-t border-border/70">
                      {list.map((e) => (
                        <li key={e.slug} className="border-b border-border/70">
                          <Link
                            href={`/ai-employees/${e.slug}`}
                            className="group grid grid-cols-1 sm:grid-cols-12 gap-x-6 gap-y-1 py-5 sm:items-center"
                          >
                            <div className="sm:col-span-4">
                              <div className="text-[16px] font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
                                {e.name}
                              </div>
                              <div className="text-[13px] text-muted-foreground">{e.title}</div>
                            </div>
                            <p className="sm:col-span-5 text-[14px] text-muted-foreground leading-relaxed line-clamp-2">
                              {e.description}
                            </p>
                            <div className="sm:col-span-3 sm:text-right text-[15px] font-medium text-foreground tabular-nums">
                              {e.pricingDisplay.formattedRate}
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* SECTION 2: HOW FLESS PRICING COMPUTES */}
        <section className="max-w-[1240px] mx-auto px-6 py-12 md:py-16 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-primary">Philosophy</span>
            <h2 className="text-2xl md:text-3xl font-display font-semibold tracking-tight text-foreground">
              Built like hiring a workforce, not paying for seats.
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Fless contracts access to autonomous AI employees configured for your specific operational desks.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-xs sm:text-sm">
            <div className="p-6 rounded-2xl bg-card border border-border/80 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-foreground">
                  Flexible Tenure Models
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Hire Fless employees for hours, days, weeks, months, or up to 5 years. Renew on demand, or conclude when project objectives are fulfilled.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border/80 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-foreground">
                  Range & Fixed Listing Rates
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Fless department policies establish verified builder price bands. Employees declare exact listing prices so checkout is always transparent.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border/80 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-500">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-foreground">
                  Zero Infrastructure Jargon
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  No LLM token counters, GPU server markups, or technical infrastructure bills. All compute clustering is bundled into clean rates.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: DEPARTMENT RATE OVERVIEW (ALL 9 DEPARTMENTS IN SELECTED CURRENCY) */}
        <section className="max-w-[1240px] mx-auto px-6 py-12 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-primary">Department Rates</span>
              <h2 className="text-2xl md:text-3xl font-display font-semibold tracking-tight text-foreground">
                Reference Rates across 9 Departments
              </h2>
            </div>
            <div className="text-xs text-muted-foreground font-mono">
              Displayed in {activeCurrency.flag} {activeCurrency.code}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {departments.map((dept) => {
              const spec = departmentSpecs[dept.slug]
              if (!spec) return null
              return (
                <div
                  key={dept.slug}
                  className="p-5 rounded-2xl bg-card border border-border/80 flex flex-col justify-between hover:border-primary/40 transition-all space-y-4"
                >
                  <div className="space-y-2">
                    <h3 className="text-base font-semibold text-foreground">{dept.name}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">{dept.line}</p>
                    <div className="space-y-1.5 text-xs border-t border-border/60 pt-3">
                      <div className="flex justify-between text-muted-foreground">
                        <span>Hourly range</span>
                        <span className="font-mono font-semibold text-foreground">
                          {formatLocalizedPrice(spec.baseRateCents.hour.min, activeCurrency)}–{formatLocalizedPrice(spec.baseRateCents.hour.max, activeCurrency)}
                        </span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>Monthly range</span>
                        <span className="font-mono font-semibold text-foreground">
                          {formatLocalizedPrice(spec.baseRateCents.month.min, activeCurrency)}–{formatLocalizedPrice(spec.baseRateCents.month.max, activeCurrency)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Link
                    href={`/departments/${dept.slug}`}
                    className="text-xs font-medium text-primary flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    View {dept.name} Desks <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )
            })}
          </div>
        </section>

        {/* SECTION 4: GUARANTEE & CANCELLATION FRAMEWORK */}
        <section id="guarantee" className="max-w-[1240px] mx-auto px-6 py-12">
          <div className="p-8 rounded-3xl bg-card border border-border/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-md">
            <div className="max-w-2xl space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                <ShieldCheck className="w-4 h-4" /> Fless Cancellation Framework
              </div>
              <h3 className="text-xl font-display font-semibold text-foreground">
                Money-back and cancellation guarantee
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Decommission an employee deployment when capacity is no longer required. Eligible unused service is refunded pro-rata according to the worker&apos;s published contract terms.
              </p>
            </div>
            <dl className="lg:col-span-7 divide-y divide-border/70 border-y border-border/70">
              {TENURE_DISCOUNTS.map((t) => (
                <div key={t.term} className="flex items-baseline justify-between gap-6 py-4">
                  <dt className="text-[15px] text-foreground">{t.term}</dt>
                  <dd className="text-[15px] font-medium text-primary tabular-nums">{t.discount} off</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="faqs" className="py-20 md:py-28 border-t border-border/60">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <h2 className="lg:col-span-4 text-3xl sm:text-4xl font-display font-semibold tracking-tight leading-[1.12]">
              Pricing questions.
            </h2>
            <dl className="lg:col-span-8 divide-y divide-border/70 border-y border-border/70">
              {faqs.map((f) => (
                <div key={f.q} className="py-6">
                  <dt className="text-[16px] font-semibold text-foreground mb-2">{f.q}</dt>
                  <dd className="text-[15px] text-muted-foreground leading-relaxed">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
