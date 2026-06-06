import type { CSSProperties } from "react";
import type { RiskLevel } from "@/types";

export interface RiskBadgeProps {
  risk: RiskLevel;
}

const base: CSSProperties = {
  fontSize: 9,
  fontWeight: 600,
  padding: "2px 7px",
  borderRadius: 4,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  border: "1px solid",
  display: "inline-block",
};

function styleFor(r: RiskLevel): CSSProperties {
  if (r === "High")
    return { ...base, background: "var(--coral-dim)", borderColor: "var(--coral)", color: "var(--coral)" };
  if (r === "Medium")
    return { ...base, background: "var(--amber-dim)", borderColor: "var(--amber)", color: "var(--amber)" };
  return { ...base, background: "var(--done-dim)", borderColor: "var(--done)", color: "var(--done)" };
}

export function RiskBadge({ risk }: RiskBadgeProps) {
  return <span style={styleFor(risk)}>{risk}</span>;
}
