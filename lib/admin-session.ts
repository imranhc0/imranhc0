import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-auth";

export interface AdminIdentity {
  id: string;
  email: string;
}

function toMessage(error: unknown): string {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Authentication failed.";
}

export async function loginWithSupabase(email: string, password: string): Promise<{ error: string | null }> {
  try {
    const supabase = await createSupabaseServerClient();

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      return { error: error.message };
    }

    const { data, error: adminCheckError } = await supabase.rpc("is_admin");

    if (adminCheckError || data !== true) {
      await supabase.auth.signOut();
      return {
        error:
          "Authenticated, but this account is not authorized for the admin dashboard. Add this email to admin_users.",
      };
    }

    return { error: null };
  } catch (error) {
    return { error: toMessage(error) };
  }
}

export async function clearAdminSession(): Promise<void> {
  try {
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
  } catch {
    // Ignore missing env or token state.
  }
}

export async function getAdminIdentity(): Promise<AdminIdentity | null> {
  try {
    const supabase = await createSupabaseServerClient();

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user?.email) {
      return null;
    }

    const { data, error: adminCheckError } = await supabase.rpc("is_admin");

    if (adminCheckError || data !== true) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
    };
  } catch {
    return null;
  }
}

export async function requireAdminSession(): Promise<AdminIdentity> {
  const admin = await getAdminIdentity();

  if (!admin) {
    redirect("/admin/login");
  }

  return admin;
}
