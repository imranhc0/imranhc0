import Link from "next/link";
import { MainNav } from "@/components/site/main-nav";
import { ProjectCard } from "@/components/site/project-card";
import { getPublishedProjects } from "@/lib/supabase";

export const metadata = {
  title: "Projects | Md Imran Hossen",
};

export default async function ProjectsPage() {
  const projects = await getPublishedProjects();

  return (
    <main className="site-shell pb-20">
      <section className="mx-auto w-full max-w-6xl px-4 pt-6 md:px-6 md:pt-8">
        <MainNav />

        <div className="section-slab mt-8 p-6 md:p-8">
          <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[var(--accent)]">Portfolio</p>
          <h1 className="mt-2 text-4xl font-black md:text-5xl">Projects</h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
            Production systems and product builds focused on cyber security, real-time data, and practical UX.
          </p>

          <div className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          <div className="mt-6">
            <Link href="/" className="cta-light">
              Back Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
