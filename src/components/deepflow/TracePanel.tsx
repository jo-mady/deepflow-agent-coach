import { useAgentStore } from "@/lib/deepflow/agentStore";

const shortName = (a: string) =>
  a
    .replace("EmployeeOrchestrator", "Orchestrator")
    .replace("ManagerOrchestrator", "Orchestrator")
    .replace("ManagerInsightsAgent", "MgrInsights")
    .replace("StudyPlanGenerator", "StudyPlan")
    .replace(/Agent$/, "");

export function TracePanel() {
  const { traceEntries } = useAgentStore();
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
        {traceEntries.map((e, i) => {
          const isLast = i === traceEntries.length - 1;
          const active = e.isActive && isLast;
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
                {e.time}
              </div>
              <div
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 11,
                  fontWeight: 500,
                  color: e.agentColor,
                }}
              >
                {shortName(e.agent)}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: active ? "var(--text)" : "var(--text2)",
                  lineHeight: 1.5,
                }}
              >
                {e.message}
                {active && <span className="df-cursor" />}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
