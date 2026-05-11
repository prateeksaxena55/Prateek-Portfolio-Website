"use client";

import { useEffect, useRef } from "react";
import TerminalCard, { TERMINAL_W, TERMINAL_H } from "./TerminalCard";

const START_FRACS = [
  { x: 0.2, y: 0.2 },
  { x: 0.75, y: 0.65 },
  { x: 0.45, y: 0.4 },
  { x: 0.6, y: 0.15 },
];

function randVx() {
  const mag = 0.5 + Math.random() * 0.4;
  return Math.random() > 0.5 ? mag : -mag;
}

function randVy() {
  const mag = 0.4 + Math.random() * 0.35;
  return Math.random() > 0.5 ? mag : -mag;
}

const safeNum = (n: number) => (Number.isFinite(n) ? n : 0);

type Props = {
  count: number;
  snippetStarts: number[];
  className?: string;
};

export default function BouncingTerminalGroup({ count, snippetStarts, className }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const positionsRef = useRef<{ x: number; y: number }[]>([]);
  const velocitiesRef = useRef<{ vx: number; vy: number }[]>([]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const boundsRef = { w: safeNum(wrapper.clientWidth), h: safeNum(wrapper.clientHeight) };
    let initialized = false;
    let rafId = 0;

    const boundsValid = () => boundsRef.w >= TERMINAL_W && boundsRef.h >= TERMINAL_H;

    const initState = () => {
      const maxX = Math.max(0, boundsRef.w - TERMINAL_W);
      const maxY = Math.max(0, boundsRef.h - TERMINAL_H);
      positionsRef.current = [];
      velocitiesRef.current = [];
      for (let i = 0; i < count; i++) {
        const f = START_FRACS[i % START_FRACS.length];
        const rawX = f.x * maxX;
        const rawY = f.y * maxY;
        const x = Math.max(0, Math.min(maxX, Number.isFinite(rawX) ? rawX : 0));
        const y = Math.max(0, Math.min(maxY, Number.isFinite(rawY) ? rawY : 0));
        positionsRef.current.push({ x, y });
        velocitiesRef.current.push({ vx: randVx(), vy: randVy() });
      }
    };

    const applyTransforms = () => {
      for (let i = 0; i < count; i++) {
        const el = cardRefs.current[i];
        const p = positionsRef.current[i];
        if (el) el.style.transform = `translate(${p ? p.x : 0}px, ${p ? p.y : 0}px)`;
      }
    };

    const clampAll = () => {
      const maxX = Math.max(0, boundsRef.w - TERMINAL_W);
      const maxY = Math.max(0, boundsRef.h - TERMINAL_H);
      for (const p of positionsRef.current) {
        p.x = Math.max(0, Math.min(p.x, maxX));
        p.y = Math.max(0, Math.min(p.y, maxY));
      }
    };

    applyTransforms();

    const tick = () => {
      if (!boundsValid()) {
        rafId = requestAnimationFrame(tick);
        return;
      }
      const maxX = Math.max(0, boundsRef.w - TERMINAL_W);
      const maxY = Math.max(0, boundsRef.h - TERMINAL_H);

      for (let i = 0; i < count; i++) {
        const p = positionsRef.current[i];
        const v = velocitiesRef.current[i];
        if (!p || !v) continue;
        let nx = p.x + v.vx;
        let ny = p.y + v.vy;
        if (nx < 0) { nx = 0; v.vx = Math.abs(v.vx); } else if (nx > maxX) { nx = maxX; v.vx = -Math.abs(v.vx); }
        if (ny < 0) { ny = 0; v.vy = Math.abs(v.vy); } else if (ny > maxY) { ny = maxY; v.vy = -Math.abs(v.vy); }
        p.x = Math.max(0, Math.min(maxX, nx));
        p.y = Math.max(0, Math.min(maxY, ny));
      }

      if (count > 1) {
        for (let i = 0; i < count; i++) {
          for (let j = i + 1; j < count; j++) {
            const a = positionsRef.current[i];
            const b = positionsRef.current[j];
            const va = velocitiesRef.current[i];
            const vb = velocitiesRef.current[j];
            const ox = Math.min(a.x + TERMINAL_W, b.x + TERMINAL_W) - Math.max(a.x, b.x);
            const oy = Math.min(a.y + TERMINAL_H, b.y + TERMINAL_H) - Math.max(a.y, b.y);
            if (ox > 0 && oy > 0) {
              if (ox < oy) {
                const push = ox / 2 + 0.5;
                if (a.x < b.x) { a.x -= push; b.x += push; } else { a.x += push; b.x -= push; }
                va.vx = -va.vx;
                vb.vx = -vb.vx;
              } else {
                const push = oy / 2 + 0.5;
                if (a.y < b.y) { a.y -= push; b.y += push; } else { a.y += push; b.y -= push; }
                va.vy = -va.vy;
                vb.vy = -vb.vy;
              }
              a.x = Math.max(0, Math.min(a.x, maxX));
              a.y = Math.max(0, Math.min(a.y, maxY));
              b.x = Math.max(0, Math.min(b.x, maxX));
              b.y = Math.max(0, Math.min(b.y, maxY));
            }
          }
        }
      }

      applyTransforms();
      rafId = requestAnimationFrame(tick);
    };

    const startIfReady = () => {
      if (initialized || !boundsValid()) return;
      initState();
      applyTransforms();
      initialized = true;
      rafId = requestAnimationFrame(tick);
    };

    startIfReady();

    const ro = new ResizeObserver(() => {
      boundsRef.w = safeNum(wrapper.clientWidth);
      boundsRef.h = safeNum(wrapper.clientHeight);
      if (!initialized) {
        startIfReady();
      } else {
        clampAll();
      }
    });
    ro.observe(wrapper);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, [count]);

  return (
    <div
      ref={wrapperRef}
      className={className}
      style={{ position: "relative", overflow: "hidden", pointerEvents: "none" }}
    >
      {Array.from({ length: count }, (_, i) => (
        <TerminalCard
          key={i}
          ref={(el) => { cardRefs.current[i] = el; }}
          snippetStart={snippetStarts[i] ?? 0}
          startDelay={400 + i * 350}
        />
      ))}
    </div>
  );
}
