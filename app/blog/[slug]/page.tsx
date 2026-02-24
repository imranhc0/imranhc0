import Link from "next/link";
import { notFound } from "next/navigation";
import { MainNav } from "@/components/site/main-nav";
import { formatDate } from "@/lib/format";
import { getPublishedPostBySlug } from "@/lib/supabase";

interface BlogDetailsPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogDetailsPage({ params }: BlogDetailsPageProps) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="site-shell pb-20">
      <section className="mx-auto w-full max-w-4xl px-4 pt-6 md:px-6 md:pt-8">
        <MainNav />

        <article className="section-slab mt-8 p-7 md:p-10">
          <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[var(--accent)]">Article</p>
          <h1 className="mt-3 text-4xl font-black leading-tight md:text-5xl">{post.title}</h1>
          <p className="mt-3 text-sm font-semibold text-[var(--muted)]">Published {formatDate(post.publishedAt)}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="tag-chip">
                {tag}
              </span>
            ))}
          </div>

          <div className="markdown-content mt-8 rounded-2xl border-2 border-[var(--ink)] bg-white p-5 text-sm">
            {post.content.split("\n").map((line, index) => {
              if (line.startsWith("## ")) {
                return <h2 key={`${line}-${index}`}>{line.replace("## ", "")}</h2>;
              }

              if (line.startsWith("### ")) {
                return <h3 key={`${line}-${index}`}>{line.replace("### ", "")}</h3>;
              }

              if (!line.trim()) {
                return <p key={`${line}-${index}`}>{" "}</p>;
              }

              return <p key={`${line}-${index}`}>{line}</p>;
            })}
          </div>

          <div className="mt-8">
            <Link href="/blog" className="cta-light">
              Back to Blog
            </Link>
          </div>
        </article>
      </section>
    </main>
  );
}
