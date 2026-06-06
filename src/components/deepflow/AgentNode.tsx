import type { CSSProperties } from "react";

export type NodeState = "done" | "active" | "waiting";

export interface AgentNodeProps {
  name: string;
  subtitle: string;
  state: NodeState;
  meta?: string;
  metaLive?: boolean;
  badge?: string;
}

const dotStyle = (state: NodeState): CSSProperties => {
  const base: CSSProperties = {
    width: 8,
    height: 8,
    borderRadius: "50%",
    display: "inline-block",
    flexShrink: 0,
  };
  if (state === "done") return { ...base, background: "var(--done)" };
  if (state === "active") return { ...base, background: "var(--teal)" };
  return { ...base, background: "var(--slate)" };
};

export function AgentNode({ name, subtitle, state, meta, metaLive, badge }: AgentNodeProps) {
  const nameColor =
    state === "done" ? "var(--done)" : state === "active" ? "var(--teal)" : "var(--text2)";

  const cardStyle: CSSProperties = {
    position: "relative",
    borderRadius: 10,
    padding: "12px 14px",
    border: "1px solid",
  };
  if (state === "done") {
    cardStyle.borderColor = "var(--done-dim)";
    cardStyle.background = "#48BB7808";
    cardStyle.opacity = 0.75;
  } else if (state === "active") {
    cardStyle.borderColor = "var(--teal)";
    cardStyle.background = "var(--teal-dim)";
    cardStyle.boxShadow = "0 0 16px var(--teal-mid)";
  } else {
    cardStyle.borderColor = "var(--border2)";
    cardStyle.background = "transparent";
    cardStyle.opacity = 0.35;
  }

  return (
    <div style={cardStyle}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span className={state === "active" ? "df-pulse" : ""} style={dotStyle(state)} />
        <span
          style={{
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "-0.2px",
            color: nameColor,
          }}
        >
          {name}
        </span>
        {badge && (
          <span
            style={{
              marginLeft: 4,
              fontSize: 9,
              color: "var(--amber)",
              fontWeight: 600,
              letterSpacing: "0.08em",
            }}
          >
            {badge}
          </span>
        )}
      </div>
      <div
        style={{
          fontSize: 10,
          color: "var(--text3)",
          paddingLeft: 16,
          lineHeight: 1.5,
          marginTop: 4,
        }}
      >
        {subtitle}
      </div>
      {meta && (
        <div
          className={metaLive ? "df-pulse" : ""}
          style={{
            position: "absolute",
            top: 12,
            right: 14,
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 9,
            color: metaLive ? "var(--teal)" : "var(--text3)",
          }}
        >
          {meta}
        </div>
      )}
    </div>
  );
}

export function Connector({ label }: { label: string }) {
  return (
    <div style={{ paddingLeft: 20, display: "flex", alignItems: "center" }}>
      <div style={{ width: 1, height: 20, background: "var(--border2)", marginLeft: 3 }} />
      <div
        style={{
          paddingLeft: 10,
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 9,
          color: "var(--text3)",
        }}
      >
        {label}
      </div>
    </div>
  );
}
