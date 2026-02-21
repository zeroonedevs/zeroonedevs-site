"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

/* ─── Types ──────────────────────────────────────────────── */
type Project = { id: number; cat: string; title: string; tag: string; body: string; tags: string[]; color: string; lines: string; sort_order: number };
type Achievement = { id: number; type: string; label: string; title: string; subtitle: string; description: string; stat: string; stat_label: string; bg_text: string; sort_order: number };
type Member = { id: number; name: string; role: string; stack: string; bio: string; bg_color: string; skin_color: string; hair_color: string; hair_type: string; shoulder_tone: string; sort_order: number };

/* ─── Shared UI ───────────────────────────────────────────── */
const inp = "w-full border-b border-white/[.1] bg-transparent py-2 text-[13px] text-white outline-none placeholder:text-white/20 focus:border-white/30";
const lbl = "block mb-1 font-mono text-[9px] uppercase tracking-[.18em] text-white/30";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className={lbl}>{label}</label>{children}</div>;
}

function DeleteBtn({ onDelete }: { onDelete: () => void }) {
  const [confirm, setConfirm] = useState(false);
  if (confirm) return (
    <span className="flex gap-2 text-[11px]">
      <button onClick={onDelete} className="text-red-400 hover:text-red-300">Confirm</button>
      <button onClick={() => setConfirm(false)} className="text-white/30">Cancel</button>
    </span>
  );
  return <button onClick={() => setConfirm(true)} className="font-mono text-[10px] text-white/20 hover:text-red-400 transition-colors">Delete</button>;
}

/* ─── Projects Tab ────────────────────────────────────────── */
function ProjectsTab() {
  const [items, setItems] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Partial<Project> | null>(null);

  const load = useCallback(async () => {
    const r = await fetch("/api/projects"); setItems(await r.json());
  }, []);
  useEffect(() => { load(); }, [load]);

  async function save() {
    if (!editing) return;
    const method = editing.id ? "PUT" : "POST";
    const url = editing.id ? `/api/projects/${editing.id}` : "/api/projects";
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...editing, tags: typeof editing.tags === "string" ? (editing.tags as unknown as string).split(",").map(t => t.trim()) : editing.tags }) });
    setEditing(null); load();
  }

  async function del(id: number) {
    await fetch(`/api/projects/${id}`, { method: "DELETE" }); load();
  }

  const blank: Partial<Project> = { cat: "AI", title: "", tag: "", body: "", tags: [], color: "rgba(59,130,246,0.55)", lines: "rgba(59,130,246,0.35)", sort_order: 0 };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-bold text-white">Projects <span className="ml-2 font-mono text-[11px] text-white/30">{items.length}</span></h2>
        <button onClick={() => setEditing(blank)} className="bg-blue-600 px-4 py-2 text-[12px] font-medium text-white hover:bg-blue-500 transition">+ Add</button>
      </div>

      {editing && (
        <div className="mb-6 border border-white/[.1] p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Title"><input className={inp} value={editing.title ?? ""} onChange={e => setEditing(p => ({ ...p, title: e.target.value }))} placeholder="Project name" /></Field>
            <Field label="Category"><select className={inp + " bg-[#0a0a0a]"} value={editing.cat ?? "AI"} onChange={e => setEditing(p => ({ ...p, cat: e.target.value }))}>
              {["AI","Systems","Design","Hardware"].map(c => <option key={c}>{c}</option>)}
            </select></Field>
            <Field label="Tag line"><input className={inp} value={editing.tag ?? ""} onChange={e => setEditing(p => ({ ...p, tag: e.target.value }))} placeholder="Edge Inference" /></Field>
            <Field label="Tags (comma separated)"><input className={inp} value={Array.isArray(editing.tags) ? editing.tags.join(", ") : (editing.tags ?? "")} onChange={e => setEditing(p => ({ ...p, tags: e.target.value as unknown as string[] }))} placeholder="AI, Edge, Research" /></Field>
          </div>
          <div className="mt-4">
            <Field label="Description"><textarea className={inp + " resize-none"} rows={2} value={editing.body ?? ""} onChange={e => setEditing(p => ({ ...p, body: e.target.value }))} placeholder="Short description" /></Field>
          </div>
          <div className="mt-4 flex gap-3">
            <button onClick={save} className="bg-blue-600 px-5 py-2 text-[12px] font-medium text-white hover:bg-blue-500 transition">Save</button>
            <button onClick={() => setEditing(null)} className="px-5 py-2 text-[12px] text-white/40 hover:text-white transition">Cancel</button>
          </div>
        </div>
      )}

      <div className="divide-y divide-white/[.06] border-t border-white/[.07]">
        {items.map(p => (
          <div key={p.id} className="flex items-center justify-between gap-4 py-4">
            <div>
              <p className="text-[13px] font-semibold text-white">{p.title}</p>
              <p className="font-mono text-[10px] text-white/30">{p.cat} · {p.tag}</p>
            </div>
            <div className="flex shrink-0 gap-4">
              <button onClick={() => setEditing({ ...p, tags: p.tags ?? [] })} className="font-mono text-[10px] text-white/30 hover:text-white transition-colors">Edit</button>
              <DeleteBtn onDelete={() => del(p.id)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Achievements Tab ────────────────────────────────────── */
function AchievementsTab() {
  const [items, setItems] = useState<Achievement[]>([]);
  const [editing, setEditing] = useState<Partial<Achievement> | null>(null);

  const load = useCallback(async () => {
    const r = await fetch("/api/achievements"); setItems(await r.json());
  }, []);
  useEffect(() => { load(); }, [load]);

  async function save() {
    if (!editing) return;
    const method = editing.id ? "PUT" : "POST";
    const url = editing.id ? `/api/achievements/${editing.id}` : "/api/achievements";
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing) });
    setEditing(null); load();
  }

  async function del(id: number) {
    await fetch(`/api/achievements/${id}`, { method: "DELETE" }); load();
  }

  const blank: Partial<Achievement> = { type: "stat", label: "", title: "", subtitle: "", description: "", stat: "", stat_label: "", bg_text: "", sort_order: 0 };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-bold text-white">Achievements <span className="ml-2 font-mono text-[11px] text-white/30">{items.length}</span></h2>
        <button onClick={() => setEditing(blank)} className="bg-blue-600 px-4 py-2 text-[12px] font-medium text-white hover:bg-blue-500 transition">+ Add</button>
      </div>

      {editing && (
        <div className="mb-6 border border-white/[.1] p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Type"><select className={inp + " bg-[#0a0a0a]"} value={editing.type ?? "stat"} onChange={e => setEditing(p => ({ ...p, type: e.target.value }))}>
              {["featured","stat","award","quote","summit","custom"].map(t => <option key={t}>{t}</option>)}
            </select></Field>
            <Field label="Label (small)"><input className={inp} value={editing.label ?? ""} onChange={e => setEditing(p => ({ ...p, label: e.target.value }))} placeholder="Grants Won" /></Field>
            <Field label="Title"><input className={inp} value={editing.title ?? ""} onChange={e => setEditing(p => ({ ...p, title: e.target.value }))} placeholder="1st Place" /></Field>
            <Field label="Subtitle"><input className={inp} value={editing.subtitle ?? ""} onChange={e => setEditing(p => ({ ...p, subtitle: e.target.value }))} placeholder="of 500+ teams" /></Field>
            <Field label="Stat (big number)"><input className={inp} value={editing.stat ?? ""} onChange={e => setEditing(p => ({ ...p, stat: e.target.value }))} placeholder="₹20L+" /></Field>
            <Field label="Stat label"><input className={inp} value={editing.stat_label ?? ""} onChange={e => setEditing(p => ({ ...p, stat_label: e.target.value }))} placeholder="National competitions" /></Field>
          </div>
          <div className="mt-4">
            <Field label="Description"><textarea className={inp + " resize-none"} rows={2} value={editing.description ?? ""} onChange={e => setEditing(p => ({ ...p, description: e.target.value }))} /></Field>
          </div>
          <div className="mt-4 flex gap-3">
            <button onClick={save} className="bg-blue-600 px-5 py-2 text-[12px] font-medium text-white hover:bg-blue-500 transition">Save</button>
            <button onClick={() => setEditing(null)} className="px-5 py-2 text-[12px] text-white/40 hover:text-white transition">Cancel</button>
          </div>
        </div>
      )}

      <div className="divide-y divide-white/[.06] border-t border-white/[.07]">
        {items.map(a => (
          <div key={a.id} className="flex items-center justify-between gap-4 py-4">
            <div>
              <p className="text-[13px] font-semibold text-white">{a.title || a.stat || a.label || "—"}</p>
              <p className="font-mono text-[10px] text-white/30">{a.type} {a.subtitle ? `· ${a.subtitle}` : ""}</p>
            </div>
            <div className="flex shrink-0 gap-4">
              <button onClick={() => setEditing(a)} className="font-mono text-[10px] text-white/30 hover:text-white transition-colors">Edit</button>
              <DeleteBtn onDelete={() => del(a.id)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Team Tab ────────────────────────────────────────────── */
function TeamTab() {
  const [items, setItems] = useState<Member[]>([]);
  const [editing, setEditing] = useState<Partial<Member> | null>(null);

  const load = useCallback(async () => {
    const r = await fetch("/api/team"); setItems(await r.json());
  }, []);
  useEffect(() => { load(); }, [load]);

  async function save() {
    if (!editing) return;
    const method = editing.id ? "PUT" : "POST";
    const url = editing.id ? `/api/team/${editing.id}` : "/api/team";
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing) });
    setEditing(null); load();
  }

  async function del(id: number) {
    await fetch(`/api/team/${id}`, { method: "DELETE" }); load();
  }

  const blank: Partial<Member> = { name: "", role: "", stack: "", bio: "", bg_color: "#181818", skin_color: "#8a7260", hair_color: "#0e0e0e", hair_type: "short", shoulder_tone: "#222", sort_order: 0 };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-bold text-white">Team <span className="ml-2 font-mono text-[11px] text-white/30">{items.length}</span></h2>
        <button onClick={() => setEditing(blank)} className="bg-blue-600 px-4 py-2 text-[12px] font-medium text-white hover:bg-blue-500 transition">+ Add</button>
      </div>

      {editing && (
        <div className="mb-6 border border-white/[.1] p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name"><input className={inp} value={editing.name ?? ""} onChange={e => setEditing(p => ({ ...p, name: e.target.value }))} placeholder="Arjun Mehta" /></Field>
            <Field label="Role"><input className={inp} value={editing.role ?? ""} onChange={e => setEditing(p => ({ ...p, role: e.target.value }))} placeholder="Systems Lead" /></Field>
            <Field label="Stack"><input className={inp} value={editing.stack ?? ""} onChange={e => setEditing(p => ({ ...p, stack: e.target.value }))} placeholder="Rust · Cloud" /></Field>
            <Field label="Hair type"><select className={inp + " bg-[#0a0a0a]"} value={editing.hair_type ?? "short"} onChange={e => setEditing(p => ({ ...p, hair_type: e.target.value }))}>
              {["short","long","medium","shoulder"].map(t => <option key={t}>{t}</option>)}
            </select></Field>
          </div>
          <div className="mt-4">
            <Field label="Bio"><textarea className={inp + " resize-none"} rows={2} value={editing.bio ?? ""} onChange={e => setEditing(p => ({ ...p, bio: e.target.value }))} /></Field>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <Field label="BG color"><input className={inp} value={editing.bg_color ?? ""} onChange={e => setEditing(p => ({ ...p, bg_color: e.target.value }))} placeholder="#181818" /></Field>
            <Field label="Skin color"><input className={inp} value={editing.skin_color ?? ""} onChange={e => setEditing(p => ({ ...p, skin_color: e.target.value }))} placeholder="#8a7260" /></Field>
            <Field label="Hair color"><input className={inp} value={editing.hair_color ?? ""} onChange={e => setEditing(p => ({ ...p, hair_color: e.target.value }))} placeholder="#0e0e0e" /></Field>
          </div>
          <div className="mt-4 flex gap-3">
            <button onClick={save} className="bg-blue-600 px-5 py-2 text-[12px] font-medium text-white hover:bg-blue-500 transition">Save</button>
            <button onClick={() => setEditing(null)} className="px-5 py-2 text-[12px] text-white/40 hover:text-white transition">Cancel</button>
          </div>
        </div>
      )}

      <div className="divide-y divide-white/[.06] border-t border-white/[.07]">
        {items.map(m => (
          <div key={m.id} className="flex items-center justify-between gap-4 py-4">
            <div>
              <p className="text-[13px] font-semibold text-white">{m.name}</p>
              <p className="font-mono text-[10px] text-white/30">{m.role}</p>
            </div>
            <div className="flex shrink-0 gap-4">
              <button onClick={() => setEditing(m)} className="font-mono text-[10px] text-white/30 hover:text-white transition-colors">Edit</button>
              <DeleteBtn onDelete={() => del(m.id)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Dashboard Shell ─────────────────────────────────────── */
const TABS = ["Projects", "Achievements", "Team"] as const;
type Tab = typeof TABS[number];

export default function Dashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("Projects");

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin");
  }

  return (
    <div className="min-h-screen">
      {/* Top bar */}
      <header className="border-b border-white/[.07] px-6 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <a href="/" className="text-[14px] font-semibold text-white/70">
            Zero<span className="text-blue-500">One</span><span className="text-white/30">.</span>
          </a>
          <span className="font-mono text-[10px] uppercase tracking-widest text-white/25">Dashboard</span>
          <button onClick={logout} className="font-mono text-[10px] text-white/25 hover:text-white/70 transition-colors">
            Sign out →
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-10">
        {/* Tabs */}
        <div className="mb-8 flex gap-1 border-b border-white/[.07] pb-0">
          {TABS.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2.5 font-mono text-[11px] tracking-widest transition-colors ${
                tab === t
                  ? "border-b-2 border-blue-500 text-white"
                  : "text-white/30 hover:text-white/60"
              }`}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>

        {tab === "Projects"     && <ProjectsTab />}
        {tab === "Achievements" && <AchievementsTab />}
        {tab === "Team"         && <TeamTab />}
      </div>
    </div>
  );
}
