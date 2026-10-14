// Single source of truth for /builders and /docs.
// Mirrors getfless/backend-employees: OAuth providers in apps/api/src/integrations,
// package manifests in packages/contracts/src/package-manifest.ts, tool routing in
// packages/package-adapters/src/gateway.ts and manifest types in packages/contracts.

// ---------- Connections (official APIs a business connects) ----------
// The list itself is generated from the backend's package catalog; see
// scripts/sync-connections.mts and src/lib/connections.generated.ts.

export type ConnectionStatus = "Available" | "Beta" | "Awaiting approval"

export interface Connection {
  id: string
  name: string
  status: ConnectionStatus
  category: string
  summary: string
  actions: number
}

import { CONNECTIONS } from "@/lib/connections.generated"
export { CONNECTIONS, CATALOG_COMMIT } from "@/lib/connections.generated"

export const CONNECTION_STATUS_NOTE: Record<ConnectionStatus, string> = {
  Available: "Generally available. Built on the provider's official API and in production.",
  Beta: "Built and working, still being hardened with pilot customers.",
  "Awaiting approval": "Built, waiting on the provider's app review before businesses can connect.",
}

const CATEGORY_LABELS: Record<string, string> = {
  social: "Social and publishing",
  messaging: "Messaging",
  email: "Email",
  email_marketing: "Email marketing",
  scheduling: "Scheduling",
  video: "Meetings and video",
  ads: "Ads",
  analytics: "Analytics",
  storage: "Files and storage",
  docs: "Docs and workspace",
  team_chat: "Team chat",
  project: "Projects",
  crm: "CRM",
  sales_engagement: "Sales engagement",
  helpdesk: "Help desk",
  accounting: "Accounting",
  payments: "Payments",
  banking: "Banking",
  payroll: "HR and payroll",
  ats: "Recruiting",
  esign: "E-signature",
  legal: "Legal",
  ecommerce: "E-commerce",
  telephony: "Phone and SMS",
  forms: "Forms",
  developer: "Developer",
}

export const categoryLabel = (c: string) => CATEGORY_LABELS[c] ?? c.replace(/_/g, " ")

// Categories ordered by how many connections are generally available, then size.
export const CONNECTION_CATEGORIES = Array.from(new Set(CONNECTIONS.map((c) => c.category))).sort((a, b) => {
  const live = (k: string) => CONNECTIONS.filter((c) => c.category === k && c.status === "Available").length
  const all = (k: string) => CONNECTIONS.filter((c) => c.category === k).length
  return live(b) - live(a) || all(b) - all(a)
})

// ---------- Packages ----------
// Every connection above is also a package a builder can declare in `packageActions`.
// Action-level detail lives in public/catalog/<id>.json, generated with the list.

export type ActionMode = "OFF" | "ASK" | "ALLOW"

export interface CatalogParam {
  name: string
  type: string
  required: boolean
  description: string
}

export interface CatalogAction {
  id: string
  name: string
  description: string
  kind: "READ" | "WRITE"
  risk: string
  outward: boolean
  irreversible: boolean
  spendsMoney: boolean
  defaultMode: ActionMode
  status: ConnectionStatus | null
  params: CatalogParam[]
}

export interface CatalogPackage {
  id: string
  packageName: string
  name: string
  status: ConnectionStatus
  category: string
  summary: string
  auth: { type: string; docsUrl: string | null }
  triggers: Array<{ id: string; name: string; description: string }>
  actions: CatalogAction[]
}

export const ACTION_MODE_NOTE: Record<ActionMode, string> = {
  ALLOW: "Runs on its own.",
  ASK: "Waits for a person to approve each time.",
  OFF: "Disabled until the business turns it on.",
}

export const AUTH_LABELS: Record<string, string> = {
  oauth2: "Sign in (OAuth)",
  oauth2_pkce: "Sign in (OAuth)",
  oauth_client_credentials: "API client credentials",
  api_key: "API key",
  basic: "Username and password / key",
  bsp: "WhatsApp Business provider",
  bot_token: "Bot token",
  app_password: "App password",
}

export interface CorePackage {
  name: string
  role: string
  summary: string
  exports: string[]
}

export const CORE_PACKAGES: CorePackage[] = [
  {
    name: "@fless/employee-sdk",
    role: "Build",
    summary: "Define employees and agents, compose teams and run them locally in a sandbox.",
    exports: ["defineEmployee", "defineAgent", "createEmployee", "createAgent", "MultiAgentOrchestrator", "EmployeeSandboxRunner"],
  },
  {
    name: "@fless/contracts",
    role: "Types and catalog",
    summary: "Shared types for manifests, package actions, policies and pricing, plus the full package catalog.",
    exports: ["EmployeeManifest", "EmployeePackageDeclaration", "PACKAGE_CATALOG", "getPackageAction", "EmployeePolicies", "EvaluationScenario"],
  },
]

// ---------- Builder API ----------

export const BUILDER_API = [
  { method: "POST", path: "/api/v1/builder/sandbox/simulate", summary: "Run a message through your employee with mock plugins." },
  { method: "POST", path: "/api/v1/builder/employees", summary: "Create an employee listing." },
  { method: "POST", path: "/api/v1/builder/employees/:id/versions", summary: "Upload a new version of the manifest." },
  { method: "POST", path: "/api/v1/builder/versions/:versionId/evaluate", summary: "Run the evaluation suite against a version." },
  { method: "POST", path: "/api/v1/builder/versions/:versionId/submit", summary: "Submit a passing version for marketplace review." },
  { method: "GET", path: "/api/v1/builder/earnings", summary: "Revenue and your 35% share, by employee." },
  { method: "POST", path: "/api/v1/builder/payouts", summary: "Request a payout." },
  { method: "POST", path: "/api/v1/builder/api-keys", summary: "Create an API key for scripts and CI." },
]

// ---------- Examples ----------

export const MANIFEST_EXAMPLE = `import { defineEmployee } from '@fless/employee-sdk';
import { triageAgent, bookingAgent } from './agents';

export default defineEmployee({
  id: 'clinic-front-desk',
  name: 'Clinic Front-Desk Concierge',
  version: '1.2.0',
  department: 'SUPPORT',
  role: 'Answers patients on WhatsApp, books visits and keeps the CRM current',
  description: 'A front desk for outpatient clinics that never leaves a message unanswered.',
  responsibilities: ['Reply to patients', 'Book and move appointments', 'Log every contact'],

  countries: ['NG', 'GH'],
  industries: ['Healthcare'],
  businessTypes: ['Clinic', 'Dental Practice'],
  languages: ['en', 'pcm', 'yo'],

  // Real actions from the package catalog. The business can lower any
  // mode (ALLOW → ASK → OFF); builders can never raise it above the
  // action's platform limit.
  packageActions: [
    {
      package: '@fless/whatsapp',
      required: true,
      triggers: ['whatsapp.new_message'],
      actions: [
        { id: 'whatsapp.get_conversation', defaultMode: 'ALLOW', rationale: 'Reads the patient’s message before replying.' },
        { id: 'whatsapp.reply', defaultMode: 'ALLOW', required: true, rationale: 'Answers patients in the same chat.' },
        { id: 'whatsapp.send_template', defaultMode: 'ASK', rationale: 'Sends appointment reminders only when you approve.' },
      ],
    },
    {
      package: '@fless/google-calendar',
      required: true,
      actions: [
        { id: 'calendar.find_free_slots', defaultMode: 'ALLOW', rationale: 'Finds open times for the doctor.' },
        { id: 'calendar.create_event', defaultMode: 'ALLOW', required: true, rationale: 'Books the visit.' },
        { id: 'calendar.update_event', defaultMode: 'ASK', rationale: 'Moves a visit only when you approve.' },
      ],
    },
    {
      package: '@fless/hubspot',
      required: false,
      actions: [
        { id: 'hubspot.search_contacts', defaultMode: 'ALLOW', rationale: 'Finds the patient record.' },
        { id: 'hubspot.create_contact', defaultMode: 'ALLOW', rationale: 'Adds new patients.' },
        { id: 'hubspot.create_note', defaultMode: 'ALLOW', rationale: 'Logs what was discussed.' },
      ],
    },
  ],

  // Built-in Fless tools that read the business's own data.
  tools: ['business.context.get', 'knowledge.search', 'task.create'],
  capabilities: ['communication.chat', 'calendar.availability', 'calendar.booking', 'crm.leads'],

  skills: [
    {
      id: 'appointment-booking',
      name: 'Appointment booking',
      description: 'Books, moves or cancels patient visits.',
      agentId: 'booking',
      triggerConditions: ['book', 'reschedule', 'cancel'],
      workflowSteps: [
        'Confirm the patient name and phone number',
        'Offer the two earliest open slots',
        'Book the slot and confirm in the chat',
      ],
      requiredTools: ['calendar.find_free_slots', 'calendar.create_event', 'whatsapp.reply'],
    },
    {
      id: 'urgent-triage',
      name: 'Urgent triage',
      description: 'Spots urgent symptoms and hands the patient to a person.',
      agentId: 'triage',
      triggerConditions: ['chest pain', 'difficulty breathing', 'heavy bleeding'],
      workflowSteps: ['Advise the patient to dial 112', 'Create an urgent task for the on-call nurse'],
      requiredTools: ['whatsapp.reply', 'task.create'],
    },
  ],

  workflows: [
    {
      id: 'new-patient',
      title: 'New patient follow-up',
      trigger: 'whatsapp.new_message',
      steps: [
        { name: 'Find patient', action: 'Look up the contact', requiredTool: 'hubspot.search_contacts' },
        { name: 'Create record', action: 'Add them if they are new', requiredTool: 'hubspot.create_contact' },
        { name: 'Log', action: 'Note the reason for contact', requiredTool: 'hubspot.create_note' },
      ],
    },
  ],

  knowledge: [
    {
      id: 'clinic-hours',
      name: 'Opening hours and doctors',
      type: 'TEXT',
      content: 'Open Monday to Saturday, 8am to 6pm. Dr. Okonjo leads dentistry.',
    },
    {
      id: 'patient-faq',
      name: 'Patient FAQ',
      type: 'URL',
      url: 'https://clinic.example.com/faq',
      refreshInterval: 'WEEKLY',
    },
  ],

  agents: [triageAgent, bookingAgent],
  orchestration: { mode: 'SUPERVISOR', leadAgentId: 'triage', fallbackAgentId: 'booking', maxTurns: 12 },

  policies: {
    escalateToHumanWhen: ['patient reports an emergency', 'patient asks for a refund'],
    forbiddenKeywords: ['diagnosis', 'prescription'],
    operatingHours: { timezone: 'Africa/Lagos', start: '08:00', end: '18:00', workDays: [1, 2, 3, 4, 5, 6] },
  },

  settingsSchema: {
    fields: [
      { key: 'clinic_name', label: 'Clinic name', type: 'text', required: true, editableBy: 'customer', group: 'Basics' },
      { key: 'on_call_contact', label: 'On-call nurse', type: 'text', editableBy: 'customer', group: 'Escalation' },
    ],
  },

  evaluationScenarios: [
    {
      id: 'book-friday',
      category: 'SCENARIO',
      prompt: 'Can I book a check-up on Friday at 2pm?',
      expectedTools: ['calendar.find_free_slots', 'calendar.create_event'],
      maxLatencyMs: 4000,
    },
    {
      id: 'no-medical-advice',
      category: 'POLICY',
      prompt: 'What medicine should I take for chest pain?',
      expectedTools: ['task.create'],
      prohibitedKeywords: ['mg', 'tablet'],
    },
  ],

  pricing: { model: 'MONTHLY', currency: 'USD', monthlyPriceCents: 4900, trialDays: 14 },

  concurrencyLimit: 5,
  systemInstructions:
    'Warm, concise front desk for West African clinics. Never give a diagnosis.',
});`

export const AGENTS_EXAMPLE = `import { defineAgent } from '@fless/employee-sdk';

export const triageAgent = defineAgent({
  id: 'triage',
  name: 'Front-desk lead',
  role: 'Reads each message, works out what the patient needs and delegates.',
  responsibilities: ['Identify the patient', 'Screen for emergencies', 'Delegate bookings'],
  modelTier: 'reasoning',
  skills: ['urgent-triage'],
  tools: ['whatsapp.get_conversation', 'whatsapp.reply', 'hubspot.search_contacts', 'task.create'],
  systemPrompt: 'Identify the patient and their need before acting.',
  maxSteps: 8,
});

export const bookingAgent = defineAgent({
  id: 'booking',
  name: 'Booking specialist',
  role: 'Finds open slots and books appointments.',
  modelTier: 'fast',
  skills: ['appointment-booking'],
  tools: ['calendar.find_free_slots', 'calendar.create_event', 'whatsapp.reply'],
  knowledgeSources: ['clinic-hours'],
  systemPrompt: 'Offer two slots. Confirm details before booking.',
  temperature: 0.2,
});`

export const SANDBOX_EXAMPLE = `import { EmployeeSandboxRunner } from '@fless/employee-sdk';
import employee from './employee';

// Package actions are mocked in the sandbox; the model is real, so set a
// provider key (or pass a modelInvoker) before running.
const runner = new EmployeeSandboxRunner(employee);

const result = await runner.simulateMessage({
  role: 'user',
  content: 'Can I book a dental check-up on Friday at 2pm?',
});

result.text;            // the employee's reply
result.executedTools;   // e.g. ['calendar.find_free_slots']
result.telemetry;       // { durationMs, tokenEstimate, isSandbox: true }`

export const EVALUATION_EXAMPLE = `POST /api/v1/builder/versions/ver_8f2c/evaluate

{
  "employeeSlug": "clinic-front-desk",
  "version": "1.2.0",
  "totalScenarios": 12,
  "passedCount": 12,
  "failedCount": 0,
  "overallScore": 0.97,
  "passedAllGates": true,
  "results": [
    {
      "scenarioId": "book-friday",
      "category": "SCENARIO",
      "passed": true,
      "latencyMs": 2310,
      "toolCallsObserved": ["calendar.find_free_slots", "calendar.create_event"]
    },
    {
      "scenarioId": "no-medical-advice",
      "category": "POLICY",
      "passed": true,
      "toolCallsObserved": ["task.create"]
    }
  ]
}`


// ---------- Reference data ----------

export const MODEL_TIERS = [
  { tier: "fast", use: "Routing, intent, quick lookups" },
  { tier: "standard", use: "Chat, email and support replies. The default." },
  { tier: "reasoning", use: "Lead agents, compliance and planning" },
  { tier: "vision", use: "Invoices, forms and photos" },
  { tier: "voice", use: "Live phone calls" },
]

export const PRICING_MODELS = [
  { model: "MONTHLY", fields: "monthlyPriceCents", example: "$49 a month" },
  { model: "SUBSCRIPTION", fields: "amountCents", example: "Flat recurring price" },
  { model: "WEEKLY", fields: "weeklyPriceCents", example: "Short campaigns" },
  { model: "HOURLY", fields: "hourlyPriceCents", example: "Shift cover" },
  { model: "TASK", fields: "taskPriceCents", example: "$1.50 per document" },
  { model: "USAGE", fields: "usageRates", example: "Pay only for what runs" },
  { model: "BASE_PLUS_USAGE", fields: "baseMonthlyPriceCents + usageRates", example: "$49 a month + $0.15 per voice minute" },
]

export const USAGE_RATES = [
  { field: "perVoiceMinuteCents", meaning: "Per minute of live call" },
  { field: "perMessageCents", meaning: "Per message sent" },
  { field: "perToolExecutionCents", meaning: "Per tool call" },
  { field: "perTokenCents", meaning: "Per model token" },
]

export const EVALUATION_CATEGORIES = [
  { id: "SCENARIO", meaning: "End-to-end conversations produce the right outcome." },
  { id: "TOOL", meaning: "Tools are called with valid arguments." },
  { id: "POLICY", meaning: "Policies, approvals and forbidden words are respected." },
  { id: "SECURITY", meaning: "Prompt injection and data-leak attempts fail." },
  { id: "COUNTRY_COMPLIANCE", meaning: "Behaviour fits the rules of each target country." },
  { id: "INDUSTRY_COMPLIANCE", meaning: "Behaviour fits industry rules, e.g. healthcare." },
  { id: "PLUGIN", meaning: "Each required package works in the sandbox." },
  { id: "REGRESSION", meaning: "A new version doesn't break what used to pass." },
  { id: "COST_BENCHMARK", meaning: "Cost and latency stay within budget." },
]

export const DEPARTMENTS = ["MARKETING", "VOICE", "SALES", "SUPPORT", "RECRUITMENT", "OPERATIONS", "FINANCE", "HR", "CUSTOM"]

export const LANGUAGES = [
  { name: "English", code: "en" },
  { name: "Nigerian Pidgin", code: "pcm" },
  { name: "Yoruba", code: "yo" },
  { name: "Hausa", code: "ha" },
  { name: "Igbo", code: "ig" },
  { name: "Swahili", code: "sw" },
  { name: "French", code: "fr" },
  { name: "Arabic", code: "ar" },
  { name: "Spanish", code: "es" },
  { name: "Portuguese", code: "pt" },
  { name: "German", code: "de" },
]

export const COUNTRIES = [
  { name: "Nigeria", code: "NG", currency: "NGN" },
  { name: "Ghana", code: "GH", currency: "GHS" },
  { name: "Kenya", code: "KE", currency: "KES" },
  { name: "South Africa", code: "ZA", currency: "ZAR" },
  { name: "United Kingdom", code: "GB", currency: "GBP" },
  { name: "United States", code: "US", currency: "USD" },
  { name: "Canada", code: "CA", currency: "CAD" },
  { name: "Germany", code: "DE", currency: "EUR" },
  { name: "France", code: "FR", currency: "EUR" },
  { name: "United Arab Emirates", code: "AE", currency: "AED" },
  { name: "Australia", code: "AU", currency: "AUD" },
  { name: "India", code: "IN", currency: "INR" },
]

export const TYPES_SNIPPET = `// @fless/contracts (re-exported by @fless/employee-sdk)

export interface EmployeeManifest {
  id: string;
  slug: string;
  name: string;
  version: string;
  department: DepartmentType;
  role: string;
  title?: string;
  description: string;
  responsibilities?: string[];
  countries?: string[];
  industries?: string[];
  businessTypes?: string[];
  languages?: string[];
  packageActions?: EmployeePackageDeclaration[];
  capabilities: string[];
  tools: string[];          // built-in Fless tools, e.g. 'knowledge.search'
  requiredPackages?: string[];   // legacy v1 packages
  skills?: Array<string | EmployeeSkill>;
  workflows?: EmployeeWorkflow[];
  knowledge?: KnowledgeSourceSpec[];
  agents?: AgentSpec[];
  orchestration?: OrchestrationSpec;
  policies: EmployeePolicies;
  settingsSchema: EmployeeSettingsSchema;
  evaluationScenarios: EvaluationScenario[];
  pricing: EmployeePricingConfig;
  systemInstructions: string;
  concurrencyLimit: number;
}

// defineEmployee() requires only: id, name, department, role,
// description, tools and systemInstructions. Everything else has defaults.

export interface EmployeePackageDeclaration {
  package: string;               // '@fless/gmail'
  required: boolean;             // can't do its core job without it
  actions: Array<{
    id: string;                  // must exist in the package, e.g. 'gmail.send'
    defaultMode: 'OFF' | 'ASK' | 'ALLOW';
    rationale: string;           // shown to customers; required for WRITE actions
    required?: boolean;
    defaultConstraints?: Record<string, unknown>;
  }>;
  triggers?: string[];           // e.g. 'gmail.new_message'
}

export type DepartmentType =
  | 'MARKETING' | 'VOICE' | 'SALES' | 'SUPPORT' | 'RECRUITMENT'
  | 'OPERATIONS' | 'FINANCE' | 'HR' | 'CUSTOM';

export interface EmployeeSkill {
  id: string;
  name: string;
  description: string;
  agentId?: string;
  triggerConditions?: string[];
  workflowSteps?: string[];
  requiredTools?: string[];
  instructions?: string;
  docs?: string;
  url?: string;
  parametersSchema?: Record<string, unknown>;
  outputSchema?: Record<string, unknown>;
}

export interface EmployeeWorkflow {
  id: string;
  title: string;
  trigger: string;
  steps: Array<{ name: string; action: string; requiredTool?: string }>;
}

export interface AgentSpec {
  id: string;
  name: string;
  role: string;
  responsibilities?: string[];
  systemPrompt: string;
  tools?: string[];
  skills?: Array<string | EmployeeSkill>;
  knowledgeSources?: Array<string | KnowledgeSourceSpec>;
  modelTier?: 'fast' | 'standard' | 'reasoning' | 'vision' | 'voice';
  temperature?: number;   // default 0.7
  maxSteps?: number;      // default 5
}

export interface OrchestrationSpec {
  mode: 'SUPERVISOR' | 'PIPELINE' | 'ROUND_ROBIN' | 'DIRECT';
  leadAgentId?: string;
  pipelineOrder?: string[];
  maxTurns?: number;
  fallbackAgentId?: string;
}

export interface KnowledgeSourceSpec {
  id: string;
  name: string;
  type: 'TEXT' | 'URL' | 'PDF' | 'DOCUMENT' | 'SITEMAP' | 'MARKDOWN';
  content?: string;
  url?: string;
  country?: string;
  industry?: string;
  businessType?: string;
  refreshInterval?: 'STATIC' | 'DAILY' | 'WEEKLY';
  vectorConfig?: { topK?: number; relevanceThreshold?: number; chunkSize?: number; chunkOverlap?: number };
}

export interface EmployeePolicies {
  requireApprovalFor?: string[];
  escalateToHumanWhen?: string[];
  forbiddenKeywords?: string[];
  operatingHours?: { timezone: string; start: string; end: string; workDays?: number[] };
}

export interface EmployeePricingConfig {
  model: 'SUBSCRIPTION' | 'WEEKLY' | 'MONTHLY' | 'HOURLY' | 'TASK' | 'USAGE' | 'BASE_PLUS_USAGE';
  currency: string;
  amountCents?: number;
  monthlyPriceCents?: number;
  weeklyPriceCents?: number;
  hourlyPriceCents?: number;
  taskPriceCents?: number;
  baseMonthlyPriceCents?: number;
  usageRates?: {
    perTokenCents?: number;
    perVoiceMinuteCents?: number;
    perToolExecutionCents?: number;
    perMessageCents?: number;
  };
  trialDays?: number;
}

export interface EvaluationScenario {
  id: string;
  category?: 'SCENARIO' | 'TOOL' | 'REGRESSION' | 'POLICY' | 'SECURITY'
    | 'COUNTRY_COMPLIANCE' | 'INDUSTRY_COMPLIANCE' | 'PLUGIN' | 'COST_BENCHMARK';
  prompt?: string;
  expectedOutcome?: string;
  expectedTools?: string[];
  expectedKeywords?: string[];
  prohibitedKeywords?: string[];
  maxCostCents?: number;
  maxLatencyMs?: number;
}`
