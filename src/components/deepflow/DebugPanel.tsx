import { useState } from "react";
import { ALL_PHASES, useAgentStore, type Phase, type Preset } from "@/lib/deepflow/agentStore";
import { MOCK_CLARIFICATION, EMPLOYEE_MOCK_PROGRESS, EMPLOYEE_MOCK_COMPLETION } from "@/data/mockData";

const PHASE_LABEL: Record<Phase, string> = {
  profile: "Profile",
  curate: "Curate",
  plan: "Plan",
  confirm: "Confirm",
  assess: "Assess",
  revising: "Revising",
  done: "Done",
};

export function DebugPanel() {
  const [open, setOpen] = useState(false);
  const { currentPhase, setPhase, stepForward, resetPipeline, loadPreset, setClarification, setCertProgress, advanceAgent, addTraceEntry } = useAgentStore();

  const triggerWarn = () => {
    const message =
      "Your role (Cloud Engineer) typically requires AZ-104, but you selected AZ-900. Confirm to continue, or switch?";
    advanceAgent("PathCuratorAgent", {
      status: "warn",
      subtitle: message,
      meta: "warn",
    });
    addTraceEntry({
      time: "demo",
      agent: "PathCuratorAgent",
      agentColor: "var(--amber)",
      message,
      isActive: false,
    });
  };


  return (
    <div
      style={{
        position: "fixed",
        bottom: 76,
        right: 16,
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 8,
        fontFamily: "DM Sans, sans-serif",
      }}
    >
      {open && (
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border2)",
            borderRadius: 10,
            padding: 12,
            width: 220,
            display: "flex",
            flexDirection: "column",
            gap: 8,
            boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
          }}
        >
          <div
            style={{
              fontSize: 10,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--text3)",
            }}
          >
            Demo Controls
          </div>

          <button onClick={stepForward} style={primaryBtn}>
            Step Forward →
          </button>
          <button onClick={resetPipeline} style={secondaryBtn}>
            Reset
          </button>

          <label style={label}>Jump to phase</label>
          <select
            value={currentPhase}
            onChange={(e) => setPhase(e.target.value as Phase)}
            style={selectStyle}
          >
            {ALL_PHASES.map((p) => (
              <option key={p} value={p}>
                {PHASE_LABEL[p]}
              </option>
            ))}
          </select>

          <label style={label}>Mock data set</label>
          <div style={{ display: "flex", gap: 4 }}>
            {(["employee", "assessment", "manager"] as Preset[]).map((p) => (
              <button key={p} onClick={() => loadPreset(p)} style={chipBtn}>
                {p}
              </button>
            ))}
          </div>

          <label style={label}>Clarification</label>
          <button onClick={() => setClarification(MOCK_CLARIFICATION)} style={secondaryBtn}>
            Trigger Clarification
          </button>
          <button onClick={() => setClarification(null)} style={secondaryBtn}>
            Clear Clarification
          </button>

          <label style={label}>Progress</label>
          <button onClick={() => setCertProgress(EMPLOYEE_MOCK_PROGRESS)} style={secondaryBtn}>
            Set Progress (22%)
          </button>
          <button
            onClick={() => {
              setPhase("done");
              setCertProgress({
                completionPercent: 100,
                hoursStudied: EMPLOYEE_MOCK_COMPLETION.hoursStudied,
                recommendedHours: EMPLOYEE_MOCK_PROGRESS.recommendedHours,
                sessionsCompleted: EMPLOYEE_MOCK_COMPLETION.sessionsCompleted,
                milestonesCompleted: EMPLOYEE_MOCK_COMPLETION.milestonesCompleted,
                milestonesTotal: EMPLOYEE_MOCK_COMPLETION.milestonesTotal,
              });
            }}
            style={secondaryBtn}
          >
            Trigger DONE phase
          </button>

          <label style={label}>Warnings</label>
          <button onClick={triggerWarn} style={secondaryBtn}>
            Trigger warn (PathCurator)
          </button>
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        title="Demo controls"
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "1px solid var(--border2)",
          background: "var(--surface2)",
          color: "var(--text)",
          fontSize: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        ⚙️
      </button>
    </div>
  );
}


const primaryBtn = {
  background: "var(--teal)",
  color: "#07090F",
  border: "none",
  borderRadius: 6,
  padding: "6px 10px",
  fontSize: 11,
  fontWeight: 600,
  cursor: "pointer",
} as const;

const secondaryBtn = {
  background: "transparent",
  color: "var(--text2)",
  border: "1px solid var(--border2)",
  borderRadius: 6,
  padding: "6px 10px",
  fontSize: 11,
  cursor: "pointer",
} as const;

const chipBtn = {
  flex: 1,
  background: "var(--surface2)",
  color: "var(--text2)",
  border: "1px solid var(--border2)",
  borderRadius: 6,
  padding: "4px 6px",
  fontSize: 10,
  textTransform: "capitalize" as const,
  cursor: "pointer",
};

const label = {
  fontSize: 9,
  textTransform: "uppercase" as const,
  letterSpacing: "0.08em",
  color: "var(--text3)",
  fontWeight: 600,
  marginTop: 4,
};

const selectStyle = {
  background: "var(--surface2)",
  color: "var(--text)",
  border: "1px solid var(--border2)",
  borderRadius: 6,
  padding: "6px 8px",
  fontSize: 11,
  fontFamily: "DM Sans, sans-serif",
  cursor: "pointer",
};
