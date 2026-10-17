"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { StayInForm } from "@/components/StayInForm"
import { FlessLogo, SparkleMark } from "@/components/FlessLogo"
import { NvidiaInceptionBadge } from "@/components/NvidiaInceptionBadge"
import { LocaleSwitcher } from "@/components/LocaleSwitcher"
import { Globe, ShieldCheck, ArrowUpRight } from "lucide-react"
import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"
import { BUILDER_SHARE } from "@/lib/billing"

const lessLetters = ["L", "E", "S", "S"]

type FooterLink = { label: string; href: string; badge?: "live" | "early"; accent?: boolean }

// Labels are keys in messages/<locale>.json under "footer".
const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: "departments",
    links: [
      { label: "deptMarketing", href: "/departments/marketing", badge: "live" },
      { label: "deptVoice", href: "/departments/voice", badge: "early" },
      { label: "deptSales", href: "/departments/sales", badge: "early" },
      { label: "deptSupport", href: "/departments/support", badge: "early" },
      { label: "deptOperations", href: "/departments/operations", badge: "early" },
      { label: "deptFinance", href: "/departments/finance", badge: "early" },
      { label: "deptRecruitment", href: "/departments/recruitment", badge: "early" },
      { label: "deptHr", href: "/departments/hr", badge: "early" },
      { label: "deptLegal", href: "/departments/legal", badge: "early" },
    ],
  },
  {
    title: "solutions",
    links: [
      { label: "forStartups", href: "/solutions/startup" },
      { label: "growingTeams", href: "/solutions/smb" },
      { label: "enterprise", href: "/solutions/enterprise" },
      { label: "healthcare", href: "/solutions/healthcare" },
      { label: "retail", href: "/solutions/retail" },
      { label: "financialServices", href: "/solutions/finance" },
      { label: "education", href: "/solutions/education" },
      { label: "allIndustries", href: "/industries", accent: true },
    ],
  },
  {
    title: "builders",
    links: [
      { label: "builderProgram", href: "/builders" },
      { label: "buildEmployee", href: "/build" },
      { label: "studioGuide", href: "/docs#studio" },
      { label: "publishing", href: "/docs#publishing" },
      { label: "earnings", href: "/docs#payouts" },
      { label: "connectedApps", href: "/docs#connecting-apps" },
      { label: "applyBuilder", href: "/builders#apply" },
    ],
  },
  {
    title: "platform",
    links: [
      { label: "hire", href: "/hire" },
      { label: "pricing", href: "/pricing" },
      { label: "calculator", href: "/pricing#calculator" },
      { label: "helpCentre", href: "/docs" },
      { label: "hosting", href: "/docs#hosting" },
      { label: "security", href: "/security" },
      { label: "complianceLink", href: "/security#compliance" },
    ],
  },
  {
    title: "company",
    links: [
      { label: "about", href: "/contact" },
      { label: "joinBeta", href: "/start" },
      { label: "support", href: "/contact" },
      { label: "sales", href: "/contact#enterprise" },
      { label: "partners", href: "/builders#apply" },
      { label: "faq", href: "/#faq" },
    ],
  },
  {
    title: "legal",
    links: [
      { label: "privacy", href: "/privacy" },
      { label: "terms", href: "/terms" },
      { label: "securityOverview", href: "/security" },
      { label: "dataDeletion", href: "/data-deletion" },
      { label: "cancellation", href: "/terms#cancellation" },
      { label: "retention", href: "/privacy#data-retention" },
    ],
  },
]

export function Footer() {
  const reduce = useReducedMotion()
  const t = useTranslations("footer")

  return (
    <footer className="relative overflow-hidden bg-[#07090F] text-white border-t border-white/[0.08]">
      <div className="max-w-[1240px] mx-auto px-6">

        {/* ── TOP BAR: BRAND + BETA SIGNUP + NVIDIA INCEPTION BADGE ── */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 py-12 md:py-16 border-b border-white/[0.08]">
          <div className="max-w-lg space-y-3.5">
            <FlessLogo inverted className="mb-2" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-semibold tracking-tight text-white leading-tight">
              {t("headline1")}
              <br />
              {t("headline2")}
            </h2>
            <p className="text-white/60 text-sm leading-relaxed max-w-md">
              {t("tagline")}
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
          {columns.map((col) => (
            <div key={col.title} className="space-y-4">
              <h4 className="text-[12px] font-mono font-semibold uppercase tracking-[0.16em] text-white/40">
                {t(col.title)}
              </h4>
              <ul className="space-y-2.5 text-[13px] text-white/65">
                {col.links.map((l) => (
                  <li key={l.href + l.label} className={cn(l.accent && "pt-1")}>
                    <Link
                      href={l.href}
                      className={cn(
                        "hover:text-white transition-colors",
                        l.accent
                          ? "text-primary inline-flex items-center gap-1 font-medium"
                          : "block py-0.5",
                        l.badge && "flex items-center justify-between gap-2",
                      )}
                    >
                      {t(l.label, { share: BUILDER_SHARE })}
                      {l.badge === "live" && <span className="text-[10px] text-emerald-400 font-mono">{t("live")}</span>}
                      {l.badge === "early" && <span className="text-[10px] text-white/40 font-mono">{t("earlyAccess")}</span>}
                      {l.accent && <ArrowUpRight className="w-3.5 h-3.5" />}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── GLOBAL MULTI-CURRENCY BILLING BAR ── */}
        <div className="py-5 px-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-white/60">
          <div className="flex items-center gap-2.5">
            <Globe className="w-4 h-4 text-primary shrink-0" />
            <span>
              {t("billing")}:{" "}
              <strong className="text-white font-mono tracking-wide font-medium">
                {t("billingLine")}
              </strong>
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <LocaleSwitcher variant="dark" />
            <div className="flex items-center gap-2 text-white/50">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{t("availability")}</span>
            </div>
          </div>
        </div>

        {/* ── ENTITY, COMPLIANCE & LEGAL BOTTOM BAR ── */}
        <div className="pt-6 pb-12 border-t border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs text-white/50">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 leading-relaxed">
            <span className="flex items-center gap-1.5 text-white/70">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{t("compliance")}</span>
            </span>
            <span className="hidden md:inline text-white/30">•</span>
            <span>{t("entity")}</span>
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
