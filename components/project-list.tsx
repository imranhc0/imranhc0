import Link from "next/link";
import type { Project } from "@/lib/content";
import { pad } from "@/lib/format";

export function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <ul className="[&>li:first-child>a]:pt-0">
      {projects.map((project, index) => (
        <li key={project.slug}>
          <Link
            href={`/projects/${project.slug}`}
            className="group grid gap-x-6 gap-y-3 border-b border-line py-8 sm:grid-cols-[3rem_1fr_auto]"
          >
            <span className="t-meta pt-2">{pad(index)}</span>
            <div>
              <h3 className="t-headline transition-colors duration-200 group-hover:text-accent">
                {project.title}
                {project.draft ? <span className="t-meta ml-3 align-middle">draft</span> : null}
              </h3>
              <p className="mt-3 max-w-[58ch] text-ink-2">{project.summary}</p>
              <dl className="t-meta mt-5 grid gap-y-1">
                <dt className="sr-only">Domain and role</dt>
                <dd className="text-ink">
                  {project.domain} · {project.role}
                </dd>
                <dt className="sr-only">Stack</dt>
                <dd>{project.stack.slice(0, 6).join(" / ")}</dd>
              </dl>
            </div>
            <span aria-hidden="true" className="arrow hidden self-center text-2xl text-ink-3 group-hover:text-accent sm:block">
              →
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
