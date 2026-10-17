import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Builders & SDK — Fless",
  description:
    "Build, test, and distribute domain-specific AI employees in minutes. Earn 70% revenue share on customer deployments. Join the Employee Studio private beta.",
  alternates: {
    canonical: "https://getfless.com/builders",
  },
  openGraph: {
    title: "Builders & Studio — Fless",
    description:
      "Build, test, and distribute domain-specific AI employees in minutes. Earn 70% revenue share on customer deployments. Join the Employee Studio private beta.",
    url: "https://getfless.com/builders",
    siteName: "Fless",
    images: [
      {
        url: "/fless-og.png",
        width: 1200,
        height: 630,
        alt: "Fless Employee Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Builders & Studio — Fless",
    description:
      "Turn domain expertise into autonomous AI employees in minutes. Earn 70% revenue share with Employee Studio.",
    images: ["/fless-og.png"],
  },
}

export default function BuildersLayout({ children }: { children: React.ReactNode }) {
  return children
}
