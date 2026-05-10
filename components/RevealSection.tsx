"use client";

import { useEffect, useRef, useState } from "react";

export function RevealSection({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
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

  return (
    <div
      ref={ref}
      className={className}
      style={
        visible
          ? {
              animation: `fadeUp 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms both`,
            }
          : { opacity: 0 }
      }
    >
      {children}
    </div>
  );
}
