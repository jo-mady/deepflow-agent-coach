import { createFileRoute } from "@tanstack/react-router";
import { DeepFlowLayout } from "@/components/deepflow/DeepFlowLayout";
import { PipelinePanel } from "@/components/deepflow/PipelinePanel";
import { TracePanel } from "@/components/deepflow/TracePanel";
import { StudyPlanPanel } from "@/components/deepflow/StudyPlanPanel";
import { InputBar } from "@/components/deepflow/InputBar";
import { useSSE } from "@/hooks/useSSE";

export const Route = createFileRoute("/employee")({
  head: () => ({
    meta: [
      { title: "DeepFlow · Employee" },
      { name: "description", content: "Live agent pipeline and adaptive study plan for the employee." },
    ],
  }),
  component: EmployeePage,
});

function EmployeePage() {
  const { events } = useSSE("employee", "EMP-001");

  return (
    <DeepFlowLayout persona="employee" sessionId="EMP-001">
      <main
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "300px 1fr",
          overflow: "hidden",
          minHeight: 0,
        }}
      >
        <PipelinePanel />
        <div
          style={{
            display: "grid",
            gridTemplateRows: "1fr 1fr",
            overflow: "hidden",
            minHeight: 0,
          }}
        >
          <TracePanel events={events} />
          <StudyPlanPanel />
        </div>
      </main>
      <InputBar />
    </DeepFlowLayout>
  );
}
