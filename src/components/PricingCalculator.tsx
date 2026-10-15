"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { PLANS, formatMoney, type PlanId } from "@/lib/billing"

const field =
  "w-full h-11 px-3 rounded-xl border border-border bg-background text-foreground text-base sm:text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/25"

const pricedPlans = PLANS.filter((p) => p.monthly && p.includedCreditsUsd != null)

/**
 * Monthly estimate in USD: plan + marketplace employees + work credits beyond the plan's allowance.
 * `suggestedEmployeePrice` is the median monthly price of live marketplace employees, when known.
 */
export function PricingCalculator({ suggestedEmployeePrice }: { suggestedEmployeePrice: number | null }) {
  const t = useTranslations("pricing")
  const [planId, setPlanId] = useState<PlanId>("starter")
  const [employees, setEmployees] = useState(1)
  const [employeePrice, setEmployeePrice] = useState(suggestedEmployeePrice ?? 99)
  const [credits, setCredits] = useState(30)

  const plan = pricedPlans.find((p) => p.id === planId) ?? pricedPlans[1]
  const planCost = plan.monthly?.USD ?? 0
  const included = plan.includedCreditsUsd ?? 0
  const extraCredits = Math.max(0, credits - included)
  const employeesCost = employees * employeePrice
  const total = planCost + employeesCost + extraCredits

  const rows: [string, string][] = [
    [`${t("calcPlanLine")}: ${plan.name}`, formatMoney(planCost, "USD")],
    [`${t("calcEmployeesLine")} (${employees} × ${formatMoney(employeePrice, "USD")})`, formatMoney(employeesCost, "USD")],
    [`${t("calcIncluded")}: ${formatMoney(included, "USD")} · ${t("calcExtra")}`, formatMoney(extraCredits, "USD")],
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      <div className="space-y-5">
        <label className="block">
          <span className="block text-[13px] font-medium mb-2">{t("calcPlan")}</span>
          <select value={planId} onChange={(e) => setPlanId(e.target.value as PlanId)} className={field}>
            {pricedPlans.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} · {p.monthly?.USD ? formatMoney(p.monthly.USD, "USD") : t("free")}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="flex justify-between text-[13px] font-medium mb-2">
            {t("calcEmployees")} <span className="tabular-nums">{employees}</span>
          </span>
          <input type="range" min={0} max={20} value={employees} onChange={(e) => setEmployees(Number(e.target.value))} className="w-full accent-primary" />
        </label>
        <label className="block">
          <span className="block text-[13px] font-medium mb-2">{t("calcEmployeePrice")}</span>
          <input
            type="number"
            min={0}
            step={1}
            inputMode="numeric"
            value={employeePrice}
            onChange={(e) => setEmployeePrice(Math.max(0, Number(e.target.value) || 0))}
            className={field}
          />
        </label>
        <label className="block">
          <span className="flex justify-between text-[13px] font-medium mb-2">
            {t("calcCredits")} <span className="tabular-nums">{formatMoney(credits, "USD")}</span>
          </span>
          <input type="range" min={0} max={1000} step={5} value={credits} onChange={(e) => setCredits(Number(e.target.value))} className="w-full accent-primary" />
        </label>
      </div>

      <div className="rounded-2xl border border-border/80 p-6 self-start">
        <dl className="divide-y divide-border/70">
          {rows.map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-4 py-3 text-[14px]">
              <dt className="text-muted-foreground">{k}</dt>
              <dd className="tabular-nums font-medium">{v}</dd>
            </div>
          ))}
          <div className="flex items-baseline justify-between gap-4 pt-4">
            <dt className="text-[15px] font-semibold">{t("calcTotal")}</dt>
            <dd className="text-[28px] font-display font-semibold tracking-tight tabular-nums">
              {formatMoney(total, "USD")}
              <span className="text-[13px] font-normal text-muted-foreground"> {t("perMonth")}</span>
            </dd>
          </div>
        </dl>
        <p className="mt-4 text-[12px] text-muted-foreground leading-relaxed">{t("calcNote")}</p>
      </div>
    </div>
  )
}
