"use client"

import { motion } from "framer-motion"
import { Check, ArrowRight } from "lucide-react"
import Link from "next/link"

export function NetworkDiagram() {
  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="bg-[#f8f9fa] dark:bg-[#111] rounded-[2.5rem] border border-border/50 p-10 md:p-16 lg:p-20 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-16">
          
          {/* Left Content */}
          <div className="relative z-10 max-w-md w-full shrink-0">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-primary font-medium text-sm mb-4"
            >
              Start in minutes. See impact in days.
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-display font-semibold leading-[1.1] tracking-tight mb-8"
            >
              Your AI workforce is ready.
            </motion.h2>

            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4 mb-10"
            >
              {[
                "No credit card required",
                "Setup in under 2 minutes",
                "Cancel anytime, no questions asked",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-muted-foreground text-sm">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  {item}
                </li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Link
                href="/start"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-8 py-2 text-sm font-medium text-primary-foreground shadow-sm shadow-primary/25 transition-transform hover:bg-primary-hover hover:scale-105 active:scale-95"
              >
                Get started free
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          {/* Right Network Diagram */}
          <div className="relative w-full aspect-square md:aspect-auto md:h-[500px] flex items-center justify-center">
            {/* Concentric circles */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[300px] h-[300px] rounded-full border border-border/60 absolute" />
              <div className="w-[450px] h-[450px] rounded-full border border-border/40 absolute" />
              <div className="w-[600px] h-[600px] rounded-full border border-border/20 absolute hidden md:block" />
            </div>

            {/* Connecting Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M 50 50 L 30 20" stroke="currentColor" strokeWidth="0.5" />
              <path d="M 50 50 L 75 30" stroke="currentColor" strokeWidth="0.5" />
              <path d="M 50 50 L 80 60" stroke="currentColor" strokeWidth="0.5" />
              <path d="M 50 50 L 25 70" stroke="currentColor" strokeWidth="0.5" />
              <path d="M 50 50 L 45 85" stroke="currentColor" strokeWidth="0.5" />
            </svg>

            {/* Central Node */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="relative z-20 w-24 h-24 rounded-2xl bg-primary flex items-center justify-center shadow-xl shadow-primary/20 rotate-[-10deg]"
            >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-white transform rotate-[10deg]">
                <path d="M4 12L8 4H16L20 12L16 20H8L4 12Z" fill="currentColor"/>
              </svg>
            </motion.div>

            {/* Orbiting Nodes */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              {/* Inner Orbit (300px) */}
              <div className="absolute w-[300px] h-[300px]">
                {/* Node 1 */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center animate-[reverse-spin_40s_linear_infinite]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="https://i.pravatar.cc/100?img=33" alt="Avatar" className="w-8 h-8 rounded-full" />
                  </div>
                </div>
                {/* Node 2 */}
                <div className="absolute bottom-6 right-6">
                  <div className="w-12 h-12 rounded-xl bg-white shadow-md flex items-center justify-center animate-[reverse-spin_40s_linear_infinite]">
                    <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center text-white font-bold text-[10px]">S</div>
                  </div>
                </div>
                {/* Node 3 */}
                <div className="absolute bottom-10 left-4">
                  <div className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center animate-[reverse-spin_40s_linear_infinite]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="https://i.pravatar.cc/100?img=12" alt="Avatar" className="w-8 h-8 rounded-full" />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              {/* Outer Orbit (450px) */}
              <div className="absolute w-[450px] h-[450px]">
                {/* Node 1 */}
                <div className="absolute top-10 right-10">
                  <div className="w-12 h-12 rounded-xl bg-white shadow-md flex items-center justify-center animate-[spin_60s_linear_infinite]">
                    <div className="w-6 h-6 bg-red-500 rounded flex items-center justify-center text-white font-bold text-[10px]">M</div>
                  </div>
                </div>
                {/* Node 2 */}
                <div className="absolute bottom-4 left-16">
                  <div className="w-12 h-12 rounded-xl bg-white shadow-md flex items-center justify-center animate-[spin_60s_linear_infinite]">
                    <div className="w-6 h-6 bg-black rounded flex items-center justify-center text-white font-bold text-[10px]">N</div>
                  </div>
                </div>
                {/* Node 3 */}
                <div className="absolute top-1/2 -left-5 -translate-y-1/2">
                  <div className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center animate-[spin_60s_linear_infinite]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="https://i.pravatar.cc/100?img=41" alt="Avatar" className="w-8 h-8 rounded-full" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
