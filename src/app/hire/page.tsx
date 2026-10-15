import type { Metadata } from "next"
import Link from "next/link"
import { Search } from "lucide-react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import {
  DEPARTMENT_LABELS,
  PRICE_BASIS_LABEL,
  formatListedPrice,
  listEmployees,
} from "@/lib/marketplace"
import { cn } from "@/lib/utils"

const title = "Hire an AI employee — Fless marketplace"
const description =
  "Browse AI employees made by builders and reviewed by Fless: marketing, sales, support, calls, recruitment, operations, finance and HR. Search, compare prices and hire."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "https://getfless.com/hire" },
  openGraph: {
    title,
    description,
    url: "https://getfless.com/hire",
    siteName: "Fless",
    images: [{ url: "/fless-og.png", width: 1200, height: 630, alt: "Fless marketplace" }],
  },
}

const PAGE_SIZE = 24
const CATEGORY_ORDER = ["MARKETING", "SALES", "SUPPORT", "VOICE", "RECRUITMENT", "OPERATIONS", "FINANCE", "HR", "CUSTOM"]

type Props = { searchParams: Promise<{ query?: string; department?: string; page?: string }> }

function href(params: { query?: string; department?: string; page?: number }) {
  const qs = new URLSearchParams()
  if (params.query) qs.set("query", params.query)
  if (params.department) qs.set("department", params.department)
  if (params.page && params.page > 1) qs.set("page", String(params.page))
  const s = qs.toString()
  return s ? `/hire?${s}` : "/hire"
}

export default async function HirePage({ searchParams }: Props) {
  const sp = await searchParams
  const query = (sp.query ?? "").trim().slice(0, 100)
  const department = CATEGORY_ORDER.includes((sp.department ?? "").toUpperCase()) ? (sp.department ?? "").toUpperCase() : ""
  const page = Math.max(1, Number(sp.page) || 1)
  const list = await listEmployees({ query, department, page, pageSize: PAGE_SIZE })
  const pages = Math.max(1, Math.ceil(list.total / PAGE_SIZE))

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Header activePage="hire" />
      <main className="flex-1 pt-28 sm:pt-32 md:pt-36 pb-24">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary mb-4">Marketplace</p>
            <h1 className="text-[36px] sm:text-5xl font-display font-semibold tracking-[-0.04em] leading-[1.06] text-balance">
              Hire an AI employee.
            </h1>
            <p className="mt-5 text-[17px] text-muted-foreground leading-relaxed max-w-2xl">
              Every employee here is made by a builder and reviewed by Fless before it’s listed. You choose what it may
              do on its own and what it asks you first.{" "}
              <Link href="/build" className="text-primary font-medium">Can’t find one? Build your own →</Link>
            </p>
          </div>

          <form action="/hire" method="get" role="search" className="mb-6">
            {department && <input type="hidden" name="department" value={department} />}
            <label className="relative flex items-center max-w-xl">
              <span className="sr-only">Search employees</span>
              <Search className="absolute left-4 w-4 h-4 text-muted-foreground" aria-hidden />
              <input
                type="search"
                name="query"
                defaultValue={query}
                placeholder="Search: “WhatsApp bookings”, “LinkedIn posts”, “invoice reminders”"
                className="w-full h-12 pl-11 pr-28 rounded-full border border-border bg-background text-base sm:text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/25"
              />
              <button
                type="submit"
                className="absolute right-1.5 h-9 rounded-full bg-primary px-4 text-[13px] font-medium text-primary-foreground hover:bg-primary-hover"
              >
                Search
              </button>
            </label>
          </form>

          <nav aria-label="Categories" className="flex flex-wrap gap-2 mb-10">
            <Link
              href={href({ query })}
              className={cn(
                "h-9 inline-flex items-center rounded-full px-4 text-[13px] font-medium border transition-colors",
                !department ? "bg-foreground text-background border-foreground" : "border-border hover:border-primary/40",
              )}
            >
              All
            </Link>
            {CATEGORY_ORDER.map((d) => (
              <Link
                key={d}
                href={href({ query, department: d })}
                className={cn(
                  "h-9 inline-flex items-center rounded-full px-4 text-[13px] font-medium border transition-colors",
                  department === d ? "bg-foreground text-background border-foreground" : "border-border hover:border-primary/40",
                )}
              >
                {DEPARTMENT_LABELS[d]}
              </Link>
            ))}
          </nav>

          {!list.ok ? (
            <div className="rounded-2xl border border-border/70 p-8 max-w-2xl">
              <h2 className="text-lg font-semibold mb-2">The marketplace is unavailable right now.</h2>
              <p className="text-[15px] text-muted-foreground leading-relaxed mb-5">
                We couldn’t load employees. Try again in a moment, or join the beta and we’ll show you around.
              </p>
              <Link href="/start" className="text-[14px] font-medium text-primary">Join the beta →</Link>
            </div>
          ) : list.items.length === 0 ? (
            <div className="rounded-2xl border border-border/70 p-8 max-w-2xl">
              <h2 className="text-lg font-semibold mb-2">No employees match yet.</h2>
              <p className="text-[15px] text-muted-foreground leading-relaxed mb-5">
                Try another search or category, or describe the job and build one for your business in minutes.
              </p>
              <Link href="/build" className="text-[14px] font-medium text-primary">Build your own →</Link>
            </div>
          ) : (
            <>
              <p className="text-[13px] text-muted-foreground mb-4 tabular-nums">
                {list.total} {list.total === 1 ? "employee" : "employees"}
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {list.items.map((e) => (
                  <li key={e.id}>
                    <Link
                      href={`/ai-employees/${e.slug}`}
                      className="group h-full rounded-2xl border border-border/80 p-5 flex flex-col hover:border-primary/40 transition-colors"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        {e.avatarUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={e.avatarUrl} alt="" className="w-10 h-10 rounded-full object-cover bg-secondary" />
                        ) : (
                          <span className="w-10 h-10 rounded-full bg-brand-soft text-primary flex items-center justify-center text-[15px] font-semibold">
                            {e.name.slice(0, 1)}
                          </span>
                        )}
                        <div className="min-w-0">
                          <div className="text-[15px] font-semibold tracking-tight truncate group-hover:text-primary transition-colors">{e.name}</div>
                          <div className="text-[12px] text-muted-foreground truncate">{e.title}</div>
                        </div>
                      </div>
                      <p className="text-[14px] text-muted-foreground leading-relaxed line-clamp-3 flex-1">{e.description}</p>
                      <div className="mt-4 pt-4 border-t border-border/60 flex items-end justify-between gap-3 text-[12px]">
                        <div className="text-muted-foreground min-w-0">
                          <div className="truncate">{DEPARTMENT_LABELS[e.department] ?? e.department}</div>
                          <div className="truncate">By {e.authorName}</div>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="text-[14px] font-medium text-foreground tabular-nums">{formatListedPrice(e.price)}</div>
                          {e.price && <div className="text-muted-foreground">{PRICE_BASIS_LABEL[e.price.basis]}</div>}
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
              {pages > 1 && (
                <nav aria-label="Pages" className="mt-10 flex items-center justify-between text-[14px]">
                  {page > 1 ? (
                    <Link href={href({ query, department, page: page - 1 })} className="font-medium text-primary">← Previous</Link>
                  ) : <span />}
                  <span className="text-muted-foreground tabular-nums">Page {page} of {pages}</span>
                  {page < pages ? (
                    <Link href={href({ query, department, page: page + 1 })} className="font-medium text-primary">Next →</Link>
                  ) : <span />}
                </nav>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
