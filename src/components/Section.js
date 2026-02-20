export default function Section({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-20 border-b border-blue-900/40 py-16">
      <div className="mx-auto w-full max-w-5xl px-6">
        {title ? (
          <h2 className="mb-6 text-2xl font-semibold tracking-tight text-blue-400">
            {title}
          </h2>
        ) : null}
        {children}
      </div>
    </section>
  );
}
