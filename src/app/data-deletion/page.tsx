import type { Metadata } from "next"
import { LegalDoc, Section } from "@/components/LegalDoc"

export const metadata: Metadata = {
  title: "User Data Deletion & Privacy Instructions — Fless",
  description:
    "How to disconnect connected accounts (Meta, Google, LinkedIn, TikTok), request deletion of your personal data, and track deletion requests on Fless.",
  alternates: {
    canonical: "https://getfless.com/data-deletion",
  },
  openGraph: {
    title: "User Data Deletion Instructions — Fless",
    description:
      "Step-by-step instructions for disconnecting OAuth integrations and requesting deletion of your personal and workspace data.",
    url: "https://getfless.com/data-deletion",
    siteName: "Fless",
    images: [
      {
        url: "/fless-og.png",
        width: 1200,
        height: 630,
        alt: "Fless Data Deletion Instructions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "User Data Deletion Instructions — Fless",
    description:
      "How to delete your data and disconnect third-party integrations from Fless.",
    images: ["/fless-og.png"],
  },
}

const nav = [
  { id: "overview", title: "Overview" },
  { id: "self-serve", title: "Disconnecting integrations" },
  { id: "workspace", title: "Workspace & account deletion" },
  { id: "meta", title: "Meta (Facebook & Instagram) instructions" },
  { id: "google", title: "Google account revocation" },
  { id: "other-platforms", title: "LinkedIn, TikTok & other platforms" },
  { id: "manual", title: "Manual deletion requests" },
  { id: "retention", title: "Retention & purge timeline" },
  { id: "contact", title: "Legal contact" },
]

export default function DataDeletionPage() {
  return (
    <LegalDoc
      eyebrow="Compliance"
      title="User Data Deletion Instructions"
      lede="You own your data. You can disconnect connected accounts, revoke access tokens, or delete your entire workspace at any time. This page explains how."
      updated="12 October 2026"
      nav={nav}
      current="/data-deletion"
    >
      <Section id="overview" title="Overview">
        <p>
          Fless connects to third-party platforms (including Meta, Google, LinkedIn, TikTok, X, and others) only to perform actions you authorize. When you disconnect a service or request account deletion, we immediately revoke active tokens and purge associated platform data.
        </p>
        <p>
          Brainstack Tech LTD (trading as Fless) acts as the data controller for account details and the data processor for your workspace content. We do not sell your personal data or store credentials longer than needed to operate your desks.
        </p>
      </Section>

      <Section id="self-serve" title="Disconnecting integrations in Fless">
        <p>
          If you want to stop Fless from accessing a specific connected platform without deleting your entire workspace:
        </p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Sign in to your Fless account at <a href="https://app.getfless.com" className="text-primary hover:underline">app.getfless.com</a>.</li>
          <li>Navigate to <strong>Settings</strong> → <strong>Integrations</strong>.</li>
          <li>Find the platform you want to disconnect (e.g., Facebook Pages, Instagram, Google Workspace, LinkedIn, or TikTok).</li>
          <li>Click <strong>Disconnect</strong>.</li>
        </ol>
        <p>
          Disconnecting revokes the OAuth token and marks the connection as inactive immediately. Cached tokens and channel mappings are deleted from our production database within 24 hours.
        </p>
      </Section>

      <Section id="workspace" title="Workspace & account deletion">
        <p>
          Workspace owners can delete their entire workspace and all associated customer data directly from the settings menu:
        </p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Sign in to <a href="https://app.getfless.com" className="text-primary hover:underline">app.getfless.com</a> as an account owner or administrator.</li>
          <li>Go to <strong>Settings</strong> → <strong>Workspace</strong>.</li>
          <li>Scroll to the danger zone and click <strong>Delete Workspace</strong>.</li>
          <li>Confirm by typing your workspace name.</li>
        </ol>
        <p>
          This permanently disconnects all connected accounts, wipes briefs, drafts, generated assets, logs, and credentials. Production database records are purged within 30 days.
        </p>
      </Section>

      <Section id="meta" title="Meta (Facebook, Instagram & Threads) instructions">
        <p>
          In accordance with Meta Platform Rules, users who logged in or connected Facebook Pages, Instagram accounts, or Threads can remove the Fless app and delete stored data directly from Meta:
        </p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Open your Facebook profile and navigate to <strong>Settings & Privacy</strong> → <strong>Settings</strong>.</li>
          <li>Click <strong>Apps and Websites</strong> in the left-hand menu.</li>
          <li>Locate <strong>Fless</strong> in the list of active apps.</li>
          <li>Click <strong>Remove</strong>. Check the box if you wish to remove all posts, videos, or events published on your behalf.</li>
        </ol>
        <p>
          <strong>Automated Deletion Callback:</strong> When you remove Fless via Facebook, Meta sends an automated request to our compliance webhook endpoint:
        </p>
        <div className="bg-muted/50 p-4 rounded-lg font-mono text-xs text-foreground/80 break-all my-3">
          https://api.getfless.com/api/v1/webhooks/meta/data-deletion
        </div>
        <p>
          Our system verifies the signed request, starts a deletion job to remove your user ID, Page tokens, and cached engagement data, and returns a tracking confirmation code.
        </p>
        <p>
          To check the status of a Meta data deletion job, visit our status endpoint using the confirmation code provided by Facebook:
        </p>
        <div className="bg-muted/50 p-4 rounded-lg font-mono text-xs text-foreground/80 break-all my-3">
          https://api.getfless.com/api/v1/webhooks/meta/data-deletion/[CONFIRMATION_CODE]
        </div>
      </Section>

      <Section id="google" title="Google account revocation">
        <p>
          If you connected Gmail, Google Calendar, YouTube, Google Analytics, or Google Drive, you can revoke Fless access directly from your Google Account at any time:
        </p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Visit your Google Account Security settings at <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">myaccount.google.com/permissions</a>.</li>
          <li>Select <strong>Fless</strong> under &quot;Third-party apps with account access&quot;.</li>
          <li>Click <strong>Remove Access</strong>.</li>
        </ol>
        <p>
          Once revoked, Fless cannot make calls to Google APIs on your behalf. We automatically discard stored refresh tokens upon the next failed refresh attempt.
        </p>
      </Section>

      <Section id="other-platforms" title="LinkedIn, TikTok & other platforms">
        <p>
          You can revoke permissions on other provider portals at any time:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>LinkedIn:</strong> Go to <em>Settings & Privacy</em> → <em>Data privacy</em> → <em>Permitted services</em> and remove Fless.</li>
          <li><strong>TikTok:</strong> Go to <em>Settings and privacy</em> → <em>Security & permissions</em> → <em>Apps and permissions</em> and revoke Fless.</li>
          <li><strong>X (Twitter):</strong> Go to <em>Settings and Support</em> → <em>Settings and privacy</em> → <em>Security and account access</em> → <em>Apps and sessions</em> → <em>Connected apps</em>.</li>
          <li><strong>Pinterest, Slack, HubSpot, Calendly:</strong> Revoke Fless inside each service’s respective Connected Apps or Integrations page.</li>
        </ul>
      </Section>

      <Section id="manual" title="Manual deletion requests">
        <p>
          If you cannot access your account or wish to request full deletion of all personal information held by Fless, send an email to our privacy team:
        </p>
        <div className="bg-muted/40 border border-border p-5 rounded-lg space-y-2 my-4">
          <p className="font-medium text-foreground">Email: <a href="mailto:privacy@getfless.com" className="text-primary underline">privacy@getfless.com</a></p>
          <p className="text-xs text-muted-foreground">Subject line: Data Deletion Request — [Your Company or Account Email]</p>
          <p className="text-xs text-muted-foreground">Include: The email address registered with Fless, the workspace name, and any connected platform IDs you want confirmed deleted.</p>
        </div>
        <p>
          We verify your identity, process the deletion within 48 hours, and email you written confirmation when the purge is complete.
        </p>
      </Section>

      <Section id="retention" title="Retention & purge timeline">
        <p>
          Here is how quickly data is removed once a deletion request or disconnect event occurs:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>OAuth Access & Refresh Tokens:</strong> Revoked immediately and deleted from the database within 24 hours.</li>
          <li><strong>Cached Content & Posts:</strong> Cleared from active memory and application caches within 24 hours.</li>
          <li><strong>Primary Database Records:</strong> Removed from production databases within 30 days.</li>
          <li><strong>Encrypted Backups:</strong> Purged automatically through routine backup cycle rotation within 90 days.</li>
        </ul>
        <p>
          We retain only minimal accounting transaction records where required by tax law or statutory compliance obligations.
        </p>
      </Section>

      <Section id="contact" title="Legal contact">
        <p>
          For questions regarding data privacy, compliance audits, or deletion requests, contact our Data Protection Officer:
        </p>
        <p>
          <strong>Brainstack Tech LTD</strong> (trading as Fless)<br />
          RC Registered in Nigeria<br />
          3a Habitat Close, Lekki Phase 1, Lagos, Nigeria<br />
          Email: <a href="mailto:privacy@getfless.com" className="text-primary hover:underline">privacy@getfless.com</a> or <a href="mailto:hello@getfless.com" className="text-primary hover:underline">hello@getfless.com</a>
        </p>
      </Section>
    </LegalDoc>
  )
}
