import type { ElementType } from "react"
import Link from "next/link"
import {
  HeartPulse,
  ShoppingBag,
  GraduationCap,
  Landmark,
  Building2,
  Zap,
  Briefcase,
  Building,
  Factory,
  Utensils,
  Film,
  Truck,
  Sprout,
  Hammer,
  Flame,
  Radio,
  Car,
  Plane,
  Pill,
  Scale,
  Heart,
  Shield,
  Code2,
  ShieldAlert,
  Palette,
  Shirt,
  Dumbbell,
  Music,
  Calendar,
  Compass,
  Dna,
  Pickaxe,
  Anchor,
  Stethoscope,
  Boxes,
  ArrowUpRight,
} from "lucide-react"
import { industries, industryHref, SOLUTION_PAGES, type Industry } from "@/lib/industries"
import { cn } from "@/lib/utils"

export const industryIcons: Record<string, ElementType> = {
  healthcare: HeartPulse,
  retail: ShoppingBag,
  education: GraduationCap,
  finance: Landmark,
  banking: Building2,
  fintech: Zap,
  consulting: Briefcase,
  realestate: Building,
  manufacturing: Factory,
  hospitality: Utensils,
  media: Film,
  logistics: Truck,
  agriculture: Sprout,
  construction: Hammer,
  energy: Flame,
  telecom: Radio,
  automotive: Car,
  aerospace: Plane,
  pharma: Pill,
  legal: Scale,
  nonprofit: Heart,
  government: Shield,
  software: Code2,
  cybersecurity: ShieldAlert,
  design: Palette,
  fashion: Shirt,
  fitness: Dumbbell,
  music: Music,
  events: Calendar,
  architecture: Compass,
  biotech: Dna,
  mining: Pickaxe,
  maritime: Anchor,
  veterinary: Stethoscope,
  other: Boxes,
}

export function IndustryCard({
  industry,
  className,
}: {
  industry: Industry
  className?: string
}) {
  const Icon = industryIcons[industry.id] || Boxes
  const hasSolution = SOLUTION_PAGES.has(industry.id)

  return (
    <Link
      href={industryHref(industry)}
      className={cn(
        "group relative flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-5 md:p-6 transition-all duration-300 hover:border-primary/50 hover:bg-card/95 hover:shadow-[0_12px_32px_-12px_rgba(99,102,241,0.18)] hover:-translate-y-1 overflow-hidden",
        className
      )}
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
      <div>
        <div className="flex items-center justify-between gap-3">
          <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-105 transition-all duration-300 shrink-0 shadow-sm">
            <Icon className="w-5 h-5" />
          </div>
          <div className="flex items-center gap-2">
            {hasSolution && (
              <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary border border-primary/20">
                Full solution
              </span>
            )}
            <div className="h-7 w-7 rounded-full bg-secondary/60 flex items-center justify-center text-muted-foreground transition-all duration-300 group-hover:bg-primary/10 group-hover:text-primary">
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>
        </div>

        <h3 className="mt-4 font-display font-semibold text-[16px] text-foreground tracking-tight group-hover:text-primary transition-colors">
          {industry.name}
        </h3>
        <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground line-clamp-2">
          {industry.line}
        </p>
      </div>

      <div className="mt-5 pt-3.5 border-t border-border/50 flex items-center justify-between text-[11px] text-muted-foreground">
        <span className="font-medium text-foreground/80 group-hover:text-primary transition-colors">
          {hasSolution ? "View solution →" : "Deploy team →"}
        </span>
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground/60 font-mono">
          Ready
        </span>
      </div>
    </Link>
  )
}

export function IndustryGrid({
  items = industries,
  className,
}: {
  items?: Industry[]
  className?: string
}) {
  return (
    <div className={cn("grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5 md:gap-4", className)}>
      {items.map((industry) => (
        <IndustryCard key={industry.id} industry={industry} />
      ))}
    </div>
  )
}
