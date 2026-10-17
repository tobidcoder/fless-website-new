import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { InteractiveHeroShowcase } from "@/components/InteractiveHeroShowcase";
import { InteractiveDepartmentStudio } from "@/components/InteractiveDepartmentStudio";
import { WorkforceExplorer } from "@/components/WorkforceExplorer";
import { VisualExecutionPipeline } from "@/components/VisualExecutionPipeline";
import { InteractiveGovernanceCockpit } from "@/components/InteractiveGovernanceCockpit";
import { BuilderInvitation } from "@/components/BuilderInvitation";
import {
  Briefcase,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Fless — AI Employees that Get Real Work Done",
  description:
    "Build your workforce around the work your business needs. Hire specialized AI employees across marketing, sales, support, voice and operations—all from one platform.",
  alternates: {
    canonical: "https://getfless.com",
  },
  openGraph: {
    title: "Fless — AI Employees that Get Real Work Done",
    description:
      "Build your workforce around the work your business needs. Hire specialized AI employees across marketing, sales, support, voice and operations—all from one platform.",
    url: "https://getfless.com",
    siteName: "Fless",
    images: [
      {
        url: "/fless-og.png",
        width: 1200,
        height: 630,
        alt: "Fless — AI Employees that Get Real Work Done",
      },
    ],
  },
};

export default function Home() {
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
        {/* ── 1. HERO + REALISTIC PRODUCT PREVIEW ── */}
        <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-gradient-to-b from-blue-50/40 via-background to-background dark:from-[#0B0F1C] dark:via-background dark:to-background overflow-hidden border-b border-border/60">
          <div className="max-w-[1240px] mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
                <Briefcase className="w-3.5 h-3.5" />
                <span>For Business Owners &amp; Teams</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[62px] font-display font-semibold tracking-tight leading-[1.08] text-foreground">
                AI employees that{" "}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  get real work done.
                </span>
              </h1>

              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-lg">
                Build your workforce around the work your business needs. Hire specialized AI employees across marketing, sales, support, voice and operations—all from one platform.
              </p>

              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Link
                  href="/start"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-white font-semibold text-sm shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all"
                >
                  Hire AI Employees
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/ai-employees"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-border bg-card/80 text-foreground font-semibold text-sm hover:bg-muted transition-colors backdrop-blur-md"
                >
                  Explore Employees
                </Link>
              </div>

              {/* Supported Connected Apps Marquee */}
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

            {/* Right: Faithful Dashboard Preview */}
            <div className="lg:col-span-6 relative">
              <InteractiveHeroShowcase />
            </div>

          </div>
        </section>

        {/* ── 2. CORE TEAMS IN MOTION: INTERACTIVE DEPARTMENT STUDIO ── */}
        <InteractiveDepartmentStudio />

        {/* ── 3. VISUAL EXECUTION PIPELINE: BRIEF TO 1-CLICK SIGN-OFF ── */}
        <VisualExecutionPipeline />

        {/* ── 4. DISCOVER YOUR WORKFORCE: PRE-BUILT SPECIALISTS ── */}
        <WorkforceExplorer />

        {/* ── 5. CONTROL & GOVERNANCE COCKPIT ── */}
        <InteractiveGovernanceCockpit />

        {/* ── 6. BUILDER INVITATION ── */}
        <BuilderInvitation />

        {/* ── 7. FINAL CALL TO ACTION ── */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-background to-muted/40 border-t border-border/60">
          <div className="max-w-3xl mx-auto px-6 text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold tracking-tight text-foreground leading-[1.1]">
              Start building your AI workforce.
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Find the employees your business needs and manage their work from one place. Free trial setup with no commitment.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href="/start"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-white text-xs sm:text-sm font-semibold hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/ai-employees"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-border bg-card hover:bg-muted text-foreground text-xs sm:text-sm font-medium transition-colors"
              >
                <span>Explore Employees</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <Footer />
    </div>
  );
}
