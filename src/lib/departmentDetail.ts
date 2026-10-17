export const departmentDetail: Record<
  string,
  {
    story: string
    cities: string[]
    plays: { title: string; copy: string }[]
    steps: { n: string; title: string; copy: string }[]
    faqs: { q: string; a: string }[]
    prompts: string[]
    reply: (prompt: string) => string
  }
> = {
  marketing: {
    story:
      "Briefs sit in a doc. Posts never leave. Fless turns the brief into a calendar — LinkedIn, X, Facebook, and Bluesky — with brand memory and approval before publishing. You review. It ships.",
    cities: ["Lagos", "London", "New York"],
    plays: [
      { title: "Launch week", copy: "Waitlist, social, and landing copy from one brief." },
      { title: "Always-on calendar", copy: "The week stays full when the team is in a product sprint." },
      { title: "SEO pack", copy: "Titles, internals, a report you can review." },
      { title: "Ads that match stock", copy: "Creative queued for review — you approve the set." },
    ],
    steps: [
      { n: "01", title: "Drop the brief", copy: "Market, offer, and the channels that matter this quarter." },
      { n: "02", title: "Review the calendar", copy: "Drafts land. You change tone, not the whole stack." },
      { n: "03", title: "It stays full", copy: "Next week is already queued. You scale what worked." },
    ],
    faqs: [
      {
        q: "Do we lose our brand voice?",
        a: "No. Fless learns your voice from your website and approved posts, and nothing publishes until you approve it. Your edits teach it what “on-brand” means.",
      },
      {
        q: "Can we run more than one market?",
        a: "Yes. Each brand or market can have its own voice, calendar and channels in one workspace.",
      },
    ],
    prompts: ["Draft next week’s campaign for the launch.", "Fill the LinkedIn calendar for Q3.", "Write SEO titles for the site."],
    reply: () => "Brief locked. 4 posts, 2 ads, and a report are queued. You’ll approve before anything publishes.",
  },
  voice: {
    story:
      "The line rings when nobody is at the desk. Fless answers, qualifies, and books — in the hours and languages your markets need. Notes hit the record before the call ends.",
    cities: ["Lagos", "London", "Dubai"],
    plays: [
      { title: "After-hours", copy: "The office closes. Inbound calls are answered." },
      { title: "Outbound lists", copy: "Follow-ups that get dialed, with a script you can audit." },
      { title: "No-shows", copy: "Reminders out. Holds confirmed. The diary matches the site." },
      { title: "Handoff", copy: "A person takes the call when it matters — with the notes already there." },
    ],
    steps: [
      { n: "01", title: "Connect the diary", copy: "Hours, sites, and who to escalate to." },
      { n: "02", title: "Go live", copy: "Inbound first. Outbound when the list is ready." },
      { n: "03", title: "Audit the week", copy: "Every call has a trail. You change the script, not the vendor." },
    ],
    faqs: [
      {
        q: "Does a human ever pick up?",
        a: "Yes. You set escalation rules; calls that need a person are handed over with notes.",
      },
      {
        q: "Languages?",
        a: "English at launch. More languages will be added during early access based on demand.",
      },
    ],
    prompts: ["Cover after-hours calls.", "Book anything after 10am tomorrow.", "Run the outbound follow-up list."],
    reply: () => "Voice setup saved. After-hours covered. Calendar synced. You’ll see every booking in the diary.",
  },
  sales: {
    story:
      "Deals die in a spreadsheet. Fless researches, scores, and follows up until a human should take the meeting. The CRM stays true in every market you sell.",
    cities: ["London", "Dubai", "Toronto"],
    plays: [
      { title: "This week’s list", copy: "Accounts scored. Who is actually worth a call." },
      { title: "Sequences", copy: "They run until someone replies." },
      { title: "Pipeline hygiene", copy: "Stages current. No “I’ll update the CRM later.”" },
      { title: "Handoff to a human", copy: "When they reply, you take the meeting." },
    ],
    steps: [
      { n: "01", title: "Connect the CRM", copy: "HubSpot or Salesforce. One truth." },
      { n: "02", title: "Turn on follow-up", copy: "The list gets worked. You take conversations." },
      { n: "03", title: "See what moved", copy: "Won, stalled, next week’s calls." },
    ],
    faqs: [
      {
        q: "Do we replace the CRM?",
        a: "No. Fless works with your CRM rather than replacing it.",
      },
      {
        q: "Can reps still own accounts?",
        a: "Yes. Fless researches and follows up; your reps own the relationship and the meeting.",
      },
    ],
    prompts: ["Score this week’s inbound and send intros.", "Follow up with stalled leads.", "Move qualified lead to demo."],
    reply: () => "Follow-ups queued. Lead scored — intro drafted. CRM stages will stay current after you approve.",
  },
  recruitment: {
    story:
      "The inbox is not a shortlist. Fless sources, screens, and schedules so you meet people who already match the role — in every office you hire.",
    cities: ["Lagos", "London", "Berlin"],
    plays: [
      { title: "Role out", copy: "Profiles back, ranked against the brief." },
      { title: "Scorecards", copy: "A paper trail for every decision." },
      { title: "Onsite booked", copy: "The hiring manager stays in the loop." },
      { title: "Offer pack", copy: "Drafted with People, not from an unreviewed template." },
    ],
    steps: [
      { n: "01", title: "Lock the brief", copy: "Role, must-haves, markets." },
      { n: "02", title: "Screen", copy: "Structured questions. Ranked shortlist." },
      { n: "03", title: "You meet them", copy: "Calendar holds. Offers when you’re ready." },
    ],
    faqs: [
      {
        q: "Do we still interview?",
        a: "Yes. Fless sources and screens; you meet a shortlist and make every decision.",
      },
      {
        q: "ATS?",
        a: "Fless is designed to work alongside your ATS. Integrations are being added during early access.",
      },
    ],
    prompts: ["Source 8 product designers against this brief.", "Screen candidates and prepare scorecards.", "Hold interview slots for Thursday."],
    reply: () => "Shortlist ranked. Scorecard prepared. Thursday interview held — confirm and it lands on the calendar.",
  },
  support: {
    story:
      "Queue backlogs build fast. Fless ranks the inbox, drafts from your knowledge, and escalates only when a person should step in — across timezones.",
    cities: ["Lagos", "London", "New York"],
    plays: [
      { title: "Triage", copy: "Email, chat, WhatsApp — ranked by account health." },
      { title: "Drafts from the docs", copy: "Replies from what you already wrote." },
      { title: "Success", copy: "Health scores so accounts don’t go quiet." },
      { title: "Clean handoff", copy: "Context, not an unorganized message at 6pm." },
    ],
    steps: [
      { n: "01", title: "Connect the inbox", copy: "Channels in. One queue." },
      { n: "02", title: "Point at the docs", copy: "The desk answers from your knowledge." },
      { n: "03", title: "Set escalation", copy: "Who gets the hard ones, and when." },
    ],
    faqs: [
      {
        q: "Will it invent answers?",
        a: "It answers from your documentation and escalates to a person when it isn't confident.",
      },
      {
        q: "WhatsApp and email?",
        a: "One inbox. Same ranking. Same audit trail.",
      },
    ],
    prompts: ["Triage the queue and close billing questions.", "Draft a reply to ticket #4821 from the help center.", "Send a check-in to accounts at risk."],
    reply: () => "#4821 resolved from the help center. Accounts flagged for review. You’ll only see what needs a person.",
  },
  operations: {
    story:
      "Work goes quiet in a thread. Fless puts owners, dates, and a board on projects, docs, and workflows — one OS for every office.",
    cities: ["Lagos", "London", "Accra"],
    plays: [
      { title: "Vendor onboarding", copy: "Intake → review → done. Visible." },
      { title: "Docs", copy: "Latest version, name and time on approval." },
      { title: "Weekly close", copy: "Friday isn’t “checking.”" },
      { title: "Multi-office", copy: "Regional rollouts visible on one board." },
    ],
    steps: [
      { n: "01", title: "Name the workflows", copy: "What repeats. Who owns the last step." },
      { n: "02", title: "Put it on a board", copy: "No orphan tasks." },
      { n: "03", title: "Close the week", copy: "Status is a fact, not a meeting." },
    ],
    faqs: [
      {
        q: "Do we leave Slack?",
        a: "No. Fless is designed to work where your team already works.",
      },
      {
        q: "Approvals?",
        a: "Every high-impact action waits for a named approver.",
      },
    ],
    prompts: ["Move vendor onboarding to Review.", "Get the Q3 ops pack approved.", "Mark the rollout done."],
    reply: () => "Vendor pack in Review. Q3 ops sent for approval. Rollout marked Done on the board.",
  },
  finance: {
    story:
      "Month-end used to be a reconstruction. Fless sends invoices, codes expenses, and keeps payroll ready — multi-currency, without a Friday founder session.",
    cities: ["London", "Lagos", "Dubai"],
    plays: [
      { title: "Send and chase", copy: "The ledger matches the bank." },
      { title: "Receipts as they land", copy: "Policy before the card statement." },
      { title: "Payroll file", copy: "Finance and HR both trust it." },
      { title: "Currencies", copy: "Multi-currency by default." },
    ],
    steps: [
      { n: "01", title: "Connect the books", copy: "Bank, cards, who can approve." },
      { n: "02", title: "Turn on chase", copy: "Due invoices don’t wait until Friday." },
      { n: "03", title: "Close ready", copy: "Day one of the month looks like a check, not a scramble." },
    ],
    faqs: [
      {
        q: "Does this replace the accountant?",
        a: "No. Fless prepares the work; your accountant or finance lead reviews and signs off.",
      },
      {
        q: "Currencies?",
        a: "Billing is displayed in USD, NGN, GBP, EUR, KES, GHS, ZAR and AED and invoiced in USD.",
      },
    ],
    prompts: ["Chase invoices over 14 days.", "Code this week’s expenses to policy.", "Prepare the March payroll file."],
    reply: () => "Invoices chased. Receipts coded to policy. March payroll file ready for review.",
  },
  hr: {
    story:
      "Day one used to mean five inboxes. Fless runs onboarding, policy, and reviews in one record — same process in every office.",
    cities: ["Lagos", "London", "Berlin"],
    plays: [
      { title: "Offer signed", copy: "Kit ordered. Access on day one." },
      { title: "Handbook", copy: "Current version, acknowledged, dated." },
      { title: "Review cycle", copy: "Starts on time. Notes hiring already has." },
      { title: "One record", copy: "From first screen to first review." },
    ],
    steps: [
      { n: "01", title: "The person lands", copy: "Offer, kit, access — one flow." },
      { n: "02", title: "Policy is current", copy: "Not a PDF lost in Drive." },
      { n: "03", title: "Cycles run", copy: "Reviews don’t slip because nobody owned the calendar." },
    ],
    faqs: [
      {
        q: "Does recruiting share the record?",
        a: "Yes. Recruitment and HR use the same employee record.",
      },
      {
        q: "Multiple offices?",
        a: "Yes. Policies and onboarding can be set per office.",
      },
    ],
    prompts: ["Start onboarding for Tara.", "Send handbook v4 for acknowledgement.", "Open the Q2 review cycle."],
    reply: () => "Tara: offer signed, kit ordered, day-one plan ready. Handbook v4 queued. Q2 cycle can open when you confirm.",
  },
  legal: {
    story:
      "Contracts used to live in inboxes until the renewal surprised you. Fless runs intake, first-pass review, signatures, and renewals in one record — your lawyer approves the parts that matter.",
    cities: ["Lagos", "London", "Dubai"],
    plays: [
      { title: "Intake", copy: "Every request with counterparty, value, and deadline." },
      { title: "First-pass review", copy: "Risky clauses flagged for your lawyer." },
      { title: "E-signature", copy: "Sent only after you approve." },
      { title: "Renewals", copy: "Notice periods surface weeks ahead." },
    ],
    steps: [
      { n: "01", title: "Load your templates", copy: "NDAs, MSAs, and the clauses you accept." },
      { n: "02", title: "Connect signatures and storage", copy: "DocuSign, Dropbox Sign, Drive, SharePoint." },
      { n: "03", title: "Set who approves", copy: "Owner, lawyer, or both — per contract type." },
    ],
    faqs: [
      {
        q: "Does this replace our lawyer?",
        a: "No. Fless prepares and tracks the work and flags risk; it doesn't give legal advice. A qualified lawyer should review anything that matters.",
      },
      {
        q: "Will it sign or send without us?",
        a: "No. Sending for signature and filing always wait for a named approver.",
      },
    ],
    prompts: ["Review this vendor MSA and flag risky clauses.", "Draft a mutual NDA for Acme Ltd.", "List contracts renewing in the next 60 days."],
    reply: () => "MSA reviewed: 3 clauses flagged for your lawyer. NDA drafted from your template — approve to send for signature. 2 renewals due within 60 days.",
  },
}
