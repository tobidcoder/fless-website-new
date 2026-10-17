"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Cpu,
  ArrowRight,
  Sparkles,
  MessageSquare,
  Layers,
  Bot,
  Play,
  Star,
  Check,
  Briefcase,
  FileText,
  Mail,
  Hash,
} from "lucide-react";

export function PlatformLanding() {
  // Pricing Calculator State
  const [employeeCount, setEmployeeCount] = useState<number>(5);
  const [department, setDepartment] = useState<string>("Marketing");
  const [tenure, setTenure] = useState<string>("6 months");

  const minPrice = Math.round(employeeCount * 360);
  const maxPrice = Math.round(employeeCount * 540);

  return (
    <div className="bg-background text-foreground flex flex-col font-sans selection:bg-primary/20 selection:text-primary">
      {/* ── SECTION 1: HERO (DARK SLATE INDIGO MATCHING SCREENSHOT) ── */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-[#080B14] text-white overflow-hidden border-b border-white/10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-primary/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[300px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-[1240px] mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline & Value Proposition */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white/90 text-xs font-semibold backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span>The AI Workforce Platform</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-display font-semibold tracking-tight leading-[1.08]">
              Anyone builds an AI employee{" "}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                in minutes.
              </span>
              <br />
              Fless keeps it safe.
            </h1>

            <p className="text-white/70 text-sm sm:text-base leading-relaxed max-w-lg">
              Describe what you need, test it live, and publish it to your team or the marketplace. Fless handles the rest — permissions, approvals, integrations, and security.
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link
                href="/start"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-white font-semibold text-sm shadow-lg shadow-primary/30 hover:bg-primary-hover transition-all"
              >
                Get Started Free
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/ai-employees"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-white/20 bg-white/5 text-white font-semibold text-sm hover:bg-white/10 transition-colors backdrop-blur-md"
              >
                <Play className="w-3.5 h-3.5 fill-white/80 text-white/80" />
                Watch Demo
              </Link>
            </div>

            {/* Badges Under Hero */}
            <div className="grid grid-cols-2 gap-3 pt-6 text-[12px] text-white/70">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Secure &amp; Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Multi-Model Support</span>
              </div>
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-400 shrink-0" />
                <span>100+ Integrations</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Built for Businesses &amp; Builders</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Studio Mockup */}
          <div className="lg:col-span-6 relative">
            <div className="rounded-2xl border border-white/15 bg-[#0B0F19]/90 backdrop-blur-xl text-neutral-200 overflow-hidden shadow-2xl">
              {/* Window Header */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#111726] border-b border-white/10 text-xs">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-white font-semibold text-xs ml-2">Fless</span>
                </div>
              </div>

              {/* Window Body: Studio Chat + Floating Card */}
              <div className="p-4 sm:p-5 grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Mini Sidebar */}
                <div className="hidden sm:block md:col-span-3 space-y-1 text-[11px] text-white/60 border-r border-white/10 pr-2">
                  <div className="px-2 py-1.5 rounded-lg bg-white/10 text-white font-medium flex items-center gap-1.5">
                    <Bot className="w-3.5 h-3.5 text-primary" />
                    <span>Home</span>
                  </div>
                  <div className="px-2 py-1.5 rounded-lg hover:text-white flex items-center gap-1.5">
                    <span>AI Employees</span>
                  </div>
                  <div className="px-2 py-1.5 rounded-lg hover:text-white flex items-center gap-1.5">
                    <span>Marketplace</span>
                  </div>
                  <div className="px-2 py-1.5 rounded-lg hover:text-white flex items-center gap-1.5">
                    <span>Apps</span>
                  </div>
                  <div className="px-2 py-1.5 rounded-lg hover:text-white flex items-center gap-1.5">
                    <span>Settings</span>
                  </div>
                </div>

                {/* Center Conversational Studio */}
                <div className="md:col-span-9 space-y-3">
                  <div className="flex items-center justify-between pb-1 border-b border-white/10 text-xs">
                    <span className="font-semibold text-white flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-primary" />
                      Create your AI employee
                    </span>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    {/* User Prompt */}
                    <div className="ml-auto max-w-[90%] rounded-2xl rounded-br-sm bg-primary px-3.5 py-2 text-white leading-relaxed text-[11px]">
                      I need a social media manager for my construction company. It should post on Instagram and Facebook, engage with our audience, and track performance.
                    </div>

                    {/* Bot Checklist */}
                    <div className="mr-auto max-w-[95%] rounded-2xl rounded-bl-sm border border-white/10 bg-[#111726] p-3 text-white/90 space-y-1.5 leading-relaxed text-[11px]">
                      <p className="text-white/80">Great! I&apos;ll create a Social Media Manager for your construction company. Let me ask a few questions:</p>
                      <ul className="space-y-1 text-white/70">
                        <li className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>Which platforms do you want to connect?</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>What&apos;s your brand tone (e.g., professional, casual)?</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>Do you want it to create images or just post existing ones?</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Input row */}
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      readOnly
                      value="Type your message..."
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white/60 outline-none"
                    />
                    <button className="p-2 rounded-xl bg-primary text-white text-xs shrink-0">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Employee Card (Bottom Right overlap) */}
            <div className="hidden sm:block absolute -bottom-8 -right-4 w-72 rounded-2xl border border-white/20 bg-white text-neutral-900 p-4 shadow-2xl z-20">
              {/* Floating Social Icons */}
              <div className="absolute -top-3 -right-3 flex items-center gap-1 z-30">
                <span className="w-7 h-7 rounded-full bg-[#1877F2] text-white flex items-center justify-center shadow-md font-bold text-xs">
                  f
                </span>
                <span className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white flex items-center justify-center shadow-md text-[10px]">
                  📷
                </span>
                <span className="w-7 h-7 rounded-full bg-[#0A66C2] text-white flex items-center justify-center shadow-md font-bold text-xs">
                  in
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-neutral-200 shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80"
                    alt="Social Media Manager"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-xs text-neutral-900 leading-tight">Social Media Manager</h4>
                  <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                    <span className="w-1 h-1 rounded-full bg-emerald-500" />
                    Published
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-xs text-amber-500 mt-2">
                <Star className="w-3.5 h-3.5 fill-amber-500" />
                <span className="font-bold text-neutral-900 text-xs">4.8</span>
                <span className="text-neutral-500 text-[10px]">(124 reviews)</span>
              </div>

              <div className="flex flex-wrap gap-1 mt-2 text-[9.5px]">
                <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-medium">Social Media</span>
                <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-700 font-medium">Content</span>
                <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-medium">Analytics</span>
              </div>

              <div className="mt-3">
                <Link
                  href="/start"
                  className="w-full inline-flex items-center justify-center gap-1 py-1.5 rounded-lg bg-primary text-white text-[11px] font-semibold hover:bg-primary-hover transition-colors"
                >
                  Use This Employee
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: THREE WAYS TO GET STARTED (MATCHES SCREENSHOT) ── */}
      <section className="max-w-[1240px] mx-auto px-6 py-20 space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-display font-semibold tracking-tight">
            Three ways to get started
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Whether you&apos;re a business looking for AI talent or a builder creating the next big thing, Fless gives you the tools to make it happen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: For Businesses */}
          <div className="p-7 rounded-2xl border border-border bg-card shadow-xs hover:border-primary/50 transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-11 h-11 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-lg text-foreground">For Businesses</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Hire specialized AI employees, connect your apps, get work done, and track results — all in one place.
              </p>
            </div>
            <Link
              href="/solutions"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline pt-2"
            >
              Explore for Business <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 2: For Builders */}
          <div className="p-7 rounded-2xl border border-primary/40 bg-card shadow-sm hover:border-primary transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-lg text-foreground">For Builders</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Create, test, and publish AI employees using our intuitive studio. Build for your own company or the marketplace.
              </p>
            </div>
            <Link
              href="/builders"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline pt-2"
            >
              Start Building <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 3: Documentation */}
          <div className="p-7 rounded-2xl border border-border bg-card shadow-xs hover:border-primary/50 transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-11 h-11 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-lg text-foreground">Documentation</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Need help? Access our detailed docs for businesses and builders.
              </p>
            </div>
            <div className="flex items-center gap-4 pt-2 text-xs font-semibold text-primary">
              <Link href="/docs" className="hover:underline flex items-center gap-1">
                Business Docs <ArrowRight className="w-3 h-3" />
              </Link>
              <Link href="/docs#builder" className="hover:underline flex items-center gap-1 text-purple-600 dark:text-purple-400">
                Builder Docs <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: MEET OUR AI EMPLOYEES (MATCHES SCREENSHOT) ── */}
      <section className="max-w-[1240px] mx-auto px-6 py-16 space-y-8 border-t border-border/60">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl font-display font-semibold tracking-tight">
              Meet our AI Employees
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
              Pre-built, industry-specific AI employees ready to work.
            </p>
          </div>

          <Link
            href="/ai-employees"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold shadow-sm hover:bg-primary-hover transition-colors shrink-0"
          >
            Browse Marketplace <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-8 py-2 text-sm text-muted-foreground">
          <div>
            <span className="font-display font-bold text-xl text-foreground">100+</span>
            <span className="text-xs text-muted-foreground block">AI Employees</span>
          </div>
          <div className="w-px h-8 bg-border" />
          <div>
            <span className="font-display font-bold text-xl text-foreground">20+</span>
            <span className="text-xs text-muted-foreground block">Industries</span>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
            <div>
              <span className="font-display font-bold text-xl text-foreground">4.8</span>
              <span className="text-xs text-muted-foreground block">Average Rating</span>
            </div>
          </div>
        </div>

        {/* 3 Showcase Employee Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="p-6 rounded-2xl border border-border bg-card shadow-xs hover:border-primary/40 transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-3.5">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-neutral-200 border-2 border-border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80"
                  alt="Customer Support Specialist"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold text-base text-foreground">Customer Support Specialist</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-primary/10 text-primary">
                    Customer Service
                  </span>
                  <div className="flex items-center gap-1 text-xs text-amber-500">
                    <Star className="w-3 h-3 fill-amber-500" />
                    <span className="font-bold text-foreground">4.9</span>
                    <span className="text-muted-foreground">(320)</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Handles customer inquiries, resolves issues, and provides timely support across channels.
              </p>
              <div className="flex items-center gap-2 text-[11px] text-muted-foreground pt-1">
                <span className="px-2 py-0.5 rounded bg-muted/60 border border-border/40">WhatsApp</span>
                <span className="px-2 py-0.5 rounded bg-muted/60 border border-border/40">Email</span>
                <span className="px-2 py-0.5 rounded bg-muted/60 border border-border/40">CRM</span>
              </div>
            </div>

            <div className="pt-3 border-t border-border">
              <Link
                href="/ai-employees/customer-support-specialist"
                className="w-full inline-flex items-center justify-center gap-1.5 py-2 rounded-xl border border-border hover:bg-muted text-xs font-semibold text-foreground transition-colors"
              >
                View Details <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl border border-border bg-card shadow-xs hover:border-primary/40 transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-3.5">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-neutral-200 border-2 border-border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80"
                  alt="Construction Project Assistant"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold text-base text-foreground">Construction Project Assistant</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400">
                    Construction
                  </span>
                  <div className="flex items-center gap-1 text-xs text-amber-500">
                    <Star className="w-3 h-3 fill-amber-500" />
                    <span className="font-bold text-foreground">4.7</span>
                    <span className="text-muted-foreground">(190)</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Helps manage project updates, coordinates with teams, and tracks progress.
              </p>
              <div className="flex items-center gap-2 text-[11px] text-muted-foreground pt-1">
                <span className="px-2 py-0.5 rounded bg-muted/60 border border-border/40">Slack</span>
                <span className="px-2 py-0.5 rounded bg-muted/60 border border-border/40">Email</span>
                <span className="px-2 py-0.5 rounded bg-muted/60 border border-border/40">Calendar</span>
              </div>
            </div>

            <div className="pt-3 border-t border-border">
              <Link
                href="/ai-employees/construction-project-assistant"
                className="w-full inline-flex items-center justify-center gap-1.5 py-2 rounded-xl border border-border hover:bg-muted text-xs font-semibold text-foreground transition-colors"
              >
                View Details <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl border border-border bg-card shadow-xs hover:border-primary/40 transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-3.5">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-neutral-200 border-2 border-border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1594824813580-ff67dd11475c?w=160&auto=format&fit=crop&q=80"
                  alt="AI Pharmacy Receptionist"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold text-base text-foreground">AI Pharmacy Receptionist</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    Healthcare
                  </span>
                  <div className="flex items-center gap-1 text-xs text-amber-500">
                    <Star className="w-3 h-3 fill-amber-500" />
                    <span className="font-bold text-foreground">4.8</span>
                    <span className="text-muted-foreground">(256)</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Answers calls, schedules appointments, and handles patient inquiries.
              </p>
              <div className="flex items-center gap-2 text-[11px] text-muted-foreground pt-1">
                <span className="px-2 py-0.5 rounded bg-muted/60 border border-border/40">Voice Call</span>
                <span className="px-2 py-0.5 rounded bg-muted/60 border border-border/40">Phone</span>
                <span className="px-2 py-0.5 rounded bg-muted/60 border border-border/40">EHR</span>
              </div>
            </div>

            <div className="pt-3 border-t border-border">
              <Link
                href="/ai-employees/ai-pharmacy-receptionist"
                className="w-full inline-flex items-center justify-center gap-1.5 py-2 rounded-xl border border-border hover:bg-muted text-xs font-semibold text-foreground transition-colors"
              >
                View Details <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: WHY FLESS? (MATCHES SCREENSHOT) ── */}
      <section className="bg-[#080B14] text-white py-20 border-y border-white/10 relative overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl sm:text-4xl font-display font-semibold tracking-tight">
                Why Fless?
              </h2>
              <p className="text-white/70 text-sm">
                Built for the next generation of work.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-[#0F1424] border border-white/10 space-y-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-sm text-white">Secure by Design</h3>
                <p className="text-xs text-white/60 leading-relaxed">
                  Your data, your control. Full transparency and audit logs.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#0F1424] border border-white/10 space-y-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                  <Layers className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-sm text-white">Flexible Integrations</h3>
                <p className="text-xs text-white/60 leading-relaxed">
                  Connect with 100+ apps, MCP servers, APIs and more.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#0F1424] border border-white/10 space-y-2.5">
                <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                  <Cpu className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-sm text-white">Multi-Model Support</h3>
                <p className="text-xs text-white/60 leading-relaxed">
                  Claude, OpenAI, and more. Choose what works for you.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#0F1424] border border-white/10 space-y-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-sm text-white">Simple for Everyone</h3>
                <p className="text-xs text-white/60 leading-relaxed">
                  No code needed. Just describe, test and publish.
                </p>
              </div>
            </div>
          </div>

          {/* Integration Node Visual (Right) */}
          <div className="lg:col-span-5 flex items-center justify-center relative">
            <div className="relative w-72 h-72 rounded-full border border-white/10 flex items-center justify-center">
              <div className="absolute inset-4 rounded-full border border-dashed border-white/10 animate-spin-slow" />
              
              {/* Central Fless Core */}
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 text-white font-bold text-lg flex items-center justify-center shadow-2xl shadow-primary/50 z-10">
                Fless
              </div>

              {/* Connected Orbiting Apps */}
              <div className="absolute top-2 left-10 w-9 h-9 rounded-full bg-white text-slate-900 shadow-lg flex items-center justify-center text-xs font-bold">
                📷
              </div>
              <div className="absolute top-4 right-10 w-9 h-9 rounded-full bg-emerald-500 text-white shadow-lg flex items-center justify-center text-xs font-bold">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div className="absolute bottom-4 left-10 w-9 h-9 rounded-full bg-rose-500 text-white shadow-lg flex items-center justify-center text-xs font-bold">
                <Mail className="w-4 h-4" />
              </div>
              <div className="absolute bottom-6 right-12 w-9 h-9 rounded-full bg-blue-600 text-white shadow-lg flex items-center justify-center text-xs font-bold">
                <Hash className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: SIMPLE, TRANSPARENT PRICING (MATCHES SCREENSHOT) ── */}
      <section className="max-w-[1240px] mx-auto px-6 py-20 space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-display font-semibold tracking-tight">
              Simple, Transparent Pricing
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
              Flexible plans designed to fit your needs. Scale up or down anytime.
            </p>
            <div className="pt-2">
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-hover shadow-sm transition-colors"
              >
                View Pricing <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Interactive Cost Estimator Card */}
          <div className="lg:col-span-7 rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 space-y-5">
              <h3 className="text-sm font-semibold text-foreground">Estimate your monthly cost</h3>

              <div>
                <div className="flex items-center justify-between text-xs font-semibold mb-2">
                  <span className="text-muted-foreground">Number of employees</span>
                  <span className="font-bold text-foreground text-sm">{employeeCount}</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={20}
                  value={employeeCount}
                  onChange={(e) => setEmployeeCount(Number(e.target.value))}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="block text-muted-foreground mb-1 text-[11px]">Departments</span>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full bg-muted/60 border border-border rounded-xl px-2.5 py-1.5 text-xs text-foreground outline-none"
                  >
                    <option>Marketing</option>
                    <option>Sales</option>
                    <option>Customer Support</option>
                    <option>Operations</option>
                    <option>Finance</option>
                  </select>
                </div>
                <div>
                  <span className="block text-muted-foreground mb-1 text-[11px]">Tenure</span>
                  <select
                    value={tenure}
                    onChange={(e) => setTenure(e.target.value)}
                    className="w-full bg-muted/60 border border-border rounded-xl px-2.5 py-1.5 text-xs text-foreground outline-none"
                  >
                    <option>1 month</option>
                    <option>3 months</option>
                    <option>6 months</option>
                    <option>12 months</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Estimated Price Range Result Box */}
            <div className="md:col-span-5 rounded-2xl bg-muted/50 p-5 space-y-3 border border-border/60">
              <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block">Estimated price range</span>
              <div className="text-xl sm:text-2xl font-display font-bold text-foreground">
                ${minPrice.toLocaleString()} – ${maxPrice.toLocaleString()}
                <span className="text-xs font-normal text-muted-foreground"> / month</span>
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Price varies based on selected employees, department, and duration. Industry-standard pricing with up to 50% less.
              </p>
              <Link href="/pricing" className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline pt-1">
                How pricing works <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: READY TO BUILD BANNER (MATCHES SCREENSHOT) ── */}
      <section className="max-w-[1240px] mx-auto px-6 py-16">
        <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white text-center space-y-6 relative overflow-hidden shadow-xl">
          <div className="space-y-3 max-w-xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-display font-semibold tracking-tight">
              Ready to build your AI workforce?
            </h2>
            <p className="text-sm text-white/80 leading-relaxed">
              Join thousands of businesses and builders already using Fless.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <Link
              href="/start"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-slate-900 font-semibold text-sm shadow-md hover:bg-white/90 transition-all cursor-pointer"
            >
              Get Started Free
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
    </div>
  );
}
