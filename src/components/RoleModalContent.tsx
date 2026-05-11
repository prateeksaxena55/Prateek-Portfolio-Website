"use client";

type Props = {
  overview: string;
  achievements: string[];
  stack: string[];
};

export default function RoleModalContent({ overview, achievements, stack }: Props) {
  return (
    <div>
      <div style={{ marginBottom: 48 }}>
        <div
          className="type-eyebrow"
          style={{ color: "var(--color-text-tertiary)", marginBottom: 12 }}
        >
          OVERVIEW
        </div>
        <p
          className="max-w-[820px]"
          style={{
            fontSize: 17,
            lineHeight: 1.6,
            color: "var(--color-text-secondary)",
          }}
        >
          {overview}
        </p>
      </div>

      <div style={{ marginBottom: 48 }}>
        <div
          className="type-eyebrow"
          style={{ color: "var(--color-text-tertiary)", marginBottom: 24 }}
        >
          WHAT I SHIPPED
        </div>
        <div className="space-y-6">
          {achievements.map((a, i) => (
            <div key={i} className="flex flex-row items-start gap-4">
              <span
                style={{
                  fontFamily: "var(--font-mono), ui-monospace, monospace",
                  fontSize: 13, color: "var(--color-accent-blue)",
                  paddingTop: 4, flexShrink: 0,
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p
                className="max-w-[780px]"
                style={{ fontSize: 17, lineHeight: 1.6, color: "var(--color-text-secondary)" }}
              >
                {a}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div
          className="type-eyebrow"
          style={{ color: "var(--color-text-tertiary)", marginBottom: 12 }}
        >
          STACK
        </div>
        <div className="flex flex-wrap gap-2">
          {stack.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center px-3 py-1.5 transition-colors"
              style={{
                fontFamily: "var(--font-mono), ui-monospace, monospace",
                fontSize: 12, color: "var(--color-text-secondary)",
                border: "1px solid var(--color-border)", borderRadius: 999,
                backgroundColor: "transparent", transitionDuration: "150ms",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--color-text-primary)";
                e.currentTarget.style.color = "var(--color-text-primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--color-border)";
                e.currentTarget.style.color = "var(--color-text-secondary)";
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
