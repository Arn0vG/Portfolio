"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import Link from "next/link";
import { projects } from "../../../content/project";
import { ImageLightbox } from "../../../components/ImageLightbox";
import { CleanDiagonalBackground } from "../../../components/CleanDiagonalBackground";
import { SpotlightMask } from "../../../components/SpotlightMask";
import { Nav } from "../../../components/Nav";

type LightboxState = {
  open: boolean;
  title: string;
  src: string;
  alt: string;
  bg: "dark" | "light";
};

function ImageTile({
  label,
  src,
  alt,
  bg,
  onClick,
}: {
  label: string;
  src: string;
  alt: string;
  bg: "dark" | "light";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-3 text-left hover:border-white/20 transition"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl">
        <Image
          src={src}
          alt={alt}
          fill
          className={`object-contain ${bg === "light" ? "bg-white" : "bg-black"}`}
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      <div className="mt-2 flex items-center justify-between gap-3 px-1">
        <span className="text-sm text-zinc-200">{label}</span>
        <span className="text-xs text-zinc-400 opacity-0 transition-opacity group-hover:opacity-100">
          Click to expand ↗
        </span>
      </div>
    </button>
  );
}

export default function ProjectSlugPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const project = useMemo(() => projects.find((p) => p.slug === slug), [slug]);

  const [lightbox, setLightbox] = useState<LightboxState>({
    open: false,
    title: "",
    src: "",
    alt: "",
    bg: "dark",
  });

  const openImage = (opts: Omit<LightboxState, "open">) =>
    setLightbox({ open: true, ...opts });
  const closeImage = () => setLightbox((s) => ({ ...s, open: false }));

  if (!project) {
    return (
      <div className="relative min-h-screen bg-black text-zinc-100 overflow-hidden">
        <Nav />
        <main className="mx-auto max-w-4xl px-8 py-32">
          <p className="text-zinc-400">Project not found.</p>
          <Link
            href="/#projects"
            className="mt-6 inline-block text-sm text-zinc-400 hover:text-zinc-200 transition"
          >
            ← Back to Projects
          </Link>
        </main>
      </div>
    );
  }

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

      <main className="relative mx-auto max-w-7xl px-8 pt-28 pb-24">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-200 transition"
        >
          ← Back to Projects
        </Link>

        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">{project.title}</h1>
        <p className="mt-4 max-w-4xl text-lg text-zinc-300 leading-relaxed">{project.subtitle}</p>

        <div className="mt-6 flex flex-wrap gap-2.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-sm text-zinc-200"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Write-up */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight">Overview</h2>
          <div className="mt-5 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm px-7 py-6 space-y-3">
            {project.highlights.map((point, i) => (
              <p key={i} className="flex gap-3 text-base text-zinc-200 leading-relaxed">
                <span className="mt-1 shrink-0 text-indigo-400">▸</span>
                {point}
              </p>
            ))}
          </div>
        </section>

        {/* Image pairs */}
        <section className="mt-14 space-y-12">
          {project.pairs.map((pair, i) => (
            <div key={i}>
              {pair.label && (
                <h2 className="text-2xl font-semibold tracking-tight mb-5">{pair.label}</h2>
              )}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <ImageTile
                  label="Schematic"
                  src={pair.left.src}
                  alt={pair.left.alt}
                  bg={pair.left.bg ?? "light"}
                  onClick={() =>
                    openImage({
                      title: `${project.title}${pair.label ? ` — ${pair.label}` : ""} (Schematic)`,
                      src: pair.left.src,
                      alt: pair.left.alt,
                      bg: pair.left.bg ?? "light",
                    })
                  }
                />

                <ImageTile
                  label="Top View"
                  src={pair.right.src}
                  alt={pair.right.alt}
                  bg={pair.right.bg ?? "dark"}
                  onClick={() =>
                    openImage({
                      title: `${project.title}${pair.label ? ` — ${pair.label}` : ""} (Top)`,
                      src: pair.right.src,
                      alt: pair.right.alt,
                      bg: pair.right.bg ?? "dark",
                    })
                  }
                />
              </div>
            </div>
          ))}
        </section>

        <footer className="mt-24 border-t border-white/10 pt-8 text-sm text-zinc-500">
          © 2026 Arnav Gupta — built with Next.js + TypeScript
        </footer>
      </main>

      <ImageLightbox
        open={lightbox.open}
        title={lightbox.title}
        src={lightbox.src}
        alt={lightbox.alt}
        bg={lightbox.bg}
        onClose={closeImage}
      />
    </div>
  );
}
