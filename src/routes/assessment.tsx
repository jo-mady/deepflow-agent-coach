import { createFileRoute } from "@tanstack/react-router";
import { DeepFlowLayout } from "@/components/deepflow/DeepFlowLayout";

export const Route = createFileRoute("/assessment")({
  head: () => ({ meta: [{ title: "DeepFlow · Assessment" }] }),
  component: AssessmentPage,
});

function AssessmentPage() {
  return (
    <DeepFlowLayout persona="employee" sessionId="EMP-001">
      <main
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--text3)",
          fontSize: 13,
        }}
      >
        Assessment view coming in Step 2
      </main>
    </DeepFlowLayout>
  );
}
