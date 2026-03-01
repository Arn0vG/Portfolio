"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import Link from "next/link";
import { projects } from "../../../content/project";
import { ImageLightbox } from "../../../components/ImageLightbox";

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

      <div className="mt-2 flex items-center justify-between gap-3">
        <span className="text-sm text-zinc-200">{label}</span>
        <span className="text-xs text-zinc-400 opacity-0 transition-opacity group-hover:opacity-100">
          Click to expand
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
      <div className="min-h-screen bg-black text-zinc-100">
        <main className="mx-auto max-w-4xl px-8 py-20">
          <p className="text-zinc-400">Project not found.</p>
          <Link
            href="/#projects"
            className="mt-6 inline-block text-sm text-zinc-400 hover:text-zinc-200"
          >
            ← Back to Projects
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-zinc-100">
      <main className="mx-auto max-w-7xl px-8 py-20">
        <Link href="/#projects" className="text-sm text-zinc-400 hover:text-zinc-200">
          ← Back to Projects
        </Link>

        <h1 className="mt-4 text-5xl font-semibold tracking-tight">{project.title}</h1>
        <p className="mt-4 max-w-4xl text-lg text-zinc-300">{project.subtitle}</p>

        <div className="mt-6 flex flex-wrap gap-2.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-zinc-200"
            >
              {tag}
            </span>
          ))}
        </div>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold">Quick Write-Up</h2>
          <ul className="mt-4 space-y-2 text-zinc-200">
            {project.highlights.map((p) => (
              <li key={p}>• {p}</li>
            ))}
          </ul>
        </section>

        {/* Pairs as sections */}
        <section className="mt-14 space-y-10">
          {project.pairs.map((pair) => (
            <div key={pair.label}>
              <h2 className="text-2xl font-semibold">{pair.label}</h2>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <ImageTile
                  label="Schematic"
                  src={pair.left.src}
                  alt={pair.left.alt}
                  bg={pair.left.bg ?? "light"}
                  onClick={() =>
                    openImage({
                      title: `${project.title} — ${pair.label} (Schematic)`,
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
                      title: `${project.title} — ${pair.label} (Top)`,
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

        <footer className="mt-20 border-t border-white/10 pt-8 text-sm text-zinc-500">
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