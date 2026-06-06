import { AgentNode, Connector } from "./AgentNode";
import { PhaseTrack } from "./PhaseTrack";
import { ALL_PHASES, useAgentStore } from "@/lib/deepflow/agentStore";

interface NodeDef {
  agent: string;
  label: string;
  badge?: string;
  connector?: string;
}

const NODES: NodeDef[] = [
  { agent: "EmployeeOrchestrator", label: "EmployeeOrchestrator", connector: "→ goal=AZ-104, weeks=6, style=visual" },
  { agent: "EngagementAgent", label: "EngagementAgent", badge: "CORE", connector: "→ cognitive_load stored in state" },
  { agent: "PathCuratorAgent", label: "PathCuratorAgent", connector: "→ 3 paths → plan generator" },
  { agent: "StudyPlanGenerator", label: "StudyPlanGenerator", connector: "→ plan → CalendarAgent" },
  { agent: "AssessmentAgent", label: "AssessmentAgent" },
];

export function PipelinePanel() {
  const { agents, currentPhase, cognitiveLoad } = useAgentStore();
  const stepNumber = ALL_PHASES.indexOf(currentPhase) + 1;

  return (
    <aside
      style={{
        background: "rgba(13,18,32,0.8)",
        borderRight: "1px solid var(--border)",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "16px 20px 12px",
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
          Agent Pipeline
        </span>
        <span
          style={{
            fontSize: 10,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: "var(--teal)",
          }}
        >
          STEP {stepNumber} OF {ALL_PHASES.length}
        </span>
      </div>

      <PhaseTrack />

      {/* Agent list */}
      <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column" }}>
        {NODES.map((n, i) => {
          const s = agents[n.agent];
          if (!s) return null;
          const visualState =
            s.status === "done" ? "done" : s.status === "running" ? "active" : "waiting";
          const isLast = i === NODES.length - 1;
          return (
            <div key={n.agent}>
              <AgentNode
                name={n.label}
                badge={n.badge}
                subtitle={s.subtitle}
                state={visualState}
                meta={s.meta || undefined}
                metaLive={s.meta === "live"}
              />
              {!isLast && n.connector && <Connector label={n.connector} />}
            </div>
          );
        })}

        {/* CriticSafety */}
        <div
          style={{
            marginTop: 8,
            padding: "8px 14px",
            border: "1px solid var(--done-dim)",
            borderRadius: 8,
            background: "#48BB7806",
          }}
        >
          <div
            style={{
              fontSize: 10,
              fontWeight: 600,
              color: "var(--done)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            CriticSafety
          </div>
          <div style={{ fontSize: 10, color: "var(--text3)", marginTop: 2 }}>
            Wrapping all outputs · 0 blocks · 0 warns
          </div>
        </div>
      </div>

      <div style={{ flex: 1 }} />

      {/* Cognitive load card */}
      {cognitiveLoad && (
        <div
          style={{
            margin: "0 16px 16px",
            padding: "10px 14px",
            borderRadius: 8,
            border: "1px solid var(--amber)",
            background: "var(--amber-dim)",
            display: "flex",
            gap: 10,
            alignItems: "flex-start",
          }}
        >
          <div style={{ fontSize: 16, lineHeight: 1 }}>🧠</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div
              style={{
                fontSize: 10,
                fontWeight: 600,
                color: "var(--amber)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Today's Cognitive Load
            </div>
            <div style={{ fontSize: 11, color: "var(--text2)", lineHeight: 1.4 }}>
              {cognitiveLoad.pressure} · {cognitiveLoad.difficulty} → {cognitiveLoad.recommendation}
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
