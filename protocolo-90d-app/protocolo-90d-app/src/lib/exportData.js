import { STORES, getAllFromStore, getAllSettings, putRecord, setSetting } from '../db.js'

const TABLE_STORES = [
  STORES.DAILY_ENTRIES,
  STORES.EXPENSES,
  STORES.DEBTS,
  STORES.SKILL_PROJECTS,
  STORES.OUTREACH_LOG,
  STORES.WEEKLY_REVIEWS,
]

function downloadBlob(filename, content, mime) {
  const blob = new Blob([content], { type: mime })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

function toCSV(rows) {
  if (!rows.length) return ''
  const headers = Array.from(rows.reduce((set, row) => {
    Object.keys(row).forEach((k) => set.add(k))
    return set
  }, new Set()))

  const escape = (val) => {
    if (val === undefined || val === null) return ''
    const str = String(val)
    if (/[",\n;]/.test(str)) return `"${str.replace(/"/g, '""')}"`
    return str
  }

  const lines = [headers.join(',')]
  for (const row of rows) {
    lines.push(headers.map((h) => escape(row[h])).join(','))
  }
  return lines.join('\n')
}

export async function exportTableCSV(storeName) {
  const rows = await getAllFromStore(storeName)
  const csv = toCSV(rows)
  downloadBlob(`${storeName}.csv`, csv, 'text/csv;charset=utf-8;')
}

export async function exportAllJSON() {
  const data = { exported_at: new Date().toISOString() }
  for (const store of TABLE_STORES) {
    data[store] = await getAllFromStore(store)
  }
  data.settings = await getAllSettings()

  const filename = `protocolo-90d-backup-${data.exported_at.slice(0, 10)}.json`
  downloadBlob(filename, JSON.stringify(data, null, 2), 'application/json')
}

export async function importBackupJSON(file, { merge = true } = {}) {
  const text = await file.text()
  const data = JSON.parse(text)

  for (const store of TABLE_STORES) {
    const rows = data[store]
    if (!Array.isArray(rows)) continue
    for (const row of rows) {
      await putRecord(store, row)
    }
  }

  if (data.settings && typeof data.settings === 'object') {
    for (const [key, value] of Object.entries(data.settings)) {
      await setSetting(key, value)
    }
  }

  return { imported: true, merge }
}

export const EXPORTABLE_TABLES = TABLE_STORES
