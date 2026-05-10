"use client";

export function CleanDiagonalBackground({ className }: { className?: string }) {
  return (
    <div className={className}>
      {/* Base: deep dark navy */}
      <div className="absolute inset-0 bg-[#05050f]" />

      {/* Dot grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Aurora blobs */}
      <div className="absolute -top-[20%] -left-[10%] h-[700px] w-[700px] rounded-full bg-indigo-600/20 blur-[140px]" />
      <div className="absolute top-[5%] -right-[15%] h-[580px] w-[580px] rounded-full bg-violet-700/15 blur-[130px]" />
      <div className="absolute bottom-[0%] left-[20%] h-[500px] w-[800px] rounded-full bg-cyan-600/8 blur-[140px]" />

      {/* Radial vignette — keeps center readable, darkens edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_80%_at_50%_30%,transparent_30%,rgba(5,5,15,0.75)_100%)]" />
    </div>
  );
}
