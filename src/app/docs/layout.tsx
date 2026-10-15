import type { Metadata } from "next"

const title = "Help centre — Fless"
const description =
  "Plain-language guides for Fless: hiring and building AI employees, connecting apps, approvals, workspace limits, Studio, publishing, pricing, payouts, hosting and security."

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "https://getfless.com/docs",
  },
  openGraph: {
    title,
    description,
    url: "https://getfless.com/docs",
    siteName: "Fless",
    images: [{ url: "/fless-og.png", width: 1200, height: 630, alt: "Fless help centre" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/fless-og.png"],
  },
}

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return children
}
