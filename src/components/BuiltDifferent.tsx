"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const lines = [
  "Does the work — not a list of suggestions.",
  "Keeps the same context your team already has.",
  "Gets sharper the longer it runs.",
]

export function BuiltDifferent() {
  return (
    <section className="relative overflow-hidden border-t border-border/60">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[560px] lg:min-h-[720px]">
        <div className="relative min-h-[460px] lg:min-h-full bg-night">
          <div
            role="img"
            aria-label="Screenshot of the Fless workspace"
            className="fless-shot-fill absolute inset-0"
          />
          {/* Do not capture touch — blocks vertical scroll on mobile */}
          <div className="pointer-events-none absolute inset-0 z-10 select-none" aria-hidden />
          <div className="pointer-events-none absolute inset-0 z-[12] bg-gradient-to-r from-transparent via-transparent to-night/70" />
          <div className="pointer-events-none absolute inset-0 z-[12] bg-gradient-to-t from-night/70 via-night/15 to-transparent" />

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
