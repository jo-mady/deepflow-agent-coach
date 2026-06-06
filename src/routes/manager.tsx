import { createFileRoute } from "@tanstack/react-router";
import { useState, type CSSProperties } from "react";
import { DeepFlowLayout } from "@/components/deepflow/DeepFlowLayout";
import { AgentNode, Connector } from "@/components/deepflow/AgentNode";
import { TracePanel } from "@/components/deepflow/TracePanel";
import { AccentActiveNode } from "@/components/deepflow/AccentActiveNode";
import { CriticSafetyBox } from "@/components/deepflow/CriticSafetyBox";
import { StatCard } from "@/components/deepflow/StatCard";
import { ReadinessBar } from "@/components/deepflow/ReadinessBar";
import { RiskBadge } from "@/components/deepflow/RiskBadge";
import { PanelHeader } from "@/components/ui/PanelHeader";
import { MonoText } from "@/components/ui/MonoText";
import { Dot } from "@/components/ui/Dot";
import {
  MANAGER_MOCK_STATS,
  MANAGER_MOCK_TEAM,
  MANAGER_MOCK_TRACE,
} from "@/data/mockData";
import { AGENT_DISPLAY_LABEL, READINESS_THRESHOLDS } from "@/constants";
import { panelLabel } from "@/lib/styles";
import type { TeamMember, TraceLine } from "@/types";

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

const insightsSteps = [
  { status: "done", glyph: "✓", color: "var(--done)", text: "Gap analysis · 8 members" },
  { status: "active", glyph: "→", color: AMBER, text: "Generating readiness report..." },
  { status: "waiting", glyph: "3", color: "var(--text3)", text: "Cert suggestions" },
] as const;

const traceLines: TraceLine[] = MANAGER_MOCK_TRACE.map((e) => ({
  time: e.time,
  agent: AGENT_DISPLAY_LABEL[e.agent],
  color: e.agentColor,
  message: e.message,
  active: e.isActive || undefined,
  cursorColor: e.isActive ? e.agentColor : undefined,
}));

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
          <TracePanel entries={traceLines} headerRight="MANAGER MODE" headerRightColor={AMBER} />
          <TeamTablePanel />
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

        <AccentActiveNode
          name="ManagerInsightsAgent"
          subtitle=""
          meta="live"
          accentColor={AMBER}
          shadowColor="#F5A62333"
          steps={[...insightsSteps]}
        />

        <CriticSafetyBox subtitle="All outputs approved · privacy rules enforced" opacity={0.6} />
      </div>

      <div style={{ flex: 1 }} />

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

type Tone = "high" | "mid" | "low";
interface Member {
  name: string;
  id: string;
  nameColor?: string;
  role: string;
  readiness: number;
  readinessTone: Tone;
  loadHrs: string;
  loadTone: "good" | "mid" | "bad";
  risk: "Low" | "Medium" | "High";
  rowBg?: string;
  action: { type: "text"; text: string; color: string } | { type: "button"; text: string };
}

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
      <PanelHeader
        left="Team Readiness — TEAM-A"
        right="READ ONLY · AGGREGATES ONLY"
        rightMono
      />
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
                    <MonoText>{m.id}</MonoText>
                  </td>
                  <td style={{ ...rowTd, color: "var(--text2)", fontSize: 11 }}>{m.role}</td>
                  <td style={rowTd}>
                    <ReadinessBar percent={m.readiness} color={readinessColor} />
                  </td>
                  <td style={rowTd}>
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <Dot color={loadColor} />
                      <MonoText color={loadColor}>{m.loadHrs}</MonoText>
                    </div>
                  </td>
                  <td style={rowTd}>
                    <RiskBadge risk={m.risk} />
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
