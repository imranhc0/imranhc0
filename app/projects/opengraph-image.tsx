import { getProjects } from "@/lib/content";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Selected work by Md Imran Hossen";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  const titles = getProjects()
    .filter((project) => !project.draft)
    .map((project) => project.title);

  return renderOgImage({
    kicker: "Work · Case studies",
    title: "Selected systems.",
    footer: titles.join(" · "),
  });
}
