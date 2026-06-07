import { useEffect, type ReactNode } from "react";
import { TopBar } from "@/components/deepflow/TopBar";
import { DebugPanel } from "@/components/deepflow/DebugPanel";
import { useVoice } from "@/hooks/useVoice";
import { useSSE, SSEConnectionProvider, type Persona } from "@/hooks/useSSE";
import { useAgentStore } from "@/lib/deepflow/agentStore";

interface DeepFlowLayoutProps {
  persona: Persona;
  sessionId: string;
  children: ReactNode;
}

export function DeepFlowLayout({ persona, sessionId, children }: DeepFlowLayoutProps) {
  const { voiceEnabled, toggle, speak } = useVoice();
  const { loadPreset } = useAgentStore();

  // Reset pipeline to the persona's preset on persona change so stale trace
  // entries from a previous persona don't bleed into the new one.
  useEffect(() => {
    loadPreset(persona);
  }, [persona, loadPreset]);

  const { events, connectionState } = useSSE(persona, sessionId);

  useEffect(() => {
    if (!voiceEnabled) return;
    events.forEach((e, i) => speak(`${persona}-${sessionId}-${i}`, e.message));
  }, [events, voiceEnabled, speak, persona, sessionId]);

  return (
    <SSEConnectionProvider state={connectionState}>
      <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
        <TopBar voiceEnabled={voiceEnabled} onToggleVoice={toggle} />
        {children}
        <DebugPanel />
      </div>
    </SSEConnectionProvider>
  );
}
