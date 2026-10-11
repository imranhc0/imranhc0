import Link from "next/link";
import { LocalTime } from "@/components/local-time";
import { NavLinks } from "@/components/nav-links";
import { hasResume, profile, resumePath } from "@/lib/profile";

export function SiteHeader() {
  const links = [
    { href: "/projects", label: "Work" },
    { href: "/blog", label: "Writing" },
    ...(hasResume() ? [{ href: resumePath, label: "CV", external: true }] : []),
    { href: "/#contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper">
      <div className="wrap flex h-[var(--header-h)] items-center justify-between gap-6">
        <Link href="/" className="text-[0.9375rem] font-semibold tracking-[-0.01em] [font-stretch:112%]">
          <span className="hidden sm:inline">Md </span>
          {profile.name.replace(/^Md /, "")}
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-8">
          <NavLinks links={links} />
          <span className="hidden lg:inline">
            <LocalTime />
          </span>
        </nav>
      </div>
    </header>
  );
}
