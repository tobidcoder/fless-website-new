"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { InteractiveBuilderStudio } from "@/components/InteractiveBuilderStudio";
import {
  Code2,
  ShieldCheck,
  ArrowRight,
  MessageSquare,
  Calendar,
  PhoneCall,
  FileText,
  Users,
  Layers,
  Workflow,
  Plus,
  Sliders,
  Sparkles,
  Mic,
  ChevronDown,
  CheckCircle2,
} from "lucide-react";

interface PromptPreset {
  title: string;
  department: string;
  prompt: string;
  skills: string[];
  tools: string[];
  latency: string;
}

const PRESET_PROMPTS: PromptPreset[] = [
  {
    title: "Social Media Manager",
    department: "Marketing",
    prompt: "A social media manager that schedules daily posts on Instagram and Facebook, monitors engagement, and flags high-intent comments for human review.",
    skills: ["content-calendar", "audience-engagement", "trend-monitoring"],
    tools: ["@fless/instagram", "@fless/facebook", "@fless/buffer"],
    latency: "142ms",
  },
  {
    title: "Customer Support Specialist",
    department: "Support",
    prompt: "An autonomous customer support agent for e-commerce that resolves tracking inquiries, handles returns under $50, and syncs tickets to Zendesk.",
    skills: ["order-tracking", "refund-processing", "faq-resolution"],
    tools: ["@fless/whatsapp", "@fless/shopify", "@fless/zendesk"],
    latency: "118ms",
  },
  {
    title: "B2B Sales Development Rep",
    department: "Sales",
    prompt: "An outbound SDR that enriches buyer contacts, scores company intent, sends personalized cold emails, and books product demos directly to Google Calendar.",
    skills: ["lead-enrichment", "intent-scoring", "calendar-booking"],
    tools: ["@fless/hubspot", "@fless/google-calendar", "@fless/linkedin"],
    latency: "165ms",
  },
  {
    title: "Invoice & Billing Auditor",
    department: "Finance",
    prompt: "A finance assistant that verifies incoming invoices against purchase orders, flags duplicate vendor charges, and routes payment approvals on Slack.",
    skills: ["invoice-reconciliation", "anomaly-detection", "spend-reporting"],
    tools: ["@fless/paystack", "@fless/stripe", "@fless/slack"],
    latency: "135ms",
  },
];

export default function BuildersPage() {
  const [selectedPresetIndex, setSelectedPresetIndex] = useState<number>(0);
  const [promptText, setPromptText] = useState<string>(PRESET_PROMPTS[0].prompt);
  const [isConfiguring, setIsConfiguring] = useState<boolean>(false);
  const [showConfiguredPreview, setShowConfiguredPreview] = useState<boolean>(true);

  // Revenue Calculator State
  const [clientsCount, setClientsCount] = useState<number>(20);
  const [monthlyPrice, setMonthlyPrice] = useState<number>(499);

  const grossMonthly = clientsCount * monthlyPrice;
  const builderTakeHome = Math.round(grossMonthly * 0.7);
  const flessPlatformShare = Math.round(grossMonthly * 0.3);

  const activePreset = PRESET_PROMPTS[selectedPresetIndex];

  const handleSelectPreset = (index: number) => {
    setSelectedPresetIndex(index);
    setPromptText(PRESET_PROMPTS[index].prompt);
    setShowConfiguredPreview(true);
  };

  const handleBuildClick = () => {
    setIsConfiguring(true);
    setTimeout(() => {
      setIsConfiguring(false);
      setShowConfiguredPreview(true);
    }, 450);
  };

  const managedPackages = [
    {
      name: "@fless/instagram",
      title: "Instagram & Meta Social",
      desc: "Publish reels, stories, and feed posts. Triage comments and respond to inbound direct messages with approval gates.",
      icon: MessageSquare,
      color: "text-rose-500",
      bg: "bg-rose-500/10",
    },
    {
      name: "@fless/voice",
      title: "Real-Time Telephony",
      desc: "Inbound phone reception, outbound dialing, dynamic turn-taking powered by live audio models, and warm call transfers.",
      icon: PhoneCall,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      name: "@fless/whatsapp",
      title: "WhatsApp Cloud API",
      desc: "Two-way customer chats, interactive template dispatch, and appointment confirmation flows.",
      icon: MessageSquare,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      name: "@fless/google-calendar",
      title: "Calendar Engine",
      desc: "Real-time free/busy availability lookups, double-booking prevention, and automated calendar invitations.",
      icon: Calendar,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      name: "@fless/crm",
      title: "CRM & Pipelines",
      desc: "Contact lookups, deal stage updates, and customer activity logs synced across HubSpot, Salesforce, and custom DBs.",
      icon: Users,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
    {
      name: "@fless/creative",
      title: "Image & Media Studio",
      desc: "Generate production-ready marketing graphics, banners, and thumbnails via high-resolution image models.",
      icon: FileText,
      color: "text-teal-500",
      bg: "bg-teal-500/10",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/20 selection:text-primary">
      <Header activePage="builders" />

      <main className="flex-1">
        {/* ── SECTION 1: HERO (LOVABLE-INSPIRED ATMOSPHERIC AURORA & OMNIBAR) ── */}
        <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 bg-gradient-to-b from-blue-50/40 via-background to-background dark:from-[#0B0F1C] dark:via-background dark:to-background overflow-hidden border-b border-border/60">
          {/* Lovable Ethereal Ambient Aura (Mesh Gradients) */}
          <div className="absolute top-16 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none overflow-hidden opacity-60 dark:opacity-30">
            <div className="absolute top-8 left-1/4 w-[550px] h-[380px] bg-blue-500/20 blur-[140px] rounded-full" />
            <div className="absolute top-14 left-1/2 -translate-x-1/2 w-[650px] h-[420px] bg-purple-500/15 blur-[150px] rounded-full" />
            <div className="absolute top-16 right-1/4 w-[500px] h-[350px] bg-pink-500/15 blur-[140px] rounded-full" />
          </div>

          <div className="max-w-[1240px] mx-auto px-6 relative z-10 space-y-10">
            {/* Centered Headline */}
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5" />
                <span>For Builders • 70% Revenue Share</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[62px] font-display font-semibold tracking-tight text-foreground leading-[1.06]">
                Build AI Employees
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 dark:from-blue-400 dark:via-indigo-300 dark:to-purple-400 bg-clip-text text-transparent">
                  with No Code or Code
                </span>
              </h1>

              <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                Bring an autonomous specialist, custom workflow, or entire department to life. Create visually in the Studio or take complete control with the TypeScript SDK.
              </p>
            </div>

            {/* The Lovable-Style Floating Prompt Omnibar */}
            <div className="max-w-3xl mx-auto space-y-4">
              <div className="relative rounded-2xl sm:rounded-full border border-border/80 bg-card/90 dark:bg-card/75 backdrop-blur-2xl shadow-2xl shadow-primary/10 p-2 sm:p-2.5 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 transition-all hover:border-primary/50 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
                <div className="flex items-center gap-2 px-2 shrink-0">
                  <button
                    type="button"
                    title="Add integration package"
                    className="w-9 h-9 rounded-full bg-muted hover:bg-primary/10 hover:text-primary text-muted-foreground flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <input
                  type="text"
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleBuildClick();
                  }}
                  placeholder="Ask Fless to create an AI employee for..."
                  className="flex-1 bg-transparent border-0 outline-none text-xs sm:text-sm text-foreground placeholder:text-muted-foreground px-2 py-1.5 min-w-0"
                />

                <div className="flex items-center justify-end gap-2 shrink-0 px-1">
                  <div className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-muted text-[11px] font-medium text-muted-foreground border border-border">
                    <span>Build</span>
                    <ChevronDown className="w-3 h-3" />
                  </div>

                  <button
                    type="button"
                    title="Voice prompt"
                    className="w-8 h-8 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <Mic className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={handleBuildClick}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-white text-xs font-semibold hover:bg-primary/90 shadow-md shadow-primary/25 transition-all cursor-pointer"
                  >
                    {isConfiguring ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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

              {/* Sample Specification Chips */}
              <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
                <span className="text-[11px] font-mono text-muted-foreground">Sample Spec:</span>
                {PRESET_PROMPTS.map((preset, idx) => (
                  <button
                    key={preset.title}
                    type="button"
                    onClick={() => handleSelectPreset(idx)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                      selectedPresetIndex === idx
                        ? "bg-primary text-white font-semibold shadow-xs"
                        : "bg-muted/80 text-muted-foreground hover:bg-muted hover:text-foreground border border-border/70"
                    }`}
                  >
                    {preset.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Generated Spec Preview Card (Clean Lovable Preview) */}
            {showConfiguredPreview && (
              <div className="max-w-3xl mx-auto rounded-2xl border border-border bg-card/85 backdrop-blur-xl p-5 sm:p-6 shadow-xl space-y-4 animate-in fade-in-50 duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border/60">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                      <Workflow className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="font-semibold text-sm sm:text-base text-foreground">
                          {activePreset.title}
                        </h2>
                        <span className="px-2 py-0.5 rounded text-[10.5px] font-mono font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          {activePreset.department}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Autonomous worker ready for testing and publishing
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-muted-foreground">
                      Latency: <strong className="text-foreground">{activePreset.latency}</strong>
                    </span>
                    <span className="text-border">|</span>
                    <span className="text-xs font-mono text-primary font-bold">
                      70% Builder Share
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1.5 p-3 rounded-xl bg-muted/40 border border-border">
                    <span className="text-[10px] font-mono uppercase text-muted-foreground font-semibold">
                      Declared Skills
                    </span>
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {activePreset.skills.map((s) => (
                        <span key={s} className="px-2 py-0.5 rounded-md bg-background border border-border font-mono text-[11px] text-foreground">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5 p-3 rounded-xl bg-muted/40 border border-border">
                    <span className="text-[10px] font-mono uppercase text-muted-foreground font-semibold">
                      Connected Tools
                    </span>
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {activePreset.tools.map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded-md bg-background border border-border font-mono text-[11px] text-primary font-medium">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Deterministic approval gates &amp; spending budget verified</span>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Link
                      href="/start?role=builder"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary/90 shadow-xs transition-colors"
                    >
                      <span>Deploy in Studio</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      href="/docs"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl border border-border bg-background hover:bg-muted text-foreground text-xs font-medium transition-colors"
                    >
                      <span>Inspect Code</span>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ── SECTION 2: 4 PILLARS OF BUILDING ON FLESS ── */}
        <section className="bg-background border-b border-border/60 py-12">
          <div className="max-w-[1240px] mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <div className="p-5 rounded-2xl border border-border/70 bg-card/60 space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <Sliders className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-sm text-foreground">No Code, Just Ideas</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Describe your employee in plain language and let our visual studio wire tools, boundaries, and test sandboxes.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-border/70 bg-card/60 space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-sm text-foreground">TypeScript SDK</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Write type-safe manifests, custom logic, and schema-validated actions. Deploy with a single CLI command.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-border/70 bg-card/60 space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-sm text-foreground">4,000+ Pre-built Connectors</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Attach WhatsApp, Instagram, Slack, Stripe, Paystack, Flutterwave, and thousands of long-tail SaaS APIs with 1 click.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-border/70 bg-card/60 space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-sm text-foreground">Governed &amp; Sandboxed</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Every action passes through human-in-the-loop approvals, daily spend guards, and tamper-proof audit trails.
              </p>
            </div>
          </div>
        </section>

        {/* ── SECTION 3: THE BUILDER EXPERIENCE — 5 SIMPLE STEPS ── */}
        <section className="max-w-[1240px] mx-auto px-6 py-20 md:py-28 space-y-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs">
              <span className="text-muted-foreground">The</span>
              <span className="font-bold text-primary">Builder Experience</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold tracking-tight text-foreground">
              From Idea to Published
              <br />
              in{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                5 Simple Steps
              </span>
            </h2>

            <p className="text-sm text-muted-foreground leading-relaxed">
              Our studio guides you through the entire process — from concept to marketplace revenue.
            </p>
          </div>

          <InteractiveBuilderStudio />
        </section>

        {/* ── SECTION 4: 70/30 REVENUE ECONOMICS & CALCULATOR ── */}
        <section className="max-w-[1240px] mx-auto px-6 py-16">
          <div className="p-8 sm:p-12 rounded-3xl border border-border bg-gradient-to-br from-primary/[0.04] via-card to-card space-y-10 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
              <div className="space-y-1.5 max-w-xl">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-primary">Builder Economics</span>
                <h2 className="text-2xl sm:text-3xl font-display font-semibold">Earn 70% of Every Deployment</h2>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Every time a business hires your AI employee, 70% pays out directly to your account. You build once, deploy continuously, and get paid recurring subscription royalties.
                </p>
              </div>

              <div className="px-5 py-2.5 rounded-2xl border border-primary/30 bg-primary/10 text-primary font-mono font-bold text-sm text-center shrink-0">
                70% Builder Share • 30% Fless
              </div>
            </div>

            {/* Interactive Calculator Slider */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="flex items-center justify-between text-sm font-semibold mb-2">
                    <span className="text-foreground">Number of Active Businesses</span>
                    <span className="font-mono text-primary text-base font-bold">{clientsCount} companies</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={100}
                    value={clientsCount}
                    onChange={(e) => setClientsCount(Number(e.target.value))}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between text-[11px] text-muted-foreground mt-1 font-mono">
                    <span>1</span>
                    <span>25</span>
                    <span>50</span>
                    <span>100 companies</span>
                  </div>
                </div>

                <div>
                  <span className="block text-sm font-semibold text-foreground mb-2">Monthly Subscription Tier</span>
                  <div className="grid grid-cols-3 gap-3">
                    {[199, 499, 999].map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setMonthlyPrice(p)}
                        className={`py-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                          monthlyPrice === p
                            ? "border-primary bg-primary text-white shadow-xs"
                            : "border-border bg-card text-foreground hover:bg-muted"
                        }`}
                      >
                        ${p}/month
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Earnings Card */}
              <div className="lg:col-span-5 rounded-2xl border border-border bg-background p-6 shadow-sm space-y-4">
                <div>
                  <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Your Monthly Payout</span>
                  <div className="text-4xl font-display font-bold text-foreground mt-1">
                    ${builderTakeHome.toLocaleString()}
                    <span className="text-sm font-normal text-muted-foreground"> /month</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    ${(builderTakeHome * 12).toLocaleString()} projected annual recurring revenue.
                  </p>
                </div>

                <div className="space-y-2 pt-3 border-t border-border text-xs">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Gross Monthly Revenue:</span>
                    <span className="font-mono font-semibold text-foreground">${grossMonthly.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Your 70% Builder Royalty:</span>
                    <span className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">+${builderTakeHome.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Platform Execution &amp; Hosting (30%):</span>
                    <span className="font-mono text-muted-foreground">${flessPlatformShare.toLocaleString()}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/start?role=builder"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-all shadow-sm"
                  >
                    <span>Start Earning as a Builder</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 5: MANAGED PACKAGES ECOSYSTEM ── */}
        <section className="max-w-[1240px] mx-auto px-6 py-16 space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-display font-semibold">Managed Packages &amp; Tools</h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Every package includes sandboxed credentials, typed action schemas, and rate-limiting guarantees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {managedPackages.map((pkg) => {
              const Icon = pkg.icon;
              return (
                <div
                  key={pkg.name}
                  className="p-5 rounded-2xl border border-border bg-card shadow-xs transition-all hover:border-primary/40 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className={`w-9 h-9 rounded-xl ${pkg.bg} ${pkg.color} flex items-center justify-center`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-mono text-[11px] text-muted-foreground bg-muted px-2 py-0.5 rounded">
                      {pkg.name}
                    </span>
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

        {/* ── SECTION 6: READY TO BUILD CALLOUT ── */}
        <section className="relative py-20 bg-muted/40 border-t border-border/60 overflow-hidden">
          <div className="max-w-3xl mx-auto px-6 text-center space-y-6 relative z-10">
            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-foreground">
              Ready to build your first AI employee?
            </h2>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Join builders worldwide creating autonomous workers for real businesses. No upfront fees — earn 70% recurring revenue on every deployment.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href="/start?role=builder"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-primary text-white text-xs sm:text-sm font-semibold hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all"
              >
                <span>Start Building for Free</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/ai-employees"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full border border-border bg-background hover:bg-muted text-foreground text-xs sm:text-sm font-medium transition-colors"
              >
                <span>Explore Marketplace</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
