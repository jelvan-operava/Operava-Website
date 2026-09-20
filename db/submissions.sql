-- OPERAVA Website + Recruitment AVA schema for Cloudflare D1.
-- Apply remotely to operava-submissions before deployment.

CREATE TABLE IF NOT EXISTS form_submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  reference_id TEXT NOT NULL UNIQUE,
  form_type TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  payload TEXT NOT NULL,
  verification_status TEXT NOT NULL DEFAULT 'PENDING',
  status TEXT NOT NULL DEFAULT 'NEW',
  resume_key TEXT,
  created_at TEXT NOT NULL,
  verified_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_form_submissions_type ON form_submissions(form_type, created_at);
CREATE INDEX IF NOT EXISTS idx_form_submissions_email ON form_submissions(email);

CREATE TABLE IF NOT EXISTS form_otps (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL,
  form_type TEXT NOT NULL,
  draft_id TEXT NOT NULL UNIQUE,
  code_hash TEXT NOT NULL,
  payload TEXT NOT NULL,
  expires_at INTEGER NOT NULL,
  attempts INTEGER NOT NULL DEFAULT 0,
  resends INTEGER NOT NULL DEFAULT 0,
  last_sent_at INTEGER NOT NULL,
  consumed INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_form_otps_email ON form_otps(email, form_type, consumed);

CREATE TABLE IF NOT EXISTS applicants (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  application_id TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  email_verified INTEGER NOT NULL DEFAULT 0,
  email_verified_at TEXT,
  phone TEXT,
  position_title TEXT NOT NULL,
  position_code TEXT NOT NULL CHECK (position_code IN ('tech', 'ops', 'cx')),
  education TEXT,
  experience_years TEXT,
  experience_summary TEXT,
  skills TEXT NOT NULL DEFAULT '[]',
  position_specific TEXT,
  availability TEXT,
  start_date TEXT,
  additional TEXT,
  status TEXT NOT NULL DEFAULT 'APPLICATION_IN_PROGRESS',
  source TEXT NOT NULL DEFAULT 'recruitment_ava',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS applicants_email_position_uidx ON applicants(email, position_code);
CREATE INDEX IF NOT EXISTS applicants_status_idx ON applicants(status);
CREATE INDEX IF NOT EXISTS applicants_created_idx ON applicants(created_at);

CREATE TABLE IF NOT EXISTS applicant_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  application_id TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  body TEXT NOT NULL,
  created_at TEXT NOT NULL,
  FOREIGN KEY (application_id) REFERENCES applicants(application_id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS applicant_messages_app_idx ON applicant_messages(application_id, created_at);

CREATE TABLE IF NOT EXISTS assessments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  application_id TEXT NOT NULL UNIQUE,
  position_code TEXT NOT NULL CHECK (position_code IN ('tech', 'ops', 'cx')),
  status TEXT NOT NULL DEFAULT 'IN_PROGRESS' CHECK (status IN ('IN_PROGRESS', 'COMPLETE', 'ABANDONED')),
  current_index INTEGER NOT NULL DEFAULT 0,
  correct_count INTEGER NOT NULL DEFAULT 0,
  answers TEXT NOT NULL DEFAULT '[]',
  questions TEXT NOT NULL DEFAULT '[]',
  score_percent REAL,
  passed INTEGER,
  started_at TEXT NOT NULL,
  completed_at TEXT,
  FOREIGN KEY (application_id) REFERENCES applicants(application_id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS assessments_app_idx ON assessments(application_id);

CREATE TABLE IF NOT EXISTS document_verifications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  reference_id TEXT NOT NULL UNIQUE,
  title TEXT,
  issued_at TEXT,
  status TEXT NOT NULL DEFAULT 'verified',
  note TEXT,
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS document_verifications_status_idx ON document_verifications(status);
