"use client";

import { useState } from "react";
import {
  ShieldCheck,
  Lock,
  History,
  CheckCircle2,
  FileKey2,
  Eye,
  Sliders,
} from "lucide-react";

export function InteractiveGovernanceCockpit() {
  const [strictnessLevel, setStrictnessLevel] = useState<"standard" | "strict" | "drafts">("standard");

  return (
    <section className="py-20 md:py-28 bg-muted/20 border-t border-border/60 overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-6 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 max-w-4xl">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
              <Lock className="w-3.5 h-3.5" />
              <span>Governance &amp; Business Control</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-semibold tracking-tight text-foreground">
              You keep the keys &amp; the final say.
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl">
              AI employees cannot act autonomously outside the boundary lines you specify. Test different guardrail levels below.
            </p>
          </div>

          {/* Interactive Policy Level Toggle */}
          <div className="flex items-center p-1 rounded-2xl border border-border bg-card shadow-xs shrink-0">
            <button
              onClick={() => setStrictnessLevel("standard")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                strictnessLevel === "standard"
                  ? "bg-primary text-white shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Standard Policy
            </button>
            <button
              onClick={() => setStrictnessLevel("strict")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                strictnessLevel === "strict"
                  ? "bg-primary text-white shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Strict Compliance
            </button>
            <button
              onClick={() => setStrictnessLevel("drafts")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                strictnessLevel === "drafts"
                  ? "bg-primary text-white shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Drafts Only
            </button>
          </div>
        </div>

        {/* ── COCKPIT INTERACTIVE STAGE ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Interactive Policy Matrix */}
          <div className="lg:col-span-7 rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-6 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <Sliders className="w-3.5 h-3.5 text-primary" />
                  Active Enforcement Matrix
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  {strictnessLevel === "standard" && "Standard Enterprise"}
                  {strictnessLevel === "strict" && "Maximum Compliance"}
                  {strictnessLevel === "drafts" && "Read-Only Sandbox"}
                </span>
              </div>

              {/* Policy Rows */}
              <div className="space-y-3">
                <div className="p-4 rounded-2xl border border-border bg-muted/20 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-foreground">Human Approval Gate</h4>
                      <p className="text-[11px] text-muted-foreground">
                        {strictnessLevel === "drafts"
                          ? "All outputs locked in internal draft mode"
                          : strictnessLevel === "strict"
                          ? "Every single outbound action requires manager sign-off"
                          : "Required for public posts, payments, and external emails"}
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400 shrink-0">
                    ENFORCED
                  </span>
                </div>

                <div className="p-4 rounded-2xl border border-border bg-muted/20 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-primary/15 text-primary flex items-center justify-center shrink-0">
                      <FileKey2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-foreground">Zero-Secret Vault</h4>
                      <p className="text-[11px] text-muted-foreground">
                        OAuth tokens never enter LLM prompts; stored in encrypted key vaults
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-primary shrink-0">
                    ACTIVE
                  </span>
                </div>

                <div className="p-4 rounded-2xl border border-border bg-muted/20 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-purple-500/15 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                      <Lock className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-foreground">Workspace Boundary Isolation</h4>
                      <p className="text-[11px] text-muted-foreground">
                        Your company data is never used to train public models
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-purple-600 dark:text-purple-400 shrink-0">
                    ISOLATED
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Status bar */}
            <div className="pt-4 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Zero Data Leak Guarantee</span>
              </span>
              <span className="font-mono text-[11px]">SOC2 Type II Aligned</span>
            </div>
          </div>

          {/* Right: Live Cryptographic Audit Stream */}
          <div className="lg:col-span-5 rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-6 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <History className="w-3.5 h-3.5 text-primary" />
                  Tamper-Evident Audit Log
                </span>
                <span className="flex items-center gap-1.5 text-[11px] text-emerald-500 font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Live Stream
                </span>
              </div>

              {/* Log Ticker entries */}
              <div className="space-y-2.5 font-mono text-[11px]">
                <div className="p-3 rounded-xl border border-border/60 bg-muted/40 space-y-1">
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>14:52:19 EST</span>
                    <span className="text-emerald-500 font-bold">APPROVED</span>
                  </div>
                  <p className="text-foreground font-sans font-medium text-xs">
                    Maya published LinkedIn Carousel #104
                  </p>
                  <p className="text-muted-foreground/75 text-[10px]">
                    Signed by: Alex (Admin) · Hash: 0x8f2a...1e4b
                  </p>
                </div>

                <div className="p-3 rounded-xl border border-border/60 bg-muted/40 space-y-1">
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>14:48:02 EST</span>
                    <span className="text-blue-500 font-bold">ROUTED</span>
                  </div>
                  <p className="text-foreground font-sans font-medium text-xs">
                    Julian answered inbound call &amp; booked calendar hold
                  </p>
                  <p className="text-muted-foreground/75 text-[10px]">
                    Caller: +1 (555) 492-1084 · Duration: 84s
                  </p>
                </div>

                <div className="p-3 rounded-xl border border-border/60 bg-muted/40 space-y-1">
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>14:35:41 EST</span>
                    <span className="text-amber-500 font-bold">HELD</span>
                  </div>
                  <p className="text-foreground font-sans font-medium text-xs">
                    Invoice #91823 matched PO · Held for CFO sign-off
                  </p>
                  <p className="text-muted-foreground/75 text-[10px]">
                    Disbursal: $4,250.00 · Gate: CFO approval
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border/60 text-center">
              <span className="text-xs text-muted-foreground flex items-center justify-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-primary" />
                100% of actions recorded with immutable timestamps
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
