"use client";

import Link from "next/link";

const items = [
  { label: "Experience", href: "/#experience" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/#projects" },
];

export function Nav() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 border-b border-white/[0.06] bg-[#05050f]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-8 h-14">
        <Link
          href="/"
          className="text-sm font-semibold text-zinc-200 hover:text-white transition-colors tracking-wide"
        >
          Arnav Gupta
        </Link>

        <div className="flex items-center gap-8 text-sm text-zinc-500">
          {items.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="hover:text-zinc-200 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
