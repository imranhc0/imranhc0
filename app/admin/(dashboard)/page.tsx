import Link from "next/link";
import { formatDate, truncate } from "@/lib/format";
import { getAdminPosts, getAdminProjects, hasServiceSupabaseConfig } from "@/lib/supabase";

interface AdminOverviewPageProps {
  searchParams: Promise<{ success?: string }>;
}

export default async function AdminOverviewPage({ searchParams }: AdminOverviewPageProps) {
  const { success } = await searchParams;
  const [projects, posts] = await Promise.all([getAdminProjects(), getAdminPosts()]);

  return (
    <main className="space-y-6">
      {success ? (
        <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">{success}</p>
      ) : null}

      {!hasServiceSupabaseConfig() ? (
        <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-700">
          Supabase service key is missing. Add `SUPABASE_SERVICE_ROLE_KEY` to enable write operations.
        </p>
      ) : null}

      <section className="grid gap-4 md:grid-cols-4">
        <article className="rounded-2xl border border-[var(--line)] bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">Projects</p>
          <p className="mt-2 text-4xl font-black text-[var(--ink)]">{projects.length}</p>
        </article>
        <article className="rounded-2xl border border-[var(--line)] bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">Published Projects</p>
          <p className="mt-2 text-4xl font-black text-[var(--ink)]">{projects.filter((item) => item.published).length}</p>
        </article>
        <article className="rounded-2xl border border-[var(--line)] bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">Blog Posts</p>
          <p className="mt-2 text-4xl font-black text-[var(--ink)]">{posts.length}</p>
        </article>
        <article className="rounded-2xl border border-[var(--line)] bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">Published Posts</p>
          <p className="mt-2 text-4xl font-black text-[var(--ink)]">{posts.filter((item) => item.published).length}</p>
        </article>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-[var(--line)] bg-white p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-[var(--ink)]">Latest Projects</h2>
            <Link href="/admin/projects/new" className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--accent)]">
              New
            </Link>
          </div>

          <div className="mt-4 space-y-3">
            {projects.slice(0, 5).map((project) => (
              <Link
                key={project.id}
                href={`/admin/projects/${project.id}/edit`}
                className="block rounded-xl border border-[var(--line)] px-4 py-3 transition hover:border-[var(--ink)]"
              >
                <p className="font-bold text-[var(--ink)]">{project.title}</p>
                <p className="mt-1 text-xs text-[var(--muted)]">{truncate(project.shortDescription, 90)}</p>
              </Link>
            ))}
          </div>
        </article>

        <article className="rounded-2xl border border-[var(--line)] bg-white p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-[var(--ink)]">Latest Posts</h2>
            <Link href="/admin/blog/new" className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--accent)]">
              New
            </Link>
          </div>

          <div className="mt-4 space-y-3">
            {posts.slice(0, 5).map((post) => (
              <Link
                key={post.id}
                href={`/admin/blog/${post.id}/edit`}
                className="block rounded-xl border border-[var(--line)] px-4 py-3 transition hover:border-[var(--ink)]"
              >
                <p className="font-bold text-[var(--ink)]">{post.title}</p>
                <p className="mt-1 text-xs text-[var(--muted)]">{formatDate(post.publishedAt)}</p>
              </Link>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}
