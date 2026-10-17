"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ArrowRight,
  Globe,
  Clock,
  Sparkles,
  Star,
  MessageSquare,
  X,
  Play,
  ShieldCheck,
} from "lucide-react";
import { VerifiedBadge } from "./VerifiedBadge";
import { CustomerReviewsModal, type CustomerReview } from "./CustomerReviewsModal";

export interface WorkforceEmployee {
  id: string;
  slug: string;
  name: string;
  role: string;
  department: string;
  industry: string;
  country: string;
  description: string;
  skills: string[];
  channels: string[];
  pricing: string;
  billingUnit: string;
  rating: number;
  reviewsCount: number;
  latency: string;
  avatar: string;
  isFless: boolean;
  builderName: string;
  isRecommended: boolean;
  reviews: CustomerReview[];
}

const EMPLOYEES: WorkforceEmployee[] = [
  {
    id: "support-spec",
    slug: "customer-support-specialist",
    name: "Customer Support Specialist",
    role: "Tier-1 Customer Support & Triage",
    department: "Support",
    industry: "E-Commerce",
    country: "Global",
    description: "Resolves customer questions, tracks orders via logistics APIs, and escalates edge cases 24/7.",
    skills: ["Order Tracking", "Refund Routing", "Sentiment Triage"],
    channels: ["WhatsApp", "Email", "Zendesk", "Shopify"],
    pricing: "$399",
    billingUnit: "month",
    rating: 4.9,
    reviewsCount: 320,
    latency: "142ms",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=180&auto=format&fit=crop&q=80",
    isFless: true,
    builderName: "Fless Core",
    isRecommended: true,
    reviews: [
      {
        id: "r1",
        author: "Tariq Mansour",
        role: "Head of Customer Experience",
        company: "Moda Direct Retail",
        industry: "E-Commerce",
        rating: 5,
        date: "2 weeks ago",
        activeDuration: "Active user for 6 months",
        tasksCompleted: "14,800 tickets",
        comment: "Sarah cut our WhatsApp response latency from 45 minutes to 4 seconds. Our refund chargebacks dropped by 34% because tracking inquiries are resolved before customers file disputes.",
        builderReply: "Thank you Tariq! We just rolled out improved Shopify multi-warehouse lookups to all Fless Support specialists.",
      },
      {
        id: "r2",
        author: "Elena Rostova",
        role: "Operations Lead",
        company: "Nordic Goods Co",
        industry: "Consumer Goods",
        rating: 5,
        date: "1 month ago",
        activeDuration: "Active user for 4 months",
        tasksCompleted: "8,920 tickets",
        comment: "Zero hallucination on policy rules. If a return is over $50, it triggers an instant Slack notification for human sign-off exactly as configured.",
      },
    ],
  },
  {
    id: "b2b-sdr",
    slug: "b2b-outbound-sdr",
    name: "B2B Sales Development Rep",
    role: "Outbound Lead Discovery & Booking",
    department: "Sales",
    industry: "B2B SaaS",
    country: "North America",
    description: "Enriches inbound leads, verifies budget and authority, drafts contextual sequences, and books meetings.",
    skills: ["Lead Qualification", "Email Personalization", "CRM Sync"],
    channels: ["HubSpot", "LinkedIn", "Gmail", "Salesforce"],
    pricing: "$649",
    billingUnit: "month",
    rating: 4.9,
    reviewsCount: 215,
    latency: "165ms",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=180&auto=format&fit=crop&q=80",
    isFless: true,
    builderName: "Fless Core",
    isRecommended: true,
    reviews: [
      {
        id: "r3",
        author: "Marcus Chen",
        role: "VP of Growth",
        company: "SaaSStack Cloud",
        industry: "B2B Software",
        rating: 5,
        date: "3 weeks ago",
        activeDuration: "Active user for 5 months",
        tasksCompleted: "3,100 qualified leads",
        comment: "Alex booked 41 discovery calls in his second month. The sequences read like they were written by a top tier SDR who actually researched our prospect companies.",
        builderReply: "Marcus, great to see the pipeline growth! The new HubSpot bi-directional status sync is now live.",
      },
    ],
  },
  {
    id: "social-mgr",
    slug: "social-media-manager",
    name: "Social Media Manager",
    role: "Multi-Channel Content & Engagement",
    department: "Marketing",
    industry: "E-Commerce",
    country: "Global",
    description: "Plans content calendars, generates branded assets, schedules multi-network posts, and monitors replies.",
    skills: ["Campaign Planning", "Asset Generation", "DM Triage"],
    channels: ["Instagram", "LinkedIn", "X (Twitter)", "Buffer"],
    pricing: "$449",
    billingUnit: "month",
    rating: 4.8,
    reviewsCount: 124,
    latency: "190ms",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=180&auto=format&fit=crop&q=80",
    isFless: true,
    builderName: "Fless Core",
    isRecommended: true,
    reviews: [
      {
        id: "r4",
        author: "Amara Okonjo",
        role: "Managing Director",
        company: "Luxe Brands Africa",
        industry: "Retail & Fashion",
        rating: 5,
        date: "1 week ago",
        activeDuration: "Active user for 7 months",
        tasksCompleted: "480 posts & carousels",
        comment: "Maya plans our entire month of social campaigns in a single morning. We review the carousel drafts in one click and our engagement has doubled across LinkedIn and Instagram.",
      },
    ],
  },
  {
    id: "voice-recep",
    slug: "clinic-voice-receptionist",
    name: "Clinic Voice Receptionist",
    role: "Inbound Phone Triage & Booking",
    department: "Voice",
    industry: "Healthcare",
    country: "Nigeria & West Africa",
    description: "Answers phone calls in real time, screens patient symptoms, checks clinic schedules, and dispatches SMS confirmations.",
    skills: ["Streaming Voice", "Appointment Booking", "Prescription Routing"],
    channels: ["LiveKit Voice", "WhatsApp", "EHR Systems"],
    pricing: "$499",
    billingUnit: "month + $0.12/min",
    rating: 4.9,
    reviewsCount: 89,
    latency: "172ms",
    avatar: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=180&auto=format&fit=crop&q=80",
    isFless: true,
    builderName: "Fless Core",
    isRecommended: true,
    reviews: [
      {
        id: "r5",
        author: "Dr. Babatunde Vance",
        role: "Medical Director",
        company: "St. Jude Specialist Clinic",
        industry: "Healthcare",
        rating: 5,
        date: "4 days ago",
        activeDuration: "Active user for 4 months",
        tasksCompleted: "5,400 calls answered",
        comment: "Julian picks up on the second ring, qualifies patient urgency, books calendar slots, and sends instant SMS confirmations. Zero missed patients during clinic rush hours.",
      },
    ],
  },
  {
    id: "legal-lead",
    slug: "commercial-contract-analyst",
    name: "Contract Analyst",
    role: "Contract Review & Redlining",
    department: "Legal",
    industry: "Professional Services",
    country: "United Kingdom & EU",
    description: "Reviews vendor NDAs and master services agreements against your playbook, flagging high-liability clauses.",
    skills: ["Redline Suggestions", "Indemnity Audits", "Clause Extraction"],
    channels: ["DocuSign", "Google Docs", "Slack"],
    pricing: "$549",
    billingUnit: "month",
    rating: 4.9,
    reviewsCount: 64,
    latency: "210ms",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=180&auto=format&fit=crop&q=80",
    isFless: false,
    builderName: "Lexis Automation",
    isRecommended: false,
    reviews: [
      {
        id: "r6",
        author: "Julian Davies",
        role: "General Counsel",
        company: "Apex Media Group",
        industry: "Media",
        rating: 5,
        date: "2 weeks ago",
        activeDuration: "Active user for 3 months",
        tasksCompleted: "320 contracts reviewed",
        comment: "Flags uncapped liabilities and GDPR cross-border transfer issues in under two minutes with redline suggestions formatted exactly to our firm playbook.",
      },
    ],
  },
  {
    id: "fin-bookkeeper",
    slug: "finance-reconciliation-assistant",
    name: "Bookkeeping & Invoice Specialist",
    role: "Accounts Payable & Reconciliation",
    department: "Finance",
    industry: "Professional Services",
    country: "Global",
    description: "Extracts invoice line items, matches against purchase orders, flags balance variances, and drafts approval batches.",
    skills: ["3-Way Matching", "VAT Reconciliation", "Variance Detection"],
    channels: ["Xero", "QuickBooks", "Stripe", "Gmail"],
    pricing: "$699",
    billingUnit: "month",
    rating: 4.8,
    reviewsCount: 92,
    latency: "185ms",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=180&auto=format&fit=crop&q=80",
    isFless: false,
    builderName: "FinOps Studio",
    isRecommended: false,
    reviews: [
      {
        id: "r7",
        author: "Claire Beauchamp",
        role: "Finance Director",
        company: "Horizon Ventures",
        industry: "Venture Capital",
        rating: 5,
        date: "3 weeks ago",
        activeDuration: "Active user for 5 months",
        tasksCompleted: "1,140 invoices matched",
        comment: "Three-way matching catches duplicate supplier invoices every month. We approve batches on Slack in minutes without manually opening QuickBooks.",
      },
    ],
  },
];

const DEPARTMENTS = ["All", "Marketing", "Voice", "Sales", "Support", "Finance", "Legal"];
const INDUSTRIES = ["All Industries", "E-Commerce", "B2B SaaS", "Healthcare", "Professional Services"];
const REGIONS = ["All Markets", "Global", "North America", "Nigeria & West Africa", "United Kingdom & EU"];

export function WorkforceExplorer() {
  const [selectedDept, setSelectedDept] = useState("All");
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries");
  const [selectedRegion, setSelectedRegion] = useState("All Markets");
  const [search, setSearch] = useState("");
  const [previewEmployee, setPreviewEmployee] = useState<WorkforceEmployee | null>(null);
  const [reviewsEmployee, setReviewsEmployee] = useState<WorkforceEmployee | null>(null);

  const filtered = useMemo(() => {
    const list = EMPLOYEES.filter((emp) => {
      const matchDept = selectedDept === "All" || emp.department.toLowerCase() === selectedDept.toLowerCase();
      const matchInd = selectedIndustry === "All Industries" || emp.industry === selectedIndustry;
      const matchReg = selectedRegion === "All Markets" || emp.country === selectedRegion;
      const matchSearch =
        search.trim() === "" ||
        emp.name.toLowerCase().includes(search.toLowerCase()) ||
        emp.role.toLowerCase().includes(search.toLowerCase()) ||
        emp.builderName.toLowerCase().includes(search.toLowerCase()) ||
        emp.skills.some((s) => s.toLowerCase().includes(search.toLowerCase())) ||
        emp.channels.some((c) => c.toLowerCase().includes(search.toLowerCase()));

      return matchDept && matchInd && matchReg && matchSearch;
    });

    // Fless employees are always prioritized / most recommended first
    return list.sort((a, b) => {
      if (a.isRecommended && !b.isRecommended) return -1;
      if (!a.isRecommended && b.isRecommended) return 1;
      return 0;
    });
  }, [selectedDept, selectedIndustry, selectedRegion, search]);

  return (
    <section id="workforce" className="py-20 md:py-28 bg-muted/10 border-t border-border/60">
      <div className="max-w-[1240px] mx-auto px-6 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 max-w-4xl">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Verified AI Talent</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-semibold tracking-tight text-foreground">
              Pre-built employees ready to hire today.
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl">
              Specialized roles tuned for your industry, tools, and geographic market. All Fless employees are officially verified and recommended.
            </p>
          </div>

          <Link
            href="/ai-employees"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors shrink-0"
          >
            <span>Explore full marketplace</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* ── Filter Bar ── */}
        <div className="space-y-4 p-5 rounded-2xl border border-border bg-card/60 shadow-xs">
          {/* Department Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mr-1 shrink-0">
              Department:
            </span>
            {DEPARTMENTS.map((dept) => {
              const isSelected = selectedDept === dept;
              return (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all shrink-0 ${
                    isSelected
                      ? "bg-primary text-white shadow-xs"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {dept}
                </button>
              );
            })}
          </div>

          {/* Industry, Market & Search Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-border/50">
            <div className="flex flex-wrap items-center gap-2.5">
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-border bg-background text-foreground text-xs focus:outline-hidden focus:ring-1 focus:ring-primary"
              >
                {INDUSTRIES.map((ind) => (
                  <option key={ind} value={ind}>
                    {ind}
                  </option>
                ))}
              </select>

              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-border bg-background text-foreground text-xs focus:outline-hidden focus:ring-1 focus:ring-primary"
              >
                {REGIONS.map((reg) => (
                  <option key={reg} value={reg}>
                    {reg}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search role, skill, or builder..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-border bg-background text-foreground text-xs placeholder:text-muted-foreground focus:outline-hidden focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        {/* ── Employee Cards Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((emp) => (
            <div
              key={emp.id}
              className={`group rounded-2xl border p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between ${
                emp.isRecommended
                  ? "border-primary/30 bg-card hover:border-primary/60"
                  : "border-border bg-card hover:border-primary/40"
              }`}
            >
              <div className="space-y-4">
                {/* Top: Avatar, Name, Verified Badge & Recommendation */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Image
                      src={emp.avatar}
                      alt={emp.name}
                      width={48}
                      height={48}
                      unoptimized
                      className="w-12 h-12 rounded-xl object-cover border border-border"
                    />
                    <div>
                      <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                        {emp.name}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-1">{emp.role}</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10.5px] font-medium bg-muted text-foreground border border-border shrink-0">
                    {emp.department}
                  </span>
                </div>

                {/* Twitter/X style Verified Badge + Most Recommended Tag */}
                <div className="pt-1">
                  <VerifiedBadge
                    isFless={emp.isFless}
                    builderName={emp.builderName}
                    isRecommended={emp.isRecommended}
                    size="sm"
                  />
                </div>

                {/* Star Rating & Verified Customer Reviews Trigger */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-500" />
                      <span className="font-bold text-foreground text-xs">
                        {emp.rating.toFixed(1)}
                      </span>
                    </div>
                    <span className="text-muted-foreground text-[11px]">
                      ({emp.reviewsCount})
                    </span>
                  </div>

                  <button
                    onClick={() => setReviewsEmployee(emp)}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline cursor-pointer"
                  >
                    <MessageSquare className="w-3 h-3" />
                    <span>See Verified Reviews</span>
                  </button>
                </div>

                {/* Description */}
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  {emp.description}
                </p>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {emp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded-md text-[10.5px] font-medium bg-primary/5 text-primary border border-primary/10"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Integration channels & metadata */}
                <div className="pt-3 border-t border-border/50 space-y-2 text-[11px] text-muted-foreground">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <Globe className="w-3 h-3 text-muted-foreground" />
                      <span>{emp.country}</span>
                    </span>
                    <span className="flex items-center gap-1 font-mono text-[10.5px] text-emerald-600 dark:text-emerald-400">
                      <Clock className="w-3 h-3" />
                      <span>{emp.latency}</span>
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-muted-foreground/80">Connects with:</span>
                    <span className="font-medium text-foreground line-clamp-1 text-right">
                      {emp.channels.join(", ")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom: Pricing, Quick View & Hire */}
              <div className="pt-4 mt-4 border-t border-border/60 flex items-center justify-between gap-2">
                <div>
                  <span className="text-base font-bold text-foreground">{emp.pricing}</span>
                  <span className="text-[11px] text-muted-foreground">/{emp.billingUnit}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPreviewEmployee(emp)}
                    className="px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-muted text-foreground text-xs font-medium transition-colors"
                  >
                    Quick View
                  </button>
                  <Link
                    href={`/start?role=${encodeURIComponent(emp.slug)}`}
                    className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-colors shadow-xs"
                  >
                    <span>Hire</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="col-span-full p-12 text-center rounded-2xl border border-dashed border-border text-muted-foreground space-y-2">
              <p className="font-semibold text-sm text-foreground">No employees found matching the filters</p>
              <p className="text-xs">Try clearing your search query or selecting a different department.</p>
              <button
                onClick={() => {
                  setSelectedDept("All");
                  setSelectedIndustry("All Industries");
                  setSelectedRegion("All Markets");
                  setSearch("");
                }}
                className="mt-3 px-4 py-2 rounded-lg bg-primary text-white text-xs font-medium hover:bg-primary/90"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* ── QUICK VIEW / SIMULATION MODAL ── */}
        <AnimatePresence>
          {previewEmployee && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setPreviewEmployee(null)}
                className="fixed inset-0 bg-background/80 backdrop-blur-md"
              />

              {/* Modal Box */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 16 }}
                transition={{ duration: 0.2 }}
                className="relative w-full max-w-xl rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-2xl z-10 space-y-6"
              >
                {/* Modal Header */}
                <div className="flex items-start justify-between gap-4 border-b border-border/60 pb-4">
                  <div className="flex items-center gap-3.5">
                    <Image
                      src={previewEmployee.avatar}
                      alt={previewEmployee.name}
                      width={52}
                      height={52}
                      unoptimized
                      className="w-13 h-13 rounded-2xl object-cover border border-border"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-display font-semibold text-base sm:text-lg text-foreground">
                          {previewEmployee.name}
                        </h3>
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      </div>
                      <p className="text-xs text-muted-foreground">{previewEmployee.role}</p>
                      <VerifiedBadge
                        isFless={previewEmployee.isFless}
                        builderName={previewEmployee.builderName}
                        isRecommended={previewEmployee.isRecommended}
                        size="sm"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => setPreviewEmployee(null)}
                    className="p-1.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Modal Body: Active Simulation */}
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl border border-primary/25 bg-primary/5 space-y-2">
                    <span className="text-[11px] font-mono uppercase font-bold text-primary flex items-center gap-1.5">
                      <Play className="w-3 h-3 fill-primary" /> Active Queue Simulation
                    </span>
                    <p className="text-xs text-foreground/90 font-mono">
                      &gt; Live task: Triage and process inbound request across {previewEmployee.channels.join(", ")}.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl border border-border bg-muted/30 space-y-1">
                      <span className="text-muted-foreground text-[11px]">Response Time</span>
                      <p className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                        {previewEmployee.latency} avg
                      </p>
                    </div>
                    <div className="p-3 rounded-xl border border-border bg-muted/30 space-y-1">
                      <span className="text-muted-foreground text-[11px]">Guardrail Level</span>
                      <p className="font-semibold text-foreground flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-primary" /> Human Approval
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-border bg-card space-y-2">
                    <span className="text-xs font-semibold text-foreground">Core Competencies</span>
                    <div className="flex flex-wrap gap-1.5">
                      {previewEmployee.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-primary/10 text-primary"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="pt-2 border-t border-border/60 flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-foreground">{previewEmployee.pricing}</span>
                    <span className="text-xs text-muted-foreground">/{previewEmployee.billingUnit}</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => setPreviewEmployee(null)}
                      className="px-4 py-2 rounded-xl border border-border text-xs font-medium hover:bg-muted text-muted-foreground transition-colors"
                    >
                      Close
                    </button>
                    <Link
                      href={`/start?role=${encodeURIComponent(previewEmployee.slug)}`}
                      className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-all shadow-md shadow-primary/25"
                    >
                      <span>Hire {previewEmployee.name.split(" ")[0]}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* ── CUSTOMER REVIEWS VIEWER MODAL ── */}
        <AnimatePresence>
          {reviewsEmployee && (
            <CustomerReviewsModal
              employee={reviewsEmployee}
              onClose={() => setReviewsEmployee(null)}
            />
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
