import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import { parse as parseYaml } from "yaml";

const CONTENT_DIR = path.join(process.cwd(), "content");
const showDrafts = process.env.NODE_ENV === "development";

export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated: string | null;
  tags: string[];
  draft: boolean;
  readingMinutes: number;
  body: string;
}

export interface Project {
  slug: string;
  title: string;
  summary: string;
  role: string;
  company: string | null;
  period: string | null;
  domain: string;
  stack: string[];
  featured: boolean;
  order: number;
  live: string | null;
  repo: string | null;
  draft: boolean;
  body: string;
}

type Frontmatter = Record<string, unknown>;

class ContentError extends Error {
  constructor(file: string, message: string) {
    super(`[content] ${path.relative(process.cwd(), file)}: ${message}`);
  }
}

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/;

function parseFrontmatter(source: string, file: string): { data: Frontmatter; body: string } {
  const text = source.replace(/^﻿/, "");
  const match = FRONTMATTER.exec(text);
  if (!match) {
    throw new ContentError(file, "missing frontmatter (a --- block at the top of the file).");
  }

  let data: unknown;
  try {
    data = parseYaml(match[1]);
  } catch (error) {
    throw new ContentError(file, `invalid frontmatter YAML: ${(error as Error).message}`);
  }
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new ContentError(file, "frontmatter must be a list of key: value pairs.");
  }

  return { data: data as Frontmatter, body: text.slice(match[0].length) };
}

function readMarkdownFiles(kind: "posts" | "projects") {
  const dir = path.join(CONTENT_DIR, kind);
  if (!fs.existsSync(dir)) return [];

  // Files starting with "_" (like _template.md) are never published.
  return fs
    .readdirSync(dir)
    .filter((name) => name.endsWith(".md") && !name.startsWith("_"))
    .map((name) => {
      const file = path.join(dir, name);
      const { data, body } = parseFrontmatter(fs.readFileSync(file, "utf8"), file);
      return { file, slug: name.replace(/\.md$/, ""), data, body };
    });
}

function str(data: Frontmatter, key: string, file: string): string {
  const value = data[key];
  if (typeof value !== "string" || !value.trim()) {
    throw new ContentError(file, `"${key}" is required and must be a non-empty string.`);
  }
  return value.trim();
}

function optStr(data: Frontmatter, key: string): string | null {
  const value = data[key];
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function list(data: Frontmatter, key: string): string[] {
  const value = data[key];
  if (!Array.isArray(value)) return [];
  return value.map(String).filter(Boolean);
}

// The yaml package (YAML 1.2) keeps `date: 2026-02-16` as a string; Date objects are accepted too.
function date(data: Frontmatter, key: string, file: string, required: true): string;
function date(data: Frontmatter, key: string, file: string, required: false): string | null;
function date(data: Frontmatter, key: string, file: string, required: boolean): string | null {
  const value = data[key];
  if (value === undefined || value === null || value === "") {
    if (required) throw new ContentError(file, `"${key}" is required (YYYY-MM-DD).`);
    return null;
  }
  const parsed = value instanceof Date ? value : new Date(String(value));
  if (Number.isNaN(parsed.getTime())) {
    throw new ContentError(file, `"${key}" is not a valid date (use YYYY-MM-DD).`);
  }
  return parsed.toISOString();
}

function readingMinutes(markdown: string): number {
  const words = markdown.replace(/```[\s\S]*?```/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export const getPosts = cache((): Post[] =>
  readMarkdownFiles("posts")
    .map(({ file, slug, data, body }) => ({
      slug,
      title: str(data, "title", file),
      description: str(data, "description", file),
      date: date(data, "date", file, true),
      updated: date(data, "updated", file, false),
      tags: list(data, "tags"),
      draft: data.draft === true,
      readingMinutes: readingMinutes(body),
      body,
    }))
    .filter((post) => showDrafts || !post.draft)
    .sort((a, b) => b.date.localeCompare(a.date)),
);

export function getPost(slug: string): Post | undefined {
  return getPosts().find((post) => post.slug === slug);
}

export const getProjects = cache((): Project[] =>
  readMarkdownFiles("projects")
    .map(({ file, slug, data, body }) => ({
      slug,
      title: str(data, "title", file),
      summary: str(data, "summary", file),
      role: str(data, "role", file),
      company: optStr(data, "company"),
      period: optStr(data, "period"),
      domain: str(data, "domain", file),
      stack: list(data, "stack"),
      featured: data.featured === true,
      order: typeof data.order === "number" ? data.order : 999,
      live: optStr(data, "live"),
      repo: optStr(data, "repo"),
      draft: data.draft === true,
      body,
    }))
    .filter((project) => showDrafts || !project.draft)
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title)),
);

export function getProject(slug: string): Project | undefined {
  return getProjects().find((project) => project.slug === slug);
}
