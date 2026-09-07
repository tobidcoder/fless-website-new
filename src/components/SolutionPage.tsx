"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { BrandedStage, PhotoTile } from "@/components/BrandedStage"
import { TryCommand } from "@/components/TryCommand"
import { EmailCapture } from "@/components/EmailCapture"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { departments } from "@/lib/departments"
import { industries, industryHref } from "@/lib/industries"
import { IndustryGrid } from "@/components/IndustryGrid"
import {
  sizeSolutions,
  industrySolutions,
  type Solution,
} from "@/lib/solutions"

export function SolutionPage({ solution }: { solution: Solution }) {
  const desks = departments.filter((d) => solution.desks.includes(d.slug))
  const sameKind = (solution.kind === "size" ? sizeSolutions : industrySolutions).filter(
    (s) => s.slug !== solution.slug,
  )
  const otherKind = solution.kind === "size" ? industrySolutions.slice(0, 4) : sizeSolutions
  const otherIndustries = industries.filter((i) => i.id !== solution.slug)

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Header activePage="solutions" />
      <main className="flex-1">
        <section className="pt-24 md:pt-28 pb-12 md:pb-16">
          <div className="max-w-[1200px] mx-auto px-6 grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-5">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary mb-4"
              >
                {solution.kind === "size" ? "By size" : "By industry"} · {solution.markets}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="text-4xl sm:text-5xl lg:text-[52px] font-display font-semibold tracking-tight leading-[1.08] text-foreground"
              >
                {solution.headline}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mt-5 text-[16px] text-muted-foreground leading-relaxed max-w-md"
              >
                {solution.lede}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.16 }}
                className="mt-8 flex flex-col sm:flex-row gap-3"
              >
                <Link
                  href={solution.plan.href}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 text-sm font-medium text-primary-foreground shadow-sm shadow-primary/25 hover:bg-primary-hover"
                >
                  {solution.plan.label}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-border px-6 text-sm font-medium hover:bg-secondary/60"
                >
                  See pricing
                </Link>
              </motion.div>
              <p className="mt-4 text-[12px] text-muted-foreground">{solution.plan.note}</p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.65 }}
              className="lg:col-span-7"
            >
              <BrandedStage
                image={solution.hero}
                alt={solution.heroAlt}
                label={`${solution.name} · live`}
                rows={solution.activity}
                className="rounded-2xl aspect-[16/11]"
              />
            </motion.div>
          </div>
        </section>

        <section className="border-y border-border/60">
          <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-3 divide-x divide-border/60">
            {solution.metrics.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="py-8 md:py-10 px-4 md:px-8 first:pl-0"
              >
                <div className="text-2xl md:text-3xl font-display font-semibold tracking-tight tabular-nums">{m.value}</div>
                <div className="text-[13px] text-muted-foreground mt-1">{m.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="border-b border-border/60">
          <div className="max-w-[1200px] mx-auto px-6 py-5 flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-primary">Live in</span>
            {solution.cities.map((city) => (
              <span key={city} className="text-sm font-medium text-foreground">
                {city}
              </span>
            ))}
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="max-w-[1200px] mx-auto px-6 grid lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-7">
              <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary mb-4">How it actually runs</p>
              <h2 className="text-3xl md:text-4xl font-display font-semibold tracking-tight leading-[1.12] mb-6 max-w-xl">
                {solution.line}
              </h2>
              <p className="text-[16px] text-muted-foreground leading-relaxed max-w-xl">{solution.story}</p>
              <div className="mt-8">
                <EmailCapture source="solution" extra={{ solution: solution.slug }} cta="Register" />
              </div>
            </div>
            <div className="lg:col-span-5">
              <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-primary mb-4">Built for</p>
              <ul className="space-y-3 mb-8">
                {solution.audience.map((item) => (
                  <li key={item} className="text-[15px] text-foreground pl-4 border-l border-border">
                    {item}
                  </li>
                ))}
              </ul>
              <TryCommand
                desk={solution.slug}
                prompts={solution.plays.slice(0, 3).map((p) => p.title + " — " + p.copy.split(".")[0] + ".")}
              />
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28 bg-[#fafafa] dark:bg-secondary border-y border-border/60">
          <div className="max-w-[1200px] mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-display font-semibold tracking-tight mb-10 md:mb-14 max-w-xl">
              How it shows up in {solution.name.toLowerCase()}.
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {solution.capabilities.map((cap, i) => (
                <motion.article
                  key={cap.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                >
                  <BrandedStage
                    image={cap.image}
                    alt={cap.title}
                    label={cap.title}
                    rows={cap.snippet}
                    compact
                    className="aspect-[4/5] rounded-2xl mb-4"
                  />
                  <h3 className="text-[15px] font-semibold tracking-tight text-foreground mb-1.5">{cap.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{cap.copy}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="max-w-[1200px] mx-auto px-6">
            <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary mb-3">In practice</p>
            <h2 className="text-3xl md:text-4xl font-display font-semibold tracking-tight mb-10 md:mb-14 max-w-xl">
              What teams actually run.
            </h2>
            <div className="grid sm:grid-cols-2 gap-px bg-border/70 rounded-2xl overflow-hidden border border-border/70">
              {solution.plays.map((play, i) => (
                <motion.article
                  key={play.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-background p-6 md:p-8"
                >
                  <h3 className="text-[16px] font-semibold tracking-tight mb-2">{play.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{play.copy}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28 border-t border-border/60">
          <div className="max-w-[1200px] mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-display font-semibold tracking-tight mb-12 max-w-xl">
              Live in a week. Compounding after that.
            </h2>
            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
              {solution.steps.map((step, i) => (
                <motion.div
                  key={step.n}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                >
                  <div className="text-[13px] font-medium tabular-nums text-muted-foreground mb-3">{step.n}</div>
                  <h3 className="text-[17px] font-semibold tracking-tight mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.copy}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-[#fafafa] dark:bg-secondary border-y border-border/60">
          <div className="max-w-[1200px] mx-auto px-6">
            <h2 className="text-2xl font-display font-semibold tracking-tight mb-8">Desks that usually turn on</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {desks.map((d) => (
                <Link key={d.slug} href={`/departments/${d.slug}`} className="group">
                  <PhotoTile
                    image={d.hero}
                    alt={d.name}
                    title={d.name}
                    live={d.activity[0]?.title}
                    className="aspect-[5/4] rounded-xl mb-2"
                  />
                  <p className="text-[12px] text-muted-foreground">{d.line}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-night text-white">
          <div className="max-w-[1200px] mx-auto px-6 grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <p className="text-2xl md:text-3xl font-display font-medium tracking-tight leading-snug max-w-2xl">
                “{solution.quote.text}”
              </p>
              <p className="mt-6 text-sm text-white/70">
                {solution.quote.author} · {solution.quote.role}
              </p>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <Link
                href={solution.plan.href}
                className="inline-flex h-11 items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 text-sm font-medium hover:bg-primary-hover"
              >
                {solution.plan.label}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="max-w-[1200px] mx-auto px-6 grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <h2 className="text-2xl md:text-3xl font-display font-semibold tracking-tight mb-3">Questions</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                How {solution.name.toLowerCase()} teams usually buy and turn desks on.
              </p>
            </div>
            <div className="lg:col-span-8">
              <Accordion type="single" collapsible className="w-full">
                {solution.faqs.map((faq, i) => (
                  <AccordionItem key={faq.q} value={`faq-${i}`}>
                    <AccordionTrigger className="text-left text-[15px] font-medium">{faq.q}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed text-[15px]">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28 border-t border-border/60">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex items-end justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-display font-semibold tracking-tight">
                Other {solution.kind === "size" ? "sizes" : "industries"}
              </h2>
              <Link href="/solutions" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                All solutions →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-16">
              {sameKind.map((s) => (
                <Link key={s.slug} href={`/solutions/${s.slug}`} className="group">
                  <PhotoTile
                    image={s.hero}
                    alt={s.name}
                    title={s.name}
                    subtitle={s.line}
                    live={s.cities[0]}
                    className="aspect-[4/5] rounded-xl mb-2"
                  />
                </Link>
              ))}
            </div>

            <h3 className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary mb-6">
              {solution.kind === "size" ? "By industry" : "By size"}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {otherKind.map((s) => (
                <Link key={s.slug} href={`/solutions/${s.slug}`} className="group">
                  <PhotoTile
                    image={s.hero}
                    alt={s.name}
                    title={s.name}
                    live={s.kind === "size" ? "Size" : "Industry"}
                    className="aspect-[5/4] rounded-xl mb-2"
                  />
                  <p className="text-[11px] text-muted-foreground">{s.line}</p>
                </Link>
              ))}
            </div>

            {solution.kind === "size" && (
              <div className="mt-10">
                <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary mb-4">More industries</p>
                <IndustryGrid />
              </div>
            )}
            {solution.kind === "industry" && (
              <div className="mt-10">
                <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary mb-4">All industries</p>
                <div className="flex flex-wrap gap-2">
                  {otherIndustries.map((i) => (
                    <Link
                      key={i.id}
                      href={industryHref(i)}
                      className="inline-flex h-10 items-center rounded-full border border-border px-4 text-sm font-medium hover:bg-secondary/60"
                    >
                      {i.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
