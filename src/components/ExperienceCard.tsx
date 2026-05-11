"use client";

import { forwardRef } from "react";
import { motion, type Variants } from "framer-motion";
import { ChevronRight } from "lucide-react";
import type { EXPERIENCE } from "@/lib/constants";

const EASE = [0.22, 1, 0.36, 1] as const;

type ExperienceItem = (typeof EXPERIENCE)[number];

type Props = {
  experience: ExperienceItem;
  onClick: () => void;
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24, x: 0 },
  show: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: { duration: 0.6, ease: EASE },
  },
  hover: { x: 2, transition: { duration: 0.2, ease: EASE } },
};

const chevronVariants: Variants = {
  hidden: { x: 0 },
  show: { x: 0 },
  hover: { x: 4, transition: { duration: 0.2, ease: EASE } },
};

const ExperienceCard = forwardRef<HTMLButtonElement, Props>(function ExperienceCard(
  { experience, onClick },
  ref
) {
  const statusLabel = experience.isCurrent ? "EXPERIENCE · NOW" : "EXPERIENCE";

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={onClick}
      aria-label={`View details for ${experience.role} at ${experience.company}`}
      initial="hidden"
      whileInView="show"
      whileHover="hover"
      viewport={{ once: true, amount: 0.2 }}
      variants={cardVariants}
      className="w-full text-left"
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.30) 100%)",
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        border: "1px solid rgba(255,255,255,0.5)",
        borderRadius: 16,
        padding: "32px 24px",
        cursor: "pointer",
        boxShadow: "0 8px 32px rgba(10, 10, 10, 0.05)",
        transition:
          "background 300ms ease, border-color 300ms ease, box-shadow 300ms ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.8)";
        e.currentTarget.style.background =
          "linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.45) 100%)";
        e.currentTarget.style.boxShadow = "0 12px 40px rgba(10, 10, 10, 0.08)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)";
        e.currentTarget.style.background =
          "linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.30) 100%)";
        e.currentTarget.style.boxShadow = "0 8px 32px rgba(10, 10, 10, 0.05)";
      }}
    >
      <div className="grid grid-cols-12 gap-6 items-center">
        <div className="hidden md:flex md:col-span-1 items-start">
          <span
            className="font-display"
            style={{
              fontSize: 56,
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: 1,
              color: "var(--color-text-tertiary)",
            }}
          >
            {experience.index}
          </span>
        </div>

        <div className="col-span-11 md:col-span-9">
          <div
            className="flex flex-row items-center gap-3"
            style={{ marginBottom: 12 }}
          >
            <span
              className="type-eyebrow"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              {experience.dateRange}
            </span>
            <span
              aria-hidden
              style={{
                width: 16,
                height: 1,
                backgroundColor: "var(--color-border)",
              }}
            />
            <span
              className="type-eyebrow inline-flex items-center gap-1.5"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              {experience.isCurrent && (
                <span
                  aria-hidden
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: "var(--color-accent-green)",
                    display: "inline-block",
                  }}
                />
              )}
              {statusLabel}
            </span>
          </div>

          <h3
            className="font-display text-[20px] md:text-[24px]"
            style={{
              fontWeight: 600,
              letterSpacing: "-0.01em",
              color: "var(--color-text-primary)",
              lineHeight: 1.25,
            }}
          >
            {experience.role}
          </h3>

          <p
            style={{
              fontSize: 15,
              color: "var(--color-text-secondary)",
              marginBottom: 12,
            }}
          >
            {experience.company}, {experience.location}
          </p>

          <p
            className="max-w-[720px]"
            style={{
              fontSize: 15,
              lineHeight: 1.55,
              color: "var(--color-text-secondary)",
            }}
          >
            {experience.summary}
          </p>
        </div>

        <div className="col-span-1 md:col-span-2 flex justify-end items-center">
          <motion.span
            variants={chevronVariants}
            className="inline-flex"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            <ChevronRight size={24} strokeWidth={2} />
          </motion.span>
        </div>
      </div>
    </motion.button>
  );
});

export default ExperienceCard;
