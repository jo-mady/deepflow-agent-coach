import { createFileRoute, Link } from "@tanstack/react-router";
import { DeepFlowLayout } from "@/components/deepflow/DeepFlowLayout";
import { AgentNode, Connector } from "@/components/deepflow/AgentNode";
import { TracePanel } from "@/components/deepflow/TracePanel";
import { AccentActiveNode } from "@/components/deepflow/AccentActiveNode";
import { CriticSafetyBox } from "@/components/deepflow/CriticSafetyBox";
import { CognitiveLoadCard } from "@/components/deepflow/CognitiveLoadCard";
import { PanelHeader } from "@/components/ui/PanelHeader";
import { MonoText } from "@/components/ui/MonoText";
import { Tag } from "@/components/ui/Tag";
import {
  ASSESSMENT_MOCK_QUESTION,
  ASSESSMENT_MOCK_STATE,
  ASSESSMENT_MOCK_TRACE,
} from "@/data/mockData";
import { AGENT_DISPLAY_LABEL } from "@/constants";
import { panelLabel } from "@/lib/styles";
import type { QuestionResult, TraceLine } from "@/types";

export const Route = createFileRoute("/assessment")({
  head: () => ({
    meta: [
      { title: "DeepFlow · Assessment" },
      { name: "description", content: "Foundry IQ–grounded certification assessment." },
    ],
  }),
  component: AssessmentPage,
});

const PURPLE = "var(--purple)";

const traceLines: TraceLine[] = ASSESSMENT_MOCK_TRACE.map((e) => ({
  time: e.time,
  agent: AGENT_DISPLAY_LABEL[e.agent],
  color: e.agentColor,
  message: e.message,
  active: e.isActive || undefined,
  cursorColor: e.isActive ? e.agentColor : undefined,
}));

const questionDots: ("correct" | "wrong" | "active" | "empty")[] =
  ASSESSMENT_MOCK_STATE.questionResults.map((r: QuestionResult) =>
    r === "pending" ? "empty" : r,
  );

function AssessmentPage() {
  return (
    <DeepFlowLayout persona="employee" sessionId="EMP-001">
      <main
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "300px 1fr",
          overflow: "hidden",
          minHeight: 0,
        }}
      >
        <Sidebar />
        <div style={{ display: "grid", gridTemplateRows: "1fr 1fr", overflow: "hidden", minHeight: 0 }}>
          <TracePanel
            entries={traceLines}
            headerRight="ASSESSMENT MODE"
            headerRightColor={PURPLE}
          />
          <QuestionPanel />
        </div>
      </main>
      <BottomBar />
    </DeepFlowLayout>
  );
}

function Sidebar() {
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
      <div
        style={{
          padding: "16px 20px 12px",
          borderBottom: "1px solid var(--border)",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span style={panelLabel("var(--text3)")}>Agent Pipeline</span>
        <span style={panelLabel(PURPLE)}>STEP 5 OF 5</span>
      </div>

      <PhaseTrackAssessment />

      <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column" }}>
        <AgentNode
          name="EngagementAgent"
          subtitle="Friday · light schedule → assessment approved"
          state="done"
          meta="done"
        />
        <Connector label="→ cognitive_load: light" />

        <AccentActiveNode
          name="AssessmentAgent"
          subtitle="Q6 of 10 · Foundry IQ grounded · citing docs"
          meta="live"
          accentColor={PURPLE}
          shadowColor="#8B5CF633"
        />
        <Connector label="→ score → orchestrator" />

        <AgentNode
          name="EmployeeOrchestrator"
          subtitle="Waiting for result · will route on score"
          state="waiting"
        />

        <CriticSafetyBox subtitle="All 6 questions approved · 0 blocks" />
      </div>

      <div
        style={{
          margin: "8px 16px 4px",
          padding: "10px 14px",
          border: "1px solid var(--border2)",
          borderRadius: 8,
          background: "var(--surface2)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <span style={panelLabel("var(--text3)", 0.08)}>Running Score</span>
          <span style={{ fontSize: 11, fontWeight: 600, color: PURPLE }}>60%</span>
        </div>
        <div style={{ height: 4, background: "var(--border2)", borderRadius: 2, overflow: "hidden" }}>
          <div
            style={{
              width: "60%",
              height: "100%",
              background: "linear-gradient(90deg, var(--purple), var(--teal))",
              borderRadius: 2,
            }}
          />
        </div>
      </div>

      <div style={{ margin: "4px 16px 16px", display: "flex", flexWrap: "wrap", gap: 4 }}>
        {questionDots.map((d, i) => (
          <span
            key={i}
            className={d === "active" ? "df-pulse" : ""}
            style={{
              width: 16,
              height: 16,
              borderRadius: 4,
              border: `1px solid ${
                d === "correct"
                  ? "var(--done)"
                  : d === "wrong"
                    ? "var(--coral)"
                    : d === "active"
                      ? PURPLE
                      : "var(--border2)"
              }`,
              background:
                d === "correct" ? "var(--done)" : d === "wrong" ? "var(--coral)" : "transparent",
            }}
          />
        ))}
      </div>

      <div style={{ flex: 1 }} />
    </aside>
  );
}

function PhaseTrackAssessment() {
  const phases = [
    { label: "Profile", state: "done" },
    { label: "Curate", state: "done" },
    { label: "Plan", state: "done" },
    { label: "Confirm", state: "done" },
    { label: "Assess", state: "active" },
  ] as const;
  return (
    <div
      style={{
        display: "flex",
        padding: "12px 20px",
        borderBottom: "1px solid var(--border)",
        gap: 4,
      }}
    >
      {phases.map((p) => {
        const color = p.state === "active" ? PURPLE : "var(--done)";
        const barColor = p.state === "active" ? PURPLE : "var(--done)";
        return (
          <div key={p.label} style={{ flex: 1, textAlign: "center" }}>
            <div style={{ fontSize: 9, fontWeight: 500, color, paddingBottom: 6 }}>{p.label}</div>
            <div style={{ height: 2, background: barColor, borderRadius: 1 }} />
          </div>
        );
      })}
    </div>
  );
}

function QuestionPanel() {
  const options = ASSESSMENT_MOCK_QUESTION.options.map((o) => ({
    key: o.key,
    text: o.text,
    selected: ASSESSMENT_MOCK_QUESTION.selectedOption === o.key,
  }));

  return (
    <section style={{ background: "var(--surface)", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <PanelHeader
        left="Question 6 of 10"
        right="75% TO PASS · CURRENTLY 60%"
        rightMono
      />

      <div
        style={{
          padding: 20,
          display: "flex",
          flexDirection: "column",
          gap: 16,
          overflowY: "auto",
        }}
      >
        <CognitiveLoadCard
          pressure=""
          difficulty=""
          recommendation=""
          message="Your Friday schedule is clear — I've approved this assessment. You're in a good cognitive state to tackle these questions."
        />

        <div
          style={{
            border: `1px solid ${PURPLE}`,
            borderRadius: 12,
            background: "var(--purple-dim)",
            padding: "18px 20px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <MonoText size={11} color={PURPLE}>Q6</MonoText>
            <Tag label="NSG Rules" color="var(--text3)" bg="var(--surface2)" borderColor="var(--border2)" padding="2px 8px" />
            <MonoText style={{ marginLeft: "auto" }}>Source: az_104_study_guide.md</MonoText>
          </div>

          <div
            style={{
              fontSize: 14,
              fontWeight: 500,
              lineHeight: 1.6,
              marginBottom: 14,
              color: "var(--text)",
            }}
          >
            What is the maximum number of inbound security rules allowed in a single Network Security Group (NSG)?
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {options.map((o) => (
              <div
                key={o.key}
                style={{
                  background: o.selected ? "var(--purple-dim)" : "var(--surface2)",
                  border: `1px solid ${o.selected ? PURPLE : "var(--border2)"}`,
                  borderRadius: 8,
                  padding: "10px 14px",
                  fontSize: 12,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  transition: "all 0.15s",
                  color: "var(--text2)",
                }}
              >
                <MonoText style={{ width: 16 }}>{o.key}</MonoText>
                <span>{o.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BottomBar() {
  return (
    <footer
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "12px 20px",
        borderTop: "1px solid var(--border)",
        background: "rgba(7,9,15,0.95)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        flexShrink: 0,
        zIndex: 10,
      }}
    >
      <MonoText size={12} style={{ flex: 1 }}>
        Q6 / 10 · 60% running · need 75% to pass
      </MonoText>
      <button
        style={{
          background: "transparent",
          color: "var(--text3)",
          border: "1px solid var(--border2)",
          borderRadius: 10,
          padding: "10px 16px",
          fontSize: 12,
        }}
      >
        Skip
      </button>
      <button
        style={{
          background: PURPLE,
          color: "#fff",
          border: "none",
          borderRadius: 10,
          padding: "10px 18px",
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: "0.02em",
        }}
      >
        Submit Answer →
      </button>
    </footer>
  );
}

void Link;
