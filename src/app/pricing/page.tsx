"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Check, Plus, Minus } from "lucide-react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { BrandedStage, PhotoTile } from "@/components/BrandedStage"
import { EmailCapture } from "@/components/EmailCapture"
import { departments } from "@/lib/departments"

const plans = [
  {
    name: "Startup",
    blurb: "First markets. Core desks.",
    monthly: 29,
    yearly: 23,
    cta: "Get started",
    href: "/start?plan=startup",
    featured: false,
    features: ["1 workspace", "3 departments", "100 credits / mo", "Community support"],
  },
  {
    name: "Pro",
    blurb: "The full team, live.",
    monthly: 79,
    yearly: 63,
    cta: "Get started",
    href: "/start?plan=pro",
    featured: true,
    features: ["3 workspaces", "All 8 departments", "1,000 credits / mo", "Priority support", "Automations"],
  },
  {
    name: "Scale",
    blurb: "Multi-entity, more volume.",
    monthly: 199,
    yearly: 159,
    cta: "Get started",
    href: "/start?plan=scale",
    featured: false,
    features: ["10 workspaces", "All departments", "5,000 credits / mo", "SSO ready", "Shared inbox"],
  },
  {
    name: "Enterprise",
    blurb: "Regions, reviews, a named team.",
    monthly: null,
    yearly: null,
    cta: "Talk to us",
    href: "/contact",
    featured: false,
    features: ["Unlimited workspaces", "Private region", "Unlimited credits", "DPA & SOC 2 pack", "Named CSM"],
  },
]

const rows = [
  { label: "Departments", values: ["3", "8", "8", "8"] },
  { label: "Workspaces", values: ["1", "3", "10", "Unlimited"] },
  { label: "Credits / month", values: ["100", "1,000", "5,000", "Unlimited"] },
  { label: "Automations", values: [false, true, true, true] },
  { label: "SSO & audit log", values: [false, false, true, true] },
  { label: "Named account team", values: [false, false, false, true] },
]

const faqs = [
  { q: "Can we change plans?", a: "Yes. Upgrade, add departments, or cancel from billing. Changes take effect on the next cycle unless you upgrade immediately." },
  { q: "What happens if we run out of credits?", a: "Work pauses on that desk until the next cycle, or you add a pack. Nothing is deleted." },
  { q: "Setup fees?", a: "None. You pay the plan. Enterprise may include a scoped rollout." },
  { q: "Refunds?", a: "14 days on a new paid subscription if Fless isn’t the fit." },
  { q: "Is data used to train models?", a: "No. Your workspace is yours. We don’t train public models on your files." },
]

export default function PricingPage() {
  const [annual, setAnnual] = useState(false)
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Header activePage="pricing" />
      <main className="flex-1 pt-24 md:pt-28">
        <section className="max-w-[1200px] mx-auto px-6 pb-12 md:pb-16">
          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-7">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary mb-4"
              >
                Pricing
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl sm:text-5xl lg:text-[56px] font-display font-semibold tracking-tight leading-[1.06] text-foreground"
              >
                Pay for the desks
                <br />
                you turn on.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 }}
                className="mt-5 text-[16px] text-muted-foreground max-w-lg leading-relaxed"
              >
                Start with three departments. Add the rest when the work shows up. Same product in every market.
              </motion.p>
              <div className="mt-8">
                <EmailCapture source="pricing" extra={{ plan: "pro" }} />
              </div>
            </div>
            <div className="lg:col-span-5">
              <BrandedStage
                image="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&auto=format&fit=crop&q=80"
                alt="Teams running Fless across offices"
                label="Billing · live"
                rows={[
                  { title: "Pro", line: "8 desks · 3 workspaces", time: "Now" },
                  { title: "Credits", line: "1,000 remaining this cycle", time: "Mo" },
                ]}
                compact
                className="aspect-[16/10] rounded-2xl"
              />
            </div>
          </div>

          <div className="mt-10 flex items-center gap-3">
            <span className={`text-sm ${!annual ? "text-foreground" : "text-muted-foreground"}`}>Monthly</span>
            <button
              type="button"
              onClick={() => setAnnual(!annual)}
              className={`w-11 h-6 rounded-full relative transition-colors ${annual ? "bg-primary" : "bg-secondary border border-border"}`}
              aria-label="Toggle yearly billing"
            >
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${annual ? "translate-x-5" : ""}`} />
            </button>
            <span className={`text-sm ${annual ? "text-foreground" : "text-muted-foreground"}`}>Yearly</span>
            <span className="text-[12px] text-muted-foreground">Save 20%</span>
          </div>
        </section>

        <section className="max-w-[1200px] mx-auto px-6 pb-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border/70 rounded-2xl overflow-hidden border border-border/70">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
                className={`p-6 md:p-8 flex flex-col ${plan.featured ? "bg-primary text-primary-foreground" : "bg-background"}`}
              >
                <div className="text-[11px] font-medium uppercase tracking-wider opacity-60 mb-3">
                  {plan.featured ? "Most teams" : plan.name}
                </div>
                <h2 className="text-xl font-display font-semibold tracking-tight">{plan.featured ? plan.name : plan.name}</h2>
                <p className={`text-sm mt-1 mb-6 ${plan.featured ? "text-white/75" : "text-muted-foreground"}`}>{plan.blurb}</p>
                <div className="mb-6">
                  {plan.monthly == null ? (
                    <div className="text-3xl font-display font-semibold tracking-tight">Custom</div>
                  ) : (
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-display font-semibold tracking-tight tabular-nums">
                        ${annual ? plan.yearly : plan.monthly}
                      </span>
                      <span className={`text-sm ${plan.featured ? "text-white/65" : "text-muted-foreground"}`}>/mo</span>
                    </div>
                  )}
                </div>
                <Link
                  href={plan.href}
                  className={`inline-flex h-10 items-center justify-center rounded-full text-sm font-medium mb-8 ${
                    plan.featured
                      ? "bg-white text-primary hover:bg-white/90"
                      : "border border-border hover:bg-secondary/60"
                  }`}
                >
                  {plan.cta}
                </Link>
                <ul className="space-y-2.5 mt-auto">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-[13px]">
                      <Check className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="max-w-[1200px] mx-auto px-6 py-16 md:py-24">
          <h2 className="text-2xl md:text-3xl font-display font-semibold tracking-tight mb-8">Compare</h2>
          <div className="overflow-x-auto rounded-2xl border border-border/70">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-border/60 bg-secondary/40">
                  <th className="p-4 font-medium w-[32%]"> </th>
                  {plans.map((p) => (
                    <th key={p.name} className="p-4 font-medium text-center">{p.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {rows.map((row) => (
                  <tr key={row.label}>
                    <td className="p-4 text-muted-foreground">{row.label}</td>
                    {row.values.map((v, i) => (
                      <td key={i} className="p-4 text-center">
                        {typeof v === "boolean" ? (
                          v ? <Check className="w-4 h-4 mx-auto" /> : <span className="text-muted-foreground/40">—</span>
                        ) : (
                          v
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="max-w-[1200px] mx-auto px-6 pb-16 md:pb-24">
          <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary mb-3">Departments</p>
          <h2 className="text-2xl md:text-3xl font-display font-semibold tracking-tight mb-8 max-w-lg">
            Add a desk when you need it. Same product.
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {departments.map((d) => (
              <Link key={d.slug} href={`/departments/${d.slug}`} className="group">
                <PhotoTile
                  image={d.hero}
                  alt={d.name}
                  title={d.name}
                  live={d.activity[0]?.title}
                  className="aspect-[5/4] rounded-xl mb-2"
                />
                <p className="text-[12px] text-muted-foreground">{d.line}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="max-w-[1200px] mx-auto px-6 pb-24 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <h2 className="text-2xl md:text-3xl font-display font-semibold tracking-tight mb-3">Questions</h2>
            <p className="text-sm text-muted-foreground mb-6">Procurement, credits, and how desks turn on.</p>
            <Link href="/contact" className="text-sm font-medium inline-flex items-center gap-1 hover:opacity-70">
              Contact <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="lg:col-span-8 divide-y divide-border/60 border-y border-border/60">
            {faqs.map((faq, i) => (
              <button
                key={faq.q}
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left py-5"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[15px] font-medium">{faq.q}</span>
                  {open === i ? <Minus className="w-4 h-4 shrink-0" /> : <Plus className="w-4 h-4 shrink-0" />}
                </div>
                {open === i && <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{faq.a}</p>}
              </button>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
