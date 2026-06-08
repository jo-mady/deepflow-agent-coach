import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import { EMPLOYEE_PHASES, MAX_TRACE_ENTRIES, colorForAgent } from "@/constants";
import type {
  AgentState,
  AgentStoreAction,
  CertProgress,
  ClarificationAnswer,
  CognitiveLoad,
  EmployeePhase,
  ManagerInsightStep,
  PipelineState,
  QuestionResult,
  TeamStats,
  TraceEntry,
} from "@/types";

/* Re-export commonly used items for back-compat with existing imports. */
export type { AgentState, PipelineState, TraceEntry, CognitiveLoad, TeamStats } from "@/types";
export type Phase = EmployeePhase;
export type AgentStatus = AgentState["status"];

export const ALL_PHASES: EmployeePhase[] = EMPLOYEE_PHASES.map((p) => p.key);

/* ============================== INITIAL STATES ============================== */

const employeeInitial: PipelineState = {
  currentPhase: "plan",
  agentOrder: [
    "EmployeeOrchestrator",
    "EngagementAgent",
    "PathCuratorAgent",
    "StudyPlanGenerator",
    "AssessmentAgent",
  ],
  agents: {
    EmployeeOrchestrator: {
      status: "done",
      subtitle: "Routing · intent extracted",
      meta: "0.3s",
      reasoning:
        "Extracted goal AZ-104, 6 weeks, visual learner. Routing to EngagementAgent first to assess your cognitive state.",
    },
    EngagementAgent: {
      status: "done",
      subtitle: "Cognitive load: moderate+hard → 30min",
      meta: "1.1s",
      reasoning:
        "You have 3 meetings today — moderate pressure. NSG has 3 prerequisites which makes it hard. I'm planning a 30-minute focused session for today.",
    },
    PathCuratorAgent: {
      status: "done",
      subtitle: "3 paths ranked · MS Learn MCP",
      meta: "2.4s",
      reasoning:
        "I picked these 3 paths because you learn best with documentation and they cover AZ-104 domains within your 6-week timeline. [Source: engineering_cert_guide.md]",
    },
    StudyPlanGenerator: {
      status: "running",
      subtitle: "Sequencing topics · placing hard on Fri...",
      meta: "live",
      reasoning:
        "Scheduling VNet before NSG — NSG requires VNet knowledge. Placing NSG on Friday, your lightest day. Building 6-week plan now...",
    },
    AssessmentAgent: {
      status: "waiting",
      subtitle: "Waiting · Foundry IQ ready",
      meta: "",
      reasoning: "",
    },
  },
  traceEntries: [
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
  ],
  cognitiveLoad: {
    pressure: "moderate",
    difficulty: "hard",
    recommendation: "30min session",
    sessionMinutes: 30,
  },
  assessmentScore: 0,
  questionResults: [
    "pending",
    "pending",
    "pending",
    "pending",
    "pending",
    "pending",
    "pending",
    "pending",
    "pending",
    "pending",
  ] as QuestionResult[],
  currentQuestion: 1,
  managerStep: 2 as ManagerInsightStep,
  teamStats: { atRisk: 3, onTrack: 2, notStarted: 3, teamAvg: 68 },
  clarificationAnswer: null,
  certProgress: null,
  weakTopics: [],
};

const assessmentInitial: PipelineState = {
  ...employeeInitial,
  currentPhase: "assess",
  agents: {
    ...employeeInitial.agents,
    EmployeeOrchestrator: {
      status: "waiting",
      subtitle: "Waiting for result · will route on score",
      meta: "",
      reasoning: "",
    },
    EngagementAgent: {
      status: "done",
      subtitle: "Friday · light schedule → assessment approved",
      meta: "done",
      reasoning:
        "Your Friday has just 1 meeting. Clear head, optimal for assessment. Approving assessment for today.",
    },
    AssessmentAgent: {
      status: "running",
      subtitle: "Q6 of 10 · Foundry IQ grounded · citing docs",
      meta: "live",
      reasoning:
        "Generating Q6 on NSG topics. Retrieving chunks from Foundry IQ knowledge base...",
    },
  },
  assessmentScore: 60,
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
  currentQuestion: 6,
  traceEntries: [],
};

const managerInitial: PipelineState = {
  ...employeeInitial,
  currentPhase: "plan",
  agentOrder: ["ManagerOrchestrator", "ManagerInsightsAgent"],
  agents: {
    ManagerOrchestrator: {
      status: "done",
      subtitle: "Routing · team context loaded",
      meta: "0.4s",
      reasoning: "Manager session started. Loading team context for TEAM-A · 8 members.",
    },
    ManagerInsightsAgent: {
      status: "running",
      subtitle: "Gap analysis → report → suggestions",
      meta: "live",
      reasoning: "Analysing skill gaps across 8 team members.",
    },
  },
  managerStep: 2,
  traceEntries: [],
};

const PRESETS = {
  employee: employeeInitial,
  assessment: assessmentInitial,
  manager: managerInitial,
} as const;

export type Preset = keyof typeof PRESETS;

/* ============================== REDUCER ============================== */

const stepPhase = (agent: string, fallback: EmployeePhase): EmployeePhase => {
  switch (agent) {
    case "EmployeeOrchestrator":
      return "profile";
    case "EngagementAgent":
      return "curate";
    case "PathCuratorAgent":
      return "curate";
    case "StudyPlanGenerator":
      return "plan";
    case "AssessmentAgent":
      return "assess";
    default:
      return fallback;
  }
};

function reducer(state: PipelineState, action: AgentStoreAction): PipelineState {
  switch (action.type) {
    case "ADVANCE_AGENT": {
      const current = state.agents[action.agent] ?? {
        status: "waiting",
        subtitle: "",
        meta: "",
        reasoning: "",
      };
      return {
        ...state,
        agents: { ...state.agents, [action.agent]: { ...current, ...action.patch } },
      };
    }
    case "SET_PHASE":
      return { ...state, currentPhase: action.phase };
    case "ADD_TRACE": {
      const next = state.traceEntries.map((t) => ({ ...t, isActive: false }));
      next.push(action.entry);
      return { ...state, traceEntries: next.slice(-MAX_TRACE_ENTRIES) };
    }
    case "UPDATE_ASSESSMENT":
      return { ...state, assessmentScore: action.score, questionResults: action.results };
    case "RESET":
      return employeeInitial;
    case "LOAD_PRESET":
      return PRESETS[action.preset];
    case "SET_CLARIFICATION":
      return { ...state, clarificationAnswer: action.result };
    case "SET_CERT_PROGRESS":
      return { ...state, certProgress: action.progress };
    case "SET_WEAK_TOPICS":
      return { ...state, weakTopics: action.topics };
    case "STEP_FORWARD": {
      const order = state.agentOrder;
      const runningIdx = order.findIndex((a) => state.agents[a]?.status === "running");
      const nextAgents = { ...state.agents };
      let phase = state.currentPhase;

      if (runningIdx === -1) {
        const firstWaiting = order.find((a) => state.agents[a]?.status === "waiting");
        if (firstWaiting) {
          nextAgents[firstWaiting] = { ...nextAgents[firstWaiting], status: "running", meta: "live" };
          phase = stepPhase(firstWaiting, phase);
        }
      } else {
        const current = order[runningIdx];
        nextAgents[current] = { ...nextAgents[current], status: "done", meta: "done" };
        const next = order[runningIdx + 1];
        if (next) {
          nextAgents[next] = { ...nextAgents[next], status: "running", meta: "live" };
          phase = stepPhase(next, phase);
        } else {
          phase = "assess";
        }
      }

      return { ...state, agents: nextAgents, currentPhase: phase };
    }
    default:
      return state;
  }
}

/* ============================== CONTEXT ============================== */

interface StoreApi extends PipelineState {
  advanceAgent: (agent: string, patch: Partial<AgentState>) => void;
  setPhase: (phase: EmployeePhase) => void;
  addTraceEntry: (entry: TraceEntry) => void;
  updateAssessment: (score: number, results: QuestionResult[]) => void;
  resetPipeline: () => void;
  loadPreset: (preset: Preset) => void;
  stepForward: () => void;
  setClarification: (result: ClarificationAnswer | null) => void;
  setCertProgress: (progress: CertProgress) => void;
  setWeakTopics: (topics: string[]) => void;
}

const AgentContext = createContext<StoreApi | null>(null);

export function AgentProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, employeeInitial);

  const advanceAgent = useCallback(
    (agent: string, patch: Partial<AgentState>) =>
      dispatch({ type: "ADVANCE_AGENT", agent, patch }),
    [],
  );
  const setPhase = useCallback(
    (phase: EmployeePhase) => dispatch({ type: "SET_PHASE", phase }),
    [],
  );
  const addTraceEntry = useCallback(
    (entry: TraceEntry) => dispatch({ type: "ADD_TRACE", entry }),
    [],
  );
  const updateAssessment = useCallback(
    (score: number, results: QuestionResult[]) =>
      dispatch({ type: "UPDATE_ASSESSMENT", score, results }),
    [],
  );
  const resetPipeline = useCallback(() => dispatch({ type: "RESET" }), []);
  const loadPreset = useCallback(
    (preset: Preset) => dispatch({ type: "LOAD_PRESET", preset }),
    [],
  );
  const stepForward = useCallback(() => dispatch({ type: "STEP_FORWARD" }), []);
  const setClarification = useCallback(
    (result: ClarificationAnswer | null) =>
      dispatch({ type: "SET_CLARIFICATION", result }),
    [],
  );
  const setCertProgress = useCallback(
    (progress: CertProgress) => dispatch({ type: "SET_CERT_PROGRESS", progress }),
    [],
  );

  const value = useMemo<StoreApi>(
    () => ({
      ...state,
      advanceAgent,
      setPhase,
      addTraceEntry,
      updateAssessment,
      resetPipeline,
      loadPreset,
      stepForward,
      setClarification,
      setCertProgress,
    }),
    [
      state,
      advanceAgent,
      setPhase,
      addTraceEntry,
      updateAssessment,
      resetPipeline,
      loadPreset,
      stepForward,
      setClarification,
      setCertProgress,
    ],
  );

  return <AgentContext.Provider value={value}>{children}</AgentContext.Provider>;
}

export function useAgentStore(): StoreApi {
  const ctx = useContext(AgentContext);
  if (!ctx) throw new Error("useAgentStore must be used within AgentProvider");
  return ctx;
}
