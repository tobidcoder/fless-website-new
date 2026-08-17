import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Solutions — Fless",
  description:
    "Fless by company size and industry. Startup, SMB, Enterprise, Agency. Healthcare, Education, Retail, Finance, Hospitality, Professional services.",
}

export default function SolutionsLayout({ children }: { children: React.ReactNode }) {
  return children
}
