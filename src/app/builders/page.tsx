"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CodeView } from "@/components/CodeView";
import { cn } from "@/lib/utils";
import {
  AGENTS_EXAMPLE,
  BUILDER_API,
  CONNECTIONS,
  CONNECTION_STATUS_NOTE,
  categoryLabel,
  CORE_PACKAGES,
  EVALUATION_EXAMPLE,
  MANIFEST_EXAMPLE,
  ACTION_MODE_NOTE,
  SANDBOX_EXAMPLE,
  type ConnectionStatus,
} from "@/lib/sdk";

const tabs = [
  { id: "manifest", label: "employee.ts", file: "src/employee.ts", code: MANIFEST_EXAMPLE },
  { id: "agents", label: "agents.ts", file: "src/agents.ts", code: AGENTS_EXAMPLE },
  { id: "sandbox", label: "sandbox.ts", file: "src/sandbox.ts", code: SANDBOX_EXAMPLE },
  { id: "evaluate", label: "evaluate", file: "Builder API", code: EVALUATION_EXAMPLE },
];

// What each block of the manifest does, in plain words.
const anatomy = [
  { key: "countries · industries · languages", text: "Who can hire it, and which languages it speaks." },
  { key: "packageActions", text: "The exact actions it may take in each connected app, with a mode and a reason for each." },
  { key: "tools · capabilities", text: "Built-in Fless tools it uses, such as knowledge search. Anything not declared is blocked." },
  { key: "skills", text: "Repeatable procedures with triggers, steps and the tools each step uses." },
  { key: "workflows", text: "Multi-step jobs that start on an event, such as a missed call." },
  { key: "knowledge", text: "The business facts it answers from: text, URLs, PDFs and docs." },
  { key: "agents · orchestration", text: "Specialist sub-agents, each with its own model, skills and tools." },
  { key: "policies", text: "What needs approval, when to hand over to a person, and working hours." },
  { key: "settingsSchema", text: "The settings each business fills in when they hire it." },
  { key: "evaluationScenarios", text: "Tests it must pass before it can be published." },
  { key: "pricing", text: "Your price and metered usage. You keep 35%." },
];

const steps = [
  { n: "01", title: "Write it", copy: "Describe the job in one TypeScript file: skills, knowledge, tools and price." },
  { n: "02", title: "Test it", copy: "Run real conversations in the sandbox. Packages are mocked, so no live accounts are touched." },
  { n: "03", title: "Evaluate it", copy: "Your scenarios plus Fless\u2019s policy, security and cost checks run against every version." },
  { n: "04", title: "Submit it", copy: "Passing versions go to review, then the marketplace. You're paid every month it works." },
];

const split = {
  fless: [
    "Hosting, models and GPU computing",
    "Customer logins and API keys, kept out of your code",
    "Sign-in and token handling for every connection, through each provider's official API",
    "Approvals, audit log and data isolation per customer",
    "Billing in 8 currencies, invoices and monthly payouts",
  ],
  you: [
    "The know-how: how the job is actually done",
    "Skills and procedures for real situations",
    "The knowledge your employee answers from",
    "Which markets and industries it is for",
    "Your price",
  ],
};

const statusTone: Record<ConnectionStatus, string> = {
  Available: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10",
  Beta: "text-primary bg-brand-soft",
  "Awaiting approval": "text-amber-700 dark:text-amber-400 bg-amber-500/10",
};

const statuses: ConnectionStatus[] = ["Available", "Beta", "Awaiting approval"];

export default function BuildersPage() {
  const [tab, setTab] = useState(tabs[0].id);
  const [status, setStatus] = useState<ConnectionStatus>("Available");
  const active = tabs.find((t) => t.id === tab) ?? tabs[0];
  const visibleConnections = CONNECTIONS.filter((c) => c.status === status);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <Header activePage="builders" />

      <main className="flex-1">
        {/* HERO */}
        <section className="pt-28 pb-16 sm:pt-32 md:pt-40 md:pb-24">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
            <div className="max-w-3xl">
              <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary mb-6">
                For builders · SDK in private beta
              </p>
              <h1 className="text-[40px] sm:text-6xl md:text-[68px] font-display font-semibold tracking-[-0.045em] leading-[1.03] text-balance">
                Build an AI employee once. <span className="text-primary">Earn every month it works.</span>
              </h1>
              <p className="mt-7 text-[17px] sm:text-xl text-muted-foreground leading-[1.65] max-w-2xl text-pretty">
                Package how a job is really done, such as a clinic front desk or a sales team, into one TypeScript
                file. Businesses hire it on the Fless marketplace. You keep 35% of every subscription. We run
                everything else.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/start?role=builder"
                  id="apply"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-7 text-[15px] font-medium text-primary-foreground shadow-sm shadow-primary/25 hover:bg-primary-hover transition-colors"
                >
                  Request SDK access →
                </Link>
                <Link
                  href="/docs"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-border px-7 text-[15px] font-medium text-foreground hover:border-primary/40 transition-colors"
                >
                  Read the docs
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CODE SHOWCASE */}
        <section className="pb-20 md:pb-32">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-8 min-w-0">
              <div role="tablist" aria-label="Example files" className="flex gap-1 overflow-x-auto no-scrollbar mb-4 -mx-1 px-1">
                {tabs.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    role="tab"
                    aria-selected={tab === t.id}
                    onClick={() => setTab(t.id)}
                    className={cn(
                      "h-9 shrink-0 rounded-full px-4 font-mono text-[12.5px] transition-colors",
                      tab === t.id ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
              <CodeView
                key={active.id}
                code={active.code}
                filename={active.file}
                maxHeight={560}
              />
            </div>

            <div className="lg:col-span-4 lg:pt-14">
              <h2 className="text-2xl font-display font-semibold tracking-tight mb-2">What&apos;s in the file</h2>
              <p className="text-[15px] text-muted-foreground leading-relaxed mb-8">
                A complete, production-shaped employee. Every block is typed and checked before it ships.
              </p>
              <dl className="space-y-5">
                {anatomy.map((a) => (
                  <div key={a.key}>
                    <dt className="font-mono text-[13px] text-foreground">{a.key}</dt>
                    <dd className="mt-1 text-[14px] text-muted-foreground leading-relaxed">{a.text}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-20 md:py-32 border-t border-border/60">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
            <h2 className="text-3xl sm:text-4xl md:text-[44px] font-display font-semibold tracking-tight leading-[1.1] max-w-xl mb-14 md:mb-20">
              From one file to a paying customer.
            </h2>
            <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12">
              {steps.map((s) => (
                <li key={s.n}>
                  <div className="font-mono text-[13px] text-primary mb-5">{s.n}</div>
                  <div className="h-px bg-border mb-6" />
                  <h3 className="text-lg font-semibold tracking-tight mb-2">{s.title}</h3>
                  <p className="text-[15px] text-muted-foreground leading-relaxed">{s.copy}</p>
                </li>
              ))}
            </ol>
            <div className="mt-16">
              <h3 className="text-[13px] font-medium text-muted-foreground mb-4">Builder API</h3>
              <ul className="border-t border-border/70">
                {BUILDER_API.slice(0, 5).map((e) => (
                  <li key={e.path} className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-1 py-4 border-b border-border/70">
                    <code className="md:col-span-7 font-mono text-[13px] text-foreground break-all">
                      <span className="text-primary mr-2">{e.method}</span>
                      {e.path}
                    </code>
                    <p className="md:col-span-5 text-[14px] text-muted-foreground">{e.summary}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* DIVISION OF WORK */}
        <section className="py-20 md:py-32 bg-[#fafafa] dark:bg-secondary border-t border-border/60">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
            <h2 className="text-3xl sm:text-4xl md:text-[44px] font-display font-semibold tracking-tight leading-[1.1] max-w-2xl mb-14 md:mb-20">
              You bring the know-how. We run the rest.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
              {[
                { title: "Fless handles", items: split.fless },
                { title: "You focus on", items: split.you },
              ].map((col) => (
                <div key={col.title}>
                  <h3 className="text-[13px] font-medium text-muted-foreground mb-4">{col.title}</h3>
                  <ul className="divide-y divide-border/70 border-y border-border/70">
                    {col.items.map((item) => (
                      <li key={item} className="py-4 text-[16px] text-foreground">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PACKAGES */}
        <section id="plugins" className="scroll-mt-20 py-20 md:py-32 border-t border-border/60">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-16">
              <div className="max-w-xl">
                <h2 className="text-3xl sm:text-4xl md:text-[44px] font-display font-semibold tracking-tight leading-[1.1] mb-4">
                  Packages.
                </h2>
                <p className="text-[16px] text-muted-foreground leading-relaxed">
                  Two core packages to build with, and {CONNECTIONS.length} app packages with{" "}
                  {CONNECTIONS.reduce((n, c) => n + c.actions, 0).toLocaleString()} actions. Declare the actions your
                  employee needs; the business connects its own accounts and your code never sees their keys.
                </p>
              </div>
              <Link href="/docs#packages" className="text-[14px] font-medium text-primary hover:opacity-80 shrink-0">
                Package reference →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16 md:mb-20">
              {CORE_PACKAGES.map((p) => (
                <div key={p.name} className="rounded-2xl border border-border/70 p-6 sm:p-7">
                  <div className="text-[12px] font-medium text-muted-foreground mb-3">{p.role}</div>
                  <div className="font-mono text-[15px] text-foreground mb-3">{p.name}</div>
                  <p className="text-[14px] text-muted-foreground leading-relaxed mb-5">{p.summary}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.exports.map((e) => (
                      <span key={e} className="font-mono text-[11.5px] text-foreground/80 bg-secondary rounded-md px-2 py-1">
                        {e}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <h3 className="text-xl font-display font-semibold tracking-tight mb-2">Every action has a mode.</h3>
            <p className="text-[15px] text-muted-foreground leading-relaxed max-w-2xl mb-8">
              You set a default for each action you declare. The business can always lower it, and nothing can go above
              the limit Fless sets for risky actions such as spending money or deleting data.
            </p>
            <dl className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(["ALLOW", "ASK", "OFF"] as const).map((m) => (
                <div key={m} className="rounded-2xl border border-border/70 p-6">
                  <dt className="font-mono text-[14px] text-foreground mb-2">{m}</dt>
                  <dd className="text-[14px] text-muted-foreground leading-relaxed">{ACTION_MODE_NOTE[m]}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* CONNECTIONS */}
        <section id="connections" className="scroll-mt-20 py-20 md:py-32 bg-[#fafafa] dark:bg-secondary border-t border-border/60">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
            <div className="max-w-2xl mb-12 md:mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-[44px] font-display font-semibold tracking-tight leading-[1.1] mb-4">
                Connected through official APIs.
              </h2>
              <p className="text-[16px] text-muted-foreground leading-relaxed">
                Fless connects straight to each provider&apos;s official API, with no third-party schedulers in between.
                Businesses sign in with their own accounts, and tokens are stored and refreshed by Fless.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-6">
              {statuses.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStatus(s)}
                  className={cn(
                    "h-9 rounded-full px-4 text-[13px] font-medium border transition-colors",
                    status === s
                      ? "bg-foreground text-background border-foreground"
                      : "border-border text-muted-foreground hover:text-foreground bg-background"
                  )}
                >
                  {s}
                  <span className="ml-1.5 opacity-60 tabular-nums">{CONNECTIONS.filter((c) => c.status === s).length}</span>
                </button>
              ))}
            </div>
            <p className="mb-6 text-[13px] text-muted-foreground">{CONNECTION_STATUS_NOTE[status]}</p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 border-t border-border/70">
              {visibleConnections.map((c) => (
                <li key={c.id} className="border-b border-border/70">
                  <Link href={`/docs#package-${c.id}`} className="group block py-5">
                  <div className="flex items-center gap-2.5">
                    <span className="text-[15px] font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">{c.name}</span>
                    <span className={cn("text-[11px] font-medium rounded-full px-2 py-0.5", statusTone[c.status])}>{c.status}</span>
                  </div>
                  <div className="mt-1 text-[13px] text-muted-foreground">
                    {categoryLabel(c.category)} · {c.actions} actions
                  </div>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/docs#connections" className="inline-block mt-8 text-[14px] font-medium text-primary hover:opacity-80">
              All {CONNECTIONS.length} connections →
            </Link>
          </div>
        </section>

        {/* EARNINGS */}
        <section className="py-20 md:py-32 border-t border-border/60">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6">
              <h2 className="text-3xl sm:text-4xl md:text-[44px] font-display font-semibold tracking-tight leading-[1.1] mb-5">
                You keep 35%. Every month.
              </h2>
              <p className="text-[16px] text-muted-foreground leading-relaxed max-w-lg">
                You earn 35% of every subscription and every metered charge your employee brings in, paid monthly to
                your bank or Stripe. Fless keeps 65%, which covers computing, security, billing and distribution.
              </p>
            </div>
            <div className="lg:col-span-6">
              <div className="rounded-3xl bg-background border border-border/70 p-7 sm:p-10">
                <div className="text-[13px] text-muted-foreground mb-8">Example: the clinic front desk above</div>
                <dl className="space-y-5 text-[15px]">
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-muted-foreground">Clinics that hire it</dt>
                    <dd className="font-medium tabular-nums">20</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-muted-foreground">Monthly price</dt>
                    <dd className="font-medium tabular-nums">$49</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-muted-foreground">Monthly revenue</dt>
                    <dd className="font-medium tabular-nums">$980</dd>
                  </div>
                  <div className="h-px bg-border" />
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="font-medium text-foreground">You earn</dt>
                    <dd className="text-3xl sm:text-4xl font-display font-semibold tracking-tight tabular-nums text-primary">
                      $343<span className="text-base text-muted-foreground font-sans font-normal">/mo</span>
                    </dd>
                  </div>
                </dl>
                <p className="mt-8 text-[13px] text-muted-foreground leading-relaxed">
                  Before metered call minutes, which also pay 35%. Illustrative figures.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-32 border-t border-border/60">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
            <div className="rounded-3xl bg-night text-white px-7 py-14 sm:px-12 sm:py-20 text-center">
              <h2 className="text-3xl sm:text-5xl font-display font-semibold tracking-tight leading-[1.08] max-w-2xl mx-auto">
                Ship your first employee.
              </h2>
              <p className="mt-5 text-[16px] text-white/60 leading-relaxed max-w-lg mx-auto">
                The SDK is in private beta. Apply to join the next builder cohort and get the packages, builder API
                keys and a sandbox account.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/start?role=builder"
                  className="inline-flex h-12 w-full sm:w-auto items-center justify-center rounded-full bg-primary px-7 text-[15px] font-medium text-primary-foreground hover:bg-primary-hover transition-colors"
                >
                  Request SDK access →
                </Link>
                <Link
                  href="/docs#quickstart"
                  className="inline-flex h-12 w-full sm:w-auto items-center justify-center rounded-full border border-white/20 px-7 text-[15px] font-medium text-white hover:bg-white/5 transition-colors"
                >
                  Quickstart
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
