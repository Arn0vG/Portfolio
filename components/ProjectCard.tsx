"use client";

import Image from "next/image";
import { useState } from "react";
import type { Project } from "../content/project";
import { ImageLightbox } from "./ImageLightbox";
import Link from "next/link";

type Props = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: Props) {
  const [lightbox, setLightbox] = useState<{
    open: boolean;
    title: string;
    src: string;
    alt: string;
    bg: "dark" | "light";
  }>({ open: false, title: "", src: "", alt: "", bg: "dark" });

  const openImage = (opts: { title: string; src: string; alt: string; bg: "dark" | "light" }) =>
    setLightbox({ open: true, ...opts });
  const closeImage = () => setLightbox((s) => ({ ...s, open: false }));

  return (
    <>
      <article className="signal-packet group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] transition-all duration-300 hover:border-white/[0.13] hover:bg-white/[0.035]">
        {/* Subtle top border glow on hover */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Project number */}
        <span className="absolute top-5 right-6 font-mono text-xs text-zinc-700 select-none">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="relative grid grid-cols-1 lg:grid-cols-[1.6fr_1fr]">
          {/* ── IMAGES ── */}
          <div className="p-5 border-b border-white/[0.06] lg:border-b-0 lg:border-r lg:border-r-white/[0.06] space-y-5">
            {project.pairs.map((pair, i) => (
              <div key={i}>
                {pair.label && (
                  <p className="mb-2.5 font-mono text-[11px] uppercase tracking-widest text-zinc-600">
                    {pair.label}
                  </p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Schematic */}
                  <button
                    type="button"
                    onClick={() =>
                      openImage({
                        title: `${project.title}${pair.label ? ` — ${pair.label}` : ""} (Schematic)`,
                        src: pair.left.src,
                        alt: pair.left.alt,
                        bg: pair.left.bg ?? "light",
                      })
                    }
                    className="group/img relative aspect-[16/10] overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.03] text-left hover:border-white/[0.15] transition"
                  >
                    <Image
                      src={pair.left.src}
                      alt={pair.left.alt}
                      fill
                      className={`object-contain ${pair.left.bg === "dark" ? "bg-black" : "bg-white"} transition-transform duration-300 group-hover/img:scale-[1.04]`}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <span className="absolute left-3 top-3 rounded-md bg-black/70 px-2.5 py-1 text-xs text-zinc-300 backdrop-blur-sm">
                      Schematic
                    </span>
                    <span className="absolute bottom-3 right-3 rounded-md border border-white/10 bg-black/60 px-2.5 py-1 text-xs text-zinc-400 opacity-0 transition-opacity group-hover/img:opacity-100 backdrop-blur-sm">
                      expand ↗
                    </span>
                  </button>

                  {/* Top View */}
                  <button
                    type="button"
                    onClick={() =>
                      openImage({
                        title: `${project.title}${pair.label ? ` — ${pair.label}` : ""} (Top)`,
                        src: pair.right.src,
                        alt: pair.right.alt,
                        bg: pair.right.bg ?? "dark",
                      })
                    }
                    className="group/img relative aspect-[16/10] overflow-hidden rounded-xl border border-white/[0.07] bg-black/60 text-left hover:border-white/[0.15] transition"
                  >
                    <Image
                      src={pair.right.src}
                      alt={pair.right.alt}
                      fill
                      className={`object-contain ${pair.right.bg === "light" ? "bg-white" : "bg-black"} transition-transform duration-300 group-hover/img:scale-[1.04]`}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <span className="absolute left-3 top-3 rounded-md bg-black/70 px-2.5 py-1 text-xs text-zinc-300 backdrop-blur-sm">
                      Top View
                    </span>
                    <span className="absolute bottom-3 right-3 rounded-md border border-white/10 bg-black/60 px-2.5 py-1 text-xs text-zinc-400 opacity-0 transition-opacity group-hover/img:opacity-100 backdrop-blur-sm">
                      expand ↗
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ── CONTENT ── */}
          <div className="relative flex flex-col p-7">
            <div className="flex-1">
              <Link href={`/projects/${project.slug}`} className="group/title">
                <h3 className="text-xl font-semibold tracking-tight text-zinc-100 group-hover/title:text-white transition-colors leading-snug pr-8">
                  {project.title}
                </h3>
              </Link>

              <p className="mt-3 text-sm text-zinc-500 leading-relaxed">{project.subtitle}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-white/[0.07] bg-white/[0.03] px-2.5 py-1 text-xs text-zinc-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <ul className="mt-5 space-y-2.5">
                {project.highlights.map((point, i) => (
                  <li key={i} className="flex gap-2.5 text-sm text-zinc-400 leading-relaxed">
                    <span className="mt-1 shrink-0 text-indigo-500/70">▸</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href={`/projects/${project.slug}`}
              className="mt-7 self-start inline-flex items-center gap-1.5 text-sm text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
            >
              View full project
              <span className="text-base leading-none">→</span>
            </Link>
          </div>
        </div>
      </article>

      <ImageLightbox
        open={lightbox.open}
        title={lightbox.title}
        src={lightbox.src}
        alt={lightbox.alt}
        bg={lightbox.bg}
        onClose={closeImage}
      />
    </>
  );
}
