import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { fallbackPosts, fallbackProjects } from "@/lib/site-data";
import type { BlogPost, Project } from "@/lib/types";

const projectColumns =
  "id,title,slug,short_description,description,stack,repo_url,live_url,cover_image,featured,published,published_at,sort_order,created_at,updated_at";

const postColumns =
  "id,title,slug,excerpt,content,tags,cover_image,published,published_at,created_at,updated_at";

interface ProjectRow {
  id: string;
  title: string;
  slug: string;
  short_description: string | null;
  description: string | null;
  stack: string[] | null;
  repo_url: string | null;
  live_url: string | null;
  cover_image: string | null;
  featured: boolean | null;
  published: boolean | null;
  published_at: string | null;
  sort_order: number | null;
  created_at: string;
  updated_at: string;
}

interface BlogPostRow {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  tags: string[] | null;
  cover_image: string | null;
  published: boolean | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProjectInput {
  id?: string;
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
  sortOrder: number;
  publishedAt: string | null;
}

export interface BlogPostInput {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string[];
  coverImage: string | null;
  published: boolean;
  publishedAt: string | null;
}

function isPublicConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

function isServiceConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

function getPublicClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return null;
  }

  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

function getServiceClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    return null;
  }

  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

function mapProject(row: ProjectRow): Project {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    shortDescription: row.short_description ?? "",
    description: row.description ?? "",
    stack: row.stack ?? [],
    repoUrl: row.repo_url,
    liveUrl: row.live_url,
    coverImage: row.cover_image,
    featured: row.featured ?? false,
    published: row.published ?? false,
    publishedAt: row.published_at,
    sortOrder: row.sort_order ?? 0,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapPost(row: BlogPostRow): BlogPost {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt ?? "",
    content: row.content ?? "",
    tags: row.tags ?? [],
    coverImage: row.cover_image,
    published: row.published ?? false,
    publishedAt: row.published_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function getPublishedProjects(options?: {
  limit?: number;
  featuredOnly?: boolean;
}): Promise<Project[]> {
  const client = getPublicClient();

  if (!client) {
    let data = [...fallbackProjects];

    if (options?.featuredOnly) {
      data = data.filter((project) => project.featured);
    }

    if (options?.limit) {
      data = data.slice(0, options.limit);
    }

    return data;
  }

  let query = client
    .from("projects")
    .select(projectColumns)
    .eq("published", true)
    .order("featured", { ascending: false })
    .order("sort_order", { ascending: true })
    .order("published_at", { ascending: false });

  if (options?.featuredOnly) {
    query = query.eq("featured", true);
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;

  if (error || !data) {
    return fallbackProjects;
  }

  return (data as ProjectRow[]).map(mapProject);
}

export async function getPublishedProjectBySlug(slug: string): Promise<Project | null> {
  const client = getPublicClient();

  if (!client) {
    return fallbackProjects.find((project) => project.slug === slug) ?? null;
  }

  const { data, error } = await client
    .from("projects")
    .select(projectColumns)
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error || !data) {
    return fallbackProjects.find((project) => project.slug === slug) ?? null;
  }

  return mapProject(data as ProjectRow);
}

export async function getPublishedPosts(limit?: number): Promise<BlogPost[]> {
  const client = getPublicClient();

  if (!client) {
    return limit ? fallbackPosts.slice(0, limit) : fallbackPosts;
  }

  let query = client
    .from("blog_posts")
    .select(postColumns)
    .eq("published", true)
    .order("published_at", { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error || !data) {
    return fallbackPosts;
  }

  return (data as BlogPostRow[]).map(mapPost);
}

export async function getPublishedPostBySlug(slug: string): Promise<BlogPost | null> {
  const client = getPublicClient();

  if (!client) {
    return fallbackPosts.find((post) => post.slug === slug) ?? null;
  }

  const { data, error } = await client
    .from("blog_posts")
    .select(postColumns)
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error || !data) {
    return fallbackPosts.find((post) => post.slug === slug) ?? null;
  }

  return mapPost(data as BlogPostRow);
}

export async function getAdminProjects(): Promise<Project[]> {
  const client = getServiceClient();

  if (!client) {
    return [];
  }

  const { data, error } = await client
    .from("projects")
    .select(projectColumns)
    .order("created_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  return (data as ProjectRow[]).map(mapProject);
}

export async function getAdminPosts(): Promise<BlogPost[]> {
  const client = getServiceClient();

  if (!client) {
    return [];
  }

  const { data, error } = await client
    .from("blog_posts")
    .select(postColumns)
    .order("created_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  return (data as BlogPostRow[]).map(mapPost);
}

export async function getAdminProjectById(id: string): Promise<Project | null> {
  const client = getServiceClient();

  if (!client) {
    return null;
  }

  const { data, error } = await client.from("projects").select(projectColumns).eq("id", id).maybeSingle();

  if (error || !data) {
    return null;
  }

  return mapProject(data as ProjectRow);
}

export async function getAdminPostById(id: string): Promise<BlogPost | null> {
  const client = getServiceClient();

  if (!client) {
    return null;
  }

  const { data, error } = await client.from("blog_posts").select(postColumns).eq("id", id).maybeSingle();

  if (error || !data) {
    return null;
  }

  return mapPost(data as BlogPostRow);
}

export async function saveProject(input: ProjectInput): Promise<{ error: string | null }> {
  const client = getServiceClient();

  if (!client) {
    return { error: "Supabase service role is not configured." };
  }

  const payload = {
    title: input.title,
    slug: input.slug,
    short_description: input.shortDescription,
    description: input.description,
    stack: input.stack,
    repo_url: input.repoUrl,
    live_url: input.liveUrl,
    cover_image: input.coverImage,
    featured: input.featured,
    published: input.published,
    sort_order: input.sortOrder,
    published_at: input.publishedAt,
  };

  if (input.id) {
    const { error } = await client.from("projects").update(payload).eq("id", input.id);

    return { error: error?.message ?? null };
  }

  const { error } = await client.from("projects").insert(payload);

  return { error: error?.message ?? null };
}

export async function savePost(input: BlogPostInput): Promise<{ error: string | null }> {
  const client = getServiceClient();

  if (!client) {
    return { error: "Supabase service role is not configured." };
  }

  const payload = {
    title: input.title,
    slug: input.slug,
    excerpt: input.excerpt,
    content: input.content,
    tags: input.tags,
    cover_image: input.coverImage,
    published: input.published,
    published_at: input.publishedAt,
  };

  if (input.id) {
    const { error } = await client.from("blog_posts").update(payload).eq("id", input.id);

    return { error: error?.message ?? null };
  }

  const { error } = await client.from("blog_posts").insert(payload);

  return { error: error?.message ?? null };
}

export async function removeProject(id: string): Promise<{ error: string | null }> {
  const client = getServiceClient();

  if (!client) {
    return { error: "Supabase service role is not configured." };
  }

  const { error } = await client.from("projects").delete().eq("id", id);

  return { error: error?.message ?? null };
}

export async function removePost(id: string): Promise<{ error: string | null }> {
  const client = getServiceClient();

  if (!client) {
    return { error: "Supabase service role is not configured." };
  }

  const { error } = await client.from("blog_posts").delete().eq("id", id);

  return { error: error?.message ?? null };
}

export function hasPublicSupabaseConfig(): boolean {
  return isPublicConfigured();
}

export function hasServiceSupabaseConfig(): boolean {
  return isServiceConfigured();
}
