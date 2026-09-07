"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { StayInForm } from "@/components/StayInForm"
import { FlessLogo, SparkleMark } from "@/components/FlessLogo"
import { footerIndustries, industryHref } from "@/lib/industries"

const lessLetters = ["L", "E", "S", "S"]

export function Footer() {
  const reduce = useReducedMotion()

  return (
    <footer className="relative overflow-hidden bg-night text-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 py-14 md:py-16 border-b border-white/[0.08]">
          <div className="max-w-lg">
            <FlessLogo inverted className="mb-5" />
            <h2 className="text-3xl sm:text-4xl font-display font-semibold tracking-tight leading-[1.12] mb-3">
              Every department.
              <br />
              Every market.
            </h2>
            <p className="text-white/50 text-[15px] leading-relaxed">
              Work email in. We’ll send a seat when the beta opens.
            </p>
          </div>
          <StayInForm source="footer" variant="dark" className="lg:max-w-md w-full" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-10 py-12 md:py-14">
          <div>
            <h4 className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/35 mb-4">Product</h4>
            <ul className="space-y-2.5 text-[13px] text-white/55">
              <li><Link href="/#departments" className="hover:text-white transition-colors">Departments</Link></li>
              <li><Link href="/solutions" className="hover:text-white transition-colors">Solutions</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/start" className="hover:text-white transition-colors">Join the beta</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/35 mb-4">Departments</h4>
            <ul className="space-y-2.5 text-[13px] text-white/55">
              <li><Link href="/departments/marketing" className="hover:text-white transition-colors">Marketing</Link></li>
              <li><Link href="/departments/voice" className="hover:text-white transition-colors">Voice</Link></li>
              <li><Link href="/departments/sales" className="hover:text-white transition-colors">Sales</Link></li>
              <li><Link href="/departments/recruitment" className="hover:text-white transition-colors">Recruitment</Link></li>
              <li><Link href="/departments/support" className="hover:text-white transition-colors">Support</Link></li>
              <li><Link href="/departments/operations" className="hover:text-white transition-colors">Operations</Link></li>
              <li><Link href="/departments/finance" className="hover:text-white transition-colors">Finance</Link></li>
              <li><Link href="/departments/hr" className="hover:text-white transition-colors">HR</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/35 mb-4">Size</h4>
            <ul className="space-y-2.5 text-[13px] text-white/55">
              <li><Link href="/solutions/startup" className="hover:text-white transition-colors">Startup</Link></li>
              <li><Link href="/solutions/smb" className="hover:text-white transition-colors">SMB</Link></li>
              <li><Link href="/solutions/enterprise" className="hover:text-white transition-colors">Enterprise</Link></li>
              <li><Link href="/solutions/agency" className="hover:text-white transition-colors">Agency</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/35 mb-4">Industry</h4>
            <ul className="space-y-2.5 text-[13px] text-white/55">
              {footerIndustries.map((industry) => (
                <li key={industry.id}>
                  <Link href={industryHref(industry)} className="hover:text-white transition-colors">
                    {industry.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/industries" className="hover:text-white transition-colors">
                  All industries
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/35 mb-4">Company</h4>
            <ul className="space-y-2.5 text-[13px] text-white/55">
              <li><Link href="/security" className="hover:text-white transition-colors">Security</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="py-5 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[12px] text-white/30">
          <span>© 2026 Fless Inc.</span>
          <span className="hidden sm:inline">A team for every department</span>
        </div>
      </div>

      <div className="relative px-2 sm:px-4 overflow-hidden select-none" aria-hidden>
        <div className="pointer-events-none absolute left-1/2 bottom-0 h-[90%] w-[75%] max-w-[1200px] -translate-x-1/2 rounded-full bg-gradient-to-t from-primary/25 via-primary/10 to-transparent blur-[130px]" />
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex items-end justify-center gap-[0.03em] font-display font-semibold tracking-[-0.07em] leading-[0.74] text-center text-[28vw] sm:text-[23vw] md:text-[20vw] lg:text-[18vw] xl:text-[17vw] whitespace-nowrap pt-4 pb-28 sm:pb-24 md:pb-16"
        >
          <SparkleMark className="mb-[0.09em] h-[0.52em] w-auto shrink-0 select-none opacity-95 drop-shadow-[0_0_24px_rgba(99,102,241,0.3)]" />
          <span className="fless-less-letter drop-shadow-[0_4px_32px_rgba(0,0,0,0.35)]">F</span>
          <span className="inline-flex">
            {lessLetters.map((letter, i) => (
              <span
                key={`${letter}-${i}`}
                className="fless-less-letter drop-shadow-[0_4px_32px_rgba(0,0,0,0.35)]"
              >
                {letter}
              </span>
            ))}
          </span>
        </motion.p>
      </div>
    </footer>
  )
}
