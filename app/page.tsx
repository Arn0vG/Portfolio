"use client";

import { useEffect, useMemo, useState } from "react";
import { ProjectCard } from "../components/ProjectCard";
import { projects } from "../content/project";
import { CleanDiagonalBackground } from "../components/CleanDiagonalBackground";
import { Nav } from "../components/Nav";

type Phase = "typing" | "holding" | "deleting";

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-4 mb-4">
      <span className="font-mono text-xs text-indigo-400/70 tracking-widest">// {text}</span>
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
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
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

const skillCategories = [
  {
    label: "Hardware & Design",
    pills: ["PCB Design", "ASIC Design", "Embedded Hardware", "RF Control", "PWM", "Motor Control", "High-Speed Routing", "PCB Simulation", "Soldering", "3D Modelling"],
  },
  {
    label: "Tools",
    pills: ["Altium Designer", "KiCad", "AutoCAD", "SolidWorks", "Fusion 360", "LTspice", "Git", "Node.js", "Unity"],
  },
  {
    label: "Languages",
    pills: ["C/C++", "Python", "Java", "TypeScript", "MATLAB"],
  },
  {
    label: "HDLs",
    pills: ["Verilog", "SystemVerilog", "VHDL"],
  },
];

export default function Home() {
  const interests = useMemo(
    () => ["PCB Design", "ASIC Design", "Embedded Systems", "Programming", "3D Modelling", "Chess", "Skiing", "Soccer"],
    []
  );

  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");
  const [text, setText] = useState("");

  useEffect(() => {
    const full = interests[idx % interests.length];
    const timer = window.setTimeout(() => {
      if (phase === "typing") {
        const next = full.slice(0, text.length + 1);
        setText(next);
        if (next === full) setPhase("holding");
      } else if (phase === "holding") {
        setPhase("deleting");
      } else {
        const next = full.slice(0, Math.max(0, text.length - 1));
        setText(next);
        if (next.length === 0) {
          setIdx((i) => (i + 1) % interests.length);
          setPhase("typing");
        }
      }
    }, phase === "typing" ? 70 : phase === "deleting" ? 45 : 1100);

    return () => window.clearTimeout(timer);
  }, [idx, phase, text, interests]);

  return (
    <div className="relative min-h-screen bg-[#05050f] text-zinc-100 overflow-hidden">
      <Nav />

      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0">
        <CleanDiagonalBackground className="absolute inset-0" />
      </div>

      <main className="relative mx-auto max-w-6xl px-8 pt-36 pb-24 scroll-smooth" id="top">

        {/* ── HERO ── */}
        <header className="space-y-8">
          <div className="space-y-4">
            <p className="font-mono text-sm text-indigo-400/80 tracking-widest">hello, world —</p>

            <h1 className="text-6xl font-bold tracking-tight sm:text-7xl lg:text-8xl bg-gradient-to-br from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              Arnav Gupta
            </h1>

            {/* Current role badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-green-500/25 bg-green-500/10 px-4 py-2 text-sm text-green-400">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
              Hardware Design Engineering Intern · Geoanalysis Engineering
            </div>

            <p className="text-lg text-zinc-400 max-w-xl leading-relaxed">
              Second-Year Mechatronics & Robotics Engineering Co-op Student
              <span className="text-zinc-600"> — </span>
              University of Alberta
            </p>

            <p className="text-lg text-zinc-300">
              Interests:{" "}
              <span className="font-semibold text-white">
                {text}
                <span className="ml-0.5 inline-block h-5 w-[2px] translate-y-[3px] bg-indigo-400/80 animate-pulse" />
              </span>
            </p>
          </div>

          {/* Contact */}
          <div className="flex flex-wrap gap-3 text-sm" id="contact">
            <a
              href="mailto:arnav207@gmail.com"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2.5 text-zinc-300 hover:border-white/20 hover:bg-white/[0.07] hover:text-white transition"
            >
              <IconMail className="h-4 w-4" />
              arnav207@gmail.com
            </a>

            <a
              href="tel:+14038992495"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2.5 text-zinc-300 hover:border-white/20 hover:bg-white/[0.07] hover:text-white transition"
            >
              <IconPhone className="h-4 w-4" />
              (403) 899-2495
            </a>

            <a
              href="https://www.linkedin.com/in/arnav-gupta121/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2.5 text-zinc-300 hover:border-white/20 hover:bg-white/[0.07] hover:text-white transition"
            >
              <IconLinkedIn className="h-4 w-4" />
              LinkedIn
            </a>

            <a
              href="/Portfolio___Arnav_Gupta__Updated_March_17st_ (3).pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2.5 text-zinc-300 hover:border-white/20 hover:bg-white/[0.07] hover:text-white transition"
            >
              <IconDocument className="h-4 w-4" />
              Portfolio PDF
            </a>

            <span className="inline-flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-2.5 text-zinc-500">
              <IconPin className="h-4 w-4" />
              Edmonton, AB
            </span>
          </div>
        </header>

        {/* ── SKILLS ── */}
        <section className="mt-32 scroll-mt-20" id="skills">
          <SectionLabel text="skills" />
          <h2 className="text-4xl font-bold tracking-tight">Skills</h2>

          <div className="mt-8 space-y-3">
            {skillCategories.map((cat) => (
              <div
                key={cat.label}
                className="relative overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.02] px-7 py-5 transition hover:border-white/[0.11]"
              >
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-indigo-500/70 via-indigo-500/30 to-transparent" />
                <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.15em] text-indigo-400/70">
                  {cat.label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {cat.pills.map((pill) => (
                    <span
                      key={pill}
                      className="rounded-md border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-sm text-zinc-300"
                    >
                      {pill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── PROJECTS ── */}
        <section className="mt-32 scroll-mt-20" id="projects">
          <SectionLabel text="projects" />
          <h2 className="text-4xl font-bold tracking-tight">Projects</h2>
          <p className="mt-3 text-zinc-500 max-w-2xl">
            Selected hardware designs — schematic capture, PCB layout, and system-level integration.
          </p>

          <div className="mt-10 space-y-8">
            {projects.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </div>
        </section>

        <footer className="mt-32 border-t border-white/[0.06] pt-10 flex items-center justify-between text-sm text-zinc-600">
          <span>© 2026 Arnav Gupta</span>
          <span className="font-mono text-xs">built with Next.js + TypeScript</span>
        </footer>
      </main>
    </div>
  );
}
