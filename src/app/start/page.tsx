import { Suspense } from "react"
import type { Metadata } from "next"
import { StartView } from "@/components/StartView"

export const metadata: Metadata = {
  title: "Join the Beta & Deploy — Fless",
  description:
    "Apply for private beta access to deploy Fless AI employees. Onboard with dedicated department desks, human approval gates, and multi-currency billing.",
  alternates: {
    canonical: "https://getfless.com/start",
  },
  openGraph: {
    title: "Join the Beta & Deploy — Fless",
    description:
      "Apply for private beta access to deploy Fless AI employees. Onboard with dedicated department desks, human approval gates, and multi-currency billing.",
    url: "https://getfless.com/start",
    siteName: "Fless",
    images: [
      {
        url: "/fless-og.png",
        width: 1200,
        height: 630,
        alt: "Join the Fless Beta",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Join the Beta & Deploy — Fless",
    description:
      "Apply for private beta access to deploy Fless AI employees. 18 businesses in pilot.",
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
