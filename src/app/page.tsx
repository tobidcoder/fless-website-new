import type { Metadata } from "next"
import { Header } from "@/components/Header"
import { Hero } from "@/components/Hero"
import { GlobalStats } from "@/components/GlobalStats"
import { LogoMarquee } from "@/components/LogoMarquee"
import { Product } from "@/components/Product"
import { HowItWorks } from "@/components/HowItWorks"
import { Departments } from "@/components/Departments"
import { Industries } from "@/components/Industries"
import { Integrations } from "@/components/Integrations"
import { BuiltDifferent } from "@/components/BuiltDifferent"
import { Testimonials } from "@/components/Testimonials"
import { SecurityFaq } from "@/components/SecurityFaq"
import { AudienceRouter } from "@/components/AudienceRouter"
import { AudienceFaq } from "@/components/AudienceFaq"
import { Footer } from "@/components/Footer"

export const metadata: Metadata = {
  title: "Fless — AI employees that do the work",
  description:
    "Fless lets businesses hire AI employees by department. They plan, write and publish real work, and you approve before anything goes live. Marketing is live today; 18 businesses in pilot across Nigeria, the UK and North America.",
  alternates: {
    canonical: "https://getfless.com",
  },
  openGraph: {
    title: "Fless — AI employees that do the work",
    description:
      "Hire AI employees by department. They do the work; you approve what ships. Marketing is live today.",
    url: "https://getfless.com",
    siteName: "Fless",
    images: [
      {
        url: "/fless-og.png",
        width: 1200,
        height: 630,
        alt: "Fless — AI employees that do the work",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fless — AI employees that do the work",
    description:
      "Deploy autonomous AI employees starting with Marketing. 18 businesses in pilot across Nigeria, the UK, and North America.",
    images: ["/fless-og.png"],
  },
}

const homeSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://getfless.com/#webpage",
  url: "https://getfless.com",
  name: "Fless — AI employees that do the work",
  description:
    "Hire AI employees by department. They do the work; you approve what ships. Marketing is live today.",
  isPartOf: {
    "@type": "WebSite",
    "@id": "https://getfless.com/#website",
    name: "Fless",
    url: "https://getfless.com",
  },
  about: {
    "@type": "Thing",
    name: "AI Employees",
    description:
      "Autonomous AI employees that plan, write, design, and execute department workflows with human approval gates.",
  },
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
      />
      <Header />
      <main className="flex-1">
        <Hero />
        <GlobalStats />
        <AudienceRouter />
        <LogoMarquee />
        <Product />
        <HowItWorks />
        <Departments />
        <Industries />
        <Integrations />
        <BuiltDifferent />
        <Testimonials />
        <SecurityFaq />
        <AudienceFaq />
      </main>
      <Footer />
    </div>
  )
}
