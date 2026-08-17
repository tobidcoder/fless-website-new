"use client"

import { motion } from "framer-motion"
import { BrandedStage } from "@/components/BrandedStage"

const steps = [
  {
    n: "01",
    title: "Tell us the business",
    description: "Goals, tools, and how work actually gets done — not a 40-field form.",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&auto=format&fit=crop&q=80",
    alt: "Someone setting up a workspace on a laptop",
    snippet: [
      { title: "Brief", line: "Goals and tools locked", time: "2m" },
      { title: "Stack", line: "Calendar + CRM connected", time: "2m" },
    ],
  },
  {
    n: "02",
    title: "Staff the departments",
    description: "Turn on marketing, sales, support, hiring — whatever you need this quarter.",
    image: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=1200&auto=format&fit=crop&q=80",
    alt: "Team collaborating around a table",
    snippet: [
      { title: "Desks", line: "Marketing + Voice live", time: "4m" },
      { title: "Markets", line: "Local hours worldwide", time: "4m" },
    ],
  },
  {
    n: "03",
    title: "Work starts shipping",
    description: "Campaigns, calls, tickets, invoices. You review; it doesn’t wait for you to type.",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&auto=format&fit=crop&q=80",
    alt: "People working together in an open office",
    snippet: [
      { title: "Marketing", line: "4 posts published", time: "18m" },
      { title: "Voice", line: "7 bookings held", time: "22m" },
    ],
  },
  {
    n: "04",
    title: "See what moved",
    description: "One view of what ran, what closed, and what to scale next week.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80",
    alt: "Laptop showing business performance charts",
    snippet: [
      { title: "Week", line: "Revenue +23%", time: "Fri" },
      { title: "Next", line: "Scale the London ads", time: "Fri" },
    ],
  },
]

export function HowItWorks() {
  return (
    <section className="py-24 md:py-32 bg-background border-t border-border/60">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="max-w-2xl mb-14 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary mb-4"
          >
            How it works
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-[44px] font-display font-semibold tracking-tight leading-[1.12] text-foreground"
          >
            Live in a day. Compounding after that.
          </motion.h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {steps.map((step, i) => (
            <motion.article
              key={step.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group"
            >
              <BrandedStage
                image={step.image}
                alt={step.alt}
                label={step.title}
                rows={step.snippet}
                compact
                className="aspect-[4/5] rounded-2xl mb-5"
              />
              <h3 className="text-[16px] font-semibold tracking-tight text-foreground mb-1.5">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
