"use client"

import { useState } from "react"
import { ArrowRight, Check } from "lucide-react"
import { joinWaitlist, WaitlistError, type WaitlistRole } from "@/lib/waitlist"
import { cn } from "@/lib/utils"

const field =
  "w-full h-12 px-4 rounded-xl border border-border bg-background text-foreground text-base sm:text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 placeholder:text-muted-foreground transition-all"

const topics: { label: string; role: WaitlistRole; plan?: string }[] = [
  { label: "Enterprise or Private Cloud", role: "business", plan: "enterprise" },
  { label: "Business plan or SSO", role: "business", plan: "business" },
  { label: "Hosting on our own servers", role: "business", plan: "enterprise" },
  { label: "Building and selling employees", role: "builder" },
  { label: "Investing or accelerators", role: "investor" },
  { label: "Something else", role: "business" },
]

/** Contact form: posts to the Fless waitlist (POST /api/v1/public/waitlist) with source=contact. */
export function ContactForm({ className }: { className?: string }) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [company, setCompany] = useState("")
  const [topic, setTopic] = useState(topics[0].label)
  const [honeypot, setHoneypot] = useState("")
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState("")
  const [done, setDone] = useState(false)

  const valid = name.trim().length > 1 && /.+@.+\..+/.test(email.trim())

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!valid || busy) return
    const t = topics.find((x) => x.label === topic) ?? topics[0]
    setBusy(true)
    setError("")
    try {
      await joinWaitlist({
        role: t.role,
        name: name.trim(),
        email: email.trim(),
        company: company.trim() || undefined,
        interests: [topic],
        source: "contact",
        plan: t.plan,
        website: honeypot,
      })
      setDone(true)
    } catch (err) {
      setError(err instanceof WaitlistError ? err.message : "We couldn’t send that just now. Please try again.")
    } finally {
      setBusy(false)
    }
  }

  if (done) {
    return (
      <div className={cn("rounded-2xl border border-border/70 p-6 flex gap-3 items-start", className)}>
        <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0">
          <Check className="w-4 h-4" />
        </span>
        <p className="text-[15px] leading-relaxed">
          Thanks, {name.split(" ")[0]}. We’ll reply to <strong>{email}</strong> with a time to talk.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className={cn("space-y-4", className)}>
      <div aria-hidden className="absolute -left-[9999px] w-px h-px overflow-hidden">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input aria-label="Full name" required value={name} onChange={(e) => setName(e.target.value)} className={field} placeholder="Full name" autoComplete="name" />
        <input aria-label="Work email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={field} placeholder="Work email" autoComplete="email" />
        <input aria-label="Company" value={company} onChange={(e) => setCompany(e.target.value)} className={field} placeholder="Company (optional)" autoComplete="organization" />
        <select aria-label="Topic" value={topic} onChange={(e) => setTopic(e.target.value)} className={field}>
          {topics.map((t) => (
            <option key={t.label} value={t.label}>{t.label}</option>
          ))}
        </select>
      </div>
      {error ? <p role="alert" className="text-sm text-destructive">{error}</p> : null}
      <button
        type="submit"
        disabled={!valid || busy}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 text-sm font-medium text-primary-foreground shadow-sm shadow-primary/25 hover:bg-primary-hover disabled:opacity-40"
      >
        {busy ? "Sending…" : "Request a call"}
        {!busy && <ArrowRight className="w-4 h-4" />}
      </button>
    </form>
  )
}
