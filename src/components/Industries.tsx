"use client"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { PhotoTile } from "@/components/BrandedStage"
import { IndustryCard } from "@/components/IndustryGrid"
import { sizeSolutions } from "@/lib/solutions"
import { industries } from "@/lib/industries"

export function Industries() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    if (!scrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    setCanScrollLeft(scrollLeft > 8)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 8)
  }

  useEffect(() => {
    checkScroll()
    const el = scrollRef.current
    if (!el) return
    el.addEventListener("scroll", checkScroll, { passive: true })
    window.addEventListener("resize", checkScroll, { passive: true })
    return () => {
      el.removeEventListener("scroll", checkScroll)
      window.removeEventListener("resize", checkScroll)
    }
  }, [])

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return
    const offset = direction === "left" ? -380 : 380
    scrollRef.current.scrollBy({ left: offset, behavior: "smooth" })
  }

  return (
    <section id="solutions" className="py-24 md:py-32 bg-background border-t border-border/60">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="max-w-2xl mb-12 md:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary mb-4"
          >
            Solutions
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-[44px] font-display font-semibold tracking-tight leading-[1.12] text-foreground"
          >
            Built for how the work actually looks.
          </motion.h2>
        </div>

        <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-primary mb-4">Size</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-14">
          {sizeSolutions.map((s, i) => (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link href={`/solutions/${s.slug}`} prefetch className="group block">
                <PhotoTile
                  image={s.hero}
                  alt={s.heroAlt}
                  title={s.name}
                  subtitle={s.line}
                  live={s.cities[0]}
                  className="aspect-[4/5] rounded-2xl"
                />
              </Link>
            </motion.div>
          ))}
        </div>

        <div id="industry" className="relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-primary mb-1.5">Industry</p>
              <h3 className="text-2xl sm:text-3xl font-display font-semibold tracking-tight text-foreground">
                Configured for your exact sector.
              </h3>
            </div>
            <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
              <button
                type="button"
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                aria-label="Previous industries"
                className="h-9 w-9 rounded-full border border-border/80 bg-background flex items-center justify-center text-foreground hover:bg-secondary transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer shadow-sm"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                aria-label="Next industries"
                className="h-9 w-9 rounded-full border border-border/80 bg-background flex items-center justify-center text-foreground hover:bg-secondary transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer shadow-sm"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Horizontal scroll track */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scroll-smooth no-scrollbar -mx-6 px-6"
            style={{ scrollbarWidth: "none" }}
          >
            {industries.map((ind) => (
              <div
                key={ind.id}
                className="w-[280px] sm:w-[320px] md:w-[340px] shrink-0 snap-start"
              >
                <IndustryCard industry={ind} className="h-full" />
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-between flex-wrap gap-4">
            <Link
              href="/industries"
              className="inline-flex h-10 items-center gap-2 rounded-full border border-border/80 bg-card px-5 text-[13px] font-medium text-foreground shadow-sm hover:border-primary/40 hover:bg-secondary/60 transition-all group"
            >
              <span>View all 35 industries</span>
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/solutions"
              className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              See all size solutions →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
