import Link from "next/link";
import { saveProjectAction } from "@/app/admin/actions";
import { ProjectForm } from "@/components/admin/project-form";

export default function NewProjectPage() {
  return (
    <main className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">Create</p>
          <h2 className="text-3xl font-black text-[var(--ink)]">New Project</h2>
        </div>
        <Link href="/admin/projects" className="text-sm font-semibold text-[var(--muted)] underline underline-offset-4">
          Back to Projects
        </Link>
      </div>

      <ProjectForm action={saveProjectAction} submitLabel="Create Project" />
    </main>
  );
}
