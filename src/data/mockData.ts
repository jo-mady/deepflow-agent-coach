/**
 * DeepFlow — Typed mock data.
 * Values mirror the current hardcoded data inside route/component files so the
 * visual output is unchanged when components migrate to consume from here.
 */
import { colorForAgent } from "@/constants";
import type { CompletionCardProps } from "@/components/deepflow/CompletionCard";
import type {
  AgentNodeData,
  AssessmentState,
  CertProgress,
  ClarificationAnswer,
  CognitiveLoad,
  ManagerInsightStepData,
  Milestone,
  QuestionData,
  StudySession,
  TeamMember,
  TeamStats,
  TraceEntry,
} from "@/types";

/* ============================== EMPLOYEE ============================== */

export const EMPLOYEE_MOCK_AGENTS: AgentNodeData[] = [
  {
    name: "EmployeeOrchestrator",
    status: "done",
    subtitle: "Routing · intent extracted",
    meta: "0.3s",
    connectorLabel: "→ goal=AZ-104, weeks=6, style=visual",
  },
  {
    name: "EngagementAgent",
    status: "done",
    subtitle: "Cognitive load: moderate+hard → 30min",
    meta: "1.1s",
    isCoreAgent: true,
    connectorLabel: "→ cognitive_load stored in state",
  },
  {
    name: "PathCuratorAgent",
    status: "done",
    subtitle: "3 paths ranked · MS Learn MCP",
    meta: "2.4s",
    connectorLabel: "→ 3 paths → plan generator",
  },
  {
    name: "StudyPlanGenerator",
    status: "running",
    subtitle: "Sequencing topics · placing hard on Fri...",
    meta: "live",
    connectorLabel: "→ plan → CalendarAgent",
  },
  {
    name: "AssessmentAgent",
    status: "waiting",
    subtitle: "Waiting · Foundry IQ ready",
    meta: "",
  },
];

export const EMPLOYEE_MOCK_TRACE: TraceEntry[] = [
  {
    time: "00:00.3",
    agent: "EmployeeOrchestrator",
    agentColor: colorForAgent("EmployeeOrchestrator"),
    message:
      "Extracted goal AZ-104, 6 weeks, visual learner. Routing to EngagementAgent first to assess your cognitive state.",
    isActive: false,
  },
  {
    time: "00:01.1",
    agent: "EngagementAgent",
    agentColor: colorForAgent("EngagementAgent"),
    message:
      "You have 3 meetings today — moderate pressure. NSG has 3 prerequisites which makes it hard. I'm planning a 30-minute focused session for today.",
    isActive: false,
  },
  {
    time: "00:01.4",
    agent: "CriticSafetyAgent",
    agentColor: colorForAgent("CriticSafetyAgent"),
    message: "Cognitive load output approved. No safety flags. Passing to state.",
    isActive: false,
  },
  {
    time: "00:02.1",
    agent: "PathCuratorAgent",
    agentColor: colorForAgent("PathCuratorAgent"),
    message:
      "I picked these 3 paths because you learn best with documentation and they cover AZ-104 domains within your 6-week timeline. [Source: engineering_cert_guide.md]",
    isActive: false,
  },
  {
    time: "00:04.8",
    agent: "StudyPlanGenerator",
    agentColor: colorForAgent("StudyPlanGenerator"),
    message:
      "Scheduling VNet before NSG — NSG requires VNet knowledge. Placing NSG on Friday, your lightest day. Building 6-week plan now...",
    isActive: true,
  },
];

export const EMPLOYEE_MOCK_SESSIONS: StudySession[] = [
  { day: "Mon", topic: "IAM — Role assignments", sessionType: "done", durationMinutes: 45 },
  { day: "Tue", topic: "VNet — Fundamentals", sessionType: "standard", durationMinutes: 30 },
  { day: "Wed", topic: "VNet — Peering & DNS", sessionType: "light", durationMinutes: 15, isToday: true },
  { day: "Thu", topic: "NSG — Rules & flow logs", sessionType: "standard", durationMinutes: 30 },
  { day: "Fri", topic: "NSG — Advanced scenarios", sessionType: "deep", durationMinutes: 45 },
];

export const EMPLOYEE_MOCK_MILESTONES: Milestone[] = [
  { name: "Domain 1 · IAM & Identity", targetDate: "Jun 14", status: "done" },
  { name: "Domain 2 · Networking", targetDate: "Jun 21", status: "active" },
  { name: "Domain 3 · Storage", targetDate: "Jun 28", status: "pending" },
  { name: "Domain 4 · Compute", targetDate: "Jul 5", status: "pending" },
  { name: "Domain 5 · Monitoring", targetDate: "Jul 12", status: "pending" },
];

export const EMPLOYEE_MOCK_COGNITIVE_LOAD: CognitiveLoad = {
  pressure: "moderate",
  difficulty: "hard",
  recommendation: "30min session",
  sessionMinutes: 30,
};

/* ============================== ASSESSMENT ============================== */

export const ASSESSMENT_MOCK_STATE: AssessmentState = {
  score: 60,
  currentQuestion: 6,
  totalQuestions: 10,
  passThreshold: 75,
  questionResults: [
    "correct",
    "correct",
    "wrong",
    "correct",
    "wrong",
    "active",
    "pending",
    "pending",
    "pending",
    "pending",
  ],
  attemptNumber: 1,
};

export const ASSESSMENT_MOCK_QUESTION: QuestionData = {
  id: "Q6",
  number: 6,
  topic: "NSG Rules",
  source: "az_104_study_guide.md",
  text: "What is the maximum number of inbound security rules per Network Security Group in Azure?",
  options: [
    { key: "A", text: "100 rules" },
    { key: "B", text: "200 rules" },
    { key: "C", text: "500 rules" },
    { key: "D", text: "1000 rules" },
  ],
  selectedOption: "B",
};

export const ASSESSMENT_MOCK_AGENTS: AgentNodeData[] = [
  {
    name: "EngagementAgent",
    status: "done",
    subtitle: "Friday · light schedule → assessment approved",
    meta: "done",
    connectorLabel: "→ cognitive_load: light",
  },
  {
    name: "AssessmentAgent",
    status: "running",
    subtitle: "Q6 of 10 · Foundry IQ grounded · citing docs",
    meta: "live",
    connectorLabel: "→ score → orchestrator",
  },
  {
    name: "EmployeeOrchestrator",
    status: "waiting",
    subtitle: "Waiting for result · will route on score",
    meta: "",
  },
];

export const ASSESSMENT_MOCK_TRACE: TraceEntry[] = [
  {
    time: "08:52.1",
    agent: "EngagementAgent",
    agentColor: colorForAgent("EngagementAgent"),
    message:
      "Your Friday has just 1 meeting. Clear head, optimal for assessment. Approving assessment for today.",
    isActive: false,
  },
  {
    time: "08:52.3",
    agent: "CriticSafetyAgent",
    agentColor: colorForAgent("CriticSafetyAgent"),
    message:
      "Assessment trigger approved. No safety flags. Human confirmation gate passed.",
    isActive: false,
  },
  {
    time: "08:52.8",
    agent: "AssessmentAgent",
    agentColor: colorForAgent("AssessmentAgent"),
    message:
      "Querying Foundry IQ for VNet topic. Retrieved 3 chunks from az_104_study_guide.md. Generating Q1.",
    isActive: false,
  },
  {
    time: "08:57.2",
    agent: "AssessmentAgent",
    agentColor: colorForAgent("AssessmentAgent"),
    message:
      "Q3 incorrect — NSG rule limit topic. Q5 incorrect — VNet peering limits. Noting weak topics.",
    isActive: false,
  },
  {
    time: "08:59.1",
    agent: "AssessmentAgent",
    agentColor: colorForAgent("AssessmentAgent"),
    message:
      "Generating Q6 on NSG topics. Retrieving chunks from Foundry IQ knowledge base...",
    isActive: true,
  },
];

/* ============================== MANAGER ============================== */

export const MANAGER_MOCK_AGENTS: AgentNodeData[] = [
  {
    name: "ManagerOrchestrator",
    status: "done",
    subtitle: "Routing · team context loaded",
    meta: "0.4s",
    connectorLabel: "→ Fabric IQ · Work IQ signals",
  },
  {
    name: "ManagerInsightsAgent",
    status: "running",
    subtitle: "Gap analysis → report → suggestions",
    meta: "live",
  },
];

export const MANAGER_MOCK_TRACE: TraceEntry[] = [
  {
    time: "09:10.2",
    agent: "ManagerOrchestrator",
    agentColor: colorForAgent("ManagerOrchestrator"),
    message:
      "Manager session started. Loading team context for TEAM-A · 8 members · Cloud Engineering role.",
    isActive: false,
  },
  {
    time: "09:10.8",
    agent: "ManagerInsightsAgent",
    agentColor: colorForAgent("ManagerInsightsAgent"),
    message:
      "Analysing skill gaps across 8 team members. 3 of 8 Cloud Engineers are missing AZ-104 as required by Fabric IQ role mapping.",
    isActive: false,
  },
  {
    time: "09:11.4",
    agent: "CriticSafetyAgent",
    agentColor: colorForAgent("CriticSafetyAgent"),
    message:
      "Gap analysis approved. Privacy check passed — showing aggregates only, no raw employee session data.",
    isActive: false,
  },
  {
    time: "09:12.1",
    agent: "ManagerInsightsAgent",
    agentColor: colorForAgent("ManagerInsightsAgent"),
    message:
      "Generating readiness report. EMP-003 has lightest meeting load this week (avg 12hrs) — suggesting them first for AZ-104. Building suggestion...",
    isActive: true,
  },
];

export const MANAGER_MOCK_TEAM: TeamMember[] = [
  {
    name: "Alex M.",
    employeeId: "EMP-001",
    role: "Cloud Eng.",
    readinessPercent: 82,
    weeklyMeetingHours: 12,
    risk: "Low",
    action: { type: "suggested", label: "✓ Suggested" },
  },
  {
    name: "Jordan K.",
    employeeId: "EMP-002",
    role: "Cloud Eng.",
    readinessPercent: 28,
    weeklyMeetingHours: 26,
    risk: "High",
    isAtRisk: true,
    action: { type: "high_load", label: "High load" },
  },
  {
    name: "Sam R.",
    employeeId: "EMP-003",
    role: "Cloud Eng.",
    readinessPercent: 45,
    weeklyMeetingHours: 12,
    risk: "Medium",
    isBeingSuggested: true,
    action: { type: "suggest_cert", label: "Suggest AZ-104 ↗", certId: "AZ-104" },
  },
  {
    name: "Taylor B.",
    employeeId: "EMP-004",
    role: "DevOps Eng.",
    readinessPercent: 71,
    weeklyMeetingHours: 18,
    risk: "Low",
    action: { type: "on_track", label: "On track" },
  },
  {
    name: "Morgan L.",
    employeeId: "EMP-005",
    role: "Cloud Eng.",
    readinessPercent: 12,
    weeklyMeetingHours: 24,
    risk: "High",
    isAtRisk: true,
    action: { type: "high_load", label: "High load" },
  },
];

export const MANAGER_MOCK_STATS: TeamStats = {
  atRisk: 3,
  onTrack: 2,
  notStarted: 3,
  teamAvg: 68,
};

export const MANAGER_MOCK_INSIGHT_STEPS: ManagerInsightStepData[] = [
  { stepNumber: 1, label: "Gap analysis · 8 members", status: "done" },
  { stepNumber: 2, label: "Generating readiness report...", status: "active" },
  { stepNumber: 3, label: "Cert suggestions", status: "waiting" },
];

/* ============================== EMPLOYEE PROGRESS ============================== */

export const EMPLOYEE_MOCK_PROGRESS: CertProgress = {
  completionPercent: 22,
  hoursStudied: 8.75,
  recommendedHours: 40,
  sessionsCompleted: 7,
  milestonesCompleted: 1,
  milestonesTotal: 5,
};

export const EMPLOYEE_MOCK_COMPLETION: CompletionCardProps = {
  certId: "AZ-104",
  hoursStudied: 38.5,
  sessionsCompleted: 31,
  milestonesCompleted: 5,
  milestonesTotal: 5,
};

/* ============================== WEAK TOPICS ============================== */

export const MOCK_WEAK_TOPICS: string[] = ["NSG", "VNet"];

/* ============================== CLARIFICATION ============================== */

export const MOCK_CLARIFICATION: ClarificationAnswer = {
  answer:
    "NSG and ASG both filter traffic, but NSGs apply at subnet or NIC level while ASGs let you group VMs by application role — making rules easier to manage at scale. [Source 1] [Source 2]",
  sources: [
    {
      sourceDoc: "MS Learn · Configure NSGs",
      sourceUrl:
        "https://learn.microsoft.com/en-us/training/modules/configure-network-security-groups/",
      sourceType: "ms_learn",
    },
    {
      sourceDoc: "Web · Azure Networking Deep Dive",
      sourceUrl:
        "https://learn.microsoft.com/en-us/azure/virtual-network/application-security-groups",
      sourceType: "web",
    },
  ],
  tavilyUsed: true,
};
