"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Briefcase, Code2, LineChart } from "lucide-react"
import { PILOT_BUSINESS_COUNT, PILOT_REGION_COUNT } from "@/lib/claims"
import { BUILDER_SHARE } from "@/lib/billing"

const audiences = [
  {
    icon: Briefcase,
    who: "For businesses",
    title: "Get a department's work done without hiring a department.",
    points: [
      "Hire an AI Marketing employee today",
      "It drafts, designs and schedules — you approve",
      "Or describe the job and build your own",
    ],
    cta: "Join the beta",
    href: "/start",
  },
  {
    icon: Code2,
    who: "For builders",
    title: "Build an AI employee once. Earn every month it works.",
    points: [
      "Describe it in Studio, test it live, no code",
      "Publish to the Fless marketplace",
      `Keep ${BUILDER_SHARE}% of what it earns, paid monthly`,
    ],
    cta: "See the builder program",
    href: "/builders",
  },
  {
    icon: LineChart,
    who: "For investors & accelerators",
    title: "Pre-seed infrastructure for the AI workforce.",
    points: [
      `${PILOT_BUSINESS_COUNT} businesses in pilot across ${PILOT_REGION_COUNT} regions`,
      "Plans, marketplace share and work credits",
      "NVIDIA Inception member",
    ],
    cta: "Company overview",
    href: "/contact",
  },
]

export function AudienceRouter() {
  return (
    <section className="py-20 md:py-28 bg-[#fafafa] dark:bg-secondary border-t border-border/60">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
        <div className="max-w-2xl mb-10 md:mb-14">
          <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary mb-4">Fless in one minute</p>
          <h2 className="text-3xl sm:text-4xl md:text-[44px] font-display font-semibold tracking-tight leading-[1.12] text-foreground text-balance">
            One platform. Three ways in.
          </h2>
          <p className="mt-4 text-[15px] sm:text-base text-muted-foreground leading-relaxed">
            Businesses hire AI employees. Builders create and sell them. Fless runs the computing, billing, approvals
            and audit trail in between.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {audiences.map((a, i) => (
            <motion.div
              key={a.who}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <Link
                href={a.href}
                className="group flex h-full flex-col rounded-2xl border border-border/70 bg-background p-6 sm:p-7 transition-all hover:border-primary/40 hover:shadow-[0_18px_40px_-24px_hsl(var(--primary)/0.45)]"
              >
                <div className="flex items-center gap-2.5 mb-5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-soft text-primary">
                    <a.icon className="w-4 h-4" />
                  </span>
                  <span className="text-[13px] font-semibold text-foreground">{a.who}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-display font-semibold tracking-tight leading-snug text-foreground mb-4">
                  {a.title}
                </h3>
                <ul className="space-y-2.5 mb-7 flex-1">
                  {a.points.map((p) => (
                    <li key={p} className="flex gap-2.5 text-[14px] text-muted-foreground leading-snug">
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
                      {p}
                    </li>
                  ))}
                </ul>
                <span className="inline-flex items-center gap-1.5 text-[14px] font-medium text-primary">
                  {a.cta}
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
