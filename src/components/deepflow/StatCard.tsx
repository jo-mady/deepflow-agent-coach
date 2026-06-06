export interface StatCardProps {
  value: string;
  color: string;
  label: string;
}

export function StatCard({ value, color, label }: StatCardProps) {
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
