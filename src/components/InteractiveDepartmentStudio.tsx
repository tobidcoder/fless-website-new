"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Megaphone,
  PhoneCall,
  TrendingUp,
  Headphones,
  Cpu,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check,
} from "lucide-react";

interface DeptTab {
  id: string;
  name: string;
  tag: string;
  isLive: boolean;
  icon: typeof Megaphone;
  slug: string;
}

const DEPTS: DeptTab[] = [
  {
    id: "marketing",
    name: "Marketing",
    tag: "Multi-Channel Social & Ads",
    isLive: true,
    icon: Megaphone,
    slug: "marketing",
  },
  {
    id: "voice",
    name: "Voice",
    tag: "24/7 Phone Desk (<180ms)",
    isLive: false,
    icon: PhoneCall,
    slug: "voice",
  },
  {
    id: "sales",
    name: "Sales",
    tag: "Pipeline & Prospecting",
    isLive: false,
    icon: TrendingUp,
    slug: "sales",
  },
  {
    id: "support",
    name: "Support",
    tag: "Instant Multi-Channel Triage",
    isLive: false,
    icon: Headphones,
    slug: "support",
  },
  {
    id: "operations",
    name: "Finance & Ops",
    tag: "Matching & Workflows",
    isLive: false,
    icon: Cpu,
    slug: "operations",
  },
];

export function InteractiveDepartmentStudio() {
  const [selectedDept, setSelectedDept] = useState("marketing");
  const [isApproved, setIsApproved] = useState(false);
  const [activeSlide, setActiveSlide] = useState(1);
  const [voicePlaying, setVoicePlaying] = useState(true);

  return (
    <section id="departments" className="py-20 md:py-28 bg-background border-t border-border/60">
      <div className="max-w-[1240px] mx-auto px-6 space-y-12">
        
        {/* Clean Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 max-w-4xl">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Core Teams in Motion</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-semibold tracking-tight text-foreground">
              See AI employees do the work.
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl">
              Switch departments to watch real-time workflows—from multi-channel marketing to 24/7 phone answering.
            </p>
          </div>

          <Link
            href="/departments/marketing"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            <span>Explore all 9 departments</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* ── DEPARTMENT SELECTOR PILLS ── */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none [mask-image:linear-gradient(to_right,black_90%,transparent)]">
          {DEPTS.map((dept) => {
            const Icon = dept.icon;
            const isSelected = selectedDept === dept.id;

            return (
              <button
                key={dept.id}
                onClick={() => {
                  setSelectedDept(dept.id);
                  setIsApproved(false);
                }}
                className={`relative px-4 py-2.5 rounded-2xl border text-xs font-semibold flex items-center gap-2.5 transition-all shrink-0 ${
                  isSelected
                    ? "bg-primary text-white border-primary shadow-md shadow-primary/25 scale-[1.02]"
                    : "bg-card border-border hover:bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{dept.name}</span>
                {dept.isLive ? (
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] uppercase font-mono font-bold ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                    }`}
                  >
                    Live
                  </span>
                ) : (
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                      isSelected ? "bg-white/10 text-white/90" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    Beta
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ── WORKPLACE CANVAS STAGE ── */}
        <div className="relative rounded-3xl border border-border bg-card/80 backdrop-blur-md shadow-lg p-6 sm:p-10 overflow-hidden min-h-[460px]">
          
          <AnimatePresence mode="wait">
            {/* 1. MARKETING CANVAS */}
            {selectedDept === "marketing" && (
              <motion.div
                key="marketing"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                {/* Left: Interactive Carousel Preview */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center justify-between text-xs border-b border-border/60 pb-3">
                    <span className="font-semibold text-foreground flex items-center gap-2">
                      <Megaphone className="w-4 h-4 text-primary" />
                      Maya · Social Media Manager
                    </span>
                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3].map((slideNum) => (
                        <button
                          key={slideNum}
                          onClick={() => setActiveSlide(slideNum)}
                          className={`px-2.5 py-0.5 rounded-md text-[11px] font-mono transition-colors ${
                            activeSlide === slideNum
                              ? "bg-primary text-white font-bold"
                              : "bg-muted text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          Slide {slideNum}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Visual Slide Card Mockup */}
                  <div className="rounded-2xl border border-border bg-gradient-to-br from-muted/30 to-background p-6 space-y-4 relative overflow-hidden">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                          FL
                        </div>
                        <div>
                          <p className="text-xs font-bold text-foreground">Fless Corporation</p>
                          <p className="text-[10px] text-muted-foreground">Sponsored · LinkedIn</p>
                        </div>
                      </div>
                      <span className="text-[11px] font-mono text-emerald-500 font-semibold">
                        Ready to Schedule
                      </span>
                    </div>

                    <div className="p-4 rounded-xl border border-border/80 bg-card/90 space-y-2">
                      <span className="text-[10px] uppercase font-mono tracking-wider text-primary font-semibold">
                        {activeSlide === 1 && "Key Insight 1 of 3"}
                        {activeSlide === 2 && "Workflow Breakdown 2 of 3"}
                        {activeSlide === 3 && "Verified Results 3 of 3"}
                      </span>
                      <h4 className="font-display font-semibold text-sm sm:text-base text-foreground leading-snug">
                        {activeSlide === 1 && "Why lean teams are replacing 12 fragmented tools with autonomous AI employees."}
                        {activeSlide === 2 && "Scoped permissions prevent rogue actions. Nothing ships without one-click human sign-off."}
                        {activeSlide === 3 && "18 active business pilots running live multi-channel campaigns today."}
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed pt-1">
                        {activeSlide === 1 && "Instead of managing bots across disjointed SaaS apps, run one coordinated team with unified governance."}
                        {activeSlide === 2 && "OAuth keys remain encrypted. Employees draft, audit, and hold for review until approved."}
                        {activeSlide === 3 && "Marketing is live today. Connect LinkedIn, Instagram, Meta Ads, and X in under 2 minutes."}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-primary" />
                        Target: Tomorrow at 9:00 AM EST
                      </span>
                      <span className="text-[11px] font-mono">
                        Channels: LinkedIn + Instagram
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Controls & One-Click Sign-Off */}
                <div className="lg:col-span-5 space-y-5">
                  <div className="p-5 rounded-2xl border border-border bg-card/60 space-y-4">
                    <h3 className="font-semibold text-sm text-foreground flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      Sign-Off Gate Active
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      AI employees hold all outbound releases until you verify. Click below to simulate instant release.
                    </p>

                    <div className="space-y-2 pt-2">
                      <div className="flex items-center justify-between text-xs py-1.5 border-b border-border/40">
                        <span className="text-muted-foreground">Brand Safety Check</span>
                        <span className="text-emerald-500 font-semibold flex items-center gap-1">
                          <Check className="w-3 h-3" /> Passed
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs py-1.5 border-b border-border/40">
                        <span className="text-muted-foreground">Channels Synced</span>
                        <span className="text-foreground font-semibold">LinkedIn, Instagram, X</span>
                      </div>
                      <div className="flex items-center justify-between text-xs py-1.5">
                        <span className="text-muted-foreground">Target Audience</span>
                        <span className="text-foreground font-semibold">B2B Founders &amp; Operators</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      {isApproved ? (
                        <div className="w-full py-3 px-4 rounded-xl bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Campaign Approved &amp; Queued!</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => setIsApproved(true)}
                          className="w-full py-3 px-4 rounded-xl bg-primary text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md shadow-primary/25 hover:bg-primary/90 transition-all active:scale-95"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>1-Click Approve &amp; Release</span>
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <Link
                      href="/departments/marketing"
                      className="text-primary hover:underline font-semibold flex items-center gap-1"
                    >
                      <span>View Marketing Department Page</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                    <span className="text-muted-foreground text-[11px]">Status: Live in Production</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 2. VOICE CANVAS */}
            {selectedDept === "voice" && (
              <motion.div
                key="voice"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                {/* Left: Waveform & Speech Transcript */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center justify-between text-xs border-b border-border/60 pb-3">
                    <span className="font-semibold text-foreground flex items-center gap-2">
                      <PhoneCall className="w-4 h-4 text-emerald-500" />
                      Julian · Voice Receptionist Desk
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      Live Call · 168ms Latency
                    </span>
                  </div>

                  {/* Waveform Card */}
                  <div className="rounded-2xl border border-border bg-gradient-to-br from-emerald-500/[0.03] to-background p-6 space-y-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-full bg-emerald-500/15 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                          <PhoneCall className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-foreground">Inbound Patient Call</p>
                          <p className="text-[11px] font-mono text-muted-foreground">+1 (555) 492-1084</p>
                        </div>
                      </div>

                      {/* Animated Audio Waveform */}
                      <div className="flex items-center gap-1 h-7 px-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                        {[16, 24, 12, 28, 20, 14, 26, 18].map((h, i) => (
                          <motion.span
                            key={i}
                            className="w-1 bg-emerald-500 rounded-full"
                            animate={{
                              height: voicePlaying ? [8, h, 10, h * 0.8, 8] : 8,
                            }}
                            transition={{
                              duration: 0.8,
                              repeat: Infinity,
                              delay: i * 0.08,
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Speech Transcript */}
                    <div className="p-4 rounded-xl border border-border/80 bg-card space-y-3">
                      <div className="flex items-start gap-2.5 text-xs">
                        <span className="font-bold text-muted-foreground shrink-0">Caller:</span>
                        <p className="text-foreground/80">&ldquo;Hi, I need to schedule an appointment with Dr. Chen for this Thursday afternoon if possible.&rdquo;</p>
                      </div>
                      <div className="flex items-start gap-2.5 text-xs pt-2 border-t border-border/40">
                        <span className="font-bold text-emerald-600 dark:text-emerald-400 shrink-0">Julian (AI):</span>
                        <p className="text-foreground">&ldquo;I can certainly help with that. Dr. Chen has an opening at 2:30 PM this Thursday. Shall I book that in for you?&rdquo;</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
                      <span>LiveKit SIP Trunking · Audio Sub-180ms</span>
                      <button
                        onClick={() => setVoicePlaying(!voicePlaying)}
                        className="text-primary hover:underline font-semibold flex items-center gap-1"
                      >
                        {voicePlaying ? "Pause Audio" : "Play Audio"}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right: Actions Taken */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="p-5 rounded-2xl border border-border bg-card/60 space-y-3">
                    <h3 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                      Automated Actions Triggered
                    </h3>
                    
                    <div className="space-y-2.5">
                      <div className="p-3 rounded-xl border border-border bg-card flex items-center justify-between">
                        <div>
                          <p className="text-xs font-semibold text-foreground">Google Calendar Hold</p>
                          <p className="text-[11px] text-muted-foreground">Thursday, 2:30 PM (30 min)</p>
                        </div>
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      </div>

                      <div className="p-3 rounded-xl border border-border bg-card flex items-center justify-between">
                        <div>
                          <p className="text-xs font-semibold text-foreground">SMS Confirmation Queued</p>
                          <p className="text-[11px] text-muted-foreground">Sent to +1 (555) 492-1084</p>
                        </div>
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      </div>

                      <div className="p-3 rounded-xl border border-border bg-card flex items-center justify-between">
                        <div>
                          <p className="text-xs font-semibold text-foreground">CRM Record Created</p>
                          <p className="text-[11px] text-muted-foreground">Patient profile synced</p>
                        </div>
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/departments/voice"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                  >
                    <span>View Voice Department Details</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </motion.div>
            )}

            {/* 3. SALES CANVAS */}
            {selectedDept === "sales" && (
              <motion.div
                key="sales"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                {/* Pipeline visual */}
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex items-center justify-between text-xs border-b border-border/60 pb-3">
                    <span className="font-semibold text-foreground flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-amber-500" />
                      Alex · B2B Sales Development Lead
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-mono bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                      HubSpot Synced · 14 Deals Active
                    </span>
                  </div>

                  {/* Visual Kanban Stages */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3.5 rounded-xl border border-border bg-muted/30 space-y-2">
                      <span className="text-[11px] font-bold text-muted-foreground uppercase">1. Enriched</span>
                      <div className="p-2.5 rounded-lg border border-border bg-card space-y-1 shadow-xs">
                        <p className="text-xs font-semibold text-foreground">Nexis Health</p>
                        <p className="text-[10px] text-muted-foreground">50-100 staff · $32k ARR</p>
                        <span className="inline-block px-1.5 py-0.2 rounded text-[9px] bg-primary/10 text-primary font-mono">Score: 94</span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl border border-border bg-muted/30 space-y-2">
                      <span className="text-[11px] font-bold text-muted-foreground uppercase">2. Sequence</span>
                      <div className="p-2.5 rounded-lg border border-border bg-card space-y-1 shadow-xs">
                        <p className="text-xs font-semibold text-foreground">Acme Logistics</p>
                        <p className="text-[10px] text-muted-foreground">Email 2 of 3 opened</p>
                        <span className="inline-block px-1.5 py-0.2 rounded text-[9px] bg-amber-500/10 text-amber-600 font-mono">Warm Intent</span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/[0.04] space-y-2">
                      <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">3. Booked</span>
                      <div className="p-2.5 rounded-lg border border-emerald-500/40 bg-card space-y-1 shadow-xs">
                        <p className="text-xs font-semibold text-foreground">Global Retail</p>
                        <p className="text-[10px] text-muted-foreground">Demo scheduled Fri 3 PM</p>
                        <span className="inline-block px-1.5 py-0.2 rounded text-[9px] bg-emerald-500/15 text-emerald-600 font-mono">Ready for Rep</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 space-y-4">
                  <div className="p-5 rounded-2xl border border-border bg-card/60 space-y-3">
                    <h3 className="font-semibold text-sm text-foreground">Outreach Guardrails</h3>
                    <p className="text-xs text-muted-foreground">
                      Emails are verified for tone and SPF/DKIM authentication before sending. Max 35 personalized touches per rep/day.
                    </p>
                    <div className="pt-2 text-xs text-muted-foreground">
                      <span>Integrations: </span>
                      <strong className="text-foreground">HubSpot, Apollo, LinkedIn, Gmail</strong>
                    </div>
                  </div>

                  <Link
                    href="/departments/sales"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                  >
                    <span>View Sales Department Details</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </motion.div>
            )}

            {/* 4. SUPPORT CANVAS */}
            {selectedDept === "support" && (
              <motion.div
                key="support"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center justify-between text-xs border-b border-border/60 pb-3">
                    <span className="font-semibold text-foreground flex items-center gap-2">
                      <Headphones className="w-4 h-4 text-blue-500" />
                      Sarah · Customer Support Specialist
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-mono bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                      WhatsApp Live Triage
                    </span>
                  </div>

                  <div className="rounded-2xl border border-border bg-gradient-to-br from-blue-500/[0.03] to-background p-6 space-y-4">
                    <div className="p-3.5 rounded-xl border border-border bg-card space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-foreground">Customer: Liam Davies</span>
                        <span className="text-muted-foreground">Order #92819</span>
                      </div>
                      <p className="text-xs text-foreground/80">&ldquo;My delivery was scheduled for yesterday and hasn’t arrived yet. Can you check?&rdquo;</p>
                    </div>

                    {/* Auto-Lookup Integration Chip */}
                    <div className="p-3 rounded-xl border border-emerald-500/30 bg-emerald-500/[0.04] flex items-center justify-between text-xs">
                      <span className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400">
                        Shopify Lookup: Out for delivery via DHL (Est. Today 2:00 PM)
                      </span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    </div>

                    <div className="p-3.5 rounded-xl border border-primary/20 bg-primary/5 space-y-1 text-xs">
                      <span className="font-bold text-primary">Drafted Response (Auto-Resolved):</span>
                      <p className="text-foreground/90">
                        &ldquo;Hi Liam! Your package is currently out for delivery with DHL tracking #DHL-8921. You should receive it today by 2:00 PM. Let me know if you need any other help!&rdquo;
                      </p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-4">
                  <div className="p-5 rounded-2xl border border-border bg-card/60 space-y-3">
                    <h3 className="font-semibold text-sm text-foreground">Human Escalation Rules</h3>
                    <p className="text-xs text-muted-foreground">
                      Any ticket containing negative sentiment, refund requests over $100, or legal terms is automatically handed off to your human team in Zendesk or Slack.
                    </p>
                  </div>
                  <Link
                    href="/departments/support"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                  >
                    <span>View Support Department Details</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </motion.div>
            )}

            {/* 5. OPERATIONS & FINANCE CANVAS */}
            {selectedDept === "operations" && (
              <motion.div
                key="operations"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center justify-between text-xs border-b border-border/60 pb-3">
                    <span className="font-semibold text-foreground flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-teal-500" />
                      Finance &amp; Operations Reconciliation
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-mono bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20">
                      3-Way Invoice Match: 100%
                    </span>
                  </div>

                  <div className="rounded-2xl border border-border bg-gradient-to-br from-teal-500/[0.03] to-background p-6 space-y-4">
                    <div className="grid grid-cols-3 gap-3 text-xs">
                      <div className="p-3 rounded-xl border border-border bg-card space-y-1">
                        <span className="text-[10px] font-mono text-muted-foreground">Vendor Invoice</span>
                        <p className="font-bold text-foreground">$4,250.00</p>
                        <p className="text-[10px] text-muted-foreground">Acme Hosting</p>
                      </div>
                      <div className="p-3 rounded-xl border border-border bg-card space-y-1">
                        <span className="text-[10px] font-mono text-muted-foreground">Purchase Order</span>
                        <p className="font-bold text-foreground">PO-91823</p>
                        <p className="text-[10px] text-emerald-500">Approved</p>
                      </div>
                      <div className="p-3 rounded-xl border border-border bg-card space-y-1">
                        <span className="text-[10px] font-mono text-muted-foreground">Bank Ledger</span>
                        <p className="font-bold text-foreground">Matched</p>
                        <p className="text-[10px] text-muted-foreground">Diff: $0.00</p>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/[0.04] text-xs space-y-1">
                      <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" /> Ready for Payment Batch
                      </span>
                      <p className="text-muted-foreground text-[11px]">
                        Line items match PO #91823. No pricing discrepancies detected. Awaiting CFO sign-off.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-4">
                  <div className="p-5 rounded-2xl border border-border bg-card/60 space-y-3">
                    <h3 className="font-semibold text-sm text-foreground">Zero Disbursal Without Human Review</h3>
                    <p className="text-xs text-muted-foreground">
                      AI employees can reconcile, match, and organize payments, but disbursement execution requires bank-level human credentials.
                    </p>
                  </div>
                  <Link
                    href="/departments/operations"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                  >
                    <span>View Operations Department Details</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}
