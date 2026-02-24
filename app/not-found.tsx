import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-xl items-center px-4">
      <section className="w-full rounded-[28px] border border-[var(--line)] bg-white/90 p-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">404</p>
        <h1 className="mt-2 text-4xl font-black text-[var(--ink)]">Page Not Found</h1>
        <p className="mt-3 text-sm text-[var(--muted)]">The page you requested does not exist or is unpublished.</p>
        <Link href="/" className="mt-6 inline-flex rounded-full bg-[var(--ink)] px-5 py-2.5 text-sm font-bold text-white">
          Back Home
        </Link>
      </section>
    </main>
  );
}
