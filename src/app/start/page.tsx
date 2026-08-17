import { Suspense } from "react"
import type { Metadata } from "next"
import { StartView } from "@/components/StartView"

export const metadata: Metadata = {
  title: "Join the beta — Fless",
  description: "Join the Fless private beta. One product for every department, in every market.",
}

export default function StartPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <StartView />
    </Suspense>
  )
}
