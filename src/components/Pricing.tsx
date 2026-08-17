"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"

export function Pricing() {
  const plans = [
    {
      name: "Startup",
      price: "$999",
      period: "/mo",
      description: "For small teams starting their automation journey.",
      features: [
        "Up to 3 AI Employees",
        "1,000 tasks per month",
        "Standard integrations",
        "Community support",
      ],
      highlighted: false,
    },
    {
      name: "Growth",
      price: "$2,499",
      period: "/mo",
      description: "For scaling businesses that need serious power.",
      features: [
        "Up to 10 AI Employees",
        "10,000 tasks per month",
        "Advanced integrations",
        "Custom workflows",
        "Priority support",
        "Dedicated success manager",
      ],
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For large organizations with complex needs.",
      features: [
        "Unlimited AI Employees",
        "Unlimited tasks",
        "Custom LLM fine-tuning",
        "On-premise deployment",
        "SLA guarantee",
        "24/7 phone support",
      ],
      highlighted: false,
    },
  ]

  return (
    <section id="pricing" className="py-24 md:py-40 bg-secondary/30 relative">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-medium leading-tight mb-6"
          >
            Simple, transparent pricing.
          </motion.h2>
          <motion.p
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="text-lg text-muted-foreground"
          >
            Pay for the value you get, not the seats you add.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
              className={`p-8 rounded-[2rem] border ${
                plan.highlighted 
                  ? "bg-background border-primary shadow-2xl scale-100 md:scale-105 relative z-10" 
                  : "bg-background border-border shadow-sm"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider px-4 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
              <p className="text-muted-foreground text-sm mb-6 h-10">{plan.description}</p>
              
              <div className="mb-8">
                <span className="text-4xl font-display font-bold">{plan.price}</span>
                <span className="text-muted-foreground">{plan.period}</span>
              </div>

              <button className={`w-full h-12 rounded-full font-medium transition-colors mb-8 ${
                plan.highlighted
                  ? "bg-primary text-primary-foreground hover:bg-primary-hover"
                  : "bg-secondary text-foreground hover:bg-secondary/80"
              }`}>
                Get Started
              </button>

              <div className="space-y-4">
                {plan.features.map(feature => (
                  <div key={feature} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 shrink-0 ${plan.highlighted ? "text-primary" : "text-muted-foreground"}`} />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
