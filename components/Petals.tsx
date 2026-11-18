"use client";

import { useEffect, useState } from "react";

/**
 * Lightweight floating petal particles — pure CSS transforms, GPU-friendly.
 * Renders nothing for users who prefer reduced motion.
 */
type Petal = { left: number; delay: number; duration: number; size: number; drift: number; hue: string; rot: number };

const HUES = ["#E9C2C0", "#F3D9D3", "#C6A56B", "#FAF8F2", "#E9C2C0"];

export default function Petals({ count = 14, className = "" }: { count?: number; className?: string }) {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const n = window.innerWidth < 768 ? Math.ceil(count / 2) : count;
    setPetals(
      Array.from({ length: n }, (_, i) => ({
        left: Math.random() * 100,
        delay: -Math.random() * 18,
        duration: 14 + Math.random() * 12,
        size: 8 + Math.random() * 10,
        drift: (Math.random() - 0.5) * 160,
        hue: HUES[i % HUES.length],
        rot: Math.random() * 360,
      }))
    );
  }, [count]);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {petals.map((p, i) => (
        <span
          key={i}
          className="tg-petal absolute -top-8 block"
          style={
            {
              left: `${p.left}%`,
              width: p.size,
              height: p.size * 1.25,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              "--drift": `${p.drift}px`,
              "--rot": `${p.rot}deg`,
              background: `radial-gradient(ellipse at 30% 30%, #fff8 0%, ${p.hue} 55%, ${p.hue}cc 100%)`,
              borderRadius: "80% 0 80% 0",
              opacity: 0.75,
            } as React.CSSProperties
          }
        />
      ))}
      <style>{`
        .tg-petal { animation-name: tg-fall; animation-timing-function: linear; animation-iteration-count: infinite; will-change: transform; }
        @keyframes tg-fall {
          0%   { transform: translate3d(0,-5vh,0) rotate(var(--rot)); opacity: 0; }
          10%  { opacity: .8; }
          50%  { transform: translate3d(calc(var(--drift) * .6), 50vh, 0) rotate(calc(var(--rot) + 180deg)); }
          90%  { opacity: .6; }
          100% { transform: translate3d(var(--drift), 105vh, 0) rotate(calc(var(--rot) + 360deg)); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
