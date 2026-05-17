"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { ProjectCard } from "../components/ProjectCard";
import { projects } from "../content/project";
import { CleanDiagonalBackground } from "../components/CleanDiagonalBackground";
import { Nav } from "../components/Nav";
import { RevealSection } from "../components/RevealSection";

// ── Timing constants ───────────────────────────────────────────────────────────
const LABEL_TEXT    = "hello, world,";
const IM_TEXT       = "i'm";
const NAME_TEXT     = "Arnav Gupta";
const BADGE_TEXT    = "Hardware Design Engineering Intern @ Geoanalysis Engineering";
const SUBTITLE_TEXT = "Third-Year Mechatronics & Robotics Engineering Co-op · University of Alberta";

const LABEL_START  = 300;  const LABEL_SPEED  = 7;
const IM_START     = LABEL_START  + LABEL_TEXT.length    * LABEL_SPEED  + 60;
const IM_SPEED     = 7;
const NAME_START   = IM_START     + IM_TEXT.length       * IM_SPEED     + 80;
const NAME_SPEED   = 24;
const BADGE_START  = NAME_START   + NAME_TEXT.length     * NAME_SPEED   + 80;
const BADGE_SPEED  = 6;
const SUB_START    = BADGE_START  + BADGE_TEXT.length    * BADGE_SPEED  + 70;
const SUB_SPEED    = 5;
const CONTACT_SHOW = SUB_START    + SUBTITLE_TEXT.length * SUB_SPEED    + 150;
const INTEREST_START = CONTACT_SHOW + 250;

// ── Hooks ──────────────────────────────────────────────────────────────────────
function useTypewriter(text: string, startMs: number, speedMs: number) {
  const [out, setOut] = useState("");
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    let cancelled = false;
    let i = 0;

    const t = window.setTimeout(() => {
      const tick = () => {
        if (cancelled) return;
        i++;
        setOut(text.slice(0, i));
        if (i < text.length) window.setTimeout(tick, speedMs);
      };
      tick();
    }, startMs);

    return () => { cancelled = true; window.clearTimeout(t); };
  }, [text, startMs, speedMs]);

  return { out, done: out.length >= text.length };
}

// ── Sub-components ─────────────────────────────────────────────────────────────
function Cursor() {
  return (
    <span
      aria-hidden="true"
      className="ml-0.5 inline-block w-[2px] align-middle bg-emerald-400/70 animate-pulse"
      style={{ height: "0.85em" }}
    />
  );
}

type Phase = "typing" | "holding" | "deleting";

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-4 mb-4">
      <span className="font-mono text-xs text-emerald-400/70 tracking-widest">// {text}</span>
      <div className="flex-1 h-px bg-white/[0.06]" />
    </div>
  );
}

function IconMail(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={props.className} fill="none" aria-hidden="true">
      <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v9A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5v-9Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="m6.5 8 5.2 4.1c.19.15.41.23.65.23.24 0 .46-.08.65-.23L18.5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function IconLinkedIn(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={props.className} fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
    </svg>
  );
}
function IconDocument(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={props.className} fill="none" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function IconGitHub(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={props.className} fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}
function IconPhone(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={props.className} fill="none" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.77 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.68 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.65a16 16 0 0 0 6.29 6.29l1.01-1.01a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconPin(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={props.className} fill="none" aria-hidden="true">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

// ── Data ───────────────────────────────────────────────────────────────────────
const skillCategories = [
  { label: "Hardware & Design", pills: ["PCB Design", "ASIC Design", "Embedded Hardware", "Power Systems", "RF Control", "PWM", "Motor Control", "High-Speed Routing", "PCB Simulation", "Soldering", "3D Modelling"] },
  { label: "Tools", pills: ["Altium Designer", "KiCad", "AutoCAD", "SolidWorks", "Fusion 360", "LTspice", "Git", "Node.js", "Unity"] },
  { label: "Languages", pills: ["C/C++", "Python", "Java", "TypeScript", "MATLAB", "C#"] },
  { label: "HDLs", pills: ["Verilog", "SystemVerilog", "VHDL"] },
];

const experiences = [
  {
    role: "Hardware Design Engineering Intern",
    org: "Geoanalysis Engineering",
    period: "2025 — Present",
    tags: ["Altium Designer", "PCB Design", "Embedded Hardware", "Instrumentation"],
    current: true,
    bullets: [] as string[],
  },
  {
    role: "Electrical Member",
    org: "UAARG — University of Alberta Aerial Robotics Group",
    period: "Feb 2026 — Present",
    tags: ["Altium", "STM32", "BQ76952", "Battery Management", "CAN Bus"],
    current: true,
    bullets: [
      "Individually designed a 25.2V high-current UAV power distribution and battery management PCB integrating four 6S LiPo packs into a unified bus supporting up to 220A",
      "Implementing battery monitoring using the BQ76952 IC and STM32G474 MCU for pack-level voltage sensing, cell balancing, and CAN-based telemetry",
      "Engineered busbar routing for low IR drop with hardware-level reverse polarity and short-circuit protection",
    ],
  },
  {
    role: "Electrical Division Member",
    org: "ARVP — Autonomous Robotic Vehicle Project",
    period: "Sep 2025 — Present",
    tags: ["Teensy 4.0", "CAN", "I²C", "UART", "LTspice", "Firmware"],
    current: true,
    bullets: [
      "Designed, simulated, and validated a Teensy 4.0-based embedded interface board integrating CAN, I²C, and UART with analog signal conditioning and ADC front-end design for a high-noise submerged environment",
      "Designed and simulated analog low-pass filters in LTspice to condition sensor signals before ADC sampling",
      "Developed embedded firmware for CAN messaging, sensor acquisition (Hall-effect and temperature), and payload communication",
    ],
  },
];

// ── Page ───────────────────────────────────────────────────────────────────────
export default function Home() {
  // Sequential hero type-out (each fires once on mount)
  const label    = useTypewriter(LABEL_TEXT,    LABEL_START,  LABEL_SPEED);
  const im       = useTypewriter(IM_TEXT,       IM_START,     IM_SPEED);
  const nameType = useTypewriter(NAME_TEXT,     NAME_START,   NAME_SPEED);
  const badge    = useTypewriter(BADGE_TEXT,    BADGE_START,  BADGE_SPEED);
  const subtitle = useTypewriter(SUBTITLE_TEXT, SUB_START,    SUB_SPEED);

  // Contact + interests appear after hero is done
  const [contactVisible, setContactVisible] = useState(false);
  const [interestStarted, setInterestStarted] = useState(false);

  useEffect(() => {
    const t1 = window.setTimeout(() => setContactVisible(true), CONTACT_SHOW);
    const t2 = window.setTimeout(() => setInterestStarted(true), INTEREST_START);
    return () => { window.clearTimeout(t1); window.clearTimeout(t2); };
  }, []);

  // Cycling interests typewriter — only after hero is done
  const interests = useMemo(
    () => ["PCB Design", "ASIC Design", "Embedded Systems", "Programming", "3D Modelling", "Chess", "Skiing", "Soccer"],
    []
  );
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");
  const [interestText, setInterestText] = useState("");

  useEffect(() => {
    if (!interestStarted) return;
    const full = interests[idx % interests.length];
    const timer = window.setTimeout(() => {
      if (phase === "typing") {
        const next = full.slice(0, interestText.length + 1);
        setInterestText(next);
        if (next === full) setPhase("holding");
      } else if (phase === "holding") {
        setPhase("deleting");
      } else {
        const next = full.slice(0, Math.max(0, interestText.length - 1));
        setInterestText(next);
        if (next.length === 0) {
          setIdx((i) => (i + 1) % interests.length);
          setPhase("typing");
        }
      }
    }, phase === "typing" ? 70 : phase === "deleting" ? 45 : 1100);
    return () => window.clearTimeout(timer);
  }, [idx, phase, interestText, interests, interestStarted]);

  const contactStyle: CSSProperties = {
    opacity: contactVisible ? 1 : 0,
    transition: "opacity 0.6s ease",
  };

  return (
    <div className="relative min-h-screen bg-[#05050f] text-zinc-100 overflow-hidden">
      <Nav />

      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0">
        <CleanDiagonalBackground className="absolute inset-0" />
      </div>

      {/* ── HERO (full-screen landing) ── */}
      <section className="relative flex min-h-screen flex-col items-center justify-center text-center px-6 pt-14">

        {/* Avatar */}
        <div className="relative mb-10">
          <div className="relative h-[88px] w-[88px] mx-auto">
            {/* Rotating gradient ring */}
            <div
              className="absolute inset-0 rounded-full animate-spin"
              style={{
                animationDuration: "9s",
                background: "conic-gradient(from 0deg, rgba(16,185,129,0.9), rgba(5,150,105,0.6), rgba(16,185,129,0.1), rgba(16,185,129,0.9))",
              }}
            />
            {/* Inner dark circle */}
            <div className="absolute inset-[2px] rounded-full bg-[#05050f] flex items-center justify-center">
              <span className="font-bold text-xl tracking-wider text-emerald-300 select-none">AG</span>
            </div>
          </div>
          {/* Ambient glow beneath */}
          <div className="absolute inset-0 -z-10 scale-[2] rounded-full bg-emerald-500/10 blur-2xl" />
        </div>

        {/* Typewriter content */}
        <div className="space-y-4 max-w-3xl w-full">

          {/* Annotation */}
          <p className="font-mono text-sm text-emerald-400/80 tracking-widest min-h-[1.5rem]">
            {label.out}{!label.done && <Cursor />}
          </p>

          {/* i'm */}
          <p className="font-mono text-sm text-emerald-400/80 tracking-widest min-h-[1.5rem]">
            {im.out}{!im.done && im.out.length > 0 && <Cursor />}
          </p>

          {/* Name */}
          <h1 className="text-6xl font-bold tracking-tight sm:text-7xl lg:text-8xl min-h-[1.2em]">
            <span className="bg-gradient-to-br from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              {nameType.out}
            </span>
            {!nameType.done && nameType.out.length > 0 && <Cursor />}
          </h1>

          {/* Badge */}
          <div className="min-h-[2.25rem] flex items-center justify-center">
            {badge.out.length > 0 && (
              <div className="inline-flex items-center gap-2 rounded-full border border-green-500/25 bg-green-500/10 px-4 py-2 text-sm text-green-400">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                {badge.out}{!badge.done && <Cursor />}
              </div>
            )}
          </div>

          {/* Subtitle */}
          <p className="text-base text-zinc-400 min-h-[1.5rem]">
            {subtitle.out}{!subtitle.done && subtitle.out.length > 0 && <Cursor />}
          </p>

          {/* Bio */}
          <div className="mx-auto max-w-2xl border-l-2 border-emerald-500/50 pl-4 text-left" style={contactStyle}>
            <p className="text-base text-zinc-200 leading-relaxed">
              I&apos;m Arnav Gupta, a Mechatronics &amp; Robotics Engineering student at the University of Alberta. I design hardware, from PCBs and power systems to embedded firmware. Currently interning at Geoanalysis Engineering and building UAV electronics for UAARG and ARVP.
            </p>
          </div>

          {/* Interests */}
          <p className="text-lg text-zinc-300 min-h-[1.75rem]" style={contactStyle}>
            {interestStarted && (
              <>Interests:{" "}
                <span className="font-semibold text-white">
                  {interestText}
                  <span className="ml-0.5 inline-block h-5 w-[2px] translate-y-[3px] bg-emerald-400/80 animate-pulse" />
                </span>
              </>
            )}
          </p>
        </div>

        {/* Contact */}
        <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm" id="contact" style={contactStyle}>
          <a href="mailto:arnav207@gmail.com" className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2.5 text-zinc-300 hover:border-white/20 hover:bg-white/[0.07] hover:text-white transition">
            <IconMail className="h-4 w-4" />arnav207@gmail.com
          </a>
          <a href="tel:+14038992495" className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2.5 text-zinc-300 hover:border-white/20 hover:bg-white/[0.07] hover:text-white transition">
            <IconPhone className="h-4 w-4" />(403) 899-2495
          </a>
          <a href="https://www.linkedin.com/in/arnav-gupta121/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2.5 text-zinc-300 hover:border-white/20 hover:bg-white/[0.07] hover:text-white transition">
            <IconLinkedIn className="h-4 w-4" />LinkedIn
          </a>
          <a href="https://github.com/arn0vg" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2.5 text-zinc-300 hover:border-white/20 hover:bg-white/[0.07] hover:text-white transition">
            <IconGitHub className="h-4 w-4" />GitHub
          </a>
          <a href="/arnav-gupta-portfolio.pdf" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2.5 text-zinc-300 hover:border-white/20 hover:bg-white/[0.07] hover:text-white transition">
            <IconDocument className="h-4 w-4" />Portfolio PDF
          </a>
          <span className="inline-flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-2.5 text-zinc-500">
            <IconPin className="h-4 w-4" />Edmonton, AB
          </span>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 flex flex-col items-center gap-1.5 text-zinc-600" style={contactStyle}>
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase">scroll</span>
          <svg className="h-4 w-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── SCROLLABLE CONTENT ── */}
      <main className="relative mx-auto max-w-6xl px-8 pb-24 scroll-smooth" id="top">

        {/* ── EXPERIENCE ── */}
        <RevealSection className="mt-32 scroll-mt-20" id="experience">
          <SectionLabel text="experience" />
          <h2 className="text-4xl font-bold tracking-tight">Experience</h2>

          <div className="relative mt-10">
            <div className="absolute left-[7px] top-1 w-px bg-gradient-to-b from-emerald-500/60 via-white/[0.08] to-transparent" style={{ bottom: "2rem" }} />
            <div className="space-y-6">
              {experiences.map((exp, i) => (
                <RevealSection key={exp.org} delay={i * 80} className="relative pl-10">
                  <div className={`absolute left-0 top-[22px] h-[15px] w-[15px] rounded-full border-2 bg-[#05050f] ${exp.current ? "border-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "border-white/20"}`} />
                  <div className="relative overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.02] px-6 py-5 transition hover:border-white/[0.12]">
                    <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-emerald-500/60 via-emerald-500/20 to-transparent" />
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="text-base font-semibold text-zinc-100">{exp.role}</h3>
                          {exp.current && (
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-green-500/25 bg-green-500/10 px-2.5 py-0.5 text-xs text-green-400">
                              <span className="h-1 w-1 rounded-full bg-green-400 animate-pulse" />Current
                            </span>
                          )}
                        </div>
                        <p className="mt-0.5 text-sm text-zinc-500">{exp.org}</p>
                      </div>
                      <span className="shrink-0 font-mono text-xs text-zinc-600">{exp.period}</span>
                    </div>
                    {exp.bullets.length > 0 && (
                      <ul className="mt-4 space-y-2">
                        {exp.bullets.map((b, j) => (
                          <li key={j} className="flex gap-2.5 text-sm text-zinc-400 leading-relaxed">
                            <span className="mt-1 shrink-0 text-emerald-500/60">▸</span>{b}
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {exp.tags.map((t) => (
                        <span key={t} className="rounded-md border border-white/[0.07] bg-white/[0.02] px-2.5 py-1 text-xs text-zinc-400">{t}</span>
                      ))}
                    </div>
                  </div>
                </RevealSection>
              ))}
            </div>
          </div>
        </RevealSection>

        {/* ── SKILLS ── */}
        <RevealSection className="mt-28 scroll-mt-20" id="skills">
          <SectionLabel text="skills" />
          <h2 className="text-4xl font-bold tracking-tight">Skills</h2>
          <div className="mt-8 space-y-3">
            {skillCategories.map((cat, i) => (
              <RevealSection key={cat.label} delay={i * 60}>
                <div className="relative overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.02] px-7 py-5 transition hover:border-white/[0.11]">
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-emerald-500/70 via-emerald-500/30 to-transparent" />
                  <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.15em] text-emerald-400/70">{cat.label}</p>
                  <div className="flex flex-wrap gap-2">
                    {cat.pills.map((pill) => (
                      <span key={pill} className="rounded-md border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-sm text-zinc-300">{pill}</span>
                    ))}
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </RevealSection>

        {/* ── PROJECTS ── */}
        <RevealSection className="mt-28 scroll-mt-20" id="projects">
          <SectionLabel text="projects" />
          <h2 className="text-4xl font-bold tracking-tight">Projects</h2>
          <p className="mt-3 text-zinc-500 max-w-2xl">Selected hardware designs — schematic capture, PCB layout, and system-level integration.</p>
          <div className="mt-10 space-y-8">
            {projects.map((project, i) => (
              <RevealSection key={project.title} delay={i * 80}>
                <ProjectCard project={project} index={i} />
              </RevealSection>
            ))}
          </div>
        </RevealSection>

        <footer className="mt-32 border-t border-white/[0.06] pt-10 flex items-center justify-between text-sm text-zinc-600">
          <span>© 2026 Arnav Gupta</span>
          <span className="font-mono text-xs">built with Next.js + TypeScript</span>
        </footer>
      </main>
    </div>
  );
}
