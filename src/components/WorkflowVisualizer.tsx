"use client"

import { motion } from "framer-motion"
import { Users, BookOpen, Search, PenTool, Palette, Send, Sparkles } from "lucide-react"

export function WorkflowVisualizer() {
  const steps = [
    { icon: BookOpen, label: "Content Planner" },
    { icon: Search, label: "Researcher" },
    { icon: PenTool, label: "Writer" },
    { icon: Palette, label: "Designer" },
    { icon: Send, label: "Publisher" },
  ]

  return (
    <section className="py-24 md:py-40 bg-background relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-medium mb-6 uppercase tracking-widest text-sm"
          >
            Agent Workflows
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-medium leading-tight"
          >
            Complex processes.<br />
            Fully automated.
          </motion.h2>
        </div>

        <div className="max-w-5xl mx-auto bg-secondary/20 border border-border rounded-[2rem] p-8 md:p-16 relative">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 relative z-10">
            {/* Start */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center gap-3 shrink-0"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg">
                <Users className="w-8 h-8" />
              </div>
              <span className="font-semibold text-sm">Marketing Team</span>
            </motion.div>

            {/* Steps Container */}
            <div className="flex-1 w-full relative py-8 md:py-0">
              <div className="hidden md:block absolute top-[24px] left-0 right-0 h-[2px] bg-border -z-10" />
              <div className="block md:hidden absolute left-1/2 top-0 bottom-0 w-[2px] bg-border -translate-x-1/2 -z-10" />
              
              <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0 h-full">
                {steps.map((step, i) => (
                  <motion.div
                    key={step.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 + 0.2 }}
                    className="flex flex-col items-center gap-3 relative group bg-secondary/20 md:bg-transparent p-2 md:p-0 rounded-xl"
                  >
                    <div className="w-12 h-12 rounded-xl bg-background border border-border flex items-center justify-center text-foreground group-hover:border-primary/50 group-hover:text-primary transition-colors shadow-sm">
                      <step.icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors absolute -bottom-6 w-32 text-center left-1/2 -translate-x-1/2 hidden md:block">{step.label}</span>
                    <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors block md:hidden">{step.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* End */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1 }}
              className="flex flex-col items-center gap-3 shrink-0"
            >
              <div className="w-16 h-16 rounded-2xl bg-success flex items-center justify-center text-success-foreground shadow-lg relative">
                <Sparkles className="w-8 h-8" />
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute inset-0 rounded-2xl border-2 border-success/50" 
                />
              </div>
              <span className="font-semibold text-sm text-success">Results Delivered</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
