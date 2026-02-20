export default function ProjectCard({ name, description, href }) {
  return (
    <article className="rounded-md border border-blue-900/50 bg-slate-900 p-5">
      <h3 className="text-lg font-semibold text-blue-300">{name}</h3>
      <p className="mt-2 text-sm text-slate-300">{description}</p>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-flex rounded border border-blue-500 px-3 py-2 text-sm font-medium text-blue-300 transition-colors hover:bg-blue-600/20"
      >
        Visit Project
      </a>
    </article>
  );
}
