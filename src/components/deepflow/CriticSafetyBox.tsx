export interface CriticSafetyBoxProps {
  subtitle: string;
  opacity?: number;
}

export function CriticSafetyBox({ subtitle, opacity }: CriticSafetyBoxProps) {
  return (
    <div
      style={{
        marginTop: 8,
        padding: "8px 14px",
        border: "1px solid var(--done-dim)",
        borderRadius: 8,
        background: "#48BB7806",
        ...(opacity !== undefined ? { opacity } : {}),
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
      <div style={{ fontSize: 10, color: "var(--text3)", marginTop: 2 }}>{subtitle}</div>
    </div>
  );
}
