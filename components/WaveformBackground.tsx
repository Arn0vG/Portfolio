"use client";

// Oscilloscope waveform background.
// Generates sine, square, and sawtooth waveforms as SVG paths spread vertically
// across the viewport. Animated glowing dots travel along each wave like a signal probe.

function makeSine(y: number, amp: number, period: number, width = 1440): string {
  const pts: string[] = [];
  for (let x = 0; x <= width; x += 4) {
    const py = y + Math.sin((x / period) * 2 * Math.PI) * amp;
    pts.push(`${x.toFixed(1)} ${py.toFixed(2)}`);
  }
  return `M ${pts.join(" L ")}`;
}

function makeSquare(y: number, amp: number, period: number, width = 1440): string {
  const half = period / 2;
  let d = "";
  let high = true;
  for (let x = 0; x <= width; x += half) {
    const py = high ? y - amp : y + amp;
    const nx = Math.min(x + half, width);
    if (x === 0) {
      d = `M 0 ${py.toFixed(1)}`;
    } else {
      d += ` V ${py.toFixed(1)}`;
    }
    d += ` H ${nx.toFixed(1)}`;
    high = !high;
  }
  return d;
}

function makeSawtooth(y: number, amp: number, period: number, width = 1440): string {
  let d = `M 0 ${(y + amp).toFixed(1)}`;
  for (let x = period; x <= width + period; x += period) {
    const cx = Math.min(x, width);
    d += ` L ${cx.toFixed(1)} ${(y - amp).toFixed(1)}`;
    if (x < width) d += ` M ${x.toFixed(1)} ${(y + amp).toFixed(1)}`;
  }
  return d;
}

// Pre-computed at module level — no re-renders needed
const waves = [
  { path: makeSine(110,    16, 220), dur: "8s",  begin: "0s",   r: 2.5, color: "rgba(52,211,153,0.95)"  },
  { path: makeSquare(240,  12, 300), dur: "13s", begin: "-4s",  r: 2,   color: "rgba(16,185,129,0.85)"  },
  { path: makeSine(380,    22, 170), dur: "7s",  begin: "-2.5s",r: 2.5, color: "rgba(52,211,153,0.90)"  },
  { path: makeSawtooth(510,15, 240), dur: "10s", begin: "-6s",  r: 2,   color: "rgba(16,185,129,0.80)"  },
  { path: makeSine(650,    14, 310), dur: "9s",  begin: "-1s",  r: 2,   color: "rgba(5,150,105,0.90)"   },
  { path: makeSquare(790,  11, 260), dur: "11s", begin: "-7.5s",r: 2,   color: "rgba(16,185,129,0.75)"  },
];

export function WaveformBackground() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <filter id="wf-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="wf-glow-sm" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Base waveforms — very dim, full width */}
      <g fill="none" stroke="rgba(16,185,129,0.07)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        {waves.map((w, i) => (
          <path key={i} d={w.path} />
        ))}
      </g>

      {/* Animated signal probe dots — one per waveform */}
      {waves.map((w, i) => (
        <g key={i} filter={i % 2 === 0 ? "url(#wf-glow)" : "url(#wf-glow-sm)"}>
          <circle r={w.r} fill={w.color}>
            <animateMotion
              dur={w.dur}
              repeatCount="indefinite"
              begin={w.begin}
              path={w.path}
            />
          </circle>
        </g>
      ))}
    </svg>
  );
}
