# Md Imran Hossen Portfolio (Next.js + Supabase)

Custom portfolio platform with:
- Public portfolio site
- Projects + blog publishing
- Separate admin dashboard
- Supabase-backed content and Supabase-authenticated admin login

## Tech

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS v4
- Supabase (Postgres + Auth)

## Run Locally

1. Install dependencies

```bash
npm install
```

2. Create env file

```bash
cp .env.example .env.local
```

3. Add env values to `.env.local`

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

4. Start app

```bash
npm run dev
```

## Step-by-Step Supabase Setup

1. Create a Supabase project
- Go to Supabase dashboard.
- Create a new project and wait for database initialization.

2. Get API keys
- Open `Project Settings -> API`.
- Copy:
  - Project URL
  - `anon` public key
  - `service_role` key

3. Configure local environment
- Put keys in `.env.local`:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`

4. Create database tables, policies, and seed data
- Open Supabase `SQL Editor`.
- Run [`supabase/schema.sql`](/Users/imran/Projects/imranhc0/supabase/schema.sql).
- This creates:
  - `projects`
  - `blog_posts`
  - `admin_users`
  - `is_admin()` function
  - RLS policies
  - initial seed content

5. Enable email/password sign-in
- Open `Authentication -> Providers -> Email`.
- Enable Email provider (password login).

6. Create an admin auth user
- Open `Authentication -> Users`.
- Add user with email/password (or sign up once from client).

7. Allow that user in dashboard access list
- In SQL Editor, run:

```sql
insert into public.admin_users (email)
values ('your-admin-email@example.com')
on conflict (email) do nothing;
```

8. Sign in to admin dashboard
- Visit `http://localhost:3000/admin/login`.
- Use the same Supabase email/password from step 6.

9. Publish content
- Manage content from:
  - `/admin/projects`
  - `/admin/blog`
- Mark items `Published` to show them publicly.

## Notes

- Public pages only show rows where `published = true`.
- Admin login is validated through Supabase Auth + `admin_users` authorization check.
- Write actions use server-side key (`SUPABASE_SERVICE_ROLE_KEY`) in this implementation.
- If Supabase keys are missing, public pages fall back to local seeded content.
