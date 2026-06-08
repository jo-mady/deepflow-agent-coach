/**
 * DeepFlow — Constants barrel
 * All magic values, color maps, and config tables.
 */
import type {
  AgentName,
  AgentStatus,
  CertId,
  CognitiveLoadLevel,
  EmployeePhase,
  RiskLevel,
  SessionType,
  StatusPillConfig,
  StudentProfile,
  TopicDifficulty,
} from "@/types";

/* ============================== AGENT COLORS ============================== */

export const AGENT_COLORS: Record<AgentName, string> = {
  EmployeeOrchestrator: "var(--purple)",
  EngagementAgent: "var(--amber)",
  PathCuratorAgent: "var(--teal)",
  StudyPlanGenerator: "var(--teal)",
  AssessmentAgent: "var(--purple)",
  CriticSafetyAgent: "var(--done)",
  ManagerOrchestrator: "var(--done)",
  ManagerInsightsAgent: "var(--amber)",
} as const;

/* ============================== ROUTES ============================== */

export const ROUTE_PATHS = {
  employee: "/employee",
  assessment: "/assessment",
  manager: "/manager",
} as const;

export const ROUTE_ACCENTS: Record<string, string> = {
  "/employee": "var(--teal)",
  "/assessment": "var(--purple)",
  "/manager": "var(--amber)",
} as const;

/* ============================== SESSION TYPES ============================== */

export const SESSION_TYPE_STYLES: Record<
  SessionType,
  { bg: string; text: string; border: string }
> = {
  deep: { bg: "var(--teal-dim)", text: "var(--teal)", border: "var(--teal)" },
  standard: {
    bg: "var(--surface2)",
    text: "var(--text3)",
    border: "var(--border2)",
  },
  light: { bg: "var(--amber-dim)", text: "var(--amber)", border: "var(--amber)" },
  done: { bg: "var(--done-dim)", text: "var(--done)", border: "var(--done)" },
} as const;

/* ============================== RISK ============================== */

export const RISK_STYLES: Record<
  RiskLevel,
  { bg: string; text: string; border: string }
> = {
  High: { bg: "var(--coral-dim)", text: "var(--coral)", border: "var(--coral)" },
  Medium: { bg: "var(--amber-dim)", text: "var(--amber)", border: "var(--amber)" },
  Low: { bg: "var(--done-dim)", text: "var(--done)", border: "var(--done)" },
} as const;

/* ============================== READINESS ============================== */

export const READINESS_THRESHOLDS = {
  high: 70,
  mid: 40,
} as const;

export const READINESS_COLORS = {
  high: "var(--done)",
  mid: "var(--amber)",
  low: "var(--coral)",
} as const;

/* ============================== ASSESSMENT ============================== */

export const ASSESSMENT = {
  totalQuestions: 10,
  passThreshold: 75,
} as const;

/* ============================== TRACE ============================== */

export const MAX_TRACE_ENTRIES = 200;

/* ============================== AGENT STATUS STYLES ============================== */

export const AGENT_STATUS_STYLES: Record<
  AgentStatus,
  { bg: string; text: string; border: string; shadow: string }
> = {
  waiting: { bg: "transparent",      text: "var(--text3)", border: "var(--border2)", shadow: "none" },
  running: { bg: "var(--teal-dim)",  text: "var(--teal)",  border: "var(--teal)",    shadow: "0 0 16px var(--teal-mid)" },
  done:    { bg: "#48BB7808",        text: "var(--done)",  border: "#48BB7822",      shadow: "none" },
  warn:    { bg: "var(--amber-dim)", text: "var(--amber)", border: "var(--amber)",   shadow: "none" },
  blocked: { bg: "var(--coral-dim)", text: "var(--coral)", border: "var(--coral)",   shadow: "none" },
  error:   { bg: "var(--coral-dim)", text: "var(--coral)", border: "var(--coral)",   shadow: "none" },
} as const;

export const AGENT_STATUS_META: Record<AgentStatus, string> = {
  waiting: "—",
  running: "live",
  done:    "done",
  warn:    "warn",
  blocked: "blocked",
  error:   "error",
} as const;

/* ============================== RECOMMENDED HOURS ============================== */

export const RECOMMENDED_HOURS: Record<CertId, number> = {
  "AZ-104": 40,
  "AZ-900": 20,
} as const;

/* ============================== COGNITIVE LOAD MATRIX ============================== */

export const COGNITIVE_LOAD_MATRIX: Record<
  CognitiveLoadLevel,
  Record<TopicDifficulty, { session: SessionType; minutes: number }>
> = {
  light: {
    easy: { session: "standard", minutes: 25 },
    medium: { session: "standard", minutes: 40 },
    hard: { session: "deep", minutes: 45 },
  },
  moderate: {
    easy: { session: "light", minutes: 20 },
    medium: { session: "standard", minutes: 30 },
    hard: { session: "standard", minutes: 30 },
  },
  heavy: {
    easy: { session: "light", minutes: 20 },
    medium: { session: "light", minutes: 15 },
    hard: { session: "light", minutes: 10 },
  },
} as const;

/* ============================== PIPELINE ORDER ============================== */

export const EMPLOYEE_AGENTS: AgentName[] = [
  "EmployeeOrchestrator",
  "EngagementAgent",
  "PathCuratorAgent",
  "StudyPlanGenerator",
  "AssessmentAgent",
];

export const EMPLOYEE_PHASES: { key: EmployeePhase; label: string }[] = [
  { key: "profile", label: "Profile" },
  { key: "curate", label: "Curate" },
  { key: "plan", label: "Plan" },
  { key: "confirm", label: "Confirm" },
  { key: "assess", label: "Assess" },
];

export const MANAGER_AGENTS: AgentName[] = [
  "ManagerOrchestrator",
  "ManagerInsightsAgent",
];

/* ============================== STATUS PILL ============================== */

export const STATUS_PILL_CONFIG: Record<string, StatusPillConfig> = {
  "/employee": {
    borderColor: "var(--teal)",
    bgColor: "var(--teal-dim)",
    textColor: "var(--teal)",
    label: "Live",
  },
  "/assessment": {
    borderColor: "var(--purple)",
    bgColor: "var(--purple-dim)",
    textColor: "var(--purple)",
    label: "Assessing",
  },
  "/manager": {
    borderColor: "var(--amber)",
    bgColor: "var(--amber-dim)",
    textColor: "var(--amber)",
    label: "Analysing",
  },
} as const;

/* ============================== DEFAULT PROFILE ============================== */

export const DEFAULT_PROFILE: StudentProfile = {
  learningStyle: "visual",
  dailyMinutes: 45,
  currentLevel: "beginner",
  preferredFormat: "docs",
  role: "Cloud Engineer",
  targetCert: "AZ-104",
  timelineWeeks: 6,
};

/* ============================== HELPERS ============================== */

export const colorForAgent = (name: string): string =>
  AGENT_COLORS[name as AgentName] ?? "var(--text2)";

/* ============================== AGENT DISPLAY LABELS ============================== */
/** Shortened labels used in the trace panel (e.g. "Engagement" instead of "EngagementAgent"). */
export const AGENT_DISPLAY_LABEL: Record<AgentName, string> = {
  EmployeeOrchestrator: "Orchestrator",
  EngagementAgent: "Engagement",
  PathCuratorAgent: "PathCurator",
  StudyPlanGenerator: "StudyPlan",
  AssessmentAgent: "Assessment",
  CriticSafetyAgent: "CriticSafety",
  ManagerOrchestrator: "Orchestrator",
  ManagerInsightsAgent: "MgrInsights",
};
