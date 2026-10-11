import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact & Enterprise Inquiries — Fless",
  description:
    "Connect with Fless operations. Enterprise walkthroughs, custom security questionnaires, and direct contacts for privacy and security.",
  alternates: {
    canonical: "https://getfless.com/contact",
  },
  openGraph: {
    title: "Contact & Enterprise Inquiries — Fless",
    description:
      "Connect with Fless operations. Enterprise walkthroughs, custom security questionnaires, and direct team contacts.",
    url: "https://getfless.com/contact",
    siteName: "Fless",
    images: [
      {
        url: "/fless-og.png",
        width: 1200,
        height: 630,
        alt: "Contact Fless",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact & Enterprise Inquiries — Fless",
    description:
      "Enterprise walkthroughs, procurement, and direct team contacts at Fless Inc.",
    images: ["/fless-og.png"],
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
