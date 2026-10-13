import Link from "next/link"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { getPublishedEmployees, type PublicEmployee } from "@/lib/marketplace"

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

// Same tiers as the backend pricing calculator (calculateDurationDiscount).
const TENURE_DISCOUNTS = [
  { term: "5+ days", discount: "5%" },
  { term: "10+ days", discount: "8%" },
  { term: "2+ weeks", discount: "10%" },
  { term: "4+ weeks", discount: "12%" },
  { term: "3+ months", discount: "15%" },
  { term: "6+ months", discount: "20%" },
  { term: "12+ months or 1+ year", discount: "25%" },
  { term: "5+ years", discount: "30%" },
  { term: "10+ years", discount: "35%" },
]

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
    q: "Can I cancel?",
    a: "Yes. You can end a hire when you no longer need it. Unused time is refunded according to your contract terms; metered usage already consumed is not refundable.",
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

      <main className="flex-1">
        <section className="pt-28 pb-14 sm:pt-32 md:pt-40 md:pb-20">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
            <div className="max-w-3xl">
              <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary mb-5">Pricing</p>
              <h1 className="text-[40px] sm:text-6xl font-display font-semibold tracking-[-0.045em] leading-[1.04] text-balance">
                Pay for the work, <span className="text-primary">not for seats.</span>
              </h1>
              <p className="mt-6 text-[17px] sm:text-xl text-muted-foreground leading-[1.65] max-w-2xl text-pretty">
                Every AI employee has its own listed price, shown below exactly as it appears in the marketplace. Model
                use, computing and storage are included.
              </p>
            </div>
          </div>
        </section>

        <section className="pb-20 md:pb-28">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
            {groups.length === 0 ? (
              <div className="rounded-2xl border border-border/70 p-8 sm:p-12 max-w-2xl">
                <h2 className="text-xl font-display font-semibold mb-3">Live prices are unavailable right now.</h2>
                <p className="text-[15px] text-muted-foreground leading-relaxed mb-6">
                  We couldn&apos;t reach the marketplace. Join the beta and we&apos;ll send you current prices for the
                  departments you need.
                </p>
                <Link
                  href="/start"
                  className="inline-flex h-11 items-center rounded-full bg-primary px-6 text-[14px] font-medium text-primary-foreground hover:bg-primary-hover transition-colors"
                >
                  Join the beta →
                </Link>
              </div>
            ) : (
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
            )}
          </div>
        </section>

        <section className="py-20 md:py-28 bg-[#fafafa] dark:bg-secondary border-t border-border/60">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-5">
              <h2 className="text-3xl sm:text-4xl font-display font-semibold tracking-tight leading-[1.12] mb-4">
                Hire for longer, pay less.
              </h2>
              <p className="text-[15px] text-muted-foreground leading-relaxed max-w-md">
                Discounts apply automatically to the employee&apos;s listed rate based on how long you hire it.
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
