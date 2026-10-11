import type { MetadataRoute } from "next";
import { getPosts, getProjects } from "@/lib/content";
import { siteUrl } from "@/lib/profile";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPosts().filter((post) => !post.draft);
  const projects = getProjects().filter((project) => !project.draft);
  // Pages listing posts change when a post is published or updated.
  const latestPost = posts.map((post) => post.updated ?? post.date).sort().at(-1);

  return [
    { url: siteUrl, lastModified: latestPost, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/projects`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/blog`, lastModified: latestPost, changeFrequency: "weekly", priority: 0.8 },
    ...projects.map((project) => ({ url: `${siteUrl}/projects/${project.slug}`, priority: 0.7 })),
    ...posts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: post.updated ?? post.date,
      priority: 0.6,
    })),
  ];
}
