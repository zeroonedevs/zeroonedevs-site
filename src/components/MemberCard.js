export default function MemberCard({ name, role }) {
  return (
    <article className="rounded-md border border-blue-900/50 bg-slate-900 p-4">
      <h3 className="text-base font-semibold text-blue-300">{name}</h3>
      <p className="mt-1 text-sm text-slate-300">{role}</p>
    </article>
  );
}
