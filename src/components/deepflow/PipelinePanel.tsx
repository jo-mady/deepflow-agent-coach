import { AgentNode, Connector } from "./AgentNode";
import { PhaseTrack } from "./PhaseTrack";

export function PipelinePanel() {
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
          STEP 3 OF 5
        </span>
      </div>

      <PhaseTrack
        phases={[
          { label: "Profile", state: "done" },
          { label: "Curate", state: "done" },
          { label: "Plan", state: "active" },
          { label: "Confirm", state: "default" },
          { label: "Assess", state: "default" },
        ]}
      />

      {/* Agent list */}
      <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column" }}>
        <AgentNode
          name="EmployeeOrchestrator"
          subtitle="Routing · intent extracted"
          state="done"
          meta="0.3s"
        />
        <Connector label="→ goal=AZ-104, weeks=6, style=visual" />
        <AgentNode
          name="EngagementAgent"
          badge="CORE"
          subtitle="Cognitive load: moderate+hard → 30min"
          state="done"
          meta="1.1s"
        />
        <Connector label="→ cognitive_load stored in state" />
        <AgentNode
          name="PathCuratorAgent"
          subtitle="3 paths ranked · MS Learn MCP"
          state="done"
          meta="2.4s"
        />
        <Connector label="→ 3 paths → plan generator" />
        <AgentNode
          name="StudyPlanGenerator"
          subtitle="Sequencing topics · placing hard on Fri..."
          state="active"
          meta="live"
          metaLive
        />
        <Connector label="→ plan → CalendarAgent" />
        <AgentNode
          name="AssessmentAgent"
          subtitle="Waiting · Foundry IQ ready"
          state="waiting"
        />

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
            Moderate schedule · NSG is hard (3 prereqs) → 30min session
          </div>
        </div>
      </div>
    </aside>
  );
}
