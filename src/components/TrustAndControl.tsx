"use client";

import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  History,
  ToggleLeft,
  FileKey2,
} from "lucide-react";

const CONTROLS = [
  {
    title: "Mandatory Human Sign-Off",
    desc: "AI employees cannot publish marketing posts, disburse funds, or dispatch sensitive emails without your explicit approval.",
    icon: CheckCircle2,
    tag: "Active by Default",
  },
  {
    title: "Granular Tool Permissions",
    desc: "Limit what files, channels, and accounts an employee can touch. Revoke or adjust access at any time from your settings.",
    icon: Lock,
    tag: "Scoped Access",
  },
  {
    title: "Complete Activity History",
    desc: "Every query, API interaction, draft, and approval is logged with exact timestamps in a tamper-evident audit trail.",
    icon: History,
    tag: "100% Traceable",
  },
  {
    title: "Instant Pause & Schedule Control",
    desc: "Pause any worker instantly, adjust working hours, or assign work queues with a single toggle in your dashboard.",
    icon: ToggleLeft,
    tag: "Immediate Effect",
  },
  {
    title: "Zero-Secret Architecture",
    desc: "Your third-party OAuth tokens and database credentials are fully isolated in encrypted storage, never injected into model prompts.",
    icon: FileKey2,
    tag: "Encrypted Storage",
  },
  {
    title: "Isolated Workspace Boundaries",
    desc: "Your company context and customer data belong exclusively to your workspace and are never shared across tenants or public models.",
    icon: ShieldCheck,
    tag: "Strict Data Isolation",
  },
];

export function TrustAndControl() {
  return (
    <section className="py-20 md:py-28 bg-muted/20 border-t border-border/60">
      <div className="max-w-[1240px] mx-auto px-6 space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
            <Lock className="w-3.5 h-3.5" />
            <span>Governance &amp; Business Control</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-semibold tracking-tight text-foreground">
            You stay in control of every action
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Fless operates with strict guardrails, human approvals, and transparent audit trails. No black-box autonomous actions.
          </p>
        </div>

        {/* 6 Control Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CONTROLS.map((control) => {
            const Icon = control.icon;
            return (
              <div
                key={control.title}
                className="p-6 rounded-2xl border border-border bg-card shadow-xs space-y-3 hover:border-primary/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">
                    {control.tag}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-semibold text-sm text-foreground">
                    {control.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {control.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
