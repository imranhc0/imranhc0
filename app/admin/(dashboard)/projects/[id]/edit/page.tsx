import Link from "next/link";
import { notFound } from "next/navigation";
import { saveProjectAction } from "@/app/admin/actions";
import { ProjectForm } from "@/components/admin/project-form";
import { getAdminProjectById } from "@/lib/supabase";

interface EditProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const { id } = await params;
  const project = await getAdminProjectById(id);

  if (!project) {
    notFound();
  }

  return (
    <main className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">Update</p>
          <h2 className="text-3xl font-black text-[var(--ink)]">Edit Project</h2>
        </div>
        <Link href="/admin/projects" className="text-sm font-semibold text-[var(--muted)] underline underline-offset-4">
          Back to Projects
        </Link>
      </div>

      <ProjectForm action={saveProjectAction} submitLabel="Save Changes" initialProject={project} />
    </main>
  );
}
