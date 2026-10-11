import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, getProjects } from "@/lib/content";
import { renderMarkdown } from "@/lib/markdown";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: { title: project.title, description: project.summary },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const html = await renderMarkdown(project.body);
  const projects = getProjects();
  const next = projects[(projects.findIndex((item) => item.slug === project.slug) + 1) % projects.length];

  const facts = [
    ["Role", project.role],
    ["Company", project.company],
    ["Domain", project.domain],
    ["Period", project.period],
  ].filter((fact): fact is [string, string] => Boolean(fact[1]));

  return (
    <article className="wrap pt-12 pb-24 md:pt-20">
      <Link href="/projects" className="group t-meta inline-flex gap-2 text-ink hover:text-accent">
        <span className="arrow rotate-180">→</span> Work
      </Link>

      <header className="mt-8 pb-12 md:pb-16">
        {project.draft ? <p className="t-meta mb-4 text-signal">Draft, not published</p> : null}
        <h1 className="t-page">{project.title}</h1>
        <p className="t-lede mt-6 max-w-[48ch] text-ink-2">{project.summary}</p>
      </header>

      <dl className="grid border-t border-ink sm:grid-cols-2 lg:grid-cols-4">
        {facts.map(([label, value]) => (
          <div
            key={label}
            className="border-b border-line py-5 sm:pr-6 lg:border-b-0 lg:border-l lg:px-5 lg:first:border-l-0 lg:first:pl-0"
          >
            <dt className="t-meta">{label}</dt>
            <dd className="mt-2 leading-snug">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-16 grid gap-y-10 border-t border-line pt-10 md:grid-cols-12 md:gap-x-6">
        <aside className="md:col-span-3">
          <div className="md:sticky md:top-[calc(var(--header-h)+1.5rem)]">
            <h2 className="t-meta">Stack</h2>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 md:flex-col">
              {project.stack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            {project.live || project.repo ? (
              <div className="mt-8 flex flex-col gap-2">
                {project.live ? (
                  <a href={project.live} className="link">
                    Live site ↗
                  </a>
                ) : null}
                {project.repo ? (
                  <a href={project.repo} className="link">
                    Source code ↗
                  </a>
                ) : null}
              </div>
            ) : null}
          </div>
        </aside>
        <div className="prose md:col-span-9" dangerouslySetInnerHTML={{ __html: html }} />
      </div>

      {next && next.slug !== project.slug ? (
        <Link
          href={`/projects/${next.slug}`}
          className="group mt-24 flex items-end justify-between gap-6 border-t border-ink pt-6"
        >
          <span>
            <span className="t-meta">Next project</span>
            <span className="t-headline mt-3 block group-hover:text-accent">{next.title}</span>
          </span>
          <span aria-hidden="true" className="arrow text-3xl text-ink-3 group-hover:text-accent">
            →
          </span>
        </Link>
      ) : null}
    </article>
  );
}
