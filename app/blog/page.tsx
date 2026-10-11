import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { PostList } from "@/components/post-list";
import { getPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Writing",
  description: "Notes on API design, distributed systems and shipping security software safely.",
  alternates: {
    canonical: "/blog",
    types: { "application/rss+xml": [{ url: "/rss.xml", title: "Writing" }] },
  },
};

export default function BlogPage() {
  const posts = getPosts();
  const years = [...new Set(posts.map((post) => post.date.slice(0, 4)))];

  return (
    <>
      <PageHeader index="Writing" title="Notes from production.">
        API design, distributed systems and shipping security software without breaking it.
      </PageHeader>

      <div className="wrap pb-24">
        {posts.length === 0 ? (
          <p className="border-t border-ink pt-6 text-ink-2">Nothing published yet.</p>
        ) : (
          years.map((year) => (
            <section key={year} className="grid border-t border-ink pt-6 pb-16 md:grid-cols-12 md:gap-x-6">
              <h2 className="t-title mb-6 md:col-span-3 md:mb-0">{year}</h2>
              <div className="md:col-span-9">
                <PostList posts={posts.filter((post) => post.date.startsWith(year))} />
              </div>
            </section>
          ))
        )}
      </div>
    </>
  );
}
