"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { EmailCapture } from "@/components/EmailCapture"
import { IntroFilm } from "@/components/IntroFilm"

export function Hero() {
  return (
    <>
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden bg-background">
        <div className="max-w-[960px] mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs sm:text-[13px] font-medium tracking-[0.24em] uppercase text-muted-foreground mb-6"
          >
            One product · every market
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.55 }}
            className="text-[44px] sm:text-[56px] md:text-[68px] lg:text-[80px] font-display font-semibold leading-[1.02] tracking-[-0.05em] text-foreground"
          >
            Employees for every
            <br />
            part of your{" "}
            <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              business.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="mt-7 sm:mt-8 text-lg sm:text-xl text-muted-foreground leading-[1.55] max-w-[640px] mx-auto"
          >
            One product that staffs marketing, sales, voice, support, hiring, and finance — so the work ships in every market you operate.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="mt-10 flex flex-col items-center"
          >
            <EmailCapture source="hero" cta="Join the beta" />
            <Link href="/#product" className="inline-block mt-5 text-[15px] font-medium text-muted-foreground hover:text-primary">
              See how it works →
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.32 }}
            className="mt-7 text-sm text-muted-foreground"
          >
            No credit card · Setup in under 2 minutes · Cancel anytime
          </motion.p>
        </div>
      </section>

      <section className="pb-16 md:pb-24 bg-background">
        <div className="max-w-[1280px] mx-auto px-6">
          <IntroFilm />
        </div>
      </section>
    </>
  )
}
