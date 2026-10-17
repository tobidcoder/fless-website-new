"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Star,
  ArrowRight,
  CheckCircle2,
  MessageSquare,
  PhoneCall,
  Calendar,
  Mail,
  Hash,
  Search,
  ShieldCheck,
  Workflow,
  ExternalLink,
  Play,
  X,
  Sliders,
  DollarSign,
  Activity,
  Layers,
  Clock,
  Sparkle,
} from "lucide-react";

interface MarketplaceEmployee {
  id: string;
  slug: string;
  name: string;
  category: string;
  rating: number;
  reviewsCount: number;
  description: string;
  badges: string[];
  channels: Array<{ name: string; icon: string }>;
  avatarUrl: string;
  startingPrice: string;
  latency: string;
  accuracy: string;
  simulation: {
    customerQuery: string;
    actionTrace: string;
    resolvedOutput: string;
  };
}

const marketplaceEmployees: MarketplaceEmployee[] = [
  {
    id: "cust-support-1",
    slug: "customer-support-specialist",
    name: "Customer Support Specialist",
    category: "Customer Service",
    rating: 4.9,
    reviewsCount: 320,
    description: "Resolves customer inquiries, tracks orders, and manages multi-channel triage 24/7.",
    badges: ["Tier 1 Triage", "Ticket Escalation", "Sentiment Analysis"],
    channels: [
      { name: "WhatsApp", icon: "whatsapp" },
      { name: "Email", icon: "mail" },
      { name: "CRM", icon: "crm" },
    ],
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80",
    startingPrice: "$399/mo",
    latency: "142ms",
    accuracy: "99.4%",
    simulation: {
      customerQuery: "Where is my order #125645? I need it before Friday.",
      actionTrace: "shopify.orders.lookup('125645') → Status: Out for delivery via DHL",
      resolvedOutput: "Hi Sarah! Your order #125645 is on the DHL delivery truck today and scheduled for delivery by 2:30 PM. Tracking link sent to your SMS.",
    },
  },
  {
    id: "sales-sdr-1",
    slug: "b2b-outbound-sdr",
    name: "B2B Sales Development Rep",
    category: "Sales",
    rating: 4.9,
    reviewsCount: 215,
    description: "Enriches inbound leads, verifies budget intent, and books discovery calls.",
    badges: ["Lead Scoring", "Email Sequences", "CRM Auto-Sync"],
    channels: [
      { name: "Email", icon: "mail" },
      { name: "LinkedIn", icon: "slack" },
      { name: "HubSpot", icon: "crm" },
    ],
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
    startingPrice: "$649/mo",
    latency: "165ms",
    accuracy: "99.1%",
    simulation: {
      customerQuery: "We have 45 seats and want to evaluate Fless for our retail chain.",
      actionTrace: "hubspot.deals.create() → Intent Score: 94/100 → calendar.findSlot()",
      resolvedOutput: "Thanks for reaching out! With 45 seats, our multi-unit retail playbook fits your rollout. I've reserved Thursday at 2:00 PM for a private walkthrough.",
    },
  },
  {
    id: "social-mgr-1",
    slug: "social-media-manager",
    name: "Social Media Manager",
    category: "Marketing",
    rating: 4.8,
    reviewsCount: 124,
    description: "Drafts high-engagement posts, generates assets, schedules releases, and triages DMs.",
    badges: ["Instagram & Meta", "LinkedIn Posts", "Creative Studio"],
    channels: [
      { name: "Instagram", icon: "whatsapp" },
      { name: "LinkedIn", icon: "slack" },
      { name: "Buffer", icon: "mail" },
    ],
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    startingPrice: "$449/mo",
    latency: "190ms",
    accuracy: "98.8%",
    simulation: {
      customerQuery: "Draft a product launch announcement for our spring collection.",
      actionTrace: "brand_voice.apply() → creative_studio.generateBanner() → buffer.schedule()",
      resolvedOutput: "Prepared 3 multi-platform carousels with product tags, copy, and scheduled for Tuesday 10:00 AM peak engagement.",
    },
  },
  {
    id: "fin-ops-1",
    slug: "invoicing-reconciliation-analyst",
    name: "Accounts Receivable Specialist",
    category: "Finance",
    rating: 4.8,
    reviewsCount: 98,
    description: "Matches purchase orders against vendor invoices, sends payment notices, and audits ledger entries.",
    badges: ["Invoice Matching", "Overdue Reminders", "Audit Trail"],
    channels: [
      { name: "Email", icon: "mail" },
      { name: "QuickBooks", icon: "crm" },
      { name: "Slack", icon: "slack" },
    ],
    avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80",
    startingPrice: "$549/mo",
    latency: "135ms",
    accuracy: "99.8%",
    simulation: {
      customerQuery: "Reconcile June vendor statement for ACME Logistics.",
      actionTrace: "quickbooks.invoices.scan() → 18/18 PO matches found → Variance: $0.00",
      resolvedOutput: "All 18 supplier invoices reconciled against receipt logs. Zero variance detected. Payment batch ready for CFO sign-off.",
    },
  },
  {
    id: "legal-ops-1",
    slug: "contract-review-paralegal",
    name: "Legal & Contracts Lead",
    category: "Legal",
    rating: 4.9,
    reviewsCount: 88,
    description: "Triages vendor NDAs, highlights indemnification risks, and alerts counsel before renewals.",
    badges: ["NDA Redlining", "Indemnity Audits", "Renewal Gates"],
    channels: [
      { name: "Email", icon: "mail" },
      { name: "DocuSign", icon: "crm" },
      { name: "Slack", icon: "slack" },
    ],
    avatarUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&auto=format&fit=crop&q=80",
    startingPrice: "$699/mo",
    latency: "180ms",
    accuracy: "99.9%",
    simulation: {
      customerQuery: "Review enterprise mutual NDA with standard liability cap.",
      actionTrace: "legal_corpus.checkClause('indemnity') → Flag: uncapped IP indemnity detected",
      resolvedOutput: "Clause 7.2 flags uncapped liability. Redlined to standard 2x contract value cap. Sent to General Counsel for approval.",
    },
  },
  {
    id: "pharm-rec-1",
    slug: "ai-pharmacy-receptionist",
    name: "Clinical Pharmacy Receptionist",
    category: "Healthcare",
    rating: 4.8,
    reviewsCount: 256,
    description: "Answers phone calls, schedules prescription pickups, and handles patient inquiries securely.",
    badges: ["HIPAA-Compliant", "Prescription Routing", "Appointment Booking"],
    channels: [
      { name: "Voice Call", icon: "voice" },
      { name: "Phone", icon: "phone" },
      { name: "EHR", icon: "crm" },
    ],
    avatarUrl: "https://images.unsplash.com/photo-1594824813580-ff67dd11475c?w=200&auto=format&fit=crop&q=80",
    startingPrice: "$599/mo",
    latency: "128ms",
    accuracy: "99.7%",
    simulation: {
      customerQuery: "Can I refill my prescription #489201 for pickup this afternoon?",
      actionTrace: "hipaa_ehr.verifyPatient() → prescription.checkRefills() → Slot: 3:30 PM",
      resolvedOutput: "Refill confirmed! Your prescription #489201 will be ready at the drive-thru window after 3:30 PM today. A reminder text has been sent.",
    },
  },
];

const categories = [
  "All Roles",
  "Customer Service",
  "Sales",
  "Marketing",
  "Finance",
  "Legal",
  "Healthcare",
];

export default function AiEmployeesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Roles");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeSimulation, setActiveSimulation] = useState<MarketplaceEmployee | null>(null);

  const filteredEmployees = useMemo(() => {
    return marketplaceEmployees.filter((emp) => {
      const matchesCategory =
        selectedCategory === "All Roles" || emp.category === selectedCategory;
      const matchesSearch =
        emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.badges.some((b) => b.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/20 selection:text-primary">
      <Header activePage="ai-employees" />

      <main className="flex-1">
        {/* ── HERO SECTION ── */}
        <section className="pt-28 pb-14 md:pt-36 md:pb-20 bg-[#080B14] text-white border-b border-white/10 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[320px] bg-primary/20 blur-[130px] rounded-full pointer-events-none" />

          <div className="max-w-[1240px] mx-auto px-6 relative z-10 text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-white/90 text-xs font-semibold backdrop-blur-md"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-primary" />
              <span>Verified Autonomous Workforce Marketplace</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="text-4xl sm:text-6xl font-display font-semibold tracking-tight leading-[1.08]"
            >
              Meet our AI Employees
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
            >
              Pre-built, role-specific autonomous employees ready for hire. Built-in compliance gates, official tool plugins, and human sign-off policies.
            </motion.p>

            {/* Quick Metrics Bar */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="flex flex-wrap items-center justify-center gap-8 pt-4 text-sm text-white/80"
            >
              <div className="flex items-center gap-2.5">
                <span className="font-display font-bold text-2xl text-white">100+</span>
                <span className="text-white/60 text-xs text-left leading-tight">Verified<br />Employees</span>
              </div>
              <div className="w-px h-8 bg-white/15" />
              <div className="flex items-center gap-2.5">
                <span className="font-display font-bold text-2xl text-white">&lt;180ms</span>
                <span className="text-white/60 text-xs text-left leading-tight">Average<br />Turn Latency</span>
              </div>
              <div className="w-px h-8 bg-white/15" />
              <div className="flex items-center gap-2.5">
                <div className="flex items-center gap-1 text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span className="font-display font-bold text-2xl text-white">4.9</span>
                </div>
                <span className="text-white/60 text-xs text-left leading-tight">Customer<br />CSAT Score</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── DIRECTORY & CONTROLS SECTION ── */}
        <section className="max-w-[1240px] mx-auto px-6 py-14 space-y-8">
          {/* Dynamic Filter Controls */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 text-xs font-medium">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full transition-all shrink-0 cursor-pointer ${
                      isSelected
                        ? "bg-primary text-white shadow-sm font-semibold"
                        : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2 w-full md:w-80 bg-muted/40 border border-border rounded-xl px-3 py-2 text-xs text-muted-foreground focus-within:ring-1 focus-within:ring-primary focus-within:border-primary transition-all">
              <Search className="w-3.5 h-3.5 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by role, capability, or tool..."
                className="bg-transparent outline-none w-full text-foreground placeholder:text-muted-foreground text-xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="p-0.5 rounded hover:bg-muted text-muted-foreground"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredEmployees.map((emp) => (
                <motion.div
                  key={emp.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-2xl border border-border bg-card p-6 flex flex-col justify-between hover:border-primary/40 hover:shadow-xl transition-all group"
                >
                  <div className="space-y-4">
                    {/* Top Bar: Avatar + Category + Rating */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="relative">
                        <div className="w-14 h-14 rounded-full overflow-hidden bg-muted border-2 border-border group-hover:border-primary/50 transition-colors shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={emp.avatarUrl} alt={emp.name} className="w-full h-full object-cover" />
                        </div>
                        <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-card" />
                      </div>

                      <div className="text-right">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[10.5px] font-semibold bg-primary/10 text-primary border border-primary/20 mb-1">
                          {emp.category}
                        </span>
                        <div className="flex items-center justify-end gap-1 text-xs text-amber-500 font-mono">
                          <Star className="w-3.5 h-3.5 fill-amber-500" />
                          <span className="font-bold text-foreground">{emp.rating}</span>
                          <span className="text-muted-foreground">({emp.reviewsCount})</span>
                        </div>
                      </div>
                    </div>

                    {/* Title & Description */}
                    <div>
                      <h3 className="font-semibold text-base text-foreground group-hover:text-primary transition-colors">
                        {emp.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                        {emp.description}
                      </p>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {emp.badges.map((b) => (
                        <span
                          key={b}
                          className="px-2 py-0.5 rounded-md bg-muted/60 text-[10px] text-muted-foreground font-mono border border-border/40"
                        >
                          {b}
                        </span>
                      ))}
                    </div>

                    {/* Channel Badges */}
                    <div className="flex items-center gap-1.5 pt-1">
                      {emp.channels.map((ch, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-muted/40 text-[10px] text-muted-foreground font-medium border border-border/40"
                        >
                          {ch.icon === "whatsapp" && <MessageSquare className="w-2.5 h-2.5 text-emerald-500" />}
                          {ch.icon === "mail" && <Mail className="w-2.5 h-2.5 text-blue-500" />}
                          {ch.icon === "calendar" && <Calendar className="w-2.5 h-2.5 text-purple-500" />}
                          {ch.icon === "slack" && <Hash className="w-2.5 h-2.5 text-amber-500" />}
                          {ch.icon === "voice" && <PhoneCall className="w-2.5 h-2.5 text-rose-500" />}
                          {ch.icon === "phone" && <PhoneCall className="w-2.5 h-2.5 text-rose-500" />}
                          {ch.icon === "crm" && <CheckCircle2 className="w-2.5 h-2.5 text-primary" />}
                          <span>{ch.name}</span>
                        </span>
                      ))}
                    </div>

                    {/* Live Simulation Trigger Button */}
                    <button
                      type="button"
                      onClick={() => setActiveSimulation(emp)}
                      className="w-full py-2 px-3 rounded-xl border border-border/80 bg-muted/20 hover:bg-primary/10 hover:border-primary/30 text-xs font-semibold text-foreground flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <Play className="w-3 h-3 text-primary fill-primary" />
                      <span>Simulate Real Action</span>
                    </button>
                  </div>

                  {/* Footer Bar: Price & CTA */}
                  <div className="pt-4 mt-5 border-t border-border flex items-center justify-between">
                    <div>
                      <span className="text-[9.5px] text-muted-foreground block uppercase font-mono">Starts at</span>
                      <span className="font-display font-bold text-base text-foreground">{emp.startingPrice}</span>
                    </div>

                    <Link
                      href={`/ai-employees/${emp.slug}`}
                      className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-primary text-white font-semibold text-xs shadow-sm hover:bg-primary-hover transition-all cursor-pointer"
                    >
                      <span>Hire Employee</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Builder Banner */}
          <div className="rounded-3xl border border-primary/20 bg-primary/[0.03] p-8 flex flex-col md:flex-row items-center justify-between gap-6 mt-12">
            <div className="space-y-1.5 text-center md:text-left">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary">For Builders</span>
              <h3 className="text-xl sm:text-2xl font-display font-semibold text-foreground">
                Build &amp; publish your own domain-specific AI employee
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-xl">
                Create autonomous employees using the visual Studio or TypeScript SDK. Earn 70% recurring royalty on every business seat.
              </p>
            </div>

            <Link
              href="/builders"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold text-xs hover:bg-primary-hover shadow-md shadow-primary/20 transition-all shrink-0 cursor-pointer"
            >
              Start Building Free
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* ── INTERACTIVE LIVE ACTION SIMULATION MODAL ── */}
        <AnimatePresence>
          {activeSimulation && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="w-full max-w-xl bg-card border border-border rounded-3xl p-6 shadow-2xl relative overflow-hidden space-y-5"
              >
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-border">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={activeSimulation.avatarUrl}
                        alt={activeSimulation.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-foreground">{activeSimulation.name}</h4>
                      <p className="text-[11px] text-muted-foreground font-mono">
                        Turn Latency: {activeSimulation.latency} • Accuracy: {activeSimulation.accuracy}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveSimulation(null)}
                    className="p-1.5 rounded-xl hover:bg-muted text-muted-foreground cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Simulated Execution Sequence */}
                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 rounded-xl bg-muted/40 border border-border/60 space-y-1">
                    <span className="text-[10px] text-muted-foreground uppercase font-bold">1. Inbound Request</span>
                    <p className="text-foreground font-sans text-xs">
                      &quot;{activeSimulation.simulation.customerQuery}&quot;
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-[#080B14] text-white border border-white/10 space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] text-white/50">
                      <span>2. Tool Execution &amp; Policy Trace</span>
                      <span className="text-emerald-400">PASSED</span>
                    </div>
                    <p className="text-amber-300 text-[11px] font-mono">
                      ⚡ {activeSimulation.simulation.actionTrace}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 space-y-1">
                    <span className="text-[10px] text-primary uppercase font-bold">3. Autonomous Resolution</span>
                    <p className="text-foreground font-sans text-xs leading-relaxed">
                      {activeSimulation.simulation.resolvedOutput}
                    </p>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs font-mono text-muted-foreground">
                    Zero Hallucination Guaranteed
                  </span>
                  <Link
                    href={`/ai-employees/${activeSimulation.slug}`}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-primary text-white font-semibold text-xs hover:bg-primary-hover transition-colors shadow-sm cursor-pointer"
                  >
                    <span>Hire {activeSimulation.name.split(" ")[0]}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
