"use client"

import { motion } from "framer-motion"
import { Target, LayoutGrid, FolderOpen, BarChart3, Puzzle, ShieldCheck, ArrowUpRight } from "lucide-react"

export function FeaturesBento() {
  const features = [
    {
      title: "Command Center",
      description: "Give commands, get insights and control your AI team.",
      icon: Target,
      color: "text-primary",
      bg: "bg-primary/10"
    },
    {
      title: "Content Studio",
      description: "Create, edit and publish content across all channels.",
      icon: LayoutGrid,
      color: "text-[#3b82f6]",
      bg: "bg-[#3b82f6]/10"
    },
    {
      title: "Knowledge Base",
      description: "Store, organize and use your business knowledge.",
      icon: FolderOpen,
      color: "text-[#f59e0b]",
      bg: "bg-[#f59e0b]/10"
    },
    {
      title: "Advanced Analytics",
      description: "Track performance and get AI-powered insights.",
      icon: BarChart3,
      color: "text-[#10b981]",
      bg: "bg-[#10b981]/10"
    },
    {
      title: "Integrations",
      description: "Connect your favorite tools and automate workflows.",
      icon: Puzzle,
      color: "text-primary",
      bg: "bg-primary/10"
    },
    {
      title: "Enterprise Security",
      description: "Your data is secure with enterprise-grade protection.",
      icon: ShieldCheck,
      color: "text-[#3b82f6]",
      bg: "bg-[#3b82f6]/10"
    }
  ]

  return (
    <section className="py-24 md:py-32 bg-[#fafafa] dark:bg-[#111] relative">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-semibold leading-tight mb-6 text-foreground"
          >
            Everything you need. All in one place.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            Fless combines AI employees, smart tools and your business data in one beautiful workspace—so you can focus on what matters.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-background rounded-2xl p-8 border border-border shadow-sm hover:shadow-md transition-all hover:border-border/80 flex flex-col relative h-[220px]"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${feature.bg} ${feature.color}`}>
                <feature.icon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-[250px]">
                {feature.description}
              </p>
              
              <div className="absolute bottom-6 right-6 text-muted-foreground/50 group-hover:text-foreground transition-colors">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
