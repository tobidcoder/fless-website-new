"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Send,
  MessageSquare,
  Mail,
  ShoppingBag,
  Sliders,
  Play,
  ShieldCheck,
  Workflow,
  Globe,
  DollarSign,
  Activity,
  Layers,
  Terminal,
  Building2,
  UserCheck,
  ExternalLink,
  Lock,
} from "lucide-react";

export function InteractiveBuilderStudio() {
  const [activeStep, setActiveStep] = useState<number>(0);

  // Step 2 interactive state
  const [refundLimit, setRefundLimit] = useState<number>(50);
  const [selectedTone, setSelectedTone] = useState<"warm" | "professional" | "direct">("warm");
  const [requireApproval, setRequireApproval] = useState<boolean>(true);

  // Step 3 interactive scenario
  const [testScenario, setTestScenario] = useState<"order" | "return" | "urgent">("order");
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  // Step 4 deployment type
  const [deployTarget, setDeployTarget] = useState<"private" | "marketplace">("marketplace");

  // Step 5 earnings slider
  const [subscribers, setSubscribers] = useState<number>(20);
  const [seatPrice, setSeatPrice] = useState<number>(499);

  const grossMonthly = subscribers * seatPrice;
  const builderTakeHome = Math.round(grossMonthly * 0.7);
  const flessInfra = Math.round(grossMonthly * 0.3);

  const stepsList = [
    {
      num: 1,
      title: "Describe",
      desc: "Tell us what kind of employee you want.",
      badge: "Initial idea",
    },
    {
      num: 2,
      title: "Refine",
      desc: "Answer a few questions and add the right tools.",
      badge: "Apps & skills",
    },
    {
      num: 3,
      title: "Test",
      desc: "Try it live in a sandbox with real scenarios.",
      badge: "Live preview",
    },
    {
      num: 4,
      title: "Publish",
      desc: "Go private or submit to the marketplace.",
      badge: "Make it available",
    },
    {
      num: 5,
      title: "Earn",
      desc: "Start earning with your creations.",
      badge: "Royalties & payouts",
    },
  ];

  const handleRunSimulation = (scenario: "order" | "return" | "urgent") => {
    setTestScenario(scenario);
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
    }, 450);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
      {/* ── LEFT: 5 STEP NAVIGATION LIST ── */}
      <div className="lg:col-span-4 space-y-3 relative">
        <div className="space-y-2">
          {stepsList.map((s, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={s.num}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`w-full text-left p-3.5 rounded-2xl transition-all border flex items-start gap-3.5 group cursor-pointer ${
                  isActive
                    ? "bg-card border-primary/40 shadow-md shadow-primary/5 ring-1 ring-primary/20"
                    : "bg-transparent border-transparent hover:bg-muted/40 hover:border-border/60"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center font-mono font-bold text-xs shrink-0 transition-colors ${
                    isActive
                      ? "bg-primary text-white shadow-sm shadow-primary/30"
                      : "bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary"
                  }`}
                >
                  {s.num}
                </div>

                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4
                      className={`font-semibold text-sm transition-colors ${
                        isActive ? "text-primary font-bold" : "text-foreground group-hover:text-primary"
                      }`}
                    >
                      {s.title}
                    </h4>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${
                        isActive
                          ? "bg-primary/10 text-primary font-semibold"
                          : "text-muted-foreground bg-muted/60"
                      }`}
                    >
                      {s.badge}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-1">
                    {s.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Step Progression Bar */}
        <div className="p-3.5 rounded-2xl bg-muted/30 border border-border/60 text-xs text-muted-foreground space-y-2">
          <div className="flex items-center justify-between font-mono text-[11px]">
            <span>Workflow Progress</span>
            <span className="font-bold text-foreground">Step {activeStep + 1} of 5</span>
          </div>
          <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={false}
              animate={{ width: `${((activeStep + 1) / 5) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* ── RIGHT: INTERACTIVE STUDIO CONTAINER ── */}
      <div className="lg:col-span-8 rounded-3xl border border-border bg-card shadow-2xl overflow-hidden">
        {/* Studio Window Header */}
        <div className="flex items-center justify-between px-5 py-3 bg-muted/30 border-b border-border text-xs">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>
            <span className="text-border">|</span>
            <div className="flex items-center gap-1.5 font-semibold text-foreground">
              <Workflow className="w-3.5 h-3.5 text-primary" />
              <span>Create Employee Studio</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-muted-foreground font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Interactive Simulator</span>
          </div>
        </div>

        {/* Stage Tabs (1 to 5) */}
        <div className="grid grid-cols-5 p-2 gap-1.5 bg-muted/15 border-b border-border text-xs">
          {stepsList.map((step, idx) => {
            const isTabActive = activeStep === idx;
            return (
              <button
                key={step.num}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`p-2 rounded-xl text-left transition-all cursor-pointer ${
                  isTabActive
                    ? "bg-card border border-primary/30 shadow-xs"
                    : "hover:bg-muted/40 border border-transparent"
                }`}
              >
                <div className="flex items-center gap-1.5 font-semibold text-xs">
                  <span
                    className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold ${
                      isTabActive
                        ? "bg-primary text-white"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step.num}
                  </span>
                  <span className={isTabActive ? "text-primary font-bold" : "text-foreground"}>
                    {step.title}
                  </span>
                </div>
                <span className="text-[10px] text-muted-foreground hidden sm:block truncate mt-0.5">
                  {step.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Studio Stage Content */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            {/* ── STEP 1: DESCRIBE ── */}
            {activeStep === 0 && (
              <motion.div
                key="step-describe"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start"
              >
                {/* Chat Column */}
                <div className="md:col-span-7 space-y-3.5 font-sans text-xs">
                  {/* Assistant Prompt */}
                  <div className="flex items-start gap-2.5">
                    <div className="w-6 h-6 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 border border-primary/20">
                      <Terminal className="w-3.5 h-3.5" />
                    </div>
                    <div className="rounded-2xl rounded-tl-sm bg-muted/50 border border-border/80 p-3 text-foreground leading-relaxed text-[11.5px]">
                      What kind of employee would you like to build?
                    </div>
                  </div>

                  {/* User Reply */}
                  <div className="ml-auto max-w-[90%] rounded-2xl rounded-tr-sm bg-primary px-4 py-2.5 text-white leading-relaxed text-[11.5px] shadow-sm">
                    I want a customer support assistant for my e-commerce store. It should handle common questions, track orders and help with returns.
                  </div>

                  {/* Assistant Follow-up Questions */}
                  <div className="flex items-start gap-2.5">
                    <div className="w-6 h-6 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 border border-primary/20">
                      <Terminal className="w-3.5 h-3.5" />
                    </div>
                    <div className="rounded-2xl rounded-tl-sm bg-muted/50 border border-border/80 p-3.5 text-foreground leading-relaxed text-[11.5px] space-y-2">
                      <p>Great! I&apos;ll help you build a <strong>Customer Support Assistant</strong>.</p>
                      <p className="text-muted-foreground">To make this even better, could you tell me:</p>
                      <ol className="space-y-1 text-foreground/90 pl-1 list-decimal list-inside text-[11px]">
                        <li>Which channels should it support? (e.g. WhatsApp, Email, Chat)</li>
                        <li>What e-commerce platform do you use? (e.g. Shopify, WooCommerce)</li>
                        <li>Do you have specific tone or style preferences?</li>
                      </ol>
                    </div>
                  </div>

                  {/* Quick suggestion tags */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[10.5px]">
                    <span className="text-muted-foreground text-[10px]">Add rules:</span>
                    <button
                      type="button"
                      onClick={() => setActiveStep(1)}
                      className="px-2.5 py-1 rounded-lg bg-muted/80 hover:bg-muted text-foreground border border-border transition-colors cursor-pointer"
                    >
                      + WhatsApp &amp; Shopify
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveStep(1)}
                      className="px-2.5 py-1 rounded-lg bg-muted/80 hover:bg-muted text-foreground border border-border transition-colors cursor-pointer"
                    >
                      + 30-Day Return Limit
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveStep(1)}
                      className="px-2.5 py-1 rounded-lg bg-muted/80 hover:bg-muted text-foreground border border-border transition-colors cursor-pointer"
                    >
                      + Human Handoff
                    </button>
                  </div>

                  {/* Input bar */}
                  <div className="flex items-center gap-2 pt-2 border-t border-border">
                    <input
                      readOnly
                      value="Add WhatsApp, Shopify order tracking, and escalate returns > $50 to team"
                      className="flex-1 bg-muted/40 border border-border rounded-xl px-3 py-2 text-xs text-foreground outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setActiveStep(1)}
                      className="p-2 rounded-xl bg-primary text-white text-xs shrink-0 hover:bg-primary-hover transition-colors"
                      title="Send message"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Right Draft Card */}
                <div className="md:col-span-5 rounded-2xl border border-border bg-muted/20 p-4 space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary border border-primary/20 flex items-center justify-center">
                        <UserCheck className="w-4 h-4" />
                      </div>
                      <span className="font-semibold text-xs text-foreground">Your AI Employee</span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-primary/10 text-primary border border-primary/20">
                      Draft Spec
                    </span>
                  </div>

                  <div>
                    <h4 className="font-semibold text-xs text-foreground">Customer Support Assistant</h4>
                    <p className="text-[10.5px] text-muted-foreground leading-tight mt-0.5">
                      Provides instant support, answers FAQs, tracks orders and handles returns.
                    </p>
                  </div>

                  {/* Channels */}
                  <div className="flex flex-wrap gap-1 text-[10px]">
                    <span className="px-2 py-0.5 rounded-md bg-card border border-border text-foreground flex items-center gap-1">
                      <MessageSquare className="w-2.5 h-2.5 text-emerald-500" /> WhatsApp
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-card border border-border text-foreground flex items-center gap-1">
                      <Mail className="w-2.5 h-2.5 text-blue-500" /> Email
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-card border border-border text-foreground flex items-center gap-1">
                      <ShoppingBag className="w-2.5 h-2.5 text-purple-500" /> Shopify
                    </span>
                    <span className="text-[9px] text-muted-foreground self-center">+1 more</span>
                  </div>

                  {/* Key Features */}
                  <div className="space-y-1.5 text-[10.5px] text-muted-foreground pt-1 border-t border-border/60">
                    <span className="font-semibold text-foreground text-[11px] block">Key Features</span>
                    <div className="flex items-center gap-1.5 text-foreground">
                      <Check className="w-3 h-3 text-primary shrink-0" />
                      <span>Answers product and order questions</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-foreground">
                      <Check className="w-3 h-3 text-primary shrink-0" />
                      <span>Tracks shipping and delivery status</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-foreground">
                      <Check className="w-3 h-3 text-primary shrink-0" />
                      <span>Handles returns and exchanges</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-foreground">
                      <Check className="w-3 h-3 text-primary shrink-0" />
                      <span>Escalates complex issues to your team</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveStep(1)}
                      className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-hover transition-colors shadow-sm cursor-pointer"
                    >
                      <span>Proceed to Step 2: Refine</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── STEP 2: REFINE / CONFIGURE ── */}
            {activeStep === 1 && (
              <motion.div
                key="step-refine"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start"
              >
                {/* Tool Settings Column */}
                <div className="md:col-span-7 space-y-4 text-xs font-sans">
                  <div>
                    <h3 className="font-semibold text-sm text-foreground">Configure Apps &amp; Skills</h3>
                    <p className="text-muted-foreground text-xs">
                      Connect official plugins and configure guardrails for your e-commerce assistant.
                    </p>
                  </div>

                  {/* Connected Integrations list */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 rounded-xl border border-border bg-card">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                          <MessageSquare className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-semibold text-foreground text-xs">WhatsApp Cloud API</div>
                          <div className="text-[10.5px] text-muted-foreground">Inbound customer messages &amp; template dispatches</div>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                        Connected
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl border border-border bg-card">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center">
                          <ShoppingBag className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-semibold text-foreground text-xs">Shopify Orders &amp; Catalog</div>
                          <div className="text-[10.5px] text-muted-foreground">Read inventory, lookup order numbers &amp; track shipments</div>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-500/10 text-purple-500 border border-purple-500/20">
                        Read/Write
                      </span>
                    </div>
                  </div>

                  {/* Guardrail Limit Controls */}
                  <div className="p-4 rounded-xl border border-border bg-muted/30 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-foreground text-xs">Max Auto-Refund Threshold</span>
                      <span className="font-mono font-bold text-primary text-xs">${refundLimit}.00</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {[25, 50, 100].map((amount) => (
                        <button
                          key={amount}
                          type="button"
                          onClick={() => setRefundLimit(amount)}
                          className={`py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                            refundLimit === amount
                              ? "bg-primary text-white border-primary shadow-xs"
                              : "bg-card text-foreground border-border hover:bg-muted"
                          }`}
                        >
                          ${amount} limit
                        </button>
                      ))}
                    </div>
                    <p className="text-[10.5px] text-muted-foreground">
                      Any refund request above ${refundLimit} requires approval from a human store manager before execution.
                    </p>
                  </div>

                  {/* Tone of voice selector */}
                  <div className="flex items-center justify-between p-3 rounded-xl border border-border bg-card">
                    <div>
                      <span className="font-semibold text-foreground text-xs block">Brand Voice &amp; Tone</span>
                      <span className="text-[10.5px] text-muted-foreground">Sets personality and interaction length</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {(["warm", "professional", "direct"] as const).map((tone) => (
                        <button
                          key={tone}
                          type="button"
                          onClick={() => setSelectedTone(tone)}
                          className={`px-2.5 py-1 rounded-md text-[11px] font-medium capitalize transition-all cursor-pointer ${
                            selectedTone === tone
                              ? "bg-primary text-white font-semibold"
                              : "bg-muted text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {tone}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Spec Card - Status Configured */}
                <div className="md:col-span-5 rounded-2xl border border-primary/30 bg-primary/[0.03] p-4 space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <span className="font-semibold text-xs text-foreground">Configured &amp; Guarded</span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                      Policy Validated
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div className="text-foreground font-semibold">Active Governance Rules</div>
                    <div className="space-y-1 text-[11px] text-muted-foreground">
                      <div className="flex items-center gap-1.5 text-foreground">
                        <Check className="w-3 h-3 text-emerald-500 shrink-0" />
                        <span>Refund cap locked at ${refundLimit}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-foreground">
                        <Check className="w-3 h-3 text-emerald-500 shrink-0" />
                        <span>Voice set to &quot;{selectedTone}&quot;</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-foreground">
                        <Check className="w-3 h-3 text-emerald-500 shrink-0" />
                        <span>Zero-hallucination inventory checks</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-foreground">
                        <Check className="w-3 h-3 text-emerald-500 shrink-0" />
                        <span>WhatsApp webhook authenticated</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveStep(2)}
                      className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-hover transition-colors shadow-sm cursor-pointer"
                    >
                      <span>Proceed to Step 3: Test Sandbox</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── STEP 3: TEST (SANDBOX) ── */}
            {activeStep === 2 && (
              <motion.div
                key="step-test"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start"
              >
                {/* Left: Interactive Sandbox Simulator */}
                <div className="md:col-span-7 space-y-4 text-xs font-sans">
                  <div>
                    <h3 className="font-semibold text-sm text-foreground">Interactive Sandbox Simulation</h3>
                    <p className="text-muted-foreground text-xs">
                      Run live scenario tests against simulated tools and verify execution traces.
                    </p>
                  </div>

                  {/* Scenario buttons */}
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleRunSimulation("order")}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                        testScenario === "order"
                          ? "bg-primary text-white border-primary shadow-xs"
                          : "bg-card text-foreground border-border hover:bg-muted"
                      }`}
                    >
                      1. Check Order #125645
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRunSimulation("return")}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                        testScenario === "return"
                          ? "bg-primary text-white border-primary shadow-xs"
                          : "bg-card text-foreground border-border hover:bg-muted"
                      }`}
                    >
                      2. Return Request ($45 item)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRunSimulation("urgent")}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                        testScenario === "urgent"
                          ? "bg-primary text-white border-primary shadow-xs"
                          : "bg-card text-foreground border-border hover:bg-muted"
                      }`}
                    >
                      3. Escalation ($120 claim)
                    </button>
                  </div>

                  {/* Simulated Terminal / Chat Window */}
                  <div className="rounded-2xl border border-border bg-[#0B0F19] text-white p-4 space-y-3 font-mono text-[11px]">
                    <div className="flex items-center justify-between pb-2 border-b border-white/10 text-white/50 text-[10px]">
                      <span>SANDBOX_RUNTIME_V2</span>
                      <span className="text-emerald-400">LATENCY: 142MS • PASS</span>
                    </div>

                    {testScenario === "order" && (
                      <div className="space-y-2">
                        <div className="text-blue-300">
                          &gt; Customer: &quot;Where is my order #125645?&quot;
                        </div>
                        <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-amber-300 text-[10.5px]">
                          [TOOL] shopify.orders.find(&quot;125645&quot;) → Status: In Transit with DHL Express (ETA 2:30 PM)
                        </div>
                        <div className="text-emerald-300 leading-relaxed font-sans text-xs">
                          Assistant: &quot;Hi Sarah! Order #125645 is out for delivery with DHL today and estimated to arrive by 2:30 PM. Would you like the live tracking link?&quot;
                        </div>
                      </div>
                    )}

                    {testScenario === "return" && (
                      <div className="space-y-2">
                        <div className="text-blue-300">
                          &gt; Customer: &quot;I want to return the $45 linen shirt, it was too large.&quot;
                        </div>
                        <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-emerald-300 text-[10.5px]">
                          [POLICY] $45.00 is below the ${refundLimit}.00 auto-approval threshold. Auto-issuing prepaid return label.
                        </div>
                        <div className="text-emerald-300 leading-relaxed font-sans text-xs">
                          Assistant: &quot;I can help you return that right away! Since your shirt is unworn, I&apos;ve generated a prepaid return label sent to your email. Drop it off at any DHL kiosk.&quot;
                        </div>
                      </div>
                    )}

                    {testScenario === "urgent" && (
                      <div className="space-y-2">
                        <div className="text-blue-300">
                          &gt; Customer: &quot;My $120 cashmere sweater arrived damaged. I want a refund now.&quot;
                        </div>
                        <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-rose-300 text-[10.5px]">
                          [GATE] $120.00 exceeds ${refundLimit}.00 threshold. Triggering human escalation to @support-lead.
                        </div>
                        <div className="text-emerald-300 leading-relaxed font-sans text-xs">
                          Assistant: &quot;I am so sorry about that damage! Because this exceeds our automated threshold, I&apos;ve flagged this directly to our manager team with top priority. A specialist will follow up in 15 minutes.&quot;
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: Validation Checklist */}
                <div className="md:col-span-5 rounded-2xl border border-border bg-muted/20 p-4 space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-foreground">Sandbox Test Suite</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-500">
                      14/14 Passed
                    </span>
                  </div>

                  <div className="space-y-2 text-[11px] text-muted-foreground">
                    <div className="flex items-center gap-1.5 text-foreground">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>Order lookup schema verified</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-foreground">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>Financial policy gates enforced</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-foreground">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>PII and payment redaction verified</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-foreground">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>Average response time: 142ms</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveStep(3)}
                      className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-hover transition-colors shadow-sm cursor-pointer"
                    >
                      <span>Proceed to Step 4: Publish</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── STEP 4: PUBLISH ── */}
            {activeStep === 3 && (
              <motion.div
                key="step-publish"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start"
              >
                {/* Left: Deployment Options */}
                <div className="md:col-span-7 space-y-4 text-xs font-sans">
                  <div>
                    <h3 className="font-semibold text-sm text-foreground">Publish &amp; Deploy</h3>
                    <p className="text-muted-foreground text-xs">
                      Choose whether this employee is private to your company or published to the marketplace.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setDeployTarget("private")}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        deployTarget === "private"
                          ? "border-primary bg-primary/[0.04] ring-1 ring-primary/20"
                          : "border-border bg-card hover:bg-muted/40"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Lock className="w-4 h-4 text-primary" />
                        <span className="text-[10px] font-mono uppercase text-muted-foreground">Internal</span>
                      </div>
                      <div className="font-semibold text-xs text-foreground">Private Workspace</div>
                      <p className="text-[10.5px] text-muted-foreground mt-1">
                        Locked to your organization. Zero public access or directory listing.
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeployTarget("marketplace")}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        deployTarget === "marketplace"
                          ? "border-primary bg-primary/[0.04] ring-1 ring-primary/20"
                          : "border-border bg-card hover:bg-muted/40"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Globe className="w-4 h-4 text-primary" />
                        <span className="text-[10px] font-mono uppercase text-emerald-500 font-bold">Earn 70%</span>
                      </div>
                      <div className="font-semibold text-xs text-foreground">Fless Marketplace</div>
                      <p className="text-[10.5px] text-muted-foreground mt-1">
                        Listed to 4,000+ businesses worldwide with automated recurring payouts.
                      </p>
                    </button>
                  </div>

                  {/* API specs */}
                  <div className="p-3.5 rounded-xl border border-border bg-muted/20 space-y-2 font-mono text-[11px]">
                    <div className="flex items-center justify-between text-muted-foreground text-[10.5px]">
                      <span>RELEASE VERSION</span>
                      <span className="text-foreground font-bold">v1.0.0-PROD</span>
                    </div>
                    <div className="p-2 rounded-lg bg-card border border-border text-foreground break-all">
                      POST https://api.getfless.com/v1/workforce/cs_892a/chat
                    </div>
                  </div>
                </div>

                {/* Right: Production Deployment Card */}
                <div className="md:col-span-5 rounded-2xl border border-border bg-muted/20 p-4 space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-foreground">Production Deployment</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                      Ready to Launch
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div className="text-foreground font-semibold">Deployment Summary</div>
                    <p className="text-[11px] text-muted-foreground">
                      Your Customer Support Assistant is fully verified and packaged for production runtime.
                    </p>
                    <div className="pt-2 text-[10.5px] text-muted-foreground space-y-1">
                      <div>Target: <strong>{deployTarget === "marketplace" ? "Fless Public Marketplace" : "Private Workspace"}</strong></div>
                      <div>SLA: <strong>99.99% Uptime Guarantee</strong></div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveStep(4)}
                      className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-hover transition-colors shadow-sm cursor-pointer"
                    >
                      <span>Proceed to Step 5: Earn</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── STEP 5: EARN (BUILDER REVENUE) ── */}
            {activeStep === 4 && (
              <motion.div
                key="step-earn"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start"
              >
                {/* Left: Earnings Controls */}
                <div className="md:col-span-7 space-y-4 text-xs font-sans">
                  <div>
                    <h3 className="font-semibold text-sm text-foreground">Creator Revenue &amp; Royalty Engine</h3>
                    <p className="text-muted-foreground text-xs">
                      Builders receive 70% of all client subscription revenue automatically every month.
                    </p>
                  </div>

                  {/* Slider */}
                  <div className="space-y-2 p-4 rounded-xl border border-border bg-card">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-foreground">Simulate Active Clients</span>
                      <span className="font-mono text-primary font-bold text-sm">{subscribers} businesses</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={60}
                      value={subscribers}
                      onChange={(e) => setSubscribers(Number(e.target.value))}
                      className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
                      <span>1 client</span>
                      <span>20</span>
                      <span>40</span>
                      <span>60 clients</span>
                    </div>
                  </div>

                  {/* Pricing Tier */}
                  <div className="grid grid-cols-3 gap-2">
                    {[199, 499, 999].map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setSeatPrice(p)}
                        className={`py-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                          seatPrice === p
                            ? "border-primary bg-primary text-white shadow-xs"
                            : "border-border bg-card text-foreground hover:bg-muted"
                        }`}
                      >
                        ${p}/month
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right: Net Earnings Card */}
                <div className="md:col-span-5 rounded-2xl border border-primary/30 bg-primary/[0.04] p-4 space-y-3.5">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-muted-foreground">Your 70% Monthly Payout</span>
                    <div className="text-3xl font-display font-bold text-foreground mt-0.5">
                      ${builderTakeHome.toLocaleString()}
                      <span className="text-xs font-normal text-muted-foreground"> /mo</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-1">
                      ${(builderTakeHome * 12).toLocaleString()} projected annual revenue.
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-border text-[11px]">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Gross Volume:</span>
                      <span className="font-mono font-semibold text-foreground">${grossMonthly.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                      <span>Your 70% Royalty:</span>
                      <span className="font-mono">+${builderTakeHome.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Fless 30% Infra:</span>
                      <span className="font-mono">-${flessInfra.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Link
                      href="/start?role=builder"
                      className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-hover transition-colors shadow-sm cursor-pointer"
                    >
                      <span>Start Building with Fless</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
