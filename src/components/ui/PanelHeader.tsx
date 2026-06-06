import type { CSSProperties } from "react";

export interface PanelHeaderProps {
  left: string;
  leftColor?: string;
  right?: string;
  rightColor?: string;
  rightMono?: boolean;
  /** Override default "12px 20px" padding (e.g. PipelinePanel uses "16px 20px 12px"). */
  padding?: string;
}

const containerStyle = (padding: string): CSSProperties => ({
  padding,
  borderBottom: "1px solid var(--border)",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const leftStyle = (color: string): CSSProperties => ({
  fontSize: 10,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.12em",
  color,
});

const rightStyle = (color: string, mono: boolean): CSSProperties => ({
  fontSize: mono ? 9 : 10,
  fontWeight: mono ? 400 : 600,
  textTransform: "uppercase",
  letterSpacing: mono ? "0.08em" : "0.12em",
  color,
  ...(mono ? { fontFamily: "JetBrains Mono, monospace" } : {}),
});

export function PanelHeader({
  left,
  leftColor = "var(--text3)",
  right,
  rightColor = "var(--text3)",
  rightMono = false,
  padding = "12px 20px",
}: PanelHeaderProps) {
  return (
    <div style={containerStyle(padding)}>
      <span style={leftStyle(leftColor)}>{left}</span>
      {right !== undefined && <span style={rightStyle(rightColor, rightMono)}>{right}</span>}
    </div>
  );
}
