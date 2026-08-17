import type { Metadata } from "next"
import { LegalDoc, Section } from "@/components/LegalDoc"

export const metadata: Metadata = {
  title: "Privacy — Fless",
  description:
    "How Fless collects, uses, and protects personal data wherever you operate.",
}

const nav = [
  { id: "who", title: "Who we are" },
  { id: "scope", title: "What this covers" },
  { id: "collect", title: "Data we collect" },
  { id: "use", title: "How we use it" },
  { id: "ai", title: "AI, models, and your work" },
  { id: "share", title: "When we share data" },
  { id: "transfers", title: "International transfers" },
  { id: "retention", title: "Retention" },
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
      updated="17 August 2026"
      nav={nav}
      current="/privacy"
    >
      <Section id="who" title="Who we are">
        <p>
          Fless Inc. (“Fless”, “we”, “us”) provides an AI workforce platform: marketing, sales, voice, support, hiring, finance, operations, and HR desks that run from one workspace, in every market you operate.
        </p>
        <p>
          For questions about this policy, write to{" "}
          <a href="mailto:privacy@fless.com">privacy@fless.com</a> or use{" "}
          <a href="/contact">Contact</a>.
        </p>
      </Section>

      <Section id="scope" title="What this covers">
        <p>
          This policy applies to fless.com, the Fless product, signup and billing, and related support. It covers personal data we process as a controller (accounts, billing, site visitors) and describes how we handle customer content as a processor when you use the product.
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
        <p>
          <strong>Integrations.</strong> If you connect calendar, CRM, email, or similar tools, we receive the data those connections authorize — only to run the desks you turned on.
        </p>
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
          <a href="mailto:privacy@fless.com">privacy@fless.com</a>.
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
        <p>
          Account data lasts for the life of the workspace plus a limited period for invoices and legal holds. Workspace content is kept while the workspace is active. After you delete a workspace or a desk’s data, we remove it from production systems within 30 days, and from backups on their rotation cycle (typically within 90 days), unless the law requires longer.
        </p>
        <p>
          You can export activity and knowledge before you close an account. Ask support if you need a packaged export.
        </p>
      </Section>

      <Section id="rights" title="Your rights">
        <p>
          Depending on where you live (including the UK, EEA, California, and similar regimes), you may have the right to access, correct, delete, or export personal data, to object or restrict certain processing, and to withdraw consent. Workspace owners can often do this in-product; otherwise email{" "}
          <a href="mailto:privacy@fless.com">privacy@fless.com</a>.
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
          Privacy: <a href="mailto:privacy@fless.com">privacy@fless.com</a>
          <br />
          Security: <a href="mailto:security@fless.com">security@fless.com</a>
          <br />
          Postal and enterprise: use <a href="/contact">Contact</a> and we will route it.
        </p>
      </Section>
    </LegalDoc>
  )
}
