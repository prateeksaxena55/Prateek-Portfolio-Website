"use client";

import { motion } from "framer-motion";
import type { EDUCATION } from "@/lib/constants";

const EASE = [0.22, 1, 0.36, 1] as const;

type EducationItem = (typeof EDUCATION)[number];

type Props = {
  education: EducationItem;
};

export default function EducationCard({ education }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      viewport={{ once: true, amount: 0.2 }}
      className="w-full"
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.30) 100%)",
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        border: "1px solid rgba(255,255,255,0.5)",
        borderRadius: 16,
        padding: "32px 24px",
        boxShadow: "0 8px 32px rgba(10, 10, 10, 0.05)",
        transition: "border-color 300ms ease, box-shadow 300ms ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.7)";
        e.currentTarget.style.boxShadow = "0 10px 36px rgba(10, 10, 10, 0.06)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)";
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
            {education.index}
          </span>
        </div>

        <div className="col-span-12 md:col-span-11">
          <div
            className="flex flex-row items-center gap-3 flex-wrap"
            style={{ marginBottom: 12 }}
          >
            <span
              className="type-eyebrow"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              {education.dateRange}
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
              className="type-eyebrow"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              EDUCATION
            </span>
            {education.highlight && (
              <>
                <span
                  aria-hidden
                  style={{
                    width: 16,
                    height: 1,
                    backgroundColor: "var(--color-border)",
                  }}
                />
                <span
                  className="type-eyebrow"
                  style={{ color: "var(--color-accent-green)" }}
                >
                  {education.highlight}
                </span>
              </>
            )}
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
            {education.degree}
          </h3>

          <p
            style={{
              fontSize: 15,
              color: "var(--color-text-secondary)",
              marginBottom: 12,
            }}
          >
            {education.institution}, {education.location}
          </p>

          <p
            className="max-w-[720px]"
            style={{
              fontSize: 15,
              lineHeight: 1.55,
              color: "var(--color-text-secondary)",
            }}
          >
            {education.summary}
          </p>
        </div>
      </div>
    </motion.article>
  );
}
