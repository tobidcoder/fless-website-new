"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { sizeSolutions } from "@/lib/solutions"
import { featuredIndustries, industryHref } from "@/lib/industries"
import { StickyRegister } from "@/components/StickyRegister"
import { FlessLogo } from "@/components/FlessLogo"
import { ThemeToggle } from "@/components/ThemeToggle"
import { LocaleSwitcher } from "@/components/LocaleSwitcher"
import { APP_URL } from "@/lib/env"
import { useTranslations } from "next-intl"

// Existing customers sign in on the dashboard; without it configured, /login explains access.
const LOGIN_HREF = APP_URL ? `${APP_URL}/login` : "/login"

interface HeaderProps {
  activePage?: string
}

const departments = [
  { key: "marketing", href: "/departments/marketing", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=200&auto=format&fit=crop&q=80", status: "live" },
  { key: "voice", href: "/departments/voice", image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=200&auto=format&fit=crop&q=80", status: "early-access" },
  { key: "sales", href: "/departments/sales", image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=200&auto=format&fit=crop&q=80", status: "early-access" },
  { key: "recruitment", href: "/departments/recruitment", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&auto=format&fit=crop&q=80", status: "early-access" },
  { key: "support", href: "/departments/support", image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=200&auto=format&fit=crop&q=80", status: "early-access" },
  { key: "operations", href: "/departments/operations", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=200&auto=format&fit=crop&q=80", status: "early-access" },
  { key: "finance", href: "/departments/finance", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=200&auto=format&fit=crop&q=80", status: "early-access" },
  { key: "hr", href: "/departments/hr", image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=200&auto=format&fit=crop&q=80", status: "early-access" },
  { key: "legal", href: "/departments/legal", image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=200&auto=format&fit=crop&q=80", status: "early-access" },
]

export function Header({ activePage }: HeaderProps) {
  const t = useTranslations("header")
  const [scrolled, setScrolled] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  return (
    <>
    <header
      onMouseLeave={() => setActiveMenu(null)}
      className={cn(
        "fixed top-0 inset-x-0 z-50 h-16 md:h-[68px] flex items-center transition-colors duration-300 border-b",
        scrolled || activeMenu || mobileOpen
          ? "bg-background/85 backdrop-blur-xl border-border/60"
          : "bg-transparent border-transparent"
      )}
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 w-full flex items-center justify-between">
        <div className="flex items-center gap-8 xl:gap-10">
          <FlessLogo />

          <nav className="hidden lg:flex items-center gap-1 text-[13px] font-medium text-muted-foreground">
            <div
              onMouseEnter={() => setActiveMenu("departments")}
              className="relative"
            >
              <Link
                href="/#departments"
                className={cn("px-3 py-2 rounded-md hover:text-foreground transition-colors flex items-center gap-1", activeMenu === "departments" && "text-foreground font-semibold")}
              >
                {t("departmentsMenu")}
                <span className="text-[10px] opacity-60">▾</span>
              </Link>
            </div>
            <div
              onMouseEnter={() => setActiveMenu("solutions")}
              className="relative"
            >
              <Link
                href="/solutions"
                className={cn("px-3 py-2 rounded-md hover:text-foreground transition-colors flex items-center gap-1", (activePage === "solutions" || activeMenu === "solutions") && "text-foreground font-semibold")}
              >
                {t("forBusinesses")}
                <span className="text-[10px] opacity-60">▾</span>
              </Link>
            </div>
            <Link
              href="/builders"
              onMouseEnter={() => setActiveMenu(null)}
              className={cn("px-3 py-2 rounded-md hover:text-foreground transition-colors", activePage === "builders" && "text-primary")}
            >
              {t("forBuilders")}
            </Link>
            <Link
              href="/hire"
              onMouseEnter={() => setActiveMenu(null)}
              className={cn("px-3 py-2 rounded-md hover:text-foreground transition-colors", (activePage === "marketplace" || activePage === "hire") && "text-primary")}
            >
              {t("marketplace")}
            </Link>
            <Link
              href="/build"
              onMouseEnter={() => setActiveMenu(null)}
              className={cn("px-3 py-2 rounded-md hover:text-foreground transition-colors", activePage === "build" && "text-primary")}
            >
              {t("build")}
            </Link>
            <Link
              href="/pricing"
              onMouseEnter={() => setActiveMenu(null)}
              className={cn("px-3 py-2 rounded-md hover:text-foreground transition-colors", activePage === "pricing" && "text-primary")}
            >
              {t("pricing")}
            </Link>
            <Link
              href="/docs"
              onMouseEnter={() => setActiveMenu(null)}
              className={cn("px-3 py-2 rounded-md hover:text-foreground transition-colors", activePage === "docs" && "text-primary")}
            >
              {t("docs")}
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <LocaleSwitcher className="hidden xl:inline-flex" />
          <ThemeToggle className="hidden md:inline-flex" />
          <Link href={LOGIN_HREF} className="hidden md:block text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors">
            {t("signIn")}
          </Link>
          <Link
            href="/start"
            className="inline-flex h-8 sm:h-9 items-center gap-1 sm:gap-1.5 rounded-full bg-primary px-3 sm:px-4 text-[12px] sm:text-[13px] font-medium text-primary-foreground shadow-sm shadow-primary/25 hover:bg-primary-hover transition-colors shrink-0"
          >
            {t("getStarted")}
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <button
            type="button"
            className="lg:hidden -mr-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground hover:bg-secondary transition-colors"
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? t("closeMenu") : t("openMenu")}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {activeMenu && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.18 }}
            className="absolute top-full left-0 w-full bg-background/95 border-b border-border/70 shadow-xl backdrop-blur-xl"
          >
            <div className="max-w-[1200px] mx-auto px-6 py-8">
              {activeMenu === "departments" && (
                <div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {departments.map((dept) => (
                      <Link key={dept.key} href={dept.href} className="flex items-center gap-3 p-2 rounded-xl hover:bg-brand-soft transition-colors group">
                        <div className="w-11 h-11 rounded-lg overflow-hidden shrink-0 bg-neutral-200">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={dept.image} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[13px] font-medium text-foreground">{t(`dept.${dept.key}.title`)}</span>
                            <span className={cn(
                              "text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded",
                              dept.status === "live"
                                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                : "bg-muted text-muted-foreground"
                            )}>
                              {dept.status === "live" ? t("live") : t("earlyAccess")}
                            </span>
                          </div>
                          <div className="text-[11px] text-muted-foreground">{t(`dept.${dept.key}.sub`)}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="pt-5 mt-5 border-t border-border/50 flex justify-between text-[12px]">
                    <span className="text-muted-foreground">{t("categoriesNote")}</span>
                    <Link href="/hire" className="font-medium text-primary hover:opacity-70">
                      {t("browseAll")}
                    </Link>
                  </div>
                </div>
              )}

              {activeMenu === "solutions" && (
                <div className="grid grid-cols-4 gap-8">
                  <div>
                    <Link href="/solutions" className="text-[11px] font-medium uppercase tracking-wider text-primary mb-3 block hover:opacity-80">
                      {t("size")}
                    </Link>
                    {sizeSolutions.map((s) => (
                      <Link key={s.slug} href={`/solutions/${s.slug}`} className="block py-2 group">
                        <div className="text-[13px] font-medium text-foreground group-hover:opacity-70">{s.name}</div>
                        <div className="text-[11px] text-muted-foreground leading-snug">{s.line}</div>
                      </Link>
                    ))}
                  </div>
                  <div>
                    <Link href="/solutions#industry" className="text-[11px] font-medium uppercase tracking-wider text-primary mb-3 block hover:opacity-80">
                      {t("industry")}
                    </Link>
                    {featuredIndustries.slice(0, 4).map((s) => (
                      <Link key={s.id} href={industryHref(s)} className="block py-2 group">
                        <div className="text-[13px] font-medium text-foreground group-hover:opacity-70">{s.name}</div>
                        <div className="text-[11px] text-muted-foreground leading-snug">{s.line}</div>
                      </Link>
                    ))}
                  </div>
                  <div>
                    <Link href="/solutions#industry" className="text-[11px] font-medium uppercase tracking-wider text-primary mb-3 block hover:opacity-80">
                      {t("more")}
                    </Link>
                    {featuredIndustries.slice(4, 8).map((s) => (
                      <Link key={s.id} href={industryHref(s)} className="block py-2 group">
                        <div className="text-[13px] font-medium text-foreground group-hover:opacity-70">{s.name}</div>
                        <div className="text-[11px] text-muted-foreground leading-snug">{s.line}</div>
                      </Link>
                    ))}
                    <Link href="/industries" className="block pt-3 text-[13px] font-medium text-primary hover:opacity-80">
                      {t("allIndustries")}
                    </Link>
                  </div>
                  <Link href="/solutions/enterprise" className="relative rounded-xl overflow-hidden min-h-[180px] group ring-1 ring-black/10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80"
                      alt="Enterprise"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />
                    <div className="absolute top-3 left-3 text-[10px] font-semibold tracking-tight text-white/90">Fless</div>
                    <div className="relative p-4 h-full flex flex-col justify-end">
                      <div className="text-sm font-medium text-white">{t("enterpriseTitle")}</div>
                      <div className="text-[12px] text-white/70 mt-1">{t("enterpriseLine")}</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {mobileOpen && (
        <div className="lg:hidden absolute top-full inset-x-0 h-[calc(100dvh-4rem)] bg-background border-t border-border/70 overflow-y-auto overscroll-contain">
          <div className="px-5 sm:px-6 pt-4 pb-10 space-y-8">
            <nav className="grid grid-cols-1 divide-y divide-border/60 border-b border-border/60">
              {[
                { label: t("home"), href: "/" },
                { label: t("howItWorks"), href: "/#how-it-works" },
                { label: t("marketplace"), href: "/hire" },
                { label: t("build"), href: "/build" },
                { label: t("pricing"), href: "/pricing" },
                { label: t("solutions"), href: "/solutions" },
                { label: t("builders"), href: "/builders" },
                { label: t("docs"), href: "/docs" },
                { label: t("contact"), href: "/contact" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center justify-between py-3.5 text-[17px] font-medium text-foreground"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                </Link>
              ))}
            </nav>

            <div>
              <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-primary mb-2">{t("departments")}</div>
              <div className="grid grid-cols-2 gap-x-4">
                {departments.map((d) => (
                  <Link key={d.href} href={d.href} className="flex items-center gap-2 py-2.5 text-[15px] font-medium" onClick={() => setMobileOpen(false)}>
                    <span>{t(`dept.${d.key}.title`)}</span>
                    {d.status === "live" && (
                      <span className="text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                        {t("live")}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-primary mb-2">{t("bySize")}</div>
              <div className="grid grid-cols-2 gap-x-4">
                {sizeSolutions.map((s) => (
                  <Link key={s.slug} href={`/solutions/${s.slug}`} className="block py-2.5 text-[15px] font-medium" onClick={() => setMobileOpen(false)}>
                    {s.name}
                  </Link>
                ))}
              </div>
              <Link href="/industries" className="inline-block py-2.5 text-[15px] font-medium text-primary" onClick={() => setMobileOpen(false)}>
                {t("browseIndustries")}
              </Link>
            </div>

            <div>
              <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-primary mb-3">{t("appearance")}</div>
              <ThemeToggle variant="row" />
            </div>

            <div>
              <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-primary mb-3">{t("language")}</div>
              <LocaleSwitcher />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Link
                href={LOGIN_HREF}
                className="inline-flex h-12 items-center justify-center rounded-full border border-border text-[15px] font-medium"
                onClick={() => setMobileOpen(false)}
              >
                {t("login")}
              </Link>
              <Link
                href="/start"
                className="inline-flex h-12 items-center justify-center rounded-full bg-primary text-[15px] font-medium text-primary-foreground"
                onClick={() => setMobileOpen(false)}
              >
                {t("joinTheBeta")}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
    <StickyRegister />
    </>
  )
}
