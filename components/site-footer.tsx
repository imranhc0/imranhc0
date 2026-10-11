import { profile } from "@/lib/profile";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="wrap flex flex-col gap-3 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="t-meta">
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p className="t-meta">
          Statically generated with Next.js. No cookies, no tracking.{" "}
          <a href={profile.sourceRepo} className="link">
            Source
          </a>{" "}
          ·{" "}
          <a href="/rss.xml" className="link">
            RSS
          </a>
        </p>
      </div>
    </footer>
  );
}
