import { Tag } from "@/components/ui/Tag";
import { MonoText } from "@/components/ui/MonoText";
import { SESSION_TYPE_STYLES } from "@/constants";
import type { SessionType } from "@/types";

export interface SessionRowProps {
  day: string;
  topic: string;
  sessionType: SessionType;
  durationMinutes: number;
  isToday: boolean;
  isLast: boolean;
}

export function SessionRow({
  day,
  topic,
  sessionType,
  durationMinutes,
  isToday,
  isLast,
}: SessionRowProps) {
  const accent = isToday ? "var(--teal)" : "var(--text3)";
  const style = SESSION_TYPE_STYLES[sessionType];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "6px 8px",
        margin: "0 -8px",
        borderBottom: isLast ? "none" : "1px solid var(--border)",
        background: isToday ? "var(--teal-dim)" : "transparent",
        borderRadius: isToday ? 6 : 0,
      }}
    >
      <MonoText color={accent} style={{ width: 28 }}>
        {day}
      </MonoText>
      <span style={{ flex: 1, fontSize: 11, color: "var(--text2)" }}>{topic}</span>
      <Tag label={sessionType} color={style.text} bg={style.bg} />
      <MonoText color={accent}>{`${durationMinutes}m`}</MonoText>
    </div>
  );
}
