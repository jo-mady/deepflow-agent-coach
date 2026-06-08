import type { ClarificationAnswer } from "@/types";

interface ClarificationAnswerCardProps {
  answer: ClarificationAnswer;
  onDismiss: () => void;
}

export function ClarificationAnswerCard({ answer, onDismiss }: ClarificationAnswerCardProps) {
  return (
    <div
      style={{
        border: "1px solid var(--teal)",
        borderRadius: 10,
        background: "var(--surface2)",
        padding: "16px 18px",
        marginBottom: 12,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <span
          style={{
            fontSize: 10,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "var(--teal)",
          }}
        >
          💬 Clarification
        </span>
        <button
          onClick={onDismiss}
          style={{
            fontSize: 14,
            color: "var(--text3)",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            lineHeight: 1,
          }}
          aria-label="Dismiss clarification"
        >
          ×
        </button>
      </div>

      <p
        style={{
          fontSize: 12,
          color: "var(--text2)",
          lineHeight: 1.6,
          marginBottom: 12,
        }}
      >
        {answer.answer}
      </p>

      <div>
        <div
          style={{
            fontSize: 9,
            textTransform: "uppercase",
            fontWeight: 600,
            letterSpacing: "0.1em",
            color: "var(--text3)",
            marginBottom: 6,
          }}
        >
          Sources
        </div>
        {answer.sources.map((s, i) => {
          const isLast = i === answer.sources.length - 1;
          return (
            <div
              key={s.sourceUrl}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "4px 0",
                borderBottom: isLast ? "none" : "1px solid var(--border)",
              }}
            >
              <span
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 9,
                  color: "var(--text3)",
                  width: 16,
                }}
              >
                [{i + 1}]
              </span>
              <span style={{ fontSize: 10, color: "var(--text2)", flex: 1 }}>
                {s.sourceType === "web" ? "🌐 " : ""}
                {s.sourceDoc}
              </span>
              <a
                href={s.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: 10,
                  color: "var(--text3)",
                  cursor: "pointer",
                  textDecoration: "none",
                }}
              >
                ↗
              </a>
            </div>
          );
        })}
      </div>

      {answer.tavilyUsed && (
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
          <span
            style={{
              fontSize: 9,
              color: "var(--text3)",
              fontFamily: "JetBrains Mono, monospace",
            }}
          >
            🌐 Web search used
          </span>
        </div>
      )}
    </div>
  );
}
