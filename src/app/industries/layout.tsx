import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Industry Playbooks & Workflows — Fless",
  description:
    "Tailored AI employee playbooks for healthcare clinics, retail, fintech, professional consulting, and 30+ sectors across global operating markets.",
  alternates: {
    canonical: "https://getfless.com/industries",
  },
  openGraph: {
    title: "Industry Playbooks & Workflows — Fless",
    description:
      "Tailored AI employee playbooks for healthcare, retail, fintech, consulting, and 30+ sectors. Request custom industry workflows.",
    url: "https://getfless.com/industries",
    siteName: "Fless",
    images: [
      {
        url: "/fless-og.png",
        width: 1200,
        height: 630,
        alt: "Fless Industry Playbooks",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Industry Playbooks & Workflows — Fless",
    description:
      "Tailored AI employee workflows for healthcare, retail, fintech, consulting, and 30+ sectors.",
    images: ["/fless-og.png"],
  },
}

export default function IndustriesLayout({ children }: { children: React.ReactNode }) {
  return children
}
