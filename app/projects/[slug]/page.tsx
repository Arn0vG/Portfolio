"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import Link from "next/link";
import { projects } from "../../../content/project";
import { ImageLightbox } from "../../../components/ImageLightbox";
import { CleanDiagonalBackground } from "../../../components/CleanDiagonalBackground";
import { Nav } from "../../../components/Nav";
import { RevealSection } from "../../../components/RevealSection";

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
      className="group relative overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.02] text-left hover:border-white/[0.15] transition"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-xl">
        <Image
          src={src}
          alt={alt}
          fill
          className={`object-contain ${bg === "light" ? "bg-white" : "bg-black"} transition-transform duration-300 group-hover:scale-[1.03]`}
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <span className="text-sm text-zinc-300">{label}</span>
        <span className="text-xs text-zinc-500 opacity-0 transition-opacity group-hover:opacity-100">
          expand ↗
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
    open: false, title: "", src: "", alt: "", bg: "dark",
  });

  const openImage = (opts: Omit<LightboxState, "open">) =>
    setLightbox({ open: true, ...opts });
  const closeImage = () => setLightbox((s) => ({ ...s, open: false }));

  if (!project) {
    return (
      <div className="relative min-h-screen bg-[#05050f] text-zinc-100 overflow-hidden">
        <Nav />
        <main className="mx-auto max-w-4xl px-8 py-32">
          <p className="text-zinc-500">Project not found.</p>
          <Link href="/#projects" className="mt-6 inline-block text-sm text-emerald-400 hover:text-emerald-300 transition">
            ← Back to Projects
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#05050f] text-zinc-100 overflow-hidden">
      <Nav />

      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0">
        <CleanDiagonalBackground className="absolute inset-0" />
      </div>

      <main className="relative mx-auto max-w-6xl px-8 pt-28 pb-24">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-200 transition-colors"
        >
          ← Back to Projects
        </Link>

        {/* Header */}
        <RevealSection className="mt-8" delay={60}>
          <div className="flex items-center gap-4 mb-3">
            <span className="font-mono text-xs text-emerald-400/70 tracking-widest">// project</span>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl leading-tight">
            {project.title}
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-zinc-400 leading-relaxed">
            {project.subtitle}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-white/[0.07] bg-white/[0.03] px-3 py-1.5 text-sm text-zinc-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </RevealSection>

        {/* Overview */}
        <RevealSection className="mt-14" delay={160}>
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-xs text-emerald-400/70 tracking-widest">// overview</span>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </div>

          <div className="relative overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.02] px-7 py-6 space-y-4">
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-emerald-500/70 via-emerald-500/30 to-transparent" />
            {project.highlights.map((point, i) => (
              <p key={i} className="flex gap-3 text-sm text-zinc-300 leading-relaxed">
                <span className="mt-0.5 shrink-0 text-emerald-500/70">▸</span>
                {point}
              </p>
            ))}
          </div>
        </RevealSection>

        {/* Image pairs */}
        <section className="mt-14 space-y-12">
          {project.pairs.map((pair, i) => (
            <RevealSection key={i} delay={i * 100}>
              {pair.label && (
                <div className="flex items-center gap-4 mb-5">
                  <h2 className="text-xl font-semibold text-zinc-100">{pair.label}</h2>
                  <div className="flex-1 h-px bg-white/[0.06]" />
                </div>
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
            </RevealSection>
          ))}
        </section>

        <footer className="mt-24 border-t border-white/[0.06] pt-8 flex items-center justify-between text-sm text-zinc-600">
          <Link href="/#projects" className="hover:text-zinc-400 transition-colors">
            ← Back to Projects
          </Link>
          <span className="font-mono text-xs">© 2026 Arnav Gupta</span>
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
