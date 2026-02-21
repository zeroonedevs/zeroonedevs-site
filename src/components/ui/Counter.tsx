"use client";
import { useEffect, useRef, useState } from "react";

export default function Counter({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) {
  const [n, setN] = useState(0);
  const el = useRef<HTMLSpanElement>(null);
  const fired = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !fired.current) {
        fired.current = true;
        const t0 = performance.now();
        const dur = 1600;
        const tick = (t: number) => {
          const p = Math.min((t - t0) / dur, 1);
          setN(Math.round((1 - Math.pow(2, -10 * p)) * to));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    if (el.current) obs.observe(el.current);
    return () => obs.disconnect();
  }, [to]);

  return <span ref={el}>{prefix}{n}{suffix}</span>;
}
