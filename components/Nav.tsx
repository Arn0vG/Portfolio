"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const items = [
  { label: "Experience", href: "/#experience", id: "experience" },
  { label: "Skills",     href: "/#skills",     id: "skills"     },
  { label: "Projects",   href: "/#projects",   id: "projects"   },
];

export function Nav() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "-30% 0px -60% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav className="fixed top-0 inset-x-0 z-50 border-b border-white/[0.06] bg-[#05050f]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-8 h-14">
        <Link
          href="/"
          className="text-sm font-semibold text-zinc-200 hover:text-white transition-colors tracking-wide"
        >
          Arnav Gupta
        </Link>

        <div className="flex items-center gap-8 text-sm">
          {items.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`transition-colors ${
                active === item.id
                  ? "text-white"
                  : "text-zinc-500 hover:text-zinc-200"
              }`}
            >
              {item.label}
              {active === item.id && (
                <span className="block h-px w-full bg-emerald-500 mt-0.5 rounded-full" />
              )}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
