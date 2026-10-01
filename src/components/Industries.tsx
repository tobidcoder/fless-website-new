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
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isMouseDown, setIsMouseDown] = useState(false)
  const [startX, setStartX] = useState(0)
  const [startScrollLeft, setStartScrollLeft] = useState(0)
  const [hasMoved, setHasMoved] = useState(false)

  const checkScroll = () => {
    if (!scrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    setCanScrollLeft(scrollLeft > 8)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 8)
    const maxScroll = scrollWidth - clientWidth
    setScrollProgress(maxScroll > 0 ? scrollLeft / maxScroll : 0)
  }

  useEffect(() => {
    checkScroll()
    const el = scrollRef.current
    if (!el) return
    el.addEventListener("scroll", checkScroll, { passive: true })
    window.addEventListener("resize", checkScroll, { passive: true })

    // Allow horizontal wheel scrolling over the carousel
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && Math.abs(e.deltaY) > 5) {
        const isAtLeft = el.scrollLeft <= 2
        const isAtRight = el.scrollLeft >= el.scrollWidth - el.clientWidth - 4
        if ((e.deltaY > 0 && !isAtRight) || (e.deltaY < 0 && !isAtLeft)) {
          e.preventDefault()
          el.scrollLeft += e.deltaY * 1.15
        }
      }
    }

    el.addEventListener("wheel", onWheel, { passive: false })

    return () => {
      el.removeEventListener("scroll", checkScroll)
      window.removeEventListener("resize", checkScroll)
      el.removeEventListener("wheel", onWheel)
    }
  }, [])

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return
    const offset = direction === "left" ? -420 : 420
    scrollRef.current.scrollBy({ left: offset, behavior: "smooth" })
  }

  // Mouse drag-to-scroll handlers
  const onMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return
    setIsMouseDown(true)
    setHasMoved(false)
    setStartX(e.pageX - scrollRef.current.offsetLeft)
    setStartScrollLeft(scrollRef.current.scrollLeft)
  }

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown || !scrollRef.current) return
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX) * 1.25
    if (Math.abs(walk) > 4) {
      setHasMoved(true)
    }
    scrollRef.current.scrollLeft = startScrollLeft - walk
  }

  const onMouseUpOrLeave = () => {
    setIsMouseDown(false)
    setTimeout(() => setHasMoved(false), 50)
  }

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const percent = Math.max(0, Math.min(1, clickX / rect.width))
    const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth
    scrollRef.current.scrollTo({ left: percent * maxScroll, behavior: "smooth" })
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
              <div className="flex items-center gap-2 mb-1.5">
                <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-primary">Industry</p>
                <span className="text-[10.5px] font-medium text-muted-foreground bg-secondary px-2 py-0.5 rounded-full border border-border/60">
                  35 sectors · scrollable
                </span>
              </div>
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

          {/* Horizontal scroll track with mouse drag & wheel scrolling */}
          <div className="relative group">
            <div
              ref={scrollRef}
              id="industries-scroll-track"
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUpOrLeave}
              onMouseLeave={onMouseUpOrLeave}
              className={`flex gap-4 overflow-x-auto pb-4 pt-1 snap-x snap-proximity scroll-smooth no-scrollbar -mx-6 px-6 cursor-grab active:cursor-grabbing select-none`}
              style={{ scrollbarWidth: "none" }}
              onClickCapture={(e) => {
                if (hasMoved) {
                  e.stopPropagation()
                  e.preventDefault()
                }
              }}
            >
              {industries.map((ind) => (
                <div
                  key={ind.id}
                  className="w-[280px] sm:w-[320px] md:w-[340px] shrink-0 snap-start"
                >
                  <IndustryCard industry={ind} className="h-full pointer-events-auto" />
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Scrubber & Progress Bar */}
          <div className="mt-4 flex items-center gap-4">
            <div
              onClick={handleTrackClick}
              role="scrollbar"
              aria-controls="industries-scroll-track"
              aria-label="Industries carousel progress"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(scrollProgress * 100)}
              className="relative flex-1 h-1.5 bg-secondary/80 dark:bg-slate-800 rounded-full overflow-hidden cursor-pointer group"
            >
              <div
                className="absolute top-0 bottom-0 bg-primary/70 group-hover:bg-primary rounded-full transition-all duration-100"
                style={{
                  left: `${scrollProgress * 84}%`,
                  width: "16%",
                }}
              />
            </div>
            <span className="text-[11px] font-medium text-muted-foreground whitespace-nowrap tabular-nums">
              {Math.min(35, Math.max(1, Math.round(scrollProgress * 34) + 1))} of 35 sectors
            </span>
          </div>

          <div className="mt-7 flex items-center justify-between flex-wrap gap-4">
            <Link
              href="/industries"
              className="inline-flex h-10 items-center gap-2 rounded-full border border-border/80 bg-card px-5 text-[13px] font-medium text-foreground shadow-sm hover:border-primary/40 hover:bg-secondary/60 transition-all group"
            >
              <span>Explore all 35 industry directories</span>
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
