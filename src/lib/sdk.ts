// Single source of truth for the builder page and /docs: SDK packages,
// plugins, CLI commands, reference data and example code.

export type PluginStatus = "Live" | "Beta" | "Planned"

export interface ToolParameter {
  name: string
  type: string
  required: boolean
  description: string
}

export interface PluginTool {
  id: string
  name: string
  description: string
  permissions: string[]
  parameters: ToolParameter[]
}

export interface Plugin {
  id: string
  packageName: string
  name: string
  category: string
  status: PluginStatus
  summary: string
  services: string[]
  capabilities: string[]
  permissions: string[]
  tools: PluginTool[]
}

export interface SdkPackage {
  name: string
  role: string
  summary: string
  exports: string[]
}

export const SDK_PACKAGES: SdkPackage[] = [
  {
    name: "@fless/employee-sdk",
    role: "Author",
    summary: "Define employees, agents, skills and knowledge in typed TypeScript.",
    exports: ["defineEmployee", "defineAgent", "createEmployee", "EmployeeSandboxRunner"],
  },
  {
    name: "@fless/cli",
    role: "Test & ship",
    summary: "Run sandbox tests, verify against the quality rubric and publish to the marketplace.",
    exports: ["fless test", "fless verify", "fless publish"],
  },
  {
    name: "@fless/contracts",
    role: "Types",
    summary: "Shared schemas for manifests, tools, pricing and usage events.",
    exports: ["EmployeeManifest", "AgentSpec", "EmployeeSkillSpec", "KnowledgeSourceSpec"],
  },
]

export const CLI_COMMANDS = [
  { command: "npx @fless/cli test ./src/employee.ts", summary: "Runs scripted conversations against mock plugins. No live accounts are touched." },
  { command: "npx @fless/cli verify ./src/employee.ts", summary: "Checks the manifest, tool permissions, safety and latency, then signs the build." },
  { command: "npx @fless/cli publish", summary: "Submits the signed build for marketplace review." },
]

export const PLUGIN_STATUS_NOTE: Record<PluginStatus, string> = {
  Live: "In production with pilot customers",
  Beta: "Available to SDK beta builders",
  Planned: "On the roadmap",
}

export const MANIFEST_EXAMPLE = `import { defineEmployee } from '@fless/employee-sdk';
import { bookingAgent, triageAgent } from './agents';

export default defineEmployee({
  id: 'clinic-front-desk',
  name: 'Clinic Front-Desk Concierge',
  version: '1.2.0',
  department: 'VOICE',
  role: 'Answers calls, books visits and follows up on WhatsApp',
  description: 'A front desk for outpatient clinics that never misses a call.',

  targetMarket: {
    countries: ['NG', 'GH'],
    industries: ['Healthcare'],
    businessTypes: ['Clinic', 'Dental Practice'],
    languages: ['en', 'pcm', 'yo'],
  },

  requiredPackages: [
    '@fless/voice',
    '@fless/whatsapp',
    '@fless/google-calendar',
    '@fless/crm',
  ],
  capabilities: [
    'voice.inbound',
    'voice.transfer',
    'calendar.availability',
    'calendar.booking',
    'communication.chat',
    'crm.contact_lookup',
  ],
  tools: [
    'calendar.checkAvailability',
    'calendar.bookAppointment',
    'whatsapp.sendMessage',
    'crm.lookupContact',
    'crm.syncLead',
    'voice.transfer',
  ],

  skills: [
    {
      id: 'appointment-booking',
      name: 'Appointment booking',
      description: 'Books, moves or cancels patient visits.',
      triggerConditions: ['book', 'reschedule', 'cancel'],
      workflowSteps: [
        'Confirm the patient name and phone number',
        'Offer the two earliest open slots',
        'Book the slot and send a WhatsApp confirmation',
      ],
      requiredTools: ['calendar.bookAppointment', 'whatsapp.sendMessage'],
    },
    {
      id: 'emergency-triage',
      name: 'Emergency triage',
      description: 'Spots urgent symptoms and hands the caller to a person.',
      triggerConditions: ['chest pain', 'difficulty breathing', 'heavy bleeding'],
      workflowSteps: [
        'Advise the caller to dial 112',
        'Warm-transfer to the on-call nurse',
      ],
      requiredTools: ['voice.transfer'],
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
  orchestration: { mode: 'SUPERVISOR', leadAgentId: 'triage' },

  approvals: {
    requireHumanApproval: ['crm.syncLead'],
    escalationChannel: 'slack:#front-desk',
  },

  pricing: {
    model: 'BASE_PLUS_USAGE',
    currency: 'USD',
    basePriceCents: 4900,
    billingInterval: 'MONTHLY',
    usageRates: [
      { eventType: 'VOICE_CALL_MINUTE', unitPriceCents: 15, includedUnits: 300 },
    ],
  },

  concurrencyLimit: 5,
  systemInstructions:
    'Warm, concise receptionist for West African clinics. Never give a diagnosis.',
});`

export const AGENTS_EXAMPLE = `import { defineAgent } from '@fless/employee-sdk';

export const triageAgent = defineAgent({
  id: 'triage',
  name: 'Front-desk lead',
  role: 'Greets callers, works out what they need and delegates.',
  modelTier: 'reasoning',
  skills: ['emergency-triage'],
  tools: ['voice.transfer', 'crm.lookupContact'],
  systemPrompt: 'Identify the caller and their intent before acting.',
  maxSteps: 8,
});

export const bookingAgent = defineAgent({
  id: 'booking',
  name: 'Booking specialist',
  role: 'Finds open slots and books appointments.',
  modelTier: 'fast',
  skills: ['appointment-booking'],
  tools: ['calendar.checkAvailability', 'calendar.bookAppointment'],
  knowledgeSources: ['clinic-hours'],
  systemPrompt: 'Offer two slots. Confirm before booking.',
  temperature: 0.2,
});`

export const VERIFY_OUTPUT = `$ npx @fless/cli verify ./src/employee.ts

  Manifest schema          passed   clinic-front-desk@1.2.0
  Packages resolved        passed   4 plugins, 6 tools
  Tool permissions         passed   least privilege
  Skills                   passed   2 skills, all tools bound
  Approval gates           passed   1 action requires a person
  Sandbox conversations    passed   10 / 10
  Prompt-injection suite   passed
  Latency budget           passed   p95 within voice target

  Score  96.8 / 100
  Build  signed  sha256:d8f49a21e0b…

  Ready to publish:  npx @fless/cli publish`

export const SANDBOX_OUTPUT = `$ npx @fless/cli test ./src/employee.ts

  caller   "Can I book a dental check-up on Friday at 2pm?"
  tool     calendar.checkAvailability  →  2 slots free
  agent    "Friday at 2pm is free with Dr. Okonjo. Can I take your name?"
  caller   "Sarah Jenkins, 0801 234 5678."
  tool     calendar.bookAppointment   →  confirmed  #cal_8831
  tool     whatsapp.sendMessage       →  sent

  1 conversation  ·  3 tool calls  ·  0 live accounts touched`

export const MODEL_TIERS = [
  { tier: "fast", latency: "under 350ms", use: "Routing, intent, lookups" },
  { tier: "standard", latency: "0.6–1.2s", use: "Chat, email, support replies" },
  { tier: "reasoning", latency: "1.5–4s", use: "Lead agents, compliance, planning" },
  { tier: "vision", latency: "1–2.5s", use: "Invoices, forms, photos" },
  { tier: "voice", latency: "under 250ms, streaming", use: "Live phone calls" },
]

export const PRICING_MODELS = [
  { model: "SUBSCRIPTION", summary: "Flat monthly price.", example: "Marketing autopilot at $49/month" },
  { model: "BASE_PLUS_USAGE", summary: "Monthly base plus metered overage.", example: "$49/month + $0.15/min after 300 minutes" },
  { model: "TASK", summary: "Pay per completed unit.", example: "$1.50 per verified document" },
  { model: "HOURLY", summary: "Billed by active shift time.", example: "Live chat cover" },
  { model: "EVENT_DRIVEN", summary: "Charged on a success event.", example: "Per booked appointment" },
]

export const USAGE_EVENTS = [
  "VOICE_CALL_MINUTE",
  "CHAT_MESSAGE",
  "EMAIL_SENT",
  "SMS_SENT",
  "LEAD_QUALIFIED",
  "INVOICE_PROCESSED",
  "DOCUMENT_PARSED",
  "TASK_COMPLETED",
]

export const DEPARTMENTS = ["MARKETING", "VOICE", "SALES", "SUPPORT", "OPERATIONS", "FINANCE", "HR", "COMPLIANCE", "LEGAL"]

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

export const TYPES_SNIPPET = `export interface EmployeeManifest {
  id: string;
  name: string;
  version?: string;
  department: string;
  role: string;
  description: string;
  targetMarket?: {
    countries?: string[];
    industries?: string[];
    businessTypes?: string[];
    languages?: string[];
  };
  requiredPackages: string[];
  capabilities: string[];
  tools: string[];
  skills?: Array<string | EmployeeSkillSpec>;
  knowledge?: KnowledgeSourceSpec[];
  agents?: AgentSpec[];
  orchestration?: {
    mode: 'SUPERVISOR' | 'PIPELINE' | 'ROUND_ROBIN' | 'DIRECT';
    leadAgentId?: string;
  };
  approvals?: {
    requireHumanApproval: string[];   // tool IDs that pause for a person
    escalationChannel?: string;       // e.g. 'slack:#ops'
  };
  pricing?: EmployeePricingConfig;
  concurrencyLimit?: number;
  systemInstructions: string;
}

export interface EmployeeSkillSpec {
  id: string;
  name: string;
  description: string;
  instructions?: string;
  triggerConditions?: string[];
  workflowSteps?: string[];
  requiredTools?: string[];
  url?: string;                       // link to an SOP or guide
}

export interface AgentSpec {
  id: string;
  name: string;
  role: string;
  systemPrompt: string;
  modelTier?: 'fast' | 'standard' | 'reasoning' | 'vision' | 'voice';
  skills?: Array<string | EmployeeSkillSpec>;
  tools?: string[];
  knowledgeSources?: Array<string | KnowledgeSourceSpec>;
  temperature?: number;
  maxSteps?: number;
}

export interface KnowledgeSourceSpec {
  id: string;
  name: string;
  type: 'TEXT' | 'URL' | 'PDF' | 'DOCUMENT' | 'SITEMAP' | 'MARKDOWN';
  content?: string;
  url?: string;
  country?: string;
  industry?: string;
  refreshInterval?: 'STATIC' | 'DAILY' | 'WEEKLY';
}

export interface EmployeePricingConfig {
  model: 'SUBSCRIPTION' | 'BASE_PLUS_USAGE' | 'TASK' | 'HOURLY' | 'EVENT_DRIVEN';
  currency: string;
  basePriceCents?: number;
  billingInterval?: 'MONTHLY' | 'YEARLY';
  usageRates?: Array<{
    eventType: string;
    unitPriceCents: number;
    includedUnits?: number;
  }>;
}`

export const PLUGINS: Plugin[] = [
  {
    id: "social",
    packageName: "@fless/social",
    name: "Social Publishing",
    category: "Marketing",
    status: "Live",
    summary: "Plan, schedule and publish posts to LinkedIn, X, Facebook and Bluesky through Buffer.",
    services: [
      "LinkedIn",
      "X",
      "Facebook",
      "Bluesky",
      "Buffer"
    ],
    capabilities: [
      "marketing.social_publishing",
      "marketing.content_calendar"
    ],
    permissions: [
      "posts:write",
      "channels:read",
      "analytics:read"
    ],
    tools: [
      {
        id: "social.schedulePost",
        name: "Schedule post",
        description: "Queues an approved post on one or more connected channels.",
        permissions: [
          "posts:write"
        ],
        parameters: [
          {
            name: "channels",
            type: "string[]",
            required: true,
            description: "Channel IDs, e.g. ['linkedin', 'x']."
          },
          {
            name: "text",
            type: "string",
            required: true,
            description: "Post copy."
          },
          {
            name: "mediaUrls",
            type: "string[]",
            required: false,
            description: "Images or video to attach."
          },
          {
            name: "publishAt",
            type: "string",
            required: false,
            description: "ISO 8601 time. Omit to use the next open slot."
          }
        ]
      },
      {
        id: "social.listChannels",
        name: "List channels",
        description: "Returns the channels connected to the workspace and their posting limits.",
        permissions: [
          "channels:read"
        ],
        parameters: []
      },
      {
        id: "social.getPostMetrics",
        name: "Get post metrics",
        description: "Reach, engagement and clicks for published posts.",
        permissions: [
          "analytics:read"
        ],
        parameters: [
          {
            name: "postId",
            type: "string",
            required: true,
            description: "Published post ID."
          }
        ]
      }
    ]
  },
  {
    id: "meta",
    packageName: "@fless/meta",
    name: "Meta (Instagram & Facebook)",
    category: "Marketing",
    status: "Beta",
    summary: "Publish to Instagram and Facebook Pages and read Meta Ads performance.",
    services: [
      "Instagram",
      "Facebook Pages",
      "Meta Ads"
    ],
    capabilities: [
      "marketing.social_publishing",
      "marketing.ads_management"
    ],
    permissions: [
      "pages:publish",
      "ads:read"
    ],
    tools: [
      {
        id: "meta.publishPost",
        name: "Publish Social Post",
        description: "Drafts or publishes image, carousel, or text posts across Facebook Pages and Instagram Business accounts.",
        permissions: [
          "social:publish"
        ],
        parameters: [
          {
            name: "platform",
            type: "string",
            required: true,
            description: "Target platform ('instagram' | 'facebook')."
          },
          {
            name: "caption",
            type: "string",
            required: true,
            description: "Post copy and hashtags."
          },
          {
            name: "mediaUrl",
            type: "string",
            required: false,
            description: "Publicly accessible image or video URL."
          }
        ]
      },
      {
        id: "meta.getAdMetrics",
        name: "Fetch Ad Analytics",
        description: "Pulls impression, spend, CTR, and conversion metrics for active Meta campaigns.",
        permissions: [
          "ads:read"
        ],
        parameters: [
          {
            name: "campaignId",
            type: "string",
            required: true,
            description: "Meta Ads Campaign ID."
          },
          {
            name: "datePreset",
            type: "string",
            required: false,
            description: "Reporting interval ('last_7d', 'last_30d', 'today')."
          }
        ]
      }
    ]
  },
  {
    id: "whatsapp",
    packageName: "@fless/whatsapp",
    name: "WhatsApp Business",
    category: "Messaging",
    status: "Beta",
    summary: "Two-way WhatsApp chats, approved templates and appointment confirmations.",
    services: [
      "WhatsApp Cloud API"
    ],
    capabilities: [
      "communication.chat",
      "communication.alerts"
    ],
    permissions: [
      "messages:read",
      "messages:send",
      "templates:read"
    ],
    tools: [
      {
        id: "whatsapp.sendMessage",
        name: "Send WhatsApp Message",
        description: "Sends a direct text message or interactive pre-approved template to a customer phone number.",
        permissions: [
          "messages:send"
        ],
        parameters: [
          {
            name: "to",
            type: "string",
            required: true,
            description: "International format phone number (e.g. +2348012345678)."
          },
          {
            name: "message",
            type: "string",
            required: true,
            description: "Message body text or template copy."
          },
          {
            name: "templateId",
            type: "string",
            required: false,
            description: "Optional pre-approved WhatsApp Business template ID."
          }
        ]
      },
      {
        id: "whatsapp.getConversation",
        name: "Get Conversation History",
        description: "Fetches recent chat exchanges and customer conversation context.",
        permissions: [
          "messages:read"
        ],
        parameters: [
          {
            name: "phoneNumber",
            type: "string",
            required: true,
            description: "Customer phone number to look up."
          },
          {
            name: "limit",
            type: "number",
            required: false,
            description: "Max messages to return (default 20, max 100)."
          }
        ]
      }
    ]
  },
  {
    id: "mail",
    packageName: "@fless/mail",
    name: "Email",
    category: "Messaging",
    status: "Beta",
    summary: "Send transactional email and triage inbound threads over Resend or SMTP/IMAP.",
    services: [
      "Resend",
      "SMTP / IMAP"
    ],
    capabilities: [
      "communication.email_send",
      "communication.email_triage"
    ],
    permissions: [
      "mail:send",
      "mail:read"
    ],
    tools: [
      {
        id: "mail.sendEmail",
        name: "Send Transactional Email",
        description: "Sends an email message with formatted HTML or plaintext body and attachments.",
        permissions: [
          "email:send"
        ],
        parameters: [
          {
            name: "to",
            type: "string",
            required: true,
            description: "Recipient email address."
          },
          {
            name: "subject",
            type: "string",
            required: true,
            description: "Email subject line."
          },
          {
            name: "body",
            type: "string",
            required: true,
            description: "Plaintext or HTML email body."
          }
        ]
      }
    ]
  },
  {
    id: "voice",
    packageName: "@fless/voice",
    name: "Voice & Telephony",
    category: "Voice",
    status: "Beta",
    summary: "Inbound and outbound phone calls with streaming speech, interruptions and warm transfer.",
    services: [
      "SIP",
      "WebRTC",
      "LiveKit"
    ],
    capabilities: [
      "voice.inbound",
      "voice.outbound",
      "voice.transfer"
    ],
    permissions: [
      "calls:answer",
      "calls:dial",
      "calls:transfer"
    ],
    tools: [
      {
        id: "voice.transfer",
        name: "Transfer Call to Human",
        description: "Warm-transfers an active inbound phone call to a human department or backup number.",
        permissions: [
          "telephony:transfer"
        ],
        parameters: [
          {
            name: "targetNumber",
            type: "string",
            required: true,
            description: "Destination phone number or SIP URI."
          },
          {
            name: "reason",
            type: "string",
            required: true,
            description: "Short summary context provided to the receiving agent."
          }
        ]
      }
    ]
  },
  {
    id: "google-calendar",
    packageName: "@fless/google-calendar",
    name: "Google Calendar",
    category: "Scheduling",
    status: "Beta",
    summary: "Check availability, book appointments and send invites without double-booking.",
    services: [
      "Google Calendar",
      "Google Meet"
    ],
    capabilities: [
      "calendar.availability",
      "calendar.booking"
    ],
    permissions: [
      "calendar:read",
      "events:write"
    ],
    tools: [
      {
        id: "calendar.checkAvailability",
        name: "Check Available Slots",
        description: "Queries free/busy windows across the business calendar within a given date range.",
        permissions: [
          "calendar:read"
        ],
        parameters: [
          {
            name: "startDate",
            type: "string",
            required: true,
            description: "ISO 8601 start timestamp (e.g. 2026-10-02T08:00:00Z)."
          },
          {
            name: "endDate",
            type: "string",
            required: true,
            description: "ISO 8601 end timestamp."
          },
          {
            name: "staffEmail",
            type: "string",
            required: false,
            description: "Optional specific staff member calendar email."
          }
        ]
      },
      {
        id: "calendar.bookAppointment",
        name: "Book Appointment",
        description: "Creates an event on the connected calendar and sends attendee confirmation invites.",
        permissions: [
          "calendar:write"
        ],
        parameters: [
          {
            name: "title",
            type: "string",
            required: true,
            description: "Appointment title (e.g. Dental Checkup)."
          },
          {
            name: "startTime",
            type: "string",
            required: true,
            description: "ISO 8601 start timestamp."
          },
          {
            name: "endTime",
            type: "string",
            required: true,
            description: "ISO 8601 end timestamp."
          },
          {
            name: "attendeeEmail",
            type: "string",
            required: true,
            description: "Client email address."
          }
        ]
      }
    ]
  },
  {
    id: "crm",
    packageName: "@fless/crm",
    name: "CRM",
    category: "Sales",
    status: "Beta",
    summary: "Look up contacts and keep deal stages and notes in sync.",
    services: [
      "HubSpot",
      "Salesforce",
      "Custom database"
    ],
    capabilities: [
      "crm.contact_lookup",
      "crm.lead_sync"
    ],
    permissions: [
      "contacts:read",
      "deals:write"
    ],
    tools: [
      {
        id: "crm.lookupContact",
        name: "Lookup Contact",
        description: "Searches for an existing contact record by email address or phone number.",
        permissions: [
          "contacts:read"
        ],
        parameters: [
          {
            name: "query",
            type: "string",
            required: true,
            description: "Email address or phone number to search."
          }
        ]
      },
      {
        id: "crm.syncLead",
        name: "Sync Lead Status",
        description: "Creates or updates a sales lead record with updated notes and pipeline stage.",
        permissions: [
          "contacts:write",
          "deals:write"
        ],
        parameters: [
          {
            name: "contactId",
            type: "string",
            required: true,
            description: "Contact identifier."
          },
          {
            name: "stage",
            type: "string",
            required: true,
            description: "Pipeline stage (e.g. 'CONSULTATION_BOOKED')."
          },
          {
            name: "note",
            type: "string",
            required: false,
            description: "Interaction summary or note."
          }
        ]
      }
    ]
  },
  {
    id: "slack",
    packageName: "@fless/slack",
    name: "Slack",
    category: "Team",
    status: "Beta",
    summary: "Post updates and hand edge cases to a person in the right channel.",
    services: [
      "Slack"
    ],
    capabilities: [
      "collaboration.slack_alerts",
      "operations.escalation"
    ],
    permissions: [
      "chat:write",
      "channels:read"
    ],
    tools: [
      {
        id: "slack.postMessage",
        name: "Post Slack Message",
        description: "Dispatches formatted block-kit or plain text messages to a designated Slack channel.",
        permissions: [
          "chat:write"
        ],
        parameters: [
          {
            name: "channel",
            type: "string",
            required: true,
            description: "Channel name (e.g. #ops-alerts) or channel ID."
          },
          {
            name: "text",
            type: "string",
            required: true,
            description: "Fallback text or notification summary."
          },
          {
            name: "urgency",
            type: "string",
            required: false,
            description: "'low' | 'normal' | 'urgent'"
          }
        ]
      }
    ]
  },
  {
    id: "documents",
    packageName: "@fless/documents",
    name: "Documents",
    category: "Documents",
    status: "Beta",
    summary: "Turn PDFs, receipts, IDs and forms into validated, structured data.",
    services: [
      "PDF",
      "Images",
      "Scans"
    ],
    capabilities: [
      "documents.ocr",
      "documents.structured_extract"
    ],
    permissions: [
      "files:read"
    ],
    tools: [
      {
        id: "documents.extractStructuredData",
        name: "Extract Structured Fields",
        description: "Parses an uploaded PDF or image file and outputs key-value pairs according to a requested schema.",
        permissions: [
          "documents:parse"
        ],
        parameters: [
          {
            name: "documentUrl",
            type: "string",
            required: true,
            description: "URL or S3 URI of the document file."
          },
          {
            name: "targetSchema",
            type: "string",
            required: true,
            description: "'invoice' | 'id_card' | 'medical_intake' | 'receipt'"
          }
        ]
      }
    ]
  },
  {
    id: "google-workspace",
    packageName: "@fless/google-workspace",
    name: "Google Workspace",
    category: "Productivity",
    status: "Planned",
    summary: "Gmail, Drive, Docs and Sheets access for research, reports and handoffs.",
    services: [
      "Gmail",
      "Drive",
      "Docs",
      "Sheets"
    ],
    capabilities: [
      "productivity.files",
      "communication.email_send"
    ],
    permissions: [
      "drive:read",
      "docs:write"
    ],
    tools: [
      {
        id: "drive.search",
        name: "Search files",
        description: "Finds files in shared drives.",
        permissions: [],
        parameters: []
      },
      {
        id: "sheets.appendRow",
        name: "Append row",
        description: "Adds a row to a sheet.",
        permissions: [],
        parameters: []
      },
      {
        id: "docs.create",
        name: "Create document",
        description: "Drafts a Google Doc from a template.",
        permissions: [],
        parameters: []
      }
    ]
  },
  {
    id: "microsoft-365",
    packageName: "@fless/microsoft-365",
    name: "Microsoft 365",
    category: "Productivity",
    status: "Planned",
    summary: "Outlook, Teams, OneDrive and Excel for Microsoft-first companies.",
    services: [
      "Outlook",
      "Teams",
      "OneDrive",
      "Excel"
    ],
    capabilities: [
      "productivity.files",
      "collaboration.alerts"
    ],
    permissions: [
      "mail:send",
      "files:read"
    ],
    tools: [
      {
        id: "outlook.sendEmail",
        name: "Send email",
        description: "Sends from a connected Outlook mailbox.",
        permissions: [],
        parameters: []
      },
      {
        id: "teams.postMessage",
        name: "Post to Teams",
        description: "Posts to a Teams channel.",
        permissions: [],
        parameters: []
      },
      {
        id: "onedrive.search",
        name: "Search files",
        description: "Finds files in OneDrive and SharePoint.",
        permissions: [],
        parameters: []
      }
    ]
  },
  {
    id: "zoom",
    packageName: "@fless/zoom",
    name: "Zoom",
    category: "Scheduling",
    status: "Planned",
    summary: "Create meetings and pull transcripts for follow-up notes.",
    services: [
      "Zoom"
    ],
    capabilities: [
      "calendar.booking",
      "meetings.transcripts"
    ],
    permissions: [
      "meetings:write",
      "recordings:read"
    ],
    tools: [
      {
        id: "zoom.createMeeting",
        name: "Create meeting",
        description: "Schedules a Zoom meeting and returns the join link.",
        permissions: [],
        parameters: []
      },
      {
        id: "zoom.getTranscript",
        name: "Get transcript",
        description: "Fetches the transcript of a finished meeting.",
        permissions: [],
        parameters: []
      }
    ]
  },
  {
    id: "calendly",
    packageName: "@fless/calendly",
    name: "Calendly",
    category: "Scheduling",
    status: "Planned",
    summary: "Share booking links and react to new or cancelled bookings.",
    services: [
      "Calendly"
    ],
    capabilities: [
      "calendar.booking"
    ],
    permissions: [
      "events:read"
    ],
    tools: [
      {
        id: "calendly.createLink",
        name: "Create booking link",
        description: "Generates a single-use scheduling link.",
        permissions: [],
        parameters: []
      },
      {
        id: "calendly.listEvents",
        name: "List bookings",
        description: "Lists upcoming booked events.",
        permissions: [],
        parameters: []
      }
    ]
  },
  {
    id: "stripe",
    packageName: "@fless/stripe",
    name: "Stripe",
    category: "Payments",
    status: "Planned",
    summary: "Create invoices and payment links and check payment status.",
    services: [
      "Stripe"
    ],
    capabilities: [
      "finance.invoicing",
      "finance.payment_status"
    ],
    permissions: [
      "invoices:write",
      "payments:read"
    ],
    tools: [
      {
        id: "stripe.createInvoice",
        name: "Create invoice",
        description: "Drafts an invoice for a customer.",
        permissions: [
          "invoices:write"
        ],
        parameters: []
      },
      {
        id: "stripe.getPaymentStatus",
        name: "Get payment status",
        description: "Checks whether an invoice has been paid.",
        permissions: [
          "payments:read"
        ],
        parameters: []
      }
    ]
  }
]

export const PLUGIN_CATEGORIES = Array.from(new Set(PLUGINS.map((p) => p.category)))
