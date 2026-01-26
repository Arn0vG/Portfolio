"use client";

import Image from "next/image";
import { useState } from "react";
import type { Project } from "../content/project";
import { ImageLightbox } from "./ImageLightbox";

type Props = {
  project: Project;
};

export function ProjectCard({ project }: Props) {
  const [lightbox, setLightbox] = useState<{
    open: boolean;
    title: string;
    src: string;
    alt: string;
    bg: "dark" | "light";
  }>({
    open: false,
    title: "",
    src: "",
    alt: "",
    bg: "dark",
  });

  const openImage = (opts: {
    title: string;
    src: string;
    alt: string;
    bg: "dark" | "light";
  }) => setLightbox({ open: true, ...opts });

  const closeImage = () => setLightbox((s) => ({ ...s, open: false }));

  return (
    <>
      <article className="signal-packet group relative overflow-hidden rounded-3xl border border-white/10 bg-black/40 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-white/25 hover:bg-black/50">
        {/* Hover glow */}
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="absolute -top-28 -left-28 h-80 w-80 rounded-full bg-indigo-500/12 blur-[90px]" />
          <div className="absolute -bottom-28 -right-28 h-80 w-80 rounded-full bg-cyan-500/12 blur-[90px]" />
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-[1.5fr_1fr]">
          {/* IMAGES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-6 border-b border-white/10 lg:border-b-0 lg:border-r">
            {/* Schematic */}
            <button
              type="button"
              onClick={() =>
                openImage({
                  title: `${project.title} — Schematic`,
                  src: project.images.schematic.src,
                  alt: project.images.schematic.alt,
                  bg: "light",
                })
              }
              className="group/img relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-left"
            >
              <Image
                src={project.images.schematic.src}
                alt={project.images.schematic.alt}
                fill
                className="object-contain bg-white transition-transform duration-300 group-hover/img:scale-[1.03]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <span className="absolute left-4 top-4 rounded-full bg-black/70 px-4 py-1.5 text-sm text-zinc-200">
                Schematic
              </span>
              <span className="absolute bottom-4 left-4 rounded-full border border-white/10 bg-black/60 px-3 py-1.5 text-xs text-zinc-200 opacity-0 transition-opacity group-hover/img:opacity-100">
                Click to expand
              </span>
            </button>

            {/* PCB Layout */}
            <button
              type="button"
              onClick={() =>
                openImage({
                  title: `${project.title} — PCB Layout`,
                  src: project.images.layout.src,
                  alt: project.images.layout.alt,
                  bg: "dark",
                })
              }
              className="group/img relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-black/60 text-left"
            >
              <Image
                src={project.images.layout.src}
                alt={project.images.layout.alt}
                fill
                className="object-contain bg-black transition-transform duration-300 group-hover/img:scale-[1.03]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <span className="absolute left-4 top-4 rounded-full bg-black/70 px-4 py-1.5 text-sm text-zinc-200">
                PCB Layout
              </span>
              <span className="absolute bottom-4 left-4 rounded-full border border-white/10 bg-black/60 px-3 py-1.5 text-xs text-zinc-200 opacity-0 transition-opacity group-hover/img:opacity-100">
                Click to expand
              </span>
            </button>
          </div>

          {/* CONTENT */}
          <div className="relative p-8">
            <h3 className="text-2xl font-semibold tracking-tight">{project.title}</h3>
            <p className="mt-3 text-base text-zinc-400">{project.subtitle}</p>

            <div className="mt-5 flex flex-wrap gap-2.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-zinc-200"
                >
                  {tag}
                </span>
              ))}
            </div>

            <ul className="mt-6 space-y-3 text-base text-zinc-200">
              {project.highlights.map((point) => (
                <li key={point}>• {point}</li>
              ))}
            </ul>
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
