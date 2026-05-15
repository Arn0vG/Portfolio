"use client";

// PCB trace network — orthogonal routing paths (Manhattan style) with animated signal pulses.
// Mimics actual PCB copper traces and via pads. Purely decorative, pointer-events off.

export function PCBTraces() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <filter id="pcb-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="pcb-glow-sm" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ── Trace network (orthogonal PCB routing) ── */}
      <g stroke="rgba(99,102,241,0.10)" strokeWidth="1" fill="none" strokeLinecap="square">
        {/* Top-left cluster */}
        <path d="M -4 180 H 160 V 300 H 380 V 180 H 540 V 100" />
        <path d="M 80 -4 V 80 H 200 V 180" />

        {/* Left-middle cluster */}
        <path d="M -4 520 H 100 V 440 H 300 V 600 H 460 V 520 H 620" />
        <path d="M 160 600 V 700 H 40 V 780" />

        {/* Top-right cluster */}
        <path d="M 880 -4 V 120 H 760 V 220 H 980 V 60 H 1180 V 200 H 1444" />
        <path d="M 1060 220 V 320 H 1200 V 260" />

        {/* Right-middle cluster */}
        <path d="M 1444 360 H 1260 V 260 H 1060 V 420 H 900 V 320 H 760" />
        <path d="M 1360 420 V 520 H 1200 V 480" />

        {/* Bottom cluster */}
        <path d="M 380 904 V 800 H 560 V 860 H 780 V 740 H 980 V 840 H 1444" />
        <path d="M 680 800 V 720 H 820 V 800" />

        {/* Center-top accent */}
        <path d="M 620 -4 V 60 H 740 V 140 H 580 V 260 H 720 V 320" />

        {/* Bottom-left accent */}
        <path d="M -4 760 H 80 V 680 H 220 V 800 H 100 V 904" />

        {/* Bottom-right accent */}
        <path d="M 1180 904 V 820 H 1320 V 720 H 1140 V 640 H 1280" />
      </g>

      {/* ── Via pads at corners/junctions ── */}
      <g fill="rgba(99,102,241,0.20)">
        {/* top-left cluster */}
        <circle cx="160" cy="180" r="2.5" />
        <circle cx="160" cy="300" r="2.5" />
        <circle cx="380" cy="300" r="2.5" />
        <circle cx="380" cy="180" r="2.5" />
        <circle cx="540" cy="180" r="2.5" />
        <circle cx="200" cy="80"  r="2.5" />
        <circle cx="200" cy="180" r="2.5" />
        {/* left-middle cluster */}
        <circle cx="100" cy="520" r="2.5" />
        <circle cx="100" cy="440" r="2.5" />
        <circle cx="300" cy="440" r="2.5" />
        <circle cx="300" cy="600" r="2.5" />
        <circle cx="460" cy="600" r="2.5" />
        <circle cx="460" cy="520" r="2.5" />
        <circle cx="160" cy="600" r="2.5" />
        <circle cx="160" cy="700" r="2.5" />
        <circle cx="40"  cy="700" r="2.5" />
        {/* top-right cluster */}
        <circle cx="880" cy="120" r="2.5" />
        <circle cx="760" cy="120" r="2.5" />
        <circle cx="760" cy="220" r="2.5" />
        <circle cx="980" cy="220" r="2.5" />
        <circle cx="980" cy="60"  r="2.5" />
        <circle cx="1180" cy="60" r="2.5" />
        <circle cx="1180" cy="200" r="2.5" />
        <circle cx="1060" cy="220" r="2.5" />
        <circle cx="1060" cy="320" r="2.5" />
        <circle cx="1200" cy="320" r="2.5" />
        {/* right-middle cluster */}
        <circle cx="1260" cy="360" r="2.5" />
        <circle cx="1260" cy="260" r="2.5" />
        <circle cx="1060" cy="260" r="2.5" />
        <circle cx="1060" cy="420" r="2.5" />
        <circle cx="900"  cy="420" r="2.5" />
        <circle cx="900"  cy="320" r="2.5" />
        <circle cx="1360" cy="420" r="2.5" />
        <circle cx="1360" cy="520" r="2.5" />
        <circle cx="1200" cy="480" r="2.5" />
        {/* bottom cluster */}
        <circle cx="380" cy="800" r="2.5" />
        <circle cx="560" cy="800" r="2.5" />
        <circle cx="560" cy="860" r="2.5" />
        <circle cx="780" cy="860" r="2.5" />
        <circle cx="780" cy="740" r="2.5" />
        <circle cx="980" cy="740" r="2.5" />
        <circle cx="980" cy="840" r="2.5" />
        <circle cx="680" cy="800" r="2.5" />
        <circle cx="680" cy="720" r="2.5" />
        <circle cx="820" cy="720" r="2.5" />
        {/* center-top */}
        <circle cx="620" cy="60"  r="2.5" />
        <circle cx="740" cy="60"  r="2.5" />
        <circle cx="740" cy="140" r="2.5" />
        <circle cx="580" cy="140" r="2.5" />
        <circle cx="580" cy="260" r="2.5" />
        <circle cx="720" cy="260" r="2.5" />
        {/* bottom-left */}
        <circle cx="80"  cy="760" r="2.5" />
        <circle cx="80"  cy="680" r="2.5" />
        <circle cx="220" cy="680" r="2.5" />
        <circle cx="220" cy="800" r="2.5" />
        <circle cx="100" cy="800" r="2.5" />
        {/* bottom-right */}
        <circle cx="1180" cy="820" r="2.5" />
        <circle cx="1320" cy="820" r="2.5" />
        <circle cx="1320" cy="720" r="2.5" />
        <circle cx="1140" cy="720" r="2.5" />
        <circle cx="1140" cy="640" r="2.5" />
      </g>

      {/* ── Animated signal pulses ── */}
      {/* Each pulse is a glowing dot traveling along a trace path */}

      <g filter="url(#pcb-glow)">
        <circle r="3" fill="rgba(129,140,248,0.95)">
          <animateMotion dur="6s" repeatCount="indefinite" begin="0s"
            path="M -4 180 H 160 V 300 H 380 V 180 H 540 V 100" />
        </circle>
      </g>

      <g filter="url(#pcb-glow)">
        <circle r="2.5" fill="rgba(139,92,246,0.85)">
          <animateMotion dur="9s" repeatCount="indefinite" begin="-3.5s"
            path="M 880 -4 V 120 H 760 V 220 H 980 V 60 H 1180 V 200 H 1444" />
        </circle>
      </g>

      <g filter="url(#pcb-glow)">
        <circle r="2.5" fill="rgba(99,102,241,0.9)">
          <animateMotion dur="7.5s" repeatCount="indefinite" begin="-1.5s"
            path="M 1444 360 H 1260 V 260 H 1060 V 420 H 900 V 320 H 760" />
        </circle>
      </g>

      <g filter="url(#pcb-glow-sm)">
        <circle r="2" fill="rgba(165,180,252,0.8)">
          <animateMotion dur="8s" repeatCount="indefinite" begin="-5s"
            path="M -4 520 H 100 V 440 H 300 V 600 H 460 V 520 H 620" />
        </circle>
      </g>

      <g filter="url(#pcb-glow)">
        <circle r="3" fill="rgba(129,140,248,0.85)">
          <animateMotion dur="10s" repeatCount="indefinite" begin="-2s"
            path="M 380 904 V 800 H 560 V 860 H 780 V 740 H 980 V 840 H 1444" />
        </circle>
      </g>

      <g filter="url(#pcb-glow-sm)">
        <circle r="2" fill="rgba(196,181,253,0.75)">
          <animateMotion dur="5s" repeatCount="indefinite" begin="-4s"
            path="M 620 -4 V 60 H 740 V 140 H 580 V 260 H 720 V 320" />
        </circle>
      </g>

      <g filter="url(#pcb-glow-sm)">
        <circle r="2" fill="rgba(129,140,248,0.7)">
          <animateMotion dur="6.5s" repeatCount="indefinite" begin="-7s"
            path="M 1180 904 V 820 H 1320 V 720 H 1140 V 640 H 1280" />
        </circle>
      </g>
    </svg>
  );
}
