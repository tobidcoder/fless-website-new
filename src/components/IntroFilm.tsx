"use client"

import { motion, useReducedMotion } from "framer-motion"
import { StayInForm } from "@/components/StayInForm"

const overlays = [
  {
    kicker: "Voice",
    title: "Thursday 3pm confirmed",
    meta: "Just now",
    className: "top-[12%] right-3 sm:-right-3 lg:-right-4",
  },
  {
    kicker: "Marketing",
    title: "Q3 launch post is live",
    meta: "2m ago",
    className: "top-[38%] left-[18%] sm:left-[20%]",
  },
  {
    kicker: "Support",
    title: "12 tickets closed overnight",
    meta: "1h",
    className: "top-[58%] right-[8%] sm:right-[10%]",
  },
]

export function IntroFilm() {
  const reduce = useReducedMotion()

  return (
    <div className="relative sm:px-4 lg:px-6">
      <div
        aria-hidden
        className="absolute left-1/2 top-[18%] -z-10 h-[70%] w-[78%] -translate-x-1/2 rounded-full bg-primary/20 blur-[80px]"
      />

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <figure className="intro-film relative overflow-visible">
          <div className="overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-[0_24px_80px_-28px_rgba(15,23,42,0.35)] ring-1 ring-black/[0.04]">
            <div className="flex h-11 items-center justify-between border-b border-black/[0.06] bg-[#f8fafc] px-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex items-center gap-[6px] shrink-0" aria-hidden>
                  <span className="h-[10px] w-[10px] rounded-full bg-[#ff5f57]" />
                  <span className="h-[10px] w-[10px] rounded-full bg-[#febc2e]" />
                  <span className="h-[10px] w-[10px] rounded-full bg-[#28c840]" />
                </div>
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-[5px] bg-primary text-[9px] font-bold text-white">
                  F
                </span>
                <span className="text-[13px] font-semibold tracking-tight text-slate-900">Fless</span>
                <span className="hidden sm:inline truncate text-[12px] text-slate-400">app.fless.com</span>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-slate-600 ring-1 ring-black/[0.06]">
                <span className="relative flex h-1.5 w-1.5">
                  {!reduce && (
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70 animate-ping" />
                  )}
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </span>
                Live
              </span>
            </div>

            <div className="relative bg-[#f8fafc] pb-[9rem] sm:pb-0">
              <div
                role="img"
                aria-label="Fless command center with sidebar, departments, and live activity"
                className="intro-film-shot w-full bg-[#f8fafc] bg-cover bg-top bg-no-repeat"
              />
              <div className="absolute inset-0 z-10 pointer-events-none select-none" aria-hidden />
              <div className="pointer-events-none absolute inset-0 z-[15] hidden select-none sm:block" aria-hidden>
                {overlays.map((card, i) => (
                  <motion.div
                    key={card.title}
                    className={`intro-film-overlay absolute max-w-[240px] ${card.className}`}
                    animate={reduce ? undefined : { y: [0, i % 2 === 0 ? -6 : 6, 0] }}
                    transition={reduce ? undefined : { duration: 7 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                  >
                    <div className="rounded-xl border border-black/[0.08] bg-white/95 px-3.5 py-2.5 shadow-[0_12px_32px_-12px_rgba(15,23,42,0.28)] backdrop-blur-md">
                      <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-primary">{card.kicker}</p>
                      <p className="mt-0.5 text-[13px] font-medium text-slate-900">{card.title}</p>
                      <p className="mt-0.5 text-[11px] text-slate-500">{card.meta}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="absolute inset-x-3 bottom-3 z-20 sm:inset-x-auto sm:left-[18%] sm:right-4 sm:bottom-4">
                <div className="max-w-md rounded-2xl border border-black/[0.08] bg-white/95 p-4 shadow-[0_16px_40px_-16px_rgba(15,23,42,0.35)] backdrop-blur-md sm:p-5">
                  <p className="mb-1 text-[11px] font-medium uppercase tracking-[0.18em] text-primary">Stay in</p>
                  <p className="mb-3 text-[13px] text-slate-600">Join the beta. One product, every market.</p>
                  <StayInForm source="intro" />
                </div>
              </div>
            </div>
          </div>
        </figure>
      </motion.div>
    </div>
  )
}
