"use client";

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

const LOGOS = [
  { path: siPython.path, color: "#3776AB" },
  { path: siLangchain.path, color: "#1C3C3C" },
  { path: siAnthropic.path, color: "#D97757" },
  { path: siFastapi.path, color: "#009688" },
  { path: siPostgresql.path, color: "#4169E1" },
  { path: siDocker.path, color: "#2496ED" },
  { path: siReact.path, color: "#61DAFB" },
  { path: siScikitlearn.path, color: "#F7931E" },
  { path: siPython.path, color: "#3776AB" },
  { path: siLangchain.path, color: "#1C3C3C" },
];

type Position = {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
};

type Tile = {
  logo: number;
  pos: Position;
  drift: number;
  duration: number;
  scale: number;
};

const FLOATING_TILES: Tile[] = [
  { logo: 0, pos: { top: "8%", left: "4%" }, drift: 1, duration: 20, scale: 1 },
  { logo: 1, pos: { top: "22%", left: "8%" }, drift: 2, duration: 24, scale: 0.85 },
  { logo: 2, pos: { top: "55%", left: "3%" }, drift: 3, duration: 28, scale: 1.1 },
  { logo: 3, pos: { top: "75%", left: "10%" }, drift: 1, duration: 22, scale: 0.95 },
  { logo: 4, pos: { top: "5%", right: "8%" }, drift: 2, duration: 26, scale: 0.9 },
  { logo: 5, pos: { top: "30%", right: "4%" }, drift: 3, duration: 30, scale: 1.05 },
  { logo: 6, pos: { top: "60%", right: "10%" }, drift: 1, duration: 23, scale: 0.85 },
  { logo: 7, pos: { top: "85%", right: "6%" }, drift: 2, duration: 27, scale: 1 },
  { logo: 8, pos: { top: "3%", left: "45%" }, drift: 3, duration: 25, scale: 0.9 },
  { logo: 9, pos: { bottom: "5%", left: "40%" }, drift: 1, duration: 29, scale: 0.95 },
];

const TILE_SIZE = 56;
const ICON_SIZE = 28;

export default function FloatingLogos() {
  return (
    <div
      aria-hidden
      className="hidden md:block absolute inset-0 -z-10 pointer-events-none overflow-hidden"
    >
      {FLOATING_TILES.map((tile, i) => {
        const logo = LOGOS[tile.logo];
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              ...tile.pos,
              width: TILE_SIZE * tile.scale,
              height: TILE_SIZE * tile.scale,
              borderRadius: 16,
              backgroundColor: "#FFFFFF",
              border: "1px solid var(--color-border)",
              boxShadow: "0 6px 20px rgba(10, 10, 10, 0.06)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: 0.85,
              animation: `logo-drift-${tile.drift} ${tile.duration}s ease-in-out infinite`,
            }}
          >
            <svg
              width={ICON_SIZE * tile.scale}
              height={ICON_SIZE * tile.scale}
              viewBox="0 0 24 24"
            >
              <path d={logo.path} fill={logo.color} />
            </svg>
          </div>
        );
      })}
    </div>
  );
}
