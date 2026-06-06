import { createFileRoute } from "@tanstack/react-router";
import { DeepFlowLayout } from "@/components/deepflow/DeepFlowLayout";

export const Route = createFileRoute("/manager")({
  head: () => ({ meta: [{ title: "DeepFlow · Manager" }] }),
  component: ManagerPage,
});

function ManagerPage() {
  return (
    <DeepFlowLayout persona="manager" sessionId="MGR-001">
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
        Manager view coming in Step 2
      </main>
    </DeepFlowLayout>
  );
}
