"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Copy,
  Check,
  Code2,
  Terminal,
  ShieldCheck,
  Cpu,
  BookOpen,
  DollarSign,
  ChevronRight,
  Boxes,
  MessageSquare,
  Calendar,
  Share2,
  MessageCircle,
  Users,
  Mail,
  PhoneCall,
  FileText,
  Workflow,
  Layers,
  Zap,
  Activity,
  Database,
  Clock,
  Play,
  KeyRound,
  CheckCheck,
  Sliders,
  Globe,
  FileCode,
  CheckCircle2,
  Compass,
  Network,
  ExternalLink,
  Languages,
  Building2,
  Briefcase,
  Flag,
  Tag,
  Gauge,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { cn } from "@/lib/utils";

// --- Types ---
interface ToolSpec {
  toolId: string;
  name: string;
  description: string;
  requiredPermissions: string[];
  parameters: { name: string; type: string; required: boolean; description: string }[];
  examplePayload: Record<string, unknown>;
  exampleResponse: Record<string, unknown>;
}

interface PluginSpec {
  id: string;
  packageName: string;
  displayName: string;
  version: string;
  category: "COMMUNICATION" | "CALENDAR" | "SOCIAL" | "CRM" | "PRODUCTIVITY" | "VOICE";
  badge: string;
  accentColor: string;
  icon: typeof MessageSquare;
  tagline: string;
  description: string;
  permissions: string[];
  capabilities: string[];
  supportsSandbox: boolean;
  sandboxMockDescription: string;
  tools: ToolSpec[];
  sampleEmployeeCode: string;
}

// --- Official Plugins Dataset ---
const OFFICIAL_PLUGINS: PluginSpec[] = [
  {
    id: "whatsapp",
    packageName: "@fless/whatsapp",
    displayName: "WhatsApp Business",
    version: "1.0.0",
    category: "COMMUNICATION",
    badge: "Official Integration",
    accentColor: "#25D366",
    tagline: "Two-way WhatsApp messaging, automated triage, and appointment confirmations.",
    description: "Connects your AI employee directly to Meta's WhatsApp Cloud API. Enables inbound conversation listeners, outbound rich text, interactive button templates, and customer triage flows with zero token exposure.",
    icon: MessageSquare,
    permissions: ["messages:read", "messages:send", "templates:read"],
    capabilities: ["communication.chat", "communication.alerts", "customer_support.messaging"],
    supportsSandbox: true,
    sandboxMockDescription: "Simulates WhatsApp Cloud API webhooks, delivery receipts, and inbound message streams in an isolated sandbox store without hitting live phone numbers.",
    tools: [
      {
        toolId: "whatsapp.sendMessage",
        name: "Send WhatsApp Message",
        description: "Sends a direct text message or interactive pre-approved template to a customer phone number.",
        requiredPermissions: ["messages:send"],
        parameters: [
          { name: "to", type: "string", required: true, description: "International format phone number (e.g. +2348012345678)." },
          { name: "message", type: "string", required: true, description: "Message body text or template copy." },
          { name: "templateId", type: "string", required: false, description: "Optional pre-approved WhatsApp Business template ID." },
        ],
        examplePayload: {
          to: "+2348012345678",
          message: "Hello! Your consultation at St. Jude Clinic is confirmed for tomorrow at 2:00 PM.",
          templateId: "appointment_confirmation_v1",
        },
        exampleResponse: {
          success: true,
          messageId: "wamid.HBgLMjM0ODAxMjM0NTY3OBUCABEYEkRFM0RBMTEyNEM0NjM4QkY2AA==",
          status: "sent",
          deliveredAt: "2026-10-02T09:30:00.000Z",
        },
      },
      {
        toolId: "whatsapp.getConversation",
        name: "Get Conversation History",
        description: "Fetches recent chat exchanges and customer conversation context.",
        requiredPermissions: ["messages:read"],
        parameters: [
          { name: "phoneNumber", type: "string", required: true, description: "Customer phone number to look up." },
          { name: "limit", type: "number", required: false, description: "Max messages to return (default 20, max 100)." },
        ],
        examplePayload: {
          phoneNumber: "+2348012345678",
          limit: 10,
        },
        exampleResponse: {
          messages: [
            { from: "+2348012345678", text: "Do you have slots for dental cleaning?", timestamp: "2026-10-02T09:15:00Z" },
            { from: "business", text: "Yes! We have Friday at 3 PM available.", timestamp: "2026-10-02T09:16:00Z" },
          ],
        },
      },
    ],
    sampleEmployeeCode: `import { defineEmployee } from '@fless/employee-sdk';

export default defineEmployee({
  id: 'whatsapp-support-agent',
  name: 'WhatsApp Triage Specialist',
  version: '1.0.0',
  department: 'SUPPORT',
  requiredPackages: ['@fless/whatsapp'],
  capabilities: ['communication.chat', 'customer_support.messaging'],
  systemPrompt: 'You handle incoming customer WhatsApp chats with friendly, concise answers.',
  tools: ['whatsapp.sendMessage', 'whatsapp.getConversation'],
});`,
  },
  {
    id: "google-calendar",
    packageName: "@fless/google-calendar",
    displayName: "Google Calendar",
    version: "1.0.0",
    category: "CALENDAR",
    badge: "Scheduling Engine",
    accentColor: "#4285F4",
    tagline: "Live calendar slot lookup, booking consultations, and invite dispatch.",
    description: "Allows AI employees to check real-time availability across team calendars, schedule bookings, prevent double-bookings, and dispatch Google Meet or in-person invitations.",
    icon: Calendar,
    permissions: ["calendar:read", "calendar:write"],
    capabilities: ["calendar.availability", "calendar.booking"],
    supportsSandbox: true,
    sandboxMockDescription: "Returns simulated calendar availability windows and mock confirmation links without modifying live Google Workspace accounts.",
    tools: [
      {
        toolId: "calendar.checkAvailability",
        name: "Check Available Slots",
        description: "Queries free/busy windows across the business calendar within a given date range.",
        requiredPermissions: ["calendar:read"],
        parameters: [
          { name: "startDate", type: "string", required: true, description: "ISO 8601 start timestamp (e.g. 2026-10-02T08:00:00Z)." },
          { name: "endDate", type: "string", required: true, description: "ISO 8601 end timestamp." },
          { name: "staffEmail", type: "string", required: false, description: "Optional specific staff member calendar email." },
        ],
        examplePayload: {
          startDate: "2026-10-02T08:00:00Z",
          endDate: "2026-10-02T18:00:00Z",
        },
        exampleResponse: {
          availableSlots: [
            { start: "2026-10-02T10:00:00Z", end: "2026-10-02T10:30:00Z" },
            { start: "2026-10-02T14:00:00Z", end: "2026-10-02T14:30:00Z" },
          ],
        },
      },
      {
        toolId: "calendar.bookAppointment",
        name: "Book Appointment",
        description: "Creates an event on the connected calendar and sends attendee confirmation invites.",
        requiredPermissions: ["calendar:write"],
        parameters: [
          { name: "title", type: "string", required: true, description: "Appointment title (e.g. Dental Checkup)." },
          { name: "startTime", type: "string", required: true, description: "ISO 8601 start timestamp." },
          { name: "endTime", type: "string", required: true, description: "ISO 8601 end timestamp." },
          { name: "attendeeEmail", type: "string", required: true, description: "Client email address." },
        ],
        examplePayload: {
          title: "Intake Consultation - Sarah Jenkins",
          startTime: "2026-10-02T14:00:00Z",
          endTime: "2026-10-02T14:30:00Z",
          attendeeEmail: "sarah.j@example.com",
        },
        exampleResponse: {
          success: true,
          eventId: "cal_evt_9918231203",
          htmlLink: "https://calendar.google.com/event?eid=mock123",
          status: "confirmed",
        },
      },
    ],
    sampleEmployeeCode: `import { defineEmployee } from '@fless/employee-sdk';

export default defineEmployee({
  id: 'reception-booking-agent',
  name: 'Calendar Coordinator',
  version: '1.0.0',
  department: 'OPERATIONS',
  requiredPackages: ['@fless/google-calendar'],
  capabilities: ['calendar.availability', 'calendar.booking'],
  systemPrompt: 'Find free slots and confirm calendar appointments cleanly with guests.',
  tools: ['calendar.checkAvailability', 'calendar.bookAppointment'],
});`,
  },
  {
    id: "meta",
    packageName: "@fless/meta",
    displayName: "Meta Ads & Social",
    version: "1.0.0",
    category: "SOCIAL",
    badge: "Marketing Engine",
    accentColor: "#0668E1",
    tagline: "Autonomous ad campaign management, creative posting, and audience metrics.",
    description: "Enables marketing AI employees to schedule Instagram/Facebook posts, review audience engagement, adjust ad spend budgets, and optimize campaign performance autonomously.",
    icon: Share2,
    permissions: ["ads:read", "ads:write", "social:publish"],
    capabilities: ["marketing.ads_management", "marketing.social_publishing"],
    supportsSandbox: true,
    sandboxMockDescription: "Generates mock ad account IDs, fake impressions, clickthrough stats, and simulated post draft URLs for safe dry runs.",
    tools: [
      {
        toolId: "meta.publishPost",
        name: "Publish Social Post",
        description: "Drafts or publishes image, carousel, or text posts across Facebook Pages and Instagram Business accounts.",
        requiredPermissions: ["social:publish"],
        parameters: [
          { name: "platform", type: "string", required: true, description: "Target platform ('instagram' | 'facebook')." },
          { name: "caption", type: "string", required: true, description: "Post copy and hashtags." },
          { name: "mediaUrl", type: "string", required: false, description: "Publicly accessible image or video URL." },
        ],
        examplePayload: {
          platform: "instagram",
          caption: "Discover our new preventative care clinic programs! #Health #Wellness",
          mediaUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800",
        },
        exampleResponse: {
          success: true,
          postId: "ig_post_88392102",
          postUrl: "https://instagram.com/p/mock_post_88392102",
          publishedAt: "2026-10-02T11:00:00Z",
        },
      },
      {
        toolId: "meta.getAdMetrics",
        name: "Fetch Ad Analytics",
        description: "Pulls impression, spend, CTR, and conversion metrics for active Meta campaigns.",
        requiredPermissions: ["ads:read"],
        parameters: [
          { name: "campaignId", type: "string", required: true, description: "Meta Ads Campaign ID." },
          { name: "datePreset", type: "string", required: false, description: "Reporting interval ('last_7d', 'last_30d', 'today')." },
        ],
        examplePayload: {
          campaignId: "cmp_44829104",
          datePreset: "last_7d",
        },
        exampleResponse: {
          impressions: 48200,
          clicks: 1450,
          ctr: 0.0301,
          spend: 342.5,
          cpc: 0.23,
        },
      },
    ],
    sampleEmployeeCode: `import { defineEmployee } from '@fless/employee-sdk';

export default defineEmployee({
  id: 'growth-marketing-agent',
  name: 'Meta Ads & Social Marketer',
  version: '1.0.0',
  department: 'MARKETING',
  requiredPackages: ['@fless/meta'],
  capabilities: ['marketing.ads_management', 'marketing.social_publishing'],
  systemPrompt: 'Plan, draft, and track performance of social campaigns with high ROAS.',
  tools: ['meta.publishPost', 'meta.getAdMetrics'],
});`,
  },
  {
    id: "slack",
    packageName: "@fless/slack",
    displayName: "Slack Workspace",
    version: "1.0.0",
    category: "COMMUNICATION",
    badge: "Internal Ops",
    accentColor: "#4A154B",
    tagline: "Internal team escalation, channel alerts, and incident coordination.",
    description: "Integrates AI employees into internal Slack workspaces. Allows employees to post status updates to channels, notify human specialists on escalated edge cases, and run standups.",
    icon: MessageCircle,
    permissions: ["chat:write", "channels:read"],
    capabilities: ["collaboration.slack_alerts", "operations.escalation"],
    supportsSandbox: true,
    sandboxMockDescription: "Emulates Slack webhook post responses and channel lookups in memory.",
    tools: [
      {
        toolId: "slack.postMessage",
        name: "Post Slack Message",
        description: "Dispatches formatted block-kit or plain text messages to a designated Slack channel.",
        requiredPermissions: ["chat:write"],
        parameters: [
          { name: "channel", type: "string", required: true, description: "Channel name (e.g. #ops-alerts) or channel ID." },
          { name: "text", type: "string", required: true, description: "Fallback text or notification summary." },
          { name: "urgency", type: "string", required: false, description: "'low' | 'normal' | 'urgent'" },
        ],
        examplePayload: {
          channel: "#clinic-escalations",
          text: "⚠️ Complex medical billing question requires doctor approval.",
          urgency: "urgent",
        },
        exampleResponse: {
          success: true,
          ts: "1727863200.000100",
          channel: "C0123456789",
        },
      },
    ],
    sampleEmployeeCode: `import { defineEmployee } from '@fless/employee-sdk';

export default defineEmployee({
  id: 'triage-slack-escalator',
  name: 'Operations Dispatcher',
  version: '1.0.0',
  department: 'OPERATIONS',
  requiredPackages: ['@fless/slack'],
  capabilities: ['collaboration.slack_alerts', 'operations.escalation'],
  systemPrompt: 'Alert internal human teams immediately when edge-case requests occur.',
  tools: ['slack.postMessage'],
});`,
  },
  {
    id: "crm",
    packageName: "@fless/crm",
    displayName: "CRM & Contacts",
    version: "1.0.0",
    category: "CRM",
    badge: "Sales & Pipeline",
    accentColor: "#FF7A59",
    tagline: "Lead qualification, customer contact lookup, and pipeline synchronization.",
    description: "Unified interface for syncing lead status, updating customer notes, and querying contact records across HubSpot, Salesforce, and custom CRM stores.",
    icon: Users,
    permissions: ["contacts:read", "contacts:write", "deals:write"],
    capabilities: ["crm.lead_sync", "crm.contact_lookup"],
    supportsSandbox: true,
    sandboxMockDescription: "Simulates contact tables and returns synthetic lead scores without touching production CRM systems.",
    tools: [
      {
        toolId: "crm.lookupContact",
        name: "Lookup Contact",
        description: "Searches for an existing contact record by email address or phone number.",
        requiredPermissions: ["contacts:read"],
        parameters: [
          { name: "query", type: "string", required: true, description: "Email address or phone number to search." },
        ],
        examplePayload: {
          query: "sarah.j@example.com",
        },
        exampleResponse: {
          found: true,
          contactId: "crm_cnt_109283",
          name: "Sarah Jenkins",
          status: "QUALIFIED_LEAD",
          lifetimeValueCents: 45000,
        },
      },
      {
        toolId: "crm.syncLead",
        name: "Sync Lead Status",
        description: "Creates or updates a sales lead record with updated notes and pipeline stage.",
        requiredPermissions: ["contacts:write", "deals:write"],
        parameters: [
          { name: "contactId", type: "string", required: true, description: "Contact identifier." },
          { name: "stage", type: "string", required: true, description: "Pipeline stage (e.g. 'CONSULTATION_BOOKED')." },
          { name: "note", type: "string", required: false, description: "Interaction summary or note." },
        ],
        examplePayload: {
          contactId: "crm_cnt_109283",
          stage: "CONSULTATION_BOOKED",
          note: "Booked dental cleaning for Friday 2 PM. High priority client.",
        },
        exampleResponse: {
          success: true,
          updatedAt: "2026-10-02T10:45:00Z",
        },
      },
    ],
    sampleEmployeeCode: `import { defineEmployee } from '@fless/employee-sdk';

export default defineEmployee({
  id: 'lead-qualification-agent',
  name: 'Inbound Sales Qualifier',
  version: '1.0.0',
  department: 'SALES',
  requiredPackages: ['@fless/crm'],
  capabilities: ['crm.lead_sync', 'crm.contact_lookup'],
  systemPrompt: 'Lookup customer records and ensure CRM deal stages stay completely up to date.',
  tools: ['crm.lookupContact', 'crm.syncLead'],
});`,
  },
  {
    id: "mail",
    packageName: "@fless/mail",
    displayName: "Email & Deliverability",
    version: "1.0.0",
    category: "COMMUNICATION",
    badge: "Inbox Automation",
    accentColor: "#EA4335",
    tagline: "Automated email drafting, sending quotes, and tracking replies.",
    description: "Connects email inboxes via Resend or SMTP/IMAP. Handles inbound email triage, sending structured estimates/invoices, and automated multi-step follow-ups.",
    icon: Mail,
    permissions: ["email:read", "email:send"],
    capabilities: ["communication.email_send", "communication.email_triage"],
    supportsSandbox: true,
    sandboxMockDescription: "Mocks outbound email dispatch and logs sent message previews in test responses.",
    tools: [
      {
        toolId: "mail.sendEmail",
        name: "Send Transactional Email",
        description: "Sends an email message with formatted HTML or plaintext body and attachments.",
        requiredPermissions: ["email:send"],
        parameters: [
          { name: "to", type: "string", required: true, description: "Recipient email address." },
          { name: "subject", type: "string", required: true, description: "Email subject line." },
          { name: "body", type: "string", required: true, description: "Plaintext or HTML email body." },
        ],
        examplePayload: {
          to: "client@example.com",
          subject: "Your Consultation Summary & Intake Forms",
          body: "<p>Thank you for speaking with us today! Here is your intake summary...</p>",
        },
        exampleResponse: {
          success: true,
          messageId: "msg_email_001928340",
          delivered: true,
        },
      },
    ],
    sampleEmployeeCode: `import { defineEmployee } from '@fless/employee-sdk';

export default defineEmployee({
  id: 'email-support-agent',
  name: 'Email Support Coordinator',
  version: '1.0.0',
  department: 'SUPPORT',
  requiredPackages: ['@fless/mail'],
  capabilities: ['communication.email_send', 'communication.email_triage'],
  systemPrompt: 'Draft clear, professional email responses with correct formatting and attachments.',
  tools: ['mail.sendEmail'],
});`,
  },
  {
    id: "voice",
    packageName: "@fless/voice",
    displayName: "Real-Time Telephony & Voice",
    version: "1.0.0",
    category: "VOICE",
    badge: "Sub-500ms Voice",
    accentColor: "#8B5CF6",
    tagline: "Low-latency inbound phone reception, live speech synthesis, and warm transfers.",
    description: "Full WebRTC and SIP telephony integration backed by LiveKit and streaming speech pipelines. Supports dynamic turn-taking, interruption handling, and warm call transfer.",
    icon: PhoneCall,
    permissions: ["telephony:inbound", "telephony:outbound", "telephony:transfer"],
    capabilities: ["voice.inbound", "voice.outbound", "voice.transfer"],
    supportsSandbox: true,
    sandboxMockDescription: "Simulates telephone keypad inputs, speech-to-text transcripts, and simulated transfer rings.",
    tools: [
      {
        toolId: "voice.transfer",
        name: "Transfer Call to Human",
        description: "Warm-transfers an active inbound phone call to a human department or backup number.",
        requiredPermissions: ["telephony:transfer"],
        parameters: [
          { name: "targetNumber", type: "string", required: true, description: "Destination phone number or SIP URI." },
          { name: "reason", type: "string", required: true, description: "Short summary context provided to the receiving agent." },
        ],
        examplePayload: {
          targetNumber: "+18005550199",
          reason: "Patient needs urgent doctor consultation regarding prescription change.",
        },
        exampleResponse: {
          success: true,
          transferStatus: "CONNECTED",
          callDurationSeconds: 142,
        },
      },
    ],
    sampleEmployeeCode: `import { defineEmployee } from '@fless/employee-sdk';

export default defineEmployee({
  id: 'voice-receptionist',
  name: 'Inbound Phone Receptionist',
  version: '1.0.0',
  department: 'VOICE',
  requiredPackages: ['@fless/voice'],
  capabilities: ['voice.inbound', 'voice.transfer'],
  systemPrompt: 'Provide warm, crisp spoken responses over the phone and transfer when requested.',
  tools: ['voice.transfer'],
});`,
  },
  {
    id: "documents",
    packageName: "@fless/documents",
    displayName: "Document Parser & OCR",
    version: "1.0.0",
    category: "PRODUCTIVITY",
    badge: "Intelligent Extraction",
    accentColor: "#10B981",
    tagline: "PDF extraction, invoice scanning, and structured contract comprehension.",
    description: "Extracts tables, key-value pairs, line items, and text from PDFs, scanned receipts, medical intake forms, and legal agreements using vision-enabled reasoning.",
    icon: FileText,
    permissions: ["documents:read", "documents:parse"],
    capabilities: ["documents.ocr", "documents.structured_extract"],
    supportsSandbox: true,
    sandboxMockDescription: "Returns structured invoice line items and mock bounding boxes without calling external vision OCR endpoints.",
    tools: [
      {
        toolId: "documents.extractStructuredData",
        name: "Extract Structured Fields",
        description: "Parses an uploaded PDF or image file and outputs key-value pairs according to a requested schema.",
        requiredPermissions: ["documents:parse"],
        parameters: [
          { name: "documentUrl", type: "string", required: true, description: "URL or S3 URI of the document file." },
          { name: "targetSchema", type: "string", required: true, description: "'invoice' | 'id_card' | 'medical_intake' | 'receipt'" },
        ],
        examplePayload: {
          documentUrl: "https://storage.fless.app/docs/sample-invoice.pdf",
          targetSchema: "invoice",
        },
        exampleResponse: {
          invoiceNumber: "INV-2026-0812",
          vendor: "Apex Dental Supplies Ltd",
          totalAmountCents: 125000,
          currency: "USD",
          lineItems: [
            { description: "Surgical Gloves (Box of 100)", quantity: 10, unitPriceCents: 2500 },
          ],
        },
      },
    ],
    sampleEmployeeCode: `import { defineEmployee } from '@fless/employee-sdk';

export default defineEmployee({
  id: 'invoice-processing-agent',
  name: 'Accounts Payable Specialist',
  version: '1.0.0',
  department: 'FINANCE',
  requiredPackages: ['@fless/documents'],
  capabilities: ['documents.ocr', 'documents.structured_extract'],
  systemPrompt: 'Extract line items and totals accurately from receipts and invoices.',
  tools: ['documents.extractStructuredData'],
});`,
  },
];

// --- Navigation Section Definition ---
interface NavItem {
  id: string;
  title: string;
  badge?: string;
  icon: typeof Cpu;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const NAV_SECTIONS: NavSection[] = [
  {
    title: "Getting Started",
    items: [
      { id: "intro", title: "Introduction & Architecture", icon: Compass },
      { id: "quickstart", title: "5-Minute Quickstart", icon: Terminal },
      { id: "single-sdk", title: "Single SDK Model", icon: Layers },
    ],
  },
  {
    title: "Manifest Reference Data",
    items: [
      { id: "ref-pricing", title: "Pricing Models & Usage Units", badge: "Config", icon: DollarSign },
      { id: "ref-countries", title: "Countries & ISO Codes", icon: Flag },
      { id: "ref-industries", title: "Industries & Business Types", icon: Building2 },
      { id: "ref-languages", title: "Supported Languages", icon: Languages },
      { id: "ref-departments", title: "Departments & Roles", icon: Briefcase },
      { id: "ref-capabilities", title: "Canonical Capabilities", icon: Tag },
      { id: "ref-model-tiers", title: "Model Tiers & Latency", icon: Gauge },
    ],
  },
  {
    title: "The Employee SDK",
    items: [
      { id: "sdk-overview", title: "SDK Overview & Install", icon: BookOpen },
      { id: "define-employee", title: "defineEmployee()", icon: Code2 },
      { id: "define-agent", title: "defineAgent()", icon: Users },
      { id: "create-employee", title: "createEmployee() Builder", icon: Sliders },
      { id: "sandbox-runner", title: "EmployeeSandboxRunner", icon: Play },
      { id: "sdk-types", title: "TypeScript Types", icon: FileCode },
    ],
  },
  {
    title: "Core Capabilities",
    items: [
      { id: "rag-knowledge", title: "RAG Multi-Modal Knowledge", icon: Database },
      { id: "multi-agent", title: "Multi-Agent Teams & Supervisor", icon: Network },
      { id: "skills-workflows", title: "Skills & Procedures", icon: Zap },
      { id: "security-boundaries", title: "Security & Zero Secret Access", icon: ShieldCheck },
      { id: "evaluations", title: "Sandbox Evaluations", icon: CheckCircle2 },
      { id: "publishing", title: "Marketplace Publishing", icon: Workflow },
    ],
  },
  {
    title: "Official Managed Plugins",
    items: OFFICIAL_PLUGINS.map((p) => ({
      id: `plugin-${p.id}`,
      title: p.displayName,
      badge: `${p.tools.length} tools`,
      icon: p.icon,
    })),
  },
];

// --- Custom Code Block with Brand Copy Button ---
function CodeBlock({ code, language = "typescript" }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-4 rounded-xl overflow-hidden border border-border/80 bg-[#0B0F19] text-neutral-100 font-mono text-[13px] shadow-sm">
      <div className="flex items-center justify-between px-4 py-2 bg-[#111726] border-b border-neutral-800/80 text-[11px] text-neutral-400">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="uppercase tracking-wider font-semibold ml-2 text-primary">{language}</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md hover:bg-neutral-800 text-neutral-300 transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
      <div className="p-4 overflow-x-auto leading-relaxed">
        <pre>{code}</pre>
      </div>
    </div>
  );
}

// --- Interactive Live Tool Simulator ---
function ToolSimulator({ tool }: { tool: ToolSpec }) {
  const [isRunning, setIsRunning] = useState(false);
  const [hasRun, setHasRun] = useState(false);
  const [executionLatency, setExecutionLatency] = useState(0);

  const handleRun = () => {
    setIsRunning(true);
    const latency = Math.floor(Math.random() * 70) + 110;
    setTimeout(() => {
      setExecutionLatency(latency);
      setIsRunning(false);
      setHasRun(true);
    }, 380);
  };

  return (
    <div className="p-5 rounded-2xl border border-primary/20 bg-primary/[0.02] dark:bg-night space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-semibold text-primary">{tool.toolId}</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              Hermetic Sandbox Ready
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">{tool.description}</p>
        </div>

        <button
          onClick={handleRun}
          disabled={isRunning}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-primary text-primary-foreground font-semibold text-xs shadow-sm shadow-primary/20 hover:bg-primary-hover disabled:opacity-50 transition-all self-start sm:self-auto"
        >
          {isRunning ? (
            <>
              <Activity className="w-3.5 h-3.5 animate-spin" />
              <span>Simulating...</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5" />
              <span>Simulate Tool Call</span>
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 flex items-center justify-between">
            <span>Input Request Payload</span>
            <span className="text-[10px] text-muted-foreground font-mono">TypeScript / JSON</span>
          </div>
          <CodeBlock code={JSON.stringify(tool.examplePayload, null, 2)} language="json" />
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 flex items-center justify-between">
            <span>Simulated Gateway Output</span>
            {hasRun && (
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">
                ✓ 200 OK • {executionLatency}ms
              </span>
            )}
          </div>
          <CodeBlock code={JSON.stringify(tool.exampleResponse, null, 2)} language="json" />
        </div>
      </div>
    </div>
  );
}

export default function DocsPage() {
  const [activePageId, setActivePageId] = useState<string>("intro");
  const [searchQuery, setSearchQuery] = useState("");
  const [activePluginTab, setActivePluginTab] = useState<"overview" | "simulator" | "code">("overview");

  // Flattened nav items for next/prev paging
  const allNavItems = useMemo(() => {
    return NAV_SECTIONS.flatMap((s) => s.items);
  }, []);

  const currentIndex = allNavItems.findIndex((item) => item.id === activePageId);
  const prevPage = currentIndex > 0 ? allNavItems[currentIndex - 1] : null;
  const nextPage = currentIndex < allNavItems.length - 1 ? allNavItems[currentIndex + 1] : null;

  // Selected plugin (if active page is a plugin)
  const activePlugin = useMemo(() => {
    if (activePageId.startsWith("plugin-")) {
      const pluginId = activePageId.replace("plugin-", "");
      return OFFICIAL_PLUGINS.find((p) => p.id === pluginId) || null;
    }
    return null;
  }, [activePageId]);

  // Filtered navigation based on search query
  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return NAV_SECTIONS;
    const q = searchQuery.toLowerCase();
    return NAV_SECTIONS.map((section) => ({
      ...section,
      items: section.items.filter((item) => item.title.toLowerCase().includes(q)),
    })).filter((section) => section.items.length > 0);
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <Header activePage="docs" />

      {/* Docs Header Bar */}
      <div className="pt-24 pb-8 border-b border-border/60 bg-gradient-to-b from-brand-soft/40 via-background to-background dark:from-night dark:via-background dark:to-background">
        <div className="max-w-[1350px] mx-auto px-6 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-semibold uppercase tracking-wider">
                <Terminal className="w-3.5 h-3.5" />
                Builder Documentation • @fless/employee-sdk
              </div>
              <h1 className="text-2xl sm:text-4xl font-display font-semibold tracking-tight text-foreground">
                Builder Documentation & Technical Reference
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl">
                The comprehensive technical guide for authoring, testing, and distributing autonomous AI employees using <code className="font-mono text-primary font-semibold">@fless/employee-sdk</code>.
              </p>
            </div>

            {/* Quick Search Filter */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter documentation topics..."
                className="w-full h-10 pl-9 pr-4 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
              />
            </div>
          </div>

          {/* Builder Quick Navigation Pill Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
            <button
              onClick={() => setActivePageId("quickstart")}
              className="p-3.5 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-primary/[0.04] text-left transition-all group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-[11px] font-mono text-primary font-semibold">01. QUICKSTART</span>
                <ChevronRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-transform" />
              </div>
              <div className="font-semibold text-xs text-foreground mt-2">5-Min First Employee</div>
              <p className="text-[11px] text-muted-foreground mt-0.5">Scaffold, simulate, and verify offline</p>
            </button>

            <button
              onClick={() => setActivePageId("sdk-overview")}
              className="p-3.5 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-primary/[0.04] text-left transition-all group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-[11px] font-mono text-emerald-500 font-semibold">02. SDK API</span>
                <ChevronRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <div className="font-semibold text-xs text-foreground mt-2">defineEmployee() & Types</div>
              <p className="text-[11px] text-muted-foreground mt-0.5">Typed manifest schema & builders</p>
            </button>

            <button
              onClick={() => setActivePageId("plugin-whatsapp")}
              className="p-3.5 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-primary/[0.04] text-left transition-all group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-[11px] font-mono text-amber-500 font-semibold">03. PLUGINS</span>
                <ChevronRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-amber-500 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <div className="font-semibold text-xs text-foreground mt-2">Official Managed Plugins</div>
              <p className="text-[11px] text-muted-foreground mt-0.5">WhatsApp, Calendar, CRM, Voice</p>
            </button>

            <button
              onClick={() => setActivePageId("ref-pricing")}
              className="p-3.5 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-primary/[0.04] text-left transition-all group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-[11px] font-mono text-purple-500 font-semibold">04. MONETIZATION</span>
                <ChevronRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-purple-500 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <div className="font-semibold text-xs text-foreground mt-2">35/65 Payout Models</div>
              <p className="text-[11px] text-muted-foreground mt-0.5">Recurring & metered rate units</p>
            </button>
          </div>
        </div>
      </div>

      {/* Unified Documentation Workspace: Left Sidebar + Main Content */}
      <div className="flex-1 max-w-[1350px] mx-auto px-6 w-full py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Unified Side Tabs Navigation */}
        <aside className="lg:col-span-3 space-y-6">
          <div className="sticky top-28 space-y-6 max-h-[calc(100vh-130px)] overflow-y-auto pr-2 scrollbar-thin">
            {filteredSections.map((section) => (
              <div key={section.title} className="space-y-1">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground px-3 mb-2">
                  {section.title}
                </div>
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activePageId === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActivePageId(item.id);
                        setActivePluginTab("overview");
                      }}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-2 rounded-xl text-[13px] font-medium transition-all text-left",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20 font-semibold"
                          : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                      )}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <Icon className="w-4 h-4 shrink-0" />
                        <span className="truncate">{item.title}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={cn(
                            "px-1.5 py-0.5 rounded text-[10px] font-mono shrink-0 ml-1.5",
                            isActive ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}

            {/* Quick npm Link Box */}
            <div className="p-4 rounded-2xl border border-border/80 bg-brand-soft/25 dark:bg-night space-y-2 text-xs">
              <div className="font-semibold text-foreground flex items-center gap-1.5">
                <Boxes className="w-3.5 h-3.5 text-primary" />
                npm Package Registry
              </div>
              <p className="text-muted-foreground leading-normal">
                Install the official developer SDK to author and test AI employees:
              </p>
              <div className="pt-1">
                <a
                  href="https://www.npmjs.com/package/@fless/employee-sdk"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-primary font-semibold hover:underline"
                >
                  @fless/employee-sdk <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Pane */}
        <main className="lg:col-span-9 space-y-10 min-w-0">
          {/* SECTION: INTRO */}
          {activePageId === "intro" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">Overview</span>
                <h2 className="text-3xl font-display font-semibold tracking-tight text-foreground">
                  Fless Platform Overview & Architecture
                </h2>
                <p className="text-muted-foreground text-base leading-relaxed">
                  Fless is an infrastructure and distribution platform for autonomous AI employees. Businesses hire modular AI workers for departments like Voice, Marketing, Operations, and Support, while developers author, evaluate, and monetize custom employees via `@fless/employee-sdk`.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-5 rounded-2xl border border-primary/30 bg-background space-y-2">
                  <div className="font-bold text-foreground flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-primary" />
                    Multi-Agent Core
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Coordinate teams of specialist sub-agents with dedicated roles, models, and tools using supervisor or pipeline workflows.
                  </p>
                </div>

                <div className="p-5 rounded-2xl border border-emerald-500/30 bg-background space-y-2">
                  <div className="font-bold text-foreground flex items-center gap-2">
                    <Layers className="w-4 h-4 text-emerald-500" />
                    Authoring SDK & Sandbox
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Install <code className="font-mono text-primary">@fless/employee-sdk</code> to define manifests, tool permissions, and hermetic sandbox test suites.
                  </p>
                </div>

                <div className="p-5 rounded-2xl border border-amber-500/30 bg-background space-y-2">
                  <div className="font-bold text-foreground flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-amber-500" />
                    35/65 Creator Payouts
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Earn 35% of monthly subscriptions and metered token usage fees automatically when businesses hire your verified AI workers.
                  </p>
                </div>
              </div>

              {/* 4-Layer Platform Stack */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-display font-semibold text-foreground flex items-center gap-2">
                    <Boxes className="w-5 h-5 text-primary" />
                    The 4 Platform Architecture Layers
                  </h3>
                  <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                    NVIDIA Inception Member
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-5 rounded-2xl border border-border bg-card space-y-3 relative overflow-hidden">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-primary/10 text-primary">Layer 1</span>
                      <h4 className="font-semibold text-foreground">Accelerated Compute Infrastructure</h4>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      GPU-accelerated inference cluster optimized with TensorRT-LLM and vLLM pipelines. Provides sub-50ms TTFT streaming endpoints for voice synthesis and real-time tool calls.
                    </p>
                    <div className="text-[11px] text-muted-foreground font-mono bg-muted/50 p-2.5 rounded-xl border border-border/50">
                      NVIDIA Tensor Core GPUs • vLLM Engine • WebRTC / gRPC Low Latency
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl border border-border bg-card space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-500">Layer 2</span>
                      <h4 className="font-semibold text-foreground">Fless SDK & Runtime Engine</h4>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Developer tooling and runtime framework. Exposes <code className="font-mono text-primary">defineEmployee()</code>, stateful execution context, multi-agent supervisors, and dynamic tool bindings.
                    </p>
                    <div className="text-[11px] text-muted-foreground font-mono bg-muted/50 p-2.5 rounded-xl border border-border/50">
                      @fless/employee-sdk • Supervisor Runtime • Tool Permission Gatekeeper
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl border border-border bg-card space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/10 text-amber-500">Layer 3</span>
                      <h4 className="font-semibold text-foreground">Employee Registry & Sandbox Engine</h4>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Hermetic testbed and verification registry. Runs automated multi-turn synthetic workloads, verifies tool mock adapters, and grades builds across an 11-dimension rubric.
                    </p>
                    <div className="text-[11px] text-muted-foreground font-mono bg-muted/50 p-2.5 rounded-xl border border-border/50">
                      Risk Gates (LOW → CRITICAL) • Hermetic Mock Adapters • 11-Dimension Rubric
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl border border-border bg-card space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-500/10 text-purple-500">Layer 4</span>
                      <h4 className="font-semibold text-foreground">AI Workforce Marketplace</h4>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Global distribution network for enterprise hiring. Enforces zero-trust business sandboxes, customer data isolation, and metered subscription billing.
                    </p>
                    <div className="text-[11px] text-muted-foreground font-mono bg-muted/50 p-2.5 rounded-xl border border-border/50">
                      Enterprise Marketplace • Multi-Tenant Isolation • Automatic Payouts
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-border bg-brand-soft/20 dark:bg-night space-y-3">
                <h3 className="text-sm font-semibold text-foreground">Quick Navigation</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Check out the 5-Minute Quickstart to build an employee manifest, or explore the Manifest Reference Data to see all supported countries, industries, pricing models, and capabilities.
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    onClick={() => setActivePageId("quickstart")}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-semibold text-xs shadow-sm hover:bg-primary-hover transition-colors"
                  >
                    5-Minute Quickstart →
                  </button>
                  <button
                    onClick={() => setActivePageId("ref-pricing")}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border bg-background text-foreground font-semibold text-xs hover:bg-muted transition-colors"
                  >
                    Pricing & Units Reference →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: QUICKSTART */}
          {activePageId === "quickstart" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">Get Started</span>
                <h2 className="text-3xl font-display font-semibold tracking-tight text-foreground">
                  5-Minute Builder Quickstart
                </h2>
                <p className="text-muted-foreground text-base">
                  Author, simulate, and verify a production-ready AI employee in 3 simple steps.
                </p>
              </div>

              <div className="space-y-6">
                <div className="p-5 rounded-2xl border border-border bg-background space-y-3">
                  <div className="flex items-center gap-2 font-semibold text-foreground">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-mono text-xs">1</span>
                    Install the SDK
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Install the official authoring package in your TypeScript workspace:
                  </p>
                  <CodeBlock code="npm install @fless/employee-sdk @fless/contracts" language="bash" />
                </div>

                <div className="p-5 rounded-2xl border border-border bg-background space-y-3">
                  <div className="flex items-center gap-2 font-semibold text-foreground">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-mono text-xs">2</span>
                    Create Your Employee Manifest
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Create <code className="font-mono text-primary">employee.ts</code> with your prompt, pricing, plugins, and knowledge:
                  </p>
                  <CodeBlock
                    code={`import { defineEmployee } from '@fless/employee-sdk';

export default defineEmployee({
  id: 'clinic-front-desk',
  name: 'Clinic Front-Desk Receptionist',
  version: '1.0.0',
  department: 'VOICE',
  targetMarket: {
    industries: ['Healthcare'],
    countries: ['NG', 'GH', 'KE'],
    businessTypes: ['Clinic', 'Hospital'],
    languages: ['en', 'pcm'],
  },
  pricing: {
    model: 'BASE_PLUS_USAGE',
    basePriceCents: 4900, // $49/mo
    billingInterval: 'MONTHLY',
    currency: 'USD',
    usageRates: [
      { eventType: 'VOICE_CALL_MINUTE', unitPriceCents: 15, includedUnits: 300 },
    ],
  },
  capabilities: ['voice.inbound', 'calendar.availability', 'calendar.booking', 'crm.sync'],
  requiredPackages: ['@fless/voice', '@fless/google-calendar', '@fless/crm'],
  
  knowledge: [
    {
      id: 'clinic-hours-faq',
      name: 'Clinic Hours & Doctor List',
      type: 'TEXT',
      country: 'NG',
      industry: 'Healthcare',
      content: 'Clinic is open Monday-Saturday 8am to 6pm. Dr. Okonjo handles dentistry.',
    },
  ],

  systemPrompt: \`You are an empathetic, efficient clinic receptionist. 
You book patient consultations, triage inquiries, and warm transfer emergencies.\`,
  tools: [
    'voice.transfer',
    'calendar.checkAvailability',
    'calendar.bookAppointment',
    'crm.lookupContact',
    'crm.syncLead',
  ],
});`}
                    language="typescript"
                  />
                </div>

                <div className="p-5 rounded-2xl border border-border bg-background space-y-3">
                  <div className="flex items-center gap-2 font-semibold text-foreground">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-mono text-xs">3</span>
                    Simulate Locally Offline
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Run local simulations without needing API keys or live credentials:
                  </p>
                  <CodeBlock
                    code={`import { EmployeeSandboxRunner } from '@fless/employee-sdk';
import employee from './employee';

async function testLocally() {
  const runner = new EmployeeSandboxRunner(employee);
  const result = await runner.simulateMessage({
    role: 'user',
    content: 'Do you have slots for dental cleaning this Friday at 2 PM?',
  });

  console.log('AI Response:', result.text);
  console.log('Executed Tools:', result.executedTools);
}

testLocally();`}
                    language="typescript"
                  />
                </div>
              </div>
            </div>
          )}

          {/* SECTION: SINGLE SDK MODEL */}
          {activePageId === "single-sdk" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">Architecture</span>
                <h2 className="text-3xl font-display font-semibold tracking-tight text-foreground">
                  The Single SDK Model
                </h2>
                <p className="text-muted-foreground text-base leading-relaxed">
                  Why builders only install <code className="font-mono text-primary font-semibold">@fless/employee-sdk</code> and never have to manage separate packages for plugins.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-primary/30 bg-background space-y-3 text-sm">
                <div className="font-semibold text-foreground flex items-center gap-2">
                  <CheckCheck className="w-4 h-4 text-primary" />
                  Everything in One Package
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  When you build an AI employee, you import manifest builders and test harnesses directly from <code className="font-mono text-primary">@fless/employee-sdk</code>. You don&apos;t install separate npm modules for WhatsApp, Slack, or Google Calendar. Instead, you declare official plugin IDs in your manifest&apos;s <code className="font-mono text-primary">requiredPackages</code> array.
                </p>
                <div className="pt-2 text-xs font-mono text-muted-foreground bg-muted/60 p-3 rounded-xl">
                  requiredPackages: [&apos;@fless/whatsapp&apos;, &apos;@fless/google-calendar&apos;, &apos;@fless/crm&apos;]
                </div>
              </div>
            </div>
          )}

          {/* SECTION: PRICING CONFIGURATION */}
          {activePageId === "ref-pricing" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">Manifest Reference</span>
                <h2 className="text-3xl font-display font-semibold tracking-tight text-foreground">
                  Pricing Models & Usage Units Reference
                </h2>
                <p className="text-muted-foreground text-base leading-relaxed">
                  How creators configure monetized AI employees with subscription plans, metered event rates, and automatic 35/65 payouts.
                </p>
              </div>

              {/* Pricing Models Table */}
              <div className="space-y-3">
                <h3 className="text-base font-semibold text-foreground">1. Supported Pricing Models (<code className="font-mono text-primary text-xs">pricing.model</code>)</h3>
                <div className="border border-border/80 rounded-2xl overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-muted/60 text-muted-foreground border-b border-border/80">
                      <tr>
                        <th className="p-3">Model Enum</th>
                        <th className="p-3">Billing Behavior</th>
                        <th className="p-3">Ideal Use Case</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      <tr>
                        <td className="p-3 font-mono font-semibold text-primary">SUBSCRIPTION</td>
                        <td className="p-3 text-muted-foreground">Fixed flat recurring charge per interval (e.g. $49/month) with unlimited or fair-use quota.</td>
                        <td className="p-3 text-muted-foreground">Marketing managers, social media autopilots, compliance monitors.</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-semibold text-primary">BASE_PLUS_USAGE</td>
                        <td className="p-3 text-muted-foreground">Base monthly retainer + metered overages per completed unit above included quota.</td>
                        <td className="p-3 text-muted-foreground">Inbound phone receptionists (e.g. $49/mo + $0.15/min over 300 mins).</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-semibold text-primary">TASK</td>
                        <td className="p-3 text-muted-foreground">Purely pay-per-unit charge executed on demand (e.g. $1.50 per verified document).</td>
                        <td className="p-3 text-muted-foreground">Invoice OCR parsers, candidate vetting agents, KYC processors.</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-semibold text-primary">HOURLY</td>
                        <td className="p-3 text-muted-foreground">Metered strictly by active shift duration logged by the AI employee.</td>
                        <td className="p-3 text-muted-foreground">Live chat shift support agents, outbound calling campaign operators.</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-semibold text-primary">EVENT_DRIVEN</td>
                        <td className="p-3 text-muted-foreground">Charges triggered on explicit success webhook events (e.g. booked appointments).</td>
                        <td className="p-3 text-muted-foreground">Sales appointment setters, high-value lead qualifiers.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Usage Event Types */}
              <div className="space-y-3">
                <h3 className="text-base font-semibold text-foreground">2. Usage Event Types (<code className="font-mono text-primary text-xs">usageRates[].eventType</code>)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  {[
                    { type: "VOICE_CALL_MINUTE", desc: "Metered per active minute of inbound or outbound telephony voice streaming." },
                    { type: "INVOICE_PROCESSED", desc: "Metered per financial document, PDF, or receipt scanned and parsed." },
                    { type: "CHAT_MESSAGE", desc: "Metered per inbound/outbound WhatsApp, Slack, or web conversation turn." },
                    { type: "LEAD_QUALIFIED", desc: "Metered per sales contact evaluated, enriched, and synced to CRM." },
                    { type: "EMAIL_SENT", desc: "Metered per transactional or follow-up email drafted and delivered." },
                    { type: "DOCUMENT_PARSED", desc: "Metered per legal agreement, KYC ID card, or medical form ingested." },
                    { type: "SMS_SENT", desc: "Metered per SMS notification or OTP dispatch." },
                    { type: "TASK_COMPLETED", desc: "Metered per complex multi-step automated operational workflow." },
                  ].map((item) => (
                    <div key={item.type} className="p-3.5 rounded-xl border border-border bg-background space-y-1">
                      <div className="font-mono font-semibold text-primary">{item.type}</div>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Currencies & Intervals */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl border border-border bg-background space-y-2">
                  <div className="font-semibold text-foreground">Supported Currencies (<code className="font-mono text-primary">currency</code>)</div>
                  <div className="flex flex-wrap gap-1 font-mono text-[11px]">
                    {["USD", "NGN", "GBP", "EUR", "KES", "GHS", "ZAR", "CAD", "AUD", "AED"].map((c) => (
                      <span key={c} className="px-2 py-0.5 rounded bg-muted text-foreground">{c}</span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-border bg-background space-y-2">
                  <div className="font-semibold text-foreground">Billing Intervals (<code className="font-mono text-primary">billingInterval</code>)</div>
                  <div className="flex flex-wrap gap-1 font-mono text-[11px]">
                    {["MONTHLY", "WEEKLY", "ANNUAL", "ONE_TIME"].map((bi) => (
                      <span key={bi} className="px-2 py-0.5 rounded bg-muted text-foreground">{bi}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Payout Structure */}
              <div className="p-5 rounded-2xl border border-emerald-500/25 bg-emerald-500/[0.04] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="font-semibold text-foreground text-sm">Automatic 35/65 Creator Payouts</div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Creators receive 35% of all gross subscription and usage revenues. Flessretains 65% for infrastructure, gateway hosting, and billing operations.
                  </p>
                </div>
                <div className="px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-mono font-bold text-xs shrink-0">
                  35% Creator / 65% Platform
                </div>
              </div>
            </div>
          )}

          {/* SECTION: COUNTRIES & ISO CODES */}
          {activePageId === "ref-countries" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">Manifest Reference</span>
                <h2 className="text-3xl font-display font-semibold tracking-tight text-foreground">
                  Supported Countries & ISO Alpha-2 Codes
                </h2>
                <p className="text-muted-foreground text-base leading-relaxed">
                  Used in <code className="font-mono text-primary text-xs">targetMarket.countries</code> and knowledge source filters (<code className="font-mono text-primary text-xs">knowledge[].country</code>) to ground AI employees with localized regulations and phone numbers.
                </p>
              </div>

              <div className="border border-border/80 rounded-2xl overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead className="bg-muted/60 text-muted-foreground border-b border-border/80">
                    <tr>
                      <th className="p-3">Country Name</th>
                      <th className="p-3">ISO Code</th>
                      <th className="p-3">Default Currency</th>
                      <th className="p-3">Phone Prefix</th>
                      <th className="p-3">Regional Regulatory Context</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {[
                      { name: "Nigeria", code: "NG", curr: "NGN", prefix: "+234", notes: "CBN AML/KYC directives, NDPR data privacy compliance" },
                      { name: "Ghana", code: "GH", curr: "GHS", prefix: "+233", notes: "BoG Fintech guidelines, Data Protection Act" },
                      { name: "Kenya", code: "KE", curr: "KES", prefix: "+254", notes: "CBK mobile payment & data protection frameworks" },
                      { name: "South Africa", code: "ZA", curr: "ZAR", prefix: "+27", notes: "POPIA compliance, SARB financial regulations" },
                      { name: "United States", code: "US", curr: "USD", prefix: "+1", notes: "HIPAA (Healthcare), SEC/FINRA (Fintech), FCC TCPA" },
                      { name: "United Kingdom", code: "GB", curr: "GBP", prefix: "+44", notes: "UK GDPR, FCA compliance, NHS scheduling formats" },
                      { name: "Canada", code: "CA", curr: "CAD", prefix: "+1", notes: "PIPEDA privacy compliance, FINTRAC regulations" },
                      { name: "Germany", code: "DE", curr: "EUR", prefix: "+49", notes: "EU GDPR, BaFin financial directives" },
                      { name: "France", code: "FR", curr: "EUR", prefix: "+33", notes: "EU GDPR, CNIL regulatory compliance" },
                      { name: "United Arab Emirates", code: "AE", curr: "AED", prefix: "+971", notes: "CBUAE fintech framework, DIFC / ADGM jurisdiction" },
                      { name: "Australia", code: "AU", curr: "AUD", prefix: "+61", notes: "Privacy Act 1988, APRA financial standards" },
                      { name: "India", code: "IN", curr: "INR", prefix: "+91", notes: "DPDP Act, RBI payment aggregator directives" },
                    ].map((c) => (
                      <tr key={c.code}>
                        <td className="p-3 font-medium text-foreground">{c.name}</td>
                        <td className="p-3 font-mono font-bold text-primary">{c.code}</td>
                        <td className="p-3 font-mono text-muted-foreground">{c.curr}</td>
                        <td className="p-3 font-mono text-muted-foreground">{c.prefix}</td>
                        <td className="p-3 text-muted-foreground">{c.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SECTION: INDUSTRIES & BUSINESS TYPES */}
          {activePageId === "ref-industries" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">Manifest Reference</span>
                <h2 className="text-3xl font-display font-semibold tracking-tight text-foreground">
                  Target Industries & Business Types
                </h2>
                <p className="text-muted-foreground text-base leading-relaxed">
                  Use these canonical strings in <code className="font-mono text-primary text-xs">targetMarket.industries</code> and <code className="font-mono text-primary text-xs">targetMarket.businessTypes</code> so the marketplace can accurately match your AI employee with hiring businesses.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {[
                  {
                    industry: "Healthcare",
                    types: ["Clinic", "Hospital", "Dental Practice", "Pharmacy", "Diagnostic Lab", "Telehealth Clinic", "Physiotherapy"],
                  },
                  {
                    industry: "Fintech & Financial Services",
                    types: ["Digital Bank", "Microfinance Institution", "Lending Platform", "Insurance Agency", "Payment Processor", "Accounting Firm"],
                  },
                  {
                    industry: "Real Estate & Property",
                    types: ["Real Estate Agency", "Property Management", "Short-Let / Airbnb Operator", "Commercial Leasing", "Construction Firm"],
                  },
                  {
                    industry: "E-Commerce & Retail",
                    types: ["Online Store", "Fashion Brand", "Electronics Retailer", "FMCG Distributor", "Multi-Vendor Marketplace", "Beauty & Cosmetics"],
                  },
                  {
                    industry: "Hospitality & Travel",
                    types: ["Hotel & Resort", "Restaurant & Cafe", "Tour Operator", "Short-Term Rental", "Event Venue", "Travel Agency"],
                  },
                  {
                    industry: "Legal & Professional Services",
                    types: ["Law Firm", "Corporate Registry", "Notary Service", "Audit Agency", "HR & Recruitment Consultancy"],
                  },
                  {
                    industry: "Logistics & Supply Chain",
                    types: ["Courier & Delivery Service", "Freight Forwarder", "Warehousing & Fulfillment", "Fleet Management"],
                  },
                  {
                    industry: "Education & Training",
                    types: ["Online Academy", "Private K-12 School", "Tutoring Center", "Higher Ed Institution", "Corporate Training"],
                  },
                  {
                    industry: "Automotive",
                    types: ["Dealership", "Auto Repair & Service", "Car Rental Agency", "Spare Parts Distributor"],
                  },
                ].map((item) => (
                  <div key={item.industry} className="p-4 rounded-2xl border border-border bg-background space-y-2 shadow-sm">
                    <div className="font-semibold text-foreground flex items-center gap-1.5 text-sm">
                      <Building2 className="w-4 h-4 text-primary" />
                      {item.industry}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {item.types.map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded bg-muted text-muted-foreground font-mono text-[11px]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION: LANGUAGES */}
          {activePageId === "ref-languages" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">Manifest Reference</span>
                <h2 className="text-3xl font-display font-semibold tracking-tight text-foreground">
                  Supported Languages & BCP-47 Codes
                </h2>
                <p className="text-muted-foreground text-base leading-relaxed">
                  Use in <code className="font-mono text-primary text-xs">targetMarket.languages</code> to declare the conversational languages your AI employee supports in chat and voice telephony.
                </p>
              </div>

              <div className="border border-border/80 rounded-2xl overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead className="bg-muted/60 text-muted-foreground border-b border-border/80">
                    <tr>
                      <th className="p-3">Language</th>
                      <th className="p-3">BCP-47 / ISO Code</th>
                      <th className="p-3">Chat Support</th>
                      <th className="p-3">Voice Telephony Synthesis</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {[
                      { lang: "English", code: "en", chat: "Full", voice: "Native Accents (US, UK, Nigerian, Ghanaian, Kenyan, Indian, Aussie)" },
                      { lang: "Nigerian Pidgin", code: "pcm", chat: "Full", voice: "Native West African Pidgin Voice Model" },
                      { lang: "Yoruba", code: "yo", chat: "Full", voice: "High Quality Tone-Accented Voice Model" },
                      { lang: "Hausa", code: "ha", chat: "Full", voice: "Northern Nigerian & Sahel Voice Model" },
                      { lang: "Igbo", code: "ig", chat: "Full", voice: "Eastern Nigerian Dialect Voice Model" },
                      { lang: "French", code: "fr", chat: "Full", voice: "Standard European & West African Francophone Voices" },
                      { lang: "Spanish", code: "es", chat: "Full", voice: "Latin American & European Spanish" },
                      { lang: "Arabic", code: "ar", chat: "Full", voice: "Modern Standard & Gulf Arabic" },
                      { lang: "Swahili", code: "sw", chat: "Full", voice: "East African Standard Swahili" },
                      { lang: "German", code: "de", chat: "Full", voice: "Standard German" },
                      { lang: "Portuguese", code: "pt", chat: "Full", voice: "Brazilian & European Portuguese" },
                    ].map((l) => (
                      <tr key={l.code}>
                        <td className="p-3 font-medium text-foreground">{l.lang}</td>
                        <td className="p-3 font-mono font-bold text-primary">{l.code}</td>
                        <td className="p-3 text-emerald-600 dark:text-emerald-400 font-semibold">{l.chat}</td>
                        <td className="p-3 text-muted-foreground">{l.voice}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SECTION: DEPARTMENTS */}
          {activePageId === "ref-departments" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">Manifest Reference</span>
                <h2 className="text-3xl font-display font-semibold tracking-tight text-foreground">
                  Departments & Roles Reference
                </h2>
                <p className="text-muted-foreground text-base leading-relaxed">
                  Use in <code className="font-mono text-primary text-xs">department</code> to categorize which organizational desk your AI employee operates in.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                {[
                  { dept: "VOICE", desc: "Inbound phone reception, cold outbound dialing, consultation booking, warm call transfers." },
                  { dept: "MARKETING", desc: "Social media publishing, Meta ad campaign monitoring, copy creation, audience engagement." },
                  { dept: "SALES", desc: "Inbound lead qualification, CRM deal pipeline management, outbound prospecting." },
                  { dept: "SUPPORT", desc: "WhatsApp customer triage, multi-channel ticketing, appointment rescheduling." },
                  { dept: "OPERATIONS", desc: "Internal team dispatching, Slack escalation management, logistics tracking." },
                  { dept: "FINANCE", desc: "Accounts payable, invoice parsing, receipt scanning, payment status checks." },
                  { dept: "COMPLIANCE", desc: "KYC verification, AML monitoring, regulatory policy guidance." },
                  { dept: "LEGAL", desc: "Contract metadata extraction, NDA review assistance, policy clause checks." },
                  { dept: "HR", desc: "Candidate intake, interview scheduling, employee onboarding FAQs." },
                ].map((item) => (
                  <div key={item.dept} className="p-4 rounded-xl border border-border bg-background space-y-1.5 shadow-sm">
                    <div className="font-mono font-bold text-primary text-sm">{item.dept}</div>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION: CAPABILITIES */}
          {activePageId === "ref-capabilities" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">Manifest Reference</span>
                <h2 className="text-3xl font-display font-semibold tracking-tight text-foreground">
                  Canonical Capabilities Reference
                </h2>
                <p className="text-muted-foreground text-base leading-relaxed">
                  Declare these capability identifiers in <code className="font-mono text-primary text-xs">capabilities</code> to define what your AI employee is authorized to perform.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    category: "Voice Telephony",
                    items: [
                      { id: "voice.inbound", name: "Answer Inbound Calls", desc: "Receives real-time telephone calls with sub-500ms voice synthesis." },
                      { id: "voice.outbound", name: "Place Outbound Calls", desc: "Places phone calls to customer contact lists." },
                      { id: "voice.transfer", name: "Warm Call Transfer", desc: "Transfers live calls to human staff phone numbers." },
                    ],
                  },
                  {
                    category: "Calendar & Scheduling",
                    items: [
                      { id: "calendar.availability", name: "Check Availability", desc: "Queries open calendar slots across team calendars." },
                      { id: "calendar.booking", name: "Book Appointments", desc: "Creates confirmed events and dispatches invites." },
                      { id: "calendar.reschedule", name: "Reschedule Appointments", desc: "Modifies or cancels existing bookings." },
                    ],
                  },
                  {
                    category: "CRM & Contacts",
                    items: [
                      { id: "crm.contact_lookup", name: "Contact Record Lookup", desc: "Retrieves customer profile and past interaction history." },
                      { id: "crm.lead_sync", name: "Sync Lead Pipeline", desc: "Updates deal stages and customer interaction notes." },
                    ],
                  },
                  {
                    category: "Messaging & Email",
                    items: [
                      { id: "communication.chat", name: "WhatsApp & Web Chat", desc: "Two-way customer messaging on WhatsApp and live chat." },
                      { id: "communication.email_send", name: "Send Emails", desc: "Dispatches transactional emails, quotes, and follow-ups." },
                      { id: "communication.email_triage", name: "Email Inbox Triage", desc: "Categorizes and summarizes inbound email threads." },
                    ],
                  },
                  {
                    category: "Social & Marketing",
                    items: [
                      { id: "marketing.social_publishing", name: "Publish Social Content", desc: "Publishes posts to Instagram, Facebook, and LinkedIn." },
                      { id: "marketing.ads_management", name: "Manage Ad Campaigns", desc: "Queries metrics and adjusts Meta ad campaign budgets." },
                    ],
                  },
                  {
                    category: "Document Intelligence",
                    items: [
                      { id: "documents.ocr", name: "OCR & Vision Extraction", desc: "Scans PDFs, receipts, and images for raw text and tables." },
                      { id: "documents.structured_extract", name: "Structured JSON Extraction", desc: "Parses documents into validated JSON schemas." },
                    ],
                  },
                ].map((group) => (
                  <div key={group.category} className="space-y-2">
                    <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <Tag className="w-3.5 h-3.5 text-primary" />
                      {group.category}
                    </h3>
                    <div className="border border-border/80 rounded-xl overflow-hidden text-xs">
                      <table className="w-full text-left">
                        <thead className="bg-muted/60 text-muted-foreground border-b border-border/80">
                          <tr>
                            <th className="p-2.5">Capability ID</th>
                            <th className="p-2.5">Name</th>
                            <th className="p-2.5">Description</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border/60">
                          {group.items.map((item) => (
                            <tr key={item.id}>
                              <td className="p-2.5 font-mono font-semibold text-primary">{item.id}</td>
                              <td className="p-2.5 font-medium text-foreground">{item.name}</td>
                              <td className="p-2.5 text-muted-foreground">{item.desc}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION: MODEL TIERS */}
          {activePageId === "ref-model-tiers" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">Manifest Reference</span>
                <h2 className="text-3xl font-display font-semibold tracking-tight text-foreground">
                  Model Tiers & Execution Latency
                </h2>
                <p className="text-muted-foreground text-base leading-relaxed">
                  Use in <code className="font-mono text-primary text-xs">agents[].modelTier</code> to choose the optimal balance of reasoning depth, token cost, and speed.
                </p>
              </div>

              <div className="border border-border/80 rounded-2xl overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead className="bg-muted/60 text-muted-foreground border-b border-border/80">
                    <tr>
                      <th className="p-3">Tier (<code className="font-mono text-primary">modelTier</code>)</th>
                      <th className="p-3">Latency Target</th>
                      <th className="p-3">Best For</th>
                      <th className="p-3">Underlying Model Profile</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {[
                      { tier: "fast", latency: "< 350ms", best: "Triage, intent classification, calendar lookup, simple tool routing", desc: "Ultra-fast low-parameter LLMs optimized for throughput" },
                      { tier: "standard", latency: "600ms - 1.2s", best: "Customer chat, email drafting, WhatsApp support conversations", desc: "Balanced production chat LLM with strong instruction adherence" },
                      { tier: "reasoning", latency: "1.5s - 4.0s", best: "Supervisor lead agents, legal compliance checks, multi-step math", desc: "Deep reasoning LLM with step-by-step chain-of-thought verification" },
                      { tier: "vision", latency: "1.0s - 2.5s", best: "PDF invoice scanning, photo intake, receipt table extraction", desc: "Multimodal vision model for visual document comprehension" },
                      { tier: "voice", latency: "< 250ms (Streaming)", best: "Live telephony phone conversations with real-time interruptions", desc: "Streaming LLM paired directly with real-time audio pipelines" },
                    ].map((m) => (
                      <tr key={m.tier}>
                        <td className="p-3 font-mono font-bold text-primary">{m.tier}</td>
                        <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400 font-semibold">{m.latency}</td>
                        <td className="p-3 text-foreground font-medium">{m.best}</td>
                        <td className="p-3 text-muted-foreground">{m.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SECTION: SDK OVERVIEW */}
          {activePageId === "sdk-overview" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">SDK Reference</span>
                <h2 className="text-3xl font-display font-semibold tracking-tight text-foreground">
                  SDK Overview & Installation
                </h2>
                <p className="text-muted-foreground text-base">
                  Complete reference for authoring and running AI employees in TypeScript.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-border bg-brand-soft/20 dark:bg-night space-y-2">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Installation</div>
                <CodeBlock code="npm install @fless/employee-sdk @fless/contracts" language="bash" />
              </div>

              <div className="space-y-4">
                <h3 className="text-base font-semibold text-foreground">Primary SDK Exports</h3>
                <div className="border border-border/80 rounded-2xl overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-muted/60 text-muted-foreground border-b border-border/80">
                      <tr>
                        <th className="p-3">Export</th>
                        <th className="p-3">Type</th>
                        <th className="p-3">Purpose</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      <tr>
                        <td className="p-3 font-mono font-semibold text-primary">defineEmployee(manifest)</td>
                        <td className="p-3 font-mono text-muted-foreground">Function</td>
                        <td className="p-3 text-muted-foreground">Validates and compiles an AI employee manifest bundle.</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-semibold text-primary">defineAgent(agentSpec)</td>
                        <td className="p-3 font-mono text-muted-foreground">Function</td>
                        <td className="p-3 text-muted-foreground">Defines a specialist internal agent for multi-agent teams.</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-semibold text-primary">createEmployee(id)</td>
                        <td className="p-3 font-mono text-muted-foreground">Builder Factory</td>
                        <td className="p-3 text-muted-foreground">Fluent builder class for assembling AI employees programmatically.</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-semibold text-primary">EmployeeSandboxRunner</td>
                        <td className="p-3 font-mono text-muted-foreground">Class</td>
                        <td className="p-3 text-muted-foreground">Hermetic offline simulation harness for local testing.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: DEFINE EMPLOYEE */}
          {activePageId === "define-employee" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">SDK Method</span>
                <h2 className="text-3xl font-display font-semibold tracking-tight text-foreground">
                  defineEmployee(manifest)
                </h2>
                <p className="text-muted-foreground text-base">
                  The primary factory function for declaring an AI employee.
                </p>
              </div>

              <CodeBlock
                code={`import { defineEmployee } from '@fless/employee-sdk';

export default defineEmployee({
  id: 'sales-qualifier',
  name: 'Inbound Sales Lead Qualifier',
  version: '1.0.0',
  department: 'SALES',
  capabilities: ['crm.contact_lookup', 'crm.lead_sync', 'communication.email_send'],
  requiredPackages: ['@fless/crm', '@fless/mail'],
  systemPrompt: 'Qualify inbound leads and update CRM deal stages.',
  tools: ['crm.lookupContact', 'crm.syncLead', 'mail.sendEmail'],
});`}
                language="typescript"
              />
            </div>
          )}

          {/* SECTION: DEFINE AGENT */}
          {activePageId === "define-agent" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">SDK Method</span>
                <h2 className="text-3xl font-display font-semibold tracking-tight text-foreground">
                  defineAgent(agentSpec)
                </h2>
                <p className="text-muted-foreground text-base">
                  Declares sub-agents for multi-agent supervisor and pipeline team orchestration.
                </p>
              </div>

              <CodeBlock
                code={`import { defineAgent } from '@fless/employee-sdk';

export const bookingSpecialist = defineAgent({
  id: 'booking-specialist',
  name: 'Calendar Booking Specialist',
  role: 'Queries live calendar availability and books confirmed consultation slots.',
  responsibilities: [
    'Check available doctor slots within requested time window',
    'Prevent double bookings',
    'Send calendar invite email to guest',
  ],
  tools: ['calendar.checkAvailability', 'calendar.bookAppointment'],
  modelTier: 'fast',
  systemPrompt: 'Find matching calendar slots quickly and book them with zero friction.',
});`}
                language="typescript"
              />
            </div>
          )}

          {/* SECTION: CREATE EMPLOYEE BUILDER */}
          {activePageId === "create-employee" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">Fluent API</span>
                <h2 className="text-3xl font-display font-semibold tracking-tight text-foreground">
                  createEmployee & createAgent Fluent Builders
                </h2>
                <p className="text-muted-foreground text-base">
                  Programmatically construct multi-agent AI employees, skills, and multi-modal knowledge bases using chainable methods.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl border border-border bg-background space-y-2">
                  <div className="font-semibold text-foreground flex items-center gap-1.5">
                    <Workflow className="w-4 h-4 text-primary" />
                    Agent & Employee Skills
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Attach multiple skills using <code className="font-mono text-primary">.addSkill()</code>, <code className="font-mono text-primary">.addTextSkill()</code>, or <code className="font-mono text-primary">.addUrlSkill()</code> with procedural docs, guidelines, or reference URLs.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-border bg-background space-y-2">
                  <div className="font-semibold text-foreground flex items-center gap-1.5">
                    <Database className="w-4 h-4 text-emerald-500" />
                    Multi-Modal Knowledge Base
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Ground responses with raw text (<code className="font-mono text-primary">.addTextKnowledge()</code>), live documentation URLs (<code className="font-mono text-primary">.addUrlKnowledge()</code>), and PDFs (<code className="font-mono text-primary">.addPdfKnowledge()</code>).
                  </p>
                </div>
              </div>

              <CodeBlock
                code={`import { createEmployee, createAgent } from '@fless/employee-sdk';

// 1. Declare a specialist Scheduling Agent with dedicated skills and knowledge
const schedulingAgent = createAgent('scheduler', 'Appointment Coordinator')
  .setRole('Manages calendar availability and locks doctor bookings')
  .setModelTier('fast')
  .addTools(['calendar.checkAvailability', 'calendar.bookAppointment'])
  .addTextSkill(
    'triage-booking',
    'Patient Booking Protocol',
    'Follows mandatory clinic scheduling rules and buffer times.',
    'Always verify if the patient is a returning or first-time client before locking a 30-minute slot.',
    ['calendar.checkAvailability', 'calendar.bookAppointment']
  )
  .addUrlSkill(
    'insurance-verification',
    'HMO Verification Guide',
    'Validates supported HMO insurance coverage tiers online.',
    'https://docs.clinicnetwork.com/insurance/tiers',
    ['crm.syncLead']
  )
  .addTextKnowledge(
    'clinic-hours',
    'Operating Hours & Holiday Schedule',
    'Mon-Fri: 8:00 AM - 6:00 PM WAT. Sat: 9:00 AM - 2:00 PM WAT. Closed on Public Holidays.',
    { country: 'NG', industry: 'Healthcare' }
  )
  .setSystemPrompt('Coordinate patient intake appointments swiftly and verify insurance requirements.');

// 2. Declare the top-level AI Employee coordinating the workforce
const employee = createEmployee('ng-clinic-concierge')
  .setName('Rachel — Clinic Concierge')
  .setTitle('Healthcare Front-Desk Specialist')
  .setDepartment('VOICE')
  .setCountries(['NG', 'GH'])
  .setIndustries(['Healthcare', 'Clinics'])
  .requirePackages(['@fless/voice', '@fless/google-calendar', '@fless/whatsapp', '@fless/crm'])
  .addAgent(schedulingAgent)
  .setOrchestration('SUPERVISOR', 'scheduler')
  .addUrlKnowledge(
    'clinic-faq-portal',
    'Public Clinic FAQ',
    'https://stnicholasclinic.com/faq',
    { country: 'NG', refreshInterval: 'DAILY' }
  )
  .addPdfKnowledge(
    'clinic-tariff-sheet',
    'Standard Consultation Tariffs 2026',
    'https://storage.fless.app/docs/tariffs-2026.pdf',
    { country: 'NG', industry: 'Healthcare' }
  )
  .setPricing({
    model: 'MONTHLY',
    amountCents: 4900,
    currency: 'USD',
  })
  .setSystemInstructions('Deliver empathetic, professional healthcare reception for Nigerian clinics.')
  .build();

export default employee;`}
                language="typescript"
              />
            </div>
          )}

          {/* SECTION: SANDBOX RUNNER */}
          {activePageId === "sandbox-runner" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">Testing & Verification</span>
                <h2 className="text-3xl font-display font-semibold tracking-tight text-foreground">
                  EmployeeSandboxRunner
                </h2>
                <p className="text-muted-foreground text-base">
                  Test prompt handling, tool invocations, and multi-agent coordination locally without real API credentials.
                </p>
              </div>

              <CodeBlock
                code={`import { EmployeeSandboxRunner } from '@fless/employee-sdk';
import employee from './employee';

async function testRunner() {
  const runner = new EmployeeSandboxRunner(employee);

  // Test standard user message
  const chatResponse = await runner.simulateMessage({
    role: 'user',
    content: 'Can I book a consultation for Friday at 10 AM?',
  });

  console.log('AI Output:', chatResponse.text);
  console.log('Tools Called:', chatResponse.executedTools);

  // Directly execute mock tool call
  const toolResult = await runner.executeToolDirectly('calendar.checkAvailability', {
    startDate: '2026-10-02T08:00:00Z',
    endDate: '2026-10-02T18:00:00Z',
  });

  console.log('Mock Availability Result:', toolResult);
}

testRunner();`}
                language="typescript"
              />
            </div>
          )}

          {/* SECTION: SDK TYPES */}
          {activePageId === "sdk-types" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">Type Definitions</span>
                <h2 className="text-3xl font-display font-semibold tracking-tight text-foreground">
                  TypeScript Types & Interfaces
                </h2>
                <p className="text-muted-foreground text-base">
                  Full TypeScript schemas exported by <code className="font-mono text-primary">@fless/employee-sdk</code> and <code className="font-mono text-primary">@fless/contracts</code>.
                </p>
              </div>

              <CodeBlock
                code={`export type KnowledgeSourceType = 
  | 'TEXT' | 'URL' | 'PDF' | 'DOCUMENT' | 'SITEMAP' | 'MARKDOWN'
  | 'text' | 'url' | 'pdf' | 'document' | 'sitemap' | 'markdown';

export interface KnowledgeSourceSpec {
  id: string;
  name: string;
  type: KnowledgeSourceType;
  description?: string;
  content?: string; // Inline text / Markdown guidelines / SOP
  text?: string;    // Alias for content (inline plain text)
  sourceUri?: string; // Public URL, S3 URI, or document path
  url?: string;       // Alias for sourceUri (public web URL, PDF URL)
  docs?: string;      // Alias for documentation text
  country?: string;   // e.g. 'NG', 'GH', 'US', 'GB'
  industry?: string;  // e.g. 'Healthcare', 'FinTech', 'Legal'
  businessType?: string;
  refreshInterval?: 'STATIC' | 'DAILY' | 'WEEKLY';
  vectorConfig?: {
    topK?: number;
    relevanceThreshold?: number;
    chunkSize?: number;
    chunkOverlap?: number;
  };
}

export interface EmployeeSkillSpec {
  id: string;
  name: string;
  description: string;
  instructions?: string; // Natural language guidelines for executing this skill
  docs?: string;         // Reference documentation / markdown SOP / procedural guide
  text?: string;         // Inline text guidelines
  url?: string;          // Public web URL or online documentation link
  sourceUrl?: string;    // Alias for documentation link
  requiredTools?: string[];
  workflowSteps?: string[];
  triggerConditions?: string[];
}

export interface AgentSpec {
  id: string;
  name: string;
  role: string;
  responsibilities?: string[];
  systemPrompt: string;
  tools?: string[];
  skills?: Array<string | EmployeeSkillSpec>;
  knowledgeSources?: Array<string | KnowledgeSourceSpec>;
  modelTier?: 'fast' | 'standard' | 'reasoning' | 'vision' | 'voice';
  temperature?: number;
  maxSteps?: number;
}

export interface EmployeeManifest {
  id: string;
  slug?: string;
  name: string;
  version?: string;
  department: string;
  role: string;
  title?: string;
  description: string;
  responsibilities?: string[];
  countries?: string[];
  industries?: string[];
  businessTypes?: string[];
  languages?: string[];
  capabilities: string[];
  requiredPackages: string[];
  tools: string[];
  knowledge?: KnowledgeSourceSpec[];
  agents?: AgentSpec[];
  skills?: Array<string | EmployeeSkillSpec>;
  orchestration?: {
    mode: 'SUPERVISOR' | 'PIPELINE' | 'ROUND_ROBIN' | 'DIRECT';
    leadAgentId?: string;
  };
  pricing?: EmployeePricingConfig;
  systemInstructions: string;
  concurrencyLimit?: number;
}`}
                language="typescript"
              />
            </div>
          )}

          {/* SECTION: RAG KNOWLEDGE */}
          {activePageId === "rag-knowledge" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">Context Grounding</span>
                <h2 className="text-3xl font-display font-semibold tracking-tight text-foreground">
                  RAG Multi-Modal Knowledge Bases
                </h2>
                <p className="text-muted-foreground text-base leading-relaxed">
                  Provide company context directly using inline text, public web URLs, documentation files, and PDFs. Knowledge sources can be attached globally to the AI Employee or scoped to individual specialist agents.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
                <div className="p-4 rounded-xl border border-border bg-background space-y-1.5">
                  <div className="font-semibold text-foreground flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-primary" />
                    Inline Plain Text
                  </div>
                  <p className="text-muted-foreground">
                    Define operating policies, schedules, escalation rules, and tariffs directly as inline text or Markdown.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-border bg-background space-y-1.5">
                  <div className="font-semibold text-foreground flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-emerald-500" />
                    Public Web URLs
                  </div>
                  <p className="text-muted-foreground">
                    Connect live public websites or help center portals with automated daily or weekly synchronization.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-border bg-background space-y-1.5">
                  <div className="font-semibold text-foreground flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-amber-500" />
                    PDFs & Docs
                  </div>
                  <p className="text-muted-foreground">
                    Index regulatory PDFs, clinical guides, contracts, and internal SOP handbooks into localized vector embeddings.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-border bg-background space-y-1.5">
                  <div className="font-semibold text-foreground flex items-center gap-1.5">
                    <Sliders className="w-4 h-4 text-indigo-500" />
                    Country Filtering
                  </div>
                  <p className="text-muted-foreground">
                    Filter retrieval by country (<code className="font-mono text-primary">NG</code>, <code className="font-mono text-primary">GH</code>, <code className="font-mono text-primary">US</code>) and industry vertical.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-base font-semibold text-foreground">Multi-Modal Knowledge Definition Example</h3>
                <CodeBlock
                  code={`import { defineEmployee, defineAgent } from '@fless/employee-sdk';

// Scoped knowledge for an individual Agent
const complianceAgent = defineAgent({
  id: 'compliance-auditor',
  name: 'KYC Compliance Auditor',
  role: 'Audits inbound customer onboarding documents against banking directives',
  systemPrompt: 'Audit user submissions against Central Bank standards.',
  knowledgeSources: [
    {
      id: 'cbn-aml-text',
      name: 'CBN Daily Transaction Limits 2026',
      type: 'TEXT',
      content: 'Tier 1 Accounts: 50,000 NGN daily limit. Tier 3 Accounts: 5,000,000 NGN daily limit with verified BVN and proof of address.',
      country: 'NG',
      industry: 'FinTech',
    },
    {
      id: 'cbn-aml-pdf',
      name: 'Anti-Money Laundering Framework 2026',
      type: 'PDF',
      url: 'https://storage.fless.app/compliance/cbn-aml-2026.pdf',
      country: 'NG',
      industry: 'FinTech',
    },
  ],
});

// Global knowledge for the entire AI Employee workforce
export default defineEmployee({
  id: 'fintech-compliance-team',
  name: 'FinTech KYC & AML Compliance Officer',
  department: 'OPERATIONS',
  role: 'Autonomous regulatory compliance and verification',
  requiredPackages: ['@fless/documents', '@fless/email'],
  agents: [complianceAgent],
  knowledge: [
    {
      id: 'live-help-center',
      name: 'Customer Onboarding FAQ Portal',
      type: 'URL',
      url: 'https://help.fintechbank.com/onboarding/kyc',
      country: 'NG',
      refreshInterval: 'DAILY',
    },
    {
      id: 'pep-escalation-matrix',
      name: 'PEP Risk Matrix SOP',
      type: 'TEXT',
      text: 'Flag any Politically Exposed Person transaction over $5,000 for mandatory 24-hour compliance hold.',
      country: 'NG',
    },
  ],
  systemInstructions: 'Provide authoritative regulatory compliance guidance grounded strictly in official directives.',
});`}
                  language="typescript"
                />
              </div>
            </div>
          )}

          {/* SECTION: MULTI-AGENT TEAMS */}
          {activePageId === "multi-agent" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">Team Coordination</span>
                <h2 className="text-3xl font-display font-semibold tracking-tight text-foreground">
                  Multi-Agent Teams & Specialist Sub-Agents
                </h2>
                <p className="text-muted-foreground text-base leading-relaxed">
                  Compose high-performance enterprise AI employees as coordinated teams of specialist sub-agents. Each agent has its own dedicated skills (in text, docs, or web URLs), isolated knowledge bases, model tier, and tool bindings.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl border border-primary/30 bg-background space-y-2">
                  <div className="font-semibold text-foreground flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    SUPERVISOR Mode (Default)
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    A lead supervisor agent analyzes inbound inquiries, delegates sub-tasks to specialist agents (e.g. BookingAgent, BillingAgent), and synthesizes a final response.
                  </p>
                </div>

                <div className="p-5 rounded-2xl border border-border bg-background space-y-2">
                  <div className="font-semibold text-foreground flex items-center gap-2">
                    <Workflow className="w-4 h-4 text-emerald-500" />
                    PIPELINE Mode
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Tasks pass through a deterministic sequential assembly line (e.g. OCR → DataExtraction → CRMUpdate), where each agent consumes the previous agent&apos;s output.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-base font-semibold text-foreground">Complete Multi-Agent Team with Scoped Skills & Knowledge</h3>
                <CodeBlock
                  code={`import { defineEmployee, defineAgent } from '@fless/employee-sdk';

// 1. Triage & Front-Desk Supervisor Agent
const supervisor = defineAgent({
  id: 'reception-supervisor',
  name: 'Front-Desk Supervisor',
  role: 'Greets callers, identifies medical intent, and delegates tasks to specialists.',
  responsibilities: ['Patient greeting', 'Emergency screening', 'Specialist delegation'],
  modelTier: 'reasoning',
  skills: [
    {
      id: 'emergency-screening',
      name: 'Emergency Symptom Screening',
      description: 'Screens callers for urgent symptoms and routes to emergency lines.',
      instructions: 'If caller reports severe bleeding, breathing distress, or chest pain, direct to 112 immediately.',
    },
  ],
  systemPrompt: 'You oversee clinic front desk operations.',
});

// 2. Calendar Booking Specialist Agent with Web Docs Skill
const scheduler = defineAgent({
  id: 'calendar-scheduler',
  name: 'Appointment Scheduler',
  role: 'Queries doctor availability and locks appointment slots.',
  tools: ['calendar.checkAvailability', 'calendar.bookAppointment', 'crm.syncLead'],
  modelTier: 'fast',
  skills: [
    {
      id: 'slot-reservation',
      name: 'Calendar Slot Reservation',
      description: 'Searches open doctor slots and reserves the requested consultation time.',
      docs: '# Booking SOP\\n1. Search next 3 open slots.\\n2. Confirm patient phone number.\\n3. Lock appointment with 15min buffer.',
      url: 'https://docs.clinicnetwork.com/booking-sop',
      requiredTools: ['calendar.checkAvailability', 'calendar.bookAppointment'],
    },
  ],
  knowledgeSources: [
    {
      id: 'doctor-roster',
      name: 'Doctor Consultation Roster',
      type: 'TEXT',
      text: 'Dr. Okonjo: Dental (Mon/Wed/Fri). Dr. Adeleke: General Consult (Tue/Thu).',
    },
  ],
  systemPrompt: 'Find matching open slots quickly and confirm bookings with zero double-booking.',
});

export default defineEmployee({
  id: 'st-jude-clinic-frontdesk',
  name: 'Clinic Front-Desk AI Team',
  version: '1.0.0',
  department: 'VOICE',
  role: 'Front-desk concierge and appointment booking',
  requiredPackages: ['@fless/voice', '@fless/google-calendar', '@fless/crm'],
  agents: [supervisor, scheduler],
  orchestration: {
    mode: 'SUPERVISOR',
    leadAgentId: 'reception-supervisor',
  },
  systemInstructions: 'Provide warm, empathetic, and professional clinic reception.',
});`}
                  language="typescript"
                />
              </div>
            </div>
          )}

          {/* SECTION: SKILLS & WORKFLOWS */}
          {activePageId === "skills-workflows" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">Deterministic Execution</span>
                <h2 className="text-3xl font-display font-semibold tracking-tight text-foreground">
                  Skills & Deterministic Procedures
                </h2>
                <p className="text-muted-foreground text-base leading-relaxed">
                  Skills empower both AI Employees and individual agents to execute complex procedures reliably. Skills can be backed by inline text guidelines, Markdown SOPs, external documentation URLs, and strict tool constraints.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-xl border border-border bg-background space-y-2">
                  <div className="font-semibold text-foreground flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-primary" />
                    Multiple Skills per Agent
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Assign multiple discrete skills to an agent or employee. Each skill acts as a focused capability with its own validation requirements.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-border bg-background space-y-2">
                  <div className="font-semibold text-foreground flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-emerald-500" />
                    Docs & Text Guidelines
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Embed operational rules, step checklists, and policy constraints directly via <code className="font-mono text-primary">instructions</code>, <code className="font-mono text-primary">text</code>, or <code className="font-mono text-primary">docs</code>.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-border bg-background space-y-2">
                  <div className="font-semibold text-foreground flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-amber-500" />
                    Web Documentation URLs
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Point skills to live external runbooks, API documentation, or company wiki pages via the <code className="font-mono text-primary">url</code> property.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-base font-semibold text-foreground">Defining Multiple Skills on an Employee & Agent</h3>
                <CodeBlock
                  code={`import { defineEmployee, defineAgent } from '@fless/employee-sdk';

const billingSpecialist = defineAgent({
  id: 'billing-specialist',
  name: 'Invoice & Payment Specialist',
  role: 'Generates client invoices and verifies settlement',
  tools: ['crm.createInvoice', 'crm.verifyPayment'],
  skills: [
    // Skill 1: Defined with Inline Text Instructions
    {
      id: 'invoice-generation',
      name: 'Invoice Generation Protocol',
      description: 'Generates verified customer invoices with tax breakdowns.',
      instructions: '1. Verify line items against price catalog.\\n2. Apply regional VAT (7.5% for Nigeria).\\n3. Dispatch receipt.',
      requiredTools: ['crm.createInvoice'],
    },
    // Skill 2: Defined with Web Documentation URL
    {
      id: 'payment-reconciliation',
      name: 'Payment Settlement Verification',
      description: 'Reconciles incoming bank transfers and gateway webhooks.',
      url: 'https://docs.mycompany.com/finance/settlement-sop',
      requiredTools: ['crm.verifyPayment'],
    },
    // Skill 3: Defined with Markdown SOP Documentation
    {
      id: 'refund-audit',
      name: 'Customer Refund Audit',
      description: 'Evaluates refund eligibility according to company return policies.',
      docs: '# Refund Policy SOP\\n- Requests under 14 days are approved automatically.\\n- Requests over 14 days require manager escalation.',
    },
  ],
  systemPrompt: 'Execute financial billing and verification with zero calculation error.',
});`}
                  language="typescript"
                />
              </div>
            </div>
          )}

          {/* SECTION: SECURITY */}
          {activePageId === "security-boundaries" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">Enterprise Security</span>
                <h2 className="text-3xl font-display font-semibold tracking-tight text-foreground">
                  Security Boundaries & Zero Secret Access
                </h2>
                <p className="text-muted-foreground text-base">
                  How Flessensures zero token leakage and deterministic execution boundaries.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="p-5 rounded-2xl border border-border bg-background space-y-2">
                  <div className="font-semibold text-foreground flex items-center gap-2">
                    <KeyRound className="w-4 h-4 text-primary" />
                    Zero Secret Access
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Employee author code never sees OAuth tokens, API secrets, or passwords. The FlessCloud Gateway handles credential resolution at runtime.
                  </p>
                </div>

                <div className="p-5 rounded-2xl border border-border bg-background space-y-2">
                  <div className="font-semibold text-foreground flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-500" />
                    Hard Timeouts
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Deterministic 30-second hard ceilings on LLM reasoning and 10-second external HTTP bounds prevent hanging operations.
                  </p>
                </div>

                <div className="p-5 rounded-2xl border border-border bg-background space-y-2">
                  <div className="font-semibold text-foreground flex items-center gap-2">
                    <Database className="w-4 h-4 text-emerald-500" />
                    Immutable Audit Spans
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Every user interaction, tool invocation, token count, and revenue split is recorded with OpenTelemetry tracing.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: EVALUATIONS */}
          {activePageId === "evaluations" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">Quality Assurance</span>
                <h2 className="text-3xl font-display font-semibold tracking-tight text-foreground">
                  Sandbox Evaluations Suite
                </h2>
                <p className="text-muted-foreground text-base">
                  Automated benchmark tests run on every manifest submission before public distribution.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-border bg-background space-y-3 text-sm">
                <div className="font-semibold text-foreground">Evaluation Stages:</div>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-muted-foreground">
                  <li><strong>Conversation Consistency</strong>: Verifies 10 standard test interactions produce accurate responses.</li>
                  <li><strong>Tool Parameter Precision</strong>: Asserts tool execution payloads match expected parameter schemas.</li>
                  <li><strong>Latency & Cost Bounds</strong>: Validates response generation stays under latency and token budgets.</li>
                </ul>
              </div>
            </div>
          )}

          {/* SECTION: PUBLISHING */}
          {activePageId === "publishing" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">Release Lifecycle</span>
                <h2 className="text-3xl font-display font-semibold tracking-tight text-foreground">
                  Marketplace Submission & Publishing
                </h2>
                <p className="text-muted-foreground text-base">
                  Publish verified employees for public distribution across thousands of businesses.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-semibold">1. Verify Manifest Locally</h3>
                <CodeBlock code="npx @fless/cli verify ./src/employee.ts" language="bash" />

                <h3 className="text-sm font-semibold">2. Submit for Review</h3>
                <CodeBlock code="npx @fless/cli submit ./src/employee.ts --apiKey=$FLESS_KEY" language="bash" />
              </div>
            </div>
          )}

          {/* SECTION: OFFICIAL MANAGED PLUGIN PAGES */}
          {activePlugin && (
            <div className="space-y-8 animate-in fade-in duration-200">
              {/* Plugin Header Card */}
              <div className="p-6 rounded-2xl border border-border/80 bg-gradient-to-b from-brand-soft/30 to-background dark:from-night dark:to-background space-y-4 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm"
                      style={{ backgroundColor: activePlugin.accentColor }}
                    >
                      <activePlugin.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-2xl font-bold text-foreground">{activePlugin.displayName}</h2>
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-primary/10 text-primary">
                          {activePlugin.badge}
                        </span>
                      </div>
                      <div className="text-xs font-mono text-muted-foreground mt-0.5">
                        {activePlugin.packageName} • v{activePlugin.version} • {activePlugin.category}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      ✓ Sandbox Supported
                    </span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {activePlugin.description}
                </p>

                {/* Capabilities & Permissions Row */}
                <div className="pt-4 border-t border-border/60 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="font-semibold text-foreground block mb-1">Capabilities Provided:</span>
                    <div className="flex flex-wrap gap-1">
                      {activePlugin.capabilities.map((c) => (
                        <span key={c} className="px-2 py-0.5 rounded bg-background border border-border font-mono text-[11px]">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="font-semibold text-foreground block mb-1">Required Permissions:</span>
                    <div className="flex flex-wrap gap-1">
                      {activePlugin.permissions.map((p) => (
                        <span key={p} className="px-2 py-0.5 rounded bg-neutral-900 text-neutral-200 font-mono text-[11px]">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Sub-Tabs for this Plugin */}
              <div className="flex items-center gap-2 border-b border-border/60 pb-3">
                {[
                  { id: "overview" as const, label: "Overview & Tool Schemas", icon: BookOpen },
                  { id: "simulator" as const, label: "Interactive Simulator", icon: Play },
                  { id: "code" as const, label: "TypeScript Implementation", icon: Code2 },
                ].map((st) => {
                  const Icon = st.icon;
                  const isActive = activePluginTab === st.id;
                  return (
                    <button
                      key={st.id}
                      onClick={() => setActivePluginTab(st.id)}
                      className={cn(
                        "px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                      )}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {st.label}
                    </button>
                  );
                })}
              </div>

              {/* SUB-TAB: OVERVIEW & TOOLS */}
              {activePluginTab === "overview" && (
                <div className="space-y-6">
                  <div className="p-4 rounded-xl border border-border bg-background space-y-1 text-xs">
                    <div className="font-semibold text-foreground flex items-center gap-1.5">
                      <Play className="w-3.5 h-3.5 text-primary" />
                      Sandbox Simulation Behavior
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {activePlugin.sandboxMockDescription}
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-foreground">
                        Available Tools ({activePlugin.tools.length})
                      </h3>
                      <span className="text-xs text-muted-foreground">Declared in AI employee manifests</span>
                    </div>

                    {activePlugin.tools.map((tool) => (
                      <div key={tool.toolId} className="p-6 rounded-2xl border border-border/80 bg-background space-y-5 shadow-sm">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/60 pb-3">
                          <div>
                            <div className="font-mono text-sm font-semibold text-primary">{tool.toolId}</div>
                            <div className="text-xs text-muted-foreground mt-0.5">{tool.description}</div>
                          </div>
                          <div className="flex items-center gap-1.5">
                            {tool.requiredPermissions.map((rp) => (
                              <span key={rp} className="px-2 py-0.5 rounded bg-muted text-muted-foreground font-mono text-[10px]">
                                {rp}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Parameters Table */}
                        <div className="space-y-2">
                          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Parameters Schema
                          </div>
                          <div className="border border-border/60 rounded-xl overflow-hidden text-xs">
                            <table className="w-full text-left">
                              <thead className="bg-muted/60 text-muted-foreground border-b border-border/60">
                                <tr>
                                  <th className="p-2.5">Field</th>
                                  <th className="p-2.5">Type</th>
                                  <th className="p-2.5">Required</th>
                                  <th className="p-2.5">Description</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-border/60">
                                {tool.parameters.map((param) => (
                                  <tr key={param.name}>
                                    <td className="p-2.5 font-mono font-medium text-foreground">{param.name}</td>
                                    <td className="p-2.5 font-mono text-muted-foreground">{param.type}</td>
                                    <td className="p-2.5">
                                      {param.required ? (
                                        <span className="text-rose-500 font-semibold">Yes</span>
                                      ) : (
                                        <span className="text-muted-foreground">No</span>
                                      )}
                                    </td>
                                    <td className="p-2.5 text-muted-foreground">{param.description}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>

                        {/* Request & Response Previews */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                              Sample Request Payload
                            </div>
                            <CodeBlock code={JSON.stringify(tool.examplePayload, null, 2)} language="json" />
                          </div>
                          <div>
                            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                              Sample Return Payload
                            </div>
                            <CodeBlock code={JSON.stringify(tool.exampleResponse, null, 2)} language="json" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SUB-TAB: INTERACTIVE SIMULATOR */}
              {activePluginTab === "simulator" && (
                <div className="space-y-6">
                  <div className="space-y-1">
                    <h3 className="text-base font-semibold text-foreground">Interactive Sandbox Simulator</h3>
                    <p className="text-xs text-muted-foreground">
                      Test tool execution payloads and view simulated gateway responses in real-time.
                    </p>
                  </div>

                  {activePlugin.tools.map((tool) => (
                    <ToolSimulator key={tool.toolId} tool={tool} />
                  ))}
                </div>
              )}

              {/* SUB-TAB: CODE IMPLEMENTATION */}
              {activePluginTab === "code" && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-base font-semibold text-foreground">How an AI Employee Composes this Plugin</h3>
                    <p className="text-xs text-muted-foreground">
                      Notice how you only declare <code className="font-mono text-primary">{activePlugin.packageName}</code> in <code className="font-mono text-primary">requiredPackages</code>:
                    </p>
                  </div>
                  <CodeBlock code={activePlugin.sampleEmployeeCode} language="typescript" />
                </div>
              )}
            </div>
          )}

          {/* Bottom Next/Prev Pagination */}
          <div className="pt-8 border-t border-border/60 flex items-center justify-between gap-4">
            {prevPage ? (
              <button
                onClick={() => {
                  setActivePageId(prevPage.id);
                  setActivePluginTab("overview");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border hover:bg-muted text-xs font-medium transition-colors text-left"
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
                <div>
                  <div className="text-[10px] text-muted-foreground">Previous</div>
                  <div className="font-semibold text-foreground">{prevPage.title}</div>
                </div>
              </button>
            ) : (
              <div />
            )}

            {nextPage ? (
              <button
                onClick={() => {
                  setActivePageId(nextPage.id);
                  setActivePluginTab("overview");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-primary/30 bg-primary/5 hover:bg-primary/10 text-xs font-medium transition-colors text-right"
              >
                <div>
                  <div className="text-[10px] text-primary">Next</div>
                  <div className="font-semibold text-foreground">{nextPage.title}</div>
                </div>
                <ChevronRight className="w-4 h-4 text-primary" />
              </button>
            ) : (
              <div />
            )}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
