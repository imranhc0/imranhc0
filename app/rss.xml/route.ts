import { getPosts } from "@/lib/content";
import { profile, siteUrl } from "@/lib/profile";

export const dynamic = "force-static";

const escape = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function GET() {
  const posts = getPosts().filter((post) => !post.draft);

  const items = posts
    .map(
      (post) => `    <item>
      <title>${escape(post.title)}</title>
      <link>${siteUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${siteUrl}/blog/${post.slug}</guid>
      <description>${escape(post.description)}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
${post.tags.map((tag) => `      <category>${escape(tag)}</category>`).join("\n")}
    </item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(profile.name)}: Writing</title>
    <link>${siteUrl}/blog</link>
    <description>${escape(profile.description)}</description>
    <language>en-gb</language>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
