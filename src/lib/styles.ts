import type { CSSProperties } from "react";

/**
 * Shared panel label style used in section headers across DeepFlow views.
 */
export const panelLabel = (color: string, spacing = 0.12): CSSProperties => ({
  fontSize: 10,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: `${spacing}em`,
  color,
});
