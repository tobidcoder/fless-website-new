"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  ArrowRight,
  CheckCircle2,
  Copy,
  Check,
  Terminal,
  Sliders,
  Sparkle,
  Workflow,
  ExternalLink,
  Layers,
  ShieldCheck,
  Play,
  Cpu,
} from "lucide-react";

interface RolePreset {
  name: string;
  tag: string;
  description: string;
  skills: string[];
  tools: string[];
  codeSnippet: string;
}

const rolePresets: RolePreset[] = [
  {
    name: "Social Media Manager",
    tag: "Marketing",
    description: "Manages social media content, plans feed drops & engages replies.",
    skills: ["content", "engagement", "audience-insights"],
    tools: ["instagram", "facebook", "buffer"],
    codeSnippet: `import { createEmployee } from '@fless/employee';

export const employee = await createEmployee({
  name: 'Social Media Manager',
  description: 'Manages social media content & engagements',
  skills: ['content', 'engagement'],
  tools: ['@fless/instagram', '@fless/facebook'],
  guardrails: {
    maxDailyPosts: 4,
    requireApprovalForDMs: true,
  },
});`,
  },
  {
    name: "Customer Support Specialist",
    tag: "Support",
    description: "Resolves customer tickets, tracks deliveries & handles returns.",
    skills: ["order-tracking", "returns-triage", "faq-answering"],
    tools: ["whatsapp", "shopify", "zendesk"],
    codeSnippet: `import { createEmployee } from '@fless/employee';

export const employee = await createEmployee({
  name: 'Customer Support Lead',
  description: 'Answers FAQs, tracks shipments & initiates returns',
  skills: ['order-tracking', 'returns'],
  tools: ['@fless/whatsapp', '@fless/shopify'],
  guardrails: {
    maxRefundAutoApproveUSD: 50,
    escalateAboveThreshold: true,
  },
});`,
  },
  {
    name: "B2B Sales Development Rep",
    tag: "Sales",
    description: "Enriches inbound leads, scores intent & books calendar meetings.",
    skills: ["lead-enrichment", "intent-scoring", "calendar-booking"],
    tools: ["hubspot", "google-calendar", "linkedin"],
    codeSnippet: `import { createEmployee } from '@fless/employee';

export const employee = await createEmployee({
  name: 'Outbound Sales SDR',
  description: 'Qualifies inbound buyers and schedules product demos',
  skills: ['lead-scoring', 'calendar-sync'],
  tools: ['@fless/hubspot', '@fless/google-calendar'],
  guardrails: {
    minIntentScoreToBook: 80,
  },
});`,
  },
];

export function ModernBuilderShowcase() {
  const [activeTab, setActiveTab] = useState<"both" | "studio" | "sdk">("both");
  const [selectedPresetIndex, setSelectedPresetIndex] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
  const [customPrompt, setCustomPrompt] = useState<string>(
    "A social media manager for real estate agents that creates weekly market reports"
  );

  const currentPreset = rolePresets[selectedPresetIndex];

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(currentPreset.codeSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
      {/* ── LEFT COLUMN: HEADLINE, DESCRIPTION & ACTIONS ── */}
      <div className="lg:col-span-4 space-y-6 text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-white/90 text-xs font-semibold backdrop-blur-md">
          <Terminal className="w-3.5 h-3.5 text-primary" />
          <span>For Builders</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-display font-semibold tracking-tight text-white leading-[1.1]">
          Build AI Employees
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
            with No Code or Code
          </span>
        </h2>

        <p className="text-white/70 text-sm sm:text-base leading-relaxed">
          Use our intuitive studio to create, test, and publish AI employees — or get started with our TypeScript SDK for complete developer control.
        </p>

        {/* View Switcher Pills */}
        <div className="inline-flex items-center p-1 rounded-xl bg-white/5 border border-white/10 text-xs text-white/70 font-medium">
          <button
            type="button"
            onClick={() => setActiveTab("both")}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === "both"
                ? "bg-primary text-white font-semibold shadow-xs"
                : "hover:text-white"
            }`}
          >
            Studio &amp; Code
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("studio")}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === "studio"
                ? "bg-primary text-white font-semibold shadow-xs"
                : "hover:text-white"
            }`}
          >
            No-Code Studio
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("sdk")}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === "sdk"
                ? "bg-primary text-white font-semibold shadow-xs"
                : "hover:text-white"
            }`}
          >
            TypeScript SDK
          </button>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center gap-3.5 pt-2">
          <Link
            href="/builders"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-white font-semibold text-xs sm:text-sm shadow-lg shadow-primary/30 hover:bg-primary-hover transition-all cursor-pointer"
          >
            <span>Start Building</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/docs"
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-white/20 bg-white/5 text-white font-semibold text-xs sm:text-sm hover:bg-white/10 transition-colors backdrop-blur-md cursor-pointer"
          >
            <span>View Documentation</span>
          </Link>
        </div>
      </div>

      {/* ── RIGHT COLUMN: INTERACTIVE MODERN WINDOW CONTAINER ── */}
      <div className="lg:col-span-8 rounded-3xl border border-white/15 bg-[#0B0F19]/90 backdrop-blur-xl shadow-2xl overflow-hidden relative">
        {/* Subtle top light bar */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

        {/* Window Chrome Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#101625]/90 border-b border-white/10 text-xs">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>
            <span className="text-white/20">|</span>
            <span className="text-white font-semibold text-xs flex items-center gap-2">
              <span className="w-4 h-4 rounded bg-primary text-white text-[10px] flex items-center justify-center font-bold">F</span>
              Fless Studio &amp; SDK Engine
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px] font-mono text-white/60">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/5 border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              SDK v2.4 Active
            </span>
            <span>TypeScript 5.6</span>
          </div>
        </div>

        {/* Quick Preset Selector Chips */}
        <div className="px-5 py-2.5 bg-[#0E1321] border-b border-white/10 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-white/50 text-[11px] font-mono shrink-0">Sample Spec:</span>
          {rolePresets.map((preset, idx) => (
            <button
              key={preset.name}
              type="button"
              onClick={() => {
                setSelectedPresetIndex(idx);
                setCustomPrompt(preset.description);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all shrink-0 cursor-pointer ${
                selectedPresetIndex === idx
                  ? "bg-primary text-white shadow-xs font-semibold"
                  : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10"
              }`}
            >
              {preset.name}
            </button>
          ))}
        </div>

        {/* Dynamic Studio & Code Panels */}
        <div className="p-5 sm:p-6">
          <div
            className={`grid gap-6 ${
              activeTab === "both"
                ? "grid-cols-1 md:grid-cols-12"
                : "grid-cols-1"
            }`}
          >
            {/* ── PANEL A: FLESS STUDIO (NO-CODE) ── */}
            {(activeTab === "both" || activeTab === "studio") && (
              <motion.div
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`${
                  activeTab === "both" ? "md:col-span-6" : "w-full"
                } rounded-2xl border border-white/10 bg-[#070A12] p-4 sm:p-5 space-y-4 flex flex-col justify-between`}
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-semibold text-xs sm:text-sm flex items-center gap-1.5">
                        <Workflow className="w-3.5 h-3.5 text-primary" />
                        <span>Fless Studio</span>
                      </h4>
                      <p className="text-white/60 text-[11px] mt-0.5">
                        Create Your AI Employee
                      </p>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-primary/20 text-primary border border-primary/30">
                      Visual Builder
                    </span>
                  </div>

                  {/* Input Simulation Box */}
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-mono text-white/50 block">
                      Describe what you want
                    </label>
                    <div className="relative">
                      <input
                        value={customPrompt}
                        onChange={(e) => setCustomPrompt(e.target.value)}
                        className="w-full bg-white/5 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-primary transition-colors pr-24"
                        placeholder="Describe the employee you want..."
                      />
                      <button
                        type="button"
                        className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-primary text-white text-[11px] font-semibold hover:bg-primary-hover shadow-xs transition-colors cursor-pointer"
                      >
                        Generate
                      </button>
                    </div>
                  </div>

                  {/* 4 Steps Checklist with Modern Sleek Indicators */}
                  <div className="space-y-2.5 pt-2 border-t border-white/10 text-xs">
                    <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.03] border border-white/5">
                      <div className="flex items-center gap-2 text-white/90">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="font-medium text-[11.5px]">Define role &amp; capabilities</span>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                        {currentPreset.tag}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.03] border border-white/5">
                      <div className="flex items-center gap-2 text-white/90">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="font-medium text-[11.5px]">Connect tools &amp; integrations</span>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-white/60 font-mono">
                        {currentPreset.tools.slice(0, 2).map((t) => (
                          <span key={t} className="bg-white/10 px-1.5 py-0.5 rounded">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.03] border border-white/5">
                      <div className="flex items-center gap-2 text-white/90">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="font-medium text-[11.5px]">Test in sandbox</span>
                      </div>
                      <span className="text-[10px] font-mono text-white/60">
                        142ms latency
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.03] border border-white/5">
                      <div className="flex items-center gap-2 text-white/90">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="font-medium text-[11.5px]">Publish to marketplace</span>
                      </div>
                      <span className="text-[10px] font-mono text-primary font-semibold">
                        70% Builder Share
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/builders"
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-all border border-white/15 cursor-pointer"
                  >
                    <span>Open in Studio</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            )}

            {/* ── PANEL B: TYPESCRIPT SDK (CODE) ── */}
            {(activeTab === "both" || activeTab === "sdk") && (
              <motion.div
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`${
                  activeTab === "both" ? "md:col-span-6" : "w-full"
                } rounded-2xl border border-white/10 bg-[#04060C] p-4 sm:p-5 space-y-3.5 flex flex-col justify-between`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <Code2 className="w-3.5 h-3.5 text-primary" />
                      <span className="text-white font-semibold text-xs">
                        Build with our TypeScript SDK
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={handleCopyCode}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/15 text-white/80 hover:text-white text-[10.5px] font-mono transition-colors cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Code Block with Crisp Syntax Colors */}
                  <div className="rounded-xl bg-[#020307] p-3 border border-white/5 font-mono text-[11px] leading-relaxed text-neutral-300 overflow-x-auto select-all max-h-[220px]">
                    <pre className="space-y-1">
                      <div>
                        <span className="text-blue-400 font-bold">import</span>{" "}
                        <span className="text-white">{"{ createEmployee }"}</span>{" "}
                        <span className="text-blue-400 font-bold">from</span>{" "}
                        <span className="text-emerald-400">&apos;@fless/employee&apos;</span>;
                      </div>
                      <div className="text-white/40">{"// Configure autonomous worker"}</div>
                      <div>
                        <span className="text-blue-400 font-bold">const</span>{" "}
                        <span className="text-amber-300">employee</span> ={" "}
                        <span className="text-blue-400 font-bold">await</span>{" "}
                        <span className="text-indigo-300">createEmployee</span>({"{"}
                      </div>
                      <div className="pl-4">
                        <span className="text-white/80">name:</span>{" "}
                        <span className="text-emerald-400">&apos;{currentPreset.name}&apos;</span>,
                      </div>
                      <div className="pl-4">
                        <span className="text-white/80">description:</span>{" "}
                        <span className="text-emerald-400">&apos;{currentPreset.description}&apos;</span>,
                      </div>
                      <div className="pl-4">
                        <span className="text-white/80">skills:</span> [
                        {currentPreset.skills.map((s, i) => (
                          <span key={s} className="text-amber-400">
                            &apos;{s}&apos;{i < currentPreset.skills.length - 1 ? ", " : ""}
                          </span>
                        ))}
                        ],
                      </div>
                      <div className="pl-4">
                        <span className="text-white/80">tools:</span> [
                        {currentPreset.tools.map((t, i) => (
                          <span key={t} className="text-indigo-300">
                            &apos;{t}&apos;{i < currentPreset.tools.length - 1 ? ", " : ""}
                          </span>
                        ))}
                        ],
                      </div>
                      <div>{"});"}</div>
                    </pre>
                  </div>

                  {/* Terminal CLI Trace */}
                  <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 font-mono text-[10.5px] space-y-1">
                    <div className="flex items-center justify-between text-white/50 text-[10px]">
                      <span>TERMINAL</span>
                      <span className="text-emerald-400">READY</span>
                    </div>
                    <div className="text-primary font-semibold">$ npx fless deploy ./employee.ts</div>
                    <div className="text-white/60 text-[10px]">
                      ✔ Verified typed skills &amp; policy gates across runtime
                    </div>
                  </div>
                </div>

                <div className="pt-1">
                  <Link
                    href="/docs"
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-hover transition-colors shadow-sm cursor-pointer"
                  >
                    <span>View SDK Docs</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
