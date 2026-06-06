import type { CSSProperties, ReactNode } from "react";

export interface CardProps {
  children: ReactNode;
  padding?: number;
  style?: CSSProperties;
}

export function Card({ children, padding = 14, style }: CardProps) {
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
