import Link from "next/link";
import { deleteProjectAction } from "@/app/admin/actions";
import { FlashBanner } from "@/components/admin/flash-banner";
import { formatDate, truncate } from "@/lib/format";
import { getAdminProjects } from "@/lib/supabase";

interface AdminProjectsPageProps {
  searchParams: Promise<{ success?: string; error?: string }>;
}

export default async function AdminProjectsPage({ searchParams }: AdminProjectsPageProps) {
  const { success, error } = await searchParams;
  const projects = await getAdminProjects();

  return (
    <main className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">Content</p>
          <h2 className="text-3xl font-black text-[var(--ink)]">Projects</h2>
        </div>
        <Link href="/admin/projects/new" className="rounded-full bg-[var(--ink)] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-white">
          New Project
        </Link>
      </div>

      <FlashBanner message={success} type="success" />
      <FlashBanner message={error} type="error" />

      <section className="overflow-hidden rounded-2xl border border-[var(--line)] bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-[var(--surface-soft)] text-left text-xs uppercase tracking-[0.12em] text-[var(--muted)]">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Published</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-t border-[var(--line)] text-[var(--muted)]">
                  <td className="px-4 py-3 font-semibold text-[var(--ink)]">{project.title}</td>
                  <td className="px-4 py-3">
                    {project.published ? (
                      <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">Published</span>
                    ) : (
                      <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">Draft</span>
                    )}
                  </td>
                  <td className="px-4 py-3">{formatDate(project.publishedAt)}</td>
                  <td className="max-w-[320px] px-4 py-3">{truncate(project.shortDescription, 95)}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/projects/${project.id}/edit`}
                        className="rounded-full border border-[var(--line)] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.1em] text-[var(--ink)]"
                      >
                        Edit
                      </Link>
                      <form action={deleteProjectAction}>
                        <input type="hidden" name="id" value={project.id} />
                        <button className="rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.1em] text-red-700">
                          Delete
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
