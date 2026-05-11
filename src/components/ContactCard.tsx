"use client";

import { motion } from "framer-motion";
import {
  Briefcase,
  Mail,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";
import type { CONTACT_CARDS } from "@/lib/constants";

const EASE = [0.22, 1, 0.36, 1] as const;

const LINKEDIN_PATH =
  "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.063 2.063 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z";

const ICONS: Record<string, LucideIcon> = {
  Briefcase,
  MessageCircle,
};

type BrandIcon = { type: "lucide"; Icon: LucideIcon } | { type: "svg"; path: string };

const ACTION_STYLES: Record<
  string,
  { bg: string; icon: BrandIcon; label: string }
> = {
  linkedin: {
    bg: "#0A66C2",
    icon: { type: "svg", path: LINKEDIN_PATH },
    label: "Open LinkedIn",
  },
  email: {
    bg: "var(--color-accent-blue)",
    icon: { type: "lucide", Icon: Mail },
    label: "Send email",
  },
};

type Props = {
  card: (typeof CONTACT_CARDS)[number];
  index: number;
};

const GLASS_BG =
  "linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.30) 100%)";
const GLASS_BG_HOVER =
  "linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.45) 100%)";

export default function ContactCard({ card, index }: Props) {
  const TitleIcon = ICONS[card.icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: EASE }}
      viewport={{ once: true, amount: 0.2 }}
      className="w-full flex flex-col justify-between"
      style={{
        background: GLASS_BG,
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        border: "1px solid rgba(255,255,255,0.5)",
        borderRadius: 24,
        padding: 32,
        boxShadow: "0 8px 32px rgba(10, 10, 10, 0.05)",
        minHeight: 320,
        transition:
          "transform 300ms ease, background 300ms ease, border-color 300ms ease, box-shadow 300ms ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.background = GLASS_BG_HOVER;
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.8)";
        e.currentTarget.style.boxShadow = "0 16px 48px rgba(10, 10, 10, 0.08)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.background = GLASS_BG;
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)";
        e.currentTarget.style.boxShadow = "0 8px 32px rgba(10, 10, 10, 0.05)";
      }}
    >
      <div>
        <div
          className="flex items-center justify-center"
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            backgroundColor: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            marginBottom: 24,
          }}
        >
          {TitleIcon && (
            <TitleIcon
              size={22}
              strokeWidth={2}
              color="var(--color-text-primary)"
            />
          )}
        </div>

        <h3
          className="font-display"
          style={{
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: "-0.01em",
            color: "var(--color-text-primary)",
            marginBottom: 12,
          }}
        >
          {card.title}
        </h3>

        <p
          style={{
            fontSize: 15,
            lineHeight: 1.55,
            color: "var(--color-text-secondary)",
            marginBottom: 24,
          }}
        >
          {card.description}
        </p>
      </div>

      <div>
        <div
          className="type-eyebrow"
          style={{
            color: "var(--color-accent-green)",
            marginBottom: 16,
          }}
        >
          {card.eyebrow}
        </div>

        <div className="flex flex-row gap-3">
          {card.actions.map((action) => {
            const style = ACTION_STYLES[action.type];
            if (!style) return null;
            const { bg, icon, label } = style;
            return (
              <a
                key={action.type}
                href={action.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex items-center justify-center"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 9999,
                  backgroundColor: bg,
                  color: "#FFFFFF",
                  transition: "transform 200ms ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                {icon.type === "lucide" ? (
                  <icon.Icon size={18} strokeWidth={2} />
                ) : (
                  <svg width={18} height={18} viewBox="0 0 24 24" fill="#FFFFFF">
                    <path d={icon.path} />
                  </svg>
                )}
              </a>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
