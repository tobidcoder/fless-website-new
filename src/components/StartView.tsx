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
import { googleDeskOptions, submitBetaToGoogleForm } from "@/lib/betaForm"
import {
  countries,
  countryByIso,
  formatInternationalPhone,
  nationalPhoneDigits,
  phonePlaceholder,
} from "@/lib/countries"

const roles = ["Founder / CEO", "Operator / COO", "Marketing", "Sales", "People / HR", "Finance", "Other"]
const sizes = ["1–10", "11–50", "51–200", "201–1,000", "1,000+"]
const heardOptions = ["A person I trust", "Search", "LinkedIn", "X / Twitter", "Event", "Other"]

const field =
  "w-full h-12 px-4 rounded-xl border border-border bg-background text-foreground text-base sm:text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 placeholder:text-muted-foreground transition-all"
const label = "block text-[13px] font-medium mb-2"

export function StartView() {
  const params = useSearchParams()
  const presetEmail = params.get("email") ?? ""
  const presetDesk = params.get("desk") ?? params.get("dept") ?? ""
  const presetIndustry = params.get("industry") ?? ""
  const source = params.get("source") ?? params.get("plan") ?? "start"

  const [name, setName] = useState("")
  const [email, setEmail] = useState(presetEmail)
  const [company, setCompany] = useState("")
  const [role, setRole] = useState(roles[0])
  const [companySize, setCompanySize] = useState(sizes[1])
  const [marketIso, setMarketIso] = useState("US")
  const [phoneNational, setPhoneNational] = useState("")
  const [industry, setIndustry] = useState(() =>
    industries.some((i) => i.name === presetIndustry) ? presetIndustry : "",
  )
  const [desks, setDesks] = useState<string[]>(() => {
    if (presetDesk && departments.some((d) => d.slug === presetDesk)) return [presetDesk]
    return []
  })
  const [firstJob, setFirstJob] = useState("")
  const [heard, setHeard] = useState("")
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState("")
  const [done, setDone] = useState(false)

  useEffect(() => {
    const urlEmail = params.get("email")
    if (urlEmail && urlEmail.trim()) {
      setEmail(urlEmail.trim())
    }
    const urlDesk = params.get("desk") ?? params.get("dept")
    if (urlDesk && departments.some((d) => d.slug === urlDesk)) {
      setDesks([urlDesk])
    }
    const urlIndustry = params.get("industry")
    if (urlIndustry && industries.some((i) => i.name === urlIndustry)) {
      setIndustry(urlIndustry)
    }
  }, [params])

  const toggle = (slug: string) => {
    setDesks((cur) => (cur.includes(slug) ? cur.filter((s) => s !== slug) : [...cur, slug]))
  }

  const phoneDisplay = formatInternationalPhone(marketIso, phoneNational)
  const valid = useMemo(() => {
    return (
      name.trim().length > 1 &&
      /.+@.+\..+/.test(email.trim()) &&
      company.trim().length > 1 &&
      Boolean(countryByIso(marketIso)) &&
      phoneNational.length >= 6 &&
      Boolean(industry) &&
      desks.length >= 1 &&
      firstJob.trim().length > 8
    )
  }, [name, email, company, marketIso, phoneNational, industry, desks, firstJob])

  const onMarketChange = (iso: string) => {
    setMarketIso(iso)
    if (phoneNational) setPhoneNational(nationalPhoneDigits(iso, phoneNational))
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!valid || busy) return
    setBusy(true)
    setError("")
    try {
      await submitBetaToGoogleForm({
        name: name.trim(),
        email: email.trim(),
        company: company.trim(),
        role,
        companySize,
        market: countryByIso(marketIso)?.name ?? marketIso,
        phone: formatInternationalPhone(marketIso, phoneNational).trim(),
        desks: desks.map((slug) => googleDeskOptions[slug] ?? departments.find((d) => d.slug === slug)?.name ?? slug),
        firstJob: firstJob.trim(),
        heard: [heard, source !== "start" ? source : ""].filter(Boolean).join(" · "),
        industry,
      })
      try {
        localStorage.setItem("fless-beta", JSON.stringify({ email, at: Date.now() }))
      } catch {
        /* ignore */
      }
      setDone(true)
    } catch {
      setError("We couldn’t send that just now. Check your connection and try again.")
    } finally {
      setBusy(false)
    }
  }

  if (done) {
    return (
      <div className="min-h-screen bg-background flex flex-col font-sans">
        <Header />
        <main className="flex-1 flex items-center">
          <div className="max-w-[560px] mx-auto px-6 py-28 text-center">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <div className="mx-auto w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mb-6">
                <Check className="w-5 h-5" />
              </div>
              <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary mb-3">Beta</p>
              <h1 className="text-3xl md:text-4xl font-display font-semibold tracking-tight mb-4">
                Thanks for joining the beta.
              </h1>
              <p className="text-muted-foreground leading-relaxed mb-4">
                A lot of teams want in right now. We’ll reach out soon at{" "}
                <span className="text-foreground font-medium">{email}</span>.
              </p>
              <p className="text-[14px] text-muted-foreground leading-relaxed mb-8">
                Sit tight. When a seat opens for {company || "your company"}, you’ll hear from us first.
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
        <div className="max-w-[760px] mx-auto px-6">
          <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary mb-3">Private beta</p>
          <h1 className="text-3xl sm:text-4xl font-display font-semibold tracking-tight mb-3">
            Join the Fless beta.
          </h1>
          <p className="text-[15px] text-muted-foreground leading-relaxed mb-10 max-w-xl">
            One product. Every department. Every market. Demand is high — this form is how we decide who gets a seat next.
          </p>

          <form onSubmit={submit} className="space-y-8">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className={label} htmlFor="beta-name">
                  Full name
                </label>
                <input id="beta-name" required value={name} onChange={(e) => setName(e.target.value)} className={field} placeholder="Tobi Lobo" autoComplete="name" />
              </div>
              <div>
                <label className={label} htmlFor="beta-email">
                  Work email
                </label>
                <input
                  id="beta-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={field}
                  placeholder="you@company.com"
                  autoComplete="email"
                />
              </div>
              <div>
                <label className={label} htmlFor="beta-market">
                  Primary market
                </label>
                <select
                  id="beta-market"
                  required
                  value={marketIso}
                  onChange={(e) => onMarketChange(e.target.value)}
                  className={field}
                >
                  {countries.map((c) => (
                    <option key={c.iso} value={c.iso}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={label} htmlFor="beta-phone">
                  Phone
                </label>
                <input
                  id="beta-phone"
                  type="tel"
                  required
                  inputMode="tel"
                  autoComplete="tel"
                  value={phoneDisplay}
                  onChange={(e) => setPhoneNational(nationalPhoneDigits(marketIso, e.target.value))}
                  className={field}
                  placeholder={phonePlaceholder(marketIso)}
                />
              </div>
              <div>
                <label className={label} htmlFor="beta-company">
                  Company
                </label>
                <input id="beta-company" required value={company} onChange={(e) => setCompany(e.target.value)} className={field} placeholder="Acme" autoComplete="organization" />
              </div>
              <div>
                <label className={label} htmlFor="beta-role">
                  Role
                </label>
                <select id="beta-role" value={role} onChange={(e) => setRole(e.target.value)} className={field}>
                  {roles.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={label} htmlFor="beta-size">
                  Company size
                </label>
                <select id="beta-size" value={companySize} onChange={(e) => setCompanySize(e.target.value)} className={field}>
                  {sizes.map((s) => (
                    <option key={s} value={s}>
                      {s} people
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={label} htmlFor="beta-industry">
                  Industry
                </label>
                <select
                  id="beta-industry"
                  required
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className={field}
                >
                  <option value="" disabled>
                    Select industry
                  </option>
                  {industries.map((item) => (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className={label}>How will you use Fless?</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  {[
                    { id: "BUSINESS", title: "Run my business", sub: "Hire AI employees for my team" },
                    { id: "BUILDER", title: "Build AI employees", sub: "Author and publish AI workers" },
                    { id: "BOTH", title: "Both", sub: "Hire workers & build for the platform" },
                  ].map((option) => (
                    <label
                      key={option.id}
                      className="p-3 rounded-xl border border-border bg-card cursor-pointer flex flex-col justify-between hover:border-primary/50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="usageIntent"
                          value={option.id}
                          defaultChecked={option.id === "BOTH"}
                          className="text-primary focus:ring-primary"
                        />
                        <span className="font-semibold text-xs text-foreground">{option.title}</span>
                      </div>
                      <span className="text-[11px] text-muted-foreground pt-1">{option.sub}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <p className={label}>Which desks do you want first?</p>
              <p className="text-[12px] text-muted-foreground -mt-1 mb-3">Pick at least one. Same product in every market.</p>
              <div className="grid sm:grid-cols-2 gap-2">
                {departments.map((d) => {
                  const on = desks.includes(d.slug)
                  return (
                    <button
                      key={d.slug}
                      type="button"
                      onClick={() => toggle(d.slug)}
                      className={`text-left rounded-xl border p-3.5 transition-colors ${
                        on ? "border-primary bg-brand-soft" : "border-border hover:bg-secondary/40"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-semibold">{d.name}</span>
                        <span className={`w-4 h-4 rounded-full border ${on ? "bg-primary border-primary" : "border-border"}`} />
                      </div>
                      <p className="text-[12px] text-muted-foreground mt-0.5">{d.line}</p>
                    </button>
                  )
                })}
              </div>
            </div>

            <div>
              <label className={label} htmlFor="beta-job">
                What should Fless take off your plate first?
              </label>
              <textarea
                id="beta-job"
                required
                rows={3}
                value={firstJob}
                onChange={(e) => setFirstJob(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 resize-y min-h-[96px]"
                placeholder="e.g. After-hours inbound, and next week’s campaign calendar."
              />
            </div>

            <div>
              <label className={label} htmlFor="beta-heard">
                How did you hear about Fless? <span className="text-muted-foreground font-normal">(optional)</span>
              </label>
              <select id="beta-heard" value={heard} onChange={(e) => setHeard(e.target.value)} className={field}>
                <option value="">Select</option>
                {heardOptions.map((h) => (
                  <option key={h} value={h}>
                    {h}
                  </option>
                ))}
              </select>
            </div>

            {error ? <p className="text-sm text-destructive">{error}</p> : null}

            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <button
                type="submit"
                disabled={!valid || busy}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 text-sm font-medium text-primary-foreground shadow-sm shadow-primary/25 hover:bg-primary-hover disabled:opacity-40"
              >
                {busy ? "Sending…" : "Join the beta"}
                {!busy && <ArrowRight className="w-4 h-4" />}
              </button>
              <p className="text-[12px] text-muted-foreground">A lot of teams are on this list. We’ll reach out when a seat opens.</p>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  )
}
