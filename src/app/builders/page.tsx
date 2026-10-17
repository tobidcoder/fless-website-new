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
  Check,
  Workflow,
  Plus,
  Sliders,
  Terminal,
} from "lucide-react";

export default function BuildersPage() {
  // Revenue Calculator State
  const [clientsCount, setClientsCount] = useState<number>(20);
  const [monthlyPrice, setMonthlyPrice] = useState<number>(499);

  const grossMonthly = clientsCount * monthlyPrice;
  const builderTakeHome = Math.round(grossMonthly * 0.7);
  const flessPlatformShare = Math.round(grossMonthly * 0.3);

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
      desc: "Inbound phone reception, outbound dialing, dynamic turn-taking powered by GPT-Live-1, and warm call transfers.",
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
      desc: "Generate production-ready marketing graphics, banners, and thumbnails via OpenAI image generation and custom assets.",
      icon: FileText,
      color: "text-teal-500",
      bg: "bg-teal-500/10",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <Header activePage="builders" />

      <main className="flex-1">
        {/* ── SECTION 1: HERO (BUILD AI EMPLOYEES IN MINUTES - MATCHES SCREENSHOT) ── */}
        <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-[#080B14] text-white overflow-hidden border-b border-white/10">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-primary/15 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[300px] bg-purple-500/15 blur-[100px] rounded-full pointer-events-none" />

          <div className="max-w-[1240px] mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Headline & CTAs */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white/90 text-xs font-semibold backdrop-blur-md">
                <span>For Builders</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-display font-semibold tracking-tight leading-[1.08]">
                Build AI Employees
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                  in Minutes
                </span>
              </h1>

              <p className="text-white/70 text-sm sm:text-base leading-relaxed max-w-md">
                Create, test and publish specialized AI employees — no code required. Use our intuitive studio or the TypeScript SDK to build custom solutions.
              </p>

              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Link
                  href="/start?role=builder"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-white font-semibold text-sm shadow-lg shadow-primary/30 hover:bg-primary-hover transition-all"
                >
                  Start Building
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/docs"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-white/20 bg-white/5 text-white font-semibold text-sm hover:bg-white/10 transition-colors backdrop-blur-md"
                >
                  View Documentation
                </Link>
              </div>
            </div>

            {/* Right Column: Hero Studio Window Mockup + Floating Social Media Manager Card */}
            <div className="lg:col-span-7 relative">
              <div className="rounded-2xl border border-white/15 bg-[#0B0F19]/90 backdrop-blur-xl text-neutral-200 overflow-hidden shadow-2xl">
                {/* Window Header */}
                <div className="flex items-center px-4 py-2.5 bg-[#111726] border-b border-white/10 text-xs">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-white/60 font-semibold text-xs ml-3 flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded bg-primary text-white text-[10px] flex items-center justify-center font-bold">F</span>
                    Fless
                  </span>
                </div>

                <div className="grid grid-cols-12 min-h-[340px]">
                  {/* Left Mini Sidebar */}
                  <div className="col-span-3 bg-[#080B14] p-3 space-y-1 text-[11px] text-white/60 border-r border-white/10 hidden sm:block">
                    <div className="px-2 py-1.5 rounded-lg hover:text-white flex items-center gap-1.5">
                      <span>Home</span>
                    </div>
                    <div className="px-2 py-1.5 rounded-lg hover:text-white flex items-center gap-1.5">
                      <span>My Employees</span>
                    </div>
                    <div className="px-2 py-1.5 rounded-lg bg-primary/20 text-primary font-semibold flex items-center gap-1.5">
                      <Plus className="w-3 h-3" />
                      <span>Create</span>
                    </div>
                    <div className="px-2 py-1.5 rounded-lg hover:text-white flex items-center gap-1.5">
                      <span>Marketplace</span>
                    </div>
                    <div className="px-2 py-1.5 rounded-lg hover:text-white flex items-center gap-1.5">
                      <span>Analytics</span>
                    </div>
                    <div className="px-2 py-1.5 rounded-lg hover:text-white flex items-center gap-1.5">
                      <span>Earnings</span>
                    </div>
                    <div className="px-2 py-1.5 rounded-lg hover:text-white flex items-center gap-1.5">
                      <span>Settings</span>
                    </div>
                  </div>

                  {/* Center Canvas */}
                  <div className="col-span-12 sm:col-span-9 p-4 sm:p-5 space-y-4 bg-[#0B0F19]">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-primary/20 text-primary flex items-center justify-center border border-primary/30">
                        <Workflow className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-xs text-white">Create Your Autonomous Employee</h3>
                        <p className="text-[10.5px] text-white/60">
                          Describe what you need, and the studio will help you configure and deploy.
                        </p>
                      </div>
                    </div>

                    {/* Prompt Box */}
                    <div className="rounded-xl border border-white/10 bg-[#060810] p-3 space-y-3">
                      <p className="text-[11px] text-white/80 leading-relaxed font-sans">
                        I need a social media manager for the construction industry. It should post on Instagram and Facebook, track engagement and create weekly reports.
                      </p>
                      <div className="flex justify-end">
                        <button className="px-3 py-1 rounded-lg bg-primary text-white text-[11px] font-semibold hover:bg-primary-hover transition-colors">
                          Configure
                        </button>
                      </div>
                    </div>

                    {/* Chips Underneath */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[10px] text-white/60">
                      <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 hover:text-white cursor-pointer">
                        Social Media
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 hover:text-white cursor-pointer">
                        Marketing
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 hover:text-white cursor-pointer">
                        Customer Support
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 hover:text-white cursor-pointer">
                        Sales
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Draft Preview Card (Overlapping right) */}
              <div className="hidden sm:block absolute -bottom-6 -right-4 w-72 rounded-2xl border border-white/20 bg-white text-neutral-900 p-4 shadow-2xl z-20 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-primary flex items-center justify-center">
                      <Workflow className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-xs text-neutral-900">Social Media Manager</h4>
                      <p className="text-[9.5px] text-neutral-500 leading-tight">
                        Handles your social media presence, engages your audience and provides insights.
                      </p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[9.5px] font-semibold bg-blue-50 text-primary shrink-0">
                    Draft
                  </span>
                </div>

                {/* Badges */}
                <div className="flex items-center gap-1.5 text-[9.5px] text-neutral-600">
                  <span className="px-2 py-0.5 rounded bg-neutral-100 flex items-center gap-1">
                    📷 Instagram
                  </span>
                  <span className="px-2 py-0.5 rounded bg-neutral-100 flex items-center gap-1">
                    f Facebook
                  </span>
                  <span className="text-[9px] text-neutral-400 font-medium">+2 more</span>
                </div>

                {/* Checklist */}
                <div className="space-y-1 text-[10px] text-neutral-700">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3 h-3 text-primary shrink-0" />
                    <span>Posts and schedules content</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3 h-3 text-primary shrink-0" />
                    <span>Responds to comments and DMs</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3 h-3 text-primary shrink-0" />
                    <span>Tracks engagement &amp; growth</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3 h-3 text-primary shrink-0" />
                    <span>Weekly performance reports</span>
                  </div>
                </div>

                <div className="pt-1">
                  <Link
                    href="/start?role=builder"
                    className="w-full inline-flex items-center justify-center py-2 rounded-xl bg-primary text-white text-[11px] font-semibold hover:bg-primary-hover shadow-sm transition-colors"
                  >
                    Test in Sandbox
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ── SECTION 2: 4 FEATURE ICONS BAR (MATCHES SCREENSHOT) ── */}
        <section className="bg-background border-b border-border py-10">
          <div className="max-w-[1240px] mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                <Sliders className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-semibold text-sm text-foreground">No Code, Just Ideas</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Describe your employee in plain language and let the studio do the rest.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                <Code2 className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-semibold text-sm text-foreground">TypeScript SDK</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  For advanced builders who want full control and customization.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                <Layers className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-semibold text-sm text-foreground">Pre-built Plugins</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Add integrations like WhatsApp, Instagram, Facebook, Slack and more with one click.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-semibold text-sm text-foreground">Secure &amp; Governed</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Every action goes through Fless permissions, approvals and audit logs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 3: THE BUILDER EXPERIENCE — 5 SIMPLE STEPS (INTERACTIVE) ── */}
        <section className="max-w-[1240px] mx-auto px-6 py-20 space-y-12">
          <div className="space-y-3">
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

            <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
              Our studio guides you through the entire process — from concept to deployment.
            </p>
          </div>

          <InteractiveBuilderStudio />
        </section>

        {/* ── SECTION 4: 70/30 REVENUE ECONOMICS & CALCULATOR ── */}
        <section className="max-w-[1240px] mx-auto px-6 py-16">
          <div className="p-8 sm:p-12 rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/[0.04] via-background to-background space-y-10 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
              <div className="space-y-1.5 max-w-xl">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-primary">Builder Economics</span>
                <h2 className="text-2xl sm:text-3xl font-display font-semibold">Earn 70% of Every Deployment</h2>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Every time a business hires your AI employee, 70% pays out directly to your account. Metered work credits cover variable model execution costs.
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
              <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
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
                    <span>Fless 30% Infrastructure Fee:</span>
                    <span className="font-mono text-muted-foreground">-${flessPlatformShare.toLocaleString()}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/start?role=builder"
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-hover transition-colors shadow-xs"
                  >
                    Start Earning With Fless
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 5: MANAGED PACKAGES & APPS ── */}
        <section className="max-w-[1240px] mx-auto px-6 py-16 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-primary">Capability Stack</span>
              <h2 className="text-2xl sm:text-3xl font-display font-semibold">Official Managed Packages</h2>
            </div>
            <Link
              href="/docs"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
            >
              Inspect all plugin schemas in Docs <ArrowRight className="w-3.5 h-3.5" />
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

        {/* ── SECTION 6: BOTTOM CTA BANNER ── */}
        <section className="max-w-[1240px] mx-auto px-6 py-16">
          <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white text-center space-y-6 relative overflow-hidden shadow-xl">
            <div className="space-y-3 max-w-xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-display font-semibold tracking-tight">
                Ready to build your AI workforce?
              </h2>
              <p className="text-sm text-white/80 leading-relaxed">
                Join thousands of businesses and builders creating, testing, and distributing autonomous AI employees.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
              <Link
                href="/start?role=builder"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-slate-900 font-semibold text-sm shadow-md hover:bg-white/90 transition-all cursor-pointer"
              >
                Start Building Free
                <ArrowRight className="w-4 h-4 text-slate-900" />
              </Link>
              <Link
                href="/ai-employees"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/30 bg-white/10 text-white font-semibold text-sm hover:bg-white/20 transition-colors backdrop-blur-md cursor-pointer"
              >
                Explore Marketplace
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
