"use client"

import { motion } from "framer-motion"

const names = ["Surgic+", "RevWit", "AllMoments", "10MG", "Voke", "Sourzer", "PayFlow", "Helix"]

export function LogoMarquee() {
  const row = [...names, ...names, ...names]

  return (
    <section className="py-12 md:py-16 overflow-hidden border-y border-border/60 bg-background">
      <p className="text-center text-[11px] font-medium tracking-[0.2em] uppercase text-primary mb-8">
        Teams already running on Fless
      </p>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        <motion.div
          animate={{ x: ["0%", "-33.333%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
          className="flex w-max items-center gap-12 md:gap-20 px-6"
        >
          {row.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="text-xl md:text-2xl font-display font-semibold tracking-tight text-foreground/35 hover:text-foreground/70 transition-colors select-none whitespace-nowrap"
            >
              {name}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
