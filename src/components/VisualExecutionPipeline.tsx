"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  ShieldCheck,
  Cpu,
  CheckCircle2,
  Play,
  RotateCcw,
  Sparkles,
  Lock,
} from "lucide-react";

interface PipelineStep {
  id: number;
  label: string;
  tag: string;
  detail: string;
  icon: typeof FileText;
}

const STEPS: PipelineStep[] = [
  {
    id: 1,
    label: "Business Brief",
    tag: "Instant Trigger",
    detail: "Plain instructions received",
    icon: FileText,
  },
  {
    id: 2,
    label: "Guardrails & Policy",
    tag: "Zero-Secret Check",
    detail: "Brand & budget verified",
    icon: ShieldCheck,
  },
  {
    id: 3,
    label: "Tool Execution",
    tag: "Scoped APIs",
    detail: "Drafting in Meta & HubSpot",
    icon: Cpu,
  },
  {
    id: 4,
    label: "Human Sign-Off",
    tag: "Final Approval",
    detail: "Held until you approve",
    icon: CheckCircle2,
  },
];

export function VisualExecutionPipeline() {
  const [activeStep, setActiveStep] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isApproved, setIsApproved] = useState(false);
  const [execCount, setExecCount] = useState(148);

  // Auto-play the pipeline cycle when isPlaying is true
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev >= 4) {
          setIsApproved(true);
          return 4;
        }
        return prev + 1;
      });
    }, 2400);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleRestart = () => {
    setIsApproved(false);
    setActiveStep(1);
    setIsPlaying(true);
  };

  const handleApprove = () => {
    setIsApproved(true);
    setExecCount((c) => c + 1);
  };

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-background via-muted/20 to-background border-t border-border/60 overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-6 space-y-12">
        {/* Header - short, punchy, no long paragraphs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 max-w-4xl">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>How Work Gets Done</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-semibold tracking-tight text-foreground">
              From brief to sign-off in real-time.
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl">
              Watch how Fless turns your business brief into verified output without skipping human oversight.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => {
                if (activeStep >= 4 && isApproved) {
                  handleRestart();
                } else {
                  setIsPlaying(!isPlaying);
                }
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border border-border bg-card hover:bg-muted text-foreground transition-all shadow-xs"
            >
              {activeStep >= 4 && isApproved ? (
                <>
                  <RotateCcw className="w-3.5 h-3.5 text-primary" />
                  <span>Replay Flow</span>
                </>
              ) : isPlaying ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Playing Simulation</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-primary fill-primary" />
                  <span>Resume Flow</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* ── INTERACTIVE VISUAL PIPELINE STAGE ── */}
        <div className="relative rounded-3xl border border-border bg-card/90 backdrop-blur-xl shadow-xl overflow-hidden p-6 sm:p-10">
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* 4 Connected Pipeline Nodes */}
          <div className="relative grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-6 z-10 mb-8">
            {STEPS.map((s) => {
              const Icon = s.icon;
              const isActive = activeStep === s.id;
              const isPast = activeStep > s.id;

              return (
                <button
                  key={s.id}
                  onClick={() => {
                    setActiveStep(s.id);
                    setIsPlaying(false);
                  }}
                  className={`relative p-5 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between ${
                    isActive
                      ? "border-primary bg-primary/[0.07] shadow-lg shadow-primary/10 scale-[1.02]"
                      : isPast
                      ? "border-emerald-500/30 bg-emerald-500/[0.03] hover:border-emerald-500/50"
                      : "border-border/70 bg-card hover:border-border hover:bg-muted/50"
                  }`}
                >
                  {/* Top indicator row */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : isPast
                          ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      0{s.id}
                    </span>

                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                        isActive
                          ? "bg-primary/20 text-primary"
                          : isPast
                          ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Node Title & Status */}
                  <div className="space-y-1">
                    <h3 className="font-semibold text-sm text-foreground">
                      {s.label}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {s.detail}
                    </p>
                  </div>

                  {/* Active Pulse Pill */}
                  <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between">
                    <span className="text-[11px] font-medium text-foreground/80">
                      {s.tag}
                    </span>
                    {isActive ? (
                      <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                    ) : isPast ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-border" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* ── DYNAMIC LIVE STAGE ILLUSTRATION ── */}
          <div className="relative rounded-2xl border border-border/80 bg-background/80 p-6 sm:p-8 min-h-[340px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              {activeStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between border-b border-border/60 pb-3">
                    <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      <FileText className="w-3.5 h-3.5 text-primary" />
                      <span>Live Trigger Event</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                      Received via Slack · 142ms
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    <div className="md:col-span-7 space-y-3">
                      <div className="p-4 rounded-xl border border-primary/25 bg-primary/5 text-sm font-mono text-foreground leading-relaxed">
                        <span className="text-primary font-bold">&gt; Business Brief:</span>
                        <p className="mt-1 text-xs text-foreground/90">
                          &ldquo;Draft our Q4 product release sequence. Prepare 3 LinkedIn thought-leadership posts, 1 Instagram launch graphic, and notify the sales SDRs once approved.&rdquo;
                        </p>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span>Assigned to <strong>Maya (Marketing Manager)</strong> and <strong>Alex (Sales Assistant)</strong></span>
                      </div>
                    </div>

                    <div className="md:col-span-5 flex flex-col gap-2.5">
                      <div className="p-3.5 rounded-xl border border-border bg-card/60 flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Target Launch</span>
                        <span className="text-xs font-semibold text-foreground">Tomorrow, 9:00 AM EST</span>
                      </div>
                      <div className="p-3.5 rounded-xl border border-border bg-card/60 flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Channels</span>
                        <span className="text-xs font-semibold text-primary">LinkedIn · Instagram · HubSpot</span>
                      </div>
                      <div className="p-3.5 rounded-xl border border-border bg-card/60 flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Approval Gate</span>
                        <span className="text-xs font-semibold text-amber-500">Required before publish</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between border-b border-border/60 pb-3">
                    <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Security Guardrail Verification</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      All 4 Guardrails Passed
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/[0.04] space-y-2">
                      <div className="w-7 h-7 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                        <Lock className="w-4 h-4" />
                      </div>
                      <h4 className="font-semibold text-xs text-foreground">Zero Secret Leak</h4>
                      <p className="text-[11px] text-muted-foreground">OAuth tokens stored in encrypted vault</p>
                    </div>

                    <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/[0.04] space-y-2">
                      <div className="w-7 h-7 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <h4 className="font-semibold text-xs text-foreground">Brand Guidelines</h4>
                      <p className="text-[11px] text-muted-foreground">Tone and banned phrases verified</p>
                    </div>

                    <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/[0.04] space-y-2">
                      <div className="w-7 h-7 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <h4 className="font-semibold text-xs text-foreground">Budget Limit</h4>
                      <p className="text-[11px] text-muted-foreground">Ad spend capped at $0 (Organic only)</p>
                    </div>

                    <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/[0.04] space-y-2">
                      <div className="w-7 h-7 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <h4 className="font-semibold text-xs text-foreground">Tenant Isolation</h4>
                      <p className="text-[11px] text-muted-foreground">Customer data isolated in private tenancy</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between border-b border-border/60 pb-3">
                    <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      <Cpu className="w-3.5 h-3.5 text-purple-500" />
                      <span>Multi-App Tool Execution</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                      Drafts Ready for Review
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    {/* Draft Output Preview */}
                    <div className="md:col-span-8 p-5 rounded-2xl border border-border bg-card space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-foreground flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-blue-500" />
                          LinkedIn Carousel Draft #1
                        </span>
                        <span className="text-[11px] text-muted-foreground">Ready for Review</span>
                      </div>
                      <p className="text-xs text-foreground/90 font-sans leading-relaxed bg-muted/40 p-3 rounded-xl border border-border/60">
                        &ldquo;We just eliminated 14 hours of manual scheduling. Here is how our team orchestrated automated customer sequences with zero code. Read the breakdown below 👇&rdquo;
                      </p>
                      <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                        <span className="px-2 py-0.5 rounded bg-muted">#Operations</span>
                        <span className="px-2 py-0.5 rounded bg-muted">#Automation</span>
                        <span className="px-2 py-0.5 rounded bg-muted">#Productivity</span>
                      </div>
                    </div>

                    <div className="md:col-span-4 space-y-2.5">
                      <div className="p-3 rounded-xl border border-border bg-card/60 flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Image Asset</span>
                        <span className="text-xs font-semibold text-emerald-500">Generated (1080x1350)</span>
                      </div>
                      <div className="p-3 rounded-xl border border-border bg-card/60 flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Sales Brief</span>
                        <span className="text-xs font-semibold text-foreground">HubSpot Sequence Synced</span>
                      </div>
                      <div className="p-3 rounded-xl border border-border bg-card/60 flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Status</span>
                        <span className="text-xs font-semibold text-amber-500">Awaiting Sign-Off</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between border-b border-border/60 pb-3">
                    <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Human Verification &amp; 1-Click Sign-Off</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      {isApproved ? "Approved & Dispatched" : "Action Required"}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    <div className="md:col-span-8 space-y-4">
                      <div className="p-5 rounded-2xl border border-border bg-card space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-foreground">
                            Summary of Actions Pending
                          </span>
                          <span className="text-[11px] font-mono text-muted-foreground">
                            Audit ID #fless-exec-{execCount}
                          </span>
                        </div>
                        <ul className="text-xs text-muted-foreground space-y-1.5 list-disc pl-4">
                          <li>Publish 3 slides to company LinkedIn account</li>
                          <li>Schedule Instagram carousel for 9:00 AM EST tomorrow</li>
                          <li>Notify 4 SDRs in #sales-alerts with the link</li>
                        </ul>
                      </div>

                      {/* Interactive Sign-off Button */}
                      <div className="flex items-center gap-3">
                        {isApproved ? (
                          <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-emerald-500/25">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Successfully Approved &amp; Published!</span>
                          </div>
                        ) : (
                          <button
                            onClick={handleApprove}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold text-xs sm:text-sm shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all active:scale-95"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            <span>1-Click Approve &amp; Release</span>
                          </button>
                        )}
                        <button
                          onClick={handleRestart}
                          className="px-4 py-3 rounded-xl border border-border text-xs font-semibold hover:bg-muted text-muted-foreground transition-colors"
                        >
                          Reset Demo
                        </button>
                      </div>
                    </div>

                    <div className="md:col-span-4 p-4 rounded-xl border border-border bg-card/60 space-y-2">
                      <span className="text-[11px] font-mono uppercase text-muted-foreground font-semibold">
                        Audit Trail Record
                      </span>
                      <p className="text-xs text-foreground/80 leading-relaxed">
                        {isApproved
                          ? "Action signed cryptographically. Zero third-party tracking. Synced with your internal audit log."
                          : "Click 'Approve & Release' to simulate human authorization and release the queue."}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom Progress Bar */}
            <div className="pt-6 mt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <span>Simulation Step {activeStep} of 4</span>
                <span className="h-1 w-24 bg-muted rounded-full overflow-hidden">
                  <motion.span
                    className="h-full bg-primary block"
                    initial={{ width: "25%" }}
                    animate={{ width: `${activeStep * 25}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </span>
              </div>
              <div className="flex items-center gap-4 text-[11px]">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Human Gate: Active
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Latency: 142ms avg
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
