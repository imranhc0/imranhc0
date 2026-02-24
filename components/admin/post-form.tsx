import type { BlogPost } from "@/lib/types";

interface PostFormProps {
  action: (formData: FormData) => void | Promise<void>;
  submitLabel: string;
  initialPost?: BlogPost;
}

export function PostForm({ action, submitLabel, initialPost }: PostFormProps) {
  return (
    <form action={action} className="space-y-6 rounded-3xl border border-[var(--line)] bg-white p-6 shadow-[0_12px_40px_-35px_rgba(2,6,23,0.9)]">
      {initialPost ? <input type="hidden" name="id" value={initialPost.id} /> : null}
      {initialPost?.publishedAt ? (
        <input type="hidden" name="existingPublishedAt" value={initialPost.publishedAt} />
      ) : null}

      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2 text-sm font-semibold text-[var(--ink)]">
          Title
          <input
            required
            name="title"
            defaultValue={initialPost?.title}
            className="w-full rounded-xl border border-[var(--line)] px-4 py-2.5 text-sm"
          />
        </label>

        <label className="space-y-2 text-sm font-semibold text-[var(--ink)]">
          Slug
          <input
            name="slug"
            defaultValue={initialPost?.slug}
            placeholder="auto-generated if empty"
            className="w-full rounded-xl border border-[var(--line)] px-4 py-2.5 text-sm"
          />
        </label>
      </div>

      <label className="space-y-2 text-sm font-semibold text-[var(--ink)]">
        Excerpt
        <textarea
          required
          name="excerpt"
          rows={3}
          defaultValue={initialPost?.excerpt}
          className="w-full rounded-xl border border-[var(--line)] px-4 py-2.5 text-sm"
        />
      </label>

      <label className="space-y-2 text-sm font-semibold text-[var(--ink)]">
        Content (Markdown friendly)
        <textarea
          required
          name="content"
          rows={12}
          defaultValue={initialPost?.content}
          className="w-full rounded-xl border border-[var(--line)] px-4 py-2.5 text-sm"
        />
      </label>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2 text-sm font-semibold text-[var(--ink)]">
          Tags (comma separated)
          <input
            name="tags"
            defaultValue={initialPost?.tags.join(", ")}
            className="w-full rounded-xl border border-[var(--line)] px-4 py-2.5 text-sm"
          />
        </label>

        <label className="space-y-2 text-sm font-semibold text-[var(--ink)]">
          Cover Image URL
          <input
            name="coverImage"
            defaultValue={initialPost?.coverImage ?? ""}
            className="w-full rounded-xl border border-[var(--line)] px-4 py-2.5 text-sm"
          />
        </label>
      </div>

      <label className="inline-flex items-center gap-3 rounded-xl border border-[var(--line)] bg-[var(--surface-soft)] px-4 py-3 text-sm font-semibold text-[var(--ink)]">
        <input type="checkbox" name="published" defaultChecked={initialPost?.published ?? true} className="h-4 w-4" />
        Published
      </label>

      <button className="rounded-full bg-[var(--ink)] px-6 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:bg-black">
        {submitLabel}
      </button>
    </form>
  );
}
