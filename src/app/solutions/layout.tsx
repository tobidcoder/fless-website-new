import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Solutions — Fless",
  description:
    "Fless by company size and industry — healthcare, retail, education, finance, and 30 more sectors.",
}

export default function SolutionsLayout({ children }: { children: React.ReactNode }) {
  return children
}
