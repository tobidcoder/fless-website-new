"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight } from "lucide-react"

export function StickyRegister() {
  const pathname = usePathname()
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (pathname?.startsWith("/start") || pathname?.startsWith("/login")) return

    let isFooterVisible = false

    const checkVisibility = () => {
      const isScrolled = window.scrollY > 480
      setShow(isScrolled && !isFooterVisible)
    }

    const footerElement = document.querySelector("footer")
    let observer: IntersectionObserver | null = null

    if (footerElement && typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        (entries) => {
          isFooterVisible = entries[0]?.isIntersecting ?? false
          checkVisibility()
        },
        { threshold: 0 }
      )
      observer.observe(footerElement)
    }

    checkVisibility()
    window.addEventListener("scroll", checkVisibility, { passive: true })
    window.addEventListener("resize", checkVisibility, { passive: true })

    return () => {
      observer?.disconnect()
      window.removeEventListener("scroll", checkVisibility)
      window.removeEventListener("resize", checkVisibility)
    }
  }, [pathname])

  if (pathname?.startsWith("/start") || pathname?.startsWith("/login")) return null

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-4 inset-x-4 z-40 md:bottom-6 md:inset-x-auto md:right-6 md:w-[380px]"
        >
          <div className="rounded-2xl border border-border/80 bg-background/95 backdrop-blur-xl shadow-[0_20px_50px_-20px_rgba(0,0,0,0.35)] p-4 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="text-[13px] font-semibold tracking-tight">Join the Fless beta</div>
              <div className="text-[11px] text-muted-foreground">A lot of teams want in · we’ll reach out</div>
            </div>
            <Link
              href="/start"
              className="inline-flex h-10 items-center gap-1.5 rounded-full bg-primary px-4 text-[13px] font-medium text-primary-foreground shadow-sm shadow-primary/25 hover:bg-primary-hover shrink-0"
            >
              Join
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
