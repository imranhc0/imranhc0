import Link from "next/link";
import type { Post } from "@/lib/content";
import { formatDate } from "@/lib/format";

export function PostList({ posts }: { posts: Post[] }) {
  return (
    <ul className="[&>li:first-child>a]:pt-0">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link
            href={`/blog/${post.slug}`}
            className="group grid gap-x-6 gap-y-1.5 border-b border-line py-6 sm:grid-cols-[7.5rem_1fr_auto] sm:items-baseline"
          >
            <time dateTime={post.date} className="t-meta">
              {formatDate(post.date)}
            </time>
            <div>
              <h3 className="t-heading transition-colors duration-200 group-hover:text-accent">
                {post.title}
                {post.draft ? <span className="t-meta ml-3 align-middle">draft</span> : null}
              </h3>
              <p className="mt-1.5 max-w-[60ch] text-ink-2">{post.description}</p>
            </div>
            <span className="t-meta whitespace-nowrap">{post.readingMinutes} min read</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
