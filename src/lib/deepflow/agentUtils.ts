/**
 * Convert a verbose AgentName into the short label used in the live trace panel.
 * Examples: "EmployeeOrchestrator" → "Orchestrator", "EngagementAgent" → "Engagement".
 */
export const shortName = (a: string): string =>
  a
    .replace("EmployeeOrchestrator", "Orchestrator")
    .replace("ManagerOrchestrator", "Orchestrator")
    .replace("ManagerInsightsAgent", "MgrInsights")
    .replace("StudyPlanGenerator", "StudyPlan")
    .replace(/Agent$/, "");
