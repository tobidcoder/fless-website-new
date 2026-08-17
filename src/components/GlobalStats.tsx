"use client"

import { motion } from "framer-motion"

const stats = [
  { value: "40+", label: "Countries live" },
  { value: "8", label: "Departments" },
  { value: "24/7", label: "Coverage" },
  { value: "2 min", label: "To first task" },
]

export function GlobalStats() {
  return (
    <section className="border-y border-border/60 bg-background">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-border/60">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="py-8 md:py-10 px-4 md:px-8 first:pl-0 lg:[&:nth-child(4n+1)]:pl-0"
            >
              <div className="text-3xl md:text-4xl font-display font-semibold tracking-tight tabular-nums text-foreground">
                {s.value}
              </div>
              <div className="text-[13px] text-muted-foreground mt-1">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
