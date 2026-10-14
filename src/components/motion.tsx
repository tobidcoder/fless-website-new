"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import {
  animate,
  motion,
  MotionConfig,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  type Variants,
} from "framer-motion"
import { cn } from "@/lib/utils"

// One easing curve for the whole site keeps motion feeling consistent.
export const EASE = [0.22, 1, 0.36, 1] as const

// Honors the visitor's "reduce motion" OS setting everywhere.
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.6, ease: EASE }}>
      {children}
    </MotionConfig>
  )
}

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: EASE } },
}

type Tag = "div" | "section" | "header" | "ul" | "li" | "p" | "h2" | "figure"

// Fades and lifts its content into place the first time it scrolls into view.
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: ReactNode
  className?: string
  delay?: number
  as?: Tag
}) {
  const Component = motion[as]
  return (
    <Component
      className={className}
      variants={revealVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay }}
    >
      {children}
    </Component>
  )
}

// Reveals its StaggerItem children one after another.
export function Stagger({
  children,
  className,
  gap = 0.08,
  as = "div",
}: {
  children: ReactNode
  className?: string
  gap?: number
  as?: Tag
}) {
  const Component = motion[as]
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap } } }}
    >
      {children}
    </Component>
  )
}

export function StaggerItem({
  children,
  className,
  as = "div",
  lift = false,
}: {
  children: ReactNode
  className?: string
  as?: Tag
  /** Raise slightly on hover, for cards. */
  lift?: boolean
}) {
  const Component = motion[as]
  return (
    <Component
      className={className}
      variants={revealVariants}
      whileHover={lift ? { y: -4, transition: { duration: 0.25, ease: EASE } } : undefined}
    >
      {children}
    </Component>
  )
}

// Reveals a headline word by word.
export function WordReveal({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(" ")
  return (
    <motion.span
      className={cn("inline", className)}
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: delay } } }}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "105%", opacity: 0 },
              show: { y: "0%", opacity: 1, transition: { duration: 0.8, ease: EASE } },
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}

// Counts up to a number when it scrolls into view. Non-numeric values render as-is.
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const reduce = useReducedMotion()
  const target = Number(value)
  const numeric = Number.isFinite(target)
  const [shown, setShown] = useState(numeric && !reduce ? "0" : value)

  useEffect(() => {
    if (!inView || !numeric || reduce) return
    const controls = animate(0, target, {
      duration: 1.4,
      ease: EASE,
      onUpdate: (v) => setShown(String(Math.round(v))),
    })
    return () => controls.stop()
  }, [inView, numeric, reduce, target])

  return (
    <span ref={ref} className={className}>
      {shown}
    </span>
  )
}

// Thin brand-coloured bar at the top of the page that tracks scroll position.
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 })
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-primary/60 via-primary to-primary/60"
    />
  )
}
