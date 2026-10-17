import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Departments } from "@/components/Departments";
import { DepartmentShowcases } from "@/components/DepartmentShowcases";
import { Industries } from "@/components/Industries";
import { BuiltDifferent } from "@/components/BuiltDifferent";
import { Integrations } from "@/components/Integrations";
import { TryCommand } from "@/components/TryCommand";
import { InteractiveHeroShowcase } from "@/components/InteractiveHeroShowcase";
import { ModernBuilderShowcase } from "@/components/ModernBuilderShowcase";
import { departments } from "@/lib/departments";
import {
  Briefcase,
  Play,
  ArrowRight,
  Headphones,
  Megaphone,
  Network,
  Cpu,
  CreditCard,
  Scale,
  Check,
  Code2,
  Sparkles,
  UserCheck,
  CheckCircle2,
  Terminal,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Fless — Hire AI Employees that Work for You",
  description:
    `Get specialized AI employees that handle real work — across ${departments.length} departments and 35+ industries. Connect your tools, set permissions, and let them get to work.`,
  alternates: {
    canonical: "https://getfless.com",
  },
  openGraph: {
    title: "Fless — Hire AI Employees that Work for You",
    description:
      `Get specialized AI employees that handle real work — across ${departments.length} departments and 35+ industries. Connect your tools, set permissions, and let them get to work.`,
    url: "https://getfless.com",
    siteName: "Fless",
    images: [
      {
        url: "/fless-og.png",
        width: 1200,
        height: 630,
        alt: "Fless — Hire AI Employees that Work for You",
      },
    ],
  },
};

export default function Home() {
  const departmentCards = [
    {
      title: "Customer Support",
      desc: "Answer questions, solve problems, delight customers.",
      icon: Headphones,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-500/10",
      border: "hover:border-blue-500/30",
    },
    {
      title: "Marketing",
      desc: "Create content, manage socials, grow your brand.",
      icon: Megaphone,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-500/10",
      border: "hover:border-purple-500/30",
    },
    {
      title: "Sales",
      desc: "Find leads, follow up, close deals.",
      icon: Network,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-500/10",
      border: "hover:border-amber-500/30",
    },
    {
      title: "Operations",
      desc: "Manage schedules, coordinate tasks.",
      icon: Cpu,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "hover:border-emerald-500/30",
    },
    {
      title: "Finance",
      desc: "Handle bookkeeping, reconcile accounts.",
      icon: CreditCard,
      color: "text-cyan-600 dark:text-cyan-400",
      bg: "bg-cyan-500/10",
      border: "hover:border-cyan-500/30",
    },
    {
      title: "Legal",
      desc: "Review contracts, track renewals, manage compliance.",
      icon: Scale,
      color: "text-indigo-600 dark:text-indigo-400",
      bg: "bg-indigo-500/10",
      border: "hover:border-indigo-500/30",
    },
  ];

  const partnerApps = [
    {
      name: "Microsoft",
      icon: (
        <span className="inline-flex items-center gap-[2px] mr-1">
          <span className="w-1.5 h-1.5 bg-[#F25022] rounded-[1px]" />
          <span className="w-1.5 h-1.5 bg-[#7FBA00] rounded-[1px]" />
          <span className="w-1.5 h-1.5 bg-[#00A4EF] rounded-[1px]" />
          <span className="w-1.5 h-1.5 bg-[#FFB900] rounded-[1px]" />
        </span>
      ),
    },
    { name: "Google", icon: null },
    { name: "Shopify", icon: null },
    { name: "HubSpot", icon: null },
    { name: "Stripe", icon: null },
    { name: "Slack", icon: null },
    { name: "Salesforce", icon: null },
    { name: "WhatsApp", icon: null },
    { name: "GitHub", icon: null },
    { name: "Zendesk", icon: null },
    { name: "Notion", icon: null },
    { name: "Zoom", icon: null },
  ];

  const scrollingApps = [...partnerApps, ...partnerApps, ...partnerApps];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/20 selection:text-primary">
      <Header activePage="home" />

      <main className="flex-1">
        {/* ── SECTION 1: HERO (HIRE AI EMPLOYEES THAT WORK FOR YOU) ── */}
        <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-gradient-to-b from-blue-50/40 via-background to-background dark:from-[#0B0F1C] dark:via-background dark:to-background overflow-hidden border-b border-border/60">
          <div className="max-w-[1240px] mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
                <Briefcase className="w-3.5 h-3.5" />
                <span>For Businesses</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[62px] font-display font-semibold tracking-tight leading-[1.08] text-foreground">
                Hire AI{" "}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Employees
                </span>
                <br />
                that Work{" "}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  for You
                </span>
              </h1>

              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-lg">
                Get specialized AI employees that handle real work — across {departments.length} departments and 35+ industries. Connect your tools, set permissions, and let them get to work.
              </p>

              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Link
                  href="/start"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-white font-semibold text-sm shadow-lg shadow-primary/25 hover:bg-primary-hover transition-all"
                >
                  Hire Your First AI Employee
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/ai-employees"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-border bg-card/80 text-foreground font-semibold text-sm hover:bg-muted transition-colors backdrop-blur-md"
                >
                  <Play className="w-3.5 h-3.5 fill-muted-foreground text-muted-foreground" />
                  Watch Demo
                </Link>
              </div>

              {/* Partner Apps Auto-Scrolling Marquee */}
              <div className="pt-8 max-w-xl">
                <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground/75 mb-3 flex items-center gap-2">
                  <span>Connects with your everyday apps</span>
                  <span className="h-px bg-border/60 flex-1" />
                </div>
                <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                  <div className="logo-marquee flex w-max items-center gap-8 py-1 select-none opacity-75 grayscale hover:grayscale-0 hover:[animation-play-state:paused] transition-all">
                    {scrollingApps.map((app, i) => (
                      <span
                        key={`${app.name}-${i}`}
                        className="inline-flex items-center gap-1.5 font-bold tracking-tight text-xs sm:text-sm text-foreground/80 hover:text-foreground whitespace-nowrap transition-colors"
                      >
                        {app.icon}
                        <span>{app.name}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Mockup: Interactive Workspace Window with Intelligent Motions */}
            <div className="lg:col-span-6 relative">
              <InteractiveHeroShowcase />
            </div>

          </div>
        </section>

        {/* ── SECTION 2: 6 CORE DEPARTMENTS SHOWCASE (QUICK GRID) ── */}
        <section className="max-w-[1240px] mx-auto px-6 py-20 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-display font-semibold tracking-tight">
              Powerful AI Employees for Your Core Teams
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              From customer support and marketing to sales, operations, finance, and legal — find the right AI employee to fit your team. Or create custom workflows.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {departmentCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className={`p-5 rounded-2xl border border-border bg-card shadow-xs transition-all space-y-3 ${card.border}`}
                >
                  <div className={`w-10 h-10 rounded-xl ${card.bg} ${card.color} flex items-center justify-center`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-foreground">{card.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                      {card.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── SECTION 3: SPECIALIZED. PROFESSIONAL. ALWAYS ON. ── */}
        <section className="max-w-[1240px] mx-auto px-6 py-16 space-y-8 border-t border-border/60">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Card: Specialist in blazer with connected channels */}
            <div className="lg:col-span-6 relative flex items-center justify-center">
              <div className="relative rounded-3xl border border-border bg-card p-6 shadow-xl max-w-md w-full">
                
                {/* Floating Social Orbiting Icons */}
                <div className="absolute -left-3 top-8 flex flex-col gap-2 z-20">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white flex items-center justify-center shadow-md text-xs">
                    📷
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#1877F2] text-white flex items-center justify-center shadow-md font-bold text-xs">
                    f
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#0A66C2] text-white flex items-center justify-center shadow-md font-bold text-xs">
                    in
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-md font-bold text-xs">
                    N
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-5 items-center">
                  <div className="w-36 h-48 rounded-2xl overflow-hidden bg-neutral-200 border-2 border-border shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=320&auto=format&fit=crop&q=80"
                      alt="Marketing Assistant"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-3 flex-1">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10.5px] font-semibold bg-primary/10 text-primary">
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>Specialist Employee</span>
                    </div>

                    <div className="space-y-1.5 text-xs">
                      <p className="font-semibold text-foreground text-sm">
                        Hi! I&apos;m your marketing assistant. How can I help you today?
                      </p>
                      <ul className="space-y-1.5 text-muted-foreground text-[11.5px] pt-1">
                        <li className="flex items-center gap-1.5 text-foreground font-medium">
                          <Check className="w-3.5 h-3.5 text-primary" />
                          <span>Social Media Management</span>
                        </li>
                        <li className="flex items-center gap-1.5 text-foreground font-medium">
                          <Check className="w-3.5 h-3.5 text-primary" />
                          <span>Content Creation</span>
                        </li>
                        <li className="flex items-center gap-1.5 text-foreground font-medium">
                          <Check className="w-3.5 h-3.5 text-primary" />
                          <span>Analytics &amp; Reporting</span>
                        </li>
                        <li className="flex items-center gap-1.5 text-foreground font-medium">
                          <Check className="w-3.5 h-3.5 text-primary" />
                          <span>Works 24/7</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Copy */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Meet Your AI Team</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold tracking-tight text-foreground leading-[1.12]">
                Specialized. Professional.
                <br />
                Always On.
              </h2>

              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                Each AI employee is an industry specialist, trained to perform real tasks, connect with your business tools, and deliver consistent output — around the clock.
              </p>

              <p className="text-foreground font-semibold text-sm">
                No recruiting lag. No onboarding friction. No downtime.
              </p>

              <div className="pt-2">
                <Link
                  href="/hire"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                >
                  Browse Marketplace
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </section>

        {/* ── SECTION 4: 9 DEPARTMENTS SHOWCASE ── */}
        <section id="departments" className="border-t border-border/60">
          <Departments />
          <DepartmentShowcases />
        </section>

        {/* ── SECTION 5: SOLUTIONS & ALL 35+ INDUSTRIES ── */}
        <Industries />

        {/* ── SECTION 6: GOVERNANCE, AUDIT TRAIL & CONNECTED APPS ── */}
        <section className="border-t border-border/60">
          <BuiltDifferent />
          <Integrations />
        </section>

        {/* ── SECTION 7: INTERACTIVE BRIEF TESTER ── */}
        <section className="py-20 md:py-28 bg-[#fafafa] dark:bg-[#07090F] border-t border-border/60">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="max-w-2xl mx-auto text-center space-y-4 mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
                <Terminal className="w-3.5 h-3.5" />
                <span>Live Simulator</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-semibold tracking-tight text-foreground">
                Assign the work. Watch it run.
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Select a sample prompt below or type your own assignment. See how Fless locks the brief and queues execution with approval gates.
              </p>
            </div>

            <div className="max-w-3xl mx-auto shadow-xl">
              <TryCommand />
            </div>
          </div>
        </section>

        {/* ── SECTION 8: BUILD AI EMPLOYEES WITH NO CODE OR CODE (DARK SECTION) ── */}
        <section className="bg-[#080B14] text-white py-20 md:py-28 border-t border-white/10 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[360px] bg-primary/15 blur-[140px] rounded-full pointer-events-none" />
          <div className="max-w-[1240px] mx-auto px-6 relative z-10">
            <ModernBuilderShowcase />
          </div>
        </section>
      </main>

      {/* ── REAL MEGA FOOTER ── */}
      <Footer />
    </div>
  );
}
