import { useState } from "react";

export function InputBar() {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);

  return (
    <footer
      style={{
        display: "flex",
        gap: 10,
        padding: "12px 20px",
        borderTop: "1px solid var(--border)",
        background: "rgba(7,9,15,0.95)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        flexShrink: 0,
        zIndex: 10,
        alignItems: "center",
      }}
    >
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Ask DeepFlow anything about your learning plan..."
        style={{
          flex: 1,
          background: "var(--surface2)",
          border: `1px solid ${focused ? "var(--teal)" : "var(--border2)"}`,
          borderRadius: 10,
          padding: "10px 16px",
          color: "var(--text)",
          fontSize: 13,
          fontFamily: "DM Sans, sans-serif",
        }}
      />
      <button
        style={{
          background: "transparent",
          color: "var(--text3)",
          border: "1px solid var(--border2)",
          borderRadius: 10,
          padding: "10px 16px",
          fontSize: 12,
          fontFamily: "DM Sans, sans-serif",
        }}
      >
        Abandon
      </button>
      <button
        style={{
          background: "var(--teal)",
          color: "#07090F",
          border: "none",
          borderRadius: 10,
          padding: "10px 18px",
          fontSize: 12,
          fontWeight: 700,
          fontFamily: "DM Sans, sans-serif",
          letterSpacing: "0.02em",
        }}
      >
        Send ↗
      </button>
    </footer>
  );
}
