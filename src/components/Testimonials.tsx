"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { NvidiaInceptionBadge } from "@/components/NvidiaInceptionBadge"

export function Testimonials() {
  return (
    <section className="py-24 md:py-32 bg-background border-t border-border/60">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary mb-4"
        >
          Early validation
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-[44px] font-display font-semibold tracking-tight leading-[1.12] text-foreground mb-12 md:mb-16 max-w-2xl"
        >
          In pilot with 18 businesses.
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <motion.article
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 relative rounded-2xl overflow-hidden min-h-[380px] md:min-h-[440px] ring-1 ring-inset ring-black/[0.08]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80"
              alt="Teams piloting Fless"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
              <p className="text-white text-xl md:text-2xl font-display font-medium tracking-tight leading-snug max-w-lg mb-4">
                Private pilots running with founders, operators, and growth teams.
              </p>
              <p className="text-white/80 text-sm max-w-md">
                Customer case studies will publish as cohorts conclude.
              </p>
            </div>
          </motion.article>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-5 rounded-2xl border border-border/70 bg-card p-6 md:p-8 flex flex-col justify-between"
          >
            <div>
              <div className="inline-block mb-6">
                <NvidiaInceptionBadge variant="pill" />
              </div>
              <h3 className="text-xl font-display font-semibold text-foreground mb-3">
                Piloting the Marketing Employee
              </h3>
              <p className="text-[15px] leading-relaxed text-muted-foreground mb-6">
                We are running private pilots with founders, operators, and growth teams who want marketing that runs every week without hand-holding. Customer case studies will publish as pilots complete.
              </p>
              <ul className="space-y-3 text-sm text-foreground/90 mb-8">
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>18 active pilot teams</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>Live publishing on LinkedIn, X, Facebook, Instagram and Bluesky</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>Human-in-the-loop approvals & full audit trail</span>
                </li>
              </ul>
            </div>

            <div>
              <Link
                href="/start"
                className="inline-flex items-center justify-center gap-2 w-full rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary-hover transition-colors"
              >
                Join the pilot
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
