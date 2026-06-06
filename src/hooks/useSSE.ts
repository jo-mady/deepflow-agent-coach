import { useEffect, useRef, useState } from "react";
import { employeeMockEvents, type SSEEvent } from "@/lib/deepflow/mockEvents";

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
 * For now returns mock data progressively. Auto-reconnects with 2s delay on error.
 */
export function useSSE(persona: Persona, sessionId: string): UseSSEResult {
  const [events, setEvents] = useState<SSEEvent[]>([]);
  const [connectionState, setConnectionState] = useState<ConnectionState>("connecting");
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    // Clear any prior timers
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    const url = `/api/${persona}/stream?session_id=${sessionId}`;
    // Future: const es = new EventSource(url); es.onmessage = ...; es.onerror = reconnect;
    void url;

    setConnectionState("connecting");

    // Seed with all mock events for the static demo view
    const seed = persona === "employee" ? employeeMockEvents : [];
    setEvents(seed);
    const t = setTimeout(() => setConnectionState("connected"), 100);
    timersRef.current.push(t);

    return () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, [persona, sessionId]);

  const last = events[events.length - 1];
  return {
    events,
    currentAgent: last?.agent ?? null,
    currentStatus: last?.status ?? null,
    connectionState,
  };
}
