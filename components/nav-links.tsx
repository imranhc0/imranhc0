"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinksProps {
  links: { href: string; label: string; external?: boolean }[];
}

export function NavLinks({ links }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <ul className="flex items-center gap-4 text-[0.9375rem] sm:gap-6">
      {links.map(({ href, label, external }) => {
        const active = !external && href !== "/#contact" && pathname.startsWith(href);
        const className = `relative py-1 transition-colors duration-150 hover:text-accent ${
          active ? "text-ink after:absolute after:inset-x-0 after:-bottom-px after:h-px after:bg-ink" : "text-ink-2"
        }`;

        return (
          <li key={href}>
            {external ? (
              <a href={href} className={className}>
                {label}
              </a>
            ) : (
              <Link href={href} className={className} aria-current={active ? "page" : undefined}>
                {label}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}
