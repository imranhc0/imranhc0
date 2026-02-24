import type { Project } from "@/lib/types";

interface ProjectFormProps {
  action: (formData: FormData) => void | Promise<void>;
  submitLabel: string;
  initialProject?: Project;
}

export function ProjectForm({ action, submitLabel, initialProject }: ProjectFormProps) {
  return (
    <form action={action} className="space-y-6 rounded-3xl border border-[var(--line)] bg-white p-6 shadow-[0_12px_40px_-35px_rgba(2,6,23,0.9)]">
      {initialProject ? <input type="hidden" name="id" value={initialProject.id} /> : null}
      {initialProject?.publishedAt ? (
        <input type="hidden" name="existingPublishedAt" value={initialProject.publishedAt} />
      ) : null}

      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2 text-sm font-semibold text-[var(--ink)]">
          Title
          <input
            required
            name="title"
            defaultValue={initialProject?.title}
            className="w-full rounded-xl border border-[var(--line)] px-4 py-2.5 text-sm"
          />
        </label>

        <label className="space-y-2 text-sm font-semibold text-[var(--ink)]">
          Slug
          <input
            name="slug"
            defaultValue={initialProject?.slug}
            placeholder="auto-generated if empty"
            className="w-full rounded-xl border border-[var(--line)] px-4 py-2.5 text-sm"
          />
        </label>
      </div>

      <label className="space-y-2 text-sm font-semibold text-[var(--ink)]">
        Short Description
        <textarea
          required
          name="shortDescription"
          rows={3}
          defaultValue={initialProject?.shortDescription}
          className="w-full rounded-xl border border-[var(--line)] px-4 py-2.5 text-sm"
        />
      </label>

      <label className="space-y-2 text-sm font-semibold text-[var(--ink)]">
        Full Description
        <textarea
          required
          name="description"
          rows={8}
          defaultValue={initialProject?.description}
          className="w-full rounded-xl border border-[var(--line)] px-4 py-2.5 text-sm"
        />
      </label>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2 text-sm font-semibold text-[var(--ink)]">
          Stack (comma separated)
          <input
            required
            name="stack"
            defaultValue={initialProject?.stack.join(", ")}
            className="w-full rounded-xl border border-[var(--line)] px-4 py-2.5 text-sm"
          />
        </label>

        <label className="space-y-2 text-sm font-semibold text-[var(--ink)]">
          Sort Order
          <input
            type="number"
            name="sortOrder"
            defaultValue={initialProject?.sortOrder ?? 0}
            className="w-full rounded-xl border border-[var(--line)] px-4 py-2.5 text-sm"
          />
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <label className="space-y-2 text-sm font-semibold text-[var(--ink)]">
          Live URL
          <input
            name="liveUrl"
            defaultValue={initialProject?.liveUrl ?? ""}
            className="w-full rounded-xl border border-[var(--line)] px-4 py-2.5 text-sm"
          />
        </label>

        <label className="space-y-2 text-sm font-semibold text-[var(--ink)]">
          Repo URL
          <input
            name="repoUrl"
            defaultValue={initialProject?.repoUrl ?? ""}
            className="w-full rounded-xl border border-[var(--line)] px-4 py-2.5 text-sm"
          />
        </label>

        <label className="space-y-2 text-sm font-semibold text-[var(--ink)]">
          Cover Image URL
          <input
            name="coverImage"
            defaultValue={initialProject?.coverImage ?? ""}
            className="w-full rounded-xl border border-[var(--line)] px-4 py-2.5 text-sm"
          />
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="inline-flex items-center gap-3 rounded-xl border border-[var(--line)] bg-[var(--surface-soft)] px-4 py-3 text-sm font-semibold text-[var(--ink)]">
          <input type="checkbox" name="featured" defaultChecked={initialProject?.featured ?? false} className="h-4 w-4" />
          Featured Project
        </label>

        <label className="inline-flex items-center gap-3 rounded-xl border border-[var(--line)] bg-[var(--surface-soft)] px-4 py-3 text-sm font-semibold text-[var(--ink)]">
          <input type="checkbox" name="published" defaultChecked={initialProject?.published ?? true} className="h-4 w-4" />
          Published
        </label>
      </div>

      <button className="rounded-full bg-[var(--ink)] px-6 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:bg-black">
        {submitLabel}
      </button>
    </form>
  );
}
