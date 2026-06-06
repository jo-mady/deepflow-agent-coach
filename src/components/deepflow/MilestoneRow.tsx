import { Dot } from "@/components/ui/Dot";
import { MonoText } from "@/components/ui/MonoText";

export interface MilestoneRowProps {
  name: string;
  date: string;
  status: "done" | "active" | "default";
  isLast: boolean;
}

export function MilestoneRow({ name, date, status, isLast }: MilestoneRowProps) {
  const dotBg =
    status === "done" ? "var(--done)" : status === "active" ? "var(--teal)" : "var(--border2)";
  const highlight = status === "active";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "6px 0",
        borderBottom: isLast ? "none" : "1px solid var(--border)",
      }}
    >
      <Dot color={dotBg} pulse={status === "active"} />
      <span
        style={{
          flex: 1,
          fontSize: 12,
          color: highlight ? "var(--text)" : "var(--text2)",
        }}
      >
        {name}
      </span>
      <MonoText color={highlight ? "var(--teal)" : "var(--text3)"}>{date}</MonoText>
    </div>
  );
}
