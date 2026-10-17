"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Code2,
  ArrowRight,
  CheckCircle2,
  Copy,
  Check,
  Terminal,
  Workflow,
  ExternalLink,
  Sparkles,
  Plus,
  Mic,
  ChevronDown,
} from "lucide-react";

interface RolePreset {
  name: string;
  tag: string;
  prompt: string;
  description: string;
  skills: string[];
  tools: string[];
  codeSnippet: string;
}

const rolePresets: RolePreset[] = [
  {
    name: "Social Media Manager",
    tag: "Marketing",
    prompt: "A social media manager that plans feed drops, publishes to Instagram & Facebook, and monitors community engagement.",
    description: "Manages social media content, plans feed drops & engages replies.",
    skills: ["content", "engagement", "audience-insights"],
    tools: ["instagram", "facebook", "buffer"],
    codeSnippet: `import { createEmployee } from '@fless/employee';

// Configure autonomous worker
export const employee = await createEmployee({
  name: 'Social Media Manager',
  description: 'Manages social media content, plans feed drops & engages replies.',
  skills: ['content', 'engagement', 'audience-insights'],
  tools: ['instagram', 'facebook', 'buffer'],
  guardrails: {
    maxDailyPosts: 4,
    requireApprovalForDMs: true,
  },
});`,
  },
  {
    name: "Customer Support Specialist",
    tag: "Support",
    prompt: "An autonomous customer support specialist for e-commerce that resolves tickets, tracks shipping, and processes returns.",
    description: "Resolves customer tickets, tracks deliveries & handles returns.",
    skills: ["order-tracking", "returns-triage", "faq-answering"],
    tools: ["whatsapp", "shopify", "zendesk"],
    codeSnippet: `import { createEmployee } from '@fless/employee';

// Configure autonomous worker
export const employee = await createEmployee({
  name: 'Customer Support Lead',
  description: 'Answers FAQs, tracks shipments & initiates returns',
  skills: ['order-tracking', 'returns-triage', 'faq-answering'],
  tools: ['whatsapp', 'shopify', 'zendesk'],
  guardrails: {
    maxRefundAutoApproveUSD: 50,
    escalateAboveThreshold: true,
  },
});`,
  },
  {
    name: "B2B Sales Development Rep",
    tag: "Sales",
    prompt: "An outbound SDR that enriches buyer accounts, scores purchase intent, and syncs qualified discovery calls to Google Calendar.",
    description: "Enriches inbound leads, scores intent & books calendar meetings.",
    skills: ["lead-enrichment", "intent-scoring", "calendar-booking"],
    tools: ["hubspot", "google-calendar", "linkedin"],
    codeSnippet: `import { createEmployee } from '@fless/employee';

// Configure autonomous worker
export const employee = await createEmployee({
  name: 'Outbound Sales SDR',
  description: 'Qualifies inbound buyers and schedules product demos',
  skills: ['lead-enrichment', 'intent-scoring', 'calendar-booking'],
  tools: ['hubspot', 'google-calendar', 'linkedin'],
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
  const [prompt, setPrompt] = useState<string>(rolePresets[0].prompt);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

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

  const handleSelectPreset = (index: number) => {
    setSelectedPresetIndex(index);
    setPrompt(rolePresets[index].prompt);
  };

  const handleGenerate = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
    }, 400);
  };

  return (
    <div className="space-y-12">
      {/* ── HEADER (LOVABLE-INSPIRED CENTERED DISPLAY) ── */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold backdrop-blur-md">
          <Terminal className="w-3.5 h-3.5" />
          <span>For Builders</span>
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-display font-semibold tracking-tight text-foreground leading-[1.08]">
          Build AI Employees
          <br />
          <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 dark:from-blue-400 dark:via-indigo-300 dark:to-purple-400 bg-clip-text text-transparent">
            with No Code or Code
          </span>
        </h2>

        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          Use our intuitive studio to create, test, and publish AI employees — or get started with our TypeScript SDK for complete developer control.
        </p>

        {/* View Mode Switcher + CTA Links */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <div className="inline-flex items-center p-1 rounded-xl bg-muted/80 border border-border text-xs text-muted-foreground font-medium shadow-xs">
            <button
              type="button"
              onClick={() => setActiveTab("both")}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === "both"
                  ? "bg-background text-foreground font-semibold shadow-xs"
                  : "hover:text-foreground"
              }`}
            >
              Studio &amp; Code
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("studio")}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === "studio"
                  ? "bg-background text-foreground font-semibold shadow-xs"
                  : "hover:text-foreground"
              }`}
            >
              No-Code Studio
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("sdk")}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === "sdk"
                  ? "bg-background text-foreground font-semibold shadow-xs"
                  : "hover:text-foreground"
              }`}
            >
              TypeScript SDK
            </button>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/builders"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white font-semibold text-xs shadow-sm hover:bg-primary/90 transition-all cursor-pointer"
            >
              <span>Start Building</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-border bg-background hover:bg-muted text-foreground font-medium text-xs transition-colors cursor-pointer"
            >
              <span>View Documentation</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ── THE SIGNATURE LOVABLE-STYLE PROMPT OMNIBAR ── */}
      <div className="max-w-3xl mx-auto space-y-3">
        <div className="relative rounded-2xl sm:rounded-full border border-border bg-card/90 dark:bg-card/70 backdrop-blur-xl shadow-xl shadow-primary/5 p-2 sm:p-2.5 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 transition-all hover:border-primary/40 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
          <div className="flex items-center gap-2 px-2 shrink-0">
            <button
              type="button"
              title="Add capability or integration"
              className="w-8 h-8 rounded-full bg-muted hover:bg-primary/10 hover:text-primary text-muted-foreground flex items-center justify-center transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleGenerate();
            }}
            placeholder="Ask Fless to create an AI employee for..."
            className="flex-1 bg-transparent border-0 outline-none text-xs sm:text-sm text-foreground placeholder:text-muted-foreground px-2 py-1.5 min-w-0"
          />

          <div className="flex items-center justify-end gap-1.5 shrink-0 px-1">
            <div className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-muted text-[11px] font-medium text-muted-foreground border border-border">
              <span>{activeTab === "sdk" ? "TypeScript" : "Visual"}</span>
              <ChevronDown className="w-3 h-3" />
            </div>

            <button
              type="button"
              title="Voice prompt"
              className="w-8 h-8 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors cursor-pointer"
            >
              <Mic className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={handleGenerate}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-white text-xs font-semibold hover:bg-primary/90 shadow-sm transition-all cursor-pointer"
            >
              {isSimulating ? (
                <>
                  <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Configuring...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Generate</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Quick Sample Spec Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs">
          <span className="text-[11px] font-mono text-muted-foreground">Sample Spec:</span>
          {rolePresets.map((preset, idx) => (
            <button
              key={preset.name}
              type="button"
              onClick={() => handleSelectPreset(idx)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                selectedPresetIndex === idx
                  ? "bg-primary text-white font-semibold shadow-xs"
                  : "bg-muted/80 text-muted-foreground hover:bg-muted hover:text-foreground border border-border/70"
              }`}
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* ── INTERACTIVE STUDIO & CODE ENGINE CONTAINER ── */}
      <div className="max-w-[1140px] mx-auto rounded-3xl border border-border/80 bg-card/80 backdrop-blur-xl shadow-2xl overflow-hidden">
        {/* Top Window Navigation Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-muted/40 border-b border-border text-xs">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>
            <span className="text-border">|</span>
            <span className="text-foreground font-semibold text-xs flex items-center gap-2">
              <span className="w-4 h-4 rounded bg-primary text-white text-[10px] flex items-center justify-center font-bold">F</span>
              Fless Studio &amp; SDK Engine
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px] font-mono text-muted-foreground">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              SDK v2.4 Active
            </span>
            <span>TypeScript 5.6</span>
          </div>
        </div>

        {/* Dynamic Studio & Code Panels */}
        <div className="p-5 sm:p-7">
          <div
            className={`grid gap-6 ${
              activeTab === "both"
                ? "grid-cols-1 lg:grid-cols-12"
                : "grid-cols-1"
            }`}
          >
            {/* ── PANEL A: FLESS STUDIO (NO-CODE VISUAL BUILDER) ── */}
            {(activeTab === "both" || activeTab === "studio") && (
              <div
                className={`${
                  activeTab === "both" ? "lg:col-span-6" : "w-full"
                } rounded-2xl border border-border bg-background p-5 sm:p-6 space-y-5 flex flex-col justify-between shadow-xs`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-sm text-foreground flex items-center gap-1.5">
                        <Workflow className="w-4 h-4 text-primary" />
                        <span>Fless Studio</span>
                      </h3>
                      <p className="text-muted-foreground text-xs mt-0.5">
                        Create Your AI Employee
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-md text-[10.5px] font-mono font-semibold bg-primary/10 text-primary border border-primary/20">
                      Visual Builder
                    </span>
                  </div>

                  {/* Visual Describe Box */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-mono text-muted-foreground block font-medium">
                      Describe what you want
                    </label>
                    <div className="relative">
                      <input
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="w-full bg-muted/40 border border-border rounded-xl px-3.5 py-2.5 text-xs text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors pr-24"
                        placeholder="Describe the employee you want..."
                      />
                      <button
                        type="button"
                        onClick={handleGenerate}
                        className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-primary text-white text-[11px] font-semibold hover:bg-primary/90 shadow-xs transition-colors cursor-pointer"
                      >
                        Generate
                      </button>
                    </div>
                  </div>

                  {/* 4 Steps Checklist */}
                  <div className="space-y-2.5 pt-2 border-t border-border text-xs">
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-muted/40 border border-border">
                      <div className="flex items-center gap-2.5 text-foreground">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span className="font-medium text-[12px]">Define role &amp; capabilities</span>
                      </div>
                      <span className="text-[10.5px] font-mono font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        {currentPreset.tag}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-muted/40 border border-border">
                      <div className="flex items-center gap-2.5 text-foreground">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span className="font-medium text-[12px]">Connect tools &amp; integrations</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[10.5px] text-muted-foreground font-mono">
                        {currentPreset.tools.slice(0, 2).map((t) => (
                          <span key={t} className="bg-background border border-border px-2 py-0.5 rounded shadow-xs font-semibold text-foreground">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-muted/40 border border-border">
                      <div className="flex items-center gap-2.5 text-foreground">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span className="font-medium text-[12px]">Test in sandbox</span>
                      </div>
                      <span className="text-[11px] font-mono text-muted-foreground">
                        142ms latency
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-muted/40 border border-border">
                      <div className="flex items-center gap-2.5 text-foreground">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span className="font-medium text-[12px]">Publish to marketplace</span>
                      </div>
                      <span className="text-[11px] font-mono text-primary font-bold">
                        70% Builder Share
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/builders"
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-all shadow-sm cursor-pointer"
                  >
                    <span>Open in Studio</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}

            {/* ── PANEL B: TYPESCRIPT SDK (CODE ENGINE) ── */}
            {(activeTab === "both" || activeTab === "sdk") && (
              <div
                className={`${
                  activeTab === "both" ? "lg:col-span-6" : "w-full"
                } rounded-2xl border border-border bg-[#0B0F19] text-white p-5 sm:p-6 space-y-4 flex flex-col justify-between shadow-xs`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <Code2 className="w-4 h-4 text-primary" />
                      <span className="text-white font-semibold text-xs sm:text-sm">
                        Build with our TypeScript SDK
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={handleCopyCode}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/15 text-white/80 hover:text-white text-[11px] font-mono transition-colors cursor-pointer"
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

                  {/* Clean Code Block with Syntax Highlighting */}
                  <div className="rounded-xl bg-[#04060C] p-3.5 border border-white/10 font-mono text-[11.5px] leading-relaxed text-neutral-300 overflow-x-auto select-all max-h-[220px]">
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
                  <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 font-mono text-[11px] space-y-1.5">
                    <div className="flex items-center justify-between text-white/50 text-[10px]">
                      <span>TERMINAL</span>
                      <span className="text-emerald-400 font-semibold">READY</span>
                    </div>
                    <div className="text-primary font-semibold">$ npx fless deploy ./employee.ts</div>
                    <div className="text-white/70 text-[10.5px]">
                      ✔ Verified typed skills &amp; policy gates across runtime
                    </div>
                  </div>
                </div>

                <div className="pt-1">
                  <Link
                    href="/docs"
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-white/20 bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors shadow-sm cursor-pointer"
                  >
                    <span>View SDK Docs</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
