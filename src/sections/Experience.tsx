"use client";

import { useEffect, useRef, useState } from "react";
import ExperienceCard from "@/components/ExperienceCard";
import ExperienceModal from "@/components/ExperienceModal";
import GrowithModalContent from "@/components/GrowithModalContent";
import RoleModalContent from "@/components/RoleModalContent";
import {
  EXPERIENCE,
  RAPID_PUNCHING_CONTENT,
  WEB_IGNITO_CONTENT,
} from "@/lib/constants";

function renderModalBody(openId: string | null) {
  if (!openId) return null;
  if (openId === "growith") return <GrowithModalContent />;
  if (openId === "rapid-punching")
    return (
      <RoleModalContent
        overview={RAPID_PUNCHING_CONTENT.overview}
        achievements={RAPID_PUNCHING_CONTENT.achievements}
        stack={RAPID_PUNCHING_CONTENT.stack}
      />
    );
  if (openId === "web-ignito")
    return (
      <RoleModalContent
        overview={WEB_IGNITO_CONTENT.overview}
        achievements={WEB_IGNITO_CONTENT.achievements}
        stack={WEB_IGNITO_CONTENT.stack}
      />
    );
  return null;
}

export default function Experience() {
  const [openId, setOpenId] = useState<string | null>(null);
  const cardRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const previouslyOpenRef = useRef<string | null>(null);

  const openExperience = EXPERIENCE.find((e) => e.id === openId) ?? null;

  useEffect(() => {
    if (openId) {
      previouslyOpenRef.current = openId;
      return;
    }
    const lastId = previouslyOpenRef.current;
    if (lastId) {
      const el = cardRefs.current[lastId];
      if (el) el.focus();
      previouslyOpenRef.current = null;
    }
  }, [openId]);

  return (
    <section id="work" className="relative py-20 md:py-32">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 overflow-hidden pointer-events-none"
      >
        <div
          style={{
            position: "absolute",
            top: "8%",
            left: "10%",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(45, 91, 255, 0.12) 0%, rgba(45, 91, 255, 0) 70%)",
            filter: "blur(70px)",
            animation: "blob-drift-1 20s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: "5%",
            width: 460,
            height: 460,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(15, 122, 90, 0.10) 0%, rgba(15, 122, 90, 0) 70%)",
            filter: "blur(75px)",
            animation: "blob-drift-2 24s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            left: "30%",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(217, 119, 87, 0.08) 0%, rgba(217, 119, 87, 0) 70%)",
            filter: "blur(70px)",
            animation: "blob-drift-3 28s ease-in-out infinite",
          }}
        />
      </div>
      <div className="container-wide">
        <div
          className="type-eyebrow"
          style={{ color: "var(--color-text-tertiary)", marginBottom: 16 }}
        >
          SECTION 03 · EXPERIENCE
        </div>
        <h2
          className="type-h2"
          style={{ color: "var(--color-text-primary)", marginBottom: 24 }}
        >
          Where I&apos;ve shipped work.
        </h2>
        <p
          className="max-w-[640px]"
          style={{
            fontSize: 17,
            lineHeight: 1.6,
            color: "var(--color-text-secondary)",
            marginBottom: 64,
          }}
        >
          Three roles across 7+ years — from analyzing campaign data for agency
          clients to shipping production LLM systems for franchise operators.
          Tap any card for the deeper story.
        </p>

        <div className="flex flex-col gap-4">
          {EXPERIENCE.map((exp) => (
            <ExperienceCard
              key={exp.id}
              experience={exp}
              onClick={() => setOpenId(exp.id)}
              ref={(el) => {
                cardRefs.current[exp.id] = el;
              }}
            />
          ))}
        </div>
      </div>

      <ExperienceModal
        isOpen={openId !== null}
        onClose={() => setOpenId(null)}
        experience={openExperience}
      >
        {renderModalBody(openId)}
      </ExperienceModal>
    </section>
  );
}
