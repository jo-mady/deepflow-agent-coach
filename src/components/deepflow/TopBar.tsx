import { Link, useRouterState } from "@tanstack/react-router";
import { useVoice } from "@/hooks/useVoice";

type RouteKey = "/employee" | "/assessment" | "/manager";

const routeMeta: Record<RouteKey, { session: string; pill: { text: string; color: string }; accent: string }> = {
  "/employee": {
    session: "EMP-001 · AZ-104",
    pill: { text: "Live", color: "var(--teal)" },
    accent: "var(--teal)",
  },
  "/assessment": {
    session: "EMP-001 · AZ-104 · Attempt 1",
    pill: { text: "Assessing", color: "var(--purple)" },
    accent: "var(--teal)",
  },
  "/manager": {
    session: "MGR-001 · TEAM-A · 8 members",
    pill: { text: "Analysing", color: "var(--amber)" },
    accent: "var(--amber)",
  },
};

export interface TopBarProps {
  voiceEnabled: boolean;
  onToggleVoice: () => void;
}

export function TopBar({ voiceEnabled, onToggleVoice }: TopBarProps) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const route: RouteKey = pathname.startsWith("/manager")
    ? "/manager"
    : pathname.startsWith("/assessment")
      ? "/assessment"
      : "/employee";
  const meta = routeMeta[route];
  const isManager = route === "/manager";

  return (
    <header
      style={{
        height: 56,
        flexShrink: 0,
        zIndex: 10,
        background: "rgba(7,9,15,0.95)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        padding: "0 20px",
        gap: 16,
      }}
    >
      {/* Brand */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, flex: "0 0 auto" }}>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 7,
            background: "linear-gradient(135deg, #00D4AA, #0066FF)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontFamily: "Syne, sans-serif",
            fontWeight: 800,
            fontSize: 13,
            letterSpacing: "-0.02em",
          }}
        >
          DF
        </div>
        <div
          style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 700,
            fontSize: 17,
            letterSpacing: "-0.3px",
            color: "var(--text)",
          }}
        >
          DeepFlow
        </div>
      </div>

      {/* Persona toggle */}
      <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
        <div
          style={{
            display: "flex",
            background: "var(--surface2)",
            border: "1px solid var(--border)",
            borderRadius: 8,
            overflow: "hidden",
          }}
        >
          <PersonaButton to="/employee" active={!isManager} activeBg="var(--teal)">
            Employee
          </PersonaButton>
          <PersonaButton to="/manager" active={isManager} activeBg="var(--amber)">
            Manager
          </PersonaButton>
        </div>
      </div>

      {/* Right */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, flex: "0 0 auto" }}>
        <div
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 10,
            color: "var(--text3)",
          }}
        >
          {meta.session}
        </div>

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "4px 10px",
            borderRadius: 20,
            border: `1px solid ${meta.pill.color}`,
            background: `${meta.pill.color}22`,
            color: meta.pill.color,
            fontSize: 11,
            fontWeight: 500,
          }}
        >
          <span
            className="df-pulse"
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: meta.pill.color,
              display: "inline-block",
            }}
          />
          {meta.pill.text}
        </div>

        <button
          onClick={onToggleVoice}
          style={{
            border: "1px solid var(--border2)",
            background: "var(--surface2)",
            borderRadius: 8,
            padding: "6px 10px",
            fontSize: 11,
            fontWeight: 500,
            color: meta.accent,
          }}
        >
          🔊 Voice {voiceEnabled ? "On" : "Off"}
        </button>
      </div>
    </header>
  );
}

function PersonaButton({
  to,
  active,
  activeBg,
  children,
}: {
  to: RouteKey;
  active: boolean;
  activeBg: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      style={{
        padding: "6px 16px",
        fontSize: 12,
        fontWeight: active ? 600 : 500,
        background: active ? activeBg : "transparent",
        color: active ? "#07090F" : "var(--text2)",
        textDecoration: "none",
        display: "inline-flex",
        alignItems: "center",
        lineHeight: 1,
      }}
    >
      {children}
    </Link>
  );
}

export { useVoice };
