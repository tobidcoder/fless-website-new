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

const lessLetters = ["L", "E", "S", "S"]

type FooterLink = { label: string; href: string; badge?: "live" | "early"; accent?: boolean }

// Labels are keys in messages/<locale>.json under "footer".
const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: "categories",
    links: [
      { label: "deptMarketing", href: "/departments/marketing", badge: "live" },
      { label: "deptVoice", href: "/departments/voice", badge: "early" },
      { label: "deptSales", href: "/departments/sales", badge: "early" },
      { label: "deptSupport", href: "/departments/support", badge: "early" },
      { label: "deptOperations", href: "/departments/operations", badge: "early" },
      { label: "deptFinance", href: "/departments/finance", badge: "early" },
      { label: "deptRecruitment", href: "/departments/recruitment", badge: "early" },
      { label: "deptHr", href: "/departments/hr", badge: "early" },
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
      { label: "applyBuilder", href: "/builders#apply" },
    ],
  },
  {
    title: "platform",
    links: [
      { label: "hire", href: "/hire" },
      { label: "pricing", href: "/pricing" },
      { label: "helpCentre", href: "/docs" },
      { label: "connectingApps", href: "/docs#connecting-apps" },
      { label: "hosting", href: "/docs#hosting" },
      { label: "security", href: "/security" },
    ],
  },
  {
    title: "company",
    links: [
      { label: "investors", href: "/investors" },
      { label: "joinBeta", href: "/start" },
      { label: "support", href: "/contact" },
      { label: "sales", href: "/contact#enterprise" },
      { label: "faq", href: "/#faq" },
    ],
  },
  {
    title: "legal",
    links: [
      { label: "privacy", href: "/privacy" },
      { label: "terms", href: "/terms" },
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
    <footer className="relative overflow-hidden bg-night text-white border-t border-white/[0.08]">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
        {/* TOP CALLOUT BAR: BRAND + BETA SIGNUP + NVIDIA BADGE + STATUS */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 py-14 md:py-16 border-b border-white/[0.08]">
          <div className="max-w-lg space-y-4">
            <FlessLogo inverted className="mb-3" />
            <h2 className="text-3xl sm:text-4xl font-display font-semibold tracking-tight leading-[1.12]">
              {t("headline1")}
              <br />
              {t("headline2")}
            </h2>
            <p className="text-white/50 text-[14px] sm:text-[15px] leading-relaxed max-w-md">
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

        {/* LINK COLUMNS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-10 py-14 md:py-16">
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-[11px] font-mono font-semibold uppercase tracking-[0.16em] text-white/40 mb-4">
                {t(col.title)}
              </h4>
              <ul className="space-y-2.5 text-[13px] text-white/60">
                {col.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link
                      href={l.href}
                      className={cn(
                        "hover:text-white transition-colors",
                        l.badge && "flex items-center justify-between gap-2",
                        l.accent && "text-primary flex items-center gap-1",
                      )}
                    >
                      {t(l.label)}
                      {l.badge === "live" && <span className="text-[10px] text-emerald-400 font-mono">{t("live")}</span>}
                      {l.badge === "early" && <span className="text-[10px] text-white/40 font-mono">{t("earlyAccess")}</span>}
                      {l.accent && <ArrowUpRight className="w-3 h-3" />}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* BILLING, LANGUAGE AND ENTITY BAR */}
        <div className="py-6 border-t border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-4 text-[12px] text-white/45">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <span className="flex items-start gap-3">
              <Globe className="w-4 h-4 text-primary shrink-0" />
              <span>
                {t("billing")}: <strong className="text-white/80 font-mono">{t("billingLine")}</strong>
              </span>
            </span>
            <LocaleSwitcher variant="dark" />
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t("compliance")}</span>
            </span>
            <span className="hidden sm:inline">•</span>
            <span>{t("entity")}</span>
            <span className="hidden sm:inline">•</span>
            <a href="mailto:hello@getfless.com" className="hover:text-white transition-colors underline underline-offset-2">hello@getfless.com</a>
            <span className="hidden sm:inline">•</span>
            <span>© 2026 Fless</span>
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
