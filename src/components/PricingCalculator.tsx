"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import {
  Calculator,
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
} from "lucide-react"
import { departments } from "@/lib/departments"
import {
  CURRENCIES,
  DEPARTMENT_RATES,
  TENURE_UNITS,
  formatEstimate,
  tenureDiscount,
  type CurrencyCode,
  type TenureUnit,
} from "@/lib/billing"
import { DEPARTMENT_CAPACITY_ESTIMATES, HUMAN_BENCHMARK_MONTHLY_USD } from "@/lib/claims"

const DEPARTMENT_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  marketing: BarChart2,
  voice: Phone,
  sales: DollarSign,
  support: Headphones,
  recruitment: UserCheck,
  operations: Settings,
  finance: CreditCard,
  hr: Briefcase,
  legal: Scale,
}

// Prices from src/lib/billing.ts; capacity and benchmark figures from src/lib/claims.ts.
const departmentSpecs = departments
  .filter((d) => DEPARTMENT_RATES[d.slug])
  .map((d) => ({
    slug: d.slug,
    name: d.name,
    icon: DEPARTMENT_ICONS[d.slug] ?? Briefcase,
    rate: DEPARTMENT_RATES[d.slug],
    capacityOutput: DEPARTMENT_CAPACITY_ESTIMATES[d.slug],
    humanBenchmarkMonthlyUSD: HUMAN_BENCHMARK_MONTHLY_USD[d.slug] ?? 0,
  }))

export function PricingCalculator() {
  const [selectedDeptSlug, setSelectedDeptSlug] = useState<string>("marketing")
  const [employeeQty, setEmployeeQty] = useState<number>(2)
  const [tenureQty, setTenureQty] = useState<number>(1)
  const [tenureUnit, setTenureUnit] = useState<TenureUnit>("month")
  const [includeUsage, setIncludeUsage] = useState<boolean>(true)
  const [currencyCode, setCurrencyCode] = useState<CurrencyCode>("USD")

  const currentSpec = departmentSpecs.find((d) => d.slug === selectedDeptSlug) ?? departmentSpecs[0]
  const deptData = departments.find((d) => d.slug === selectedDeptSlug)

  const discountPercent = useMemo(
    () => tenureDiscount(tenureQty, tenureUnit),
    [tenureQty, tenureUnit]
  )

  const estimate = useMemo(() => {
    const unitRates = currentSpec.rate.baseRateCents[tenureUnit]
    const discountMultiplier = (100 - discountPercent) / 100

    const rawMinCents = unitRates.min * tenureQty * employeeQty
    const rawMaxCents = unitRates.max * tenureQty * employeeQty

    const tenureMinCents = Math.round(rawMinCents * discountMultiplier)
    const tenureMaxCents = Math.round(rawMaxCents * discountMultiplier)

    let usageCents = 0
    if (includeUsage && currentSpec.rate.usage) {
      const unitCost = currentSpec.rate.usage.unitCents
      const qty = currentSpec.rate.usage.defaultQty
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
                Simulate staffing costs, tenure discounts, and output metrics across {departmentSpecs.length} departments.
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
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.code} · {c.label}
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
                {departmentSpecs.map((spec) => {
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
                  {TENURE_UNITS.map((unit) => (
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
            {currentSpec.rate.usage && (
              <div className="p-4 rounded-2xl bg-muted/30 border border-border/60 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-semibold text-foreground">
                    Include Metered Usage ({currentSpec.rate.usage.name})
                  </h4>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    Adds ~{currentSpec.rate.usage.defaultQty} {currentSpec.rate.usage.name.toLowerCase()} per employee cycle.
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
                <span>Illustrative Department Capacity Output</span>
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
                    {formatEstimate(estimate.totalMinCents, currencyCode)} – {formatEstimate(estimate.totalMaxCents, currencyCode)}
                  </div>
                  <p className="text-xs text-primary-foreground/75 mt-1 font-mono">
                    {currencyCode} • {employeeQty} worker{employeeQty > 1 ? "s" : ""} • {tenureQty} {tenureUnit}{tenureQty > 1 ? "s" : ""}
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
                      {formatEstimate(estimate.unitMinCents, currencyCode)} – {formatEstimate(estimate.unitMaxCents, currencyCode)} / {tenureUnit}
                    </span>
                  </div>
                  {discountPercent > 0 && (
                    <div className="flex justify-between text-primary-foreground/80">
                      <span>Tenure Commitment Discount</span>
                      <span className="font-semibold text-emerald-300 font-mono">-{discountPercent}%</span>
                    </div>
                  )}
                  {includeUsage && currentSpec.rate.usage && (
                    <div className="flex justify-between text-primary-foreground/80">
                      <span>Metered Event Add-on</span>
                      <span className="font-semibold text-white font-mono">
                        {formatEstimate(estimate.usageCents, currencyCode)}
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
                    Illustrative human equivalent: <strong>{formatEstimate(estimate.humanBenchmarkCents, currencyCode)}</strong>.
                    Estimated net savings: <strong className="text-emerald-200">{formatEstimate(estimate.netSavingsUSD * 100, currencyCode)}</strong>.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/20 space-y-3">
                <p className="text-[11px] text-white/70 leading-relaxed">
                  Decommission anytime. Eligible unused tenure is refunded pro-rata according to the worker&apos;s contract terms.
                </p>
                <Link
                  href={`/start?department=${currentSpec.slug}&quantity=${employeeQty}&tenureQty=${tenureQty}&tenureUnit=${tenureUnit}&currency=${currencyCode}`}
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
                <span>Estimate in {currencyCode} at indicative exchange rates. Builders set exact listing prices.</span>
              </div>
              <span className="font-mono text-[11px] font-semibold text-primary">{currencyCode}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
