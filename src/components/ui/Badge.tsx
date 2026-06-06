export interface BadgeProps {
  label: string;
  color: string;
  bg: string;
  padding?: string;
}

export function Badge({ label, color, bg, padding = "2px 6px" }: BadgeProps) {
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
