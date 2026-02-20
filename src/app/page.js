import MemberCard from "../components/MemberCard";
import ProjectCard from "../components/ProjectCard";
import Section from "../components/Section";

const projects = [
  {
    name: "SAC Website",
    description: "Official KL SAC website for announcements and information.",
    href: "https://sac.kluniversity.in"
  },
  {
    name: "SVR Platform",
    description: "Platform for managing student-related workflows and records.",
    href: "https://svr.kluniversity.in"
  },
  {
    name: "SAC Activities Portal",
    description: "Portal to track and manage SAC activities and participation.",
    href: "https://sacactivities.kluniversity.in"
  }
];

const achievements = [
  "Built and maintained official KL SAC platforms.",
  "Delivered production-level systems used by students and faculty.",
  "Actively contributed to college technical infrastructure."
];

const members = [
  { name: "Core Lead", role: "Lead" },
  { name: "Platform Developer", role: "Developer" },
  { name: "Frontend Developer", role: "Developer" },
  { name: "Design Contributor", role: "Designer" },
  { name: "Systems Contributor", role: "Developer" },
  { name: "Deployment Coordinator", role: "Operations" }
];

export default function HomePage() {
  const year = new Date().getFullYear();

  return (
    <main className="min-h-screen bg-black text-slate-100">
      <header className="border-b border-blue-900/40">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
          <p className="text-sm font-semibold tracking-wide text-blue-400">
            ZeroOne CodeClub
          </p>
          <nav className="flex gap-4 text-sm text-slate-300">
            <a href="#about" className="hover:text-blue-300">
              About
            </a>
            <a href="#our-work" className="hover:text-blue-300">
              Work
            </a>
            <a href="#achievements" className="hover:text-blue-300">
              Achievements
            </a>
            <a href="#members" className="hover:text-blue-300">
              Members
            </a>
          </nav>
        </div>
      </header>

      <section id="home" className="border-b border-blue-900/40 py-20">
        <div className="mx-auto w-full max-w-5xl px-6">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            ZeroOne CodeClub
          </h1>
          <p className="mt-4 max-w-xl text-lg text-blue-300">
            Building real-world software at KL SAC
          </p>
          <a
            href="#our-work"
            className="mt-8 inline-flex rounded border border-blue-500 px-5 py-2.5 text-sm font-semibold text-blue-300 transition-colors hover:bg-blue-600/20"
          >
            Explore Our Work
          </a>
        </div>
      </section>

      <Section id="about" title="About Us">
        <div className="max-w-3xl space-y-3 text-slate-300">
          <p>ZeroOne CodeClub is a student-led coding club at KL SAC.</p>
          <p>
            We focus on real-world web apps, systems, and platforms for college
            needs.
          </p>
          <p>
            Our work emphasizes hands-on development, teamwork, and deployment.
          </p>
        </div>
      </Section>

      <Section id="our-work" title="Our Work">
        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard
              key={project.name}
              name={project.name}
              description={project.description}
              href={project.href}
            />
          ))}
        </div>
      </Section>

      <Section id="achievements" title="Achievements">
        <ul className="list-disc space-y-3 pl-5 text-slate-300">
          {achievements.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Section>

      <Section id="members" title="Members">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => (
            <MemberCard key={member.name} name={member.name} role={member.role} />
          ))}
        </div>
      </Section>

      <footer className="py-8">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>ZeroOne CodeClub - KL SAC</p>
          <p>&copy; {year}</p>
          <a href="mailto:zeroonecodeclub@kluniversity.in" className="text-blue-300">
            zeroonecodeclub@kluniversity.in
          </a>
        </div>
      </footer>
    </main>
  );
}
