"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Code2,
  Terminal,
  ShieldCheck,
  Cpu,
  ArrowRight,
  CheckCircle2,
  Workflow,
  Stethoscope,
  MessageSquare,
  Calendar,
  Check,
  BookOpen,
  DollarSign,
  Copy,
  PhoneCall,
  FileText,
  Users,
  Activity,
  ChevronRight,
} from "lucide-react";

export default function BuildersPage() {
  const [copiedInstall, setCopiedInstall] = useState(false);
  const [activeTab, setActiveTab] = useState<"manifest" | "terminal" | "runtime">("manifest");
  const [activeStage, setActiveStage] = useState<number>(0);

  const handleCopyInstall = () => {
    navigator.clipboard.writeText("npm install @fless/employee-sdk");
    setCopiedInstall(true);
    setTimeout(() => setCopiedInstall(false), 2000);
  };

  const workflowStages = [
    {
      step: "01",
      title: "Author Manifest in TypeScript",
      desc: "Import defineEmployee() to specify prompt, tools, allowed countries, and pricing models with strict types.",
      badge: "TypeScript SDK",
      command: "npm i @fless/employee-sdk",
      detail: "Define system instructions, configure model tiers, and declare required packages like @fless/voice or @fless/whatsapp.",
    },
    {
      step: "02",
      title: "Simulate in Hermetic Sandbox",
      desc: "Run automated multi-turn dialogues against local mock gateways without exposing live API tokens or credentials.",
      badge: "Offline Sandbox",
      command: "npx @fless/cli test ./employee.ts",
      detail: "Hermetic mock adapters simulate WhatsApp webhooks, phone keypad events, and Google Calendar slots in memory.",
    },
    {
      step: "03",
      title: "Pass 11-Dimension Safety Rubric",
      desc: "Our automated verification suite validates tool parameter precision, token efficiency, and boundary isolation.",
      badge: "Automated Evaluation",
      command: "npx @fless/cli verify ./employee.ts",
      detail: "Checks for prompt injection resilience, latency ceilings, and ensure zero runtime secrets exposure.",
    },
    {
      step: "04",
      title: "Publish & Earn 35% Royalties",
      desc: "Push your signed manifest to the Fless Marketplace. Earn 35% of monthly subscriptions and metered usage automatically.",
      badge: "Instant Distribution",
      command: "npx @fless/cli publish",
      detail: "Companies hire your worker with one click. Payouts clear monthly directly into your bank account or Stripe.",
    },
  ];

  const managedPackages = [
    {
      name: "@fless/voice",
      title: "Real-Time Telephony",
      desc: "Inbound phone reception, outbound dialing, dynamic turn-taking, and warm call transfers under 300ms.",
      icon: PhoneCall,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
      border: "border-purple-500/20",
    },
    {
      name: "@fless/whatsapp",
      title: "WhatsApp Cloud API",
      desc: "Two-way customer chats, interactive template dispatch, and patient/client appointment confirmation flows.",
      icon: MessageSquare,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
    },
    {
      name: "@fless/google-calendar",
      title: "Calendar Engine",
      desc: "Real-time free/busy availability lookups, double-booking prevention, and automated calendar invitations.",
      icon: Calendar,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
    },
    {
      name: "@fless/crm",
      title: "CRM & Pipelines",
      desc: "Contact lookups, deal stage updates, and customer activity logs synced across HubSpot, Salesforce, and custom DBs.",
      icon: Users,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
    },
    {
      name: "@fless/documents",
      title: "Document OCR & Extraction",
      desc: "Scans PDFs, invoices, receipts, and clinical forms to return structured, validated JSON data.",
      icon: FileText,
      color: "text-rose-500",
      bg: "bg-rose-500/10",
      border: "border-rose-500/20",
    },
    {
      name: "@fless/slack",
      title: "Team Escalations",
      desc: "Internal channel alerts, human manager handoffs on edge cases, and asynchronous operations dispatching.",
      icon: Workflow,
      color: "text-teal-500",
      bg: "bg-teal-500/10",
      border: "border-teal-500/20",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/20 selection:text-primary">
      <Header activePage="builders" />

      <main className="flex-1 pt-24 pb-20">
        {/* SECTION 1: HERO */}
        <section className="relative max-w-[1240px] mx-auto px-6 pt-10 pb-16 space-y-8">
          <div className="text-center space-y-5 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-wide">
              <Terminal className="w-3.5 h-3.5" />
              <span>@fless/employee-sdk • Builder Beta</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-display font-semibold tracking-tight leading-[1.08] uppercase">
              BUILD AI EMPLOYEES. <br />
              <span className="text-primary">DEPLOY INTO REAL COMPANIES.</span>
            </h1>

            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Write typed manifests in TypeScript. Test them offline in a hermetic sandbox. Publish to the marketplace and earn 35% of all recurring subscriptions and metered usage.
            </p>

            {/* Action Buttons & Install Pill */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href="/start"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-md shadow-primary/25 hover:bg-primary-hover transition-all"
              >
                Join Builder Beta
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/docs"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border bg-card text-foreground font-semibold text-sm hover:bg-muted/80 transition-colors"
              >
                <BookOpen className="w-4 h-4 text-primary" />
                Read Builder Docs
              </Link>

              {/* Quick Install Pill */}
              <button
                onClick={handleCopyInstall}
                className="inline-flex items-center gap-2.5 px-4 py-3 rounded-xl border border-border bg-card hover:bg-muted/70 text-xs font-mono text-muted-foreground hover:text-foreground transition-all"
                title="Copy install command"
              >
                <span className="text-primary">$</span>
                <span>npm i @fless/employee-sdk</span>
                {copiedInstall ? (
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                )}
              </button>
            </div>
          </div>

          {/* HERO VISUAL: SLEEK DUAL-PANE CODE & RUNTIME CONSOLE */}
          <div className="pt-4 max-w-4xl mx-auto">
            <div className="rounded-2xl border border-border/80 bg-[#0B0F19] text-neutral-200 overflow-hidden shadow-2xl">
              {/* Window Header */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#111726] border-b border-neutral-800/80 text-xs">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-neutral-400 font-mono text-[11px] ml-2">employee-workspace/src</span>
                </div>

                <div className="flex items-center gap-1 bg-neutral-900/90 p-1 rounded-lg border border-neutral-800 text-[11px]">
                  <button
                    onClick={() => setActiveTab("manifest")}
                    className={`px-2.5 py-1 rounded-md transition-colors ${
                      activeTab === "manifest" ? "bg-primary text-white font-medium" : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    employee.ts
                  </button>
                  <button
                    onClick={() => setActiveTab("terminal")}
                    className={`px-2.5 py-1 rounded-md transition-colors ${
                      activeTab === "terminal" ? "bg-primary text-white font-medium" : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    cli-verify
                  </button>
                  <button
                    onClick={() => setActiveTab("runtime")}
                    className={`px-2.5 py-1 rounded-md transition-colors ${
                      activeTab === "runtime" ? "bg-primary text-white font-medium" : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    sandbox-live
                  </button>
                </div>
              </div>

              {/* Tab Contents */}
              <div className="p-5 font-mono text-[12px] sm:text-[13px] leading-relaxed overflow-x-auto min-h-[260px]">
                {activeTab === "manifest" && (
                  <pre className="text-neutral-300">
                    <span className="text-neutral-500">{"// 1. Define typed employee manifest"}</span>{"\n"}
                    <span className="text-primary font-semibold">import</span> {"{ defineEmployee }"} <span className="text-primary font-semibold">from</span> <span className="text-emerald-400">&apos;@fless/employee-sdk&apos;</span>;{"\n\n"}
                    <span className="text-primary font-semibold">export default</span> defineEmployee({"{"}{"\n"}
                    {"  "}id: <span className="text-emerald-400">&apos;clinic-receptionist-ng&apos;</span>,{"\n"}
                    {"  "}name: <span className="text-emerald-400">&apos;Lagos Clinic Concierge&apos;</span>,{"\n"}
                    {"  "}department: <span className="text-emerald-400">&apos;VOICE&apos;</span>,{"\n"}
                    {"  "}targetMarket: {"{"} countries: [<span className="text-emerald-400">&apos;NG&apos;</span>], industries: [<span className="text-emerald-400">&apos;Healthcare&apos;</span>] {"}"},{"\n"}
                    {"  "}pricing: {"{"} model: <span className="text-emerald-400">&apos;BASE_PLUS_USAGE&apos;</span>, basePriceCents: <span className="text-amber-400">4900</span> {"}"},{"\n"}
                    {"  "}requiredPackages: [<span className="text-emerald-400">&apos;@fless/voice&apos;</span>, <span className="text-emerald-400">&apos;@fless/whatsapp&apos;</span>, <span className="text-emerald-400">&apos;@fless/google-calendar&apos;</span>],{"\n"}
                    {"  "}capabilities: [<span className="text-emerald-400">&apos;voice.inbound&apos;</span>, <span className="text-emerald-400">&apos;calendar.booking&apos;</span>, <span className="text-emerald-400">&apos;whatsapp.chat&apos;</span>],{"\n"}
                    {"  "}systemInstructions: <span className="text-emerald-400">&apos;Warm, professional receptionist for West African clinics.&apos;</span>{"\n"}
                    {"}"});
                  </pre>
                )}

                {activeTab === "terminal" && (
                  <pre className="text-neutral-300 space-y-1">
                    <span className="text-neutral-500">$ npx @fless/cli verify ./src/employee.ts</span>{"\n\n"}
                    <span className="text-blue-400">ℹ [1/4]</span> Manifest schema validation: <span className="text-emerald-400">PASSED</span> (id: clinic-receptionist-ng){"\n"}
                    <span className="text-blue-400">ℹ [2/4]</span> Tool binding authorization: <span className="text-emerald-400">PASSED</span> (3 packages bound){"\n"}
                    <span className="text-blue-400">ℹ [3/4]</span> Offline sandbox simulation: <span className="text-emerald-400">10/10 dialogue turns verified</span>{"\n"}
                    <span className="text-blue-400">ℹ [4/4]</span> 11-dimension evaluation score: <span className="text-emerald-400">96.8 / 100</span> (A+ Grade){"\n\n"}
                    <span className="text-emerald-400 font-bold">✔ Build signed with SHA-256: d8f49a21e0b...</span>{"\n"}
                    <span className="text-neutral-400">Ready for marketplace publishing with `npx @fless/cli publish`.</span>
                  </pre>
                )}

                {activeTab === "runtime" && (
                  <pre className="text-neutral-300 space-y-1">
                    <span className="text-neutral-500">{"// Simulated multi-turn turn exchange in hermetic memory"}</span>{"\n\n"}
                    <span className="text-purple-400">CALLER :</span> &quot;Hello, I need to schedule a dental checkup for Friday 2 PM.&quot;{"\n"}
                    <span className="text-amber-400">INVOKE :</span> calendar.checkAvailability({"{"} date: &quot;2026-10-10&quot;, slot: &quot;14:00&quot; {"}"}) <span className="text-emerald-400">→ [FREE]</span>{"\n"}
                    <span className="text-blue-400">AI AGENT:</span> &quot;Friday at 2:00 PM is open with Dr. Okonjo. May I confirm your name and phone number?&quot;{"\n"}
                    <span className="text-purple-400">CALLER :</span> &quot;Sarah Jenkins, 08012345678.&quot;{"\n"}
                    <span className="text-amber-400">INVOKE :</span> calendar.bookAppointment() <span className="text-emerald-400">→ [CONFIRMED #cal_8831]</span>{"\n"}
                    <span className="text-amber-400">INVOKE :</span> whatsapp.sendMessage(&quot;+2348012345678&quot;, &quot;Your dental appointment is locked for Fri 2 PM.&quot;){"\n"}
                    <span className="text-emerald-400">LATENCY:</span> 248ms TTFT • Zero live tokens touched
                  </pre>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: 4-STAGE LIFECYCLE (VISUAL TIMELINE) */}
        <section className="max-w-[1240px] mx-auto px-6 py-12 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-primary">Workflow</span>
              <h2 className="text-2xl sm:text-3xl font-display font-semibold">How Builders Ship Employees</h2>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-md">
              From local code to global enterprise hiring. Fless removes the operational overhead so you can focus on building useful workers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {workflowStages.map((st, idx) => (
              <div
                key={st.step}
                onClick={() => setActiveStage(idx)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                  activeStage === idx
                    ? "border-primary bg-primary/[0.03] shadow-md shadow-primary/10"
                    : "border-border bg-card hover:border-border/80 hover:bg-muted/30"
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-primary">{st.step}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-muted text-muted-foreground">
                      {st.badge}
                    </span>
                  </div>
                  <h3 className="font-semibold text-sm text-foreground">{st.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{st.desc}</p>
                </div>

                <div className="pt-2 border-t border-border/60">
                  <div className="text-[11px] font-mono text-muted-foreground bg-muted/50 p-2 rounded-lg truncate">
                    {st.command}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: WHAT FLESS HANDLES VS WHAT YOU BUILD (DIVISION OF LABOR) */}
        <section className="max-w-[1240px] mx-auto px-6 py-12">
          <div className="p-8 sm:p-10 rounded-3xl border border-border bg-card/60 backdrop-blur-xl space-y-8">
            <div className="max-w-2xl space-y-2">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-primary">Separation of Concerns</span>
              <h2 className="text-2xl sm:text-3xl font-display font-semibold">You Code the Logic. Fless Runs the Heavy Lift.</h2>
              <p className="text-xs sm:text-sm text-muted-foreground">
                No hosting GPU clusters, maintaining WebRTC media relays, or dealing with payment processors in 10 countries.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
              {/* Left Column: What Fless Runs */}
              <div className="p-6 rounded-2xl border border-border bg-background space-y-4">
                <div className="flex items-center gap-2 font-semibold text-foreground text-sm border-b border-border/80 pb-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <span>What Fless Infrastructure Handles</span>
                </div>

                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span><strong>NVIDIA Tensor Core GPU Clusters:</strong> Sub-300ms time-to-first-token inference for live telephony.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span><strong>Zero-Trust Credential Vault:</strong> Customer OAuth tokens and secrets are never exposed to manifest code.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span><strong>Real-Time Audio Pipelines:</strong> WebRTC turn-taking, noise cancellation, and streaming text-to-speech.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span><strong>Global Marketplace & Billing:</strong> Automatic invoicing, currency exchange, and 35/65 monthly payouts.</span>
                  </li>
                </ul>
              </div>

              {/* Right Column: What Builders Build */}
              <div className="p-6 rounded-2xl border border-border bg-background space-y-4">
                <div className="flex items-center gap-2 font-semibold text-foreground text-sm border-b border-border/80 pb-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <span>What You Focus On as a Builder</span>
                </div>

                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Domain Prompts & Procedures:</strong> Real-world operational rules, triage protocols, and empathetic copy.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Tool & Package Orchestration:</strong> Connect WhatsApp, Calendar, Voice, or CRM using single package bindings.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Regional Knowledge Bases:</strong> Ground responses in local tariffs, clinic schedules, or legal policies.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Pricing & Target Market:</strong> Define monthly subscription tiers or metered rates for your vertical.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: MANAGED PLUGINS (ECOSYSTEM) */}
        <section className="max-w-[1240px] mx-auto px-6 py-12 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-primary">Integration Stack</span>
              <h2 className="text-2xl sm:text-3xl font-display font-semibold">Official Managed Plugins</h2>
            </div>
            <Link
              href="/docs"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
            >
              Inspect all plugin schemas in Docs <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {managedPackages.map((pkg) => {
              const Icon = pkg.icon;
              return (
                <div key={pkg.name} className="p-5 rounded-2xl border border-border bg-card hover:border-primary/40 transition-colors space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-9 h-9 rounded-xl ${pkg.bg} flex items-center justify-center ${pkg.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-mono font-semibold text-muted-foreground">{pkg.name}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-foreground">{pkg.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-1">{pkg.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 5: BUILDER ECONOMICS & EARNINGS BREAKDOWN */}
        <section className="max-w-[1240px] mx-auto px-6 py-12">
          <div className="p-8 sm:p-10 rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/[0.04] via-background to-background space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-2 max-w-xl">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-primary">Monetization</span>
                <h2 className="text-2xl sm:text-3xl font-display font-semibold">Predictable 35/65 Revenue Split</h2>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Every time a business hires your AI worker, you earn 35% of their gross monthly subscription and 35% of all metered event overages.
                </p>
              </div>

              <div className="px-5 py-3 rounded-2xl border border-primary/30 bg-primary/10 text-primary font-mono font-bold text-sm text-center shrink-0">
                35% Builder Royalty
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-5 rounded-2xl border border-border bg-background space-y-2">
                <div className="font-semibold text-foreground flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-500" />
                  Monthly Subscriptions
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Charge $49 to $499 per business per month. 35% pays out recurring revenue each billing cycle as your customer base expands.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-border bg-background space-y-2">
                <div className="font-semibold text-foreground flex items-center gap-2">
                  <Activity className="w-4 h-4 text-blue-500" />
                  Metered Usage Overages
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Charge for extra telephony call minutes ($0.15/min), invoice OCR scans ($0.50/doc), or outbound campaigns with automatic metered billing.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-border bg-background space-y-2">
                <div className="font-semibold text-foreground flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-500" />
                  Automatic Payout Gateways
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Direct automated disbursements into your domestic bank account or Stripe Connect. No manual billing or debt collection required.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: REAL DEPLOYED WORKFORCE SPOTLIGHT */}
        <section className="max-w-[1240px] mx-auto px-6 py-12 space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-primary">Case Study</span>
            <h2 className="text-2xl sm:text-3xl font-display font-semibold">Featured Verified Worker</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">See how builders package domain expertise into revenue-generating workers.</p>
          </div>

          <div className="p-8 rounded-3xl border border-border bg-card space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-6">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 shrink-0">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg sm:text-xl text-foreground">Clinic Front-Desk Concierge</h3>
                  <p className="text-xs text-muted-foreground">Inbound Voice Triage, Appointment Scheduling & WhatsApp Follow-Ups</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="px-3 py-1 rounded-full bg-muted text-foreground border border-border">Nigeria & Ghana 🇳🇬 🇬🇭</span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-500/20">
                  Verified Builder
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div className="p-3.5 rounded-xl border border-border bg-background space-y-1">
                <span className="text-muted-foreground font-mono text-[10px] uppercase">Industry</span>
                <div className="font-semibold text-foreground">Outpatient Clinics</div>
              </div>

              <div className="p-3.5 rounded-xl border border-border bg-background space-y-1">
                <span className="text-muted-foreground font-mono text-[10px] uppercase">Required Packages</span>
                <div className="font-semibold text-foreground">@fless/voice, @fless/whatsapp, @fless/calendar</div>
              </div>

              <div className="p-3.5 rounded-xl border border-border bg-background space-y-1">
                <span className="text-muted-foreground font-mono text-[10px] uppercase">Pricing Model</span>
                <div className="font-semibold text-foreground">$49/mo + $0.15/min Voice</div>
              </div>

              <div className="p-3.5 rounded-xl border border-border bg-background space-y-1">
                <span className="text-muted-foreground font-mono text-[10px] uppercase">Response Time</span>
                <div className="font-semibold text-emerald-600 dark:text-emerald-400 font-mono">240ms Average TTFT</div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FINAL CTA (NO AI ICONS, CLEAN & DIRECT) */}
        <section className="max-w-[1240px] mx-auto px-6 py-12">
          <div className="p-10 sm:p-14 rounded-3xl bg-night text-white text-center space-y-6 relative overflow-hidden border border-white/10">
            <div className="space-y-3 max-w-xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white/80 text-xs font-mono">
                <Terminal className="w-3.5 h-3.5 text-primary" />
                <span>Ready to ship your first employee?</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-semibold tracking-tight">
                Get Started with the Builder SDK
              </h2>
              <p className="text-sm text-white/70 leading-relaxed">
                Read the comprehensive technical reference, install `@fless/employee-sdk`, and run your first offline sandbox simulation in 5 minutes.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                href="/docs"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm shadow-md hover:bg-primary-hover transition-colors"
              >
                Read Builder Documentation
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/start"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/20 bg-white/5 text-white font-semibold text-sm hover:bg-white/10 transition-colors"
              >
                Apply for Builder Seat
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
