"use client"

import { motion } from "framer-motion"
import { EASE } from "@/components/motion"

// Every route fades in softly on navigation.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, ease: EASE }}>
      {children}
    </motion.div>
  )
}
