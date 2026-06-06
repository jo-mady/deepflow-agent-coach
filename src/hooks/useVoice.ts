import { useCallback, useEffect, useRef, useState } from "react";

export function useVoice() {
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const spokenRef = useRef<Set<string>>(new Set());

  const toggle = useCallback(() => {
    setVoiceEnabled((v) => {
      const next = !v;
      if (!next && typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      return next;
    });
  }, []);

  const speak = useCallback(
    (key: string, message: string) => {
      if (!voiceEnabled) return;
      if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
      if (spokenRef.current.has(key)) return;
      spokenRef.current.add(key);
      const u = new SpeechSynthesisUtterance(message);
      u.rate = 1.0;
      u.pitch = 1.0;
      window.speechSynthesis.speak(u);
    },
    [voiceEnabled],
  );

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return { voiceEnabled, toggle, speak };
}
