"use client"

import { motion } from "framer-motion"

// What actually happens when a business assigns work to the Marketing employee.
const rows = [
  { n: "1", title: "You write a brief", text: "In plain language, e.g. “Plan next week’s posts for the product launch.”" },
  { n: "2", title: "Fless drafts the work", text: "Posts, captions and visuals for each connected network, in your brand voice." },
  { n: "3", title: "You approve", text: "Everything waits in the approval queue. Edit, approve or reject each item." },
  { n: "4", title: "It publishes and logs", text: "Approved posts go out through each network’s official API, and every step is recorded." },
]

export function Product() {
  return (
    <section id="product" className="py-24 md:py-32 bg-[#fafafa] dark:bg-secondary border-t border-border/60">
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
            Assign work in plain language. Marketing is live today, with voice, sales, support, and finance on the roadmap.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <div className="h-full rounded-2xl overflow-hidden border border-border/70 bg-white">
              <div
                role="img"
                aria-label="Screenshot of the Fless Marketing department"
                className="fless-shot-fill w-full h-full min-h-[300px] md:min-h-[480px]"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="lg:col-span-5 rounded-2xl border border-border/70 bg-background p-5 md:p-7 flex flex-col"
          >
            <div className="text-[12px] font-medium text-muted-foreground mb-5">How a request flows</div>
            <div className="space-y-4 flex-1">
              {rows.map((row, i) => (
                <motion.div
                  key={row.n}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.08 }}
                  className="flex gap-3.5"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-soft text-[12px] font-semibold text-primary">
                    {row.n}
                  </span>
                  <div>
                    <div className="text-[14px] font-semibold text-foreground mb-0.5">{row.title}</div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{row.text}</p>
                  </div>
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
