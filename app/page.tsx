import type { Metadata } from "next";
import Link from "next/link";
import { DnsFigure } from "@/components/dns-figure";
import { JsonLd } from "@/components/json-ld";
import { PostList } from "@/components/post-list";
import { ProjectList } from "@/components/project-list";
import { Section } from "@/components/section";
import { getPosts, getProjects } from "@/lib/content";
import { formatRange, pad } from "@/lib/format";
import { pageMetadata, personId, websiteId } from "@/lib/metadata";
import {
  education,
  experience,
  hasResume,
  languages,
  offTheClock,
  principles,
  profile,
  resumePath,
  siteUrl,
  stack,
  tenure,
} from "@/lib/profile";

export const metadata: Metadata = pageMetadata({ description: profile.description, path: "/" });

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: siteUrl,
      name: profile.name,
      description: profile.description,
      inLanguage: "en-GB",
      publisher: { "@id": personId },
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}/#profile`,
      url: siteUrl,
      name: `${profile.name} · ${profile.role}`,
      isPartOf: { "@id": websiteId },
      mainEntity: { "@id": personId },
      inLanguage: "en-GB",
    },
    {
      "@type": "Person",
      "@id": personId,
      name: profile.name,
      jobTitle: profile.currentTitle,
      description: profile.description,
      url: siteUrl,
      email: `mailto:${profile.email}`,
      worksFor: { "@type": "Organization", name: profile.company },
      address: { "@type": "PostalAddress", addressLocality: "Dhaka", addressCountry: "BD" },
      alumniOf: education.map((item) => ({ "@type": "EducationalOrganization", name: item.institution })),
      knowsLanguage: ["en", "bn"],
      knowsAbout: stack.flatMap((group) => group.items).slice(0, 30),
      sameAs: [profile.github, profile.linkedin],
    },
  ],
};

export default function Home() {
  const projects = getProjects();
  const featured = projects.filter((project) => project.featured);
  const posts = getPosts().slice(0, 3);
  const resume = hasResume();

  const facts = [
    ["Role", `${profile.currentTitle}, ${profile.company}`],
    ["Experience", `${tenure(profile.careerStart)}, promoted twice`],
    ["Focus", "Microservices, event-driven systems, security SaaS"],
    ["Availability", "Relocation to Europe, or remote with CET overlap"],
  ];

  return (
    <>
      <JsonLd data={structuredData} />

      {/* Hero */}
      <section className="wrap pt-12 pb-14 md:pt-20 md:pb-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-6">
          <div className="lg:col-span-7">
            <p className="t-meta">
              {profile.currentTitle} · {profile.location}
            </p>
            <h1 className="t-display mt-6">
              Md Imran
              <br />
              Hossen<span className="text-accent">.</span>
            </h1>
            <p className="t-lede mt-8 max-w-[44ch] text-ink-2">{profile.headline}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href={`mailto:${profile.email}`} className="btn btn-primary">
                Email me <span className="arrow">→</span>
              </a>
              <a href={profile.linkedin} rel="me" className="btn btn-ghost">
                LinkedIn
              </a>
              <a href={profile.github} rel="me" className="btn btn-ghost">
                GitHub
              </a>
              {resume ? (
                <a href={resumePath} className="btn btn-ghost">
                  Download CV <span className="t-meta text-current">PDF</span>
                </a>
              ) : null}
            </div>
          </div>
          <div className="lg:col-span-5">
            <DnsFigure />
          </div>
        </div>
      </section>

      {/* At a glance */}
      <section className="wrap mb-24 md:mb-32" aria-label="At a glance">
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
      </section>

      <Section id="profile" index="01" title="Profile">
        <div className="t-lede max-w-[54ch] space-y-5">
          <p>
            I joined{" "}
            <a href={profile.companyUrl} className="link">
              {profile.company}
            </a>
            , a Japanese cyber-intelligence company, as a frontend developer in March 2023, working
            full-time and remotely with its Dhaka team. I moved into backend and
            microservices work as a software engineer, and since August 2026 I have led an
            engineering team in Dhaka while staying hands-on.
          </p>
          <p className="text-ink-2">
            Most of my work sits where security products get hard: API-first services in Python and
            Node.js, event-driven pipelines on Kafka, WebSockets and Celery, and data models that
            hold up under high-volume, time-series threat data.
          </p>
        </div>
        <ol className="mt-14 grid border-t border-line md:grid-cols-3">
          {principles.map((principle, index) => (
            <li
              key={principle.title}
              className="border-b border-line py-6 md:border-b-0 md:pr-6 md:not-first:border-l md:not-first:pl-6"
            >
              <p className="t-meta">{pad(index)}</p>
              <h3 className="t-heading mt-3">{principle.title}</h3>
              <p className="mt-2 text-ink-2">{principle.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="experience" index="02" title="Experience">
        {experience.map((employer) => (
          <article key={employer.company}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
              <h3 className="t-headline">
                <a href={employer.url} className="transition-colors duration-200 hover:text-accent">
                  {employer.company}
                </a>
              </h3>
              <p className="t-meta">
                {employer.sector} · {formatRange(employer.start, null)} · {tenure(employer.start)}
              </p>
            </div>
            <ol className="mt-10 border-t border-line">
              {employer.roles.map((role, index) => (
                <li
                  key={role.title}
                  className="grid gap-x-6 gap-y-4 border-b border-line py-8 sm:grid-cols-[11rem_1fr]"
                >
                  <div>
                    <p className="t-meta text-ink">{formatRange(role.start, role.end)}</p>
                    <p className="t-meta">
                      {tenure(role.start, role.end ? new Date(role.end) : undefined)}
                    </p>
                    <p className="t-meta mt-1">
                      {role.location.split(" · ").map((part) => (
                        <span key={part} className="block">
                          {part}
                        </span>
                      ))}
                    </p>
                    {index < employer.roles.length - 1 ? (
                      <p className="t-meta mt-3 text-accent">↑ Promoted</p>
                    ) : null}
                  </div>
                  <div>
                    <h4 className="t-heading">{role.title}</h4>
                    <dl className="mt-5 grid gap-y-3">
                      {role.highlights.map((highlight) => (
                        <div key={highlight.area} className="grid gap-x-4 gap-y-0.5 sm:grid-cols-[8rem_1fr]">
                          <dt className="t-meta pt-[0.2rem]">{highlight.area}</dt>
                          <dd className="text-ink-2">{highlight.text}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </li>
              ))}
            </ol>
          </article>
        ))}
      </Section>

      <Section id="work" index="03" title="Selected work">
        <ProjectList projects={featured} />
        {projects.length > featured.length ? (
          <Link href="/projects" className="group t-meta mt-6 inline-flex gap-2 text-ink hover:text-accent">
            All projects <span className="arrow">→</span>
          </Link>
        ) : null}
      </Section>

      <Section id="stack" index="04" title="Stack">
        <dl className="[&>div:first-child]:pt-0">
          {stack.map((group) => (
            <div
              key={group.layer}
              className="grid gap-x-6 gap-y-2 border-b border-line py-4 sm:grid-cols-[9.5rem_1fr]"
            >
              <dt className="t-meta pt-1">{group.layer}</dt>
              <dd>
                <ul className="flex flex-wrap gap-x-5 gap-y-1">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      {posts.length > 0 ? (
        <Section id="writing" index="05" title="Writing">
          <PostList posts={posts} />
          <Link href="/blog" className="group t-meta mt-6 inline-flex gap-2 text-ink hover:text-accent">
            All writing <span className="arrow">→</span>
          </Link>
        </Section>
      ) : null}

      <Section id="education" index="06" title="Education">
        <ul className="[&>li:first-child]:pt-0">
          {education.map((item) => (
            <li
              key={item.program}
              className="grid gap-x-6 gap-y-1 border-b border-line py-5 sm:grid-cols-[1fr_auto] sm:items-baseline"
            >
              <div>
                <h3 className="t-heading">{item.program}</h3>
                <p className="mt-1 text-ink-2">{item.institution}</p>
              </div>
              <p className="t-meta">{item.period}</p>
            </li>
          ))}
        </ul>
        <dl className="mt-10 grid gap-6 sm:grid-cols-2">
          <div>
            <dt className="t-meta">Languages</dt>
            <dd className="mt-1.5">{languages}</dd>
          </div>
          <div>
            <dt className="t-meta">Off the clock</dt>
            <dd className="mt-1.5">{offTheClock}</dd>
          </div>
        </dl>
      </Section>

      {/* Contact */}
      <section id="contact" aria-labelledby="contact-title" className="bg-accent-surface text-on-accent">
        <div className="wrap grid gap-14 py-20 md:py-28 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-8">
            <p className="t-meta text-on-accent/75">07 · Contact</p>
            <h2 id="contact-title" className="t-page mt-4">
              Hiring in Europe?
              <br />
              Let&rsquo;s talk.
            </h2>
            <a
              href={`mailto:${profile.email}`}
              className="mt-10 inline-block text-[clamp(1.15rem,0.7rem+1.9vw,2.25rem)] font-medium break-all underline decoration-on-accent/40 decoration-1 underline-offset-[0.25em] transition-colors hover:decoration-on-accent"
            >
              {profile.email}
            </a>
          </div>
          <dl className="grid content-end gap-5 lg:col-span-4">
            <div>
              <dt className="t-meta text-on-accent/75">Based in</dt>
              <dd className="mt-1">
                {profile.location} ({profile.utcOffset})
              </dd>
            </div>
            <div>
              <dt className="t-meta text-on-accent/75">Availability</dt>
              <dd className="mt-1">{profile.availability}</dd>
            </div>
            <div>
              <dt className="t-meta text-on-accent/75">Elsewhere</dt>
              <dd className="mt-1 flex flex-wrap gap-x-4">
                <a href={profile.linkedin} className="underline decoration-on-accent/40 underline-offset-4 hover:decoration-on-accent">
                  LinkedIn
                </a>
                <a href={profile.github} className="underline decoration-on-accent/40 underline-offset-4 hover:decoration-on-accent">
                  GitHub
                </a>
                {resume ? (
                  <a href={resumePath} className="underline decoration-on-accent/40 underline-offset-4 hover:decoration-on-accent">
                    CV (PDF)
                  </a>
                ) : null}
              </dd>
            </div>
            <div>
              <dt className="t-meta text-on-accent/75">References</dt>
              <dd className="mt-1">Available on request</dd>
            </div>
          </dl>
        </div>
      </section>
    </>
  );
}
