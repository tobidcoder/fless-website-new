import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Solutions & Playbooks — Fless",
  description:
    "Autonomous AI employee playbooks designed for startups, mid-market businesses, and enterprises across key global markets.",
  alternates: {
    canonical: "https://getfless.com/solutions",
  },
  openGraph: {
    title: "Solutions & Playbooks — Fless",
    description:
      "Autonomous AI employee playbooks designed for startups, mid-market businesses, and enterprises across key global markets.",
    url: "https://getfless.com/solutions",
    siteName: "Fless",
    images: [
      {
        url: "/fless-og.png",
        width: 1200,
        height: 630,
        alt: "Fless Solutions & Playbooks",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Solutions & Playbooks — Fless",
    description:
      "Autonomous AI employee playbooks designed for startups, mid-market businesses, and enterprises.",
    images: ["/fless-og.png"],
  },
}

export default function SolutionsLayout({ children }: { children: React.ReactNode }) {
  return children
}
