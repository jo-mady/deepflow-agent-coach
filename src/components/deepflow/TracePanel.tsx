import { useAgentStore } from "@/lib/deepflow/agentStore";
import { PanelHeader } from "@/components/ui/PanelHeader";
import { TraceRow } from "./TraceRow";
import { shortName } from "@/lib/deepflow/agentUtils";
import type { TraceLine, TracePanelProps } from "@/types";

export function TracePanel({
  entries,
  headerRight = "SSE CONNECTED",
  headerRightColor = "var(--teal)",
}: TracePanelProps = {}) {
  const { traceEntries } = useAgentStore();

  const lines: TraceLine[] =
    entries ??
    traceEntries.map((e, i, arr) => ({
      time: e.time,
      agent: shortName(e.agent),
      color: e.agentColor,
      message: e.message,
      active: e.isActive && i === arr.length - 1,
    }));

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
        right={headerRight}
        rightColor={headerRightColor}
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
