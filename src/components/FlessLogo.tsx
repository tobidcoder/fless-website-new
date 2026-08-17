import Link from "next/link"
import { cn } from "@/lib/utils"

export function SparkleMark({ className }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/fless-mark.png"
      alt=""
      className={cn("select-none", className)}
      draggable={false}
      aria-hidden
    />
  )
}

export function FlessLogo({
  href = "/",
  inverted = false,
  className,
}: {
  href?: string
  inverted?: boolean
  className?: string
}) {
  return (
    <Link href={href} className={cn("inline-flex items-center gap-2", className)}>
      <SparkleMark className="h-[22px] w-auto shrink-0" />
      <span
        className={cn(
          "font-display text-[17px] font-semibold tracking-tight leading-none",
          inverted ? "text-white" : "text-foreground",
        )}
      >
        fless
      </span>
    </Link>
  )
}
