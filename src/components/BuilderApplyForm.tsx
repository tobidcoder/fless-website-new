"use client"

import { useState } from "react"
import { ArrowRight, Check } from "lucide-react"
import { joinWaitlist, WaitlistError } from "@/lib/waitlist"
import { countries } from "@/lib/countries"
import { cn } from "@/lib/utils"

const field =
  "w-full h-12 px-4 rounded-xl border border-border bg-background text-foreground text-base sm:text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 placeholder:text-muted-foreground transition-all"

const categories = [
  "Marketing",
  "Sales",
  "Customer support",
  "Voice and calls",
  "Recruitment",
  "Operations",
  "Finance",
  "A specific industry",
]
const backgrounds = ["I run or work in a business", "Consultant or agency", "Developer", "Domain expert", "Other"]

/** Builder application: posts role=builder to the Fless waitlist. */
export function BuilderApplyForm({ className }: { className?: string }) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [country, setCountry] = useState("")
  const [category, setCategory] = useState(categories[0])
  const [background, setBackground] = useState("")
  const [honeypot, setHoneypot] = useState("")
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState("")
  const [done, setDone] = useState(false)

  const valid = name.trim().length > 1 && /.+@.+\..+/.test(email.trim())

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!valid || busy) return
    setBusy(true)
    setError("")
    try {
      await joinWaitlist({
        role: "builder",
        name: name.trim(),
        email: email.trim(),
        market: country || undefined,
        interests: [category, background ? `Background: ${background}` : ""].filter(Boolean),
        source: "builders",
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
          Thanks for applying. We’ll email <strong>{email}</strong> when your Studio access is ready.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className={cn("space-y-4", className)}>
      <div aria-hidden className="absolute -left-[9999px] w-px h-px overflow-hidden">
        <label htmlFor="builder-website">Website</label>
        <input id="builder-website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input aria-label="Full name" required value={name} onChange={(e) => setName(e.target.value)} className={field} placeholder="Full name" autoComplete="name" />
        <input aria-label="Email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={field} placeholder="Email" autoComplete="email" />
        <select aria-label="Country" value={country} onChange={(e) => setCountry(e.target.value)} className={field}>
          <option value="">Country (optional)</option>
          {countries.map((c) => (
            <option key={c.iso} value={c.name}>{c.name}</option>
          ))}
        </select>
        <select aria-label="Your background" value={background} onChange={(e) => setBackground(e.target.value)} className={field}>
          <option value="">Your background (optional)</option>
          {backgrounds.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
        <label className="sm:col-span-2 block">
          <span className="block text-[13px] font-medium mb-2">What would you build first?</span>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className={field}>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </label>
      </div>
      {error ? <p role="alert" className="text-sm text-destructive">{error}</p> : null}
      <button
        type="submit"
        disabled={!valid || busy}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 text-sm font-medium text-primary-foreground shadow-sm shadow-primary/25 hover:bg-primary-hover disabled:opacity-40"
      >
        {busy ? "Sending…" : "Apply as a builder"}
        {!busy && <ArrowRight className="w-4 h-4" />}
      </button>
    </form>
  )
}
