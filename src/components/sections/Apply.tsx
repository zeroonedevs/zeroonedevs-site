"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeIn from "@/components/ui/FadeIn";

type Form = { first: string; last: string; email: string; domain: string; link: string };
const INIT: Form = { first: "", last: "", email: "", domain: "", link: "" };

const base =
  "w-full border-b border-white/[.1] bg-transparent py-3 text-[14px] text-white/80 placeholder:text-white/20 outline-none transition-colors focus:border-white/30";
const errBase = "border-red-500/40 focus:border-red-400/60";

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-2 block font-mono text-[9px] uppercase tracking-[.2em] text-white/25">
        {label}
      </label>
      {children}
      {error && <p className="mt-1.5 font-mono text-[9px] text-red-400/80">{error}</p>}
    </div>
  );
}

const perks = [
  { title: "Elite network",  desc: "Top student builders across campuses."  },
  { title: "Real projects",  desc: "Ship from week one. No busy-work."       },
  { title: "Full access",    desc: "Mentors, credits, and lab resources."    },
];

export default function Apply() {
  const [f, setF] = useState<Form>(INIT);
  const [e, setE] = useState<Partial<Form>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  const upd = (k: keyof Form) => (ev: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setF(p => ({ ...p, [k]: ev.target.value }));
    setE(p => ({ ...p, [k]: undefined }));
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const errs: Partial<Form> = {};
    if (!f.first.trim()) errs.first = "Required";
    if (!f.last.trim())  errs.last  = "Required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) errs.email = "Valid email required";
    if (!f.domain) errs.domain = "Please select a domain";
    if (Object.keys(errs).length) { setE(errs); return; }
    setStatus("loading");
    setTimeout(() => setStatus("done"), 1600);
  };

  return (
    <section id="apply" className="border-t border-white/[.07] px-6 py-24 md:py-32">
      <div className="mx-auto max-w-[1200px]">

        <div className="grid gap-20 lg:grid-cols-[1fr_420px]">

          {/* Left */}
          <FadeIn className="flex flex-col justify-between gap-16">
            <div>
              <p className="mb-6 font-mono text-[10px] uppercase tracking-[.22em] text-white/25">
                05 — Join
              </p>
              <h2 className="text-[clamp(2.2rem,6vw,4.5rem)] font-black leading-[0.88] tracking-[-0.04em] text-white">
                Apply if you&apos;re
                <br />
                <span className="text-white/25">wired to build.</span>
              </h2>
              <p className="mt-7 max-w-[360px] text-[15px] leading-[1.75] text-white/40">
                We&apos;re selective because excellence demands a high-trust
                environment. Rolling review, no hard deadlines.
              </p>
            </div>

            <div className="space-y-7 border-t border-white/[.06] pt-10">
              {perks.map(p => (
                <div key={p.title} className="flex gap-5">
                  <span className="mt-[0.55em] h-px w-6 shrink-0 bg-white/20" />
                  <div>
                    <p className="text-[13px] font-semibold text-white/65">{p.title}</p>
                    <p className="mt-0.5 text-[13px] text-white/30">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Form */}
          <FadeIn delay={0.1}>
            <div className="border border-white/[.08] p-8">
              <p className="mb-8 font-mono text-[9px] uppercase tracking-[.22em] text-white/20">
                Application
              </p>

              <AnimatePresence mode="wait">
                {status === "done" ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center gap-4 py-20 text-center"
                  >
                    <p className="font-mono text-[10px] uppercase tracking-widest text-white/25">Submitted</p>
                    <p className="text-[24px] font-black text-white">We&apos;ll be in touch.</p>
                    <p className="text-[14px] text-white/35">Review within 7 days.</p>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={submit} className="flex flex-col gap-6">
                    <div className="grid grid-cols-2 gap-6">
                      <Field label="First name" error={e.first}>
                        <input placeholder="Arjun" value={f.first} onChange={upd("first")} className={`${base} ${e.first ? errBase : ""}`} />
                      </Field>
                      <Field label="Last name" error={e.last}>
                        <input placeholder="Mehta" value={f.last} onChange={upd("last")} className={`${base} ${e.last ? errBase : ""}`} />
                      </Field>
                    </div>

                    <Field label="Email" error={e.email}>
                      <input type="email" placeholder="you@college.edu" value={f.email} onChange={upd("email")} className={`${base} ${e.email ? errBase : ""}`} />
                    </Field>

                    <Field label="Domain" error={e.domain}>
                      <select
                        value={f.domain}
                        onChange={upd("domain")}
                        style={{ appearance: "none" }}
                        className={`${base} ${e.domain ? errBase : ""}`}
                      >
                        <option value="">Select your domain</option>
                        {["Software Engineering", "AI / ML Research", "Product Design", "Embedded Systems", "Other"].map(o => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                      </select>
                    </Field>

                    <Field label="Portfolio / GitHub (optional)">
                      <input type="url" placeholder="https://github.com/you" value={f.link} onChange={upd("link")} className={base} />
                    </Field>

                    <motion.button
                      type="submit"
                      whileTap={{ scale: 0.98 }}
                      disabled={status === "loading"}
                      className="mt-1 flex items-center justify-center gap-2 bg-blue-600 py-3.5 text-[14px] font-medium text-white transition hover:bg-blue-500 disabled:opacity-50"
                    >
                      {status === "loading" ? (
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 0.7, ease: "linear" }}
                          className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                        />
                      ) : "Submit application →"}
                    </motion.button>

                    <p className="text-center font-mono text-[9px] text-white/15">
                      Rolling review · Your privacy is respected
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </FadeIn>

        </div>

        {/* Footer */}
        <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-white/[.06] pt-8 sm:flex-row">
          <span className="font-mono text-[10px] text-white/15">© 2025 ZEROONE CODECLUB</span>
          <div className="flex gap-6 font-mono text-[10px] text-white/15">
            {["GitHub", "LinkedIn", "Privacy", "Terms"].map(l => (
              <a key={l} href="#" className="transition-colors hover:text-white/40">{l}</a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
