"use client";

import { useEffect } from "react";

export function CleanDiagonalBackground({ className }: { className?: string }) {
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty("--mx", `${e.clientX}px`);
      document.documentElement.style.setProperty("--my", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className={className}>
      {/* Base */}
      <div className="absolute inset-0 bg-[#05050f]" />

      {/* Aurora blobs */}
      <div className="absolute -top-[20%] -left-[10%] h-[700px] w-[700px] rounded-full bg-emerald-600/18 blur-[140px]" />
      <div className="absolute top-[5%] -right-[15%] h-[580px] w-[580px] rounded-full bg-green-700/12 blur-[130px]" />
      <div className="absolute bottom-[0%] left-[20%] h-[500px] w-[800px] rounded-full bg-teal-600/[0.06] blur-[140px]" />

      {/* Dim grid — always visible, very subtle */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Lit grid — revealed near cursor via mask. Fixed so coords match clientX/Y */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(16,185,129,0.22) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16,185,129,0.22) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          WebkitMaskImage:
            "radial-gradient(180px circle at var(--mx, -999px) var(--my, -999px), black 0%, transparent 100%)",
          maskImage:
            "radial-gradient(180px circle at var(--mx, -999px) var(--my, -999px), black 0%, transparent 100%)",
        }}
      />

      {/* Vignette — softens edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_80%_at_50%_30%,transparent_30%,rgba(5,5,15,0.72)_100%)]" />
    </div>
  );
}
