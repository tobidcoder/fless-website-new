import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Documentation & Developer Guide — Fless",
  description:
    "Runtime architecture, stateful supervisor engines, tool permission policy gates, and accelerated compute infrastructure for Fless AI employees.",
  alternates: {
    canonical: "https://getfless.com/docs",
  },
  openGraph: {
    title: "Documentation & Developer Guide — Fless",
    description:
      "Runtime architecture, supervisor engines, policy gates, and GPU-accelerated compute for Fless AI employees.",
    url: "https://getfless.com/docs",
    siteName: "Fless",
    images: [
      {
        url: "/fless-og.png",
        width: 1200,
        height: 630,
        alt: "Fless Documentation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Documentation & Developer Guide — Fless",
    description:
      "Architecture, runtime supervisors, policy gates, and compute specs for Fless AI employees.",
    images: ["/fless-og.png"],
  },
}

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return children
}
