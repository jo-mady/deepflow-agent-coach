export interface DotProps {
  color: string;
  size?: number;
  pulse?: boolean;
}

export function Dot({ color, size = 6, pulse }: DotProps) {
  return (
    <span
      className={pulse ? "df-pulse" : ""}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        display: "inline-block",
        flexShrink: 0,
      }}
    />
  );
}
