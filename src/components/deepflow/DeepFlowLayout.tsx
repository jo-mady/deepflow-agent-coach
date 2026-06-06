import { useEffect, type ReactNode } from "react";
import { TopBar } from "@/components/deepflow/TopBar";
import { DebugPanel } from "@/components/deepflow/DebugPanel";
import { useVoice } from "@/hooks/useVoice";
import { useSSE, SSEConnectionProvider, type Persona } from "@/hooks/useSSE";

interface DeepFlowLayoutProps {
  persona: Persona;
  sessionId: string;
  children: ReactNode;
}

export function DeepFlowLayout({ persona, sessionId, children }: DeepFlowLayoutProps) {
  const { voiceEnabled, toggle, speak } = useVoice();
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
