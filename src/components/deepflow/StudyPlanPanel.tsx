import { EMPLOYEE_MOCK_MILESTONES, EMPLOYEE_MOCK_SESSIONS } from "@/data/mockData";
import { PanelHeader } from "@/components/ui/PanelHeader";
import { PanelCard } from "@/components/ui/PanelCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { MilestoneRow } from "./MilestoneRow";
import { SessionRow } from "./SessionRow";

/* Adapter: map typed mock data → row view shapes (visuals unchanged). */
const milestones = EMPLOYEE_MOCK_MILESTONES.map((m) => ({
  name: m.name,
  date: m.targetDate,
  status: (m.status === "pending" ? "default" : m.status) as "done" | "active" | "default",
}));

const sessions = EMPLOYEE_MOCK_SESSIONS.map((s) => ({
  day: s.day,
  topic: s.topic,
  sessionType: s.sessionType,
  durationMinutes: s.durationMinutes,
  isToday: Boolean(s.isToday),
}));

export function StudyPlanPanel() {
  return (
    <section style={{ background: "var(--surface)", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <PanelHeader
        left="Study Plan (Streaming)"
        right="AZ-104 · 6 WEEKS"
        rightMono
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
          padding: "16px 20px",
          overflow: "auto",
        }}
      >
        <div>
          <SectionLabel>Milestones</SectionLabel>
          <PanelCard>
            {milestones.map((m, i) => (
              <MilestoneRow
                key={m.name}
                name={m.name}
                date={m.date}
                status={m.status}
                isLast={i === milestones.length - 1}
              />
            ))}
          </PanelCard>
        </div>

        <div>
          <SectionLabel>This Week · Sessions</SectionLabel>
          <PanelCard>
            {sessions.map((s, i) => (
              <SessionRow
                key={s.day}
                day={s.day}
                topic={s.topic}
                sessionType={s.sessionType}
                durationMinutes={s.durationMinutes}
                isToday={s.isToday}
                isLast={i === sessions.length - 1}
              />
            ))}
          </PanelCard>
        </div>
      </div>
    </section>
  );
}
