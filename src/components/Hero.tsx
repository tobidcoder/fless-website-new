"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Check } from "lucide-react"
import { EmailCapture } from "@/components/EmailCapture"
import { IntroFilm } from "@/components/IntroFilm"
import { NvidiaInceptionBadge } from "@/components/NvidiaInceptionBadge"

// The three facts a first-time visitor needs in under ten seconds.
const quickFacts = [
  "Marketing employee live today",
  "You approve before anything goes out",
  "Pay in USD, GBP, NGN + 5 more",
]

export function Hero() {
  return (
    <>
      <section className="relative pt-28 pb-14 sm:pt-32 md:pt-40 md:pb-20 overflow-hidden bg-background">
        <div className="max-w-[960px] mx-auto px-5 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-6 sm:mb-7 flex-wrap"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-background px-3 py-1 text-[12px] font-medium text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              In pilot with 18 businesses
            </span>
            <NvidiaInceptionBadge variant="pill" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.55 }}
            className="text-[40px] sm:text-[56px] md:text-[68px] lg:text-[78px] font-display font-semibold leading-[1.04] tracking-[-0.045em] text-foreground text-balance"
          >
            AI employees that do the work.{" "}
            <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              You approve what ships.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="mt-6 sm:mt-8 text-[17px] sm:text-xl text-muted-foreground leading-[1.6] max-w-[680px] mx-auto text-pretty"
          >
            Fless lets any business hire AI employees by department. They plan, write and publish real work,
            and a person on your team signs off first. Marketing is live today; seven more departments are in
            early access.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="mt-9 sm:mt-10 flex flex-col items-center"
          >
            <EmailCapture source="hero" cta="Join the beta" />
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[14px] font-medium">
              <Link href="/#how-it-works" className="text-muted-foreground hover:text-primary transition-colors">
                How it works →
              </Link>
              <Link href="/builders" className="text-muted-foreground hover:text-primary transition-colors">
                I&apos;m a builder →
              </Link>
              <Link href="/investors" className="text-muted-foreground hover:text-primary transition-colors">
                I&apos;m an investor →
              </Link>
            </div>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.32 }}
            className="mt-9 flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-x-6 gap-y-2.5 text-[13px] sm:text-sm text-muted-foreground"
          >
            {quickFacts.map((fact) => (
              <li key={fact} className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                {fact}
              </li>
            ))}
          </motion.ul>
        </div>
      </section>

      <section className="pb-16 md:pb-24 bg-background">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-6">
          <IntroFilm />
        </div>
      </section>
    </>
  )
}
