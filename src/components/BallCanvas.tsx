"use client";

import { useEffect, useRef, useState } from "react";
import {
  siPython,
  siLangchain,
  siAnthropic,
  siFastapi,
  siPostgresql,
  siDocker,
  siReact,
  siScikitlearn,
} from "simple-icons";

const OPENAI_PATH =
  "M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9 6.0651 6.0651 0 0 0-4.5419-2.4 6.0463 6.0463 0 0 0-5.7707 4.182 5.9847 5.9847 0 0 0-3.9999 2.9007 6.0463 6.0463 0 0 0 .7438 7.0966 5.9846 5.9846 0 0 0 .5145 4.9107 6.0467 6.0467 0 0 0 6.5117 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0461 6.0461 0 0 0 5.7716-4.1846 5.9846 5.9846 0 0 0 3.9986-2.9001 6.0461 6.0461 0 0 0-.7538-7.0966zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z";

const AWS_PATH =
  "M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.295.072-.583.16-.862.272a2.287 2.287 0 0 1-.28.104.488.488 0 0 1-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 0 1 1.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.838.296zm6.41.862c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.311L7.586 5.55c-.048-.16-.072-.263-.072-.319 0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 0 1 .32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 0 1 .311-.08h.743c.127 0 .2.065.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 0 1-.056.2l-1.923 6.17c-.048.16-.104.263-.168.311a.51.51 0 0 1-.303.08h-.687c-.151 0-.255-.024-.32-.08-.063-.056-.119-.16-.15-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.177.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.144-.399-.096-.71-.2-.918-.32-.128-.071-.215-.151-.247-.223a.563.563 0 0 1-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.279.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 0 0 .415-.758.777.777 0 0 0-.215-.559c-.144-.151-.416-.287-.807-.415l-1.157-.36c-.583-.183-1.014-.454-1.277-.813a1.902 1.902 0 0 1-.4-1.158c0-.335.073-.63.216-.886.144-.255.335-.479.575-.654.24-.184.51-.32.83-.415.32-.096.655-.136 1.006-.136.175 0 .359.008.535.032.183.024.35.056.518.088.16.04.312.08.455.127.144.048.256.096.336.144a.69.69 0 0 1 .24.2.43.43 0 0 1 .071.263v.375c0 .168-.064.256-.184.256a.83.83 0 0 1-.303-.096 3.652 3.652 0 0 0-1.533-.311c-.455 0-.815.071-1.062.223-.248.152-.375.383-.375.71 0 .224.08.416.24.567.159.152.454.304.877.44l1.134.358c.574.184.99.44 1.237.767.247.327.367.702.367 1.117 0 .343-.072.655-.207.926-.144.272-.336.511-.583.703-.248.2-.543.343-.886.447-.36.111-.734.167-1.142.167zM21.698 16.207c-2.626 1.94-6.442 2.969-9.722 2.969-4.598 0-8.74-1.7-11.87-4.526-.247-.223-.024-.527.27-.351 3.384 1.963 7.559 3.153 11.877 3.153 2.914 0 6.114-.607 9.06-1.852.439-.2.814.287.385.607zm1.092-1.245c-.336-.43-2.22-.207-3.074-.103-.255.032-.295-.192-.063-.36 1.5-1.053 3.967-.75 4.254-.399.287.36-.08 2.826-1.485 4.007-.215.184-.423.088-.327-.151.32-.79 1.03-2.57.695-2.994z";

const LOGOS = [
  { name: "Python", path: siPython.path, color: "#3776AB" },
  { name: "LangChain", path: siLangchain.path, color: "#1C3C3C" },
  { name: "LangGraph", path: siLangchain.path, color: "#1C3C3C" },
  { name: "Claude", path: siAnthropic.path, color: "#D97757" },
  { name: "OpenAI", path: OPENAI_PATH, color: "#412991" },
  { name: "FastAPI", path: siFastapi.path, color: "#009688" },
  { name: "PostgreSQL", path: siPostgresql.path, color: "#4169E1" },
  { name: "pgvector", path: siPostgresql.path, color: "#4169E1" },
  { name: "Docker", path: siDocker.path, color: "#2496ED" },
  { name: "AWS", path: AWS_PATH, color: "#FF9900" },
  { name: "React", path: siReact.path, color: "#61DAFB" },
  { name: "Scikit-learn", path: siScikitlearn.path, color: "#F7931E" },
];

type Ball = {
  id: number;
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  driftPhaseX: number;
  driftPhaseY: number;
  driftSpeedX: number;
  driftSpeedY: number;
  driftAmpX: number;
  driftAmpY: number;
};

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

function generateBalls(width: number, height: number): Ball[] {
  const rng = makeRng(0xc0ffee);
  const sizes: number[] = [];
  for (let i = 0; i < 4; i++) sizes.push(70 + rng() * 18);
  for (let i = 0; i < 5; i++) sizes.push(48 + rng() * 14);
  for (let i = 0; i < 3; i++) sizes.push(32 + rng() * 10);
  const cx = width / 2, cy = height / 2;
  const rx = width * 0.22, ry = height * 0.32;
  const balls: Ball[] = [];
  for (let i = 0; i < sizes.length; i++) {
    const radius = sizes[i];
    let baseX = cx, baseY = cy;
    for (let attempt = 0; attempt < 200; attempt++) {
      const ang = rng() * Math.PI * 2;
      const rr = Math.pow(rng(), 0.6);
      baseX = cx + Math.cos(ang) * rr * rx;
      baseY = cy + Math.sin(ang) * rr * ry;
      baseX = Math.max(radius + 4, Math.min(width - radius - 4, baseX));
      baseY = Math.max(radius + 4, Math.min(height - radius - 4, baseY));
      let ok = true;
      for (const o of balls) {
        const dx = baseX - o.baseX, dy = baseY - o.baseY;
        if (Math.sqrt(dx * dx + dy * dy) < radius + o.radius + 8) {
          ok = false; break;
        }
      }
      if (ok) break;
    }
    balls.push({
      id: i, baseX, baseY, x: baseX, y: baseY, radius, vx: 0, vy: 0,
      driftPhaseX: rng() * Math.PI * 2,
      driftPhaseY: rng() * Math.PI * 2,
      driftSpeedX: 0.20 + rng() * 0.25,
      driftSpeedY: 0.20 + rng() * 0.25,
      driftAmpX: 4 + rng() * 6,
      driftAmpY: 4 + rng() * 6,
    });
  }
  return balls;
}

export default function BallCanvas() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const ballsRef = useRef<Ball[]>([]);
  const cursorRef = useRef({ x: 0, y: 0, active: false });
  const groupRefs = useRef<(SVGGElement | null)[]>([]);
  const prevDimsRef = useRef({ width: 0, height: 0 });
  const rafRef = useRef<number | null>(null);
  const resizeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0].contentRect.width;
      const h = entries[0].contentRect.height;
      if (w < 1 || h < 1) return;
      const isInitial = ballsRef.current.length === 0;
      if (resizeTimerRef.current) clearTimeout(resizeTimerRef.current);
      resizeTimerRef.current = setTimeout(() => {
        if (ballsRef.current.length === 0) {
          ballsRef.current = generateBalls(w, h);
        } else {
          const prev = prevDimsRef.current;
          if (prev.width > 0 && prev.height > 0) {
            const sx = w / prev.width, sy = h / prev.height;
            for (const b of ballsRef.current) {
              b.baseX = Math.max(b.radius + 4, Math.min(w - b.radius - 4, b.baseX * sx));
              b.baseY = Math.max(b.radius + 4, Math.min(h - b.radius - 4, b.baseY * sy));
              b.x = Math.max(b.radius, Math.min(w - b.radius, b.x * sx));
              b.y = Math.max(b.radius, Math.min(h - b.radius, b.y * sy));
            }
          }
        }
        prevDimsRef.current = { width: w, height: h };
        setDimensions({ width: w, height: h });
      }, isInitial ? 0 : 100);
    });
    ro.observe(wrapper);
    return () => {
      ro.disconnect();
      if (resizeTimerRef.current) clearTimeout(resizeTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (dimensions.width < 1 || dimensions.height < 1) return;
    let last = performance.now();
    let elapsed = 0;
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      elapsed += dt;
      const balls = ballsRef.current;
      const cursor = cursorRef.current;
      const w = dimensions.width, h = dimensions.height;
      const repelRadius = 200;
      for (let i = 0; i < balls.length; i++) {
        const a = balls[i];
        for (let j = i + 1; j < balls.length; j++) {
          const o = balls[j];
          const ddx = o.x - a.x, ddy = o.y - a.y;
          const ddist = Math.sqrt(ddx * ddx + ddy * ddy);
          const minDist = a.radius + o.radius + 8;
          if (ddist > 0 && ddist < minDist) {
            const sep = ((minDist - ddist) / minDist) * 0.5;
            const ux = ddx / ddist, uy = ddy / ddist;
            a.vx -= ux * sep; a.vy -= uy * sep;
            o.vx += ux * sep; o.vy += uy * sep;
          }
        }
      }
      for (let i = 0; i < balls.length; i++) {
        const b = balls[i];
        const tx = b.baseX + Math.sin(elapsed * b.driftSpeedX + b.driftPhaseX) * b.driftAmpX;
        const ty = b.baseY + Math.sin(elapsed * b.driftSpeedY + b.driftPhaseY) * b.driftAmpY;
        if (cursor.active) {
          const dx = b.x - cursor.x, dy = b.y - cursor.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 0) {
            const ux = dx / dist, uy = dy / dist;
            if (dist < repelRadius) {
              const force = (1 - dist / repelRadius) * 10;
              b.vx += ux * force;
              b.vy += uy * force;
            }
            const weakForce = 0.4 / Math.max(dist / 100, 1);
            b.vx += ux * weakForce;
            b.vy += uy * weakForce;
          }
        }
        b.vx += (b.baseX - b.x) * 0.035;
        b.vy += (b.baseY - b.y) * 0.035;
        b.x += (tx - b.x) * 0.08 + b.vx;
        b.y += (ty - b.y) * 0.08 + b.vy;
        b.vx *= 0.91; b.vy *= 0.91;
        if (b.x < b.radius) { b.x = b.radius; b.vx *= -0.5; }
        if (b.x > w - b.radius) { b.x = w - b.radius; b.vx *= -0.5; }
        if (b.y < b.radius) { b.y = b.radius; b.vy *= -0.5; }
        if (b.y > h - b.radius) { b.y = h - b.radius; b.vy *= -0.5; }
        const g = groupRefs.current[i];
        if (g) g.setAttribute("transform", `translate(${b.x} ${b.y})`);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [dimensions.width, dimensions.height]);

  useEffect(() => {
    if (dimensions.width < 1) return;
    const t = setTimeout(() => setRevealed(true), 50);
    return () => clearTimeout(t);
  }, [dimensions.width]);

  useEffect(() => {
    if (dimensions.width < 1) return;
    const svg = svgRef.current;
    if (!svg) return;
    const section = svg.closest("#hero") as HTMLElement | null;
    if (!section) return;
    const onMove = (e: PointerEvent) => {
      const rect = svg.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      cursorRef.current.x =
        ((e.clientX - rect.left) * dimensions.width) / rect.width;
      cursorRef.current.y =
        ((e.clientY - rect.top) * dimensions.height) / rect.height;
      cursorRef.current.active = true;
    };
    const onLeave = () => {
      cursorRef.current.active = false;
    };
    section.addEventListener("pointermove", onMove);
    section.addEventListener("pointerleave", onLeave);
    return () => {
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
    };
  }, [dimensions.width, dimensions.height]);

  const balls = ballsRef.current;
  const vw = Math.max(1, dimensions.width), vh = Math.max(1, dimensions.height);

  return (
    <div ref={wrapperRef} className="relative w-full h-full">
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox={`0 0 ${vw} ${vh}`}
        preserveAspectRatio="none"
        style={{ pointerEvents: "none", display: "block" }}
      >
        <defs>
          <filter id="ballShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="8" />
            <feOffset dx="0" dy="6" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.18" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {balls.map((b, i) => {
          const logo = LOGOS[i];
          const logoSize = b.radius * 1.1;
          return (
            <g
              key={b.id}
              ref={(el) => { groupRefs.current[i] = el; }}
              transform={`translate(${b.x} ${b.y})`}
              style={{
                opacity: revealed ? 1 : 0,
                transition: "opacity 600ms ease",
                transitionDelay: `${700 + i * 60}ms`,
              }}
            >
              <circle
                cx={0}
                cy={0}
                r={b.radius}
                fill="#FFFFFF"
                fillOpacity={1}
                filter="url(#ballShadow)"
              />
              {logo && (
                <g transform={`translate(${-logoSize / 2} ${-logoSize / 2}) scale(${logoSize / 24})`}>
                  <path d={logo.path} fill={logo.color} fillOpacity={1} />
                </g>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
