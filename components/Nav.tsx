"use client";

import Link from "next/link";

const items = [
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/#projects" },
  { label: "Contact", href: "/#contact" },
];

export function Nav() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 border-b border-white/[0.07] bg-black/75 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 h-14">
        <Link
          href="/"
          className="text-sm font-semibold text-zinc-100 hover:text-white transition-colors"
        >
          Arnav Gupta
        </Link>

        <div className="flex items-center gap-7 text-sm text-zinc-400">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-zinc-100 transition-colors"
            >
              {item.label}
            </Link>
          ))}

          <a
            href="/Portfolio___Arnav_Gupta__Updated_March_17st_ (3).pdf"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs text-zinc-200 hover:bg-white/10 hover:text-white transition"
          >
            Resume
          </a>
        </div>
      </div>
    </nav>
  );
}
