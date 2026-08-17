"use client"

import { motion } from "framer-motion"
import { BrandedStage } from "@/components/BrandedStage"

const tools = [
  "Google Workspace",
  "Microsoft 365",
  "Slack",
  "HubSpot",
  "Salesforce",
  "Stripe",
  "Zoom",
  "Calendly",
  "LinkedIn",
  "Meta",
  "AWS",
  "GitHub",
]

export function Integrations() {
  return (
    <section className="py-24 md:py-32 bg-background border-t border-border/60">
      <div className="max-w-[1200px] mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <BrandedStage
            image="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&auto=format&fit=crop&q=80"
            alt="Office with the tools teams already use"
            label="Connected"
            rows={[
              { title: "HubSpot", line: "CRM syncing", time: "Live" },
              { title: "Calendar", line: "Google · Dubai diary", time: "Live" },
              { title: "Stripe", line: "Invoices matching bank", time: "Ready" },
            ]}
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
            className="text-[15px] text-muted-foreground leading-relaxed mb-10 max-w-md"
          >
            Calendar, CRM, inbox, payments. Fless works where the work already lives.
          </motion.p>
          <div className="grid grid-cols-2 gap-x-8 gap-y-3">
            {tools.map((t, i) => (
              <motion.div
                key={t}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="text-sm font-medium text-foreground py-1 border-b border-border/50"
              >
                {t}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
