"use client"

import { motion } from "framer-motion"
import { LayoutList, Workflow, Layers } from "lucide-react"

export function ProblemSolution() {
  return (
    <section className="py-24 md:py-40 bg-background relative">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-primary font-medium mb-6 uppercase tracking-widest text-sm"
        >
          The Problem
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl font-display font-medium leading-tight mb-20 text-muted-foreground"
        >
          &quot;AI makes us faster.&quot; But speed doesn&apos;t matter if you&apos;re still doing the work. You don&apos;t need an assistant. You need an employee.
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-12 text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-foreground">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold">Too many tools.</h3>
            <p className="text-muted-foreground leading-relaxed">Context switching kills productivity. Your company&apos;s data is siloed across dozens of expensive subscriptions.</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col gap-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-foreground">
              <LayoutList className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold">Too many tasks.</h3>
            <p className="text-muted-foreground leading-relaxed">Teams spend more time managing work, updating statuses, and sending emails than doing work that moves the needle.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col gap-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-foreground">
              <Workflow className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold">Too disconnected.</h3>
            <p className="text-muted-foreground leading-relaxed">Processes break down when human bottlenecks delay approvals, context gets lost, and teams fall out of sync.</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
