import type { ReactNode } from "react"
import Link from "next/link"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"

export type LegalNavItem = { id: string; title: string }

const related = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/security", label: "Security" },
]

export function LegalDoc({
  eyebrow,
  title,
  lede,
  updated,
  nav,
  current,
  children,
}: {
  eyebrow: string
  title: string
  lede: string
  updated: string
  nav: LegalNavItem[]
  current: string
  children: ReactNode
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Header />
      <main className="flex-1 pt-24 md:pt-28">
        <div className="max-w-[1120px] mx-auto px-6 pb-20 md:pb-28">
          <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary mb-4">{eyebrow}</p>
          <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-display font-semibold tracking-tight leading-[1.08] max-w-3xl">
            {title}
          </h1>
          <p className="mt-5 text-[16px] text-muted-foreground leading-relaxed max-w-2xl">{lede}</p>
          <p className="mt-4 text-[13px] text-muted-foreground">Last updated {updated}</p>

          <div className="mt-12 md:mt-16 grid lg:grid-cols-12 gap-10 lg:gap-16">
            <aside className="lg:col-span-4">
              <nav className="lg:sticky lg:top-24 space-y-1">
                <p className="text-[11px] font-medium uppercase tracking-wider text-primary mb-3">On this page</p>
                {nav.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block text-[13px] text-muted-foreground hover:text-foreground py-1.5 leading-snug"
                  >
                    {item.title}
                  </a>
                ))}
              </nav>
            </aside>
            <article className="lg:col-span-8 legal-prose min-w-0">{children}</article>
          </div>

          <div className="mt-16 pt-8 border-t border-border/60 flex flex-wrap gap-3">
            {related.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`inline-flex h-10 items-center rounded-full px-4 text-sm font-medium border ${
                  current === item.href
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border hover:bg-secondary/60"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="inline-flex h-10 items-center rounded-full px-4 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Talk to us →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export function Section({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-28 mb-12 md:mb-14">
      <h2 className="text-xl md:text-2xl font-display font-semibold tracking-tight mb-4">{title}</h2>
      <div className="space-y-4 text-[15px] text-muted-foreground leading-relaxed">{children}</div>
    </section>
  )
}
