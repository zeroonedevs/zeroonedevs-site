import Counter from "@/components/ui/Counter";
import FadeIn from "@/components/ui/FadeIn";

const metrics = [
  { to: 500, suffix: "+",  label: "Active Members",    desc: "Across campuses" },
  { to: 48,  suffix: "",   label: "Projects Shipped",  desc: "Production-ready" },
  { to: 20,  prefix: "₹", suffix: "L+", label: "Grants Won", desc: "National competitions" },
  { to: 12,  suffix: "",   label: "Partner Labs",      desc: "Industry & academia" },
];

export default function Numbers() {
  return (
    <section className="border-b border-white/[.05] bg-white/[.015] px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          {metrics.map((m, i) => (
            <FadeIn key={m.label} delay={i * 0.07}>
              <div className="flex flex-col gap-1">
                <span className="text-4xl font-black text-white">
                  <Counter to={m.to} prefix={m.prefix} suffix={m.suffix} />
                </span>
                <span className="text-sm font-semibold text-white/70">{m.label}</span>
                <span className="font-mono text-[10px] tracking-widest text-white/25">{m.desc}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
