import Link from "next/link";
import { savePostAction } from "@/app/admin/actions";
import { PostForm } from "@/components/admin/post-form";

export default function NewBlogPage() {
  return (
    <main className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">Create</p>
          <h2 className="text-3xl font-black text-[var(--ink)]">New Blog Post</h2>
        </div>
        <Link href="/admin/blog" className="text-sm font-semibold text-[var(--muted)] underline underline-offset-4">
          Back to Blog
        </Link>
      </div>

      <PostForm action={savePostAction} submitLabel="Create Post" />
    </main>
  );
}
