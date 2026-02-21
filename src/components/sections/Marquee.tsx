const items = [
  "NEXT.JS", "TYPESCRIPT", "TAILWIND CSS", "REACT", "PYTHON",
  "RUST", "FIGMA", "PYTORCH", "EMBEDDED C", "DOCKER",
  "OPEN SOURCE", "AI / ML", "CLOUD NATIVE", "DEVOPS", "WEB PERF",
];

export default function Marquee() {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-white/[.06] py-3 select-none">
      <div className="ticker flex gap-10 whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center gap-4 font-mono text-[9px] tracking-[.22em] text-white/[.13]"
          >
            <span className="h-1 w-1 shrink-0 rounded-full bg-blue-500/40" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
