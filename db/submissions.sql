-- OPERAVA Website + Recruitment AVA schema for Cloudflare D1.
-- Apply with: npx wrangler d1 execute operava-submissions --remote --file=db/submissions.sql

CREATE TABLE IF NOT EXISTS form_submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT, reference_id TEXT NOT NULL UNIQUE, form_type TEXT NOT NULL,
  name TEXT NOT NULL, email TEXT NOT NULL, payload TEXT NOT NULL,
  verification_status TEXT NOT NULL DEFAULT 'PENDING', status TEXT NOT NULL DEFAULT 'NEW',
  resume_key TEXT, created_at TEXT NOT NULL, verified_at TEXT
);
CREATE TABLE IF NOT EXISTS form_otps (
  id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT NOT NULL, form_type TEXT NOT NULL,
  draft_id TEXT NOT NULL UNIQUE, code_hash TEXT NOT NULL, payload TEXT NOT NULL,
  expires_at INTEGER NOT NULL, attempts INTEGER NOT NULL DEFAULT 0, resends INTEGER NOT NULL DEFAULT 0,
  last_sent_at INTEGER NOT NULL, consumed INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_form_submissions_type ON form_submissions(form_type, created_at);
CREATE INDEX IF NOT EXISTS idx_form_submissions_email ON form_submissions(email);
CREATE INDEX IF NOT EXISTS idx_form_otps_email ON form_otps(email, form_type, consumed);

CREATE TABLE IF NOT EXISTS applicants (
  id INTEGER PRIMARY KEY AUTOINCREMENT, application_id TEXT NOT NULL UNIQUE, full_name TEXT NOT NULL,
  email TEXT NOT NULL, email_verified INTEGER NOT NULL DEFAULT 0, email_verified_at TEXT,
  phone TEXT, position_title TEXT NOT NULL, position_code TEXT NOT NULL, education TEXT,
  experience_years TEXT, experience_summary TEXT, skills TEXT NOT NULL DEFAULT '[]',
  position_specific TEXT, availability TEXT, start_date TEXT, additional TEXT,
  status TEXT NOT NULL DEFAULT 'APPLICATION_IN_PROGRESS', source TEXT NOT NULL DEFAULT 'recruitment_ava',
  created_at TEXT NOT NULL, updated_at TEXT NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS applicants_email_position_uidx ON applicants(email, position_code);
CREATE INDEX IF NOT EXISTS applicants_status_idx ON applicants(status);
CREATE TABLE IF NOT EXISTS applicant_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT, application_id TEXT NOT NULL, role TEXT NOT NULL,
  body TEXT NOT NULL, created_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS assessments (
  id INTEGER PRIMARY KEY AUTOINCREMENT, application_id TEXT NOT NULL UNIQUE, position_code TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'IN_PROGRESS', current_index INTEGER NOT NULL DEFAULT 0,
  correct_count INTEGER NOT NULL DEFAULT 0, answers TEXT NOT NULL DEFAULT '[]', questions TEXT NOT NULL DEFAULT '[]',
  score_percent REAL, passed INTEGER, started_at TEXT NOT NULL, completed_at TEXT
);
