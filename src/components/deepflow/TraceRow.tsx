import { MonoText } from "@/components/ui/MonoText";

export interface TraceRowProps {
  time: string;
  agent: string;
  agentColor: string;
  message: string;
  isLast: boolean;
  isActive?: boolean;
  cursorColor?: string;
}

export function TraceRow({
  time,
  agent,
  agentColor,
  message,
  isLast,
  isActive,
  cursorColor,
}: TraceRowProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "70px 110px 1fr",
        gap: 12,
        padding: "8px 0",
        borderBottom: isLast ? "none" : "1px solid var(--border)",
        alignItems: "start",
      }}
    >
      <MonoText size={11}>{time}</MonoText>
      <MonoText size={11} color={agentColor} style={{ fontWeight: 500 }}>
        {agent}
      </MonoText>
      <div
        style={{
          fontSize: 12,
          color: isActive ? "var(--text)" : "var(--text2)",
          lineHeight: 1.5,
        }}
      >
        {message}
        {isActive &&
          (cursorColor ? (
            <span className="df-cursor" style={{ background: cursorColor }} />
          ) : (
            <span className="df-cursor" />
          ))}
      </div>
    </div>
  );
}
