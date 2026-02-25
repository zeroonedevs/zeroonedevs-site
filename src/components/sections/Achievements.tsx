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
              {/* Giant faded background number */}
              <span className="pointer-events-none absolute -right-4 -top-6 select-none font-black text-[160px] leading-none text-white/[.03]">
                01
              </span>
              <div>
                <span className="font-mono text-[9px] uppercase tracking-[.2em] text-blue-500/70">
                  National Hackathon · Bengaluru 2024
                </span>
                <h3 className="mt-3 text-[28px] font-black leading-tight tracking-tight text-white">
                  1st Place
                  <br />
                  <span className="text-white/40">of 500+ teams.</span>
                </h3>
              </div>
              <p className="max-w-[280px] text-[13px] leading-relaxed text-white/35">
                AI-driven logistics optimisation challenge. Outranked every team with
                a real-time inference pipeline built in 36 hours.
              </p>
            </div>

            {/* ② Grants stat */}
            <div className="relative flex flex-col justify-between overflow-hidden border border-white/[.08] p-6 transition-colors hover:border-white/[.15]">
              <span className="font-mono text-[9px] uppercase tracking-[.2em] text-white/25">Grants Won</span>
              <div>
                <p className="text-[42px] font-black leading-none tracking-tight text-white">₹20L+</p>
                <p className="mt-1 font-mono text-[10px] text-white/30">National competitions</p>
              </div>
            </div>

            {/* ③ Award */}
            <div className="flex flex-col justify-between border border-white/[.08] p-6 transition-colors hover:border-white/[.15]">
              <span className="font-mono text-[9px] uppercase tracking-[.2em] text-white/25">Award</span>
              <div>
                <p className="text-[15px] font-bold text-white">Tech Excellence</p>
                <p className="mt-1 font-mono text-[10px] text-white/30">State Innovation Board · 2023</p>
              </div>
            </div>

            {/* ④ Quote — 1×1 */}
            <div className="flex items-center border border-white/[.08] p-6 transition-colors hover:border-white/[.15]">
              <p className="text-[14px] font-semibold italic leading-snug text-white/50">
                &ldquo;Not a club.
                <br />A standard.&rdquo;
              </p>
            </div>

            {/* ⑤ Members stat */}
            <div className="relative flex flex-col justify-between overflow-hidden border border-white/[.08] p-6 transition-colors hover:border-white/[.15]">
              <span className="font-mono text-[9px] uppercase tracking-[.2em] text-white/25">Active Members</span>
              <div>
                <p className="text-[42px] font-black leading-none tracking-tight text-white">500+</p>
                <p className="mt-1 font-mono text-[10px] text-white/30">Across campuses</p>
              </div>
            </div>

            {/* ⑥ Summit — 2×1 */}
            <div className="relative col-span-2 flex flex-col justify-between overflow-hidden border border-white/[.08] p-6 transition-colors hover:border-white/[.15]">
              <span className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 select-none font-black text-[80px] leading-none text-white/[.03]">
                GIS
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[.2em] text-white/25">Global Innovation Summit</span>
              <div className="flex items-end justify-between">
                <h3 className="text-[18px] font-bold text-white">
                  Keynote Speaker
                  <br />
                  <span className="text-white/40">Singapore · 2023</span>
                </h3>
                <span className="font-mono text-[10px] text-white/20">SUMMIT</span>
              </div>
            </div>

          </div>
        </FadeIn>

      </div>
    </section>
  );
}
