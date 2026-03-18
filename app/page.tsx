"use client";

import { useEffect, useMemo, useState } from "react";
import { ProjectCard } from "../components/ProjectCard";
import { projects } from "../content/project";
import { CleanDiagonalBackground } from "../components/CleanDiagonalBackground";
import { SpotlightMask } from "../components/SpotlightMask";






type Phase = "typing" | "holding" | "deleting";

function TypeOnceLine({
  text,
  startDelayMs = 0,
  speedMs = 14,
}: {
  text: string;
  startDelayMs?: number;
  speedMs?: number;
}) {
  const [out, setOut] = useState("");

  useEffect(() => {
    let cancelled = false;
    let i = 0;

    const startTimer = window.setTimeout(() => {
      const tick = () => {
        if (cancelled) return;
        i += 1;
        setOut(text.slice(0, i));
        if (i < text.length) window.setTimeout(tick, speedMs);
      };
      tick();
    }, startDelayMs);

    return () => {
      cancelled = true;
      window.clearTimeout(startTimer);
    };
  }, [text, startDelayMs, speedMs]);

  return (
    <p className="text-base sm:text-lg text-zinc-200 leading-8">
      {out}
      {out.length < text.length ? (
        <span className="ml-1 inline-block h-5 w-[2px] translate-y-[3px] bg-zinc-200/60 animate-pulse" />
      ) : null}
    </p>
  );
}

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

function IconLink(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={props.className} fill="none" aria-hidden="true">
      <path
        d="M10 13a5 5 0 0 1 0-7l.5-.5a5 5 0 0 1 7 7l-.5.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M14 11a5 5 0 0 1 0 7l-.5.5a5 5 0 0 1-7-7l.5-.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Home() {
  const interests = useMemo(
    () => [
      "PCB Design",
      "ASIC Design",
      "Embedded Systems",
      "Programming",
      "3d Modelling",
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

  const skillLines = useMemo(
    () => [
      "Skills: PCB Design, ASIC Design, Embedded Hardware Design, RF Control, PWM, Motor Control, PCB Simulation, High-Speed Signal Routing, Soldering, 3D Modelling",
      "Developer Tools: Altium Designer, KiCad, AutoCAD, SolidWorks, Fusion 360, LTspice, Git, Node.js, Unity",
      "Lanuages: C/C++, Python, Java, TypeScript, Matlab  ",
      "HDLs: Verilog, SystemVerilog, VHDL",
    ],
    []
  );



  return (
    <div className="relative min-h-screen bg-black text-zinc-100 overflow-hidden">
      {/* BACKGROUND STUFF */}
      <div className="pointer-events-none absolute inset-0">
          <CleanDiagonalBackground className="absolute inset-0" />
          <SpotlightMask strength={0.9} radius={100} />
        {/* Keep your soft aura glows */}
        <div className="absolute -top-52 -left-52 h-[680px] w-[680px] rounded-full bg-indigo-500/14 blur-[150px]" />
        <div className="absolute top-1/3 -right-52 h-[620px] w-[620px] rounded-full bg-cyan-500/12 blur-[150px]" />
      </div>



      <main className="relative mx-auto max-w-7xl px-8 py-24 scroll-smooth" id="top">
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

          {/* Contact buttons (bigger) */}
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
              <IconLink className="h-5 w-5" />
              LinkedIn
            </a>

            <a
              href="/Portfolio___Arnav_Gupta__Updated_March_17st_ (3).pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-zinc-200 hover:bg-white/10 hover:text-white transition"
            >
              <IconLink className="h-5 w-5" />
              Full Portfolio PDF
            </a>

            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-5 py-3 text-zinc-300">
              Edmonton, AB
            </span>
          </div>
        </header>

        {/* SKILLS */}
        <section className="mt-28 scroll-mt-28" id="skills">
          <h2 className="text-4xl font-semibold tracking-tight">Skills</h2>

          <div className="mt-8 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-sm p-10 space-y-3">
            <TypeOnceLine text={skillLines[0]} startDelayMs={200} speedMs={12} />
            <TypeOnceLine text={skillLines[1]} startDelayMs={650} speedMs={10} />
            <TypeOnceLine text={skillLines[2]} startDelayMs={1150} speedMs={12} />
          </div>
        </section>

        {/* PROJECTS */}
        <section className="mt-32 scroll-mt-28" id="projects">
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
