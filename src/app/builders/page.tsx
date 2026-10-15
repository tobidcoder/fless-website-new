import Link from "next/link"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { BuilderApplyForm } from "@/components/BuilderApplyForm"
import { CONNECTIONS } from "@/lib/connections"
import { BUILDER_SHARE, FLESS_SHARE, TRIAL_DAYS } from "@/lib/billing"

const appCount = CONNECTIONS.length

// The Studio flow, step by step. This is an illustration of how a build goes, not a real customer.
const conversation: { who: "you" | "studio"; text: string }[] = [
  { who: "you", text: "A front-desk assistant for dental clinics. It answers WhatsApp messages, books appointments and sends reminders." },
  { who: "studio", text: "Got it. Which calendar do the clinics use, and should it book straight away or ask the clinic first?" },
  { who: "you", text: "Google Calendar. Ask first for new patients, book directly for check-ups." },
  { who: "studio", text: "Done. I’ve set new-patient bookings to Ask first and check-ups to Automatic. Want to try it? Send it a message as a patient." },
]

const steps = [
  {
    n: "01",
    title: "Describe it",
    copy: "Tell Studio the job in plain words, the way you’d brief a new hire. It drafts the employee: what it does, which apps it uses and what needs approval.",
  },
  {
    n: "02",
    title: "Answer a few questions",
    copy: "Studio asks what it needs to know: tone, working hours, when to hand over to a person, which actions should ask first.",
  },
  {
    n: "03",
    title: "Test it live",
    copy: "Chat with your employee as a customer would. Test runs never touch real accounts, so you can try anything.",
  },
  {
    n: "04",
    title: "Publish",
    copy: "Keep it private for your own business, or publish it to the marketplace. Marketplace employees are reviewed by Fless first.",
  },
]

const money = [
  { title: `You keep ${BUILDER_SHARE}%`, copy: `Of every subscription and every per-task charge your employee earns. Fless keeps ${FLESS_SHARE}% for hosting, billing, support and distribution.` },
  { title: "Your price, your way", copy: `Charge monthly, yearly, or per completed task, such as per booked appointment. Offer a ${TRIAL_DAYS}-day trial if you want to.` },
  { title: "Paid out worldwide", copy: "Monthly payouts through Stripe in most countries, and Paystack transfers in Nigeria, Ghana, Kenya and South Africa. Identity and tax checks are built in." },
]

const handled = [
  { title: "Review before the marketplace", copy: "Every marketplace employee is reviewed for safety and quality before businesses can hire it. You get clear notes if something needs fixing." },
  { title: "A sales page, made for you", copy: "Each published employee gets its own page with a live demo, and referral links you can share to earn on every hire you bring in." },
  { title: "Apps, safely", copy: `Your employee can use ${appCount}+ apps. Businesses connect their own accounts; you never see their passwords or keys.` },
  { title: "Approvals and limits", copy: "Businesses choose Off, Ask first or Automatic for every action, set workspace limits, and see everything in the activity log." },
  { title: "Hosting and billing", copy: "Fless runs your employee, bills the business in their currency and handles invoices, tax and refunds." },
  { title: "Skills you can reuse and sell", copy: "Turn a procedure you’ve perfected, like chasing an unpaid invoice, into a skill. Use it in all your employees, or sell it to other builders." },
]

const faqs = [
  { q: "Do I need to write code?", a: "No. You build in Studio by describing the job and answering questions. If you can explain how the work is done, you can build an employee." },
  { q: "What can my employee do?", a: "Anything the job needs within the apps a business connects: answer messages, write and publish posts, book meetings, update a CRM, work on approved websites and more. Businesses decide which actions need their approval." },
  { q: "How much can I earn?", a: `You set the price and keep ${BUILDER_SHARE}% of what businesses pay for your employee, every month they keep it. Popular employees earn from many businesses at once.` },
  { q: "How does review work?", a: "When you publish to the marketplace, Fless tests your employee against its scenarios and checks safety, quality and cost. Most reviews finish within a few working days." },
  { q: "Can I build just for my own business?", a: "Yes. Private employees stay in your workspace and never appear on the marketplace. They have no employee price; you only pay your plan and work credits." },
]

export default function BuildersPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <Header activePage="builders" />

      <main className="flex-1">
        {/* HERO */}
        <section className="pt-28 pb-16 sm:pt-32 md:pt-40 md:pb-24">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary mb-6">For builders</p>
              <h1 className="text-[40px] sm:text-6xl md:text-[64px] font-display font-semibold tracking-[-0.045em] leading-[1.04] text-balance">
                Describe it. Test it. Publish it. <span className="text-primary">Earn every month it works.</span>
              </h1>
              <p className="mt-7 text-[17px] sm:text-xl text-muted-foreground leading-[1.65] max-w-2xl text-pretty">
                Build an AI employee by chatting with Fless Studio. Turn what you know about a job, like running a
                clinic front desk or chasing sales leads, into an employee businesses can hire. You keep{" "}
                {BUILDER_SHARE}% of what it earns.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                <Link
                  href="#apply"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-7 text-[15px] font-medium text-primary-foreground shadow-sm shadow-primary/25 hover:bg-primary-hover transition-colors"
                >
                  Apply as a builder →
                </Link>
                <Link
                  href="/build"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-border px-7 text-[15px] font-medium text-foreground hover:border-primary/40 transition-colors"
                >
                  Try describing one
                </Link>
              </div>
            </div>

            {/* STUDIO CHAT ILLUSTRATION */}
            <figure className="lg:col-span-5 rounded-2xl border border-border/70 bg-card shadow-sm overflow-hidden">
              <div className="px-5 py-3 border-b border-border/70 flex items-center justify-between text-[12px] text-muted-foreground">
                <span className="font-medium text-foreground">Studio</span>
                <span>Example conversation</span>
              </div>
              <ol className="p-5 space-y-3">
                {conversation.map((m, i) => (
                  <li key={i} className={m.who === "you" ? "flex justify-end" : "flex justify-start"}>
                    <p
                      className={
                        m.who === "you"
                          ? "max-w-[85%] rounded-2xl rounded-br-md bg-primary text-primary-foreground px-4 py-2.5 text-[14px] leading-relaxed"
                          : "max-w-[85%] rounded-2xl rounded-bl-md bg-secondary text-foreground px-4 py-2.5 text-[14px] leading-relaxed"
                      }
                    >
                      {m.text}
                    </p>
                  </li>
                ))}
              </ol>
              <figcaption className="px-5 pb-5 flex flex-wrap gap-2 text-[12px]">
                <span className="rounded-full border border-border px-3 py-1">Test live</span>
                <span className="rounded-full border border-border px-3 py-1">Publish privately</span>
                <span className="rounded-full border border-border px-3 py-1">Publish to the marketplace</span>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* STEPS */}
        <section className="py-20 md:py-28 border-t border-border/60">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
            <h2 className="text-3xl sm:text-4xl font-display font-semibold tracking-tight leading-[1.12] mb-12 max-w-2xl">
              From an idea to a working employee in one conversation.
            </h2>
            <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((s) => (
                <li key={s.n}>
                  <div className="text-[13px] font-medium tabular-nums text-muted-foreground mb-3">{s.n}</div>
                  <h3 className="text-[18px] font-semibold tracking-tight mb-2">{s.title}</h3>
                  <p className="text-[15px] text-muted-foreground leading-relaxed">{s.copy}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* MONEY */}
        <section className="py-20 md:py-28 bg-[#fafafa] dark:bg-secondary border-t border-border/60">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-4">
              <p className="text-[64px] sm:text-[88px] font-display font-semibold tracking-[-0.05em] leading-none text-primary">
                {BUILDER_SHARE}%
              </p>
              <h2 className="mt-4 text-2xl sm:text-3xl font-display font-semibold tracking-tight">is yours, every month.</h2>
            </div>
            <dl className="lg:col-span-8 divide-y divide-border/70 border-y border-border/70">
              {money.map((m) => (
                <div key={m.title} className="py-6">
                  <dt className="text-[17px] font-semibold mb-1.5">{m.title}</dt>
                  <dd className="text-[15px] text-muted-foreground leading-relaxed">{m.copy}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* WHAT FLESS HANDLES */}
        <section className="py-20 md:py-28 border-t border-border/60">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
            <h2 className="text-3xl sm:text-4xl font-display font-semibold tracking-tight leading-[1.12] mb-4 max-w-2xl">
              You bring the know-how. Fless does the rest.
            </h2>
            <p className="text-[16px] text-muted-foreground leading-relaxed max-w-2xl mb-12">
              The hard parts of selling software are already built.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
              {handled.map((h) => (
                <div key={h.title} className="border-t border-border/70 pt-5">
                  <h3 className="text-[17px] font-semibold tracking-tight mb-2">{h.title}</h3>
                  <p className="text-[15px] text-muted-foreground leading-relaxed">{h.copy}</p>
                </div>
              ))}
            </div>
            <p className="mt-12 text-[15px]">
              <Link href="/docs#studio" className="text-primary font-medium">Read the builder guide in the help centre →</Link>
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 md:py-28 border-t border-border/60">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <h2 className="lg:col-span-4 text-3xl sm:text-4xl font-display font-semibold tracking-tight leading-[1.12]">
              Builder questions.
            </h2>
            <dl className="lg:col-span-8 divide-y divide-border/70 border-y border-border/70">
              {faqs.map((f) => (
                <div key={f.q} className="py-6">
                  <dt className="text-[16px] font-semibold text-foreground mb-2">{f.q}</dt>
                  <dd className="text-[15px] text-muted-foreground leading-relaxed">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* APPLY */}
        <section id="apply" className="py-20 md:py-28 bg-[#fafafa] dark:bg-secondary border-t border-border/60 scroll-mt-20">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-5">
              <h2 className="text-3xl sm:text-4xl font-display font-semibold tracking-tight leading-[1.12] mb-4">
                Apply to build on Fless.
              </h2>
              <p className="text-[15px] text-muted-foreground leading-relaxed">
                We’re opening Studio to builders in small groups. Tell us what you’d build first and we’ll email you
                when your access is ready.
              </p>
            </div>
            <div className="lg:col-span-7">
              <BuilderApplyForm />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
