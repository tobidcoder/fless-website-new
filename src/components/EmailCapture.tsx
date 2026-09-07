"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export function EmailCapture({
  source = "site",
  extra = {},
  cta = "Get started free",
  placeholder = "Work email",
  className,
}: {
  source?: string
  extra?: Record<string, string>
  cta?: string
  placeholder?: string
  className?: string
}) {
  const router = useRouter()
  const [email, setEmail] = useState("")

  const go = (e: React.FormEvent) => {
    e.preventDefault()
    const cleanEmail = email.trim()
    if (!cleanEmail) return
    const params = new URLSearchParams({ email: cleanEmail, source, ...extra })
    router.push(`/start?${params.toString()}`)
  }

  return (
    <form
      onSubmit={go}
      className={cn(
        "relative flex items-center w-full max-w-md rounded-full border border-border/80 bg-background/95 p-1.5 shadow-sm transition-all duration-200",
        "focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/25 hover:border-border",
        className
      )}
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={placeholder}
        autoComplete="email"
        className="min-w-0 flex-1 bg-transparent px-3.5 sm:px-4 text-base sm:text-sm text-foreground placeholder:text-muted-foreground outline-none"
      />
      <button
        type="submit"
        className="inline-flex h-10 sm:h-11 items-center justify-center gap-1.5 sm:gap-2 rounded-full bg-primary px-4 sm:px-6 text-xs sm:text-sm font-medium text-primary-foreground shadow-sm shadow-primary/20 hover:bg-primary-hover transition-colors shrink-0"
      >
        <span>{cta}</span>
        <ArrowRight className="w-3.5 h-3.5 shrink-0" />
      </button>
    </form>
  )
}

