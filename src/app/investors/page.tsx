import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Check, Circle, Mail } from "lucide-react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { NvidiaInceptionBadge } from "@/components/NvidiaInceptionBadge"

export const metadata: Metadata = {
  title: "Investors & Accelerators — Fless",
  description:
    "Fless is pre-seed infrastructure for AI employees. 18 businesses in pilot across Nigeria, the UK and North America. Workforce subscriptions plus a builder marketplace. NVIDIA Inception member.",
  alternates: {
    canonical: "https://getfless.com/investors",
  },
  openGraph: {
    title: "Investors & Accelerators — Fless",
    description:
      "Pre-seed infrastructure for AI employees. 18 businesses in pilot. Workforce subscriptions plus a builder marketplace.",
    url: "https://getfless.com/investors",
    siteName: "Fless",
    images: [{ url: "/fless-og.png", width: 1200, height: 630, alt: "Fless for investors" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Investors & Accelerators — Fless",
    description: "Pre-seed infrastructure for AI employees. 18 businesses in pilot across 3 regions.",
    images: ["/fless-og.png"],
  },
}

const investorMail =
  "mailto:hello@getfless.com?subject=Investor%20enquiry%20%E2%80%94%20Fless&body=Hi%20Fless%20team%2C%0A%0AI%27d%20like%20to%20learn%20more%20and%20see%20the%20deck.%0A%0AFirm%3A%0ARole%3A%0A"
const acceleratorMail =
  "mailto:hello@getfless.com?subject=Accelerator%20%2F%20partnership%20%E2%80%94%20Fless"

const snapshot = [
  { label: "Stage", value: "Pre-seed" },
  { label: "Live product", value: "AI Marketing employee" },
  { label: "Pilots", value: "18 businesses" },
  { label: "Markets", value: "Nigeria · UK · North America" },
  { label: "Company", value: "Fless Inc. · Lagos HQ" },
  { label: "Program", value: "NVIDIA Inception" },
]

const story = [
  {
    kicker: "The problem",
    title: "Most businesses can't staff every department.",
    copy: "A small company needs marketing, sales, support and finance work done every week, but can rarely hire a full team for each. Today's AI tools help, but they hand back suggestions. Someone still has to do the work, and nobody can see what the AI did.",
  },
  {
    kicker: "What we built",
    title: "AI employees that finish the work, with a person in charge.",
    copy: "On Fless, a business hires an AI employee by department. It plans, drafts and publishes, and pauses for human approval before anything important goes out. Every action is logged. Marketing is live today, publishing to LinkedIn, X, Facebook, Instagram and Bluesky.",
  },
  {
    kicker: "Why Fless",
    title: "Global from day one, with governance built in.",
    copy: "Fless bills in eight currencies, including NGN, KES, GHS and ZAR alongside USD, GBP and EUR, so it works for businesses that most AI products overlook. Approval gates, audit logs and enterprise controls are part of the core product, not an add-on.",
  },
]

const model = [
  {
    title: "Workforce subscriptions",
    copy: "Businesses pay a monthly rate for each AI employee they hire, plus metered usage. Marketing currently starts from about $1,600 a month.",
  },
  {
    title: "Builder marketplace",
    copy: "Developers and domain experts publish AI employees with our SDK. Fless keeps 65% of the revenue and pays the builder 35%, monthly.",
  },
  {
    title: "Enterprise",
    copy: "Larger customers add SSO, private regions or VPC deployment, custom SLAs and a named rollout contact.",
  },
]

const milestones = [
  { done: true, text: "Marketing employee live, publishing directly to 5 social networks through their official APIs" },
  { done: true, text: "18 businesses in pilot across Nigeria, the UK and North America" },
  { done: true, text: "Accepted into the NVIDIA Inception program" },
  { done: true, text: "Multi-currency billing across 8 currencies" },
  { done: false, text: "Voice, Sales, Support, Recruitment, HR, Operations and Finance employees: in early access" },
  { done: false, text: "Builder SDK: in private beta, ahead of opening the marketplace" },
  { done: false, text: "SOC 2 audit: in progress with an independent firm" },
]

export default function InvestorsPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Header activePage="investors" />
      <main className="flex-1">
        {/* HERO */}
        <section className="pt-28 pb-14 sm:pt-32 md:pt-40 md:pb-20">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
            <div className="max-w-3xl">
              <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary mb-5">
                For investors &amp; accelerators
              </p>
              <h1 className="text-[38px] sm:text-5xl md:text-[60px] font-display font-semibold tracking-[-0.04em] leading-[1.05] text-foreground text-balance">
                We&apos;re building the infrastructure for AI employees.
              </h1>
              <p className="mt-6 text-[17px] sm:text-xl text-muted-foreground leading-[1.6] max-w-2xl text-pretty">
                Businesses hire AI employees on Fless the way they would hire staff: by department. Builders create
                and sell those employees. Fless runs the computing, approvals, audit trail and billing in between.
              </p>
              <div className="mt-9 flex flex-col sm:flex-row gap-3">
                <a
                  href={investorMail}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-[15px] font-medium text-primary-foreground shadow-sm shadow-primary/25 hover:bg-primary-hover transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Request the deck
                </a>
                <Link
                  href="/start"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border px-6 text-[15px] font-medium text-foreground hover:border-primary/40 transition-colors"
                >
                  Try the product
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* SNAPSHOT */}
            <dl className="mt-14 md:mt-20 grid grid-cols-2 lg:grid-cols-3 rounded-2xl border border-border/70 overflow-hidden bg-border/70 gap-px">
              {snapshot.map((s) => (
                <div key={s.label} className="bg-background p-5 sm:p-7">
                  <dt className="text-[12px] font-medium text-muted-foreground mb-1.5">{s.label}</dt>
                  <dd className="text-[15px] sm:text-lg font-display font-semibold tracking-tight text-foreground">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* STORY */}
        <section className="py-20 md:py-28 bg-[#fafafa] dark:bg-secondary border-t border-border/60">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
            <h2 className="text-3xl sm:text-4xl font-display font-semibold tracking-tight leading-[1.12] text-foreground mb-10 md:mb-14 max-w-2xl">
              The short version.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
              {story.map((s) => (
                <article key={s.kicker} className="rounded-2xl border border-border/70 bg-background p-6 sm:p-7">
                  <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-primary mb-4">{s.kicker}</p>
                  <h3 className="text-lg sm:text-xl font-display font-semibold tracking-tight leading-snug text-foreground mb-3">
                    {s.title}
                  </h3>
                  <p className="text-[15px] text-muted-foreground leading-relaxed">{s.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* BUSINESS MODEL */}
        <section className="py-20 md:py-28 border-t border-border/60">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-4">
              <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary mb-4">Business model</p>
              <h2 className="text-3xl sm:text-4xl font-display font-semibold tracking-tight leading-[1.12] text-foreground mb-4">
                How Fless makes money.
              </h2>
              <p className="text-[15px] text-muted-foreground leading-relaxed max-w-sm">
                Recurring revenue from businesses, plus a take rate on every employee built by our community.
              </p>
            </div>
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {model.map((m, i) => (
                <div key={m.title} className="rounded-2xl border border-border/70 p-6">
                  <div className="text-[13px] font-semibold tabular-nums text-primary mb-3">0{i + 1}</div>
                  <h3 className="text-[16px] font-semibold tracking-tight text-foreground mb-2">{m.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{m.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TRACTION */}
        <section className="py-20 md:py-28 bg-[#fafafa] dark:bg-secondary border-t border-border/60">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-4">
              <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary mb-4">Progress</p>
              <h2 className="text-3xl sm:text-4xl font-display font-semibold tracking-tight leading-[1.12] text-foreground mb-6">
                Where we are, and what&apos;s next.
              </h2>
              <NvidiaInceptionBadge variant="pill" />
            </div>
            <ul className="lg:col-span-8 rounded-2xl border border-border/70 bg-background divide-y divide-border/60">
              {milestones.map((m) => (
                <li key={m.text} className="flex gap-4 p-5 sm:p-6">
                  {m.done ? (
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                  ) : (
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-soft text-primary">
                      <Circle className="w-2.5 h-2.5" />
                    </span>
                  )}
                  <div className="min-w-0">
                    <p className="text-[15px] text-foreground leading-snug">{m.text}</p>
                    <p className="mt-1 text-[12px] font-medium text-muted-foreground">{m.done ? "Done" : "Next"}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CONTACT */}
        <section className="py-20 md:py-28 border-t border-border/60">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
            <div className="rounded-3xl bg-night text-white p-7 sm:p-10 md:p-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7">
                <h2 className="text-3xl sm:text-4xl font-display font-semibold tracking-tight leading-[1.12] mb-4">
                  Let&apos;s talk.
                </h2>
                <p className="text-[15px] sm:text-base text-white/65 leading-relaxed max-w-lg">
                  We&apos;re happy to share the deck, pilot data and roadmap with investors, accelerators and
                  partners. Write to us and we will get back to you.
                </p>
              </div>
              <div className="lg:col-span-5 flex flex-col gap-3">
                <a
                  href={investorMail}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-[15px] font-medium text-primary-foreground hover:bg-primary-hover transition-colors"
                >
                  Investor enquiry
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href={acceleratorMail}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/20 px-6 text-[15px] font-medium text-white hover:bg-white/5 transition-colors"
                >
                  Accelerator or partnership
                </a>
                <p className="text-center text-[13px] text-white/45 pt-1">hello@getfless.com</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
