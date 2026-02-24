import Link from "next/link";
import { loginAction } from "@/app/admin/actions";
import { FlashBanner } from "@/components/admin/flash-banner";

interface AdminLoginPageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  const { error } = await searchParams;
  const isSupabaseMissing =
    !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-lg items-center px-4 py-10">
      <section className="w-full rounded-[32px] border border-[var(--line)] bg-white/90 p-7 shadow-[0_18px_50px_-35px_rgba(15,23,42,0.85)] md:p-9">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">Admin Dashboard</p>
        <h1 className="mt-2 text-4xl font-black text-[var(--ink)]">Sign In</h1>
        <p className="mt-3 text-sm text-[var(--muted)]">
          Sign in with your Supabase Auth account. Access is granted only if your email exists in
          the <code className="rounded bg-[var(--surface-soft)] px-1.5 py-0.5">admin_users</code> table.
        </p>

        <div className="mt-4 space-y-3">
          <FlashBanner message={error} type="error" />
          {isSupabaseMissing ? (
            <FlashBanner
              message="Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local."
              type="error"
            />
          ) : null}
        </div>

        <form action={loginAction} className="mt-6 space-y-4">
          <label className="block space-y-2 text-sm font-semibold text-[var(--ink)]">
            Admin Email
            <input
              required
              type="email"
              name="email"
              className="w-full rounded-xl border border-[var(--line)] px-4 py-2.5 text-sm"
              placeholder="your-admin-email@example.com"
            />
          </label>

          <label className="block space-y-2 text-sm font-semibold text-[var(--ink)]">
            Supabase Password
            <input
              required
              type="password"
              name="password"
              className="w-full rounded-xl border border-[var(--line)] px-4 py-2.5 text-sm"
              placeholder="Enter your Supabase account password"
            />
          </label>

          <button className="w-full rounded-full bg-[var(--ink)] px-6 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:bg-black">
            Continue
          </button>
        </form>

        <Link href="/" className="mt-5 inline-flex text-sm font-semibold text-[var(--muted)] underline underline-offset-4">
          Back to portfolio
        </Link>
      </section>
    </main>
  );
}
