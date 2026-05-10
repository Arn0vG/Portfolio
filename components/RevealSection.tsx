"use client";

import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";

export function RevealSection({
  children,
  delay = 0,
  className,
  id,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.08 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const style: CSSProperties = visible
    ? { animation: `fadeUp 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms both` }
    : { opacity: 0 };

  return (
    <div ref={ref} id={id} className={className} style={style}>
      {children}
    </div>
  );
}
