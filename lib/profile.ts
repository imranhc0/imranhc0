import fs from "node:fs";
import path from "node:path";

export const profile = {
  name: "Md Imran Hossen",
  role: "Full-Stack Engineer & Team Lead",
  currentTitle: "Team Lead, Software Engineering",
  company: "Pipeline Co., Ltd",
  headline:
    "Full-stack engineer and team lead building cybersecurity SaaS: API-first microservices in Python and Node.js, real-time pipelines on Kafka and WebSockets, and the React and Next.js interfaces on top.",
  description:
    "Full-stack engineer and team lead building cybersecurity SaaS: microservices, event-driven systems and real-time threat-intelligence platforms. Based in Dhaka, open to roles in Europe.",
  location: "Dhaka, Bangladesh",
  timezone: "Asia/Dhaka",
  utcOffset: "UTC+6",
  availability: "Open to relocating to Europe or working remotely with CET overlap.",
  email: "imranhosein.cse@gmail.com",
  github: "https://github.com/imranhc0",
  githubHandle: "imranhc0",
  linkedin: "https://www.linkedin.com/in/imranhc0/",
  linkedinHandle: "imranhc0",
  sourceRepo: "https://github.com/imranhc0/imranhc0",
  careerStart: "2023-03-01",
};

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");

export const resumePath = "/resume.pdf";

/** The CV link only renders when public/resume.pdf exists at build time. */
export function hasResume(): boolean {
  return fs.existsSync(path.join(process.cwd(), "public", "resume.pdf"));
}

/** "3 yrs 7 mos", counted the way LinkedIn does. Computed at build time. */
export function tenure(startIso: string, end: Date = new Date()): string {
  const start = new Date(startIso);
  const months =
    (end.getUTCFullYear() - start.getUTCFullYear()) * 12 + (end.getUTCMonth() - start.getUTCMonth());
  const years = Math.floor(months / 12);
  const rest = months % 12;
  return [years && `${years} yr${years > 1 ? "s" : ""}`, rest && `${rest} mo${rest > 1 ? "s" : ""}`]
    .filter(Boolean)
    .join(" ");
}

export const principles = [
  {
    title: "Contracts first",
    body: "API contracts, data models and service boundaries get agreed before implementation. Validation lives at the edge, so the core can trust its inputs.",
  },
  {
    title: "Standards over heroics",
    body: "Review standards and shared conventions let a team move quickly without depending on any one person to hold the system in their head.",
  },
  {
    title: "Small, reversible releases",
    body: "Typed checks, end-to-end tests and CI gates on every change. Deploying is routine, and so is rolling back.",
  },
];

export interface Role {
  title: string;
  start: string;
  end: string | null;
  location: string;
  highlights: { area: string; text: string }[];
}

export interface Employer {
  company: string;
  sector: string;
  start: string;
  roles: Role[];
}

export const experience: Employer[] = [
  {
    company: "Pipeline Co., Ltd",
    sector: "Cybersecurity SaaS",
    start: "2023-03-01",
    roles: [
      {
        title: "Team Lead, Software Engineering",
        start: "2026-08-01",
        end: null,
        location: "Dhaka, Bangladesh · Hybrid",
        highlights: [
          {
            area: "Leadership",
            text: "Lead and mentor a team of engineers, accountable for technical quality, professional growth and delivery.",
          },
          {
            area: "Architecture",
            text: "Guide technical decisions and set the standards for API contracts, data modelling and service boundaries.",
          },
          {
            area: "Delivery",
            text: "Run sprint planning, task delegation and progress tracking across engineering initiatives.",
          },
          {
            area: "Collaboration",
            text: "Work with product and security stakeholders to surface technical risks early and keep delivery unblocked.",
          },
          {
            area: "Hands-on",
            text: "Still ship critical-path features across Python, Django, React, Next.js and TypeScript.",
          },
        ],
      },
      {
        title: "Software Engineer",
        start: "2025-07-01",
        end: "2026-08-01",
        location: "Tokyo, Japan · Remote",
        highlights: [
          {
            area: "Microservices",
            text: "Designed and maintained microservices for the security platform in Node.js (Express) and Python (Django, Flask), API-first.",
          },
          {
            area: "Real-time",
            text: "Built and optimised REST APIs and real-time communication on Kafka and WebSockets.",
          },
          {
            area: "Data",
            text: "Optimised schemas and ran data pipelines across PostgreSQL and MongoDB with Prisma, with data integrity as the constraint.",
          },
          {
            area: "Full-stack",
            text: "Built the React, Next.js and TypeScript interfaces on top of those services, owning features end to end.",
          },
          {
            area: "Mentoring",
            text: "Mentored junior developers and led code reviews.",
          },
        ],
      },
      {
        title: "Frontend Developer",
        start: "2023-03-01",
        end: "2025-07-01",
        location: "Remote",
        highlights: [
          {
            area: "Frontend",
            text: "Built web applications with React, Next.js, TypeScript and Redux.",
          },
          {
            area: "UI",
            text: "Turned detailed Figma designs into accessible, production interfaces.",
          },
          {
            area: "Testing",
            text: "Wrote end-to-end tests with Cypress to keep releases stable across browsers.",
          },
          {
            area: "Delivery",
            text: "Managed CI/CD pipelines in GitHub Actions deploying to AWS.",
          },
          {
            area: "Backend",
            text: "Supported backend work in Python, Flask and Jinja2.",
          },
        ],
      },
    ],
  },
];

export const stack: { layer: string; items: string[] }[] = [
  { layer: "Languages", items: ["TypeScript", "JavaScript", "Python"] },
  {
    layer: "Backend",
    items: ["Node.js", "Express", "Django", "Flask", "Go (Gin)", "REST APIs", "Microservices"],
  },
  { layer: "Events", items: ["Kafka", "WebSockets", "Celery", "Caching"] },
  {
    layer: "Data",
    items: ["PostgreSQL", "TimescaleDB", "MongoDB", "DynamoDB", "Redis", "Pinecone", "Prisma"],
  },
  {
    layer: "Frontend",
    items: ["React", "Next.js", "Redux", "Zustand", "Tailwind CSS", "MUI", "Cypress"],
  },
  { layer: "Security", items: ["JWT", "RBAC", "Zod", "API-first design"] },
  { layer: "Infrastructure", items: ["AWS", "Docker", "GitHub Actions", "CI/CD", "Git"] },
  {
    layer: "Leadership",
    items: ["Mentoring", "Code review", "Sprint planning", "Stakeholder communication"],
  },
];

export const education = [
  {
    program: "BSc in Computer Science and Engineering",
    institution: "East Delta University",
    period: "Final year",
  },
  {
    program: "Diploma in Computer Science Technology",
    institution: "Patuakhali Polytechnic Institute",
    period: "Aug 2018 – Jan 2023",
  },
];

export const languages = "English, Bengali (native)";

export const offTheClock = "Competitive programming, cricket, football and novels.";
