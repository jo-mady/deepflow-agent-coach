import type { CSSProperties, ReactNode } from "react";

export interface MonoTextProps {
  children: ReactNode;
  size?: number;
  color?: string;
  style?: CSSProperties;
}

export function MonoText({
  children,
  size = 10,
  color = "var(--text3)",
  style,
}: MonoTextProps) {
  return (
    <span
      style={{
        fontFamily: "JetBrains Mono, monospace",
        fontSize: size,
        color,
        ...style,
      }}
    >
      {children}
    </span>
  );
}
