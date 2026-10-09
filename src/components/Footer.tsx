"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { StayInForm } from "@/components/StayInForm"
import { FlessLogo, SparkleMark } from "@/components/FlessLogo"
import { NvidiaInceptionBadge } from "@/components/NvidiaInceptionBadge"
import { Globe, ShieldCheck, ArrowUpRight } from "lucide-react"

const lessLetters = ["L", "E", "S", "S"]

export function Footer() {
  const reduce = useReducedMotion()

  return (
    <footer className="relative overflow-hidden bg-night text-white border-t border-white/[0.08]">
      <div className="max-w-[1240px] mx-auto px-6">
        {/* TOP CALLOUT BAR: BRAND + BETA SIGNUP + NVIDIA BADGE + STATUS */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 py-14 md:py-16 border-b border-white/[0.08]">
          <div className="max-w-lg space-y-4">
            <FlessLogo inverted className="mb-3" />
            <h2 className="text-3xl sm:text-4xl font-display font-semibold tracking-tight leading-[1.12]">
              Every department.
              <br />
              Every market.
            </h2>
            <p className="text-white/50 text-[14px] sm:text-[15px] leading-relaxed max-w-md">
              Deploy autonomous AI employees across voice, marketing, support, sales, and operations in under 2 minutes.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <NvidiaInceptionBadge variant="footer" />
              {/* LIVE STATUS PILL */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/10 bg-white/[0.03] text-[11px] text-white/70 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>All Systems Operational · Sub-300ms</span>
              </div>
            </div>
          </div>

          <div className="lg:max-w-md w-full">
            <StayInForm source="footer" variant="dark" className="w-full" />
          </div>
        </div>

        {/* MEGA FOOTER GRID: 6 DOMAIN-SPECIFIC COLUMNS (NO REPETITIONS) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-10 py-14 md:py-16">
          {/* 1. DEPARTMENTS */}
          <div>
            <h4 className="text-[11px] font-mono font-semibold uppercase tracking-[0.16em] text-white/40 mb-4 flex items-center gap-1.5">
              <span>Departments</span>
            </h4>
            <ul className="space-y-2.5 text-[13px] text-white/60">
              <li><Link href="/departments/voice" className="hover:text-white transition-colors">Voice Telephony</Link></li>
              <li><Link href="/departments/marketing" className="hover:text-white transition-colors">Marketing & Ads</Link></li>
              <li><Link href="/departments/sales" className="hover:text-white transition-colors">Sales & CRM</Link></li>
              <li><Link href="/departments/support" className="hover:text-white transition-colors">Customer Support</Link></li>
              <li><Link href="/departments/operations" className="hover:text-white transition-colors">Operations & Ops</Link></li>
              <li><Link href="/departments/finance" className="hover:text-white transition-colors">Accounts Payable</Link></li>
              <li><Link href="/departments/recruitment" className="hover:text-white transition-colors">Recruitment</Link></li>
              <li><Link href="/departments/hr" className="hover:text-white transition-colors">People & HR</Link></li>
            </ul>
          </div>

          {/* 2. SOLUTIONS & SECTORS */}
          <div>
            <h4 className="text-[11px] font-mono font-semibold uppercase tracking-[0.16em] text-white/40 mb-4 flex items-center gap-1.5">
              <span>Solutions</span>
            </h4>
            <ul className="space-y-2.5 text-[13px] text-white/60">
              <li><Link href="/solutions/startup" className="hover:text-white transition-colors">For Startups</Link></li>
              <li><Link href="/solutions/smb" className="hover:text-white transition-colors">Growing Teams</Link></li>
              <li><Link href="/solutions/enterprise" className="hover:text-white transition-colors">Enterprise Seats</Link></li>
              <li><Link href="/solutions/healthcare" className="hover:text-white transition-colors">Healthcare & Clinics</Link></li>
              <li><Link href="/solutions/retail" className="hover:text-white transition-colors">Retail & E-Com</Link></li>
              <li><Link href="/solutions/finance" className="hover:text-white transition-colors">Financial Services</Link></li>
              <li><Link href="/solutions/education" className="hover:text-white transition-colors">Education & Academies</Link></li>
              <li><Link href="/industries" className="text-primary hover:text-white transition-colors flex items-center gap-1">All 35 Industries <ArrowUpRight className="w-3 h-3" /></Link></li>
            </ul>
          </div>

          {/* 3. FOR BUILDERS */}
          <div>
            <h4 className="text-[11px] font-mono font-semibold uppercase tracking-[0.16em] text-white/40 mb-4 flex items-center gap-1.5">
              <span>For Builders</span>
            </h4>
            <ul className="space-y-2.5 text-[13px] text-white/60">
              <li><Link href="/builders" className="hover:text-white transition-colors">Builder Platform</Link></li>
              <li><Link href="/docs" className="hover:text-white transition-colors">Builder Documentation</Link></li>
              <li><Link href="/docs#quickstart" className="hover:text-white transition-colors">5-Min Quickstart</Link></li>
              <li><Link href="/docs#sdk-overview" className="hover:text-white transition-colors">@fless/employee-sdk</Link></li>
              <li><Link href="/docs#ref-pricing" className="hover:text-white transition-colors">35/65 Payout Models</Link></li>
              <li><Link href="/docs#plugin-whatsapp" className="hover:text-white transition-colors">Managed Plugins</Link></li>
              <li><Link href="/start" className="hover:text-white transition-colors">Apply for Builder Seat</Link></li>
            </ul>
          </div>

          {/* 4. PLATFORM & TRUST */}
          <div>
            <h4 className="text-[11px] font-mono font-semibold uppercase tracking-[0.16em] text-white/40 mb-4 flex items-center gap-1.5">
              <span>Platform</span>
            </h4>
            <ul className="space-y-2.5 text-[13px] text-white/60">
              <li><Link href="/pricing" className="hover:text-white transition-colors">Workforce Pricing</Link></li>
              <li><Link href="/solutions#calculator" className="hover:text-white transition-colors">ROI Calculator</Link></li>
              <li><Link href="/security" className="hover:text-white transition-colors">Zero-Secret Vault</Link></li>
              <li><Link href="/security#compliance" className="hover:text-white transition-colors">Global Compliance</Link></li>
              <li><Link href="/pricing#guarantee" className="hover:text-white transition-colors">Money-Back Guarantee</Link></li>
              <li><Link href="/docs#security-boundaries" className="hover:text-white transition-colors">Security Architecture</Link></li>
            </ul>
          </div>

          {/* 5. COMPANY */}
          <div>
            <h4 className="text-[11px] font-mono font-semibold uppercase tracking-[0.16em] text-white/40 mb-4 flex items-center gap-1.5">
              <span>Company</span>
            </h4>
            <ul className="space-y-2.5 text-[13px] text-white/60">
              <li><Link href="/contact" className="hover:text-white transition-colors">About Fless</Link></li>
              <li><Link href="/start" className="hover:text-white transition-colors">Join Early Beta</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Customer Support</Link></li>
              <li><Link href="/contact#enterprise" className="hover:text-white transition-colors">Sales Inquiries</Link></li>
              <li><a href="https://www.npmjs.com/package/@fless/employee-sdk" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1">npm Registry <ArrowUpRight className="w-3 h-3" /></a></li>
            </ul>
          </div>

          {/* 6. LEGAL & SECURITY */}
          <div>
            <h4 className="text-[11px] font-mono font-semibold uppercase tracking-[0.16em] text-white/40 mb-4 flex items-center gap-1.5">
              <span>Legal</span>
            </h4>
            <ul className="space-y-2.5 text-[13px] text-white/60">
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/security" className="hover:text-white transition-colors">Security Overview</Link></li>
              <li><Link href="/terms#cancellation" className="hover:text-white transition-colors">Cancellation Terms</Link></li>
              <li><Link href="/privacy#data-retention" className="hover:text-white transition-colors">Data Retention</Link></li>
            </ul>
          </div>
        </div>

        {/* GLOBAL READINESS BAR */}
        <div className="py-6 border-t border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-4 text-[12px] text-white/45">
          <div className="flex items-center gap-3">
            <Globe className="w-4 h-4 text-primary shrink-0" />
            <span>
              Global Multi-Currency Billing: <strong className="text-white/80 font-mono">USD · NGN · GBP · EUR · KES · GHS · ZAR · AED</strong>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>NDPR · GDPR · HIPAA Compliant</span>
            </span>
            <span className="hidden sm:inline">•</span>
            <span>© 2026 Fless Inc.</span>
          </div>
        </div>
      </div>

      {/* TYPOGRAPHIC WATERMARK */}
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
