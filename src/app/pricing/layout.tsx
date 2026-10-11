import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pricing & Workforce Rates — Fless",
  description:
    "Predictable AI employee pricing from $1,600 to $2,500/month ($35–$55/hour) for Marketing. Multi-currency billing in USD, NGN, GBP, EUR. Unused tenure refunded pro-rata.",
  alternates: {
    canonical: "https://getfless.com/pricing",
  },
  openGraph: {
    title: "Pricing & Workforce Rates — Fless",
    description:
      "Predictable AI employee pricing from $1,600 to $2,500/month ($35–$55/hour) for Marketing. Invoiced in local currency. Unused tenure refunded pro-rata.",
    url: "https://getfless.com/pricing",
    siteName: "Fless",
    images: [
      {
        url: "/fless-og.png",
        width: 1200,
        height: 630,
        alt: "Fless Workforce Pricing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing & Workforce Rates — Fless",
    description:
      "Predictable AI employee pricing from $1,600 to $2,500/month ($35–$55/hour) for Marketing. Unused tenure refunded pro-rata.",
    images: ["/fless-og.png"],
  },
}

const pricingFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How does hiring an AI employee compare to traditional SaaS seat subscriptions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Fless contracts autonomous AI employees for the tenure your business requires — whether hours, weeks, months, or up to 5 years — rather than charging for software seats.",
      },
    },
    {
      "@type": "Question",
      name: "How much does the Fless Marketing Employee cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Marketing Employee costs $1,600 to $2,500 per month (or $35 to $55 per hour), with volume tenure discounts up to 25% on annual agreements. Unused tenure is refunded pro-rata.",
      },
    },
    {
      "@type": "Question",
      name: "How does global multi-currency billing work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Fless supports payments and localized invoicing in USD, NGN, GBP, EUR, KES, GHS, ZAR, and AED without international bank markup fees.",
      },
    },
    {
      "@type": "Question",
      name: "Can I cancel and receive a refund for unused tenure?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You can decommission an employee deployment whenever capacity is no longer required. Eligible unused tenure is refunded pro-rata according to contract terms.",
      },
    },
    {
      "@type": "Question",
      name: "Do enterprise contracts offer custom SLAs?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Enterprise order forms provide guaranteed response times, 99.9% uptime service credits, dedicated private regions or VPC deployment, and a named customer success manager.",
      },
    },
  ],
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingFaqSchema) }}
      />
      {children}
    </>
  )
}
