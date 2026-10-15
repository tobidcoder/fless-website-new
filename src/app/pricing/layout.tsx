import type { Metadata } from "next"

const description =
  "Fless pricing: a workspace plan from free to Enterprise, builder-set prices for marketplace employees, and work credits with a spending cap you control. Local prices in Nigeria, Ghana, Kenya and South Africa."

export const metadata: Metadata = {
  title: "Pricing — Fless",
  description,
  alternates: {
    canonical: "https://getfless.com/pricing",
  },
  openGraph: {
    title: "Pricing — Fless",
    description,
    url: "https://getfless.com/pricing",
    siteName: "Fless",
    images: [{ url: "/fless-og.png", width: 1200, height: 630, alt: "Fless pricing" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing — Fless",
    description,
    images: ["/fless-og.png"],
  },
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children
}
