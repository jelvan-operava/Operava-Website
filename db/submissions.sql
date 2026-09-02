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

CREATE INDEX IF NOT EXISTS idx_form_submissions_type ON form_submissions(form_type, created_at);
CREATE INDEX IF NOT EXISTS idx_form_submissions_email ON form_submissions(email);
CREATE INDEX IF NOT EXISTS idx_form_otps_email ON form_otps(email, form_type, consumed);
