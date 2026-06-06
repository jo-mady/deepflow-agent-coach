import type { CSSProperties } from "react";
import { EMPLOYEE_MOCK_MILESTONES, EMPLOYEE_MOCK_SESSIONS } from "@/data/mockData";
import type { SessionType } from "@/types";

/* Adapter: map typed mock data → local view shapes (visuals unchanged). */
const milestones = EMPLOYEE_MOCK_MILESTONES.map((m) => ({
  name: m.name,
  date: m.targetDate,
  dot: (m.status === "pending" ? "default" : m.status) as "done" | "active" | "default",
  highlight: m.status === "active",
}));

const sessions = EMPLOYEE_MOCK_SESSIONS.map((s) => ({
  day: s.day,
  topic: s.topic,
  type: s.sessionType,
  duration: `${s.durationMinutes}m`,
  today: s.isToday,
}));

const badgeStyle = (type: SessionType): CSSProperties => {
  const base: CSSProperties = {
    fontSize: 9,
    fontWeight: 600,
    textTransform: "uppercase",
    padding: "2px 6px",
    borderRadius: 4,
    letterSpacing: "0.06em",
    border: "1px solid",
  };
  if (type === "deep")
    return { ...base, background: "var(--teal-dim)", color: "var(--teal)", borderColor: "var(--teal)" };
  if (type === "light")
    return { ...base, background: "var(--amber-dim)", color: "var(--amber)", borderColor: "var(--amber)" };
  if (type === "done")
    return { ...base, background: "var(--done-dim)", color: "var(--done)", borderColor: "var(--done)" };
  return { ...base, background: "var(--surface2)", color: "var(--text3)", borderColor: "var(--border2)" };
};

const cardStyle: CSSProperties = {
  border: "1px solid var(--border2)",
  borderRadius: 10,
  padding: 14,
  background: "var(--surface2)",
};

const sectionLabel: CSSProperties = {
  fontSize: 10,
  textTransform: "uppercase",
  fontWeight: 600,
  letterSpacing: "0.1em",
  color: "var(--text3)",
  marginBottom: 10,
};

export function StudyPlanPanel() {
  return (
    <section style={{ background: "var(--surface)", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div
        style={{
          padding: "12px 20px",
          borderBottom: "1px solid var(--border)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontSize: 10,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: "var(--text3)",
          }}
        >
          Study Plan (Streaming)
        </span>
        <span
          style={{
            fontSize: 9,
            color: "var(--text3)",
            fontFamily: "JetBrains Mono, monospace",
            letterSpacing: "0.08em",
          }}
        >
          AZ-104 · 6 WEEKS
        </span>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
          padding: "16px 20px",
          overflow: "auto",
        }}
      >
        {/* Milestones */}
        <div>
          <div style={sectionLabel}>Milestones</div>
          <div style={cardStyle}>
            {milestones.map((m, i) => {
              const isLast = i === milestones.length - 1;
              const dotBg =
                m.dot === "done" ? "var(--done)" : m.dot === "active" ? "var(--teal)" : "var(--border2)";
              return (
                <div
                  key={m.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "6px 0",
                    borderBottom: isLast ? "none" : "1px solid var(--border)",
                  }}
                >
                  <span
                    className={m.dot === "active" ? "df-pulse" : ""}
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: dotBg,
                      display: "inline-block",
                    }}
                  />
                  <span
                    style={{
                      flex: 1,
                      fontSize: 12,
                      color: m.highlight ? "var(--text)" : "var(--text2)",
                    }}
                  >
                    {m.name}
                  </span>
                  <span
                    style={{
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: 10,
                      color: m.highlight ? "var(--teal)" : "var(--text3)",
                    }}
                  >
                    {m.date}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sessions */}
        <div>
          <div style={sectionLabel}>This Week · Sessions</div>
          <div style={cardStyle}>
            {sessions.map((s, i) => {
              const isLast = i === sessions.length - 1;
              return (
                <div
                  key={s.day}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "6px 8px",
                    margin: "0 -8px",
                    borderBottom: isLast ? "none" : "1px solid var(--border)",
                    background: s.today ? "var(--teal-dim)" : "transparent",
                    borderRadius: s.today ? 6 : 0,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: 10,
                      color: s.today ? "var(--teal)" : "var(--text3)",
                      width: 28,
                    }}
                  >
                    {s.day}
                  </span>
                  <span style={{ flex: 1, fontSize: 11, color: "var(--text2)" }}>{s.topic}</span>
                  <span style={badgeStyle(s.type)}>{s.type}</span>
                  <span
                    style={{
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: 10,
                      color: s.today ? "var(--teal)" : "var(--text3)",
                    }}
                  >
                    {s.duration}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
