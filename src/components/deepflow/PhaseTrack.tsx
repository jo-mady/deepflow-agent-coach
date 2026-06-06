export type PhaseState = "done" | "active" | "default";
export interface Phase {
  label: string;
  state: PhaseState;
}

export function PhaseTrack({ phases }: { phases: Phase[] }) {
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
        const color =
          p.state === "done" ? "var(--done)" : p.state === "active" ? "var(--teal)" : "var(--text3)";
        const barColor =
          p.state === "done" ? "var(--done)" : p.state === "active" ? "var(--teal)" : "var(--border2)";
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
