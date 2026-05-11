"use client";

import ProjectCard from "@/components/ProjectCard";
import { GROWITH_OVERVIEW, GROWITH_PROJECTS } from "@/lib/constants";

export default function GrowithModalContent() {
  return (
    <div>
      <div style={{ marginBottom: 64 }}>
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
          {GROWITH_OVERVIEW}
        </p>
      </div>

      <div
        className="type-eyebrow"
        style={{ color: "var(--color-text-tertiary)", marginBottom: 32 }}
      >
        FOUR PRODUCTION SYSTEMS · SHIPPED
      </div>

      <div className="flex flex-col">
        {GROWITH_PROJECTS.map((p) => (
          <ProjectCard
            key={p.index}
            index={p.index}
            category={p.category}
            title={p.title}
            problem={p.problem}
            approach={p.approach}
            metrics={p.metrics}
            stack={p.stack}
            clients={"clients" in p ? p.clients : undefined}
          />
        ))}
      </div>
    </div>
  );
}
