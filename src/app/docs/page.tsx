import type { ReactNode } from "react"
import Link from "next/link"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { DocsHashAliases } from "@/components/DocsHashAliases"
import { CONNECTIONS, CONNECTION_CATEGORIES, categoryLabel } from "@/lib/connections"
import { BILLING_STATEMENT, BUILDER_SHARE, FLESS_SHARE, PLANS, TRIAL_DAYS, formatMoney } from "@/lib/billing"
import { SOC2_SENTENCE } from "@/lib/claims"
import en from "../../../messages/en.json"

// Help centre for businesses and builders. Plain language, no code.

type Section = { id: string; title: string; audience: "Everyone" | "Businesses" | "Builders"; body: ReactNode }

const available = CONNECTIONS.filter((c) => c.status === "Available").length
const topCategories = CONNECTION_CATEGORIES.slice(0, 10)

function P({ children }: { children: ReactNode }) {
  return <p className="text-[16px] sm:text-[17px] leading-[1.75] text-foreground/85 mb-5">{children}</p>
}

function List({ items }: { items: ReactNode[] }) {
  return (
    <ul className="mb-6 space-y-2.5 pl-5 list-disc marker:text-muted-foreground text-[16px] sm:text-[17px] leading-[1.7] text-foreground/85">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  )
}

function Steps({ items }: { items: { title: string; text: ReactNode }[] }) {
  return (
    <ol className="mb-6 space-y-4">
      {items.map((s, i) => (
        <li key={s.title} className="grid grid-cols-[2rem_1fr] gap-3">
          <span className="text-[13px] font-medium tabular-nums text-muted-foreground pt-1">{String(i + 1).padStart(2, "0")}</span>
          <div>
            <div className="text-[16px] font-semibold">{s.title}</div>
            <div className="text-[15px] sm:text-[16px] leading-relaxed text-muted-foreground">{s.text}</div>
          </div>
        </li>
      ))}
    </ol>
  )
}

function Rows({ rows }: { rows: [string, ReactNode][] }) {
  return (
    <dl className="mb-6 divide-y divide-border/70 border-y border-border/70">
      {rows.map(([k, v]) => (
        <div key={k} className="py-3.5 grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-1 sm:gap-6">
          <dt className="text-[15px] font-semibold">{k}</dt>
          <dd className="text-[15px] leading-relaxed text-muted-foreground">{v}</dd>
        </div>
      ))}
    </dl>
  )
}

const sections: Section[] = [
  {
    id: "getting-started",
    title: "Getting started",
    audience: "Everyone",
    body: (
      <>
        <P>
          Fless gives your business AI employees that do real work: answering customers, writing and publishing posts,
          booking meetings, following up on leads. You can hire one that a builder has made, or describe the job and
          build your own in a few minutes.
        </P>
        <Steps
          items={[
            { title: "Create your workspace", text: "Sign up, name your workspace and invite your team. The Free plan is enough to try everything." },
            { title: "Hire or build an employee", text: <>Browse the <Link href="/hire" className="text-primary">marketplace</Link>, or <Link href="/build" className="text-primary">describe the job</Link> and Studio builds it with you.</> },
            { title: "Connect your apps", text: "Sign in to the apps the employee needs, such as Gmail, WhatsApp or your CRM. Fless keeps the keys; the employee never sees your passwords." },
            { title: "Assign work in plain language", text: "Tell the employee what you need, the way you’d tell a colleague. It plans the work and shows you anything important before it goes out." },
          ]}
        />
      </>
    ),
  },
  {
    id: "hiring",
    title: "Hiring an employee",
    audience: "Businesses",
    body: (
      <>
        <P>
          Every employee on the <Link href="/hire" className="text-primary">marketplace</Link> is made by a builder and
          reviewed by Fless before it is listed. Its page shows what it does, which apps it needs, its price and its
          reviews from businesses that hired it.
        </P>
        <List
          items={[
            <>Prices are set by the builder: monthly, yearly (2 months free), or per completed task, such as per booked appointment.</>,
            <>Many builders offer a {TRIAL_DAYS}-day trial.</>,
            <>When you hire, you choose which apps and accounts the employee may use, and which actions need your approval.</>,
            <>You can pause or end a hire at any time from your dashboard.</>,
          ]}
        />
      </>
    ),
  },
  {
    id: "connecting-apps",
    title: "Connecting apps",
    audience: "Everyone",
    body: (
      <>
        <P>
          Employees work inside the apps you already use. Fless lists {CONNECTIONS.length} apps today, {available} of
          them generally available. There are four ways an employee can reach an app, and you don’t need to know which
          one is used: you just press Connect.
        </P>
        <Rows
          rows={[
            ["Apps with sign-in", "Google, Microsoft, LinkedIn, Meta, X and many more. You sign in once with the app’s own login page and choose the account to use."],
            ["Apps that connect through a standard connector", "Many apps offer a standard connector for AI assistants. Fless connects to it for you and checks every action it offers before your employee can use it."],
            ["Websites", "For sites with no app connection, an employee can do tasks in a secure browser, but only on websites Fless has approved and that you allow."],
            ["Any API", "If your own system has an API, connect it with its address and key. Fless describes each action in plain words so you can set what needs approval."],
          ]}
        />
        <P>Popular categories: {topCategories.map((c) => categoryLabel(c)).join(", ")}.</P>
        <P>
          Your passwords and keys are stored by Fless, encrypted, and are never shown to the employee or to the AI model.
          You can disconnect an app at any time.
        </P>
      </>
    ),
  },
  {
    id: "approvals",
    title: "Approvals: Ask first or Automatic",
    audience: "Businesses",
    body: (
      <>
        <P>Every action an employee can take has a setting you control:</P>
        <Rows
          rows={[
            ["Off", "The employee can’t do it at all."],
            ["Ask first", "The employee prepares the action and waits. You see a preview, such as the post, email or booking, can edit it, and approve or reject."],
            ["Automatic", "The employee goes ahead without asking. Use this for routine, low-risk work you trust it with."],
          ]}
        />
        <P>
          Actions that post publicly, can’t be undone or spend money start as Ask first. Turning one to Automatic asks
          you to confirm that you understand the risk. Approvals arrive in your dashboard and, if you like, by email.
        </P>
      </>
    ),
  },
  {
    id: "workspace-limits",
    title: "Workspace limits",
    audience: "Businesses",
    body: (
      <>
        <P>
          Limits apply to every employee in your workspace, whatever each employee’s own settings say. Owners and admins
          can set them; other members can see them.
        </P>
        <List
          items={[
            "The most any action may ever be allowed to do (for example: payments can never be Automatic).",
            "How much may be spent on work credits each month.",
            "Which apps and websites employees may use at all.",
            "An emergency stop that pauses an employee, or all of them, at once.",
          ]}
        />
      </>
    ),
  },
  {
    id: "activity-log",
    title: "Activity log",
    audience: "Businesses",
    body: (
      <P>
        Everything an employee does is recorded: what it did, in which app, as which account, whether someone approved
        it, and what it cost. Sensitive details are hidden in the log. You can filter it, export it as a spreadsheet,
        and undo actions where the app allows it, such as deleting a post that went out.
      </P>
    ),
  },
  {
    id: "studio",
    title: "Building an employee in Studio",
    audience: "Builders",
    body: (
      <>
        <P>
          Studio is a chat. You describe the job; Studio drafts the employee and shows it next to the conversation, with
          a live test chat. No code and no files to edit.
        </P>
        <Steps
          items={[
            { title: "Describe the job", text: "For example: “A front-desk assistant for dental clinics that answers WhatsApp, books appointments and sends reminders.”" },
            { title: "Answer Studio’s questions", text: "Tone of voice, working hours, when to hand over to a person, which apps it needs and which actions should ask first." },
            { title: "Add what it should know", text: "Upload documents or paste links: price lists, policies, FAQs. The employee answers from them." },
            { title: "Test it live", text: "Chat with it as a customer would. Tests never touch real accounts. Studio keeps every version, so you can go back." },
            { title: "Publish", text: <>Keep it private to your workspace, or publish it to the marketplace (see <a href="#publishing" className="text-primary">Publishing and review</a>).</> },
          ]}
        />
        <P>
          Businesses can use Studio too, under “Build for my business”. Those employees stay private and have no
          employee price. <Link href="/build" className="text-primary">Start building →</Link>
        </P>
      </>
    ),
  },
  {
    id: "skills",
    title: "Skills",
    audience: "Builders",
    body: (
      <>
        <P>
          A skill is a procedure written in plain language: when it applies, the steps, and what “done” looks like. For
          example, “Chase an unpaid invoice: send a friendly reminder after 3 days, a firmer one after 10, then ask the
          owner.”
        </P>
        <List
          items={[
            "Reuse a skill across all your employees.",
            "Studio suggests skills from the library as you describe the job.",
            "Publish a skill so other builders can use it, and earn when they do.",
          ]}
        />
      </>
    ),
  },
  {
    id: "publishing",
    title: "Publishing and review",
    audience: "Builders",
    body: (
      <>
        <P>
          Private employees go live in your workspace straight away. Marketplace employees are reviewed by Fless first.
          Review checks that the employee does what its page says, behaves safely, asks before risky actions, and that its
          costs are reasonable. Most reviews finish within a few working days, and you get clear notes if something needs
          fixing.
        </P>
        <P>
          Once listed, your employee gets a sales page with a live demo, and referral links you can share. Each new
          version you publish is reviewed the same way; businesses keep the version they hired until they choose to update.
        </P>
      </>
    ),
  },
  {
    id: "pricing",
    title: "Pricing and credits",
    audience: "Everyone",
    body: (
      <>
        <P>One bill, three parts: a workspace plan, the price of any marketplace employee you hire, and work credits.</P>
        <Rows
          rows={PLANS.map((p) => {
            const copy = en.pricing.plans[p.id]
            const price = p.monthly ? (p.monthly.USD === 0 ? "Free" : `${formatMoney(p.monthly.USD, "USD")} / month`) : "Custom"
            const credits = p.includedCreditsUsd != null ? `, ${formatMoney(p.includedCreditsUsd, "USD")} of credits a month` : ""
            return [p.name, `${price}: ${copy.employees}, ${copy.seats}${credits}.`]
          })}
        />
        <P>
          Work credits pay for what employees use: AI model use, research, images, website tasks, voice minutes and paid
          app actions. Credits top up automatically within a monthly cap you set. Connect your own AI model account and
          model use is billed by your provider instead.
        </P>
        <P>{BILLING_STATEMENT}</P>
        <P>
          <Link href="/pricing" className="text-primary">See full pricing and the cost calculator →</Link>
        </P>
      </>
    ),
  },
  {
    id: "payouts",
    title: "Builder earnings and payouts",
    audience: "Builders",
    body: (
      <>
        <P>
          You keep {BUILDER_SHARE}% of what businesses pay for your marketplace employees: subscriptions and per-task
          charges. Fless keeps {FLESS_SHARE}% for hosting, billing, support and distribution. Work credits are not part
          of the split; businesses pay those for the work itself.
        </P>
        <List
          items={[
            "Payouts are monthly.",
            "Stripe pays out in most countries, with identity and tax checks built in.",
            "Paystack transfers pay out to bank accounts in Nigeria, Ghana, Kenya and South Africa.",
            "Your dashboard shows earnings per employee, per business and per referral link.",
          ]}
        />
      </>
    ),
  },
  {
    id: "hosting",
    title: "Hosting options",
    audience: "Businesses",
    body: (
      <Rows
        rows={[
          ["Fless Cloud", "The default. Fless runs everything; nothing to set up."],
          ["Private Cloud", "A dedicated, isolated environment for your company, with your own encryption key. Enterprise plan."],
          ["Your own servers", "Run employees on your own machines, next to your systems and data, while you manage them from the same dashboard. The same approvals, limits and activity log apply. Enterprise plan."],
        ]}
      />
    ),
  },
  {
    id: "security",
    title: "Security and data",
    audience: "Everyone",
    body: (
      <>
        <List
          items={[
            "Your data is used only to run your workspace. It is never used to train public AI models.",
            "Passwords and keys for your apps are encrypted and never shown to employees or AI models.",
            "Every workspace is kept separate from every other.",
            "Data is encrypted in transit and at rest.",
            "SSO and audit export are available on the Business and Enterprise plans.",
            SOC2_SENTENCE,
          ]}
        />
        <P>
          More detail on the <Link href="/security" className="text-primary">security page</Link>. To delete your data,
          see <Link href="/data-deletion" className="text-primary">data deletion</Link>.
        </P>
      </>
    ),
  },
]

const groups: { title: string; audience: Section["audience"][] }[] = [
  { title: "Start here", audience: ["Everyone"] },
  { title: "For businesses", audience: ["Businesses"] },
  { title: "For builders", audience: ["Builders"] },
]

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <Header activePage="docs" />
      <DocsHashAliases />
      <main className="flex-1 pt-24 md:pt-32 pb-24">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
          <div className="max-w-[720px] mb-12 md:mb-16">
            <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary mb-4">Help centre</p>
            <h1 className="text-[36px] sm:text-5xl font-display font-semibold tracking-[-0.04em] leading-[1.08]">
              How Fless works, in plain words.
            </h1>
            <p className="mt-5 text-[17px] sm:text-lg text-muted-foreground leading-relaxed">
              Guides for businesses hiring or building AI employees, and for builders selling them. Can’t find something?{" "}
              <Link href="/contact" className="text-primary">Ask us</Link>.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10 lg:gap-16">
            <nav aria-label="Help topics" className="lg:sticky lg:top-24 lg:self-start">
              {groups.map((g) => (
                <div key={g.title} className="mb-6">
                  <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground mb-2">{g.title}</div>
                  <ul className="space-y-1">
                    {sections
                      .filter((s) => g.audience.includes(s.audience))
                      .map((s) => (
                        <li key={s.id}>
                          <a href={`#${s.id}`} className="block py-1 text-[14px] text-foreground/80 hover:text-primary transition-colors">
                            {s.title}
                          </a>
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </nav>

            <div className="max-w-[720px] min-w-0">
              {sections.map((s) => (
                <section key={s.id} id={s.id} className="scroll-mt-24 pb-12 mb-12 border-b border-border/60 last:border-0">
                  <p className="text-[12px] font-medium text-muted-foreground mb-2">{s.audience}</p>
                  <h2 className="text-2xl sm:text-[28px] font-display font-semibold tracking-tight mb-5">{s.title}</h2>
                  {s.body}
                </section>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
