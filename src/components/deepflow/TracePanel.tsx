import type { SSEEvent } from "@/lib/deepflow/mockEvents";

const agentColors: Record<string, string> = {
  EmployeeOrchestrator: "var(--purple)",
  Orchestrator: "var(--purple)",
  EngagementAgent: "var(--amber)",
  Engagement: "var(--amber)",
  CriticSafetyAgent: "var(--done)",
  CriticSafety: "var(--done)",
  PathCuratorAgent: "var(--teal)",
  PathCurator: "var(--teal)",
  StudyPlanGenerator: "var(--teal)",
  StudyPlan: "var(--teal)",
};

const shortName = (a: string) =>
  a.replace(/Agent$/, "").replace("EmployeeOrchestrator", "Orchestrator").replace("StudyPlanGenerator", "StudyPlan");

export function TracePanel({ events }: { events: SSEEvent[] }) {
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div
        style={{
          padding: "12px 20px",
          borderBottom: "1px solid var(--border)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontSize: 10,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: "var(--text3)",
          }}
        >
          Live Reasoning Trace
        </span>
        <span
          style={{
            fontSize: 9,
            color: "var(--teal)",
            fontFamily: "JetBrains Mono, monospace",
            letterSpacing: "0.08em",
          }}
        >
          SSE CONNECTED
        </span>
      </div>
      <div style={{ overflowY: "auto", padding: "12px 20px" }}>
        {events.map((e, i) => {
          const isLast = i === events.length - 1;
          const isActive = isLast && e.status === "running";
          const name = shortName(e.agent);
          const color = agentColors[name] ?? agentColors[e.agent] ?? "var(--text2)";
          return (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "70px 110px 1fr",
                gap: 12,
                padding: "8px 0",
                borderBottom: isLast ? "none" : "1px solid var(--border)",
                alignItems: "start",
              }}
            >
              <div
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 11,
                  color: "var(--text3)",
                }}
              >
                {e.timestamp}
              </div>
              <div
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 11,
                  fontWeight: 500,
                  color,
                }}
              >
                {name}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: isActive ? "var(--text)" : "var(--text2)",
                  lineHeight: 1.5,
                }}
              >
                {e.message}
                {isActive && <span className="df-cursor" />}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
