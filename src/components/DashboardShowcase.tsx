"use client"

import { motion } from "framer-motion"
import { BarChart, Bar, ResponsiveContainer, XAxis, Cell } from "recharts"
import { Bell, Search, Command, CheckCircle2, Circle } from "lucide-react"

export function DashboardShowcase() {
  const chartData = [
    { name: "Mon", value: 400 },
    { name: "Tue", value: 300 },
    { name: "Wed", value: 550 },
    { name: "Thu", value: 450 },
    { name: "Fri", value: 700 },
    { name: "Sat", value: 200 },
    { name: "Sun", value: 350 },
  ]

  return (
    <section id="product" className="py-24 md:py-40 bg-background relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-medium mb-6 uppercase tracking-widest text-sm"
          >
            The Operating System
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-medium leading-tight mb-6"
          >
            A command center for<br />
            your entire business.
          </motion.h2>
        </div>

        {/* MacBook Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Laptop Screen Frame */}
          <div className="relative rounded-t-3xl border-[8px] border-b-0 border-foreground/5 dark:border-foreground/20 bg-background shadow-2xl overflow-hidden aspect-[16/10] flex flex-col">
            {/* Fake browser/app header */}
            <div className="h-12 border-b border-border flex items-center justify-between px-4 bg-secondary/50">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive/50" />
                <div className="w-3 h-3 rounded-full bg-warning/50" />
                <div className="w-3 h-3 rounded-full bg-success/50" />
              </div>
              <div className="flex items-center gap-4">
                <Bell className="w-4 h-4 text-muted-foreground" />
                <div className="w-6 h-6 rounded-full bg-primary/20" />
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="flex-1 grid grid-cols-12 bg-secondary/20 p-6 gap-6 relative">
              {/* Sidebar */}
              <div className="col-span-3 space-y-6 hidden md:block">
                <div className="bg-background rounded-xl p-4 border border-border shadow-sm">
                  <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-3">Departments</div>
                  <div className="space-y-2">
                    {["Marketing", "Sales", "Support", "Finance"].map((d, i) => (
                      <div key={d} className={`h-8 rounded-md flex items-center px-3 text-sm font-medium ${i === 0 ? "bg-primary/10 text-primary" : "text-muted-foreground"}`}>
                        {d}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="col-span-12 md:col-span-9 space-y-6">
                {/* Search Bar */}
                <div className="bg-background rounded-xl p-3 border border-border shadow-sm flex items-center gap-3">
                  <Search className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground flex-1">&quot;Create next week&apos;s marketing campaign...&quot;</span>
                  <div className="hidden sm:flex items-center gap-1 text-xs font-mono text-muted-foreground bg-secondary px-2 py-1 rounded">
                    <Command className="w-3 h-3" /> K
                  </div>
                </div>

                {/* Grid */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="bg-background rounded-xl p-5 border border-border shadow-sm h-64 flex flex-col">
                    <h4 className="font-semibold text-sm mb-4">Department Output</h4>
                    <div className="flex-1 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                          <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                            {
                              chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={index === 4 ? "hsl(var(--primary))" : "hsl(var(--primary) / 0.2)"} />
                              ))
                            }
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="bg-background rounded-xl p-5 border border-border shadow-sm h-64 overflow-hidden relative">
                    <h4 className="font-semibold text-sm mb-4">Activity Timeline</h4>
                    <div className="space-y-6">
                      <div className="flex gap-3 items-start relative">
                        <div className="absolute left-2.5 top-6 bottom-[-20px] w-[1px] bg-border" />
                        <CheckCircle2 className="w-5 h-5 text-success mt-0.5 relative z-10 bg-background" />
                        <div>
                          <p className="text-sm font-medium">Email campaign drafted</p>
                          <p className="text-xs text-muted-foreground">Marketing Bot • 2m ago</p>
                        </div>
                      </div>
                      <div className="flex gap-3 items-start">
                        <Circle className="w-5 h-5 text-muted-foreground mt-0.5 relative z-10 bg-background" />
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Qualifying new leads</p>
                          <p className="text-xs text-muted-foreground">Sales Bot • In progress</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Element */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="hidden md:block absolute right-12 bottom-12 bg-background/80 backdrop-blur-md border border-border p-4 rounded-xl shadow-2xl w-64 z-20"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                  <span className="text-xs font-semibold text-muted-foreground uppercase">Agent Status</span>
                </div>
                <p className="text-sm font-medium">12 active agents running</p>
                <p className="text-xs text-muted-foreground mt-1">45 tasks completed today</p>
              </motion.div>
            </div>
          </div>
          {/* Laptop Base */}
          <div className="h-4 sm:h-6 w-[105%] sm:w-[110%] -ml-[2.5%] sm:-ml-[5%] bg-foreground/10 dark:bg-foreground/20 rounded-b-[2rem] border-t border-border shadow-xl relative z-10" />
        </motion.div>
      </div>
    </section>
  )
}
