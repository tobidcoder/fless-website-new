"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

export function StayInForm({
  source,
  variant = "light",
  className,
}: {
  source: string
  variant?: "light" | "dark"
  className?: string
}) {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)

  const go = (e: React.FormEvent) => {
    e.preventDefault()
    const cleanEmail = email.trim()
    if (!cleanEmail) return
    setSent(true)
    router.push(`/start?email=${encodeURIComponent(cleanEmail)}&source=${encodeURIComponent(source)}`)
  }

  const dark = variant === "dark"

  return (
    <form
      onSubmit={go}
      className={cn(
        "relative flex items-center w-full max-w-md rounded-full p-1.5 shadow-sm transition-all duration-200",
        dark
          ? "bg-white/[0.07] border border-white/15 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/40 hover:border-white/25"
          : "bg-background border border-border/80 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/25 hover:border-border",
        className,
      )}
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Work email"
        autoComplete="email"
        className={cn(
          "min-w-0 flex-1 bg-transparent px-3.5 sm:px-4 text-base sm:text-sm outline-none",
          dark
            ? "text-white placeholder:text-white/40"
            : "text-foreground placeholder:text-muted-foreground",
        )}
      />
      <button
        type="submit"
        className="inline-flex h-9 sm:h-10 px-4 sm:px-5 rounded-full bg-primary text-white text-xs sm:text-sm font-medium shrink-0 items-center justify-center gap-1.5 hover:bg-primary-hover shadow-sm shadow-primary/20 transition-colors"
      >
        {sent ? <Check className="w-4 h-4" /> : "Join"}
      </button>
    </form>
  )
}
