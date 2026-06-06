import { useAgentStore } from "@/lib/deepflow/agentStore";
import { panelLabel } from "@/lib/styles";
import type { TraceLine, TracePanelProps } from "@/types";

const shortName = (a: string) =>
  a
    .replace("EmployeeOrchestrator", "Orchestrator")
    .replace("ManagerOrchestrator", "Orchestrator")
    .replace("ManagerInsightsAgent", "MgrInsights")
    .replace("StudyPlanGenerator", "StudyPlan")
    .replace(/Agent$/, "");

export function TracePanel({
  entries,
  headerRight = "SSE CONNECTED",
  headerRightColor = "var(--teal)",
}: TracePanelProps = {}) {
  const { traceEntries } = useAgentStore();

  const lines: TraceLine[] =
    entries ??
    traceEntries.map((e, i, arr) => ({
      time: e.time,
      agent: shortName(e.agent),
      color: e.agentColor,
      message: e.message,
      active: e.isActive && i === arr.length - 1,
    }));

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
        <span style={panelLabel("var(--text3)")}>Live Reasoning Trace</span>
        <span
          style={{
            fontSize: 9,
            color: headerRightColor,
            fontFamily: "JetBrains Mono, monospace",
            letterSpacing: "0.08em",
          }}
        >
          {headerRight}
        </span>
      </div>
      <div style={{ overflowY: "auto", padding: "12px 20px" }}>
        {lines.map((e, i) => {
          const isLast = i === lines.length - 1;
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
                  color: e.color,
                }}
              >
                {e.agent}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: e.active ? "var(--text)" : "var(--text2)",
                  lineHeight: 1.5,
                }}
              >
                {e.message}
                {e.active &&
                  (e.cursorColor ? (
                    <span className="df-cursor" style={{ background: e.cursorColor }} />
                  ) : (
                    <span className="df-cursor" />
                  ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
