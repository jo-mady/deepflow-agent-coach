import { createFileRoute } from "@tanstack/react-router";
import { useState, type CSSProperties } from "react";
import { DeepFlowLayout } from "@/components/deepflow/DeepFlowLayout";
import { AgentNode, Connector } from "@/components/deepflow/AgentNode";
import {
  MANAGER_MOCK_STATS,
  MANAGER_MOCK_TEAM,
  MANAGER_MOCK_TRACE,
} from "@/data/mockData";
import { AGENT_DISPLAY_LABEL, READINESS_THRESHOLDS } from "@/constants";
import type { TeamMember } from "@/types";

export const Route = createFileRoute("/manager")({
  head: () => ({
    meta: [
      { title: "DeepFlow · Manager" },
      { name: "description", content: "Team readiness aggregates · privacy-preserving manager view." },
    ],
  }),
  component: ManagerPage,
});

const AMBER = "var(--amber)";

function ManagerPage() {
  return (
    <DeepFlowLayout persona="manager" sessionId="MGR-001">
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
          <TeamTablePanel />
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
        <span style={panelLabel("var(--text3)")}>Manager Agent Pipeline</span>
        <span style={panelLabel(AMBER)}>STEP 2 OF 3</span>
      </div>

      <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column" }}>
        <AgentNode
          name="ManagerOrchestrator"
          subtitle="Routing · team context loaded"
          state="done"
          meta="0.4s"
        />
        <Connector label="→ Fabric IQ · Work IQ signals" />

        <AmberInsightsNode />

        <div
          style={{
            marginTop: 8,
            padding: "8px 14px",
            border: "1px solid var(--done-dim)",
            borderRadius: 8,
            background: "#48BB7806",
            opacity: 0.6,
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
            All outputs approved · privacy rules enforced
          </div>
        </div>
      </div>

      <div style={{ flex: 1 }} />

      {/* Stats grid */}
      <div
        style={{
          margin: "0 16px 16px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 8,
        }}
      >
        <StatCard value={`${MANAGER_MOCK_STATS.atRisk}`} color="var(--coral)" label="At risk" />
        <StatCard value={`${MANAGER_MOCK_STATS.onTrack}`} color="var(--done)" label="On track" />
        <StatCard value={`${MANAGER_MOCK_STATS.notStarted}`} color={AMBER} label="Not started" />
        <StatCard value={`${MANAGER_MOCK_STATS.teamAvg}%`} color="var(--blue)" label="Team avg" />
      </div>
    </aside>
  );
}

function StatCard({ value, color, label }: { value: string; color: string; label: string }) {
  return (
    <div
      style={{
        padding: "10px 12px",
        border: "1px solid var(--border2)",
        borderRadius: 8,
        background: "var(--surface2)",
      }}
    >
      <div
        style={{
          fontFamily: "Syne, sans-serif",
          fontSize: 22,
          fontWeight: 800,
          lineHeight: 1,
          marginBottom: 4,
          color,
        }}
      >
        {value}
      </div>
      <div style={{ fontSize: 10, color: "var(--text3)", fontWeight: 500 }}>{label}</div>
    </div>
  );
}

function AmberInsightsNode() {
  const steps = [
    { state: "done", glyph: "✓", color: "var(--done)", text: "Gap analysis · 8 members" },
    { state: "active", glyph: "→", color: AMBER, text: "Generating readiness report..." },
    { state: "waiting", glyph: "3", color: "var(--text3)", text: "Cert suggestions" },
  ] as const;

  return (
    <div
      style={{
        position: "relative",
        borderRadius: 10,
        padding: "12px 14px",
        border: `1px solid ${AMBER}`,
        background: "var(--amber-dim)",
        boxShadow: "0 0 16px #F5A62333",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span
          className="df-pulse"
          style={{ width: 8, height: 8, borderRadius: "50%", background: AMBER, display: "inline-block" }}
        />
        <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "-0.2px", color: AMBER }}>
          ManagerInsightsAgent
        </span>
      </div>

      <div style={{ padding: "8px 0 0 16px", display: "flex", flexDirection: "column", gap: 6 }}>
        {steps.map((s) => (
          <div key={s.text} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11 }}>
            <span
              className={s.state === "active" ? "df-pulse" : ""}
              style={{
                width: 16,
                height: 16,
                borderRadius: "50%",
                border: `1.5px solid ${s.color}`,
                color: s.color,
                fontSize: 8,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {s.glyph}
            </span>
            <span style={{ flex: 1, color: s.color }}>{s.text}</span>
          </div>
        ))}
      </div>

      <div
        className="df-pulse"
        style={{
          position: "absolute",
          top: 12,
          right: 14,
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 9,
          color: AMBER,
        }}
      >
        live
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

const traceLines: TraceLine[] = MANAGER_MOCK_TRACE.map((e) => ({
  time: e.time,
  agent: AGENT_DISPLAY_LABEL[e.agent],
  color: e.agentColor,
  message: e.message,
  active: e.isActive || undefined,
  cursorColor: e.isActive ? e.agentColor : undefined,
}));

function TracePanel() {
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
        }}
      >
        <span style={panelLabel("var(--text3)")}>Live Reasoning Trace</span>
        <span
          style={{
            fontSize: 9,
            color: AMBER,
            fontFamily: "JetBrains Mono, monospace",
            letterSpacing: "0.08em",
          }}
        >
          MANAGER MODE
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
                  <span className="df-cursor" style={{ background: e.cursorColor ?? "var(--teal)" }} />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ------------------------------ TEAM TABLE ------------------------------ */

type Tone = "high" | "mid" | "low";
interface Member {
  name: string;
  id: string;
  nameColor?: string;
  role: string;
  readiness: number;
  readinessTone: Tone; // high=green, mid=amber, low=coral
  loadHrs: string;
  loadTone: "good" | "mid" | "bad"; // green / amber / coral
  risk: "Low" | "Medium" | "High";
  rowBg?: string;
  action: { type: "text"; text: string; color: string } | { type: "button"; text: string };
}

/* Adapter: TeamMember (canonical) → Member (local render shape). Visuals unchanged. */
function readinessTone(pct: number): Tone {
  if (pct >= READINESS_THRESHOLDS.high) return "high";
  if (pct >= READINESS_THRESHOLDS.mid) return "mid";
  return "low";
}
function loadTone(hrs: number): Member["loadTone"] {
  if (hrs <= 12) return "good";
  if (hrs <= 19) return "mid";
  return "bad";
}
function toMember(tm: TeamMember): Member {
  const isHighLoad = tm.weeklyMeetingHours >= 26;
  const rowBg = tm.isBeingSuggested
    ? "rgba(0,212,170,0.04)"
    : tm.isAtRisk && isHighLoad
      ? "var(--coral-dim)"
      : undefined;
  const action: Member["action"] =
    tm.action.type === "suggest_cert"
      ? { type: "button", text: tm.action.label }
      : {
          type: "text",
          text: tm.action.label,
          color: tm.action.type === "suggested" ? "var(--done)" : "var(--text3)",
        };
  return {
    name: tm.name,
    id: tm.employeeId,
    nameColor: tm.isBeingSuggested ? AMBER : undefined,
    role: tm.role,
    readiness: tm.readinessPercent,
    readinessTone: readinessTone(tm.readinessPercent),
    loadHrs: `${tm.weeklyMeetingHours}h/wk`,
    loadTone: loadTone(tm.weeklyMeetingHours),
    risk: tm.risk,
    rowBg,
    action,
  };
}

const members: Member[] = MANAGER_MOCK_TEAM.map(toMember);

const toneToColor = (t: Tone) =>
  t === "high" ? "var(--done)" : t === "mid" ? "var(--amber)" : "var(--coral)";
const loadToColor = (t: Member["loadTone"]) =>
  t === "good" ? "var(--done)" : t === "mid" ? "var(--amber)" : "var(--coral)";

function riskBadgeStyle(r: Member["risk"]): CSSProperties {
  const base: CSSProperties = {
    fontSize: 9,
    fontWeight: 600,
    padding: "2px 7px",
    borderRadius: 4,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    border: "1px solid",
    display: "inline-block",
  };
  if (r === "High")
    return { ...base, background: "var(--coral-dim)", borderColor: "var(--coral)", color: "var(--coral)" };
  if (r === "Medium")
    return { ...base, background: "var(--amber-dim)", borderColor: AMBER, color: AMBER };
  return { ...base, background: "var(--done-dim)", borderColor: "var(--done)", color: "var(--done)" };
}

const th: CSSProperties = {
  textAlign: "left",
  fontSize: 10,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  color: "var(--text3)",
  padding: "0 12px 10px",
  borderBottom: "1px solid var(--border)",
};
const td: CSSProperties = {
  padding: "10px 12px",
  borderBottom: "1px solid var(--border)",
  fontSize: 12,
  verticalAlign: "middle",
};

function TeamTablePanel() {
  return (
    <section
      style={{
        background: "var(--surface)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "12px 20px",
          borderBottom: "1px solid var(--border)",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span style={panelLabel("var(--text3)")}>Team Readiness — TEAM-A</span>
        <span
          style={{
            fontSize: 9,
            color: "var(--text3)",
            fontFamily: "JetBrains Mono, monospace",
            letterSpacing: "0.08em",
          }}
        >
          READ ONLY · AGGREGATES ONLY
        </span>
      </div>
      <div style={{ padding: "16px 20px", overflowY: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={th}>Member</th>
              <th style={th}>Role</th>
              <th style={th}>Readiness</th>
              <th style={th}>Work Load</th>
              <th style={th}>Risk</th>
              <th style={th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {members.map((m, i) => {
              const isLast = i === members.length - 1;
              const rowTd = { ...td, borderBottom: isLast ? "none" : td.borderBottom };
              const readinessColor = toneToColor(m.readinessTone);
              const loadColor = loadToColor(m.loadTone);
              return (
                <tr key={m.id} style={{ background: m.rowBg ?? "transparent" }}>
                  <td style={rowTd}>
                    <div style={{ fontSize: 12, fontWeight: 500, color: m.nameColor ?? "var(--text)" }}>
                      {m.name}
                    </div>
                    <div
                      style={{
                        fontFamily: "JetBrains Mono, monospace",
                        fontSize: 10,
                        color: "var(--text3)",
                      }}
                    >
                      {m.id}
                    </div>
                  </td>
                  <td style={{ ...rowTd, color: "var(--text2)", fontSize: 11 }}>{m.role}</td>
                  <td style={rowTd}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div
                        style={{
                          height: 4,
                          background: "var(--border2)",
                          borderRadius: 2,
                          maxWidth: 80,
                          width: 80,
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            width: `${m.readiness}%`,
                            height: "100%",
                            background: readinessColor,
                          }}
                        />
                      </div>
                      <span
                        style={{
                          fontFamily: "JetBrains Mono, monospace",
                          fontSize: 10,
                          color: readinessColor,
                        }}
                      >
                        {m.readiness}%
                      </span>
                    </div>
                  </td>
                  <td style={rowTd}>
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <span
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: loadColor,
                          display: "inline-block",
                        }}
                      />
                      <span
                        style={{
                          fontFamily: "JetBrains Mono, monospace",
                          fontSize: 10,
                          color: loadColor,
                        }}
                      >
                        {m.loadHrs}
                      </span>
                    </div>
                  </td>
                  <td style={rowTd}>
                    <span style={riskBadgeStyle(m.risk)}>{m.risk}</span>
                  </td>
                  <td style={rowTd}>
                    {m.action.type === "text" ? (
                      <span
                        style={{
                          fontFamily:
                            m.action.color === "var(--done)" ? "JetBrains Mono, monospace" : "DM Sans, sans-serif",
                          fontSize: m.action.color === "var(--done)" ? 10 : 11,
                          color: m.action.color,
                        }}
                      >
                        {m.action.text}
                      </span>
                    ) : (
                      <button
                        style={{
                          border: `1px solid ${AMBER}`,
                          background: "var(--amber-dim)",
                          color: AMBER,
                          fontSize: 10,
                          fontWeight: 600,
                          borderRadius: 6,
                          padding: "4px 10px",
                        }}
                      >
                        {m.action.text}
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* ------------------------------ BOTTOM BAR ------------------------------ */

function BottomBar() {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  return (
    <footer
      style={{
        display: "flex",
        gap: 10,
        padding: "12px 20px",
        borderTop: "1px solid var(--border)",
        background: "rgba(7,9,15,0.95)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        flexShrink: 0,
        zIndex: 10,
        alignItems: "center",
      }}
    >
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Ask about team readiness, suggest a cert, or request a report..."
        style={{
          flex: 1,
          background: "var(--surface2)",
          border: `1px solid ${focused ? AMBER : "var(--border2)"}`,
          borderRadius: 10,
          padding: "10px 16px",
          color: "var(--text)",
          fontSize: 13,
        }}
      />
      <button
        style={{
          background: AMBER,
          color: "#07090F",
          border: "none",
          borderRadius: 10,
          padding: "10px 18px",
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: "0.02em",
        }}
      >
        Send ↗
      </button>
    </footer>
  );
}

const panelLabel = (color: string): CSSProperties => ({
  fontSize: 10,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.12em",
  color,
});
