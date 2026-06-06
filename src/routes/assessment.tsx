import { createFileRoute, Link } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { DeepFlowLayout } from "@/components/deepflow/DeepFlowLayout";
import { AgentNode, Connector } from "@/components/deepflow/AgentNode";
import {
  ASSESSMENT_MOCK_QUESTION,
  ASSESSMENT_MOCK_STATE,
  ASSESSMENT_MOCK_TRACE,
} from "@/data/mockData";
import { AGENT_DISPLAY_LABEL } from "@/constants";
import type { QuestionResult } from "@/types";

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
          <TracePanel />
          <QuestionPanel />
        </div>
      </main>
      <BottomBar />
    </DeepFlowLayout>
  );
}

/* ------------------------------ SIDEBAR ------------------------------ */

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

        {/* Assessment node in PURPLE (custom — AgentNode active=teal) */}
        <PurpleActiveNode
          name="AssessmentAgent"
          subtitle="Q6 of 10 · Foundry IQ grounded · citing docs"
          meta="live"
        />
        <Connector label="→ score → orchestrator" />

        <AgentNode
          name="EmployeeOrchestrator"
          subtitle="Waiting for result · will route on score"
          state="waiting"
        />

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
            All 6 questions approved · 0 blocks
          </div>
        </div>
      </div>

      {/* Score bar */}
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
        <div
          style={{
            height: 4,
            background: "var(--border2)",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
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

      {/* Question dots */}
      <div
        style={{
          margin: "4px 16px 16px",
          display: "flex",
          flexWrap: "wrap",
          gap: 4,
        }}
      >
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

// Map typed QuestionResult → visual dot state ("pending" → "empty").
const questionDots: ("correct" | "wrong" | "active" | "empty")[] =
  ASSESSMENT_MOCK_STATE.questionResults.map((r: QuestionResult) =>
    r === "pending" ? "empty" : r,
  );

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

function PurpleActiveNode({ name, subtitle, meta }: { name: string; subtitle: string; meta: string }) {
  return (
    <div
      style={{
        position: "relative",
        borderRadius: 10,
        padding: "12px 14px",
        border: `1px solid ${PURPLE}`,
        background: "var(--purple-dim)",
        boxShadow: "0 0 16px #8B5CF633",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span
          className="df-pulse"
          style={{ width: 8, height: 8, borderRadius: "50%", background: PURPLE, display: "inline-block" }}
        />
        <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "-0.2px", color: PURPLE }}>{name}</span>
      </div>
      <div style={{ fontSize: 10, color: "var(--text3)", paddingLeft: 16, lineHeight: 1.5, marginTop: 4 }}>
        {subtitle}
      </div>
      <div
        className="df-pulse"
        style={{
          position: "absolute",
          top: 12,
          right: 14,
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 9,
          color: PURPLE,
        }}
      >
        {meta}
      </div>
    </div>
  );
}

/* ------------------------------ TRACE ------------------------------ */

interface TraceLine {
  time: string;
  agent: string;
  color: string;
  message: string;
  active?: boolean;
  cursorColor?: string;
}

const traceLines: TraceLine[] = [
  {
    time: "08:52.1",
    agent: "Engagement",
    color: "var(--amber)",
    message:
      "Your Friday has just 1 meeting. Clear head, optimal for assessment. Approving assessment for today.",
  },
  {
    time: "08:52.3",
    agent: "CriticSafety",
    color: "var(--done)",
    message:
      "Assessment trigger approved. No safety flags. Human confirmation gate passed.",
  },
  {
    time: "08:52.8",
    agent: "Assessment",
    color: PURPLE,
    message:
      "Querying Foundry IQ for VNet topic. Retrieved 3 chunks from az_104_study_guide.md. Generating Q1.",
  },
  {
    time: "08:57.2",
    agent: "Assessment",
    color: PURPLE,
    message:
      "Q3 incorrect — NSG rule limit topic. Q5 incorrect — VNet peering limits. Noting weak topics.",
  },
  {
    time: "08:59.1",
    agent: "Assessment",
    color: PURPLE,
    message:
      "Generating Q6 on NSG topics. Retrieving chunks from Foundry IQ knowledge base...",
    active: true,
    cursorColor: PURPLE,
  },
];

function TracePanel() {
  return (
    <section style={{ display: "flex", flexDirection: "column", overflow: "hidden", borderBottom: "1px solid var(--border)" }}>
      <div
        style={{
          padding: "12px 20px",
          borderBottom: "1px solid var(--border)",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span style={panelLabel("var(--text3)")}>Live Reasoning Trace</span>
        <span
          style={{
            fontSize: 9,
            color: PURPLE,
            fontFamily: "JetBrains Mono, monospace",
            letterSpacing: "0.08em",
          }}
        >
          ASSESSMENT MODE
        </span>
      </div>
      <div style={{ overflowY: "auto", padding: "12px 20px" }}>
        {traceLines.map((e, i) => {
          const isLast = i === traceLines.length - 1;
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
              <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "var(--text3)" }}>
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
                {e.active && (
                  <span
                    className="df-cursor"
                    style={{ background: e.cursorColor ?? "var(--teal)" }}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ------------------------------ QUESTION ------------------------------ */

function QuestionPanel() {
  const options = [
    { key: "A", text: "100 rules", selected: false },
    { key: "B", text: "200 rules", selected: true },
    { key: "C", text: "500 rules", selected: false },
    { key: "D", text: "1000 rules", selected: false },
  ];

  return (
    <section style={{ background: "var(--surface)", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div
        style={{
          padding: "12px 20px",
          borderBottom: "1px solid var(--border)",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span style={panelLabel("var(--text3)")}>Question 6 of 10</span>
        <span
          style={{
            fontSize: 9,
            color: "var(--text3)",
            fontFamily: "JetBrains Mono, monospace",
            letterSpacing: "0.08em",
          }}
        >
          75% TO PASS · CURRENTLY 60%
        </span>
      </div>

      <div
        style={{
          padding: 20,
          display: "flex",
          flexDirection: "column",
          gap: 16,
          overflowY: "auto",
        }}
      >
        {/* Cognitive load approval */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "12px 14px",
            border: "1px solid var(--amber)",
            borderRadius: 10,
            background: "var(--amber-dim)",
            color: "var(--amber)",
            fontSize: 12,
            lineHeight: 1.5,
          }}
        >
          <span style={{ fontSize: 16 }}>🧠</span>
          <span>
            Your Friday schedule is clear — I've approved this assessment. You're in a good cognitive state to tackle these questions.
          </span>
        </div>

        {/* Question card */}
        <div
          style={{
            border: `1px solid ${PURPLE}`,
            borderRadius: 12,
            background: "var(--purple-dim)",
            padding: "18px 20px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: PURPLE }}>Q6</span>
            <span
              style={{
                background: "var(--surface2)",
                border: "1px solid var(--border2)",
                borderRadius: 4,
                padding: "2px 8px",
                color: "var(--text3)",
                textTransform: "uppercase",
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.08em",
              }}
            >
              NSG Rules
            </span>
            <span
              style={{
                marginLeft: "auto",
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 10,
                color: "var(--text3)",
              }}
            >
              Source: az_104_study_guide.md
            </span>
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
                <span
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: 10,
                    color: "var(--text3)",
                    width: 16,
                  }}
                >
                  {o.key}
                </span>
                <span>{o.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ BOTTOM BAR ------------------------------ */

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
      <div
        style={{
          flex: 1,
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 12,
          color: "var(--text3)",
        }}
      >
        Q6 / 10 · 60% running · need 75% to pass
      </div>
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

/* ------------------------------ utils ------------------------------ */

const panelLabel = (color: string, spacing = 0.12): CSSProperties => ({
  fontSize: 10,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: `${spacing}em`,
  color,
});

// Silence unused warning if Link not used here
void Link;
