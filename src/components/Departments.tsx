"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { PhotoTile } from "@/components/BrandedStage"
import { departments as deskData } from "@/lib/departments"

const live: Record<string, string> = {
  marketing: "12 running",
  sales: "8 open",
  voice: "5 live calls",
  support: "9 in queue",
  recruitment: "4 screens",
  hr: "Day 1 ready",
  operations: "18 workflows",
  finance: "$18.4k in",
}

export function Departments() {
  return (
    <section id="departments" className="py-24 md:py-32 bg-[#fafafa] dark:bg-secondary border-t border-border/60">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div className="max-w-xl">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary mb-4"
            >
              Departments
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-[44px] font-display font-semibold tracking-tight leading-[1.12] text-foreground"
            >
              Eight desks. One product.
            </motion.h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
            Turn on what you need. They share context — not another login.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {deskData.map((dept, i) => (
            <motion.div
              key={dept.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
            >
              <Link href={`/departments/${dept.slug}`} className="group block">
                <PhotoTile
                  image={dept.hero}
                  alt={dept.name}
                  title={dept.name}
                  live={live[dept.slug]}
                  className="aspect-[4/5] rounded-2xl mb-3"
                />
                <p className="text-[13px] text-muted-foreground leading-relaxed px-0.5 hidden sm:block">
                  {dept.line}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
