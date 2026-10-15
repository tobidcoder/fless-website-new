import type { Metadata } from "next"

const title = "Build AI employees and earn — Fless Builders"
const description =
  "Describe an AI employee in Fless Studio, test it live and publish it to the marketplace. No code. You keep 70% of what it earns, paid out worldwide."

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "https://getfless.com/builders",
  },
  openGraph: {
    title,
    description,
    url: "https://getfless.com/builders",
    siteName: "Fless",
    images: [{ url: "/fless-og.png", width: 1200, height: 630, alt: "Build AI employees on Fless" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/fless-og.png"],
  },
}

export default function BuildersLayout({ children }: { children: React.ReactNode }) {
  return children
}
