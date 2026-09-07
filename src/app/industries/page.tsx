"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { IndustryGrid } from "@/components/IndustryGrid"
import { EmailCapture } from "@/components/EmailCapture"
import { industries } from "@/lib/industries"
import { Search, Sparkles, ShieldCheck, Clock, Layers, X } from "lucide-react"
import { cn } from "@/lib/utils"

const CATEGORIES = [
  { id: "all", label: "All Sectors", count: 35 },
  { id: "finance", label: "Finance & FinTech", ids: ["finance", "banking", "fintech"] },
  { id: "commerce", label: "Commerce & Hospitality", ids: ["retail", "hospitality", "fashion", "events"] },
  { id: "tech", label: "Tech & Creative", ids: ["software", "cybersecurity", "design", "media", "music", "telecom"] },
  { id: "health", label: "Health & Life Sciences", ids: ["healthcare", "pharma", "biotech", "veterinary"] },
  { id: "industry", label: "Industrial & Logistics", ids: ["manufacturing", "logistics", "construction", "energy", "agriculture", "mining", "maritime", "automotive", "aerospace"] },
  { id: "services", label: "Professional & Public", ids: ["consulting", "legal", "realestate", "architecture", "government", "nonprofit", "education"] },
]

export default function IndustriesPage() {
  const [query, setQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")

  const filtered = useMemo(() => {
    let list = industries

    if (activeCategory !== "all") {
      const cat = CATEGORIES.find((c) => c.id === activeCategory)
      if (cat?.ids) {
        list = list.filter((ind) => cat.ids.includes(ind.id))
      }
    }

    const q = query.trim().toLowerCase()
    if (q) {
      list = list.filter(
        (ind) =>
          ind.name.toLowerCase().includes(q) ||
          ind.line.toLowerCase().includes(q)
      )
    }

    return list
  }, [query, activeCategory])

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Header activePage="solutions" />
      <main className="flex-1 pt-24 md:pt-28 pb-24">
        {/* Hero Section */}
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-3xl mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-[11px] font-medium tracking-wide text-primary uppercase mb-4"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>35 Configured Sectors</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl lg:text-[56px] font-display font-semibold tracking-tight leading-[1.06] text-foreground"
            >
              Every industry.
              <br />
              Tuned for your actual workflow.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="mt-5 text-[16px] md:text-[18px] text-muted-foreground leading-relaxed max-w-2xl"
            >
              Fless equips your team with autonomous marketing, voice receptionists, pipeline managers, and back-office staff configured to your sector’s compliance, vocabulary, and operational rhythm.
            </motion.p>

            {/* Micro badges */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 }}
              className="mt-6 flex flex-wrap gap-2.5 text-[12px] text-muted-foreground"
            >
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-border/80 bg-card px-3 py-1 font-medium text-foreground/80 shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                Compliance-governed
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-border/80 bg-card px-3 py-1 font-medium text-foreground/80 shadow-xs">
                <Clock className="w-3.5 h-3.5 text-primary" />
                24/7 autonomous shifts
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-border/80 bg-card px-3 py-1 font-medium text-foreground/80 shadow-xs">
                <Layers className="w-3.5 h-3.5 text-primary" />
                All 8 departments
              </span>
            </motion.div>

            <div className="mt-8 max-w-md">
              <EmailCapture source="industries-hero" />
            </div>
          </div>

          {/* Directory Section */}
          <div className="border-t border-border/60 pt-10 md:pt-12">
            {/* Filter Bar */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-[13px]">
                {CATEGORIES.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setActiveCategory(c.id)}
                    className={cn(
                      "px-3.5 py-1.5 rounded-full font-medium whitespace-nowrap transition-all cursor-pointer border",
                      activeCategory === c.id
                        ? "bg-primary text-primary-foreground border-primary shadow-xs"
                        : "bg-card text-muted-foreground border-border/80 hover:text-foreground hover:bg-secondary/60"
                    )}
                  >
                    {c.label}
                  </button>
                ))}
              </div>

              {/* Search input */}
              <div className="relative max-w-xs w-full shrink-0">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Filter by name or keyword..."
                  className="w-full h-10 pl-10 pr-9 rounded-full border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-xs"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Results counter */}
            <div className="mb-6 flex items-center justify-between text-[13px] text-muted-foreground">
              <span>
                Showing <strong className="text-foreground font-semibold">{filtered.length}</strong> of {industries.length} sectors
              </span>
              {(query || activeCategory !== "all") && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("")
                    setActiveCategory("all")
                  }}
                  className="text-xs text-primary font-medium hover:underline cursor-pointer"
                >
                  Reset filters
                </button>
              )}
            </div>

            {/* Grid */}
            {filtered.length > 0 ? (
              <IndustryGrid items={filtered} />
            ) : (
              <div className="py-20 text-center rounded-3xl border border-dashed border-border/80 bg-card/40 p-8">
                <p className="text-foreground font-medium text-base mb-1">No sectors found</p>
                <p className="text-muted-foreground text-sm max-w-sm mx-auto mb-5">
                  We haven&rsquo;t found an exact match for &ldquo;{query}&rdquo;. You can still onboard under &ldquo;Other&rdquo; and Fless will tune its desks to your custom domain.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setQuery("")
                    setActiveCategory("all")
                  }}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-xs font-medium text-foreground hover:bg-secondary cursor-pointer shadow-xs"
                >
                  Reset all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
