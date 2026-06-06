import { useEffect, type ReactNode } from "react";
import { TopBar } from "@/components/deepflow/TopBar";
import { DebugPanel } from "@/components/deepflow/DebugPanel";
import { useVoice } from "@/hooks/useVoice";
import { useSSE, type Persona } from "@/hooks/useSSE";

interface DeepFlowLayoutProps {
  persona: Persona;
  sessionId: string;
  children: ReactNode;
}

export function DeepFlowLayout({ persona, sessionId, children }: DeepFlowLayoutProps) {
  const { voiceEnabled, toggle, speak } = useVoice();
  const { events } = useSSE(persona, sessionId);

  useEffect(() => {
    if (!voiceEnabled) return;
    events.forEach((e, i) => speak(`${persona}-${sessionId}-${i}`, e.message));
  }, [events, voiceEnabled, speak, persona, sessionId]);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
      <TopBar voiceEnabled={voiceEnabled} onToggleVoice={toggle} />
      {children}
      <DebugPanel />
    </div>
  );
}

