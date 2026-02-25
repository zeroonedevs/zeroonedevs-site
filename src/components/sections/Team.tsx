"use client";
import { useState } from "react";
import FadeIn from "@/components/ui/FadeIn";

const members = [
  {
    name: "Arjun Mehta",   role: "Systems Lead",
    stack: "Rust · C · RTOS",       bio: "Building infra that doesn't flinch under pressure.",
    bg: "#1a1a1a", skin: "#8a7260", hair: "#0e0e0e", hairType: "short"    as const, shoulderTone: "#222",
  },
  {
    name: "Priya Nair",    role: "Head of Product",
    stack: "Product · Research · Figma", bio: "Shipping zero-fluff products that users actually keep.",
    bg: "#d4d4d4", skin: "#c8a882", hair: "#1a100a", hairType: "long"     as const, shoulderTone: "#bbb",
  },
  {
    name: "Rohan Das",     role: "Design Principal",
    stack: "Figma · Motion · React",  bio: "Crafting interfaces that feel inevitable.",
    bg: "#202020", skin: "#b09070", hair: "#111",    hairType: "medium"   as const, shoulderTone: "#1a1a1a",
  },
  {
    name: "Sneha Iyer",    role: "Frontend Architect",
    stack: "TypeScript · Next.js · CSS", bio: "Making the web fast, accessible, and beautiful.",
    bg: "#e2e2e2", skin: "#d0a07a", hair: "#1e120a", hairType: "shoulder" as const, shoulderTone: "#ccc",
  },
  {
    name: "Dev Kapoor",    role: "AI Research Lead",
    stack: "PyTorch · CUDA · Python",  bio: "Pushing inference to the edge of what's possible.",
    bg: "#141414", skin: "#907860", hair: "#0a0a0a", hairType: "short"    as const, shoulderTone: "#1c1c1c",
  },
  {
    name: "Ananya Singh",  role: "Embedded Systems",
    stack: "Embedded C · FPGA · ARM", bio: "Writing firmware that ships to the physical world.",
    bg: "#2e2e2e", skin: "#c0906a", hair: "#0d0d0d", hairType: "long"     as const, shoulderTone: "#222",
  },
];

type HairType = "short" | "long" | "medium" | "shoulder";

function Portrait({ id, bg, skin, hair, hairType, shoulderTone }: {
  id: string; bg: string; skin: string; hair: string;
  hairType: HairType; shoulderTone: string;
}) {
  const fid = `g-${id}`;
  return (
    <svg
      viewBox="40 80 200 260"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <filter id={fid} x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" result="noise" />
          <feColorMatrix in="noise" type="saturate" values="0" result="gray" />
          <feBlend in="SourceGraphic" in2="gray" mode="multiply" result="blend" />
          <feComposite in="blend" in2="SourceGraphic" operator="in" />
        </filter>
      </defs>

      <rect x="0" y="0" width="280" height="380" fill={bg} />
      <ellipse cx="140" cy="430" rx="170" ry="110" fill={shoulderTone} />
      <ellipse cx="140" cy="415" rx="125" ry="90" fill={skin} opacity="0.35" />
      <rect x="124" y="295" width="32" height="72" rx="8" fill={skin} />
      <ellipse cx="140" cy="235" rx="68" ry="84" fill={skin} />

      {hairType === "short" && <ellipse cx="140" cy="160" rx="72" ry="58" fill={hair} />}
      {hairType === "long" && (<>
        <ellipse cx="140" cy="160" rx="72" ry="58" fill={hair} />
        <rect x="70" y="188" width="22" height="145" rx="11" fill={hair} />
        <rect x="188" y="188" width="22" height="145" rx="11" fill={hair} />
      </>)}
      {hairType === "medium" && (<>
        <ellipse cx="140" cy="160" rx="72" ry="58" fill={hair} />
        <rect x="70" y="188" width="20" height="80" rx="10" fill={hair} />
        <rect x="190" y="188" width="20" height="80" rx="10" fill={hair} />
      </>)}
      {hairType === "shoulder" && (<>
        <ellipse cx="140" cy="160" rx="72" ry="58" fill={hair} />
        <rect x="70" y="190" width="24" height="110" rx="12" fill={hair} />
        <rect x="186" y="190" width="24" height="110" rx="12" fill={hair} />
      </>)}

      <ellipse cx="118" cy="236" rx="10" ry="6" fill={hair} opacity="0.45" />
      <ellipse cx="162" cy="236" rx="10" ry="6" fill={hair} opacity="0.45" />
      <rect x="0" y="0" width="280" height="380" fill="white" filter={`url(#${fid})`} opacity="0.09" />
    </svg>
  );
}

function Card({ m }: { m: typeof members[0] }) {
  const id = m.name.replace(/\s/g, "-").toLowerCase();
  return (
    <div className="group relative w-[300px] shrink-0 overflow-hidden border border-white/[.08] transition-colors hover:border-white/[.2]">
      <div className="aspect-[4/5] w-full">
        <Portrait
          id={id} bg={m.bg} skin={m.skin} hair={m.hair}
          hairType={m.hairType} shoulderTone={m.shoulderTone}
        />
      </div>

      {/* Overlay: name + role always visible; bio + stack revealed on hover */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/65 to-transparent px-5 pb-5 pt-16">
        <p className="text-[16px] font-bold text-white">{m.name}</p>
        <p className="mt-1 font-mono text-[9px] uppercase tracking-[.15em] text-blue-400">{m.role}</p>

        {/* Bio — slides in on hover */}
        <p className="mt-2 max-h-0 overflow-hidden text-[12px] leading-relaxed text-white/45 transition-[max-height] duration-300 ease-out group-hover:max-h-16">
          {m.bio}
        </p>

        {/* Stack — slides in slightly after */}
        <p className="max-h-0 overflow-hidden font-mono text-[9px] text-white/20 transition-[max-height] duration-300 ease-out delay-75 group-hover:max-h-8 group-hover:mt-1.5">
          {m.stack}
        </p>
      </div>
    </div>
  );
}

type DBMember = {
  id: number; name: string; role: string;
  bg_color: string; skin_color: string; hair_color: string;
  hair_type: string; shoulder_tone: string;
  bio?: string; stack?: string;
};

export default function Team({ members: dbMembers }: { members?: DBMember[] }) {
  const [paused, setPaused] = useState(false);

  const data = dbMembers && dbMembers.length > 0
    ? dbMembers.map(m => ({
        name: m.name,  role: m.role,
        bio:  m.bio  ?? "",
        stack: m.stack ?? "",
        bg: m.bg_color, skin: m.skin_color, hair: m.hair_color,
        hairType: m.hair_type as HairType, shoulderTone: m.shoulder_tone,
      }))
    : members;

  const doubled = [...data, ...data];

  return (
    <section id="team" className="border-t border-white/[.07] py-24 md:py-32">
      {/* Header */}
      <div className="mx-auto mb-12 max-w-[1200px] px-6">
        <FadeIn>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-6 font-mono text-[10px] uppercase tracking-[.22em] text-white/25">04 — Team</p>
              <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black leading-[0.9] tracking-[-0.03em] text-white">
                The collective.
              </h2>
            </div>
            <p className="max-w-[280px] text-[14px] leading-relaxed text-white/30">
              A cross-functional group of engineers, designers, and researchers
              pushing the boundaries of what&apos;s possible.
            </p>
          </div>
        </FadeIn>
      </div>

      {/* Full-bleed scrolling row — hover to pause */}
      <div
        className="overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className="flex gap-4"
          style={{
            animation: "team-scroll 32s linear infinite",
            animationPlayState: paused ? "paused" : "running",
          }}
        >
          {doubled.map((m, i) => <Card key={i} m={m} />)}
        </div>
      </div>

      <style>{`
        @keyframes team-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
