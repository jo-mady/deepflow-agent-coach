/**
 * DeepFlow — Central Type Definitions
 * All shared interfaces, unions, and prop types live here.
 * Components import from "@/types".
 */

/* ============================== BRANDED STRINGS ============================== */

export type AgentName =
  | "EmployeeOrchestrator"
  | "EngagementAgent"
  | "PathCuratorAgent"
  | "StudyPlanGenerator"
  | "AssessmentAgent"
  | "CriticSafetyAgent"
  | "ManagerOrchestrator"
  | "ManagerInsightsAgent";

export type CertId = "AZ-104" | "AZ-900";

/* ============================== SSE & PIPELINE ============================== */

export type AgentStatus =
  | "waiting"
  | "running"
  | "done"
  | "blocked"
  | "warn"
  | "error";

export type Persona = "employee" | "manager";

export type EmployeePhase = "profile" | "curate" | "plan" | "confirm" | "assess" | "revising" | "done";
export type ManagerPhase =
  | "analysing"
  | "reporting"
  | "suggesting"
  | "awaiting_response";

export type SessionType = "deep" | "standard" | "light" | "done";
export type RiskLevel = "High" | "Medium" | "Low";
export type ReadinessStatus = "ready" | "in_progress" | "at_risk";
export type QuestionResult = "correct" | "wrong" | "active" | "pending";
export type CognitiveLoadLevel = "light" | "moderate" | "heavy";
export type TopicDifficulty = "easy" | "medium" | "hard";
export type ManagerInsightStep = 1 | 2 | 3;

export interface SSEEvent {
  session_id: string;
  agent: AgentName;
  status: AgentStatus;
  message: string;
  payload: Record<string, unknown>;
  timestamp: string;
}

export interface AgentNodeData {
  name: AgentName;
  status: AgentStatus;
  subtitle: string;
  meta: string;
  isCoreAgent?: boolean;
  connectorLabel?: string;
}

export interface TraceEntry {
  time: string;
  agent: AgentName;
  agentColor: string;
  message: string;
  isActive: boolean;
}

export interface PhaseItem {
  key: EmployeePhase;
  label: string;
  state: "done" | "active" | "default";
}

/* ============================== AGENT STORE ============================== */

export interface AgentState {
  status: AgentStatus;
  subtitle: string;
  meta: string;
  reasoning: string;
}

export interface PipelineState {
  currentPhase: EmployeePhase;
  agents: Record<string, AgentState>;
  agentOrder: string[];
  traceEntries: TraceEntry[];
  cognitiveLoad: CognitiveLoad | null;

  // Assessment
  assessmentScore: number;
  questionResults: QuestionResult[];
  currentQuestion: number;

  // Manager
  // Manager
  managerStep: ManagerInsightStep;
  teamStats: TeamStats;

  // Clarification
  clarificationAnswer: ClarificationAnswer | null;

  // Cert progress
  certProgress: CertProgress | null;
}

export type AgentStoreAction =
  | { type: "ADVANCE_AGENT"; agent: string; patch: Partial<AgentState> }
  | { type: "SET_PHASE"; phase: EmployeePhase }
  | { type: "ADD_TRACE"; entry: TraceEntry }
  | { type: "UPDATE_ASSESSMENT"; score: number; results: QuestionResult[] }
  | { type: "RESET" }
  | { type: "LOAD_PRESET"; preset: "employee" | "assessment" | "manager" }
  | { type: "STEP_FORWARD" }
  | { type: "SET_CLARIFICATION"; result: ClarificationAnswer | null }
  | { type: "SET_CERT_PROGRESS"; progress: CertProgress };

/* ============================== EMPLOYEE DOMAIN ============================== */

export interface StudentProfile {
  learningStyle: "visual" | "auditory" | "kinesthetic" | "reading";
  dailyMinutes: number;
  currentLevel: "beginner" | "intermediate" | "advanced";
  preferredFormat: "docs" | "video" | "labs" | "mixed";
  role: string;
  targetCert: CertId;
  timelineWeeks: number;
}

export interface CognitiveLoad {
  pressure: CognitiveLoadLevel;
  difficulty: TopicDifficulty;
  recommendation: string;
  sessionMinutes: number;
}

export interface CertProgress {
  completionPercent: number;
  hoursStudied: number;
  recommendedHours: number;
  sessionsCompleted: number;
  milestonesCompleted: number;
  milestonesTotal: number;
}

export interface ClarificationSource {
  sourceDoc: string;
  sourceUrl: string;
  sourceType: "ms_learn" | "web";
}

export interface ClarificationAnswer {
  answer: string;
  sources: ClarificationSource[];
  tavilyUsed: boolean;
}

export interface StudySession {
  day: string;
  topic: string;
  sessionType: SessionType;
  durationMinutes: number;
  isToday?: boolean;
}

export interface Milestone {
  name: string;
  targetDate: string;
  status: "done" | "active" | "pending";
}

/* ============================== ASSESSMENT ============================== */

export interface AssessmentState {
  score: number;
  currentQuestion: number;
  totalQuestions: number;
  passThreshold: number;
  questionResults: QuestionResult[];
  attemptNumber: number;
}

export interface QuestionOption {
  key: "A" | "B" | "C" | "D";
  text: string;
}

export interface QuestionData {
  id: string;
  number: number;
  topic: string;
  source: string;
  text: string;
  options: QuestionOption[];
  selectedOption: string | null;
}

/* ============================== MANAGER ============================== */

export interface TeamMemberAction {
  type: "suggested" | "on_track" | "high_load" | "suggest_cert";
  label: string;
  certId?: CertId;
}

export interface TeamMember {
  name: string;
  employeeId: string;
  role: string;
  readinessPercent: number;
  weeklyMeetingHours: number;
  risk: RiskLevel;
  action: TeamMemberAction;
  isAtRisk?: boolean;
  isBeingSuggested?: boolean;
}

export interface TeamStats {
  atRisk: number;
  onTrack: number;
  notStarted: number;
  teamAvg: number;
}

export interface ManagerInsightStepData {
  stepNumber: ManagerInsightStep;
  label: string;
  status: "done" | "active" | "waiting";
}

/* ============================== SHARED UI ============================== */

export interface StatusPillConfig {
  borderColor: string;
  bgColor: string;
  textColor: string;
  label: string;
}

export interface SessionIdConfig {
  text: string;
}

/* ============================== COMPONENT PROPS ============================== */

export interface AgentNodeProps {
  agent: AgentNodeData;
}

export interface ConnectorProps {
  label: string;
}

export interface PhaseTrackProps {
  phases: PhaseItem[];
}

export interface TraceLine {
  time: string;
  agent: string;
  color: string;
  message: string;
  active?: boolean;
  cursorColor?: string;
}

export interface TracePanelProps {
  /** When provided, renders these lines verbatim. Otherwise falls back to the agent store. */
  entries?: TraceLine[];
  headerRight?: string;
  headerRightColor?: string;
}

export interface InputBarProps {
  placeholder: string;
  accentColor: string;
  showAbandon?: boolean;
  onSend: (message: string) => void;
}

export interface StatusPillProps {
  config: StatusPillConfig;
}

export interface ScoreBarProps {
  score: number;
  accentColor: string;
}

export interface QuestionProgressProps {
  results: QuestionResult[];
}

export interface TeamTableProps {
  members: TeamMember[];
}

export interface StatsGridProps {
  stats: TeamStats;
}

export interface CognitiveLoadCardProps {
  load: CognitiveLoad;
}
