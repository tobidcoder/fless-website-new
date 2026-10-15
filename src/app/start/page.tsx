import { Suspense } from "react"
import type { Metadata } from "next"
import { StartView } from "@/components/StartView"
import { PILOT_BUSINESS_COUNT } from "@/lib/claims"

export const metadata: Metadata = {
  title: "Join the beta — Fless",
  description:
    "Join the Fless beta as a business, apply as a builder, or request the investor deck.",
  alternates: {
    canonical: "https://getfless.com/start",
  },
  openGraph: {
    title: "Join the beta — Fless",
    description:
      "Join the Fless beta as a business, apply as a builder, or request the investor deck.",
    url: "https://getfless.com/start",
    siteName: "Fless",
    images: [
      {
        url: "/fless-og.png",
        width: 1200,
        height: 630,
        alt: "Join the Fless beta",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Join the beta — Fless",
    description:
      `Join the Fless beta. ${PILOT_BUSINESS_COUNT} businesses in pilot.`,
    images: ["/fless-og.png"],
  },
}

export default function StartPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <StartView />
    </Suspense>
  )
}
