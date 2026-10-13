import type { Metadata } from "next"
import Link from "next/link"
import { LegalDoc, Section } from "@/components/LegalDoc"

export const metadata: Metadata = {
  title: "Privacy Policy — Fless",
  description:
    "How Brainstack Tech LTD (trading as Fless) collects, processes, and safeguards business and customer data. Aligned with NDPR, GDPR, and international data protection standards.",
  alternates: {
    canonical: "https://getfless.com/privacy",
  },
  openGraph: {
    title: "Privacy Policy — Fless",
    description:
      "How Brainstack Tech LTD (trading as Fless) collects, processes, and safeguards business and customer data. Aligned with NDPR, GDPR, and international data protection standards.",
    url: "https://getfless.com/privacy",
    siteName: "Fless",
    images: [
      {
        url: "/fless-og.png",
        width: 1200,
        height: 630,
        alt: "Fless Privacy Policy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy — Fless",
    description:
      "Data handling, retention, and international compliance policies of Brainstack Tech LTD (trading as Fless).",
    images: ["/fless-og.png"],
  },
}

const nav = [
  { id: "who", title: "Who we are" },
  { id: "scope", title: "What this covers" },
  { id: "collect", title: "Data we collect" },
  { id: "integrations", title: "Connected platforms & OAuth" },
  { id: "use", title: "How we use it" },
  { id: "ai", title: "AI, models, and your work" },
  { id: "share", title: "When we share data" },
  { id: "transfers", title: "International transfers" },
  { id: "retention", title: "Retention" },
  { id: "deletion", title: "Data deletion & revocation" },
  { id: "rights", title: "Your rights" },
  { id: "cookies", title: "Cookies" },
  { id: "children", title: "Children" },
  { id: "changes", title: "Changes" },
  { id: "contact", title: "Contact" },
]

export default function PrivacyPage() {
  return (
    <LegalDoc
      eyebrow="Legal"
      title="Privacy Policy"
      lede="We collect what we need to run your workspace — not to sell a profile of your company. This policy explains what that means in practice."
      updated="12 October 2026"
      nav={nav}
      current="/privacy"
    >
      <Section id="who" title="Who we are">
        <p>
          Brainstack Tech LTD (“Brainstack Tech LTD”, trading as “Fless”, “we”, “us”) operates from 3a Habitat Close, Lekki Phase 1, Lagos, Nigeria, with registered entity Brainstack Tech LTD (Nigeria, CAC) and planned international headquarters in Delaware, USA. We provide an AI workforce platform: marketing, sales, voice, support, hiring, finance, operations, and HR desks that run from one workspace, in every market you operate.
        </p>
        <p>
          For questions about this policy, write to{" "}
          <a href="mailto:privacy@getfless.com">privacy@getfless.com</a> or use{" "}
          <a href="/contact">Contact</a>.
        </p>
      </Section>

      <Section id="scope" title="What this covers">
        <p>
          This policy applies to getfless.com, the Fless product at app.getfless.com, signup, billing, and related support. It covers personal data we process as a controller (accounts, billing, site visitors) and describes how we handle customer content as a processor when you use the product.
        </p>
        <p>
          If you have a written data processing addendum (DPA) with us, that DPA controls where it conflicts with this page.
        </p>
      </Section>

      <Section id="collect" title="Data we collect">
        <p>
          <strong>Account and billing.</strong> Name, work email, company, role, workspace name, city or region you select, plan, payment identifiers from our processor (we do not store full card numbers), and invoices.
        </p>
        <p>
          <strong>Workspace content.</strong> Briefs, files, knowledge you connect, tickets, call metadata, drafts, logs of what a desk did, and settings. This is your customer data. You own it.
        </p>
        <p>
          <strong>Usage and device.</strong> Product events (which desks are on, feature use), approximate location from IP, browser type, and diagnostics. We use this to keep the product up and to debug failures.
        </p>
        <p>
          <strong>Support.</strong> Emails, call notes, and attachments you send when you ask for help.
        </p>
      </Section>

      <Section id="integrations" title="Connected platforms & OAuth integrations">
        <p>
          Fless allows workspaces to connect external marketing, communications, and productivity services via OAuth 2.0. When you connect a third-party platform, you explicitly grant Fless permission to access specific data scopes. We only request permissions necessary to execute authorized actions:
        </p>

        <div className="space-y-6 pt-2">
          <div className="border-l-2 border-primary/60 pl-4 space-y-1.5">
            <h3 className="font-semibold text-foreground">1. Meta Platforms (Facebook, Instagram, Threads, WhatsApp & Meta Ads)</h3>
            <p className="text-sm">
              <strong>Data accessed:</strong> Facebook Page details, post feed, comments, direct messages, engagement insights, Instagram media, comments, follower insights, direct messages, Threads replies and insights, Meta Ads campaigns and lead generation form responses, WhatsApp template delivery and inbound chats.
            </p>
            <p className="text-sm">
              <strong>Purpose:</strong> Publishing scheduled social posts, replying to customer comments and direct inquiries, synchronizing ad leads to your CRM, and providing marketing performance analytics. High-risk actions (ad budget changes and permanent deletes) require human approval.
            </p>
            <p className="text-sm">
              <strong>Retention & Deletion:</strong> Access tokens are encrypted using AES-256-GCM. Cached metrics are refreshed periodically and discarded within 30 days. You can disconnect via Settings → Integrations or through Facebook App Settings. Meta deauthorization and data deletion callbacks are handled automatically via our compliant webhook.
            </p>
          </div>

          <div className="border-l-2 border-primary/60 pl-4 space-y-1.5">
            <h3 className="font-semibold text-foreground">2. Google Services (Gmail, Google Calendar, YouTube, Google Analytics, Search Console, Drive, Business Profile)</h3>
            <p className="text-sm">
              <strong>Data accessed:</strong> Gmail message sending (<code className="text-xs bg-muted px-1 py-0.5 rounded">gmail.send</code>), Google Calendar events and availability, YouTube channel metadata and video upload, Google Analytics website traffic data, Search Console performance queries, Google Drive files explicitly selected via Google Picker, and Business Profile locations.
            </p>
            <p className="text-sm">
              <strong>Purpose:</strong> Sending approved email campaigns and correspondence, booking calendar appointments, publishing YouTube video assets, generating unified marketing performance reports, and reading user-selected media assets.
            </p>
            <p className="text-sm">
              <strong>Google Limited Use Disclosure:</strong> Fless&apos;s use and transfer to any other app of information received from Google APIs adheres to the <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google API Services User Data Policy</a>, including the Limited Use requirements. We do not use Google Workspace data to train generalized AI/ML foundation models, nor do we transfer it to third parties for advertising.
            </p>
            <p className="text-sm">
              <strong>Retention & Deletion:</strong> Refresh tokens are stored encrypted and invalidated upon disconnection or when access is revoked at <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">myaccount.google.com/permissions</a>.
            </p>
          </div>

          <div className="border-l-2 border-primary/60 pl-4 space-y-1.5">
            <h3 className="font-semibold text-foreground">3. LinkedIn (Member Profiles, Company Pages & Advertising)</h3>
            <p className="text-sm">
              <strong>Data accessed:</strong> Basic profile, member social posting, organization company pages, post commentary, ad accounts, and lead generation forms.
            </p>
            <p className="text-sm">
              <strong>Purpose:</strong> Publishing company announcements, scheduling professional thought leadership posts, syncing business leads, and tracking engagement metrics.
            </p>
            <p className="text-sm">
              <strong>Retention:</strong> Member access tokens expire every 60 days unless re-authenticated. Organization data is removed when disconnected.
            </p>
          </div>

          <div className="border-l-2 border-primary/60 pl-4 space-y-1.5">
            <h3 className="font-semibold text-foreground">4. TikTok (Content Posting & Direct Post)</h3>
            <p className="text-sm">
              <strong>Data accessed:</strong> Basic creator info, video list, and creator posting settings.
            </p>
            <p className="text-sm">
              <strong>Purpose:</strong> Direct posting of verified marketing videos with human approval workflows and composer preview.
            </p>
          </div>

          <div className="border-l-2 border-primary/60 pl-4 space-y-1.5">
            <h3 className="font-semibold text-foreground">5. Other Connected Services (Pinterest, X, Calendly, Slack, HubSpot, Mailchimp, Bluesky, Mastodon, Telegram)</h3>
            <p className="text-sm">
              <strong>Data accessed:</strong> Visual pins and boards (Pinterest), tweets and media uploads (X), scheduling links and scheduled events (Calendly), workspace notification channels (Slack), CRM contacts and deals (HubSpot), email subscriber lists and campaign drafts (Mailchimp), social feeds and channel broadcast webhooks (Bluesky, Mastodon, Telegram).
            </p>
            <p className="text-sm">
              <strong>Purpose:</strong> Coordinating multi-channel campaigns, posting updates, syncing customer records, and notifying your team about pending approvals.
            </p>
          </div>
        </div>
      </Section>

      <Section id="use" title="How we use it">
        <p>We use personal data to:</p>
        <ul>
          <li>Create and authenticate workspaces, and deliver the product</li>
          <li>Bill, prevent fraud, and send transactional mail (receipts, security alerts)</li>
          <li>Provide support and investigate incidents</li>
          <li>Improve reliability, latency, and the desks you already use</li>
          <li>Meet legal, tax, and accounting duties</li>
        </ul>
        <p>
          We do not sell personal data. We do not use your workspace content for advertising.
        </p>
      </Section>

      <Section id="ai" title="AI, models, and your work">
        <p>
          Desks generate drafts, replies, call handling, and similar output from your briefs and connected context. Inputs and outputs stay in your workspace unless you export them or connect a tool that sends them onward.
        </p>
        <p>
          We do not train public or shared foundation models on your files, tickets, recordings, or prompts. Where a subprocesser model API is used to run a desk, it is under contract, for inference, with no right to use your content to train their general models — as those vendors state in their terms.
        </p>
        <p>
          High-risk actions (payments, outbound at volume, irreversible deletes) are designed to pause for a person. You remain responsible for reviewing work that goes live in your name.
        </p>
      </Section>

      <Section id="share" title="When we share data">
        <p>We share data only with:</p>
        <ul>
          <li>
            <strong>Subprocessors</strong> that host, bill, email, or run inference — under contract, limited to what the job needs
          </li>
          <li>
            <strong>Your admins and teammates</strong> inside the workspace, according to roles you set
          </li>
          <li>
            <strong>Authorities</strong> when the law requires it, or to protect people from serious harm
          </li>
          <li>
            <strong>A buyer</strong> if Fless is acquired, with notice where the law says we must
          </li>
        </ul>
        <p>
          A current subprocessors list is available on request at{" "}
          <a href="mailto:privacy@getfless.com">privacy@getfless.com</a>.
        </p>
      </Section>

      <Section id="transfers" title="International transfers">
        <p>
          You may run work in more than one market. We and our subprocessors may process data in the United States, United Kingdom, European Economic Area, United Arab Emirates, Nigeria, and other locations where we or they operate.
        </p>
        <p>
          Where a transfer needs a legal mechanism, we use standard contractual clauses (or the UK equivalent) and additional safeguards as required. Enterprise customers can contract for a named region or private VPC.
        </p>
      </Section>

      <Section id="retention" title="Retention">
        <div id="data-retention" />
        <p>
          Account data lasts for the life of the workspace plus a limited period for invoices and legal holds. Workspace content is kept while the workspace is active. After you delete a workspace or a desk’s data, we remove it from production systems within 30 days, and from backups on their rotation cycle (typically within 90 days), unless the law requires longer.
        </p>
        <p>
          You can export activity and knowledge before you close an account. Ask support if you need a packaged export.
        </p>
      </Section>

      <Section id="deletion" title="Data deletion & revocation">
        <p>
          You can disconnect third-party platforms or request complete deletion of your data at any time:
        </p>
        <ul>
          <li><strong>Self-serve integration disconnect:</strong> Navigate to Settings → Integrations in the dashboard and click Disconnect next to any service. Tokens are invalidated instantly.</li>
          <li><strong>Workspace deletion:</strong> Account owners can delete their entire workspace in Settings → Workspace. All customer content, credentials, and logs are wiped.</li>
          <li><strong>Third-party portal revocation:</strong> You can revoke permissions directly inside your Facebook, Google, LinkedIn, or TikTok account settings.</li>
        </ul>
        <p>
          For detailed instructions and tracking Meta automated deletion callbacks, read our dedicated{" "}
          <Link href="/data-deletion" className="text-primary hover:underline font-medium">
            User Data Deletion Instructions
          </Link>.
        </p>
      </Section>

      <Section id="rights" title="Your rights">
        <p>
          Depending on where you live (including Nigeria under the NDPR, the UK, the EEA under GDPR, California under the CCPA/CPRA, and similar data protection regimes), you may have the right to access, correct, delete, or export personal data, to object or restrict certain processing, and to withdraw consent. Workspace owners can often do this in-product; otherwise email{" "}
          <a href="mailto:privacy@getfless.com">privacy@getfless.com</a>.
        </p>
        <p>
          We will not discriminate against you for exercising these rights. You may lodge a complaint with your local supervisory authority. We would rather fix the issue first — write to us.
        </p>
      </Section>

      <Section id="cookies" title="Cookies">
        <p>
          We use essential cookies to keep you signed in and to protect the product. We use limited analytics cookies to understand which pages fail and which desks people turn on. You can block non-essential cookies in your browser; the product still works for core use.
        </p>
      </Section>

      <Section id="children" title="Children">
        <p>
          Fless is a business product. We do not knowingly collect personal data from children under 16. If you believe we have, contact us and we will delete it.
        </p>
      </Section>

      <Section id="changes" title="Changes">
        <p>
          If we change this policy in a material way, we will update the date above and, where required, notify workspace owners by email or in-product. Continued use after the effective date means you accept the updated policy, unless a contract says otherwise.
        </p>
      </Section>

      <Section id="contact" title="Contact">
        <p>
          Data Controller: Brainstack Tech LTD (trading as Fless)
          <br />
          Privacy: <a href="mailto:privacy@getfless.com">privacy@getfless.com</a>
          <br />
          Security: <a href="mailto:security@getfless.com">security@getfless.com</a>
          <br />
          Physical address: 3a Habitat Close, Lekki Phase 1, Lagos, Nigeria
          <br />
          Data deletion instructions: <Link href="/data-deletion" className="text-primary hover:underline">Data Deletion Instructions</Link>
          <br />
          Postal and enterprise: use <a href="/contact">Contact</a> and we will route it.
        </p>
      </Section>
    </LegalDoc>
  )
}
