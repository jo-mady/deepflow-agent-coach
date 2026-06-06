import { useAgentStore } from "@/lib/deepflow/agentStore";
import { PanelHeader } from "@/components/ui/PanelHeader";
import { TraceRow } from "./TraceRow";
import { shortName } from "@/lib/deepflow/agentUtils";
import { useSSEConnection, type ConnectionState } from "@/hooks/useSSE";
import type { TraceLine, TracePanelProps } from "@/types";

const CONNECTION_HEADER: Record<ConnectionState, { text: string; color: string }> = {
  connected: { text: "SSE CONNECTED", color: "var(--teal)" },
  reconnecting: { text: "⚠ RECONNECTING", color: "var(--coral)" },
  mock: { text: "MOCK MODE", color: "var(--text3)" },
};

export function TracePanel({
  entries,
  headerRight,
  headerRightColor,
}: TracePanelProps = {}) {
  const { traceEntries } = useAgentStore();
  const connection = useSSEConnection();

  const lines: TraceLine[] =
    entries ??
    traceEntries.map((e, i, arr) => ({
      time: e.time,
      agent: shortName(e.agent),
      color: e.agentColor,
      message: e.message,
      active: e.isActive && i === arr.length - 1,
    }));

  // Explicit headerRight (assessment/manager) wins; otherwise reflect SSE state.
  const fallback = CONNECTION_HEADER[connection];
  const right = headerRight ?? fallback.text;
  const rightColor = headerRightColor ?? fallback.color;

  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <PanelHeader
        left="Live Reasoning Trace"
        right={right}
        rightColor={rightColor}
        rightMono
      />
      <div style={{ overflowY: "auto", padding: "12px 20px" }}>
        {lines.map((e, i) => (
          <TraceRow
            key={i}
            time={e.time}
            agent={e.agent}
            agentColor={e.color}
            message={e.message}
            isLast={i === lines.length - 1}
            isActive={e.active}
            cursorColor={e.cursorColor}
          />
        ))}
      </div>
    </section>
  );
}
