import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { ProjectList } from "@/components/project-list";
import { getProjects } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Work",
  description: "Case studies from building cybersecurity SaaS: DNS firewalls, threat intelligence and real-time pipelines.",
  path: "/projects",
});

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <>
      <PageHeader index="Work" title="Selected systems.">
        Security platforms I have designed, built and run in production, with the architecture behind
        them.
      </PageHeader>
      <div className="wrap pb-24">
        <div className="border-t border-ink pt-8">
          <ProjectList projects={projects} />
        </div>
      </div>
    </>
  );
}
