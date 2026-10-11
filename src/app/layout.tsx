import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://getfless.com"),
  title: {
    default: "Fless — Infrastructure for AI Employees",
    template: "%s | Fless",
  },
  description:
    "Deploy autonomous AI employees starting with Marketing. Built-in audit logging, human approval gates, and multi-currency billing. 18 businesses in pilot across Nigeria, the UK, and North America.",
  keywords: [
    "AI employees",
    "autonomous workforce",
    "infrastructure for AI employees",
    "AI marketing employee",
    "enterprise AI workforce",
    "Fless",
    "Fless Inc",
    "NVIDIA Inception member",
    "Buffer integration",
    "autonomous marketing",
  ],
  authors: [{ name: "Fless Inc.", url: "https://getfless.com" }],
  creator: "Fless Inc.",
  publisher: "Fless Inc.",
  alternates: {
    canonical: "https://getfless.com",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://getfless.com",
    siteName: "Fless",
    title: "Fless — Infrastructure for AI Employees",
    description:
      "Deploy autonomous AI employees starting with Marketing. Built-in audit logging, human approval gates, and multi-currency billing.",
    images: [
      {
        url: "/fless-og.png",
        width: 1200,
        height: 630,
        alt: "Fless — Infrastructure for AI Employees",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@getfless",
    creator: "@getfless",
    title: "Fless — Infrastructure for AI Employees",
    description:
      "Deploy autonomous AI employees starting with Marketing. 18 businesses in pilot across Nigeria, the UK, and North America.",
    images: ["/fless-og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/fless-mark.png", type: "image/png" }],
    apple: [{ url: "/fless-mark.png", type: "image/png" }],
    shortcut: "/fless-mark.png",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://getfless.com/#organization",
      name: "Fless",
      legalName: "Fless Inc.",
      url: "https://getfless.com",
      logo: "https://getfless.com/fless-mark.png",
      description:
        "Infrastructure for AI employees. Fless enables businesses to deploy autonomous AI employees with strict governance, human approvals, and transparent billing.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "3a Habitat Close, Lekki Phase 1",
        addressLocality: "Lagos",
        addressCountry: "NG",
      },
      memberOf: {
        "@type": "Organization",
        name: "NVIDIA Inception Program",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          email: "hello@getfless.com",
          contactType: "customer service",
        },
        {
          "@type": "ContactPoint",
          email: "security@getfless.com",
          contactType: "technical support",
        },
        {
          "@type": "ContactPoint",
          email: "privacy@getfless.com",
          contactType: "privacy officer",
        },
      ],
      sameAs: [
        "https://x.com/getfless",
        "https://linkedin.com/company/getfless",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://getfless.com/#website",
      url: "https://getfless.com",
      name: "Fless",
      publisher: {
        "@id": "https://getfless.com/#organization",
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://getfless.com/#software",
      name: "Fless",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Cloud",
      description:
        "Autonomous AI employee platform. Deploy Marketing Employees today to plan, draft, design, and schedule multi-channel campaigns with human approval gates.",
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "USD",
        lowPrice: "1600",
        highPrice: "2500",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          storageKey="fless-theme"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
