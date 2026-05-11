"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
};

const MAGNET_RADIUS = 80;
const PULL_RATIO = 0.3;
const MAX_OFFSET = 12;

export default function MagneticChip({ children }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > MAGNET_RADIUS) {
      setPos({ x: 0, y: 0 });
      return;
    }
    const x = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, dx * PULL_RATIO));
    const y = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, dy * PULL_RATIO));
    setPos({ x, y });
  };

  const reset = () => setPos({ x: 0, y: 0 });

  return (
    <motion.span
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMove}
      onMouseLeave={() => {
        setHovered(false);
        reset();
      }}
      animate={pos}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="inline-flex items-center px-3 py-1.5 transition-colors"
      style={{
        fontFamily: "var(--font-mono), ui-monospace, monospace",
        fontSize: 12,
        color: hovered ? "var(--color-text-primary)" : "var(--color-text-secondary)",
        border: `1px solid ${hovered ? "var(--color-text-primary)" : "var(--color-border)"}`,
        borderRadius: 999,
        backgroundColor: "transparent",
        transitionDuration: "150ms",
        cursor: "default",
        willChange: "transform",
      }}
    >
      {children}
    </motion.span>
  );
}
