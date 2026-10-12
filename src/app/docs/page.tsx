"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CodeView } from "@/components/CodeView";
import { cn } from "@/lib/utils";
import {
  AGENTS_EXAMPLE,
  CLI_COMMANDS,
  COUNTRIES,
  DEPARTMENTS,
  LANGUAGES,
  MANIFEST_EXAMPLE,
  MODEL_TIERS,
  PLUGINS,
  PLUGIN_CATEGORIES,
  PLUGIN_STATUS_NOTE,
  PRICING_MODELS,
  SANDBOX_OUTPUT,
  SDK_PACKAGES,
  TYPES_SNIPPET,
  USAGE_EVENTS,
  VERIFY_OUTPUT,
  type Plugin,
  type PluginStatus,
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
      { id: "skills", title: "Skills" },
      { id: "knowledge", title: "Knowledge" },
      { id: "agents", title: "Agents and teams" },
      { id: "approvals", title: "Approvals and security" },
      { id: "pricing", title: "Pricing" },
    ],
  },
  {
    title: "Packages and plugins",
    items: [
      { id: "packages", title: "Core packages" },
      { id: "plugins", title: "Plugin catalog" },
      ...PLUGINS.map((p) => ({ id: `plugin-${p.id}`, title: p.name })),
    ],
  },
  {
    title: "Test and ship",
    items: [
      { id: "sandbox", title: "Test in the sandbox" },
      { id: "verify", title: "Verification" },
      { id: "publish", title: "Publish and get paid" },
    ],
  },
  {
    title: "Reference",
    items: [
      { id: "capabilities", title: "Capabilities" },
      { id: "model-tiers", title: "Model tiers" },
      { id: "markets", title: "Countries and languages" },
      { id: "departments", title: "Departments" },
      { id: "types", title: "TypeScript types" },
      { id: "cli", title: "CLI" },
    ],
  },
];

// Old anchors from earlier versions of the docs and from links around the site.
const ALIASES: Record<string, string> = {
  intro: "overview",
  "single-sdk": "packages",
  "sdk-overview": "packages",
  "define-employee": "manifest",
  "create-employee": "manifest",
  "define-agent": "agents",
  "multi-agent": "agents",
  "skills-workflows": "skills",
  "rag-knowledge": "knowledge",
  "security-boundaries": "approvals",
  "ref-pricing": "pricing",
  "sandbox-runner": "sandbox",
  evaluations: "verify",
  publishing: "publish",
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
  const id = ALIASES[hash] ?? hash;
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

const statusTone: Record<PluginStatus, string> = {
  Live: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10",
  Beta: "text-primary bg-brand-soft",
  Planned: "text-muted-foreground bg-muted",
};

function Status({ status }: { status: PluginStatus }) {
  return <span className={cn("text-[11px] font-medium rounded-full px-2 py-0.5", statusTone[status])}>{status}</span>;
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
  role: 'Plans and schedules weekly posts',
  description: 'Turns a weekly brief into approved, scheduled posts.',

  requiredPackages: ['@fless/social'],
  capabilities: ['marketing.social_publishing'],
  tools: ['social.schedulePost', 'social.listChannels'],

  approvals: { requireHumanApproval: ['social.schedulePost'] },

  pricing: { model: 'SUBSCRIPTION', currency: 'USD', basePriceCents: 4900 },
  systemInstructions: 'Write in the brand voice. Never post without approval.',
});`;

const SKILLS_EXAMPLE = `skills: [
  {
    id: 'invoice-chase',
    name: 'Chase overdue invoices',
    description: 'Follows up on invoices more than 14 days late.',
    triggerConditions: ['invoice overdue > 14 days'],
    workflowSteps: [
      'Check payment status',
      'Send a polite reminder by email',
      'If still unpaid after 7 days, alert the finance channel',
    ],
    requiredTools: ['stripe.getPaymentStatus', 'mail.sendEmail', 'slack.postMessage'],
  },
  // A skill can also point at your existing SOP
  {
    id: 'refund-policy',
    name: 'Refund handling',
    description: 'Applies the company refund policy.',
    url: 'https://help.example.com/refunds',
  },
]`;

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
    content: 'Open 8am–6pm, Monday to Saturday.',
    country: 'NG',
  },
]`;

const APPROVALS_EXAMPLE = `approvals: {
  // These tools always pause until a person approves
  requireHumanApproval: ['social.schedulePost', 'stripe.createInvoice'],
  // Where the request goes
  escalationChannel: 'slack:#approvals',
}`;

const PRICING_EXAMPLE = `pricing: {
  model: 'BASE_PLUS_USAGE',
  currency: 'USD',
  basePriceCents: 4900,          // $49 a month
  billingInterval: 'MONTHLY',
  usageRates: [
    { eventType: 'VOICE_CALL_MINUTE', unitPriceCents: 15, includedUnits: 300 },
  ],
}`;

const RUNNER_EXAMPLE = `import { EmployeeSandboxRunner } from '@fless/employee-sdk';
import employee from './employee';

const runner = new EmployeeSandboxRunner(employee);

const reply = await runner.simulateMessage({
  channel: 'voice',
  text: 'Can I book a check-up on Friday at 2pm?',
});

console.log(reply.text);        // what the employee said
console.log(reply.toolCalls);   // which tools it called, with arguments`;

const INSTALL = `npm install @fless/employee-sdk
npm install --save-dev @fless/cli`;

// ---------- Pages ----------

function PluginPage({ plugin }: { plugin: Plugin }) {
  return (
    <>
      <header className="mb-12 md:mb-16">
        <p className="text-[12px] font-medium text-primary mb-4">Plugin · {plugin.category}</p>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-[32px] sm:text-[40px] font-display font-semibold tracking-[-0.035em] leading-[1.1] text-foreground">
            {plugin.name}
          </h1>
          <Status status={plugin.status} />
        </div>
        <p className="mt-3 font-mono text-[14px] text-muted-foreground">{plugin.packageName}</p>
        <p className="mt-5 text-[17px] sm:text-[18px] text-muted-foreground leading-[1.7]">{plugin.summary}</p>
      </header>

      {plugin.status === "Planned" && (
        <Note>This plugin is on the roadmap. Tool names below show the intended shape and may change before release.</Note>
      )}

      <Defs
        items={[
          { term: "Status", text: PLUGIN_STATUS_NOTE[plugin.status] },
          { term: "Works with", text: plugin.services.join(", ") },
          { term: "Capabilities", text: <Chips items={plugin.capabilities} /> },
          { term: "Permissions", text: <Chips items={plugin.permissions} /> },
        ]}
      />

      <H2>Add it to your employee</H2>
      <P>
        List the package in <C>requiredPackages</C>, then allow only the tools you need in <C>tools</C>. The business
        connects their own account when they hire your employee. Your code never sees their credentials.
      </P>
      <CodeView
        code={`requiredPackages: ['${plugin.packageName}'],\ncapabilities: [${plugin.capabilities.map((c) => `'${c}'`).join(", ")}],\ntools: [${plugin.tools.map((t) => `'${t.id}'`).join(", ")}],`}
        filename="employee.ts"
      />

      <H2>Tools</H2>
      <div className="space-y-12">
        {plugin.tools.map((t) => (
          <section key={t.id}>
            <h3 className="font-mono text-[15px] text-foreground mb-2">{t.id}</h3>
            <p className="text-[15px] text-muted-foreground leading-relaxed mb-5">{t.description}</p>
            {t.parameters.length > 0 && (
              <Table
                head={["Parameter", "Type", "Required", "Description"]}
                mono={[0, 1]}
                rows={t.parameters.map((p) => [p.name, p.type, p.required ? "Yes" : "No", p.description])}
              />
            )}
          </section>
        ))}
      </div>
    </>
  );
}

function PageContent({ id }: { id: string }) {
  if (id.startsWith("plugin-")) {
    const plugin = PLUGINS.find((p) => `plugin-${p.id}` === id);
    if (plugin) return <PluginPage plugin={plugin} />;
  }

  switch (id) {
    case "overview":
      return (
        <>
          <PageHead
            eyebrow="Builder docs"
            title="Build AI employees businesses can hire."
            lede="An AI employee on Fless is one TypeScript file that describes a job: what it does, what it knows, which tools it can use and what it costs. You write the file. Fless runs it, keeps it safe, bills the customer and pays you."
          />
          <H2>How it fits together</H2>
          <Defs
            items={[
              { term: "You write", text: "A manifest with skills, knowledge, tools, approvals and a price." },
              { term: "Fless runs", text: "The models, plugins, customer logins, audit log and billing." },
              { term: "Businesses hire", text: "Your employee from the marketplace. You keep 35% of what they pay." },
            ]}
          />
          <H2>Start here</H2>
          <div className="border-t border-border/60">
            <LinkRow href="#quickstart" title="Quickstart" text="From an empty folder to a tested employee." />
            <LinkRow href="#manifest" title="The manifest" text="A complete example, field by field." />
            <LinkRow href="#plugins" title="Plugin catalog" text={`${PLUGINS.length} plugins for voice, messaging, CRM, calendars and more.`} />
            <LinkRow href="#publish" title="Publish and get paid" text="Review, launch and monthly payouts." />
          </div>
          <Note>
            The SDK is in private beta.{" "}
            <Link href="/builders#apply" className="font-medium text-foreground underline underline-offset-4">
              Request access
            </Link>{" "}
            to get the packages and a sandbox account.
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
                    The packages are distributed to accepted builders.{" "}
                    <Link href="/builders#apply" className="font-medium text-foreground underline underline-offset-4">
                      Request SDK access
                    </Link>
                    , then sign in to the private registry with the token we send you.
                  </P>
                ),
              },
              { title: "Install", body: <CodeView code={INSTALL} language="bash" filename="terminal" /> },
              {
                title: "Write the employee",
                body: (
                  <>
                    <P>
                      Create <C>src/employee.ts</C>. This one drafts posts and schedules them only after a person approves.
                    </P>
                    <CodeView code={MINIMAL_EXAMPLE} filename="src/employee.ts" />
                  </>
                ),
              },
              {
                title: "Test it",
                body: (
                  <>
                    <P>Run conversations against mock plugins. Nothing is posted and no real accounts are used.</P>
                    <CodeView code="npx @fless/cli test ./src/employee.ts" language="bash" filename="terminal" />
                  </>
                ),
              },
              {
                title: "Verify and publish",
                body: (
                  <CodeView
                    code={"npx @fless/cli verify ./src/employee.ts\nnpx @fless/cli publish"}
                    language="bash"
                    filename="terminal"
                  />
                ),
              },
            ]}
          />
        </>
      );

    case "concepts":
      return (
        <>
          <PageHead eyebrow="Get started" title="Core concepts" lede="Eight words you'll see everywhere in these docs." />
          <Defs
            items={[
              { term: "Employee", text: "The thing a business hires. Defined with defineEmployee()." },
              { term: "Agent", text: "A specialist inside an employee, such as a booking agent. Optional." },
              { term: "Skill", text: "A repeatable procedure: when it applies, the steps, and the tools each step uses." },
              { term: "Knowledge", text: "Facts the employee answers from: text, web pages, PDFs and documents." },
              { term: "Plugin", text: "A package that connects to an outside service, such as @fless/whatsapp." },
              { term: "Tool", text: "One action a plugin offers, such as whatsapp.sendMessage." },
              { term: "Capability", text: "A broad permission, such as calendar.booking, used for marketplace matching." },
              { term: "Approval", text: "A rule that makes a tool wait for a person before it runs." },
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
            lede={<>Everything about an employee lives in one object passed to <C>defineEmployee()</C>. Here is a complete, production-shaped example.</>}
          />
          <CodeView code={MANIFEST_EXAMPLE} filename="src/employee.ts" maxHeight={640} />
          <H2>Fields</H2>
          <Table
            head={["Field", "Required", "What it does"]}
            rows={[
              ["id, name, version", "Yes", "Unique ID, display name and semantic version."],
              ["department, role", "Yes", "Which desk it works on and its job in one line."],
              ["description", "Yes", "What businesses read on the marketplace."],
              ["targetMarket", "No", "Countries, industries, business types and languages it serves."],
              ["requiredPackages", "Yes", "Plugins the employee needs."],
              ["capabilities", "Yes", "Broad permissions, used for review and marketplace search."],
              ["tools", "Yes", "Exact tools it may call. Anything else is blocked."],
              ["skills", "No", "Procedures with triggers, steps and required tools."],
              ["knowledge", "No", "Sources it answers from."],
              ["agents, orchestration", "No", "Specialist sub-agents and how they share work."],
              ["approvals", "No", "Tools that always wait for a person."],
              ["pricing", "No", "How businesses pay. See Pricing."],
              ["concurrencyLimit", "No", "Maximum tasks at once per customer."],
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
            title="Skills"
            lede="A skill is a procedure your employee follows the same way every time, like a page from a team handbook."
          />
          <P>
            Give each skill the situations that trigger it, the steps in order, and the tools those steps need. Verification
            fails if a skill needs a tool that isn&apos;t listed in <C>tools</C>.
          </P>
          <CodeView code={SKILLS_EXAMPLE} filename="employee.ts" />
          <H2>Fields</H2>
          <Table
            head={["Field", "What it does"]}
            rows={[
              ["id, name", "How the skill is referenced and shown."],
              ["description", "One line on what the skill achieves."],
              ["triggerConditions", "Phrases or events that should start it."],
              ["workflowSteps", "The steps, in order."],
              ["requiredTools", "Tools the steps call. Checked at verify time."],
              ["instructions", "Extra guidance in plain language."],
              ["url", "Link to an existing SOP instead of writing steps."],
            ]}
          />
          <Note>Agents can share skills by ID, for example <C>skills: [&apos;invoice-chase&apos;]</C>.</Note>
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
            Set <C>refreshInterval</C> to <C>DAILY</C> or <C>WEEKLY</C> for sources that change. Add <C>country</C> or{" "}
            <C>industry</C> to a source and it is only used for matching customers.
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
              ["PIPELINE", "Work passes through agents in order, for example extract → check → file."],
              ["ROUND_ROBIN", "Requests are spread evenly across identical agents."],
              ["DIRECT", "Requests go straight to one agent."],
            ]}
          />
          <P>
            Pick a <a href="#model-tiers" className="text-foreground underline underline-offset-4">model tier</a> per
            agent: fast for routing, reasoning for lead agents, voice for live calls.
          </P>
        </>
      );

    case "approvals":
      return (
        <>
          <PageHead
            eyebrow="Build"
            title="Approvals and security"
            lede="Businesses trust Fless because people stay in charge. Every employee inherits these protections."
          />
          <H2>Approval gates</H2>
          <P>List any tool that should never run without a person signing off. The request goes to the business&apos;s approval queue.</P>
          <CodeView code={APPROVALS_EXAMPLE} filename="employee.ts" />
          <H2>Built in for every employee</H2>
          <Defs
            items={[
              { term: "No secret access", text: "Your code never sees customer passwords, tokens or API keys. Fless injects them at the moment a tool runs." },
              { term: "Least privilege", text: "Only the tools in your manifest can be called, with the permissions each plugin declares." },
              { term: "Time limits", text: "Model reasoning stops after 30 seconds and outside requests after 10, so nothing hangs." },
              { term: "Audit log", text: "Every message, tool call and approval is recorded and exportable by the business." },
              { term: "Isolation", text: "Each customer's data and knowledge is kept separate from every other customer." },
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
          <Table head={["pricing.model", "How it bills", "Example"]} rows={PRICING_MODELS.map((m) => [m.model, m.summary, m.example])} />
          <H2>Usage events</H2>
          <P>
            Use these in <C>usageRates[].eventType</C> to charge for metered work.
          </P>
          <Chips items={USAGE_EVENTS} />
        </>
      );

    case "packages":
      return (
        <>
          <PageHead eyebrow="Packages and plugins" title="Core packages" lede="Three packages cover everything you need to build, test and ship." />
          <CodeView code={INSTALL} language="bash" filename="terminal" />
          <div className="mt-12 space-y-12">
            {SDK_PACKAGES.map((p) => (
              <section key={p.name}>
                <p className="text-[12px] font-medium text-muted-foreground mb-2">{p.role}</p>
                <h2 className="font-mono text-[18px] text-foreground mb-3">{p.name}</h2>
                <P>{p.summary}</P>
                <Chips items={p.exports} />
              </section>
            ))}
          </div>
        </>
      );

    case "plugins":
      return (
        <>
          <PageHead
            eyebrow="Packages and plugins"
            title="Plugin catalog"
            lede="Plugins connect your employee to the services businesses already use. The business connects its own account; you only declare which tools you need."
          />
          <Defs items={(["Live", "Beta", "Planned"] as PluginStatus[]).map((s) => ({ term: <Status status={s} />, text: PLUGIN_STATUS_NOTE[s] }))} />
          {PLUGIN_CATEGORIES.map((cat) => (
            <section key={cat}>
              <H2>{cat}</H2>
              <div className="border-t border-border/60">
                {PLUGINS.filter((p) => p.category === cat).map((p) => (
                  <a key={p.id} href={`#plugin-${p.id}`} className="group block py-5 border-b border-border/60">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="text-[16px] font-medium text-foreground group-hover:text-primary transition-colors">{p.name}</span>
                      <Status status={p.status} />
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

    case "sandbox":
      return (
        <>
          <PageHead
            eyebrow="Test and ship"
            title="Test in the sandbox"
            lede="The sandbox runs your employee against mock versions of every plugin, so you can test real conversations without touching live accounts."
          />
          <CodeView code={SANDBOX_OUTPUT} language="bash" filename="terminal" />
          <H2>From code</H2>
          <P>Use the runner in your own test suite to check replies and tool calls.</P>
          <CodeView code={RUNNER_EXAMPLE} filename="employee.test.ts" />
        </>
      );

    case "verify":
      return (
        <>
          <PageHead
            eyebrow="Test and ship"
            title="Verification"
            lede="Before anything reaches the marketplace, an automated review checks that your employee is correct, safe and fast. Passing builds are signed."
          />
          <CodeView code={VERIFY_OUTPUT} language="bash" filename="terminal" />
          <H2>What is checked</H2>
          <Defs
            items={[
              { term: "Schema", text: "The manifest is complete and every field is valid." },
              { term: "Permissions", text: "Every tool is declared and no more access is requested than needed." },
              { term: "Skills", text: "Every tool a skill needs is listed in tools." },
              { term: "Approvals", text: "Tools listed for approval actually pause for a person." },
              { term: "Conversations", text: "Standard test conversations produce correct replies and tool calls." },
              { term: "Safety", text: "Resistance to prompt injection and attempts to leak data." },
              { term: "Speed and cost", text: "Replies stay within the latency and cost budget for the model tier." },
            ]}
          />
        </>
      );

    case "publish":
      return (
        <>
          <PageHead eyebrow="Test and ship" title="Publish and get paid" lede="Ship a signed build to the marketplace and earn from every business that hires it." />
          <Steps
            items={[
              { title: "Verify", body: <CodeView code="npx @fless/cli verify ./src/employee.ts" language="bash" filename="terminal" /> },
              { title: "Publish", body: <CodeView code="npx @fless/cli publish" language="bash" filename="terminal" /> },
              { title: "Review", body: <P>The Fless team reviews the listing, description and pricing. You&apos;ll hear back by email.</P> },
              { title: "Go live", body: <P>Your employee appears on the marketplace for the countries and industries in targetMarket.</P> },
              {
                title: "Get paid",
                body: <P>You receive 35% of every subscription and metered charge, paid monthly to your bank or Stripe account. Fless keeps 65% for computing, security, billing and distribution.</P>,
              },
            ]}
          />
        </>
      );

    case "capabilities": {
      const caps = Array.from(
        PLUGINS.reduce((m, p) => {
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
          <Table head={["Tier", "Typical latency", "Best for"]} rows={MODEL_TIERS.map((m) => [m.tier, m.latency, m.use])} />
        </>
      );

    case "markets":
      return (
        <>
          <PageHead eyebrow="Reference" title="Countries and languages" lede={<>Values for <C>targetMarket.countries</C> and <C>targetMarket.languages</C>.</>} />
          <H2>Countries</H2>
          <Table head={["Code", "Country", "Currency"]} rows={COUNTRIES.map((c) => [c.code, c.name, c.currency])} />
          <H2>Languages</H2>
          <Table head={["Code", "Language"]} rows={LANGUAGES.map((l) => [l.code, l.name])} />
        </>
      );

    case "departments":
      return (
        <>
          <PageHead eyebrow="Reference" title="Departments" lede={<>Values for <C>department</C>. Marketing is live for businesses today; the rest are in early access.</>} />
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

    case "cli":
      return (
        <>
          <PageHead eyebrow="Reference" title="CLI" lede={<>Commands in <C>@fless/cli</C>.</>} />
          <div className="space-y-10">
            {CLI_COMMANDS.map((c) => (
              <section key={c.command}>
                <CodeView code={c.command} language="bash" filename="terminal" />
                <p className="mt-4 text-[15px] text-muted-foreground leading-relaxed">{c.summary}</p>
              </section>
            ))}
          </div>
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
