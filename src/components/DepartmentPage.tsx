"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Crown } from "lucide-react"
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
import { departments, type Department } from "@/lib/departments"
import { departmentDetail } from "@/lib/departmentDetail"

export function DepartmentPage({ dept }: { dept: Department }) {
  const others = departments.filter((d) => d.slug !== dept.slug)
  const extra = departmentDetail[dept.slug]

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Header activePage="departments" />
      <main className="flex-1">
        <section className="pt-24 md:pt-28 pb-12 md:pb-16">
          <div className="max-w-[1200px] mx-auto px-6 grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-5">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary mb-4"
              >
                {dept.name} · {dept.markets}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="text-4xl sm:text-5xl lg:text-[52px] font-display font-semibold tracking-tight leading-[1.08] text-foreground"
              >
                {dept.headline}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mt-5 text-[16px] text-muted-foreground leading-relaxed max-w-md"
              >
                {dept.lede}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.16 }}
                className="mt-8"
              >
                <EmailCapture source="department" extra={{ desk: dept.slug }} cta={`Get ${dept.name}`} />
                <Link href="/pricing" className="inline-block mt-4 text-sm font-medium text-muted-foreground hover:text-primary">
                  See pricing →
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.65 }}
              className="lg:col-span-7"
            >
              <BrandedStage
                image={dept.hero}
                alt={dept.heroAlt}
                label={`${dept.name} · live`}
                rows={dept.activity}
                className="rounded-2xl aspect-[16/11]"
              />
            </motion.div>
          </div>
        </section>

        <section className="border-y border-border/60">
          <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-3 divide-x divide-border/60">
            {dept.metrics.map((m, i) => (
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

        {extra && (
          <section className="border-b border-border/60">
            <div className="max-w-[1200px] mx-auto px-6 py-5 flex flex-wrap items-center gap-x-6 gap-y-2">
              <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-primary">Live in</span>
              {extra.cities.map((city) => (
                <span key={city} className="text-sm font-medium text-foreground">
                  {city}
                </span>
              ))}
            </div>
          </section>
        )}

        {extra && (
          <section className="py-20 md:py-28">
            <div className="max-w-[1200px] mx-auto px-6 grid lg:grid-cols-12 gap-12">
              <div className="lg:col-span-6">
                <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary mb-4">How it actually runs</p>
                <h2 className="text-3xl md:text-4xl font-display font-semibold tracking-tight mb-5 max-w-lg">{dept.line}</h2>
                <p className="text-[16px] text-muted-foreground leading-relaxed max-w-xl mb-8">{extra.story}</p>
                <TryCommand desk={dept.slug} prompts={extra.prompts} reply={extra.reply} />
              </div>
              <div className="lg:col-span-6">
                <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-primary mb-4">In practice</p>
                <div className="grid sm:grid-cols-2 gap-px bg-border/70 rounded-2xl overflow-hidden border border-border/70">
                  {extra.plays.map((play) => (
                    <article key={play.title} className="bg-background p-5 md:p-6">
                      <h3 className="text-[15px] font-semibold tracking-tight mb-1.5">{play.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{play.copy}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="py-20 md:py-28 bg-[#fafafa] dark:bg-secondary border-y border-border/60">
          <div className="max-w-[1200px] mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-display font-semibold tracking-tight mb-10 md:mb-14 max-w-xl">
              What {dept.name} actually does.
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {dept.capabilities.map((cap, i) => (
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

        {/* Provisioned AI Employees Section */}
        {dept.employees && dept.employees.length > 0 && (
          <section className="py-20 md:py-28 border-b border-border/60">
            <div className="max-w-[1200px] mx-auto px-6">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
                <div>
                  <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary mb-3">
                    Autonomous Staff · {dept.employees.length} {dept.employees.length === 1 ? "Employee" : "Employees"}
                  </p>
                  <h2 className="text-3xl md:text-4xl font-display font-semibold tracking-tight text-foreground">
                    The {dept.name} Team.
                  </h2>
                </div>
                <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
                  Every employee is dedicated to autonomous execution with specialized domain skills and connected tools.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                {dept.employees.map((emp, i) => (
                  <motion.div
                    key={emp.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="rounded-2xl border border-border/80 bg-card p-5 sm:p-6 flex flex-col justify-between transition-all duration-200 hover:border-primary/40 hover:shadow-sm group"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="relative">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={emp.avatar}
                            alt={emp.name}
                            className="w-12 h-12 rounded-full object-cover ring-2 ring-border/70 group-hover:ring-primary/30 transition-all"
                          />
                          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-background" />
                        </div>
                        {emp.isManager ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 border border-amber-500/20">
                            <Crown className="w-2.5 h-2.5" />
                            Manager
                          </span>
                        ) : (
                          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-primary border border-primary/20">
                            {emp.badge}
                          </span>
                        )}
                      </div>

                      <div className="text-base font-semibold text-foreground tracking-tight">
                        {emp.name}
                      </div>
                      <div className="text-[13px] font-medium text-primary mt-0.5">
                        {emp.role}
                      </div>
                      <p className="text-[13px] text-muted-foreground leading-relaxed mt-2.5">
                        {emp.description}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-border/60">
                      <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                        Core Capabilities
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {emp.skills.map((skill) => (
                          <span
                            key={skill}
                            className="inline-block text-[11px] px-2 py-0.5 rounded-md bg-secondary/80 text-foreground/80 font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {extra && (
          <section className="py-20 md:py-28">
            <div className="max-w-[1200px] mx-auto px-6">
              <h2 className="text-3xl font-display font-semibold tracking-tight mb-12">How teams turn it on</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {extra.steps.map((step) => (
                  <div key={step.n}>
                    <div className="text-[13px] font-medium tabular-nums text-muted-foreground mb-3">{step.n}</div>
                    <h3 className="text-[17px] font-semibold tracking-tight mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.copy}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-16 md:py-24 bg-night text-white">
          <div className="max-w-[1200px] mx-auto px-6 grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <p className="text-2xl md:text-3xl font-display font-medium tracking-tight leading-snug max-w-2xl">
                “{dept.quote.text}”
              </p>
              <p className="mt-6 text-sm text-white/70">
                {dept.quote.author} · {dept.quote.role}
              </p>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <Link href={`/start?desk=${dept.slug}`} className="inline-flex h-11 items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 text-sm font-medium hover:bg-primary-hover">
                Start with {dept.name}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {extra && (
          <section className="py-20 md:py-28">
            <div className="max-w-[1200px] mx-auto px-6 grid lg:grid-cols-12 gap-12">
              <div className="lg:col-span-4">
                <h2 className="text-2xl font-display font-semibold tracking-tight mb-3">Questions</h2>
                <p className="text-sm text-muted-foreground mb-6">Then register — two minutes, no card.</p>
                <EmailCapture source="dept-faq" extra={{ desk: dept.slug }} cta="Register" />
              </div>
              <div className="lg:col-span-8">
                <Accordion type="single" collapsible className="w-full">
                  {extra.faqs.map((faq, i) => (
                    <AccordionItem key={faq.q} value={`d-${i}`}>
                      <AccordionTrigger className="text-left text-[15px] font-medium">{faq.q}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed text-[15px]">{faq.a}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </section>
        )}

        <section className="py-20 md:py-28 border-t border-border/60">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex items-end justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-display font-semibold tracking-tight">The rest of the team</h2>
              <Link href="/#departments" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                All departments →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
              {others.map((d) => (
                <Link key={d.slug} href={`/departments/${d.slug}`} className="group">
                  <PhotoTile
                    image={d.hero}
                    alt={d.name}
                    title={d.name}
                    live={d.activity[0]?.title}
                    className="aspect-[3/4] rounded-xl mb-2"
                  />
                  <p className="text-[11px] text-muted-foreground leading-snug">{d.line}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
