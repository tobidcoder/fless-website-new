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
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`py-7 sm:py-8 md:py-10 px-4 sm:px-6 md:px-8 border-border/60 ${
                i % 2 === 0 ? "border-r" : ""
              } ${i < 2 ? "border-b lg:border-b-0" : ""} ${
                i > 0 && i % 2 !== 0 && "lg:border-r"
              } ${i === 1 ? "lg:border-r" : ""} ${i === 2 ? "lg:border-r" : ""}`}
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-display font-semibold tracking-tight tabular-nums text-foreground">
                {s.value}
              </div>
              <div className="text-xs sm:text-[13px] text-muted-foreground mt-1">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
