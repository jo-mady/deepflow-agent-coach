import type { CSSProperties, ReactNode } from "react";

export interface PanelCardProps {
  children: ReactNode;
  padding?: number;
  style?: CSSProperties;
}

/**
 * Bordered surface card used inside DeepFlow panels.
 * Named PanelCard to avoid case-clash with shadcn's `card.tsx`.
 */
export function PanelCard({ children, padding = 14, style }: PanelCardProps) {
  return (
    <div
      style={{
        border: "1px solid var(--border2)",
        borderRadius: 10,
        padding,
        background: "var(--surface2)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
