import { getPost, getPosts } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Blog post";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);

  return renderOgImage({
    kicker: post ? `Writing · ${formatDate(post.date)}` : "Writing",
    title: post?.title ?? "Writing",
    footer: post ? `${post.readingMinutes} min read · ${post.tags.join(", ")}` : "",
  });
}
