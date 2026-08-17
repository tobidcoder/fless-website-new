"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { BrandedStage } from "@/components/BrandedStage"

const credentials = [
  { title: "SOC 2 Type II", copy: "Independently audited. Controls you can send to procurement." },
  { title: "Encryption", copy: "AES-256 at rest. TLS in transit. Keys you can rotate." },
  { title: "SSO & SAML", copy: "Fit the identity stack you already have." },
  { title: "Audit log", copy: "Every action, every department, exportable." },
]

const faqs = [
  {
    q: "How is our data used?",
    a: "Only to run your workspace. We don’t train public models on your files, and you own inputs and outputs.",
  },
  {
    q: "Can we run in our own cloud?",
    a: "Enterprise includes VPC and private-region options when compliance requires it.",
  },
  {
    q: "What if something goes wrong?",
    a: "High-risk actions pause for a person. Everything else leaves a trail you can reverse.",
  },
]

export function SecurityFaq() {
  return (
    <section className="py-24 md:py-32 bg-background border-t border-border/60">
      <div className="max-w-[1200px] mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-20">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <BrandedStage
              image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&auto=format&fit=crop&q=80"
              alt="Global headquarters built for procurement"
              label="Audit log"
              rows={[
                { title: "SSO", line: "Okta group mapped", time: "14m" },
                { title: "Export", line: "Q2 log ready", time: "3h" },
                { title: "SOC 2", line: "Pack for procurement", time: "Ready" },
              ]}
              className="aspect-[16/10] rounded-2xl"
            />
          </motion.div>
          <h2 className="text-3xl sm:text-4xl font-display font-semibold tracking-tight leading-[1.12] text-foreground mb-4">
            Built for procurement.
            <br />
            Not a weekend tool.
          </h2>
          <p className="text-[15px] text-muted-foreground leading-relaxed mb-8 max-w-md">
            Security reviews, regions, and access that match how global companies actually buy software.{" "}
            <Link href="/security" className="font-medium text-foreground hover:text-primary">
              Full security page →
            </Link>
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            {credentials.map((c) => (
              <div key={c.title}>
                <div className="text-sm font-semibold text-foreground mb-1">{c.title}</div>
                <p className="text-[13px] text-muted-foreground leading-relaxed">{c.copy}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:pt-4">
          <h3 className="text-xl font-display font-semibold tracking-tight text-foreground mb-6">Questions</h3>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={faq.q} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-base font-medium">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-[15px]">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
