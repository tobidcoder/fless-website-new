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
    <footer className="relative overflow-hidden bg-[#07090F] text-white border-t border-white/[0.08]">
      <div className="max-w-[1240px] mx-auto px-6">
        
        {/* ── TOP BAR: BRAND + BETA SIGNUP + NVIDIA INCEPTION BADGE ── */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 py-12 md:py-16 border-b border-white/[0.08]">
          <div className="max-w-lg space-y-3.5">
            <FlessLogo inverted className="mb-2" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-semibold tracking-tight text-white leading-tight">
              Every department.
              <br />
              Every market.
            </h2>
            <p className="text-white/60 text-sm leading-relaxed max-w-md">
              The unified workforce platform for hiring, managing, and governing senior-level AI employees.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <NvidiaInceptionBadge variant="footer" />
            </div>
          </div>

          <div className="lg:max-w-md w-full">
            <StayInForm source="footer" variant="dark" className="w-full" />
          </div>
        </div>

        {/* ── MEGA CLEAN 6-COLUMN NAVIGATION ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-10 py-14 md:py-16">
          
          {/* 1. DEPARTMENTS */}
          <div className="space-y-4">
            <h4 className="text-[12px] font-mono font-semibold uppercase tracking-[0.16em] text-white/40">
              Departments
            </h4>
            <ul className="space-y-2.5 text-[13px] text-white/65">
              <li>
                <Link href="/departments/marketing" className="hover:text-white transition-colors block py-0.5">
                  Marketing &amp; Ads
                </Link>
              </li>
              <li>
                <Link href="/departments/voice" className="hover:text-white transition-colors block py-0.5">
                  Voice Telephony
                </Link>
              </li>
              <li>
                <Link href="/departments/sales" className="hover:text-white transition-colors block py-0.5">
                  Sales &amp; CRM
                </Link>
              </li>
              <li>
                <Link href="/departments/support" className="hover:text-white transition-colors block py-0.5">
                  Customer Support
                </Link>
              </li>
              <li>
                <Link href="/departments/operations" className="hover:text-white transition-colors block py-0.5">
                  Operations &amp; Ops
                </Link>
              </li>
              <li>
                <Link href="/departments/finance" className="hover:text-white transition-colors block py-0.5">
                  Finance &amp; Accounts
                </Link>
              </li>
              <li>
                <Link href="/departments/recruitment" className="hover:text-white transition-colors block py-0.5">
                  Recruitment
                </Link>
              </li>
              <li>
                <Link href="/departments/hr" className="hover:text-white transition-colors block py-0.5">
                  People &amp; HR
                </Link>
              </li>
              <li>
                <Link href="/departments/legal" className="hover:text-white transition-colors block py-0.5">
                  Legal &amp; Compliance
                </Link>
              </li>
            </ul>
          </div>

          {/* 2. SOLUTIONS */}
          <div className="space-y-4">
            <h4 className="text-[12px] font-mono font-semibold uppercase tracking-[0.16em] text-white/40">
              Solutions
            </h4>
            <ul className="space-y-2.5 text-[13px] text-white/65">
              <li>
                <Link href="/solutions/startup" className="hover:text-white transition-colors block py-0.5">
                  For Startups
                </Link>
              </li>
              <li>
                <Link href="/solutions/smb" className="hover:text-white transition-colors block py-0.5">
                  Growing Teams
                </Link>
              </li>
              <li>
                <Link href="/solutions/enterprise" className="hover:text-white transition-colors block py-0.5">
                  Enterprise Seats
                </Link>
              </li>
              <li>
                <Link href="/solutions/healthcare" className="hover:text-white transition-colors block py-0.5">
                  Healthcare &amp; Clinics
                </Link>
              </li>
              <li>
                <Link href="/solutions/retail" className="hover:text-white transition-colors block py-0.5">
                  Retail &amp; E-Com
                </Link>
              </li>
              <li>
                <Link href="/solutions/finance" className="hover:text-white transition-colors block py-0.5">
                  Financial Services
                </Link>
              </li>
              <li>
                <Link href="/solutions/education" className="hover:text-white transition-colors block py-0.5">
                  Education &amp; Academies
                </Link>
              </li>
              <li className="pt-1">
                <Link href="/industries" className="text-primary hover:text-white transition-colors inline-flex items-center gap-1 font-medium">
                  All 35 Industries <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. FOR BUILDERS */}
          <div className="space-y-4">
            <h4 className="text-[12px] font-mono font-semibold uppercase tracking-[0.16em] text-white/40">
              For Builders
            </h4>
            <ul className="space-y-2.5 text-[13px] text-white/65">
              <li>
                <Link href="/builders" className="hover:text-white transition-colors block py-0.5">
                  Builder Platform
                </Link>
              </li>
              <li>
                <Link href="/docs" className="hover:text-white transition-colors block py-0.5">
                  Builder Documentation
                </Link>
              </li>
              <li>
                <Link href="/docs#quickstart" className="hover:text-white transition-colors block py-0.5">
                  Quickstart Guide
                </Link>
              </li>
              <li>
                <Link href="/docs#sdk-overview" className="hover:text-white transition-colors block py-0.5">
                  TypeScript SDK
                </Link>
              </li>
              <li>
                <Link href="/builders" className="hover:text-white transition-colors block py-0.5">
                  70% Builder Share
                </Link>
              </li>
              <li>
                <Link href="/docs#plugin-whatsapp" className="hover:text-white transition-colors block py-0.5">
                  Managed Plugins
                </Link>
              </li>
              <li>
                <Link href="/builders#apply" className="hover:text-white transition-colors block py-0.5">
                  Request SDK Access
                </Link>
              </li>
            </ul>
          </div>

          {/* 4. PLATFORM */}
          <div className="space-y-4">
            <h4 className="text-[12px] font-mono font-semibold uppercase tracking-[0.16em] text-white/40">
              Platform
            </h4>
            <ul className="space-y-2.5 text-[13px] text-white/65">
              <li>
                <Link href="/pricing" className="hover:text-white transition-colors block py-0.5">
                  Workforce Pricing
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white transition-colors block py-0.5">
                  Capacity Calculator
                </Link>
              </li>
              <li>
                <Link href="/security" className="hover:text-white transition-colors block py-0.5">
                  Zero-Secret Vault
                </Link>
              </li>
              <li>
                <Link href="/security#compliance" className="hover:text-white transition-colors block py-0.5">
                  Compliance Alignment
                </Link>
              </li>
              <li>
                <Link href="/pricing#faqs" className="hover:text-white transition-colors block py-0.5">
                  Cancellation Terms
                </Link>
              </li>
              <li>
                <Link href="/docs#security-boundaries" className="hover:text-white transition-colors block py-0.5">
                  Security Architecture
                </Link>
              </li>
            </ul>
          </div>

          {/* 5. COMPANY */}
          <div className="space-y-4">
            <h4 className="text-[12px] font-mono font-semibold uppercase tracking-[0.16em] text-white/40">
              Company
            </h4>
            <ul className="space-y-2.5 text-[13px] text-white/65">
              <li>
                <Link href="/contact" className="hover:text-white transition-colors block py-0.5">
                  About Fless
                </Link>
              </li>
              <li>
                <Link href="/start" className="hover:text-white transition-colors block py-0.5">
                  Join Early Beta
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors block py-0.5">
                  Customer Support
                </Link>
              </li>
              <li>
                <Link href="/contact#enterprise" className="hover:text-white transition-colors block py-0.5">
                  Sales Inquiries
                </Link>
              </li>
              <li>
                <Link href="/builders#apply" className="hover:text-white transition-colors block py-0.5">
                  Partner Directory
                </Link>
              </li>
            </ul>
          </div>

          {/* 6. LEGAL */}
          <div className="space-y-4">
            <h4 className="text-[12px] font-mono font-semibold uppercase tracking-[0.16em] text-white/40">
              Legal
            </h4>
            <ul className="space-y-2.5 text-[13px] text-white/65">
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors block py-0.5">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors block py-0.5">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/security" className="hover:text-white transition-colors block py-0.5">
                  Security Overview
                </Link>
              </li>
              <li>
                <Link href="/data-deletion" className="hover:text-white transition-colors block py-0.5">
                  Data Deletion
                </Link>
              </li>
              <li>
                <Link href="/terms#cancellation" className="hover:text-white transition-colors block py-0.5">
                  Cancellation Terms
                </Link>
              </li>
              <li>
                <Link href="/privacy#data-retention" className="hover:text-white transition-colors block py-0.5">
                  Data Retention
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* ── GLOBAL MULTI-CURRENCY BILLING BAR ── */}
        <div className="py-5 px-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-white/60">
          <div className="flex items-center gap-2.5">
            <Globe className="w-4 h-4 text-primary shrink-0" />
            <span>
              Global Multi-Currency Billing:{" "}
              <strong className="text-white font-mono tracking-wide font-medium">
                USD · NGN · GBP · EUR · KES · GHS · ZAR · AED
              </strong>
            </span>
          </div>

          <div className="flex items-center gap-2 text-white/50">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Active multi-region availability</span>
          </div>
        </div>

        {/* ── ENTITY, COMPLIANCE & LEGAL BOTTOM BAR ── */}
        <div className="pt-6 pb-12 border-t border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs text-white/50">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 leading-relaxed">
            <span className="flex items-center gap-1.5 text-white/70">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>NDPR &amp; GDPR aligned · DPA on request</span>
            </span>
            <span className="hidden md:inline text-white/30">•</span>
            <span>
              Fless is a product of <strong className="text-white/80 font-medium">Brainstack Tech LTD</strong>, 3a Habitat Close, Lekki Phase 1, Lagos, Nigeria
            </span>
            <span className="hidden md:inline text-white/30">•</span>
            <a
              href="mailto:hello@getfless.com"
              className="hover:text-white transition-colors text-white/70 underline underline-offset-2"
            >
              hello@getfless.com
            </a>
            <span className="hidden md:inline text-white/30">•</span>
            <span>© 2026 Fless</span>
          </div>

          <div className="flex items-center gap-5 text-xs text-white/50 shrink-0 pt-2 md:pt-0">
            <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              LinkedIn
            </Link>
            <Link href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              X
            </Link>
            <Link href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              GitHub
            </Link>
          </div>
        </div>

      </div>

      {/* ── SUBTLE TYPOGRAPHIC WATERMARK ── */}
      <div className="relative px-2 sm:px-4 overflow-hidden select-none pointer-events-none" aria-hidden>
        <div className="pointer-events-none absolute left-1/2 bottom-0 h-[80%] w-[70%] max-w-[1100px] -translate-x-1/2 rounded-full bg-gradient-to-t from-primary/15 via-primary/5 to-transparent blur-[120px]" />
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex items-end justify-center gap-[0.03em] font-display font-semibold tracking-[-0.07em] leading-[0.74] text-center text-[22vw] sm:text-[18vw] md:text-[15vw] whitespace-nowrap pt-2 pb-12 sm:pb-16 text-white/[0.04]"
        >
          <SparkleMark className="mb-[0.09em] h-[0.45em] w-auto shrink-0 select-none opacity-40 drop-shadow-[0_0_16px_rgba(99,102,241,0.2)]" />
          <span className="fless-less-letter">F</span>
          <span className="inline-flex">
            {lessLetters.map((letter, i) => (
              <span
                key={`${letter}-${i}`}
                className="fless-less-letter"
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
