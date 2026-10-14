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
  ACTION_MODE_NOTE,
  AUTH_LABELS,
  PRICING_MODELS,
  SANDBOX_EXAMPLE,
  TYPES_SNIPPET,
  USAGE_RATES,
  type ConnectionStatus,
  type CatalogPackage,
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
      { id: "packages", title: "Core packages" },
      { id: "package-actions", title: "Declaring actions" },
      { id: "connections", title: "All app packages" },
    ],
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
  "ref-capabilities": "package-actions",
  capabilities: "package-actions",
  "ref-model-tiers": "model-tiers",
  "ref-countries": "markets",
  "ref-languages": "markets",
  "ref-industries": "markets",
  "ref-departments": "departments",
  "sdk-types": "types",
};

const ALL_ITEMS = NAV.flatMap((g) => g.items);
// Legacy v1 package ids that were renamed in the actions catalog.
const LEGACY_PACKAGES: Record<string, string> = { meta: "facebook", mail: "gmail", crm: "hubspot" };

const resolve = (hash: string) => {
  // Old plugin pages were #plugin-<id>; packages live at #package-<id>.
  const id = ALIASES[hash] ?? hash.replace(/^plugin-/, "package-");
  if (id.startsWith("package-") && id !== "package-actions") {
    const slug = id.slice("package-".length)
    const resolved = LEGACY_PACKAGES[slug] ?? slug
    return CONNECTIONS.some((c) => c.id === resolved) ? `package-${resolved}` : "connections"
  }
  return ALL_ITEMS.some((i) => i.id === id) ? id : "overview";
};

// ---------- Typography primitives ----------

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

  packageActions: [
    {
      package: '@fless/facebook',
      required: true,
      actions: [
        { id: 'facebook.list_pages', defaultMode: 'ALLOW', rationale: 'Finds the Page to post to.' },
        { id: 'facebook.publish_post', defaultMode: 'ASK', rationale: 'Posts only after you approve.' },
        { id: 'facebook.get_insights', defaultMode: 'ALLOW', rationale: 'Reads results to improve next week.' },
      ],
    },
    {
      package: '@fless/instagram',
      required: false,
      actions: [
        { id: 'instagram.publish_image', defaultMode: 'ASK', rationale: 'Posts only after you approve.' },
      ],
    },
  ],
  tools: ['business.context.get', 'content.draft'],

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
    requiredTools: ['hubspot.search_contacts', 'whatsapp.send_text', 'hubspot.update_contact'],
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
      { name: 'Collect', action: 'Pull last week\\'s numbers', requiredTool: 'facebook.get_insights' },
      { name: 'Share', action: 'Post a summary to the team', requiredTool: 'slack.post_message' },
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
  // Approval for app actions is set per action with defaultMode: 'ASK'.
  // These built-in tools also wait for a person:
  requireApprovalFor: ['task.create'],
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

const modeTone: Record<string, string> = {
  ALLOW: "text-emerald-600 dark:text-emerald-400",
  ASK: "text-amber-700 dark:text-amber-400",
  OFF: "text-muted-foreground",
};

function PackagePage({ id }: { id: string }) {
  const [pkg, setPkg] = useState<CatalogPackage | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let live = true;
    setPkg(null);
    setFailed(false);
    fetch(`/catalog/${id}.json`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((data: CatalogPackage) => live && setPkg(data))
      .catch(() => live && setFailed(true));
    return () => {
      live = false;
    };
  }, [id]);

  const summary = CONNECTIONS.find((c) => c.id === id);
  if (failed) {
    return <PageHead eyebrow="Package" title={summary?.name ?? id} lede="This package's details couldn't be loaded. Refresh to try again." />;
  }
  if (!pkg) {
    return <PageHead eyebrow={`Package · ${categoryLabel(summary?.category ?? "")}`} title={summary?.name ?? id} lede={summary?.summary ?? "Loading…"} />;
  }

  const writes = pkg.actions.filter((a) => a.kind === "WRITE");
  const reads = pkg.actions.filter((a) => a.kind === "READ");
  const example = writes[0] ?? pkg.actions[0];

  return (
    <>
      <header className="mb-12 md:mb-16">
        <p className="text-[12px] font-medium text-primary mb-4">Package · {categoryLabel(pkg.category)}</p>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-[32px] sm:text-[40px] font-display font-semibold tracking-[-0.035em] leading-[1.1] text-foreground">
            {pkg.name}
          </h1>
          <Status status={pkg.status} />
        </div>
        <p className="mt-3 font-mono text-[14px] text-muted-foreground">{pkg.packageName}</p>
        <p className="mt-5 text-[17px] sm:text-[18px] text-muted-foreground leading-[1.7]">{pkg.summary}</p>
      </header>

      <Defs
        items={[
          { term: "Status", text: CONNECTION_STATUS_NOTE[pkg.status] },
          {
            term: "Connects with",
            text: (
              <>
                {AUTH_LABELS[pkg.auth.type] ?? pkg.auth.type}
                {pkg.auth.docsUrl && (
                  <>
                    {" · "}
                    <a href={pkg.auth.docsUrl} target="_blank" rel="noreferrer" className="text-foreground underline underline-offset-4">
                      where to find keys
                    </a>
                  </>
                )}
              </>
            ),
          },
          { term: "Actions", text: `${pkg.actions.length} (${reads.length} read, ${writes.length} write)` },
          ...(pkg.triggers.length > 0 ? [{ term: "Triggers", text: <Chips items={pkg.triggers.map((t) => t.id)} /> }] : []),
        ]}
      />

      {example && (
        <>
          <H2>Declare it</H2>
          <P>
            Add the package to <C>packageActions</C> and list only the actions your employee needs, each with a default
            mode and a reason the business will see.
          </P>
          <CodeView
            code={`packageActions: [\n  {\n    package: '${pkg.packageName}',\n    required: true,\n    actions: [\n      { id: '${example.id}', defaultMode: '${example.defaultMode}', rationale: '…' },\n    ],\n  },\n],`}
            filename="employee.ts"
          />
        </>
      )}

      <H2>Actions</H2>
      <div className="space-y-14">
        {pkg.actions.map((a) => (
          <section key={a.id}>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
              <h3 className="font-mono text-[15px] text-foreground">{a.id}</h3>
              <span className="text-[12px] text-muted-foreground">{a.kind === "READ" ? "Read" : "Write"}</span>
              <span className={cn("text-[12px] font-medium", modeTone[a.defaultMode])}>Default {a.defaultMode}</span>
              {a.status && a.status !== pkg.status && <Status status={a.status} />}
            </div>
            <p className="text-[15px] text-foreground mb-1">{a.name}</p>
            <p className="text-[15px] text-muted-foreground leading-relaxed mb-4">{a.description}</p>
            {(a.outward || a.irreversible || a.spendsMoney) && (
              <p className="text-[13px] text-muted-foreground mb-4">
                {[a.outward && "Visible to people outside the business", a.irreversible && "Can't be undone", a.spendsMoney && "Spends money"]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            )}
            {a.params.length > 0 ? (
              <Table
                head={["Parameter", "Type", "Required", "Description"]}
                mono={[0, 1]}
                rows={a.params.map((p) => [p.name, p.type, p.required ? "Yes" : "No", p.description])}
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
  if (id.startsWith("package-") && id !== "package-actions") {
    return <PackagePage id={id.slice("package-".length)} />;
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
            <LinkRow href="#package-actions" title="Declaring actions" text="How employees ask for exactly what they need." />
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
              { term: "Package", text: "An app connection and its actions, such as @fless/whatsapp." },
              { term: "Action", text: "One thing a package can do, such as whatsapp.send_text, with a mode: ALLOW, ASK or OFF." },
              { term: "Tool", text: "A built-in Fless capability, such as knowledge.search." },
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
              ["packageActions", "No", "The actions it may take in each connected app, with a mode and a reason."],
              ["capabilities", "No", "Broad permissions, used for review and marketplace search."],
              ["tools", "Yes", "Built-in Fless tools it may call. Anything not declared is blocked."],
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
            title="Core packages"
            lede={`Two packages to build with. Everything your employee does in other apps comes from the ${CONNECTIONS.length} app packages, declared action by action.`}
          />
          <CodeView code={INSTALL} language="bash" filename="terminal" />
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
          <div className="mt-12 border-t border-border/60">
            <LinkRow href="#package-actions" title="Declaring actions" text="How packageActions, modes and rationales work." />
            <LinkRow href="#connections" title="All app packages" text={`${CONNECTIONS.length} packages, grouped by category.`} />
          </div>
        </>
      );

    case "package-actions":
      return (
        <>
          <PageHead
            eyebrow="Packages"
            title="Declaring actions"
            lede="An employee asks for exactly the actions it needs in each app, not blanket access. Each one has a default mode and a reason the business sees before it connects."
          />
          <CodeView
            code={`packageActions: [
  {
    package: '@fless/google-calendar',
    required: true,
    actions: [
      { id: 'calendar.find_free_slots', defaultMode: 'ALLOW', rationale: 'Finds open times.' },
      { id: 'calendar.create_event', defaultMode: 'ALLOW', required: true, rationale: 'Books the visit.' },
      { id: 'calendar.update_event', defaultMode: 'ASK', rationale: 'Moves a visit only when you approve.' },
    ],
  },
],`}
            filename="employee.ts"
          />
          <H2>Modes</H2>
          <Defs items={(["ALLOW", "ASK", "OFF"] as const).map((m) => ({ term: <C>{m}</C>, text: ACTION_MODE_NOTE[m] }))} />
          <P>
            The business can lower any mode after hiring. Your default can never go above the limit Fless sets on an
            action. Actions that spend money, can&apos;t be undone or reach people outside the business are capped at{" "}
            <C>ASK</C> or <C>OFF</C>.
          </P>
          <H2>Fields</H2>
          <Table
            head={["Field", "What it does"]}
            rows={[
              ["package", "The package id, e.g. '@fless/gmail'."],
              ["required", "Whether the employee can do its core job without the package."],
              ["actions[].id", "An action from that package. Unknown ids fail verification."],
              ["actions[].defaultMode", "ALLOW, ASK or OFF."],
              ["actions[].rationale", "Shown to the business. Required for write actions."],
              ["actions[].required", "Core action: if the business turns it off, the employee shows as Limited."],
              ["actions[].defaultConstraints", "Limits such as a daily spend cap, where the action supports them."],
              ["triggers", "Events that start work, e.g. 'gmail.new_message'."],
            ]}
          />
        </>
      );

    case "connections":
      return (
        <>
          <PageHead
            eyebrow="Packages"
            title="All app packages"
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
                  <a key={c.id} href={`#package-${c.id}`} className="group block py-5 border-b border-border/60">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="text-[16px] font-medium text-foreground group-hover:text-primary transition-colors">{c.name}</span>
                      <Status status={c.status} />
                      <span className="text-[13px] text-muted-foreground tabular-nums">{c.actions} actions</span>
                    </div>
                    <p className="mt-1.5 text-[14px] text-muted-foreground leading-relaxed">{c.summary}</p>
                  </a>
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

  // Package pages aren't in the sidebar; treat them as children of "All app packages".
  const isPackagePage = active.startsWith("package-") && active !== "package-actions";
  const index = ALL_ITEMS.findIndex((i) => i.id === (isPackagePage ? "connections" : active));
  const current = ALL_ITEMS[index];
  // On a package page, "Previous" goes back to the full list.
  const prev = isPackagePage ? current : ALL_ITEMS[index - 1];
  const next = isPackagePage ? undefined : ALL_ITEMS[index + 1];
  const currentTitle = isPackagePage
    ? CONNECTIONS.find((c) => `package-${c.id}` === active)?.name ?? current?.title
    : current?.title;

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

      <main className="flex-1 pt-16 md:pt-[68px]">
        {/* Mobile docs menu */}
        <div className="lg:hidden sticky top-16 z-30 bg-background/95 backdrop-blur border-b border-border/60">
          <div className="px-5 sm:px-6">
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-expanded={menuOpen}
              className="w-full h-12 flex items-center justify-between text-[14px]"
            >
              <span className="text-muted-foreground">
                Docs <span className="mx-1.5">/</span>
                <span className="text-foreground font-medium">{currentTitle}</span>
              </span>
              <span className="text-muted-foreground">{menuOpen ? "Close" : "Menu"}</span>
            </button>
          </div>
          {menuOpen && (
            <div className="max-h-[70vh] overflow-y-auto px-5 sm:px-6 pt-2 pb-8 border-t border-border/60">{nav}</div>
          )}
        </div>

        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:grid lg:grid-cols-[240px_1fr] lg:gap-16 xl:gap-24">
          <aside className="hidden lg:block">
            <div className="sticky top-[68px] max-h-[calc(100vh-68px)] overflow-y-auto py-12 pr-2 no-scrollbar">{nav}</div>
          </aside>

          <article className="min-w-0 max-w-[720px] py-12 md:py-20">
            <PageContent id={active} />

            <div className="mt-20 pt-8 border-t border-border/60 grid grid-cols-2 gap-4">
              {prev ? (
                <a href={`#${prev.id}`} className="group">
                  <div className="text-[12px] text-muted-foreground mb-1">Previous</div>
                  <div className="text-[15px] font-medium group-hover:text-primary transition-colors">← {prev.title}</div>
                </a>
              ) : (
                <span />
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
