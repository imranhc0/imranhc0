import type { Metadata } from "next";
import { profile, siteUrl } from "@/lib/profile";

const rss = { "application/rss+xml": [{ url: "/rss.xml", title: `${profile.name}: Writing` }] };

interface PageMetadataInput {
  /** Page title without the site-name suffix. Omit on the home page. */
  title?: string;
  description: string;
  path: string;
  article?: { publishedTime: string; modifiedTime: string; tags: string[] };
}

/**
 * Complete per-page metadata. Next.js replaces (does not merge) nested objects such as
 * openGraph, so every page builds the full set here instead of relying on the layout.
 */
export function pageMetadata({ title, description, path, article }: PageMetadataInput): Metadata {
  const fullTitle = title ?? `${profile.name} · ${profile.role}`;

  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path, types: rss },
    openGraph: {
      type: article ? "article" : "website",
      url: path,
      title: fullTitle,
      description,
      siteName: profile.name,
      locale: "en_GB",
      ...(article
        ? {
            publishedTime: article.publishedTime,
            modifiedTime: article.modifiedTime,
            authors: [siteUrl],
            tags: article.tags,
          }
        : {}),
    },
    twitter: { card: "summary_large_image", title: fullTitle, description },
  };
}

export const personId = `${siteUrl}/#person`;
export const websiteId = `${siteUrl}/#website`;

export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}
