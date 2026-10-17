"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CodeView } from "@/components/CodeView";
import { cn } from "@/lib/utils";
import {
  AGENTS_EXAMPLE,
  BUILDER_API,
  CONNECTIONS,
  CONNECTION_CATEGORIES,
  CONNECTION_STATUS_NOTE,
  categoryLabel,
  CORE_PACKAGES,
  COUNTRIES,
  DEPARTMENTS,
  EVALUATION_CATEGORIES,
  EVALUATION_EXAMPLE,
  LANGUAGES,
  MANIFEST_EXAMPLE,
  MODEL_TIERS,
  PACKAGES,
  PACKAGES_STATUS_NOTE,
  PACKAGE_CATEGORIES,
  PRICING_MODELS,
  SANDBOX_EXAMPLE,
  TYPES_SNIPPET,
  USAGE_RATES,
  type ConnectionStatus,
  type Package,
} from "@/lib/sdk";

// ---------- Navigation ----------

type NavItem = { id: string; title: string };
type NavGroup = { title: string; items: NavItem[] };

const NAV: NavGroup[] = [
  {
    title: "Get started",
    items: [
      { id: "overview", title: "Overview" },
      { id: "quickstart", title: "Quickstart" },
      { id: "concepts", title: "Core concepts" },
    ],
  },
  {
    title: "Build",
    items: [
      { id: "manifest", title: "The manifest" },
      { id: "skills", title: "Skills and workflows" },
      { id: "knowledge", title: "Knowledge" },
      { id: "agents", title: "Agents and teams" },
      { id: "policies", title: "Policies and security" },
      { id: "settings", title: "Customer settings" },
      { id: "pricing", title: "Pricing" },
    ],
  },
  {
    title: "Packages",
    items: [
      { id: "packages", title: "All packages" },
      ...PACKAGES.map((p) => ({ id: `package-${p.id}`, title: p.name })),
    ],
  },
  {
    title: "Connections",
    items: [{ id: "connections", title: "Official API connections" }],
  },
  {
    title: "Test and ship",
    items: [
      { id: "sandbox", title: "Test in the sandbox" },
      { id: "evaluate", title: "Evaluation" },
      { id: "submit", title: "Submit and get paid" },
    ],
  },
  {
    title: "Reference",
    items: [
      { id: "api", title: "Builder API" },
      { id: "capabilities", title: "Capabilities" },
      { id: "model-tiers", title: "Model tiers" },
      { id: "markets", title: "Countries and languages" },
      { id: "departments", title: "Departments" },
      { id: "types", title: "TypeScript types" },
    ],
  },
];

// Old anchors from earlier versions of the docs and from links around the site.
const ALIASES: Record<string, string> = {
  intro: "overview",
  "single-sdk": "packages",
  "sdk-overview": "packages",
  plugins: "packages",
  "define-employee": "manifest",
  "create-employee": "manifest",
  "define-agent": "agents",
  "multi-agent": "agents",
  "skills-workflows": "skills",
  "rag-knowledge": "knowledge",
  approvals: "policies",
  "security-boundaries": "policies",
  "ref-pricing": "pricing",
  "sandbox-runner": "sandbox",
  verify: "evaluate",
  evaluations: "evaluate",
  publish: "submit",
  publishing: "submit",
  cli: "api",
  "ref-capabilities": "capabilities",
  "ref-model-tiers": "model-tiers",
  "ref-countries": "markets",
  "ref-languages": "markets",
  "ref-industries": "markets",
  "ref-departments": "departments",
  "sdk-types": "types",
};

const ALL_ITEMS = NAV.flatMap((g) => g.items);
const resolve = (hash: string) => {
  // Old plugin pages were #plugin-<id>; packages now live at #package-<id>.
  const id = ALIASES[hash] ?? hash.replace(/^plugin-/, "package-");
  return ALL_ITEMS.some((i) => i.id === id) ? id : "overview";
};

const NAV_SECTIONS: NavSection[] = [
  {
    title: "Getting Started",
    items: [
      { id: "intro", title: "Introduction & Architecture", icon: Compass },
      { id: "quickstart", title: "5-Minute Quickstart", icon: Terminal },
      { id: "builder-journey", title: "5-Step Builder Journey", badge: "Studio & SDK", icon: Workflow },
      { id: "single-sdk", title: "Single SDK Model", icon: Layers },
    ],
  },
  {
    title: "Manifest Reference Data",
    items: [
      { id: "ref-pricing", title: "Pricing Models & Usage Units", badge: "Config", icon: DollarSign },
      { id: "ref-countries", title: "Countries & ISO Codes", icon: Flag },
      { id: "ref-industries", title: "Industries & Business Types", icon: Building2 },
      { id: "ref-languages", title: "Supported Languages", icon: Languages },
      { id: "ref-departments", title: "Departments & Roles", icon: Briefcase },
      { id: "ref-capabilities", title: "Canonical Capabilities", icon: Tag },
      { id: "ref-model-tiers", title: "Model Tiers & Latency", icon: Gauge },
    ],
  },
  {
    title: "The Employee SDK",
    items: [
      { id: "sdk-overview", title: "SDK Overview & Install", icon: BookOpen },
      { id: "define-employee", title: "defineEmployee()", icon: Code2 },
      { id: "define-agent", title: "defineAgent()", icon: Users },
      { id: "create-employee", title: "createEmployee() Builder", icon: Sliders },
      { id: "sandbox-runner", title: "EmployeeSandboxRunner", icon: Play },
      { id: "sdk-types", title: "TypeScript Types", icon: FileCode },
    ],
  },
  {
    title: "Core Capabilities",
    items: [
      { id: "rag-knowledge", title: "RAG Multi-Modal Knowledge", icon: Database },
      { id: "multi-agent", title: "Multi-Agent Teams & Supervisor", icon: Network },
      { id: "skills-workflows", title: "Skills & Procedures", icon: Zap },
      { id: "security-boundaries", title: "Security & Zero Secret Access", icon: ShieldCheck },
      { id: "evaluations", title: "Sandbox Evaluations", icon: CheckCircle2 },
      { id: "publishing", title: "Marketplace Publishing", icon: Workflow },
    ],
  },
  {
    title: "Official Managed Plugins",
    items: OFFICIAL_PLUGINS.map((p) => ({
      id: `plugin-${p.id}`,
      title: p.displayName,
      badge: `${p.tools.length} tools`,
      icon: p.icon,
    })),
  },
];

// --- Custom Code Block with Brand Copy Button ---
function CodeBlock({ code, language = "typescript" }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

function PageHead({ eyebrow, title, lede }: { eyebrow: string; title: string; lede: ReactNode }) {
  return (
    <header className="mb-12 md:mb-16">
      <p className="text-[12px] font-medium text-primary mb-4">{eyebrow}</p>
      <h1 className="text-[32px] sm:text-[40px] font-display font-semibold tracking-[-0.035em] leading-[1.1] text-foreground text-balance">
        {title}
      </h1>
      <p className="mt-5 text-[17px] sm:text-[18px] text-muted-foreground leading-[1.7] text-pretty">{lede}</p>
    </header>
  );
}

function H2({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <h2 id={id} className="text-[22px] font-display font-semibold tracking-tight text-foreground mt-16 mb-5 first:mt-0">
      {children}
    </h2>
  );
}

function P({ children }: { children: ReactNode }) {
  return <p className="text-[16px] text-muted-foreground leading-[1.75] mb-5">{children}</p>;
}

function C({ children }: { children: ReactNode }) {
  return <code className="font-mono text-[0.88em] text-foreground bg-secondary rounded px-1.5 py-0.5">{children}</code>;
}

function Steps({ items }: { items: Array<{ title: string; body: ReactNode }> }) {
  return (
    <ol className="space-y-12">
      {items.map((s, i) => (
        <li key={s.title} className="grid grid-cols-[2rem_1fr] gap-x-4">
          <span className="font-mono text-[13px] text-primary pt-1 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
          <div className="min-w-0">
            <h3 className="text-[17px] font-semibold tracking-tight text-foreground mb-3">{s.title}</h3>
            {s.body}
          </div>
        </li>
      ))}
    </ol>
  );
}

function Table({ head, rows, mono = [0] }: { head: string[]; rows: ReactNode[][]; mono?: number[] }) {
  return (
    <div className="mb-6">
      {/* Phones: one stacked block per row */}
      <dl className="sm:hidden divide-y divide-border/60 border-y border-border/60">
        {rows.map((r, i) => (
          <div key={i} className="py-4 space-y-1.5">
            {r.map((cell, j) =>
              j === 0 ? (
                <dt key={j} className={cn("text-[15px] text-foreground", mono.includes(0) && "font-mono text-[14px]")}>
                  {cell}
                </dt>
              ) : (
                <dd key={j} className="text-[14px] text-muted-foreground leading-relaxed">
                  <span className="text-foreground/60">{head[j]}: </span>
                  <span className={cn(mono.includes(j) && "font-mono text-[13px] text-foreground")}>{cell}</span>
                </dd>
              )
            )}
          </div>
        ))}
      </dl>

      <table className="hidden sm:table w-full text-left text-[14px] border-collapse">
        <thead>
          <tr className="border-b border-border">
            {head.map((h) => (
              <th key={h} className="py-3 pr-6 text-[12px] font-medium text-muted-foreground">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-border/60 align-top">
              {r.map((cell, j) => (
                <td
                  key={j}
                  className={cn(
                    "py-4 pr-6 leading-relaxed",
                    mono.includes(j) ? "font-mono text-[13px] text-foreground whitespace-nowrap" : "text-muted-foreground"
                  )}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Defs({ items }: { items: Array<{ term: ReactNode; text: ReactNode }> }) {
  return (
    <dl className="divide-y divide-border/60 border-y border-border/60 mb-6">
      {items.map((d, i) => (
        <div key={i} className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-x-6 gap-y-1 py-5">
          <dt className="text-[15px] font-medium text-foreground">{d.term}</dt>
          <dd className="text-[15px] text-muted-foreground leading-relaxed">{d.text}</dd>
        </div>
      ))}
    </dl>
  );
}

function Note({ children }: { children: ReactNode }) {
  return (
    <div className="border-l-2 border-primary/60 pl-5 py-1 my-8 text-[15px] text-muted-foreground leading-relaxed">
      {children}
    </div>
  );
}

function Chips({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {items.map((i) => (
        <span key={i} className="font-mono text-[12.5px] text-foreground/85 bg-secondary rounded-md px-2.5 py-1">
          {i}
        </span>
      ))}
    </div>
  );
}

const statusTone: Record<ConnectionStatus, string> = {
  Available: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10",
  Beta: "text-primary bg-brand-soft",
  "Awaiting approval": "text-amber-700 dark:text-amber-400 bg-amber-500/10",
};

function Status({ status }: { status: ConnectionStatus }) {
  return <span className={cn("text-[11px] font-medium rounded-full px-2 py-0.5 whitespace-nowrap", statusTone[status])}>{status}</span>;
}

function LinkRow({ href, title, text }: { href: string; title: string; text: string }) {
  return (
    <a href={href} className="group flex items-baseline justify-between gap-6 py-5 border-b border-border/60">
      <span>
        <span className="block text-[16px] font-medium text-foreground group-hover:text-primary transition-colors">{title}</span>
        <span className="block mt-1 text-[14px] text-muted-foreground">{text}</span>
      </span>
      <span className="text-muted-foreground group-hover:text-primary transition-colors">→</span>
    </a>
  );
}

// ---------- Code examples that only the docs use ----------

const MINIMAL_EXAMPLE = `import { defineEmployee } from '@fless/employee-sdk';

export default defineEmployee({
  id: 'social-assistant',
  name: 'Social Media Assistant',
  department: 'MARKETING',
  role: 'Plans and publishes weekly posts',
  description: 'Turns a weekly brief into approved posts on Facebook and Instagram.',

  requiredPackages: ['@fless/meta'],
  capabilities: ['social.publish', 'social.analytics'],
  tools: ['social.publish', 'social.analytics.get'],

  policies: { requireApprovalFor: ['social.publish'] },

  pricing: { model: 'MONTHLY', currency: 'USD', monthlyPriceCents: 4900 },
  systemInstructions: 'Write in the brand voice. Never publish without approval.',
});`;

const SKILLS_EXAMPLE = `skills: [
  {
    id: 'lead-follow-up',
    name: 'Lead follow-up',
    description: 'Follows up new leads within an hour.',
    triggerConditions: ['new lead', 'missed call'],
    workflowSteps: [
      'Look up the contact',
      'Send a WhatsApp with two call-back times',
      'Update the lead status',
    ],
    requiredTools: ['crm.lookupContact', 'whatsapp.sendMessage', 'crm.syncLead'],
  },
  // A skill can point at an existing SOP instead of listing steps
  {
    id: 'refund-policy',
    name: 'Refund handling',
    description: 'Applies the company refund policy.',
    url: 'https://help.example.com/refunds',
  },
],

workflows: [
  {
    id: 'weekly-report',
    title: 'Weekly social report',
    trigger: 'schedule.weekly',
    steps: [
      { name: 'Collect', action: 'Pull last week\\'s numbers', requiredTool: 'social.analytics.get' },
      { name: 'Share', action: 'Post a summary to the team', requiredTool: 'slack.postMessage' },
    ],
  },
],`;

const KNOWLEDGE_EXAMPLE = `knowledge: [
  {
    id: 'price-list',
    name: '2026 price list',
    type: 'PDF',
    url: 'https://files.example.com/prices-2026.pdf',
  },
  {
    id: 'help-centre',
    name: 'Help centre',
    type: 'SITEMAP',
    url: 'https://help.example.com/sitemap.xml',
    refreshInterval: 'DAILY',
  },
  {
    id: 'lagos-hours',
    name: 'Lagos branch hours',
    type: 'TEXT',
    content: 'Open 8am to 6pm, Monday to Saturday.',
    country: 'NG',
  },
]`;

const POLICIES_EXAMPLE = `policies: {
  // These tools always wait for a person to approve
  requireApprovalFor: ['social.publish', 'crm.syncLead'],
  // Hand the conversation to a person when any of these happen
  escalateToHumanWhen: ['customer is angry', 'customer asks for a refund'],
  // Never say these
  forbiddenKeywords: ['guarantee', 'diagnosis'],
  // Only act inside working hours
  operatingHours: { timezone: 'Africa/Lagos', start: '08:00', end: '18:00', workDays: [1, 2, 3, 4, 5] },
}`;

const SETTINGS_EXAMPLE = `settingsSchema: {
  fields: [
    {
      key: 'brand_voice',
      label: 'Brand voice',
      type: 'select',
      options: [
        { value: 'friendly', label: 'Friendly' },
        { value: 'formal', label: 'Formal' },
      ],
      default: 'friendly',
      editableBy: 'customer',
      group: 'Brand & Voice',
    },
    {
      key: 'posts_per_week',
      label: 'Posts per week',
      type: 'number',
      min: 1,
      max: 21,
      default: 5,
      editableBy: 'customer',
      group: 'Schedule',
    },
  ],
}`;

const PRICING_EXAMPLE = `pricing: {
  model: 'BASE_PLUS_USAGE',
  currency: 'USD',
  baseMonthlyPriceCents: 4900,          // $49 a month
  usageRates: {
    perVoiceMinuteCents: 15,            // plus $0.15 per call minute
  },
  trialDays: 14,
}`;

const INSTALL = `npm install @fless/employee-sdk`;

const SUBMIT_EXAMPLE = `# 1. Upload the new version
POST /api/v1/builder/employees/emp_31d9/versions

# 2. Run the evaluation suite
POST /api/v1/builder/versions/ver_8f2c/evaluate

# 3. Submit for review
POST /api/v1/builder/versions/ver_8f2c/submit`;

// ---------- Pages ----------

function PackagePage({ pkg }: { pkg: Package }) {
  return (
    <>
      <header className="mb-12 md:mb-16">
        <p className="text-[12px] font-medium text-primary mb-4">Package · {pkg.category}</p>
        <h1 className="text-[32px] sm:text-[40px] font-display font-semibold tracking-[-0.035em] leading-[1.1] text-foreground">
          {pkg.name}
        </h1>
        <p className="mt-3 font-mono text-[14px] text-muted-foreground">{pkg.packageName}</p>
        <p className="mt-5 text-[17px] sm:text-[18px] text-muted-foreground leading-[1.7]">{pkg.summary}</p>
      </header>

      <Note>{PACKAGES_STATUS_NOTE}</Note>

      <Defs
        items={[
          ...(pkg.connects.length > 0 ? [{ term: "Connects to", text: pkg.connects.join(", ") }] : []),
          { term: "Capabilities", text: <Chips items={pkg.capabilities} /> },
          { term: "Permissions", text: <Chips items={pkg.permissions} /> },
          { term: "Sandbox", text: "Every tool has a sandbox version, so tests never touch live accounts." },
        ]}
      />

      <H2>Add it to your employee</H2>
      <P>
        List the package in <C>requiredPackages</C>, then allow only the tools you need in <C>tools</C>. The business
        connects its own account when it hires your employee. Your code never sees their credentials.
      </P>
      <CodeView
        code={`requiredPackages: ['${pkg.packageName}'],\ncapabilities: [${pkg.capabilities.map((c) => `'${c}'`).join(", ")}],\ntools: [${pkg.tools.map((t) => `'${t.id}'`).join(", ")}],`}
        filename="employee.ts"
      />

      <H2>Tools</H2>
      <div className="space-y-14">
        {pkg.tools.map((t) => (
          <section key={t.id}>
            <h3 className="font-mono text-[15px] text-foreground mb-2">{t.id}</h3>
            <p className="text-[15px] text-muted-foreground leading-relaxed mb-5">{t.description}</p>
            {t.parameters.length > 0 ? (
              <Table
                head={["Parameter", "Type", "Required", "Description"]}
                mono={[0, 1]}
                rows={t.parameters.map((p) => [p.name, p.type, p.required ? "Yes" : "No", p.description])}
              />
            ) : (
              <p className="text-[14px] text-muted-foreground">No parameters.</p>
            )}
          </section>
        ))}
      </div>
    </>
  );
}

function PageContent({ id }: { id: string }) {
  if (id.startsWith("package-")) {
    const pkg = PACKAGES.find((p) => `package-${p.id}` === id);
    if (pkg) return <PackagePage pkg={pkg} />;
  }

  switch (id) {
    case "overview":
      return (
        <>
          <PageHead
            eyebrow="Builder docs"
            title="Build AI employees businesses can hire."
            lede="An AI employee on Fless is one TypeScript file that describes a job: what it does, what it knows, which tools it may use, what needs a person's approval and what it costs. You write the file. Fless runs it, keeps it safe, bills the customer and pays you."
          />
          <H2>How it fits together</H2>
          <Defs
            items={[
              { term: "You write", text: "A manifest with skills, workflows, knowledge, tools, policies and a price." },
              { term: "Fless runs", text: "The models, packages, official API connections, audit trail and billing." },
              { term: "Businesses hire", text: "Your employee from the marketplace. You keep 35% of what they pay." },
            ]}
          />
          <H2>Start here</H2>
          <div className="border-t border-border/60">
            <LinkRow href="#quickstart" title="Quickstart" text="From an empty folder to a tested employee." />
            <LinkRow href="#manifest" title="The manifest" text="A complete example, field by field." />
            <LinkRow href="#packages" title="Packages" text={`${PACKAGES.length} packages and their tools.`} />
            <LinkRow href="#connections" title="Connections" text="Official APIs businesses can connect." />
            <LinkRow href="#submit" title="Submit and get paid" text="Review, launch and monthly payouts." />
          </div>
          <Note>
            The SDK is in private beta.{" "}
            <Link href="/builders#apply" className="font-medium text-foreground underline underline-offset-4">
              Request access
            </Link>{" "}
            to get the packages, builder API keys and a sandbox account.
          </Note>
        </>
      );

    case "quickstart":
      return (
        <>
          <PageHead eyebrow="Get started" title="Quickstart" lede="Build and test a small social-media employee in about five minutes." />
          <Steps
            items={[
              {
                title: "Get access",
                body: (
                  <P>
                    The SDK is distributed to accepted builders.{" "}
                    <Link href="/builders#apply" className="font-medium text-foreground underline underline-offset-4">
                      Request access
                    </Link>
                    , then create an API key in your builder dashboard.
                  </P>
                ),
              },
              { title: "Install", body: <CodeView code={INSTALL} language="bash" filename="terminal" /> },
              {
                title: "Write the employee",
                body: (
                  <>
                    <P>
                      Create <C>src/employee.ts</C>. This one drafts posts and publishes only after a person approves.
                    </P>
                    <CodeView code={MINIMAL_EXAMPLE} filename="src/employee.ts" />
                  </>
                ),
              },
              {
                title: "Test it",
                body: (
                  <>
                    <P>Run messages through it locally. Packages are mocked, so nothing is posted.</P>
                    <CodeView code={SANDBOX_EXAMPLE} filename="src/sandbox.ts" />
                  </>
                ),
              },
              {
                title: "Evaluate and submit",
                body: (
                  <P>
                    Upload the version, run the evaluation suite and submit it for review. See{" "}
                    <a href="#submit" className="text-foreground underline underline-offset-4">Submit and get paid</a>.
                  </P>
                ),
              },
            ]}
          />
        </>
      );

    case "concepts":
      return (
        <>
          <PageHead eyebrow="Get started" title="Core concepts" lede="The words you'll see everywhere in these docs." />
          <Defs
            items={[
              { term: "Employee", text: "The thing a business hires. Defined with defineEmployee()." },
              { term: "Agent", text: "A specialist inside an employee, such as a booking agent. Optional." },
              { term: "Skill", text: "A repeatable procedure: when it applies, the steps, and the tools each step uses." },
              { term: "Workflow", text: "A multi-step job that starts on an event or schedule." },
              { term: "Knowledge", text: "Facts the employee answers from: text, web pages, PDFs and documents." },
              { term: "Package", text: "A set of tools, such as @fless/whatsapp." },
              { term: "Tool", text: "One action a package offers, such as whatsapp.sendMessage." },
              { term: "Connection", text: "A business's own account on a service, linked through the official API." },
              { term: "Policy", text: "A rule: what needs approval, when to hand over to a person, working hours." },
            ]}
          />
        </>
      );

    case "manifest":
      return (
        <>
          <PageHead
            eyebrow="Build"
            title="The manifest"
            lede={<>Everything about an employee lives in one object passed to <C>defineEmployee()</C>. Here is a complete example.</>}
          />
          <CodeView code={MANIFEST_EXAMPLE} filename="src/employee.ts" maxHeight={640} />
          <H2>Fields</H2>
          <Table
            head={["Field", "Required", "What it does"]}
            rows={[
              ["id, name", "Yes", "Unique ID and display name. slug defaults to id, version to 1.0.0."],
              ["department, role", "Yes", "Which desk it works on and its job in one line."],
              ["description", "Yes", "What businesses read on the marketplace."],
              ["countries, industries, businessTypes, languages", "No", "Who it is for."],
              ["requiredPackages, optionalPackages", "No", "Packages it needs, and ones it can use if connected."],
              ["capabilities", "No", "Broad permissions, used for review and marketplace search."],
              ["tools", "Yes", "Exact tools it may call. Anything else is blocked."],
              ["skills, workflows", "No", "Procedures and event-driven jobs."],
              ["knowledge", "No", "Sources it answers from."],
              ["agents, orchestration", "No", "Specialists and how they share work. One lead agent is created if omitted."],
              ["policies", "No", "Approvals, escalation, forbidden words and working hours."],
              ["settingsSchema", "No", "Settings each business fills in."],
              ["evaluationScenarios", "No", "Your own tests, run on every version."],
              ["pricing", "No", "How businesses pay. See Pricing."],
              ["concurrencyLimit", "No", "Tasks at once per customer. Defaults to 5."],
              ["systemInstructions", "Yes", "Tone and rules that apply to everything it does."],
            ]}
          />
        </>
      );

    case "skills":
      return (
        <>
          <PageHead
            eyebrow="Build"
            title="Skills and workflows"
            lede="Skills are procedures the employee follows when a situation comes up. Workflows are jobs that start on an event or a schedule."
          />
          <CodeView code={SKILLS_EXAMPLE} filename="employee.ts" />
          <H2>Skill fields</H2>
          <Table
            head={["Field", "What it does"]}
            rows={[
              ["id, name, description", "How the skill is referenced and shown."],
              ["agentId", "Which agent owns it, in a multi-agent employee."],
              ["triggerConditions", "Phrases or events that should start it."],
              ["workflowSteps", "The steps, in order."],
              ["requiredTools", "Tools the steps call."],
              ["instructions", "Extra guidance in plain language."],
              ["url, docs", "Point to an existing SOP instead of writing steps."],
              ["parametersSchema, outputSchema", "Optional JSON Schemas for structured input and output."],
            ]}
          />
          <H2>Workflow fields</H2>
          <Table
            head={["Field", "What it does"]}
            rows={[
              ["id, title", "How the workflow is referenced and shown."],
              ["trigger", "The event or schedule that starts it."],
              ["steps", "Each step's name, action and the tool it uses."],
            ]}
          />
        </>
      );

    case "knowledge":
      return (
        <>
          <PageHead
            eyebrow="Build"
            title="Knowledge"
            lede="Ground answers in the business's own facts. Attach sources to the whole employee or to a single agent."
          />
          <CodeView code={KNOWLEDGE_EXAMPLE} filename="employee.ts" />
          <H2>Source types</H2>
          <Table
            head={["Type", "Use it for"]}
            rows={[
              ["TEXT", "Short facts written inline: hours, rules, prices."],
              ["MARKDOWN", "Longer guides and SOPs."],
              ["URL", "A single public web page."],
              ["SITEMAP", "A whole help centre or website."],
              ["PDF", "Price lists, policies, regulations."],
              ["DOCUMENT", "Uploaded files such as contracts or handbooks."],
            ]}
          />
          <H2>Keeping it fresh</H2>
          <P>
            Set <C>refreshInterval</C> to <C>DAILY</C> or <C>WEEKLY</C> for sources that change. Tag a source with{" "}
            <C>country</C>, <C>industry</C> or <C>businessType</C> and it is only used for matching customers. Tune
            retrieval with <C>vectorConfig</C>.
          </P>
        </>
      );

    case "agents":
      return (
        <>
          <PageHead
            eyebrow="Build"
            title="Agents and teams"
            lede="Split a complex job across specialists. Each agent has its own model tier, skills, tools and knowledge."
          />
          <CodeView code={AGENTS_EXAMPLE} filename="src/agents.ts" />
          <H2>How agents share work</H2>
          <Table
            head={["orchestration.mode", "How it works"]}
            rows={[
              ["SUPERVISOR", "A lead agent reads each request and hands parts to specialists. The default."],
              ["PIPELINE", "Work passes through agents in pipelineOrder, for example extract → check → file."],
              ["ROUND_ROBIN", "Requests are spread evenly across agents."],
              ["DIRECT", "Requests go straight to one agent."],
            ]}
          />
          <P>
            Set <C>leadAgentId</C>, a <C>fallbackAgentId</C> and <C>maxTurns</C> to control the team. If you define no
            agents, Fless creates one lead agent from your manifest. Agents default to the <C>standard</C> tier,
            temperature 0.7 and 5 steps.
          </P>
        </>
      );

    case "policies":
      return (
        <>
          <PageHead
            eyebrow="Build"
            title="Policies and security"
            lede="Businesses trust Fless because people stay in charge. Policies let you decide what needs a person, and every employee inherits the platform's protections."
          />
          <CodeView code={POLICIES_EXAMPLE} filename="employee.ts" />
          <H2>Policy fields</H2>
          <Table
            head={["Field", "What it does"]}
            rows={[
              ["requireApprovalFor", "Tools that pause until a person approves."],
              ["escalateToHumanWhen", "Situations that hand the conversation to a person."],
              ["forbiddenKeywords", "Words the employee must never use."],
              ["operatingHours", "When it may act: time zone, start, end and work days."],
            ]}
          />
          <H2>Built in for every employee</H2>
          <Defs
            items={[
              { term: "No secret access", text: "Your code never sees customer passwords or tokens. Fless stores, refreshes and injects them when a tool runs." },
              { term: "Least privilege", text: "Only the tools in your manifest can be called, with the permissions each package declares." },
              { term: "Audit trail", text: "Every tool call is recorded with a signed receipt the business can review." },
              { term: "Isolation", text: "Each customer's data and knowledge is kept separate." },
            ]}
          />
        </>
      );

    case "settings":
      return (
        <>
          <PageHead
            eyebrow="Build"
            title="Customer settings"
            lede="Let each business tailor your employee without code. Fields appear in their dashboard when they hire it."
          />
          <CodeView code={SETTINGS_EXAMPLE} filename="employee.ts" />
          <H2>Field options</H2>
          <Table
            head={["Field", "What it does"]}
            rows={[
              ["key, label", "A stable snake_case key and a friendly label."],
              ["type", "text, textarea, number, boolean, select, multiselect, time, schedule or url."],
              ["options, default", "Choices for select fields, and the starting value."],
              ["required, min, max, maxLength", "Validation."],
              ["group", "Section heading in the dashboard, e.g. Brand & Voice."],
              ["editableBy", "customer, or builder to fix the value for this version."],
              ["requiresCapability", "Hide the field until the matching package is connected."],
            ]}
          />
        </>
      );

    case "pricing":
      return (
        <>
          <PageHead
            eyebrow="Build"
            title="Pricing"
            lede="You set the price. Businesses see it before they hire. You keep 35% of every charge, paid monthly."
          />
          <CodeView code={PRICING_EXAMPLE} filename="employee.ts" />
          <H2>Pricing models</H2>
          <Table head={["pricing.model", "Set this", "Example"]} mono={[0, 1]} rows={PRICING_MODELS.map((m) => [m.model, m.fields, m.example])} />
          <H2>Usage rates</H2>
          <Table head={["usageRates field", "Charged"]} rows={USAGE_RATES.map((u) => [u.field, u.meaning])} />
          <P>
            Add <C>trialDays</C> to offer a free trial.
          </P>
        </>
      );

    case "packages":
      return (
        <>
          <PageHead
            eyebrow="Packages"
            title="Packages"
            lede="Core packages to build with, and packages that give your employee tools. Every tool is mocked in the sandbox."
          />
          <CodeView code={INSTALL} language="bash" filename="terminal" />
          <Note>{PACKAGES_STATUS_NOTE}</Note>
          <div className="mt-12 space-y-12">
            {CORE_PACKAGES.map((p) => (
              <section key={p.name}>
                <p className="text-[12px] font-medium text-muted-foreground mb-2">{p.role}</p>
                <h2 className="font-mono text-[18px] text-foreground mb-3">{p.name}</h2>
                <P>{p.summary}</P>
                <Chips items={p.exports} />
              </section>
            ))}
          </div>
          {PACKAGE_CATEGORIES.map((cat) => (
            <section key={cat}>
              <H2>{cat}</H2>
              <div className="border-t border-border/60">
                {PACKAGES.filter((p) => p.category === cat).map((p) => (
                  <a key={p.id} href={`#package-${p.id}`} className="group block py-5 border-b border-border/60">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="text-[16px] font-medium text-foreground group-hover:text-primary transition-colors">{p.name}</span>
                      <span className="font-mono text-[13px] text-muted-foreground">{p.packageName}</span>
                    </div>
                    <p className="mt-1.5 text-[14px] text-muted-foreground leading-relaxed">{p.summary}</p>
                  </a>
                ))}
              </div>
            </section>
          ))}
        </>
      );

    case "connections":
      return (
        <>
          <PageHead
            eyebrow="Connections"
            title="Official API connections"
            lede={`${CONNECTIONS.length} connections, each built on the provider's official API with no third-party schedulers in between. Businesses sign in with their own accounts; Fless stores and refreshes the tokens.`}
          />
          <Defs
            items={(["Available", "Beta", "Awaiting approval"] as ConnectionStatus[]).map((s) => ({
              term: <Status status={s} />,
              text: `${CONNECTION_STATUS_NOTE[s]} (${CONNECTIONS.filter((c) => c.status === s).length})`,
            }))}
          />
          {CONNECTION_CATEGORIES.map((g) => (
            <section key={g}>
              <H2>{categoryLabel(g)}</H2>
              <div className="border-t border-border/60">
                {CONNECTIONS.filter((c) => c.category === g).map((c) => (
                  <div key={c.id} className="py-5 border-b border-border/60">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="text-[16px] font-medium text-foreground">{c.name}</span>
                      <Status status={c.status} />
                      <span className="text-[13px] text-muted-foreground tabular-nums">{c.actions} actions</span>
                    </div>
                    <p className="mt-1.5 text-[14px] text-muted-foreground leading-relaxed">{c.summary}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </>
      );

    case "sandbox":
      return (
        <>
          <PageHead
            eyebrow="Test and ship"
            title="Test in the sandbox"
            lede="The sandbox runs your employee with every package mocked, so you can test real conversations without touching live accounts."
          />
          <CodeView code={SANDBOX_EXAMPLE} filename="src/sandbox.ts" />
          <H2>From the API</H2>
          <P>
            The same simulation is available at <C>POST /api/v1/builder/sandbox/simulate</C>, which is useful in CI.
          </P>
        </>
      );

    case "evaluate":
      return (
        <>
          <PageHead
            eyebrow="Test and ship"
            title="Evaluation"
            lede="Every version is tested before it can reach the marketplace. Your evaluationScenarios run alongside Fless's own checks."
          />
          <CodeView code={EVALUATION_EXAMPLE} filename="Builder API" />
          <H2>What is checked</H2>
          <Table head={["Category", "What it checks"]} rows={EVALUATION_CATEGORIES.map((c) => [c.id, c.meaning])} />
          <H2>Writing scenarios</H2>
          <P>
            Give each scenario a <C>prompt</C> and what should happen: <C>expectedTools</C>, <C>expectedKeywords</C>,{" "}
            <C>prohibitedKeywords</C> or an <C>expectedOutcome</C>. Add <C>maxLatencyMs</C> and <C>maxCostCents</C> to
            hold it to a budget.
          </P>
        </>
      );

    case "submit":
      return (
        <>
          <PageHead eyebrow="Test and ship" title="Submit and get paid" lede="Ship a passing version to the marketplace and earn from every business that hires it." />
          <Steps
            items={[
              { title: "Upload, evaluate, submit", body: <CodeView code={SUBMIT_EXAMPLE} language="bash" filename="Builder API" /> },
              { title: "Review", body: <P>The Fless team reviews the listing, description and pricing. Replies to reviews show up in your builder dashboard.</P> },
              { title: "Go live", body: <P>Your employee appears on the marketplace for the countries and industries in your manifest.</P> },
              {
                title: "Get paid",
                body: (
                  <P>
                    You receive 35% of every subscription and usage charge. Fless keeps 65% for computing, security,
                    billing and distribution. Track it at <C>GET /builder/earnings</C> and request payouts at{" "}
                    <C>POST /builder/payouts</C>.
                  </P>
                ),
              },
            ]}
          />
        </>
      );

    case "api":
      return (
        <>
          <PageHead
            eyebrow="Reference"
            title="Builder API"
            lede="Everything in the builder dashboard is also available over HTTPS. Authenticate with an API key from your dashboard."
          />
          <div className="border-t border-border/60">
            {BUILDER_API.map((e) => (
              <div key={e.path} className="py-5 border-b border-border/60">
                <code className="font-mono text-[13.5px] text-foreground break-all">
                  <span className="text-primary mr-2">{e.method}</span>
                  {e.path}
                </code>
                <p className="mt-1.5 text-[14px] text-muted-foreground">{e.summary}</p>
              </div>
            ))}
          </div>
        </>
      );

    case "capabilities": {
      const caps = Array.from(
        PACKAGES.reduce((m, p) => {
          p.capabilities.forEach((c) => m.set(c, [...(m.get(c) ?? []), p.packageName]));
          return m;
        }, new Map<string, string[]>())
      ).sort(([a], [b]) => a.localeCompare(b));
      return (
        <>
          <PageHead eyebrow="Reference" title="Capabilities" lede="Capabilities are broad permissions. Declare the ones your tools need; the marketplace also uses them for search." />
          <Table head={["Capability", "Provided by"]} rows={caps.map(([c, pkgs]) => [c, pkgs.join(", ")])} />
        </>
      );
    }

    case "model-tiers":
      return (
        <>
          <PageHead eyebrow="Reference" title="Model tiers" lede={<>Set <C>modelTier</C> on each agent to balance speed, depth and cost.</>} />
          <Table head={["Tier", "Best for"]} rows={MODEL_TIERS.map((m) => [m.tier, m.use])} />
        </>
      );

    case "markets":
      return (
        <>
          <PageHead eyebrow="Reference" title="Countries and languages" lede={<>Values for <C>countries</C> and <C>languages</C>.</>} />
          <H2>Countries</H2>
          <Table head={["Code", "Country", "Currency"]} rows={COUNTRIES.map((c) => [c.code, c.name, c.currency])} />
          <H2>Languages</H2>
          <Table head={["Code", "Language"]} rows={LANGUAGES.map((l) => [l.code, l.name])} />
        </>
      );

    case "departments":
      return (
        <>
          <PageHead eyebrow="Reference" title="Departments" lede={<>Values for <C>department</C>.</>} />
          <Chips items={DEPARTMENTS} />
        </>
      );

    case "types":
      return (
        <>
          <PageHead eyebrow="Reference" title="TypeScript types" lede={<>Exported from <C>@fless/contracts</C> and re-exported by the SDK.</>} />
          <CodeView code={TYPES_SNIPPET} filename="@fless/contracts" maxHeight={720} />
        </>
      );

    default:
      return null;
  }
}

// ---------- Shell ----------

export default function DocsPage() {
  const [active, setActive] = useState("overview");
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sync = () => {
      setActive(resolve(window.location.hash.slice(1)));
      setMenuOpen(false);
      window.scrollTo({ top: 0 });
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return NAV;
    return NAV.map((g) => ({ ...g, items: g.items.filter((i) => i.title.toLowerCase().includes(q)) })).filter(
      (g) => g.items.length > 0
    );
  }, [query]);

  const index = ALL_ITEMS.findIndex((i) => i.id === active);
  const prev = ALL_ITEMS[index - 1];
  const next = ALL_ITEMS[index + 1];
  const current = ALL_ITEMS[index];

  const nav = (
    <nav aria-label="Documentation">
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search docs"
        className="w-full h-10 mb-8 rounded-lg border border-border bg-background px-3.5 text-base sm:text-[14px] outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground"
      />
      <div className="space-y-8">
        {groups.map((g) => (
          <div key={g.title}>
            <div className="text-[12px] font-medium text-muted-foreground mb-2">{g.title}</div>
            <ul>
              {g.items.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={active === item.id ? "page" : undefined}
                    className={cn(
                      "block py-1.5 text-[14px] transition-colors",
                      active === item.id ? "text-primary font-medium" : "text-foreground/75 hover:text-foreground"
                    )}
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <Header activePage="docs" />

      {/* Docs Header Bar */}
      <div className="pt-24 pb-8 border-b border-border/60 bg-gradient-to-b from-brand-soft/40 via-background to-background dark:from-night dark:via-background dark:to-background">
        <div className="max-w-[1350px] mx-auto px-6 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-semibold uppercase tracking-wider">
                <Terminal className="w-3.5 h-3.5" />
                Builder Documentation • Employee Studio
              </div>
              <h1 className="text-2xl sm:text-4xl font-display font-semibold tracking-tight text-foreground">
                Builder Documentation & Technical Reference
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl">
                The comprehensive technical guide for building, testing, and distributing autonomous AI employees using Fless Employee Studio and runtime governance.
              </p>
            </div>

            {/* Quick Search Filter */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter documentation topics..."
                className="w-full h-10 pl-9 pr-4 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
              />
            </div>
          </div>

          {/* Builder Quick Navigation Pill Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-expanded={menuOpen}
              className="w-full h-12 flex items-center justify-between text-[14px]"
            >
              <span className="text-muted-foreground">
                Docs <span className="mx-1.5">/</span>
                <span className="text-foreground font-medium">{current?.title}</span>
              </span>
              <span className="text-muted-foreground">{menuOpen ? "Close" : "Menu"}</span>
            </button>
          </div>
          {menuOpen && (
            <div className="max-h-[70vh] overflow-y-auto px-5 sm:px-6 pt-2 pb-8 border-t border-border/60">{nav}</div>
          )}
        </div>

      {/* Unified Documentation Workspace: Left Sidebar + Main Content */}
      <div className="flex-1 max-w-[1350px] mx-auto px-6 w-full py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Unified Side Tabs Navigation */}
        <aside className="lg:col-span-3 space-y-6">
          <div className="sticky top-28 space-y-6 max-h-[calc(100vh-130px)] overflow-y-auto pr-2 scrollbar-thin">
            {filteredSections.map((section) => (
              <div key={section.title} className="space-y-1">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground px-3 mb-2">
                  {section.title}
                </div>
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activePageId === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActivePageId(item.id);
                        setActivePluginTab("overview");
                      }}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-2 rounded-xl text-[13px] font-medium transition-all text-left",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20 font-semibold"
                          : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                      )}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <Icon className="w-4 h-4 shrink-0" />
                        <span className="truncate">{item.title}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={cn(
                            "px-1.5 py-0.5 rounded text-[10px] font-mono shrink-0 ml-1.5",
                            isActive ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}

            {/* Private Beta SDK Notice Box */}
            <div className="p-4 rounded-2xl border border-primary/20 bg-primary/[0.04] dark:bg-night space-y-2 text-xs">
              <div className="font-semibold text-foreground flex items-center gap-1.5">
                <Boxes className="w-3.5 h-3.5 text-primary" />
                SDK Private Beta
              </div>
              <p className="text-muted-foreground leading-normal">
                The employee SDK is currently in private beta with accepted builders:
              </p>
              <div className="pt-1">
                <Link
                  href="/builders#apply"
                  className="inline-flex items-center gap-1 text-primary font-semibold hover:underline"
                >
                  Request SDK Access <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Pane */}
        <main className="lg:col-span-9 space-y-10 min-w-0">
          {/* SECTION: INTRO */}
          {activePageId === "intro" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">Overview</span>
                <h2 className="text-3xl font-display font-semibold tracking-tight text-foreground">
                  Fless Platform Overview & Architecture
                </h2>
                <p className="text-muted-foreground text-base leading-relaxed">
                  Fless is an infrastructure and distribution platform for autonomous AI employees. Businesses hire modular AI workers across 9 specialized departments (Marketing, Voice, Sales, Customer Support, Operations, Finance, Recruitment, HR, and Legal), while creators and developers build, evaluate, and monetize custom employees via Fless Studio and the TypeScript SDK.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-5 rounded-2xl border border-primary/30 bg-background space-y-2">
                  <div className="font-bold text-foreground flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-primary" />
                    Multi-Agent Core
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Coordinate teams of specialist sub-agents with dedicated roles, models, and tools using supervisor or pipeline workflows.
                  </p>
                </div>

                <div className="p-5 rounded-2xl border border-emerald-500/30 bg-background space-y-2">
                  <div className="font-bold text-foreground flex items-center gap-2">
                    <Layers className="w-4 h-4 text-emerald-500" />
                    Employee Studio & Live Sandbox
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Build employees in plain words with chat-and-click tools, verified live in a hermetic test sandbox without writing code.
                  </p>
                </div>

                <div className="p-5 rounded-2xl border border-amber-500/30 bg-background space-y-2">
                  <div className="font-bold text-foreground flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-amber-500" />
                    70/30 Creator Payouts
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Earn 70% of monthly subscriptions and metered usage fees automatically when businesses hire your verified AI workers.
                  </p>
                </div>
              </div>

              {/* 4-Layer Platform Stack */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-display font-semibold text-foreground flex items-center gap-2">
                    <Boxes className="w-5 h-5 text-primary" />
                    The 4 Platform Architecture Layers
                  </h3>
                  <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                    NVIDIA Inception Member
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-5 rounded-2xl border border-border bg-card space-y-3 relative overflow-hidden">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-primary/10 text-primary">Layer 1</span>
                      <h4 className="font-semibold text-foreground">Accelerated Compute Infrastructure</h4>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      GPU-accelerated inference cluster optimized with TensorRT-LLM and vLLM pipelines. Provides low-latency streaming endpoints for real-time model interaction and tool calls.
                    </p>
                    <div className="text-[11px] text-muted-foreground font-mono bg-muted/50 p-2.5 rounded-xl border border-border/50">
                      NVIDIA Tensor Core GPUs • vLLM Engine • WebRTC / gRPC Low Latency
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl border border-border bg-card space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-500">Layer 2</span>
                      <h4 className="font-semibold text-foreground">Fless SDK & Runtime Engine</h4>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Developer tooling and runtime framework. Exposes <code className="font-mono text-primary">defineEmployee()</code>, stateful execution context, multi-agent supervisors, and dynamic tool bindings.
                    </p>
                    <div className="text-[11px] text-muted-foreground font-mono bg-muted/50 p-2.5 rounded-xl border border-border/50">
                      @fless/employee-sdk • Supervisor Runtime • Tool Permission Gatekeeper
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl border border-border bg-card space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/10 text-amber-500">Layer 3</span>
                      <h4 className="font-semibold text-foreground">Employee Registry & Sandbox Engine</h4>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Hermetic testbed and verification registry. Runs automated multi-turn synthetic workloads, verifies tool mock adapters, and grades builds across an 11-dimension rubric.
                    </p>
                    <div className="text-[11px] text-muted-foreground font-mono bg-muted/50 p-2.5 rounded-xl border border-border/50">
                      Risk Gates (LOW → CRITICAL) • Hermetic Mock Adapters • 11-Dimension Rubric
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl border border-border bg-card space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-500/10 text-purple-500">Layer 4</span>
                      <h4 className="font-semibold text-foreground">AI Workforce Marketplace</h4>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Global distribution network for enterprise hiring. Enforces zero-trust business sandboxes, customer data isolation, and metered subscription billing.
                    </p>
                    <div className="text-[11px] text-muted-foreground font-mono bg-muted/50 p-2.5 rounded-xl border border-border/50">
                      Enterprise Marketplace • Multi-Tenant Isolation • Automatic Payouts
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-border bg-brand-soft/20 dark:bg-night space-y-3">
                <h3 className="text-sm font-semibold text-foreground">Quick Navigation</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Check out the 5-Minute Quickstart to build an employee manifest, or explore the Manifest Reference Data to see all supported countries, industries, pricing models, and capabilities.
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    onClick={() => setActivePageId("quickstart")}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-semibold text-xs shadow-sm hover:bg-primary-hover transition-colors"
                  >
                    5-Minute Quickstart →
                  </button>
                  <button
                    onClick={() => setActivePageId("ref-pricing")}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border bg-background text-foreground font-semibold text-xs hover:bg-muted transition-colors"
                  >
                    Pricing & Units Reference →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: QUICKSTART */}
          {activePageId === "quickstart" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">Get Started</span>
                <h2 className="text-3xl font-display font-semibold tracking-tight text-foreground">
                  5-Minute Builder Quickstart
                </h2>
                <p className="text-muted-foreground text-base">
                  Author, simulate, and verify a production-ready AI employee in 3 simple steps.
                </p>
              </div>

              <div className="space-y-6">
                <div className="p-5 rounded-2xl border border-border bg-background space-y-3">
                  <div className="flex items-center gap-2 font-semibold text-foreground">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-mono text-xs">1</span>
                    Request SDK Access
                  </div>
                  <p className="text-xs text-muted-foreground">
                    The SDK is currently distributed to accepted builders during private beta:
                  </p>
                  <div className="pt-1">
                    <Link
                      href="/builders#apply"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-semibold text-xs hover:bg-primary-hover"
                    >
                      Request SDK Access in Private Beta →
                    </Link>
                  </div>
                </div>

                <div className="p-5 rounded-2xl border border-border bg-background space-y-3">
                  <div className="flex items-center gap-2 font-semibold text-foreground">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-mono text-xs">2</span>
                    Create Your Employee Manifest
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Create <code className="font-mono text-primary">employee.ts</code> with your prompt, pricing, plugins, and knowledge:
                  </p>
                  <CodeBlock
                    code={`import { defineEmployee } from '@fless/employee-sdk';

export default defineEmployee({
  id: 'clinic-front-desk',
  name: 'Clinic Front-Desk Receptionist',
  version: '1.0.0',
  department: 'VOICE',
  targetMarket: {
    industries: ['Healthcare'],
    countries: ['NG', 'GH', 'KE'],
    businessTypes: ['Clinic', 'Hospital'],
    languages: ['en', 'pcm'],
  },
  pricing: {
    model: 'BASE_PLUS_USAGE',
    basePriceCents: 4900, // $49/mo
    billingInterval: 'MONTHLY',
    currency: 'USD',
    usageRates: [
      { eventType: 'VOICE_CALL_MINUTE', unitPriceCents: 15, includedUnits: 300 },
    ],
  },
  capabilities: ['voice.inbound', 'calendar.availability', 'calendar.booking', 'crm.sync'],
  requiredPackages: ['@fless/voice', '@fless/google-calendar', '@fless/crm'],
  
  knowledge: [
    {
      id: 'clinic-hours-faq',
      name: 'Clinic Hours & Doctor List',
      type: 'TEXT',
      country: 'NG',
      industry: 'Healthcare',
      content: 'Clinic is open Monday-Saturday 8am to 6pm. Dr. Okonjo handles dentistry.',
    },
  ],

  systemPrompt: \`You are an empathetic, efficient clinic receptionist. 
You book patient consultations, triage inquiries, and warm transfer emergencies.\`,
  tools: [
    'voice.transfer',
    'calendar.checkAvailability',
    'calendar.bookAppointment',
    'crm.lookupContact',
    'crm.syncLead',
  ],
});`}
                    language="typescript"
                  />
                </div>

                <div className="p-5 rounded-2xl border border-border bg-background space-y-3">
                  <div className="flex items-center gap-2 font-semibold text-foreground">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-mono text-xs">3</span>
                    Simulate Locally Offline
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Run local simulations without needing API keys or live credentials:
                  </p>
                  <CodeBlock
                    code={`import { EmployeeSandboxRunner } from '@fless/employee-sdk';
import employee from './employee';

async function testLocally() {
  const runner = new EmployeeSandboxRunner(employee);
  const result = await runner.simulateMessage({
    role: 'user',
    content: 'Do you have slots for dental cleaning this Friday at 2 PM?',
  });

  console.log('AI Response:', result.text);
  console.log('Executed Tools:', result.executedTools);
}

testLocally();`}
                    language="typescript"
                  />
                </div>
              </div>
            </div>
          )}

          {/* SECTION: SINGLE SDK MODEL */}
          {activePageId === "single-sdk" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">Architecture</span>
                <h2 className="text-3xl font-display font-semibold tracking-tight text-foreground">
                  The Single SDK Model
                </h2>
                <p className="text-muted-foreground text-base leading-relaxed">
                  Why builders only install <code className="font-mono text-primary font-semibold">@fless/employee-sdk</code> and never have to manage separate packages for plugins.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-primary/30 bg-background space-y-3 text-sm">
                <div className="font-semibold text-foreground flex items-center gap-2">
                  <CheckCheck className="w-4 h-4 text-primary" />
                  Everything in One Package
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  When you build an AI employee, you import manifest builders and test harnesses directly from <code className="font-mono text-primary">@fless/employee-sdk</code>. You don&apos;t install separate npm modules for WhatsApp, Slack, or Google Calendar. Instead, you declare official plugin IDs in your manifest&apos;s <code className="font-mono text-primary">requiredPackages</code> array.
                </p>
                <div className="pt-2 text-xs font-mono text-muted-foreground bg-muted/60 p-3 rounded-xl">
                  requiredPackages: [&apos;@fless/whatsapp&apos;, &apos;@fless/google-calendar&apos;, &apos;@fless/crm&apos;]
                </div>
              </div>
            </div>
          )}

          {/* SECTION: 5-STEP BUILDER JOURNEY */}
          {activePageId === "builder-journey" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">Builder Workflow</span>
                <h2 className="text-3xl font-display font-semibold tracking-tight text-foreground">
                  The 5-Step Builder Journey
                </h2>
                <p className="text-muted-foreground text-base leading-relaxed">
                  Whether using our no-code Fless Studio or the typed TypeScript SDK, every autonomous employee follows a unified 5-step lifecycle from concept to recurring marketplace revenue.
                </p>
              </div>

              {/* 5-Step Visual Flow Cards */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs">
                {[
                  { step: "1", title: "Describe", subtitle: "Initial idea", desc: "Specify employee name, role, department, tone, and operational brief." },
                  { step: "2", title: "Refine", subtitle: "Apps & skills", desc: "Connect official tool plugins, set approval thresholds & guardrails." },
                  { step: "3", title: "Test", subtitle: "Live sandbox", desc: "Run multi-turn scenarios against mock adapters with zero token burn." },
                  { step: "4", title: "Publish", subtitle: "Make available", desc: "Deploy to private organization or release to public marketplace." },
                  { step: "5", title: "Earn", subtitle: "Royalties & payouts", desc: "Receive 70% recurring revenue share settled automatically every week." },
                ].map((s) => (
                  <div key={s.step} className="p-4 rounded-2xl border border-border bg-card space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="w-6 h-6 rounded-lg bg-primary/10 text-primary font-mono font-bold text-xs flex items-center justify-center">
                        {s.step}
                      </span>
                      <span className="text-[10px] font-mono text-muted-foreground">{s.subtitle}</span>
                    </div>
                    <div className="font-semibold text-foreground text-sm">{s.title}</div>
                    <p className="text-muted-foreground text-[11.5px] leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>

              {/* In-Depth Breakdown */}
              <div className="space-y-6 pt-2">
                {/* Step 1 & 2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-5 rounded-2xl border border-border bg-card space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-primary/10 text-primary">Step 1</span>
                      <h4 className="font-semibold text-sm text-foreground">Describe (Idea & Scope Formulation)</h4>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      In <strong>Fless Studio</strong>, simply type your natural language prompt (e.g. <em>&quot;A customer support assistant for my Shopify store that answers FAQs, tracks orders, and handles returns&quot;</em>). In code, initialize with <code className="font-mono text-primary text-xs">createEmployee()</code>.
                    </p>
                    <div className="bg-muted/50 p-3 rounded-xl border border-border/50 text-muted-foreground font-mono text-[11px]">
                      Required: name, description, department, target countries.
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl border border-border bg-card space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-500">Step 2</span>
                      <h4 className="font-semibold text-sm text-foreground">Refine (Integrations & Governance)</h4>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Bind pre-built official packages like <code className="font-mono text-primary text-xs">@fless/whatsapp</code> or <code className="font-mono text-primary text-xs">@fless/shopify</code>. Define policy boundaries such as <code className="font-mono text-primary text-xs">maxRefundAutoApproveUSD: 50</code>, requiring human approval for actions above threshold.
                    </p>
                    <div className="bg-muted/50 p-3 rounded-xl border border-border/50 text-muted-foreground font-mono text-[11px]">
                      Security: Zero secret exposure • Automated PII redaction.
                    </div>
                  </div>
                </div>

                {/* Step 3 & 4 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-5 rounded-2xl border border-border bg-card space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/10 text-amber-500">Step 3</span>
                      <h4 className="font-semibold text-sm text-foreground">Test (Hermetic Sandbox Simulator)</h4>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Run synthetic conversation tests without sending real WhatsApp messages or hitting live APIs. The sandbox verifies turn latency (<code className="font-mono text-primary text-xs">&lt;180ms</code>), tool execution schemas, and zero-hallucination compliance before deployment.
                    </p>
                    <div className="bg-muted/50 p-3 rounded-xl border border-border/50 text-muted-foreground font-mono text-[11px]">
                      Tool trace logging • Automated edge-case assertions.
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl border border-border bg-card space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-500/10 text-purple-500">Step 4</span>
                      <h4 className="font-semibold text-sm text-foreground">Publish (Deployment & Distribution)</h4>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Choose between <strong>Private Deployment</strong> (restricted to internal corporate users with SSO) and <strong>Public Marketplace</strong> (listed to 4,000+ businesses globally with automated checkout). Deploy via Studio or run <code className="font-mono text-primary text-xs">npx fless deploy</code>.
                    </p>
                    <div className="bg-muted/50 p-3 rounded-xl border border-border/50 text-muted-foreground font-mono text-[11px]">
                      CLI: npx fless deploy ./employee.ts --prod
                    </div>
                  </div>
                </div>

                {/* Step 5 Banner */}
                <div className="p-6 rounded-2xl border border-primary/30 bg-primary/[0.04] flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-primary text-white">Step 5</span>
                      <h4 className="font-semibold text-base text-foreground">Earn: 70% Builder Royalties & Multi-Currency Settlement</h4>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed max-w-2xl">
                      Whenever an enterprise or SMB hires your AI employee, you receive 70% of all gross monthly subscriptions and metered usage revenue. Fless handles inference hosting, gateway maintenance, and GPU scaling from the 30% platform share.
                    </p>
                  </div>
                  <div className="px-5 py-3 rounded-xl bg-card border border-primary/30 text-center shrink-0">
                    <div className="text-xs font-mono text-muted-foreground">Payout Ratio</div>
                    <div className="text-lg font-display font-bold text-primary">70% Builder / 30% Fless</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: PRICING CONFIGURATION */}
          {activePageId === "ref-pricing" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">Manifest Reference</span>
                <h2 className="text-3xl font-display font-semibold tracking-tight text-foreground">
                  Pricing Models & Usage Units Reference
                </h2>
                <p className="text-muted-foreground text-base leading-relaxed">
                  How creators configure monetized AI employees with subscription plans, metered event rates, and automatic 70/30 payouts.
                </p>
              </div>

              {/* Pricing Models Table */}
              <div className="space-y-3">
                <h3 className="text-base font-semibold text-foreground">1. Supported Pricing Models (<code className="font-mono text-primary text-xs">pricing.model</code>)</h3>
                <div className="border border-border/80 rounded-2xl overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-muted/60 text-muted-foreground border-b border-border/80">
                      <tr>
                        <th className="p-3">Model Enum</th>
                        <th className="p-3">Billing Behavior</th>
                        <th className="p-3">Ideal Use Case</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      <tr>
                        <td className="p-3 font-mono font-semibold text-primary">SUBSCRIPTION</td>
                        <td className="p-3 text-muted-foreground">Fixed flat recurring charge per interval (e.g. $49/month) with unlimited or fair-use quota.</td>
                        <td className="p-3 text-muted-foreground">Marketing managers, social media autopilots, compliance monitors.</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-semibold text-primary">BASE_PLUS_USAGE</td>
                        <td className="p-3 text-muted-foreground">Base monthly retainer + metered overages per completed unit above included quota.</td>
                        <td className="p-3 text-muted-foreground">Inbound phone receptionists (e.g. $49/mo + $0.15/min over 300 mins).</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-semibold text-primary">TASK</td>
                        <td className="p-3 text-muted-foreground">Purely pay-per-unit charge executed on demand (e.g. $1.50 per verified document).</td>
                        <td className="p-3 text-muted-foreground">Invoice OCR parsers, candidate vetting agents, KYC processors.</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-semibold text-primary">HOURLY</td>
                        <td className="p-3 text-muted-foreground">Metered strictly by active shift duration logged by the AI employee.</td>
                        <td className="p-3 text-muted-foreground">Live chat shift support agents, outbound calling campaign operators.</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-semibold text-primary">EVENT_DRIVEN</td>
                        <td className="p-3 text-muted-foreground">Charges triggered on explicit success webhook events (e.g. booked appointments).</td>
                        <td className="p-3 text-muted-foreground">Sales appointment setters, high-value lead qualifiers.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Usage Event Types */}
              <div className="space-y-3">
                <h3 className="text-base font-semibold text-foreground">2. Usage Event Types (<code className="font-mono text-primary text-xs">usageRates[].eventType</code>)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  {[
                    { type: "VOICE_CALL_MINUTE", desc: "Metered per active minute of inbound or outbound telephony voice streaming." },
                    { type: "INVOICE_PROCESSED", desc: "Metered per financial document, PDF, or receipt scanned and parsed." },
                    { type: "CHAT_MESSAGE", desc: "Metered per inbound/outbound WhatsApp, Slack, or web conversation turn." },
                    { type: "LEAD_QUALIFIED", desc: "Metered per sales contact evaluated, enriched, and synced to CRM." },
                    { type: "EMAIL_SENT", desc: "Metered per transactional or follow-up email drafted and delivered." },
                    { type: "DOCUMENT_PARSED", desc: "Metered per legal agreement, KYC ID card, or medical form ingested." },
                    { type: "SMS_SENT", desc: "Metered per SMS notification or OTP dispatch." },
                    { type: "TASK_COMPLETED", desc: "Metered per complex multi-step automated operational workflow." },
                  ].map((item) => (
                    <div key={item.type} className="p-3.5 rounded-xl border border-border bg-background space-y-1">
                      <div className="font-mono font-semibold text-primary">{item.type}</div>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Currencies & Intervals */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl border border-border bg-background space-y-2">
                  <div className="font-semibold text-foreground">Supported Currencies (<code className="font-mono text-primary">currency</code>)</div>
                  <div className="flex flex-wrap gap-1 font-mono text-[11px]">
                    {["USD", "NGN", "GBP", "EUR", "KES", "GHS", "ZAR", "CAD", "AUD", "AED"].map((c) => (
                      <span key={c} className="px-2 py-0.5 rounded bg-muted text-foreground">{c}</span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-border bg-background space-y-2">
                  <div className="font-semibold text-foreground">Billing Intervals (<code className="font-mono text-primary">billingInterval</code>)</div>
                  <div className="flex flex-wrap gap-1 font-mono text-[11px]">
                    {["MONTHLY", "WEEKLY", "ANNUAL", "ONE_TIME"].map((bi) => (
                      <span key={bi} className="px-2 py-0.5 rounded bg-muted text-foreground">{bi}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Payout Structure */}
              <div className="p-5 rounded-2xl border border-emerald-500/25 bg-emerald-500/[0.04] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="font-semibold text-foreground text-sm">Automatic 70/30 Creator Payouts</div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Creators receive 70% of all gross subscription and usage revenues. Fless retains 30% for infrastructure, gateway hosting, and billing operations.
                  </p>
                </div>
                <div className="px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-mono font-bold text-xs shrink-0">
                  70% Creator / 30% Platform
                </div>
              </div>
            </div>
          )}

          {/* SECTION: COUNTRIES & ISO CODES */}
          {activePageId === "ref-countries" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">Manifest Reference</span>
                <h2 className="text-3xl font-display font-semibold tracking-tight text-foreground">
                  Supported Countries & ISO Alpha-2 Codes
                </h2>
                <p className="text-muted-foreground text-base leading-relaxed">
                  Used in <code className="font-mono text-primary text-xs">targetMarket.countries</code> and knowledge source filters (<code className="font-mono text-primary text-xs">knowledge[].country</code>) to ground AI employees with localized regulations and phone numbers.
                </p>
              </div>

              <div className="border border-border/80 rounded-2xl overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead className="bg-muted/60 text-muted-foreground border-b border-border/80">
                    <tr>
                      <th className="p-3">Country Name</th>
                      <th className="p-3">ISO Code</th>
                      <th className="p-3">Default Currency</th>
                      <th className="p-3">Phone Prefix</th>
                      <th className="p-3">Regional Regulatory Context</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {[
                      { name: "Nigeria", code: "NG", curr: "NGN", prefix: "+234", notes: "CBN AML/KYC directives, NDPR data privacy compliance" },
                      { name: "Ghana", code: "GH", curr: "GHS", prefix: "+233", notes: "BoG Fintech guidelines, Data Protection Act" },
                      { name: "Kenya", code: "KE", curr: "KES", prefix: "+254", notes: "CBK mobile payment & data protection frameworks" },
                      { name: "South Africa", code: "ZA", curr: "ZAR", prefix: "+27", notes: "POPIA compliance, SARB financial regulations" },
                      { name: "United States", code: "US", curr: "USD", prefix: "+1", notes: "FTC Act, SEC/FINRA (Fintech), FCC TCPA" },
                      { name: "United Kingdom", code: "GB", curr: "GBP", prefix: "+44", notes: "UK GDPR, FCA compliance, NHS scheduling formats" },
                      { name: "Canada", code: "CA", curr: "CAD", prefix: "+1", notes: "PIPEDA privacy compliance, FINTRAC regulations" },
                      { name: "Germany", code: "DE", curr: "EUR", prefix: "+49", notes: "EU GDPR, BaFin financial directives" },
                      { name: "France", code: "FR", curr: "EUR", prefix: "+33", notes: "EU GDPR, CNIL regulatory compliance" },
                      { name: "United Arab Emirates", code: "AE", curr: "AED", prefix: "+971", notes: "CBUAE fintech framework, DIFC / ADGM jurisdiction" },
                      { name: "Australia", code: "AU", curr: "AUD", prefix: "+61", notes: "Privacy Act 1988, APRA financial standards" },
                      { name: "India", code: "IN", curr: "INR", prefix: "+91", notes: "DPDP Act, RBI payment aggregator directives" },
                    ].map((c) => (
                      <tr key={c.code}>
                        <td className="p-3 font-medium text-foreground">{c.name}</td>
                        <td className="p-3 font-mono font-bold text-primary">{c.code}</td>
                        <td className="p-3 font-mono text-muted-foreground">{c.curr}</td>
                        <td className="p-3 font-mono text-muted-foreground">{c.prefix}</td>
                        <td className="p-3 text-muted-foreground">{c.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SECTION: INDUSTRIES & BUSINESS TYPES */}
          {activePageId === "ref-industries" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">Manifest Reference</span>
                <h2 className="text-3xl font-display font-semibold tracking-tight text-foreground">
                  Target Industries & Business Types
                </h2>
                <p className="text-muted-foreground text-base leading-relaxed">
                  Use these canonical strings in <code className="font-mono text-primary text-xs">targetMarket.industries</code> and <code className="font-mono text-primary text-xs">targetMarket.businessTypes</code> so the marketplace can accurately match your AI employee with hiring businesses.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {[
                  {
                    industry: "Healthcare",
                    types: ["Clinic", "Hospital", "Dental Practice", "Pharmacy", "Diagnostic Lab", "Telehealth Clinic", "Physiotherapy"],
                  },
                  {
                    industry: "Fintech & Financial Services",
                    types: ["Digital Bank", "Microfinance Institution", "Lending Platform", "Insurance Agency", "Payment Processor", "Accounting Firm"],
                  },
                  {
                    industry: "Real Estate & Property",
                    types: ["Real Estate Agency", "Property Management", "Short-Let / Airbnb Operator", "Commercial Leasing", "Construction Firm"],
                  },
                  {
                    industry: "E-Commerce & Retail",
                    types: ["Online Store", "Fashion Brand", "Electronics Retailer", "FMCG Distributor", "Multi-Vendor Marketplace", "Beauty & Cosmetics"],
                  },
                  {
                    industry: "Hospitality & Travel",
                    types: ["Hotel & Resort", "Restaurant & Cafe", "Tour Operator", "Short-Term Rental", "Event Venue", "Travel Agency"],
                  },
                  {
                    industry: "Legal & Professional Services",
                    types: ["Law Firm", "Corporate Registry", "Notary Service", "Audit Agency", "HR & Recruitment Consultancy"],
                  },
                  {
                    industry: "Logistics & Supply Chain",
                    types: ["Courier & Delivery Service", "Freight Forwarder", "Warehousing & Fulfillment", "Fleet Management"],
                  },
                  {
                    industry: "Education & Training",
                    types: ["Online Academy", "Private K-12 School", "Tutoring Center", "Higher Ed Institution", "Corporate Training"],
                  },
                  {
                    industry: "Automotive",
                    types: ["Dealership", "Auto Repair & Service", "Car Rental Agency", "Spare Parts Distributor"],
                  },
                ].map((item) => (
                  <div key={item.industry} className="p-4 rounded-2xl border border-border bg-background space-y-2 shadow-sm">
                    <div className="font-semibold text-foreground flex items-center gap-1.5 text-sm">
                      <Building2 className="w-4 h-4 text-primary" />
                      {item.industry}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {item.types.map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded bg-muted text-muted-foreground font-mono text-[11px]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION: LANGUAGES */}
          {activePageId === "ref-languages" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">Manifest Reference</span>
                <h2 className="text-3xl font-display font-semibold tracking-tight text-foreground">
                  Supported Languages & BCP-47 Codes
                </h2>
                <p className="text-muted-foreground text-base leading-relaxed">
                  Use in <code className="font-mono text-primary text-xs">targetMarket.languages</code> to declare the conversational languages your AI employee supports in chat and voice telephony.
                </p>
              </div>

              <div className="border border-border/80 rounded-2xl overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead className="bg-muted/60 text-muted-foreground border-b border-border/80">
                    <tr>
                      <th className="p-3">Language</th>
                      <th className="p-3">BCP-47 / ISO Code</th>
                      <th className="p-3">Chat Support</th>
                      <th className="p-3">Voice Telephony Synthesis</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {[
                      { lang: "English", code: "en", chat: "Full", voice: "Native Accents (US, UK, Nigerian, Ghanaian, Kenyan, Indian, Aussie)" },
                      { lang: "Nigerian Pidgin", code: "pcm", chat: "Full", voice: "Native West African Pidgin Voice Model" },
                      { lang: "Yoruba", code: "yo", chat: "Full", voice: "High Quality Tone-Accented Voice Model" },
                      { lang: "Hausa", code: "ha", chat: "Full", voice: "Northern Nigerian & Sahel Voice Model" },
                      { lang: "Igbo", code: "ig", chat: "Full", voice: "Eastern Nigerian Dialect Voice Model" },
                      { lang: "French", code: "fr", chat: "Full", voice: "Standard European & West African Francophone Voices" },
                      { lang: "Spanish", code: "es", chat: "Full", voice: "Latin American & European Spanish" },
                      { lang: "Arabic", code: "ar", chat: "Full", voice: "Modern Standard & Gulf Arabic" },
                      { lang: "Swahili", code: "sw", chat: "Full", voice: "East African Standard Swahili" },
                      { lang: "German", code: "de", chat: "Full", voice: "Standard German" },
                      { lang: "Portuguese", code: "pt", chat: "Full", voice: "Brazilian & European Portuguese" },
                    ].map((l) => (
                      <tr key={l.code}>
                        <td className="p-3 font-medium text-foreground">{l.lang}</td>
                        <td className="p-3 font-mono font-bold text-primary">{l.code}</td>
                        <td className="p-3 text-emerald-600 dark:text-emerald-400 font-semibold">{l.chat}</td>
                        <td className="p-3 text-muted-foreground">{l.voice}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SECTION: DEPARTMENTS */}
          {activePageId === "ref-departments" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">Manifest Reference</span>
                <h2 className="text-3xl font-display font-semibold tracking-tight text-foreground">
                  Departments & Roles Reference
                </h2>
                <p className="text-muted-foreground text-base leading-relaxed">
                  Use in <code className="font-mono text-primary text-xs">department</code> to categorize which organizational desk your AI employee operates in.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                {[
                  { dept: "MARKETING", desc: "Social media publishing, Meta ad campaign monitoring, content drafting, audience engagement." },
                  { dept: "VOICE", desc: "Real-time telephony phone reception, outbound dialers, booking appointments, warm call transfers." },
                  { dept: "SALES", desc: "Inbound lead qualification, CRM deal pipeline management, outbound prospecting & demo booking." },
                  { dept: "SUPPORT", desc: "WhatsApp customer triage, multi-channel ticketing, order tracking, returns & refunds." },
                  { dept: "OPERATIONS", desc: "Internal team dispatching, Slack escalation management, logistics, and field team tracking." },
                  { dept: "FINANCE", desc: "Accounts payable, invoice parsing, receipt scanning, payment status checks, ledger sync." },
                  { dept: "RECRUITMENT", desc: "Candidate sourcing, resume screening, talent pipeline intake, initial screening calls." },
                  { dept: "HR", desc: "Employee onboarding, handbook FAQs, policy guidance, internal team support." },
                  { dept: "LEGAL", desc: "Contract metadata extraction, NDA review assistance, policy clause checks, indemnity audits." },
                ].map((item) => (
                  <div key={item.dept} className="p-4 rounded-xl border border-border bg-background space-y-1.5 shadow-sm">
                    <div className="font-mono font-bold text-primary text-sm">{item.dept}</div>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION: CAPABILITIES */}
          {activePageId === "ref-capabilities" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">Manifest Reference</span>
                <h2 className="text-3xl font-display font-semibold tracking-tight text-foreground">
                  Canonical Capabilities Reference
                </h2>
                <p className="text-muted-foreground text-base leading-relaxed">
                  Declare these capability identifiers in <code className="font-mono text-primary text-xs">capabilities</code> to define what your AI employee is authorized to perform.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    category: "Voice Telephony",
                    items: [
                      { id: "voice.inbound", name: "Answer Inbound Calls", desc: "Receives real-time telephone calls with sub-500ms voice synthesis." },
                      { id: "voice.outbound", name: "Place Outbound Calls", desc: "Places phone calls to customer contact lists." },
                      { id: "voice.transfer", name: "Warm Call Transfer", desc: "Transfers live calls to human staff phone numbers." },
                    ],
                  },
                  {
                    category: "Calendar & Scheduling",
                    items: [
                      { id: "calendar.availability", name: "Check Availability", desc: "Queries open calendar slots across team calendars." },
                      { id: "calendar.booking", name: "Book Appointments", desc: "Creates confirmed events and dispatches invites." },
                      { id: "calendar.reschedule", name: "Reschedule Appointments", desc: "Modifies or cancels existing bookings." },
                    ],
                  },
                  {
                    category: "CRM & Contacts",
                    items: [
                      { id: "crm.contact_lookup", name: "Contact Record Lookup", desc: "Retrieves customer profile and past interaction history." },
                      { id: "crm.lead_sync", name: "Sync Lead Pipeline", desc: "Updates deal stages and customer interaction notes." },
                    ],
                  },
                  {
                    category: "Messaging & Email",
                    items: [
                      { id: "communication.chat", name: "WhatsApp & Web Chat", desc: "Two-way customer messaging on WhatsApp and live chat." },
                      { id: "communication.email_send", name: "Send Emails", desc: "Dispatches transactional emails, quotes, and follow-ups." },
                      { id: "communication.email_triage", name: "Email Inbox Triage", desc: "Categorizes and summarizes inbound email threads." },
                    ],
                  },
                  {
                    category: "Social & Marketing",
                    items: [
                      { id: "marketing.social_publishing", name: "Publish Social Content", desc: "Publishes posts to Instagram, Facebook, and LinkedIn." },
                      { id: "marketing.ads_management", name: "Manage Ad Campaigns", desc: "Queries metrics and adjusts Meta ad campaign budgets." },
                    ],
                  },
                  {
                    category: "Document Intelligence",
                    items: [
                      { id: "documents.ocr", name: "OCR & Vision Extraction", desc: "Scans PDFs, receipts, and images for raw text and tables." },
                      { id: "documents.structured_extract", name: "Structured JSON Extraction", desc: "Parses documents into validated JSON schemas." },
                    ],
                  },
                ].map((group) => (
                  <div key={group.category} className="space-y-2">
                    <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <Tag className="w-3.5 h-3.5 text-primary" />
                      {group.category}
                    </h3>
                    <div className="border border-border/80 rounded-xl overflow-hidden text-xs">
                      <table className="w-full text-left">
                        <thead className="bg-muted/60 text-muted-foreground border-b border-border/80">
                          <tr>
                            <th className="p-2.5">Capability ID</th>
                            <th className="p-2.5">Name</th>
                            <th className="p-2.5">Description</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border/60">
                          {group.items.map((item) => (
                            <tr key={item.id}>
                              <td className="p-2.5 font-mono font-semibold text-primary">{item.id}</td>
                              <td className="p-2.5 font-medium text-foreground">{item.name}</td>
                              <td className="p-2.5 text-muted-foreground">{item.desc}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION: MODEL TIERS */}
          {activePageId === "ref-model-tiers" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">Manifest Reference</span>
                <h2 className="text-3xl font-display font-semibold tracking-tight text-foreground">
                  Model Tiers & Execution Latency
                </h2>
                <p className="text-muted-foreground text-base leading-relaxed">
                  Use in <code className="font-mono text-primary text-xs">agents[].modelTier</code> to choose the optimal balance of reasoning depth, token cost, and speed.
                </p>
              </div>

              <div className="border border-border/80 rounded-2xl overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead className="bg-muted/60 text-muted-foreground border-b border-border/80">
                    <tr>
                      <th className="p-3">Tier (<code className="font-mono text-primary">modelTier</code>)</th>
                      <th className="p-3">Latency Target</th>
                      <th className="p-3">Best For</th>
                      <th className="p-3">Underlying Model Profile</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {[
                      { tier: "fast", latency: "< 350ms", best: "Triage, intent classification, calendar lookup, simple tool routing", desc: "Ultra-fast low-parameter LLMs optimized for throughput" },
                      { tier: "standard", latency: "600ms - 1.2s", best: "Customer chat, email drafting, WhatsApp support conversations", desc: "Balanced production chat LLM with strong instruction adherence" },
                      { tier: "reasoning", latency: "1.5s - 4.0s", best: "Supervisor lead agents, legal compliance checks, multi-step math", desc: "Deep reasoning LLM with step-by-step chain-of-thought verification" },
                      { tier: "vision", latency: "1.0s - 2.5s", best: "PDF invoice scanning, photo intake, receipt table extraction", desc: "Multimodal vision model for visual document comprehension" },
                      { tier: "voice", latency: "< 250ms (Streaming)", best: "Live telephony phone conversations with real-time interruptions", desc: "Streaming LLM paired directly with real-time audio pipelines" },
                    ].map((m) => (
                      <tr key={m.tier}>
                        <td className="p-3 font-mono font-bold text-primary">{m.tier}</td>
                        <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400 font-semibold">{m.latency}</td>
                        <td className="p-3 text-foreground font-medium">{m.best}</td>
                        <td className="p-3 text-muted-foreground">{m.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SECTION: SDK OVERVIEW */}
          {activePageId === "sdk-overview" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">SDK Reference</span>
                <h2 className="text-3xl font-display font-semibold tracking-tight text-foreground">
                  SDK Overview & Installation
                </h2>
                <p className="text-muted-foreground text-base">
                  Complete reference for authoring and running AI employees in TypeScript.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-border bg-brand-soft/20 dark:bg-night space-y-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Access & Installation</div>
                <p className="text-xs text-muted-foreground">
                  The Employee SDK is currently in private beta with accepted builders. Request access to receive the private registry package and CLI:
                </p>
                <Link
                  href="/builders#apply"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-semibold text-xs hover:bg-primary-hover"
                >
                  Request SDK Access →
                </Link>
              </div>

              <div className="space-y-4">
                <h3 className="text-base font-semibold text-foreground">Primary SDK Exports</h3>
                <div className="border border-border/80 rounded-2xl overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-muted/60 text-muted-foreground border-b border-border/80">
                      <tr>
                        <th className="p-3">Export</th>
                        <th className="p-3">Type</th>
                        <th className="p-3">Purpose</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      <tr>
                        <td className="p-3 font-mono font-semibold text-primary">defineEmployee(manifest)</td>
                        <td className="p-3 font-mono text-muted-foreground">Function</td>
                        <td className="p-3 text-muted-foreground">Validates and compiles an AI employee manifest bundle.</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-semibold text-primary">defineAgent(agentSpec)</td>
                        <td className="p-3 font-mono text-muted-foreground">Function</td>
                        <td className="p-3 text-muted-foreground">Defines a specialist internal agent for multi-agent teams.</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-semibold text-primary">createEmployee(id)</td>
                        <td className="p-3 font-mono text-muted-foreground">Builder Factory</td>
                        <td className="p-3 text-muted-foreground">Fluent builder class for assembling AI employees programmatically.</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-semibold text-primary">EmployeeSandboxRunner</td>
                        <td className="p-3 font-mono text-muted-foreground">Class</td>
                        <td className="p-3 text-muted-foreground">Hermetic offline simulation harness for local testing.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: DEFINE EMPLOYEE */}
          {activePageId === "define-employee" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">SDK Method</span>
                <h2 className="text-3xl font-display font-semibold tracking-tight text-foreground">
                  defineEmployee(manifest)
                </h2>
                <p className="text-muted-foreground text-base">
                  The primary factory function for declaring an AI employee.
                </p>
              </div>

              <CodeBlock
                code={`import { defineEmployee } from '@fless/employee-sdk';

export default defineEmployee({
  id: 'sales-qualifier',
  name: 'Inbound Sales Lead Qualifier',
  version: '1.0.0',
  department: 'SALES',
  capabilities: ['crm.contact_lookup', 'crm.lead_sync', 'communication.email_send'],
  requiredPackages: ['@fless/crm', '@fless/mail'],
  systemPrompt: 'Qualify inbound leads and update CRM deal stages.',
  tools: ['crm.lookupContact', 'crm.syncLead', 'mail.sendEmail'],
});`}
                language="typescript"
              />
            </div>
          )}

          {/* SECTION: DEFINE AGENT */}
          {activePageId === "define-agent" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">SDK Method</span>
                <h2 className="text-3xl font-display font-semibold tracking-tight text-foreground">
                  defineAgent(agentSpec)
                </h2>
                <p className="text-muted-foreground text-base">
                  Declares sub-agents for multi-agent supervisor and pipeline team orchestration.
                </p>
              </div>

              <CodeBlock
                code={`import { defineAgent } from '@fless/employee-sdk';

export const bookingSpecialist = defineAgent({
  id: 'booking-specialist',
  name: 'Calendar Booking Specialist',
  role: 'Queries live calendar availability and books confirmed consultation slots.',
  responsibilities: [
    'Check available doctor slots within requested time window',
    'Prevent double bookings',
    'Send calendar invite email to guest',
  ],
  tools: ['calendar.checkAvailability', 'calendar.bookAppointment'],
  modelTier: 'fast',
  systemPrompt: 'Find matching calendar slots quickly and book them with zero friction.',
});`}
                language="typescript"
              />
            </div>
          )}

          {/* SECTION: CREATE EMPLOYEE BUILDER */}
          {activePageId === "create-employee" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">Fluent API</span>
                <h2 className="text-3xl font-display font-semibold tracking-tight text-foreground">
                  createEmployee & createAgent Fluent Builders
                </h2>
                <p className="text-muted-foreground text-base">
                  Programmatically construct multi-agent AI employees, skills, and multi-modal knowledge bases using chainable methods.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl border border-border bg-background space-y-2">
                  <div className="font-semibold text-foreground flex items-center gap-1.5">
                    <Workflow className="w-4 h-4 text-primary" />
                    Agent & Employee Skills
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Attach multiple skills using <code className="font-mono text-primary">.addSkill()</code>, <code className="font-mono text-primary">.addTextSkill()</code>, or <code className="font-mono text-primary">.addUrlSkill()</code> with procedural docs, guidelines, or reference URLs.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-border bg-background space-y-2">
                  <div className="font-semibold text-foreground flex items-center gap-1.5">
                    <Database className="w-4 h-4 text-emerald-500" />
                    Multi-Modal Knowledge Base
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Ground responses with raw text (<code className="font-mono text-primary">.addTextKnowledge()</code>), live documentation URLs (<code className="font-mono text-primary">.addUrlKnowledge()</code>), and PDFs (<code className="font-mono text-primary">.addPdfKnowledge()</code>).
                  </p>
                </div>
              </div>

              <CodeBlock
                code={`import { createEmployee, createAgent } from '@fless/employee-sdk';

// 1. Declare a specialist Scheduling Agent with dedicated skills and knowledge
const schedulingAgent = createAgent('scheduler', 'Appointment Coordinator')
  .setRole('Manages calendar availability and locks doctor bookings')
  .setModelTier('fast')
  .addTools(['calendar.checkAvailability', 'calendar.bookAppointment'])
  .addTextSkill(
    'triage-booking',
    'Patient Booking Protocol',
    'Follows mandatory clinic scheduling rules and buffer times.',
    'Always verify if the patient is a returning or first-time client before locking a 30-minute slot.',
    ['calendar.checkAvailability', 'calendar.bookAppointment']
  )
  .addUrlSkill(
    'insurance-verification',
    'HMO Verification Guide',
    'Validates supported HMO insurance coverage tiers online.',
    'https://docs.clinicnetwork.com/insurance/tiers',
    ['crm.syncLead']
  )
  .addTextKnowledge(
    'clinic-hours',
    'Operating Hours & Holiday Schedule',
    'Mon-Fri: 8:00 AM - 6:00 PM WAT. Sat: 9:00 AM - 2:00 PM WAT. Closed on Public Holidays.',
    { country: 'NG', industry: 'Healthcare' }
  )
  .setSystemPrompt('Coordinate patient intake appointments swiftly and verify insurance requirements.');

// 2. Declare the top-level AI Employee coordinating the workforce
const employee = createEmployee('ng-clinic-concierge')
  .setName('Rachel — Clinic Concierge')
  .setTitle('Healthcare Front-Desk Specialist')
  .setDepartment('VOICE')
  .setCountries(['NG', 'GH'])
  .setIndustries(['Healthcare', 'Clinics'])
  .requirePackages(['@fless/voice', '@fless/google-calendar', '@fless/whatsapp', '@fless/crm'])
  .addAgent(schedulingAgent)
  .setOrchestration('SUPERVISOR', 'scheduler')
  .addUrlKnowledge(
    'clinic-faq-portal',
    'Public Clinic FAQ',
    'https://stnicholasclinic.com/faq',
    { country: 'NG', refreshInterval: 'DAILY' }
  )
  .addPdfKnowledge(
    'clinic-tariff-sheet',
    'Standard Consultation Tariffs 2026',
    'https://storage.fless.app/docs/tariffs-2026.pdf',
    { country: 'NG', industry: 'Healthcare' }
  )
  .setPricing({
    model: 'MONTHLY',
    amountCents: 4900,
    currency: 'USD',
  })
  .setSystemInstructions('Deliver empathetic, professional healthcare reception for Nigerian clinics.')
  .build();

export default employee;`}
                language="typescript"
              />

              {/* Concise Functional Declaration Alternative */}
              <div className="pt-4 space-y-3">
                <div className="space-y-1">
                  <h3 className="text-base font-semibold text-foreground">
                    Alternative: Concise Async Declaration
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    For standalone single-file workers, you can also declare an employee with a concise object configuration and deploy it directly via the Fless CLI.
                  </p>
                </div>

                <CodeBlock
                  code={`import { createEmployee } from '@fless/employee';

export const employee = await createEmployee({
  name: 'Social Media Manager',
  description: 'Manages social media content, plans feed drops & engages replies',
  skills: ['content', 'engagement', 'analytics'],
  tools: ['@fless/instagram', '@fless/facebook'],
  guardrails: {
    maxDailyPosts: 4,
    requireApprovalForDMs: true,
  },
});`}
                  language="typescript"
                />

                <div className="p-4 rounded-xl bg-card border border-border space-y-2 text-xs">
                  <span className="font-semibold text-foreground block">One-Command Production Deployment:</span>
                  <div className="p-2.5 rounded-lg bg-[#070A12] text-white font-mono text-[11px] border border-white/10">
                    $ npx fless deploy ./employee.ts --prod
                  </div>
                  <p className="text-[11.5px] text-muted-foreground">
                    The CLI validates your skills, builds type-safe hermetic mock adapters, runs unit evaluations, and registers the employee to your private organization or the public marketplace.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: SANDBOX RUNNER */}
          {activePageId === "sandbox-runner" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">Testing & Verification</span>
                <h2 className="text-3xl font-display font-semibold tracking-tight text-foreground">
                  EmployeeSandboxRunner
                </h2>
                <p className="text-muted-foreground text-base">
                  Test prompt handling, tool invocations, and multi-agent coordination locally without real API credentials.
                </p>
              </div>

              <CodeBlock
                code={`import { EmployeeSandboxRunner } from '@fless/employee-sdk';
import employee from './employee';

async function testRunner() {
  const runner = new EmployeeSandboxRunner(employee);

  // Test standard user message
  const chatResponse = await runner.simulateMessage({
    role: 'user',
    content: 'Can I book a consultation for Friday at 10 AM?',
  });

  console.log('AI Output:', chatResponse.text);
  console.log('Tools Called:', chatResponse.executedTools);

  // Directly execute mock tool call
  const toolResult = await runner.executeToolDirectly('calendar.checkAvailability', {
    startDate: '2026-10-02T08:00:00Z',
    endDate: '2026-10-02T18:00:00Z',
  });

  console.log('Mock Availability Result:', toolResult);
}

testRunner();`}
                language="typescript"
              />
            </div>
          )}

          {/* SECTION: SDK TYPES */}
          {activePageId === "sdk-types" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">Type Definitions</span>
                <h2 className="text-3xl font-display font-semibold tracking-tight text-foreground">
                  TypeScript Types & Interfaces
                </h2>
                <p className="text-muted-foreground text-base">
                  Full TypeScript schemas exported by <code className="font-mono text-primary">@fless/employee-sdk</code> and <code className="font-mono text-primary">@fless/contracts</code>.
                </p>
              </div>

              <CodeBlock
                code={`export type KnowledgeSourceType = 
  | 'TEXT' | 'URL' | 'PDF' | 'DOCUMENT' | 'SITEMAP' | 'MARKDOWN'
  | 'text' | 'url' | 'pdf' | 'document' | 'sitemap' | 'markdown';

export interface KnowledgeSourceSpec {
  id: string;
  name: string;
  type: KnowledgeSourceType;
  description?: string;
  content?: string; // Inline text / Markdown guidelines / SOP
  text?: string;    // Alias for content (inline plain text)
  sourceUri?: string; // Public URL, S3 URI, or document path
  url?: string;       // Alias for sourceUri (public web URL, PDF URL)
  docs?: string;      // Alias for documentation text
  country?: string;   // e.g. 'NG', 'GH', 'US', 'GB'
  industry?: string;  // e.g. 'Healthcare', 'FinTech', 'Legal'
  businessType?: string;
  refreshInterval?: 'STATIC' | 'DAILY' | 'WEEKLY';
  vectorConfig?: {
    topK?: number;
    relevanceThreshold?: number;
    chunkSize?: number;
    chunkOverlap?: number;
  };
}

export interface EmployeeSkillSpec {
  id: string;
  name: string;
  description: string;
  instructions?: string; // Natural language guidelines for executing this skill
  docs?: string;         // Reference documentation / markdown SOP / procedural guide
  text?: string;         // Inline text guidelines
  url?: string;          // Public web URL or online documentation link
  sourceUrl?: string;    // Alias for documentation link
  requiredTools?: string[];
  workflowSteps?: string[];
  triggerConditions?: string[];
}

export interface AgentSpec {
  id: string;
  name: string;
  role: string;
  responsibilities?: string[];
  systemPrompt: string;
  tools?: string[];
  skills?: Array<string | EmployeeSkillSpec>;
  knowledgeSources?: Array<string | KnowledgeSourceSpec>;
  modelTier?: 'fast' | 'standard' | 'reasoning' | 'vision' | 'voice';
  temperature?: number;
  maxSteps?: number;
}

export interface EmployeeManifest {
  id: string;
  slug?: string;
  name: string;
  version?: string;
  department: string;
  role: string;
  title?: string;
  description: string;
  responsibilities?: string[];
  countries?: string[];
  industries?: string[];
  businessTypes?: string[];
  languages?: string[];
  capabilities: string[];
  requiredPackages: string[];
  tools: string[];
  knowledge?: KnowledgeSourceSpec[];
  agents?: AgentSpec[];
  skills?: Array<string | EmployeeSkillSpec>;
  orchestration?: {
    mode: 'SUPERVISOR' | 'PIPELINE' | 'ROUND_ROBIN' | 'DIRECT';
    leadAgentId?: string;
  };
  pricing?: EmployeePricingConfig;
  systemInstructions: string;
  concurrencyLimit?: number;
}`}
                language="typescript"
              />
            </div>
          )}

          {/* SECTION: RAG KNOWLEDGE */}
          {activePageId === "rag-knowledge" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">Context Grounding</span>
                <h2 className="text-3xl font-display font-semibold tracking-tight text-foreground">
                  RAG Multi-Modal Knowledge Bases
                </h2>
                <p className="text-muted-foreground text-base leading-relaxed">
                  Provide company context directly using inline text, public web URLs, documentation files, and PDFs. Knowledge sources can be attached globally to the AI Employee or scoped to individual specialist agents.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
                <div className="p-4 rounded-xl border border-border bg-background space-y-1.5">
                  <div className="font-semibold text-foreground flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-primary" />
                    Inline Plain Text
                  </div>
                  <p className="text-muted-foreground">
                    Define operating policies, schedules, escalation rules, and tariffs directly as inline text or Markdown.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-border bg-background space-y-1.5">
                  <div className="font-semibold text-foreground flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-emerald-500" />
                    Public Web URLs
                  </div>
                  <p className="text-muted-foreground">
                    Connect live public websites or help center portals with automated daily or weekly synchronization.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-border bg-background space-y-1.5">
                  <div className="font-semibold text-foreground flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-amber-500" />
                    PDFs & Docs
                  </div>
                  <p className="text-muted-foreground">
                    Index regulatory PDFs, clinical guides, contracts, and internal SOP handbooks into localized vector embeddings.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-border bg-background space-y-1.5">
                  <div className="font-semibold text-foreground flex items-center gap-1.5">
                    <Sliders className="w-4 h-4 text-indigo-500" />
                    Country Filtering
                  </div>
                  <p className="text-muted-foreground">
                    Filter retrieval by country (<code className="font-mono text-primary">NG</code>, <code className="font-mono text-primary">GH</code>, <code className="font-mono text-primary">US</code>) and industry vertical.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-base font-semibold text-foreground">Multi-Modal Knowledge Definition Example</h3>
                <CodeBlock
                  code={`import { defineEmployee, defineAgent } from '@fless/employee-sdk';

// Scoped knowledge for an individual Agent
const complianceAgent = defineAgent({
  id: 'compliance-auditor',
  name: 'KYC Compliance Auditor',
  role: 'Audits inbound customer onboarding documents against banking directives',
  systemPrompt: 'Audit user submissions against Central Bank standards.',
  knowledgeSources: [
    {
      id: 'cbn-aml-text',
      name: 'CBN Daily Transaction Limits 2026',
      type: 'TEXT',
      content: 'Tier 1 Accounts: 50,000 NGN daily limit. Tier 3 Accounts: 5,000,000 NGN daily limit with verified BVN and proof of address.',
      country: 'NG',
      industry: 'FinTech',
    },
    {
      id: 'cbn-aml-pdf',
      name: 'Anti-Money Laundering Framework 2026',
      type: 'PDF',
      url: 'https://storage.fless.app/compliance/cbn-aml-2026.pdf',
      country: 'NG',
      industry: 'FinTech',
    },
  ],
});

// Global knowledge for the entire AI Employee workforce
export default defineEmployee({
  id: 'fintech-compliance-team',
  name: 'FinTech KYC & AML Compliance Officer',
  department: 'OPERATIONS',
  role: 'Autonomous regulatory compliance and verification',
  requiredPackages: ['@fless/documents', '@fless/email'],
  agents: [complianceAgent],
  knowledge: [
    {
      id: 'live-help-center',
      name: 'Customer Onboarding FAQ Portal',
      type: 'URL',
      url: 'https://help.fintechbank.com/onboarding/kyc',
      country: 'NG',
      refreshInterval: 'DAILY',
    },
    {
      id: 'pep-escalation-matrix',
      name: 'PEP Risk Matrix SOP',
      type: 'TEXT',
      text: 'Flag any Politically Exposed Person transaction over $5,000 for mandatory 24-hour compliance hold.',
      country: 'NG',
    },
  ],
  systemInstructions: 'Provide authoritative regulatory compliance guidance grounded strictly in official directives.',
});`}
                  language="typescript"
                />
              </div>
            </div>
          )}

          {/* SECTION: MULTI-AGENT TEAMS */}
          {activePageId === "multi-agent" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">Team Coordination</span>
                <h2 className="text-3xl font-display font-semibold tracking-tight text-foreground">
                  Multi-Agent Teams & Specialist Sub-Agents
                </h2>
                <p className="text-muted-foreground text-base leading-relaxed">
                  Compose high-performance enterprise AI employees as coordinated teams of specialist sub-agents. Each agent has its own dedicated skills (in text, docs, or web URLs), isolated knowledge bases, model tier, and tool bindings.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl border border-primary/30 bg-background space-y-2">
                  <div className="font-semibold text-foreground flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    SUPERVISOR Mode (Default)
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    A lead supervisor agent analyzes inbound inquiries, delegates sub-tasks to specialist agents (e.g. BookingAgent, BillingAgent), and synthesizes a final response.
                  </p>
                </div>

                <div className="p-5 rounded-2xl border border-border bg-background space-y-2">
                  <div className="font-semibold text-foreground flex items-center gap-2">
                    <Workflow className="w-4 h-4 text-emerald-500" />
                    PIPELINE Mode
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Tasks pass through a deterministic sequential assembly line (e.g. OCR → DataExtraction → CRMUpdate), where each agent consumes the previous agent&apos;s output.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-base font-semibold text-foreground">Complete Multi-Agent Team with Scoped Skills & Knowledge</h3>
                <CodeBlock
                  code={`import { defineEmployee, defineAgent } from '@fless/employee-sdk';

// 1. Triage & Front-Desk Supervisor Agent
const supervisor = defineAgent({
  id: 'reception-supervisor',
  name: 'Front-Desk Supervisor',
  role: 'Greets callers, identifies medical intent, and delegates tasks to specialists.',
  responsibilities: ['Patient greeting', 'Emergency screening', 'Specialist delegation'],
  modelTier: 'reasoning',
  skills: [
    {
      id: 'emergency-screening',
      name: 'Emergency Symptom Screening',
      description: 'Screens callers for urgent symptoms and routes to emergency lines.',
      instructions: 'If caller reports severe bleeding, breathing distress, or chest pain, direct to 112 immediately.',
    },
  ],
  systemPrompt: 'You oversee clinic front desk operations.',
});

// 2. Calendar Booking Specialist Agent with Web Docs Skill
const scheduler = defineAgent({
  id: 'calendar-scheduler',
  name: 'Appointment Scheduler',
  role: 'Queries doctor availability and locks appointment slots.',
  tools: ['calendar.checkAvailability', 'calendar.bookAppointment', 'crm.syncLead'],
  modelTier: 'fast',
  skills: [
    {
      id: 'slot-reservation',
      name: 'Calendar Slot Reservation',
      description: 'Searches open doctor slots and reserves the requested consultation time.',
      docs: '# Booking SOP\\n1. Search next 3 open slots.\\n2. Confirm patient phone number.\\n3. Lock appointment with 15min buffer.',
      url: 'https://docs.clinicnetwork.com/booking-sop',
      requiredTools: ['calendar.checkAvailability', 'calendar.bookAppointment'],
    },
  ],
  knowledgeSources: [
    {
      id: 'doctor-roster',
      name: 'Doctor Consultation Roster',
      type: 'TEXT',
      text: 'Dr. Okonjo: Dental (Mon/Wed/Fri). Dr. Adeleke: General Consult (Tue/Thu).',
    },
  ],
  systemPrompt: 'Find matching open slots quickly and confirm bookings with zero double-booking.',
});

export default defineEmployee({
  id: 'st-jude-clinic-frontdesk',
  name: 'Clinic Front-Desk AI Team',
  version: '1.0.0',
  department: 'VOICE',
  role: 'Front-desk concierge and appointment booking',
  requiredPackages: ['@fless/voice', '@fless/google-calendar', '@fless/crm'],
  agents: [supervisor, scheduler],
  orchestration: {
    mode: 'SUPERVISOR',
    leadAgentId: 'reception-supervisor',
  },
  systemInstructions: 'Provide warm, empathetic, and professional clinic reception.',
});`}
                  language="typescript"
                />
              </div>
            </div>
          )}

          {/* SECTION: SKILLS & WORKFLOWS */}
          {activePageId === "skills-workflows" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">Deterministic Execution</span>
                <h2 className="text-3xl font-display font-semibold tracking-tight text-foreground">
                  Skills & Deterministic Procedures
                </h2>
                <p className="text-muted-foreground text-base leading-relaxed">
                  Skills empower both AI Employees and individual agents to execute complex procedures reliably. Skills can be backed by inline text guidelines, Markdown SOPs, external documentation URLs, and strict tool constraints.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-xl border border-border bg-background space-y-2">
                  <div className="font-semibold text-foreground flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-primary" />
                    Multiple Skills per Agent
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Assign multiple discrete skills to an agent or employee. Each skill acts as a focused capability with its own validation requirements.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-border bg-background space-y-2">
                  <div className="font-semibold text-foreground flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-emerald-500" />
                    Docs & Text Guidelines
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Embed operational rules, step checklists, and policy constraints directly via <code className="font-mono text-primary">instructions</code>, <code className="font-mono text-primary">text</code>, or <code className="font-mono text-primary">docs</code>.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-border bg-background space-y-2">
                  <div className="font-semibold text-foreground flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-amber-500" />
                    Web Documentation URLs
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Point skills to live external runbooks, API documentation, or company wiki pages via the <code className="font-mono text-primary">url</code> property.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-base font-semibold text-foreground">Defining Multiple Skills on an Employee & Agent</h3>
                <CodeBlock
                  code={`import { defineEmployee, defineAgent } from '@fless/employee-sdk';

const billingSpecialist = defineAgent({
  id: 'billing-specialist',
  name: 'Invoice & Payment Specialist',
  role: 'Generates client invoices and verifies settlement',
  tools: ['crm.createInvoice', 'crm.verifyPayment'],
  skills: [
    // Skill 1: Defined with Inline Text Instructions
    {
      id: 'invoice-generation',
      name: 'Invoice Generation Protocol',
      description: 'Generates verified customer invoices with tax breakdowns.',
      instructions: '1. Verify line items against price catalog.\\n2. Apply regional VAT (7.5% for Nigeria).\\n3. Dispatch receipt.',
      requiredTools: ['crm.createInvoice'],
    },
    // Skill 2: Defined with Web Documentation URL
    {
      id: 'payment-reconciliation',
      name: 'Payment Settlement Verification',
      description: 'Reconciles incoming bank transfers and gateway webhooks.',
      url: 'https://docs.mycompany.com/finance/settlement-sop',
      requiredTools: ['crm.verifyPayment'],
    },
    // Skill 3: Defined with Markdown SOP Documentation
    {
      id: 'refund-audit',
      name: 'Customer Refund Audit',
      description: 'Evaluates refund eligibility according to company return policies.',
      docs: '# Refund Policy SOP\\n- Requests under 14 days are approved automatically.\\n- Requests over 14 days require manager escalation.',
    },
  ],
  systemPrompt: 'Execute financial billing and verification with zero calculation error.',
});`}
                  language="typescript"
                />
              </div>
            </div>
          )}

          {/* SECTION: SECURITY */}
          {activePageId === "security-boundaries" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">Enterprise Security</span>
                <h2 className="text-3xl font-display font-semibold tracking-tight text-foreground">
                  Security Boundaries & Zero Secret Access
                </h2>
                <p className="text-muted-foreground text-base">
                  How Flessensures zero token leakage and deterministic execution boundaries.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="p-5 rounded-2xl border border-border bg-background space-y-2">
                  <div className="font-semibold text-foreground flex items-center gap-2">
                    <KeyRound className="w-4 h-4 text-primary" />
                    Zero Secret Access
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Employee author code never sees OAuth tokens, API secrets, or passwords. The FlessCloud Gateway handles credential resolution at runtime.
                  </p>
                </div>

                <div className="p-5 rounded-2xl border border-border bg-background space-y-2">
                  <div className="font-semibold text-foreground flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-500" />
                    Hard Timeouts
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Deterministic 30-second hard ceilings on LLM reasoning and 10-second external HTTP bounds prevent hanging operations.
                  </p>
                </div>

                <div className="p-5 rounded-2xl border border-border bg-background space-y-2">
                  <div className="font-semibold text-foreground flex items-center gap-2">
                    <Database className="w-4 h-4 text-emerald-500" />
                    Immutable Audit Spans
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Every user interaction, tool invocation, token count, and revenue split is recorded with OpenTelemetry tracing.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: EVALUATIONS */}
          {activePageId === "evaluations" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">Quality Assurance</span>
                <h2 className="text-3xl font-display font-semibold tracking-tight text-foreground">
                  Sandbox Evaluations Suite
                </h2>
                <p className="text-muted-foreground text-base">
                  Automated benchmark tests run on every manifest submission before public distribution.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-border bg-background space-y-3 text-sm">
                <div className="font-semibold text-foreground">Evaluation Stages:</div>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-muted-foreground">
                  <li><strong>Conversation Consistency</strong>: Verifies 10 standard test interactions produce accurate responses.</li>
                  <li><strong>Tool Parameter Precision</strong>: Asserts tool execution payloads match expected parameter schemas.</li>
                  <li><strong>Latency & Cost Bounds</strong>: Validates response generation stays under latency and token budgets.</li>
                </ul>
              </div>
            </div>
          )}

          {/* SECTION: PUBLISHING */}
          {activePageId === "publishing" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">Release Lifecycle</span>
                <h2 className="text-3xl font-display font-semibold tracking-tight text-foreground">
                  Marketplace Submission & Publishing
                </h2>
                <p className="text-muted-foreground text-base">
                  Publish verified employees for public distribution across thousands of businesses.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-semibold">1. Verify Manifest Locally</h3>
                <CodeBlock code="npx @fless/cli verify ./src/employee.ts" language="bash" />

                <h3 className="text-sm font-semibold">2. Submit for Review</h3>
                <CodeBlock code="npx @fless/cli submit ./src/employee.ts --apiKey=$FLESS_KEY" language="bash" />
              </div>
            </div>
          )}

          {/* SECTION: OFFICIAL MANAGED PLUGIN PAGES */}
          {activePlugin && (
            <div className="space-y-8 animate-in fade-in duration-200">
              {/* Plugin Header Card */}
              <div className="p-6 rounded-2xl border border-border/80 bg-gradient-to-b from-brand-soft/30 to-background dark:from-night dark:to-background space-y-4 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm"
                      style={{ backgroundColor: activePlugin.accentColor }}
                    >
                      <activePlugin.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-2xl font-bold text-foreground">{activePlugin.displayName}</h2>
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-primary/10 text-primary">
                          {activePlugin.badge}
                        </span>
                      </div>
                      <div className="text-xs font-mono text-muted-foreground mt-0.5">
                        {activePlugin.packageName} • v{activePlugin.version} • {activePlugin.category}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      ✓ Sandbox Supported
                    </span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {activePlugin.description}
                </p>

                {/* Capabilities & Permissions Row */}
                <div className="pt-4 border-t border-border/60 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="font-semibold text-foreground block mb-1">Capabilities Provided:</span>
                    <div className="flex flex-wrap gap-1">
                      {activePlugin.capabilities.map((c) => (
                        <span key={c} className="px-2 py-0.5 rounded bg-background border border-border font-mono text-[11px]">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="font-semibold text-foreground block mb-1">Required Permissions:</span>
                    <div className="flex flex-wrap gap-1">
                      {activePlugin.permissions.map((p) => (
                        <span key={p} className="px-2 py-0.5 rounded bg-neutral-900 text-neutral-200 font-mono text-[11px]">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Sub-Tabs for this Plugin */}
              <div className="flex items-center gap-2 border-b border-border/60 pb-3">
                {[
                  { id: "overview" as const, label: "Overview & Tool Schemas", icon: BookOpen },
                  { id: "simulator" as const, label: "Interactive Simulator", icon: Play },
                  { id: "code" as const, label: "TypeScript Implementation", icon: Code2 },
                ].map((st) => {
                  const Icon = st.icon;
                  const isActive = activePluginTab === st.id;
                  return (
                    <button
                      key={st.id}
                      onClick={() => setActivePluginTab(st.id)}
                      className={cn(
                        "px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                      )}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {st.label}
                    </button>
                  );
                })}
              </div>

              {/* SUB-TAB: OVERVIEW & TOOLS */}
              {activePluginTab === "overview" && (
                <div className="space-y-6">
                  <div className="p-4 rounded-xl border border-border bg-background space-y-1 text-xs">
                    <div className="font-semibold text-foreground flex items-center gap-1.5">
                      <Play className="w-3.5 h-3.5 text-primary" />
                      Sandbox Simulation Behavior
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {activePlugin.sandboxMockDescription}
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-foreground">
                        Available Tools ({activePlugin.tools.length})
                      </h3>
                      <span className="text-xs text-muted-foreground">Declared in AI employee manifests</span>
                    </div>

                    {activePlugin.tools.map((tool) => (
                      <div key={tool.toolId} className="p-6 rounded-2xl border border-border/80 bg-background space-y-5 shadow-sm">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/60 pb-3">
                          <div>
                            <div className="font-mono text-sm font-semibold text-primary">{tool.toolId}</div>
                            <div className="text-xs text-muted-foreground mt-0.5">{tool.description}</div>
                          </div>
                          <div className="flex items-center gap-1.5">
                            {tool.requiredPermissions.map((rp) => (
                              <span key={rp} className="px-2 py-0.5 rounded bg-muted text-muted-foreground font-mono text-[10px]">
                                {rp}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Parameters Table */}
                        <div className="space-y-2">
                          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Parameters Schema
                          </div>
                          <div className="border border-border/60 rounded-xl overflow-hidden text-xs">
                            <table className="w-full text-left">
                              <thead className="bg-muted/60 text-muted-foreground border-b border-border/60">
                                <tr>
                                  <th className="p-2.5">Field</th>
                                  <th className="p-2.5">Type</th>
                                  <th className="p-2.5">Required</th>
                                  <th className="p-2.5">Description</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-border/60">
                                {tool.parameters.map((param) => (
                                  <tr key={param.name}>
                                    <td className="p-2.5 font-mono font-medium text-foreground">{param.name}</td>
                                    <td className="p-2.5 font-mono text-muted-foreground">{param.type}</td>
                                    <td className="p-2.5">
                                      {param.required ? (
                                        <span className="text-rose-500 font-semibold">Yes</span>
                                      ) : (
                                        <span className="text-muted-foreground">No</span>
                                      )}
                                    </td>
                                    <td className="p-2.5 text-muted-foreground">{param.description}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>

                        {/* Request & Response Previews */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                              Sample Request Payload
                            </div>
                            <CodeBlock code={JSON.stringify(tool.examplePayload, null, 2)} language="json" />
                          </div>
                          <div>
                            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                              Sample Return Payload
                            </div>
                            <CodeBlock code={JSON.stringify(tool.exampleResponse, null, 2)} language="json" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {next && (
                <a href={`#${next.id}`} className="group text-right">
                  <div className="text-[12px] text-muted-foreground mb-1">Next</div>
                  <div className="text-[15px] font-medium group-hover:text-primary transition-colors">{next.title} →</div>
                </a>
              )}
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
