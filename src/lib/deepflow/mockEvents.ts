export type AgentStatus = "running" | "done" | "blocked" | "warn" | "error";

export interface SSEEvent {
  session_id: string;
  agent: string;
  status: AgentStatus;
  message: string;
  payload: Record<string, unknown>;
  timestamp: string;
}

export const employeeMockEvents: SSEEvent[] = [
  {
    session_id: "EMP-001",
    agent: "EmployeeOrchestrator",
    status: "done",
    message:
      "Extracted goal AZ-104, 6 weeks, visual learner. Routing to EngagementAgent first to assess your cognitive state.",
    payload: { goal: "AZ-104", weeks: 6, style: "visual" },
    timestamp: "00:00.3",
  },
  {
    session_id: "EMP-001",
    agent: "EngagementAgent",
    status: "done",
    message:
      "You have 3 meetings today — moderate pressure. NSG has 3 prerequisites which makes it hard. I'm planning a 30-minute focused session for today.",
    payload: { cognitive_load: "moderate", session_minutes: 30 },
    timestamp: "00:01.1",
  },
  {
    session_id: "EMP-001",
    agent: "CriticSafetyAgent",
    status: "done",
    message: "Cognitive load output approved. No safety flags. Passing to state.",
    payload: { blocks: 0, warns: 0 },
    timestamp: "00:01.4",
  },
  {
    session_id: "EMP-001",
    agent: "PathCuratorAgent",
    status: "done",
    message:
      "I picked these 3 paths because you learn best with documentation and they cover AZ-104 domains within your 6-week timeline. [Source: engineering_cert_guide.md]",
    payload: { paths: 3 },
    timestamp: "00:02.1",
  },
  {
    session_id: "EMP-001",
    agent: "StudyPlanGenerator",
    status: "running",
    message:
      "Scheduling VNet before NSG — NSG requires VNet knowledge. Placing NSG on Friday, your lightest day. Building 6-week plan now...",
    payload: {},
    timestamp: "00:04.8",
  },
];
