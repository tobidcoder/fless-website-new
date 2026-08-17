"use client"

import { motion } from "framer-motion"
import { FlessChrome } from "@/components/BrandedStage"

const stories = [
  {
    quote: "We stopped writing the same posts every week. Engagement is up 3× and the calendar is actually full.",
    author: "Chioma Okafor",
    role: "CMO",
    company: "Surgic+",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80",
  },
  {
    quote: "The front desk used to miss half the after-hours calls. Appointments book themselves now.",
    author: "David Adeyemi",
    role: "CEO",
    company: "HealthPlus",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80",
  },
  {
    quote: "Screening used to eat two days. We meet people who already fit — and hire in half the time.",
    author: "Aisha Bello",
    role: "HR Director",
    company: "PayFlow",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80",
  },
]

export function Testimonials() {
  const featured = stories[0]
  const rest = stories.slice(1)

  return (
    <section className="py-24 md:py-32 bg-background border-t border-border/60">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary mb-4"
        >
          Customers
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-[44px] font-display font-semibold tracking-tight leading-[1.12] text-foreground mb-12 md:mb-16 max-w-2xl"
        >
          What it looks like when the work is covered.
        </motion.h2>

        <div className="grid lg:grid-cols-12 gap-4 md:gap-5">
          <motion.article
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 relative rounded-2xl overflow-hidden min-h-[420px] md:min-h-[520px] ring-1 ring-inset ring-black/[0.08]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={featured.photo} alt={featured.author} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
            <FlessChrome />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
              <p className="text-white text-xl md:text-2xl font-display font-medium tracking-tight leading-snug max-w-lg mb-6">
                “{featured.quote}”
              </p>
              <p className="text-white/90 text-sm font-medium">{featured.author}</p>
              <p className="text-white/60 text-sm">{featured.role}, {featured.company}</p>
            </div>
          </motion.article>

          <div className="lg:col-span-5 flex flex-col gap-4 md:gap-5">
            {rest.map((story, i) => (
              <motion.article
                key={story.author}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 + i * 0.06 }}
                className="flex-1 rounded-2xl overflow-hidden border border-border/70 bg-background flex flex-col sm:flex-row"
              >
                <div className="relative sm:w-40 md:w-44 h-44 sm:h-auto shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={story.photo} alt={story.author} className="absolute inset-0 w-full h-full object-cover" />
                </div>
                <div className="p-5 md:p-6 flex flex-col justify-between">
                  <p className="text-[15px] leading-relaxed text-foreground mb-4">“{story.quote}”</p>
                  <div>
                    <p className="text-sm font-medium text-foreground">{story.author}</p>
                    <p className="text-sm text-muted-foreground">{story.role}, {story.company}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
