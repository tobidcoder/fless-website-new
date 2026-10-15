import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@/components/Analytics";
import { PILOT_LINE_LONG } from "@/lib/claims";
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
    default: "Fless — AI employees that do the work",
    template: "%s | Fless",
  },
  description:
    `Hire AI employees made by builders, or build your own in minutes. They plan, write and publish real work, and you approve before anything goes live. ${PILOT_LINE_LONG}.`,
  keywords: [
    "AI employees",
    "autonomous workforce",
    "build an AI employee",
    "AI employee marketplace",
    "AI marketing employee",
    "enterprise AI workforce",
    "Fless",
    "Brainstack Tech LTD",
    "NVIDIA Inception member",
    "official API integrations",
    "autonomous marketing",
  ],
  authors: [{ name: "Brainstack Tech LTD (trading as Fless)", url: "https://getfless.com" }],
  creator: "Brainstack Tech LTD",
  publisher: "Brainstack Tech LTD",
  alternates: {
    canonical: "https://getfless.com",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://getfless.com",
    siteName: "Fless",
    title: "Fless — AI employees that do the work",
    description:
      "Hire AI employees or build your own. They do the work; you approve what ships.",
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
    site: "@getfless",
    creator: "@getfless",
    title: "Fless — AI employees that do the work",
    description:
      `Hire AI employees or build your own. You approve what ships. ${PILOT_LINE_LONG}.`,
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
    icon: [
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/fless-mark.png", type: "image/png" },
      { url: "/app-icon.png", sizes: "1024x1024", type: "image/png" },
    ],
    apple: [
      { url: "/app-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/app-icon.png",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://getfless.com/#organization",
      name: "Fless",
      legalName: "Brainstack Tech LTD",
      alternateName: ["Fless", "Brainstack Tech LTD trading as Fless"],
      url: "https://getfless.com",
      logo: "https://getfless.com/app-icon.png",
      image: "https://getfless.com/app-icon.png",
      description:
        "Fless lets businesses hire AI employees made by builders, or build their own, with approvals, workspace limits and an activity log.",
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
        "Hire or build AI employees that plan, write and publish real work, with approval before anything goes out."
    },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  return (
    <html lang={locale} suppressHydrationWarning>
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
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
