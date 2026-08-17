"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

export type SnippetRow = {
  title: string
  line: string
  time?: string
}

function LiveDot({ className = "" }: { className?: string }) {
  return (
    <span className={`relative flex h-1.5 w-1.5 ${className}`}>
      <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70 animate-ping" />
      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
    </span>
  )
}

export function FlessChrome({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`absolute top-0 inset-x-0 z-10 flex items-center justify-between bg-white/93 dark:bg-card/92 backdrop-blur-md border-b border-black/[0.06] dark:border-white/10 ${
        compact ? "h-8 px-3" : "h-9 px-3.5"
      }`}
    >
      <div className="flex items-center gap-2.5">
        {!compact && (
          <div className="flex items-center gap-[5px]" aria-hidden>
            <span className="w-[7px] h-[7px] rounded-full bg-[#ff5f57]" />
            <span className="w-[7px] h-[7px] rounded-full bg-[#febc2e]" />
            <span className="w-[7px] h-[7px] rounded-full bg-[#28c840]" />
          </div>
        )}
        <span className="flex h-4 w-4 items-center justify-center rounded-[5px] bg-primary text-[8px] font-bold text-white">
          F
        </span>
        <span className="text-[11px] font-semibold tracking-tight text-neutral-900 dark:text-white">Fless</span>
      </div>
      <span className="flex items-center gap-1.5 text-[10px] font-medium text-neutral-500">
        <LiveDot />
        Live
      </span>
    </div>
  )
}

export function DashboardSnippet({
  label,
  rows,
  compact = false,
}: {
  label: string
  rows: SnippetRow[]
  compact?: boolean
}) {
  const shown = rows.slice(0, compact ? 2 : 3)
  return (
    <div className="rounded-[12px] bg-white/[0.97] dark:bg-card/96 backdrop-blur-md border border-white/30 dark:border-white/10 shadow-[0_20px_44px_-18px_rgba(0,0,0,0.5)] overflow-hidden">
      <div className="px-3.5 py-2 flex items-center justify-between border-b border-black/[0.05] dark:border-white/10">
        <span className="text-[11px] font-semibold tracking-tight text-neutral-900 dark:text-white">{label}</span>
        <span className="flex items-center gap-1.5 text-[10px] font-medium text-emerald-600">
          <LiveDot />
          Live
        </span>
      </div>
      <div className="divide-y divide-black/[0.05] dark:divide-white/10">
        {shown.map((row, i) => (
          <motion.div
            key={`${row.title}-${row.line}`}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12 + i * 0.08, duration: 0.35 }}
            className="px-3.5 py-2"
          >
            <div className="flex justify-between gap-3">
              <span className="text-[11px] font-medium text-neutral-900 dark:text-white">{row.title}</span>
              {row.time ? (
                <span className="text-[10px] tabular-nums text-neutral-400 shrink-0">{row.time}</span>
              ) : null}
            </div>
            <p className="text-[11px] text-neutral-500 leading-snug mt-[2px]">{row.line}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export function BrandedStage({
  image,
  alt,
  label,
  rows,
  chrome = true,
  compact = false,
  children,
  className = "",
}: {
  image: string
  alt: string
  label?: string
  rows?: SnippetRow[]
  chrome?: boolean
  compact?: boolean
  children?: ReactNode
  className?: string
}) {
  const snippet = children ?? (label && rows && rows.length > 0 ? (
    <DashboardSnippet label={label} rows={rows} compact={compact} />
  ) : null)

  return (
    <div className={`relative overflow-hidden bg-neutral-200 ring-1 ring-inset ring-black/[0.08] dark:ring-white/[0.08] ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <motion.img
        src={image}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ scale: 1.08 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/[0.08] to-black/25" />
      {chrome ? <FlessChrome compact={compact} /> : null}
      {snippet ? (
        <div
          className={
            compact || children
              ? "absolute left-3 right-3 bottom-3 sm:left-4 sm:right-4 sm:bottom-4 z-10"
              : "absolute left-4 right-4 bottom-4 md:left-auto md:right-5 md:bottom-5 md:w-[292px] z-10"
          }
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.28, duration: 0.45 }}
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
            >
              {snippet}
            </motion.div>
          </motion.div>
        </div>
      ) : null}
    </div>
  )
}

export function PhotoTile({
  image,
  alt,
  title,
  subtitle,
  live,
  className = "",
}: {
  image: string
  alt: string
  title?: string
  subtitle?: string
  live?: string
  className?: string
}) {
  return (
    <div className={`relative overflow-hidden bg-neutral-200 ring-1 ring-inset ring-black/[0.08] dark:ring-white/[0.08] ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image} alt={alt} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/25" />
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
        <span className="text-[10px] font-semibold tracking-tight text-white/90">Fless</span>
        {live ? (
          <span className="flex items-center gap-1.5 text-[10px] font-medium text-white/85">
            <LiveDot />
            {live}
          </span>
        ) : (
          <span className="flex items-center gap-1.5 text-[10px] font-medium text-white/70">
            <LiveDot />
            Live
          </span>
        )}
      </div>
      {(title || subtitle) && (
        <div className="absolute inset-x-0 bottom-0 p-3.5 md:p-4 z-10">
          {title ? <div className="text-white font-semibold tracking-tight leading-tight">{title}</div> : null}
          {subtitle ? <p className="text-white/70 text-[12px] mt-1 leading-snug">{subtitle}</p> : null}
        </div>
      )}
    </div>
  )
}
