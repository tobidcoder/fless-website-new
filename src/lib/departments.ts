export type DepartmentEmployee = {
  id: string
  name: string
  role: string
  isManager?: boolean
  ownerType?: "FLESS" | "BUILDER" | "PARTNER"
  ownerName?: string
  avatar: string
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
    snippet: { title: string; line: string; time: string }[]
  }[]
  activity: { title: string; line: string; time: string }[]
  quote: { text: string; author: string; role: string }
}

export const departments: Department[] = [
  {
    slug: "marketing",
    name: "Marketing",
    line: "Content, SEO, ads, social",
    headline: "Campaigns that ship — in every market.",
    lede: "Briefs become posts, pages, and ads. One calendar for every market you operate — without a 12-tool stack.",
    hero: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1800&auto=format&fit=crop&q=80",
    heroAlt: "Marketing team reviewing a campaign",
    markets: "Runs in 40+ countries",
    metrics: [
      { value: "3×", label: "Content shipped" },
      { value: "12", label: "Channels live" },
      { value: "2 min", label: "From brief to draft" },
    ],
    employees: [
      {
        id: "mkt-manager",
        name: "Maya",
        role: "Marketing Manager",
        isManager: true,
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=256&h=256&fit=crop&crop=faces&q=80",
        badge: "Department Lead",
        description: "Orchestrates multi-channel marketing roadmaps, cross-team campaign sprints, CAC goals, and brand positioning.",
        skills: ["Campaign Orchestration", "Brand Strategy", "Channel Budgeting", "Performance Auditing"],
      },
      {
        id: "mkt-content",
        name: "Chloe",
        role: "Content Manager",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=256&h=256&fit=crop&crop=faces&q=80",
        badge: "Editorial Lead",
        description: "Authors high-converting case studies, editorial articles, whitepapers, and long-form narrative content.",
        skills: ["Long-form Editorial", "Case Studies", "Copywriting", "Content Calendars"],
      },
      {
        id: "mkt-seo",
        name: "Nora",
        role: "SEO Manager",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=256&h=256&fit=crop&crop=faces&q=80",
        badge: "Organic Search",
        description: "Optimizes site architecture, targets high-intent keyword clusters, monitors SERP rankings, and writes programmatic content.",
        skills: ["Keyword Discovery", "Technical On-page SEO", "SERP Monitoring", "Backlink Architecture"],
      },
      {
        id: "mkt-social",
        name: "Zoe",
        role: "Social Media Manager",
        avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=256&h=256&fit=crop&crop=faces&q=80",
        badge: "Social Media",
        description: "Builds daily multi-network publishing calendars across LinkedIn, X, and Instagram to grow organic community engagement.",
        skills: ["Multi-network Scheduling", "Audience Engagement", "Copy Variations", "Trend Piggybacking"],
      },
      {
        id: "mkt-designer",
        name: "Felix",
        role: "Designer",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=256&h=256&fit=crop&crop=faces&q=80",
        badge: "Creative & Brand",
        description: "Designs brand identities, marketing assets, vector illustrations, hero banners, and high-impact social cards.",
        skills: ["Visual Brand Identity", "UI / Graphic Design", "Social Visuals", "Design Systems"],
      },
      {
        id: "mkt-email",
        name: "Ava",
        role: "Email Marketers",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=256&h=256&fit=crop&crop=faces&q=80",
        badge: "Lifecycle & Nurture",
        description: "Plans and deploys automated onboarding sequences, segment broadcasts, customer newsletters, and retention triggers.",
        skills: ["Email Sequences", "List Segmentation", "Deliverability", "A/B Subject Testing"],
      },
      {
        id: "mkt-ads",
        name: "Lucas",
        role: "Ads Manager",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=256&h=256&fit=crop&crop=faces&q=80",
        badge: "Paid Acquisition",
        description: "Executes paid acquisition campaigns across Meta, Google Search, and LinkedIn Ads, targeting high ROAS.",
        skills: ["Meta Ads", "Google Search Campaigns", "Creative Iteration", "ROAS Optimization"],
      },
    ],
    capabilities: [
      { title: "Content", copy: "Articles, emails, and landing copy from the brief you already wrote.", image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&auto=format&fit=crop&q=80", snippet: [{ title: "Draft", line: "London launch · 4 posts ready", time: "2m" }, { title: "Email", line: "Waitlist sequence queued", time: "14m" }] },
      { title: "SEO", copy: "Pages structured for search — titles, internals, and a report you can send.", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80", snippet: [{ title: "Pages", line: "4 UK URLs drafted", time: "18m" }, { title: "Report", line: "Rank pack sent to Chioma", time: "41m" }] },
      { title: "Ads & social", copy: "Creative, captions, and a calendar that stays full across networks.", image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&auto=format&fit=crop&q=80", snippet: [{ title: "Meta", line: "Creative set queued", time: "6m" }, { title: "LinkedIn", line: "Q3 post is live", time: "22m" }] },
    ],
    activity: [
      { title: "LinkedIn", line: "Q3 launch post is live", time: "2m" },
      { title: "SEO", line: "4 pages drafted for the London site", time: "18m" },
      { title: "Ads", line: "Creative set queued for Meta", time: "41m" },
    ],
    quote: { text: "We stopped writing the same posts every week. The calendar is actually full.", author: "Chioma Okafor", role: "CMO, Surgic+" },
  },
  {
    slug: "voice",
    name: "Voice",
    line: "Inbound, outbound, booking",
    headline: "A receptionist that never misses.",
    lede: "Inbound and outbound calls, qualification, and booking — in the languages and hours your markets need.",
    hero: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=1800&auto=format&fit=crop&q=80",
    heroAlt: "Voice operations on a live call",
    markets: "Local hours worldwide",
    metrics: [
      { value: "24/7", label: "Coverage" },
      { value: "48s", label: "Avg pickup" },
      { value: "7", label: "Bookings / hour" },
    ],
    employees: [
      {
        id: "voice-manager",
        name: "Julian",
        role: "Voice Manager",
        isManager: true,
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=256&h=256&fit=crop&crop=faces&q=80",
        badge: "Department Lead & Operations",
        description: "Manages telephony infrastructure, oversees call routing trees, audits conversation quality, and analyzes appointment conversion rates.",
        skills: ["Telephony Architecture", "Call Quality Auditing", "Routing Trees & IVR", "Conversion Analytics", "SIP Trunking"],
      },
      {
        id: "voice-receptionist",
        name: "Rachel",
        role: "Receptionist",
        isManager: false,
        avatar: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=256&h=256&fit=crop&crop=faces&q=80",
        badge: "Front Desk & Live Answering",
        description: "Operates 24/7 telephony operations, answers inbound calls instantly, qualifies prospects, books calendar appointments, and routes VIP callers.",
        skills: ["Live Call Answering", "Calendar Booking", "Caller Qualification", "VIP Routing", "SMS Confirmations"],
      },
    ],
    capabilities: [
      { title: "Inbound", copy: "Answer, qualify, and route. Notes land in the CRM before the call ends.", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=80", snippet: [{ title: "Clinic", line: "Thursday 3pm confirmed", time: "Just now" }, { title: "Notes", line: "Pushed to the record", time: "12s" }] },
      { title: "Outbound", copy: "Follow-up lists that actually get dialed — with a script you can audit.", image: "https://images.unsplash.com/photo-1525182008055-f88b95ff7980?w=1200&auto=format&fit=crop&q=80", snippet: [{ title: "List", line: "14 follow-ups completed", time: "22m" }, { title: "Script", line: "Dubai desk · v3 audited", time: "1h" }] },
      { title: "Booking", copy: "Calendar holds, confirmations, and no-show reminders without a human in the loop.", image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=1200&auto=format&fit=crop&q=80", snippet: [{ title: "Hold", line: "Dubai diary synced", time: "8m" }, { title: "Remind", line: "No-show SMS queued", time: "31m" }] },
    ],
    activity: [
      { title: "Inbound", line: "Clinic booking confirmed for 3pm", time: "Just now" },
      { title: "Outbound", line: "14 follow-ups completed", time: "22m" },
      { title: "Calendar", line: "Dubai diary synced", time: "1h" },
    ],
    quote: { text: "After-hours calls used to vanish. Appointments book themselves now.", author: "David Adeyemi", role: "CEO, HealthPlus" },
  },
  {
    slug: "sales",
    name: "Sales",
    line: "Leads, CRM, follow-up",
    headline: "Every lead gets a next step.",
    lede: "Research, outreach, and a pipeline that stays honest — so deals don’t stall in a spreadsheet.",
    hero: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1800&auto=format&fit=crop&q=80",
    heroAlt: "Sales conversation in an office",
    markets: "Pipeline across regions",
    metrics: [
      { value: "14", label: "Follow-ups / day" },
      { value: "+18%", label: "Leads this week" },
      { value: "$85k", label: "Open pipeline" },
    ],
    employees: [
      {
        id: "sales-manager",
        name: "Marcus",
        role: "Sales Manager",
        isManager: true,
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=256&h=256&fit=crop&crop=faces&q=80",
        badge: "Department Lead",
        description: "Oversees revenue targets, pipeline velocity, deal reviews, rep assignment, and sales coaching.",
        skills: ["Pipeline Forecasting", "Quota Oversight", "Deal Win-loss Reviews", "Territory Allocation"],
      },
      {
        id: "sales-rep",
        name: "Stan",
        role: "Sales Representative",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=256&h=256&fit=crop&crop=faces&q=80",
        badge: "Account Executive",
        description: "Engages qualified prospects, delivers tailored product demonstrations, handles objections, and closes agreements.",
        skills: ["Discovery Calls", "Pitch Delivery", "Objection Handling", "Proposal Negotiation"],
      },
      {
        id: "sales-leadgen",
        name: "Maya",
        role: "Lead Generation Manager",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=256&h=256&fit=crop&crop=faces&q=80",
        badge: "Outbound Growth",
        description: "Identifies high-fit target accounts, extracts verified decision-maker emails, and runs multi-touch outbound cadences.",
        skills: ["ICP Account Research", "Contact Enrichment", "Cold Email Cadences", "Lead Scoring"],
      },
      {
        id: "sales-crm",
        name: "Devon",
        role: "CRM Manager",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=256&h=256&fit=crop&crop=faces&q=80",
        badge: "Sales Ops & CRM",
        description: "Keeps pipeline data accurate, automates deal stage changes, cleans contact records, and tracks rep response times.",
        skills: ["Pipeline Stage Tracking", "HubSpot / Salesforce Sync", "Data Enrichment", "Activity Auditing"],
      },
    ],
    capabilities: [
      { title: "Leads", copy: "Research accounts and score who is actually worth a call this week.", image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&auto=format&fit=crop&q=80", snippet: [{ title: "Acme", line: "Scored 91 — intro sent", time: "4m" }, { title: "North", line: "Worth a call this week", time: "19m" }] },
      { title: "CRM", copy: "Stages stay current. No more “I’ll update Salesforce later.”", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80", snippet: [{ title: "Helix", line: "Moved to Demo · Tuesday", time: "9m" }, { title: "Orbit", line: "Won · $41k closed", time: "2h" }] },
      { title: "Follow-up", copy: "Sequences that run until someone replies — then a human takes the meeting.", image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&auto=format&fit=crop&q=80", snippet: [{ title: "Seq 4", line: "14 leads nudged", time: "12m" }, { title: "Reply", line: "Human takes the meeting", time: "44m" }] },
    ],
    activity: [
      { title: "New", line: "Acme scored 91 — intro sent", time: "4m" },
      { title: "Demo", line: "Helix moved to next Tuesday", time: "19m" },
      { title: "Won", line: "Orbit closed · $41k", time: "2h" },
    ],
    quote: { text: "The CRM is finally true. We spend the day on conversations, not data entry.", author: "James Okonkwo", role: "VP Sales, RevWit" },
  },
  {
    slug: "support",
    name: "Support",
    line: "Tickets, success, escalation",
    headline: "Tickets that actually resolve.",
    lede: "Triage, draft replies from your knowledge base, and escalate only when a person should step in.",
    hero: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1800&auto=format&fit=crop&q=80",
    heroAlt: "Support team at work",
    markets: "Inbox in every timezone",
    metrics: [
      { value: "48s", label: "First reply" },
      { value: "96%", label: "Resolved" },
      { value: "4.8", label: "CSAT" },
    ],
    employees: [
      {
        id: "sup-manager",
        name: "Alex",
        role: "Support Manager",
        isManager: true,
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=256&h=256&fit=crop&crop=faces&q=80",
        badge: "Department Lead",
        description: "Supervises ticket queues, SLA compliance, CSAT metrics, escalation policies, and knowledge base curation.",
        skills: ["SLA Monitoring", "Queue Load Balancing", "CSAT Quality Control", "Incident Protocols"],
      },
      {
        id: "sup-customer",
        name: "Maya",
        role: "Customer Support",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=256&h=256&fit=crop&crop=faces&q=80",
        badge: "Frontline Support",
        description: "Resolves customer questions across email, chat, and help desk channels with empathetic, technical solutions.",
        skills: ["Ticket Resolution", "Troubleshooting", "Knowledge Base Search", "Customer Empathy"],
      },
      {
        id: "sup-success",
        name: "Liam",
        role: "Customer Success",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=256&h=256&fit=crop&crop=faces&q=80",
        badge: "Retention & Health",
        description: "Monitors account product usage, runs regular health checks, leads customer check-ins, and reduces churn risks.",
        skills: ["Account Health Audits", "Onboarding Check-ins", "Churn Prevention", "Usage Analytics"],
      },
    ],
    capabilities: [
      { title: "Tickets", copy: "One inbox for email, chat, and WhatsApp — ranked by what will churn.", image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&auto=format&fit=crop&q=80", snippet: [{ title: "#4821", line: "Billing question resolved", time: "1m" }, { title: "#4820", line: "API timeout — in progress", time: "9m" }] },
      { title: "Success", copy: "Health scores and check-ins so accounts don’t go quiet.", image: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=1200&auto=format&fit=crop&q=80", snippet: [{ title: "HealthPlus", line: "Check-in sent", time: "44m" }, { title: "Score", line: "3 accounts at risk", time: "2h" }] },
      { title: "Escalation", copy: "A clean handoff with context — not a Slack dump at 6pm.", image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&auto=format&fit=crop&q=80", snippet: [{ title: "#4818", line: "Handoff with full thread", time: "16m" }, { title: "Owner", line: "Lina · due today", time: "31m" }] },
    ],
    activity: [
      { title: "#4821", line: "Billing question resolved", time: "1m" },
      { title: "#4820", line: "API timeout — in progress", time: "9m" },
      { title: "CS", line: "HealthPlus check-in sent", time: "44m" },
    ],
    quote: { text: "First reply used to be hours. Now the queue is a morning, not a week.", author: "Lina Mensah", role: "Head of Support, AllMoments" },
  },
  {
    slug: "recruitment",
    name: "Recruitment",
    line: "Sourcing, screening, hiring",
    headline: "A shortlist before lunch.",
    lede: "Source, screen, and schedule. You meet people who already match the role — not a raw inbox.",
    hero: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1800&auto=format&fit=crop&q=80",
    heroAlt: "Recruiting conversation",
    markets: "Hire in every office",
    metrics: [
      { value: "12", label: "Screened today" },
      { value: "94%", label: "Top match" },
      { value: "½", label: "Time to hire" },
    ],
    employees: [
      {
        id: "rec-manager",
        name: "Olivia",
        role: "Recruitment Manager",
        isManager: true,
        avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=256&h=256&fit=crop&crop=faces&q=80",
        badge: "Department Lead",
        description: "Oversees company hiring roadmaps, job specification rubrics, candidate interview loops, and compensation offers.",
        skills: ["Talent Pipeline Oversight", "Hiring Strategy", "Job Rubric Definition", "Offer Formulation"],
      },
      {
        id: "rec-acquisition",
        name: "Dylan",
        role: "Talent Acquisition Manager",
        avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=256&h=256&fit=crop&crop=faces&q=80",
        badge: "Candidate Screening",
        description: "Evaluates resumes against role criteria, conducts structured preliminary candidate assessments, and scores competency rubrics.",
        skills: ["Resume Parsing", "Competency Scoring", "Structured Screening", "Candidate Shortlisting"],
      },
      {
        id: "rec-sourcer",
        name: "Kai",
        role: "Talent Sourcer",
        avatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=256&h=256&fit=crop&crop=faces&q=80",
        badge: "Passive Talent Sourcing",
        description: "Hunts top passive engineering and leadership talent across GitHub, LinkedIn, and developer communities with personalized outreach.",
        skills: ["Boolean Search Strings", "Competitor Team Mapping", "Personalized Outreach", "Talent Pooling"],
      },
      {
        id: "rec-coordinator",
        name: "Jessica",
        role: "Recruitment Coordinator",
        avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=256&h=256&fit=crop&crop=faces&q=80",
        badge: "Interview Logistics",
        description: "Schedules panel interviews across international timezones, prepares candidate briefings, and collects evaluator scorecards.",
        skills: ["Panel Scheduling", "Candidate Prep Briefs", "Scorecard Aggregation", "Logistics Coordination"],
      },
    ],
    capabilities: [
      { title: "Sourcing", copy: "Roles go out. Profiles come back ranked against the brief.", image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&auto=format&fit=crop&q=80", snippet: [{ title: "Design", line: "8 profiles ranked", time: "11m" }, { title: "Brief", line: "Match against v2 role", time: "28m" }] },
      { title: "Screening", copy: "Structured questions, scorecards, and a paper trail for every no.", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&auto=format&fit=crop&q=80", snippet: [{ title: "Amara K.", line: "Scorecard 94%", time: "6m" }, { title: "No", line: "Trail saved for audit", time: "33m" }] },
      { title: "Hiring", copy: "Interviews booked, offers drafted, and the hiring manager stays in the loop.", image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&auto=format&fit=crop&q=80", snippet: [{ title: "Onsite", line: "Thursday hold confirmed", time: "14m" }, { title: "Offer", line: "Draft with People", time: "1h" }] },
    ],
    activity: [
      { title: "Sourcing", line: "8 designers added to shortlist", time: "11m" },
      { title: "Screen", line: "Amara K. scored 94%", time: "28m" },
      { title: "Schedule", line: "Onsite set for Thursday", time: "1h" },
    ],
    quote: { text: "Screening used to eat two days. We meet people who already fit.", author: "Aisha Bello", role: "HR Director, PayFlow" },
  },
  {
    slug: "hr",
    name: "HR",
    line: "Onboarding, policy, reviews",
    headline: "People ops without the scavenger hunt.",
    lede: "Onboarding, policy, and reviews in one record — from offer signed to first review.",
    hero: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1800&auto=format&fit=crop&q=80",
    heroAlt: "Team in an HR onboarding session",
    markets: "Same process, every office",
    metrics: [
      { value: "Day 1", label: "Access ready" },
      { value: "100%", label: "Policy ack" },
      { value: "1", label: "Record / person" },
    ],
    employees: [
      {
        id: "hr-manager",
        name: "Victoria",
        role: "HR Manager",
        isManager: true,
        avatar: "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?w=256&h=256&fit=crop&crop=faces&q=80",
        badge: "Department Lead",
        description: "Leads people operations governance, HR compliance, workplace policy updates, and company-wide performance review cadences.",
        skills: ["HR Governance", "Policy Enforcement", "Performance Review Design", "Labor Compliance"],
      },
      {
        id: "hr-assistant",
        name: "Daniel",
        role: "HR Assistant",
        avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=256&h=256&fit=crop&crop=faces&q=80",
        badge: "People Support",
        description: "Answers employee administrative inquiries, issues employment verification letters, manages leave balances, and updates personnel files.",
        skills: ["PTO Management", "Employment Verification", "Employee Inquiries", "Records Maintenance"],
      },
      {
        id: "hr-peopleops",
        name: "Priya",
        role: "People Operations Manager",
        avatar: "https://images.unsplash.com/photo-1548142813-c348350df52b?w=256&h=256&fit=crop&crop=faces&q=80",
        badge: "Onboarding & Lifecycle",
        description: "Executes seamless new hire onboarding, workstation setups, 30-60-90 check-ins, buddy assignments, and team offboarding.",
        skills: ["New Hire Onboarding", "Hardware & Access Provisioning", "30-60-90 Reviews", "Lifecycle Workflows"],
      },
      {
        id: "hr-experience",
        name: "Hannah",
        role: "Employee Experience Manager",
        avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=256&h=256&fit=crop&crop=faces&q=80",
        badge: "Culture & Benefits",
        description: "Tracks team pulse survey sentiment, administers health and wellness perks, and coordinates team connection initiatives.",
        skills: ["Pulse Surveys", "Benefits Guidance", "Team Engagement", "Culture Programs"],
      },
    ],
    capabilities: [
      { title: "Onboarding", copy: "Equipment, access, and a first-week plan that doesn’t live in five inboxes.", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&auto=format&fit=crop&q=80", snippet: [{ title: "Maya Chen", line: "Offer signed · kit ordered", time: "12m" }, { title: "Access", line: "Day-1 plan ready", time: "40m" }] },
      { title: "Policy", copy: "The current version, acknowledged, with a date. Not a PDF in Drive.", image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&auto=format&fit=crop&q=80", snippet: [{ title: "Handbook", line: "v4 acknowledged", time: "40m" }, { title: "Date", line: "Current version only", time: "1h" }] },
      { title: "Reviews", copy: "Cycles that start on time, with notes that hiring already has.", image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&auto=format&fit=crop&q=80", snippet: [{ title: "Q2", line: "Cycle opened on time", time: "2h" }, { title: "Notes", line: "Hiring record attached", time: "2h" }] },
    ],
    activity: [
      { title: "Maya Chen", line: "Offer signed · kit ordered", time: "12m" },
      { title: "Policy", line: "Handbook v4 acknowledged", time: "40m" },
      { title: "Reviews", line: "Q2 cycle opened", time: "2h" },
    ],
    quote: { text: "New hires used to ping five people. Now day one is actually day one.", author: "Sofia Berg", role: "People Lead, Voke" },
  },
  {
    slug: "operations",
    name: "Operations",
    line: "Projects, docs, workflows",
    headline: "Work you can see — and finish.",
    lede: "Projects, documents, and handoffs with owners and due dates. Not a thread that goes quiet.",
    hero: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1800&auto=format&fit=crop&q=80",
    heroAlt: "Operations planning session",
    markets: "One OS for every office",
    metrics: [
      { value: "18", label: "Live workflows" },
      { value: "0", label: "Orphan tasks" },
      { value: "Fri", label: "Weekly close" },
    ],
    employees: [
      {
        id: "ops-manager",
        name: "Robert",
        role: "Operations Manager",
        isManager: true,
        avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=256&h=256&fit=crop&crop=faces&q=80",
        badge: "Department Lead",
        description: "Maintains business operational health, oversees company SLA benchmarks, identifies cross-team bottlenecks, and runs weekly operational closes.",
        skills: ["Operational Governance", "Cross-team Auditing", "Bottleneck Removal", "SLA Monitoring"],
      },
      {
        id: "ops-coordinator",
        name: "Sam",
        role: "Project Coordinator",
        avatar: "https://images.unsplash.com/photo-1545167622-3a6ac756afa4?w=256&h=256&fit=crop&crop=faces&q=80",
        badge: "Project Delivery",
        description: "Tracks project milestones across departments, monitors deliverables, flags overdue dependencies, and keeps stakeholders aligned.",
        skills: ["Milestone Tracking", "Cross-team Dependencies", "Deadline Reminders", "Delivery Checklists"],
      },
      {
        id: "ops-workflow",
        name: "Adam",
        role: "Workflow Manager",
        avatar: "https://images.unsplash.com/photo-1528892952291-009c663ce843?w=256&h=256&fit=crop&crop=faces&q=80",
        badge: "Automation Engineering",
        description: "Designs automated webhook pipes, multi-step Zapier/Make automations, error auto-retries, and synchronized data handoffs.",
        skills: ["Webhook Bridges", "Automation Workflows", "API Rate Limiting", "Payload Transformation"],
      },
      {
        id: "ops-documentation",
        name: "Natalie",
        role: "Documentation Manager",
        avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=256&h=256&fit=crop&crop=faces&q=80",
        badge: "Knowledge & SOPs",
        description: "Standardizes operating procedures (SOPs), maintains company wikis, authors process diagrams, and archives obsolete documentation.",
        skills: ["SOP Playbook Authoring", "Knowledge Base Indexing", "Process Flowcharts", "Policy Auditing"],
      },
    ],
    capabilities: [
      { title: "Projects", copy: "Milestones, owners, and a status that isn’t “checking.”", image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&auto=format&fit=crop&q=80", snippet: [{ title: "Lagos", line: "Rollout marked Done", time: "2h" }, { title: "Owner", line: "Nora · Friday close", time: "6m" }] },
      { title: "Docs", copy: "The latest version lives here. Approvals leave a name and a time.", image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&auto=format&fit=crop&q=80", snippet: [{ title: "Q3 pack", line: "Approved · Nora Ade", time: "33m" }, { title: "v4", line: "Latest lives here", time: "1h" }] },
      { title: "Workflows", copy: "Intake → review → done. Visible on one board across teams.", image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&auto=format&fit=crop&q=80", snippet: [{ title: "Vendor", line: "Onboarding in Review", time: "6m" }, { title: "Board", line: "18 live across offices", time: "40m" }] },
    ],
    activity: [
      { title: "Vendor", line: "Onboarding in Review", time: "6m" },
      { title: "Docs", line: "Q3 ops pack approved", time: "33m" },
      { title: "Project", line: "Lagos rollout marked Done", time: "2h" },
    ],
    quote: { text: "We stopped asking “who owns this?” The board already knows.", author: "Nora Ade", role: "COO, 10MG" },
  },
  {
    slug: "finance",
    name: "Finance",
    line: "Invoices, expenses, payroll",
    headline: "Books that don’t wait until Friday.",
    lede: "Invoices go out, expenses get coded, payroll stays on time — without a month-end scramble.",
    hero: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1800&auto=format&fit=crop&q=80",
    heroAlt: "Finance work on invoices",
    markets: "Multi-currency by default",
    metrics: [
      { value: "$18.4k", label: "Collected" },
      { value: "3", label: "Currencies" },
      { value: "Day 1", label: "Close ready" },
    ],
    employees: [
      {
        id: "fin-manager",
        name: "Arthur",
        role: "Finance Manager",
        isManager: true,
        avatar: "https://images.unsplash.com/photo-1507152832244-10d45c7eda57?w=256&h=256&fit=crop&crop=faces&q=80",
        badge: "Department Lead",
        description: "Monitors company capital runway, forecasts quarterly net burn, audits multi-currency ledger hygiene, and presents fiscal summaries.",
        skills: ["Runway Forecasting", "Ledger Governance", "Burn Analysis", "Fiscal Audits"],
      },
      {
        id: "fin-accounts",
        name: "Evan",
        role: "Accounts Manager",
        avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=256&h=256&fit=crop&crop=faces&q=80",
        badge: "General Ledger",
        description: "Reconciles daily bank payouts with Stripe transactions, classifies chart-of-account debits, and prepares clean balance sheets.",
        skills: ["Bank Reconciliation", "Chart of Accounts", "Ledger Classification", "Balance Sheets"],
      },
      {
        id: "fin-invoicing",
        name: "Oscar",
        role: "Invoicing Manager",
        avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=256&h=256&fit=crop&crop=faces&q=80",
        badge: "Billing & AR",
        description: "Generates corporate invoices, runs automated payment reminders, manages customer billing queries, and tracks overdue receivables.",
        skills: ["Invoice Generation", "Automated Dunning", "Accounts Receivable", "Payment Retries"],
      },
      {
        id: "fin-expense",
        name: "Grace",
        role: "Expense Manager",
        avatar: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=256&h=256&fit=crop&crop=faces&q=80",
        badge: "Expense Oversight",
        description: "Extracts receipt data with OCR, enforces company meal and travel caps, flags policy anomalies, and batches employee reimbursements.",
        skills: ["Receipt OCR Validation", "Spend Policy Auditing", "Reimbursement Batches", "Per Diem Enforcement"],
      },
    ],
    capabilities: [
      { title: "Invoices", copy: "Send, chase, and mark paid. The ledger matches the bank.", image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=1200&auto=format&fit=crop&q=80", snippet: [{ title: "Northwind", line: "Invoice $4,200 paid", time: "8m" }, { title: "Brightline", line: "$1,850 due · chased", time: "27m" }] },
      { title: "Expenses", copy: "Receipts coded as they land. Policy applied before the card statement.", image: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=1200&auto=format&fit=crop&q=80", snippet: [{ title: "Receipts", line: "12 coded to policy", time: "27m" }, { title: "Card", line: "Statement matches ledger", time: "1h" }] },
      { title: "Payroll", copy: "Runs, exceptions, and a file finance and HR both trust.", image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=1200&auto=format&fit=crop&q=80", snippet: [{ title: "March", line: "File ready for review", time: "3h" }, { title: "Exception", line: "2 holds flagged", time: "3h" }] },
    ],
    activity: [
      { title: "Northwind", line: "Invoice $4,200 paid", time: "8m" },
      { title: "Expenses", line: "12 receipts coded", time: "27m" },
      { title: "Payroll", line: "March file ready for review", time: "3h" },
    ],
    quote: { text: "Month-end used to be a war. Now it’s a check, not a reconstruction.", author: "Elena Ruiz", role: "CFO, Helix" },
  },
]

export function getDepartment(slug: string) {
  return departments.find((d) => d.slug === slug)
}
