import { sql } from "@/lib/db";
import Navbar       from "@/components/ui/Navbar";
import Hero         from "@/components/sections/Hero";
import Marquee      from "@/components/sections/Marquee";
import About        from "@/components/sections/About";
import Work         from "@/components/sections/Work";
import Achievements from "@/components/sections/Achievements";
import Team         from "@/components/sections/Team";
import Apply        from "@/components/sections/Apply";

async function getData() {
  try {
    const [projects, achievements, team] = await Promise.all([
      sql`SELECT * FROM projects ORDER BY sort_order, id`,
      sql`SELECT * FROM achievements ORDER BY sort_order, id`,
      sql`SELECT * FROM team_members ORDER BY sort_order, id`,
    ]);
    return { projects, achievements, team };
  } catch {
    // Tables not yet created — return empty arrays; static defaults kick in
    return { projects: [], achievements: [], team: [] };
  }
}

export default async function Home() {
  const { projects, achievements, team } = await getData();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Work projects={projects as never} />
        <Achievements achievements={achievements as never} />
        <Team members={team as never} />
        <Apply />
      </main>
    </>
  );
}
