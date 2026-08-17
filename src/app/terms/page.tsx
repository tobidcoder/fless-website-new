import type { Metadata } from "next"
import { LegalDoc, Section } from "@/components/LegalDoc"

export const metadata: Metadata = {
  title: "Terms of Service — Fless",
  description: "The agreement for using Fless: accounts, desks, content, billing, and acceptable use.",
}

const nav = [
  { id: "agreement", title: "The agreement" },
  { id: "accounts", title: "Accounts and workspaces" },
  { id: "service", title: "The service" },
  { id: "content", title: "Your content" },
  { id: "acceptable", title: "Acceptable use" },
  { id: "ai-output", title: "AI output" },
  { id: "payment", title: "Plans and payment" },
  { id: "availability", title: "Availability" },
  { id: "confidential", title: "Confidentiality" },
  { id: "ip", title: "Our intellectual property" },
  { id: "term", title: "Term and termination" },
  { id: "warranty", title: "Warranties and liability" },
  { id: "law", title: "Law and disputes" },
  { id: "contact", title: "Contact" },
]

export default function TermsPage() {
  return (
    <LegalDoc
      eyebrow="Legal"
      title="Terms of Service"
      lede="These terms are the contract for using Fless. If you are signing for a company, you confirm you can bind that company."
      updated="17 August 2026"
      nav={nav}
      current="/terms"
    >
      <Section id="agreement" title="The agreement">
        <p>
          By creating a workspace, clicking through, or using Fless, you agree to these Terms of Service, our{" "}
          <a href="/privacy">Privacy Policy</a>, and any order form or plan page you accept. If you have a signed master agreement, that agreement controls if it conflicts.
        </p>
        <p>
          Fless Inc. provides the product. “You” means the individual or the organization that owns the workspace.
        </p>
      </Section>

      <Section id="accounts" title="Accounts and workspaces">
        <p>
          You must provide accurate work-email and company information. You are responsible for admins, seats, and anyone you invite. Keep credentials safe. Tell us promptly if you think an account is compromised.
        </p>
        <p>
          One workspace can run multiple desks (marketing, voice, sales, and others). You decide which desks are on. You must have the right to the data you connect (CRM, calendar, help center, recordings).
        </p>
      </Section>

      <Section id="service" title="The service">
        <p>
          Fless is software that staffs departments with AI employees: it takes briefs, uses connected context, and produces work you can review and ship. Features, credit limits, and regions depend on your plan. We may change the product as we improve it; we will not remove a material paid feature without notice on that plan’s cycle.
        </p>
        <p>
          Enterprise options (SSO/SAML, private region, VPC, named CSM) are described on the plan or order form. They are not included unless purchased.
        </p>
      </Section>

      <Section id="content" title="Your content">
        <p>
          You retain all rights to customer content: briefs, files, knowledge, tickets, recordings, and outputs you keep in the workspace. You grant Fless a limited license to host, process, and display that content solely to provide the service to you.
        </p>
        <p>
          You represent that you have the rights and consents needed (including for call recording and employee or customer personal data) in every market you operate.
        </p>
      </Section>

      <Section id="acceptable" title="Acceptable use">
        <p>You will not:</p>
        <ul>
          <li>Break the law, including spam, fraud, harassment, or unauthorized recording</li>
          <li>Probe, overload, or reverse engineer the product except as allowed by law</li>
          <li>Resell Fless or access as a bureau without a written partner agreement</li>
          <li>Upload malware, or content you do not have rights to</li>
          <li>Use desks to impersonate a person in a way that is deceptive or illegal</li>
          <li>Bypass payment, credits, or rate limits</li>
        </ul>
        <p>
          We may suspend a workspace that creates harm, legal risk, or abuse of the platform. We will notify the owner unless the law or an ongoing incident forbids it.
        </p>
      </Section>

      <Section id="ai-output" title="AI output">
        <p>
          Desk output can be incomplete, outdated, or wrong. You must review work before it represents your company — especially legal, financial, medical, hiring, and outbound communications. Fless is not a law firm, bank, clinic, or recruiter of record.
        </p>
        <p>
          You own the outputs generated for your workspace, to the extent the law allows, subject to third-party rights in source material you provided. We do not claim copyright in your customer content.
        </p>
      </Section>

      <Section id="payment" title="Plans and payment">
        <p>
          Fees are as shown at checkout or on an order form, exclusive of taxes. Subscriptions renew until you cancel. You can cancel anytime; you keep access through the paid period. Credits and unused seats do not roll unless the plan says they do.
        </p>
        <p>
          Overdue invoices may pause the workspace after notice. Chargebacks without cause may result in closure. Refunds are not owed for partial months unless required by law or your order form.
        </p>
      </Section>

      <Section id="availability" title="Availability">
        <p>
          We aim for a continuously available product. We do not warrant uninterrupted uptime except where an enterprise order form includes an SLA. Maintenance and force majeure (including upstream model or cloud outages) may affect the service.
        </p>
      </Section>

      <Section id="confidential" title="Confidentiality">
        <p>
          Each party will protect the other’s non-public information with reasonable care, and use it only to perform this agreement. Customer content is your confidential information. These terms, pricing unique to you, and our security documentation are ours.
        </p>
      </Section>

      <Section id="ip" title="Our intellectual property">
        <p>
          Fless, the product, models we provide as part of the service, documentation, and the Fless name and marks remain ours. You may not copy the product or use our marks except to identify that you use Fless, in a factual way.
        </p>
      </Section>

      <Section id="term" title="Term and termination">
        <p>
          These terms start when you first use Fless and continue until the workspace is closed. You may delete the workspace in-product. We may terminate for material breach if it is not cured within 15 days of notice (immediately for unpaid fees after the notice period, or for illegal use).
        </p>
        <p>
          On termination we will make customer content available for export for 30 days where technically feasible, then delete it as described in the Privacy Policy.
        </p>
      </Section>

      <Section id="warranty" title="Warranties and liability">
        <p>
          The service is provided “as is” except for any warranty in an enterprise order form. We disclaim implied warranties of merchantability, fitness, and non-infringement to the fullest extent the law allows.
        </p>
        <p>
          Neither party is liable for indirect, incidental, special, or consequential damages, or lost profits, even if advised they were possible. Our total liability for a claim arising from Fless is limited to the fees you paid us for the service in the 12 months before the claim. These caps do not apply to your payment obligations, your infringement of our IP, or liability that cannot be limited by law (including fraud).
        </p>
      </Section>

      <Section id="law" title="Law and disputes">
        <p>
          These terms are governed by the laws of the State of New York, excluding conflict-of-law rules, unless a signed enterprise agreement names another venue. Courts in New York County, New York, have exclusive jurisdiction, except that either party may seek injunctive relief in any court of competent jurisdiction.
        </p>
        <p>
          If a provision is unenforceable, the rest remains in effect. We may assign these terms in a merger or sale of the business. You may not assign without our consent, except to an affiliate that accepts these terms.
        </p>
      </Section>

      <Section id="contact" title="Contact">
        <p>
          Legal: <a href="mailto:legal@fless.com">legal@fless.com</a>
          <br />
          Billing and plans: see <a href="/pricing">Pricing</a>
          <br />
          Enterprise paper: <a href="/contact">Contact</a>
        </p>
      </Section>
    </LegalDoc>
  )
}
