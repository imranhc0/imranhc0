export interface Project {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  stack: string[];
  repoUrl: string | null;
  liveUrl: string | null;
  coverImage: string | null;
  featured: boolean;
  published: boolean;
  publishedAt: string | null;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string[];
  coverImage: string | null;
  published: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export interface ExperienceItem {
  company: string;
  role: string;
  timeframe: string;
  location: string;
  highlights: string[];
}

export interface EducationItem {
  institution: string;
  program: string;
  timeframe: string;
  details: string;
}
