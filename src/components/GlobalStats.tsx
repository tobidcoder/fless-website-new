"use client"

import { motion } from "framer-motion"
import {
  PILOT_BUSINESS_COUNT,
  LIVE_CHANNEL_COUNT,
  LIVE_CHANNELS_TEXT,
  NVIDIA_INCEPTION_MEMBER,
} from "@/lib/claims"
import { departments } from "@/lib/departments"

const stats = [
  { value: String(PILOT_BUSINESS_COUNT), label: "Businesses in pilot" },
  { value: String(LIVE_CHANNEL_COUNT), label: `Channels live (${LIVE_CHANNELS_TEXT})` },
  { value: String(departments.length), label: "Autonomous departments" },
  ...(NVIDIA_INCEPTION_MEMBER ? [{ value: "NVIDIA", label: "Inception member" }] : []),
]

export function GlobalStats() {
  return (
    <section className="border-y border-border/60 bg-background">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
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
              } ${i < 2 ? "border-b lg:border-b-0" : ""} ${i < 3 ? "lg:border-r" : ""}`}
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
