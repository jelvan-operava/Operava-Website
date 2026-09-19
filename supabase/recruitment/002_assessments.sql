-- OPERAVA Recruitment AVA — assessment sessions
-- Run after 001_applicants.sql

create table if not exists public.assessments (
  id uuid primary key default gen_random_uuid(),
  application_id text not null references public.applicants (application_id) on delete cascade,
  position_code text not null check (position_code in ('tech', 'ops', 'cx')),
  status text not null default 'IN_PROGRESS'
    check (status in ('IN_PROGRESS', 'COMPLETE', 'ABANDONED')),
  current_index int not null default 0,
  correct_count int not null default 0,
  answers jsonb not null default '[]'::jsonb,
  questions jsonb not null default '[]'::jsonb,
  score_percent numeric,
  passed boolean,
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  unique (application_id)
);

create index if not exists assessments_app_idx on public.assessments (application_id);

alter table public.assessments enable row level security;
