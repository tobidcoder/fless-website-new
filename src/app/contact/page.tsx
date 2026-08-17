"use client"

import { EmailCapture } from "@/components/EmailCapture"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Header />
      <main className="flex-1 pt-28 pb-20">
        <div className="max-w-[560px] mx-auto px-6">
          <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary mb-3">Enterprise</p>
          <h1 className="text-3xl md:text-4xl font-display font-semibold tracking-tight mb-4">
            Talk to the team that runs rollout.
          </h1>
          <p className="text-[15px] text-muted-foreground leading-relaxed mb-8">
            SSO, regions, a named CSM. Leave your work email — we’ll send a time, not a drip sequence.
          </p>
          <EmailCapture source="contact" extra={{ plan: "enterprise" }} cta="Request a walkthrough" />
          <p className="mt-6 text-[13px] text-muted-foreground">
            Or start on Pro today if you don’t need a private region yet.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
