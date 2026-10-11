import Link from "next/link";

export default function NotFound() {
  return (
    <section className="wrap pt-16 pb-28 md:pt-28">
      <p className="t-meta">HTTP 404 · NXDOMAIN</p>
      <h1 className="t-page mt-4">No route to this page.</h1>
      <p className="t-lede mt-6 max-w-[42ch] text-ink-2">
        The address does not resolve to anything here. It may have moved, or it never existed.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/" className="btn btn-primary">
          Back to the start <span className="arrow">→</span>
        </Link>
        <Link href="/blog" className="btn btn-ghost">
          Writing
        </Link>
      </div>
    </section>
  );
}
