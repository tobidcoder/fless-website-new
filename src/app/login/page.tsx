"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { ArrowRight } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Header />
      <main className="flex-1 pt-28 pb-20">
        <div className="max-w-[440px] mx-auto px-6">
          <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary mb-3">Beta</p>
          <h1 className="text-3xl font-display font-semibold tracking-tight mb-3">Join the beta.</h1>
          <p className="text-sm text-muted-foreground mb-8">
            Fless is in private beta. Enter your work email and we’ll take you to the list.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              const clean = email.trim()
              if (!clean) return
              router.push(`/start?email=${encodeURIComponent(clean)}&source=login`)
            }}
            className="space-y-4"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Work email"
              autoComplete="email"
              className="w-full h-12 px-4 rounded-xl border border-border bg-background text-foreground text-base sm:text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 placeholder:text-muted-foreground transition-all"
            />
            <button
              type="submit"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary text-sm font-medium text-primary-foreground shadow-sm shadow-primary/25 hover:bg-primary-hover transition-colors"
            >
              Join the beta
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
          <p className="mt-6 text-[13px] text-muted-foreground">
            New to Fless?{" "}
            <Link href="/start" className="font-medium text-primary hover:text-primary-hover">
              Join without an email first
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
