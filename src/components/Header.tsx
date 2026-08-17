"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ChevronDown, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { sizeSolutions, featuredIndustrySolutions, moreIndustrySolutions } from "@/lib/solutions"
import { StickyRegister } from "@/components/StickyRegister"
import { FlessLogo } from "@/components/FlessLogo"
import { ThemeToggle } from "@/components/ThemeToggle"

interface HeaderProps {
  activePage?: string
}

const departments = [
  { title: "Marketing", sub: "Content, SEO, ads, social", href: "/departments/marketing", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=200&auto=format&fit=crop&q=80" },
  { title: "Voice", sub: "Inbound, outbound, booking", href: "/departments/voice", image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=200&auto=format&fit=crop&q=80" },
  { title: "Sales", sub: "Leads, CRM, follow-up", href: "/departments/sales", image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=200&auto=format&fit=crop&q=80" },
  { title: "Recruitment", sub: "Sourcing, screening, hiring", href: "/departments/recruitment", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&auto=format&fit=crop&q=80" },
  { title: "Support", sub: "Tickets, success, escalation", href: "/departments/support", image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=200&auto=format&fit=crop&q=80" },
  { title: "Operations", sub: "Projects, docs, workflows", href: "/departments/operations", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=200&auto=format&fit=crop&q=80" },
  { title: "Finance", sub: "Invoices, expenses, payroll", href: "/departments/finance", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=200&auto=format&fit=crop&q=80" },
  { title: "HR", sub: "Onboarding, policy, reviews", href: "/departments/hr", image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=200&auto=format&fit=crop&q=80" },
]

export function Header({ activePage }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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
      <div className="max-w-[1200px] mx-auto px-6 w-full flex items-center justify-between">
        <div className="flex items-center gap-10">
          <FlessLogo />

          <nav className="hidden lg:flex items-center gap-1 text-[13px] font-medium text-muted-foreground">
            <Link
              href="/"
              className={cn("px-3 py-2 rounded-md hover:text-foreground transition-colors", activePage === "home" && "text-primary")}
            >
              Home
            </Link>
            <div
              onMouseEnter={() => setActiveMenu("solutions")}
            >
              <Link
                href="/solutions"
                className={cn("px-3 py-2 rounded-md hover:text-foreground transition-colors flex items-center gap-1", (activeMenu === "solutions" || activePage === "solutions") && "text-primary")}
              >
                Solutions <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", activeMenu === "solutions" && "rotate-180")} />
              </Link>
            </div>
            <div onMouseEnter={() => setActiveMenu("departments")}>
              <button className={cn("px-3 py-2 rounded-md hover:text-foreground transition-colors flex items-center gap-1", (activeMenu === "departments" || activePage === "departments") && "text-primary")}>
                Departments <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", activeMenu === "departments" && "rotate-180")} />
              </button>
            </div>
            <Link
              href="/pricing"
              className={cn("px-3 py-2 rounded-md hover:text-foreground transition-colors", activePage === "pricing" && "text-primary")}
            >
              Pricing
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <ThemeToggle className="hidden md:inline-flex" />
          <Link href="/login" className="hidden md:block text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors">
            Log in
          </Link>
          <Link
            href="/start"
            className="inline-flex h-9 items-center gap-1.5 rounded-full bg-primary px-4 text-[13px] font-medium text-primary-foreground shadow-sm shadow-primary/25 hover:bg-primary-hover transition-colors"
          >
            Join beta
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <button
            type="button"
            className="lg:hidden text-[13px] font-medium text-foreground px-2"
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-label="Open menu"
          >
            {mobileOpen ? "Close" : "Menu"}
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
                  <div className="grid grid-cols-4 gap-3">
                    {departments.map((dept) => (
                      <Link key={dept.title} href={dept.href} className="flex items-center gap-3 p-2 rounded-xl hover:bg-brand-soft transition-colors group">
                        <div className="w-11 h-11 rounded-lg overflow-hidden shrink-0 bg-neutral-200">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={dept.image} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="text-[13px] font-medium text-foreground">{dept.title}</div>
                          <div className="text-[11px] text-muted-foreground">{dept.sub}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="pt-5 mt-5 border-t border-border/50 flex justify-between text-[12px]">
                    <span className="text-muted-foreground">Staff any department. Same product.</span>
                    <Link href="/#departments" className="font-medium text-primary hover:opacity-70">
                      See all →
                    </Link>
                  </div>
                </div>
              )}

              {activeMenu === "solutions" && (
                <div className="grid grid-cols-4 gap-8">
                  <div>
                    <Link href="/solutions" className="text-[11px] font-medium uppercase tracking-wider text-primary mb-3 block hover:opacity-80">
                      Size
                    </Link>
                    {sizeSolutions.map((s) => (
                      <Link key={s.slug} href={`/solutions/${s.slug}`} className="block py-2 group">
                        <div className="text-[13px] font-medium text-foreground group-hover:opacity-70">{s.name}</div>
                        <div className="text-[11px] text-muted-foreground leading-snug">{s.line}</div>
                      </Link>
                    ))}
                  </div>
                  <div>
                    <Link href="/solutions" className="text-[11px] font-medium uppercase tracking-wider text-primary mb-3 block hover:opacity-80">
                      Industry
                    </Link>
                    {featuredIndustrySolutions.map((s) => (
                      <Link key={s.slug} href={`/solutions/${s.slug}`} className="block py-2 group">
                        <div className="text-[13px] font-medium text-foreground group-hover:opacity-70">{s.name}</div>
                        <div className="text-[11px] text-muted-foreground leading-snug">{s.line}</div>
                      </Link>
                    ))}
                  </div>
                  <div>
                    <Link href="/solutions" className="text-[11px] font-medium uppercase tracking-wider text-primary mb-3 block hover:opacity-80">
                      More
                    </Link>
                    {moreIndustrySolutions.map((s) => (
                      <Link key={s.slug} href={`/solutions/${s.slug}`} className="block py-2 group">
                        <div className="text-[13px] font-medium text-foreground group-hover:opacity-70">{s.name}</div>
                        <div className="text-[11px] text-muted-foreground leading-snug">{s.line}</div>
                      </Link>
                    ))}
                    <Link href="/solutions" className="block pt-3 text-[13px] font-medium text-primary hover:opacity-80">
                      All solutions →
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
                      <div className="text-sm font-medium text-white">Enterprise</div>
                      <div className="text-[12px] text-white/70 mt-1">Regions, SSO, and a named rollout.</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {mobileOpen && (
        <div className="lg:hidden absolute top-full inset-x-0 bg-background border-b border-border/70 shadow-xl max-h-[80vh] overflow-y-auto">
          <div className="px-6 py-6 space-y-8 text-[13px]">
            <div>
              <Link href="/" className="block py-1.5 font-medium" onClick={() => setMobileOpen(false)}>Home</Link>
              <Link href="/pricing" className="block py-1.5 font-medium" onClick={() => setMobileOpen(false)}>Pricing</Link>
              <Link href="/solutions" className="block py-1.5 font-medium" onClick={() => setMobileOpen(false)}>All solutions</Link>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-primary mb-3">Appearance</div>
              <ThemeToggle variant="row" />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-primary mb-2">Size</div>
              {sizeSolutions.map((s) => (
                <Link key={s.slug} href={`/solutions/${s.slug}`} className="block py-1.5 font-medium" onClick={() => setMobileOpen(false)}>
                  {s.name}
                </Link>
              ))}
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-primary mb-2">Industry</div>
              {featuredIndustrySolutions.map((s) => (
                <Link key={s.slug} href={`/solutions/${s.slug}`} className="block py-1.5 font-medium" onClick={() => setMobileOpen(false)}>
                  {s.name}
                </Link>
              ))}
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-primary mb-2">More</div>
              {moreIndustrySolutions.map((s) => (
                <Link key={s.slug} href={`/solutions/${s.slug}`} className="block py-1.5 font-medium" onClick={() => setMobileOpen(false)}>
                  {s.name}
                </Link>
              ))}
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-primary mb-2">Departments</div>
              {departments.map((d) => (
                <Link key={d.href} href={d.href} className="block py-1.5 font-medium" onClick={() => setMobileOpen(false)}>
                  {d.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
    <StickyRegister />
    </>
  )
}
