"use client";

import { useEffect, useState } from "react";

export function SpotlightMask({
  strength = 0.55,
  radius = 320,
}: {
  strength?: number; // 0.3–0.75
  radius?: number;   // 220–420
}) {
  const [pos, setPos] = useState({ x: -9999, y: -9999 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30"
      style={{
        background: `radial-gradient(${radius}px circle at ${pos.x}px ${pos.y}px,
          rgba(255,255,255,${strength * 0.10}),
          rgba(255,255,255,0.00) 55%),
          radial-gradient(${radius * 1.6}px circle at ${pos.x}px ${pos.y}px,
          rgba(99,102,241,${strength * 0.12}),
          rgba(0,0,0,0) 60%)`,
        mixBlendMode: "screen",
      }}
    />
  );
}
