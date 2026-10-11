import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Builders & SDK — Fless",
  description:
    "Build, package, and distribute domain-specific AI employees. Earn 35% revenue share on customer deployments. Request private beta SDK access.",
  alternates: {
    canonical: "https://getfless.com/builders",
  },
  openGraph: {
    title: "Builders & SDK — Fless",
    description:
      "Build, package, and distribute domain-specific AI employees. Earn 35% revenue share on customer deployments. Request private beta SDK access.",
    url: "https://getfless.com/builders",
    siteName: "Fless",
    images: [
      {
        url: "/fless-og.png",
        width: 1200,
        height: 630,
        alt: "Fless Builder SDK",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Builders & SDK — Fless",
    description:
      "Package domain expertise into autonomous AI workers. Earn 35% revenue share. Private beta SDK.",
    images: ["/fless-og.png"],
  },
}

export default function BuildersLayout({ children }: { children: React.ReactNode }) {
  return children
}
