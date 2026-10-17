"use client";

import { useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  Headphones,
  Cpu,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

interface OutcomeExample {
  title: string;
  role: string;
  challenge: string;
  solution: string;
  inputSnippet: string;
  actionTrace: string[];
  outputSnippet: string;
  timeSaved: string;
}

interface OutcomeTab {
  id: string;
  label: string;
  tagline: string;
  icon: React.ComponentType<{ className?: string }>;
  examples: OutcomeExample[];
}

const OUTCOMES: OutcomeTab[] = [
  {
    id: "revenue",
    label: "Grow Revenue",
    tagline: "Qualify high-intent inbound leads and schedule sales pipeline meetings automatically.",
    icon: TrendingUp,
    examples: [
      {
        title: "B2B Lead Enrichment & Discovery Booking",
        role: "B2B Sales Development Rep",
        challenge: "Inbound leads wait hours for human triage, causing deal drop-off before demo scheduling.",
        solution: "Enriches company data instantly, evaluates budget and role fit, and sends tailored booking calendar links.",
        inputSnippet: "New inbound form: 'VP of Ops at 120-person logistics firm evaluating workforce automation.'",
        actionTrace: [
          "Enrich lead via Clearbit / LinkedIn data APIs",
          "Score opportunity: 94/100 (High-priority enterprise)",
          "Draft contextual invite referencing their current warehouse stack",
          "Check Account Executive availability and dispatch calendar link",
        ],
        outputSnippet: "Intro call scheduled for Thursday at 2:00 PM EST. Meeting synced to HubSpot with deal value $36,000 ARR.",
        timeSaved: "Saves 14 hrs/week of SDR manual research",
      },
      {
        title: "Multi-Channel Content Campaign Delivery",
        role: "Social Media Manager",
        challenge: "Marketing teams struggle to maintain consistent weekly content calendars across LinkedIn, Meta, and X.",
        solution: "Generates on-brand copy and assets from campaign briefs, queuing posts for human review before scheduling.",
        inputSnippet: "Brief: 'Promote our new customer case study with 3 key takeaway carousels and industry hashtags.'",
        actionTrace: [
          "Extract quantitative highlights from uploaded PDF case study",
          "Format copy variations tuned to LinkedIn and X audience formats",
          "Render preview banners matching brand typography guidelines",
          "Queue for marketing manager sign-off prior to publishing",
        ],
        outputSnippet: "3 posts queued for Tuesday 10:00 AM peak window. All drafts held behind approval gate.",
        timeSaved: "Cuts content drafting cycle from 3 days to 25 mins",
      },
    ],
  },
  {
    id: "customers",
    label: "Serve Customers",
    tagline: "Resolve questions around the clock and answer incoming calls with low-latency streaming voice.",
    icon: Headphones,
    examples: [
      {
        title: "Streaming Inbound Voice Reception",
        role: "Clinic Voice Receptionist",
        challenge: "Medical practices and clinics miss critical patient phone calls during peak morning hours.",
        solution: "Answers calls in under 180ms, screens patient questions against clinic policies, and books appointment slots.",
        inputSnippet: "Caller: 'Hi, I need to see Dr. Adeleke tomorrow afternoon for a routine blood pressure check.'",
        actionTrace: [
          "LiveKit audio stream transcribes caller speech in real time",
          "Check doctor schedule in practice management software",
          "Identify open slot at 3:15 PM tomorrow",
          "Confirm patient details and trigger automated SMS appointment reminder",
        ],
        outputSnippet: "Appointment confirmed for tomorrow 3:15 PM. SMS with clinic directions dispatched to patient.",
        timeSaved: "Zero missed calls across 24/7 operating hours",
      },
      {
        title: "Multi-Channel Tier-1 Customer Resolution",
        role: "Customer Support Specialist",
        challenge: "High volumes of tracking and refund questions clog support inboxes, slowing high-priority tickets.",
        solution: "Connects to Shopify, Zendesk, and WhatsApp to verify tracking numbers and answer customer questions instantly.",
        inputSnippet: "Customer WhatsApp: 'Where is my order #10842? It was supposed to arrive yesterday.'",
        actionTrace: [
          "Query order status via logistics API with customer phone number",
          "Detect carrier dispatch status: On vehicle for delivery today",
          "Generate concise, empathetic WhatsApp reply with live tracking URL",
          "Log interaction in Zendesk ticket history and mark as resolved",
        ],
        outputSnippet: "Customer received accurate status in 1.4 seconds without taking human agent time.",
        timeSaved: "Resolves 68% of repetitive support tickets automatically",
      },
    ],
  },
  {
    id: "operations",
    label: "Run Operations",
    tagline: "Eliminate manual bookkeeping reconciliation, audit trails, and contract renewal bottlenecks.",
    icon: Cpu,
    examples: [
      {
        title: "Vendor Invoice Matching & Ledger Audit",
        role: "Accounts Receivable Specialist",
        challenge: "Finance teams spend days matching vendor PDFs against purchase orders and bank statements.",
        solution: "Scans invoices, cross-references line items against receipts, and prepares reconciled payment batches for CFO review.",
        inputSnippet: "Vendor email: 'Attached monthly invoice #INV-4921 for warehouse packaging supplies ($4,250.00).'",
        actionTrace: [
          "Extract PO number, line items, and VAT details from vendor PDF",
          "Match against Purchase Order #PO-8812 in accounting ledger",
          "Verify zero line-item price variance and valid delivery confirmation",
          "Queue batch entry for CFO approval before bank disbursement",
        ],
        outputSnippet: "Matched 100% against PO-8812. Ready for CFO one-click approval in payment batch.",
        timeSaved: "Reduces month-end close time by 4 business days",
      },
      {
        title: "Vendor Contract Triage & Risk Redlining",
        role: "Legal & Contracts Lead",
        challenge: "Commercial agreements sit in review queues, delaying vendor onboarding and exposing businesses to unlimited liability.",
        solution: "Screens incoming NDAs and MSAs against company contract guidelines, highlighting non-standard indemnity clauses.",
        inputSnippet: "Draft review: 'Enterprise vendor SaaS Master Services Agreement (24-page PDF).'",
        actionTrace: [
          "Parse liability, confidentiality, and data ownership clauses",
          "Flag Section 8.3: Uncapped indemnification beyond contract fee",
          "Insert standard redline replacement capping liability to 12 months fees",
          "Generate risk summary memo for General Counsel review",
        ],
        outputSnippet: "Risk summary memo delivered with recommended redlines. Flagged clauses isolated for counsel.",
        timeSaved: "Reduces routine contract review time by 75%",
      },
    ],
  },
];

export function OutcomesShowcase() {
  const [activeTabId, setActiveTabId] = useState("revenue");

  const currentTab = OUTCOMES.find((t) => t.id === activeTabId) || OUTCOMES[0];

  return (
    <section className="py-20 md:py-28 bg-muted/30 border-t border-border/60">
      <div className="max-w-[1240px] mx-auto px-6 space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Proven Business Outcomes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-semibold tracking-tight text-foreground">
            Work accomplished, not just suggested
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            See how Fless AI employees handle real multi-step workflows across your three most critical business engines.
          </p>
        </div>

        {/* 3 Outcome Tabs */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 rounded-2xl bg-card border border-border shadow-xs">
            {OUTCOMES.map((tab) => {
              const Icon = tab.icon;
              const isActive = tab.id === activeTabId;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTabId(tab.id)}
                  className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-primary text-white shadow-xs"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Current Outcome Examples Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {currentTab.examples.map((example) => (
            <div
              key={example.title}
              className="rounded-3xl border border-border bg-card p-7 sm:p-8 shadow-xs flex flex-col justify-between space-y-6"
            >
              <div className="space-y-5">
                {/* Header */}
                <div className="flex items-start justify-between gap-3 border-b border-border/60 pb-4">
                  <div>
                    <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-primary">
                      {example.role}
                    </span>
                    <h3 className="text-lg sm:text-xl font-semibold text-foreground pt-1">
                      {example.title}
                    </h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shrink-0">
                    {example.timeSaved}
                  </span>
                </div>

                {/* Challenge & Solution */}
                <div className="space-y-3 text-xs leading-relaxed">
                  <div>
                    <span className="font-semibold text-foreground">The Challenge: </span>
                    <span className="text-muted-foreground">{example.challenge}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-foreground">The Fless Solution: </span>
                    <span className="text-muted-foreground">{example.solution}</span>
                  </div>
                </div>

                {/* Simulated Product Workflow Box */}
                <div className="rounded-2xl border border-border/80 bg-background/90 p-4 space-y-3 font-mono text-[11.5px]">
                  {/* Inbound Trigger */}
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
                      Input Brief / Trigger
                    </span>
                    <p className="text-foreground/90 font-sans text-xs bg-muted/60 p-2.5 rounded-lg border border-border/50">
                      {example.inputSnippet}
                    </p>
                  </div>

                  {/* Execution Trace */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
                      Execution Trace
                    </span>
                    <ul className="space-y-1 text-muted-foreground">
                      {example.actionTrace.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                          <span className="font-sans text-xs leading-snug">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Verified Output */}
                  <div className="space-y-1 pt-1 border-t border-border/60">
                    <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 tracking-wider">
                      Completed Result (Approval Ready)
                    </span>
                    <p className="text-foreground font-sans text-xs bg-emerald-500/5 dark:bg-emerald-500/10 p-2.5 rounded-lg border border-emerald-500/20 text-emerald-950 dark:text-emerald-200">
                      {example.outputSnippet}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <Link
                  href="/start"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-primary hover:text-primary-hover transition-colors"
                >
                  <span>Deploy {example.role} for your team</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
