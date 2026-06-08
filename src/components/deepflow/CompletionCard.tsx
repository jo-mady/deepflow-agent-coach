import { PanelCard } from "@/components/ui/PanelCard";
import { MonoText } from "@/components/ui/MonoText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { CertId } from "@/types";

export interface CompletionCardProps {
  certId: CertId;
  hoursStudied: number;
  sessionsCompleted: number;
  milestonesCompleted: number;
  milestonesTotal: number;
}

export function CompletionCard({
  certId,
  hoursStudied,
  sessionsCompleted,
  milestonesCompleted,
  milestonesTotal,
}: CompletionCardProps) {
  return (
    <PanelCard style={{ border: "1px solid var(--done)", background: "var(--done-dim)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <span style={{ fontSize: 20 }}>🎉</span>
        <span style={{ fontSize: 13, fontWeight: 600, color: "var(--done)" }}>
          {certId} prep complete!
        </span>
      </div>

      <div style={{ display: "flex", gap: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <MonoText size={14} color="var(--done)">{hoursStudied}h</MonoText>
          <SectionLabel>Hours studied</SectionLabel>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <MonoText size={14} color="var(--done)">{sessionsCompleted}</MonoText>
          <SectionLabel>Sessions</SectionLabel>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <MonoText size={14} color="var(--done)">
            {milestonesCompleted} / {milestonesTotal}
          </MonoText>
          <SectionLabel>Milestones</SectionLabel>
        </div>
      </div>
    </PanelCard>
  );
}
