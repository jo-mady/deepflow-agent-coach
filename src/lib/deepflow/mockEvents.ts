import type { SSEEvent } from "@/types";

export type { SSEEvent } from "@/types";
export type AgentStatus = SSEEvent["status"];

export const employeeMockEvents: SSEEvent[] = [
  {
    session_id: "EMP-001",
    agent: "EmployeeOrchestrator",
    status: "done",
    message:
      "Extracted goal AZ-104, 6 weeks, visual learner. Routing to EngagementAgent first to assess your cognitive state.",
    payload: {
      goal: "AZ-104",
      weeks: 6,
      style: "visual",
      completion_percent: 22,
      hours_studied: 8.75,
      sessions_completed: 7,
      target_cert: "AZ-104",
      milestone_progress: [
        { name: "Networking Basics", status: "done" },
        { name: "Identity & Access", status: "active" },
        { name: "Storage", status: "pending" },
        { name: "Compute", status: "pending" },
        { name: "Monitoring", status: "pending" },
      ],
    },
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

export const managerMockEvents: SSEEvent[] = [
  {
    session_id: "MGR-001",
    agent: "ManagerOrchestrator",
    status: "done",
    message: "Manager session started. Routing · loading team context for TEAM-A · 8 members.",
    payload: { team: "TEAM-A", members: 8 },
    timestamp: "00:00.4",
  },
  {
    session_id: "MGR-001",
    agent: "ManagerInsightsAgent",
    status: "running",
    message: "Analysing skill gaps across 8 team members...",
    payload: {},
    timestamp: "00:01.2",
  },
  {
    session_id: "MGR-001",
    agent: "CriticSafetyAgent",
    status: "done",
    message: "Insights output approved. No safety flags. Passing to state.",
    payload: { blocks: 0, warns: 0 },
    timestamp: "00:02.0",
  },
  {
    session_id: "MGR-001",
    agent: "ManagerInsightsAgent",
    status: "done",
    message:
      "3 of 8 Cloud Engineers missing AZ-104. Suggesting EMP-003 start first — lightest meeting load.",
    payload: { missing: 3, suggestion: "EMP-003" },
    timestamp: "00:03.1",
  },
];
