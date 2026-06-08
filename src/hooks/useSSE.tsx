import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  employeeMockEvents,
  managerMockEvents,
  type SSEEvent as MockSSEEvent,
} from "@/lib/deepflow/mockEvents";
import { useAgentStore } from "@/lib/deepflow/agentStore";
import { AGENT_COLORS, RECOMMENDED_HOURS, colorForAgent } from "@/constants";
import type { AgentName, CertId, SSEEvent } from "@/types";

export type Persona = "employee" | "manager";
export type ConnectionState = "connected" | "reconnecting" | "mock";

interface UseSSEResult {
  events: MockSSEEvent[];
  currentAgent: string | null;
  currentStatus: MockSSEEvent["status"] | null;
  connectionState: ConnectionState;
}

const API_URL = (import.meta.env.VITE_API_URL ?? "").trim();

/* ============================== TIMESTAMP HELPER ============================== */

function formatTimestamp(iso: string): string {
  const d = new Date(iso);
  const m = d.getMinutes().toString().padStart(2, "0");
  const s = d.getSeconds().toString().padStart(2, "0");
  const ms = Math.floor(d.getMilliseconds() / 100);
  return `${m}:${s}.${ms}`;
}

/* ============================== CONNECTION CONTEXT ============================== */

const SSEConnectionContext = createContext<ConnectionState>("mock");

export function SSEConnectionProvider({
  state,
  children,
}: {
  state: ConnectionState;
  children: ReactNode;
}) {
  return (
    <SSEConnectionContext.Provider value={state}>{children}</SSEConnectionContext.Provider>
  );
}

export function useSSEConnection(): ConnectionState {
  return useContext(SSEConnectionContext);
}

/* ============================== HOOK ============================== */

/**
 * useSSE — connects to /api/{persona}/stream?session_id={sessionId} when
 * VITE_API_URL is configured, otherwise returns bundled mock data.
 */
export function useSSE(persona: Persona, sessionId: string): UseSSEResult {
  const { advanceAgent, addTraceEntry } = useAgentStore();
  const [events, setEvents] = useState<MockSSEEvent[]>([]);
  const [connectionState, setConnectionState] = useState<ConnectionState>(
    API_URL ? "reconnecting" : "mock",
  );
  const esRef = useRef<EventSource | null>(null);

  /* -------- MOCK MODE -------- */
  useEffect(() => {
    if (API_URL) return;
    setConnectionState("mock");
    setEvents(persona === "employee" ? employeeMockEvents : managerMockEvents);
    // The agent store initial state already mirrors the mock data; do not
    // re-dispatch on mount to avoid duplicating trace entries.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [persona]);

  /* -------- REAL MODE -------- */
  useEffect(() => {
    if (!API_URL) return;
    if (typeof window === "undefined" || typeof EventSource === "undefined") return;

    let cancelled = false;
    const url = `${API_URL}/api/${persona}/stream?session_id=${encodeURIComponent(sessionId)}`;

    const es = new EventSource(url);
    esRef.current = es;

    es.onopen = () => {
      if (cancelled) return;
      setConnectionState("connected");
    };

    es.onmessage = (event: MessageEvent<string>) => {
      if (cancelled) return;
      let data: SSEEvent;
      try {
        data = JSON.parse(event.data) as SSEEvent;
      } catch {
        return;
      }

      advanceAgent(data.agent, {
        status: data.status === "running" ? "running" : data.status,
        subtitle: data.message,
        meta: data.status === "running" ? "live" : "done",
      });
      addTraceEntry({
        time: formatTimestamp(data.timestamp),
        agent: data.agent,
        agentColor:
          AGENT_COLORS[data.agent as AgentName] ?? colorForAgent(data.agent) ?? "var(--text3)",
        message: data.message,
        isActive: data.status === "running",
      });
    };

    es.onerror = () => {
      if (cancelled) return;
      // Let the native EventSource handle reconnection automatically.
      setConnectionState("reconnecting");
      addTraceEntry({
        time: formatTimestamp(new Date().toISOString()),
        agent: "EmployeeOrchestrator",
        agentColor: "var(--coral)",
        message: "⚠ Connection lost. Reconnecting...",
        isActive: true,
      });
    };

    return () => {
      cancelled = true;
      es.close();
      esRef.current = null;
    };
  }, [persona, sessionId, advanceAgent, addTraceEntry]);

  const last = events[events.length - 1];
  return {
    events,
    currentAgent: last?.agent ?? null,
    currentStatus: last?.status ?? null,
    connectionState,
  };
}
