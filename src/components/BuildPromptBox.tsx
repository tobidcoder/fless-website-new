"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { studioUrl } from "@/lib/env"

const examples = [
  "Answer WhatsApp messages for my salon and book appointments in Google Calendar",
  "Write three LinkedIn posts a week about our new products and ask me before posting",
  "Follow up with every new lead in our CRM within an hour",
  "Remind customers about unpaid invoices, politely, and tell me who hasn’t paid after two weeks",
]

/** Sends the description to Employee Studio in the dashboard: {APP_URL}/#/studio?prompt=… */
export function BuildPromptBox() {
  const [prompt, setPrompt] = useState("")
  const clean = prompt.trim()

  const go = (e: React.FormEvent) => {
    e.preventDefault()
    if (clean.length < 3) return
    window.location.assign(studioUrl(clean.slice(0, 2000)))
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={go} className="rounded-2xl border border-border bg-background shadow-sm focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/25 transition-all">
        <label htmlFor="build-prompt" className="sr-only">Describe the job</label>
        <textarea
          id="build-prompt"
          rows={4}
          maxLength={2000}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) go(e)
          }}
          placeholder="Describe the job, like you’d brief a new hire…"
          className="w-full resize-none bg-transparent px-5 pt-4 pb-2 text-base outline-none placeholder:text-muted-foreground"
        />
        <div className="flex items-center justify-between gap-3 px-3 pb-3">
          <span className="pl-2 text-[12px] text-muted-foreground">No code. Studio will ask a few questions.</span>
          <button
            type="submit"
            disabled={clean.length < 3}
            className="inline-flex h-10 items-center gap-2 rounded-full bg-primary px-5 text-[14px] font-medium text-primary-foreground hover:bg-primary-hover disabled:opacity-40 shrink-0"
          >
            Build it <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
      <div className="mt-5 flex flex-wrap justify-center gap-2">
        {examples.map((ex) => (
          <button
            key={ex}
            type="button"
            onClick={() => setPrompt(ex)}
            className="rounded-full border border-border px-3.5 py-1.5 text-[12px] text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors text-left"
          >
            {ex}
          </button>
        ))}
      </div>
    </div>
  )
}
