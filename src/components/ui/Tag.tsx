export interface TagProps {
  label: string;
  color: string;
  bg: string;
  padding?: string;
}

/**
 * Uppercase outlined pill used for risks, session types, and topic tags.
 * Named Tag to avoid case-clash with shadcn's `badge.tsx`.
 */
export function Tag({ label, color, bg, padding = "2px 6px" }: TagProps) {
  return (
    <span
      style={{
        fontSize: 9,
        fontWeight: 600,
        textTransform: "uppercase",
        padding,
        borderRadius: 4,
        letterSpacing: "0.06em",
        border: "1px solid",
        borderColor: color,
        color,
        background: bg,
        display: "inline-block",
      }}
    >
      {label}
    </span>
  );
}
