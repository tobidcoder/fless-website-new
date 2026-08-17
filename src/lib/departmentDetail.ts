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
      "Briefs sit in a doc. Posts never leave. Fless turns the brief into a calendar — LinkedIn, the site, ads — for Lagos, London, and New York without a 12-tool stack. You review. It ships.",
    cities: ["Lagos", "London", "New York"],
    plays: [
      { title: "Launch week", copy: "Waitlist, social, and landing copy from one brief." },
      { title: "Always-on calendar", copy: "The week stays full when the team is in a product sprint." },
      { title: "SEO pack", copy: "Titles, internals, a report you can send to the CMO." },
      { title: "Ads that match stock", copy: "Creative queued for Meta and LinkedIn — you approve the set." },
    ],
    steps: [
      { n: "01", title: "Drop the brief", copy: "Market, offer, and the channels that matter this quarter." },
      { n: "02", title: "Review the calendar", copy: "Drafts land. You change tone, not the whole stack." },
      { n: "03", title: "It stays full", copy: "Next week is already queued. You scale what worked." },
    ],
    faqs: [
      { q: "Do we lose our brand voice?", a: "No. The desk learns from what you already shipped. You approve before it goes live." },
      { q: "Can we run more than one market?", a: "Yes. One calendar, local copy. Lagos and London don’t get the same post." },
    ],
    prompts: ["Draft next week’s campaign for the London launch.", "Fill the LinkedIn calendar for Q3.", "Write SEO titles for the UK site."],
    reply: () => "Brief locked. 4 posts, 2 ads, and a Friday report are queued. You’ll approve before anything publishes.",
  },
  voice: {
    story:
      "The line rings when nobody is at the desk. Fless answers, qualifies, and books — in the hours and languages your markets need. Notes hit the record before the call ends.",
    cities: ["Lagos", "London", "Dubai"],
    plays: [
      { title: "After-hours", copy: "The clinic closes. Bookings don’t." },
      { title: "Outbound lists", copy: "Follow-ups that actually get dialed, with a script you can audit." },
      { title: "No-shows", copy: "Reminders out. Holds confirmed. The diary matches the site." },
      { title: "Handoff", copy: "A person takes the call when it matters — with the notes already there." },
    ],
    steps: [
      { n: "01", title: "Connect the diary", copy: "Hours, sites, and who to escalate to." },
      { n: "02", title: "Go live", copy: "Inbound first. Outbound when the list is ready." },
      { n: "03", title: "Audit the week", copy: "Every call has a trail. You change the script, not the vendor." },
    ],
    faqs: [
      { q: "Does a human ever pick up?", a: "Yes. You set when to escalate. Everything else is covered." },
      { q: "Languages?", a: "The markets you operate. Lagos, London, Dubai — local hours, local language." },
    ],
    prompts: ["Cover after-hours calls in Lagos and Dubai.", "Book anything after 10am tomorrow.", "Run the outbound list of 14 follow-ups."],
    reply: () => "Voice is live. After-hours covered. Calendar synced. You’ll see every booking in the diary.",
  },
  sales: {
    story:
      "Deals die in a spreadsheet. Fless researches, scores, and follows up until a human should take the meeting. The CRM stays true in every city you sell.",
    cities: ["London", "Dubai", "Toronto"],
    plays: [
      { title: "This week’s list", copy: "Accounts scored. Who is actually worth a call." },
      { title: "Sequences", copy: "They run until someone replies." },
      { title: "Pipeline hygiene", copy: "Stages current. No “I’ll update Salesforce later.”" },
      { title: "Handoff to a human", copy: "When they reply, you take the meeting." },
    ],
    steps: [
      { n: "01", title: "Connect the CRM", copy: "HubSpot or Salesforce. One truth." },
      { n: "02", title: "Turn on follow-up", copy: "The list gets worked. You take conversations." },
      { n: "03", title: "See what moved", copy: "Won, stalled, next week’s calls." },
    ],
    faqs: [
      { q: "Do we replace the CRM?", a: "No. Fless keeps it current. You don’t maintain a second pipeline." },
      { q: "Can reps still own accounts?", a: "Yes. Fless does the work around the conversation." },
    ],
    prompts: ["Score this week’s inbound and send intros.", "Follow up with 14 stalled leads.", "Move Helix to demo next Tuesday."],
    reply: () => "14 follow-ups queued. Acme scored 91 — intro drafted. CRM stages will stay current after you approve.",
  },
  recruitment: {
    story:
      "The inbox is not a shortlist. Fless sources, screens, and schedules so you meet people who already match the role — in every office you hire.",
    cities: ["Lagos", "London", "Berlin"],
    plays: [
      { title: "Role out", copy: "Profiles back, ranked against the brief." },
      { title: "Scorecards", copy: "A paper trail for every no." },
      { title: "Onsite booked", copy: "The hiring manager stays in the loop." },
      { title: "Offer pack", copy: "Drafted with People, not from a template in Drive." },
    ],
    steps: [
      { n: "01", title: "Lock the brief", copy: "Role, must-haves, markets." },
      { n: "02", title: "Screen", copy: "Structured questions. Ranked shortlist." },
      { n: "03", title: "You meet them", copy: "Calendar holds. Offers when you’re ready." },
    ],
    faqs: [
      { q: "Do we still interview?", a: "Yes. You meet the shortlist. Fless does sourcing and screening." },
      { q: "ATS?", a: "We sit alongside it. The trail doesn’t live in a spreadsheet." },
    ],
    prompts: ["Source 8 product designers against this brief.", "Screen Amara K. and send a scorecard.", "Book onsite for Thursday."],
    reply: () => "Shortlist of 8 ranked. Amara K. at 94%. Thursday onsite held — confirm and it lands on the hiring manager’s calendar.",
  },
  support: {
    story:
      "First reply used to be hours. Fless ranks the inbox, drafts from your knowledge, and escalates only when a person should step in — every timezone.",
    cities: ["Lagos", "London", "New York"],
    plays: [
      { title: "Triage", copy: "Email, chat, WhatsApp — ranked by what will churn." },
      { title: "Drafts from the docs", copy: "Replies from what you already wrote." },
      { title: "Success", copy: "Health scores so accounts don’t go quiet." },
      { title: "Clean handoff", copy: "Context, not a Slack dump at 6pm." },
    ],
    steps: [
      { n: "01", title: "Connect the inbox", copy: "Channels in. One queue." },
      { n: "02", title: "Point at the docs", copy: "The desk answers from your knowledge." },
      { n: "03", title: "Set escalation", copy: "Who gets the hard ones, and when." },
    ],
    faqs: [
      { q: "Will it invent answers?", a: "It drafts from your knowledge base. Anything new waits for a person." },
      { q: "WhatsApp and email?", a: "One inbox. Same ranking. Same trail." },
    ],
    prompts: ["Triage the queue and close billing questions.", "Draft a reply to ticket #4821 from the help center.", "Send a check-in to HealthPlus."],
    reply: () => "#4821 resolved from the help center. Three accounts flagged at risk. You’ll only see what needs a person.",
  },
  operations: {
    story:
      "Work goes quiet in a thread. Fless puts owners, dates, and a board on projects, docs, and workflows — one OS for every office.",
    cities: ["Lagos", "London", "Accra"],
    plays: [
      { title: "Vendor onboarding", copy: "Intake → review → done. Visible." },
      { title: "Docs", copy: "Latest version, name and time on approval." },
      { title: "Weekly close", copy: "Friday isn’t “checking.”" },
      { title: "Multi-office", copy: "Lagos rollout and London pack on one board." },
    ],
    steps: [
      { n: "01", title: "Name the workflows", copy: "What repeats. Who owns the last step." },
      { n: "02", title: "Put it on a board", copy: "No orphan tasks." },
      { n: "03", title: "Close the week", copy: "Status is a fact, not a meeting." },
    ],
    faqs: [
      { q: "Do we leave Slack?", a: "No. Fless is the record. Slack can still ping." },
      { q: "Approvals?", a: "Named. Timed. The latest file lives here." },
    ],
    prompts: ["Move vendor onboarding to Review.", "Get the Q3 ops pack approved by Nora.", "Mark the Lagos rollout done."],
    reply: () => "Vendor pack in Review. Q3 ops sent to Nora. Lagos rollout marked Done on the board.",
  },
  finance: {
    story:
      "Month-end used to be a reconstruction. Fless sends invoices, codes expenses, and keeps payroll ready — multi-currency, without a Friday founder session.",
    cities: ["London", "Lagos", "Dubai"],
    plays: [
      { title: "Send and chase", copy: "The ledger matches the bank." },
      { title: "Receipts as they land", copy: "Policy before the card statement." },
      { title: "Payroll file", copy: "Finance and HR both trust it." },
      { title: "Three currencies", copy: "Default, not a plugin." },
    ],
    steps: [
      { n: "01", title: "Connect the books", copy: "Bank, cards, who can approve." },
      { n: "02", title: "Turn on chase", copy: "Due invoices don’t wait until Friday." },
      { n: "03", title: "Close ready", copy: "Day one of the month looks like a check, not a war." },
    ],
    faqs: [
      { q: "Does this replace the accountant?", a: "No. It keeps the file they actually want." },
      { q: "Currencies?", a: "Multi-currency by default. Lagos NGN and London GBP on one workspace." },
    ],
    prompts: ["Chase invoices over 14 days.", "Code this week’s expenses to policy.", "Prepare the March payroll file."],
    reply: () => "Brightline $1,850 chased. 12 receipts coded. March payroll file ready for review.",
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
      { n: "02", title: "Policy is current", copy: "Not a PDF in Drive." },
      { n: "03", title: "Cycles run", copy: "Reviews don’t slip because nobody owned the calendar." },
    ],
    faqs: [
      { q: "Does recruiting share the record?", a: "Yes. That’s the point. Hiring notes are already there for reviews." },
      { q: "Multiple offices?", a: "Same process. Local kit and access per city." },
    ],
    prompts: ["Start onboarding for Maya Chen.", "Send handbook v4 for acknowledgement.", "Open the Q2 review cycle."],
    reply: () => "Maya Chen: offer signed, kit ordered, day-one plan ready. Handbook v4 queued. Q2 cycle can open when you confirm.",
  },
}
