"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { StayInForm } from "@/components/StayInForm"
import { FlessLogo, SparkleMark } from "@/components/FlessLogo"

const lessLetters = ["L", "E", "S", "S"]

export function Footer() {
  const reduce = useReducedMotion()

  return (
    <footer className="relative overflow-hidden bg-[#09090b] text-white">
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
              <li><Link href="/solutions/healthcare" className="hover:text-white transition-colors">Healthcare</Link></li>
              <li><Link href="/solutions/education" className="hover:text-white transition-colors">Education</Link></li>
              <li><Link href="/solutions/retail" className="hover:text-white transition-colors">Retail</Link></li>
              <li><Link href="/solutions/finance" className="hover:text-white transition-colors">Finance</Link></li>
              <li><Link href="/solutions/hospitality" className="hover:text-white transition-colors">Hospitality</Link></li>
              <li><Link href="/solutions/professional-services" className="hover:text-white transition-colors">Professional services</Link></li>
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

      <div className="relative px-2 sm:px-3 overflow-hidden select-none" aria-hidden>
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[80%] w-[55%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[100px]" />
        <p className="relative flex items-end justify-center gap-[0.04em] font-display font-semibold tracking-[-0.08em] leading-[0.78] text-center text-[24vw] sm:text-[18vw] lg:text-[15vw] whitespace-nowrap pb-2">
          <SparkleMark className="mb-[0.12em] h-[0.55em] w-auto opacity-90" />
          <span className="text-white">F</span>
          <span className="inline-flex">
            {lessLetters.map((letter, i) => (
              <motion.span
                key={`${letter}-${i}`}
                className={reduce ? "text-primary" : "fless-less-letter"}
                initial={reduce ? false : { y: "0.35em", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ delay: 0.08 + i * 0.07, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                {letter}
              </motion.span>
            ))}
          </span>
        </p>
      </div>
    </footer>
  )
}
