"use client";
import { useState, useEffect } from "react";

const FULL = "ZeroOne";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#work",  label: "Work"  },
  { href: "#team",  label: "Team"  },
  { href: "#apply", label: "Apply" },
];

const SECTION_IDS = LINKS.map(l => l.href.slice(1));

export default function Navbar() {
  const [typed, setTyped]   = useState("");
  const [active, setActive] = useState("");

  useEffect(() => {
    // Typing animation
    let i = 0;
    const tid = setInterval(() => {
      i++;
      setTyped(FULL.slice(0, i));
      if (i >= FULL.length) clearInterval(tid);
    }, 110);

    // Active section tracking via IntersectionObserver
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActive(visible[0].target.id);
      },
      { threshold: 0.25, rootMargin: "0px 0px -40% 0px" },
    );

    SECTION_IDS.forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });

    return () => {
      clearInterval(tid);
      obs.disconnect();
    };
  }, []);

  const done = typed.length === FULL.length;

  return (
    <div className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2">
      <nav className="flex items-center gap-0.5 rounded-full border border-white/[.1] bg-[#111]/80 px-2 py-2 shadow-[0_8px_32px_rgba(0,0,0,.6)] backdrop-blur-xl">

        {/* Logo with typewriter */}
        <a
          href="/"
          className="flex items-center rounded-full px-4 py-1.5 font-semibold tracking-tight text-white/70 transition-colors hover:text-white"
          style={{ fontSize: "14px" }}
        >
          <span>{typed.slice(0, 4)}</span>
          <span className="text-blue-500">{typed.slice(4, 7)}</span>
          {done
            ? <span className="text-white/30">.</span>
            : <span className="ml-px text-blue-400 opacity-80">|</span>
          }
        </a>

        <span className="mx-1 h-3.5 w-px shrink-0 bg-white/[.1]" />

        {LINKS.map(l => {
          const isActive = active === l.href.slice(1);
          return (
            <a
              key={l.href}
              href={l.href}
              className={`rounded-full px-4 py-1.5 text-[13px] transition-colors ${
                isActive
                  ? "bg-white/[.08] text-white/90"
                  : "text-white/35 hover:bg-white/[.07] hover:text-white/80"
              }`}
            >
              {l.label}
            </a>
          );
        })}
      </nav>
    </div>
  );
}
