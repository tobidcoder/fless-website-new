"use client"

import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { departments } from "@/lib/departments"
import { industries } from "@/lib/industries"
import { joinWaitlist, parseRole, WaitlistError, type WaitlistRole } from "@/lib/waitlist"
import {
  countries,
  countryByIso,
  formatInternationalPhone,
  nationalPhoneDigits,
  phonePlaceholder,
} from "@/lib/countries"
import { cn } from "@/lib/utils"

const sizes = ["1–10", "11–50", "51–200", "201–1,000", "1,000+"]
const heardOptions = ["A person I trust", "Search", "LinkedIn", "X / Twitter", "Event", "Other"]
const builderInterests = [
  "Marketing",
  "Sales",
  "Customer support",
  "Voice and calls",
  "Recruitment",
  "Operations",
  "Finance",
  "A specific industry",
]
const builderBackground = ["I run or work in a business", "Consultant or agency", "Developer", "Domain expert", "Other"]
const investorInterests = ["Investing", "Accelerator programme", "Partnership", "Press"]

const field =
  "w-full h-12 px-4 rounded-xl border border-border bg-background text-foreground text-base sm:text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 placeholder:text-muted-foreground transition-all"
const label = "block text-[13px] font-medium mb-2"

const ROLE_COPY: Record<WaitlistRole, { eyebrow: string; title: string; lede: string; cta: string; done: string }> = {
  business: {
    eyebrow: "Private beta",
    title: "Join the Fless beta.",
    lede: "Hire AI employees made by builders, or build your own. Tell us a little about your business and we’ll get you set up.",
    cta: "Join the beta",
    done: "You’re on the list. We’ll be in touch when a seat opens.",
  },
  builder: {
    eyebrow: "Builder programme",
    title: "Apply to build on Fless.",
    lede: "Describe an employee in Studio, test it, and publish it to the marketplace. You keep 70% of what it earns. No code needed.",
    cta: "Apply as a builder",
    done: "Thanks for applying. We’ll email you when your Studio access is ready.",
  },
  investor: {
    eyebrow: "Investors and accelerators",
    title: "Talk to the Fless team.",
    lede: "Leave your details and we’ll send the deck and set up a call.",
    cta: "Request the deck",
    done: "Thanks. We’ll send the deck and suggest a time to talk.",
  },
}

export function StartView() {
  const params = useSearchParams()
  const presetDesk = params.get("department") ?? params.get("desk") ?? params.get("dept") ?? ""
  const source = (params.get("source") ?? "start").slice(0, 80)
  const plan = params.get("plan") ?? ""

  const [role, setRole] = useState<WaitlistRole>(() => parseRole(params.get("role")))
  const [name, setName] = useState("")
  const [email, setEmail] = useState(params.get("email")?.trim() ?? "")
  const [company, setCompany] = useState("")
  const [companySize, setCompanySize] = useState(sizes[1])
  const [marketIso, setMarketIso] = useState("US")
  const [phoneNational, setPhoneNational] = useState("")
  const [industry, setIndustry] = useState("")
  const [interests, setInterests] = useState<string[]>([])
  const [background, setBackground] = useState("")
  const [heard, setHeard] = useState("")
  const [honeypot, setHoneypot] = useState("")
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState("")
  const [done, setDone] = useState(false)

  useEffect(() => {
    const urlEmail = params.get("email")
    if (urlEmail && urlEmail.trim()) setEmail(urlEmail.trim())
    setRole(parseRole(params.get("role")))
    const urlIndustry = params.get("industry")
    if (urlIndustry) {
      const match = industries.find((i) => i.name === urlIndustry || i.id === urlIndustry)
      if (match) setIndustry(match.name)
    }
    const desk = departments.find((d) => d.slug === presetDesk)
    if (desk) setInterests([desk.name])
  }, [params, presetDesk])

  // Switching role starts the interest list fresh, since each role has its own options.
  const switchRole = (next: WaitlistRole) => {
    setRole(next)
    setInterests([])
    setError("")
  }

  const options =
    role === "business" ? departments.map((d) => d.name) : role === "builder" ? builderInterests : investorInterests

  const toggle = (value: string) =>
    setInterests((cur) => (cur.includes(value) ? cur.filter((s) => s !== value) : [...cur, value]))

  const copy = ROLE_COPY[role]
  const phoneDisplay = formatInternationalPhone(marketIso, phoneNational)

  const valid = useMemo(() => {
    const base = name.trim().length > 1 && /.+@.+\..+/.test(email.trim()) && Boolean(countryByIso(marketIso))
    if (role === "business") return base && company.trim().length > 1 && interests.length >= 1
    if (role === "investor") return base && company.trim().length > 1
    return base && interests.length >= 1
  }, [name, email, marketIso, role, company, interests])

  const onMarketChange = (iso: string) => {
    setMarketIso(iso)
    if (phoneNational) setPhoneNational(nationalPhoneDigits(iso, phoneNational))
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!valid || busy) return
    setBusy(true)
    setError("")
    const extra = [
      industry ? `Industry: ${industry}` : "",
      background ? `Background: ${background}` : "",
      heard ? `Heard via: ${heard}` : "",
    ].filter(Boolean)
    try {
      await joinWaitlist({
        role,
        name: name.trim(),
        email: email.trim(),
        company: company.trim() || undefined,
        companySize: role === "business" ? companySize : undefined,
        market: countryByIso(marketIso)?.name ?? marketIso,
        phone: phoneNational ? formatInternationalPhone(marketIso, phoneNational).trim() : undefined,
        interests: [...interests, ...extra].map((i) => i.slice(0, 80)),
        source,
        plan: plan || undefined,
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
      <div className="min-h-screen bg-background flex flex-col font-sans">
        <Header />
        <main className="flex-1 flex items-center">
          <div className="max-w-[560px] mx-auto px-5 sm:px-6 py-28 text-center">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <div className="mx-auto w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mb-6">
                <Check className="w-5 h-5" />
              </div>
              <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary mb-3">{copy.eyebrow}</p>
              <h1 className="text-3xl md:text-4xl font-display font-semibold tracking-tight mb-4">Thank you.</h1>
              <p className="text-muted-foreground leading-relaxed mb-8">
                {copy.done} We’ll write to <span className="text-foreground font-medium">{email}</span>.
              </p>
              <Link href="/" className="text-sm font-medium text-primary hover:text-primary-hover">
                Back to Fless →
              </Link>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Header />
      <main className="flex-1 pt-24 md:pt-28 pb-20">
        <div className="max-w-[760px] mx-auto px-5 sm:px-6">
          <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary mb-3">{copy.eyebrow}</p>
          <h1 className="text-3xl sm:text-4xl font-display font-semibold tracking-tight mb-3">{copy.title}</h1>
          <p className="text-[15px] text-muted-foreground leading-relaxed mb-8 max-w-xl">{copy.lede}</p>

          <div role="radiogroup" aria-label="I am" className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-10">
            {(
              [
                { id: "business", title: "A business", sub: "Hire or build employees" },
                { id: "builder", title: "A builder", sub: "Build and sell employees" },
                { id: "investor", title: "An investor", sub: "Or an accelerator" },
              ] as const
            ).map((o) => (
              <button
                key={o.id}
                type="button"
                role="radio"
                aria-checked={role === o.id}
                onClick={() => switchRole(o.id)}
                className={cn(
                  "text-left rounded-xl border p-3.5 transition-colors",
                  role === o.id ? "border-primary bg-brand-soft" : "border-border hover:bg-secondary/40",
                )}
              >
                <div className="text-sm font-semibold">{o.title}</div>
                <div className="text-[12px] text-muted-foreground mt-0.5">{o.sub}</div>
              </button>
            ))}
          </div>

          <form onSubmit={submit} className="space-y-8">
            {/* Honeypot: hidden from people. */}
            <div aria-hidden className="absolute -left-[9999px] w-px h-px overflow-hidden">
              <label htmlFor="beta-website">Website</label>
              <input id="beta-website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={label} htmlFor="beta-name">Full name</label>
                <input id="beta-name" required value={name} onChange={(e) => setName(e.target.value)} className={field} placeholder="Tobi Lobo" autoComplete="name" />
              </div>
              <div>
                <label className={label} htmlFor="beta-email">{role === "business" ? "Work email" : "Email"}</label>
                <input id="beta-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={field} placeholder="you@company.com" autoComplete="email" />
              </div>
              <div>
                <label className={label} htmlFor="beta-company">
                  {role === "investor" ? "Fund or programme" : "Company"}
                  {role === "builder" && <span className="text-muted-foreground font-normal"> (optional)</span>}
                </label>
                <input
                  id="beta-company"
                  required={role !== "builder"}
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className={field}
                  placeholder={role === "investor" ? "Fund name" : "Acme"}
                  autoComplete="organization"
                />
              </div>
              <div>
                <label className={label} htmlFor="beta-market">Country</label>
                <select id="beta-market" required value={marketIso} onChange={(e) => onMarketChange(e.target.value)} className={field}>
                  {countries.map((c) => (
                    <option key={c.iso} value={c.iso}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={label} htmlFor="beta-phone">
                  Phone <span className="text-muted-foreground font-normal">(optional)</span>
                </label>
                <input
                  id="beta-phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={phoneDisplay}
                  onChange={(e) => setPhoneNational(nationalPhoneDigits(marketIso, e.target.value))}
                  className={field}
                  placeholder={phonePlaceholder(marketIso)}
                />
              </div>
              {role === "business" && (
                <>
                  <div>
                    <label className={label} htmlFor="beta-size">Company size</label>
                    <select id="beta-size" value={companySize} onChange={(e) => setCompanySize(e.target.value)} className={field}>
                      {sizes.map((s) => (
                        <option key={s} value={s}>{s} people</option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className={label} htmlFor="beta-industry">
                      Industry <span className="text-muted-foreground font-normal">(optional)</span>
                    </label>
                    <select id="beta-industry" value={industry} onChange={(e) => setIndustry(e.target.value)} className={field}>
                      <option value="">Select industry</option>
                      {industries.map((item) => (
                        <option key={item.id} value={item.name}>{item.name}</option>
                      ))}
                    </select>
                  </div>
                </>
              )}
              {role === "builder" && (
                <div>
                  <label className={label} htmlFor="beta-background">
                    Your background <span className="text-muted-foreground font-normal">(optional)</span>
                  </label>
                  <select id="beta-background" value={background} onChange={(e) => setBackground(e.target.value)} className={field}>
                    <option value="">Select</option>
                    {builderBackground.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <fieldset>
              <legend className={label}>
                {role === "business"
                  ? "What work do you want help with first?"
                  : role === "builder"
                    ? "What kind of employee would you build?"
                    : "What is this about?"}
              </legend>
              <p className="text-[12px] text-muted-foreground -mt-1 mb-3">
                {role === "investor" ? "Optional. Pick any that apply." : "Pick at least one."}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {options.map((o) => {
                  const on = interests.includes(o)
                  return (
                    <button
                      key={o}
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggle(o)}
                      className={cn(
                        "text-left rounded-xl border p-3.5 transition-colors flex items-center justify-between gap-2",
                        on ? "border-primary bg-brand-soft" : "border-border hover:bg-secondary/40",
                      )}
                    >
                      <span className="text-sm font-medium">{o}</span>
                      <span className={cn("w-4 h-4 rounded-full border shrink-0", on ? "bg-primary border-primary" : "border-border")} />
                    </button>
                  )
                })}
              </div>
            </fieldset>

            <div>
              <label className={label} htmlFor="beta-heard">
                How did you hear about Fless? <span className="text-muted-foreground font-normal">(optional)</span>
              </label>
              <select id="beta-heard" value={heard} onChange={(e) => setHeard(e.target.value)} className={field}>
                <option value="">Select</option>
                {heardOptions.map((h) => (
                  <option key={h} value={h}>{h}</option>
                ))}
              </select>
            </div>

            {error ? <p role="alert" className="text-sm text-destructive">{error}</p> : null}

            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <button
                type="submit"
                disabled={!valid || busy}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 text-sm font-medium text-primary-foreground shadow-sm shadow-primary/25 hover:bg-primary-hover disabled:opacity-40"
              >
                {busy ? "Sending…" : copy.cta}
                {!busy && <ArrowRight className="w-4 h-4" />}
              </button>
              <p className="text-[12px] text-muted-foreground">
                We use these details only to contact you about Fless. See our{" "}
                <Link href="/privacy" className="underline underline-offset-2">privacy policy</Link>.
              </p>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  )
}
