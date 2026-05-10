"use client";

import { useState, type CSSProperties } from "react";
import styles from "./Confetti.module.css";

const COLORS = ["#ff8aa1", "#ff7a89", "#d65a7c", "#ffc1cc", "#ffd9b8", "#ffe66e", "#a3d9b1"];

type Origin = { x: number; y: number };

type Particle = { key: number; style: CSSProperties };

type Props = {
  count?: number;
  origin?: Origin;
};

function generateParticles(count: number, origin?: Origin): Particle[] {
  const ox = origin?.x ?? 0.5;
  const oy = origin?.y ?? 0.5;
  const items: Particle[] = [];
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const distance = 140 + Math.random() * 220;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance + Math.random() * 80;
    const rot = (Math.random() * 720 - 360).toFixed(0);
    const delay = (Math.random() * 0.18).toFixed(2);
    const color = COLORS[i % COLORS.length];
    const left = `${(ox * 100).toFixed(2)}%`;
    const top = `${(oy * 100).toFixed(2)}%`;
    items.push({
      key: i,
      style: {
        "--x": `${x.toFixed(0)}px`,
        "--y": `${y.toFixed(0)}px`,
        "--rot": `${rot}deg`,
        "--delay": `${delay}s`,
        "--bg": color,
        left,
        top,
        background: color,
      } as CSSProperties,
    });
  }
  return items;
}

export function Confetti({ count = 28, origin }: Props) {
  const [particles] = useState<Particle[]>(() => generateParticles(count, origin));

  return (
    <div className={styles.layer} aria-hidden="true">
      {particles.map((p) => (
        <span key={p.key} className={styles.particle} style={p.style} />
      ))}
    </div>
  );
}
