"use client"

import { useState, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { StayInForm } from "@/components/StayInForm"
import {
  Calendar,
  Users,
  CheckCircle2,
  MessageSquare,
  X,
  ChevronRight,
  MousePointer,
} from "lucide-react"

interface Hotspot {
  id: string
  label: string
  role: string
  coords: { x: number; y: number } // percentages on the screenshot
  kicker: string
  title: string
  description: string
  tag: string
  tagColor: string
}

const HOTSPOTS: Hotspot[] = [
  {
    id: "maya-manager",
    label: "Maya · Manager",
    role: "Department Lead",
    coords: { x: 14.5, y: 24.5 },
    kicker: "Autonomous Leadership",
    title: "Marketing Manager Maya",
    description:
      "Directs 6 specialists across Content, SEO, Social, Design, Email, and Ads. Allocates quarterly targets and reviews output automatically.",
    tag: "Active Manager",
    tagColor: "bg-amber-500/10 text-amber-700 border-amber-500/20",
  },
  {
    id: "zoe-social",
    label: "Zoe · Social Media",
    role: "AI Employee",
    coords: { x: 32, y: 12.5 },
    kicker: "Active Specialist",
    title: "Zoe (Social Media Manager)",
    description:
      "Handles brand tone of voice, viral copywriting, post scheduling, and engagement tracking across 4 networks in under 60 seconds.",
    tag: "Online · Fast Turnaround",
    tagColor: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20",
  },
  {
    id: "cards-multi-platform",
    label: "4 Platform Drafts",
    role: "Generated Output",
    coords: { x: 58, y: 56 },
    kicker: "Multi-Channel Sync",
    title: "Tailored Multi-Network Assets",
    description:
      "Simultaneously formats copy, aspect ratios, and visual hooks for LinkedIn, Facebook, X, and Instagram. Ready for one-click approval.",
    tag: "LinkedIn · X · IG · FB",
    tagColor: "bg-primary/10 text-primary border-primary/20",
  },
  {
    id: "prompts-bar",
    label: "Quick Prompts",
    role: "Instant Delegation",
    coords: { x: 55, y: 86 },
    kicker: "One-Click Delegation",
    title: "Pre-Built Prompt Chips",
    description:
      "Trigger thread drafting, top-performing post audits, or campaign schedules with a single tap. Zero prompt engineering required.",
    tag: "One-Click Commands",
    tagColor: "bg-blue-500/10 text-blue-700 border-blue-500/20",
  },
]

const floatingCards = [
  {
    id: "scheduled-queue",
    icon: Calendar,
    kicker: "Multi-Platform Queue",
    title: "4 Campaigns Scheduled",
    meta: "LinkedIn · Facebook · X · Instagram",
    badge: "Mon–Thu · 09:00 AM",
    badgeColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
    className: "top-[8%] right-2 sm:-right-4 lg:-right-6",
    delay: 0,
  },
  {
    id: "autonomous-mesh",
    icon: Users,
    kicker: "Autonomous Team",
    title: "7 Marketing Employees",
    meta: "Maya directing Zoe, Leo, Felix & Liam",
    badge: "Brief turnaround: 60s",
    badgeColor: "text-blue-700 bg-blue-50 border-blue-200",
    className: "top-[32%] -left-2 sm:-left-4 lg:-left-6",
    delay: 0.3,
  },
  {
    id: "tailored-hooks",
    icon: CheckCircle2,
    kicker: "Creative Execution",
    title: "Visuals + Hooks Synced",
    meta: "Platform-native formats & tags",
    badge: "Ready to Publish",
    badgeColor: "text-violet-700 bg-violet-50 border-violet-200",
    className: "bottom-[14%] right-2 sm:-right-4 lg:-right-6",
    delay: 0.6,
  },
]

const SIMULATED_PROMPTS = [
  {
    text: "Schedule next week's LinkedIn and X posts",
    reply: "Queued 4 posts for Monday through Thursday at optimal peak engagement hours (09:00 AM EST).",
  },
  {
    text: "Write an engaging X thread breaking down our customer case study",
    reply: "Drafted 7-tweet sequence highlighting 3.8x ROI, hook variations, and CTA card in Posts tab.",
  },
  {
    text: "Show top-performing posts from last month",
    reply: "Loaded performance audit: Top post gained 48,200 impressions with 4.2% engagement rate.",
  },
]

export function IntroFilm() {
  const reduce = useReducedMotion()
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null)
  const [simulatedPrompt, setSimulatedPrompt] = useState<{ text: string; reply: string } | null>(null)
  const [showBetaForm, setShowBetaForm] = useState(false)

  // Prevent right-click / image saving
  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    return false
  }, [])

  const handleDragStart = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    return false
  }, [])

  return (
    <div className="relative sm:px-4 lg:px-6">
      {/* Ambient background glow */}
      <div
        aria-hidden
        className="absolute left-1/2 top-[18%] -z-10 h-[70%] w-[78%] -translate-x-1/2 rounded-full bg-primary/20 blur-[80px]"
      />

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <figure
          className="intro-film relative overflow-visible select-none"
          onContextMenu={handleContextMenu}
          onDragStart={handleDragStart}
        >
          {/* Main frame window container */}
          <div className="overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-[0_24px_80px_-28px_rgba(15,23,42,0.35)] ring-1 ring-black/[0.04]">
            {/* Window titlebar */}
            <div className="flex h-11 items-center justify-between border-b border-black/[0.06] bg-[#f8fafc] px-4 select-none">
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex items-center gap-[6px] shrink-0" aria-hidden>
                  <span className="h-[10px] w-[10px] rounded-full bg-[#ff5f57]" />
                  <span className="h-[10px] w-[10px] rounded-full bg-[#febc2e]" />
                  <span className="h-[10px] w-[10px] rounded-full bg-[#28c840]" />
                </div>
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-[5px] bg-primary text-[9px] font-bold text-white">
                  F
                </span>
                <span className="text-[13px] font-semibold tracking-tight text-slate-900">Fless</span>
                <span className="hidden sm:inline truncate text-[12px] text-slate-400">app.getfless.com</span>
              </div>

              {/* Status and interactive hint */}
              <div className="flex items-center gap-3">
                <span className="hidden md:inline-flex items-center gap-1.5 text-[11px] text-slate-500 font-mono">
                  <MousePointer className="w-3 h-3 text-primary animate-bounce" />
                  Hover or tap hotspots to inspect
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-slate-600 ring-1 ring-black/[0.06]">
                  <span className="relative flex h-1.5 w-1.5">
                    {!reduce && (
                      <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70 animate-ping" />
                    )}
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </span>
                  Live Command Center
                </span>
              </div>
            </div>

            {/* SCREENSHOT CONTAINER WITH INTERACTIVE HOTSPOTS & ANTI-DOWNLOAD SHIELD */}
            <div
              className="relative bg-[#f8fafc] select-none"
              onContextMenu={handleContextMenu}
              onDragStart={handleDragStart}
            >
              {/* High-Resolution Screenshot (unclickable & undownloadable) */}
              <Image
                src="/intro-image.png"
                alt="Fless command center with sidebar, departments, and live activity"
                width={2879}
                height={1551}
                priority
                quality={95}
                draggable={false}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 95vw, 1240px"
                className="no-save-image w-full h-auto block select-none pointer-events-none"
                onContextMenu={handleContextMenu}
                onDragStart={handleDragStart}
              />

              {/* TRANSPARENT PROTECTIVE SHIELD: Blocks browser right click, drag-drop and save dialogs */}
              <div
                className="absolute inset-0 select-none pointer-events-auto z-[10]"
                onContextMenu={handleContextMenu}
                onDragStart={handleDragStart}
                aria-hidden
              />

              {/* INTERACTIVE HOTSPOT PINS ON THE SCREENSHOT */}
              <div className="absolute inset-0 z-[16] pointer-events-none">
                {HOTSPOTS.map((spot) => {
                  const isActive = activeHotspot === spot.id
                  return (
                    <div
                      key={spot.id}
                      style={{ left: `${spot.coords.x}%`, top: `${spot.coords.y}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                    >
                      {/* Hotspot Trigger Beacon */}
                      <button
                        type="button"
                        onClick={() => setActiveHotspot(isActive ? null : spot.id)}
                        onMouseEnter={() => setActiveHotspot(spot.id)}
                        className="group relative flex items-center justify-center p-2 focus:outline-none"
                        aria-label={`Inspect ${spot.label}`}
                      >
                        {/* Radar Ping Pulse */}
                        <span className="absolute h-8 w-8 rounded-full bg-primary/25 animate-ping opacity-75" />
                        <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white shadow-lg ring-2 ring-white transition-transform group-hover:scale-110">
                          <span className="h-2 w-2 rounded-full bg-white" />
                        </span>

                        {/* Miniature floating label */}
                        <span className="absolute left-7 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center whitespace-nowrap rounded-md bg-slate-900/90 backdrop-blur-sm px-2 py-0.5 text-[10px] font-medium text-white shadow-sm transition-opacity opacity-0 group-hover:opacity-100">
                          {spot.label}
                        </span>
                      </button>

                      {/* Expanded Hotspot Inspector Popover */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.92, y: 6 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.94, y: 4 }}
                            transition={{ duration: 0.18, ease: "easeOut" }}
                            className="absolute left-1/2 top-8 -translate-x-1/2 z-30 w-72 sm:w-80 rounded-xl border border-black/10 bg-white/95 p-4 shadow-[0_20px_50px_-12px_rgba(15,23,42,0.35)] backdrop-blur-md"
                            onMouseLeave={() => setActiveHotspot(null)}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <span className="text-[10px] font-mono uppercase tracking-wider text-primary font-semibold">
                                {spot.kicker}
                              </span>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setActiveHotspot(null)
                                }}
                                className="text-slate-400 hover:text-slate-600 p-0.5"
                                aria-label="Close"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <h4 className="mt-1 text-[14px] font-semibold text-slate-900 leading-snug">
                              {spot.title}
                            </h4>
                            <p className="mt-1 text-[12px] text-slate-600 leading-relaxed">
                              {spot.description}
                            </p>

                            <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2.5">
                              <span
                                className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-medium ${spot.tagColor}`}
                              >
                                {spot.tag}
                              </span>
                              <span className="text-[11px] font-mono text-slate-400">
                                {spot.role}
                              </span>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </div>

              {/* SCREENSHOT-SPECIFIC FLOATING BADGES (Desktop) */}
              <div className="pointer-events-none absolute inset-0 z-[15] hidden select-none md:block" aria-hidden>
                {floatingCards.map((card, i) => {
                  const Icon = card.icon
                  return (
                    <motion.div
                      key={card.id}
                      className={`intro-film-overlay absolute max-w-[270px] ${card.className} pointer-events-auto`}
                      animate={reduce ? undefined : { y: [0, i % 2 === 0 ? -6 : 6, 0] }}
                      transition={
                        reduce
                          ? undefined
                          : { duration: 6 + i * 1.5, repeat: Infinity, ease: "easeInOut", delay: card.delay }
                      }
                    >
                      <div className="rounded-xl border border-black/[0.08] bg-white/95 p-3.5 shadow-[0_16px_36px_-12px_rgba(15,23,42,0.25)] backdrop-blur-md transition-shadow hover:shadow-xl">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">
                            {card.kicker}
                          </p>
                          <Icon className="w-3.5 h-3.5 text-primary/70" />
                        </div>
                        <p className="mt-1 text-[13px] font-semibold text-slate-900">{card.title}</p>
                        <p className="mt-0.5 text-[11px] text-slate-500">{card.meta}</p>
                        <div className="mt-2.5 pt-2 border-t border-black/[0.04]">
                          <span
                            className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[10px] font-medium ${card.badgeColor}`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-current" />
                            {card.badge}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* SIMULATED PROMPT LIVE RESPONSE TOAST */}
              <AnimatePresence>
                {simulatedPrompt && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute inset-x-4 top-4 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 z-[25] max-w-xl w-full"
                  >
                    <div className="rounded-xl border border-primary/20 bg-slate-900/95 p-3.5 text-white shadow-2xl backdrop-blur-md">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold">
                            Z
                          </span>
                          <span className="text-[12px] font-medium text-white/90">
                            Zoe received prompt:
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setSimulatedPrompt(null)}
                          className="text-white/50 hover:text-white"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="mt-1 text-[12px] text-primary-foreground font-mono bg-white/10 px-2.5 py-1 rounded">
                        &quot;{simulatedPrompt.text}&quot;
                      </p>
                      <p className="mt-2 text-[12px] text-emerald-400 font-medium">
                        ✓ {simulatedPrompt.reply}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* BOTTOM INTERACTIVE WORKFLOW BAR: Test Zoe's Trigger Prompts */}
              <div className="border-t border-black/[0.06] bg-slate-50/90 backdrop-blur-sm px-4 py-3 sm:px-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <MessageSquare className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-[12px] font-medium text-slate-700 truncate">
                      Try clicking Zoe&apos;s prompts from the screenshot:
                    </span>
                  </div>

                  {/* Interactive chips */}
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    {SIMULATED_PROMPTS.map((prompt) => (
                      <button
                        key={prompt.text}
                        type="button"
                        onClick={() => setSimulatedPrompt(prompt)}
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-700 shadow-sm transition hover:border-primary/40 hover:bg-primary/5 hover:text-primary active:scale-95"
                      >
                        <ChevronRight className="w-3 h-3 text-slate-400" />
                        <span className="max-w-[210px] truncate">{prompt.text}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* CORNER BETA ACCESS DRAWER / TOGGLE (Unobtrusive) */}
              <div className="absolute right-3 bottom-14 z-20 hidden lg:block">
                {showBetaForm ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-sm rounded-2xl border border-black/[0.08] bg-white/95 p-4 shadow-[0_16px_40px_-16px_rgba(15,23,42,0.35)] backdrop-blur-md"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
                        Early Access
                      </p>
                      <button
                        type="button"
                        onClick={() => setShowBetaForm(false)}
                        className="text-slate-400 hover:text-slate-600 p-0.5"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="mb-3 text-[12px] text-slate-600">
                      Deploy autonomous marketing employees in under 2 minutes.
                    </p>
                    <StayInForm source="intro" />
                  </motion.div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowBetaForm(true)}
                    className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white/95 px-3 py-2 text-[12px] font-medium text-slate-800 shadow-lg backdrop-blur-md hover:bg-slate-50 transition"
                  >
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    <span>Join Early Beta</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </figure>
      </motion.div>
    </div>
  )
}
