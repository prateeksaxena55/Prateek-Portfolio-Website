"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { NAV_LINKS, RESUME_URL } from "@/lib/constants";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 8);
  });

  useEffect(() => {
    if (!menuOpen) return;
    const onClick = (e: MouseEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <header
      ref={headerRef}
      role="banner"
      className="fixed inset-x-0 top-0 z-50 h-14 md:h-16"
    >
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          backgroundColor: "var(--color-bg)",
          borderBottom: "1px solid var(--color-border)",
        }}
        initial={false}
        animate={{ opacity: scrolled ? 1 : 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      />

      <div className="container-wide flex h-full items-center justify-end">
        <div className="flex items-center gap-2 md:gap-8">
          <nav aria-label="Primary" className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition-colors"
                style={{
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "var(--color-text-secondary)",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "var(--color-text-primary)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "var(--color-text-secondary)"; }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md transition-colors"
            style={{ color: "var(--color-text-primary)", backgroundColor: "transparent" }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--color-border)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download resume"
            className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 md:px-4 md:py-2 transition-colors"
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "14px",
              fontWeight: 500,
              backgroundColor: "var(--color-accent-blue)",
              color: "#ffffff",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--color-accent-blue-hover)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--color-accent-blue)"; }}
          >
            Resume
            <ArrowUpRight size={14} strokeWidth={2} />
          </a>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            role="navigation"
            aria-label="Mobile"
            className="absolute left-0 right-0 top-full md:hidden"
            style={{
              backgroundColor: "var(--color-bg)",
              borderBottom: "1px solid var(--color-border)",
            }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: EASE }}
          >
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="flex h-14 items-center px-5"
                style={{
                  fontFamily: "var(--font-inter-tight), system-ui, sans-serif",
                  fontSize: "18px",
                  lineHeight: 1.3,
                  letterSpacing: "-0.01em",
                  fontWeight: 600,
                  color: "var(--color-text-primary)",
                  borderTop: i > 0 ? "1px solid var(--color-border)" : "none",
                }}
              >
                {link.label}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
