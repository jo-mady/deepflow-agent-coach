export interface CognitiveLoadCardProps {
  pressure: string;
  difficulty: string;
  recommendation: string;
  /** Optional full-message override (used by assessment approval variant). */
  message?: string;
}

export function CognitiveLoadCard({
  pressure,
  difficulty,
  recommendation,
  message,
}: CognitiveLoadCardProps) {
  // Two visual variants share the same amber card chrome but differ in layout.
  if (message) {
    return (
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
        <span>{message}</span>
      </div>
    );
  }

  return (
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
          {pressure} · {difficulty} → {recommendation}
        </div>
      </div>
    </div>
  );
}
