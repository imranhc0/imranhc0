import Link from "next/link";
import { logoutAction } from "@/app/admin/actions";
import { requireAdminSession } from "@/lib/admin-session";

export const dynamic = "force-dynamic";

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/blog", label: "Blog" },
  { href: "/", label: "Public Site" },
];

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const admin = await requireAdminSession();

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6 md:py-8">
      <header className="rounded-[28px] border border-[var(--line)] bg-white/90 px-5 py-4 shadow-[0_12px_40px_-35px_rgba(15,23,42,0.85)] md:px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">Control Center</p>
            <h1 className="text-2xl font-black text-[var(--ink)]">Portfolio Admin</h1>
            <p className="text-xs font-semibold text-[var(--muted)]">{admin.email}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full border border-[var(--line)] px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[var(--muted)] transition hover:border-[var(--ink)] hover:text-[var(--ink)]"
              >
                {link.label}
              </Link>
            ))}

            <form action={logoutAction}>
              <button className="rounded-full border border-red-200 bg-red-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-red-700">
                Logout
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="mt-6">{children}</div>
    </div>
  );
}
