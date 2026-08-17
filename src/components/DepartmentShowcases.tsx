"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { BrandedStage } from "@/components/BrandedStage"

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
}

function Stage({
  image,
  alt,
  children,
}: {
  image: string
  alt: string
  children: ReactNode
}) {
  return (
    <BrandedStage image={image} alt={alt} className="h-[280px] sm:h-[320px]">
      {children}
    </BrandedStage>
  )
}

function ProductCard({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl border border-white/20 bg-white/95 dark:bg-card/95 backdrop-blur-md shadow-[0_20px_40px_-20px_rgba(0,0,0,0.45)] overflow-hidden">
      {children}
    </div>
  )
}

function MarketingVisual() {
  const posts = [
    { channel: "LinkedIn", status: "Live", time: "2m" },
    { channel: "X", status: "Queued", time: "11:00" },
    { channel: "Instagram", status: "Draft", time: "—" },
  ]
  return (
    <ProductCard>
      <div className="px-3.5 py-2.5 border-b border-black/5 dark:border-white/10 flex items-center justify-between">
        <span className="text-[11px] font-semibold text-neutral-900 dark:text-white">Q3 launch calendar</span>
        <span className="text-[10px] text-emerald-600 font-medium flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Publishing
        </span>
      </div>
      <div className="p-2.5 space-y-1.5">
        {posts.map((post, i) => (
          <motion.div
            key={post.channel}
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.12 }}
            className="flex items-center justify-between rounded-lg bg-neutral-50 dark:bg-white/5 px-2.5 py-2"
          >
            <span className="text-[11px] font-medium text-neutral-800 dark:text-neutral-200">{post.channel}</span>
            <span className="text-[10px] text-neutral-500">{post.status} · {post.time}</span>
          </motion.div>
        ))}
      </div>
    </ProductCard>
  )
}

function SalesVisual() {
  const cols = [
    { name: "New", deals: ["Acme · $12k", "North · $8k"] },
    { name: "Demo", deals: ["Helix · $24k"] },
    { name: "Won", deals: ["Orbit · $41k"] },
  ]
  return (
    <ProductCard>
      <div className="px-3.5 py-2.5 border-b border-black/5 dark:border-white/10 flex items-center justify-between">
        <span className="text-[11px] font-semibold text-neutral-900 dark:text-white">Pipeline</span>
        <span className="text-[10px] font-medium text-neutral-500">$85k this week</span>
      </div>
      <div className="grid grid-cols-3 gap-1.5 p-2.5">
        {cols.map((col, i) => (
          <div key={col.name} className="space-y-1.5">
            <div className="text-[9px] uppercase tracking-wider text-neutral-400 font-semibold px-1">{col.name}</div>
            {col.deals.map((deal, j) => (
              <motion.div
                key={deal}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.1 + j * 0.08 }}
                className="rounded-md bg-neutral-50 dark:bg-white/5 border border-black/5 dark:border-white/10 px-2 py-1.5 text-[10px] font-medium text-neutral-800 dark:text-neutral-200"
              >
                {deal}
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </ProductCard>
  )
}

function VoiceVisual() {
  const lines = [
    { who: "Caller", text: "Can we move Thursday to 3pm?" },
    { who: "Fless", text: "Done. Calendar invite sent." },
  ]
  return (
    <ProductCard>
      <div className="px-3.5 py-2.5 border-b border-black/5 dark:border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[11px] font-semibold text-neutral-900 dark:text-white">Live call · 02:14</span>
        </div>
        <div className="flex items-end gap-[2px] h-4">
          {[4, 8, 5, 11, 6, 9, 4, 7].map((h, i) => (
            <motion.span
              key={i}
              className="w-[3px] rounded-full bg-neutral-900 dark:bg-white"
              animate={{ height: [h, Math.min(h + 6, 16), h] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.08 }}
            />
          ))}
        </div>
      </div>
      <div className="p-3 space-y-2">
        {lines.map((line, i) => (
          <motion.div
            key={line.text}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 + i * 0.2 }}
            className="text-[11px] leading-snug"
          >
            <span className="font-semibold text-neutral-900 dark:text-white">{line.who} </span>
            <span className="text-neutral-500">{line.text}</span>
          </motion.div>
        ))}
      </div>
    </ProductCard>
  )
}

function SupportVisual() {
  const tickets = [
    { id: "#4821", title: "Billing question", state: "Resolved", tone: "text-emerald-600" },
    { id: "#4820", title: "API timeout", state: "In progress", tone: "text-amber-600" },
    { id: "#4819", title: "Seat upgrade", state: "Waiting", tone: "text-neutral-500" },
  ]
  return (
    <ProductCard>
      <div className="px-3.5 py-2.5 border-b border-black/5 dark:border-white/10 flex items-center justify-between">
        <span className="text-[11px] font-semibold text-neutral-900 dark:text-white">Inbox</span>
        <span className="text-[10px] text-neutral-500">First reply 48s</span>
      </div>
      <div className="divide-y divide-black/5 dark:divide-white/10">
        {tickets.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 + i * 0.12 }}
            className="flex items-center justify-between px-3.5 py-2"
          >
            <div className="min-w-0">
              <div className="text-[11px] font-medium text-neutral-900 dark:text-white truncate">{t.title}</div>
              <div className="text-[10px] text-neutral-400">{t.id}</div>
            </div>
            <span className={`text-[10px] font-medium ${t.tone}`}>{t.state}</span>
          </motion.div>
        ))}
      </div>
    </ProductCard>
  )
}

function RecruitingVisual() {
  const people = [
    { name: "Amara K.", role: "Product designer", match: "94%" },
    { name: "James O.", role: "Backend engineer", match: "91%" },
    { name: "Lina M.", role: "Account exec", match: "88%" },
  ]
  return (
    <ProductCard>
      <div className="px-3.5 py-2.5 border-b border-black/5 dark:border-white/10">
        <span className="text-[11px] font-semibold text-neutral-900 dark:text-white">Shortlist · 12 screened</span>
      </div>
      <div className="p-2.5 space-y-1.5">
        {people.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 + i * 0.1 }}
            className="flex items-center justify-between rounded-lg px-2.5 py-2 bg-neutral-50 dark:bg-white/5"
          >
            <div>
              <div className="text-[11px] font-medium text-neutral-900 dark:text-white">{p.name}</div>
              <div className="text-[10px] text-neutral-500">{p.role}</div>
            </div>
            <span className="text-[11px] font-semibold tabular-nums text-neutral-900 dark:text-white">{p.match}</span>
          </motion.div>
        ))}
      </div>
    </ProductCard>
  )
}

function HrVisual() {
  const steps = [
    { label: "Offer signed", done: true },
    { label: "Equipment ordered", done: true },
    { label: "Access provisioned", done: false },
  ]
  return (
    <ProductCard>
      <div className="px-3.5 py-2.5 border-b border-black/5 dark:border-white/10">
        <span className="text-[11px] font-semibold text-neutral-900 dark:text-white">Onboarding · Maya Chen</span>
      </div>
      <div className="p-3 space-y-2.5">
        {steps.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.15 }}
            className="flex items-center gap-2.5"
          >
            <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${s.done ? "bg-neutral-900 border-neutral-900 dark:bg-white dark:border-white" : "border-neutral-300"}`}>
              {s.done && <span className="w-1.5 h-1.5 rounded-full bg-white dark:bg-neutral-900" />}
            </span>
            <span className={`text-[11px] ${s.done ? "text-neutral-900 dark:text-white" : "text-neutral-400"}`}>{s.label}</span>
          </motion.div>
        ))}
      </div>
    </ProductCard>
  )
}

function OperationsVisual() {
  const nodes = ["Intake", "Review", "Approve", "Done"]
  return (
    <ProductCard>
      <div className="px-3.5 py-2.5 border-b border-black/5 dark:border-white/10">
        <span className="text-[11px] font-semibold text-neutral-900 dark:text-white">Vendor onboarding</span>
      </div>
      <div className="p-4 flex items-center justify-between gap-1">
        {nodes.map((node, i) => (
          <div key={node} className="flex items-center gap-1 flex-1">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.12 }}
              className={`flex-1 text-center rounded-md py-2 text-[10px] font-medium ${i === 1 ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900" : "bg-neutral-50 dark:bg-white/5 text-neutral-600 dark:text-neutral-300"}`}
            >
              {node}
            </motion.div>
            {i < nodes.length - 1 && <div className="w-2 h-px bg-neutral-200 dark:bg-white/20 shrink-0" />}
          </div>
        ))}
      </div>
    </ProductCard>
  )
}

function FinanceVisual() {
  const rows = [
    { name: "Northwind", amount: "$4,200", state: "Paid" },
    { name: "Brightline", amount: "$1,850", state: "Due" },
    { name: "Kite Co.", amount: "$980", state: "Draft" },
  ]
  return (
    <ProductCard>
      <div className="px-3.5 py-2.5 border-b border-black/5 dark:border-white/10 flex items-center justify-between">
        <span className="text-[11px] font-semibold text-neutral-900 dark:text-white">Invoices</span>
        <span className="text-[10px] font-medium text-neutral-500">Collected $18.4k</span>
      </div>
      <div className="divide-y divide-black/5 dark:divide-white/10">
        {rows.map((r, i) => (
          <motion.div
            key={r.name}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 + i * 0.1 }}
            className="flex items-center justify-between px-3.5 py-2"
          >
            <span className="text-[11px] text-neutral-800 dark:text-neutral-200">{r.name}</span>
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-semibold tabular-nums text-neutral-900 dark:text-white">{r.amount}</span>
              <span className="text-[10px] text-neutral-400 w-10 text-right">{r.state}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </ProductCard>
  )
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
        visual: <MarketingVisual />,
      },
      {
        id: "sales",
        name: "Sales",
        headline: "Every lead gets a next step.",
        description: "Research accounts, write outreach, and keep the CRM honest so deals don’t stall in a spreadsheet.",
        points: ["Lead research", "Follow-ups", "Pipeline hygiene"],
        href: "/departments/sales",
        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1400&auto=format&fit=crop&q=80",
        visual: <SalesVisual />,
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
        visual: <VoiceVisual />,
      },
      {
        id: "support",
        name: "Support",
        headline: "Tickets that actually resolve.",
        description: "Triage, draft replies from your knowledge base, and escalate only when a human should step in.",
        points: ["Inbox triage", "Help center", "Escalations"],
        href: "/departments/support",
        image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1400&auto=format&fit=crop&q=80",
        visual: <SupportVisual />,
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
        visual: <RecruitingVisual />,
      },
      {
        id: "hr",
        name: "HR",
        headline: "Onboarding without the scavenger hunt.",
        description: "Policies, equipment, access, and check-ins in one flow so new hires aren’t pinging five people.",
        points: ["Onboarding", "Policies", "Reviews"],
        href: "/departments/hr",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&auto=format&fit=crop&q=80",
        visual: <HrVisual />,
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
        visual: <OperationsVisual />,
      },
      {
        id: "finance",
        name: "Finance",
        headline: "Books that don’t wait until Friday.",
        description: "Invoices go out, expenses get coded, and forecasts stay current without a month-end scramble.",
        points: ["Invoicing", "Expenses", "Forecasts"],
        href: "/departments/finance",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1400&auto=format&fit=crop&q=80",
        visual: <FinanceVisual />,
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

            <div className="mt-12 md:mt-16 grid md:grid-cols-2 gap-4 md:gap-5">
              {pair.departments.map((dept, i) => (
                <motion.article
                  key={dept.id}
                  id={dept.id}
                  {...fadeUp}
                  transition={{ delay: 0.08 + i * 0.08, duration: 0.5 }}
                  className="group scroll-mt-28 flex flex-col rounded-2xl border border-border/70 bg-background overflow-hidden shadow-[0_1px_0_rgba(0,0,0,0.04)] hover:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.18)] hover:border-border transition-shadow duration-500"
                >
                  <Stage image={dept.image} alt={dept.name}>
                    {dept.visual}
                  </Stage>
                  <div className="p-6 md:p-8 flex flex-col flex-1">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground mb-2">
                      {dept.name}
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
