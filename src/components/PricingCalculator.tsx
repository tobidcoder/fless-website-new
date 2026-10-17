"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import {
  Calculator,
  Clock,
  Users,
  ShieldCheck,
  TrendingDown,
  Plus,
  Minus,
  Globe,
  Activity,
  ArrowRight,
  BarChart2,
  Phone,
  DollarSign,
  Headphones,
  UserCheck,
  Settings,
  CreditCard,
  Briefcase,
  Scale,
  Zap,
} from "lucide-react"
import { departments } from "@/lib/departments"

export type TenureUnit = "hour" | "day" | "week" | "month" | "year"
export type CurrencyCode = "USD" | "NGN" | "GBP" | "EUR" | "KES" | "GHS" | "ZAR" | "AED"

export interface CurrencyConfig {
  code: CurrencyCode
  symbol: string
  name: string
  rate: number
  flag: string
}

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  USD: { code: "USD", symbol: "$", name: "United States (USD)", rate: 1.0, flag: "🇺🇸" },
  NGN: { code: "NGN", symbol: "₦", name: "Nigeria (NGN)", rate: 1500, flag: "🇳🇬" },
  GBP: { code: "GBP", symbol: "£", name: "United Kingdom (GBP)", rate: 0.79, flag: "🇬🇧" },
  EUR: { code: "EUR", symbol: "€", name: "Eurozone (EUR)", rate: 0.92, flag: "🇪🇺" },
  KES: { code: "KES", symbol: "KSh ", name: "Kenya (KES)", rate: 129, flag: "🇰🇪" },
  GHS: { code: "GHS", symbol: "GH₵ ", name: "Ghana (GHS)", rate: 15.4, flag: "🇬🇭" },
  ZAR: { code: "ZAR", symbol: "R ", name: "South Africa (ZAR)", rate: 18.1, flag: "🇿🇦" },
  AED: { code: "AED", symbol: "AED ", name: "UAE & Gulf (AED)", rate: 3.67, flag: "🇦🇪" },
}

export interface DepartmentPricingSpec {
  slug: string
  name: string
  icon: React.ComponentType<{ className?: string }>
  humanBenchmarkMonthlyUSD: number
  capacityOutput: string
  baseRateCents: {
    hour: { min: number; max: number }
    day: { min: number; max: number }
    week: { min: number; max: number }
    month: { min: number; max: number }
    year: { min: number; max: number }
  }
  hasUsageAddon?: boolean
  usageName?: string
  usageUnitCents?: number
  defaultUsageQty?: number
}

export const departmentSpecs: Record<string, DepartmentPricingSpec> = {
  marketing: {
    slug: "marketing",
    name: "Marketing",
    icon: BarChart2,
    humanBenchmarkMonthlyUSD: 5200,
    capacityOutput: "~140 SEO articles, 450 social posts & daily Meta ad audits",
    baseRateCents: {
      hour: { min: 3500, max: 5500 },
      day: { min: 14000, max: 22000 },
      week: { min: 55000, max: 88000 },
      month: { min: 160000, max: 250000 },
      year: { min: 1600000, max: 2500000 },
    },
    hasUsageAddon: true,
    usageName: "Content Packs",
    usageUnitCents: 10,
    defaultUsageQty: 500,
  },
  voice: {
    slug: "voice",
    name: "Voice",
    icon: Phone,
    humanBenchmarkMonthlyUSD: 4100,
    capacityOutput: "~1,200 inbound calls handled, low-latency streaming audio, zero hold times",
    baseRateCents: {
      hour: { min: 2500, max: 4500 },
      day: { min: 10000, max: 18000 },
      week: { min: 40000, max: 70000 },
      month: { min: 120000, max: 200000 },
      year: { min: 1200000, max: 2000000 },
    },
    hasUsageAddon: true,
    usageName: "Telephony Minutes",
    usageUnitCents: 5,
    defaultUsageQty: 1000,
  },
  sales: {
    slug: "sales",
    name: "Sales",
    icon: DollarSign,
    humanBenchmarkMonthlyUSD: 5800,
    capacityOutput: "~850 inbound leads enriched, 100% CRM sync, 160 bookings",
    baseRateCents: {
      hour: { min: 4000, max: 6500 },
      day: { min: 16000, max: 26000 },
      week: { min: 64000, max: 100000 },
      month: { min: 180000, max: 300000 },
      year: { min: 1800000, max: 3000000 },
    },
  },
  support: {
    slug: "support",
    name: "Support",
    icon: Headphones,
    humanBenchmarkMonthlyUSD: 3800,
    capacityOutput: "~3,200 tickets resolved across WhatsApp & web, 99.4% CSAT",
    baseRateCents: {
      hour: { min: 2000, max: 3500 },
      day: { min: 8000, max: 14000 },
      week: { min: 32000, max: 56000 },
      month: { min: 100000, max: 160000 },
      year: { min: 1000000, max: 1600000 },
    },
    hasUsageAddon: true,
    usageName: "Resolved Tickets",
    usageUnitCents: 8,
    defaultUsageQty: 800,
  },
  recruitment: {
    slug: "recruitment",
    name: "Recruitment",
    icon: UserCheck,
    humanBenchmarkMonthlyUSD: 4900,
    capacityOutput: "~450 candidate profiles scored, 60 screening calls locked",
    baseRateCents: {
      hour: { min: 3500, max: 5500 },
      day: { min: 14000, max: 22000 },
      week: { min: 56000, max: 88000 },
      month: { min: 160000, max: 240000 },
      year: { min: 1600000, max: 2400000 },
    },
  },
  operations: {
    slug: "operations",
    name: "Operations",
    icon: Settings,
    humanBenchmarkMonthlyUSD: 4600,
    capacityOutput: "~500 team dispatches, internal Slack escalation, project logs",
    baseRateCents: {
      hour: { min: 3000, max: 5000 },
      day: { min: 12000, max: 20000 },
      week: { min: 48000, max: 80000 },
      month: { min: 140000, max: 220000 },
      year: { min: 1400000, max: 2200000 },
    },
  },
  finance: {
    slug: "finance",
    name: "Finance",
    icon: CreditCard,
    humanBenchmarkMonthlyUSD: 6200,
    capacityOutput: "~700 PDF invoices scanned, zero OCR errors, automated GL sync",
    baseRateCents: {
      hour: { min: 4500, max: 7500 },
      day: { min: 18000, max: 30000 },
      week: { min: 72000, max: 120000 },
      month: { min: 200000, max: 350000 },
      year: { min: 2000000, max: 3500000 },
    },
  },
  hr: {
    slug: "hr",
    name: "HR",
    icon: Briefcase,
    humanBenchmarkMonthlyUSD: 4200,
    capacityOutput: "~90 employee onboarding workflows, instant handbook answers",
    baseRateCents: {
      hour: { min: 2500, max: 4500 },
      day: { min: 10000, max: 18000 },
      week: { min: 40000, max: 72000 },
      month: { min: 120000, max: 200000 },
      year: { min: 1200000, max: 2000000 },
    },
  },
  legal: {
    slug: "legal",
    name: "Legal",
    icon: Scale,
    humanBenchmarkMonthlyUSD: 7500,
    capacityOutput: "~120 contracts triaged and tracked, renewals flagged weeks ahead",
    baseRateCents: {
      hour: { min: 4500, max: 8000 },
      day: { min: 18000, max: 32000 },
      week: { min: 72000, max: 128000 },
      month: { min: 220000, max: 380000 },
      year: { min: 2200000, max: 3800000 },
    },
  },
}

export function calculateDiscount(qty: number, unit: TenureUnit): number {
  if (unit === "year") {
    if (qty >= 10) return 35
    if (qty >= 5) return 30
    if (qty >= 1) return 25
  } else if (unit === "month") {
    if (qty >= 12) return 25
    if (qty >= 6) return 20
    if (qty >= 3) return 15
  } else if (unit === "week") {
    if (qty >= 4) return 12
    if (qty >= 2) return 10
  } else if (unit === "day") {
    if (qty >= 10) return 8
    if (qty >= 5) return 5
  }
  return 0
}

export function formatLocalizedPrice(centsUSD: number, currency: CurrencyConfig): string {
  const converted = (centsUSD / 100) * currency.rate
  return `${currency.symbol}${Math.round(converted).toLocaleString()}`
}

export function PricingCalculator() {
  const [selectedDeptSlug, setSelectedDeptSlug] = useState<string>("marketing")
  const [employeeQty, setEmployeeQty] = useState<number>(2)
  const [tenureQty, setTenureQty] = useState<number>(1)
  const [tenureUnit, setTenureUnit] = useState<TenureUnit>("month")
  const [includeUsage, setIncludeUsage] = useState<boolean>(true)
  const [currencyCode, setCurrencyCode] = useState<CurrencyCode>("USD")

  const activeCurrency = CURRENCIES[currencyCode] || CURRENCIES.USD
  const currentSpec = departmentSpecs[selectedDeptSlug] || departmentSpecs.marketing
  const deptData = departments.find((d) => d.slug === selectedDeptSlug)

  const discountPercent = useMemo(
    () => calculateDiscount(tenureQty, tenureUnit),
    [tenureQty, tenureUnit]
  )

  const estimate = useMemo(() => {
    const unitRates = currentSpec.baseRateCents[tenureUnit]
    const discountMultiplier = (100 - discountPercent) / 100

    const rawMinCents = unitRates.min * tenureQty * employeeQty
    const rawMaxCents = unitRates.max * tenureQty * employeeQty

    const tenureMinCents = Math.round(rawMinCents * discountMultiplier)
    const tenureMaxCents = Math.round(rawMaxCents * discountMultiplier)

    let usageCents = 0
    if (includeUsage && currentSpec.hasUsageAddon) {
      const unitCost = currentSpec.usageUnitCents || 0
      const qty = currentSpec.defaultUsageQty || 0
      usageCents = unitCost * qty * tenureQty * employeeQty
    }

    const totalMinCents = tenureMinCents + usageCents
    const totalMaxCents = tenureMaxCents + usageCents

    let tenureMonths = 1
    if (tenureUnit === "hour") tenureMonths = tenureQty / 160
    else if (tenureUnit === "day") tenureMonths = tenureQty / 20
    else if (tenureUnit === "week") tenureMonths = tenureQty / 4
    else if (tenureUnit === "month") tenureMonths = tenureQty
    else if (tenureUnit === "year") tenureMonths = tenureQty * 12

    const humanBenchmarkTotalUSD = Math.round(currentSpec.humanBenchmarkMonthlyUSD * tenureMonths * employeeQty)
    const humanBenchmarkCents = humanBenchmarkTotalUSD * 100

    const averageFlessUSD = Math.round(((totalMinCents + totalMaxCents) / 2) / 100)
    const netSavingsUSD = Math.max(0, humanBenchmarkTotalUSD - averageFlessUSD)
    const savingsPercentage = humanBenchmarkTotalUSD > 0 ? Math.round((netSavingsUSD / humanBenchmarkTotalUSD) * 100) : 60

    return {
      tenureMinCents,
      tenureMaxCents,
      usageCents,
      totalMinCents,
      totalMaxCents,
      humanBenchmarkCents,
      netSavingsUSD,
      savingsPercentage,
      unitMinCents: Math.round(totalMinCents / (tenureQty * employeeQty)),
      unitMaxCents: Math.round(totalMaxCents / (tenureQty * employeeQty)),
    }
  }, [currentSpec, tenureUnit, tenureQty, employeeQty, discountPercent, includeUsage])

  const tenurePresetOptions: Array<{ label: string; qty: number; unit: TenureUnit }> = [
    { label: "10 Hours", qty: 10, unit: "hour" },
    { label: "10 Days", qty: 10, unit: "day" },
    { label: "10 Weeks", qty: 10, unit: "week" },
    { label: "6 Months", qty: 6, unit: "month" },
    { label: "1 Year", qty: 1, unit: "year" },
    { label: "5 Years", qty: 5, unit: "year" },
  ]

  return (
    <section className="max-w-[1240px] mx-auto px-4 sm:px-6 pb-16">
      <div className="bg-card border border-border/80 rounded-3xl p-5 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden">
        {/* HEADER & CURRENCY PICKER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-border/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-display font-semibold text-foreground">
                Workforce Capacity & Cost Calculator
              </h2>
              <p className="text-xs text-muted-foreground">
                Simulate staffing costs, tenure discounts, and output metrics across 9 departments.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-muted/60 p-1.5 rounded-2xl border border-border/60 self-start sm:self-auto">
            <Globe className="w-4 h-4 text-muted-foreground ml-2 shrink-0" />
            <span className="text-[11px] font-mono text-muted-foreground mr-1 hidden sm:inline">Currency:</span>
            <select
              value={currencyCode}
              onChange={(e) => setCurrencyCode(e.target.value as CurrencyCode)}
              className="bg-background text-foreground text-xs font-mono font-semibold px-2.5 py-1.5 rounded-xl border border-border/80 focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
            >
              {Object.values(CURRENCIES).map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.code} ({c.symbol.trim()})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* CONTROLS */}
          <div className="lg:col-span-7 space-y-7">
            {/* 1. DEPARTMENT SELECTOR */}
            <div>
              <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                1. Select Department
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {Object.values(departmentSpecs).map((spec) => {
                  const Icon = spec.icon
                  const isSelected = selectedDeptSlug === spec.slug
                  return (
                    <button
                      key={spec.slug}
                      type="button"
                      onClick={() => setSelectedDeptSlug(spec.slug)}
                      className={`flex items-center gap-2 p-2.5 rounded-xl border text-left transition-all text-xs font-medium ${
                        isSelected
                          ? "bg-primary text-primary-foreground border-primary shadow-sm font-semibold"
                          : "bg-muted/40 hover:bg-muted/80 text-foreground border-border/60"
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span className="truncate">{spec.name}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* 2. EMPLOYEE QUANTITY */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">
                  2. Number of AI Employees
                </label>
                <span className="text-xs font-bold font-mono text-primary bg-primary/10 px-2.5 py-0.5 rounded-lg border border-primary/20">
                  {employeeQty} {employeeQty === 1 ? "Worker" : "Workers"}
                </span>
              </div>
              <div className="flex items-center gap-3 bg-muted/40 p-2.5 rounded-2xl border border-border/60">
                <button
                  type="button"
                  onClick={() => setEmployeeQty(Math.max(1, employeeQty - 1))}
                  className="w-9 h-9 rounded-xl bg-background border border-border flex items-center justify-center text-foreground hover:bg-muted transition-colors"
                  aria-label="Decrease employee count"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <input
                  type="range"
                  min="1"
                  max="15"
                  value={employeeQty}
                  onChange={(e) => setEmployeeQty(parseInt(e.target.value) || 1)}
                  className="flex-1 accent-primary cursor-pointer"
                />
                <button
                  type="button"
                  onClick={() => setEmployeeQty(employeeQty + 1)}
                  className="w-9 h-9 rounded-xl bg-background border border-border flex items-center justify-center text-foreground hover:bg-muted transition-colors"
                  aria-label="Increase employee count"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {deptData && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {deptData.employees.slice(0, 3).map((emp) => (
                    <span
                      key={emp.id}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-muted/60 text-[11px] text-muted-foreground border border-border/50"
                    >
                      <Users className="w-3 h-3 text-primary" />
                      {emp.role}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* 3. TENURE DURATION & UNIT */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">
                  3. Tenure Duration & Unit
                </label>
                {discountPercent > 0 && (
                  <span className="text-[11px] font-mono font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                    {discountPercent}% Tenure Discount Applied
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                <div className="sm:col-span-5 flex items-center bg-muted/40 p-1.5 rounded-2xl border border-border/60">
                  <button
                    type="button"
                    onClick={() => setTenureQty(Math.max(1, tenureQty - 1))}
                    className="w-8 h-8 rounded-lg bg-background border border-border flex items-center justify-center text-foreground hover:bg-muted"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={tenureQty}
                    onChange={(e) => setTenureQty(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full text-center bg-transparent font-display font-semibold text-sm focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setTenureQty(tenureQty + 1)}
                    className="w-8 h-8 rounded-lg bg-background border border-border flex items-center justify-center text-foreground hover:bg-muted"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="sm:col-span-7 flex bg-muted/40 p-1 rounded-xl border border-border/60">
                  {(["hour", "day", "week", "month", "year"] as TenureUnit[]).map((unit) => (
                    <button
                      key={unit}
                      type="button"
                      onClick={() => setTenureUnit(unit)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                        tenureUnit === unit
                          ? "bg-background text-foreground shadow-sm font-semibold"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {unit}s
                    </button>
                  ))}
                </div>
              </div>

              {/* QUICK PRESETS */}
              <div className="flex flex-wrap items-center gap-1.5 mt-3">
                <span className="text-[11px] text-muted-foreground mr-1">Presets:</span>
                {tenurePresetOptions.map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => {
                      setTenureQty(p.qty)
                      setTenureUnit(p.unit)
                    }}
                    className={`text-[11px] font-mono px-2.5 py-1 rounded-lg border transition-colors ${
                      tenureQty === p.qty && tenureUnit === p.unit
                        ? "bg-primary/10 border-primary/30 text-primary font-medium"
                        : "bg-background border-border/60 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. METERED USAGE TOGGLE */}
            {currentSpec.hasUsageAddon && (
              <div className="p-4 rounded-2xl bg-muted/30 border border-border/60 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-semibold text-foreground">
                    Include Metered Usage ({currentSpec.usageName})
                  </h4>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    Adds ~{currentSpec.defaultUsageQty} {currentSpec.usageName?.toLowerCase()} per employee cycle.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIncludeUsage(!includeUsage)}
                  className={`w-11 h-6 rounded-full relative transition-colors ${
                    includeUsage ? "bg-primary" : "bg-muted border border-border"
                  }`}
                  aria-label="Toggle metered usage"
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                      includeUsage ? "translate-x-5" : ""
                    }`}
                  />
                </button>
              </div>
            )}

            {/* 5. CAPACITY CARD */}
            <div className="p-4 rounded-2xl bg-primary/[0.04] border border-primary/20 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-primary">
                <Activity className="w-3.5 h-3.5" />
                <span>Estimated Department Capacity Output</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {currentSpec.capacityOutput}
              </p>
            </div>
          </div>

          {/* RIGHT: ESTIMATE CARD */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div className="bg-primary text-primary-foreground rounded-3xl p-6 md:p-8 flex-1 flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center justify-between opacity-80 text-xs font-mono uppercase tracking-wider mb-2">
                  <span>Estimated Workforce Cost</span>
                  <span className="capitalize">{tenureUnit}ly Rate</span>
                </div>

                <div className="mt-2 mb-4">
                  <div className="text-3xl md:text-4xl font-display font-semibold tracking-tight">
                    {formatLocalizedPrice(estimate.totalMinCents, activeCurrency)} – {formatLocalizedPrice(estimate.totalMaxCents, activeCurrency)}
                  </div>
                  <p className="text-xs text-primary-foreground/75 mt-1 font-mono">
                    {activeCurrency.code} • {employeeQty} worker{employeeQty > 1 ? "s" : ""} • {tenureQty} {tenureUnit}{tenureQty > 1 ? "s" : ""}
                  </p>
                </div>

                {/* BREAKDOWN */}
                <div className="py-4 border-y border-white/20 space-y-2.5 text-xs">
                  <div className="flex justify-between text-primary-foreground/80">
                    <span>Department Desk</span>
                    <span className="font-semibold text-white">{currentSpec.name}</span>
                  </div>
                  <div className="flex justify-between text-primary-foreground/80">
                    <span>Unit Rate Range</span>
                    <span className="font-semibold text-white">
                      {formatLocalizedPrice(estimate.unitMinCents, activeCurrency)} – {formatLocalizedPrice(estimate.unitMaxCents, activeCurrency)} / {tenureUnit}
                    </span>
                  </div>
                  {discountPercent > 0 && (
                    <div className="flex justify-between text-primary-foreground/80">
                      <span>Tenure Commitment Discount</span>
                      <span className="font-semibold text-emerald-300 font-mono">-{discountPercent}%</span>
                    </div>
                  )}
                  {includeUsage && currentSpec.hasUsageAddon && (
                    <div className="flex justify-between text-primary-foreground/80">
                      <span>Metered Event Add-on</span>
                      <span className="font-semibold text-white font-mono">
                        {formatLocalizedPrice(estimate.usageCents, activeCurrency)}
                      </span>
                    </div>
                  )}
                </div>

                {/* HUMAN BENCHMARK SAVINGS */}
                <div className="mt-4 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-emerald-300">
                    <span className="flex items-center gap-1.5">
                      <TrendingDown className="w-4 h-4" />
                      <span>Human Benchmark Savings</span>
                    </span>
                    <span className="font-mono text-white text-xs bg-emerald-500/30 px-2 py-0.5 rounded-full border border-emerald-400/40">
                      Save ~{estimate.savingsPercentage}%
                    </span>
                  </div>
                  <p className="text-[11px] text-white/80 leading-relaxed">
                    Traditional human equivalent: <strong>{formatLocalizedPrice(estimate.humanBenchmarkCents, activeCurrency)}</strong>.
                    Estimated net savings: <strong className="text-emerald-200">{formatLocalizedPrice(estimate.netSavingsUSD * 100, activeCurrency)}</strong> with zero recruiter fees or payroll tax overhead.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/20 space-y-3">
                <p className="text-[11px] text-white/70 leading-relaxed">
                  Decommission anytime. Eligible unused tenure is refunded pro-rata according to the worker&apos;s contract terms.
                </p>
                <Link
                  href={`/start?department=${currentSpec.slug}&quantity=${employeeQty}&tenureQty=${tenureQty}&tenureUnit=${tenureUnit}&currency=${activeCurrency.code}`}
                  className="w-full inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white text-primary font-semibold text-sm hover:bg-white/90 transition-all shadow-md"
                >
                  Deploy Workforce Seat <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* LOCAL COMPLIANCE BADGE */}
            <div className="p-3.5 rounded-2xl border border-border/80 bg-muted/40 flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Invoiced in {activeCurrency.code} with localized tax compliance.</span>
              </div>
              <span className="font-mono text-[11px] font-semibold text-primary">{activeCurrency.flag}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
