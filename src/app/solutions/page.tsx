"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { PhotoTile } from "@/components/BrandedStage"
import { EmailCapture } from "@/components/EmailCapture"
import {
  sizeSolutions,
  featuredIndustrySolutions,
  moreIndustrySolutions,
  type Solution,
} from "@/lib/solutions"

function Grid({
  title,
  items,
  columns = "lg:grid-cols-4",
}: {
  title: string
  items: Solution[]
  columns?: string
}) {
  return (
    <section className="py-16 md:py-20">
      <h2 className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary mb-6">{title}</h2>
      <div className={`grid sm:grid-cols-2 ${columns} gap-4`}>
        {items.map((s, i) => (
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
                className="aspect-[4/5] rounded-2xl mb-3"
              />
              <p className="text-[13px] text-muted-foreground leading-relaxed px-0.5">
                {s.cities.join(" · ")}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default function SolutionsIndexPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Header activePage="solutions" />
      <main className="flex-1 pt-24 md:pt-28">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary mb-4"
          >
            Solutions
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl lg:text-[52px] font-display font-semibold tracking-tight leading-[1.08] max-w-2xl"
          >
            Built for how the work actually looks.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="mt-5 text-[16px] text-muted-foreground max-w-lg leading-relaxed"
          >
            By company size, or by the industry you operate in — same product, local hours, wherever you sell.
          </motion.p>
          <div className="mt-8">
            <EmailCapture source="solutions-index" />
          </div>

          <Grid title="Size" items={sizeSolutions} />
          <Grid title="Industry" items={featuredIndustrySolutions} columns="lg:grid-cols-3" />
          <Grid title="More" items={moreIndustrySolutions} columns="lg:grid-cols-3" />
        </div>
      </main>
      <Footer />
    </div>
  )
}
