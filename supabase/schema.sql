create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  email text primary key,
  created_at timestamptz not null default timezone('utc'::text, now())
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

grant execute on function public.is_admin() to anon;
grant execute on function public.is_admin() to authenticated;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := timezone('utc'::text, now());
  return new;
end;
$$;

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  short_description text not null,
  description text not null,
  stack text[] not null default '{}',
  repo_url text,
  live_url text,
  cover_image text,
  featured boolean not null default false,
  published boolean not null default false,
  published_at timestamptz,
  sort_order integer not null default 0,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now())
);

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text not null,
  content text not null,
  tags text[] not null default '{}',
  cover_image text,
  published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now())
);

drop trigger if exists set_projects_updated_at on public.projects;
create trigger set_projects_updated_at
before update on public.projects
for each row
execute function public.set_updated_at();

drop trigger if exists set_blog_posts_updated_at on public.blog_posts;
create trigger set_blog_posts_updated_at
before update on public.blog_posts
for each row
execute function public.set_updated_at();

alter table public.projects enable row level security;
alter table public.blog_posts enable row level security;

-- Public visitors can only read published content.
drop policy if exists projects_public_read on public.projects;
create policy projects_public_read
on public.projects
for select
using (published = true);

drop policy if exists blog_posts_public_read on public.blog_posts;
create policy blog_posts_public_read
on public.blog_posts
for select
using (published = true);

-- Optional: if you later use Supabase Auth for dashboard access,
-- add your admin emails to admin_users to allow direct writes.
drop policy if exists projects_admin_all on public.projects;
create policy projects_admin_all
on public.projects
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists blog_posts_admin_all on public.blog_posts;
create policy blog_posts_admin_all
on public.blog_posts
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

insert into public.admin_users (email)
values ('imranhosein.cse@gmail.com')
on conflict (email) do nothing;

insert into public.projects (
  title,
  slug,
  short_description,
  description,
  stack,
  featured,
  published,
  published_at,
  sort_order
)
values
  (
    'ThreatIDR',
    'threatidr',
    'Enterprise DNS firewall and threat intelligence platform designed to block zero-day and emerging attacks.',
    'ThreatIDR is a real-time cyber threat intelligence platform built for enterprises that need proactive protection against evolving threats. The platform combines a DNS firewall, attack visibility, and policy-based control to protect infrastructure before compromise.\n\nI worked across frontend and backend services, integrating event-driven communication, API design, and cloud-ready deployments.',
    array['React', 'TypeScript', 'Zustand', 'Formik', 'Python (Django)', 'Node.js (Express)', 'PostgreSQL', 'Go (Gin)', 'DynamoDB', 'Docker', 'AWS', 'GitHub Actions'],
    true,
    true,
    timezone('utc'::text, now()),
    1
  ),
  (
    'Risk Sensor',
    'risk-sensor',
    'Real-time cyber threat intelligence SaaS with analytics, streaming data ingestion, and defender-focused dashboards.',
    'Risk Sensor provides real-time visibility into suspicious DNS and network behavior through interactive dashboards and actionable alerts.\n\nThe system uses stream processing and message-based services to surface threat indicators quickly and support incident response teams.',
    array['React', 'TypeScript', 'Redux', 'Flask', 'PostgreSQL', 'TimeScaleDB', 'Celery', 'WebSocket', 'BIND DNS'],
    true,
    true,
    timezone('utc'::text, now()),
    2
  )
on conflict (slug) do nothing;

insert into public.blog_posts (
  title,
  slug,
  excerpt,
  content,
  tags,
  published,
  published_at
)
values
  (
    'Designing API-First Security Products',
    'designing-api-first-security-products',
    'A practical approach to structuring microservices and contracts for high-risk domains.',
    'Security products fail when boundaries are fuzzy. API-first architecture enforces clear contracts between services and teams.\n\nI optimize around three layers: transport stability, business invariants, and observability. Each release should improve all three.\n\nStart from threat models, then derive API contracts and ownership. This keeps scale from becoming operational chaos.',
    array['architecture', 'security', 'microservices'],
    true,
    timezone('utc'::text, now())
  ),
  (
    'CI/CD Pipelines That Actually Reduce Risk',
    'ci-cd-pipelines-that-actually-reduce-risk',
    'Shipping fast is only useful when rollback, validation, and traceability are built in.',
    'CI/CD should not only push code faster. It should reduce blast radius.\n\nMy baseline: test gates, typed contracts, migration checks, and progressive deployment. Add observability and runbooks into the deployment workflow itself.\n\nVelocity and safety are not trade-offs when the pipeline is engineered as product infrastructure.',
    array['devops', 'ci-cd', 'reliability'],
    true,
    timezone('utc'::text, now())
  )
on conflict (slug) do nothing;
