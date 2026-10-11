import { getPosts } from "@/lib/content";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Writing by Md Imran Hossen";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  const count = getPosts().filter((post) => !post.draft).length;

  return renderOgImage({
    kicker: "Writing",
    title: "Notes from production.",
    footer: `${count} ${count === 1 ? "post" : "posts"} on API design, distributed systems and security`,
  });
}
