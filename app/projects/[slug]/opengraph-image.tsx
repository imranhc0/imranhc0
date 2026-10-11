import { getProject, getProjects } from "@/lib/content";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Project case study";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug);

  return renderOgImage({
    kicker: project ? `Case study · ${project.domain}` : "Case study",
    title: project?.title ?? "Work",
    footer: project ? project.stack.slice(0, 5).join(" / ") : "",
  });
}
