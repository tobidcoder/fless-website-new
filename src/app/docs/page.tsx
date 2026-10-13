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
  CONNECTION_GROUPS,
  CORE_PACKAGES,
  COUNTRIES,
  DEPARTMENTS,
  EVALUATION_CATEGORIES,
  EVALUATION_EXAMPLE,
  LANGUAGES,
  MANIFEST_EXAMPLE,
  MODEL_TIERS,
  PACKAGES,
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
  "Rolling out": "text-primary bg-brand-soft",
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

      <Defs
        items={[
          ...(pkg.connects.length > 0 ? [{ term: "Connects to", text: pkg.connects.join(", ") }] : []),
          { term: "Capabilities", text: <Chips items={pkg.capabilities} /> },
          { term: "Permissions", text: <Chips items={pkg.permissions} /> },
          { term: "Sandbox", text: "Every tool is mocked in the sandbox, so tests never touch live accounts." },
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
            lede="Fless connects straight to each provider's official API, with no third-party schedulers in between. Businesses sign in with their own accounts; Fless stores and refreshes the tokens."
          />
          <Defs
            items={(["Available", "Rolling out"] as ConnectionStatus[]).map((s) => ({
              term: <Status status={s} />,
              text: s === "Available" ? "Built and connectable today." : "Being released now.",
            }))}
          />
          {CONNECTION_GROUPS.map((g) => (
            <section key={g}>
              <H2>{g}</H2>
              <div className="border-t border-border/60">
                {CONNECTIONS.filter((c) => c.group === g).map((c) => (
                  <div key={c.id} className="py-5 border-b border-border/60">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="text-[16px] font-medium text-foreground">{c.name}</span>
                      <Status status={c.status} />
                      <span className="text-[13px] text-muted-foreground">{c.api}</span>
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
                <span className="text-foreground font-medium">{current?.title}</span>
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
