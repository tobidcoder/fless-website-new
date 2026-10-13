"use client"

import { motion, useReducedMotion } from "framer-motion"

// A real screenshot of the Fless workspace (Marketing department), shown as-is.
export function IntroFilm() {
  const reduce = useReducedMotion()

  return (
    <div className="relative sm:px-4 lg:px-6">
      <div
        aria-hidden
        className="absolute left-1/2 top-[18%] -z-10 h-[70%] w-[78%] -translate-x-1/2 rounded-full bg-primary/20 blur-[80px]"
      />
      <motion.figure
        initial={reduce ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="intro-film"
      >
        <div className="overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-[0_24px_80px_-28px_rgba(15,23,42,0.35)] ring-1 ring-black/[0.04]">
          <div className="flex h-10 items-center gap-[6px] border-b border-black/[0.06] bg-[#f8fafc] px-4" aria-hidden>
            <span className="h-[10px] w-[10px] rounded-full bg-[#ff5f57]" />
            <span className="h-[10px] w-[10px] rounded-full bg-[#febc2e]" />
            <span className="h-[10px] w-[10px] rounded-full bg-[#28c840]" />
          </div>
          <div
            role="img"
            aria-label="The Fless workspace: a Marketing department with a manager and six AI employees, and a chat where the Social Media Manager has drafted posts for LinkedIn, Facebook, X and Instagram"
            className="intro-film-shot w-full"
          />
        </div>
        <figcaption className="mt-4 text-center text-[13px] text-muted-foreground">
          The Fless workspace: the Marketing department at work.
        </figcaption>
      </motion.figure>
    </div>
  )
}
