"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { BrandedStage } from "@/components/BrandedStage"

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
}

const pairs = [
  {
    eyebrow: "Growth",
    title: "Fill the pipeline. Close the work.",
    copy: "Marketing and sales run as one system — campaigns go out, leads come in, follow-ups happen without a handoff.",
    tint: "bg-background",
    departments: [
      {
        id: "marketing",
        name: "Marketing",
        headline: "Campaigns that ship themselves.",
        description: "Briefs become posts, ads, and reports. Your calendar stays full without a 12-tool stack.",
        points: ["Content + social", "SEO drafts", "Ad creative"],
        href: "/departments/marketing",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1400&auto=format&fit=crop&q=80",
      },
      {
        id: "sales",
        name: "Sales",
        headline: "Every lead gets a next step.",
        description: "Research accounts, write outreach, and keep the CRM honest so deals don’t stall in a spreadsheet.",
        points: ["Lead research", "Follow-ups", "Pipeline hygiene"],
        href: "/departments/sales",
        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1400&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    eyebrow: "Customers",
    title: "Answer the phone. Close the ticket.",
    copy: "Voice and support cover the conversations your team can’t be in — calls, chat, email — with a paper trail you can audit.",
    tint: "bg-[#fafafa] dark:bg-secondary",
    departments: [
      {
        id: "voice",
        name: "Voice",
        headline: "A receptionist that never misses.",
        description: "Inbound and outbound calls, qualification, and booking — routed to the right person when it matters.",
        points: ["Inbound / outbound", "Scheduling", "Call notes"],
        href: "/departments/voice",
        image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=1400&auto=format&fit=crop&q=80",
      },
      {
        id: "support",
        name: "Support",
        headline: "Tickets that actually resolve.",
        description: "Triage, draft replies from your knowledge base, and escalate only when a human should step in.",
        points: ["Inbox triage", "Help center", "Escalations"],
        href: "/departments/support",
        image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1400&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    eyebrow: "People",
    title: "Hire faster. Keep the team running.",
    copy: "Recruiting and HR share one record of the person — from first screen to first week — instead of a pile of docs.",
    tint: "bg-background",
    departments: [
      {
        id: "recruiting",
        name: "Recruiting",
        headline: "A shortlist before lunch.",
        description: "Source, screen, and schedule. You meet people who already match the role, not a raw inbox.",
        points: ["Sourcing", "Screening", "Interview ops"],
        href: "/departments/recruitment",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1400&auto=format&fit=crop&q=80",
      },
      {
        id: "hr",
        name: "HR",
        headline: "Onboarding without the scavenger hunt.",
        description: "Policies, equipment, access, and check-ins in one flow so new hires aren’t pinging five people.",
        points: ["Onboarding", "Policies", "Reviews"],
        href: "/departments/hr",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    eyebrow: "Operations",
    title: "Keep the company moving.",
    copy: "Operations and finance sit on the same work: approvals, vendors, invoices, and a clear picture of what you owe.",
    tint: "bg-[#fafafa] dark:bg-secondary",
    departments: [
      {
        id: "operations",
        name: "Operations",
        headline: "Workflows you can see.",
        description: "Projects, docs, and handoffs with owners and due dates — not a Slack thread that goes quiet.",
        points: ["Projects", "Approvals", "Reporting"],
        href: "/departments/operations",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1400&auto=format&fit=crop&q=80",
      },
      {
        id: "finance",
        name: "Finance",
        headline: "Books that don’t wait until Friday.",
        description: "Invoices go out, expenses get coded, and forecasts stay current without a month-end scramble.",
        points: ["Invoicing", "Expenses", "Forecasts"],
        href: "/departments/finance",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1400&auto=format&fit=crop&q=80",
      },
    ],
  },
]

export function DepartmentShowcases() {
  return (
    <div>
      {pairs.map((pair) => (
        <section
          key={pair.eyebrow}
          className={`relative py-24 md:py-32 border-t border-border/60 overflow-hidden ${pair.tint}`}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-[0.12] [background-image:linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]"
          />

          <div className="max-w-[1120px] mx-auto px-6 relative">
            <motion.p
              {...fadeUp}
              className="text-[11px] font-semibold tracking-[0.18em] uppercase text-primary mb-4"
            >
              {pair.eyebrow}
            </motion.p>
            <motion.h2
              {...fadeUp}
              transition={{ delay: 0.05 }}
              className="text-3xl sm:text-4xl md:text-[44px] font-display font-semibold tracking-tight text-foreground max-w-2xl leading-[1.15]"
            >
              {pair.title}
            </motion.h2>
            <motion.p
              {...fadeUp}
              transition={{ delay: 0.1 }}
              className="mt-4 text-[15px] md:text-base text-muted-foreground max-w-xl leading-relaxed"
            >
              {pair.copy}
            </motion.p>

            <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              {pair.departments.map((dept, i) => (
                <motion.article
                  key={dept.id}
                  id={dept.id}
                  {...fadeUp}
                  transition={{ delay: 0.08 + i * 0.08, duration: 0.5 }}
                  className="group scroll-mt-28 flex flex-col rounded-2xl border border-border/70 bg-background overflow-hidden shadow-[0_1px_0_rgba(0,0,0,0.04)] hover:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.18)] hover:border-border transition-shadow duration-500"
                >
                  <BrandedStage image={dept.image} alt={dept.name} className="h-[220px] sm:h-[260px]" />
                  <div className="p-6 md:p-8 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                        {dept.name}
                      </span>
                      <span className={cn(
                        "text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded",
                        dept.id === "marketing"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : "bg-muted text-muted-foreground"
                      )}>
                        {dept.id === "marketing" ? "Live" : "Early access"}
                      </span>
                    </div>
                    <h3 className="text-xl md:text-[22px] font-display font-semibold tracking-tight text-foreground mb-2">
                      {dept.headline}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                      {dept.description}
                    </p>
                    <ul className="flex flex-wrap gap-2 mb-6">
                      {dept.points.map((point) => (
                        <li
                          key={point}
                          className="text-[11px] font-medium text-foreground/80 px-2.5 py-1 rounded-full border border-border bg-secondary/40"
                        >
                          {point}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={dept.href}
                      className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all"
                    >
                      Explore {dept.name}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  )
}
