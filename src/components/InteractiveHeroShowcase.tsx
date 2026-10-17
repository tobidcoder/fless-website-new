"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import {
  Search,
  ChevronRight,
  PackageCheck,
  Megaphone,
  Network,
  Scale,
  CreditCard,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Activity,
  Layers,
  BarChart3,
  Sliders,
  ExternalLink,
} from "lucide-react"

export interface EmployeeShowcase {
  id: string
  name: string
  role: string
  hours: string
  avatar: string
  badge: string
  actionMessage: string
  actionTitle: string
  actionType: string
  actionTag: string
  connectedApp: string
  icon: React.ComponentType<{ className?: string }>
}

const employeesData: EmployeeShowcase[] = [
  {
    id: "sarah",
    name: "Sarah",
    role: "Customer Support Specialist",
    hours: "128h this month",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80",
    badge: "Active",
    actionMessage: "Your customer's order #125645 has been shipped via DHL Express! Tracking link dispatched to client.",
    actionTitle: "Order Tracking #125645",
    actionType: "Delivered",
    actionTag: "Live Resolution · 1.2s",
    connectedApp: "Zendesk & Shopify",
    icon: PackageCheck,
  },
  {
    id: "marketing",
    name: "Marketing Pro",
    role: "Social Media Manager",
    hours: "96h this month",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80",
    badge: "Active",
    actionMessage: "Next week's campaign calendar is ready for review. 4 LinkedIn posts, 2 X threads, and brand imagery generated.",
    actionTitle: "Q3 Campaign Launch Pack",
    actionType: "Ready for Approval",
    actionTag: "Queued for Review",
    connectedApp: "Buffer & LinkedIn",
    icon: Megaphone,
  },
  {
    id: "alex",
    name: "Alex",
    role: "Sales Assistant",
    hours: "72h this month",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&auto=format&fit=crop&q=80",
    badge: "Active",
    actionMessage: "Enriched 14 inbound leads from EMEA. Qualified Acme Corp ($24k ARR) and scheduled intro call for Thursday 3 PM.",
    actionTitle: "Lead Qualification #849",
    actionType: "Booked",
    actionTag: "Pipeline Synced",
    connectedApp: "HubSpot CRM",
    icon: Network,
  },
  {
    id: "david",
    name: "David",
    role: "Legal & Contracts Lead",
    hours: "64h this month",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80",
    badge: "Active",
    actionMessage: "Reviewed vendor MSA agreement. Flagged Section 9.2 (unlimited indemnification) for partner review before signing.",
    actionTitle: "Vendor MSA v2.4",
    actionType: "Risk Flagged",
    actionTag: "Guardrail Active",
    connectedApp: "DocuSign & Google Drive",
    icon: Scale,
  },
  {
    id: "finance",
    name: "Finance Expert",
    role: "Bookkeeping Assistant",
    hours: "58h this month",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&auto=format&fit=crop&q=80",
    badge: "Active",
    actionMessage: "Reconciled 32 transactions across Stripe and Barclays. Flagged 1 duplicate software subscription for manager sign-off.",
    actionTitle: "Monthly Ledger Audit #402",
    actionType: "Reconciled",
    actionTag: "Audit Ready",
    connectedApp: "Stripe & Xero",
    icon: CreditCard,
  },
]

type ActiveTab = "employees" | "dashboard" | "apps" | "reports" | "settings"

export function InteractiveHeroShowcase() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("employees")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [isPaused, setIsPaused] = useState(false)

  // Auto-cycle through employees unless user is interacting/hovering
  useEffect(() => {
    if (isPaused || activeTab !== "employees") return
    const interval = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % employeesData.length)
    }, 4200)
    return () => clearInterval(interval)
  }, [isPaused, activeTab])

  const selectedEmployee = employeesData[selectedIndex]
  const ActionIcon = selectedEmployee.icon

  const filteredEmployees = employeesData.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative select-none"
    >
      {/* ── MAIN WORKSPACE APP WINDOW ── */}
      <div className="rounded-2xl border border-border/80 bg-card text-foreground overflow-hidden shadow-2xl transition-all duration-300">
        
        {/* Window Top Titlebar */}
        <div className="flex items-center justify-between px-4 py-3 bg-muted/60 border-b border-border/70 text-xs">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <span className="text-[11px] font-mono text-muted-foreground ml-2">app.getfless.com</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="hidden sm:inline">Autonomous Workspace Active</span>
          </div>
        </div>

        <div className="grid grid-cols-12 min-h-[380px]">
          
          {/* ── LEFT SIDEBAR ── */}
          <div className="col-span-4 bg-[#0A0E1A] text-white/70 p-3.5 space-y-4 border-r border-white/10 hidden sm:block">
            {/* Brand Logo Header */}
            <div className="font-bold text-white text-sm flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-primary flex items-center justify-center text-white text-xs font-bold shadow-sm shadow-primary/40">
                  F
                </span>
                <span className="font-display tracking-tight text-white font-semibold">Fless</span>
              </div>
              <span className="text-[9px] font-mono uppercase bg-white/10 px-1.5 py-0.5 rounded text-white/60">
                PRO
              </span>
            </div>

            {/* Navigation Tabs */}
            <div className="space-y-1 text-xs">
              <button
                type="button"
                onClick={() => setActiveTab("dashboard")}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center gap-2 transition-colors cursor-pointer ${
                  activeTab === "dashboard"
                    ? "bg-primary/20 text-white font-medium"
                    : "hover:text-white hover:bg-white/5"
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                <span>Dashboard</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("employees")}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-colors cursor-pointer ${
                  activeTab === "employees"
                    ? "bg-primary/20 text-white font-medium"
                    : "hover:text-white hover:bg-white/5"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                  <span>AI Employees</span>
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("apps")}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center gap-2 transition-colors cursor-pointer ${
                  activeTab === "apps"
                    ? "bg-primary/20 text-white font-medium"
                    : "hover:text-white hover:bg-white/5"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Apps &amp; Integrations</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("reports")}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center gap-2 transition-colors cursor-pointer ${
                  activeTab === "reports"
                    ? "bg-primary/20 text-white font-medium"
                    : "hover:text-white hover:bg-white/5"
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Reports</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("settings")}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center gap-2 transition-colors cursor-pointer ${
                  activeTab === "settings"
                    ? "bg-primary/20 text-white font-medium"
                    : "hover:text-white hover:bg-white/5"
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Settings</span>
              </button>
            </div>

            {/* Bottom Guardrail Metric */}
            <div className="pt-4 border-t border-white/10 space-y-1">
              <div className="text-[10px] text-white/50 flex items-center justify-between">
                <span>Guardrails Active</span>
                <span className="text-emerald-400 font-mono">100%</span>
              </div>
              <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                <div className="bg-emerald-400 h-full w-full rounded-full" />
              </div>
            </div>
          </div>

          {/* ── MAIN CONTENT AREA ── */}
          <div className="col-span-12 sm:col-span-8 p-4 space-y-3 bg-background flex flex-col justify-between">
            <AnimatePresence mode="wait">
              {activeTab === "employees" && (
                <motion.div
                  key="employees"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-sm text-foreground">Your AI Workforce</h3>
                      <p className="text-[10px] text-muted-foreground">Click any employee to inspect live tasks</p>
                    </div>
                    <Link
                      href="/start"
                      className="px-2.5 py-1 rounded-lg bg-primary hover:bg-primary-hover text-white text-[11px] font-semibold flex items-center gap-1 shadow-sm transition-colors cursor-pointer"
                    >
                      + Hire Employee
                    </Link>
                  </div>

                  {/* Search Filter Input */}
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search employees or roles..."
                      className="w-full bg-muted/50 border border-border/70 rounded-lg pl-8 pr-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>

                  {/* Employee Rows */}
                  <div className="space-y-1.5 pt-0.5">
                    {filteredEmployees.map((emp, index) => {
                      const isSelected = selectedIndex === index
                      return (
                        <div
                          key={emp.id}
                          onClick={() => setSelectedIndex(index)}
                          className={`flex items-center justify-between p-2 rounded-xl border transition-all cursor-pointer text-xs ${
                            isSelected
                              ? "bg-primary/5 border-primary/30 shadow-xs"
                              : "border-transparent hover:bg-muted/50 hover:border-border/60"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="relative w-7 h-7 rounded-full overflow-hidden bg-muted shrink-0 ring-1 ring-border">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={emp.avatar} alt={emp.name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <div className="font-medium text-foreground text-[11.5px] leading-tight flex items-center gap-1.5">
                                <span>{emp.name}</span>
                                {isSelected && (
                                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                )}
                              </div>
                              <div className="text-[10px] text-muted-foreground leading-tight">{emp.role}</div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2.5">
                            <span className="text-[9.5px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                              {emp.badge}
                            </span>
                            <span className="text-[10px] text-muted-foreground hidden sm:inline tabular-nums">
                              {emp.hours}
                            </span>
                            <ChevronRight className={`w-3 h-3 text-muted-foreground transition-transform ${isSelected ? "text-primary translate-x-0.5" : ""}`} />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </motion.div>
              )}

              {activeTab === "dashboard" && (
                <motion.div
                  key="dashboard"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-sm text-foreground">Workspace Metrics</h3>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded">
                      Live Telemetry
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="p-2.5 rounded-xl border border-border bg-card/60">
                      <div className="text-[10px] text-muted-foreground">Automated Output</div>
                      <div className="text-lg font-bold font-display text-foreground mt-0.5">418 Hours</div>
                      <div className="text-[9.5px] text-emerald-600 dark:text-emerald-400 font-medium">+24% vs last month</div>
                    </div>
                    <div className="p-2.5 rounded-xl border border-border bg-card/60">
                      <div className="text-[10px] text-muted-foreground">Approval Accuracy</div>
                      <div className="text-lg font-bold font-display text-foreground mt-0.5">99.4%</div>
                      <div className="text-[9.5px] text-emerald-600 dark:text-emerald-400 font-medium">Zero policy violations</div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl border border-border/80 bg-muted/40 space-y-2 text-xs">
                    <div className="font-semibold text-[11px] text-foreground flex items-center justify-between">
                      <span>Recent Activity</span>
                      <span className="text-[9.5px] text-muted-foreground">Real-time sync</span>
                    </div>
                    <div className="space-y-1.5 text-[10.5px] text-muted-foreground">
                      <div className="flex items-center justify-between">
                        <span>• Sarah closed 18 support tickets</span>
                        <span className="text-[9.5px]">2m ago</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>• Marketing Pro published 3 LinkedIn posts</span>
                        <span className="text-[9.5px]">14m ago</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>• David reviewed Vendor NDA draft</span>
                        <span className="text-[9.5px]">42m ago</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "apps" && (
                <motion.div
                  key="apps"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-sm text-foreground">Connected Integrations</h3>
                    <span className="text-[10px] text-primary font-medium">OAuth Verified</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    {[
                      { name: "Google Workspace", desc: "Gmail, Calendar, Drive sync", status: "Connected" },
                      { name: "HubSpot CRM", desc: "Pipeline, deals & contacts", status: "Connected" },
                      { name: "Zendesk & Shopify", desc: "Orders, customer tickets", status: "Connected" },
                      { name: "Buffer & Meta", desc: "Publishing queue & social ads", status: "Connected" },
                      { name: "Stripe & Xero", desc: "Invoices, payroll reconciliation", status: "Connected" },
                    ].map((app) => (
                      <div
                        key={app.name}
                        className="p-2 rounded-xl border border-border/70 flex items-center justify-between bg-muted/30"
                      >
                        <div>
                          <div className="font-medium text-[11.5px] text-foreground">{app.name}</div>
                          <div className="text-[9.5px] text-muted-foreground">{app.desc}</div>
                        </div>
                        <span className="text-[9px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded flex items-center gap-1">
                          <CheckCircle2 className="w-2.5 h-2.5" />
                          {app.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "reports" && (
                <motion.div
                  key="reports"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="space-y-3"
                >
                  <h3 className="font-semibold text-sm text-foreground">Executive Audit Report</h3>
                  <div className="p-3 rounded-xl border border-border bg-card/60 space-y-2.5 text-xs">
                    <div className="flex items-center justify-between text-muted-foreground text-[10.5px]">
                      <span>Weekly Audit Cycle</span>
                      <span className="text-foreground font-semibold">October 2026</span>
                    </div>
                    <div className="space-y-1.5 text-[11px]">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Work Done:</span>
                        <span className="font-semibold text-foreground">418 Tasks Resolved</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Human Approval Pass:</span>
                        <span className="font-semibold text-foreground">100% (No Breaches)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Secret Storage:</span>
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400">Zero-Secret Vault Active</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "settings" && (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="space-y-3"
                >
                  <h3 className="font-semibold text-sm text-foreground">Governance Policies</h3>
                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-xl border border-border bg-muted/30 flex items-center justify-between">
                      <div>
                        <div className="font-medium text-[11px] text-foreground">Pre-Publish Approval</div>
                        <div className="text-[9.5px] text-muted-foreground">Require human sign-off on public posts</div>
                      </div>
                      <span className="text-[10px] text-emerald-600 font-bold">Enabled</span>
                    </div>
                    <div className="p-2.5 rounded-xl border border-border bg-muted/30 flex items-center justify-between">
                      <div>
                        <div className="font-medium text-[11px] text-foreground">Financial Spend Threshold</div>
                        <div className="text-[9.5px] text-muted-foreground">Auto-approve expenses under $250</div>
                      </div>
                      <span className="text-[10px] text-emerald-600 font-bold">$250 Max</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom Status bar inside app */}
            <div className="pt-2 border-t border-border/60 flex items-center justify-between text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-500" />
                <span>Zero-Secret Security Pipeline</span>
              </span>
              <span className="font-mono text-primary cursor-pointer hover:underline">
                9 Departments Live
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── INTELLIGENT DYNAMIC FLOATING ACTION CARD ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedEmployee.id}
          initial={{ opacity: 0, y: 12, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.96 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="hidden sm:block absolute -top-5 -right-6 w-72 rounded-2xl border border-border bg-card/95 backdrop-blur-md p-4 shadow-2xl z-20 space-y-3"
        >
          {/* Header of Action card */}
          <div className="flex items-start gap-2.5">
            <div className="relative w-8 h-8 rounded-full overflow-hidden bg-muted shrink-0 ring-2 ring-primary/20 mt-0.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedEmployee.avatar}
                alt={selectedEmployee.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-[11px] text-foreground leading-snug">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-[12px]">{selectedEmployee.name}</span>
                <span className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1 py-0.2 rounded font-semibold">
                  LIVE
                </span>
              </div>
              <p className="text-muted-foreground text-[10.5px] mt-1 leading-snug">
                {selectedEmployee.actionMessage}
              </p>
            </div>
          </div>

          {/* Action Task Pill */}
          <div className="p-2.5 rounded-xl bg-muted/70 border border-border/80 flex items-center justify-between text-[10px]">
            <div className="flex items-center gap-1.5 text-foreground font-medium truncate pr-2">
              <ActionIcon className="w-3.5 h-3.5 text-primary shrink-0" />
              <span className="truncate">{selectedEmployee.actionTitle}</span>
            </div>
            <span className="px-1.5 py-0.5 rounded bg-blue-500/10 text-primary font-bold text-[9px] shrink-0">
              {selectedEmployee.actionType}
            </span>
          </div>

          {/* Meta footer of the action card */}
          <div className="flex items-center justify-between text-[9.5px] text-muted-foreground pt-0.5">
            <span className="font-medium text-foreground/80">{selectedEmployee.connectedApp}</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{selectedEmployee.actionTag}</span>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Floating Hand-annotation Pill */}
      <div className="hidden sm:flex items-center gap-2 absolute -bottom-6 right-6 text-xs text-primary/80">
        <span className="italic font-serif text-sm">Real work. Real results.</span>
      </div>
    </div>
  )
}
