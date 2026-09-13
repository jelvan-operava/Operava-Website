-- Operava Website — Supabase schema + RLS (free tier)
-- Public site + internal staff access for leads / applications
-- Roles on profiles: admin | agent | client

-- ---------------------------------------------------------------------------
-- Profiles
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  full_name text,
  role text not null default 'client'
    check (role in ('admin', 'agent', 'client')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.profiles force row level security;

create or replace function public.is_staff()
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('admin', 'agent')
  )
$$;

create or replace function public.is_admin()
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (
    select 1 from public.profiles where id = auth.uid() and role = 'admin'
  )
$$;

grant execute on function public.is_staff() to authenticated;
grant execute on function public.is_admin() to authenticated;

create policy "profiles_select"
  on public.profiles for select to authenticated
  using (id = auth.uid() or public.is_staff());

create policy "profiles_update_own"
  on public.profiles for update to authenticated
  using (id = auth.uid()) with check (id = auth.uid());

create policy "profiles_admin"
  on public.profiles for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', new.email))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- Contact / inquiry submissions (from public forms)
-- ---------------------------------------------------------------------------
create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  company text,
  subject text,
  message text not null,
  source text default 'website',
  status text not null default 'new'
    check (status in ('new', 'read', 'replied', 'archived')),
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_contact_status on public.contact_submissions (status);
alter table public.contact_submissions enable row level security;
alter table public.contact_submissions force row level security;

-- Anonymous / public insert allowed (form submissions)
create policy "contact_insert_public"
  on public.contact_submissions for insert
  to anon, authenticated
  with check (true);

-- Only staff can read / update
create policy "contact_select_staff"
  on public.contact_submissions for select to authenticated
  using (public.is_staff());

create policy "contact_update_staff"
  on public.contact_submissions for update to authenticated
  using (public.is_staff()) with check (public.is_staff());

create policy "contact_delete_admin"
  on public.contact_submissions for delete to authenticated
  using (public.is_admin());

-- ---------------------------------------------------------------------------
-- Career applications
-- ---------------------------------------------------------------------------
create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text,
  position text not null,
  resume_url text,
  cover_letter text,
  status text not null default 'received'
    check (status in ('received', 'screening', 'interview', 'offer', 'rejected', 'hired')),
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_applications_status on public.applications (status);
alter table public.applications enable row level security;
alter table public.applications force row level security;

create policy "applications_insert_public"
  on public.applications for insert
  to anon, authenticated
  with check (true);

create policy "applications_select_staff"
  on public.applications for select to authenticated
  using (public.is_staff());

create policy "applications_update_staff"
  on public.applications for update to authenticated
  using (public.is_staff()) with check (public.is_staff());

create policy "applications_delete_admin"
  on public.applications for delete to authenticated
  using (public.is_admin());

-- ---------------------------------------------------------------------------
-- Service inquiry leads
-- ---------------------------------------------------------------------------
create table if not exists public.service_leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  service text,
  message text,
  status text not null default 'new',
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.service_leads enable row level security;
alter table public.service_leads force row level security;

create policy "leads_insert_public"
  on public.service_leads for insert
  to anon, authenticated
  with check (true);

create policy "leads_staff"
  on public.service_leads for all to authenticated
  using (public.is_staff()) with check (public.is_staff());
