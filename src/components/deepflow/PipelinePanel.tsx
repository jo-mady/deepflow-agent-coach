import { AgentNode, Connector } from "./AgentNode";
import { PhaseTrack } from "./PhaseTrack";
import { CriticSafetyBox } from "./CriticSafetyBox";
import { CognitiveLoadCard } from "./CognitiveLoadCard";
import { PanelHeader } from "@/components/ui/PanelHeader";
import { ALL_PHASES, useAgentStore } from "@/lib/deepflow/agentStore";

interface NodeDef {
  agent: string;
  label: string;
  badge?: string;
  connector?: string;
}

const BASE_NODES: NodeDef[] = [
  { agent: "EmployeeOrchestrator", label: "EmployeeOrchestrator", connector: "→ goal=AZ-104, weeks=6, style=visual" },
  { agent: "EngagementAgent", label: "EngagementAgent", badge: "CORE", connector: "→ cognitive_load stored in state" },
  { agent: "PathCuratorAgent", label: "PathCuratorAgent", connector: "→ 3 paths → plan generator" },
  { agent: "StudyPlanGenerator", label: "StudyPlanGenerator", connector: "→ plan → CalendarAgent" },
  { agent: "AssessmentAgent", label: "AssessmentAgent" },
];

const CLARIFICATION_NODE: NodeDef = {
  agent: "ClarificationAgent",
  label: "ClarificationAgent",
  connector: "→ question detected",
};

export function PipelinePanel() {
  const { agents, currentPhase, cognitiveLoad, clarificationAnswer } = useAgentStore();
  const stepNumber = ALL_PHASES.indexOf(currentPhase) + 1;

  const NODES: NodeDef[] = clarificationAnswer
    ? [
        ...BASE_NODES.slice(0, 4),
        CLARIFICATION_NODE,
        ...BASE_NODES.slice(4),
      ]
    : BASE_NODES;

  return (
    <aside
      style={{
        background: "rgba(13,18,32,0.8)",
        borderRight: "1px solid var(--border)",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
      }}
    >
      <PanelHeader
        left="Agent Pipeline"
        right={`STEP ${stepNumber} OF ${ALL_PHASES.length}`}
        rightColor="var(--teal)"
        padding="16px 20px 12px"
      />

      <PhaseTrack />

      <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column" }}>
        {NODES.map((n, i) => {
          const s = agents[n.agent];
          if (!s) return null;
          const visualState =
            s.status === "done" ? "done" : s.status === "running" ? "active" : "waiting";
          const isLast = i === NODES.length - 1;
          return (
            <div key={n.agent}>
              <AgentNode
                name={n.label}
                badge={n.badge}
                subtitle={s.subtitle}
                state={visualState}
                meta={s.meta || undefined}
                metaLive={s.meta === "live"}
              />
              {!isLast && n.connector && <Connector label={n.connector} />}
            </div>
          );
        })}

        <CriticSafetyBox subtitle="Wrapping all outputs · 0 blocks · 0 warns" />
      </div>

      <div style={{ flex: 1 }} />

      {cognitiveLoad && (
        <CognitiveLoadCard
          pressure={cognitiveLoad.pressure}
          difficulty={cognitiveLoad.difficulty}
          recommendation={cognitiveLoad.recommendation}
        />
      )}
    </aside>
  );
}
