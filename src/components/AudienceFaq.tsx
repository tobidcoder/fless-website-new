"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

type Group = "Businesses" | "Builders" | "Investors"

const groups: Group[] = ["Businesses", "Builders", "Investors"]

const faqs: Record<Group, { q: string; a: string }[]> = {
  Businesses: [
    {
      q: "What is Fless, in plain words?",
      a: "Fless is a place to hire AI employees for your business. Each one covers a department, like marketing. It does the actual work, such as planning campaigns, writing posts and scheduling them, and it asks a person on your team to approve anything important before it goes out.",
    },
    {
      q: "What can it do today?",
      a: "The Marketing employee is live. It turns a brief into a content plan, drafts posts and creative, and publishes approved work to LinkedIn, X, Facebook, Instagram and Bluesky. Voice, Sales, Support, Recruitment, HR, Operations and Finance are in early access, and you can request them now.",
    },
    {
      q: "Will it post or send anything without my say-so?",
      a: "No. Work goes into an approval queue first, and nothing publishes until someone on your team approves it. Every action is written to an audit log you can export.",
    },
    {
      q: "How much does it cost?",
      a: "You pay a monthly workforce rate per AI employee, not per user seat. Marketing currently starts from about $1,600 a month. You see the exact price before you deploy, and you can hire for anything from a few hours to several years. The pricing page has a calculator.",
    },
    {
      q: "Does it work in my country and currency?",
      a: "Fless is built for global teams. You can be billed in USD, GBP, EUR, NGN, KES, GHS, ZAR or AED, with local invoices. Our current pilots run in Nigeria, the UK and North America.",
    },
    {
      q: "What happens to our data?",
      a: "We use it only to run your workspace. We don't train public models on it, and you own everything you put in and everything Fless produces. Data is encrypted in transit and at rest, and a SOC 2 audit is in progress.",
    },
  ],
  Builders: [
    {
      q: "What is a Fless builder?",
      a: "A developer or domain expert who packages an AI employee, such as a clinic receptionist or a sales assistant, using the Fless SDK, then publishes it to the Fless marketplace for businesses to hire.",
    },
    {
      q: "How do I get paid?",
      a: "You earn 35% of every subscription and every metered-usage charge, paid out monthly. Fless keeps 65%, which covers computing, security, billing and distribution.",
    },
    {
      q: "What does Fless handle for me?",
      a: "Hosting and GPU computing, credential storage, voice and messaging plugins, multi-currency billing, invoicing and payouts. You focus on the employee's knowledge, prompts and workflow.",
    },
    {
      q: "How do I get access?",
      a: "The SDK is in private beta. Apply on the builders page and we'll add you to the next builder cohort.",
    },
  ],
  Investors: [
    {
      q: "What does Fless do, in one sentence?",
      a: "Fless is infrastructure for AI employees: businesses hire them by department, builders create and sell them, and Fless runs the computing, governance and billing in between.",
    },
    {
      q: "What stage is the company at?",
      a: "Pre-seed. The Marketing employee is live with pilot customers, and seven more departments are in early access.",
    },
    {
      q: "What traction do you have?",
      a: "18 businesses are in pilot across Nigeria, the UK and North America. Marketing publishes directly to five social networks through their official APIs. Fless is a member of the NVIDIA Inception program.",
    },
    {
      q: "How does Fless make money?",
      a: "Two ways. First, businesses pay monthly workforce rates for each AI employee they hire, plus metered usage. Second, Fless keeps 65% of revenue from employees that builders publish on the marketplace.",
    },
    {
      q: "How do I get in touch about investing or an accelerator program?",
      a: "Email hello@getfless.com with \"Investor\" or \"Accelerator\" in the subject line, or see the company overview page for the short version of the story.",
    },
  ],
}

const links: Record<Group, { label: string; href: string }> = {
  Businesses: { label: "See pricing", href: "/pricing" },
  Builders: { label: "Builder program", href: "/builders" },
  Investors: { label: "Company overview", href: "/investors" },
}

export function AudienceFaq() {
  const [group, setGroup] = useState<Group>("Businesses")

  return (
    <section id="faq" className="py-20 md:py-28 bg-[#fafafa] dark:bg-secondary border-t border-border/60">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-4">
          <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary mb-4">FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-display font-semibold tracking-tight leading-[1.12] text-foreground mb-4">
            Straight answers.
          </h2>
          <p className="text-[15px] text-muted-foreground leading-relaxed mb-7 max-w-sm">
            Pick who you are. Can&apos;t find your question? Email{" "}
            <a href="mailto:hello@getfless.com" className="font-medium text-foreground underline underline-offset-4 hover:text-primary">
              hello@getfless.com
            </a>
            .
          </p>
          <div role="tablist" aria-label="FAQ audience" className="inline-flex flex-wrap gap-2">
            {groups.map((g) => (
              <button
                key={g}
                type="button"
                role="tab"
                aria-selected={group === g}
                onClick={() => setGroup(g)}
                className={cn(
                  "h-10 rounded-full px-4 text-[14px] font-medium transition-colors border",
                  group === g
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-muted-foreground border-border hover:text-foreground"
                )}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-8 min-w-0">
          <Accordion type="single" collapsible defaultValue="item-0" key={group} className="w-full">
            {faqs[group].map((faq, i) => (
              <AccordionItem key={faq.q} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-[16px] sm:text-[17px] font-medium py-5 gap-4">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-[15px] pb-5 max-w-2xl">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <Link
            href={links[group].href}
            className="mt-7 inline-flex h-11 items-center rounded-full border border-border bg-background px-5 text-[14px] font-medium text-foreground hover:border-primary/40 transition-colors"
          >
            {links[group].label} →
          </Link>
        </div>
      </div>
    </section>
  )
}
