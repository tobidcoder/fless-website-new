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
    setSent(true)
    router.push(`/start?email=${encodeURIComponent(email)}&source=${encodeURIComponent(source)}`)
  }

  const dark = variant === "dark"

  return (
    <form onSubmit={go} className={cn("flex w-full max-w-md gap-2", className)}>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Work email"
        autoComplete="email"
        className={cn(
          "flex-1 min-w-0 h-11 px-4 rounded-full text-sm outline-none",
          dark
            ? "bg-white/5 border border-white/10 text-white placeholder:text-white/35 focus:border-primary focus:ring-1 focus:ring-primary/40"
            : "bg-white border border-black/10 text-slate-900 placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary/30",
        )}
      />
      <button
        type="submit"
        className="h-11 px-5 rounded-full bg-primary text-primary-foreground text-sm font-medium shrink-0 hover:bg-primary-hover shadow-sm shadow-primary/25"
      >
        {sent ? <Check className="w-4 h-4" /> : "Join"}
      </button>
    </form>
  )
}
