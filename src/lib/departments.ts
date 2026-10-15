import { PILOT_BUSINESS_COUNT } from "@/lib/claims"
/**
 * An example of the kind of employee builders make for a category. These are illustrations,
 * not real published employees; live employees come from the marketplace API.
 */
export type DepartmentEmployee = {
  id: string
  role: string
  isManager?: boolean
  ownerType?: "FLESS" | "BUILDER" | "PARTNER"
  ownerName?: string
  badge: string
  description: string
  skills: string[]
}

export type Department = {
  slug: string
  name: string
  line: string
  headline: string
  lede: string
  hero: string
  heroAlt: string
  markets: string
  metrics: { value: string; label: string }[]
  employees: DepartmentEmployee[]
  capabilities: {
    title: string
    copy: string
    image: string
  }[]
  quote: { text: string; author: string; role: string }
  status: "live" | "early-access"
}

export const departments: Department[] = [
  {
    slug: "marketing",
    name: "Marketing",
    status: "live",
    line: "Content, SEO, social",
    headline: "Campaigns that ship — in every market.",
    lede: "Briefs become posts and pages. One calendar for every market you operate — without a 12-tool stack.",
    hero: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1800&auto=format&fit=crop&q=80",
    heroAlt: "Marketing team reviewing a campaign",
    markets: "Built for teams across Africa, Europe, the Middle East and North America",
    metrics: [
      { value: String(PILOT_BUSINESS_COUNT), label: "Businesses in pilot" },
      { value: "6", label: "Networks live (LinkedIn, X, Facebook, Instagram, Threads, Bluesky)" },
      { value: "100%", label: "Approval before publishing" },
    ],
    employees: [
      {
        id: "mkt-manager",
        role: "Marketing Manager",
        isManager: true,
        badge: "Department Lead",
        description: "Orchestrates multi-channel marketing roadmaps, cross-team campaign sprints, CAC goals, and brand positioning.",
        skills: ["Campaign Orchestration", "Brand Strategy", "Channel Budgeting", "Performance Auditing"],
      },
      {
        id: "mkt-content",
        role: "Content Manager",
        badge: "Editorial Lead",
        description: "Authors high-converting case studies, editorial articles, whitepapers, and long-form narrative content.",
        skills: ["Long-form Editorial", "Case Studies", "Copywriting", "Content Calendars"],
      },
      {
        id: "mkt-seo",
        role: "SEO Manager",
        badge: "Organic Search",
        description: "Optimizes site architecture, targets high-intent keyword clusters, monitors SERP rankings, and writes programmatic content.",
        skills: ["Keyword Discovery", "Technical On-page SEO", "SERP Monitoring", "Backlink Architecture"],
      },
      {
        id: "mkt-social",
        role: "Social Media Manager",
        badge: "Social Media",
        description: "Builds daily multi-network publishing calendars across LinkedIn, X, Facebook, Instagram, Threads and Bluesky to grow organic community engagement.",
        skills: ["Multi-network Scheduling", "Audience Engagement", "Copy Variations", "Trend Piggybacking"],
      },
      {
        id: "mkt-designer",
        role: "Designer",
        badge: "Creative & Brand",
        description: "Designs brand identities, marketing assets, vector illustrations, hero banners, and high-impact social cards.",
        skills: ["Visual Brand Identity", "UI / Graphic Design", "Social Visuals", "Design Systems"],
      },
      {
        id: "mkt-email",
        role: "Email Marketers",
        badge: "Lifecycle & Nurture",
        description: "Plans and deploys automated onboarding sequences, segment broadcasts, customer newsletters, and retention triggers.",
        skills: ["Email Sequences", "List Segmentation", "Deliverability", "A/B Subject Testing"],
      },
      {
        id: "mkt-ads",
        role: "Ads Manager",
        badge: "Ads: coming soon",
        description: "Plans paid campaigns and writes ad copy, hooks and creative briefs for Meta, Google and LinkedIn, ready for you to launch.",
        skills: ["Ad Copy", "Creative Briefs", "Audience Planning", "Campaign Plans"],
      },
    ],
    capabilities: [
      {
        title: "Content",
        copy: "Articles, emails, and landing copy from the brief you already wrote.",
        image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&auto=format&fit=crop&q=80",
      },
      {
        title: "SEO",
        copy: "Pages structured for search — titles, internals, and a report you can review.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80",
      },
      {
        title: "Social (ads coming soon)",
        copy: "Creative, captions, and a calendar that stays full across official APIs.",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&auto=format&fit=crop&q=80",
      },
    ],
    quote: {
      text: `In pilot with ${PILOT_BUSINESS_COUNT} businesses. Founders, agencies and lean teams are running the Fless Marketing Employee today. Customer stories Launching Soon.`,
      author: "Fless Pilot Program",
      role: `${PILOT_BUSINESS_COUNT} businesses active`,
    },
  },
  {
    slug: "voice",
    name: "Voice",
    status: "early-access",
    line: "Inbound, outbound, booking",
    headline: "A receptionist built to cover every call.",
    lede: "Inbound and outbound calls, qualification, and booking — built for the languages and hours your markets need.",
    hero: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=1800&auto=format&fit=crop&q=80",
    heroAlt: "Voice operations on a live call",
    markets: "Built for teams across Africa, Europe, the Middle East and North America",
    metrics: [
      { value: "Early access", label: "Status" },
      { value: "Marketing", label: "Live today" },
      { value: "Roadmap", label: "Telephony desk" },
    ],
    employees: [
      {
        id: "voice-manager",
        role: "Voice Manager",
        isManager: true,
        badge: "Department Lead & Operations",
        description: "Manages telephony infrastructure, oversees call routing trees, audits conversation quality, and analyzes appointment conversion rates.",
        skills: ["Telephony Architecture", "Call Quality Auditing", "Routing Trees & IVR", "Conversion Analytics", "SIP Trunking"],
      },
      {
        id: "voice-receptionist",
        role: "Receptionist",
        isManager: false,
        badge: "Front Desk & Live Answering",
        description: "Operates telephony workflows, answers inbound calls, qualifies prospects, books calendar appointments, and routes VIP callers.",
        skills: ["Live Call Answering", "Calendar Booking", "Caller Qualification", "VIP Routing", "SMS Confirmations"],
      },
    ],
    capabilities: [
      { title: "Inbound", copy: "Answer, qualify, and route. Notes land in the CRM before the call ends.", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=80" },
      { title: "Outbound", copy: "Follow-up lists that actually get dialed — with a script you can audit.", image: "https://images.unsplash.com/photo-1525182008055-f88b95ff7980?w=1200&auto=format&fit=crop&q=80" },
      { title: "Booking", copy: "Calendar holds, confirmations, and no-show reminders with human escalation rules.", image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=1200&auto=format&fit=crop&q=80" },
    ],
    quote: {
      text: `In pilot with ${PILOT_BUSINESS_COUNT} businesses. Founders, agencies and lean teams are running the Fless Marketing Employee today. Customer stories Launching Soon.`,
      author: "Fless Pilot Program",
      role: `${PILOT_BUSINESS_COUNT} businesses active`,
    },
  },
  {
    slug: "sales",
    name: "Sales",
    status: "early-access",
    line: "Leads, CRM, follow-up",
    headline: "Every lead gets a next step.",
    lede: "Research, outreach, and a pipeline that stays honest — so deals don’t stall in a spreadsheet.",
    hero: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1800&auto=format&fit=crop&q=80",
    heroAlt: "Sales conversation in an office",
    markets: "Built for teams across Africa, Europe, the Middle East and North America",
    metrics: [
      { value: "Early access", label: "Status" },
      { value: "Marketing", label: "Live today" },
      { value: "Roadmap", label: "Sales & CRM desk" },
    ],
    employees: [
      {
        id: "sales-manager",
        role: "Sales Manager",
        isManager: true,
        badge: "Department Lead",
        description: "Oversees revenue targets, pipeline velocity, deal reviews, rep assignment, and sales coaching.",
        skills: ["Pipeline Forecasting", "Quota Oversight", "Deal Win-loss Reviews", "Territory Allocation"],
      },
      {
        id: "sales-rep",
        role: "Sales Representative",
        badge: "Account Executive",
        description: "Engages qualified prospects, delivers tailored product demonstrations, handles objections, and closes agreements.",
        skills: ["Discovery Calls", "Pitch Delivery", "Objection Handling", "Proposal Negotiation"],
      },
      {
        id: "sales-leadgen",
        role: "Lead Generation Manager",
        badge: "Outbound Growth",
        description: "Identifies high-fit target accounts, extracts verified decision-maker emails, and runs multi-touch outbound cadences.",
        skills: ["ICP Account Research", "Contact Enrichment", "Cold Email Cadences", "Lead Scoring"],
      },
      {
        id: "sales-crm",
        role: "CRM Manager",
        badge: "Sales Ops & CRM",
        description: "Keeps pipeline data accurate, automates deal stage changes, cleans contact records, and tracks rep response times.",
        skills: ["Pipeline Stage Tracking", "HubSpot / Salesforce Sync", "Data Enrichment", "Activity Auditing"],
      },
    ],
    capabilities: [
      { title: "Leads", copy: "Research accounts and score who is actually worth a call this week.", image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&auto=format&fit=crop&q=80" },
      { title: "CRM", copy: "Stages stay current. No more “I’ll update Salesforce later.”", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80" },
      { title: "Follow-up", copy: "Sequences that run until someone replies — then a human takes the meeting.", image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&auto=format&fit=crop&q=80" },
    ],
    quote: {
      text: `In pilot with ${PILOT_BUSINESS_COUNT} businesses. Founders, agencies and lean teams are running the Fless Marketing Employee today. Customer stories Launching Soon.`,
      author: "Fless Pilot Program",
      role: `${PILOT_BUSINESS_COUNT} businesses active`,
    },
  },
  {
    slug: "support",
    name: "Support",
    status: "early-access",
    line: "Tickets, success, escalation",
    headline: "Tickets that actually resolve.",
    lede: "Triage, draft replies from your knowledge base, and escalate only when a person should step in.",
    hero: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1800&auto=format&fit=crop&q=80",
    heroAlt: "Support team at work",
    markets: "Built for teams across Africa, Europe, the Middle East and North America",
    metrics: [
      { value: "Early access", label: "Status" },
      { value: "Marketing", label: "Live today" },
      { value: "Roadmap", label: "Customer support desk" },
    ],
    employees: [
      {
        id: "sup-manager",
        role: "Support Manager",
        isManager: true,
        badge: "Department Lead",
        description: "Supervises ticket queues, SLA compliance, CSAT metrics, escalation policies, and knowledge base curation.",
        skills: ["SLA Monitoring", "Queue Load Balancing", "CSAT Quality Control", "Incident Protocols"],
      },
      {
        id: "sup-customer",
        role: "Customer Support",
        badge: "Frontline Support",
        description: "Resolves customer questions across email, chat, and help desk channels with empathetic, technical solutions.",
        skills: ["Ticket Resolution", "Troubleshooting", "Knowledge Base Search", "Customer Empathy"],
      },
      {
        id: "sup-success",
        role: "Customer Success",
        badge: "Retention & Health",
        description: "Monitors account product usage, runs regular health checks, leads customer check-ins, and reduces churn risks.",
        skills: ["Account Health Audits", "Onboarding Check-ins", "Churn Prevention", "Usage Analytics"],
      },
    ],
    capabilities: [
      { title: "Tickets", copy: "One inbox for email, chat, and WhatsApp — ranked by account health.", image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&auto=format&fit=crop&q=80" },
      { title: "Success", copy: "Health scores and check-ins so accounts don’t go quiet.", image: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=1200&auto=format&fit=crop&q=80" },
      { title: "Escalation", copy: "A clean handoff with context — not an unorganized message at 6pm.", image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&auto=format&fit=crop&q=80" },
    ],
    quote: {
      text: `In pilot with ${PILOT_BUSINESS_COUNT} businesses. Founders, agencies and lean teams are running the Fless Marketing Employee today. Customer stories Launching Soon.`,
      author: "Fless Pilot Program",
      role: `${PILOT_BUSINESS_COUNT} businesses active`,
    },
  },
  {
    slug: "recruitment",
    name: "Recruitment",
    status: "early-access",
    line: "Sourcing, screening, hiring",
    headline: "A shortlist before lunch.",
    lede: "Source, screen, and schedule. You meet people who already match the role — not a raw inbox.",
    hero: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1800&auto=format&fit=crop&q=80",
    heroAlt: "Recruiting conversation",
    markets: "Built for teams across Africa, Europe, the Middle East and North America",
    metrics: [
      { value: "Early access", label: "Status" },
      { value: "Marketing", label: "Live today" },
      { value: "Roadmap", label: "Hiring & sourcing desk" },
    ],
    employees: [
      {
        id: "rec-manager",
        role: "Recruitment Manager",
        isManager: true,
        badge: "Department Lead",
        description: "Oversees company hiring roadmaps, job specification rubrics, candidate interview loops, and compensation offers.",
        skills: ["Talent Pipeline Oversight", "Hiring Strategy", "Job Rubric Definition", "Offer Formulation"],
      },
      {
        id: "rec-acquisition",
        role: "Talent Acquisition Manager",
        badge: "Candidate Screening",
        description: "Evaluates resumes against role criteria, conducts structured preliminary candidate assessments, and scores competency rubrics.",
        skills: ["Resume Parsing", "Competency Scoring", "Structured Screening", "Candidate Shortlisting"],
      },
      {
        id: "rec-sourcer",
        role: "Talent Sourcer",
        badge: "Passive Talent Sourcing",
        description: "Hunts top passive engineering and leadership talent across GitHub, LinkedIn, and developer communities with personalized outreach.",
        skills: ["Boolean Search Strings", "Competitor Team Mapping", "Personalized Outreach", "Talent Pooling"],
      },
      {
        id: "rec-coordinator",
        role: "Recruitment Coordinator",
        badge: "Interview Logistics",
        description: "Schedules panel interviews across international timezones, prepares candidate briefings, and collects evaluator scorecards.",
        skills: ["Panel Scheduling", "Candidate Prep Briefs", "Scorecard Aggregation", "Logistics Coordination"],
      },
    ],
    capabilities: [
      { title: "Sourcing", copy: "Roles go out. Profiles come back ranked against the brief.", image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&auto=format&fit=crop&q=80" },
      { title: "Screening", copy: "Structured questions, scorecards, and a paper trail for every decision.", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&auto=format&fit=crop&q=80" },
      { title: "Hiring", copy: "Interviews booked, offers drafted, and the hiring manager stays in the loop.", image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&auto=format&fit=crop&q=80" },
    ],
    quote: {
      text: `In pilot with ${PILOT_BUSINESS_COUNT} businesses. Founders, agencies and lean teams are running the Fless Marketing Employee today. Customer stories Launching Soon.`,
      author: "Fless Pilot Program",
      role: `${PILOT_BUSINESS_COUNT} businesses active`,
    },
  },
  {
    slug: "hr",
    name: "HR",
    status: "early-access",
    line: "Onboarding, policy, reviews",
    headline: "People ops without the scavenger hunt.",
    lede: "Onboarding, policy, and reviews in one record — from offer signed to first review.",
    hero: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1800&auto=format&fit=crop&q=80",
    heroAlt: "Team in an HR onboarding session",
    markets: "Built for teams across Africa, Europe, the Middle East and North America",
    metrics: [
      { value: "Early access", label: "Status" },
      { value: "Marketing", label: "Live today" },
      { value: "Roadmap", label: "People & HR desk" },
    ],
    employees: [
      {
        id: "hr-manager",
        role: "HR Manager",
        isManager: true,
        badge: "Department Lead",
        description: "Leads people operations governance, HR compliance, workplace policy updates, and company-wide performance review cadences.",
        skills: ["HR Governance", "Policy Enforcement", "Performance Review Design", "Labor Compliance"],
      },
      {
        id: "hr-assistant",
        role: "HR Assistant",
        badge: "People Support",
        description: "Answers employee administrative inquiries, issues employment verification letters, manages leave balances, and updates personnel files.",
        skills: ["PTO Management", "Employment Verification", "Employee Inquiries", "Records Maintenance"],
      },
      {
        id: "hr-peopleops",
        role: "People Operations Manager",
        badge: "Onboarding & Lifecycle",
        description: "Executes seamless new hire onboarding, workstation setups, 30-60-90 check-ins, buddy assignments, and team offboarding.",
        skills: ["New Hire Onboarding", "Hardware & Access Provisioning", "30-60-90 Reviews", "Lifecycle Workflows"],
      },
      {
        id: "hr-experience",
        role: "Employee Experience Manager",
        badge: "Culture & Benefits",
        description: "Tracks team pulse survey sentiment, administers health and wellness perks, and coordinates team connection initiatives.",
        skills: ["Pulse Surveys", "Benefits Guidance", "Team Engagement", "Culture Programs"],
      },
    ],
    capabilities: [
      { title: "Onboarding", copy: "Equipment, access, and a first-week plan that doesn’t live in five inboxes.", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&auto=format&fit=crop&q=80" },
      { title: "Policy", copy: "The current version, acknowledged, with a date. Not a PDF in Drive.", image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&auto=format&fit=crop&q=80" },
      { title: "Reviews", copy: "Cycles that start on time, with notes that hiring already has.", image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&auto=format&fit=crop&q=80" },
    ],
    quote: {
      text: `In pilot with ${PILOT_BUSINESS_COUNT} businesses. Founders, agencies and lean teams are running the Fless Marketing Employee today. Customer stories Launching Soon.`,
      author: "Fless Pilot Program",
      role: `${PILOT_BUSINESS_COUNT} businesses active`,
    },
  },
  {
    slug: "operations",
    name: "Operations",
    status: "early-access",
    line: "Projects, docs, workflows",
    headline: "Work you can see — and finish.",
    lede: "Projects, documents, and handoffs with owners and due dates. Not a thread that goes quiet.",
    hero: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1800&auto=format&fit=crop&q=80",
    heroAlt: "Operations planning session",
    markets: "Built for teams across Africa, Europe, the Middle East and North America",
    metrics: [
      { value: "Early access", label: "Status" },
      { value: "Marketing", label: "Live today" },
      { value: "Roadmap", label: "Operations desk" },
    ],
    employees: [
      {
        id: "ops-manager",
        role: "Operations Manager",
        isManager: true,
        badge: "Department Lead",
        description: "Maintains business operational health, oversees company SLA benchmarks, identifies cross-team bottlenecks, and runs weekly operational closes.",
        skills: ["Operational Governance", "Cross-team Auditing", "Bottleneck Removal", "SLA Monitoring"],
      },
      {
        id: "ops-coordinator",
        role: "Project Coordinator",
        badge: "Project Delivery",
        description: "Tracks project milestones across departments, monitors deliverables, flags overdue dependencies, and keeps stakeholders aligned.",
        skills: ["Milestone Tracking", "Cross-team Dependencies", "Deadline Reminders", "Delivery Checklists"],
      },
      {
        id: "ops-workflow",
        role: "Workflow Manager",
        badge: "Automation Engineering",
        description: "Designs automated webhook pipes, multi-step integrations, error auto-retries, and synchronized data handoffs.",
        skills: ["Webhook Bridges", "Automation Workflows", "API Rate Limiting", "Payload Transformation"],
      },
      {
        id: "ops-documentation",
        role: "Documentation Manager",
        badge: "Knowledge & SOPs",
        description: "Standardizes operating procedures (SOPs), maintains company wikis, authors process diagrams, and archives obsolete documentation.",
        skills: ["SOP Playbook Authoring", "Knowledge Base Indexing", "Process Flowcharts", "Policy Auditing"],
      },
    ],
    capabilities: [
      { title: "Projects", copy: "Milestones, owners, and a status that isn’t “checking.”", image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&auto=format&fit=crop&q=80" },
      { title: "Docs", copy: "The latest version lives here. Approvals leave a name and a time.", image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&auto=format&fit=crop&q=80" },
      { title: "Workflows", copy: "Intake → review → done. Visible on one board across teams.", image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&auto=format&fit=crop&q=80" },
    ],
    quote: {
      text: `In pilot with ${PILOT_BUSINESS_COUNT} businesses. Founders, agencies and lean teams are running the Fless Marketing Employee today. Customer stories Launching Soon.`,
      author: "Fless Pilot Program",
      role: `${PILOT_BUSINESS_COUNT} businesses active`,
    },
  },
  {
    slug: "finance",
    name: "Finance",
    status: "early-access",
    line: "Invoices, expenses, payroll",
    headline: "Books that don’t wait until Friday.",
    lede: "Invoices go out, expenses get coded, payroll stays on time — without a month-end scramble.",
    hero: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1800&auto=format&fit=crop&q=80",
    heroAlt: "Finance work on invoices",
    markets: "Built for teams across Africa, Europe, the Middle East and North America",
    metrics: [
      { value: "Early access", label: "Status" },
      { value: "Marketing", label: "Live today" },
      { value: "Roadmap", label: "Finance desk" },
    ],
    employees: [
      {
        id: "fin-manager",
        role: "Finance Manager",
        isManager: true,
        badge: "Department Lead",
        description: "Monitors company capital runway, forecasts quarterly net burn, audits multi-currency ledger hygiene, and presents fiscal summaries.",
        skills: ["Runway Forecasting", "Ledger Governance", "Burn Analysis", "Fiscal Audits"],
      },
      {
        id: "fin-accounts",
        role: "Accounts Manager",
        badge: "General Ledger",
        description: "Reconciles daily bank payouts with payment transactions, classifies chart-of-account debits, and prepares clean balance sheets.",
        skills: ["Bank Reconciliation", "Chart of Accounts", "Ledger Classification", "Balance Sheets"],
      },
      {
        id: "fin-invoicing",
        role: "Invoicing Manager",
        badge: "Billing & AR",
        description: "Generates corporate invoices, runs automated payment reminders, manages customer billing queries, and tracks overdue receivables.",
        skills: ["Invoice Generation", "Automated Dunning", "Accounts Receivable", "Payment Retries"],
      },
      {
        id: "fin-expense",
        role: "Expense Manager",
        badge: "Expense Oversight",
        description: "Extracts receipt data with OCR, enforces company meal and travel caps, flags policy anomalies, and batches employee reimbursements.",
        skills: ["Receipt OCR Validation", "Spend Policy Auditing", "Reimbursement Batches", "Per Diem Enforcement"],
      },
    ],
    capabilities: [
      { title: "Invoices", copy: "Send, chase, and mark paid. The ledger matches the bank.", image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=1200&auto=format&fit=crop&q=80" },
      { title: "Expenses", copy: "Receipts coded as they land. Policy applied before the card statement.", image: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=1200&auto=format&fit=crop&q=80" },
      { title: "Payroll", copy: "Runs, exceptions, and a file finance and HR both trust.", image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=1200&auto=format&fit=crop&q=80" },
    ],
    quote: {
      text: `In pilot with ${PILOT_BUSINESS_COUNT} businesses. Founders, agencies and lean teams are running the Fless Marketing Employee today. Customer stories Launching Soon.`,
      author: "Fless Pilot Program",
      role: `${PILOT_BUSINESS_COUNT} businesses active`,
    },
  },
]

export function getDepartment(slug: string) {
  return departments.find((d) => d.slug === slug)
}
