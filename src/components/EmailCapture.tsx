"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"

export function EmailCapture({
  source = "site",
  extra = {},
  cta = "Get started free",
  placeholder = "Work email",
}: {
  source?: string
  extra?: Record<string, string>
  cta?: string
  placeholder?: string
}) {
  const router = useRouter()
  const [email, setEmail] = useState("")

  const go = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams({ email, source, ...extra })
    router.push(`/start?${params.toString()}`)
  }

  return (
    <form onSubmit={go} className="flex flex-col sm:flex-row gap-2 w-full max-w-md">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={placeholder}
        autoComplete="email"
        className="flex-1 h-12 px-4 rounded-full border border-border bg-background text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
      />
      <button
        type="submit"
        className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground shadow-sm shadow-primary/25 hover:bg-primary-hover shrink-0"
      >
        {cta}
        <ArrowRight className="w-4 h-4" />
      </button>
    </form>
  )
}
