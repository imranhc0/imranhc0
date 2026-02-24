import Link from "next/link";
import { formatDate, truncate } from "@/lib/format";
import type { BlogPost } from "@/lib/types";

interface PostCardProps {
  post: BlogPost;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="relative overflow-hidden rounded-[22px] border-2 border-[var(--ink)] bg-white p-5 shadow-[6px_6px_0_0_var(--ink)] transition hover:-translate-y-1 hover:shadow-[10px_10px_0_0_var(--ink)]">
      <div className="pointer-events-none absolute -right-8 -top-6 h-14 w-24 -rotate-12 bg-[var(--accent-c)] opacity-50" />

      <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[var(--muted)]">{formatDate(post.publishedAt)}</p>
      <h3 className="mt-2 text-2xl font-black leading-tight text-[var(--ink)]">{post.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{truncate(post.excerpt || post.content, 165)}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {post.tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-[var(--ink)] bg-[var(--paper)] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--ink)]"
          >
            {tag}
          </span>
        ))}
      </div>

      <Link
        href={`/blog/${post.slug}`}
        className="mt-6 inline-flex rounded-full bg-[var(--ink)] px-3 py-1.5 text-xs font-black uppercase tracking-[0.12em] text-white visited:text-white hover:text-white"
      >
        Read
      </Link>
    </article>
  );
}
