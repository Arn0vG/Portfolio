"use client";

import { useEffect } from "react";
import Image from "next/image";

type Props = {
  open: boolean;
  title?: string;
  src: string;
  alt: string;
  onClose: () => void;
  bg?: "dark" | "light";
};

export function ImageLightbox({
  open,
  title,
  src,
  alt,
  onClose,
  bg = "dark",
}: Props) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    // prevent background scroll
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title ?? alt}
    >
      {/* Backdrop */}
      <button
        className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close image"
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-6xl overflow-hidden rounded-2xl border border-white/10 bg-black/80 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3">
          <div className="min-w-0">
            <p className="truncate text-sm text-zinc-200">{title ?? alt}</p>
            <p className="text-xs text-zinc-400">Click outside or press Esc to close</p>
          </div>

          <button
            onClick={onClose}
            className="rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-xs text-zinc-200 hover:bg-black/60 transition"
          >
            Close
          </button>
        </div>

        {/* Image */}
        <div
          className={`relative h-[70vh] w-full ${
            bg === "light" ? "bg-white" : "bg-black"
          }`}
        >
          <Image
            src={src}
            alt={alt}
            fill
            className="object-contain"
            sizes="100vw"
            priority
          />
        </div>
      </div>
    </div>
  );
}
