"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import { Check } from "lucide-react"
import { EmailCapture } from "@/components/EmailCapture"
import { IntroFilm } from "@/components/IntroFilm"
import { NvidiaInceptionBadge } from "@/components/NvidiaInceptionBadge"
import { EASE, WordReveal } from "@/components/motion"

// The three facts a first-time visitor needs in under ten seconds.
const quickFacts = [
  "Marketing employee live today",
  "You approve before anything goes out",
  "Pay in USD, GBP, NGN + 5 more",
]

export function Hero() {
  // The product shot starts slightly tilted and settles flat as it scrolls into view.
  const shotRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: shotRef, offset: ["start end", "start 0.35"] })
  const rotateX = useTransform(scrollYProgress, [0, 1], [14, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1])

  return (
    <>
      <section className="relative pt-28 pb-14 sm:pt-32 md:pt-40 md:pb-20 overflow-hidden bg-background">
        {/* Slow ambient glow behind the headline */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
          <motion.div
            className="absolute left-1/2 top-[-12%] h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-primary/[0.13] blur-[110px]"
            animate={{ x: ["-6%", "6%", "-6%"], scale: [1, 1.08, 1] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute right-[8%] top-[22%] h-[260px] w-[360px] rounded-full bg-sky-400/[0.10] blur-[100px]"
            animate={{ y: ["0%", "18%", "0%"], x: ["0%", "-10%", "0%"] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(hsl(var(--foreground)/0.06)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,black,transparent)]" />
        </div>
        <div className="relative max-w-[960px] mx-auto px-5 sm:px-6 text-center">
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

          <h1 className="text-[40px] sm:text-[56px] md:text-[68px] lg:text-[78px] font-display font-semibold leading-[1.04] tracking-[-0.045em] text-foreground text-balance">
            <WordReveal text="AI employees that do the work." delay={0.1} />{" "}
            <motion.span
              className="inline-block bg-gradient-to-r from-foreground via-primary to-foreground bg-[length:200%_auto] bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20, backgroundPosition: "100% 50%" }}
              animate={{ opacity: 1, y: 0, backgroundPosition: "0% 50%" }}
              transition={{ opacity: { delay: 0.5, duration: 0.7 }, y: { delay: 0.5, duration: 0.8, ease: EASE }, backgroundPosition: { delay: 0.6, duration: 2.4, ease: EASE } }}
            >
              You approve what ships.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7, ease: EASE }}
            className="mt-6 sm:mt-8 text-[17px] sm:text-xl text-muted-foreground leading-[1.6] max-w-[680px] mx-auto text-pretty"
          >
            Fless lets any business hire AI employees by department. They plan, write and publish real work,
            and a person on your team signs off first. Marketing is live today; seven more departments are in
            early access.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.82, duration: 0.7, ease: EASE }}
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
            </div>
          </motion.div>

          <motion.ul
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 1 } } }}
            className="mt-9 flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-x-6 gap-y-2.5 text-[13px] sm:text-sm text-muted-foreground"
          >
            {quickFacts.map((fact) => (
              <motion.li
                key={fact}
                className="flex items-center gap-2"
                variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } }}
              >
                <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                {fact}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      <section className="pb-16 md:pb-24 bg-background">
        <div ref={shotRef} className="max-w-[1280px] mx-auto px-5 sm:px-6 [perspective:1600px]">
          <motion.div style={{ rotateX, scale, transformOrigin: "50% 0%" }}>
            <IntroFilm />
          </motion.div>
        </div>
      </section>
    </>
  )
}
