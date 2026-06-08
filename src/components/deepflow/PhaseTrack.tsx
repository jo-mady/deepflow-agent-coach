import { Link } from "@tanstack/react-router";
import { ALL_PHASES, useAgentStore, type Phase } from "@/lib/deepflow/agentStore";

export type PhaseState = "done" | "active" | "default";

const LABELS: Record<Phase, string> = {
  profile: "Profile",
  curate: "Curate",
  plan: "Plan",
  confirm: "Confirm",
  assess: "Assess",
  revising: "Revising",
  done: "Done",
};

function deriveState(phase: Phase, current: Phase): PhaseState {
  const idx = ALL_PHASES.indexOf(phase);
  const curIdx = current === "done" ? ALL_PHASES.length : ALL_PHASES.indexOf(current);
  if (idx < curIdx) return "done";
  if (idx === curIdx) return "active";
  return "default";
}

export function PhaseTrack() {
  const { currentPhase } = useAgentStore();
  return (
    <div
      style={{
        display: "flex",
        padding: "12px 20px",
        borderBottom: "1px solid var(--border)",
        gap: 4,
      }}
    >
      {ALL_PHASES.map((p) => {
        const state = deriveState(p, currentPhase);
        const color =
          state === "done" ? "var(--done)" : state === "active" ? "var(--teal)" : "var(--text3)";
        const barColor =
          state === "done" ? "var(--done)" : state === "active" ? "var(--teal)" : "var(--border2)";
        const inner = (
          <>
            <div style={{ fontSize: 9, fontWeight: 500, color, paddingBottom: 6 }}>{LABELS[p]}</div>
            <div style={{ height: 2, background: barColor, borderRadius: 1 }} />
          </>
        );
        if (p === "assess") {
          return (
            <Link
              key={p}
              to="/assessment"
              style={{ flex: 1, textAlign: "center", textDecoration: "none", cursor: "pointer" }}
              title="Open assessment view"
            >
              {inner}
            </Link>
          );
        }
        return (
          <div key={p} style={{ flex: 1, textAlign: "center" }}>
            {inner}
          </div>
        );
      })}
    </div>
  );
}
