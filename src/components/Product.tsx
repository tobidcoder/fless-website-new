"use client"

import { motion } from "framer-motion"
import { BrandedStage } from "@/components/BrandedStage"

const rows = [
  { who: "You", text: "Draft next week’s campaign for the London launch." },
  { who: "Fless", text: "Brief locked. 4 posts, 2 ads, report scheduled Friday." },
  { who: "You", text: "Route after-hours calls to Voice. Book anything after 10." },
  { who: "Fless", text: "Voice is live in Lagos and Dubai. Calendar synced." },
]

export function Product() {
  return (
    <section id="product" className="py-24 md:py-32 bg-[#fafafa] dark:bg-[#0c0c0c] border-t border-border/60">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="max-w-2xl mb-12 md:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary mb-4"
          >
            Command center
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-[44px] font-display font-semibold tracking-tight leading-[1.12] text-foreground"
          >
            One place to run the whole company.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-4 text-[15px] text-muted-foreground leading-relaxed max-w-xl"
          >
            Assign work in plain language. See every department from a single screen — not eight logins.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-12 gap-4 md:gap-5 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <BrandedStage
              image="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&auto=format&fit=crop&q=80"
              alt="Teams running the company from one command center"
              label="Command · live"
              rows={[
                { title: "Marketing", line: "London launch · 4 posts live", time: "2m" },
                { title: "Voice", line: "Lagos + Dubai calendars synced", time: "8m" },
                { title: "Finance", line: "First invoice marked paid", time: "1h" },
              ]}
              className="rounded-2xl min-h-[340px] md:min-h-[480px] h-full"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="lg:col-span-5 rounded-2xl border border-border/70 bg-background p-5 md:p-7 flex flex-col"
          >
            <div className="text-[12px] font-medium text-muted-foreground mb-5">Today · Command</div>
            <div className="space-y-4 flex-1">
              {rows.map((row, i) => (
                <motion.div
                  key={row.text}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.08 }}
                  className={row.who === "You" ? "pl-0" : "pl-2"}
                >
                  <div className="text-[11px] font-semibold text-foreground mb-1">{row.who}</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{row.text}</p>
                </motion.div>
              ))}
            </div>
            <div className="mt-6 pt-5 border-t border-border/60 text-[12px] text-muted-foreground">
              Context stays with the company — not in a chat you lose.
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
