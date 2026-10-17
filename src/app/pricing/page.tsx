import Link from "next/link"
import { ArrowRight, Calculator, Clock, ShieldCheck, Zap } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { PricingPlans } from "@/components/PricingPlans"
import { PricingCalculator } from "@/components/PricingCalculator"
import { PlanCalculator } from "@/components/PlanCalculator"
import { BILLING_STATEMENT, DEPARTMENT_RATES, TENURE_DISCOUNTS, formatEstimate } from "@/lib/billing"
import { departments } from "@/lib/departments"
import {
  DEPARTMENT_LABELS,
  PRICE_BASIS_LABEL,
  formatListedPrice,
  listEmployees,
  type ListedEmployee,
} from "@/lib/marketplace"

// Employee prices come from the live marketplace.
export const revalidate = 600

function median(values: number[]): number | null {
  if (values.length === 0) return null
  const sorted = [...values].sort((a, b) => a - b)
  return sorted[Math.floor(sorted.length / 2)]
}

function suggestedPrice(items: ListedEmployee[]): number | null {
  const monthly = items.filter((e) => e.price?.basis === "monthly").map((e) => (e.price?.amountCents ?? 0) / 100)
  const m = median(monthly)
  return m == null ? null : Math.round(m)
}

export default async function PricingPage() {
  const t = await getTranslations("pricing")
  const list = await listEmployees({ pageSize: 48 })
  const faqs = t.raw("faq") as { q: string; a: string }[]
  const creditUses = t.raw("creditUses") as string[]

  const parts = [
    { n: "1", title: t("partPlan"), copy: t("partPlanText") },
    { n: "2", title: t("partEmployee"), copy: t("partEmployeeText") },
    { n: "3", title: t("partCredits"), copy: t("partCreditsText") },
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Header activePage="pricing" />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="pt-24 md:pt-28 max-w-[1240px] mx-auto px-6 pb-12 md:pb-16 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-medium tracking-wider uppercase mb-2">
            <Calculator className="w-3.5 h-3.5" />
            <span>{t("eyebrow")}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[60px] font-display font-semibold tracking-tight leading-[1.05] text-foreground max-w-4xl mx-auto uppercase">
            {t("title1")} <br />
            <span className="text-primary">{t("title2")}</span>
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t("lede", { count: departments.length })}
          </p>
        </section>

        {/* ONE BILL, THREE PARTS */}
        <section className="pb-16 md:pb-20">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
            <h2 className="sr-only">{t("partsTitle")}</h2>
            <ol className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-border/70 pt-8">
              {parts.map((p) => (
                <li key={p.n}>
                  <div className="text-[13px] font-medium tabular-nums text-primary mb-2">{p.n}</div>
                  <h3 className="text-[17px] font-semibold tracking-tight mb-1.5">{p.title}</h3>
                  <p className="text-[14px] text-muted-foreground leading-relaxed">{p.copy}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 1. PLANS */}
        <section id="plans" className="pb-20 md:pb-28 scroll-mt-20">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-display font-semibold tracking-tight mb-6">{t("plansTitle")}</h2>
            <PricingPlans />
            <p className="mt-6 text-[13px] text-muted-foreground max-w-3xl leading-relaxed">{BILLING_STATEMENT}</p>
          </div>
        </section>

        {/* INTERACTIVE WORKFORCE CAPACITY & COST CALCULATOR */}
        <div id="workforce" className="scroll-mt-20">
          <PricingCalculator />
        </div>

        {/* 2. EMPLOYEE PRICES */}
        <section id="employees" className="py-20 md:py-28 border-t border-border/60 scroll-mt-20">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div className="max-w-2xl">
                <h2 className="text-2xl sm:text-3xl font-display font-semibold tracking-tight mb-3">{t("employeesTitle")}</h2>
                <p className="text-[15px] text-muted-foreground leading-relaxed">{t("employeesLede")}</p>
              </div>
              <Link href="/hire" className="text-[14px] font-medium text-primary shrink-0">{t("browseAll")}</Link>
            </div>

            {!list.ok ? (
              <div className="rounded-2xl border border-border/70 p-8 max-w-2xl">
                <h3 className="text-lg font-semibold mb-2">{t("employeesUnavailable")}</h3>
                <p className="text-[15px] text-muted-foreground leading-relaxed">{t("employeesUnavailableText")}</p>
              </div>
            ) : list.items.length === 0 ? (
              <p className="text-[15px] text-muted-foreground">{t("employeesEmpty")}</p>
            ) : (
              <ul className="border-t border-border/70">
                {list.items.map((e) => (
                  <li key={e.slug} className="border-b border-border/70">
                    <Link href={`/ai-employees/${e.slug}`} className="group grid grid-cols-1 sm:grid-cols-12 gap-x-6 gap-y-1 py-5 sm:items-center">
                      <div className="sm:col-span-4 min-w-0">
                        <div className="text-[16px] font-semibold tracking-tight group-hover:text-primary transition-colors">{e.name}</div>
                        <div className="text-[13px] text-muted-foreground">
                          {e.title} · {DEPARTMENT_LABELS[e.department] ?? e.department}
                        </div>
                      </div>
                      <p className="sm:col-span-5 text-[14px] text-muted-foreground leading-relaxed line-clamp-2">{e.description}</p>
                      <div className="sm:col-span-3 sm:text-right">
                        <div className="text-[15px] font-medium tabular-nums">{formatListedPrice(e.price)}</div>
                        {e.price && <div className="text-[12px] text-muted-foreground">{PRICE_BASIS_LABEL[e.price.basis]}</div>}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

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
                  No GPU server markups or technical infrastructure bills. What your employees use is billed as work credits, within a monthly cap you set.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: DEPARTMENT RATE OVERVIEW (ALL DEPARTMENTS, USD) */}
        <section className="max-w-[1240px] mx-auto px-6 py-12 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-primary">Department Rates</span>
              <h2 className="text-2xl md:text-3xl font-display font-semibold tracking-tight text-foreground">
                Reference Rates across {departments.length} Departments
              </h2>
            </div>
            <div className="text-xs text-muted-foreground font-mono">
              Displayed in USD
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {departments.map((dept) => {
              const spec = DEPARTMENT_RATES[dept.slug]
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
                          {formatEstimate(spec.baseRateCents.hour.min, "USD")}–{formatEstimate(spec.baseRateCents.hour.max, "USD")}
                        </span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>Monthly range</span>
                        <span className="font-mono font-semibold text-foreground">
                          {formatEstimate(spec.baseRateCents.month.min, "USD")}–{formatEstimate(spec.baseRateCents.month.max, "USD")}
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
              {TENURE_DISCOUNTS.map((d) => (
                <div key={d.term} className="flex items-baseline justify-between gap-6 py-4">
                  <dt className="text-[15px] text-foreground">{d.term}</dt>
                  <dd className="text-[15px] font-medium text-primary tabular-nums">{d.discount}% off</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* 3. WORK CREDITS */}
        <section id="credits" className="py-20 md:py-28 bg-[#fafafa] dark:bg-secondary border-t border-border/60 scroll-mt-20">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-5">
              <h2 className="text-2xl sm:text-3xl font-display font-semibold tracking-tight mb-3">{t("creditsTitle")}</h2>
              <p className="text-[15px] text-muted-foreground leading-relaxed mb-6">{t("creditsLede")}</p>
              <h3 className="text-[15px] font-semibold mb-3">{t("creditsUses")}</h3>
              <ul className="space-y-2 text-[14px] text-muted-foreground list-disc pl-5">
                {creditUses.map((u) => (
                  <li key={u}>{u}</li>
                ))}
              </ul>
            </div>
            <dl className="lg:col-span-7 divide-y divide-border/70 border-y border-border/70 self-start">
              <div className="py-6">
                <dt className="text-[16px] font-semibold mb-2">{t("creditsCap")}</dt>
                <dd className="text-[15px] text-muted-foreground leading-relaxed">{t("creditsCapText")}</dd>
              </div>
              <div className="py-6">
                <dt className="text-[16px] font-semibold mb-2">{t("creditsByok")}</dt>
                <dd className="text-[15px] text-muted-foreground leading-relaxed">{t("creditsByokText")}</dd>
              </div>
              <div className="py-6">
                <dt className="text-[16px] font-semibold mb-2">{t("regionalTitle")}</dt>
                <dd className="text-[15px] text-muted-foreground leading-relaxed">{BILLING_STATEMENT}</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* CALCULATOR */}
        <section id="calculator" className="py-20 md:py-28 border-t border-border/60 scroll-mt-20">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
            <div className="max-w-2xl mb-10">
              <h2 className="text-2xl sm:text-3xl font-display font-semibold tracking-tight mb-3">{t("calcTitle")}</h2>
              <p className="text-[15px] text-muted-foreground leading-relaxed">{t("calcLede")}</p>
            </div>
            <PlanCalculator suggestedEmployeePrice={suggestedPrice(list.items)} />
          </div>
        </section>

        <section id="faqs" className="py-20 md:py-28 border-t border-border/60">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <h2 className="lg:col-span-4 text-3xl sm:text-4xl font-display font-semibold tracking-tight leading-[1.12]">{t("faqTitle")}</h2>
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

        <section className="py-16 md:py-24 bg-night text-white">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <h2 className="text-2xl sm:text-3xl font-display font-semibold tracking-tight max-w-xl">{t("ctaTitle")}</h2>
            <Link
              href="/start"
              className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-7 text-[15px] font-medium text-primary-foreground hover:bg-primary-hover transition-colors self-start md:self-auto"
            >
              {t("ctaButton")} →
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
