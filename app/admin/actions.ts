"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  clearAdminSession,
  loginWithSupabase,
  requireAdminSession,
} from "@/lib/admin-session";
import { createSlug, splitCommaValues } from "@/lib/format";
import { removePost, removeProject, savePost, saveProject } from "@/lib/supabase";

function readText(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

function readChecked(formData: FormData, key: string): boolean {
  return formData.get(key) === "on";
}

function withQuery(path: string, key: "error" | "success", value: string): string {
  const query = new URLSearchParams({ [key]: value });
  return `${path}?${query.toString()}`;
}

export async function loginAction(formData: FormData): Promise<void> {
  const email = readText(formData.get("email")).toLowerCase();
  const password = readText(formData.get("password"));

  if (!email || !password) {
    redirect(withQuery("/admin/login", "error", "Email and password are required."));
  }

  const result = await loginWithSupabase(email, password);

  if (result.error) {
    redirect(withQuery("/admin/login", "error", result.error));
  }

  redirect(withQuery("/admin", "success", "Welcome back"));
}

export async function logoutAction(): Promise<void> {
  await clearAdminSession();
  redirect("/admin/login");
}

export async function saveProjectAction(formData: FormData): Promise<void> {
  await requireAdminSession();

  const id = readText(formData.get("id"));
  const title = readText(formData.get("title"));
  const inputSlug = readText(formData.get("slug"));
  const shortDescription = readText(formData.get("shortDescription"));
  const description = readText(formData.get("description"));
  const stack = splitCommaValues(readText(formData.get("stack")));
  const sortOrder = Number(readText(formData.get("sortOrder")) || "0");
  const published = readChecked(formData, "published");
  const featured = readChecked(formData, "featured");
  const existingPublishedAt = readText(formData.get("existingPublishedAt"));

  const slug = inputSlug || createSlug(title);

  if (!title || !slug || !shortDescription || !description) {
    redirect(withQuery("/admin/projects", "error", "Please fill all required fields."));
  }

  const result = await saveProject({
    id: id || undefined,
    title,
    slug,
    shortDescription,
    description,
    stack,
    repoUrl: readText(formData.get("repoUrl")) || null,
    liveUrl: readText(formData.get("liveUrl")) || null,
    coverImage: readText(formData.get("coverImage")) || null,
    featured,
    published,
    sortOrder: Number.isNaN(sortOrder) ? 0 : sortOrder,
    publishedAt: published ? existingPublishedAt || new Date().toISOString() : null,
  });

  if (result.error) {
    redirect(withQuery("/admin/projects", "error", result.error));
  }

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath(`/projects/${slug}`);
  revalidatePath("/admin");
  revalidatePath("/admin/projects");

  redirect(withQuery("/admin/projects", "success", "Project saved"));
}

export async function savePostAction(formData: FormData): Promise<void> {
  await requireAdminSession();

  const id = readText(formData.get("id"));
  const title = readText(formData.get("title"));
  const inputSlug = readText(formData.get("slug"));
  const excerpt = readText(formData.get("excerpt"));
  const content = readText(formData.get("content"));
  const published = readChecked(formData, "published");
  const existingPublishedAt = readText(formData.get("existingPublishedAt"));
  const slug = inputSlug || createSlug(title);

  if (!title || !slug || !excerpt || !content) {
    redirect(withQuery("/admin/blog", "error", "Please fill all required fields."));
  }

  const result = await savePost({
    id: id || undefined,
    title,
    slug,
    excerpt,
    content,
    tags: splitCommaValues(readText(formData.get("tags"))),
    coverImage: readText(formData.get("coverImage")) || null,
    published,
    publishedAt: published ? existingPublishedAt || new Date().toISOString() : null,
  });

  if (result.error) {
    redirect(withQuery("/admin/blog", "error", result.error));
  }

  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/admin");
  revalidatePath("/admin/blog");

  redirect(withQuery("/admin/blog", "success", "Post saved"));
}

export async function deleteProjectAction(formData: FormData): Promise<void> {
  await requireAdminSession();

  const id = readText(formData.get("id"));

  if (!id) {
    redirect(withQuery("/admin/projects", "error", "Project id is missing."));
  }

  const result = await removeProject(id);

  if (result.error) {
    redirect(withQuery("/admin/projects", "error", result.error));
  }

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/admin");
  revalidatePath("/admin/projects");

  redirect(withQuery("/admin/projects", "success", "Project deleted"));
}

export async function deletePostAction(formData: FormData): Promise<void> {
  await requireAdminSession();

  const id = readText(formData.get("id"));

  if (!id) {
    redirect(withQuery("/admin/blog", "error", "Post id is missing."));
  }

  const result = await removePost(id);

  if (result.error) {
    redirect(withQuery("/admin/blog", "error", result.error));
  }

  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/admin");
  revalidatePath("/admin/blog");

  redirect(withQuery("/admin/blog", "success", "Post deleted"));
}
