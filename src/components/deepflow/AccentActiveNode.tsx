export interface AccentActiveNodeStep {
  status: "done" | "active" | "waiting";
  glyph: string;
  color: string;
  text: string;
}

export interface AccentActiveNodeProps {
  name: string;
  subtitle: string;
  meta: string;
  accentColor: string;
  shadowColor: string;
  steps?: AccentActiveNodeStep[];
}

export function AccentActiveNode({
  name,
  subtitle,
  meta,
  accentColor,
  shadowColor,
  steps,
}: AccentActiveNodeProps) {
  return (
    <div
      style={{
        position: "relative",
        borderRadius: 10,
        padding: "12px 14px",
        border: `1px solid ${accentColor}`,
        background:
          accentColor === "var(--purple)" ? "var(--purple-dim)" : "var(--amber-dim)",
        boxShadow: `0 0 16px ${shadowColor}`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span
          className="df-pulse"
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: accentColor,
            display: "inline-block",
          }}
        />
        <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "-0.2px", color: accentColor }}>
          {name}
        </span>
      </div>

      {steps ? (
        <div style={{ padding: "8px 0 0 16px", display: "flex", flexDirection: "column", gap: 6 }}>
          {steps.map((s) => (
            <div key={s.text} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11 }}>
              <span
                className={s.status === "active" ? "df-pulse" : ""}
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
      ) : (
        <div style={{ fontSize: 10, color: "var(--text3)", paddingLeft: 16, lineHeight: 1.5, marginTop: 4 }}>
          {subtitle}
        </div>
      )}

      <div
        className="df-pulse"
        style={{
          position: "absolute",
          top: 12,
          right: 14,
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 9,
          color: accentColor,
        }}
      >
        {meta}
      </div>
    </div>
  );
}
