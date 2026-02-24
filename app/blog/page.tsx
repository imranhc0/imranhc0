import Link from "next/link";
import { MainNav } from "@/components/site/main-nav";
import { PostCard } from "@/components/site/post-card";
import { getPublishedPosts } from "@/lib/supabase";

export const metadata = {
  title: "Blog | Md Imran Hossen",
};

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <main className="site-shell pb-20">
      <section className="mx-auto w-full max-w-6xl px-4 pt-6 md:px-6 md:pt-8">
        <MainNav />

        <div className="section-slab mt-8 p-6 md:p-8">
          <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[var(--accent)]">Writing</p>
          <h1 className="mt-2 text-4xl font-black md:text-5xl">Blog</h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
            Notes on architecture, secure engineering, and real-world lessons from shipping SaaS products.
          </p>

          <div className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          <div className="mt-6">
            <Link href="/" className="cta-light">
              Back Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
