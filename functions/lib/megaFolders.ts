/** Exact MEGA top-level folder names (must match the mobile app). */
export const MEGA_FOLDERS = {
  APPLICANTS: 'OPERAVA APPLICANTS',
  CLIENTS: 'OPERAVA CLIENTS',
  EMPLOYEES: 'OPERAVA EMPLOYEES',
  FILES: 'OPERAVA FILES AND DOCUMENTS',
} as const

export type MegaFolderName = (typeof MEGA_FOLDERS)[keyof typeof MEGA_FOLDERS]

const ALLOWED = new Set<string>(Object.values(MEGA_FOLDERS))

export function isAllowedMegaFolder(name: string): name is MegaFolderName {
  return ALLOWED.has(name)
}

export function defaultFolderForKind(kind?: string): MegaFolderName {
  const k = String(kind || '').toLowerCase()
  if (k.includes('client')) return MEGA_FOLDERS.CLIENTS
  if (k.includes('employee')) return MEGA_FOLDERS.EMPLOYEES
  if (k.includes('file') || k.includes('document') || k.includes('academy')) return MEGA_FOLDERS.FILES
  return MEGA_FOLDERS.APPLICANTS
}
