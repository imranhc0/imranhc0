import Link from "next/link";
import type { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-[22px] border-2 border-[var(--ink)] bg-[var(--paper)] p-5 shadow-[6px_6px_0_0_var(--ink)] transition hover:-translate-y-1 hover:shadow-[10px_10px_0_0_var(--ink)]">
      <div className="pointer-events-none absolute right-0 top-0 h-10 w-24 bg-[var(--accent)] opacity-80" />
      <div className="pointer-events-none absolute -bottom-6 -left-8 h-16 w-20 rotate-12 rounded-[14px] bg-[var(--accent-b)] opacity-35" />

      <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[var(--muted)]">
        {project.featured ? "Featured Build" : "Project"}
      </p>
      <h3 className="mt-2 text-2xl font-black leading-tight text-[var(--ink)]">{project.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{project.shortDescription}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.stack.slice(0, 6).map((item) => (
          <span
            key={item}
            className="rounded-full border border-[var(--ink)] bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.06em] text-[var(--ink)]"
          >
            {item}
          </span>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-3 text-xs font-black uppercase tracking-[0.12em] text-[var(--ink)]">
        <Link href={`/projects/${project.slug}`} className="rounded-full border border-[var(--ink)] bg-white px-3 py-1.5">
          Details
        </Link>
        {project.liveUrl ? (
          <a href={project.liveUrl} target="_blank" rel="noreferrer" className="rounded-full bg-[var(--ink)] px-3 py-1.5 text-white">
            Live
          </a>
        ) : null}
        {project.repoUrl ? (
          <a href={project.repoUrl} target="_blank" rel="noreferrer" className="rounded-full bg-[var(--accent-b)] px-3 py-1.5 text-[var(--ink)]">
            Code
          </a>
        ) : null}
      </div>
    </article>
  );
}
