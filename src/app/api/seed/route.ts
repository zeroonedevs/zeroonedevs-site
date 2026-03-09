import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST() {
  try {
    // ── Tables ────────────────────────────────────────────────────────────
    await sql`
      CREATE TABLE IF NOT EXISTS admins (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )`;

    await sql`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        cat VARCHAR(50) NOT NULL,
        title VARCHAR(255) NOT NULL,
        tag VARCHAR(255),
        body TEXT,
        tags JSONB DEFAULT '[]',
        color VARCHAR(60),
        lines VARCHAR(60),
        sort_order INTEGER DEFAULT 0,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )`;

    await sql`
      CREATE TABLE IF NOT EXISTS achievements (
        id SERIAL PRIMARY KEY,
        type VARCHAR(50) NOT NULL,
        label VARCHAR(255),
        title VARCHAR(255),
        subtitle VARCHAR(255),
        description TEXT,
        stat VARCHAR(100),
        stat_label VARCHAR(100),
        bg_text VARCHAR(50),
        sort_order INTEGER DEFAULT 0,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )`;

    await sql`
      CREATE TABLE IF NOT EXISTS team_members (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        role VARCHAR(255),
        stack TEXT,
        bio TEXT,
        bg_color VARCHAR(20) DEFAULT '#181818',
        skin_color VARCHAR(20) DEFAULT '#8a7260',
        hair_color VARCHAR(20) DEFAULT '#0e0e0e',
        hair_type VARCHAR(20) DEFAULT 'short',
        shoulder_tone VARCHAR(20) DEFAULT '#222',
        sort_order INTEGER DEFAULT 0,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )`;

    // ── Admin user ─────────────────────────────────────────────────────────
    const hash = await bcrypt.hash("ZeroOne2025", 12);
    await sql`
      INSERT INTO admins (username, password_hash)
      VALUES ('admin', ${hash})
      ON CONFLICT (username) DO NOTHING`;

    // ── Seed projects ──────────────────────────────────────────────────────
    await sql`TRUNCATE TABLE projects RESTART IDENTITY CASCADE`;
    const pc = await sql`SELECT COUNT(*) as c FROM projects`;
    if (Number(pc[0].c) === 0) {
      const projects = [
        { cat: "Portals", title: "SAC Website", tag: "Web Portal", body: "sac.kluniversity.in", tags: ["Web", "Portal"], color: "rgba(59,130,246,0.55)", lines: "rgba(59,130,246,0.35)" },
        { cat: "Portals", title: "SVR Website", tag: "Virtual Reality", body: "svr.kluniversity.in", tags: ["Web", "Virtual Reality"], color: "rgba(249,115,22,0.55)", lines: "rgba(249,115,22,0.35)" },
        { cat: "Activities", title: "SAC Activities", tag: "Student Engagement", body: "sacactivites.kluniversity.in", tags: ["Web", "Engagement"], color: "rgba(139,92,246,0.55)", lines: "rgba(139,92,246,0.35)" },
        { cat: "Programs", title: "Social Internship", tag: "Internship Program", body: "socialinternship.kluniversity.in", tags: ["Web", "Internship"], color: "rgba(34,197,94,0.55)", lines: "rgba(34,197,94,0.35)" },
        { cat: "Events", title: "KLU Surabhi", tag: "Fest Website", body: "klusurabhi.in", tags: ["Web", "Fest"], color: "rgba(6,182,212,0.55)", lines: "rgba(6,182,212,0.35)" },
      ];
      for (let i = 0; i < projects.length; i++) {
        const p = projects[i];
        await sql`INSERT INTO projects (cat,title,tag,body,tags,color,lines,sort_order)
          VALUES (${p.cat},${p.title},${p.tag},${p.body},${JSON.stringify(p.tags)},${p.color},${p.lines},${i})`;
      }
    }

    // ── Seed achievements ──────────────────────────────────────────────────
    await sql`TRUNCATE TABLE achievements RESTART IDENTITY CASCADE`;
    const ac = await sql`SELECT COUNT(*) as c FROM achievements`;
    if (Number(ac[0].c) === 0) {
      const items = [
        { type: "featured", label: "Siddhartha Academy of Research Conclave Hackathon", title: "1st Prize", subtitle: "", description: "Secured the top rank by showcasing innovation and building a scalable technical solution.", stat: "", stat_label: "", bg_text: "01", sort_order: 0 },
        { type: "award", label: "V R Siddhartha Webathon", title: "2nd Prize", subtitle: "", description: "", stat: "", stat_label: "", bg_text: "", sort_order: 1 },
        { type: "award", label: "SRM NXTGEN Hackathon", title: "Domain Winners", subtitle: "", description: "", stat: "", stat_label: "", bg_text: "", sort_order: 2 },
        { type: "award", label: "Bits techaccelerate hackathon", title: "Finalist", subtitle: "", description: "", stat: "", stat_label: "", bg_text: "", sort_order: 3 },
        { type: "award", label: "Career Milestone", title: "Preplaced at Calibo", subtitle: "SDE Intern", description: "", stat: "", stat_label: "", bg_text: "", sort_order: 4 },
      ];
      for (const a of items) {
        await sql`INSERT INTO achievements (type,label,title,subtitle,description,stat,stat_label,bg_text,sort_order)
          VALUES (${a.type},${a.label},${a.title},${a.subtitle},${a.description},${a.stat},${a.stat_label},${a.bg_text},${a.sort_order})`;
      }
    }

    // ── Seed team ──────────────────────────────────────────────────────────
    const tc = await sql`SELECT COUNT(*) as c FROM team_members`;
    if (Number(tc[0].c) === 0) {
      const team = [
        { name: "Arjun Mehta", role: "Systems Lead", stack: "Rust · Distributed · Cloud", bio: "Redesigned the core search engine for a 40% speedup. Author of 3 widely-used open-source libraries.", bg_color: "#1a1a1a", skin_color: "#8a7260", hair_color: "#0e0e0e", hair_type: "short", shoulder_tone: "#222" },
        { name: "Priya Nair", role: "Head of Product", stack: "Strategy · UX · Growth", bio: "Ex-Series-B PM. Ships with ruthless prioritisation and an obsession with user empathy.", bg_color: "#d4d4d4", skin_color: "#c8a882", hair_color: "#1a100a", hair_type: "long", shoulder_tone: "#bbb" },
        { name: "Rohan Das", role: "Design Principal", stack: "Figma · Motion · Systems", bio: "Led design for 4 products at 100k+ users. Makes interfaces feel inevitable.", bg_color: "#202020", skin_color: "#b09070", hair_color: "#111", hair_type: "medium", shoulder_tone: "#1a1a1a" },
        { name: "Sneha Iyer", role: "Frontend Architect", stack: "React · TS · Web Perf", bio: "Cut TTI by 60% across the tooling suite. Thinks in render trees, ships in milliseconds.", bg_color: "#e2e2e2", skin_color: "#d0a07a", hair_color: "#1e120a", hair_type: "shoulder", shoulder_tone: "#ccc" },
        { name: "Dev Kapoor", role: "AI Research Lead", stack: "ML · Transformers · Python", bio: "Published research on bio-signal classification. Building next-gen edge inference models.", bg_color: "#141414", skin_color: "#907860", hair_color: "#0a0a0a", hair_type: "short", shoulder_tone: "#1c1c1c" },
        { name: "Ananya Singh", role: "Embedded Systems", stack: "C++ · RTOS · Hardware", bio: "Loves bare-metal. Designed the complete sensor-fusion layer for our robotics platform.", bg_color: "#2e2e2e", skin_color: "#c0906a", hair_color: "#0d0d0d", hair_type: "long", shoulder_tone: "#222" },
      ];
      for (let i = 0; i < team.length; i++) {
        const m = team[i];
        await sql`INSERT INTO team_members (name,role,stack,bio,bg_color,skin_color,hair_color,hair_type,shoulder_tone,sort_order)
          VALUES (${m.name},${m.role},${m.stack},${m.bio},${m.bg_color},${m.skin_color},${m.hair_color},${m.hair_type},${m.shoulder_tone},${i})`;
      }
    }

    return NextResponse.json({ ok: true, message: "DB seeded. Login: admin / ZeroOne2025" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
