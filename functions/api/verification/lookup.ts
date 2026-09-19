import { json } from '../../lib/formCore'

interface Env {
  SUBMISSIONS_DB?: D1Database
}

type Row = {
  reference_id: string
  title: string | null
  issued_at: string | null
  status: string
}

const SEED: Row[] = [
  {
    reference_id: 'OPERAVA-DOC-00000001',
    title: 'Sample issued document',
    issued_at: '2026-09-01',
    status: 'verified',
  },
]

function normalizeId(raw: string): string {
  return String(raw || '')
    .trim()
    .toUpperCase()
    .replace(/\s+/g, '')
}

async function ensureVerificationTable(db: D1Database) {
  await db
    .prepare(
      'CREATE TABLE IF NOT EXISTS document_verifications (' +
        'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
        'reference_id TEXT NOT NULL UNIQUE,' +
        'title TEXT,' +
        'issued_at TEXT,' +
        'status TEXT NOT NULL DEFAULT \'verified\',' +
        'note TEXT,' +
        'created_at TEXT NOT NULL' +
        ')',
    )
    .run()
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url)
  const id = normalizeId(url.searchParams.get('id') || '')
  if (!id) {
    return json({ ok: false, verified: false, message: 'Missing reference ID' }, 400)
  }

  let row: Row | null = null

  const db = context.env.SUBMISSIONS_DB
  if (db) {
    try {
      await ensureVerificationTable(db)
      const found = await db
        .prepare(
          'SELECT reference_id, title, issued_at, status FROM document_verifications WHERE UPPER(reference_id) = ? LIMIT 1',
        )
        .bind(id)
        .first<Row>()
      if (found) row = found
    } catch (e) {
      console.error('verification D1 lookup error', e)
    }
  }

  if (!row) {
    row = SEED.find((r) => r.reference_id === id) || null
  }

  if (!row || String(row.status).toLowerCase() !== 'verified') {
    return json({ ok: true, verified: false, referenceId: id })
  }

  return json({
    ok: true,
    verified: true,
    referenceId: row.reference_id,
    title: row.title || undefined,
    issuedAt: row.issued_at || undefined,
  })
}
