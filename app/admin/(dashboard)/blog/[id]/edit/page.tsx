import Link from "next/link";
import { notFound } from "next/navigation";
import { savePostAction } from "@/app/admin/actions";
import { PostForm } from "@/components/admin/post-form";
import { getAdminPostById } from "@/lib/supabase";

interface EditBlogPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditBlogPage({ params }: EditBlogPageProps) {
  const { id } = await params;
  const post = await getAdminPostById(id);

  if (!post) {
    notFound();
  }

  return (
    <main className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">Update</p>
          <h2 className="text-3xl font-black text-[var(--ink)]">Edit Blog Post</h2>
        </div>
        <Link href="/admin/blog" className="text-sm font-semibold text-[var(--muted)] underline underline-offset-4">
          Back to Blog
        </Link>
      </div>

      <PostForm action={savePostAction} submitLabel="Save Changes" initialPost={post} />
    </main>
  );
}
