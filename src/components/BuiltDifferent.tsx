"use client"

import { useEffect, useMemo, useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const lines = [
  "Does the work — not a list of suggestions.",
  "Keeps the same context your team already has.",
  "Gets sharper the longer it runs.",
]

const desks = ["All", "Marketing", "Voice", "Sales", "Support", "Finance"] as const
type Desk = (typeof desks)[number]

const feed = [
  { desk: "Marketing", line: "Next week’s calendar filled — three markets, one brief", time: "2m" },
  { desk: "Voice", line: "After-hours covered. 12 bookings held overnight", time: "Live" },
  { desk: "Sales", line: "14 follow-ups completed. Pipeline updated", time: "8m" },
  { desk: "Support", line: "Inbox zero across every timezone", time: "22m" },
  { desk: "Finance", line: "Invoice marked paid — multi-currency", time: "41m" },
  { desk: "Marketing", line: "Ads queued. Local copy, same brand", time: "1h" },
  { desk: "Voice", line: "Outbound list of 14 finished", time: "1h" },
  { desk: "Sales", line: "New leads routed to the right owner", time: "2h" },
  { desk: "Support", line: "Escalations paused for a person", time: "2h" },
  { desk: "Finance", line: "Expenses coded for the week", time: "3h" },
  { desk: "Marketing", line: "Launch sequence sent for review", time: "3h" },
  { desk: "Voice", line: "Reminders queued in local hours", time: "4h" },
  { desk: "Sales", line: "Follow-up script audited and live", time: "5h" },
  { desk: "Support", line: "Knowledge article published", time: "5h" },
  { desk: "Finance", line: "Payroll pack ready for sign-off", time: "6h" },
]

function LiveDot() {
  return (
    <span className="relative flex h-1.5 w-1.5">
      <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70 animate-ping" />
      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
    </span>
  )
}

function ShippingLivePanel() {
  const reduce = useReducedMotion()
  const [desk, setDesk] = useState<Desk>("All")
  const [paused, setPaused] = useState(false)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    if (paused || reduce) return
    const id = window.setInterval(() => setTick((n) => n + 1), 3200)
    return () => window.clearInterval(id)
  }, [paused, reduce])

  const selected = desk
  const rows = useMemo(() => {
    if (selected !== "All") return feed.filter((row) => row.desk === selected).slice(0, 5)
    const start = tick % feed.length
    return [...feed.slice(start), ...feed.slice(0, start)].slice(0, 5)
  }, [selected, tick])

  const toasts = [feed[tick % feed.length], feed[(tick + 3) % feed.length]]

  return (
    <>
      <div className="pointer-events-none absolute inset-0 z-[15] hidden select-none lg:block" aria-hidden>
        {toasts.map((card, i) => (
          <motion.div
            key={`${card.desk}-${card.time}-${i}-${tick}`}
            className={`absolute max-w-[220px] ${i === 0 ? "top-[14%] right-5" : "top-[38%] left-[12%]"}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="rounded-xl border border-white/15 bg-white/95 px-3.5 py-2.5 shadow-[0_16px_40px_-16px_rgba(0,0,0,0.45)] backdrop-blur-md">
              <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-primary">{card.desk}</p>
              <p className="mt-0.5 text-[13px] font-medium leading-snug text-slate-900">{card.line}</p>
              <p className="mt-0.5 text-[11px] text-slate-500">{card.time}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div
        className="absolute inset-x-4 bottom-4 z-20 sm:inset-x-5 sm:bottom-5 lg:left-6 lg:right-8 lg:bottom-6"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => {
          setPaused(false)
          setDesk("All")
        }}
      >
        <div className="overflow-hidden rounded-2xl border border-white/15 bg-white/95 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.55)] backdrop-blur-md">
          <div className="flex items-center justify-between gap-3 border-b border-black/[0.06] px-4 py-2.5">
            <div>
              <p className="text-[12px] font-semibold tracking-tight text-slate-900">Shipping · every market</p>
              <p className="text-[11px] text-slate-500">Local hours. Same product.</p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-600">
              <LiveDot />
              {paused ? "Paused" : "Live"}
            </span>
          </div>

          <div className="flex gap-1.5 overflow-x-auto overscroll-x-contain touch-pan-x px-3 py-2.5 [-webkit-overflow-scrolling:touch]">
            {desks.map((item) => {
              const on = selected === item
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setDesk(item)
                    setPaused(true)
                  }}
                  className={`h-8 shrink-0 rounded-full px-3 text-[12px] font-medium transition-colors ${
                    on ? "bg-primary text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {item}
                </button>
              )
            })}
          </div>

          <div className="divide-y divide-black/[0.05]">
            <AnimatePresence mode="popLayout" initial={false}>
              {rows.map((row) => (
                <motion.div
                  key={`${selected}-${row.desk}-${row.line}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.28 }}
                  className="flex items-start justify-between gap-3 px-4 py-2.5"
                >
                  <div className="min-w-0">
                    <p className="text-[12px] font-medium text-slate-900">{row.desk}</p>
                    <p className="text-[12px] leading-snug text-slate-500">{row.line}</p>
                  </div>
                  <span className="shrink-0 text-[11px] tabular-nums text-slate-400">{row.time}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="grid grid-cols-3 border-t border-black/[0.06] bg-slate-50/80">
            {[
              { value: "40+", label: "Countries" },
              { value: "8", label: "Desks" },
              { value: "24/7", label: "Coverage" },
            ].map((stat) => (
              <div key={stat.label} className="px-3 py-2.5 text-center">
                <div className="text-[13px] font-semibold tabular-nums text-slate-900">{stat.value}</div>
                <div className="text-[10px] text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export function BuiltDifferent() {
  return (
    <section className="relative overflow-hidden border-t border-border/60">
      <div className="grid lg:grid-cols-2 min-h-[560px] lg:min-h-[720px]">
        <div className="relative min-h-[460px] lg:min-h-full bg-night">
          <div
            role="img"
            aria-label="Fless command center shipping work across desks"
            className="fless-shot-fill absolute inset-0"
          />
          {/* Do not capture touch — blocks vertical scroll on mobile */}
          <div className="pointer-events-none absolute inset-0 z-10 select-none" aria-hidden />
          <div className="pointer-events-none absolute inset-0 z-[12] bg-gradient-to-r from-transparent via-transparent to-night/70" />
          <div className="pointer-events-none absolute inset-0 z-[12] bg-gradient-to-t from-night/70 via-night/15 to-transparent" />

          <ShippingLivePanel />
        </div>

        <div className="bg-night text-white flex items-center">
          <div className="px-8 py-16 md:px-16 lg:px-20 max-w-xl">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary mb-5"
            >
              The difference
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-[42px] font-display font-semibold tracking-tight leading-[1.12] mb-6"
            >
              Not another dashboard.
              <br />
              A team that ships.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[15px] text-white/60 leading-relaxed mb-10"
            >
              Most tools wait for you. Fless takes the brief, does the work, and leaves a record you can check — in every market you operate.
            </motion.p>
            <ul className="space-y-4 mb-10">
              {lines.map((line, i) => (
                <motion.li
                  key={line}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                  className="text-[15px] text-white/85 leading-snug pl-4 border-l border-white/20"
                >
                  {line}
                </motion.li>
              ))}
            </ul>
            <Link
              href="/start"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 text-sm font-medium hover:bg-primary-hover transition-colors"
            >
              Join the beta
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
