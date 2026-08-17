"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Monitor, Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"

const options = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
] as const

export function ThemeToggle({
  variant = "compact",
  className,
}: {
  variant?: "compact" | "row"
  className?: string
}) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <div
        className={cn(
          variant === "row" ? "h-10 w-full rounded-full" : "h-9 w-[108px] rounded-full",
          className,
        )}
        aria-hidden
      />
    )
  }

  return (
    <div
      role="radiogroup"
      aria-label="Appearance"
      className={cn(
        "inline-flex items-center rounded-full border border-border/80 bg-background/80 p-0.5 backdrop-blur-md",
        variant === "row" && "w-full",
        className,
      )}
    >
      {options.map(({ value, label, icon: Icon }) => {
        const selected = theme === value
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={label}
            onClick={() => setTheme(value)}
            className={cn(
              "inline-flex h-8 items-center justify-center gap-1.5 rounded-full text-[12px] font-medium transition-colors",
              variant === "row" ? "flex-1 px-3" : "w-8",
              selected
                ? "bg-primary text-primary-foreground shadow-sm shadow-primary/25"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Icon className="h-3.5 w-3.5" />
            {variant === "row" && <span>{label}</span>}
          </button>
        )
      })}
    </div>
  )
}
