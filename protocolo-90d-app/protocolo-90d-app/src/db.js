import { openDB } from 'idb'

const DB_NAME = 'protocolo90d'
const DB_VERSION = 1

// Nomes de todas as "tabelas" (object stores), espelhando docs/DATABASE-SCHEMA.md
export const STORES = {
  DAILY_ENTRIES: 'daily_entries',
  EXPENSES: 'expenses',
  DEBTS: 'debts',
  SKILL_PROJECTS: 'skill_projects',
  OUTREACH_LOG: 'outreach_log',
  WEEKLY_REVIEWS: 'weekly_reviews',
  SETTINGS: 'settings',
}

let dbPromise = null

export function getDB() {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORES.DAILY_ENTRIES)) {
          db.createObjectStore(STORES.DAILY_ENTRIES, { keyPath: 'date' })
        }
        if (!db.objectStoreNames.contains(STORES.EXPENSES)) {
          db.createObjectStore(STORES.EXPENSES, { keyPath: 'id' })
        }
        if (!db.objectStoreNames.contains(STORES.DEBTS)) {
          db.createObjectStore(STORES.DEBTS, { keyPath: 'id' })
        }
        if (!db.objectStoreNames.contains(STORES.SKILL_PROJECTS)) {
          db.createObjectStore(STORES.SKILL_PROJECTS, { keyPath: 'id' })
        }
        if (!db.objectStoreNames.contains(STORES.OUTREACH_LOG)) {
          db.createObjectStore(STORES.OUTREACH_LOG, { keyPath: 'id' })
        }
        if (!db.objectStoreNames.contains(STORES.WEEKLY_REVIEWS)) {
          db.createObjectStore(STORES.WEEKLY_REVIEWS, { keyPath: 'week_start' })
        }
        if (!db.objectStoreNames.contains(STORES.SETTINGS)) {
          db.createObjectStore(STORES.SETTINGS, { keyPath: 'key' })
        }
      },
    })
  }
  return dbPromise
}

// ---------- daily_entries ----------

export async function getEntry(date) {
  const db = await getDB()
  return db.get(STORES.DAILY_ENTRIES, date)
}

export async function saveEntry(entry) {
  const db = await getDB()
  return db.put(STORES.DAILY_ENTRIES, entry)
}

export async function getAllEntries() {
  const db = await getDB()
  const all = await db.getAll(STORES.DAILY_ENTRIES)
  return all.sort((a, b) => (a.date < b.date ? -1 : 1))
}

// ---------- settings (chave/valor) ----------

export async function getSetting(key, fallback = null) {
  const db = await getDB()
  const row = await db.get(STORES.SETTINGS, key)
  return row ? row.value : fallback
}

export async function setSetting(key, value) {
  const db = await getDB()
  return db.put(STORES.SETTINGS, { key, value })
}

// ---------- genérico (usado por outros stores e pela exportação) ----------

export async function getAllFromStore(storeName) {
  const db = await getDB()
  return db.getAll(storeName)
}

export async function putRecord(storeName, record) {
  const db = await getDB()
  return db.put(storeName, record)
}

export async function deleteRecord(storeName, key) {
  const db = await getDB()
  return db.delete(storeName, key)
}

export async function getAllSettings() {
  const db = await getDB()
  const rows = await db.getAll(STORES.SETTINGS)
  return Object.fromEntries(rows.map((r) => [r.key, r.value]))
}
