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
    snippet: { title: string; line: string; time: string }[]
  }[]
  plays: { title: string; copy: string }[]
  steps: { n: string; title: string; copy: string }[]
  desks: string[]
  activity: { title: string; line: string; time: string }[]
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
    lede: "Three people in Lagos or Berlin shouldn’t wait on a 40-person org chart. Turn on marketing, sales, and support — ship like a team that’s already there.",
    story:
      "The first ten people are in the product. They are not a CMO, a receptionist, and a bookkeeper. Fless covers the desks that usually wait for a round: the launch calendar, the inbound line, the invoices. Same product you’ll still run when the office exists. Lagos, Berlin, Austin — one workspace, local hours.",
    hero: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1800&auto=format&fit=crop&q=80",
    heroAlt: "Early-stage team working around laptops",
    markets: "First office · first market",
    cities: ["Lagos", "Nairobi", "Berlin", "Austin"],
    audience: ["Founders", "Pre-seed to Series A", "Remote-first teams"],
    metrics: [
      { value: "2 min", label: "To first task" },
      { value: "3", label: "Desks to start" },
      { value: "$29", label: "From / mo" },
    ],
    capabilities: [
      { title: "Ship the story", copy: "Site, social, and a launch calendar without a content hire. Briefs become posts in the markets you actually sell.", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&auto=format&fit=crop&q=80", snippet: [{ title: "Launch", line: "Waitlist email · 400 opens", time: "6m" }, { title: "Calendar", line: "Week 1 posts queued", time: "22m" }] },
      { title: "Talk to users", copy: "Inbound, support, and follow-up while you’re still in the product. After-hours in Lagos doesn’t mean voicemail.", image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&auto=format&fit=crop&q=80", snippet: [{ title: "Inbox", line: "12 onboarding tickets closed", time: "22m" }, { title: "Voice", line: "After-hours covered", time: "1h" }] },
      { title: "Keep the books", copy: "Invoices and expenses that don’t wait for a Friday founder session. Multi-currency from day one.", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&auto=format&fit=crop&q=80", snippet: [{ title: "Invoice", line: "First customer billed", time: "1h" }, { title: "Expenses", line: "Week coded", time: "2h" }] },
    ],
    plays: [
      { title: "Launch week", copy: "Waitlist, social, and a landing page that stays current while you demo." },
      { title: "First customers", copy: "Inbound qualified, follow-ups sent, the CRM not a spreadsheet." },
      { title: "Support without a queue", copy: "Onboarding tickets closed from the docs you already wrote." },
      { title: "Money in", copy: "The first invoice goes out in the right currency. Expenses coded as they land." },
    ],
    steps: [
      { n: "01", title: "Tell us the company", copy: "Market, tools, and what has to ship this month — not a 40-field form." },
      { n: "02", title: "Turn on three desks", copy: "Marketing, support, and finance is enough to look like a company." },
      { n: "03", title: "Ship in the first week", copy: "You review. It doesn’t wait for you to type." },
    ],
    desks: ["marketing", "sales", "support", "finance"],
    activity: [
      { title: "Launch", line: "Waitlist email sent · 400 opens", time: "6m" },
      { title: "Support", line: "12 onboarding tickets closed", time: "22m" },
      { title: "Invoice", line: "First customer billed", time: "1h" },
    ],
    quote: { text: "We didn’t hire a CMO. The calendar still filled.", author: "Kemi Ade", role: "Founder, Sourzer" },
    faqs: [
      { q: "Can we start with one department?", a: "Yes. Startup includes three desks — turn on what you need this month and add the rest from billing." },
      { q: "Does it work outside the US?", a: "That’s the default. Workspaces run in the hours and currencies you sell in — Lagos to Berlin, not a US-only inbox." },
      { q: "What if we raise and hire?", a: "Keep Fless. Humans take the meetings; the desks keep the calendar, CRM, and books honest." },
    ],
    plan: { label: "Start on Startup", href: "/start?plan=startup", note: "From $29 / mo · 3 departments" },
  },
  {
    slug: "smb",
    name: "SMB",
    kind: "size",
    line: "Growing without a second floor of hires.",
    headline: "The middle years, without the middle bloat.",
    lede: "You’ve product-market fit. You don’t have a department for every gap. Fless staffs the desks that usually wait 18 months for headcount.",
    story:
      "Twenty to eighty people. Two cities. A spreadsheet that used to be the CRM. The work that stalls is follow-up, ops, and people — not the product. Fless puts sales, operations, recruiting, and HR on one record so you can open London or Dubai without opening a second floor of managers.",
    hero: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1800&auto=format&fit=crop&q=80",
    heroAlt: "Growing company office",
    markets: "Multi-city · one product",
    cities: ["London", "Dubai", "Accra", "Toronto"],
    audience: ["Operators", "20–150 people", "Second and third markets"],
    metrics: [
      { value: "8", label: "Desks available" },
      { value: "3", label: "Workspaces" },
      { value: "1", label: "Login" },
    ],
    capabilities: [
      { title: "Sales that follows up", copy: "CRM hygiene and sequences so deals don’t die in a spreadsheet — in every city you sell.", image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&auto=format&fit=crop&q=80", snippet: [{ title: "Pipeline", line: "14 follow-ups completed", time: "9m" }, { title: "CRM", line: "Stages current", time: "31m" }] },
      { title: "Ops you can see", copy: "Projects and approvals with owners — not a Slack thread that goes quiet at 6pm.", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&auto=format&fit=crop&q=80", snippet: [{ title: "Vendor", line: "Pack in Review", time: "31m" }, { title: "Owner", line: "Marcus · Friday", time: "1h" }] },
      { title: "People on time", copy: "Hiring and onboarding without standing up a full People team in the new office.", image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80", snippet: [{ title: "Offer", line: "Designer pack out", time: "2h" }, { title: "Day 1", line: "Access ready", time: "2h" }] },
    ],
    plays: [
      { title: "Second city", copy: "A workspace for Dubai or Accra that shares the company record — not a new stack." },
      { title: "Pipeline truth", copy: "Stages stay current. Follow-ups run until a human should take the meeting." },
      { title: "Vendor and ops", copy: "Intake → review → done, with a name on every step." },
      { title: "Hire without a People org", copy: "Source, screen, offer, day-one access — the hiring manager stays in the loop." },
    ],
    steps: [
      { n: "01", title: "Map the gaps", copy: "Which desks are already late: sales, ops, hiring, finance." },
      { n: "02", title: "One workspace per entity", copy: "Keep books and brands separate. Share what should be shared." },
      { n: "03", title: "Run the week", copy: "Pipeline, approvals, and people in one morning view." },
    ],
    desks: ["sales", "operations", "recruitment", "hr"],
    activity: [
      { title: "Pipeline", line: "14 follow-ups completed", time: "9m" },
      { title: "Ops", line: "Vendor pack in Review", time: "31m" },
      { title: "People", line: "Offer out for designer", time: "2h" },
    ],
    quote: { text: "We added two cities without adding two offices of managers.", author: "Marcus Chen", role: "COO, PayFlow" },
    faqs: [
      { q: "How is this different from Startup?", a: "More workspaces, all eight departments, and the volume growing companies actually run. Same product." },
      { q: "Can each city have its own workspace?", a: "Yes. Three workspaces on Pro — enough for HQ plus two markets." },
      { q: "Do we replace our CRM?", a: "No. Fless keeps HubSpot or Salesforce current. You don’t maintain a second truth." },
    ],
    plan: { label: "Start on Pro", href: "/start?plan=pro", note: "From $79 / mo · all 8 departments" },
  },
  {
    slug: "enterprise",
    name: "Enterprise",
    kind: "size",
    line: "Regions, reviews, a named team.",
    headline: "Global rollout. Local control.",
    lede: "Procurement, SSO, regions, and a desk in every market — without a two-year transformation programme. Built for how large companies actually buy.",
    story:
      "Legal, security, and a named CSM before the first desk turns on. Fless is bought the way you buy everything else: DPA, subprocessors, audit log, SSO. Then every market you operate runs the same product with local hours — not eight vendors and a transformation slide.",
    hero: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1800&auto=format&fit=crop&q=80",
    heroAlt: "Global headquarters",
    markets: "Every market you operate",
    cities: ["Lagos", "London", "New York", "Dubai", "Singapore"],
    audience: ["CIO / COO", "Procurement", "Regional operators"],
    metrics: [
      { value: "SOC 2", label: "Type II" },
      { value: "SSO", label: "SAML ready" },
      { value: "VPC", label: "On request" },
    ],
    capabilities: [
      { title: "Security pack", copy: "DPA, subprocessors, audit log. Something procurement can actually open — before the pilot.", image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&auto=format&fit=crop&q=80", snippet: [{ title: "SSO", line: "Okta group mapped", time: "14m" }, { title: "Audit", line: "Q2 log exported", time: "3h" }] },
      { title: "Every department", copy: "Marketing through finance on one record — not eight vendors and eight contracts.", image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&auto=format&fit=crop&q=80", snippet: [{ title: "Desks", line: "8 live on one record", time: "1h" }, { title: "EMEA", line: "London workspace live", time: "1h" }] },
      { title: "Named rollout", copy: "A team that sits with yours until the first markets are live. Not a slide and a hope.", image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&auto=format&fit=crop&q=80", snippet: [{ title: "CSM", line: "Named team assigned", time: "2h" }, { title: "Markets", line: "First two live", time: "1d" }] },
    ],
    plays: [
      { title: "Procurement first", copy: "Security pack, DPA, and a trail that survives legal — then the pilot." },
      { title: "Identity you already run", copy: "SSO / SAML, SCIM on request, groups that map to desks." },
      { title: "Region by region", copy: "EMEA live while APAC is still in review. Local control, one record." },
      { title: "Private region", copy: "VPC when compliance requires it. Same product, different boundary." },
    ],
    steps: [
      { n: "01", title: "Security review", copy: "Pack, subprocessors, and a named security contact." },
      { n: "02", title: "Identity and regions", copy: "SSO mapped. First two markets scoped." },
      { n: "03", title: "Desks live", copy: "Rollout team stays until the first week of real work ships." },
    ],
    desks: ["operations", "finance", "hr", "support"],
    activity: [
      { title: "SSO", line: "Okta group mapped", time: "14m" },
      { title: "EMEA", line: "London workspace live", time: "1h" },
      { title: "Audit", line: "Q2 log exported", time: "3h" },
    ],
    quote: { text: "It survived legal. That’s rarer than the demo.", author: "Priya Nair", role: "CIO, Helix" },
    faqs: [
      { q: "Can we run in our own cloud?", a: "Enterprise includes VPC and private-region options when compliance requires it." },
      { q: "Is data used to train models?", a: "No. Your workspace is yours. We don’t train public models on your files." },
      { q: "Who owns rollout?", a: "A named CSM and implementation team until the first markets are live. Not a ticket queue." },
    ],
    plan: { label: "Talk to us", href: "/contact", note: "Custom · named team · private region on request" },
  },
  {
    slug: "agency",
    name: "Agency",
    kind: "size",
    line: "Production across clients. One bench.",
    headline: "A studio that doesn’t sleep between retainers.",
    lede: "Ten clients, three time zones, the same Friday. Staff content, voice, and support per account — without hiring a second floor.",
    story:
      "Retainers don’t pause because the account team is in a pitch. Fless gives each client a room — brand, calendar, voice — and a bench that ships overnight. London Friday, Lagos Saturday, New York still in the afternoon. Nothing leaks across accounts.",
    hero: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1800&auto=format&fit=crop&q=80",
    heroAlt: "Agency studio at work",
    markets: "Client work · every timezone",
    cities: ["London", "New York", "Lagos", "Remote"],
    audience: ["Agencies", "Studios", "Multi-brand teams"],
    metrics: [
      { value: "10", label: "Workspaces" },
      { value: "N", label: "Clients / desk" },
      { value: "Fri", label: "Still ships" },
    ],
    capabilities: [
      { title: "Per-client rooms", copy: "Separate context, brand, and calendar. Nothing leaks across retainers.", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop&q=80", snippet: [{ title: "Client A", line: "Room isolated", time: "3m" }, { title: "Client B", line: "Brand voice loaded", time: "18m" }] },
      { title: "Always-on production", copy: "Posts, ads, and reports while the account team is in a pitch — in the client’s timezone.", image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&auto=format&fit=crop&q=80", snippet: [{ title: "Posts", line: "12 queued overnight", time: "3m" }, { title: "Pitch", line: "Appendix drafted", time: "55m" }] },
      { title: "Front desk for brands", copy: "Voice and support that sound like the client — overnight, not a shared inbox.", image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=1200&auto=format&fit=crop&q=80", snippet: [{ title: "Client B", line: "After-hours calls covered", time: "18m" }, { title: "Tone", line: "House voice matched", time: "40m" }] },
    ],
    plays: [
      { title: "Retainer production", copy: "The calendar stays full when the team is in a new-business week." },
      { title: "Brand voice per room", copy: "Each client’s tone, assets, and approvals — never mixed." },
      { title: "After-hours coverage", copy: "Calls and tickets in the client’s market, billed to the right retainer." },
      { title: "Pitch support", copy: "Appendix, competitive notes, and a leave-behind that didn’t eat Sunday." },
    ],
    steps: [
      { n: "01", title: "Open a room", copy: "Brand, calendar, and who can see what — per client." },
      { n: "02", title: "Staff the bench", copy: "Marketing, voice, support. Same desks, isolated context." },
      { n: "03", title: "Ship across timezones", copy: "Work leaves while the studio sleeps. You review in the morning." },
    ],
    desks: ["marketing", "voice", "support", "sales"],
    activity: [
      { title: "Client A", line: "12 posts queued", time: "3m" },
      { title: "Client B", line: "After-hours calls covered", time: "18m" },
      { title: "Pitch", line: "Deck appendix drafted", time: "55m" },
    ],
    quote: { text: "We stopped staffing nights. The work still left the building.", author: "Elena Costa", role: "MD, AllMoments" },
    faqs: [
      { q: "How do we keep clients separate?", a: "Each client is a workspace. Context, brand, and calendar don’t cross. Access is named." },
      { q: "Can we white-label voice?", a: "Yes. Voice and support run in the client’s name and tone — overnight." },
      { q: "What plan fits ten retainers?", a: "Scale includes ten workspaces. Enterprise if you need more rooms or a named team." },
    ],
    plan: { label: "Start on Scale", href: "/start?plan=scale", note: "From $199 / mo · 10 workspaces" },
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    kind: "industry",
    line: "Clinics, groups, and after-hours.",
    headline: "The phone gets answered. The slot gets filled.",
    lede: "Intake, scheduling, and follow-up without the hold music — for clinics in Lagos, London, and everywhere patients actually call.",
    story:
      "Patients call when the clinic is closed. Groups span cities. The whiteboard is not a diary. Fless staffs voice, the front desk, and follow-up so Thursday 3pm is confirmed, the recall goes out, and billing questions leave a trail you can audit. Built for clinics and groups — not a generic call centre.",
    hero: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1800&auto=format&fit=crop&q=80",
    heroAlt: "Healthcare professionals at a clinic",
    markets: "Clinics · groups · 24/7",
    cities: ["Lagos", "London", "Dubai", "Accra"],
    audience: ["Clinic groups", "Outpatient", "Private practice"],
    metrics: [
      { value: "48s", label: "Avg pickup" },
      { value: "7", label: "Bookings / hour" },
      { value: "HIPAA", label: "Ready workflows" },
    ],
    capabilities: [
      { title: "Voice", copy: "Inbound, outbound, and booking — notes in the record before the call ends.", image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=1200&auto=format&fit=crop&q=80", snippet: [{ title: "Inbound", line: "Thursday 3pm confirmed", time: "Just now" }, { title: "Notes", line: "In the record", time: "12s" }] },
      { title: "Front desk", copy: "Reminders, no-shows, and a calendar that isn’t a whiteboard — across sites.", image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&auto=format&fit=crop&q=80", snippet: [{ title: "Recall", line: "42 reminders sent", time: "20m" }, { title: "Diary", line: "Matches the site", time: "1h" }] },
      { title: "Follow-up", copy: "Results, recalls, and billing questions with a trail you can audit.", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&auto=format&fit=crop&q=80", snippet: [{ title: "Billing", line: "Insurance query resolved", time: "1h" }, { title: "Trail", line: "Audit-ready", time: "1h" }] },
    ],
    plays: [
      { title: "After-hours line", copy: "The clinic closes. Bookings don’t. Confirmations land in the diary." },
      { title: "Multi-site diary", copy: "Lagos and London slots on one calendar patients can actually trust." },
      { title: "Recall campaigns", copy: "Reminders in the right language, with a no-show path." },
      { title: "Billing questions", copy: "Insurance and invoices resolved with a name on the thread." },
    ],
    steps: [
      { n: "01", title: "Connect the diary", copy: "Calendar, sites, and the hours each clinic actually runs." },
      { n: "02", title: "Cover the line", copy: "Voice live. Scripts you can audit. Escalation to a person when needed." },
      { n: "03", title: "Close the loop", copy: "Recalls, results, and billing — one record per patient visit." },
    ],
    desks: ["voice", "support", "operations", "finance"],
    activity: [
      { title: "Inbound", line: "Thursday 3pm confirmed", time: "Just now" },
      { title: "Recall", line: "42 reminders sent", time: "20m" },
      { title: "Billing", line: "Insurance query resolved", time: "1h" },
    ],
    quote: { text: "After-hours used to mean voicemail. Appointments book themselves now.", author: "David Adeyemi", role: "CEO, HealthPlus" },
    faqs: [
      { q: "Is this a medical device?", a: "No. Fless runs intake, scheduling, and admin follow-up. Clinical decisions stay with your team." },
      { q: "Can it respect clinic hours per site?", a: "Yes. Each site has hours, a diary, and an escalation path. After-hours can still book." },
      { q: "What about privacy?", a: "Encryption, access control, and an audit log. Enterprise adds SSO and region options for groups." },
    ],
    plan: { label: "See healthcare on Pro", href: "/start?plan=pro", note: "Voice + support + ops · add finance when billing is in-house" },
  },
  {
    slug: "education",
    name: "Education",
    kind: "industry",
    line: "Admissions, parents, admin.",
    headline: "The inbox that runs a school.",
    lede: "Admissions, parent messages, and the work that piles up between terms — covered without a second admin wing.",
    story:
      "Tours, fees, and the question that used to sit in a shared inbox until Monday. Fless runs admissions, parent comms, and admin for schools, universities, and cohorts — Lagos term dates, London open days, a Dubai campus on the same product. The registrar is looped when a person should be. Everything else gets an answer.",
    hero: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1800&auto=format&fit=crop&q=80",
    heroAlt: "Campus and students",
    markets: "Schools · universities · cohorts",
    cities: ["Lagos", "London", "Nairobi", "Boston"],
    audience: ["Schools", "Universities", "Training cohorts"],
    metrics: [
      { value: "Term", label: "Always on" },
      { value: "1", label: "Inbox" },
      { value: "Day 1", label: "Enrolment pack" },
    ],
    capabilities: [
      { title: "Admissions", copy: "Enquiries, tours, and a pipeline that isn’t a shared spreadsheet.", image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&auto=format&fit=crop&q=80", snippet: [{ title: "Tours", line: "12 slots booked", time: "8m" }, { title: "Pipeline", line: "Not a spreadsheet", time: "26m" }] },
      { title: "Parents", copy: "The question gets an answer. The right person is only looped when needed.", image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1200&auto=format&fit=crop&q=80", snippet: [{ title: "Inbox", line: "Term letter queued", time: "26m" }, { title: "Loop", line: "Registrar only if needed", time: "1h" }] },
      { title: "Admin", copy: "Docs, fees, and onboarding for staff and students in one flow.", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&auto=format&fit=crop&q=80", snippet: [{ title: "Fees", line: "Reminders · 3rd wave", time: "2h" }, { title: "Pack", line: "Day-1 enrolment ready", time: "2h" }] },
    ],
    plays: [
      { title: "Open day", copy: "Tours booked, reminders sent, no-shows chased — without a paper list." },
      { title: "Term comms", copy: "The letter goes out once. Follow-ups don’t wait for the front office." },
      { title: "Fees", copy: "Reminders in waves. Exceptions named. Finance sees the same record." },
      { title: "Enrolment pack", copy: "Day-one docs, access, and who to call — for students and new staff." },
    ],
    steps: [
      { n: "01", title: "One inbox", copy: "Admissions, parents, and fees — ranked, not a shared mailbox." },
      { n: "02", title: "The diary matches the site", copy: "Tours and calls book into the real calendar." },
      { n: "03", title: "Term after term", copy: "Packs, reminders, and onboarding reuse last term’s truth." },
    ],
    desks: ["support", "voice", "hr", "finance"],
    activity: [
      { title: "Admissions", line: "12 tour slots booked", time: "8m" },
      { title: "Parents", line: "Term letter queued", time: "26m" },
      { title: "Fees", line: "Reminders sent · 3rd wave", time: "2h" },
    ],
    quote: { text: "Parents stopped calling the front office for things the pack already answered.", author: "Helen Okoro", role: "Registrar, Westfield" },
    faqs: [
      { q: "Does this replace the SIS?", a: "No. Fless runs the conversations and packs around it — admissions, parents, fees follow-up." },
      { q: "Multiple campuses?", a: "Each campus can be a workspace, or one workspace with site hours. Same product." },
      { q: "Languages?", a: "Parent and admissions comms run in the languages you operate. Escalation stays with named staff." },
    ],
    plan: { label: "Start with support + voice", href: "/start?plan=pro", note: "Add HR and finance for enrolment and fees" },
  },
  {
    slug: "retail",
    name: "Retail & E-commerce",
    kind: "industry",
    line: "Online stores, retail brands, D2C",
    headline: "The floor and the site, on one loop.",
    lede: "Campaigns, stock questions, and support that doesn’t bounce between a shop and a chatbot. One record from browse to refund.",
    story:
      "The drop is live in London while Lagos still has Saturday hours. Customers ask where the order is, whether the size is in store, and how to return it — on WhatsApp, the site, and the phone. Fless runs campaigns, support, and the store line so the floor and the site tell the same story.",
    hero: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1800&auto=format&fit=crop&q=80",
    heroAlt: "Retail floor",
    markets: "Stores · e-commerce · regions",
    cities: ["Lagos", "London", "Dubai", "New York"],
    audience: ["Retail brands", "E-commerce", "Multi-store groups"],
    metrics: [
      { value: "12", label: "Channels" },
      { value: "48s", label: "First reply" },
      { value: "3×", label: "Campaigns shipped" },
    ],
    capabilities: [
      { title: "Campaigns", copy: "Drops, ads, and social that match what’s actually on the floor.", image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&auto=format&fit=crop&q=80", snippet: [{ title: "Drop", line: "Weekend ads live", time: "5m" }, { title: "Floor", line: "Copy matches stock", time: "22m" }] },
      { title: "Support", copy: "Where is my order, size, refund — resolved with the same context as the till.", image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&auto=format&fit=crop&q=80", snippet: [{ title: "Order", line: "#4821 found", time: "12m" }, { title: "Refund", line: "Same record as till", time: "40m" }] },
      { title: "Voice", copy: "Store lines and after-hours, booked or routed — not a missed sale.", image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=1200&auto=format&fit=crop&q=80", snippet: [{ title: "Lagos", line: "Line covered after 8", time: "1h" }, { title: "Book", line: "Fitting held", time: "1h" }] },
    ],
    plays: [
      { title: "Drop week", copy: "Ads and social match stock. Sold-out SKUs don’t stay in the creative." },
      { title: "WISMO", copy: "Order status from the same record as the till — not a chatbot guess." },
      { title: "Store after 8", copy: "The line is covered. Fittings hold. Missed calls aren’t missed sales." },
      { title: "Returns", copy: "Refund path with context. The site and the shop agree." },
    ],
    steps: [
      { n: "01", title: "Connect channels", copy: "Site, WhatsApp, store line, ads — one inbox." },
      { n: "02", title: "Match the floor", copy: "Campaigns read live stock. Support reads the same SKU." },
      { n: "03", title: "Cover the hours", copy: "Each city’s store hours. After-hours still books or routes." },
    ],
    desks: ["marketing", "support", "voice", "operations"],
    activity: [
      { title: "Drop", line: "Weekend ads live", time: "5m" },
      { title: "Ticket", line: "Order #4821 found", time: "12m" },
      { title: "Store", line: "Lagos line covered after 8", time: "1h" },
    ],
    quote: { text: "The site and the shop finally tell the same story.", author: "Amara Diallo", role: "Retail Director, 10MG" },
    faqs: [
      { q: "Does it replace Shopify or the POS?", a: "No. Fless sits on the conversations and campaigns. Orders and stock stay in the systems you already run." },
      { q: "Multiple brands?", a: "Use workspaces per brand or region. Context doesn’t leak." },
      { q: "Peak season?", a: "Scale credits for the weeks that spike. Nothing is deleted when a cycle ends." },
    ],
    plan: { label: "Run retail on Pro", href: "/start?plan=pro", note: "Marketing, support, and voice · ops for store programmes" },
  },
  {
    slug: "finance",
    name: "Finance",
    kind: "industry",
    line: "Banks, fintech, professional money.",
    headline: "Onboarding with a trail. Updates without the lag.",
    lede: "Client onboarding, ops, and communications that survive audit — for teams that can’t afford a sloppy CRM and a shared inbox.",
    story:
      "This is not the Finance department. It’s how banks, fintechs, and professional-money teams run the work around the book: KYC packs, renewals, client letters, and an audit log. Lagos entity, London book, Dubai desk — one product that procurement and compliance can actually open.",
    hero: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1800&auto=format&fit=crop&q=80",
    heroAlt: "Trading floor and market screens",
    markets: "Regulated · multi-entity",
    cities: ["London", "Lagos", "Dubai", "Singapore"],
    audience: ["Banks", "Fintech", "Asset and advisory"],
    metrics: [
      { value: "Audit", label: "Every action" },
      { value: "SSO", label: "Required" },
      { value: "KYC", label: "In the flow" },
    ],
    capabilities: [
      { title: "Onboarding", copy: "Docs, checks, and a status clients can actually see — not a black box.", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&auto=format&fit=crop&q=80", snippet: [{ title: "KYC", line: "Pack complete · Helix Ltd", time: "11m" }, { title: "Status", line: "Client can see it", time: "40m" }] },
      { title: "Client ops", copy: "Updates, renewals, and exceptions with a name on every step.", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&auto=format&fit=crop&q=80", snippet: [{ title: "Renewal", line: "Notice queued", time: "40m" }, { title: "Owner", line: "Named on the step", time: "1h" }] },
      { title: "Comms", copy: "The right letter, the right book, no copy-paste from last quarter.", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80", snippet: [{ title: "Letter", line: "Book-matched copy", time: "1h" }, { title: "Audit", line: "Week log exported", time: "2h" }] },
    ],
    plays: [
      { title: "KYC pack", copy: "Docs in, status out, a trail that survives the review." },
      { title: "Renewals", copy: "Notices queued with an owner. Exceptions aren’t a rumour." },
      { title: "Client letters", copy: "Book-matched copy. No last-quarter paste." },
      { title: "Weekly export", copy: "Audit log out. Procurement and compliance get a file, not a story." },
    ],
    steps: [
      { n: "01", title: "Security and identity", copy: "SSO first. Then the desks." },
      { n: "02", title: "Onboarding flow", copy: "KYC, status, and who can see the pack." },
      { n: "03", title: "Run the book around the book", copy: "Ops, comms, and the export — every week." },
    ],
    desks: ["operations", "finance", "support", "hr"],
    activity: [
      { title: "KYC", line: "Pack complete · Helix Ltd", time: "11m" },
      { title: "Ops", line: "Renewal notice queued", time: "40m" },
      { title: "Audit", line: "Week log exported", time: "2h" },
    ],
    quote: { text: "Compliance stopped being a folder. It’s the workflow.", author: "James Okonkwo", role: "COO, RevWit" },
    faqs: [
      { q: "Is this the Finance department page?", a: "No. That’s invoices, expenses, and payroll — /departments/finance. This page is for regulated firms running client ops." },
      { q: "Can we require SSO?", a: "Yes. Enterprise makes SSO the default. Audit log on every action." },
      { q: "Multi-entity?", a: "Workspaces per entity. Shared policy, separate books and client rooms." },
    ],
    plan: { label: "Talk to enterprise", href: "/contact", note: "SSO, audit, named rollout — typical for regulated teams" },
  },
  {
    slug: "hospitality",
    name: "Hospitality",
    kind: "industry",
    line: "Rooms, tables, guests — overnight.",
    headline: "The desk that never clocks out.",
    lede: "Reservations, guest messages, and reviews handled while the floor is full. One voice from the website to the front desk.",
    story:
      "Night audit used to mean missed bookings. Guests write on WhatsApp at 1am. Reviews land before breakfast. Fless covers reservations, guest messages, and reputation for hotels, restaurants, and groups — seven languages, the same house voice, Lagos property and London site on one diary.",
    hero: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1800&auto=format&fit=crop&q=80",
    heroAlt: "Hotel lobby",
    markets: "Hotels · restaurants · groups",
    cities: ["Lagos", "Dubai", "London", "Cape Town"],
    audience: ["Hotels", "Restaurants", "Hospitality groups"],
    metrics: [
      { value: "24/7", label: "Guest line" },
      { value: "7", label: "Languages" },
      { value: "Same", label: "Night & day" },
    ],
    capabilities: [
      { title: "Reservations", copy: "Book, move, confirm. The diary matches the site — and the property.", image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&auto=format&fit=crop&q=80", snippet: [{ title: "Suite", line: "12–14 Apr held", time: "2m" }, { title: "Diary", line: "Matches the site", time: "16m" }] },
      { title: "Guest messages", copy: "WhatsApp, email, the phone — one thread per stay.", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&auto=format&fit=crop&q=80", snippet: [{ title: "Guest", line: "Late checkout approved", time: "16m" }, { title: "Thread", line: "One stay, one inbox", time: "40m" }] },
      { title: "Reputation", copy: "Reviews answered in the house voice, before breakfast.", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&auto=format&fit=crop&q=80", snippet: [{ title: "Reviews", line: "3 replies in house tone", time: "51m" }, { title: "Night", line: "Answered before 7am", time: "51m" }] },
    ],
    plays: [
      { title: "Direct book", copy: "Site and voice hold the same room. OTAs don’t get the only truth." },
      { title: "In-stay thread", copy: "Late checkout, extra night, a question at 1am — one thread." },
      { title: "Breakfast reputation", copy: "Reviews answered in house tone before the floor is fully staffed." },
      { title: "Group properties", copy: "Each house a workspace, or one group diary with site hours." },
    ],
    steps: [
      { n: "01", title: "Connect the diary", copy: "PMS or calendar, site, and the hours the desk actually runs." },
      { n: "02", title: "Cover the line", copy: "Voice and WhatsApp in the languages you host." },
      { n: "03", title: "Protect the name", copy: "Reviews and follow-ups in house voice, overnight." },
    ],
    desks: ["voice", "support", "marketing", "operations"],
    activity: [
      { title: "Book", line: "Suite · 12–14 Apr held", time: "2m" },
      { title: "Guest", line: "Late checkout approved", time: "16m" },
      { title: "Review", line: "3 replies in house tone", time: "51m" },
    ],
    quote: { text: "Night audit used to mean missed bookings. The line doesn’t sleep now.", author: "Sofia Berg", role: "GM, Voke Houses" },
    faqs: [
      { q: "Does it replace the PMS?", a: "No. Fless books and messages against the diary you already run." },
      { q: "Restaurants as well as hotels?", a: "Yes. Tables, guest notes, and reviews — same desks, different diary." },
      { q: "Languages?", a: "Guest line and reviews in the languages you operate. House voice stays consistent." },
    ],
    plan: { label: "Cover the desk on Pro", href: "/start?plan=pro", note: "Voice + support 24/7 · marketing for reputation" },
  },
  {
    slug: "professional-services",
    name: "Professional services",
    kind: "industry",
    line: "Firms, practices, the work around the work.",
    headline: "The practice, not just the practice area.",
    lede: "BD, intake, scheduling, and the admin that partners don’t want to own — running while the billable work does.",
    story:
      "Partners stopped being the CRM. New matters still need a home: intake, conflicts, BD follow-up, staffing. Fless runs the practice around the practice area — law, advisory, consultancies — in London, Lagos, and New York without a second floor of coordinators.",
    hero: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1800&auto=format&fit=crop&q=80",
    heroAlt: "Professional services meeting",
    markets: "Law · advisory · consultancies",
    cities: ["London", "Lagos", "New York", "Johannesburg"],
    audience: ["Law firms", "Advisory", "Consultancies"],
    metrics: [
      { value: "BD", label: "Always warm" },
      { value: "1", label: "Intake path" },
      { value: "On time", label: "Engagements" },
    ],
    capabilities: [
      { title: "Intake", copy: "New matters captured once. Conflicts and next steps aren’t a rumour.", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&auto=format&fit=crop&q=80", snippet: [{ title: "Matter", line: "Opened · NDA sent", time: "7m" }, { title: "Conflicts", line: "Checked once", time: "33m" }] },
      { title: "BD", copy: "Follow-up that doesn’t wait for a Friday partner lunch.", image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&auto=format&fit=crop&q=80", snippet: [{ title: "Dormant", line: "12 accounts nudged", time: "33m" }, { title: "Warm", line: "BD always on", time: "1h" }] },
      { title: "Delivery ops", copy: "Docs, staffing, and status the client can see without chasing.", image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&auto=format&fit=crop&q=80", snippet: [{ title: "Staffing", line: "Associate booked Monday", time: "1h" }, { title: "Status", line: "Client can see it", time: "1h" }] },
    ],
    plays: [
      { title: "New matter", copy: "Intake once. NDA out. Conflicts checked. Partner sees a clean file." },
      { title: "Dormant accounts", copy: "BD that runs between lunches. Humans take the relationship." },
      { title: "Staffing", copy: "The right associate on the calendar. The client sees status without chasing." },
      { title: "Engagement ops", copy: "Docs and dates with owners. Billable work stays billable." },
    ],
    steps: [
      { n: "01", title: "One intake path", copy: "Every new matter enters the same way. Conflicts aren’t a side chat." },
      { n: "02", title: "Keep BD warm", copy: "Sequences on the book of clients — partners aren’t the CRM." },
      { n: "03", title: "Show delivery", copy: "Staffing and status the client can see. Ops doesn’t eat the partner’s Sunday." },
    ],
    desks: ["sales", "operations", "hr", "finance"],
    activity: [
      { title: "Intake", line: "Matter opened · NDA sent", time: "7m" },
      { title: "BD", line: "12 dormant accounts nudged", time: "33m" },
      { title: "Staffing", line: "Associate booked for Monday", time: "1h" },
    ],
    quote: { text: "Partners stopped being the CRM. The work still found a home.", author: "Nora Ade", role: "Managing Partner, West & Co" },
    faqs: [
      { q: "Does this replace the DMS or practice system?", a: "No. Fless runs intake, BD, and the ops around matters. Documents stay where you keep them." },
      { q: "Confidentiality across clients?", a: "Workspaces and named access. Nothing leaks across matters." },
      { q: "Who should own this internally?", a: "COO or practice manager. Partners review; they don’t run the inbox." },
    ],
    plan: { label: "Run the practice on Pro", href: "/start?plan=pro", note: "Sales + ops · add HR and finance for staffing and billing" },
  },
]

export const sizeSolutions = solutions.filter((s) => s.kind === "size")
export const industrySolutions = solutions.filter((s) => s.kind === "industry")

export function getSolution(slug: string) {
  return solutions.find((s) => s.slug === slug)
}
