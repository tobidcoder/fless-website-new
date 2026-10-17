"use client";

import {
  Building2,
  Users2,
  Plug,
  Send,
  CheckCheck,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const STEPS = [
  {
    step: "01",
    title: "Tell Fless about your business",
    desc: "Share your company goals, market guidelines, and brand policies. No technical setup or model training required.",
    icon: Building2,
    badge: "1-Minute Onboarding",
  },
  {
    step: "02",
    title: "Choose the employees you need",
    desc: "Hire specialized roles across marketing, sales, voice, customer support, finance, and legal tailored to your industry.",
    icon: Users2,
    badge: "Pre-Built Specialists",
  },
  {
    step: "03",
    title: "Connect your everyday tools",
    desc: "Link Google Workspace, HubSpot, Shopify, WhatsApp, and Slack with official scoped permissions and zero secret exposure.",
    icon: Plug,
    badge: "Official OAuth",
  },
  {
    step: "04",
    title: "Assign work with plain briefs",
    desc: "Give instructions naturally or enable automated trigger workflows. Fless structures tasks into clear, executable steps.",
    icon: Send,
    badge: "Natural Language",
  },
  {
    step: "05",
    title: "Review results & approve",
    desc: "Every post, email, or invoice remains behind a human approval gate until you review and sign off. You stay in control.",
    icon: CheckCheck,
    badge: "Human Sign-Off",
  },
];

export function HowFlessWorks() {
  return (
    <section className="py-20 md:py-28 bg-background border-t border-border/60">
      <div className="max-w-[1240px] mx-auto px-6 space-y-14">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>How Fless Works</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-semibold tracking-tight text-foreground">
            From business brief to completed work
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            A straightforward process designed for business owners. No complex machine learning configuration.
          </p>
        </div>

        {/* 5-Step Visual Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {STEPS.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className="relative p-6 rounded-2xl border border-border bg-card shadow-xs flex flex-col justify-between hover:border-primary/40 hover:shadow-md transition-all space-y-4"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-primary px-2 py-0.5 rounded-md bg-primary/10">
                      STEP {s.step}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-foreground">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-sm sm:text-base text-foreground leading-snug">
                      {s.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed pt-2">
                      {s.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-border/60">
                  <span className="text-[11px] font-mono text-muted-foreground">
                    {s.badge}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Banner */}
        <div className="p-6 sm:p-8 rounded-3xl border border-primary/20 bg-primary/5 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-semibold text-foreground text-base">
              Ready to see an AI employee in your workspace?
            </h4>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Select your department and deploy your first employee with full human approval controls.
            </p>
          </div>

          <Link
            href="/start"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold text-xs sm:text-sm shadow-md hover:bg-primary/90 transition-all shrink-0"
          >
            <span>Hire AI Employees</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
