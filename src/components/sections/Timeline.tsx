import FadeIn from "@/components/ui/FadeIn";

const events = [
  { period: "AUG 2025", title: "ZeroOne Open Day",          body: "Demo day + 2025 cohort recruitment. Open to all students.",            tag: "Upcoming"  },
  { period: "MAR 2024", title: "National Hackathon — 1st",  body: "1st place of 500+ teams. AI-driven logistics challenge, Bengaluru.",   tag: "Hackathon" },
  { period: "OCT 2023", title: "Tech Excellence Award",      body: "State Innovation Board recognition for distributed computing research.", tag: "Award"     },
  { period: "JUN 2023", title: "Global Innovation Summit",   body: "Keynote on decentralised network futures — GIS, Singapore.",            tag: "Summit"    },
  { period: "JAN 2023", title: "First Cohort Launched",      body: "40 founding members across engineering, design, and research.",          tag: "Milestone" },
];

export default function Timeline() {
  return (
    <section className="border-t border-white/[.07] px-6 py-24 md:py-32">
      <div className="mx-auto max-w-[1200px]">

        <FadeIn>
          <p className="mb-6 font-mono text-[10px] uppercase tracking-[.22em] text-white/25">
            03 — Milestones
          </p>
          <h2 className="mb-14 text-[clamp(2rem,5vw,3.5rem)] font-black leading-[0.9] tracking-[-0.03em] text-white">
            Our journey.
          </h2>
        </FadeIn>

        <FadeIn delay={0.06}>
          <div className="border-t border-white/[.07]">
            {events.map(e => (
              <div
                key={e.title}
                className="grid grid-cols-[88px_1fr] gap-8 border-b border-white/[.06] py-7 transition-colors hover:bg-white/[.015]"
              >
                <span className="pt-px font-mono text-[10px] text-white/25">{e.period}</span>
                <div>
                  <p className="mb-2 font-mono text-[9px] uppercase tracking-[.18em] text-white/20">
                    {e.tag}
                  </p>
                  <h3 className="text-[15px] font-semibold text-white/80">{e.title}</h3>
                  <p className="mt-1.5 text-[14px] leading-[1.7] text-white/35">{e.body}</p>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
