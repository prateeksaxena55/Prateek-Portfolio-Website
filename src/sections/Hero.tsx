"use client";

import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Download, Phone } from "lucide-react";
import BouncingTerminalGroup from "@/components/BouncingTerminalGroup";
import { HERO, RESUME_URL, SOCIALS } from "@/lib/constants";

const EASE = [0.22, 1, 0.36, 1] as const;
const MONO = "var(--font-mono), ui-monospace, monospace";
const INTER = "var(--font-inter), system-ui, sans-serif";

const LINKEDIN_PATH =
  "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.063 2.063 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z";

const BTN_BASE: React.CSSProperties = { fontFamily: INTER, fontSize: 15, fontWeight: 500, transitionDuration: "150ms" };
const PRIMARY_BTN: React.CSSProperties = { ...BTN_BASE, backgroundColor: "var(--color-accent-blue)", color: "#ffffff" };
const SECONDARY_BTN: React.CSSProperties = { ...BTN_BASE, backgroundColor: "transparent", color: "var(--color-text-primary)", border: "1px solid var(--color-border)" };

const GLOW_STYLE: React.CSSProperties = {
  position: "absolute",
  inset: -8,
  background: "linear-gradient(135deg, rgba(45, 91, 255, 0.3) 0%, rgba(15, 122, 90, 0.2) 50%, rgba(217, 119, 87, 0.25) 100%)",
  filter: "blur(20px)",
  opacity: 0.6,
  zIndex: -1,
};

const GLASS_STYLE: React.CSSProperties = {
  position: "relative",
  background: "linear-gradient(135deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.45) 100%)",
  backdropFilter: "blur(32px)",
  WebkitBackdropFilter: "blur(32px)",
  border: "1px solid rgba(255,255,255,0.6)",
  boxShadow: "0 24px 80px rgba(10, 10, 10, 0.08), 0 0 0 1px rgba(255,255,255,0.4) inset",
};

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.9 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isDesktop;
}

export default function Hero() {
  const isDesktop = useIsDesktop();

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden">
      <div
        className="hidden md:block absolute top-0 bottom-0 z-[5] pointer-events-none"
        style={{ left: 0, width: "calc(50% - 430px)" }}
      >
        <BouncingTerminalGroup count={1} snippetStarts={[0]} className="w-full h-full" />
      </div>

      <div
        className="hidden md:block absolute top-0 bottom-0 z-[5] pointer-events-none"
        style={{ right: 0, width: "calc(50% - 430px)" }}
      >
        <BouncingTerminalGroup count={1} snippetStarts={[2]} className="w-full h-full" />
      </div>

      <div className="relative z-10 pointer-events-none">
        <div className="container-wide flex flex-col justify-center min-h-screen items-center pt-24 pb-16 md:pt-32 md:pb-24">
          <div className="md:hidden relative w-full max-w-[400px] mx-auto mb-4" style={{ height: 120 }}>
            <BouncingTerminalGroup count={1} snippetStarts={[0]} className="w-full h-full" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            className="relative w-full mx-auto pointer-events-auto"
            style={{ maxWidth: 820 }}
          >
            <div aria-hidden style={{ ...GLOW_STYLE, borderRadius: isDesktop ? 36 : 32 }} />

            <div id="hero-glass-container" style={{ ...GLASS_STYLE, padding: isDesktop ? 56 : 32, borderRadius: isDesktop ? 28 : 24 }}>
              <motion.div initial="hidden" animate="show" variants={container} className="flex flex-col items-center text-center">
                <motion.div variants={item} className="type-eyebrow" style={{ color: "var(--color-text-tertiary)", marginBottom: 32 }}>
                  {HERO.eyebrow}
                </motion.div>

                <motion.h1
                  variants={item}
                  className="font-display"
                  style={{
                    fontSize: isDesktop ? 96 : 56,
                    fontWeight: 600,
                    letterSpacing: "-0.04em",
                    lineHeight: 1.0,
                    color: "var(--color-text-primary)",
                    marginBottom: 16,
                  }}
                >
                  {HERO.name}
                </motion.h1>

                <motion.p
                  variants={item}
                  className="font-display max-w-[640px]"
                  style={{
                    fontSize: isDesktop ? 28 : 22,
                    fontWeight: 500,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.3,
                    color: "var(--color-text-secondary)",
                    marginBottom: 32,
                  }}
                >
                  {HERO.tagline}
                </motion.p>

                <motion.div
                  variants={item}
                  aria-hidden
                  style={{ width: 60, height: 1, background: "var(--color-border)", marginBottom: 32 }}
                />

                <motion.p
                  variants={item}
                  className="max-w-[640px] mx-auto"
                  style={{ fontSize: 17, lineHeight: 1.6, color: "var(--color-text-secondary)", marginBottom: 40 }}
                >
                  {HERO.sub}
                </motion.p>

                <motion.div
                  variants={item}
                  className="flex flex-row flex-wrap justify-center items-center gap-3"
                  style={{ marginBottom: 48 }}
                >
                  <a
                    href={RESUME_URL}
                    download="Prateek-Saxena-Resume.pdf"
                    aria-label="Download resume"
                    className="inline-flex items-center gap-2 rounded-lg px-5 py-3 transition-colors"
                    style={PRIMARY_BTN}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--color-accent-blue-hover)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--color-accent-blue)"; }}
                  >
                    <Download size={15} strokeWidth={2} />
                    Download Resume
                  </a>

                  <a
                    href={SOCIALS.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open LinkedIn"
                    className="inline-flex items-center justify-center"
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 9999,
                      backgroundColor: "var(--color-accent-blue)",
                      color: "#FFFFFF",
                      transition: "background-color 150ms ease",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--color-accent-blue-hover)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--color-accent-blue)"; }}
                  >
                    <svg width={18} height={18} viewBox="0 0 24 24" fill="#FFFFFF" aria-hidden>
                      <path d={LINKEDIN_PATH} />
                    </svg>
                  </a>

                  <a
                    href={`tel:${SOCIALS.phone}`}
                    aria-label="Call me"
                    className="inline-flex items-center gap-2 rounded-lg px-5 py-3 transition-colors"
                    style={SECONDARY_BTN}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--color-text-primary)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--color-border)"; }}
                  >
                    <Phone size={15} strokeWidth={2} />
                    Call Me
                  </a>
                </motion.div>

                <motion.div variants={item}>
                  <div className="type-eyebrow text-center" style={{ color: "var(--color-text-tertiary)", marginBottom: 12 }}>
                    STACK
                  </div>
                  <div className="flex justify-center flex-wrap items-center">
                    {HERO.stack.map((tech, i) => (
                      <span key={tech} className="inline-flex items-center">
                        {i > 0 && (
                          <span aria-hidden style={{ fontFamily: MONO, fontSize: 13, color: "var(--color-text-tertiary)", padding: "0 8px" }}>
                            ·
                          </span>
                        )}
                        <span style={{ fontFamily: MONO, fontSize: 13, color: "var(--color-text-secondary)" }}>
                          {tech}
                        </span>
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          <div className="md:hidden relative w-full max-w-[400px] mx-auto mt-4" style={{ height: 120 }}>
            <BouncingTerminalGroup count={1} snippetStarts={[2]} className="w-full h-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
