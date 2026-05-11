"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export type ProjectCardProps = {
  index: number;
  category: string;
  title: string;
  problem: string;
  approach: string;
  metrics: Array<{ value: string; label: string }>;
  stack: string[];
  clients?: string[];
};

export default function ProjectCard({
  index,
  category,
  title,
  problem,
  approach,
  metrics,
  stack,
  clients,
}: ProjectCardProps) {
  const projectNumber = `PROJECT ${String(index).padStart(2, "0")}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE }}
      viewport={{ once: true, amount: 0.15 }}
      className="w-full py-16 md:py-20 border-t border-[color:var(--color-border)]"
    >
      <div
        className="flex flex-row items-center gap-3"
        style={{ color: "var(--color-text-tertiary)", marginBottom: 20 }}
      >
            <span className="type-eyebrow">{projectNumber}</span>
            <span aria-hidden className="type-eyebrow">·</span>
            <span className="type-eyebrow">{category}</span>
          </div>

          <h3
            className="font-display text-[24px] md:text-[28px]"
            style={{
              fontWeight: 600,
              letterSpacing: "-0.01em",
              lineHeight: 1.2,
              color: "var(--color-text-primary)",
              marginBottom: 16,
              maxWidth: 520,
            }}
          >
            {title}
          </h3>

          <p
            style={{
              fontSize: 17,
              fontStyle: "italic",
              lineHeight: 1.5,
              color: "var(--color-text-secondary)",
              marginBottom: 16,
              maxWidth: 600,
            }}
          >
            {problem}
          </p>

          <p
            style={{
              fontSize: 17,
              lineHeight: 1.6,
              color: "var(--color-text-secondary)",
              marginBottom: 32,
              maxWidth: 600,
            }}
          >
            {approach}
          </p>

          {clients && clients.length > 0 && (
            <div style={{ marginBottom: 32 }}>
              <div
                className="type-eyebrow"
                style={{ color: "var(--color-text-tertiary)", marginBottom: 8 }}
              >
                CLIENTS
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono), ui-monospace, monospace",
                  fontSize: 13,
                  color: "var(--color-text-secondary)",
                }}
              >
                {clients.join(" · ")}
              </div>
            </div>
          )}

          <div
            className="flex flex-row flex-wrap gap-6 md:gap-12"
            style={{ marginBottom: 32 }}
          >
            {metrics.map((m) => (
              <div key={m.label} className="flex flex-col">
                <span
                  className="font-display text-[28px] md:text-[36px]"
                  style={{
                    fontWeight: 600,
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                    color: "var(--color-accent-green)",
                  }}
                >
                  {m.value}
                </span>
                <span
                  className="type-small"
                  style={{
                    color: "var(--color-text-tertiary)",
                    marginTop: 4,
                  }}
                >
                  {m.label}
                </span>
              </div>
            ))}
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
                    fontSize: 12,
                    color: "var(--color-text-secondary)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 999,
                    backgroundColor: "transparent",
                    transitionDuration: "150ms",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor =
                      "var(--color-text-primary)";
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
    </motion.article>
  );
}
