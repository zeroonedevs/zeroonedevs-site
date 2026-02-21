"use client";
import { motion } from "framer-motion";

const stats = [
  { value: "500+",   label: "Members"         },
  { value: "48",     label: "Projects shipped" },
  { value: "₹20L+",  label: "Grants won"      },
  { value: "12",     label: "Partner labs"     },
];

export default function Hero() {
  return (
    <section className="relative flex min-h-svh flex-col px-6">
      <div className="mx-auto flex w-full max-w-[1200px] flex-1 flex-col justify-center py-24">

        {/* Brand name */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <span className="text-[clamp(1rem,2.5vw,1.5rem)] font-semibold tracking-tight text-white/50">
            Zero<span className="text-blue-500">One</span>
          </span>
          <span className="ml-3 font-mono text-[10px] uppercase tracking-[.2em] text-white/20">
            CodeClub · Est. 2023
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="text-[clamp(3rem,8.5vw,7rem)] font-black leading-[0.88] tracking-[-0.04em] text-white"
        >
          We build
          <br />
          <span className="text-white/30">real things.</span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.18 }}
          className="mt-8 max-w-[460px] text-[15px] leading-[1.75] text-white/40"
        >
          A selective student collective building production-grade technology.
          No demos. No busy-work. Real users, real problems, real stakes.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.28 }}
          className="mt-10 flex flex-wrap gap-3"
        >
          <a
            href="#apply"
            className="bg-blue-600 px-7 py-3 text-[14px] font-medium text-white transition hover:bg-blue-500"
          >
            Apply now →
          </a>
          <a
            href="#work"
            className="border border-white/[.1] px-7 py-3 text-[14px] font-medium text-white/45 transition hover:border-white/20 hover:text-white/75"
          >
            View work
          </a>
        </motion.div>
      </div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45 }}
        className="mx-auto w-full max-w-[1200px] border-t border-white/[.07] py-8"
      >
        <div className="flex flex-wrap gap-x-12 gap-y-5">
          {stats.map(s => (
            <div key={s.label}>
              <p className="text-[22px] font-black text-white">{s.value}</p>
              <p className="mt-0.5 font-mono text-[11px] text-white/25">{s.label}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
