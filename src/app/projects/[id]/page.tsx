import { sql } from "@/lib/db";
import { notFound } from "next/navigation";
import Navbar from "@/components/ui/Navbar";

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    let project: any = null;

    try {
        const rows = await sql`SELECT * FROM projects WHERE id = ${id} `;
        if (rows.length > 0) {
            project = rows[0];
        }
    } catch (error) {
        // If id is not an integer or table not present, might throw
    }

    // Fallback to static dummy if db fails or table is empty
    if (!project) {
        const staticProjects = [
            { id: "01", cat: "Portals", title: "SAC Website", tag: "Web Portal", body: "sac.kluniversity.in", tags: ["Web", "Portal"], color: "rgba(59,130,246,0.55)", lines: "rgba(59,130,246,0.35)" },
            { id: "02", cat: "Portals", title: "SVR Website", tag: "Virtual Reality", body: "svr.kluniversity.in", tags: ["Web", "Virtual Reality"], color: "rgba(249,115,22,0.55)", lines: "rgba(249,115,22,0.35)" },
            { id: "03", cat: "Activities", title: "SAC Activities", tag: "Student Engagement", body: "sacactivites.kluniversity.in", tags: ["Web", "Engagement"], color: "rgba(139,92,246,0.55)", lines: "rgba(139,92,246,0.35)" },
            { id: "04", cat: "Programs", title: "Social Internship", tag: "Internship Program", body: "socialinternship.kluniversity.in", tags: ["Web", "Internship"], color: "rgba(34,197,94,0.55)", lines: "rgba(34,197,94,0.35)" },
            { id: "05", cat: "Events", title: "KLU Surabhi", tag: "Fest Website", body: "klusurabhi.in", tags: ["Web", "Fest"], color: "rgba(6,182,212,0.55)", lines: "rgba(6,182,212,0.35)" },
        ];
        project = staticProjects.find(p => p.id === id);
        if (!project) return notFound();
    }

    const p = {
        ...project,
        tags: Array.isArray(project.tags) ? project.tags : (typeof project.tags === "string" ? JSON.parse(project.tags || "[]") : []),
    };

    return (
        <>
            <Navbar />
            <main className="min-h-screen pt-32 pb-24 px-6 md:pt-40 md:px-12 flex flex-col items-center">
                <div className="max-w-4xl w-full">
                    <div className="mb-4 flex flex-wrap gap-2">
                        <span className="font-mono text-[10px] uppercase tracking-[.2em] text-white/50 border border-white/10 px-3 py-1 bg-white/5">
                            {p.cat}
                        </span>
                        {p.tags.map((t: string) => (
                            <span key={t} className="font-mono text-[10px] uppercase tracking-[.2em] text-white/50 border border-white/10 px-3 py-1">
                                {t}
                            </span>
                        ))}
                    </div>

                    <h1 className="text-[clamp(3rem,6vw,5rem)] font-black leading-none tracking-tight text-white mb-8">
                        {p.title}
                    </h1>

                    {/* Visual area */}
                    <div className="relative aspect-video w-full overflow-hidden border border-white/[.08] mb-12">
                        <div
                            className="absolute inset-0 opacity-40 transition-opacity duration-1000"
                            style={{
                                backgroundColor: "#0e0e0e",
                                backgroundImage: `
repeating - linear - gradient(90deg, ${p.lines} 0px, ${p.lines} 1px, transparent 1px, transparent 20px),
    repeating - linear - gradient(0deg, ${p.lines} 0px, ${p.lines} 1px, transparent 1px, transparent 20px)
        `,
                            }}
                        />
                        <div
                            className="absolute inset-0 opacity-50"
                            style={{
                                background: `radial - gradient(ellipse at 50 % 50 %, ${p.color} 0 %, transparent 60 %)`,
                            }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="font-mono text-white/80 tracking-widest text-lg font-bold">
                                {p.tag || p.title}
                            </span>
                        </div>
                    </div>

                    <div className="prose prose-invert max-w-none">
                        <h2 className="text-2xl font-bold mb-4">About the Project</h2>
                        <p className="text-white/70 leading-relaxed text-lg whitespace-pre-line">
                            {p.body}
                        </p>
                        {p.body?.includes('.in') && (
                            <div className="mt-8">
                                <a
                                    href={`https://${p.body.split('\\n')[0].trim()}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block bg-white text-black px-6 py-3 font-mono text-sm uppercase tracking-wider font-bold hover:bg-white/90 transition-colors"
                                >
                                    Visit Project
                                </a >
                            </div >
                        )}
                    </div >
                </div >
            </main >
        </>
    );
}
