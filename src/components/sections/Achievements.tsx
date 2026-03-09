import FadeIn from "@/components/ui/FadeIn";

type DBAchievement = { id: number; type: string; label: string; title: string; subtitle: string; description: string; stat: string; stat_label: string; bg_text: string };

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Achievements({ achievements: _db }: { achievements?: DBAchievement[] }) {
  // DB data shapes the bento — static layout kept for now, content from DB when available
  return (
    <section id="achievements" className="border-t border-white/[.07] px-6 py-24 md:py-32">
      <div className="mx-auto max-w-[1200px]">

        <FadeIn>
          <p className="mb-6 font-mono text-[10px] uppercase tracking-[.22em] text-white/25">
            03 — Achievements
          </p>
          <h2 className="mb-12 text-[clamp(2rem,5vw,3.5rem)] font-black leading-[0.9] tracking-[-0.03em] text-white">
            What we&apos;ve built &amp; won.
          </h2>
        </FadeIn>

        {/* Bento grid */}
        <FadeIn delay={0.08}>
          <div className="grid auto-rows-[160px] grid-cols-2 gap-3 lg:grid-cols-4">

            {/* ① Featured — 2×2 */}
            <div className="relative col-span-2 row-span-2 flex flex-col justify-between overflow-hidden border border-white/[.08] bg-white/[.015] p-7 transition-colors hover:border-white/[.15]">
              <span className="pointer-events-none absolute -right-4 -top-6 select-none font-black text-[160px] leading-none text-white/[.03]">
                01
              </span>
              <div>
                <span className="font-mono text-[9px] uppercase tracking-[.2em] text-blue-500/70">
                  Siddhartha Academy of Research Conclave Hackathon
                </span>
                <h3 className="mt-3 text-[28px] font-black leading-tight tracking-tight text-white">
                  1st Prize
                </h3>
              </div>
              <p className="max-w-[280px] text-[13px] leading-relaxed text-white/35">
                Secured the top rank by showcasing innovation and building a scalable technical solution.
              </p>
            </div>

            {/* ② 2nd Prize */}
            <div className="flex flex-col justify-between border border-white/[.08] p-6 transition-colors hover:border-white/[.15]">
              <span className="font-mono text-[9px] uppercase tracking-[.2em] text-white/25">V R Siddhartha Webathon</span>
              <div>
                <p className="text-[18px] font-bold text-white">2nd Prize</p>
              </div>
            </div>

            {/* ③ Domain Winners */}
            <div className="flex flex-col justify-between border border-white/[.08] p-6 transition-colors hover:border-white/[.15]">
              <span className="font-mono text-[9px] uppercase tracking-[.2em] text-white/25">SRM NXTGEN Hackathon</span>
              <div>
                <p className="text-[18px] font-bold text-white">Domain Winners</p>
              </div>
            </div>

            {/* ④ Finalist */}
            <div className="flex flex-col justify-between border border-white/[.08] p-6 transition-colors hover:border-white/[.15]">
              <span className="font-mono text-[9px] uppercase tracking-[.2em] text-white/25">Bits techaccelerate hackathon</span>
              <div>
                <p className="text-[18px] font-bold text-white">Finalist</p>
              </div>
            </div>

            {/* ⑤ Preplaced */}
            <div className="relative flex flex-col justify-between overflow-hidden border border-white/[.08] p-6 transition-colors hover:border-white/[.15]">
              <span className="font-mono text-[9px] uppercase tracking-[.2em] text-emerald-500/70">Career Milestone</span>
              <div>
                <p className="text-[20px] font-black leading-none tracking-tight text-white mb-2">Preplaced at Calibo</p>
                <p className="font-mono text-[11px] text-white/50">SDE Intern</p>
              </div>
            </div>

          </div>
        </FadeIn>

      </div>
    </section>
  );
}
