"use client"

import { motion } from "framer-motion"
import { BrandedStage } from "@/components/BrandedStage"
import Link from "next/link"
import { CONNECTIONS, categoryLabel } from "@/lib/connections"

const liveTools = CONNECTIONS.filter((c) => c.status === "Available").map((c) => c.name)
const beta = CONNECTIONS.filter((c) => c.status !== "Available")
const betaCategories = Array.from(new Set(beta.map((c) => categoryLabel(c.category).toLowerCase()))).slice(0, 6)

export function Integrations() {
  return (
    <section className="py-24 md:py-32 bg-background border-t border-border/60">
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <BrandedStage
            image="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&auto=format&fit=crop&q=80"
            alt="Office with the tools teams already use"
            className="aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5] rounded-2xl"
          />
        </motion.div>

        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary mb-4"
          >
            Integrations
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-display font-semibold tracking-tight leading-[1.12] text-foreground mb-4"
          >
            Plugs into the stack you already run.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[15px] text-muted-foreground leading-relaxed mb-8 max-w-md"
          >
            Fless connects straight to each platform&apos;s official API, with no third-party schedulers in between.
            Businesses sign in with their own accounts.
          </motion.p>
          <div className="space-y-6">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">Live today</div>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2.5">
                {liveTools.map((t) => (
                  <div key={t} className="text-sm font-medium text-foreground py-1 border-b border-border/50 flex items-center justify-between">
                    <span>{t}</span>
                    <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase">Live</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              Plus {beta.length} more in beta or awaiting provider approval, across {betaCategories.join(", ")} and more.{" "}
              <Link href="/docs#connections" className="font-medium text-foreground underline underline-offset-4 hover:text-primary">
                See all {CONNECTIONS.length}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
