import Link from "next/link"
import { getTranslations } from "next-intl/server"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { PricingPlans } from "@/components/PricingPlans"
import { PricingCalculator } from "@/components/PricingCalculator"
import { BILLING_STATEMENT } from "@/lib/billing"
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
        <section className="pt-28 pb-12 sm:pt-32 md:pt-40 md:pb-16">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
            <div className="max-w-3xl">
              <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary mb-5">{t("eyebrow")}</p>
              <h1 className="text-[40px] sm:text-6xl font-display font-semibold tracking-[-0.045em] leading-[1.04] text-balance">
                {t("title1")} <span className="text-primary">{t("title2")}</span>
              </h1>
              <p className="mt-6 text-[17px] sm:text-xl text-muted-foreground leading-[1.65] max-w-2xl text-pretty">{t("lede")}</p>
            </div>
            <ol className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-border/70 pt-8">
              {parts.map((p) => (
                <li key={p.n}>
                  <div className="text-[13px] font-medium tabular-nums text-primary mb-2">{p.n}</div>
                  <h2 className="text-[17px] font-semibold tracking-tight mb-1.5">{p.title}</h2>
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
            <PricingCalculator suggestedEmployeePrice={suggestedPrice(list.items)} />
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
