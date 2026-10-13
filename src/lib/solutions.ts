export type Solution = {
  slug: string
  name: string
  kind: "size" | "industry"
  line: string
  headline: string
  lede: string
  story: string
  hero: string
  heroAlt: string
  markets: string
  cities: string[]
  audience: string[]
  metrics: { value: string; label: string }[]
  capabilities: {
    title: string
    copy: string
    image: string
  }[]
  plays: { title: string; copy: string }[]
  steps: { n: string; title: string; copy: string }[]
  desks: string[]
  quote: { text: string; author: string; role: string }
  faqs: { q: string; a: string }[]
  plan: { label: string; href: string; note: string }
}

export const solutions: Solution[] = [
  {
    slug: "startup",
    name: "Startup",
    kind: "size",
    line: "Small team. Full company.",
    headline: "A company before you can hire one.",
    lede: "Three people shouldn’t wait on a 40-person org chart. Turn on Marketing today — ship like a team that’s already there.",
    story:
      "The first ten people are in the product. They are not a CMO, a receptionist, and a bookkeeper. Fless covers the work that usually waits for a round: the launch calendar, marketing, and upcoming desks. Same product you’ll still run when the office exists. Built for teams across Africa, Europe, the Middle East and North America.",
    hero: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1800&auto=format&fit=crop&q=80",
    heroAlt: "Early-stage team working around laptops",
    markets: "Built for teams across Africa, Europe, the Middle East and North America",
    cities: ["Lagos", "Nairobi", "Berlin", "Austin"],
    audience: ["Founders", "Pre-seed to Series A", "Remote-first teams"],
    metrics: [
      { value: "18", label: "Businesses in pilot" },
      { value: "Marketing", label: "Live today" },
      { value: "Pro-rata", label: "Unused tenure refund" },
    ],
    capabilities: [
      { title: "Ship the story", copy: "Site, social, and a launch calendar without a content hire. Briefs become posts in the markets you actually sell.", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&auto=format&fit=crop&q=80" },
      { title: "Talk to users", copy: "Support and follow-up capabilities planned alongside your workflow.", image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&auto=format&fit=crop&q=80" },
      { title: "Keep the books", copy: "Financial and administrative operations scheduled on the roadmap.", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&auto=format&fit=crop&q=80" },
    ],
    plays: [
      { title: "Launch week", copy: "Waitlist, social, and landing copy from one brief with approval before anything publishes." },
      { title: "First customers", copy: "Consistent brand messaging across LinkedIn, X, Facebook, Instagram, Threads and Bluesky." },
      { title: "Support readiness", copy: "Documented knowledge base preparation for upcoming support desks." },
      { title: "Global operations", copy: "Invoiced in USD with local currency display for clarity." },
    ],
    steps: [
      { n: "01", title: "Tell us the company", copy: "Market, brand voice, and the channels that matter this quarter." },
      { n: "02", title: "Turn on Marketing", copy: "The Fless Marketing Employee coordinates content, SEO, and social." },
      { n: "03", title: "Ship in the first week", copy: "First drafts in your first week. You review and approve before publishing." },
    ],
    desks: ["marketing", "sales", "support", "finance"],
    quote: {
      text: "In pilot with 18 businesses. Founders, agencies and lean teams are running the Fless Marketing Employee today. Customer stories Launching Soon.",
      author: "Fless Pilot Program",
      role: "18 businesses active",
    },
    faqs: [
      {
        q: "Can we start with one department?",
        a: "Yes. Most teams start with Marketing, which is live today.",
      },
      {
        q: "Does it work outside the US?",
        a: "Yes. Fless is built for teams across Africa, Europe, the Middle East and North America, with local currency display.",
      },
      {
        q: "What if we raise and hire?",
        a: "Keep your AI employees, reduce their hours, or end their tenure. Unused prepaid tenure is refunded pro-rata.",
      },
    ],
    plan: {
      label: "Get started",
      href: "/start",
      note: "Priced per AI employee. See live prices on the pricing page.",
    },
  },
  {
    slug: "smb",
    name: "SMB",
    kind: "size",
    line: "Growing without a second floor of hires.",
    headline: "The middle years, without the middle bloat.",
    lede: "You’ve reached product-market fit. Fless staffs the desks that usually wait for headcount.",
    story:
      "Twenty to eighty people. Multiple markets. The work that stalls is marketing consistency, follow-up, and ops — not the core product. Fless coordinates marketing and upcoming desks so you can scale across regions without opening a second floor of managers.",
    hero: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1800&auto=format&fit=crop&q=80",
    heroAlt: "Growing company office",
    markets: "Built for teams across Africa, Europe, the Middle East and North America",
    cities: ["London", "Dubai", "Accra", "Toronto"],
    audience: ["Operators", "20–150 people", "Second and third markets"],
    metrics: [
      { value: "18", label: "Businesses in pilot" },
      { value: "8", label: "Departments on roadmap" },
      { value: "1", label: "Workspace" },
    ],
    capabilities: [
      { title: "Marketing execution", copy: "Multi-channel publishing across LinkedIn, X, Facebook, Instagram, Threads and Bluesky with brand memory.", image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&auto=format&fit=crop&q=80" },
      { title: "Team alignment", copy: "Keep stakeholders updated on content schedules and performance metrics.", image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80" },
      { title: "Multi-market presence", copy: "One workspace coordinates local copy and regional calendars without separate tools.", image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&auto=format&fit=crop&q=80" },
    ],
    plays: [
      { title: "Marketing cadence", copy: "Social, SEO, and content that ships consistently every week." },
      { title: "Brand memory", copy: "Your edits teach the model your voice so revisions decrease over time." },
      { title: "Approval gates", copy: "Nothing publishes without human approval and an audit trail." },
      { title: "Regional rollouts", copy: "Coordinate multiple brands or regions in one workspace." },
    ],
    steps: [
      { n: "01", title: "Connect brand profiles", copy: "Connect LinkedIn, X, Facebook, Instagram, Threads or Bluesky via official APIs." },
      { n: "02", title: "Set review rules", copy: "Define who approves posts before they go live." },
      { n: "03", title: "Run the calendar", copy: "Briefs become scheduled campaigns. First drafts in your first week." },
    ],
    desks: ["marketing", "sales", "operations", "recruitment"],
    quote: {
      text: "In pilot with 18 businesses. Founders, agencies and lean teams are running the Fless Marketing Employee today. Customer stories Launching Soon.",
      author: "Fless Pilot Program",
      role: "18 businesses active",
    },
    faqs: [
      {
        q: "How is this different from Startup?",
        a: "Same product. SMB setups usually run several brands, markets or teams in one workspace.",
      },
      {
        q: "Can each city have its own workspace?",
        a: "Yes.",
      },
      {
        q: "Do we replace our CRM?",
        a: "No. Fless works alongside it.",
      },
    ],
    plan: {
      label: "Get started",
      href: "/start",
      note: "Reference pricing on our pricing page. Early-access rates confirmed at onboarding.",
    },
  },
  {
    slug: "enterprise",
    name: "Enterprise",
    kind: "size",
    line: "Controls, regions, and private rollout.",
    headline: "Procurement-ready AI employees.",
    lede: "Enterprise security, audit trails, and private deployment options by agreement.",
    story:
      "Enterprise software requires least-privilege access, audit trails, and data isolation. Fless does not train shared models on your content, and our model providers are contractually barred from training on it. DPA and subprocessor list available on request.",
    hero: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1800&auto=format&fit=crop&q=80",
    heroAlt: "Corporate tower built for procurement",
    markets: "Built for teams across Africa, Europe, the Middle East and North America",
    cities: ["London", "New York", "Frankfurt", "Dubai"],
    audience: ["CIOs", "Security teams", "Regulated enterprises"],
    metrics: [
      { value: "DPA", label: "Available on request" },
      { value: "SSO", label: "Enterprise agreements" },
      { value: "Private", label: "Deployment option" },
    ],
    capabilities: [
      { title: "Security and isolation", copy: "Logical workspace isolation, AES-256 encryption at rest, TLS in transit, and exportable audit logs.", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&auto=format&fit=crop&q=80" },
      { title: "Governance gates", copy: "High-impact actions wait for a named approver. Reversible actions with documented logs.", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&auto=format&fit=crop&q=80" },
      { title: "Named rollout", copy: "A named Fless contact works directly with your team throughout rollout and integration.", image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&auto=format&fit=crop&q=80" },
    ],
    plays: [
      { title: "Security review", copy: "Security questionnaire and subprocessor list provided under NDA." },
      { title: "SSO mapping", copy: "Identity provider configuration on enterprise agreements." },
      { title: "Audit exports", copy: "Exportable activity logs for compliance and internal audits." },
      { title: "Data processing", copy: "DPA and standard contractual clauses available on request." },
    ],
    steps: [
      { n: "01", title: "Security review", copy: "DPA and security documentation provided on request." },
      { n: "02", title: "Scoped pilot", copy: "Deploy Marketing with team approval gates and audit logs." },
      { n: "03", title: "Expansion", copy: "Onboard additional departments as early-access seats open." },
    ],
    desks: ["marketing", "operations", "finance", "hr"],
    quote: {
      text: "In pilot with 18 businesses. Founders, agencies and lean teams are running the Fless Marketing Employee today. Customer stories Launching Soon.",
      author: "Fless Pilot Program",
      role: "18 businesses active",
    },
    faqs: [
      {
        q: "Can we run in our own cloud?",
        a: "Private deployment is available by agreement. Talk to us.",
      },
      {
        q: "Is our data used to train models?",
        a: "No. We don't train shared models on your content, and our model providers are contractually barred from training on it.",
      },
      {
        q: "Who owns rollout?",
        a: "A named Fless contact works with your team through rollout.",
      },
    ],
    plan: {
      label: "Talk to us",
      href: "/contact#enterprise",
      note: "Named rollout · private deployment on request",
    },
  },
  {
    slug: "agency",
    name: "Agency",
    kind: "size",
    line: "Client retainers without hiring a second floor.",
    headline: "Scale client retainers with isolated desks.",
    lede: "Serve client accounts with dedicated brand memory, calendars, and approval workflows in separate workspaces.",
    story:
      "Agencies juggle distinct client voices, approvals, and reporting. Fless provides separate workspaces for each client so brand memory, calendars, and credentials remain strictly segregated.",
    hero: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1800&auto=format&fit=crop&q=80",
    heroAlt: "Creative agency team collaborating",
    markets: "Built for teams across Africa, Europe, the Middle East and North America",
    cities: ["London", "Lagos", "Berlin", "Dubai"],
    audience: ["Digital agencies", "Marketing firms", "Growth studios"],
    metrics: [
      { value: "Separate", label: "Client workspaces" },
      { value: "Brand", label: "Isolated memory" },
      { value: "Audit", label: "Per-client logs" },
    ],
    capabilities: [
      { title: "Isolated workspaces", copy: "Each client retainer gets its own workspace, voice profile, and connected social accounts.", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&auto=format&fit=crop&q=80" },
      { title: "Client approval flow", copy: "Drafts wait for your team or the client to sign off before anything publishes.", image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&auto=format&fit=crop&q=80" },
      { title: "Multi-channel delivery", copy: "Schedule across LinkedIn, X, Facebook, Instagram, Threads and Bluesky from unified campaign briefs.", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80" },
    ],
    plays: [
      { title: "New client intake", copy: "Create a dedicated workspace with its own brand voice and guidelines." },
      { title: "Campaign sprints", copy: "Turn briefs into multi-channel calendars in minutes, not days." },
      { title: "Client review", copy: "Share preview links so clients approve copy before publication." },
      { title: "Performance review", copy: "Export activity and campaign logs for client reporting." },
    ],
    steps: [
      { n: "01", title: "Set up client workspace", copy: "Add brand voice guidelines and connect client social channels." },
      { n: "02", title: "Draft campaign", copy: "Fless Marketing Employee drafts posts, SEO copy, and social assets." },
      { n: "03", title: "Client approval", copy: "Client approves drafts; posts publish automatically on schedule." },
    ],
    desks: ["marketing", "support", "operations"],
    quote: {
      text: "In pilot with 18 businesses. Founders, agencies and lean teams are running the Fless Marketing Employee today. Customer stories Launching Soon.",
      author: "Fless Pilot Program",
      role: "18 businesses active",
    },
    faqs: [
      {
        q: "How do we keep clients separate?",
        a: "Each client gets its own workspace with its own brand memory, calendar and access.",
      },
      {
        q: "Can we white-label voice?",
        a: "Not yet. White-labelling is on the roadmap.",
      },
      {
        q: "What plan fits ten retainers?",
        a: "Pricing is per AI employee. Talk to us about multi-client setups.",
      },
    ],
    plan: {
      label: "Get started",
      href: "/start",
      note: "Pricing is per AI employee. Talk to us about multi-client setups.",
    },
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    kind: "industry",
    line: "Front-desk and administrative support for clinics.",
    headline: "Front-desk workflows for clinics and practices.",
    lede: "Healthcare playbooks run on Voice and Support, which are in early access. Join the waitlist.",
    story:
      "Clinics and practices need front-desk coverage for routine appointment questions and administrative tasks. Fless handles administrative operations, not medical advice or diagnoses. Aligned with NDPR and GDPR; DPA available on request.",
    hero: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1800&auto=format&fit=crop&q=80",
    heroAlt: "Clinic reception and healthcare setting",
    markets: "Built for teams across Africa, Europe, the Middle East and North America",
    cities: ["Lagos", "London", "Nairobi", "Dubai"],
    audience: ["Clinics", "Dental practices", "Specialist centers"],
    metrics: [
      { value: "Voice & Support", label: "Early access" },
      { value: "Marketing", label: "Live today" },
      { value: "DPA", label: "On request" },
    ],
    capabilities: [
      { title: "Administrative front desk", copy: "Designed to answer general practice inquiries and route calls with structured notes.", image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=1200&auto=format&fit=crop&q=80" },
      { title: "Booking coordination", copy: "Helps coordinate calendar holds and reminders according to clinic hours.", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop&q=80" },
      { title: "Practice marketing", copy: "Keep practice announcements, educational articles, and social updates active.", image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1200&auto=format&fit=crop&q=80" },
    ],
    plays: [
      { title: "After-hours inquiries", copy: "General questions answered with escalation to clinical staff." },
      { title: "Practice communications", copy: "Approved clinic updates published to social channels." },
      { title: "Calendar holds", copy: "Consultation slots held according to site-specific hours." },
      { title: "Escalation rules", copy: "Inquiries requiring medical triage escalated immediately to staff." },
    ],
    steps: [
      { n: "01", title: "Join waitlist", copy: "Register for early access to healthcare telephony and support playbooks." },
      { n: "02", title: "Sign DPA", copy: "Establish data processing terms before connecting practice systems." },
      { n: "03", title: "Onboard desk", copy: "Configure escalation rules, site hours, and practice guidelines." },
    ],
    desks: ["voice", "support", "marketing"],
    quote: {
      text: "In pilot with 18 businesses. Founders, agencies and lean teams are running the Fless Marketing Employee today. Customer stories Launching Soon.",
      author: "Fless Pilot Program",
      role: "18 businesses active",
    },
    faqs: [
      {
        q: "Is this a medical device?",
        a: "No. Fless handles front-desk and administrative work. It does not give medical advice or diagnoses.",
      },
      {
        q: "Can it respect clinic hours per site?",
        a: "Yes. Each site has its own hours and escalation contacts.",
      },
      {
        q: "What about privacy?",
        a: "Fless is aligned with NDPR and GDPR. Do not send protected health information to Fless without a signed data processing agreement.",
      },
    ],
    plan: {
      label: "Join the healthcare waitlist",
      href: "/start?industry=healthcare",
      note: "Healthcare playbooks run on Voice and Support, which are in early access.",
    },
  },
  {
    slug: "education",
    name: "Education",
    kind: "industry",
    line: "Admissions, student communications, and academy ops.",
    headline: "Admissions and academy operations.",
    lede: "Coordinate prospective student inquiries, academy social channels, and enrollment communications.",
    story:
      "Academies and educational institutions manage high volumes of repetitive inquiries during enrollment cycles. Fless Marketing is live today for academy content and announcements; admissions and support desks are in early access.",
    hero: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1800&auto=format&fit=crop&q=80",
    heroAlt: "Students on an academy campus",
    markets: "Built for teams across Africa, Europe, the Middle East and North America",
    cities: ["London", "Lagos", "Toronto", "Nairobi"],
    audience: ["Academies", "Colleges", "EdTech programs"],
    metrics: [
      { value: "Multi-campus", label: "Campus support" },
      { value: "Admissions", label: "Early access" },
      { value: "Marketing", label: "Live today" },
    ],
    capabilities: [
      { title: "Academy marketing", copy: "Course announcements, student spotlights, and enrollment deadlines published on schedule.", image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&auto=format&fit=crop&q=80" },
      { title: "Inquiry triage", copy: "Designed to answer common prospectus, fee schedule, and calendar questions.", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=80" },
      { title: "Campus coordination", copy: "Manage announcements across multiple campuses and program tracks.", image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&auto=format&fit=crop&q=80" },
    ],
    plays: [
      { title: "Enrollment campaigns", copy: "Multi-channel recruitment drives across LinkedIn, X, Facebook, Instagram, Threads and Bluesky." },
      { title: "Admissions information", copy: "Answering prospective student questions from published course handbooks." },
      { title: "Term dates and events", copy: "Reminders and calendar notices for open days and application deadlines." },
      { title: "Multi-campus updates", copy: "Campus-specific announcements managed in separate channels." },
    ],
    steps: [
      { n: "01", title: "Deploy Marketing", copy: "Fill your academy content calendar with course updates and news." },
      { n: "02", title: "Join Admissions waitlist", copy: "Reserve early access for prospective student inquiry desks." },
      { n: "03", title: "Scale enrollment", copy: "Coordinate open day promotions and student communications." },
    ],
    desks: ["marketing", "support", "voice"],
    quote: {
      text: "In pilot with 18 businesses. Founders, agencies and lean teams are running the Fless Marketing Employee today. Customer stories Launching Soon.",
      author: "Fless Pilot Program",
      role: "18 businesses active",
    },
    faqs: [
      {
        q: "Does this replace the SIS?",
        a: "No. It works alongside your student information system.",
      },
      {
        q: "Does it support multiple campuses?",
        a: "Yes.",
      },
      {
        q: "Does it support multiple languages?",
        a: "English at launch; more languages during early access.",
      },
    ],
    plan: {
      label: "Get started",
      href: "/start?industry=education",
      note: "Reference pricing on our pricing page. Early-access rates confirmed at onboarding.",
    },
  },
  {
    slug: "retail",
    name: "Retail & E-commerce",
    kind: "industry",
    line: "Catalog marketing, promotions, and brand presence.",
    headline: "Keep stores and e-commerce active.",
    lede: "Product launches, promotional calendars, and social campaigns that keep your brand top of mind.",
    story:
      "Retail brands need continuous creative output, seasonal campaigns, and cross-channel promotion. Fless Marketing plans and publishes product content while support and voice desks are being introduced.",
    hero: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1800&auto=format&fit=crop&q=80",
    heroAlt: "Modern retail storefront",
    markets: "Built for teams across Africa, Europe, the Middle East and North America",
    cities: ["London", "Lagos", "Dubai", "New York"],
    audience: ["Online stores", "Retail brands", "D2C founders"],
    metrics: [
      { value: "Omnichannel", label: "Social & store" },
      { value: "Peak", label: "Scale hours by day" },
      { value: "Marketing", label: "Live today" },
    ],
    capabilities: [
      { title: "Product promotions", copy: "Launch new collections, drop announcements, and seasonal discount campaigns.", image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&auto=format&fit=crop&q=80" },
      { title: "Brand consistency", copy: "Maintains voice and aesthetic across LinkedIn, X, Facebook, Instagram, Threads and Bluesky.", image: "https://images.unsplash.com/photo-1555421689-491a97ff2040?w=1200&auto=format&fit=crop&q=80" },
      { title: "Customer support readiness", copy: "Knowledge base preparation for order status and store policy inquiries.", image: "https://images.unsplash.com/photo-1556742049-0a67c5574f73?w=1200&auto=format&fit=crop&q=80" },
    ],
    plays: [
      { title: "Product drop", copy: "Social assets, email copy, and landing headlines prepared together." },
      { title: "Seasonal campaigns", copy: "Holiday schedules and promotional calendars prepared in advance." },
      { title: "Multi-brand retail", copy: "Manage separate product lines in isolated workspaces." },
      { title: "Peak capacity", copy: "Increase employee tenure hours during holiday surges." },
    ],
    steps: [
      { n: "01", title: "Connect brand channels", copy: "Connect official social accounts by signing in to each platform." },
      { n: "02", title: "Review drafts", copy: "Approve product copy and campaign schedules in your workspace." },
      { n: "03", title: "Scale during peak", copy: "Increase tenure capacity by the day or week as volume grows." },
    ],
    desks: ["marketing", "support", "voice"],
    quote: {
      text: "In pilot with 18 businesses. Founders, agencies and lean teams are running the Fless Marketing Employee today. Customer stories Launching Soon.",
      author: "Fless Pilot Program",
      role: "18 businesses active",
    },
    faqs: [
      {
        q: "Does it replace Shopify or the POS?",
        a: "No. It works alongside your store and POS.",
      },
      {
        q: "Does it support multiple brands?",
        a: "Yes. Each brand has its own voice and calendar.",
      },
      {
        q: "How does it handle peak season?",
        a: "Increase hours for the period you need, by the day or week.",
      },
    ],
    plan: {
      label: "Get started",
      href: "/start?industry=retail",
      note: "Priced per AI employee. See live prices on the pricing page.",
    },
  },
  {
    slug: "finance",
    name: "Finance",
    kind: "industry",
    line: "For banks, fintechs and advisory firms.",
    headline: "Marketing and workflows for financial firms.",
    lede: "For banks, fintechs and advisory firms. Audit trails, approval gates, and multi-entity workspaces.",
    story:
      "Banks, fintechs, and financial advisory practices operate in compliance-sensitive environments where every public message and operational action requires approval. Fless ensures strict approval before publishing and full audit logging.",
    hero: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1800&auto=format&fit=crop&q=80",
    heroAlt: "Financial services advisory meeting",
    markets: "Built for teams across Africa, Europe, the Middle East and North America",
    cities: ["London", "New York", "Lagos", "Dubai"],
    audience: ["Fintechs", "Advisory firms", "Investment practices"],
    metrics: [
      { value: "Audit log", label: "Every action logged" },
      { value: "Multi-entity", label: "Separate workspaces" },
      { value: "SSO", label: "Enterprise agreements" },
    ],
    capabilities: [
      { title: "Compliant content workflow", copy: "Market commentary and announcements held for compliance sign-off before publishing.", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80" },
      { title: "Multi-entity separation", copy: "Maintain distinct workspaces for holding companies, subsidiaries, and advisory entities.", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80" },
      { title: "Exportable audit logs", copy: "Every draft, revision, and approval is logged and exportable for regulatory review.", image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&auto=format&fit=crop&q=80" },
    ],
    plays: [
      { title: "Market insights", copy: "Research and commentary drafted from internal notes, waiting for compliance review." },
      { title: "Product announcements", copy: "Feature releases and regulatory milestones published across official channels." },
      { title: "Multi-entity governance", copy: "Isolated workspaces prevent data overlap across regulated entities." },
      { title: "Audit preparedness", copy: "Immutable history of content creation, reviews, and publishing timestamps." },
    ],
    steps: [
      { n: "01", title: "Set compliance gates", copy: "Define named approvers who must sign off on all outgoing material." },
      { n: "02", title: "Review drafts", copy: "Compliance and marketing leads inspect drafts in the workspace." },
      { n: "03", title: "Publish with audit trail", copy: "Approved posts deploy with exportable verification logs." },
    ],
    desks: ["marketing", "operations", "finance"],
    quote: {
      text: "In pilot with 18 businesses. Founders, agencies and lean teams are running the Fless Marketing Employee today. Customer stories Launching Soon.",
      author: "Fless Pilot Program",
      role: "18 businesses active",
    },
    faqs: [
      {
        q: "Is this the Finance department page?",
        a: "No. This page is for banks, fintechs and advisory firms. The Finance department (invoices, expenses, payroll) has its own page.",
      },
      {
        q: "Can SSO be required?",
        a: "SSO is available on enterprise agreements.",
      },
      {
        q: "Is multi-entity supported?",
        a: "Yes. Each entity can have its own workspace.",
      },
    ],
    plan: {
      label: "Talk to us",
      href: "/contact#enterprise",
      note: "SSO, audit logs, and compliance agreements available",
    },
  },
  {
    slug: "hospitality",
    name: "Hospitality",
    kind: "industry",
    line: "Property reputation, local promotions, and guest updates.",
    headline: "Reputation and communications for hotels and venues.",
    lede: "Keep property channels active, promote local events, and prepare for upcoming guest communication playbooks.",
    story:
      "Hotels, boutique venues, and restaurant groups need active seasonal promotions and reputation management. Fless Marketing is live today to coordinate content; telephony and guest inquiry desks are in early access.",
    hero: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1800&auto=format&fit=crop&q=80",
    heroAlt: "Luxury hotel and hospitality lobby",
    markets: "Built for teams across Africa, Europe, the Middle East and North America",
    cities: ["London", "Dubai", "Cape Town", "Paris"],
    audience: ["Boutique hotels", "Restaurant groups", "Event venues"],
    metrics: [
      { value: "Guest comms", label: "Early access" },
      { value: "Multi-property", label: "Property support" },
      { value: "Marketing", label: "Live today" },
    ],
    capabilities: [
      { title: "Property marketing", copy: "Showcase menus, weekend packages, and seasonal amenities across social channels.", image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&auto=format&fit=crop&q=80" },
      { title: "Multi-property calendars", copy: "Manage distinct promotional calendars for individual hotels or restaurant locations.", image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&auto=format&fit=crop&q=80" },
      { title: "Guest desk readiness", copy: "Playbooks in development for reservation inquiries and concierge FAQs.", image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&auto=format&fit=crop&q=80" },
    ],
    plays: [
      { title: "Seasonal dining menus", copy: "Promote seasonal menu launches and chef specials." },
      { title: "Weekend packages", copy: "Package announcements and local event tie-ins." },
      { title: "Multi-location management", copy: "Separate workspaces for each hotel or venue." },
      { title: "Event announcements", copy: "Private dining and conference space availability updates." },
    ],
    steps: [
      { n: "01", title: "Set up property workspace", copy: "Add photos, brand voice, and connect official social channels." },
      { n: "02", title: "Approve weekly calendar", copy: "Review promotional drafts before they publish." },
      { n: "03", title: "Join guest desk waitlist", copy: "Get onboarded to guest inquiry desks as early access expands." },
    ],
    desks: ["marketing", "voice", "support"],
    quote: {
      text: "In pilot with 18 businesses. Founders, agencies and lean teams are running the Fless Marketing Employee today. Customer stories Launching Soon.",
      author: "Fless Pilot Program",
      role: "18 businesses active",
    },
    faqs: [
      {
        q: "Does it replace the PMS?",
        a: "No. It works alongside your property management system.",
      },
      {
        q: "Does it work for restaurants as well as hotels?",
        a: "Yes.",
      },
      {
        q: "Which languages are supported?",
        a: "English at launch; more languages during early access as we expand.",
      },
    ],
    plan: {
      label: "Get started",
      href: "/start?industry=hospitality",
      note: "Reference pricing on our pricing page. Early-access rates confirmed at onboarding.",
    },
  },
  {
    slug: "professional-services",
    name: "Professional Services",
    kind: "industry",
    line: "Advisory, consulting, and practice management.",
    headline: "Practice marketing and operational workflows.",
    lede: "Keep client-facing publications consistent while managing practice operations.",
    story:
      "Consulting firms and advisory practices rely on reputation, timely client communications, and structured follow-up. Fless Marketing coordinates thought leadership publications while operational desks are being introduced.",
    hero: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1800&auto=format&fit=crop&q=80",
    heroAlt: "Professional services meeting",
    markets: "Built for teams across Africa, Europe, the Middle East and North America",
    cities: ["London", "Lagos", "New York", "Johannesburg"],
    audience: ["Law firms", "Advisory", "Consultancies"],
    metrics: [
      { value: "Thought leadership", label: "Consistent output" },
      { value: "Audit log", label: "Every action logged" },
      { value: "Marketing", label: "Live today" },
    ],
    capabilities: [
      { title: "Thought leadership publishing", copy: "Articles, case studies, and insights published with partner review.", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&auto=format&fit=crop&q=80" },
      { title: "Client communications", copy: "Regular practice announcements and updates across official channels.", image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&auto=format&fit=crop&q=80" },
      { title: "Operational workflows", copy: "Task tracking and delivery checklists on the operational roadmap.", image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&auto=format&fit=crop&q=80" },
    ],
    plays: [
      { title: "Advisory insights", copy: "Structured thought leadership from partner briefs." },
      { title: "Client updates", copy: "Consistent communication between client meetings." },
      { title: "Practice governance", copy: "Named partner approvals before anything is published." },
      { title: "Multi-market presence", copy: "Coordinate across regional practice offices." },
    ],
    steps: [
      { n: "01", title: "Set review process", copy: "Assign partner approvers for public content." },
      { n: "02", title: "Draft publications", copy: "Fless drafts insights and announcements from briefs." },
      { n: "03", title: "Approve and publish", copy: "Partners sign off; content deploys with full audit trails." },
    ],
    desks: ["marketing", "sales", "operations", "finance"],
    quote: {
      text: "In pilot with 18 businesses. Founders, agencies and lean teams are running the Fless Marketing Employee today. Customer stories Launching Soon.",
      author: "Fless Pilot Program",
      role: "18 businesses active",
    },
    faqs: [
      {
        q: "Does this replace the DMS or practice system?",
        a: "No. Fless works alongside your existing document and practice management systems.",
      },
      {
        q: "Confidentiality across clients?",
        a: "Workspaces and named access. We don't train shared models on customer data.",
      },
      {
        q: "Who should own this internally?",
        a: "Managing partner, practice manager, or operations lead. Partners review before publication.",
      },
    ],
    plan: {
      label: "Get started",
      href: "/start",
      note: "Reference pricing on our pricing page. Early-access rates confirmed at onboarding.",
    },
  },
]

export const sizeSolutions = solutions.filter((s) => s.kind === "size")
export const industrySolutions = solutions.filter((s) => s.kind === "industry")

export function getSolution(slug: string) {
  return solutions.find((s) => s.slug === slug)
}
