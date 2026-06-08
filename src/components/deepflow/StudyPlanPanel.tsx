import { EMPLOYEE_MOCK_MILESTONES, EMPLOYEE_MOCK_SESSIONS, EMPLOYEE_MOCK_COMPLETION } from "@/data/mockData";
import { PanelHeader } from "@/components/ui/PanelHeader";
import { PanelCard } from "@/components/ui/PanelCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Tag } from "@/components/ui/Tag";
import { MilestoneRow } from "./MilestoneRow";
import { SessionRow } from "./SessionRow";
import { ClarificationAnswerCard } from "./ClarificationAnswerCard";
import { CompletionCard } from "./CompletionCard";
import { useAgentStore } from "@/lib/deepflow/agentStore";

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
  const { clarificationAnswer, setClarification, certProgress, currentPhase } = useAgentStore();
  const isDone = currentPhase === "done";
  const displayPercent = certProgress
    ? Math.min(100, isDone ? 100 : certProgress.completionPercent)
    : 0;

  return (
    <section style={{ background: "var(--surface)", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <PanelHeader
        left="Study Plan (Streaming)"
        right="AZ-104 · 6 WEEKS"
        rightMono
      />

      {/* Cert Progress Strip */}
      {certProgress && (
      <div
        style={{
          padding: "12px 20px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 6,
          }}
        >
          <span
            style={{
              fontSize: 10,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--text3)",
            }}
          >
            AZ-104 Progress
          </span>
          <span
            style={{
              fontSize: 12,
              fontWeight: 700,
              fontFamily: "Syne, sans-serif",
              color: "var(--teal)",
            }}
          >
            {displayPercent}%
          </span>
        </div>

        <div
          style={{
            width: "100%",
            height: 4,
            background: "var(--border2)",
            borderRadius: 2,
            overflow: "hidden",
            marginBottom: 8,
          }}
        >
          <div
            style={{
              width: `${displayPercent}%`,
              height: "100%",
              background: "linear-gradient(90deg, var(--teal), var(--blue))",
              borderRadius: 2,
            }}
          />
        </div>

        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11 }}>
              <span style={{ color: "var(--teal)" }}>{certProgress.hoursStudied}h</span>
              <span style={{ color: "var(--text3)" }}> / {certProgress.recommendedHours}h</span>
            </span>
            <span style={{ fontSize: 9, color: "var(--text3)" }}>Studied</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11 }}>
              {certProgress.sessionsCompleted}
            </span>
            <span style={{ fontSize: 9, color: "var(--text3)" }}>Sessions</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11 }}>
              {certProgress.milestonesCompleted} / {certProgress.milestonesTotal}
            </span>
            <span style={{ fontSize: 9, color: "var(--text3)" }}>Milestones</span>
          </div>
        </div>
      </div>
      )}

      <div style={{ overflow: "auto", padding: "16px 20px" }}>
        {clarificationAnswer && (
          <ClarificationAnswerCard
            answer={clarificationAnswer}
            onDismiss={() => setClarification(null)}
          />
        )}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
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
                  status={isDone ? "done" : m.status}
                  isLast={i === milestones.length - 1}
                />
              ))}
            </PanelCard>
          </div>

          <div>
            {isDone ? (
              <>
                <PanelHeader left="Completion Summary" rightColor="var(--done)" padding="0 0 10px" />
                <CompletionCard {...EMPLOYEE_MOCK_COMPLETION} />
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
