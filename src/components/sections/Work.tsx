"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeIn from "@/components/ui/FadeIn";
import Link from "next/link";

const FILTERS = ["All", "Portals", "Activities", "Programs", "Events"] as const;
type F = typeof FILTERS[number];

const projects: {
  id: string; cat: F; title: string; tags: string[];
  body: string; color: string; lines: string;
}[] = [
    {
      id: "01", cat: "Portals",
      title: "SAC Website",
      tags: ["Web", "Portal"],
      body: "sac.kluniversity.in",
      color: "rgba(59,130,246,0.55)",
      lines: "rgba(59,130,246,0.35)",
    },
    {
      id: "02", cat: "Portals",
      title: "SVR Website",
      tags: ["Web", "Virtual Reality"],
      body: "svr.kluniversity.in",
      color: "rgba(249,115,22,0.55)",
      lines: "rgba(249,115,22,0.35)",
    },
    {
      id: "03", cat: "Activities",
      title: "SAC Activities",
      tags: ["Web", "Engagement"],
      body: "sacactivites.kluniversity.in",
      color: "rgba(139,92,246,0.55)",
      lines: "rgba(139,92,246,0.35)",
    },
    {
      id: "04", cat: "Programs",
      title: "Social Internship",
      tags: ["Web", "Internship"],
      body: "socialinternship.kluniversity.in",
      color: "rgba(34,197,94,0.55)",
      lines: "rgba(34,197,94,0.35)",
    },
    {
      id: "05", cat: "Events",
      title: "KLU Surabhi",
      tags: ["Web", "Fest"],
      body: "klusurabhi.in",
      color: "rgba(6,182,212,0.55)",
      lines: "rgba(6,182,212,0.35)",
    },
  ];

function ProjectCard({ p }: { p: typeof projects[0] & { dbId?: string | number } }) {
  return (
    <Link href={`/projects/${p.dbId || p.id}`} className="group flex flex-col border border-white/[.08] bg-[#0e0e0e] transition-colors hover:border-white/[.15]">
      {/* Visual area */}
      <div className="relative aspect-[3/2] overflow-hidden">
        {/* Line pattern background */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: "#0e0e0e",
            backgroundImage: `
              repeating-linear-gradient(
                90deg,
                ${p.lines} 0px,
                ${p.lines} 1px,
                transparent 1px,
                transparent 10px
              ),
              repeating-linear-gradient(
                0deg,
                ${p.lines} 0px,
                ${p.lines} 1px,
                transparent 1px,
                transparent 28px
              )
            `,
          }}
        />
        {/* Colour wash */}
        <div
          className="absolute inset-0 opacity-20 transition-opacity duration-500 group-hover:opacity-30"
          style={{
            background: `radial-gradient(ellipse at 40% 60%, ${p.color} 0%, transparent 70%)`,
          }}
        />
        {/* Title bar at bottom */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/70 px-4 py-3 backdrop-blur-sm">
          <h3 className="font-mono text-[13px] font-bold leading-snug text-white">
            {p.title}
          </h3>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 p-4">
        {p.tags.map((t: string) => (
          <span
            key={t}
            className="border border-white/[.12] px-3 py-1 font-mono text-[10px] tracking-widest text-white/45"
          >
            {t}
          </span>
        ))}
      </div>
    </Link>
  );
}

type DBProject = { id: number; cat: string; title: string; tag: string; body: string; tags: string[] | string; color: string; lines: string };

export default function Work({ projects: dbProjects }: { projects?: DBProject[] }) {
  const [active, setActive] = useState<F>("All");

  const data = dbProjects && dbProjects.length > 0
    ? dbProjects.map((p, i) => ({
      id: String(i + 1).padStart(2, "0"),
      dbId: p.id,
      cat: p.cat as F,
      title: p.title,
      tag: p.tag,
      tags: Array.isArray(p.tags) ? p.tags : (typeof p.tags === "string" ? JSON.parse(p.tags || "[]") : []),
      body: p.body,
      color: p.color,
      lines: p.lines,
    }))
    : projects;

  const shown = active === "All" ? data : data.filter(p => p.cat === active);

  return (
    <section id="work" className="border-t border-white/[.07] px-6 py-24 md:py-32">
      <div className="mx-auto max-w-[1200px]">

        {/* Header */}
        <FadeIn>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-6 font-mono text-[10px] uppercase tracking-[.22em] text-white/25">
                02 — Work
              </p>
              <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black leading-[0.9] tracking-[-0.03em] text-white">
                What we build.
              </h2>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-1 pb-1">
              {FILTERS.map(f => (
                <button
                  key={f}
                  onClick={() => setActive(f)}
                  className={`px-3 py-1.5 font-mono text-[10px] tracking-widest transition ${active === f
                    ? "bg-white/[.07] text-white/80"
                    : "text-white/25 hover:text-white/55"
                    }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Card grid */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {shown.map(p => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.2 }}
              >
                <ProjectCard p={p} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
