"use client";

import { useEffect, useRef, useState } from "react";

const DESKTOP_GRID_COLS = 5;
const DESKTOP_GRID_ROWS = 4;
const MOBILE_GRID_COLS = 4;
const MOBILE_GRID_ROWS = 3;
const NEIGHBORS_PER_NODE = 2;
const MAX_PULSE_SLOTS = 6;
const DESKTOP_PULSE_LIMIT = 6;
const MOBILE_PULSE_LIMIT = 3;
const PULSE_DURATION_MS = 1200;
const TRAIL_COUNT = 6;
const LINE_BASE_OPACITY = 0.12;
const LINE_PULSE_OPACITY = 0.4;
const MOBILE_BREAKPOINT = "(max-width: 767px)";

const HEAD_LAYERS: { r: number; fill: string; base: number }[] = [
  { r: 18, fill: "var(--color-accent-blue)", base: 0.25 },
  { r: 12, fill: "var(--color-accent-blue)", base: 0.5 },
  { r: 7, fill: "#FFFFFF", base: 0.85 },
  { r: 3, fill: "#FFFFFF", base: 1 },
];

const trailRadius = (i: number) => 12 - i * 2;
const trailBaseOpacity = (i: number) => Math.max(0, 0.85 - i * (0.85 / 5));
const trailOffset = (i: number) => i * 0.05;

type Node = {
  baseX: number;
  baseY: number;
  driftPhaseX: number;
  driftPhaseY: number;
  driftSpeedX: number;
  driftSpeedY: number;
  driftAmpX: number;
  driftAmpY: number;
  radius: number;
};

type Pulse = { active: boolean; edgeIndex: number; startTime: number };

function makeRng(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function generateNodes(w: number, h: number, cols: number, rows: number): Node[] {
  const rng = makeRng(0xa61c1);
  const nodes: Node[] = [];
  const cellW = w / cols;
  const cellH = h / rows;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      nodes.push({
        baseX: cellW * (c + 0.2 + rng() * 0.6),
        baseY: cellH * (r + 0.2 + rng() * 0.6),
        driftPhaseX: rng() * Math.PI * 2,
        driftPhaseY: rng() * Math.PI * 2,
        driftSpeedX: 0.15 + rng() * 0.15,
        driftSpeedY: 0.15 + rng() * 0.15,
        driftAmpX: 15 + rng() * 15,
        driftAmpY: 15 + rng() * 15,
        radius: 3 + rng() * 2,
      });
    }
  }
  return nodes;
}

function buildEdges(nodes: Node[]): [number, number][] {
  const edges: [number, number][] = [];
  const seen = new Set<string>();
  for (let i = 0; i < nodes.length; i++) {
    const dists: { j: number; d: number }[] = [];
    for (let j = 0; j < nodes.length; j++) {
      if (i === j) continue;
      const dx = nodes[j].baseX - nodes[i].baseX;
      const dy = nodes[j].baseY - nodes[i].baseY;
      dists.push({ j, d: Math.hypot(dx, dy) });
    }
    dists.sort((a, b) => a.d - b.d);
    for (let k = 0; k < NEIGHBORS_PER_NODE && k < dists.length; k++) {
      const j = dists[k].j;
      const lo = Math.min(i, j);
      const hi = Math.max(i, j);
      const key = `${lo}-${hi}`;
      if (!seen.has(key)) { seen.add(key); edges.push([lo, hi]); }
    }
  }
  return edges;
}

export default function AgenticMesh() {
  const circleRefs = useRef<(SVGCircleElement | null)[]>([]);
  const lineRefs = useRef<(SVGLineElement | null)[]>([]);
  const pulseRootRefs = useRef<(SVGGElement | null)[]>([]);
  const pulseHeadGroupRefs = useRef<(SVGGElement | null)[]>([]);
  const pulseHeadCircleRefs = useRef<Array<Array<SVGCircleElement | null>>>([]);
  const pulseTrailCircleRefs = useRef<Array<Array<SVGCircleElement | null>>>([]);
  const pulsesRef = useRef<Pulse[]>(
    Array.from({ length: MAX_PULSE_SLOTS }, () => ({ active: false, edgeIndex: 0, startTime: 0 })),
  );
  const pulseLimitRef = useRef<number>(DESKTOP_PULSE_LIMIT);
  const nodesRef = useRef<Node[]>([]);
  const edgesRef = useRef<[number, number][]>([]);
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_BREAKPOINT);
    const onChange = () => setIsMobile(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    pulseLimitRef.current = isMobile ? MOBILE_PULSE_LIMIT : DESKTOP_PULSE_LIMIT;
  }, [isMobile]);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (w < 1 || h < 1) return;
      const cols = isMobile ? MOBILE_GRID_COLS : DESKTOP_GRID_COLS;
      const rows = isMobile ? MOBILE_GRID_ROWS : DESKTOP_GRID_ROWS;
      nodesRef.current = generateNodes(w, h, cols, rows);
      edgesRef.current = buildEdges(nodesRef.current);
      setDims({ w, h });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [isMobile]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    const spawn = () => {
      const edges = edgesRef.current;
      if (edges.length > 0) {
        const limit = pulseLimitRef.current;
        let freeIdx = -1;
        for (let i = 0; i < limit; i++) {
          if (!pulsesRef.current[i].active) { freeIdx = i; break; }
        }
        if (freeIdx >= 0) {
          const free = pulsesRef.current[freeIdx];
          free.active = true;
          free.edgeIndex = Math.floor(Math.random() * edges.length);
          free.startTime = performance.now();
        }
      }
      timer = setTimeout(spawn, 800 + Math.random() * 800);
    };
    timer = setTimeout(spawn, 500);
    return () => { if (timer) clearTimeout(timer); };
  }, []);

  useEffect(() => {
    if (dims.w < 1) return;
    let raf = 0;
    const start = performance.now();
    const xs: number[] = [];
    const ys: number[] = [];
    const tick = (now: number) => {
      const t = (now - start) / 1000;
      const nodes = nodesRef.current;
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const x = n.baseX + Math.sin(t * n.driftSpeedX + n.driftPhaseX) * n.driftAmpX;
        const y = n.baseY + Math.sin(t * n.driftSpeedY + n.driftPhaseY) * n.driftAmpY;
        xs[i] = x;
        ys[i] = y;
        const c = circleRefs.current[i];
        if (c) { c.setAttribute("cx", String(x)); c.setAttribute("cy", String(y)); }
      }
      const edges = edgesRef.current;
      for (let k = 0; k < edges.length; k++) {
        const [a, b] = edges[k];
        const l = lineRefs.current[k];
        if (l) {
          l.setAttribute("x1", String(xs[a]));
          l.setAttribute("y1", String(ys[a]));
          l.setAttribute("x2", String(xs[b]));
          l.setAttribute("y2", String(ys[b]));
          l.setAttribute("stroke-opacity", String(LINE_BASE_OPACITY));
        }
      }
      for (let p = 0; p < MAX_PULSE_SLOTS; p++) {
        const pulse = pulsesRef.current[p];
        const root = pulseRootRefs.current[p];
        if (!root) continue;
        if (!pulse.active || edges.length === 0) {
          root.setAttribute("opacity", "0");
          continue;
        }
        const progress = (now - pulse.startTime) / PULSE_DURATION_MS;
        if (progress >= 1) {
          pulse.active = false;
          root.setAttribute("opacity", "0");
          continue;
        }
        const edgeIdx = pulse.edgeIndex % edges.length;
        const [a, b] = edges[edgeIdx];
        const ax = xs[a], ay = ys[a];
        const bx = xs[b], by = ys[b];
        const dx = bx - ax;
        const dy = by - ay;
        const brightness = Math.sin(progress * Math.PI);
        root.setAttribute("opacity", "1");

        const lineEl = lineRefs.current[edgeIdx];
        if (lineEl) lineEl.setAttribute("stroke-opacity", String(LINE_PULSE_OPACITY * brightness));

        const headG = pulseHeadGroupRefs.current[p];
        if (headG) headG.setAttribute("transform", `translate(${ax + dx * progress} ${ay + dy * progress})`);
        const headCircles = pulseHeadCircleRefs.current[p];
        if (headCircles) {
          for (let i = 0; i < HEAD_LAYERS.length; i++) {
            const c = headCircles[i];
            if (c) c.setAttribute("fill-opacity", String(HEAD_LAYERS[i].base * brightness));
          }
        }

        const trailCircles = pulseTrailCircleRefs.current[p];
        if (trailCircles) {
          for (let i = 0; i < TRAIL_COUNT; i++) {
            const c = trailCircles[i];
            if (!c) continue;
            const tp = Math.max(0, progress - trailOffset(i));
            c.setAttribute("cx", String(ax + dx * tp));
            c.setAttribute("cy", String(ay + dy * tp));
            c.setAttribute("fill-opacity", String(trailBaseOpacity(i) * brightness));
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [dims.w, dims.h]);

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {dims.w > 0 && (
        <svg width={dims.w} height={dims.h} style={{ display: "block" }}>
          {edgesRef.current.map(([a, b], k) => {
            const na = nodesRef.current[a];
            const nb = nodesRef.current[b];
            return (
              <line
                key={k}
                ref={(el) => { lineRefs.current[k] = el; }}
                x1={na.baseX}
                y1={na.baseY}
                x2={nb.baseX}
                y2={nb.baseY}
                stroke="var(--color-accent-blue)"
                strokeOpacity={LINE_BASE_OPACITY}
                strokeWidth={1}
              />
            );
          })}
          {Array.from({ length: MAX_PULSE_SLOTS }, (_, p) => (
            <g key={`pulse-${p}`} ref={(el) => { pulseRootRefs.current[p] = el; }} opacity={0}>
              {Array.from({ length: TRAIL_COUNT }, (_, i) => (
                <circle
                  key={`t-${i}`}
                  ref={(el) => {
                    if (!pulseTrailCircleRefs.current[p]) pulseTrailCircleRefs.current[p] = [];
                    pulseTrailCircleRefs.current[p][i] = el;
                  }}
                  r={trailRadius(i)}
                  fill="var(--color-accent-blue)"
                  fillOpacity={0}
                />
              ))}
              <g ref={(el) => { pulseHeadGroupRefs.current[p] = el; }}>
                {HEAD_LAYERS.map((layer, i) => (
                  <circle
                    key={`h-${i}`}
                    ref={(el) => {
                      if (!pulseHeadCircleRefs.current[p]) pulseHeadCircleRefs.current[p] = [];
                      pulseHeadCircleRefs.current[p][i] = el;
                    }}
                    r={layer.r}
                    fill={layer.fill}
                    fillOpacity={0}
                  />
                ))}
              </g>
            </g>
          ))}
          {nodesRef.current.map((n, i) => (
            <circle
              key={i}
              ref={(el) => { circleRefs.current[i] = el; }}
              cx={n.baseX}
              cy={n.baseY}
              r={n.radius}
              fill="var(--color-accent-blue)"
              fillOpacity={0.4}
            />
          ))}
        </svg>
      )}
    </div>
  );
}
