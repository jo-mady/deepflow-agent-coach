import type { CSSProperties } from "react";
import { AGENT_STATUS_META, AGENT_STATUS_STYLES } from "@/constants";
import { Dot } from "@/components/ui/Dot";
import { MonoText } from "@/components/ui/MonoText";
import type { AgentStatus } from "@/types";

export type NodeState = "done" | "active" | "waiting" | "warn" | "blocked" | "error";

export interface AgentNodeProps {
  name: string;
  subtitle: string;
  state: NodeState;
  meta?: string;
  metaLive?: boolean;
  badge?: string;
}

/** NodeState mirrors AgentStatus except it uses "active" instead of "running". */
const toStatus = (state: NodeState): AgentStatus =>
  state === "active" ? "running" : state;

export function AgentNode({ name, subtitle, state, meta, metaLive, badge }: AgentNodeProps) {
  const status = toStatus(state);
  const styles = AGENT_STATUS_STYLES[status];

  const cardStyle: CSSProperties = {
    position: "relative",
    borderRadius: 10,
    padding: "12px 14px",
    border: "1px solid",
    borderColor: styles.border,
    background: styles.bg,
    boxShadow: styles.shadow === "none" ? undefined : styles.shadow,
  };
  // Structural opacity is not a color token; keep it here.
  if (state === "waiting") cardStyle.opacity = 0.35;
  else if (state === "done") cardStyle.opacity = 0.75;

  const resolvedMeta = meta && meta.length > 0 ? meta : AGENT_STATUS_META[status];

  return (
    <div style={cardStyle}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Dot color={styles.text} size={8} pulse={status === "running"} />
        <span
          style={{
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "-0.2px",
            color: styles.text,
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
      {resolvedMeta && (
        <div
          className={metaLive && status === "running" ? "df-pulse" : ""}
          style={{
            position: "absolute",
            top: 12,
            right: 14,
          }}
        >
          <MonoText size={9} color={styles.text}>
            {resolvedMeta}
          </MonoText>
        </div>
      )}
    </div>
  );
}

// Re-export AgentStatus for downstream consumers that need it alongside NodeState.
export type { AgentStatus };

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
