import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/#experience", label: "Experience" },
  { href: "/#contact", label: "Contact" },
];

export function MainNav() {
  return (
    <nav className="relative overflow-hidden rounded-[20px] border-2 border-[var(--ink)] bg-[var(--paper)] px-5 py-4 shadow-[7px_7px_0_0_var(--ink)] md:px-7">
      <div className="pointer-events-none absolute -left-6 -top-10 h-24 w-24 rotate-12 bg-[var(--accent-c)] opacity-35" />
      <div className="pointer-events-none absolute -right-8 -bottom-10 h-20 w-24 -rotate-12 bg-[var(--accent)] opacity-20" />

      <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-baseline gap-2">
          {/* <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--muted)]">
            Engineer Portfolio
          </span> */}
          <span className="font-[var(--font-display)] text-3xl font-black leading-none text-[var(--ink)]">
            IMRAN
          </span>
        </div>

        <ul className="flex flex-wrap items-center gap-3 text-xs font-black uppercase tracking-[0.14em] text-[var(--ink)] md:gap-4">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                className="rounded-full border border-transparent px-3 py-1 transition hover:border-[var(--ink)] hover:bg-white"
                href={link.href}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
