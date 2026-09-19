-- OPERAVA Recruitment AVA — dedicated project schema
-- Run once in Supabase SQL Editor for the recruitment project.
-- RLS enabled; service_role (Worker) bypasses RLS. No public anon writes.

create extension if not exists "pgcrypto";

create table if not exists public.applicants (
  id uuid primary key default gen_random_uuid(),
  application_id text not null unique,
  full_name text not null,
  email text not null,
  email_verified boolean not null default false,
  email_verified_at timestamptz,
  phone text,
  position_title text not null,
  position_code text not null check (position_code in ('tech', 'ops', 'cx')),
  education text,
  experience_years text,
  experience_summary text,
  skills jsonb not null default '[]'::jsonb,
  position_specific text,
  availability text,
  start_date text,
  additional text,
  status text not null default 'APPLICATION_IN_PROGRESS'
    check (status in (
      'APPLICATION_IN_PROGRESS',
      'PROFILE_COMPLETE',
      'ASSESSMENT_PENDING',
      'ASSESSMENT_IN_PROGRESS',
      'ASSESSMENT_COMPLETE',
      'IN_POOL',
      'WITHDRAWN',
      'ARCHIVED'
    )),
  source text not null default 'recruitment_ava',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists applicants_email_position_uidx
  on public.applicants (lower(email), position_code);

create index if not exists applicants_status_idx on public.applicants (status);
create index if not exists applicants_created_idx on public.applicants (created_at desc);

create or replace function public.set_applicants_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_applicants_updated_at on public.applicants;
create trigger trg_applicants_updated_at
  before update on public.applicants
  for each row execute function public.set_applicants_updated_at();

alter table public.applicants enable row level security;

-- No policies for anon/authenticated: only service_role (Cloudflare Worker) accesses rows.

create table if not exists public.applicant_messages (
  id uuid primary key default gen_random_uuid(),
  application_id text not null references public.applicants (application_id) on delete cascade,
  role text not null check (role in ('user', 'assistant', 'system')),
  body text not null,
  created_at timestamptz not null default now()
);

create index if not exists applicant_messages_app_idx
  on public.applicant_messages (application_id, created_at);

alter table public.applicant_messages enable row level security;
