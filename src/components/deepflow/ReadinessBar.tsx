export interface ReadinessBarProps {
  percent: number;
  color: string;
}

export function ReadinessBar({ percent, color }: ReadinessBarProps) {
  return (
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
            width: `${percent}%`,
            height: "100%",
            background: color,
          }}
        />
      </div>
      <span
        style={{
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 10,
          color,
        }}
      >
        {percent}%
      </span>
    </div>
  );
}
