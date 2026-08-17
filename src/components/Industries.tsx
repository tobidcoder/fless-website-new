"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { PhotoTile } from "@/components/BrandedStage"
import { sizeSolutions, featuredIndustrySolutions, moreIndustrySolutions } from "@/lib/solutions"

export function Industries() {
  return (
    <section id="solutions" className="py-24 md:py-32 bg-background border-t border-border/60">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="max-w-2xl mb-12 md:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary mb-4"
          >
            Solutions
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-[44px] font-display font-semibold tracking-tight leading-[1.12] text-foreground"
          >
            Built for how the work actually looks.
          </motion.h2>
        </div>

        <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-primary mb-4">Size</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-12">
          {sizeSolutions.map((s, i) => (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link href={`/solutions/${s.slug}`} className="group block">
                <PhotoTile
                  image={s.hero}
                  alt={s.heroAlt}
                  title={s.name}
                  subtitle={s.line}
                  live={s.cities[0]}
                  className="aspect-[4/5] rounded-2xl"
                />
              </Link>
            </motion.div>
          ))}
        </div>

        <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-primary mb-4">Industry</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {featuredIndustrySolutions.map((s, i) => (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
            >
              <Link href={`/solutions/${s.slug}`} className="group block">
                <PhotoTile
                  image={s.hero}
                  alt={s.heroAlt}
                  title={s.name}
                  subtitle={s.line}
                  live={s.cities[0]}
                  className="aspect-[5/4] rounded-2xl"
                />
              </Link>
            </motion.div>
          ))}
        </div>

        <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-primary mb-4">More</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {moreIndustrySolutions.map((s, i) => (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
            >
              <Link href={`/solutions/${s.slug}`} className="group block">
                <PhotoTile
                  image={s.hero}
                  alt={s.heroAlt}
                  title={s.name}
                  subtitle={s.line}
                  live={s.cities[0]}
                  className="aspect-[5/4] rounded-2xl"
                />
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-10">
          <Link href="/solutions" className="text-sm font-medium text-foreground hover:opacity-70 transition-opacity">
            See all solutions →
          </Link>
        </div>
      </div>
    </section>
  )
}
