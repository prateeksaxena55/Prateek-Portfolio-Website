"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { EXPERIENCE } from "@/lib/constants";

const EASE = [0.22, 1, 0.36, 1] as const;

type ExperienceItem = (typeof EXPERIENCE)[number];

type Props = {
  isOpen: boolean;
  onClose: () => void;
  experience: ExperienceItem | null;
  children: React.ReactNode;
};

export default function ExperienceModal({
  isOpen,
  onClose,
  experience,
  children,
}: Props) {
  useEffect(() => {
    if (!isOpen) return;
    document.body.classList.add("no-scroll");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("no-scroll");
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && experience && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-sm"
          style={{ backgroundColor: "rgba(10, 10, 10, 0.4)" }}
          role="dialog"
          aria-modal="true"
          aria-label={`${experience.role} at ${experience.company}`}
        >
          <motion.div
            key="panel"
            initial={{ opacity: 0, scale: 0.98, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 16 }}
            transition={{ duration: 0.3, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
            className="relative overflow-auto p-6 md:p-12"
            style={{
              backgroundColor: "var(--color-bg)",
              border: "1px solid var(--color-border)",
              borderRadius: 24,
              width: "92%",
              maxWidth: 1100,
              maxHeight: "88vh",
            }}
          >
            <div
              style={{
                position: "sticky",
                top: 0,
                height: 0,
                zIndex: 20,
                pointerEvents: "none",
              }}
            >
              <button
                type="button"
                aria-label="Close modal"
                onClick={onClose}
                className="absolute inline-flex items-center justify-center transition-colors"
                style={{
                  top: 0,
                  right: 0,
                  padding: 8,
                  borderRadius: 8,
                  backgroundColor: "transparent",
                  color: "var(--color-text-primary)",
                  pointerEvents: "auto",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--color-border)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <X size={20} strokeWidth={2} />
              </button>
            </div>

            <header
              style={{
                borderBottom: "1px solid var(--color-border)",
                paddingBottom: 24,
                marginBottom: 32,
              }}
            >
              <div
                className="flex flex-row items-center gap-3 flex-wrap"
                style={{ marginBottom: 16, paddingRight: 44 }}
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
                  {experience.isCurrent ? "EXPERIENCE · NOW" : "EXPERIENCE"}
                </span>
              </div>

              <h2
                className="font-display text-[28px] md:text-[36px]"
                style={{
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.15,
                  color: "var(--color-text-primary)",
                  marginBottom: 12,
                }}
              >
                {experience.role}
              </h2>

              <p
                style={{
                  fontSize: 17,
                  color: "var(--color-text-secondary)",
                }}
              >
                {experience.company}, {experience.location}
              </p>
            </header>

            <div>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
