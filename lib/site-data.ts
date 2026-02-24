import type { BlogPost, EducationItem, ExperienceItem, Project, SkillGroup } from "@/lib/types";

export const profile = {
  fullName: "Md Imran Hossen",
  role: "Software Engineer",
  tagline: "Building resilient full-stack products from APIs to polished user experiences.",
  summary:
    "Software Engineer with 3+ years of experience in Node.js, TypeScript, React, Next.js, Python, and distributed systems. I ship secure, API-first products with production-grade CI/CD, observability, and performance in mind.",
  location: "Dhaka, Bangladesh",
  email: "imranhosein.cse@gmail.com",
  phone: "+8801304416484",
  username: "@imranhc0",
  linkedin: "https://www.linkedin.com/in/imranhc0/",
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend Engineering",
    items: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Redux",
      "Tailwind CSS",
      "Zustand",
      "React Testing Library",
    ],
  },
  {
    title: "Backend & Data",
    items: [
      "Node.js",
      "Express",
      "MongoDB",
      "PostgreSQL",
      "Prisma",
      "JWT",
      "ZOD",
      "REST APIs",
      "Python",
      "Django",
      "Flask",
      "Kafka",
      "WebSocket",
    ],
  },
  {
    title: "DevOps & Delivery",
    items: ["CI/CD", "Git", "GitHub Actions", "Docker", "AWS", "Postman"],
  },
];

export const experiences: ExperienceItem[] = [
  {
    company: "Pipeline Co., Ltd",
    role: "Software Engineer",
    timeframe: "March 2023 - Present",
    location: "Remote",
    highlights: [
      "Built microservices for a cyber security SaaS platform using Node.js (Express) and Python (Django/Flask).",
      "Implemented JWT-based authentication and role-based authorization across services.",
      "Developed and integrated REST APIs, Kafka pipelines, and WebSocket channels for real-time features.",
      "Worked with PostgreSQL, MongoDB, Prisma, and ZOD validation for robust data flows.",
      "Delivered React dashboards using Redux and Zustand with strong UX performance.",
      "Automated CI/CD via GitHub Actions and contributed to architecture and code review standards.",
    ],
  },
];

export const education: EducationItem[] = [
  {
    institution: "Patuakhali Polytechnic Institute",
    program: "Diploma in Computer Science Technology",
    timeframe: "August 2018 - January 2023",
    details: "CGPA: 3.64",
  },
  {
    institution: "A. Hai Bidyanikatan",
    program: "Secondary School Certificate",
    timeframe: "Completed",
    details: "GPA: 4.67",
  },
];

export const highlights = [
  { label: "Years of experience", value: "3+" },
  { label: "Production stacks", value: "10+" },
  { label: "Core focus", value: "Security SaaS" },
  { label: "Delivery", value: "CI/CD first" },
];

export const fallbackProjects: Project[] = [
  {
    id: "proj-threatidr",
    title: "ThreatIDR",
    slug: "threatidr",
    shortDescription:
      "Enterprise DNS firewall and threat intelligence platform designed to block zero-day and emerging attacks.",
    description:
      "ThreatIDR is a real-time cyber threat intelligence platform built for enterprises that need proactive protection against evolving threats. The platform combines a DNS firewall, attack visibility, and policy-based control to protect infrastructure before compromise.\n\nI worked across frontend and backend services, integrating event-driven communication, API design, and cloud-ready deployments.",
    stack: [
      "React",
      "TypeScript",
      "Zustand",
      "Formik",
      "Python (Django)",
      "Node.js (Express)",
      "PostgreSQL",
      "Go (Gin)",
      "DynamoDB",
      "Docker",
      "AWS",
      "GitHub Actions",
    ],
    repoUrl: null,
    liveUrl: null,
    coverImage: null,
    featured: true,
    published: true,
    publishedAt: "2026-02-16T00:00:00.000Z",
    sortOrder: 1,
    createdAt: "2026-02-16T00:00:00.000Z",
    updatedAt: "2026-02-16T00:00:00.000Z",
  },
  {
    id: "proj-risk-sensor",
    title: "Risk Sensor",
    slug: "risk-sensor",
    shortDescription:
      "Real-time cyber threat intelligence SaaS with analytics, streaming data ingestion, and defender-focused dashboards.",
    description:
      "Risk Sensor provides real-time visibility into suspicious DNS and network behavior through interactive dashboards and actionable alerts.\n\nThe system uses stream processing and message-based services to surface threat indicators quickly and support incident response teams.",
    stack: [
      "React",
      "TypeScript",
      "Redux",
      "Flask",
      "PostgreSQL",
      "TimeScaleDB",
      "Celery",
      "WebSocket",
      "BIND DNS",
    ],
    repoUrl: null,
    liveUrl: null,
    coverImage: null,
    featured: true,
    published: true,
    publishedAt: "2026-02-16T00:00:00.000Z",
    sortOrder: 2,
    createdAt: "2026-02-16T00:00:00.000Z",
    updatedAt: "2026-02-16T00:00:00.000Z",
  },
];

export const fallbackPosts: BlogPost[] = [
  {
    id: "post-architecture",
    title: "Designing API-First Security Products",
    slug: "designing-api-first-security-products",
    excerpt:
      "A practical approach to structuring microservices and contracts for high-risk domains.",
    content:
      "Security products fail when boundaries are fuzzy. API-first architecture enforces clear contracts between services and teams.\n\nI optimize around three layers: transport stability, business invariants, and observability. Each release should improve all three.\n\nStart from threat models, then derive API contracts and ownership. This keeps scale from becoming operational chaos.",
    tags: ["architecture", "security", "microservices"],
    coverImage: null,
    published: true,
    publishedAt: "2026-02-16T00:00:00.000Z",
    createdAt: "2026-02-16T00:00:00.000Z",
    updatedAt: "2026-02-16T00:00:00.000Z",
  },
  {
    id: "post-ci-cd",
    title: "CI/CD Pipelines That Actually Reduce Risk",
    slug: "ci-cd-pipelines-that-actually-reduce-risk",
    excerpt:
      "Shipping fast is only useful when rollback, validation, and traceability are built in.",
    content:
      "CI/CD should not only push code faster. It should reduce blast radius.\n\nMy baseline: test gates, typed contracts, migration checks, and progressive deployment. Add observability and runbooks into the deployment workflow itself.\n\nVelocity and safety are not trade-offs when the pipeline is engineered as product infrastructure.",
    tags: ["devops", "ci-cd", "reliability"],
    coverImage: null,
    published: true,
    publishedAt: "2026-02-16T00:00:00.000Z",
    createdAt: "2026-02-16T00:00:00.000Z",
    updatedAt: "2026-02-16T00:00:00.000Z",
  },
];

export const reference = {
  name: "Lutfunnahar Lota",
  role: "Project Manager at Portonics Limited",
  email: "lutfunnaharlota@gmail.com",
  phone: "+8801722605387",
  linkedin: "https://www.linkedin.com/in/lutfunnahar-lota/overlay/about-this-profile/",
};
