import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { BuildPromptBox } from "@/components/BuildPromptBox"

const title = "Build an AI employee for your business — Fless"
const description =
  "Describe the job in plain words and Fless Studio builds an AI employee for your business in minutes. Test it, connect your apps, and decide what it asks you first."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "https://getfless.com/build" },
  openGraph: {
    title,
    description,
    url: "https://getfless.com/build",
    siteName: "Fless",
    images: [{ url: "/fless-og.png", width: 1200, height: 630, alt: "Build an AI employee with Fless" }],
  },
}

const points = [
  { title: "Describe it", copy: "Say what the job is, in your own words. Studio turns it into an employee and asks what it needs to know." },
  { title: "Test it", copy: "Chat with it before it touches anything real. Change anything by just saying so." },
  { title: "Put it to work", copy: "Connect your apps, choose what it does on its own and what it asks you first, and assign work in plain language." },
]

export default function BuildPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Header activePage="build" />
      <main className="flex-1">
        <section className="pt-28 pb-16 sm:pt-32 md:pt-40 md:pb-24">
          <div className="max-w-[960px] mx-auto px-5 sm:px-6 text-center">
            <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary mb-5">Employee Studio</p>
            <h1 className="text-[38px] sm:text-[56px] md:text-[64px] font-display font-semibold leading-[1.05] tracking-[-0.045em] text-balance">
              Build an AI employee for your business <span className="text-primary">in minutes.</span>
            </h1>
            <p className="mt-6 text-[17px] sm:text-xl text-muted-foreground leading-[1.6] max-w-[640px] mx-auto text-pretty">
              Describe the work. Studio builds the employee, asks a few questions, and lets you test it before it does
              anything real. Employees you build for your business are private and have no employee price.
            </p>
            <div className="mt-10">
              <BuildPromptBox />
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28 border-t border-border/60">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
            {points.map((p, i) => (
              <div key={p.title}>
                <div className="text-[13px] font-medium tabular-nums text-muted-foreground mb-3">{String(i + 1).padStart(2, "0")}</div>
                <h2 className="text-[19px] font-semibold tracking-tight mb-2">{p.title}</h2>
                <p className="text-[15px] text-muted-foreground leading-relaxed">{p.copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16 md:py-20 bg-[#fafafa] dark:bg-secondary border-t border-border/60">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-xl">
              <h2 className="text-2xl font-display font-semibold tracking-tight mb-2">Good at a job? Sell the employee you build.</h2>
              <p className="text-[15px] text-muted-foreground leading-relaxed">
                Publish it to the marketplace and keep 70% of what businesses pay for it.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/builders" className="inline-flex h-11 items-center justify-center rounded-full border border-border px-6 text-[14px] font-medium hover:border-primary/40">
                Builder programme
              </Link>
              <Link href="/hire" className="inline-flex h-11 items-center justify-center rounded-full border border-border px-6 text-[14px] font-medium hover:border-primary/40">
                Or hire a ready-made one
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
