"use client";

import { useEffect, useMemo, useState } from "react";

type HeroProps = {
  name: string;
  subtitle: string;
  location: string;
  email: string;
  linkedinUrl: string;
};

function RotatingType({
  items,
  typingMs = 55,
  deletingMs = 35,
  holdMs = 1100,
}: {
  items: string[];
  typingMs?: number;
  deletingMs?: number;
  holdMs?: number;
}) {
  const list = useMemo(() => items.filter(Boolean), [items]);

  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [mode, setMode] = useState<"typing" | "holding" | "deleting">("typing");

  useEffect(() => {
    if (list.length === 0) return;

    const full = list[i % list.length];

    const t =
      mode === "typing"
        ? setTimeout(() => {
            const next = full.slice(0, text.length + 1);
            setText(next);
            if (next === full) setMode("holding");
          }, typingMs)
        : mode === "holding"
        ? setTimeout(() => setMode("deleting"), holdMs)
        : setTimeout(() => {
            const next = full.slice(0, Math.max(0, text.length - 1));
            setText(next);
            if (next.length === 0) {
              setI((prev) => (prev + 1) % list.length);
              setMode("typing");
            }
          }, deletingMs);

    return () => clearTimeout(t);
  }, [list, i, text, mode, typingMs, deletingMs, holdMs]);

  return (
    <span className="inline-flex items-center">
      <span className="text-zinc-300">Interested in </span>
      <span className="ml-2 font-medium text-zinc-50">
        {text}
        <span className="ml-0.5 inline-block h-5 w-[2px] translate-y-[2px] bg-zinc-400/70 animate-pulse" />
      </span>
    </span>
  );
}

export function Hero({
  name,
  subtitle,
  location,
  email,
  linkedinUrl,
}: HeroProps) {
  return (
    <header className="mb-16">
      {/* Name card */}
      <div className="rounded-2xl border border-white/10 bg-black/40 p-8 backdrop-blur-sm">
        <p className="text-xs uppercase tracking-[0.25em] text-zinc-400">
          Portfolio
        </p>

        <h1 className="mt-4 text-5xl font-semibold tracking-tight sm:text-6xl">
          {name}
        </h1>

        <p className="mt-3 text-base text-zinc-400">{subtitle}</p>

        {/* Rotating interests */}
        <div className="mt-6 text-base leading-7">
          <RotatingType
            items={[
              "power electronics",
              "PCB layout + clean schematics",
              "motor control systems",
              "high-speed interfaces",
              "RF + wireless hardware",
              "hardware bring-up + debugging",
            ]}
          />
        </div>

        {/* Contact row */}
        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-zinc-400">
          <a
            href={`mailto:${email}`}
            className="hover:text-white underline underline-offset-4"
          >
            {email}
          </a>
          <span>•</span>
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="hover:text-white underline underline-offset-4"
          >
            LinkedIn
          </a>
          <span>•</span>
          <span>{location}</span>
        </div>
      </div>
    </header>
  );
}
