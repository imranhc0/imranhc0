import Link from "next/link";
import { MainNav } from "@/components/site/main-nav";
import { PostCard } from "@/components/site/post-card";
import { ProjectCard } from "@/components/site/project-card";
import {
  education,
  experiences,
  highlights,
  profile,
  reference,
  skillGroups,
} from "@/lib/site-data";
import { getPublishedPosts, getPublishedProjects, hasPublicSupabaseConfig } from "@/lib/supabase";

export default async function Home() {
  const [projects, posts] = await Promise.all([
    getPublishedProjects({ featuredOnly: true, limit: 3 }),
    getPublishedPosts(3),
  ]);

  return (
    <main className="site-shell pb-20">
      <section className="mx-auto w-full max-w-6xl px-4 pt-6 md:px-6 md:pt-8">
        <MainNav />

        <div className="fade-in-up section-slab mt-8 overflow-hidden p-6 md:p-9">
          <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[var(--accent)]">Full-Stack Engineering Portfolio</p>
              <h1 className="mt-3 text-4xl font-black leading-[0.88] md:text-6xl">
                {profile.fullName}
                <span className="block text-[var(--accent-b)]">{profile.role}</span>
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">{profile.summary}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                <a href={`mailto:${profile.email}`} className="cta-dark">
                  Contact Me
                </a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="cta-light">
                  LinkedIn
                </a>
                <Link href="/projects" className="cta-light">
                  Explore Work
                </Link>
              </div>
            </div>

            <aside className="relative rounded-[18px] border-2 border-[var(--ink)] bg-white p-5">
              <div className="absolute -right-5 -top-5 h-14 w-14 rotate-12 border-2 border-[var(--ink)] bg-[var(--accent-c)]" />
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[var(--muted)]">Snapshot</p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {highlights.map((item) => (
                  <article key={item.label} className="rounded-xl border border-[var(--ink)] bg-[var(--paper)] p-3">
                    <p className="text-[10px] font-black uppercase tracking-[0.12em] text-[var(--muted)]">{item.label}</p>
                    <p className="mt-1 text-xl font-black text-[var(--ink)]">{item.value}</p>
                  </article>
                ))}
              </div>

              <div className="mt-4 rounded-xl border border-[var(--ink)] bg-[var(--surface-soft)] p-3 text-sm font-semibold text-[var(--ink)]">
                <p>{profile.location}</p>
                <p className="mt-1">{profile.phone}</p>
                <p className="mt-1">{profile.username}</p>
              </div>
            </aside>
          </div>
        </div>

        {!hasPublicSupabaseConfig() ? (
          <p className="mt-4 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-700">
            Supabase keys are missing, so the site is showing built-in fallback content.
          </p>
        ) : null}
      </section>

      <section id="experience" className="mx-auto mt-14 w-full max-w-6xl px-4 md:px-6">
        <div className="grid gap-6 md:grid-cols-[1.25fr_0.75fr]">
          <div className="section-slab fade-in-up delay-1 p-6 md:p-8">
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[var(--accent)]">Experience</p>
            <h2 className="mt-2 text-3xl font-black md:text-4xl">Production-Grade Delivery</h2>

            <div className="mt-6 space-y-5">
              {experiences.map((item) => (
                <article key={item.company} className="rounded-2xl border-2 border-[var(--ink)] bg-white p-5">
                  <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[var(--muted)]">{item.timeframe}</p>
                  <h3 className="mt-2 text-2xl font-black text-[var(--ink)]">{item.role}</h3>
                  <p className="text-sm font-semibold text-[var(--accent-b)]">{item.company} · {item.location}</p>
                  <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
                    {item.highlights.map((point) => (
                      <li key={point} className="flex gap-2">
                        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>

          <div className="section-slab fade-in-up delay-2 p-6">
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[var(--accent)]">Core Stack</p>
            <h2 className="mt-2 text-3xl font-black">Tooling Depth</h2>

            <div className="mt-5 space-y-4">
              {skillGroups.map((group) => (
                <article key={group.title} className="rounded-2xl border-2 border-[var(--ink)] bg-white p-4">
                  <h3 className="text-lg font-black">{group.title}</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <span key={skill} className="tag-chip">
                        {skill}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-14 w-full max-w-6xl px-4 md:px-6">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[var(--accent)]">Projects</p>
            <h2 className="mt-2 text-3xl font-black md:text-4xl">Featured Build Stories</h2>
          </div>
          <Link href="/projects" className="cta-light">
            All Projects
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      <section className="mx-auto mt-14 w-full max-w-6xl px-4 md:px-6">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[var(--accent)]">Writing</p>
            <h2 className="mt-2 text-3xl font-black md:text-4xl">Technical Notes & Lessons</h2>
          </div>
          <Link href="/blog" className="cta-light">
            All Posts
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      <section id="contact" className="mx-auto mt-14 w-full max-w-6xl px-4 md:px-6">
        <div className="section-slab p-6 md:p-8">
          <div className="grid gap-7 md:grid-cols-2">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[var(--accent)]">Education</p>
              <h2 className="mt-2 text-3xl font-black md:text-4xl">Academic Foundation</h2>
              <div className="mt-5 space-y-3">
                {education.map((item) => (
                  <article key={item.program} className="rounded-2xl border-2 border-[var(--ink)] bg-white p-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.13em] text-[var(--muted)]">{item.timeframe}</p>
                    <h3 className="mt-1 text-lg font-black">{item.program}</h3>
                    <p className="text-sm text-[var(--muted)]">{item.institution}</p>
                    <p className="mt-1 text-sm font-bold text-[var(--accent-b)]">{item.details}</p>
                  </article>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[var(--accent)]">Contact</p>
              <h2 className="mt-2 text-3xl font-black md:text-4xl">Let&apos;s Build Something Hard</h2>
              <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">{profile.tagline}</p>

              <div className="mt-5 rounded-2xl border-2 border-[var(--ink)] bg-white p-4 text-sm">
                <p>
                  Email: <a className="font-black" href={`mailto:${profile.email}`}>{profile.email}</a>
                </p>
                <p className="mt-2">
                  LinkedIn: <a className="font-black" href={profile.linkedin} target="_blank" rel="noreferrer">imranhc0</a>
                </p>
                <p className="mt-2">
                  Phone: <span className="font-black">{profile.phone}</span>
                </p>
              </div>

              <div className="mt-4 rounded-2xl border-2 border-[var(--ink)] bg-[var(--surface-soft)] p-4">
                <p className="text-[11px] font-black uppercase tracking-[0.13em] text-[var(--muted)]">Reference</p>
                <p className="mt-1 text-lg font-black">{reference.name}</p>
                <p className="text-sm text-[var(--muted)]">{reference.role}</p>
                <p className="mt-2 text-sm">{reference.email}</p>
                <p className="text-sm">{reference.phone}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
