import { useEffect, useRef, useState } from "react";
import { employeeMockEvents, type SSEEvent } from "@/lib/deepflow/mockEvents";
import { colorForAgent, useAgentStore } from "@/lib/deepflow/agentStore";

export type Persona = "employee" | "manager";
export type ConnectionState = "connecting" | "connected" | "reconnecting" | "error";

interface UseSSEResult {
  events: SSEEvent[];
  currentAgent: string | null;
  currentStatus: SSEEvent["status"] | null;
  connectionState: ConnectionState;
}

/**
 * useSSE — would connect to /api/{persona}/stream?session_id={sessionId}
 * Has auto-reconnect logic on error (2s delay).
 * Dispatches incoming events to the agent store.
 */
export function useSSE(persona: Persona, sessionId: string): UseSSEResult {
  const [events, setEvents] = useState<SSEEvent[]>([]);
  const [connectionState, setConnectionState] = useState<ConnectionState>("connecting");
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const { advanceAgent, addTraceEntry } = useAgentStore();

  useEffect(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    // const url = `/api/${persona}/stream?session_id=${sessionId}`;
    // const es = new EventSource(url);
    // es.onmessage = (ev) => onSSEMessage(JSON.parse(ev.data));
    // es.onerror = () => { setConnectionState("reconnecting"); setTimeout(connect, 2000); };

    setConnectionState("connecting");
    setEvents(persona === "employee" ? employeeMockEvents : []);

    // NOTE: initial store state already mirrors mock data; we don't re-dispatch on mount
    // to avoid duplicating trace entries. Real SSE would dispatch each new event:
    void advanceAgent;
    void addTraceEntry;
    void sessionId;

    const t = setTimeout(() => setConnectionState("connected"), 100);
    timersRef.current.push(t);

    return () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
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

/** Helper to dispatch a raw SSE event to the store (call from real onmessage). */
export function dispatchSSEEvent(
  event: SSEEvent,
  store: ReturnType<typeof useAgentStore>,
): void {
  store.advanceAgent(event.agent, {
    status: event.status === "running" ? "running" : (event.status as "done" | "blocked"),
    reasoning: event.message,
  });
  store.addTraceEntry({
    time: event.timestamp,
    agent: event.agent,
    agentColor: colorForAgent(event.agent),
    message: event.message,
    isActive: event.status === "running",
  });
}
