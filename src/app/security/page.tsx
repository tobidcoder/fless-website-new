import type { Metadata } from "next"
import Link from "next/link"
import { LegalDoc, Section } from "@/components/LegalDoc"

export const metadata: Metadata = {
  title: "Security — Fless",
  description:
    "How Fless protects workspaces: encryption, access, regions, audit, and procurement-ready controls.",
}

const nav = [
  { id: "posture", title: "Posture" },
  { id: "product", title: "Product controls" },
  { id: "encryption", title: "Encryption" },
  { id: "access", title: "Access and identity" },
  { id: "data", title: "Data and isolation" },
  { id: "ai", title: "AI and subprocessors" },
  { id: "ops", title: "Operations" },
  { id: "incident", title: "Incidents" },
  { id: "compliance", title: "Compliance" },
  { id: "report", title: "Report a vulnerability" },
  { id: "contact", title: "Procurement and contact" },
]

const controls = [
  { title: "SOC 2 Type II", copy: "Independently audited. Report available to customers under NDA." },
  { title: "Encryption", copy: "TLS in transit. AES-256 at rest. Keys we can rotate." },
  { title: "SSO & SAML", copy: "Enterprise maps your identity provider and groups." },
  { title: "Audit log", copy: "Desk actions, admin changes, exports — available to owners." },
  { title: "Regions", copy: "Local hours in every market you operate. Private region on Enterprise." },
  { title: "Human pause", copy: "High-risk actions wait for a person before they ship." },
]

export default function SecurityPage() {
  return (
    <LegalDoc
      eyebrow="Trust"
      title="Security"
      lede="Built for procurement — encryption, access, regions, and a trail you can export. Not a weekend tool with a purple badge."
      updated="17 August 2026"
      nav={nav}
      current="/security"
    >
      <div className="grid sm:grid-cols-2 gap-4 mb-12">
        {controls.map((c) => (
          <div key={c.title} className="rounded-xl border border-border/70 p-4">
            <div className="text-sm font-semibold text-foreground mb-1">{c.title}</div>
            <p className="text-[13px] text-muted-foreground leading-relaxed">{c.copy}</p>
          </div>
        ))}
      </div>

      <Section id="posture" title="Posture">
        <p>
          Fless is an AI workforce platform. Customers put briefs, knowledge, and sometimes recordings into desks. We treat that as production customer data: least privilege, encryption, logging, and a path for your security team to review us.
        </p>
        <p>
          We design so a compromised seat does not equal the whole company: roles, workspace isolation, and optional SSO on Enterprise.
        </p>
      </Section>

      <Section id="product" title="Product controls">
        <p>
          Workspace owners turn desks on and off. Admins invite people and set who can publish, export, or connect tools. Activity from marketing, voice, sales, support, hiring, and finance is visible in the command center and can be exported.
        </p>
        <p>
          High-risk steps — sending money, mass outbound, irreversible deletes — are built to stop for a human. You configure what “high-risk” means for your company on paid plans that include approvals.
        </p>
      </Section>

      <Section id="encryption" title="Encryption">
        <p>
          Data in transit uses TLS 1.2 or newer. Data at rest uses AES-256 (or equivalent) on the cloud provider. Backups are encrypted. We rotate application secrets and can rotate customer-facing keys on a documented schedule. Enterprise can discuss customer-managed key options in a private region.
        </p>
      </Section>

      <Section id="access" title="Access and identity">
        <p>
          Employee access to production is via SSO, MFA, and time-bound roles. We do not use shared root passwords. Access is logged and reviewed. Support staff see customer content only when you open a ticket and grant it, or when required to restore service — and that access is audited.
        </p>
        <p>
          Your side: use unique work emails, turn on SSO when you have it, and revoke leavers the same day. We will help map IdP groups on Enterprise.
        </p>
      </Section>

      <Section id="data" title="Data and isolation">
        <p>
          Workspaces are logically isolated. We do not mix your knowledge base into another customer’s desks. Deletes from the product are removed from primary stores within 30 days and from backups on rotation (typically within 90 days), except where the law requires a hold.
        </p>
        <p>
          You can export logs and knowledge. On contract close we follow the retention path in the{" "}
          <Link href="/privacy">Privacy Policy</Link>.
        </p>
      </Section>

      <Section id="ai" title="AI and subprocessors">
        <p>
          Desks call model APIs for inference. We contract that your content is not used to train the vendor’s public models. We do not train shared Fless models on your files, tickets, or recordings.
        </p>
        <p>
          Hosting, email, billing, and inference run on named subprocessors. A current list is available under NDA for security review. We will notify workspace owners of material subprocessor changes as required by a DPA.
        </p>
      </Section>

      <Section id="ops" title="Operations">
        <p>
          Production runs on major cloud providers with network segmentation, patching, and vulnerability scanning. We monitor availability and error budgets. Change management covers production deploys. Logging covers auth, admin, and desk execution.
        </p>
        <p>
          Developers do not use production customer data in personal environments. Staging uses synthetic or anonymized fixtures.
        </p>
      </Section>

      <Section id="incident" title="Incidents">
        <p>
          We maintain an incident process: detect, contain, eradicate, recover, and notify. If we confirm a breach of your personal data, we will notify the workspace owner without undue delay and, where the law sets a clock (including GDPR-style 72 hours to authorities), we will meet it.
        </p>
        <p>
          Status and severe outages are communicated to owners by email or in-product. Ask for the incident contact on Enterprise.
        </p>
      </Section>

      <Section id="compliance" title="Compliance">
        <p>
          We maintain SOC 2 Type II. The report is available to customers under NDA. We will complete reasonable security questionnaires for Enterprise and Scale plans. We support DPAs and, where needed, SCCs for international transfers.
        </p>
        <p>
          Fless is not a HIPAA BA, PCI merchant-of-record, or ISO 27001 certified environment unless an order form says so. Do not put card PAN or protected health information into desks unless you have a signed addendum that covers it.
        </p>
      </Section>

      <Section id="report" title="Report a vulnerability">
        <p>
          If you find a security issue in Fless, email{" "}
          <a href="mailto:security@fless.com">security@fless.com</a> with steps to reproduce. Do not access other customers’ data. We will acknowledge and work the report. We do not run a public bug bounty unless announced here.
        </p>
      </Section>

      <Section id="contact" title="Procurement and contact">
        <p>
          Security pack, SOC 2, DPA, and subprocessors:{" "}
          <a href="mailto:security@fless.com">security@fless.com</a>
          <br />
          Named rollout and private region: <Link href="/contact">Contact</Link>
          <br />
          Legal terms: <Link href="/terms">Terms of Service</Link>
        </p>
      </Section>
    </LegalDoc>
  )
}
