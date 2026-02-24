import Link from "next/link";
import { notFound } from "next/navigation";
import { MainNav } from "@/components/site/main-nav";
import { formatDate } from "@/lib/format";
import { getPublishedProjectBySlug } from "@/lib/supabase";

interface ProjectDetailsPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectDetailsPage({ params }: ProjectDetailsPageProps) {
  const { slug } = await params;
  const project = await getPublishedProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="site-shell pb-20">
      <section className="mx-auto w-full max-w-5xl px-4 pt-6 md:px-6 md:pt-8">
        <MainNav />

        <article className="section-slab mt-8 p-7 md:p-10">
          <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[var(--accent)]">Project Case Study</p>
          <h1 className="mt-3 text-4xl font-black leading-tight md:text-5xl">{project.title}</h1>
          <p className="mt-3 text-sm font-semibold text-[var(--muted)]">Published {formatDate(project.publishedAt)}</p>
          <p className="mt-5 text-base leading-relaxed text-[var(--muted)]">{project.shortDescription}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <span key={item} className="tag-chip">
                {item}
              </span>
            ))}
          </div>

          <div className="markdown-content mt-8 rounded-2xl border-2 border-[var(--ink)] bg-white p-5 text-sm">
            {project.description.split("\n").map((line, index) => (
              <p key={`${line}-${index}`}>{line}</p>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {project.liveUrl ? (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="cta-dark">
                Open Live
              </a>
            ) : null}
            {project.repoUrl ? (
              <a href={project.repoUrl} target="_blank" rel="noreferrer" className="cta-light">
                Repository
              </a>
            ) : null}
            <Link href="/projects" className="cta-light">
              Back to Projects
            </Link>
          </div>
        </article>
      </section>
    </main>
  );
}
