"use client";

import { useEffect, useMemo, useState } from "react";
import { ProjectCard } from "../components/ProjectCard";
import { projects } from "../content/project";
import { CleanDiagonalBackground } from "../components/CleanDiagonalBackground";
import { SpotlightMask } from "../components/SpotlightMask";
import { Nav } from "../components/Nav";

type Phase = "typing" | "holding" | "deleting";

function IconMail(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={props.className} fill="none" aria-hidden="true">
      <path
        d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v9A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5v-9Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="m6.5 8 5.2 4.1c.19.15.41.23.65.23.24 0 .46-.08.65-.23L18.5 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
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
      <path
        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points="14 2 14 8 20 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="10" y1="9" x2="8" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconPin(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={props.className} fill="none" aria-hidden="true">
      <path
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

const skillCategories = [
  {
    label: "Hardware & Design",
    pills: [
      "PCB Design",
      "ASIC Design",
      "Embedded Hardware",
      "RF Control",
      "PWM",
      "Motor Control",
      "High-Speed Routing",
      "PCB Simulation",
      "Soldering",
      "3D Modelling",
    ],
  },
  {
    label: "Tools",
    pills: [
      "Altium Designer",
      "KiCad",
      "AutoCAD",
      "SolidWorks",
      "Fusion 360",
      "LTspice",
      "Git",
      "Node.js",
      "Unity",
    ],
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
    () => [
      "PCB Design",
      "ASIC Design",
      "Embedded Systems",
      "Programming",
      "3D Modelling",
      "Chess",
      "Skiing",
      "Soccer",
    ],
    []
  );

  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");
  const [text, setText] = useState("");

  useEffect(() => {
    const full = interests[idx % interests.length];
    const typingMs = 70;
    const deletingMs = 45;
    const holdMs = 1100;

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
    }, phase === "typing" ? typingMs : phase === "deleting" ? deletingMs : holdMs);

    return () => window.clearTimeout(timer);
  }, [idx, phase, text, interests]);

  return (
    <div className="relative min-h-screen bg-black text-zinc-100 overflow-hidden">
      <Nav />

      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0">
        <CleanDiagonalBackground className="absolute inset-0" />
        <SpotlightMask strength={0.9} radius={100} />
        <div className="absolute -top-52 -left-52 h-[680px] w-[680px] rounded-full bg-indigo-500/14 blur-[150px]" />
        <div className="absolute top-1/3 -right-52 h-[620px] w-[620px] rounded-full bg-cyan-500/12 blur-[150px]" />
      </div>

      <main className="relative mx-auto max-w-7xl px-8 pt-32 pb-24 scroll-smooth" id="top">
        {/* HERO */}
        <header className="space-y-10">
          <div>
            <h1 className="text-6xl font-bold tracking-tight sm:text-7xl">
              Arnav Gupta
            </h1>

            <p className="mt-5 text-2xl text-zinc-400">
              Second-Year Mechatronics & Robotics Engineering Co-op Student — University of Alberta
            </p>

            <p className="mt-6 max-w-4xl text-2xl leading-9 text-zinc-200">
              Interests:{" "}
              <span className="font-bold text-white">
                {text}
                <span className="ml-1 inline-block h-6 w-[2px] translate-y-[4px] bg-zinc-200/70 animate-pulse" />
              </span>
            </p>
          </div>

          {/* Contact buttons */}
          <div className="flex flex-wrap gap-4 text-base" id="contact">
            <a
              href="mailto:arnav11@ualberta.ca"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-zinc-200 hover:bg-white/10 hover:text-white transition"
            >
              <IconMail className="h-5 w-5" />
              arnav11@ualberta.ca
            </a>

            <a
              href="https://www.linkedin.com/in/arnav-gupta121/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-zinc-200 hover:bg-white/10 hover:text-white transition"
            >
              <IconLinkedIn className="h-5 w-5" />
              LinkedIn
            </a>

            <a
              href="/Portfolio___Arnav_Gupta__Updated_March_17st_ (3).pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-zinc-200 hover:bg-white/10 hover:text-white transition"
            >
              <IconDocument className="h-5 w-5" />
              Full Portfolio PDF
            </a>

            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-zinc-300">
              <IconPin className="h-5 w-5" />
              Edmonton, AB
            </span>
          </div>
        </header>

        {/* SKILLS */}
        <section className="mt-28 scroll-mt-20" id="skills">
          <h2 className="text-4xl font-semibold tracking-tight">Skills</h2>
          <p className="mt-4 text-xl text-zinc-400">
            Hardware-first, but comfortable all the way up the stack.
          </p>

          <div className="mt-8 space-y-3">
            {skillCategories.map((cat) => (
              <div
                key={cat.label}
                className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm px-6 py-5"
              >
                <p className="mb-3.5 text-xs font-semibold uppercase tracking-widest text-zinc-500">
                  {cat.label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {cat.pills.map((pill) => (
                    <span
                      key={pill}
                      className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-sm text-zinc-200"
                    >
                      {pill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section className="mt-32 scroll-mt-20" id="projects">
          <h2 className="text-4xl font-semibold tracking-tight">Projects</h2>
          <p className="mt-4 text-xl text-zinc-400 max-w-4xl">
            Selected hardware designs — schematic capture, PCB layout, and system-level integration.
          </p>

          <div className="mt-10 space-y-10">
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </section>

        <footer className="mt-32 border-t border-white/10 pt-10 text-base text-zinc-500">
          © 2026 Arnav Gupta — built with Next.js + TypeScript
        </footer>
      </main>
    </div>
  );
}
