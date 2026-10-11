import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { getPost, getPosts } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { renderMarkdown } from "@/lib/markdown";
import { breadcrumbs, pageMetadata, personId } from "@/lib/metadata";
import { profile, siteUrl } from "@/lib/profile";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};

  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    article: { publishedTime: post.date, modifiedTime: post.updated ?? post.date, tags: post.tags },
  });
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const html = await renderMarkdown(post.body);
  const posts = getPosts();
  const index = posts.findIndex((item) => item.slug === post.slug);
  const newer = posts[index - 1];
  const older = posts[index + 1];

  const url = `${siteUrl}/blog/${post.slug}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        dateModified: post.updated ?? post.date,
        author: { "@type": "Person", "@id": personId, name: profile.name, url: siteUrl },
        publisher: { "@id": personId },
        mainEntityOfPage: url,
        url,
        image: `${url}/opengraph-image`,
        inLanguage: "en-GB",
        keywords: post.tags.join(", "),
        wordCount: post.body.split(/\s+/).filter(Boolean).length,
      },
      breadcrumbs([
        { name: "Home", path: "/" },
        { name: "Writing", path: "/blog" },
        { name: post.title, path: `/blog/${post.slug}` },
      ]),
    ],
  };

  return (
    <article className="wrap pt-12 pb-24 md:pt-20">
      <JsonLd data={structuredData} />
      <div className="grid gap-y-10 md:grid-cols-12 md:gap-x-6">
        <aside className="md:col-span-3">
          <div className="t-meta space-y-4 md:sticky md:top-[calc(var(--header-h)+1.5rem)]">
            <Link href="/blog" className="group inline-flex gap-2 text-ink hover:text-accent">
              <span className="arrow rotate-180">→</span> Writing
            </Link>
            <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 md:grid-cols-1 md:gap-y-0">
              <dt className="md:mt-4">Published</dt>
              <dd className="text-ink">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </dd>
              {post.updated ? (
                <>
                  <dt className="md:mt-3">Updated</dt>
                  <dd className="text-ink">
                    <time dateTime={post.updated}>{formatDate(post.updated)}</time>
                  </dd>
                </>
              ) : null}
              <dt className="md:mt-3">Reading time</dt>
              <dd className="text-ink">{post.readingMinutes} min</dd>
              {post.tags.length > 0 ? (
                <>
                  <dt className="md:mt-3">Tags</dt>
                  <dd className="text-ink">{post.tags.join(", ")}</dd>
                </>
              ) : null}
            </dl>
          </div>
        </aside>

        <div className="md:col-span-9">
          <header className="border-b border-line pb-10">
            {post.draft ? <p className="t-meta mb-4 text-signal">Draft, not published</p> : null}
            <h1 className="t-headline max-w-[22ch]">{post.title}</h1>
            <p className="t-lede mt-6 max-w-[52ch] text-ink-2">{post.description}</p>
          </header>

          <div className="prose mt-10" dangerouslySetInnerHTML={{ __html: html }} />

          <nav aria-label="More writing" className="mt-20 grid border-t border-ink sm:grid-cols-2">
            {older ? (
              <Link href={`/blog/${older.slug}`} className="group border-b border-line py-6 sm:border-b-0 sm:pr-6">
                <span className="t-meta">← Older</span>
                <span className="t-heading mt-2 block group-hover:text-accent">{older.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {newer ? (
              <Link
                href={`/blog/${newer.slug}`}
                className="group py-6 sm:border-l sm:border-line sm:pl-6 sm:text-right"
              >
                <span className="t-meta">Newer →</span>
                <span className="t-heading mt-2 block group-hover:text-accent">{newer.title}</span>
              </Link>
            ) : null}
          </nav>
        </div>
      </div>
    </article>
  );
}
