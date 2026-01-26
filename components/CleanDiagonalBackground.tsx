"use client";

export function CleanDiagonalBackground({ className }: { className?: string }) {
  return (
    <div className={className}>
      {/* Base */}
      <div className="absolute inset-0 bg-[#070711]" />

      {/* Soft vignette + subtle top glow */}
      <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_25%_15%,rgba(99,102,241,0.14),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_70%_35%,rgba(34,211,238,0.08),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(1100px_700px_at_50%_55%,rgba(0,0,0,0.0),rgba(0,0,0,0.55))]" />

      {/* Diagonal panel (right side) */}
      <div
        className="
          absolute -right-[8%] top-[-10%] h-[140%] w-[62%]
          rotate-18
          bg-[linear-gradient(180deg,rgba(99,102,241,0.12),rgba(17,17,40,0.75))]
          shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_40px_120px_rgba(0,0,0,0.65)]
        "
      />

      {/* Panel edge highlight */}
      <div
        className="
          absolute -right-[40%] top-[-10%] h-[140%] w-[62%]
          rotate-30
          bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.10),transparent)]
          opacity-40
          [clip-path:polygon(0_0,1%_0,1%_100%,0_100%)]
        "
      />

      {/* Bottom fade (keeps content readable) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/60" />
    </div>
  );
}
