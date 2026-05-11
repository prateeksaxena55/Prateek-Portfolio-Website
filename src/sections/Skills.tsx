"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MagneticChip from "@/components/MagneticChip";
import { SKILLS } from "@/lib/constants";

const EASE = [0.22, 1, 0.36, 1] as const;

const FILTERS = ["all", ...SKILLS.map((s) => s.category)];

const GLASS_BG =
  "linear-gradient(135deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.25) 100%)";

export default function Skills() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const visible =
    activeFilter === "all"
      ? SKILLS
      : SKILLS.filter((s) => s.category === activeFilter);

  const expandFull = visible.length === 1;

  return (
    <section id="skills" className="relative py-20 md:py-32">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 overflow-hidden pointer-events-none"
      >
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "5%",
            width: 480,
            height: 480,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(45, 91, 255, 0.12) 0%, rgba(45, 91, 255, 0) 70%)",
            filter: "blur(60px)",
            animation: "blob-drift-1 18s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "40%",
            right: "8%",
            width: 520,
            height: 520,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(15, 122, 90, 0.10) 0%, rgba(15, 122, 90, 0) 70%)",
            filter: "blur(80px)",
            animation: "blob-drift-2 22s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "8%",
            left: "25%",
            width: 420,
            height: 420,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(217, 119, 87, 0.08) 0%, rgba(217, 119, 87, 0) 70%)",
            filter: "blur(70px)",
            animation: "blob-drift-3 26s ease-in-out infinite",
          }}
        />
      </div>
      <div className="container-wide">
        <div
          className="type-eyebrow"
          style={{ color: "var(--color-text-tertiary)", marginBottom: 16 }}
        >
          SECTION 02 · SKILLS
        </div>
        <h2
          className="type-h2"
          style={{ color: "var(--color-text-primary)", marginBottom: 24 }}
        >
          The tools I reach for.
        </h2>
        <p
          className="max-w-[640px]"
          style={{
            fontSize: 17,
            lineHeight: 1.6,
            color: "var(--color-text-secondary)",
            marginBottom: 32,
          }}
        >
          Languages, frameworks, and systems I use day-to-day to ship AI
          products — from LangGraph orchestrations and RAG pipelines to FastAPI
          services and production ML.
        </p>

        <div className="flex flex-wrap gap-2" style={{ marginBottom: 64 }}>
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className="capitalize"
                style={{
                  fontFamily: "var(--font-mono), ui-monospace, monospace",
                  fontSize: 12,
                  padding: "8px 16px",
                  borderRadius: 999,
                  backgroundColor: isActive
                    ? "var(--color-text-primary)"
                    : "transparent",
                  color: isActive ? "#FFFFFF" : "var(--color-text-secondary)",
                  border: isActive
                    ? "1px solid transparent"
                    : "1px solid var(--color-border)",
                  cursor: "pointer",
                  transition: "all 200ms ease",
                }}
                onMouseEnter={(e) => {
                  if (isActive) return;
                  e.currentTarget.style.borderColor = "var(--color-text-primary)";
                  e.currentTarget.style.color = "var(--color-text-primary)";
                }}
                onMouseLeave={(e) => {
                  if (isActive) return;
                  e.currentTarget.style.borderColor = "var(--color-border)";
                  e.currentTarget.style.color = "var(--color-text-secondary)";
                }}
              >
                {filter}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
          <AnimatePresence mode="popLayout">
            {visible.map((cat) => {
              const isHovered = hoveredCard === cat.number;
              return (
                <motion.div
                  layout
                  key={cat.number}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  onMouseEnter={() => setHoveredCard(cat.number)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`p-6 md:p-8 ${expandFull ? "md:col-span-2" : ""}`}
                  style={{
                    background: GLASS_BG,
                    backdropFilter: "blur(28px)",
                    WebkitBackdropFilter: "blur(28px)",
                    border: isHovered
                      ? "1px solid rgba(255,255,255,0.8)"
                      : "1px solid rgba(255,255,255,0.5)",
                    borderRadius: 24,
                    boxShadow: isHovered
                      ? "0 12px 40px rgba(10, 10, 10, 0.08)"
                      : "0 8px 32px rgba(10, 10, 10, 0.05)",
                    transform: isHovered ? "translateY(-2px)" : "translateY(0)",
                    transition:
                      "transform 300ms ease, border 300ms ease, box-shadow 300ms ease",
                  }}
                >
                  <div
                    className="type-eyebrow"
                    style={{
                      color: "var(--color-text-tertiary)",
                      marginBottom: 12,
                    }}
                  >
                    {cat.number}
                  </div>
                  <h3
                    className="type-h3"
                    style={{
                      color: "var(--color-text-primary)",
                      marginBottom: 20,
                    }}
                  >
                    {cat.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((skill) => (
                      <MagneticChip key={skill}>{skill}</MagneticChip>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
