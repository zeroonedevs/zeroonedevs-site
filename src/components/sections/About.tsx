import FadeIn from "@/components/ui/FadeIn";

const principles = [
  { n: "01", title: "Ship Real Things", body: "No toy projects. Every ZeroOne build targets real users, real problems, real stakes." },
  { n: "02", title: "Learn in Public",  body: "Growth through peer review, open demos, and radical transparency in our work." },
  { n: "03", title: "Own Your Domain",  body: "Members lead, not just contribute. Ownership drives accountability and excellence." },
  { n: "04", title: "Raise the Bar",    body: "We don't benchmark against student projects. We benchmark against industry." },
];

export default function About() {
  return (
    <section id="about" className="border-t border-white/[.07] px-6 py-24 md:py-32">
      <div className="mx-auto max-w-[1200px]">

        {/* Header */}
        <FadeIn>
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-24">
            <div>
              <p className="mb-6 font-mono text-[10px] uppercase tracking-[.22em] text-white/25">
                01 — About
              </p>
              <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black leading-[0.9] tracking-[-0.03em] text-white">
                Not a club.{" "}
                <br className="hidden lg:block" />
                <span className="text-white/25">A standard.</span>
              </h2>
            </div>
            <div className="flex items-end">
              <div className="space-y-5 text-[15px] leading-[1.75] text-white/40">
                <p>
                  ZeroOne was built on a simple premise: the best way to learn
                  technology is to build it under pressure, with people who care
                  as much as you do.
                </p>
                <p>
                  We&apos;re selective because excellence demands a high-trust
                  environment. Every member brings something irreplaceable.
                  Every project earns its place.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Principles list */}
        <FadeIn delay={0.08}>
          <div className="mt-16 border-t border-white/[.07]">
            {principles.map(p => (
              <div
                key={p.n}
                className="flex gap-8 border-b border-white/[.06] py-7 transition-colors hover:bg-white/[.015]"
              >
                <span className="w-8 shrink-0 pt-px font-mono text-[10px] text-white/20">
                  {p.n}
                </span>
                <div>
                  <h3 className="text-[14px] font-semibold text-white/80">{p.title}</h3>
                  <p className="mt-1.5 text-[14px] leading-[1.7] text-white/35">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
