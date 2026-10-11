interface PageHeaderProps {
  index: string;
  title: string;
  children?: React.ReactNode;
}

export function PageHeader({ index, title, children }: PageHeaderProps) {
  return (
    <header className="wrap pt-14 pb-14 md:pt-24 md:pb-20">
      <p className="t-meta">{index}</p>
      <h1 className="t-page mt-4">{title}</h1>
      {children ? <div className="t-lede mt-6 max-w-[46ch] text-ink-2">{children}</div> : null}
    </header>
  );
}
