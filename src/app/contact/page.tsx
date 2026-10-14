"use client"

import { EmailCapture } from "@/components/EmailCapture"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Header />
      <main data-reveal className="flex-1 pt-28 pb-20">
        <div id="enterprise" className="max-w-[560px] mx-auto px-6">
          <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary mb-3">Enterprise</p>
          <h1 className="text-3xl md:text-4xl font-display font-semibold tracking-tight mb-4">
            Talk to the team that runs rollout.
          </h1>
          <p className="text-[15px] text-muted-foreground leading-relaxed mb-8">
            SSO, regions, a named CSM. Leave your work email — we’ll send a time, not a drip sequence.
          </p>
          <EmailCapture source="contact" extra={{ plan: "enterprise" }} cta="Request a walkthrough" />
          <p className="mt-6 text-[13px] text-muted-foreground">
            Or join the beta today if you don’t need an enterprise rollout yet.
          </p>

          <div className="mt-12 pt-8 border-t border-border/60 space-y-3 text-sm">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Direct Contacts</h2>
            <div className="space-y-1.5 text-muted-foreground">
              <p>General inquiries: <a href="mailto:hello@getfless.com" className="text-foreground font-medium underline underline-offset-4">hello@getfless.com</a></p>
              <p>Security & compliance: <a href="mailto:security@getfless.com" className="text-foreground font-medium underline underline-offset-4">security@getfless.com</a></p>
              <p>Privacy & data: <a href="mailto:privacy@getfless.com" className="text-foreground font-medium underline underline-offset-4">privacy@getfless.com</a></p>
              <p className="pt-2 text-xs">Office: 3a Habitat Close, Lekki Phase 1, Lagos, Nigeria</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
