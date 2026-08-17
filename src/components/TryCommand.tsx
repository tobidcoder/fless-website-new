"use client"

import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const defaults = [
  "Draft next week’s campaign for the London launch.",
  "Cover after-hours calls in Lagos and Dubai.",
  "Chase invoices over 14 days and code this week’s expenses.",
]

export function TryCommand({
  prompts = defaults,
  desk = "command",
  reply,
}: {
  prompts?: string[]
  desk?: string
  reply?: (prompt: string) => string
}) {
  const [value, setValue] = useState("")
  const [sent, setSent] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const answer = useMemo(() => {
    if (!sent) return ""
    if (reply) return reply(sent)
    return "Brief locked. Work is queued on the desk — you’ll review before anything goes live."
  }, [sent, reply])

  const run = (prompt: string) => {
    const text = prompt.trim()
    if (!text) return
    setBusy(true)
    setSent(null)
    window.setTimeout(() => {
      setSent(text)
      setBusy(false)
    }, 520)
  }

  return (
    <div className="rounded-2xl border border-border/70 bg-background overflow-hidden">
      <div className="px-4 py-3 border-b border-border/60 flex items-center justify-between">
        <span className="text-[12px] font-medium text-muted-foreground">Assign work · try it</span>
        <span className="text-[11px] text-emerald-600 font-medium">Live demo</span>
      </div>
      <div className="p-4 md:p-5">
        <div className="flex flex-wrap gap-2 mb-4">
          {prompts.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => {
                setValue(p)
                run(p)
              }}
              className="text-[12px] px-3 py-1.5 rounded-full border border-border hover:bg-secondary/70 text-left leading-snug"
            >
              {p}
            </button>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            run(value)
          }}
          className="flex gap-2"
        >
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Tell Fless what to do…"
            className="flex-1 h-11 px-4 rounded-full border border-border bg-background text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
          />
          <button
            type="submit"
            className="h-11 px-5 rounded-full bg-primary text-primary-foreground text-sm font-medium shrink-0 hover:bg-primary-hover shadow-sm shadow-primary/25"
          >
            Run
          </button>
        </form>

        <div className="mt-5 min-h-[88px]">
          <AnimatePresence mode="wait">
            {busy && (
              <motion.p
                key="busy"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm text-muted-foreground"
              >
                Fless is on it…
              </motion.p>
            )}
            {sent && !busy && (
              <motion.div
                key={sent}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                <div>
                  <div className="text-[11px] font-semibold mb-1">You</div>
                  <p className="text-sm text-muted-foreground">{sent}</p>
                </div>
                <div>
                  <div className="text-[11px] font-semibold mb-1">Fless</div>
                  <p className="text-sm text-foreground leading-relaxed">{answer}</p>
                </div>
                <Link
                  href={`/start?source=try&desk=${encodeURIComponent(desk)}`}
                  className="inline-flex h-10 items-center gap-1.5 rounded-full bg-primary px-4 text-[13px] font-medium text-primary-foreground hover:bg-primary-hover"
                >
                  Keep this running — register
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
