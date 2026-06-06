import type { ReactNode } from "react";

export interface SectionLabelProps {
  children: ReactNode;
}

export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <div
      style={{
        fontSize: 10,
        textTransform: "uppercase",
        fontWeight: 600,
        letterSpacing: "0.1em",
        color: "var(--text3)",
        marginBottom: 10,
      }}
    >
      {children}
    </div>
  );
}
