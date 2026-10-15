"use client"

import { PILOT_BUSINESS_COUNT } from "@/lib/claims"

const sectors = [
  "Healthcare Clinics",
  "Retail & E-commerce",
  "Advisory Practices",
  "Creative Studios",
  "Technology & SaaS",
  "Professional Services",
  "Financial Consultancies",
  "Real Estate Teams",
]

export function LogoMarquee() {
  const row = [...sectors, ...sectors, ...sectors]

  return (
    <section className="py-12 md:py-16 overflow-hidden border-y border-border/60 bg-background">
      <p className="text-center text-[11px] font-medium tracking-[0.2em] uppercase text-primary mb-8">
        {PILOT_BUSINESS_COUNT} businesses in pilot across Nigeria, the UK, and North America
      </p>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        {/* CSS marquee — no JS animation stealing main thread / touch */}
        <div className="logo-marquee flex w-max items-center gap-12 md:gap-20 px-6 pointer-events-none select-none" aria-hidden>
          {row.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="text-lg md:text-xl font-display font-medium tracking-tight text-foreground/40 whitespace-nowrap"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
