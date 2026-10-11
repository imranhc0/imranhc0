interface SectionProps {
  id: string;
  index: string;
  title: string;
  children: React.ReactNode;
}

/** A datasheet row: numbered, sticky title rail on the left, content on the right. */
export function Section({ id, index, title, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="wrap">
      <div className="grid border-t border-ink pt-6 pb-20 md:grid-cols-12 md:gap-x-6 md:pb-28">
        <header className="mb-10 md:col-span-3 md:mb-0">
          <div className="md:sticky md:top-[calc(var(--header-h)+1.5rem)]">
            <p className="t-meta">{index}</p>
            <h2 id={`${id}-title`} className="t-title mt-2">
              {title}
            </h2>
          </div>
        </header>
        <div className="md:col-span-9">{children}</div>
      </div>
    </section>
  );
}
